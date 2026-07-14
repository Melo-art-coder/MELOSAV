
// =====================================
// MELOSAV - THEME SYSTEM
// =====================================

const themeButton = document.getElementById("themeToggle");

function loadTheme() {

    const theme = localStorage.getItem("meloTheme");

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeButton) {
            themeButton.textContent = "🌙";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

    }

}

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("meloTheme", "dark");

        if (themeButton) {
            themeButton.textContent = "🌙";
        }

    } else {

        localStorage.setItem("meloTheme", "light");

        if (themeButton) {
            themeButton.textContent = "☀️";
        }

    }

}

if (themeButton) {

    themeButton.addEventListener("click", toggleTheme);

}

loadTheme();