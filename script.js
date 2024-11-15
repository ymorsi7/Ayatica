document.addEventListener("DOMContentLoaded", () => {
    const notableVerses = [
        { surah: 'The Prophets', ayah: 30, highlightColor: 'gold', explanation: "Refers to the creation of the universe, supporting the Big Bang theory." },
        { surah: 'The Prophets', ayah: 33, highlightColor: 'gold', explanation: "Mentions the orbits of celestial bodies, aligning with astronomy." },
        { surah: 'The Prophets', ayah: 104, highlightColor: 'gold', explanation: "Describes the universe's end in a 'Big Crunch' scenario." },
        { surah: 'The Believers', ayah: 12, highlightColor: 'gold', explanation: "Details embryonic development stages in humans." },
        { surah: 'The Light', ayah: 40, highlightColor: 'gold', explanation: "Discusses darkness in the deep sea, relating to oceanography." },
        { surah: 'Ya-Sin', ayah: 36, highlightColor: 'gold', explanation: "Mentions creation in pairs across life forms." },
        { surah: 'The Winnowing Winds', ayah: 47, highlightColor: 'gold', explanation: "Refers to the expansion of the universe." },
        { surah: 'The Iron', ayah: 25, highlightColor: 'gold', explanation: "Describes iron as 'sent down,' indicating its extraterrestrial origin." },
        { surah: 'The Cow', ayah: 164, highlightColor: 'gold', explanation: "Refers to the water cycle and nature’s balance." },
        { surah: 'The Bee', ayah: 66, highlightColor: 'gold', explanation: "Discusses milk production in cattle." },
        { surah: 'The Bee', ayah: 68, highlightColor: 'gold', explanation: "References bees and honey’s healing properties." },
        { surah: 'The Cattle', ayah: 125, highlightColor: 'gold', explanation: "Describes decreased oxygen at high altitudes." },
        { surah: 'The Moon', ayah: 1, highlightColor: 'gold', explanation: "Mentions the splitting of the moon." },
        { surah: 'The Cave', ayah: 86, highlightColor: 'gold', explanation: "Describes the sun setting in a muddy spring." },
        { surah: 'The Thunder', ayah: 3, highlightColor: 'gold', explanation: "Discusses the layers of the Earth and sky." },
        { surah: 'The Criterion', ayah: 61, highlightColor: 'gold', explanation: "Mentions creation in balance." },
        { surah: 'The Family of Imran', ayah: 191, highlightColor: 'gold', explanation: "Reflects on the order in the creation of heavens and earth." },
        { surah: 'The Moon', ayah: 19, highlightColor: 'gold', explanation: "Describes the moon’s phases." },
        { surah: 'The Dominion', ayah: 5, highlightColor: 'gold', explanation: "Mentions the atmosphere’s protection." },
        { surah: 'The Cow', ayah: 22, highlightColor: 'gold', explanation: "Refers to Earth’s stability." },
        { surah: 'The Smoke', ayah: 10, highlightColor: 'gold', explanation: "Describes the universe’s origin as smoke." },
        { surah: 'The Divorce', ayah: 12, highlightColor: 'gold', explanation: "Mentions the seven heavens." },
        { surah: 'The Forgiver', ayah: 57, highlightColor: 'gold', explanation: "Describes creation from dust." },
        { surah: 'Noah', ayah: 14, highlightColor: 'gold', explanation: "References human creation in stages." },
        { surah: 'The Reality', ayah: 19, highlightColor: 'gold', explanation: "Mentions wind as a destructive force." },
        { surah: 'The Kneeling', ayah: 28, highlightColor: 'gold', explanation: "Refers to the hydrological cycle." },
        { surah: 'The Cave', ayah: 29, highlightColor: 'gold', explanation: "Discusses free will." },
        { surah: 'The Pilgrimage', ayah: 5, highlightColor: 'gold', explanation: "Describes biological stages." },
        { surah: 'The Star', ayah: 45, highlightColor: 'gold', explanation: "Mentions pairing in creation." },
        { surah: 'The Bees', ayah: 69, highlightColor: 'gold', explanation: "Highlights the benefits of honey." },
        { surah: 'The Thunder', ayah: 12, highlightColor: 'gold', explanation: "Describes thunder’s formation." },
        { surah: 'The Cave', ayah: 11, highlightColor: 'gold', explanation: "Discusses sleep as a protection mechanism." },
        { surah: 'The Criterion', ayah: 25, highlightColor: 'gold', explanation: "Touches on the concept of time and relativity." }
    ];
    

    let scientificOnly = false;

    d3.json("https://raw.githubusercontent.com/ymorsi7/Quran-Interactive-Visualization/main/TheQuranDataset.json")
        .then(data => {
            const nestedData = d3.groups(data.children, d => d.surah_name_en);
            const hierarchyData = {
                name: "Quran",
                children: nestedData.map(([surah, verses]) => ({
                    name: surah,
                    children: verses.map(verse => ({
                        ...verse,
                        value: +verse.no_of_word_ayah || 1
                    }))
                }))
            };

            const width = 800;
            const height = 600;
            const root = d3.hierarchy(hierarchyData)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);

            d3.treemap().size([width, height]).padding(1)(root);

            const svg = d3.select("#treemap").append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom().on("zoom", (event) => {
                    svg.attr("transform", event.transform);
                }))
                .append("g");

            const color = d3.scaleOrdinal()
                .domain(root.children.map(d => d.data.name))
                .range(d3.schemeCategory10);

            function renderTreemap() {
                svg.selectAll("*").remove();

                const filteredData = scientificOnly 
                    ? root.leaves().filter(d => notableVerses.some(v => v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah))
                    : root.leaves();

                svg.selectAll("rect")
                    .data(filteredData)
                    .enter()
                    .append("rect")
                    .attr("x", d => d.x0)
                    .attr("y", d => d.y0)
                    .attr("width", d => d.x1 - d.x0)
                    .attr("height", d => d.y1 - d.y0)
                    .style("fill", d => {
                        const notableVerse = notableVerses.find(v => v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah);
                        return notableVerse ? notableVerse.highlightColor : color(d.parent.data.name);
                    })
                    .style("stroke", "#333")
                    .on("click", function(event, d) { displayDetails(d); });
            }

            function displayDetails(d) {
                const details = d3.select("#verse-details");
                details.html("");  // Clear previous content

                if (d && d.data) {
                    const surahName = d.data.surah_name_en || "Unknown Surah";
                    const ayahText = d.data.ayah_en || "No translation available";
                    const ayahNo = d.data.ayah_no_surah || "No Ayah Number";

                    details.append("h3").text(`${surahName} - Ayah ${ayahNo}`);
                    details.append("p").text(ayahText);

                    const notableVerse = notableVerses.find(v =>
                        v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah
                    );

                    if (notableVerse && notableVerse.explanation) {
                        const explanationDiv = details.append("div").attr("id", "explanation");
                        explanationDiv.append("h4").text("Scientific Explanation:");
                        explanationDiv.append("p").text(notableVerse.explanation);
                    }
                } else {
                    details.append("p").text("No data found for this specific verse in the dataset.");
                }
            }

            function toggleScientificMiracles() {
                scientificOnly = !scientificOnly;
                document.getElementById("filter-button").textContent = scientificOnly
                    ? "Show All Verses"
                    : "Show Scientific Miracles Only";
                renderTreemap();
            }

            function searchVerses() {
                const keyword = document.getElementById("search-bar").value.toLowerCase();
                
                const searchData = root.leaves().filter(d => 
                    d.data.ayah_en && d.data.ayah_en.toLowerCase().includes(keyword)
                );

                svg.selectAll("*").remove();

                svg.selectAll("rect")
                    .data(searchData)
                    .enter()
                    .append("rect")
                    .attr("x", d => d.x0)
                    .attr("y", d => d.y0)
                    .attr("width", d => d.x1 - d.x0)
                    .attr("height", d => d.y1 - d.y0)
                    .style("fill", d => {
                        const notableVerse = notableVerses.find(v => v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah);
                        return notableVerse ? notableVerse.highlightColor : color(d.parent.data.name);
                    })
                    .style("stroke", "#333")
                    .on("click", function(event, d) { displayDetails(d); });
            }

            document.getElementById("filter-button").onclick = toggleScientificMiracles;
            document.getElementById("search-bar").addEventListener("input", searchVerses);

            renderTreemap();
        })
        .catch(error => console.error("Error loading JSON:", error));

    function initHadithViz() {
        const width = 800;
        const height = 600;

        const svg = d3.select("#hadith-treemap")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        d3.json("data/hadith.json").then(data => {
            const root = d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);

            const treemapLayout = d3.treemap()
                .size([width, height])
                .padding(1);

            treemapLayout(root);

            const nodes = svg.selectAll('g')
                .data(root.leaves())
                .enter()
                .append('g')
                .attr('transform', d => `translate(${d.x0},${d.y0})`);

            nodes.append('rect')
                .attr('width', d => d.x1 - d.x0)
                .attr('height', d => d.y1 - d.y0)
                .style('fill', '#33cccc')
                .style('opacity', 0.7)
                .on('mouseover', function(event, d) {
                    d3.select(this).style('opacity', 1);
                    const details = document.querySelector('.hadith-section .details-content');
                    details.innerHTML = `
                        <h3>${d.data.collection}</h3>
                        <p>${d.data.text}</p>
                        <p><em>Book: ${d.data.book}</em></p>
                    `;
                })
                .on('mouseout', function() {
                    d3.select(this).style('opacity', 0.7);
                });

            nodes.append('text')
                .attr('x', 5)
                .attr('y', 20)
                .text(d => d.data.collection)
                .style('font-size', '12px')
                .style('fill', 'white');
        });
    }

    initHadithViz();
});