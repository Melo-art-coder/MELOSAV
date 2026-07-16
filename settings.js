const selector = document.getElementById("themeSelector");

const saved = localStorage.getItem("meloTheme") || "light";

selector.value = saved;

selector.addEventListener("change", () => {

localStorage.setItem("meloTheme", selector.value);

location.reload();

});