import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Hold from "../Components/Hold/Hold";
import useLoading from "../hooks/useLoadding";

const Main = () => {
    const location = useLocation();
    console.log(location)
    const newLayout = location.pathname.includes('login') || location.pathname.includes('signup') || location.pathname.includes('verify')
    const isLoading = useLoading(3000);

    return (
        <div className="">
            {isLoading ? <Hold text={"🚀 Launching the experience, please wait.."}/> : (
                <>
                    {newLayout || <Navbar />}
                    <Outlet />
                    {newLayout || <Footer />}
                </>
            )}
        </div>

    );
};

export default Main;