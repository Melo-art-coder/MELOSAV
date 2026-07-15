// =====================================
// MELO AI
// Personality Engine V1
// =====================================

function getFirstName(user) {
    return (user.fullName || user.name || "Friend").split(" ")[0];
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getNickname(user) {

    const firstName = getFirstName(user);

    const gender = (user.gender || "").toLowerCase();

    const style = (user.nicknameStyle || "classic").toLowerCase();

    const names = {

        female: {
            nigerian: [
                "Achalugo 🌸",
                "Obim 💜",
                "Queen 👑",
                "Boss Lady ✨",
                firstName
            ],

            classic: [
                "Future Millionaire 💰",
                "Dream Chaser 🌱",
                "Champion 🏆",
                firstName
            ]
        },

        male: {
            nigerian: [
                "Odogwu 😎",
                "Chairman 👑",
                "Nna m 💪",
                "My Guy 😂",
                firstName
            ],

            classic: [
                "Future Millionaire 💰",
                "Dream Chaser 🌱",
                "Champion 🏆",
                firstName
            ]
        }
    };

    if (!names[gender]) return firstName;

    return randomItem(
        names[gender][style] || names[gender].classic
    );

}
// =====================================
// MELO TOAST
// =====================================

function meloToast(type, title, message) {

    const oldToast = document.querySelector(".melo-toast");

    if (oldToast) oldToast.remove();

    const toast = document.createElement("div");
    toast.className = `melo-toast ${type}`;

    toast.innerHTML = `
        <div class="melo-logo">
            <img src="icon-192.png" alt="MELOSAV">
        </div>

        <div class="melo-content">
            <div class="melo-title">${title}</div>
            <div class="melo-message">${message}</div>
        </div>

        <div class="melo-progress"></div>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },450);

    },4000);

}