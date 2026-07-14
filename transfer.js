// =====================================
// MELOSAV - TRANSFER SYSTEM
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("TRANSFER.JS LOADED 🔥");

    const transferBtn = document.getElementById("transferBtn");
    const transferModal = document.getElementById("transferModal");

    if (!transferBtn) {
        alert("❌ transferBtn not found");
        return;
    }

    if (!transferModal) {
        alert("❌ transferModal not found");
        return;
    }

    transferBtn.addEventListener("click", () => {

        alert("✅ Transfer button clicked");

        transferModal.style.display = "flex";

    });

    transferModal.addEventListener("click", (e) => {

        if (e.target === transferModal) {

            transferModal.style.display = "none";

        }

    });

});