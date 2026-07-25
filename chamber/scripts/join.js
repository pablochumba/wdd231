const timestampField = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const membershipModals = document.querySelectorAll(".membership-modal");

timestampField.value = new Date().toISOString();

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(`#${button.dataset.modal}`);
        modal.showModal();
    });
});

membershipModals.forEach((modal) => {
    const closeButton = modal.querySelector(".modal-close");

    closeButton.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});
