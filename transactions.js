// =====================================
// MELOSAV - TRANSACTIONS SYSTEM
// =====================================

// Add Money
function addMoney(type, amount) {

    const user = getCurrentUser();

    if (!user) return;

    amount = Number(amount);

    if (amount <= 0) {

        showMessage(
            "Enter a valid amount",
            "error"
        );

        return;
    }

    const description = document.getElementById("description")?.value || "";

const record = {

    amount: amount,

    description: description,

    date: new Date().toLocaleString()

};

    if (type === "income") {

        user.data.income.push(record);

    }

    if (type === "expense") {

        user.data.expenses.push(record);

    }

    if (type === "saving") {

        user.data.savings.push(record);

    }

    user.data.transactions.unshift({

        type: type,

        amount: amount,

        date: record.date

    });

    updateUser(user);

    updateDashboard();

    showMessage(
        `${type} added successfully 💜`
    );

}


// Load Transactions
function loadTransactions() {

    const list =
    document.getElementById("transactionList");

    if (!list) return;

    const user = getCurrentUser();

    if (!user) return;

    list.innerHTML = "";

    if (user.data.transactions.length === 0) {

        list.innerHTML =
        "<li>No transactions yet</li>";

        return;

    }

    user.data.transactions
    .slice(0,5)
    .forEach(transaction => {

        const item =
        document.createElement("li");

        let icon = "💜";

        if (transaction.type === "income")
            icon = "💰";

        if (transaction.type === "expense")
            icon = "💸";

        if (transaction.type === "saving")
            icon = "🏦";

        item.innerHTML = `
            ${icon}
            ${transaction.type.toUpperCase()}
            - ₦${transaction.amount.toLocaleString()}
            <br>
            <small>${transaction.date}</small>
        `;

        list.appendChild(item);

    });

}