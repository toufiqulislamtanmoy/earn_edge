import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Signup from "../Page/Signup/Signup";
import VerifyPhone from "../Page/VerifyPhone/VerifyPhone";
import MyEye from "../Page/MyEye/MyEye";
import PrivetRoute from "./PrivetRoute";
import Tasks from "../Page/Tasks/Tasks";


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
            {
                path: "/tasks",
                element: <Tasks />
            },
            {
                path: "/verify",
                element: <VerifyPhone />
            },
            {
                path: "/MyEye",
                element: <PrivetRoute><MyEye /></PrivetRoute>
            }
        ]
    }
    
]);

export default router;