// =====================================
// MELOSAV HOME
// =====================================


// ================================
// Greeting
// ================================

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



// ================================
// Load User
// ================================

function loadDashboardUser() {

    const user = getCurrentUser();

    if (!user) return;

    const welcome =
    document.getElementById("welcomeMessage");

    if (welcome) {

        welcome.textContent =
        getGreeting(user.name);

    }

}



// ================================
// Dashboard
// ================================

function updateDashboard() {

    const user = getCurrentUser();

    if (!user) return;

    const income =
    user.data.income.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const savings =
    user.data.savings.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const expenses =
    user.data.expenses.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const balance =
    income - expenses - savings;

    document.getElementById("balance").textContent =
    `₦${balance.toLocaleString()}`;

    document.getElementById("incomeAmount").textContent =
    `₦${income.toLocaleString()}`;

    document.getElementById("savingAmount").textContent =
    `₦${savings.toLocaleString()}`;

}



// ================================
// HOME START
// ================================

document.addEventListener(
"DOMContentLoaded",
function () {

    loadDashboardUser();

    updateDashboard();



    // ==========================
    // POPUP
    // ==========================

    const addBtn =
    document.getElementById("addBtn");

    const modal =
    document.getElementById("transactionModal");

    const saveBtn =
    document.getElementById("saveTransaction");



    if(addBtn){

        addBtn.onclick = function(){

            modal.style.display = "flex";

        };

    }



    if(modal){

        modal.onclick = function(e){

            if(e.target === modal){

                modal.style.display = "none";

            }

        };

    }



    if(saveBtn){

        saveBtn.onclick = function(){

            const type =
            document.getElementById("transactionType").value;

            const amount =
            Number(
                document.getElementById("amount").value
            );

            if(amount <= 0){

                showMessage(
                    "Enter an amount",
                    "error"
                );

                return;

            }

            addMoney(type, amount);

            updateDashboard();

            document.getElementById("amount").value = "";

            document.getElementById("description").value = "";

            modal.style.display = "none";

        };

    }

});