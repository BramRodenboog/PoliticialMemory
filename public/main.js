import { loadPersons, getFractiesOfPerson } from '../src/modules/person.js';
import { loadVijfCardsComponent, loadFractieComponent } from '../src/components/LoadComponents.js';


const main = async () => {
    if (localStorage.getItem("cards")) {
        cards = JSON.parse(localStorage.getItem("cards"));
    } else {
        let cards = await loadPersons()
        cards = cards.filter(card =>
            fracties.some(fractie => fractie.name === card.fractie)
        );
        localStorage.setItem("cards", JSON.stringify(cards));
    }

    // const politicusContainer = document.getElementById("politicus-container");

    // cards.forEach(card => {
    //     const div = document.createElement("div");
    //     div.className = "card";
    //     div.id = card.Id;

    //     div.addEventListener("click", () => selectCard(card, div));

    //     div.innerHTML = `
    //         <img width="100px" src="${card.image}" alt="Geen afbeelding beschikbaar">
    //         <p class="card-name">${card.Roepnaam} ${card.Achternaam}</p>
    //     `;

    //     politicusContainer.appendChild(div);
    // });

    await loadFractieComponent(fracties, selectFractie);
    random5Cards = await getRandom5Cards();
    await loadVijfCardsComponent(random5Cards, selectCard);
    
}


main();

function hambugerMenu() {
    var x = document.getElementById("mynavbar");

    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}


function getRandom5Cards() {
    const random5Cards = cards.sort(() => 0.5 - Math.random());
    return random5Cards.slice(0, 5);
}
