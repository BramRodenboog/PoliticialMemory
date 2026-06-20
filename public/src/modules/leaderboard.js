import { LeaderBoard } from "./api.js";




const leaderboard = await LeaderBoard();

leaderboard.sort((a, b) => b.score - a.score);

const tbody = document.getElementById("leaderboard-body");

tbody.innerHTML = "";

leaderboard.forEach((player, index) => {

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.username}</td>
            <td>${player.score}</td>
        `;

    tbody.appendChild(row);
});
