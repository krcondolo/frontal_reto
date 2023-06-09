import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { ChallenguePage } from "../challengue_app/ChallenguePage";
import { UsersAdmin } from "../challengue_app/pages/UsersAdmin";
import { RegisterUser } from "../challengue_app/pages/RegisterUser";
import { CuentasAdmin } from "../challengue_app/pages/CuentasAdmin";
import { RegisterAccount } from "../challengue_app/pages/RegisterAccount";
import { Logs } from "../challengue_app/pages/Logs";
import { Movimientos } from "../challengue_app/pages/Movimientos";
// import {ChallengePage} from "../challengue_app/ChallenguePage"
export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();
    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    } return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<ChallenguePage />} />
                            <Route path="/Usuarios" element={<UsersAdmin />} />
                            <Route path="/Registro de usuarios" element={<RegisterUser />} />
                            <Route path="/Cuentas" element={<CuentasAdmin />} />
                            <Route path="/Registro de cuentas" element={<RegisterAccount />} />
                            <Route path="/Logs" element={<Logs />} />
                            <Route path="/Movimientos" element={<Movimientos />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}

