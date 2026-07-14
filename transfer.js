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


    // OPEN TRANSFER

    if (transferBtn && transferModal) {

        transferBtn.addEventListener("click", () => {

            transferModal.style.display = "flex";

        });

    }



    // CLOSE TRANSFER

    if (transferModal) {

        transferModal.addEventListener("click", (e) => {

            if (e.target === transferModal) {

                transferModal.style.display = "none";

            }

        });

    }




    // CONTINUE BUTTON

    if (continueBtn) {


        continueBtn.addEventListener("click", () => {


            console.log("CONTINUE CLICKED 🔥");



            const bank =
            document.getElementById("transferBank").value;


            const account =
            document.getElementById("accountNumber").value.trim();


            const recipient =
            document.getElementById("recipientName").value.trim();


            const amount =
            Number(document.getElementById("transferAmount").value);



            if(account === ""){

                showMessage(
                    "Enter account number",
                    "error"
                );

                return;

            }



            if(recipient === ""){

                showMessage(
                    "Enter recipient name",
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
                "Processing transfer 💜"
            );



            setTimeout(() => {



                transferModal.style.display = "none";



                if(successModal && receiptDetails){


                    receiptDetails.innerHTML = `

                    <strong>Transfer Successful ✅</strong>
                    <br><br>

                    Amount: ₦${amount.toLocaleString()}
                    <br><br>

                    Recipient: ${recipient}
                    <br><br>

                    Bank: ${bank}
                    <br><br>

                    Account: ${account}
                    <br><br>

                    Date: ${new Date().toLocaleString()}

                    `;



                    successModal.style.display = "flex";


                }



                // Clear form

                document.getElementById("accountNumber").value = "";

                document.getElementById("recipientName").value = "";

                document.getElementById("transferAmount").value = "";

                document.getElementById("transferNarration").value = "";



            },1500);



        });


    }





    // SHARE RECEIPT

    if(shareBtn){

        shareBtn.addEventListener("click",()=>{

            showMessage(
                "Receipt sharing coming soon 💜"
            );

        });

    }





    // RECENT TRANSACTIONS

    if(transactionBtn){

        transactionBtn.addEventListener("click",()=>{

            showMessage(
                "Recent transactions coming soon 📄"
            );

        });

    }



});
if (closeReceiptBtn && successModal) {

    closeReceiptBtn.addEventListener("click", () => {

        successModal.style.display = "none";

    });

}