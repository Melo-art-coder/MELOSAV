// =====================================
// MELOSAV - TRANSFER SYSTEM
// =====================================
console.log("TRANSFER FILE RUNNING 🔥");
console.log("transfer.js loaded");

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


    // Continue Transfer
    if (continueBtn) {

        continueBtn.addEventListener("click", () => {
console.log("CONTINUE BUTTON CLICKED");
            const bank =
            document.getElementById("transferBank").value;

            const account =
            document.getElementById("accountNumber").value.trim();

            const recipient =
            document.getElementById("recipientName").value.trim();

            const amount =
            Number(document.getElementById("transferAmount").value);


            if (account === "") {

                showMessage(
                    "Enter account number",
                    "error"
                );

                return;

            }


            if (recipient === "") {

                showMessage(
                    "Enter recipient name",
                    "error"
                );

                return;

            }


            if (amount <= 0) {

                showMessage(
                    "Enter a valid amount",
                    "error"
                );

                return;

            }


            showMessage(
                "Processing transfer 💜"
            );


            setTimeout(() => {


                showMessage(
                    `₦${amount.toLocaleString()} sent to ${recipient} via ${bank} ✅`
                );


                transferModal.style.display = "none";


                document.getElementById("accountNumber").value = "";

                document.getElementById("recipientName").value = "";

                document.getElementById("transferAmount").value = "";

                document.getElementById("transferNarration").value = "";


            }, 1500);


        });

    }


});
