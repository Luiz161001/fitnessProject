import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

const Index = () => {
    const user = useAuth();

    return (
        <section>
            {Object.keys(user.user).map(k => (
                <>
                    <h1 key={k}>{`${k}: ${user.user[k]}`}</h1>
                </> 
            ))}

            <button onClick={() => user.logout()}>
                Logout
            </button>
        </section>
    )
}

export default Index;