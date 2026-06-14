
import { loadComponent } from "../src/framework.js";
import { loadPersons, getFractiesOfPerson } from '../src/modules/person.js';
import { load as cardLoad } from '../src/components/cards/LoadCard.js';
import { load as fractieLoad } from '../src/components/fracties/loadFracties.js';
import { state } from "../src/modules/state.js";
import { getRandom5Cards } from "../src/modules/person.js";

export let fracties = [
    {
        name: "d66",
        image: "data:image/png;base64,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"
    },
    {
        name: "vvd",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/VVD_logo_%282020%E2%80%93present%29.svg/960px-VVD_logo_%282020%E2%80%93present%29.svg.png"
    },
    {
        name: "PvdA",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcentraalplus.nl%2Fwp-content%2Fuploads%2F2025%2F06%2FGL-PvdA-Logo-opwit-1800x900.png&f=1&nofb=1&ipt=096fad64d2ae0b71b260b09aab4aa77d936bfb10fedf8daf3ed24a020e4b0e60"
    },
    {
        name: "cda",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dierencoalitie.nl%2Fwp-content%2Fuploads%2F2025%2F09%2FCDA-logo.png&f=1&nofb=1&ipt=1769ea072067d3d0af71393dca4e4e030d0acd7e6ae6c6d260b1976941e42bd5"
    },
    {
        name: "pvv",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/field_uploads/Logo%20PVV_tcm181-113708.jpg?itok=k1sh8gyG"
    },
    {
        name: "fvd",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/forum_v_democratie.jpg?itok=RZxxrtPX"
    },
    {
        name: "sgp",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/logo_sgp_2016.jpg?itok=KOXJF0RH"
    },
    {
        name: "denk",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/denk-tk.jpg?itok=fT1Xhjn1"
    },
    {
        name: "sp",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/logo_sp.png?itok=nF2E-_Oo"
    },
    {
        name: "ja21",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/ja21_logo_rgb.png?itok=HLv-womo"
    },
    {
        name: "BBB",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/2025-06/Logo_BBB_GROEN.png?itok=odJKtMnk"
    },
    {
        name: "christenunie",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/field_uploads/logo_christenunie_tcm181-104419.gif?itok=ZPfszbpA"
    },
    {
        name: "pvdd",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/partij_voor_de_dieren.jpg?itok=qqavVr7x"
    },
    {
        name: "50plus",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/logo_50plus.png?itok=r1aAwo9K"
    },
    {
        name: "volt",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/atoms/images/volt_logo_max37mm1.jpg?itok=Lo6f9s_h"
    },
    {
        name: "groenlinks",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/2023-10/GroenLinksPvdA%20%282023%29.png?itok=iMGYG_co"
    },
    {
        name: "",
        image: ""
    },
    {
        name: "groenlinks-pvda",
        image: "https://www.tweedekamer.nl/sites/default/files/styles/small/public/2023-10/GroenLinksPvdA%20%282023%29.png?itok=iMGYG_co"
    }
]

const main = async () => {
    if (localStorage.getItem("cards")) {
        state.cards = JSON.parse(localStorage.getItem("cards"));
    } else {
        state.cards = await loadPersons();
        
        localStorage.setItem("cards", JSON.stringify(state.cards));
    }

    state.random5Cards = getRandom5Cards(state.cards);

    await loadComponent(
        "/src/components/cards/cards.html",
        "#cards-container"
    );

    await cardLoad(state.random5Cards);

    await loadComponent(
        "/src/components/fracties/fracties.html",
        "#fracties-container"
    );

    // Shuffle the fracties (Using Fisher-Yates algorithm)
    for (let i = fracties.length - 1; i > 0; i--) {
        // j is a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        [fracties[i], fracties[j]] = [fracties[j], fracties[i]];
    }

    await fractieLoad(fracties);

    document.getElementById("score").innerText = `Score: ${state.score}`;
    document.getElementById("politici").innerText = `Politici: ${state.cards.length}/${state.cards.length}`;
};

document.addEventListener("DOMContentLoaded", main);

function hamburgerMenu() {
    var x = document.getElementById("mynavbar");

    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}

document.querySelector("#hamburger").addEventListener("click", hamburgerMenu);





