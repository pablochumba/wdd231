const menuButton = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

menuButton.addEventListener("click", () => {
    primaryNav.classList.toggle("open");
    const isOpen = primaryNav.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;
