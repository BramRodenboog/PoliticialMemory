import { login } from "./api.js";
import { saveToken, isAuthenticated } from "./auth.js";

if (isAuthenticated()) {
    window.location.href = "/";
}

const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const result = await login(username, password);

        if (result.token) {
            saveToken(result.token);
            window.location.href = "/";
        } else {
            errorMessage.textContent = "Ongeldige gebruikersnaam of wachtwoord. Probeer het opnieuw.";
            errorMessage.hidden = false;
        }
    } catch (error) {
        errorMessage.textContent = "Er is een fout opgetreden tijdens het inloggen.";
        errorMessage.hidden = false;
    }
});

document.getElementById("github-login").addEventListener("click", (event) => {
    window.location.href = "http://127.0.0.1:8000/connect/github";
});