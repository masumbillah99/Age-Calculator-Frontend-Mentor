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

/** 
 * understand logic, what / how / another way
 * notedown logic
 * how can I do it
 * fix error styles -- done
 * compatible for all devices (mobile, laptop, tablet)  -- done
 * add animation when submit
*/

const showAnimationInResult = (years, months, days) => {
    // yearsOutput.textContent = years;
    // monthsOutput.textContent = months;
    // dayOutput.textContent = days;

    // add the animation class
    yearsOutput.classList.add('animate');
    monthsOutput.classList.add('animate');
    dayOutput.classList.add('animate');

    // remove the animation class after the animation ends
    setTimeout(() => {
        yearsOutput.classList.remove('animate');
        monthsOutput.classList.remove('animate');
        dayOutput.classList.remove('animate');
    }, 500);
}

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
        if (dayInput === "") dayError.innerText = "This field is required";
        if (monthInput === "") monthError.innerText = "This field is required";
        if (yearInput === "") yearError.innerText = "This field is required";
        return;
    }

    if (dayInput < 1 || dayInput > 31) {
        dayError.innerText = 'Must be a valid day';
        return;
    }

    if (monthInput < 1 || monthInput > 12) {
        monthError.innerText = 'Must be a valid month';
        return;
    }

    if (yearInput > date.getFullYear()) {
        yearError.innerText = 'Must be in the past';
        return;
    }

    // Validate if the date is valid (e.g. 31/04/1991) 
    // month is 0-indexed in JavaScript
    const inputDate = new Date(yearInput, monthInput - 1, dayInput);
    console.log(inputDate);
    if (inputDate.getDate() !== parseInt(dayInput) || inputDate.getMonth() + 1 !== parseInt(monthInput) || inputDate.getFullYear() !== parseInt(yearInput)) {
        yearError.innerText = `Invalid date - ${dayInput}/${monthInput}/${yearInput}`;
        return;
    }

    // If validation passes, calculate the difference
    // get birth date
    // subtract birth date from today
    // subtract year, month, day from today year, month, day
    const birthDate = new Date(yearInput, monthInput - 1, dayInput);
    console.log(inputDate);
    let ageInYears = date.getFullYear() - birthDate.getFullYear();
    let ageInMonths = date.getMonth() - birthDate.getMonth();
    let ageInDays = date.getDate() - birthDate.getDate();

    // Adjust for negative days
    if (ageInDays < 0) {
        ageInMonths -= 1;
        ageInDays += new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        // Get the days in the previous month
        console.log(ageInDays);
    }

    // Adjust for negative months
    if (ageInMonths < 0) {
        ageInYears -= 1;
        ageInMonths += 12;
        // Add 12 months if months are negative
    }

    // console.log('logic loading ....');

    dayOutput.innerText = ageInDays;
    monthsOutput.innerText = ageInMonths;
    yearsOutput.innerText = ageInYears;

    // call the animation function
    showAnimationInResult(ageInYears, ageInMonths, ageInDays);
})
