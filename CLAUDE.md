# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal web app for tracking every tree planted — mapped, measured, and visualized. Zero dependencies except CDN-loaded Leaflet.js and Google Fonts. No build step.

## Running Locally

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

Opening `index.html` directly in browser also works, but geolocation requires localhost or HTTPS.

## Architecture

Flat single-directory structure — no folders. Three HTML pages connected by navigation:

- **`index.html`** — Stats dashboard (lifetime totals, CO₂ captured, green cover) and year timeline
- **`forest.html`** — Year-specific map + sapling list, accessed via `?year=YYYY` query param
- **`overall-forest.html`** — Full lifetime map with all trees across all years

**Data flow:**
- `data.js` exports `allTreeData` — static seed records (id, lat, lng, count, type, age, month, year)
- User-planted trees are stored in `localStorage` as `myPlantedTrees`
- Both are merged at render time
- Map tile style preference persisted as `localStorage` key `preferredMapStyle`

**CO₂ formula:** `count × (years since planting + age at planting) × 10` kg per tree entry.

**Maps:** Leaflet.js via CDN. Tile providers are CartoDB and Esri. Users can click the map to plant new trees, which are added to localStorage.

## Adding Trees

Edit `data.js` and add entries to the `allTreeData` array with the shape:
```js
{ id, lat, lng, count, type, age, month, year }
```

## Code Structure

| File | Contents |
|---|---|
| `index.html` | Landing page — stats dashboard and year navigation |
| `forest.html` | Year-specific view with Leaflet map and tree list |
| `overall-forest.html` | Lifetime view with all trees plotted |
| `data.js` | Static seed tree data (`allTreeData` array) |
| `utils.js` | Shared helpers: localStorage read/write, map initialization |
| `README.md` | Project overview, data structure reference, CO₂ formula |
