import { Navigate } from "react-router";

export default function Unauthorized({ children }) {
  const accessToken = localStorage.getItem("access_token");

  // sudah login → ke home
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
