
export function showEndingModal(guesses) {
    const modal = document.getElementById("ending-modal");

    if (!modal) return;

    document.getElementById("final-score").innerText = guesses;

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