function main() {
    totalScore = localStorage.getItem("score") || 0;
    gamesPlayed = localStorage.getItem("gamesPlayed") || 0;
}


import { getProfile, getGames } from "./api.js";



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
        .innerText = "Nog geen games gespeeld"
}
