
import { state } from "../../modules/state.js";

function selectCard(card, element) {
    state.selectedCard = { object: card, element: element };
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
}

export async function load(random5Cards) {
    const fiveCardContainer = document.getElementById("5-card-container");
    fiveCardContainer.innerHTML = "";
    random5Cards.forEach(card => {
        // Card element
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = card.Id;
        cardElement.addEventListener("click", () => {
            if (state.selectedCard) {
                return;
            }

            if (state.startTime === null) {
                state.startTime = Date.now();
            }

            document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
            cardElement.classList.add("selected", "flip");
            state.selectedCard = { object: card, element: cardElement };
        });

        const cardInner = document.createElement("div");
        cardInner.className = "card-inner";

        // Front card side
        const flippedCard = document.createElement("div");
        flippedCard.className = "back-face";

        // Flipped card side
        const personCard = document.createElement("div");
        personCard.className = "front-face";
        personCard.innerHTML = `<img width="100px" src="${card.image}"><p class="card-name">${card.Roepnaam} ${card.Achternaam}</p>`;
        
        cardInner.appendChild(personCard);
        cardInner.appendChild(flippedCard);
        cardElement.appendChild(cardInner);
        fiveCardContainer.appendChild(cardElement);
    });
}