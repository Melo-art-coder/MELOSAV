// =====================================
// MELOSAV SMART WALLET 💜
// =====================================

let currentWallet = 0;

async function updateWalletBalances() {

    const user = getCurrentUser();

    if (!user) return;

    const income = user.data.income.reduce(
        (sum, item) => sum + Number(item.amount || 0), 0
    );

    const expenses = user.data.expenses.reduce(
        (sum, item) => sum + Number(item.amount || 0), 0
    );

    const savings = user.data.savings.reduce(
        (sum, item) => sum + Number(item.amount || 0), 0
    );

    const balance = income - expenses - savings;

    const rates = await fetchRates();

    if (!rates) return;

    document.getElementById("usdBalance").textContent =
        "$" + (balance * rates.USD).toFixed(2);

    document.getElementById("eurBalance").textContent =
        "€" + (balance * rates.EUR).toFixed(2);

    document.getElementById("gbpBalance").textContent =
        "£" + (balance * rates.GBP).toFixed(2);

    document.getElementById("fcfaBalance").textContent =
        (balance * rates.XOF).toLocaleString() + " FCFA";

}

function updateWalletDots() {

    const dots = document.querySelectorAll(".wallet-dots span");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentWallet
        );

    });

}

function initWallet() {

    const slider = document.querySelector(".wallet-slider");

    if (!slider) return;

    slider.addEventListener("scroll", () => {

        currentWallet = Math.round(
            slider.scrollLeft / slider.clientWidth
        );

        updateWalletDots();

    });

}

document.addEventListener("DOMContentLoaded", () => {

    initWallet();

    updateWalletBalances();

});