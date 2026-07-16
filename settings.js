// =====================================
// MELOSAV SETTINGS THEME SYSTEM
// =====================================

const themeButtons = document.querySelectorAll(".theme-option");

const allThemes = [
    "theme-purple",
    "theme-emerald",
    "theme-ocean",
    "theme-rose",
    "theme-gold",
    "theme-dark"
];

themeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const theme = button.dataset.theme;

        document.body.classList.remove(...allThemes);

        if(theme==="midnight"){

            document.body.classList.add("theme-dark");

        }else{

            document.body.classList.add("theme-"+theme);

        }

        localStorage.setItem("meloTheme",theme);

    });

});

document.addEventListener("DOMContentLoaded",()=>{

    const savedTheme =
        localStorage.getItem("meloTheme") || "purple";

    document.body.classList.remove(...allThemes);

    if(savedTheme==="midnight"){

        document.body.classList.add("theme-dark");

    }else{

        document.body.classList.add("theme-"+savedTheme);

    }

});