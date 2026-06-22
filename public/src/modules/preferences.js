import { getPreferences, setPreferences } from "./api.js";
import { state } from "./state.js";
import { isAuthenticated } from "./auth.js";

export async function loadPreferences() {
    if (!isAuthenticated()) {
        window.location.href = "/";
    }

    try {
        const response = await getPreferences();

        state.imageAPI = response.preferred_api;
        document.documentElement.style.setProperty(
            "--background-image",
            `url("${state.imageAPI}")`
        );

        if (response.color_found) {
            state.colorFound = response.color_found;
            document.documentElement.style.setProperty(
                "--color-fractie",
                state.colorFound
            );
        }

        if (response.color_closed) {
            state.colorClosed = response.color_closed;
            document.documentElement.style.setProperty(
                "--color-person",
                state.colorClosed
            );
        }
    } catch (error) {
        console.error("Fout bij het ophalen van voorkeuren:", error);
    }
}

export async function savePreferences(api, color_found, color_closed) {
    if (!isAuthenticated()) {
        window.location.href = "/";
    }

    try {
        const response = await setPreferences(api, color_found, color_closed);
        return response;
    } catch (error) {
        console.error("Fout bij het opslaan van voorkeuren:", error);
        throw error;
    }
}