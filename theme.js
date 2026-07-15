// =====================================
// MELOSAV - THEME SYSTEM V2
// =====================================

const themeButton = document.getElementById("themeToggle");

function applyTheme(theme){

    if(theme==="dark"){

        document.body.classList.add("dark-mode");

        if(themeButton){

            themeButton.textContent="🌙";

        }

    }else{

        document.body.classList.remove("dark-mode");

        if(themeButton){

            themeButton.textContent="☀️";

        }

    }

}

function loadTheme(){

    const savedTheme=localStorage.getItem("meloTheme") || "light";

    applyTheme(savedTheme);

}

function toggleTheme(){

    const newTheme=document.body.classList.contains("dark-mode")

        ? "light"

        : "dark";

    localStorage.setItem("meloTheme",newTheme);

    applyTheme(newTheme);

}

if(themeButton){

    themeButton.addEventListener("click",toggleTheme);

}

document.addEventListener("DOMContentLoaded",loadTheme);