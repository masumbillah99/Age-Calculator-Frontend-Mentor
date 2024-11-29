const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const arrowBtn = document.getElementById('arrow-btn');

const yearsOutput = document.getElementById('years-output');
const monthsOutput = document.getElementById('months-output');
const dayOutput = document.getElementById('days-output');

const dayError = document.getElementById('day-err');
const monthError = document.getElementById('month-err');
const yearError = document.getElementById('year-err');

arrowBtn.addEventListener('click', function () {
    // Clear previous error messages
    dayError.innerText = "";
    monthError.innerText = "";
    yearError.innerText = "";

    const dayInput = day.value;
    const monthInput = month.value;
    const yearInput = year.value;

    const date = new Date();

    if (dayInput === "" || monthInput === "" || yearInput === "") {
        if (dayInput === "") dayError.innerText = "This field is require";
        if (monthInput === "") monthError.innerText = "This field is require";
        if (yearInput === "") yearError.innerText = "This field is require";
        return;
    }

    if (dayInput < 1 || dayInput > 31) {
        console.error('Must be a valid day');
        return;
    }

    if (monthInput < 1 || monthInput > 12) {
        dayError.innerText = 'Must be a valid month';
        return;
    }

    if (yearInput > date.getFullYear()) {
        monthError.innerText = 'Must be in the past';
        return;
    }

    // Validate if the date is valid (e.g. 31/04/1991)
    const inputDate = new Date(yearInput, monthInput - 1, dayInput); // month is 0-indexed in JavaScript
    if (inputDate.getDate() !== parseInt(dayInput) || inputDate.getMonth() + 1 !== parseInt(monthInput) || inputDate.getFullYear() !== parseInt(yearInput)) {
        yearError.innerText = `Invalid date, e.g., 31/${monthInput}/${yearInput}`;
        return;
    }

    // If validation passes, calculate the difference in years, months, and days
    const birthDate = new Date(yearInput, monthInput - 1, dayInput);
    let ageInYears = date.getFullYear() - birthDate.getFullYear();
    let ageInMonths = date.getMonth() - birthDate.getMonth();
    let ageInDays = date.getDate() - birthDate.getDate();

    // Adjust for negative months and days
    if (ageInDays < 0) {
        ageInMonths -= 1;
        ageInDays += new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // Get the days in the previous month
    }

    if (ageInMonths < 0) {
        ageInYears -= 1;
        ageInMonths += 12; // Add 12 months if months are negative
    }

    // console.log('logic loading ....');

    dayOutput.innerText = ageInDays;
    monthsOutput.innerText = ageInMonths;
    yearsOutput.innerText = ageInYears;
})

