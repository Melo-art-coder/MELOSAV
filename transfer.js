// =====================================
// MELOSAV - TRANSFER SYSTEM
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const transferBtn = document.getElementById("transferBtn");
    const transferModal = document.getElementById("transferModal");
    const continueBtn = document.getElementById("continueTransfer");

    if (transferBtn) {

        transferBtn.addEventListener("click", () => {

            transferModal.style.display = "flex";

        });

    }

    if (transferModal) {

        transferModal.addEventListener("click", (e) => {

            if (e.target === transferModal) {

                transferModal.style.display = "none";

            }

        });

    }

    if (continueBtn) {

    continueBtn.addEventListener("click", () => {

        console.log("Continue clicked");

        const bank = document.getElementById("transferBank");
        const account = document.getElementById("accountNumber");
        const amount = document.getElementById("transferAmount");

        if (!bank || !account || !amount) {

            showMessage("Transfer form not found ❌", "error");
            return;

        }

        showMessage("Continue button clicked 💜");

    });

}