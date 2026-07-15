// =====================================
// MELOSAV - SMART NOTIFICATIONS V2
// =====================================

function showMessage(message, type = "success") {

    const old = document.querySelector(".message");

    if (old) old.remove();

    const notification = document.createElement("div");

    notification.className = `message ${type}`;

    notification.innerHTML = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 100);

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {

            notification.remove();

        },300);

    },3500);

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