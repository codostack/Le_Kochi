export function getToken() {
  return localStorage.getItem("token") || null;
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}