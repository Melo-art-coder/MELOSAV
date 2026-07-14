// =====================================
// MELOSAV - WELCOME SYSTEM
// =====================================

// First Welcome
function firstWelcome() {

    const user = getCurrentUser();

    if (!user) return;

    const key = `meloWelcome_${user.id}`;

    if (!localStorage.getItem(key)) {

        showMessage(
            `Welcome to MeloSave, ${user.name}! 💜`
        );

        localStorage.setItem(key, "true");

    }

}

// Load
document.addEventListener("DOMContentLoaded", () => {

    firstWelcome();

});