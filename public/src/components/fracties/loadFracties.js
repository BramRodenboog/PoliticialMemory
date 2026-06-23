
import { loadComponent } from "../../framework.js";
import { getFractiesOfPerson } from "../../modules/person.js";
import { state } from "../../modules/state.js";
import { getRandom5Cards } from "../../modules/person.js";
import { load as cardLoad } from '../cards/LoadCard.js';
import { submitScore } from "../../modules/api.js";
import { isAuthenticated } from "../../modules/auth.js";
import { showEndingModal } from "../../modules/endingModal.js";

async function selectFractie(fractie) {
    let selectedCard = document.querySelector(".selected");

    if (selectedCard) {
        let cardData = state.cards.find(
            card => String(card.Id) === selectedCard.id
        );

        if (!cardData) {
            console.log("Card data not found for selected card.");
            return;
        }

        let fractieOfPerson = await getFractiesOfPerson(cardData["ActiviteitActor@odata.navigationLink"]);
        fractieOfPerson = fractieOfPerson.toLowerCase();

        state.guesses++;

        if (fractieOfPerson == fractie.name) {
            selectedCard.remove();
            state.cards = state.cards.filter(
                card => card.Id !== selectedCard.id
            );
            const totalCards = JSON.parse(localStorage.getItem("cards")).length;
            document.getElementById("politici").innerText = `Politici: ${state.cards.length}/${totalCards}`;

            state.random5Cards = state.random5Cards.filter(card => String(card.Id) !== String(cardData.Id));

            console.log("cardData.Id:", cardData.Id, typeof cardData.Id);
            console.log("random5Cards lengte:", state.random5Cards.length);

            if (state.random5Cards.length === 0) {
                console.log("5 kaarten op, reload");

                if(state.cards.length === 0) {
                    showEndingModal(state.guesses);

                    if(isAuthenticated()) {
                        try {
                            const result = await submitScore(state.guesses);
                            console.log("Score opgeslagen:", result);
                        } catch(error) {
                            console.error("Score opslaan mislukt:", error);
                        }
                    }

                } else {
                    state.random5Cards = getRandom5Cards(state.cards);

                    await cardLoad(state.random5Cards);
                }
            }

            state.selectedCard = null;
            alert(`Correct!`);
        } else {
            state.selectedCard = null;

            // alert(`Fout! De fractie is ${fractieOfPerson}.`);
        }

        document.querySelectorAll(".card").forEach(c => {
            c.classList.remove("selected");
            c.classList.remove("flip");
        });

        console.log("Guesses:", state.guesses);
        document.getElementById("score").innerText = `Pogingen: ${state.guesses}`;
    }
}

export async function load(fracties) {
    const fractieContainer = document.getElementById("fractie-container");
    fracties.forEach(fractie => {
        // Card element
        const cardElement = document.createElement("div");
        cardElement.className = "card fractie-card";
        cardElement.id = fractie.name;
        cardElement.addEventListener("click", () => {
            if (!state.selectedCard) {
                return;
            }

            cardElement.classList.add("flip");
            setTimeout(() => selectFractie(fractie), 200);
        });

        const cardInner = document.createElement("div");
        cardInner.className = "card-inner";

        // Front card side
        const flippedCard = document.createElement("div");
        flippedCard.className = "back-face";

        // Flipped card side
        const personCard = document.createElement("div");
        personCard.className = "front-face";
        personCard.innerHTML = `<img width="100px" alt="${fractie.alt}" src="${fractie.image}"><p class="card-name">${fractie.name.toUpperCase()}</p>`;
        
        cardInner.appendChild(personCard);
        cardInner.appendChild(flippedCard);
        cardElement.appendChild(cardInner);
        fractieContainer.appendChild(cardElement);
    });
}

