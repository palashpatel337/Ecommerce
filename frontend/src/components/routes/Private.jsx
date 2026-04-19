import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { Spinner } from "../Spinner";
import Dashboard from "../../pages/user/Dashboard";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`)
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])


    console.log(auth?.token);

    return ok ? <Outlet /> : <Spinner/>
}
