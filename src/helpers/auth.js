export function getUser() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getUser();
  return user?.role === "admin";
}
