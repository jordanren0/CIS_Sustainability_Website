// Get all dropdowns and image elements
const dailyUnitsDropdown = document.getElementById('daily-units-dropdown');
const dailyUnitImage = document.getElementById('daily-unit-image');

const monthlyUnitsDropdown = document.getElementById('monthly-units-dropdown');
const monthlyUnitImage = document.getElementById('monthly-unit-image');

const accumulatedUnitsDropdown = document.getElementById('accumulated-units-dropdown');
const accumulatedUnitImage = document.getElementById('accumulated-unit-image');

const imageMap = {
    'lightbulbs-lit': 'images/lightbulb.png',
    'macbooks-charged': 'images/laptop.png',
    'teslas-charged': 'images/tesla.png',
    'homes-powered': 'images/house.png',
    'airplanes-fueled': 'images/plane.png',
    'power-plants powered': 'images/power_plant.png',
    'wind-turbines spun': 'images/wind_turbine.png'
};

dailyUnitsDropdown.addEventListener('change', (e) => {
    const selectedValue = dailyUnitsDropdown.value;

    const imageUrl = imageMap[selectedValue];

    dailyUnitImage.classList.add('fade-out');

    setTimeout(() => {
        dailyUnitImage.src = imageUrl;
        dailyUnitImage.alt = selectedValue;

        dailyUnitImage.classList.remove('fade-out');
        dailyUnitImage.classList.add('fade-in');
        setTimeout(() => {
            dailyUnitImage.classList.remove('fade-in');
        }, 200);
    }, 200);
});

monthlyUnitsDropdown.addEventListener('change', (e) => {
    const selectedValue = monthlyUnitsDropdown.value;

    const imageUrl = imageMap[selectedValue];

    monthlyUnitImage.classList.add('fade-out');

    setTimeout(() => {
        monthlyUnitImage.src = imageUrl;
        monthlyUnitImage.alt = selectedValue;

        monthlyUnitImage.classList.remove('fade-out');
        monthlyUnitImage.classList.add('fade-in');
        setTimeout(() => {
            monthlyUnitImage.classList.remove('fade-in');
        }, 200);
    }, 200);
});

accumulatedUnitsDropdown.addEventListener('change', (e) => {
    const selectedValue = accumulatedUnitsDropdown.value;

    const imageUrl = imageMap[selectedValue];

    accumulatedUnitImage.classList.add('fade-out');

    setTimeout(() => {
        accumulatedUnitImage.src = imageUrl;
        accumulatedUnitImage.alt = selectedValue;

        accumulatedUnitImage.classList.remove('fade-out');
        accumulatedUnitImage.classList.add('fade-in');
        setTimeout(() => {
            accumulatedUnitImage.classList.remove('fade-in');
        }, 200);
    }, 200);
});