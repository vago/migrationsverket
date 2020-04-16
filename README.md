# migrationsverket

Schedule task to find booking slot for biometrics on migrationsverket.
The application uses Puppeteer to check migrationsverket on scheduled interval for available timeslots.
Once a slot is available, it'll open up the browser window with details pre-filled.

## Steps to run

* Modify `config.json`
  * `preferred`: to one of "stockholm", "norrkoping" or "uppsala"
  * `form`: used to fill in the form on migration board's site. Update as needed
* run `npm install`
* run `npm start`

### Optional/ Troubleshooting

By default, the application uses Chromium bundled by Puppeteer installation. If for some reason, Chromium download fails during `npm install`, you could tune the application to use a local Chrome installation. To do so, follow steps -

* Update `.npmrc` file, change `puppeteer_skip_chromium_download` to `true`
* If needed, update `config.json`: `chromeLocation` depending on Chrome's installation path on your OS.
* Follow steps mentioned in "Steps to run" above.

 