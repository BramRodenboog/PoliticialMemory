
import { loadComponent } from "../../framework.js";
import { getFractiesOfPerson } from "../../modules/person.js";
import { state } from "../../modules/state.js";
import { getRandom5Cards } from "../../modules/person.js";
import { load as cardLoad } from '../cards/LoadCard.js';

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

        state.score = Math.round(state.startScore * 0.99 ** ((Date.now() - state.startTime) / 1000));
        console.log("Score:", state.score);
        document.getElementById("score").innerText = `Score: ${state.score}`;

        if (fractieOfPerson == fractie.name) {
            // state.score++;
            
            selectedCard.remove();
            state.cards = state.cards.filter(
                card => card.Id !== selectedCard.id
            );
            const totalCards = JSON.parse(localStorage.getItem("cards")).length;
            document.getElementById("politici").innerText = `Politici: ${state.cards.length}/${totalCards}`;

            state.random5Cards = state.random5Cards.filter(card => String(card.Id) !== String(cardData.Id));

            console.log("cardData.Id:", cardData.Id, typeof cardData.Id);
            console.log("random5Cards lengte:", state.random5Cards.length);
            // localStorage.setItem("cards", JSON.stringify(state.cards));

            if (state.random5Cards.length === 0) {
                console.log("5 kaarten op, reload");
                state.random5Cards = getRandom5Cards(state.cards);
                // localStorage.setItem("cards", JSON.stringify(state.cards));

                if(state.cards.length === 0) {
                    alert("Gefeliciteerd! Je hebt alle politici geraden! De game zal nu opnieuw starten.");
                    // localStorage.removeItem("cards");

                    if(state.score > JSON.parse(localStorage.getItem("highscore") || 0)) {
                        localStorage.setItem("highscore", state.score);
                        alert(`Nieuwe highscore: ${state.score}`);
                    }
                }

                await cardLoad(state.random5Cards);
            }

            state.selectedCard = null;
            alert(`Correct!`);
        } else {
            document.querySelectorAll(".card").forEach(c => {
                c.classList.remove("selected");
                c.classList.remove("flip");
            });

            state.selectedCard = null;

            alert(`Fout! De fractie is ${fractieOfPerson}.`);
        }
    }
}

export async function load(fracties) {
    const fractieContainer = document.getElementById("fractie-container");
    fracties.forEach(fractie => {
        const div = document.createElement("div");
        div.className = "card";
        div.id = fractie.name;

        div.addEventListener("click", () => selectFractie(fractie));

        div.innerHTML = `
            <img width="100px" src="${fractie.image}" alt="Geen afbeelding beschikbaar">
            <p class="card-name">${fractie.name.toUpperCase()}</p>
        `;

        fractieContainer.appendChild(div);

    });
}

