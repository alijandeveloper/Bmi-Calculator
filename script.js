const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("history");
const themeButton = document.getElementById("theme-button");

// BMI Calculation
calculateButton.addEventListener("click", () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        resultDiv.textContent = "⚠️ Please enter valid weight and height!";
        resultDiv.style.color = "red";
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let status = "";

    if (bmi < 18.5) status = "Underweight 🟡";
    else if (bmi < 24.9) status = "Normal weight 🟢";
    else if (bmi < 29.9) status = "Overweight 🟠";
    else status = "Obese 🔴";

    resultDiv.innerHTML = `<strong>BMI:</strong> ${bmi} - <strong>${status}</strong>`;
    resultDiv.style.color = "white";

    saveHistory(bmi, status);
});

// Reset Button
resetButton.addEventListener("click", () => {
    weightInput.value = "";
    heightInput.value = "";
    resultDiv.textContent = "";
    historyList.innerHTML = "";
    localStorage.removeItem("bmiHistory");
});

// Theme Toggle
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeButton.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Save History to Local Storage
function saveHistory(bmi, status) {
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    history.push({ bmi, status });

    localStorage.setItem("bmiHistory", JSON.stringify(history));

    updateHistoryUI();
}

// Load History on Page Load
document.addEventListener("DOMContentLoaded", () => {
    updateHistoryUI();
});

// Update History UI
function updateHistoryUI() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];

    history.forEach(({ bmi, status }) => {
        const entry = document.createElement("li");
        entry.innerHTML = `<strong>BMI:</strong> ${bmi} - <strong>${status}</strong>`;
        historyList.appendChild(entry);
    });
}
