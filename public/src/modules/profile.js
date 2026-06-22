import { getProfile, getGames, changeEmail } from "./api.js";
import { state } from "./state.js";
import { isAuthenticated } from "./auth.js";
import { savePreferences, loadPreferences } from "./preferences.js";

if (!isAuthenticated()) {
    window.location.href = "/";
}

const profile = await getProfile();
const games = profile.games || [];

document.getElementById("username-display")
    .innerText = profile.name;
document.getElementById("email-display")
    .innerText = profile.email;


if (games.length > 0) {
    const bestScore = Math.min(...games.map(game => game.score))

    document.getElementById("score-display")
        .innerText = bestScore
    
} else {
    document.getElementById("score-display")
        .innerText = "Nog geen spellen gespeeld"
}

const animalSelect = document.getElementById("animal-select");
const fractieColorSelect = document.getElementById("color-found-select");
const personColorSelect = document.getElementById("color-closed-select");
const button = document.getElementById("save-background");


button.addEventListener("click",()=>{
    const image = animalSelect.value;
    const colorFound = fractieColorSelect.value;
    const colorClosed = personColorSelect.value;

    savePreferences(image, colorFound, colorClosed);
    loadPreferences();
});


const editEmailButton = document.getElementById("edit-email");
const editEmailModal = document.getElementById("edit-email-modal");
const closeModalButton = editEmailModal.querySelector(".close");
const editEmailForm = document.getElementById("edit-email-form");
const newEmailInput = document.getElementById("new-email")

editEmailButton.addEventListener("click", () => {
    newEmailInput.value = profile.email;
    editEmailModal.showModal();
});

closeModalButton.addEventListener("click", () => {
    editEmailModal.close();
});

editEmailForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newEmail = newEmailInput.value;
    
    try {
        await changeEmail(newEmail);
        document.getElementById("email-display").innerText = newEmail;
    } catch (error) {
        console.error("Fout bij het wijzigen van het e-mailadres:", error);
    }
    
    editEmailModal.close();
});