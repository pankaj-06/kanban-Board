import { Grid } from "@mui/material";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
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
        <Grid container className="landing-page">
            <Grid item lg={12} xs={12} md={12} >
                <div className="landing-page-child">
                    “People uniformly spend too much time estimating the size, costs, and impacts of their work. They overplan up front and as context changes, they find themselves endlessly modifying their original assumptions. Planning should occur with minimal waste; it shouldn’t become overhead.”
                    ― Jim Benson
                </div>
            </Grid>
        </Grid>
    )
};

export default LandingPage;