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
        { surah: 'The Star', ayah: 45, highlightColor: 'gold', explanation: "Creation of male and female pairs from a sperm-drop (continued in 53:46)—related to gametes / sex determination." },
        { surah: 'The Bees', ayah: 69, highlightColor: 'gold', explanation: "Highlights the benefits of honey." },
        { surah: 'The Thunder', ayah: 12, highlightColor: 'gold', explanation: "Describes thunder’s formation." },
        { surah: 'The Cave', ayah: 11, highlightColor: 'gold', explanation: "Discusses sleep as a protection mechanism." },
        { surah: 'The Criterion', ayah: 25, highlightColor: 'gold', explanation: "Touches on the concept of time and relativity." },
        { surah: 'Ta-Ha', ayah: 53, highlightColor: 'gold', explanation: "Here is the translation of the translation of zauj (plural azwaj) whose original meaning is: ‘that which, in the company of another, forms a pair’; the word is used just as readily for a married couple as for a pair of shoes. This is describing how plants come in pairs, implying sexual plant reproduction, which was not something that was known at the time of the Quran." },
        { surah: 'The Romans', ayah: 1, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 2, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 3, highlightColor: 'gold', explanation: "Predicted Roman victory after defeat 'in a nearby/lowest land' (adna al-ard). Often linked to the Dead Sea region—Earth's lowest exposed land—plus the later Byzantine recovery." },
        { surah: 'The Romans', ayah: 4, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Romans', ayah: 5, highlightColor: 'gold', explanation: "This miracle is depicted in Verses 1-5 of Surah Ar-Rum (Romans). Predicted the Romans defeating the Persians (more details shown below)." },
        { surah: 'The Heights', ayah: 57, highlightColor: 'gold', explanation: "This miracle is depicted in Verse 57 of Surah Al-Araf (The Heights). This verse mentions clouds being heavy, something that scientists did not know about until much later. Scroll below for more information." },
        { surah: 'The Tidings', ayah: 6, highlightColor: 'gold', explanation: "Describes the earth as smoothed out, paired with mountains as pegs in the next verse—aligned with geological discussion of mountain roots and crustal stability." },
        { surah: 'The Tidings', ayah: 7, highlightColor: 'gold', explanation: "Mountains are described as 'pegs' (awtād), paralleling later geology on deep mountain roots stabilizing the crust." },
        { surah: 'The Bee', ayah: 15, highlightColor: 'gold', explanation: "Firm mountains are said to keep the earth from shaking with people—often related to the stabilizing role of mountain structures." },
        { surah: 'The Prophets', ayah: 31, highlightColor: 'gold', explanation: "Firm mountains placed on the earth so it does not shake—another mountains-as-stabilizers reference." },
        { surah: 'The Prophets', ayah: 32, highlightColor: 'gold', explanation: "The sky is a 'well-protected canopy,' aligning with the atmosphere's protective role against harmful radiation and impacts." },
        { surah: 'The Beneficent', ayah: 19, highlightColor: 'gold', explanation: "Describes merging fresh and salt bodies of water—paired with the barrier between them in the next verse." },
        { surah: 'The Beneficent', ayah: 20, highlightColor: 'gold', explanation: "A barrier exists between the two seas that they do not transgress—commonly related to estuary/halocline transition zones." },
        { surah: 'The Criterion', ayah: 53, highlightColor: 'gold', explanation: "Fresh and salt waters meet with a barrier/partition between them—another seas-barrier reference." },
        { surah: 'The Women', ayah: 56, highlightColor: 'gold', explanation: "Burnt skins are replaced so that pain continues—aligned with the discovery that pain receptors are in the skin." },
        { surah: 'The Clot', ayah: 15, highlightColor: 'gold', explanation: "Mentions dragging by the forelock (nāsiyah)—paired with the next verse calling it a lying, sinful forelock." },
        { surah: 'The Clot', ayah: 16, highlightColor: 'gold', explanation: "Links the forelock with lying/sin. Modern neuroscience associates the prefrontal region (behind the forehead) with decision-making and moral judgment." },
        { surah: 'Those who drag forth', ayah: 30, highlightColor: 'gold', explanation: "Uses the verb dāḥāhā for shaping/spreading the earth—discussed in arguments about Earth's form and surface." },
        { surah: 'The Star', ayah: 46, highlightColor: 'gold', explanation: "Male and female arise from a sperm-drop when emitted—related to gametes / sex determination." },
        { surah: 'The Resurrection', ayah: 37, highlightColor: 'gold', explanation: "Human origin from an emitted sperm-drop—foundational to later biological understanding." },
        { surah: 'The Resurrection', ayah: 39, highlightColor: 'gold', explanation: "From that drop come both sexes, male and female." },
        { surah: 'The Light', ayah: 43, highlightColor: 'gold', explanation: "Detailed cloud process: winds drive clouds, join them, pile them into masses from which rain falls—and hail/lightning described." },
        { surah: 'The Romans', ayah: 48, highlightColor: 'gold', explanation: "Winds stir vapour into clouds that are spread or piled up, then rain falls in spots—another hydrological-cycle sequence." },
        { surah: 'Jonah', ayah: 92, highlightColor: 'gold', explanation: "Pharaoh's body would be preserved as a sign for later people—cited alongside discoveries of preserved royal remains in Egypt." },
    ];

    let scientificOnly = false;

    const QURAN_URLS = location.protocol === 'file:'
        ? [
            'https://raw.githubusercontent.com/ymorsi7/Quran-Interactive-Visualization/main/TheQuranDataset.json',
            'https://cdn.jsdelivr.net/gh/ymorsi7/Quran-Interactive-Visualization@main/TheQuranDataset.json'
          ]
        : [
            'data/quran.json',
            'https://raw.githubusercontent.com/ymorsi7/Quran-Interactive-Visualization/main/TheQuranDataset.json'
          ];

    function toQuranHierarchy(data) {
        const first = data && data.children && data.children[0];
        if (first && Array.isArray(first.children)) {
            return {
                name: 'Quran',
                children: data.children.map(surah => ({
                    name: surah.name || surah.surah_name_en || 'Surah',
                    children: (surah.children || []).map(verse => ({
                        ...verse,
                        value: +verse.value || +verse.no_of_word_ayah || 1
                    }))
                }))
            };
        }

        const nestedData = d3.groups(data.children || [], d => d.surah_name_en);
        return {
            name: 'Quran',
            children: nestedData.map(([surah, verses]) => ({
                name: surah,
                children: verses.map(verse => ({
                    ...verse,
                    value: +verse.no_of_word_ayah || +verse.value || 1
                }))
            }))
        };
    }

    async function loadQuranData() {
        let lastError;
        for (const url of QURAN_URLS) {
            try {
                const data = await d3.json(url);
                if (data && data.children) return data;
            } catch (err) {
                lastError = err;
                console.warn('Quran data load failed for', url, err);
            }
        }
        throw lastError || new Error('Could not load Quran data');
    }

    loadQuranData()
        .then(data => {
            const hierarchyData = toQuranHierarchy(data);

            const width = 800;
            const height = 600;
            const root = d3.hierarchy(hierarchyData)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);

            d3.treemap().size([width, height]).padding(1)(root);

            const host = d3.select('#treemap');
            host.selectAll('*').remove();

            const svgRoot = host.append('svg')
                .attr('width', width)
                .attr('height', height);

            const svg = svgRoot.append('g');

            svgRoot.call(
                d3.zoom()
                    .scaleExtent([1, 8])
                    .extent([[0, 0], [width, height]])
                    .translateExtent([[0, 0], [width, height]])
                    .on('zoom', (event) => {
                        svg.attr('transform', event.transform);
                    })
            ).on('dblclick.zoom', null);

            const color = d3.scaleOrdinal()
                .domain((root.children || []).map(d => d.data.name))
                .range(d3.schemeCategory10);

            function renderTreemap() {
                svg.selectAll('*').remove();

                const filteredData = scientificOnly
                    ? root.leaves().filter(d => notableVerses.some(v => v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah))
                    : root.leaves();

                svg.selectAll('rect')
                    .data(filteredData)
                    .enter()
                    .append('rect')
                    .attr('x', d => d.x0)
                    .attr('y', d => d.y0)
                    .attr('width', d => Math.max(0, d.x1 - d.x0))
                    .attr('height', d => Math.max(0, d.y1 - d.y0))
                    .style('fill', d => {
                        const notableVerse = notableVerses.find(v => v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah);
                        return notableVerse ? notableVerse.highlightColor : color(d.parent.data.name);
                    })
                    .style('stroke', '#333')
                    .on('click', function (event, d) { displayDetails(d); });
            }

            function displayDetails(d) {
                const details = d3.select('#verse-details');
                details.html('');

                if (d && d.data) {
                    const surahName = d.data.surah_name_en || 'Unknown Surah';
                    const ayahText = d.data.ayah_en || 'No translation available';
                    const ayahNo = d.data.ayah_no_surah || 'No Ayah Number';

                    details.append('h3').text(`${surahName} - Ayah ${ayahNo}`);
                    details.append('p').text(ayahText);

                    const notableVerse = notableVerses.find(v =>
                        v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah
                    );

                    if (notableVerse && notableVerse.explanation) {
                        const explanationDiv = details.append('div').attr('id', 'explanation');
                        explanationDiv.append('h4').text('Scientific Explanation:');
                        explanationDiv.append('p').text(notableVerse.explanation);
                    }
                } else {
                    details.append('p').text('No data found for this specific verse in the dataset.');
                }
            }

            function toggleScientificMiracles() {
                scientificOnly = !scientificOnly;
                document.getElementById('filter-button').textContent = scientificOnly
                    ? 'Show All Verses'
                    : 'Show Scientific Miracles Only';
                renderTreemap();
            }

            function searchVerses() {
                const keyword = document.getElementById('search-bar').value.toLowerCase();

                const searchData = root.leaves().filter(d =>
                    d.data.ayah_en && d.data.ayah_en.toLowerCase().includes(keyword)
                );

                svg.selectAll('*').remove();

                svg.selectAll('rect')
                    .data(searchData)
                    .enter()
                    .append('rect')
                    .attr('x', d => d.x0)
                    .attr('y', d => d.y0)
                    .attr('width', d => Math.max(0, d.x1 - d.x0))
                    .attr('height', d => Math.max(0, d.y1 - d.y0))
                    .style('fill', d => {
                        const notableVerse = notableVerses.find(v => v.surah === d.data.surah_name_en && v.ayah === d.data.ayah_no_surah);
                        return notableVerse ? notableVerse.highlightColor : color(d.parent.data.name);
                    })
                    .style('stroke', '#333')
                    .on('click', function (event, d) { displayDetails(d); });
            }

            document.getElementById('filter-button').onclick = toggleScientificMiracles;
            document.getElementById('search-bar').addEventListener('input', searchVerses);
            document.getElementById('search-button').addEventListener('click', searchVerses);

            renderTreemap();
        })
        .catch(error => {
            console.error('Error loading Quran JSON:', error);
            const details = document.getElementById('verse-details');
            if (details) {
                details.innerHTML = '<h3>Could not load Quran data</h3><p>Check your connection and refresh the page.</p>';
            }
        });
});
