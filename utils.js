// Shared utilities for Tree Tracker

let cachedLocalTrees = null;

function getLocalTrees() {
    if (cachedLocalTrees) return cachedLocalTrees;
    try {
        cachedLocalTrees = JSON.parse(localStorage.getItem('myPlantedTrees')) || [];
        return cachedLocalTrees;
    } catch (e) {
        console.warn('Could not parse locally stored trees:', e);
        return [];
    }
}

function saveLocalTrees(trees) {
    cachedLocalTrees = trees;
    localStorage.setItem('myPlantedTrees', JSON.stringify(trees));
}

// Calculate the impact of a tree given the current year.
// Green cover starts at 4sqm per tree and grows 0.5sqm per active year.
function getTreeImpact(tree, currentYear) {
    if (!tree.count || !tree.year || tree.age == null) {
        return { yearsActive: 0, co2Captured: 0, greenCover: 0 };
    }
    const yearsActive = Math.max(0, (currentYear - tree.year) + tree.age);
    const co2Captured = tree.count * yearsActive * 10;
    const greenCover = tree.count * (4 + (yearsActive * 0.5));
    return { yearsActive, co2Captured, greenCover };
}

// Helper to escape HTML and prevent XSS
function escapeHTML(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
}

// Map initialization logic
function createMapLayers() {
    return {
        "Minimal Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }),
        "Satellite":     L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '© Esri' }),
        "Dark":          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }),
        "Topography":    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: '© Esri' })
    };
}

function initForestMap(elementId, center = [28.4595, 77.0266], zoom = 13) {
    const baseMaps = createMapLayers();
    const savedMapStyle = localStorage.getItem('preferredMapStyle') || 'Minimal Light';
    const initialLayer = baseMaps[savedMapStyle] || baseMaps['Minimal Light'];
    
    const map = L.map(elementId, { center, zoom, layers: [initialLayer] });
    L.control.layers(baseMaps).addTo(map);
    map.on('baselayerchange', e => localStorage.setItem('preferredMapStyle', e.name));
    
    return map;
}

// Invert scroll chaining priority for the list container
document.addEventListener('DOMContentLoaded', () => {
    const listContainers = document.querySelectorAll('.tree-list-container');
    listContainers.forEach(container => {
        container.addEventListener('wheel', function(e) {
            const pageAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1;
            const pageAtTop = window.scrollY <= 0;
            
            if (e.deltaY > 0 && !pageAtBottom) {
                e.preventDefault();
                window.scrollBy({ top: e.deltaY, behavior: 'auto' });
            } else if (e.deltaY < 0 && container.scrollTop <= 0 && !pageAtTop) {
                e.preventDefault();
                window.scrollBy({ top: e.deltaY, behavior: 'auto' });
            }
        }, { passive: false });
    });
});
