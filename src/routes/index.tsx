import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setupApiService } from "../services/api";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Users } from "../pages/Users";


export default function Router() {
    const [cookies, , removeCookies] = useCookies(["loginToken"]);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        if (cookies.loginToken) {
            setLoggedIn(true);
            setupApiService.setupHeaders(cookies?.loginToken);
            setupApiService.setupInterceptors(removeCookies);
        } else {
            setLoggedIn(false);
        };
    }, [cookies, removeCookies]);

    return (
        <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/home" replace /> : <Login />} />
            <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/home" replace />  } />
            <Route path="/user" element={loggedIn ? <Users /> : <Navigate to="/home" replace />  } />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};