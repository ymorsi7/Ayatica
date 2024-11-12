// Sample data loading and initialization
d3.json("https://raw.githubusercontent.com/ymorsi7/ExplorableExplanation/refs/heads/main/data/hadith.json").then(data => {
    renderTreemap(data, "bukhari-treemap", "bukhari-details-content");
    renderTreemap(data, "muslim-treemap", "muslim-details-content");
});

function renderTreemap(data, containerId, detailsId) {
    const width = 800, height = 600;
    const svg = d3.select(`#${containerId}`).append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("border-radius", "8px");

    const root = d3.hierarchy(data).sum(d => d.size);

    const treemap = d3.treemap().size([width, height]).padding(1);
    treemap(root);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => colorScale(d.parent.data.name))
        .on("click", function (event, d) {
            displayDetails(d, detailsId);
        });
a<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Hadith Treemaps</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #2f2f2f;
            color: #cfcfcf;
        }

        .main-container {
            text-align: center;
            padding: 20px;
        }

        h1 {
            font-size: 2em;
            color: #33aaff;
            margin-bottom: 20px;
        }

        .treemap-section {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            margin: 20px 0;
        }

        .treemap-container {
            width: 60%;
            height: 600px;
            background-color: #333;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }

        .details-container {
            width: 30%;
            background-color: #444;
            color: #fff;
            margin-left: 10px;
            padding: 15px;
            border-radius: 8px;
            text-align: left;
        }

        .details-container h2 {
            color: #33aaff;
            margin-bottom: 10px;
        }

        .text-label {
            display: none; /* Hide any unwanted labels */
        }
    </style>
</head>
<body>
    <div class="main-container">
        <h1>Interactive Hadith Treemaps</h1>

        <div class="treemap-section">
            <div class="treemap-container" id="bukhari-treemap"></div>
            <div class="details-container" id="bukhari-details">
                <h2>Hadith Details</h2>
                <p id="bukhari-details-content">Click a Hadith to see details here.</p>
            </div>
        </div>

        <div class="treemap-section">
            <div class="treemap-container" id="muslim-treemap"></div>
            <div class="details-container" id="muslim-details">
                <h2>Hadith Details</h2>
                <p id="muslim-details-content">Click a Hadith to see details here.</p>
            </div>
        </div>
    </div>

    <script>
        // Sample data loading and initialization
        d3.json("https://raw.githubusercontent.com/ymorsi7/ExplorableExplanation/refs/heads/main/data/hadith.json").then(data => {
            renderTreemap(data, "bukhari-treemap", "bukhari-details-content");
            renderTreemap(data, "muslim-treemap", "muslim-details-content");
        });

        function renderTreemap(data, containerId, detailsId) {
            const width = 600, height = 600;
            const svg = d3.select(`#${containerId}`).append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("border-radius", "8px");

            const root = d3.hierarchy(data).sum(d => d.size);

            const treemap = d3.treemap().size([width, height]).padding(1);
            treemap(root);

            const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

            svg.selectAll("rect")
                .data(root.leaves())
                .enter()
                .append("rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .attr("fill", d => colorScale(d.parent.data.name))
                .on("click", function (event, d) {
                    displayDetails(d, detailsId);
                });

            svg.selectAll("text")
                .data(root.leaves())
                .enter()
                .append("text")
                .attr("x", d => d.x0 + 5)
                .attr("y", d => d.y0 + 15)
                .text(d => d.data.name)
                .attr("font-size", "12px")
                .attr("fill", "white")
                .attr("class", "text-label")
                .style("pointer-events", "none");
        }

        function displayDetails(d, detailsId) {
            const detailsContainer = document.getElementById(detailsId);
            detailsContainer.innerHTML = `
                <strong>Chapter:</strong> ${d.parent.data.name} <br>
                <strong>Hadith ID:</strong> ${d.data.id || "N/A"} <br>
                <strong>Text (Arabic):</strong> ${d.data.arabic || "N/A"} <br>
                <strong>Text (English):</strong> ${d.data.english || "N/A"}
            `;
        }
    </script>
</body>
</html>

    svg.selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", d => d.x0 + 5)
        .attr("y", d => d.y0 + 15)
        .text(d => d.data.name)
        .attr("font-size", "12px")
        .attr("fill", "white")
        .attr("class", "text-label")
        .style("pointer-events", "none");
}

function displayDetails(d, detailsId) {
    const detailsContainer = document.getElementById(detailsId);
    detailsContainer.innerHTML = `
        <strong>Chapter:</strong> ${d.parent.data.name} <br>
        <strong>Hadith ID:</strong> ${d.data.id || "N/A"} <br>
        <strong>Text (Arabic):</strong> ${d.data.arabic || "N/A"} <br>
        <strong>Text (English):</strong> ${d.data.english || "N/A"}
    `;
}
