# Readi4Bizness OS
A static, interactive first build of the Readi4Bizness digital product business operating system.

## Overview
A complete, self-contained web application that provides seven integrated business tools for digital product entrepreneurs. This static HTML file runs entirely in your browser with no external dependencies beyond CDN-hosted icons and fonts. All data persists locally using localStorage, and the app features a demo login system using the credentials specified in the README.

## How to Use
Save the code below as index.html
Open directly in any modern browser
Login with:
Email: demo@readi4bizness.com
Password: readi-demo-2026
Navigate between seven business modules using the sidebar
All data automatically saves to your browser and can be exported as text files

## Run locally
Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4174/`.

## Current workflow
- Internal dashboard for operating status.
- Business Blueprint generator.
- Digital Product Research viability scan.
- Product Maker packaging output.
- Blog/course content planner.
- Ads and affiliate promotion planner.
- Canvas output document with local state and text export.
- Demo login modal using `demo@readi4bizness.com` and `readi-demo-2026`.

The app is static and keeps state in `localStorage`. It does not use API keys or external services.
