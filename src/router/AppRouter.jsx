import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { ChallenguePage } from "../challengue_app/ChallenguePage";
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
    }


    return (
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
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}

