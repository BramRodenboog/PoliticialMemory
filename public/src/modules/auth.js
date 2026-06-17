

export function saveToken(token) {
    localStorage.setItem("authToken", token);
}

export function getToken() {
    return localStorage.getItem("authToken");
}

export function clearToken() {
    localStorage.removeItem("authToken");
}

export function isAuthenticated() {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp <= currentTime) {
            clearToken();
            return false;
        }

        return true;
    } catch (error) {
        clearToken();
        return false;
    }
}

export function isAdmin() {
    const token = getToken();

    if (!token) {
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        
        return payload.roles && payload.roles.includes("ROLE_ADMIN");
    } catch (error) {
        return false;
    }
}