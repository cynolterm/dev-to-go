import React from "react";
import { Route, Routes,  BrowserRouter } from "react-router-dom";

import App from "./App";
import MainPage from "./MainPage";
import UserPage from "./UserPage";
import DevToGoHeader from "./header";

const DevToGoRoutes = () => (
    <App>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="user" element={<UserPage/>}/>
            </Routes>
        </BrowserRouter>
    </App>
)

export default DevToGoRoutes;