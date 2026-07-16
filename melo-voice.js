// =====================================
// MELOSAV MELO VOICE ASSISTANT 🎙️💜
// MELO VOICE V1
// =====================================

console.log("🎙️ Melo Voice JS Loaded");
function speakMelo(text){

    if(!("speechSynthesis" in window)){

        alert("Melo voice is not supported on this device");

        return;

    }


    speechSynthesis.cancel();


    const voice = new SpeechSynthesisUtterance(text);


    voice.lang = "en-US";
    voice.rate = 0.9;
    voice.pitch = 1.1;
    voice.volume = 1;


    speechSynthesis.speak(voice);


    console.log("Melo speaking:", text);

}


// Welcome message

function meloWelcomeVoice(){

    const user = getCurrentUser();

    if(!user) return;


    const hour = new Date().getHours();

    let greeting;


    if(hour < 12){

        greeting = "Good morning";

    }

    else if(hour < 18){

        greeting = "Good afternoon";

    }

    else{

        greeting = "Good evening";

    }


    speakMelo(
    `${greeting} ${user.name}. Welcome back to MeloSave.`
);

}




// Money added voice

function meloMoneyAdded(amount){

    speakMelo(
    `Great job. ${amount.toLocaleString()} naira has been added to your MeloSave wallet.`
);

}



// Savings voice

function meloSaved(amount){

    speakMelo(
        `Amazing. You saved ${amount.toLocaleString()} naira. Keep building your future.`
    );

}
document.addEventListener("DOMContentLoaded",()=>{

    const btn = document.getElementById("meloSpeakBtn");


    if(btn){

        btn.addEventListener("click",()=>{


            const message =
            document.getElementById("meloMessage")?.textContent
            ||
            "Welcome to MELOSAV";


            speakMelo(message);


        });

    }

});