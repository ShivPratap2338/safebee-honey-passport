# SafeBee — Single-Jar Honey Digital Passport

A static, GitHub Pages-ready academic demonstration website for one sample honey jar.

## What's included
- `index.html` — all content for the single sample jar
- `styles.css` — responsive premium forest-green / honey-gold design
- `script.js` — preloaded sample charts and QR generator
- `assets/` — reserved for any optional images or documents you add

## Important data disclaimer
This is a fictional academic demonstration. All dates, locations, sensor values, environmental values, laboratory-style measurements and AI interpretations are illustrative simulated data. They are not real observations, laboratory findings, purity proofs, certificates, or regulatory compliance claims. The page deliberately labels unpopulated safety panels rather than inventing negative test results.

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. An internet connection is needed for Google Fonts, Chart.js and the QR-code library loaded from CDNs.
4. For the best local preview, use VS Code with the Live Server extension.

## Publish on GitHub Pages
1. Create a GitHub repository named `safebee-honey-passport`.
2. Upload `index.html`, `styles.css`, `script.js` and the `assets` folder to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for GitHub Pages to publish the site. The public URL will look like:
   `https://YOUR-USERNAME.github.io/safebee-honey-passport/`
7. Open that public URL on a phone and confirm it loads.
8. On the page's QR section, paste the exact published URL and select **Create QR**.
9. Select **Download QR image**. Print that QR on your one sample jar's label.

Do not print a QR code using the placeholder URL. Generate it only after the final public URL is live and tested.

## Editing the single sample record
All sample text and measurements are directly written in `index.html` and the chart series are in `script.js`. You can change them, but retain clear simulated-data labels unless you replace the examples with genuine, documented evidence.

## Notes
- No database, login, admin panel, live sensor feed or update workflow is included.
- One QR destination is intended for one sample jar / sample batch.
- Chart.js, QRCode.js and Google Fonts are loaded from public CDNs, so those features require internet access.
- A QR code is a link to this page; it does not itself prove honey authenticity.
