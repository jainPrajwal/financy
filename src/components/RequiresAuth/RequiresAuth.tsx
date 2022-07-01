import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ProviderProps } from "../../constants/videos.types";
import { useAuth } from "../../hooks/useAuth"

export const RequiresAuth = ({ children }: ProviderProps) => {
    const { authState } = useAuth();
    const localToken = localStorage.getItem(`token`);
    const parsedToken = localToken && (JSON.parse(localToken));
    const [token] = useState(authState.token || (parsedToken?.token))
    const location = useLocation();
    return token ? <>{children}</> : <Navigate to="/login" replace state={{ from: location.pathname }} />

}