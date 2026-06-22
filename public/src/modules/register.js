import { register } from "./api.js";
import { isAuthenticated } from "./auth.js";

if (isAuthenticated()) {
    window.location.href = "/";
}

const form = document.getElementById("register-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
        errorMessage.textContent = "De wachtwoorden komen niet overeen.";
        errorMessage.hidden = false;
        return;
    }

    try {
        const result = await register(username, email, password);

        if (result.status === 201) {
            window.location.href = "/login.html";
        } else {
            errorMessage.textContent = "Registratie mislukt. Probeer het opnieuw.";
            errorMessage.hidden = false;
        }
    } catch (error) {
        errorMessage.textContent = "Er is een fout opgetreden tijdens het registreren.";
        errorMessage.hidden = false;
    }
});