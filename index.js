const puppeteer = require('puppeteer');
// @ts-ignore
const config = require('./config.json');

let interval;
let browser;

async function initBrowser(headless, url) {
    browser = await puppeteer.launch({
        headless,
        defaultViewport: null,
        args: ['--start-maximized'],
        timeout: 0,
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'domcontentloaded',
    });
    return page;
}

// Launch new page and pre-fill information
async function launchAppointmentForm() {
    const page = await initBrowser(false, config.browser.URL);
    let elementHandles = await page.$$('div.subsection input');
    if (elementHandles.length === 5) {
        await elementHandles[0].type(config.form.firstName);
        await elementHandles[1].type(config.form.lastName);
        await elementHandles[2].type(config.form.phone);
        await elementHandles[3].type(config.form.email);
        await elementHandles[4].type(config.form.email);
    }
}

// Checks for availability of date
async function checkMigrationsverket() {
    const page = await initBrowser(true, config.browser.URL);
    const dateAvailable = await page.evaluate(UNAVAILABLE => {
        let errorText = document.querySelector('span.feedbackPanelERROR');
        if (errorText) {
            let value = errorText.innerHTML;
            return value !== UNAVAILABLE;
        }
        return true;
    }, config.messages.unavailable);

    if (dateAvailable) {
        await closeBrowser();
        clearInterval(interval);
        await launchAppointmentForm();
    } else {
        console.log(
            `Date unavailable, will check again in ${config.browser.interval /
                1000} seconds`
        );
        await closeBrowser();
    }
}

async function closeBrowser() {
    await browser.close();
}

(async () => {
    interval = setInterval(() => {
        checkMigrationsverket();
    }, config.browser.interval);
})();
