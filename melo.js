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

    // Remove any existing toast
    const oldToast = document.querySelector(".melo-toast");

    if (oldToast) {
        oldToast.remove();
    }

    // Create toast
    const toast = document.createElement("div");
    toast.className = "melo-toast";

    toast.innerHTML = `
        <div class="melo-title">${title}</div>
        <div class="melo-message">${message}</div>
        <div class="melo-progress"></div>
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    // Remove after 4 seconds
    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 450);

    }, 4000);

}