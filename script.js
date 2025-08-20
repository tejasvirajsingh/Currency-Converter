const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

// Populate dropdowns
<<<<<<< HEAD
currencies.forEach((currency) => {
  fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
=======
currencies.forEach(currency => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
>>>>>>> 53c50922f823f33071b035ac5566cfece8469e74
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

<<<<<<< HEAD
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

async function convertCurrency() {
  let amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  let from = fromCurrency.value;
  let to = toCurrency.value;

  try {
    let response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    let data = await response.json();

    if (data && data.rates && data.rates[to]) {
      let converted = data.rates[to].toFixed(2);
      result.innerText = `${amount} ${from} = ${converted} ${to}`;
    } else {
      result.innerText = "Conversion failed. Try again.";
    }
  } catch (error) {
    result.innerText = "⚠️ Error fetching exchange rates.";
  }
=======
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
>>>>>>> 53c50922f823f33071b035ac5566cfece8469e74
}

convertBtn.addEventListener("click", convertCurrency);
