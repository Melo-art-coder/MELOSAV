// =====================================
// MELOSAV CELEBRATIONS 🎉
// Phase 2
// =====================================


function celebrateGoal(title, message) {


    // Phone vibration

    if ("vibrate" in navigator) {

        navigator.vibrate([
            200,
            100,
            200
        ]);

    }



    // Confetti celebration

    if (typeof confetti === "function") {

        confetti({

            particleCount: 180,

            spread: 120,

            origin:{
                y:0.6
            }

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



    // Celebration sound (optional)

    playCelebrationSound();

}



// =====================================
// CELEBRATION SOUND 🔔
// =====================================

function playCelebrationSound(){

    try{

        const audio =
        new Audio(
        "sounds/success.mp3"
        );

        audio.play();

    }

    catch(error){

        console.log(
        "Celebration sound unavailable"
        );

    }

}