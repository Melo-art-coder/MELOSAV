// =====================================
// MELOSAV - SMART NOTIFICATIONS V2
// =====================================

function showMessage(message, type = "success") {

    // Extract title if HTML is passed
    let title = "MELOSAV 💜";
    let text = message;

    if (message.includes("assistant-title")) {

        const temp = document.createElement("div");
        temp.innerHTML = message;

        title =
            temp.querySelector(".assistant-title")?.textContent.trim() ||
            title;

        text =
            temp.querySelector(".assistant-text")?.textContent.trim() ||
            "";

    }

    if (typeof meloToast === "function") {

        meloToast(type, title, text);

    }

}


// =====================================
// Friendly Assistant
// =====================================

function assistantMessage(title,message,type="success"){

    const user=getCurrentUser();

    const fullName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    "Friend";

const firstName = fullName.split(" ")[0];

    showMessage(

`

<div class="assistant-title">

💜 ${title}, ${firstName}!

</div>

<div class="assistant-text">

${message}

</div>

`,

type

);

}