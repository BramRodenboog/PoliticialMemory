
import { loadComponent } from "../../framework.js";
import { getFractiesOfPerson } from "../../modules/person.js";
import { state } from "../../modules/state.js";


async function selectFractie(fractie, score, cards, random5Cards) {
    let selectedCard = document.querySelector(".selected");
    
    if (selectedCard) {
        let cardData = state.cards.find(card => card.Id === selectedCard.id);
        if (!cardData) {
            console.log("Card data not found for selected card.");
            return;
        }
        let fractieOfPerson = await getFractiesOfPerson(cardData["ActiviteitActor@odata.navigationLink"]);
        fractieOfPerson = fractieOfPerson.toLowerCase();
        if (fractieOfPerson == fractie.name) {
            state.score++;
            document.getElementById("score").innerText = `Score: ${state.score}`;
            document.getElementById("politici").innerText = `Politici: ${state.cards.length}/${localStorage.getItem("cards").length}`;
            selectedCard.element.remove();
            state.cards = state.cards.filter(card => card.Id !== selectedCard.object.Id);
            state.random5Cards = state.random5Cards.filter(card => card.Id !== selectedCard.object.Id);
            state.selectedCard = null;
            if (state.random5Cards.length === 0) {
                state.random5Cards = getRandom5Cards();
                await loadComponent("/src/components/cards.html", "#cards-container");
            }
            localStorage.setItem("score", state.score);
            alert(`Correct!`);
        } else {
            alert(`Fout! De fractie is ${fractieOfPerson}.`);
        }
    }
}

export async function load(fracties,  score, cards, random5Cards) {
    const fractieContainer = document.getElementById("fractie-container");
    fracties.forEach(fractie => {
        const div = document.createElement("div");
        div.className = "card";
        div.id = fractie.name;

        div.addEventListener("click", () => selectFractie(fractie, score, cards, random5Cards));

        div.innerHTML = `
            <img width="100px" src="${fractie.image} " alt="Geen afbeelding beschikbaar">
            <p class="card-name">${fractie.name.toUpperCase()}</p>
        `;

        fractieContainer.appendChild(div);

    });
}

