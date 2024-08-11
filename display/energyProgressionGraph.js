// Get the small graph element
const graph = document.getElementById('energyProgression');

// Set the graph data
const labels = [
    '2022 Jan - Jun',
    '2022 Jul - Dec',
    '2023 Jan - Jun',
    '2023 Jul - Dec',
    '2024 Jan - Jun',
    '2024 Jul - Dec'
];
const data = [80.05, 72.72, 66.37, 39.90, 13.61, 39.59];

// Create the small graph
new Chart(graph, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Clean Energy Proportion (%)',
            data: data,
            backgroundColor: "#27B149",
            borderColor: "#17E148",
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Clean Energy Proportion (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Year and Months Recorded'
                }
            }
        }
    }
});

// Get the modal and enlarge button elements
const modal = document.getElementById('modal');
const enlargeButton = document.getElementById('enlarge-button');
const closeButton = document.getElementById('close-button');
const largeGraph = document.getElementById('largeEnergyProgression');

// Add event listeners to the buttons
enlargeButton.addEventListener('click', () => {
    console.log("Enlarge pressed")
    modal.style.display = 'block';
    // Create a new graph instance with the same data
    new Chart(largeGraph, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Clean Energy Proportion (%)',
                data: data,
                backgroundColor: "#27B149",
                borderColor: "#17E148",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Clean Energy Proportion (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year and Months Recorded'
                    }
                }
            }
        }
    });
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
