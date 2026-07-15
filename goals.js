// =====================================
// MELOSAV GOALS V3
// PART 1 - Setup & Storage
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ GOALS V3 LOADED");

    const user = getCurrentUser();

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    // ===============================
    // Create Safe User Data
    // ===============================

    if (!user.data) user.data = {};

    user.data.income ??= [];
    user.data.expenses ??= [];
    user.data.savings ??= [];
    user.data.transactions ??= [];
    user.data.goals ??= [];
    user.data.notifications ??= [];

    let goals = user.data.goals;
    let selectedGoal = null;

    // ===============================
    // Elements
    // ===============================

    const goalsList = document.getElementById("goalsList");
    const createGoalBtn = document.getElementById("createGoalBtn");

    const goalModal = document.getElementById("goalModal");
    const addMoneyModal = document.getElementById("addMoneyModal");

    const saveGoalBtn = document.getElementById("saveGoal");
    const confirmAddMoney = document.getElementById("confirmAddMoney");

    const goalNameInput = document.getElementById("goalName");
    const goalTargetInput = document.getElementById("goalTarget");
    const goalAmountInput = document.getElementById("goalAmount");

    // ===============================
    // Save Goals
    // ===============================

    function saveGoals() {
        user.data.goals = goals;
        updateUser(user);
    }

    // ===============================
    // Percentage
    // ===============================

    function getPercent(saved, target) {

        if (!target || target <= 0) {
            return 0;
        }

        return Math.min(
            (saved / target) * 100,
            100
        );
    }
    // ===============================
    // Render Goals
    // ===============================

    function renderGoals() {

        if (!goalsList) return;

        goalsList.innerHTML = "";

        if (goals.length === 0) {

            goalsList.innerHTML = `
                <div class="goal-card empty-goal">
                    <h2>🎯 No Goals Yet</h2>
                    <p>Create your first savings goal and let Melo help you achieve it 💜</p>
                </div>
            `;

            return;
        }

        goals.forEach((goal, index) => {

            const percent = getPercent(goal.saved, goal.target);

            goalsList.innerHTML += `
                <div class="goal-card">

                    <div class="goal-top">
                        <h3>${goal.name}</h3>
                        <strong>${percent.toFixed(0)}%</strong>
                    </div>

                    <div class="goal-progress">
                        <div class="goal-fill"
                             style="width:${percent}%">
                        </div>
                    </div>

                    <div class="goal-stats">
                        <span>₦${goal.saved.toLocaleString()}</span>
                        <span>₦${goal.target.toLocaleString()}</span>
                    </div>

                    <button
                        class="add-money-btn"
                        data-index="${index}">
                        ➕ Add Money
                    </button>

                </div>
            `;

        });

        document.querySelectorAll(".add-money-btn").forEach(button => {

            button.addEventListener("click", () => {

                selectedGoal = Number(button.dataset.index);

                goalAmountInput.value = "";

                addMoneyModal.style.display = "flex";

            });

        });

    }

    // ===============================
    // Open / Close Modals
    // ===============================

    createGoalBtn?.addEventListener("click", () => {

        goalModal.style.display = "flex";

    });

    goalModal?.addEventListener("click", (e) => {

        if (e.target === goalModal) {

            goalModal.style.display = "none";

        }

    });

    addMoneyModal?.addEventListener("click", (e) => {

        if (e.target === addMoneyModal) {

            addMoneyModal.style.display = "none";

        }

    });

    // ===============================
    // Create Goal
    // ===============================

    saveGoalBtn?.addEventListener("click", () => {

        const goalName = goalNameInput.value.trim();
        const targetAmount = Number(goalTargetInput.value);

        if (!goalName) {

            meloToast(
    "error",
    "Let's name your goal 💜",
    "What are we saving for today?"
);

            return;
        }

        if (isNaN(targetAmount) || targetAmount <= 0) {

            meloToast(
    "error",
    "Almost there 💜",
    "Please enter a valid target amount."
);

            return;
        }

        goals.unshift({

            id: Date.now(),

            name: goalName,

            target: targetAmount,

            saved: 0,

            completed: false,

            createdAt: new Date().toLocaleString()

        });

        saveGoals();

        renderGoals();

        goalModal.style.display = "none";

        goalNameInput.value = "";
        goalTargetInput.value = "";

        const firstName = (user.fullName || user.name || "Friend").split(" ")[0];

        meloToast(
    "success",
    "🎯 Goal Created",
    `Yayy ${firstName}! Your "${goalName}" goal is ready. Let's start saving! 💜`
);

    });
    // ===============================
    // Add Money To Goal
    // ===============================

    confirmAddMoney?.addEventListener("click", () => {

        if (selectedGoal === null) return;

        const amount = Number(goalAmountInput.value);

        if (isNaN(amount) || amount <= 0) {

            assistantMessage(
                "Oops 💜",
                "Enter an amount greater than ₦0.",
                "error"
            );

            return;
        }

        // ===============================
        // Calculate Available Balance
        // ===============================

        const income = user.data.income.reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0
        );

        const expenses = user.data.expenses.reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0
        );

        const savings = user.data.savings.reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0
        );

        const balance = income - expenses - savings;

        // ===============================
        // Balance Check
        // ===============================

        if (amount > balance) {

            const firstName = (user.fullName || user.name || "Friend").split(" ")[0];

            assistantMessage(
                "Not Enough Balance 💜",
                `Hey ${firstName}, your available balance is only ₦${balance.toLocaleString()}. Try saving a smaller amount 🌱`,
                "error"
            );

            return;
        }

        // ===============================
        // Update Goal
        // ===============================

        goals[selectedGoal].saved += amount;

        // Record Savings

        user.data.savings.push({

            amount,

            description: `Savings Goal - ${goals[selectedGoal].name}`,

            date: new Date().toLocaleString()

        });

        // Record Transaction

        user.data.transactions.unshift({

            type: "saving",

            amount,

            description: `Goal: ${goals[selectedGoal].name}`,

            goalId: goals[selectedGoal].id,

            date: new Date().toLocaleString()

        });

        // ===============================
        // Goal Completion
        // ===============================

        const goal = goals[selectedGoal];

        const percent = getPercent(goal.saved, goal.target);

        if (goal.saved >= goal.target && !goal.completed) {

            goal.completed = true;

            const firstName = (user.fullName || user.name || "Friend").split(" ")[0];

            assistantMessage(
                "🎉 Goal Completed!",
                `Yayy ${firstName}! You completed your "${goal.name}" savings goal! I'm super proud of you! 🥳💜`
            );

        } else {

            const firstName = (user.fullName || user.name || "Friend").split(" ")[0];

            assistantMessage(
                "Great Job! 🎉",
                `Amazing ${firstName}! You added ₦${amount.toLocaleString()} to "${goal.name}". You're now ${percent.toFixed(0)}% closer! 💜`
            );

        }

        saveGoals();
        updateUser(user);
        renderGoals();

        addMoneyModal.style.display = "none";
        goalAmountInput.value = "";
        selectedGoal = null;

    });
    // ===============================
    // First Load
    // ===============================

    renderGoals();

}); // End DOMContentLoaded