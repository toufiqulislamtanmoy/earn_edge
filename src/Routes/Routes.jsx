import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Signup from "../Page/Signup/Signup";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    }
    
]);

export default router;