import { Navigate, useLocation } from "react-router-dom";
import { ProviderProps } from "../../constants/videos.types";
import { useAuth } from "../../hooks/useAuth"

export const RequiresAuth = ({ children }: ProviderProps) => {
    const { authState } = useAuth();
    const location = useLocation();
    return authState.token ? <>{children}</> : <Navigate to="/login" replace state={{ from: location.pathname }} />

}