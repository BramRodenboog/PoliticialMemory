import { getProfile, getGames } from "./api.js";
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
