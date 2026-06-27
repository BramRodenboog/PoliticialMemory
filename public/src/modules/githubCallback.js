import { saveToken, isAuthenticated } from "./auth.js";

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
    saveToken(token);
    window.location.href = "/";
} else {
    window.location.href = "/login.html";
}