// =====================================
// MELOSAV CELEBRATIONS
// =====================================

function celebrateGoal(title, message) {

    // Vibrate (supported devices only)

    if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
    }

    // Confetti

    if (typeof confetti === "function") {

        confetti({
            particleCount: 180,
            spread: 120,
            origin: { y: 0.6 }
        });

    }

    // Melo Toast

    if (typeof meloToast === "function") {

        meloToast(
            "success",
            title,
            message
        );

    }

}