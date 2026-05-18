
import { state } from "../../modules/state.js";

function selectCard(card, element) {
    state.selectedCard = { object: card, element: element };
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
}

export async function load(random5Cards) {
    const fiveCardContainer = document.getElementById("5-card-container");
    fiveCardContainer.innerHTML = "";
    random5Cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.id = card.Id;
        div.addEventListener("click", () => {
            document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
            div.classList.add("selected");
        });
        div.innerHTML = `<img width="100px" src="${card.image}"><p class="card-name">${card.Roepnaam} ${card.Achternaam}</p>`;
        fiveCardContainer.appendChild(div);
    });
}