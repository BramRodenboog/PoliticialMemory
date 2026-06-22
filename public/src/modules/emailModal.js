import { changeEmail } from "./api.js";

export function showEmailModal(email) {
    const editEmailModal = document.getElementById("edit-email-modal");
    const newEmailInput = document.getElementById("new-email");

    newEmailInput.value = email;
    editEmailModal.showModal();
}

export function initEmailModal() {
    const editEmailModal = document.getElementById("edit-email-modal");
    const closeModalButton = editEmailModal.querySelector(".close");
    const editEmailForm = document.getElementById("edit-email-form");
    const newEmailInput = document.getElementById("new-email");

    closeModalButton.addEventListener("click", () => {
        editEmailModal.close();
    });

    editEmailForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const newEmail = newEmailInput.value;
        
        try {
            await changeEmail(newEmail);
            document.getElementById("email-display").innerText = newEmail;

            editEmailModal.close();
        } catch (error) {
            console.error("Fout bij het wijzigen van het e-mailadres:", error);
        }
        
        editEmailModal.close();
    });
}