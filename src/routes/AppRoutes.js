import { Routes , Route } from "react-router-dom"
import { PrivateRoutes } from ".";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DashBoard from '../pages/DashBoard';
import Profile from "../pages/Profile";
import Costumers from "../pages/Costumers";
import New from "../pages/New";

export default () => {
    return(
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/dashboard" element={<PrivateRoutes />} >
                <Route path="/dashboard" element={<DashBoard />} />
            </Route>

            <Route path="/profile" element={<PrivateRoutes />} >
                <Route path="/profile" element={<Profile />} />
            </Route>
            
            <Route path="/costumers" element={<PrivateRoutes />} >
                <Route path="/costumers" element={<Costumers />} />
            </Route>

            <Route path="/new" element={<PrivateRoutes />} >
                <Route path="/new" element={<New />} />
            </Route>

        </Routes>
    )
}