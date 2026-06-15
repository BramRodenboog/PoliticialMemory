
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
}


