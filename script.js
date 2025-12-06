const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

// Currency symbol 
const currencySymbols = {
    USD: "💵 $",
    INR: "💰 ₹",
    EUR: "💶 €",
    GBP: "💷 £",
    JPY: "💴 ¥",
    AUD: "🪙 A$",
    CAD: "💹 C$"
};

// Populate dropdowns are
currencies.forEach(currency => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

// 🔹 Prevent same currency selection
function preventSameCurrency() {
    for (let option of toCurrency.options) {
        option.disabled = option.value === fromCurrency.value;
    }
    for (let option of fromCurrency.options) {
        option.disabled = option.value === toCurrency.value;
    }
}

// Run once at start
preventSameCurrency();

// Run whenever selection changes
fromCurrency.addEventListener("change", preventSameCurrency);
toCurrency.addEventListener("change", preventSameCurrency);

// 🔄 Swap currencies
document.getElementById("swapBtn").addEventListener("click", () => {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    // Re-run same-currency prevention
    preventSameCurrency();

    // 🔹 Auto convert after swap
    convertCurrency();
});

async function convertCurrency() {
    let amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    let from = fromCurrency.value;
    let to = toCurrency.value;

    try {
        let response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
        let data = await response.json();

        if (data && data.rates && data.rates[to]) {
            let converted = data.rates[to].toFixed(2);

            // ✅ Show with currency symbols & emojis
            result.innerHTML = `
                ${currencySymbols[from]} ${amount} ${from} = ${currencySymbols[to]} ${converted} ${to}
            `;
        } else {
            result.innerText = "Conversion failed. Try again.";
        }
    } catch (error) {
        result.innerText = "⚠️ Error fetching exchange rates.";
    }
}

convertBtn.addEventListener("click", convertCurrency);
