// =====================================
// MELOSAV - BUDGET SYSTEM
// =====================================

// Save Budget
function saveBudget(amount) {

    const user = getCurrentUser();

    if (!user) return;

    amount = Number(amount);

    if (amount <= 0) {

        showMessage("Enter a valid budget", "error");
        return;

    }

    user.data.dailyBudget = amount;

    updateUser(user);

    updateBudgetStatus();

    showMessage("Daily budget saved 🎯");

}



// Update Budget Status
function updateBudgetStatus() {

    const status =
    document.getElementById("budgetStatus");

    if (!status) return;

    const user =
    getCurrentUser();

    if (!user) return;

    const budget =
    user.data.dailyBudget;

    if (budget === 0) {

        status.textContent =
        "Budget: Not set";

        return;

    }

    const todayExpense =
    user.data.expenses
    .filter(item => {

        return new Date(item.date).toDateString() ===
        new Date().toDateString();

    })
    .reduce((sum, item) => sum + item.amount, 0);

    const remaining =
    budget - todayExpense;

    status.textContent =
    `Remaining: ₦${Math.max(remaining, 0).toLocaleString()}`;

}



// Budget Form
document.addEventListener("DOMContentLoaded", () => {

    const budgetForm =
    document.getElementById("budgetForm");

    if (!budgetForm) return;

    budgetForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const amount =
        document.getElementById("budgetInput").value;

        saveBudget(amount);

        budgetForm.reset();

    });

    updateBudgetStatus();

});