import { changeEmail } from "./api.js";

export function showEmailModal(email) {
    const modal = document.getElementById("edit-email-modal");
    const newEmailInput = document.getElementById("new-email");

    newEmailInput.value = email;
    modal.showModal();
}

export function initEmailModal() {
    const modal = document.getElementById("edit-email-modal");
    const closeModalButton = modal.querySelector(".close");
    const editEmailForm = document.getElementById("edit-email-form");
    const newEmailInput = document.getElementById("new-email");

    modal.querySelector(".close").addEventListener("click", () => {
        modal.close();
    });

    editEmailForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const newEmail = newEmailInput.value;
        
        try {
            await changeEmail(newEmail);
            document.getElementById("email-display").innerText = newEmail;

            modal.close();
        } catch (error) {
            console.error("Fout bij het wijzigen van het e-mailadres:", error);
        }
        
        modal.close();
    });
}