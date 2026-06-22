const API_ENDPOINT = "http://localhost:8000";

export async function login(username, password) {
    const response = await fetch(`${API_ENDPOINT}/memory/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    return response.json();
}

export async function register(username, email, password) {
    const response = await fetch(`${API_ENDPOINT}/memory/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    return response;
}

export async function getLeaderboard() {
    const response = await fetch(`${API_ENDPOINT}/memory/top-scores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    return response.json();
}

export async function getProfile() {
    const response = await fetch(
        `${API_ENDPOINT}/player/`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return response.json();
}

export async function getGames() {
    const response = await fetch(
        `${API_ENDPOINT}/player/games`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return response.json();
}

export async function submitScore(score) {
    const response = await fetch(`${API_ENDPOINT}/game/save`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            score: score
        })
    });

    return response.json();
}

export async function setPreferences(api, color_found, color_closed) {
    const response = await fetch(`${API_ENDPOINT}/player/preferences`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            api: api,
            color_found: color_found,
            color_closed: color_closed
        })
    });

    return response;
}

export async function getPreferences() {
    const response = await fetch(`${API_ENDPOINT}/player/preferences`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response.json();
}

export async function changeEmail(newEmail) {
    const response = await fetch(`${API_ENDPOINT}/player/email`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: newEmail
        })
    });

    return response;
}