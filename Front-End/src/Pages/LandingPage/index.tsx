import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../Redux/Actions/AuthActions";
import { setTitle } from "../../Utils/Helper";

const LandingPage = () => {
    setTitle("Landing-page");
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isUserLoggedIn === "true") {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div>
            Home
        </div>
    )
};

export default LandingPage;