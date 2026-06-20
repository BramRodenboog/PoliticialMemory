import { state } from "./state.js";


const saved =
    localStorage.getItem("profileBackground");


if (saved) {

    state.imageAPI = saved;


    document.documentElement.style.setProperty(
        "--background-image",
        `url("${saved}")`
    );

}