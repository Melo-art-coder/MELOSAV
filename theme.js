// =====================================
// MELOSAV GLOBAL THEME SYSTEM
// =====================================

const themeButton = document.getElementById("themeToggle");

const themes = {
    purple: "theme-purple",
    emerald: "theme-emerald",
    ocean: "theme-ocean",
    rose: "theme-rose",
    gold: "theme-gold",
    midnight: "theme-dark"
};

function applyTheme(theme){

    document.body.classList.remove(
        "theme-purple",
        "theme-emerald",
        "theme-ocean",
        "theme-rose",
        "theme-gold",
        "theme-dark"
    );

    document.body.classList.add(themes[theme]);

    localStorage.setItem("meloTheme", theme);

    if(themeButton){

        themeButton.textContent =
            theme === "midnight" ? "🌙" : "☀️";

    }

}

function loadTheme(){

    const savedTheme =
        localStorage.getItem("meloTheme") || "purple";

    applyTheme(savedTheme);

}

document.addEventListener(
    "DOMContentLoaded",
    loadTheme
);