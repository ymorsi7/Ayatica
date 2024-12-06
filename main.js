// Google Analytics Configuration
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-9FY2N06PLC');

// Loading Screen Management
document.addEventListener('DOMContentLoaded', function () {
    const loadingScreen = document.getElementById('loading-screen');
    const MAX_LOADING_TIME = 3000;

    const timeoutPromise = new Promise(resolve => {
        setTimeout(resolve, MAX_LOADING_TIME);
    });

    const imagePromises = Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    });

    const scriptPromises = Array.from(document.scripts).map(script => {
        if (script.loaded) return Promise.resolve();
        return new Promise(resolve => {
            script.onload = resolve;
            script.onerror = resolve;
        });
    });

    Promise.race([
        Promise.all([...imagePromises, ...scriptPromises]),
        timeoutPromise
    ]).finally(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });
});

// Quranic Word Cloud
let versesPerWord = {};
const stopWords = new Set(['the', 'your', 'than', 'and', 'were', 'then', 'a', 'to', 'of', 'in', 'that', 'is', 'for', 'on', 'with', 'by', 'as', 'this', 'but', 'from', 'or', 'an', 'will', 'be', 'they', 'who', 'has', 'are', 'their', 'have', 'had', 'what', 'when', 'where', 'which', 'why', 'how']);

function getNGrams(text, n) {
    const words = text.split(/\W+/).filter(word =>
        word.length > 3 && !stopWords.has(word)
    );
    const ngrams = [];
    for (let i = 0; i <= words.length - n; i++) {
        const ngramWords = words.slice(i, i + n);
        const ngram = ngramWords.map(word => {
            if (['god', 'allah', 'lord'].includes(word.toLowerCase())) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        }).join(' ');
        ngrams.push(ngram);
    }
    return ngrams;
}

function updateWordCloud() {
    const ngramSize = +d3.select("#ngram-slider").property("value");
    const minFrequency = +d3.select("#freq-slider").property("value");

    d3.select("#ngram-value").text(ngramSize);
    d3.select("#freq-value").text(minFrequency);

    d3.json("https://raw.githubusercontent.com/ymorsi7/Quran-Interactive-Visualization/main/TheQuranDataset.json")
        .then(data => {
            const words = {};
            versesPerWord = {};

            data.children.forEach(surah => {
                surah.children.forEach(verse => {
                    if (verse.ayah_en) {
                        const text = verse.ayah_en.toLowerCase();
                        const ngrams = getNGrams(text, ngramSize);

                        ngrams.forEach(ngram => {
                            words[ngram] = (words[ngram] || 0) + 1;
                            if (!versesPerWord[ngram]) {
                                versesPerWord[ngram] = [];
                            }
                            versesPerWord[ngram].push({
                                surah: verse.surah_name_en,
                                verse: verse.ayah_en,
                                ayah_no: verse.ayah_no_surah
                            });
                        });
                    }
                });
            });

            const wordData = Object.entries(words)
                .filter(([_, count]) => count >= minFrequency)
                .map(([text, size]) => ({
                    text,
                    size: 10 + Math.log2(size) * 15,
                    color: d3.interpolateViridis(Math.random())
                }));

            const width = 800;
            const height = 600;

            d3.layout.cloud()
                .size([width, height])
                .words(wordData)
                .padding(5)
                .rotate(() => 0)
                .fontSize(d => d.size)
                .on("end", draw)
                .start();

            function draw(words) {
                d3.select("#wordcloud-container").select("svg").remove();

                const svg = d3.select("#wordcloud-container")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", `translate(${width / 2},${height / 2})`);

                svg.selectAll("text")
                    .data(words)
                    .enter()
                    .append("text")
                    .style("font-size", d => `${d.size}px`)
                    .style("fill", d => d.color)
                    .attr("text-anchor", "middle")
                    .attr("transform", d => `translate(${d.x},${d.y})`)
                    .text(d => d.text)
                    .on("click", function (event, d) {
                        showWordDetails(d.text, versesPerWord[d.text]);
                    });
            }
        });
}

function showWordDetails(word, verses) {
    const detailsContainer = document.getElementById('word-details');
    if (!verses || verses.length === 0) {
        detailsContainer.innerHTML = '<p>No verses found containing this word.</p>';
        return;
    }

    let html = `
        <div class="word-details-header">
            <h3>Verses containing "${word}" (${verses.length} occurrences)</h3>
            <button class="collapse-btn" onclick="toggleWordDetails(this)">−</button>
        </div>
        <div class="verses-list">
    `;

    verses.forEach(verse => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const highlightedVerse = verse.verse.replace(
            regex,
            match => `<span class="highlighted-word">${match}</span>`
        );

        html += `
            <div class="verse-item">
                <div class="verse-header">
                    <strong>${verse.surah}</strong>
                    <span class="verse-number">Verse ${verse.ayah_no}</span>
                </div>
                <p class="verse-text">${highlightedVerse}</p>
            </div>
        `;
    });
    html += '</div>';
    detailsContainer.innerHTML = html;
}

function toggleWordDetails(button) {
    const versesList = button.parentElement.nextElementSibling;
    const isCollapsed = versesList.style.display === 'none';
    versesList.style.display = isCollapsed ? 'block' : 'none';
    button.textContent = isCollapsed ? '−' : '+';
}

d3.select("#ngram-slider").on("input", function () {
    d3.select("#ngram-value").text(this.value);
    updateWordCloud();
});

d3.select("#freq-slider").on("input", function () {
    d3.select("#freq-value").text(this.value);
    updateWordCloud();
});

updateWordCloud();
