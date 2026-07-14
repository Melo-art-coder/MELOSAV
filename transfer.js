// =====================================
// MELOSAV - TRANSFER SYSTEM
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const transferBtn = document.getElementById("transferBtn");
    const transferModal = document.getElementById("transferModal");
    const continueBtn = document.getElementById("continueTransfer");

    transferBtn?.addEventListener("click", () => {
        transferModal.style.display = "flex";
    });

    transferModal?.addEventListener("click", (e) => {
        if (e.target === transferModal) {
            transferModal.style.display = "none";
        }
    });

    continueBtn?.addEventListener("click", () => {

        const bank = document.getElementById("transferBank").value;
        const account = document.getElementById("accountNumber").value.trim();
        const recipient = document.getElementById("recipientName").value.trim();
        const amount = Number(document.getElementById("transferAmount").value);
        const narration = document.getElementById("transferNarration").value.trim();

        if (account.length !== 10) {
            showMessage("Enter a valid 10-digit account number", "error");
            return;
        }

        if (recipient === "") {
            showMessage("Enter recipient name", "error");
            return;
        }

        if (amount <= 0) {
            showMessage("Enter a valid amount", "error");
            return;
        }

        showMessage("Preparing transfer...");

        setTimeout(() => {

            showMessage(
                `₦${amount.toLocaleString()} sent to ${recipient} (${bank}) 💜`
            );

            transferModal.style.display = "none";

            document.getElementById("accountNumber").value = "";
            document.getElementById("recipientName").value = "";
            document.getElementById("transferAmount").value = "";
            document.getElementById("transferNarration").value = "";

        }, 1200);

    });

});