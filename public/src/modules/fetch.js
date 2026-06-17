import { getToken } from "./auth.js";

const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {
    const token = getToken();

    const headers = {
        ...options.headers,
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    }

    return originalFetch(url, { ...options, headers });
};