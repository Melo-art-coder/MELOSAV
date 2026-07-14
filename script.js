// =====================================
// MELOSAVE V2
// PART 1: CORE SYSTEM
// =====================================


// ================================
// STORAGE FUNCTIONS
// ================================


function getUsers(){

    return JSON.parse(
        localStorage.getItem("meloUsers")
    ) || [];

}



function saveUsers(users){

    localStorage.setItem(
        "meloUsers",
        JSON.stringify(users)
    );

}



function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem("meloCurrentUser")
    ) || null;

}



function saveCurrentUser(user){

    localStorage.setItem(
        "meloCurrentUser",
        JSON.stringify(user)
    );

}



function logoutUser(){

    localStorage.removeItem(
        "meloCurrentUser"
    );

    window.location.href = "login.html";

}





// ================================
// DEFAULT USER DATA
// ================================


function createDefaultData(){

    return {

        balance: 0,

        income: [],

        expenses: [],

        savings: [],

        transactions: [],

        dailyBudget: 0

    };

}





// ================================
// NOTIFICATION SYSTEM
// ================================


function showMessage(message,type="success"){


    const notification =
    document.createElement("div");


    notification.className =
    `message ${type}`;


    notification.textContent =
    message;



    document.body.appendChild(
        notification
    );



    setTimeout(()=>{

        notification.remove();

    },3000);


}







// ================================
// THEME SYSTEM
// ================================

const themeButton =
document.getElementById("themeToggle");

function loadTheme(){

    const theme =
    localStorage.getItem("meloTheme");

    const modeIcon =
    document.getElementById("modeIcon");

    if(theme === "dark"){

        document.body.classList.add("dark-mode");

        if(modeIcon){
            modeIcon.textContent = "🌙";
        }

    }else{

        document.body.classList.remove("dark-mode");

        if(modeIcon){
            modeIcon.textContent = "☀️";
        }

    }

}

function toggleTheme(){

    document.body.classList.toggle("dark-mode");

    const mode =
    document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";

    localStorage.setItem("meloTheme", mode);

    const modeIcon =
    document.getElementById("modeIcon");

    if(modeIcon){
        modeIcon.textContent =
        mode === "dark" ? "🌙" : "☀️";
    }

}

if(themeButton){

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}

loadTheme();


// ================================
// GREETING SYSTEM
// ================================


function getGreeting(name){


    const hour =
    new Date().getHours();



    if(hour < 12){

        return `Good morning, ${name} ☀️`;

    }


    else if(hour < 18){

        return `Good afternoon, ${name} 💜`;

    }


    else{

        return `Good evening, ${name} 🌙`;

    }


}





// ================================
// APP START
// ================================


document.addEventListener(
"DOMContentLoaded",
()=>{

    console.log(
        "MeloSave V2 Loaded 🚀"
    );

});
// =====================================
// MELOSAVE V2
// PART 2: SIGNUP SYSTEM
// =====================================


// ================================
// CREATE ACCOUNT
// ================================


function createAccount(
    name,
    email,
    gender,
    pin
){


    name = name.trim();

    email = email.trim().toLowerCase();

    pin = pin.trim();



    // Check empty fields

    if(
        name === "" ||
        email === "" ||
        gender === "" ||
        pin === ""
    ){

        showMessage(
            "Please fill all fields",
            "error"
        );

        return false;

    }





    // Get users

    let users = getUsers();





    // Check duplicate email

    const existingUser =
    users.find(
        user =>
        user.email === email
    );



    if(existingUser){


        showMessage(
            "Email already exists",
            "error"
        );


        return false;

    }







    // Create new user


    const newUser = {


        id: Date.now(),


        name: name,


        email: email,


        gender: gender,


        pin: pin,



        data:
        createDefaultData()


    };








    // Save user


    users.push(newUser);


    saveUsers(users);





    // Login user automatically


    saveCurrentUser(
        newUser
    );






    showMessage(
        `Thank you for choosing MeloSave, ${name} 💜`
    );



    return true;


}









// ================================
// SIGNUP FORM CONNECTION
// ================================


const signupForm =
document.getElementById(
    "signupForm"
);



if(signupForm){



signupForm.addEventListener(
"submit",
function(e){


    e.preventDefault();




    const name =
    document.getElementById(
        "signupName"
    ).value;





    const email =
    document.getElementById(
        "signupEmail"
    ).value;





    const gender =
    document.getElementById(
        "signupGender"
    ).value;





    const pin =
    document.getElementById(
        "signupPin"
    ).value;








    const created =
    createAccount(
        name,
        email,
        gender,
        pin
    );






    if(created){


        setTimeout(()=>{


            window.location.href = "home.html";

        },1500);


    }



});


}
// =====================================
// MELOSAVE V2
// PART 3: LOGIN + LOGOUT + SWITCH ACCOUNT
// =====================================



// ================================
// LOGIN SYSTEM
// ================================


function loginUser(email, pin){


    email = email.trim().toLowerCase();

    pin = pin.trim();



    const users = getUsers();



    const user = users.find(
        account =>
        account.email === email
    );





    if(!user){


        showMessage(
            "Account not found",
            "error"
        );


        return false;

    }






    if(user.pin !== pin){


        showMessage(
            "Incorrect PIN. Try again",
            "error"
        );


        return false;

    }







    saveCurrentUser(user);





    showMessage(
        `Welcome back, ${user.name} 💜`
    );





    return true;



}









// ================================
// LOGIN FORM CONNECTION
// ================================


const loginForm =
document.getElementById(
    "loginForm"
);





if(loginForm){


loginForm.addEventListener(
"submit",
function(e){


    e.preventDefault();




    const email =
    document.getElementById(
        "loginEmail"
    ).value;





    const pin =
    document.getElementById(
        "loginPin"
    ).value;






    const loggedIn =
    loginUser(
        email,
        pin
    );






    if(loggedIn){

    setTimeout(()=>{

        window.location.href =
        "home.html";

    },1500);

    }



});


}









// ================================
// LOGOUT BUTTON
// ================================


const logoutButton =
document.getElementById(
    "logoutBtn"
);





if(logoutButton){


logoutButton.addEventListener(
"click",
()=>{


    logoutUser();


});


}









// ================================
// SWITCH ACCOUNT
// ================================


function switchAccount(email){


    const users =
    getUsers();




    const user =
    users.find(
        account =>
        account.email === email
    );






    if(!user){


        showMessage(
            "Account not found",
            "error"
        );


        return false;


    }







    saveCurrentUser(user);




    showMessage(
        `Switched to ${user.name}'s account 💜`
    );



    return true;



}
// =====================================
// MELOSAVE V2
// PART 4: DASHBOARD SYSTEM
// =====================================



// ================================
// UPDATE CURRENT USER DATA
// ================================


function updateUser(updatedUser){


    let users = getUsers();



    users = users.map(user => {


        if(user.id === updatedUser.id){

            return updatedUser;

        }


        return user;


    });




    saveUsers(users);


    saveCurrentUser(updatedUser);


}









// ================================
// SHOW USER GREETING
// ================================


function loadDashboardUser(){


    const user =
    getCurrentUser();




    if(!user){

        return;

    }






    const greeting =
    document.getElementById(
        "welcomeMessage"
    );





    if(greeting){

        greeting.textContent =
        getGreeting(user.name);

    }




}









// ================================
// UPDATE DASHBOARD NUMBERS
// ================================


function updateDashboard(){


    const user =
    getCurrentUser();




    if(!user){

        return;

    }





    const data =
    user.data;





    let totalIncome =
    data.income.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );





    let totalExpense =
    data.expenses.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );





    let totalSavings =
    data.savings.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );






    const balance =
    totalIncome - totalExpense - totalSavings;






    const balanceBox =
    document.getElementById(
        "balance"
    );



    const incomeBox =
    document.getElementById(
        "incomeAmount"
    );



    const expenseBox =
    document.getElementById(
        "expenseAmount"
    );



    const savingBox =
    document.getElementById(
        "savingAmount"
    );






    if(balanceBox)
    balanceBox.textContent =
    `₦${balance.toLocaleString()}`;




    if(incomeBox)
    incomeBox.textContent =
    `₦${totalIncome.toLocaleString()}`;




    if(expenseBox)
    expenseBox.textContent =
    `₦${totalExpense.toLocaleString()}`;




    if(savingBox)
    savingBox.textContent =
    `₦${totalSavings.toLocaleString()}`;



}









// ================================
// ADD MONEY FUNCTION
// ================================


function addMoney(type, amount){



    const user =
    getCurrentUser();





    if(!user){

        return;

    }





    amount =
    Number(amount);





    if(amount <= 0){

        showMessage(
            "Enter a valid amount",
            "error"
        );

        return;

    }








    const record = {


        amount: amount,


        date:
        new Date().toLocaleString()


    };






    if(type === "income"){


        user.data.income.push(record);


    }





    if(type === "expense"){


        user.data.expenses.push(record);


    }






    if(type === "saving"){


        user.data.savings.push(record);


    }





    user.data.transactions.unshift({

        type:type,

        amount:amount,

        date:
        record.date

    });







    updateUser(user);



    updateDashboard();




    showMessage(
        `${type} added successfully 💜`
    );


}









// ================================
// FORM CONNECTIONS
// ================================



const incomeForm =
document.getElementById(
    "incomeForm"
);



if(incomeForm){


incomeForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const amount =
document.getElementById(
"incomeInput"
).value;




addMoney(
"income",
amount
);



incomeForm.reset();


});


}







const expenseForm =
document.getElementById(
"expenseForm"
);



if(expenseForm){


expenseForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const amount =
document.getElementById(
"expenseInput"
).value;




addMoney(
"expense",
amount
);



expenseForm.reset();



});


}








const savingForm =
document.getElementById(
"savingForm"
);



if(savingForm){


savingForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const amount =
document.getElementById(
"savingInput"
).value;




addMoney(
"saving",
amount
);



savingForm.reset();



});


}









// LOAD DASHBOARD


document.addEventListener(
"DOMContentLoaded",
()=>{


loadDashboardUser();


updateDashboard();


});
// =====================================
// MELOSAVE V2
// PART 5: TRANSACTIONS + DAILY BUDGET
// =====================================



// ================================
// DISPLAY TRANSACTIONS
// ================================


function loadTransactions(){


    const list =
    document.getElementById(
        "transactionList"
    );



    if(!list){

        return;

    }





    const user =
    getCurrentUser();





    if(!user){

        return;

    }





    const transactions =
    user.data.transactions;





    list.innerHTML = "";






    if(transactions.length === 0){


        list.innerHTML =
        "<li>No transactions yet</li>";


        return;

    }








    transactions.slice(0,5)
    .forEach(transaction => {



        const item =
        document.createElement(
            "li"
        );



        let icon = "💜";



        if(transaction.type === "income"){

            icon = "💰";

        }


        if(transaction.type === "expense"){

            icon = "💸";

        }


        if(transaction.type === "saving"){

            icon = "🏦";

        }





        item.innerHTML = `

        ${icon}
        ${transaction.type.toUpperCase()}

        - ₦${transaction.amount.toLocaleString()}

        <br>

        <small>
        ${transaction.date}
        </small>

        `;





        list.appendChild(item);



    });



}









// ================================
// DAILY BUDGET
// ================================



function saveBudget(amount){


    const user =
    getCurrentUser();





    if(!user){

        return;

    }





    amount =
    Number(amount);





    if(amount <= 0){


        showMessage(
            "Enter a valid budget",
            "error"
        );


        return;

    }







    user.data.dailyBudget =
    amount;






    updateUser(user);





    showMessage(
        "Daily budget saved 🎯"
    );





    updateBudgetStatus();



}









// ================================
// BUDGET STATUS
// ================================


function updateBudgetStatus(){



    const status =
    document.getElementById(
        "budgetStatus"
    );





    if(!status){

        return;

    }






    const user =
    getCurrentUser();





    if(!user){

        return;

    }







    const budget =
    user.data.dailyBudget;






    const todayExpenses =
    user.data.expenses
    .filter(item=>{


        return new Date(item.date)
        .toDateString()
        ===
        new Date()
        .toDateString();


    })
    .reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );







    const remaining =
    budget - todayExpenses;







    if(budget === 0){


        status.textContent =
        "Budget: Not set";


        return;

    }






    status.textContent =

    `Remaining today: ₦${Math.max(
        remaining,
        0
    ).toLocaleString()}`;








    if(remaining <= 0){


        showMessage(
            "You have reached your daily budget limit ⚠️",
            "error"
        );


    }



    else if(remaining < budget * 0.2){


        showMessage(
            "Careful! Your budget is almost finished ⚠️",
            "warning"
        );


    }



}









// ================================
// BUDGET FORM
// ================================



const budgetForm =
document.getElementById(
    "budgetForm"
);





if(budgetForm){


budgetForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();




const amount =
document.getElementById(
"budgetInput"
).value;





saveBudget(amount);





budgetForm.reset();



});


}









// ================================
// LOAD TRANSACTIONS
// ================================



document.addEventListener(
"DOMContentLoaded",
()=>{


loadTransactions();


updateBudgetStatus();


});
// =====================================
// MELOSAVE V2
// PART 6: PROFILE + FINAL TOUCHES
// =====================================



// ================================
// LOAD PROFILE
// ================================


function loadProfile(){


    const user =
    getCurrentUser();



    if(!user){

        return;

    }





    const name =
    document.getElementById(
        "profileName"
    );


    const email =
    document.getElementById(
        "profileEmail"
    );


    const gender =
    document.getElementById(
        "profileGender"
    );


    const avatar =
    document.getElementById(
        "userAvatar"
    );





    if(name){

        name.textContent =
        user.name;

    }





    if(email){

        email.textContent =
        user.email;

    }






    if(gender){

        gender.textContent =
        user.gender
        .toUpperCase();

    }







    // Avatar colour


    if(avatar){


        avatar.classList.remove(
            "male",
            "female"
        );



        if(user.gender === "male"){


            avatar.classList.add(
                "male"
            );


            avatar.textContent =
            "👨";

        }




        else{


            avatar.classList.add(
                "female"
            );


            avatar.textContent =
            "👩";


        }


    }





    loadProfileStats(user);



}









// ================================
// PROFILE STATISTICS
// ================================


function loadProfileStats(user){



    let savings =
    user.data.savings.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );





    let income =
    user.data.income.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );





    let expenses =
    user.data.expenses.reduce(
        (sum,item)=>
        sum + item.amount,
        0
    );





    let balance =
    income - expenses - savings;







    const balanceBox =
    document.getElementById(
        "profileBalance"
    );



    const savingBox =
    document.getElementById(
        "profileSavings"
    );



    const budgetBox =
    document.getElementById(
        "profileBudget"
    );







    if(balanceBox){

        balanceBox.textContent =
        `₦${balance.toLocaleString()}`;

    }





    if(savingBox){

        savingBox.textContent =
        `₦${savings.toLocaleString()}`;

    }





    if(budgetBox){

        budgetBox.textContent =
        `₦${user.data.dailyBudget.toLocaleString()}`;

    }



}









// ================================
// WELCOME MESSAGE FOR NEW USERS
// ================================


function firstWelcome(){



    const user =
    getCurrentUser();




    if(!user){

        return;

    }





    if(!localStorage.getItem("meloWelcome")){


        showMessage(
            `Thank you for choosing MeloSave, ${user.name} 💜`
        );


        localStorage.setItem(
            "meloWelcome",
            "true"
        );


    }



}









// ================================
// LOAD EVERYTHING
// ================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadProfile();


    firstWelcome();


});
