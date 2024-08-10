/*
Available data:
Actual photovoltaic (PV) solar energy generation
Performance ratio percentage --> used to evaluate efficiency and productivity of solar power system

(Take average PV plant performance and PR% for the given time period)

Step 1: Calculate the Theoretical Maximum PV Energy Generation
Theoretical Maximum PV Energy = Actual PV Energy / PR%
(Representing the total potential energy the PV plant could generate under ideal conditions)

Step 2: Calculate the Unclean Energy Generation
Unclean Energy Generation = Theoretical Maximum PV Energy - Actual PV Energy
(Representing any energy generation that is not from the clean solar PV source)

Step 3: Calculate the Clean Energy Percentage
Clean energy % = (Actual PV Energy / Theoretical Maximum PV Energy) x 100

Step 4: Calculate the Unclean Energy Percentage
Unclean energy % = 100% - Clean Energy %
 */

const energyData = {
    // Actual PV = 1042.99
    // PR% = 0.39585
    // Theoretical Max = 2624.811166
    "2024 Jul to Dec": { clean: 39.59, unclean: 60.41 },

    // Actual PV = 375.206667
    // PR% = 0.136083
    // Theoretical Max = 2757.1831
    "2024 Jan to Jun": { clean: 13.61, unclean: 86.39 },

    // Actual PV = 1401.726667
    // PR% = 0.39895
    // Theoretical Max = 3513.539709
    "2023 Jul to Dec": { clean: 39.90, unclean: 60.10 },

    // Actual PV = 2005.848333
    // PR% = 0.66372
    // Theoretical Max = 3022.145493
    "2023 Jan to Jun": { clean: 66.37, unclean: 33.63 },

    // Actual PV = 1494.873333
    // PR% = 0.727233
    // Theoretical Max = 2055.562176
    "2022 Jul to Dec": { clean: 72.72, unclean: 27.28},

    // Actual PV = 2556.204
    // PR% = 0.80048
    // Theoretical Max = 3193.338997
    "2022 Jan to Jun": { clean: 80.05, unclean: 19.95 },

    /*
    Looks to be decreasing over time, which can be explained due to the fact that the performance ratio (PR%)
    has decreased over time.
    This indicates a decline in the system's overall efficiency, potentially due to factors like aging
    components, increased soiling (accumulated dirt/dust on solar panels), or other maintenance issues.
     */
}

let diagramCanvas;
let chart;

document.addEventListener("DOMContentLoaded", function() {
    console.log("Created Diagram");
    diagramCanvas = document.getElementById("diagram-canvas");

    createDiagram("2024 Jul to Dec"); // Call createDiagram with a default year

    document.getElementById("dropdown-battery").addEventListener("change", function() {
        const selectedYear = this.value;
        if (chart) {
            chart.destroy();
        }
        createDiagram(selectedYear);
    });
});

function createDiagram(year) {
    const data = energyData[year];
    chart = new Chart(diagramCanvas, {
        type: "doughnut",
        data: {
            labels: ["Clean Energy", "Unclean Energy"],
            datasets: [{
                data: [data.clean, data.unclean],
                backgroundColor: ["#32CD32", "#FF0000"],
                //borderColor: ["#32CD32", "#FF0000"],
                //borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: `Energy Proportion ${year}`
            },
            legend: {
                position: "bottom"
            },
            rotation: 180,
            animation: {
                numbers: {},
                colors: {
                    type: "color",
                    duration: 2000,
                    from: "transparent",
                }
            },
        }
    });
}