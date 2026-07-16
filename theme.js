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
// ================================
// COLOR THEMES
// ================================

const themes = {

purple:"#7b2cff",

emerald:"#16a34a",

ocean:"#2563eb",

midnight:"#111827",

sunset:"#ea580c",

rose:"#e11d48"

};

function applyColorTheme(){

const color =
localStorage.getItem("meloColor") || "purple";

document.documentElement.style.setProperty(

"--primary",

themes[color]

);

}

document.addEventListener(

"DOMContentLoaded",

applyColorTheme

);