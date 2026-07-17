// =====================================
// MELOSAV V4 GLOBAL THEME ENGINE
// =====================================

const THEMES = [
    "purple",
    "emerald",
    "ocean",
    "rose",
    "gold",
    "midnight"
];

const themeClasses = {
    purple: "theme-purple",
    emerald: "theme-emerald",
    ocean: "theme-ocean",
    rose: "theme-rose",
    gold: "theme-gold",
    midnight: "theme-midnight"
};

// Apply Theme
function applyTheme(theme = "purple") {

    // Remove every previous theme
    Object.values(themeClasses).forEach(cls =>
        document.body.classList.remove(cls)
    );

    // Fallback
    if (!themeClasses[theme]) {
        theme = "purple";
    }

    // Add new class
    document.body.classList.add(themeClasses[theme]);

    // Save
    localStorage.setItem("meloTheme", theme);
document.dispatchEvent(
    new CustomEvent("themeChanged", {
        detail: { theme }
    })
);

    // Update active theme button
    document.querySelectorAll(".theme-option").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.theme === theme
        );
    });

    // Update icon if it exists
    const toggle = document.getElementById("themeToggle");

    if (toggle) {
        toggle.textContent =
            theme === "midnight"
            ? "🌙"
            : "🎨";
    }
}

// Load Saved Theme
function loadTheme() {

    const savedTheme =
        localStorage.getItem("meloTheme") ||
        "purple";

    applyTheme(savedTheme);
}

// Theme Picker
document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    document.querySelectorAll(".theme-option").forEach(button => {

        button.addEventListener("click", () => {

            applyTheme(button.dataset.theme);

        });

    });

});

// Allow other JS files to change theme
window.applyTheme = applyTheme;
window.loadTheme = loadTheme;