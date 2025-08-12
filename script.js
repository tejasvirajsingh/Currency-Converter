const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

// Populate dropdowns
currencies.forEach(currency => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    if (!amount) {
        alert("Please enter an amount");
        return;
    }

    let from = fromCurrency.value;
    let to = toCurrency.value;

    try {
        // Fetch rates for the "from" currency
        let response = await fetch(`https://api.exchangerate.host/latest?base=${from}`);
        let data = await response.json();

        if (data && data.rates && data.rates[to]) {
            let rate = data.rates[to];
            let converted = (amount * rate).toFixed(2);
            result.innerText = `${amount} ${from} = ${converted} ${to}`;
        } else {
            result.innerText = "Conversion failed. Try again.";
        }
    } catch (error) {
        result.innerText = "Error fetching exchange rates.";
    }
}

convertBtn.addEventListener("click", convertCurrency);
