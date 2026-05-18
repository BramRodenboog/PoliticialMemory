
import { selectedCard } from "../../../public/main2.js";

function selectCard(card, element) {
    selectedCard = { object: card, element: element };
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
    element.classList.add("selected");
}

export async function load(random5Cards) {
    const fiveCardContainer = document.getElementById("5-card-container");
    fiveCardContainer.innerHTML = "";
    random5Cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";
        div.id = card.Id;
        div.addEventListener("click", () => selectCard(card, div));
        div.innerHTML = `<img width="100px" src="${card.image}"><p class="card-name">${card.Roepnaam} ${card.Achternaam}</p>`;
        fiveCardContainer.appendChild(div);
    });
}