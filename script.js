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
        { surah: 'The Criterion', ayah: 25, highlightColor: 'gold', explanation: "Touches on the concept of time and relativity." },
        { surah: 'Ta-Ha', ayah: 53, highlightColor: 'gold', explanation: "Here is the translation of the translation of zauj (plural azwaj) whose original meaning is: ‘that which, in the company of another, forms a pair’; the word is used just as readily for a married couple as for a pair of shoes. This is describing how plants come in pairs, implying sexual plant reproduction, which was not something that was known at the time of the Quran." },
        { surah: 'The Romans', ayah: 1, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 2, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 3, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 4, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 5, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
    ];

    const notableBukhariHadiths = [101, 102, 103]; 
    const notableMuslimHadiths = [201, 202, 203]; 

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
                    .on("click", function (event, d) { displayDetails(d); });
            }

            function displayDetails(d) {
                const details = d3.select("#verse-details");
                details.html("");

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
                    .on("click", function (event, d) { displayDetails(d); });
            }

            document.getElementById("filter-button").onclick = toggleScientificMiracles;
            document.getElementById("search-bar").addEventListener("input", searchVerses);

            renderTreemap();
        })
        .catch(error => console.error("Error loading JSON:", error));

    const url = 'https://raw.githubusercontent.com/ymorsi7/ExplorableExplanation/refs/heads/main/data/hadith.json';
    let bukhariUpdate, muslimUpdate;

    d3.json(url).then(data => {
        const bukhariData = {
            name: "Sahih Bukhari",
            children: d3.groups(data.filter(d => d.source === "Sahih Bukhari"), d => d.chapter)
                .map(([chapter, hadiths]) => ({
                    name: chapter,
                    children: hadiths.map(hadith => ({ ...hadith, value: 1 }))
                }))
        };

        const muslimData = {
            name: "Sahih Muslim",
            children: d3.groups(data.filter(d => d.source === "Sahih Muslim"), d => d.chapter)
                .map(([chapter, hadiths]) => ({
                    name: chapter,
                    children: hadiths.map(hadith => ({ ...hadith, value: 1 }))
                }))
        };

        bukhariUpdate = createTreemap(bukhariData, "#bukhariTreemap", "hadithDetailsBukhari", 600, 600);
        muslimUpdate = createTreemap(muslimData, "#muslimTreemap", "hadithDetailsMuslim", 600, 600);
        let showNotableOnly = false;
function toggleNotableHadiths() {
    console.log("Toggle button clicked");
    console.log("Current showNotableOnly:", showNotableOnly);
    showNotableOnly = !showNotableOnly;
    console.log("New showNotableOnly:", showNotableOnly);
    
    document.getElementById("hadith-filter-button").textContent = showNotableOnly
        ? "Show All Hadiths"
        : "Show Examples of Prophetic Wisdom";

    if (bukhariUpdate) {
        console.log("Calling bukhariUpdate with:", showNotableOnly);
        bukhariUpdate(showNotableOnly);
    }
    if (muslimUpdate) {
        console.log("Calling muslimUpdate with:", showNotableOnly);
        muslimUpdate(showNotableOnly);
    }
}

document.getElementById("hadith-filter-button").addEventListener("click", toggleNotableHadiths);

        
        
    });

    
    



    
    function createTreemap(data, container, detailsId, width, height) {
        const root = d3.hierarchy(data).sum(d => d.value).sort((a, b) => b.value - a.value);
        d3.treemap().size([width, height]).padding(1)(root);

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const g = svg.append("g");

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);

        const tooltip = d3.select("#tooltip");
        const color = d3.scaleOrdinal().domain(root.children.map(d => d.data.name)).range(d3.schemeCategory10);

        const notableHadiths = data.name === "Sahih Bukhari" ? notableBukhariHadiths : notableMuslimHadiths;

        function updateVisualization(filterParam) {
            console.log("updateVisualization called with:", filterParam);
            console.log("Data name:", data.name);
            console.log("Notable hadiths:", notableHadiths);
            
            g.selectAll("*").remove();

            let leaves = root.leaves();
            
            if (typeof filterParam === 'boolean') {
                console.log("Boolean filter detected");
                if (filterParam) {
                    console.log("Filtering for notable hadiths");
                    leaves = leaves.filter(d => {
                        const isNotable = notableHadiths.includes(parseInt(d.data.id));
                        console.log("Checking hadith:", d.data.id, "isNotable:", isNotable);
                        return isNotable;
                    });
                }
            } else if (typeof filterParam === 'string' && filterParam) {
                leaves = leaves.filter(d => 
                    d.data.text_en.toLowerCase().includes(filterParam.toLowerCase()) ||
                    d.parent.data.name.toLowerCase().includes(filterParam.toLowerCase())
                );
            }

            g.selectAll("rect")
                .data(leaves)
                .enter()
                .append("rect")
                .attr("x", d => d.x0)
                .attr("y", d => d.y0)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0)
                .style("fill", d => {
                    const isNotable = notableHadiths.includes(parseInt(d.data.id));
                    return isNotable ? 'gold' : color(d.parent.data.name);
                })
                .style("stroke", "#333")
                .on("mouseover", (event, d) => {
                    tooltip.style("visibility", "visible")
                        .text(`Chapter: ${d.parent.data.name}`);
                })
                .on("mousemove", (event) => {
                    tooltip.style("top", `${event.pageY + 10}px`)
                        .style("left", `${event.pageX + 10}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("visibility", "hidden");
                })
                .on("click", (event, d) => {
                    displayDetails(d, detailsId);
                });
        }

        updateVisualization();
        return updateVisualization;
    }
});