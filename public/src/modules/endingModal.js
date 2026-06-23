
export function showEndingModal(guesses) {
    const modal = document.getElementById("ending-modal");

    if (!modal) return;

    const highscoreText = document.getElementById("highscore-text");

    if(guesses < JSON.parse(localStorage.getItem("highscore") || 0)) {
        localStorage.setItem("highscore", guesses);

    }

    document.getElementById("final-score").innerText = guesses;
    document.getElementById("highscore").innerText = JSON.parse(localStorage.getItem("highscore"));

    modal.showModal();
}

export function initEndingModal() {
    const modal = document.getElementById("ending-modal");

    if (!modal) return;

    modal.querySelector(".close").addEventListener("click", () => {
        modal.close();
    });

    modal.querySelector("#restart-button").addEventListener("click", () => {
        modal.close();
        window.location.reload();
    });

    modal.querySelector("#leaderboard-button").addEventListener("click", () => {
        modal.close();
        window.location.href = "/leaderboard.html";
    });
}