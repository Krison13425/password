import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [cookies] = useCookies(["user"]);

  const tokenExists = cookies.user !== undefined;

  const userVerified = sessionStorage.getItem("verified") === "1";

  if (tokenExists && userVerified) {
    return <Outlet />;
  } else if (tokenExists && !userVerified) {
    return <Navigate to="/verification" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
