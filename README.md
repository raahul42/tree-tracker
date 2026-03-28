# 🌳 Lifetime Tree Tracker

A personal web app to track every tree you've ever planted — mapped, measured, and remembered.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step. Just open `index.html` in a browser.

---

## What it does

- **Tracks trees across years** — navigate year-by-year or view your entire lifetime forest at once
- **Interactive maps** — see every sapling plotted on a map, with icons that scale by age
- **Live stats** — total trees, CO₂ captured, and green cover calculated dynamically
- **Plant new saplings** — click anywhere on the map to log a new tree with type, count, and age
- **Persists locally** — newly planted trees are saved to `localStorage` and survive page refreshes
- **Map style preferences** — choose between Light, Satellite, Dark, and Topography — preference is remembered

---

## Pages

| File | Description |
|---|---|
| `index.html` | Home — lifetime stats and year timeline |
| `forest.html` | Yearly view — map + sapling list for a specific year (pass `?year=YYYY`) |
| `overall-forest.html` | Full lifetime forest — all trees across all years |
| `data.js` | Static seed data — add your trees here |

---

## Adding your trees

Open `data.js` and add entries to the `allTreeData` array:

```js
{ id: 6, lat: 28.4600, lng: 77.0200, count: 3, type: 'Gulmohar', age: 1, month: 'March', year: 2026 }
```

| Field | Description |
|---|---|
| `id` | Unique number |
| `lat` / `lng` | Coordinates where trees were planted |
| `count` | Number of trees in this batch |
| `type` | Tree species |
| `age` | Sapling age in years **at time of planting** |
| `month` | Month planted (string) |
| `year` | Year planted |

You can also plant directly on the map — those entries are saved to `localStorage` automatically.

---

## CO₂ calculation

A simple estimate used across the app:

```
CO₂ (kg) = count × (years since planting + age at planting) × 10
```

This assumes ~10 kg CO₂ absorbed per tree per year — a conservative average across species.

---

## Tech stack

- **Leaflet.js** — maps and markers
- **Inter** — typography (Google Fonts)
- **CartoDB / Esri** — map tile providers
- **localStorage** — persistence for user-planted trees

No npm, no bundler, no dependencies to install.

---

## Running locally

```bash
git clone https://github.com/raahul42/tree-tracker.git
cd tree-tracker
open index.html   # macOS
```

Or just double-click `index.html`.

---

*Started March 2026 · Built by Raahul*
