export async function loadComponent(componentPath, target, props = {}) {
    const response = await fetch(componentPath);

    if (!response.ok) {
        throw new Error(`Failed to load component: ${componentPath}`);
    }

    const html = await response.text();

    const el = document.querySelector(target);
    if (!el) {
        throw new Error(`Target not found: ${target}`);
    }

    el.insertAdjacentHTML("beforeend", html);
}