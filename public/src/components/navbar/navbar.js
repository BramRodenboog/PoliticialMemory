import { isAuthenticated, isAdmin, clearToken } from "../../modules/auth.js";

function hamburgerMenu() {
    var x = document.getElementById("mynavbar");

    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

export function loadNavbar() {
    document.querySelector("#hamburger").addEventListener("click", hamburgerMenu);

    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
    const profileLink = document.getElementById("profile-link");
    const adminLink = document.getElementById("admin-link");

    const isLoggedIn = isAuthenticated();

    loginLink.hidden = isLoggedIn;
    logoutLink.hidden = !isLoggedIn;
    profileLink.hidden = !isLoggedIn;
    adminLink.hidden = !isAdmin();

    logoutLink.addEventListener("click", () => {
        clearToken();
        window.location.href = "/login.html";
    });
}


