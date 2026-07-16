const themeButtons = document.querySelectorAll(".theme-option");

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const theme = button.dataset.theme;

        localStorage.setItem("meloColor", theme);

        document.body.classList.remove(
            "theme-purple",
            "theme-emerald",
            "theme-ocean",
            "theme-midnight",
            "theme-rose",
            "theme-gold"
        );

        document.body.classList.add("theme-" + theme);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const saved = localStorage.getItem("meloColor") || "purple";

    document.body.classList.add("theme-" + saved);

});