// =====================================
// MELOSAV - AIRTIME & DATA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const airtimeBtn = document.getElementById("airtimeBtn");
    const airtimeModal = document.getElementById("airtimeModal");
    const buyBtn = document.getElementById("buyAirtime");

    // Open Modal
    if (airtimeBtn) {

        airtimeBtn.addEventListener("click", () => {

            airtimeModal.style.display = "flex";

        });

    }

    // Close Modal
    if (airtimeModal) {

        airtimeModal.addEventListener("click", (e) => {

            if (e.target === airtimeModal) {

                airtimeModal.style.display = "none";

            }

        });

    }

    // Buy Airtime/Data
    if (buyBtn) {

        buyBtn.addEventListener("click", () => {

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

            const success = makeTransfer(
                amount,
                phone,
                network,
                phone
            );

            if (!success) return;

            showMessage("Processing purchase...");

            setTimeout(() => {

                showMessage(
                    `${service === "airtime" ? "Airtime" : "Data"} purchased successfully 💜`
                );

                airtimeModal.style.display = "none";

                document.getElementById("phoneNumber").value = "";
                document.getElementById("airtimeAmount").value = "";

            }, 1500);

        });

    }

});