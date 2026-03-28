// Shared utilities for Tree Tracker

function getLocalTrees() {
    try {
        return JSON.parse(localStorage.getItem('myPlantedTrees')) || [];
    } catch (e) {
        console.warn('Could not parse locally stored trees:', e);
        return [];
    }
}

function saveLocalTrees(trees) {
    localStorage.setItem('myPlantedTrees', JSON.stringify(trees));
}

// Must be called after Leaflet is loaded
function createMapLayers() {
    return {
        "Minimal Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }),
        "Satellite":     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '© Esri' }),
        "Dark":          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }),
        "Topography":    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '© Esri' })
    };
}
