// =====================================
// MELOSAV HOME
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


// Load User
function loadDashboardUser() {

    const user = getCurrentUser();

    if (!user) return;

    const welcome = document.getElementById("welcomeMessage");

    if (welcome) {
        welcome.textContent = getGreeting(user.name);
    }

}


// Update Dashboard
function updateDashboard() {

    const user = getCurrentUser();

    if (!user) return;

    const income = user.data.income.reduce((sum, item) => sum + item.amount, 0);

    const savings = user.data.savings.reduce((sum, item) => sum + item.amount, 0);

    const expenses = user.data.expenses.reduce((sum, item) => sum + item.amount, 0);

    const balance = income - expenses - savings;

    const balanceBox = document.getElementById("balance");
    const incomeBox = document.getElementById("incomeAmount");
    const savingBox = document.getElementById("savingAmount");

    if (balanceBox) {
        balanceBox.textContent = `₦${balance.toLocaleString()}`;
    }

    if (incomeBox) {
        incomeBox.textContent = `₦${income.toLocaleString()}`;
    }

    if (savingBox) {
        savingBox.textContent = `₦${savings.toLocaleString()}`;
    }

}


// Start Home
document.addEventListener("DOMContentLoaded", () => {

    loadDashboardUser();
    updateDashboard();

    const addBtn = document.getElementById("addBtn");
    const modal = document.getElementById("transactionModal");
    const saveBtn = document.getElementById("saveTransaction");

    if (addBtn && modal) {

        addBtn.addEventListener("click", () => {

            modal.style.display = "flex";

        });

    }

    if (modal) {

        modal.addEventListener("click", (e) => {

            if (e.target === modal) {

                modal.style.display = "none";

            }

        });

    }

    if (saveBtn) {

        saveBtn.addEventListener("click", () => {

            const type = document.getElementById("transactionType").value;

            const amount = Number(document.getElementById("amount").value);

            if (!amount || amount <= 0) {

                showMessage("Please enter a valid amount", "error");
                return;

            }

            console.log("SAVE CLICKED");
console.log("TYPE:", type);
console.log("AMOUNT:", amount);
console.log("USER:", getCurrentUser());

addMoney(type, amount);

updateDashboard();

            document.getElementById("amount").value = "";
            document.getElementById("description").value = "";

            modal.style.display = "none";

        });

    }

});