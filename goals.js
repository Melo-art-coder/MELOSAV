// =====================================
// MELOSAV - SAVINGS GOALS
// PART 1
// =====================================

document.addEventListener("DOMContentLoaded", () => {

const createGoalBtn =
document.getElementById("createGoalBtn");

const goalModal =
document.getElementById("goalModal");

const saveGoalBtn =
document.getElementById("saveGoal");

const goalsList =
document.getElementById("goalsList");

const addMoneyModal =
document.getElementById("addMoneyModal");

let selectedGoal = null;

// ===============================
// Get Current User Goals
// ===============================

function getGoals() {

    const user = getCurrentUser();

    if (!user) return [];

    if (!user.data.goals) {

        user.data.goals = [];

        updateUser(user);

    }

    return user.data.goals;

}

function saveGoals(goals) {

    const user = getCurrentUser();

    if (!user) return;

    user.data.goals = goals;

    updateUser(user);

}


// ===============================
// Open Create Goal
// ===============================

createGoalBtn.addEventListener("click",()=>{

goalModal.style.display="flex";

});


// ===============================
// Close Modals
// ===============================

goalModal.addEventListener("click",(e)=>{

if(e.target===goalModal){

goalModal.style.display="none";

}

});

addMoneyModal.addEventListener("click",(e)=>{

if(e.target===addMoneyModal){

addMoneyModal.style.display="none";

}

});


// ===============================
// Load Goals
// ===============================

let goals = getGoals();




// ===============================
// Render Goals
// ===============================

function renderGoals(){

goalsList.innerHTML="";

if(goals.length===0){

goalsList.innerHTML=`

<div class="goal-card">

<h2>No Goals Yet 💜</h2>

<p>

Create your first savings goal.

</p>

</div>

`;

return;

}


goals.forEach((goal,index)=>{

const percent=

Math.min(

(goal.saved/goal.target)*100,

100

);

goalsList.innerHTML+=`

<div class="goal-card">

<div class="goal-top">

<div class="goal-name">

🎯 ${goal.name}

</div>

<div>

${percent.toFixed(0)}%

</div>

</div>

<div class="goal-progress">

<div

class="goal-fill"

style="width:${percent}%"

>

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

data-index="${index}"

>

➕ Add Money

</button>

</div>

`;

});


document.querySelectorAll(

".add-money-btn"

).forEach(btn=>{

btn.addEventListener("click",()=>{

selectedGoal=

btn.dataset.index;

addMoneyModal.style.display="flex";

});

});

}


// ===============================
// Create Goal
// ===============================

saveGoalBtn.addEventListener("click",()=>{

const name=

document.getElementById("goalName")

.value.trim();

const target=

Number(

document.getElementById("goalTarget")

.value

);

if(name===""){

alert("Enter goal name");

return;

}

if(target<=0){

alert("Enter target amount");

return;

}

goals.unshift({

name:name,

target:target,

saved:0

});

saveGoals();

renderGoals();

goalModal.style.display="none";

document.getElementById(

"goalName"

).value="";

document.getElementById(

"goalTarget"

).value="";

});


// ===============================
// First Load
// ===============================

renderGoals();

});
// ===============================
// Add Money To Goal
// ===============================

document
.getElementById("confirmAddMoney")
.addEventListener("click", () => {

    const amount = Number(

        document
        .getElementById("goalAmount")
        .value

    );

    if (amount <= 0) {

        showMessage(
            "Enter a valid amount 💜",
            "error"
        );

        return;

    }

    goals[selectedGoal].saved += amount;

    saveGoals(goals);

    renderGoals();

    addMoneyModal.style.display = "none";

    document
    .getElementById("goalAmount")
    .value = "";

    showMessage(
        "Money added successfully 🎉"
    );

});