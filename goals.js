// =====================================
// MELOSAV GOALS V4
// =====================================

let currentUser = null;
let goals = [];

// Load User
function loadGoals() {

    currentUser = getCurrentUser();

    if (!currentUser) return;

    // Safety for old accounts
    if (!currentUser.data.goals) {
        currentUser.data.goals = [];
        updateUser(currentUser);
    }

    goals = currentUser.data.goals;

    renderGoals();

}
function renderGoals() {

    const container = document.getElementById("goalsList");

    if (!container) return;

    container.innerHTML = "";

    if (goals.length === 0) {

        container.innerHTML = `
            <div class="goal-summary">
                <h2>No Goals Yet 🎯</h2>
                <p>Create your first savings goal.</p>
            </div>
        `;

        return;

    }

    goals.forEach((goal,index)=>{

        const percent = Math.min(
            (goal.saved / goal.target) * 100,
            100
        );

        container.innerHTML += `

<div class="goal-card">

<div class="goal-top">

<h3 class="goal-name">
${goal.name}
</h3>

<strong>
${percent.toFixed(0)}%
</strong>

</div>

<div class="goal-progress">

<div class="goal-fill"
style="width:${percent}%">
</div>

</div>

<div class="goal-stats">

<span>
₦${goal.saved.toLocaleString()}
</span>

<span>
₦${goal.target.toLocaleString()}
</span>

</div>

<div class="goal-actions">

<button
class="add-money-btn"
onclick="openAddMoney(${index})">

➕ Add Money

</button>

<button
class="withdraw-btn"
onclick="withdrawGoal(${index})">

➖ Withdraw

</button>

</div>

</div>

`;

    });

}
function createGoal(name, target) {

    if (!name || target <= 0) {

        showMessage("Enter a valid goal name and amount.", "error");
        return;

    }

    const goal = {

        id: Date.now(),

        name,

        target: Number(target),

        saved: 0,

        createdAt: new Date().toISOString()

    };

    goals.push(goal);

    currentUser.data.goals = goals;

    updateUser(currentUser);

    renderGoals();

    showMessage(
        `🎯 "${name}" created successfully!`,
        "success"
    );

}
document.addEventListener("DOMContentLoaded", () => {

    loadGoals();

    const createBtn = document.getElementById("createGoalBtn");

    if (createBtn) {

        createBtn.addEventListener("click", () => {

            document.getElementById("goalModal").classList.add("active");

        });

    }

});