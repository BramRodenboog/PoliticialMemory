import { getProfile, getGames } from "./api.js";
import { state } from "./state.js";


const profile = await getProfile();
const games = await getGames();

document.getElementById("username-display")
    .innerText = profile.name;


document.getElementById("email-display")
    .innerText = profile.email;


if (games.length > 0) {
    const bestScore = Math.min(...games.map(game => game.score))

    document.getElementById("score-display")
        .innerText = bestScore
    
} else {
    document.getElementById("score-display" )
        .innerText = "Nog geen spellen gespeeld"
}

const select = document.getElementById("animal-select");
const button = document.getElementById("save-background");


button.addEventListener("click",()=>{
    const image = select.value;

    state.imageAPI = image;

    if(!image) {
        localStorage.removeItem("profileBackground");
    }

    document.documentElement.style.setProperty(
        "--background-image",
        `url("${image}")`
    );

    localStorage.setItem(
        "profileBackground",
        image
    );
});