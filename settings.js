const selector = document.getElementById("themeSelector");
const darkSwitch = document.getElementById("darkModeSwitch");

function applyTheme() {

    const color =
        localStorage.getItem("meloColor") || "purple";

    const mode =
        localStorage.getItem("meloTheme") || "light";

    document.body.classList.remove(
        "theme-purple",
        "theme-emerald",
        "theme-ocean",
        "theme-midnight",
        "theme-rose",
        "theme-gold"
    );

    document.body.classList.add("theme-" + color);

    if (mode === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    if (selector) {
        selector.value = color;
    }

    if (darkSwitch) {
        darkSwitch.checked = mode === "dark";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    applyTheme();

    if (selector) {

        selector.addEventListener("change", () => {

            localStorage.setItem(
                "meloColor",
                selector.value
            );

            applyTheme();

        });

    }

    if (darkSwitch) {

        darkSwitch.addEventListener("change", () => {

            localStorage.setItem(
                "meloTheme",
                darkSwitch.checked ? "dark" : "light"
            );

            applyTheme();

        });

    }

});