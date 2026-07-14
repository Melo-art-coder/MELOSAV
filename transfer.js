// =====================================
// MELOSAV - TRANSFER SYSTEM
// =====================================

console.log("TRANSFER FILE RUNNING 🔥");

document.addEventListener("DOMContentLoaded", () => {

    const transferBtn = document.getElementById("transferBtn");
    const transferModal = document.getElementById("transferModal");
    const continueBtn = document.getElementById("continueTransfer");

    const successModal = document.getElementById("successModal");
    const receiptDetails = document.getElementById("receiptDetails");

    const shareBtn = document.getElementById("shareReceipt");
    const transactionBtn = document.getElementById("viewTransactions");
    const closeReceiptBtn = document.getElementById("closeReceipt");

    // Open Transfer
    if (transferBtn) {

        transferBtn.addEventListener("click", () => {

            transferModal.style.display = "flex";

        });

    }

    // Close Transfer Modal
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

            const bank = document.getElementById("transferBank").value;

            const account = document.getElementById("accountNumber").value.trim();

            const recipient = document.getElementById("recipientName").value.trim();

            const amount = Number(document.getElementById("transferAmount").value);

            const narration = document.getElementById("transferNarration").value.trim();

            if (account === "") {

                showMessage("Enter account number", "error");
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

            // Save transfer
            const success = makeTransfer(
                amount,
                recipient,
                bank,
                account
            );

            if (!success) return;

            showMessage("Processing transfer 💜");

            setTimeout(() => {

                transferModal.style.display = "none";

                receiptDetails.innerHTML = `

<div class="receipt-card">

<div class="receipt-icon">✅</div>

<h2>Transfer Successful</h2>

<div class="receipt-row">
<span>Amount</span>
<strong>₦${amount.toLocaleString()}</strong>
</div>

<div class="receipt-row">
<span>Recipient</span>
<strong>${recipient}</strong>
</div>

<div class="receipt-row">
<span>Bank</span>
<strong>${bank}</strong>
</div>

<div class="receipt-row">
<span>Account</span>
<strong>${account}</strong>
</div>

<div class="receipt-row">
<span>Narration</span>
<strong>${narration || "None"}</strong>
</div>

<div class="receipt-row">
<span>Reference</span>
<strong>MLSV${Date.now()}</strong>
</div>

<div class="receipt-row">
<span>Date</span>
<strong>${new Date().toLocaleString()}</strong>
</div>

</div>

`;

                successModal.style.display = "flex";

                document.getElementById("accountNumber").value = "";
                document.getElementById("recipientName").value = "";
                document.getElementById("transferAmount").value = "";
                document.getElementById("transferNarration").value = "";

            }, 1200);

        });

    }

    // Share Receipt
    if (shareBtn) {

        shareBtn.addEventListener("click", () => {

            showMessage("Receipt sharing coming soon 💜");

        });

    }

    // Recent Transactions
    if (transactionBtn) {

        transactionBtn.addEventListener("click", () => {

            showMessage("Recent Transactions page coming soon 📄");

        });

    }

    // Close Receipt
    if (closeReceiptBtn) {

        closeReceiptBtn.addEventListener("click", () => {

            successModal.style.display = "none";

        });

    }

});