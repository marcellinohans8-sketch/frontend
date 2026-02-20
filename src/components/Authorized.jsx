import { Navigate } from "react-router";

export default function Authorized({ children }) {
  const accessToken = localStorage.getItem("access_token");

  // belum login → ke login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
