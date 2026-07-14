// =====================================
// MELOSAV - AIRTIME & DATA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const airtimeBtn = document.getElementById("airtimeBtn");
    const airtimeModal = document.getElementById("airtimeModal");
    const buyBtn = document.getElementById("buyAirtime");

    const successModal = document.getElementById("airtimeSuccessModal");
    const receiptDetails = document.getElementById("airtimeReceiptDetails");

    const shareBtn = document.getElementById("shareAirtimeReceipt");
    const transactionBtn = document.getElementById("viewAirtimeTransactions");
    const doneBtn = document.getElementById("closeAirtimeReceipt");

    // Open Modal
    airtimeBtn?.addEventListener("click", () => {
        airtimeModal.style.display = "flex";
    });

    // Close Modal
    airtimeModal?.addEventListener("click", (e) => {
        if (e.target === airtimeModal) {
            airtimeModal.style.display = "none";
        }
    });

    // Buy Airtime/Data
    buyBtn?.addEventListener("click", () => {

        const service = document.getElementById("serviceType").value;
        const network = document.getElementById("network").value;
        const phone = document.getElementById("phoneNumber").value.trim();
        const amount = Number(document.getElementById("airtimeAmount").value);

        if (phone.length !== 11) {
            showMessage("Enter a valid phone number", "error");
            return;
        }

        if (amount <= 0) {
            showMessage("Enter a valid amount", "error");
            return;
        }

        // Deduct balance using your existing transfer function
        const success = makeTransfer(
            amount,
            phone,
            network,
            phone
        );

        if (!success) return;

        showMessage("Processing purchase...");

        setTimeout(() => {

            airtimeModal.style.display = "none";

            receiptDetails.innerHTML = `
                <div class="receipt-card">

                    <div class="receipt-icon">✅</div>

                    <h2>Purchase Successful</h2>

                    <div class="receipt-row">
                        <span>Service</span>
                        <strong>${service}</strong>
                    </div>

                    <div class="receipt-row">
                        <span>Network</span>
                        <strong>${network}</strong>
                    </div>

                    <div class="receipt-row">
                        <span>Phone</span>
                        <strong>${phone}</strong>
                    </div>

                    <div class="receipt-row">
                        <span>Amount</span>
                        <strong>₦${amount.toLocaleString()}</strong>
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

            document.getElementById("phoneNumber").value = "";
            document.getElementById("airtimeAmount").value = "";

        }, 1500);

    });

    // Share Receipt
    shareBtn?.addEventListener("click", () => {
        showMessage("Sharing feature coming soon 💜");
    });

    // Recent Transactions
    transactionBtn?.addEventListener("click", () => {
        showMessage("Recent Transactions coming soon 📄");
    });

    // Done
    doneBtn?.addEventListener("click", () => {
        successModal.style.display = "none";
    });

});