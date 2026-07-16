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
const usdBox = document.getElementById("usdBalance");
const eurBox = document.getElementById("eurBalance");
const gbpBox = document.getElementById("gbpBalance");
const fcfaBox = document.getElementById("fcfaBalance");
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
fetchRates().then(rates => {

    if (!rates) return;

    if (usdBox) {

        usdBox.textContent =
            "$" + (balance * rates.USD).toFixed(2);

    }

    if (eurBox) {

        eurBox.textContent =
            "€" + (balance * rates.EUR).toFixed(2);

    }

    if (gbpBox) {

        gbpBox.textContent =
            "£" + (balance * rates.GBP).toFixed(2);

    }

    if (fcfaBox) {

        fcfaBox.textContent =
            (balance * rates.XOF).toLocaleString() + " FCFA";

    }

});

}
// =====================================
// DAILY STREAK 🔥
// =====================================

function updateDailyStreak() {

    const user = getCurrentUser();

    if (!user) return;

    // Safety for old accounts
    if (!user.data.streak) {

        user.data.streak = {

            count: 0,

            lastActive: null

        };

    }

    const today = new Date().toDateString();

    const lastActive = user.data.streak.lastActive;

    // Already opened today
    if (lastActive === today) return;

    // First visit
    if (!lastActive) {

        user.data.streak.count = 1;

    } else {

        const yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);

        if (lastActive === yesterday.toDateString()) {

            user.data.streak.count++;

        } else {

            user.data.streak.count = 1;

        }

    }

    user.data.streak.lastActive = today;

    updateUser(user);

    // Melo encouragement
    if(typeof assistantMessage === "function"){

    assistantMessage(
        `🔥 Day ${user.data.streak.count} Streak!`,
        "Welcome back! Keep your savings habit alive 💜"
    );

}

}

// Start Home
document.addEventListener("DOMContentLoaded", () => {

    loadDashboardUser();
updateDashboard();
updateDailyStreak();

setTimeout(()=>{

    if(typeof meloWelcomeVoice === "function"){
        meloWelcomeVoice();
    }

},1500);

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


if(type === "income"){

    meloMoneyAdded(amount);

}


if(type === "saving"){

    meloSaved(amount);

}

            document.getElementById("amount").value = "";
            document.getElementById("description").value = "";

            modal.style.display = "none";
console.log("NEW HOME JS LOADED 🔥");

        });

    }

});