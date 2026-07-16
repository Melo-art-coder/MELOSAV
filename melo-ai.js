// =====================================
// MELOSAV AI ASSISTANT 🤖💜
// MELO AI V1
// =====================================


function meloInsight(){

    const user = getCurrentUser();

    if(!user) return;


    const income = user.data.income.reduce(
        (sum,item)=> sum + item.amount,
        0
    );


    const savings = user.data.savings.reduce(
        (sum,item)=> sum + item.amount,
        0
    );


    const expenses = user.data.expenses.reduce(
        (sum,item)=> sum + item.amount,
        0
    );


    const balance = income - expenses - savings;



    let message = "";



    // First transaction
    if(income === 0 && savings === 0){

        message =
        "Welcome to MELOSAV 💜 Start your savings journey today.";

    }


    // Good saver
    else if(savings > 0){

        message =
        `Amazing work ${user.name}! 💜 You have saved ₦${savings.toLocaleString()}. Keep building your future.`;

    }


    // High balance
    else if(balance > 100000){

        message =
        `Wow ${user.name}! 🔥 Your balance is looking strong. Keep managing your money wisely.`;

    }


    // Default
    else{

        message =
        `Welcome back ${user.name} 💜 Remember, small savings become big achievements.`;

    }



    showMeloMessage(message);

}




// =====================================
// MELO MESSAGE DISPLAY
// =====================================


function showMeloMessage(message){


    const box = document.getElementById(
        "meloMessage"
    );


    if(box){

        box.textContent = message;

    }


}




// Run when dashboard loads

document.addEventListener(
"DOMContentLoaded",
()=>{

    meloInsight();

});