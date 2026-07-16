// =====================================
// MELOSAV MELO VOICE ASSISTANT 🎙️💜
// MELO VOICE V1
// =====================================


function speakMelo(text){

    if(!("speechSynthesis" in window)){

        console.log("Voice not supported");

        return;

    }


    // Stop previous voice
    speechSynthesis.cancel();


    const voice = new SpeechSynthesisUtterance(text);


    voice.rate = 1;

    voice.pitch = 1.1;

    voice.volume = 1;


    speechSynthesis.speak(voice);

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
        `${greeting} ${user.name}. Welcome back to MELOSAV.`
    );

}




// Money added voice

function meloMoneyAdded(amount){

    speakMelo(
        `Great job. ${amount.toLocaleString()} naira has been added to your MELOSAV wallet.`
    );

}



// Savings voice

function meloSaved(amount){

    speakMelo(
        `Amazing. You saved ${amount.toLocaleString()} naira. Keep building your future.`
    );

}