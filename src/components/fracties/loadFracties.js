
import { loadComponent } from "../../framework.js";


async function selectFractie(fractie, selectedCard, score, cards, random5Cards) {
    if (selectedCard) {
        let fractieOfPerson = await getFractiesOfPerson(selectedCard.object["ActiviteitActor@odata.navigationLink"]);
        fractieOfPerson = fractieOfPerson.toLowerCase();
        if (fractieOfPerson == fractie.name) {
            score++;
            document.getElementById("score").innerText = `Score: ${score}`;
            document.getElementById("politici").innerText = `Politici: ${cards.length}/${localStorage.getItem("cards").length}`;
            selectedCard.element.remove();
            cards = cards.filter(card => card.Id !== selectedCard.object.Id);
            random5Cards = random5Cards.filter(card => card.Id !== selectedCard.object.Id);
            selectedCard = null;
            if (random5Cards.length === 0) {
                random5Cards = getRandom5Cards();
                await loadComponent("/src/components/cards.html", "#cards-container");
            }
            localStorage.setItem("score", score+1);
            alert(`Correct!`);
        } else {
            alert(`Fout! De fractie is ${fractieOfPerson}.`);
        }
    }
}

export async function load(fracties, score, cards, random5Cards) {
    const fractieContainer = document.getElementById("fractie-container");
    fracties.forEach(fractie => {
        const div = document.createElement("div");
        div.className = "card";
        div.id = fractie.name;

        div.addEventListener("click", () => selectFractie(fractie, selectedCard, score, cards, random5Cards));

        div.innerHTML = `
            <img width="100px" src="${fractie.image} " alt="Geen afbeelding beschikbaar">
            <p class="card-name">${fractie.name.toUpperCase()}</p>
        `;

        fractieContainer.appendChild(div);

    });
}

