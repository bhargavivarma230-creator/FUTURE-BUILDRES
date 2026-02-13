let sales = [];

// Load saved data when page opens
window.onload = function () {
    let savedData = localStorage.getItem("salesData");

    if (savedData) {
        sales = JSON.parse(savedData);
        displaySales();
    }
};

document.getElementById("saleForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let amountInput = document.getElementById("amount");
    let error = document.getElementById("error");

    let amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        error.textContent = "Please enter a valid positive amount.";
        return;
    }

    error.textContent = "";

    sales.push(amount);

    localStorage.setItem("salesData", JSON.stringify(sales));

    amountInput.value = "";

    displaySales();
});

function displaySales() {
    let table = document.getElementById("salesTable");

    // Remove old rows
    table.innerHTML = `
        <tr>
            <th>#</th>
            <th>Amount</th>
        </tr>
    `;

    let total = 0;

    sales.forEach((amount, index) => {
        total += amount;

        let row = table.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = "₹" + amount.toFixed(2);
    });

    document.getElementById("total").innerText =
        "Total Sales: ₹" + total.toFixed(2);

    let prediction = sales.length ? total / sales.length : 0;

    document.getElementById("prediction").innerText =
        "Predicted Next Month: ₹" + prediction.toFixed(2);

    giveSuggestion(prediction);
}

function giveSuggestion(prediction) {
    let suggestion = document.getElementById("suggestion");

    if (prediction < 5000) {
        suggestion.innerText =
            "Suggestion: Offer discounts and promotions.";
        suggestion.style.color = "red";
    } else if (prediction < 10000) {
        suggestion.innerText =
            "Suggestion: Increase digital marketing.";
        suggestion.style.color = "orange";
    } else {
        suggestion.innerText =
            "Suggestion: Focus on premium customers.";
        suggestion.style.color = "green";
    }
}
