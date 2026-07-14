
// =====================================
// MELOSAV - HOME DASHBOARD
// =====================================

// Greeting
function getGreeting(name) {

    const hour = new Date().getHours();

    if (hour < 12) {
        return `Good morning, ${name} ☀️`;
    }

    if (hour < 18) {
        return `Good afternoon, ${name} 💜`;
    }

    return `Good evening, ${name} 🌙`;
}

// Load Dashboard User
function loadDashboardUser() {

    const user = getCurrentUser();

    if (!user) return;

    const greeting =
    document.getElementById("welcomeMessage");

    if (greeting) {
        greeting.textContent =
        getGreeting(user.name);
    }

}

// Update Dashboard
function updateDashboard() {

    const user = getCurrentUser();

    if (!user) return;

    const data = user.data;

    const totalIncome =
    data.income.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalExpense =
    data.expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalSavings =
    data.savings.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const balance =
    totalIncome - totalExpense - totalSavings;

    const balanceBox =
    document.getElementById("balance");

    const incomeBox =
    document.getElementById("incomeAmount");

    const savingBox =
    document.getElementById("savingAmount");

    if (balanceBox)
        balanceBox.textContent =
        `₦${balance.toLocaleString()}`;

    if (incomeBox)
        incomeBox.textContent =
        `₦${totalIncome.toLocaleString()}`;

    if (savingBox)
        savingBox.textContent =
        `₦${totalSavings.toLocaleString()}`;
}

// Load dashboard when page opens
document.addEventListener("DOMContentLoaded", () => {

    loadDashboardUser();
    updateDashboard();

});