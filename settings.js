const themeSelect = document.getElementById("themeSelect");

const savedTheme =
localStorage.getItem("meloTheme") || "light";

themeSelect.value = savedTheme;

themeSelect.addEventListener("change", () => {

    localStorage.setItem(
        "meloTheme",
        themeSelect.value
    );

    location.reload();

});