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