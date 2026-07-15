// =====================================
// MELOSAV GOALS V2
// Part 1
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

const user=getCurrentUser();

if(!user) return;


// ===============================
// Create Goals Storage
// ===============================

if(!user.data.goals){

user.data.goals=[];

updateUser(user);

}

let goals=user.data.goals;


// ===============================
// Elements
// ===============================

const goalsList=document.getElementById("goalsList");

const goalModal=document.getElementById("goalModal");

const addMoneyModal=document.getElementById("addMoneyModal");

const createGoalBtn=document.getElementById("createGoalBtn");

const saveGoalBtn=document.getElementById("saveGoal");

const confirmAddMoney=document.getElementById("confirmAddMoney");

let selectedGoal=null;


// ===============================
// Save Goals
// ===============================

function saveGoals(){

user.data.goals=goals;

updateUser(user);

}


// ===============================
// Render Goals
// ===============================

function renderGoals(){

goalsList.innerHTML="";

if(goals.length===0){

goalsList.innerHTML=`

<div class="goal-card">

<h2>🎯 No Goals Yet</h2>

<p>

Let's create your first savings goal 💜

</p>

</div>

`;

return;

}

goals.forEach((goal,index)=>{

const percent=Math.min(

(goal.saved/goal.target)*100,

100

);

goalsList.innerHTML+=`

<div class="goal-card">

<div class="goal-top">

<h3>${goal.name}</h3>

<span>${percent.toFixed(0)}%</span>

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
// ===============================
// Open / Close Modals
// ===============================

createGoalBtn.addEventListener("click",()=>{

goalModal.style.display="flex";

});

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
// Create New Goal
// ===============================

saveGoalBtn.addEventListener("click",()=>{

const goalName=document
.getElementById("goalName")
.value
.trim();

const targetAmount=Number(

document
.getElementById("goalTarget")
.value

);

if(goalName===""){

assistantMessage(

"Melo 💜",

"Hmm... what are we saving for? Give your goal a name 😊",

"error"

);

return;

}

if(targetAmount<=0){

assistantMessage(

"Melo 💜",

"Enter a target amount greater than ₦0 so we can start saving 🌱",

"error"

);

return;

}


// Create Goal

goals.unshift({

name:goalName,

target:targetAmount,

saved:0,

createdAt:new Date().toLocaleString()

});


// Save Permanently

saveGoals();


// Refresh Screen

renderGoals();


// Close Modal

goalModal.style.display="none";


// Clear Inputs

document
.getElementById("goalName")
.value="";

document
.getElementById("goalTarget")
.value="";


// Melo 💜

const firstName=(user.fullName||user.name||"Friend").split(" ")[0];

assistantMessage(

"Goal Created 🎯",

`Awesome ${firstName}! Your "${goalName}" goal is ready.

Now let's make it happen one step at a time 🌱`

);

});


// ===============================
// Open Add Money Modal
// ===============================

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("add-money-btn")){

selectedGoal=

Number(

e.target.dataset.index

);

addMoneyModal.style.display="flex";

}

});