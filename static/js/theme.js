const themeButton = document.getElementById("theme-button");
const body = document.getElementsByTagName("body")[0];
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

const theme = window.localStorage.getItem("theme");
if (theme) {
   applyTheme(theme);
} else if (prefersDarkMode.matches) {
    applyTheme("night");
} else {
    applyTheme("day");
}

themeButton.addEventListener("click", () => {
    const currentTheme = window.localStorage.getItem("theme");
    if (currentTheme === "day") {
        applyTheme("night");
    }
    if (currentTheme === "night") {
        applyTheme("day");
    }
});

prefersDarkMode.addEventListener("change", ({ matches }) => {
    if (matches)
        applyTheme("night");
    else
        applyTheme("day");
});

function applyTheme(theme) {
    window.localStorage.setItem("theme", theme);
    body.className = theme;
    if (theme === "day") return themeButton.innerText = "🌞";
    if (theme === "night") return themeButton.innerText = "🌚";
}