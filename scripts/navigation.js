const hamburgerButton = document.getElementById("hamburger-btn");
const primaryNav = document.getElementById("primary-nav");

hamburgerButton.addEventListener("click", function () {
    primaryNav.classList.toggle("open");

    const isOpen = primaryNav.classList.contains("open");
    hamburgerButton.setAttribute("aria-expanded", isOpen);
});