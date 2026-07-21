// Referencias al DOM: guardan los controles para reutilizarlos sin buscarlos otra vez.
const themeButton = document.querySelector(".theme-button");
const themeCheckbox = document.querySelector("#theme-toggle");

// Preferencia persistida: getItem devuelve "dark", "light" o null.
const savedTheme = localStorage.getItem("theme");

// Aplica el tema oscuro y sincroniza HTML, ambos controles y localStorage.
function applyDarkTheme() {
    document.documentElement.setAttribute("data-theme", "dark");
    themeButton.setAttribute("aria-pressed", "true");
    themeButton.textContent = "Light Theme";
    themeCheckbox.checked = true;
    localStorage.setItem("theme", "dark");
}

// Restaura el tema claro predeterminado y sincroniza todos los estados relacionados.
function applyLightTheme() {
    document.documentElement.removeAttribute("data-theme");
    themeButton.setAttribute("aria-pressed", "false");
    themeButton.textContent = "Dark Theme";
    themeCheckbox.checked = false;
    localStorage.setItem("theme", "light");
}

// Al cargar, restaura oscuro solo si esa fue la preferencia guardada.
if (savedTheme === "dark") {
    applyDarkTheme();
}

// Button: click consulta data-theme y aplica el estado contrario.
themeButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        applyLightTheme();
    } else {
        applyDarkTheme();
    }
});

// Checkbox: change ocurre después de que el navegador actualiza la propiedad checked.
themeCheckbox.addEventListener("change", () => {
    if (themeCheckbox.checked) {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
});
