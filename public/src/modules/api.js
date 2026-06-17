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