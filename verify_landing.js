const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:3000', { timeout: 30000 });
        console.log('Page Title:', await page.title());

        // Check if the landing page buttons are present
        const loginButton = await page.textContent('a:has-text("LOGIN TO GRID")');
        console.log('Login Button Text:', loginButton);

    } catch (err) {
        console.error('Verification failed:', err);
    } finally {
        await browser.close();
    }
})();
