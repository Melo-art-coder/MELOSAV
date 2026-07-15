// =====================================
// MELOSAV GOALS V2
// PART 1
// =====================================

document.addEventListener("DOMContentLoaded", () => {

const user = getCurrentUser();

if (!user) {

window.location.href = "index.html";

return;

}

// ===============================
// Create Goals Storage
// ===============================

if (!user.data) {

user.data = {};

}

if (!user.data.goals) {

user.data.goals = [];

updateUser(user);

}

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
// Calculate Percentage
// ===============================

function getPercent(saved, target) {

if (target <= 0) return 0;

return Math.min((saved / target) * 100, 100);

}

// ===============================
// Render Goals
// ===============================

function renderGoals() {

goalsList.innerHTML = "";

if (goals.length === 0) {

goalsList.innerHTML = `

<div class="goal-card">

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

<span>

₦${goal.saved.toLocaleString()}

</span>

<span>

₦${goal.target.toLocaleString()}

</span>

</div>

<button

class="add-money-btn"

data-index="${index}">

➕ Add Money

</button>

</div>


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

createGoalBtn.addEventListener("click", () => {

goalModal.style.display = "flex";

});

goalModal.addEventListener("click", (e) => {

if (e.target === goalModal) {

goalModal.style.display = "none";

}

});

addMoneyModal.addEventListener("click", (e) => {

if (e.target === addMoneyModal) {

addMoneyModal.style.display = "none";

}

});


// ===============================
// Create Goal
// ===============================

saveGoalBtn.addEventListener("click", () => {

const goalName = goalNameInput.value.trim();
const targetAmount = Number(goalTargetInput.value);

if (!goalName) {

assistantMessage(
"Let's name your goal 💜",
"What are we saving for today?",
"error"
);

return;

}

if (targetAmount <= 0 || isNaN(targetAmount)) {

assistantMessage(
"Almost there 💜",
"Please enter a valid target amount.",
"error"
);

return;

}

const newGoal = {

id: Date.now(),

name: goalName,

target: targetAmount,

saved: 0,

completed: false,

createdAt: new Date().toLocaleString()

};

goals.unshift(newGoal);

saveGoals();

renderGoals();

goalModal.style.display = "none";

goalNameInput.value = "";

goalTargetInput.value = "";

const firstName =
(user.fullName || user.name || "Friend")
.split(" ")[0];

assistantMessage(

"Goal Created 🎯",

`Yayy ${firstName}! Your "${goalName}" savings goal has been created successfully. Let's start saving! 💜`

);

});
// ===============================
// Add Money To Goal
// ===============================

confirmAddMoney.addEventListener("click", () => {

if(selectedGoal===null) return;

const amount=Number(goalAmountInput.value);

if(amount<=0){

assistantMessage(

"Oops 💜",

"Enter an amount greater than ₦0.",

"error"

);

return;

}


// Calculate Available Balance

const income=user.data.income.reduce(

(sum,item)=>sum+Number(item.amount),

0

);

const expenses=user.data.expenses.reduce(

(sum,item)=>sum+Number(item.amount),

0

);

const savings=user.data.savings.reduce(

(sum,item)=>sum+Number(item.amount),

0

);

const balance=income-expenses-savings;


// Check Balance

if(amount>balance){

const firstName=(user.fullName||user.name||"Friend").split(" ")[0];

assistantMessage(

"Not Enough Balance 💜",

`Hey ${firstName}, you can't save ₦${amount.toLocaleString()} right now because your available balance is only ₦${balance.toLocaleString()}. Try a smaller amount 🌱`,

"error"

);

return;

}


// Update Goal

goals[selectedGoal].saved+=amount;


// Record as Saving

user.data.savings.push({

amount:amount,

description:`Savings Goal - ${goals[selectedGoal].name}`,

date:new Date().toLocaleString()

});


// Record Transaction

user.data.transactions.unshift({

type:"saving",

amount:amount,

description:goals[selectedGoal].name,

date:new Date().toLocaleString()

});


// Save Everything

saveGoals();

updateUser(user);


// Refresh Screen

renderGoals();


// Close Modal

addMoneyModal.style.display="none";

goalAmountInput.value="";


// Melo Message

const firstName=(user.fullName||user.name||"Friend").split(" ")[0];

const percent=Math.min(

(goals[selectedGoal].saved/goals[selectedGoal].target)*100,

100

);

assistantMessage(

"Great Job! 🎉",

`Amazing ${firstName}! You just added ₦${amount.toLocaleString()} to your "${goals[selectedGoal].name}" goal. You're now ${percent.toFixed(0)}% closer! 💜`

);

});
// ===============================
// Goal Completed
// ===============================

goals.forEach(goal=>{

if(goal.saved>=goal.target && !goal.completed){

goal.completed=true;

const firstName=(user.fullName||user.name||"Friend").split(" ")[0];

assistantMessage(

"🎉 Goal Completed!",

`Yayy ${firstName}! You did it! 🥳 Your "${goal.name}" goal is complete. I'm so proud of you! Enjoy this achievement and let's start your next goal 💜`

);

}

});

saveGoals();

}


// ===============================
// First Load
// ===============================

renderGoals();

});

