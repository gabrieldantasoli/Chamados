import { Routes , Route } from "react-router-dom"
import { PrivateRoutes } from ".";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DashBoard from '../pages/DashBoard';

export default () => {
    return(
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<PrivateRoutes />} >
                <Route path="/dashboard" element={<DashBoard />} />
            </Route>
            
        </Routes>
    )
}