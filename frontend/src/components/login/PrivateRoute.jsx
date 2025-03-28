import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = () => {
    const { user, loading } = useAuth();
    
    if(loading){
        return (
            <div className="loading-page">
                <div className="load-animation"></div>
                <p>Loading</p>
                <p>Not logged in yet? Please login <a href="/">here</a>!</p>
            </div>
        )
    }
    if(user) 
        return <Outlet />;

    return <Navigate to="/" />
}

export default PrivateRoute;