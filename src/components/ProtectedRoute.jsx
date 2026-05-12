import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAdmin = sessionStorage.getItem("adminToken") === "suburputra-admin";

  if (!isAdmin) {
    return <Navigate to="/dashboard-sp" />;
  }

  return children;
}

export default ProtectedRoute;
