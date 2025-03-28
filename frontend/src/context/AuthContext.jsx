import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
import axios from "axios";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * the google oauth is not fully working
 */

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const register = async (formData) => {
        try{
            const res = await axios.post(`${apiUrl}/auth/register`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            }, { withCredentials: true });

            if(res.data.ok){
                setUser(formData);
                setLoading(false);
                return navigate("/a");
            }

            return alert(res.data.message);

        }catch(err){
            console.error(err);
            return alert(`We had a problem posting your registration to our servers, sorry`);
        }
    };

    const login = async (formData) => {
        try{
            const res = await axios.post(`${apiUrl}/auth/login`, {
                email: formData.email,
                password: formData.password
            }, { withCredentials: true });
    
            if(res.data.ok){
                setUser(res.data.userData);
                setLoading(false);
                return navigate("/a");
            }

            return alert(res.data.message);

        }catch(err){
            console.error(err);
            return alert(`We had a problem requesting your data from our servers, sorry`);
        }
    };

    const login_with_google = useGoogleLogin({
        onSuccess: async (resCode) => {
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${resCode.access_token}`
                    },
                    withCredentials: false
                });
                const userData = {
                    firstName: userInfo.data.given_name,
                    lastName: userInfo.data.family_name,
                    email: userInfo.data.email,
                    isOauth: true
                };

                const res = await axios.post(`${apiUrl}/auth/login-with-google`, {
                    userData
                }, { withCredentials: true });
                if(res.ok){
                    setUser(userData);
                    setLoading(false);
                    return navigate("/a");
                }
            }
            catch(err){
                console.error(err);
            }
        },
        onError: (err) => console.log(`Login failed: ${err}`)
    });

    const load_user = async () => {
        try{
            const res = await axios.get(`${apiUrl}/auth/load-user`, { withCredentials: true });
    
            if(res.data.ok){
                setUser(res.data.userData);
                setLoading(false);
                return navigate("/a");
            }

            return alert(res.data.message);

        }catch(err){
        }
    };
    
    const logout = async () => {
        const res = await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
        if(res.data.ok){
            // check oauth and use logout function
            if(user.isOauth) googleLogout();
            setUser(null);
            setLoading(true);
            return navigate("/");
        }
        
        alert("Failed to logout, please try again!");
        navigate(0);
    };

    useEffect(() => {
        load_user();
    }, []);

    return (
        <AuthContext.Provider value={{user, loading, register, login, login_with_google, logout}}>
            {children}
        </AuthContext.Provider>
    );
    
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);