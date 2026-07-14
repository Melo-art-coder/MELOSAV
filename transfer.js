// =====================================
// MELOSAV - TRANSFER SYSTEM
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const transferBtn = document.getElementById("transferBtn");
    const transferModal = document.getElementById("transferModal");
    const continueBtn = document.getElementById("continueTransfer");

    // Open Transfer Modal
    if (transferBtn && transferModal) {

        transferBtn.addEventListener("click", () => {

            transferModal.style.display = "flex";

        });

    }

    // Close Modal
    if (transferModal) {

        transferModal.addEventListener("click", (e) => {

            if (e.target === transferModal) {

                transferModal.style.display = "none";

            }

        });

    }

    // Continue Button
    if (continueBtn) {

        continueBtn.addEventListener("click", () => {

            const bank =
            document.getElementById("transferBank").value;

            const account =
            document.getElementById("accountNumber").value;

            const amount =
            document.getElementById("transferAmount").value;

            if(account.length !== 10){

                showMessage(
                    "Enter a valid 10-digit account number",
                    "error"
                );

                return;

            }

            if(amount <= 0){

                showMessage(
                    "Enter a valid amount",
                    "error"
                );

                return;

            }

            showMessage(
                "Checking account..."
            );

            setTimeout(()=>{

                showMessage(
                    `Account verified at ${bank} 💜`
                );

            },2000);

        });

    }

});