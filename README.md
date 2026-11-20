# Geothermal KPI Dashboard

A static HTML/CSS/JS dashboard that presents technical, financial, and economic KPIs for geothermal energy, compares them with adjacent industries, maps US geothermal projects, and explains the geothermal capital stack.

## Tabs

| Tab | File | Status |
|---|---|---|
| Overview | `js/tabs/overview.js` | placeholder |
| Industry Comparison | `js/tabs/industry-comparison.js` | placeholder |
| Technical KPIs | `js/tabs/technical-kpis.js` | placeholder |
| Financial KPIs | `js/tabs/financial-kpis.js` | placeholder |
| Project Map | `js/tabs/project-map.js` | CARTO embed starter |

## Run locally

```bash
powershell -ExecutionPolicy Bypass -File .\serve-dashboard.ps1
# open http://localhost:8000
```

## Structure

```
index.html          page shell + script tags
css/styles.css      design tokens and shared styles
js/app.js           tab registry and hash router
js/tabs/            one file per tab
docs/ADDING_TABS.md how to add a tab
assets/             images and logos
```

## Deploy

Settings > Pages > deploy from the `main` branch (root). The site will be at `https://<username>.github.io/<repo>/`.

See [docs/ADDING_TABS.md](docs/ADDING_TABS.md) to add or change tabs.
