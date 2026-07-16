const selector =
document.getElementById("themeSelector");

const darkSwitch =
document.getElementById("darkModeSwitch");

document.addEventListener("DOMContentLoaded", () => {

const savedTheme =
localStorage.getItem("meloColor") || "purple";

selector.value = savedTheme;

const dark =
localStorage.getItem("meloTheme");

darkSwitch.checked = dark === "dark";

});

selector.addEventListener("change", () => {

localStorage.setItem(
"meloColor",
selector.value
);

location.reload();

});

darkSwitch.addEventListener("change", () => {

const mode =
darkSwitch.checked
? "dark"
: "light";

localStorage.setItem(
"meloTheme",
mode
);

location.reload();

});