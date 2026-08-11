const themeToggle = document.querySelector("#theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const headerActions = document.querySelector(".header-actions");
const mainNav = document.querySelector(".main-nav");

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme");

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        themeToggle.checked = isDark;
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    if (savedTheme === "dark") {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    themeToggle.addEventListener("change", () => {
        applyTheme(themeToggle.checked);
    });
}
if (navToggle && headerActions && mainNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = headerActions.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            headerActions.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}
