document.addEventListener("DOMContentLoaded", () => {

const logout = document.getElementById("logoutBtn");

logout.addEventListener("click", () => {

localStorage.removeItem("meloCurrentUser");

window.location.href = "index.html";

});

});