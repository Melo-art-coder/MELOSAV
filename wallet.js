// =====================================
// MELOSAV SMART WALLET 💜
// Version 2
// =====================================

let currentWallet = 0;

function initWallet() {

    const slider = document.querySelector(".wallet-slider");

    if (!slider) return;

    const dots = document.querySelectorAll(".wallet-dots span");

    slider.addEventListener("scroll", () => {

        const index = Math.round(
            slider.scrollLeft / slider.clientWidth
        );

        if (index !== currentWallet) {

            currentWallet = index;

            updateWalletDots();

            if ("vibrate" in navigator) {

                navigator.vibrate(10);

            }

        }

    });

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

document.addEventListener("DOMContentLoaded", () => {

    initWallet();

});