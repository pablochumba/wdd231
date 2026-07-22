// DOM references: store the controls so they can be reused without querying again.
const themeButton = document.querySelector(".theme-button");
const themeCheckbox = document.querySelector("#theme-toggle");

// Persisted preference: getItem returns "dark", "light", or null.
const savedTheme = localStorage.getItem("theme");

// Applies the dark theme and synchronizes the HTML, both controls, and localStorage.
function applyDarkTheme() {
    document.documentElement.setAttribute("data-theme", "dark");
    themeButton.setAttribute("aria-pressed", "true");
    themeButton.textContent = "Light Theme";
    themeCheckbox.checked = true;
    localStorage.setItem("theme", "dark");
}

// Restores the default light theme and synchronizes all related states.
function applyLightTheme() {
    document.documentElement.removeAttribute("data-theme");
    themeButton.setAttribute("aria-pressed", "false");
    themeButton.textContent = "Dark Theme";
    themeCheckbox.checked = false;
    localStorage.setItem("theme", "light");
}

// On load, restores dark mode only when it was the saved preference.
if (savedTheme === "dark") {
    applyDarkTheme();
}

// Button: click checks data-theme and applies the opposite state.
themeButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
});

// Checkbox: change fires after the browser updates the checked property.
themeCheckbox.addEventListener("change", () => {
    if (themeCheckbox.checked) {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
});
