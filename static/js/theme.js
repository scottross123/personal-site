const themeButton = document.getElementById("theme-button");
const body = document.getElementsByTagName("body")[0];
const colorScheme = window.matchMedia()

if (body.className === "day") themeButton.innerText = "🌞";
if (body.className === "night") themeButton.innerText = "🌚";

themeButton.addEventListener("click", () => {
    const currentTheme = body.className;
    if (currentTheme === "day") {
        body.className = "night";
        themeButton.innerText = "🌚";
    }
    console.log(currentTheme);
    if (currentTheme === "night") {
        body.className = "day";
        themeButton.innerText = "🌞";
    }
});