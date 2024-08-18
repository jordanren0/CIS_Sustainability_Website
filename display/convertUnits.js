// Get the dropdown element and the container to display the value
const dailyDropdown = document.getElementById('daily-units-dropdown');
const dailyValueContainer = document.getElementById('daily-value-container');

const monthlyDropdown = document.getElementById('monthly-units-dropdown');
const monthlyValueContainer = document.getElementById('monthly-value-container');

const accumulatedDropdown = document.getElementById('accumulated-units-dropdown');
const accumulatedValueContainer = document.getElementById('accumulated-value-container');

// Define the conversion factors for each unit
const conversionFactors = {
    'kWh': 1,
    'lightbulbs-lit': 100, // 1 kWh = 100 lightbulbs lit (LED Lightbulbs)
    'macbooks-charged': 4, // 1 kWh = 4 MacBooks charged (4 full charges of 2020 Macbook Air)
    'wind-turbines spun': 0.046, // 1 kWh = 0.001 wind turbines spun (21.6 kWh per day)
    'homes-powered': 0.03, // 1 kWh = 0.03 households powered (Average yearly usage of 10,800 kWh)
    'teslas-charged': 0.02, // 1 kWh = 0.02 Teslas charged (Tesla Model 3 has 54 kWh battery)
    'airplanes-fueled': 0.000002, // 1 kWh = 0.0000002 planes fueled (10 kWh per liter, 7000 liters per hr, 7 hr flight)
    'power-plants powered': 0.0000001, // 1 kWh = 0.00001 power plants powered (3.5 billion kWh per year)
};

// Read the dailyScrapedVal.txt file and parse the value
fetch('scrape/dailyScrapedVal.txt')
    .then(response => response.text())
    .then(dailyValue => {
        // Check if dailyValue is a valid number
        if (!dailyValue.trim() || isNaN(parseFloat(dailyValue))) {
            console.error('Invalid daily value:', dailyValue);
            dailyValueContainer.innerText = 'Invalid daily value';
            return;
        }

        const dailyValueInKWh = parseFloat(dailyValue);

        // Add an event listener to the dropdown to update the value when selected
        dailyDropdown.addEventListener('change', () => {
            const selectedUnit = dailyDropdown.value;
            let unitName = selectedUnit.replace('-', ' ');
            if (unitName.includes('tesla')) {
                unitName = unitName.replace('tesla', 'Tesla');
            } else if (unitName.includes('macbook')) {
                unitName = unitName.replace('macbook', 'Macbook');
            }

            const convertedValue = dailyValueInKWh * conversionFactors[selectedUnit];
            if (convertedValue < 0.1 || convertedValue > 9999.99) {
                const exponent = Math.floor(Math.log10(convertedValue));
                const scientificNotationValue = convertedValue / Math.pow(10, exponent);
                dailyValueContainer.innerText = `${scientificNotationValue.toFixed(2)} × 10^${exponent} ${unitName}`;
            } else {
                dailyValueContainer.innerText = `${convertedValue.toFixed(2)} ${unitName}`;
            }
        });

        // Update the value initially with the default selected unit
        const defaultUnit = dailyDropdown.value;
        dailyValueContainer.innerText = `${(dailyValueInKWh * conversionFactors[defaultUnit]).toFixed(2)} ${'Macbooks charged'}`;
    });

// Read the monthlyScrapedVal.txt file and parse the value
fetch('scrape/monthlyScrapedVal.txt')
    .then(response => response.text())
    .then(monthlyValue => {
        // Check if dailyValue is a valid number
        if (!monthlyValue.trim() || isNaN(parseFloat(monthlyValue))) {
            console.error('Invalid monthly value:', monthlyValue);
            monthlyValueContainer.innerText = 'Invalid monthly value';
            return;
        }

        const monthlyValueInKWh = parseFloat(monthlyValue);

        // Add an event listener to the dropdown to update the value when selected
        monthlyDropdown.addEventListener('change', () => {
            const selectedUnit = monthlyDropdown.value;
            let unitName = selectedUnit.replace('-', ' ');
            if (unitName.includes('tesla')) {
                unitName = unitName.replace('tesla', 'Tesla');
            } else if (unitName.includes('macbook')) {
                unitName = unitName.replace('macbook', 'Macbook');
            }

            const convertedValue = monthlyValueInKWh * conversionFactors[selectedUnit];

            if (convertedValue < 0.1 || convertedValue > 9999.99) {
                const exponent = Math.floor(Math.log10(convertedValue));
                const scientificNotationValue = convertedValue / Math.pow(10, exponent);
                monthlyValueContainer.innerText = `${scientificNotationValue.toFixed(2)} × 10^${exponent} ${unitName}`;
            } else {
                monthlyValueContainer.innerText = `${convertedValue.toFixed(2)} ${unitName}`;
            }
        });

        // Update the value initially with the default selected unit
        const defaultUnit = monthlyDropdown.value;
        monthlyValueContainer.innerText = `${(monthlyValueInKWh * conversionFactors[defaultUnit]).toFixed(2)} ${defaultUnit.replace('-', ' ')}`;
    });

// Read the accumulatedScrapedVal.txt file and parse the value
fetch('scrape/accumulatedScrapedVal.txt')
    .then(response => response.text())
    .then(accumulatedValue => {
        // Check if dailyValue is a valid number
        if (!accumulatedValue.trim() || isNaN(parseFloat(accumulatedValue))) {
            console.error('Invalid accumulated value:', accumulatedValue);
            monthlyValueContainer.innerText = 'Invalid accumulated value';
            return;
        }

        const accumulatedValueInKWh = parseFloat(accumulatedValue);

        // Add an event listener to the dropdown to update the value when selected
        accumulatedDropdown.addEventListener('change', () => {
            const selectedUnit = accumulatedDropdown.value;
            let unitName = selectedUnit.replace('-', ' ');
            if (unitName.includes('tesla')) {
                unitName = unitName.replace('tesla', 'Tesla');
            } else if (unitName.includes('macbook')) {
                unitName = unitName.replace('macbook', 'Macbook');
            }

            const convertedValue = accumulatedValueInKWh * conversionFactors[selectedUnit];

            if (convertedValue < 0.1 || convertedValue > 9999.99) {
                const exponent = Math.floor(Math.log10(convertedValue));
                const scientificNotationValue = convertedValue / Math.pow(10, exponent);
                accumulatedValueContainer.innerText = `${scientificNotationValue.toFixed(2)} × 10^${exponent} ${unitName}`;
            } else {
                accumulatedValueContainer.innerText = `${convertedValue.toFixed(2)} ${unitName}`;
            }
        });

        // Update the value initially with the default selected unit
        const defaultUnit = accumulatedDropdown.value;
        accumulatedValueContainer.innerText = `${(accumulatedValueInKWh * conversionFactors[defaultUnit]).toFixed(2)} ${'Teslas charged'}`;
    });