function resetButton() {

    console.log("Reset button clicked!");
    const dailyOutputElement = document.getElementById('daily-output');
    const dailyOutputValue = '{{dailyOutput}}'; // Update this value dynamically
    const template = Handlebars.compile(document.getElementById('daily-output').innerHTML);
    dailyOutputElement.innerHTML = template({ dailyOutput: dailyOutputValue });
    console.log("Daily output changed");
}

resetButton()

/*
console.log("Reset button clicked!");
const dailyOutputElement = document.getElementById('daily-output');
console.log(dailyOutputElement); // Should log the <h1> element
dailyOutputElement.textContent = '{{dailyOutput}}';
*/