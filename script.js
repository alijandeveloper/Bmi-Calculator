const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");
const resultDiv = document.getElementById("result");
const historyList = document.getElementById("history");
const themeButton = document.getElementById("theme-button");

calculateButton.addEventListener("click", () => {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    if (!weight || !height || weight <= 0 || height <= 0) {
        resultDiv.textContent = "Please enter valid weight and height";
        return;
    }
    const bmi = (weight / (height * height)).toFixed(2);
    let status = "";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi < 24.9) status = "Normal weight";
    else if (bmi < 29.9) status = "Overweight";
    else status = "Obese";
    resultDiv.textContent = BMI: ${bmi} - ${status};
    saveHistory(bmi, status);
});