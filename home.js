// =====================================
// MELOSAV HOME V5
// Dashboard Engine
// =====================================

// Current User
function currentUser(){

    return getCurrentUser();

}

// Greeting
function getGreeting(name){

    const hour = new Date().getHours();

    if(hour < 12){

        return `Good Morning, ${name} ☀️`;

    }

    if(hour < 18){

        return `Good Afternoon, ${name} 💜`;

    }

    return `Good Evening, ${name} 🌙`;

}

// Welcome
function loadWelcome(){

    const user = currentUser();

    if(!user) return;

    const welcome = document.getElementById("welcomeMessage");

    if(welcome){

        welcome.textContent = getGreeting(user.name);

    }

}

// Dashboard
async function updateDashboard(){

    const user = currentUser();

    if(!user) return;

    const income =
        user.data.income.reduce(
            (t,i)=>t+Number(i.amount||0),0
        );

    const expenses =
        user.data.expenses.reduce(
            (t,i)=>t+Number(i.amount||0),0
        );

    const savings =
        user.data.savings.reduce(
            (t,i)=>t+Number(i.amount||0),0
        );

    const balance =
        income-expenses-savings;

    document.getElementById("balance").textContent =
        "₦"+balance.toLocaleString();

    document.getElementById("incomeAmount").textContent =
        "₦"+income.toLocaleString();

    document.getElementById("savingAmount").textContent =
        "₦"+savings.toLocaleString();

    // Wallet currencies

    if(typeof fetchRates==="function"){

        const rates=await fetchRates();

        if(rates){

            document.getElementById("usdBalance").textContent =
                "$"+(balance*rates.USD).toFixed(2);

            document.getElementById("eurBalance").textContent =
                "€"+(balance*rates.EUR).toFixed(2);

            document.getElementById("gbpBalance").textContent =
                "£"+(balance*rates.GBP).toFixed(2);

            document.getElementById("fcfaBalance").textContent =
                (balance*rates.XOF).toLocaleString()+" FCFA";

        }

    }

}
// =====================================
// DAILY STREAK
// =====================================

function updateDailyStreak(){

    const user=currentUser();

    if(!user) return;

    if(!user.data.streak){

        user.data.streak={

            count:1,

            lastActive:new Date().toDateString()

        };

    }

    const today=new Date().toDateString();

    if(user.data.streak.lastActive!==today){

        const yesterday=new Date();

        yesterday.setDate(
            yesterday.getDate()-1
        );

        if(user.data.streak.lastActive===yesterday.toDateString()){

            user.data.streak.count++;

        }else{

            user.data.streak.count=1;

        }

        user.data.streak.lastActive=today;

        updateUser(user);

    }

    const streak=document.getElementById("streakText");

    if(streak){

        streak.textContent=
            `🔥 Day ${user.data.streak.count} • Keep going!`;

    }

}
// =====================================
// MELOSAV HOME V5
// BUTTONS & MODALS
// =====================================

// ---------- Add Transaction ----------

function initTransactionModal(){

    const addBtn=document.getElementById("addBtn");
    const modal=document.getElementById("transactionModal");
    const saveBtn=document.getElementById("saveTransaction");

    if(addBtn && modal){

        addBtn.onclick=()=>{

            modal.style.display="flex";

        };

    }

    if(modal){

        modal.onclick=(e)=>{

            if(e.target===modal){

                modal.style.display="none";

            }

        };

    }

    if(saveBtn){

        saveBtn.onclick=()=>{

            const type=
                document.getElementById("transactionType").value;

            const amount=
                Number(document.getElementById("amount").value);

            const description=
                document.getElementById("description").value;

            if(amount<=0){

                showMessage(
                    "Enter a valid amount",
                    "error"
                );

                return;

            }

            addMoney(type,amount,description);

            updateDashboard();

            document.getElementById("amount").value="";
            document.getElementById("description").value="";

            modal.style.display="none";

        };

    }

}

// ---------- Transfer ----------

function initTransfer(){

    const btn=document.getElementById("transferBtn");
    const modal=document.getElementById("transferModal");

    if(btn && modal){

        btn.onclick=()=>{

            modal.style.display="flex";

        };

        modal.onclick=(e)=>{

            if(e.target===modal){

                modal.style.display="none";

            }

        };

    }

}

// ---------- Airtime ----------

function initAirtime(){

    const btn=document.getElementById("airtimeBtn");
    const modal=document.getElementById("airtimeModal");

    if(btn && modal){

        btn.onclick=()=>{

            modal.style.display="flex";

        };

        modal.onclick=(e)=>{

            if(e.target===modal){

                modal.style.display="none";

            }

        };

    }

}

// ---------- Betting ----------

function initBetting(){

    const btn=document.getElementById("bettingBtn");

    if(!btn) return;

    btn.onclick=()=>{

        showMessage(
            "🚧 Betting is coming soon!",
            "warning"
        );

    };

}

// ---------- Savings ----------

function initSavings(){

    const btn=document.getElementById("savingBtn");

    if(!btn) return;

    btn.onclick=()=>{

        window.location.href="goals.html";

    };

}