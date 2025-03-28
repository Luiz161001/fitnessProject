import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
    const { user, loading } = useAuth();
    
    if(loading){
        return (
            <div className="loading-page">
                <p>We are loading your data :)</p>
                <p>If you are not logged in yet, please login <Link to="/">here</Link></p>
            </div>
        )
    }
    if(user) 
        return <Outlet />;

    return <Navigate to="/" />
}

export default PrivateRoute;