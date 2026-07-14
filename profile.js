// =====================================
// MELOSAV - PROFILE SYSTEM
// =====================================

// Load Profile
function loadProfile() {

    const user = getCurrentUser();

    if (!user) return;

    const name = document.getElementById("profileName");
    const email = document.getElementById("profileEmail");
    const gender = document.getElementById("profileGender");
    const avatar = document.getElementById("userAvatar");

    if (name) name.textContent = user.name;
    if (email) email.textContent = user.email;
    if (gender) gender.textContent = user.gender.toUpperCase();

    if (avatar) {

        avatar.textContent =
        user.gender === "male" ? "👨" : "👩";

    }

    loadProfileStats(user);

}



// Profile Statistics
function loadProfileStats(user) {

    const income = user.data.income.reduce((sum, item) => sum + item.amount, 0);
    const savings = user.data.savings.reduce((sum, item) => sum + item.amount, 0);
    const expenses = user.data.expenses.reduce((sum, item) => sum + item.amount, 0);

    const balance = income - expenses - savings;

    const balanceBox = document.getElementById("profileBalance");
    const savingBox = document.getElementById("profileSavings");
    const budgetBox = document.getElementById("profileBudget");

    if (balanceBox)
        balanceBox.textContent = `₦${balance.toLocaleString()}`;

    if (savingBox)
        savingBox.textContent = `₦${savings.toLocaleString()}`;

    if (budgetBox)
        budgetBox.textContent =
        `₦${user.data.dailyBudget.toLocaleString()}`;

}



// Load Profile
document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

});