import { RootState } from "../../redux/store.ts";
import { Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: RouteProps) {
  const auth = useSelector((state: RootState) => state.auth);

  return <>{auth.token ? children : <Navigate to="/login" replace />}</>;
}
