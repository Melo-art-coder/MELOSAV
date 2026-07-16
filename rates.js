// =====================================
// MELOSAV LIVE EXCHANGE RATES
// =====================================

const RATE_API =
"https://open.er-api.com/v6/latest/NGN";

// Get latest rates
async function fetchRates() {

    try {

        const response = await fetch(RATE_API);

        const data = await response.json();

        if (data.result === "success") {

            localStorage.setItem(
                "meloRates",
                JSON.stringify(data)
            );

            return data.rates;

        }

    } catch (error) {

        console.log("Offline. Using saved rates.");

    }

    // Offline fallback
    const saved = JSON.parse(
        localStorage.getItem("meloRates")
    );

    return saved ? saved.rates : null;

}