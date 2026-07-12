const { test, expect } = require('@playwright/test');

test.describe('Ayatica visualizations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Dismiss loading overlay if still present
    await page.waitForFunction(() => {
      const el = document.getElementById('loading-screen');
      if (!el) return true;
      const style = window.getComputedStyle(el);
      return style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
    }, null, { timeout: 10000 }).catch(() => {});
    await page.evaluate(() => {
      const el = document.getElementById('loading-screen');
      if (el) {
        el.style.display = 'none';
        el.style.opacity = '0';
      }
    });
  });

  test('critical chart hosts and controls exist with correct dimensions', async ({ page }) => {
    await expect(page.locator('#treemap')).toBeVisible();
    await expect(page.locator('#verse-details')).toBeVisible();
    await expect(page.locator('#search-bar')).toBeVisible();
    await expect(page.locator('#filter-button')).toBeVisible();
    await expect(page.locator('#wordcloud-container')).toBeVisible();
    await expect(page.locator('#ngram-slider')).toBeVisible();
    await expect(page.locator('#freq-slider')).toBeVisible();
    await expect(page.locator('#creation-burst')).toBeVisible();
    await expect(page.locator('#orbit-container')).toBeVisible();
    await expect(page.locator('#embryonic-development')).toBeVisible();

    // Hadith hosts exist in DOM; become visible after remote JSON loads
    await expect(page.locator('#bukhariTreemap')).toHaveCount(1);
    await expect(page.locator('#muslimTreemap')).toHaveCount(1);
    await expect(page.locator('#hadithDetailsBukhari')).toHaveCount(1);
    await expect(page.locator('#hadithDetailsMuslim')).toHaveCount(1);

    await page.waitForFunction(() => {
      const content = document.getElementById('hadithContent');
      return content && content.style.display === 'block';
    }, null, { timeout: 90000 });

    const sizes = await page.evaluate(() => {
      const box = (sel) => {
        const el = document.querySelector(sel);
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      };
      return {
        treemap: box('#treemap'),
        wordcloud: box('#wordcloud-container'),
        bukhari: box('#bukhariTreemap'),
        muslim: box('#muslimTreemap'),
        orbit: box('#orbit-container'),
        creation: box('#creation-burst-container'),
      };
    });

    expect(sizes.treemap.w).toBe(800);
    expect(sizes.treemap.h).toBe(600);
    expect(sizes.wordcloud.w).toBe(800);
    expect(sizes.wordcloud.h).toBe(600);
    expect(sizes.bukhari.w).toBe(600);
    expect(sizes.bukhari.h).toBe(600);
    expect(sizes.muslim.w).toBe(600);
    expect(sizes.muslim.h).toBe(600);
    expect(sizes.orbit.w).toBe(400);
    expect(sizes.orbit.h).toBe(400);
    expect(sizes.creation.w).toBe(400);
    expect(sizes.creation.h).toBe(400);
  });

  test('Quran treemap renders, click updates details, search and filter work', async ({ page }) => {
    const treemapRects = page.locator('#treemap svg rect');
    await expect(treemapRects.first()).toBeVisible({ timeout: 90000 });
    const initialCount = await treemapRects.count();
    expect(initialCount).toBeGreaterThan(50);

    await treemapRects.nth(3).click({ force: true });
    await expect(page.locator('#verse-details h3')).toBeVisible();
    const detailsText = await page.locator('#verse-details').innerText();
    expect(detailsText.toLowerCase()).not.toContain('pick a verse');
    expect(detailsText.length).toBeGreaterThan(20);

    await page.fill('#search-bar', 'mercy');
    await page.waitForTimeout(400);
    const searchCount = await treemapRects.count();
    expect(searchCount).toBeGreaterThan(0);
    expect(searchCount).toBeLessThan(initialCount);

    await page.fill('#search-bar', '');
    await page.waitForTimeout(400);
    await page.click('#filter-button');
    await expect(page.locator('#filter-button')).toHaveText(/Show All Verses/i);
    const miracleCount = await treemapRects.count();
    expect(miracleCount).toBeGreaterThan(0);
    expect(miracleCount).toBeLessThan(initialCount);

    // Gold miracle fills should be present after filter
    const goldCount = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#treemap svg rect'))
        .filter((r) => {
          const fill = r.style.fill || r.getAttribute('fill') || '';
          return fill.includes('gold');
        }).length;
    });
    expect(goldCount).toBeGreaterThan(0);

    await page.click('#filter-button');
    await expect(page.locator('#filter-button')).toHaveText(/Scientific Miracles/i);
  });

  test('miracle animations mount (D3 rings, Three.js orbit, embryo stages)', async ({ page }) => {
    await expect(page.locator('#creation-burst svg circle').first()).toBeVisible({ timeout: 15000 });
    const circleCount = await page.locator('#creation-burst svg circle').count();
    expect(circleCount).toBeGreaterThan(0);

    await expect(page.locator('#orbit-container canvas')).toBeVisible({ timeout: 15000 });
    const canvasSize = await page.locator('#orbit-container canvas').boundingBox();
    expect(canvasSize.width).toBeGreaterThan(100);
    expect(canvasSize.height).toBeGreaterThan(100);

    await expect(page.locator('#embryonic-development svg path').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#stage-label')).not.toBeEmpty();
  });

  test('word cloud renders and click shows verse details', async ({ page }) => {
    const words = page.locator('#wordcloud-container svg text');
    await expect(words.first()).toBeVisible({ timeout: 90000 });
    const wordCount = await words.count();
    expect(wordCount).toBeGreaterThan(5);

    // Ensure SVG is exactly the intended canvas
    const svgBox = await page.locator('#wordcloud-container svg').boundingBox();
    expect(svgBox.width).toBe(800);
    expect(svgBox.height).toBe(600);

    await words.nth(1).click({ force: true });
    await expect(page.locator('#word-details')).toContainText(/Verses containing|No verses found/i);
    const details = await page.locator('#word-details').innerText();
    expect(details.length).toBeGreaterThan(10);

    // Sliders still drive redraw without crashing
    await page.locator('#ngram-slider').fill('2');
    await page.waitForTimeout(1500);
    await expect(page.locator('#ngram-value')).toHaveText('2');
    await expect(page.locator('#wordcloud-container svg text').first()).toBeVisible({ timeout: 90000 });
  });

  test('Hadith dual treemaps render, click details, search and filter work', async ({ page }) => {
    await page.locator('#hadith-treemap-the').scrollIntoViewIfNeeded();

    // Wait until loading screen gone and content shown
    await page.waitForFunction(() => {
      const loading = document.getElementById('loadingScreen');
      const content = document.getElementById('hadithContent');
      const loadingHidden = !loading || loading.style.display === 'none';
      const contentShown = content && (content.style.display === 'block' || content.classList.contains('loaded'));
      return loadingHidden && contentShown;
    }, null, { timeout: 90000 });

    const bukhariRects = page.locator('#bukhariTreemap svg rect');
    const muslimRects = page.locator('#muslimTreemap svg rect');
    await expect(bukhariRects.first()).toBeVisible({ timeout: 90000 });
    await expect(muslimRects.first()).toBeVisible({ timeout: 90000 });

    const bukhariCount = await bukhariRects.count();
    const muslimCount = await muslimRects.count();
    expect(bukhariCount).toBeGreaterThan(20);
    expect(muslimCount).toBeGreaterThan(20);

    await bukhariRects.nth(2).click({ force: true });
    await expect(page.locator('#hadithDetailsBukhari')).toContainText(/Hadith ID|Text|Chapter/i);

    await muslimRects.nth(2).click({ force: true });
    await expect(page.locator('#hadithDetailsMuslim')).toContainText(/Hadith ID|Text|Chapter/i);

    await page.fill('#hadith-search-bar', 'prayer');
    await page.click('#hadith-search-button');
    await page.waitForTimeout(500);
    const searchedBukhari = await bukhariRects.count();
    expect(searchedBukhari).toBeGreaterThan(0);
    expect(searchedBukhari).toBeLessThanOrEqual(bukhariCount);

    await page.click('#hadith-filter-button');
    await expect(page.locator('#hadith-filter-button')).toHaveText(/Show All Hadiths/i);
    const filtered = await bukhariRects.count();
    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThan(bukhariCount);

    const gold = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('#bukhariTreemap svg rect'))
        .filter((r) => (r.style.fill || '').includes('gold')).length;
    });
    expect(gold).toBeGreaterThan(0);
  });

  test('branding and navigation are present and usable', async ({ page }) => {
    await expect(page.locator('.brand-hero')).toHaveText('Ayatica');
    await expect(page.locator('.site-header .brand-mark span')).toHaveText('Ayatica');
    await page.locator('.nav-buttons .dropdown').first().hover();
    await expect(page.locator('.dropdown-content a[href="#quran-treemap"]').first()).toBeVisible();
    await page.locator('a[href="#word-cloud"]').first().click();
    await expect(page.locator('#word-cloud')).toBeInViewport();
  });

  test('no undefined HadithVisualization console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const fatal = errors.filter((e) =>
      /HadithVisualization|is not defined|Cannot read/i.test(e)
    );
    expect(fatal).toEqual([]);
  });
});
