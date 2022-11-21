const themeButton = document.getElementById("theme-button");
const body = document.getElementsByTagName("body")[0];

themeButton.addEventListener("click", () => {
    const currentTheme = body.className;
    if (currentTheme === "light-theme") {
        body.className = "dark-theme";
        themeButton.innerText = "🌚";
    }
    console.log(currentTheme)
    if (currentTheme === "dark-theme") {
        body.className = "light-theme";
        themeButton.innerText = "🌞";
    }
})