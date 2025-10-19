

(function () {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  if (!mapToken) {
    mapEl.innerText = 'Missing map token';
    return;
  }

  if (typeof mapboxgl === 'undefined') {
    mapEl.innerText = 'Missing Mapbox library';
    return;
  }

  // Default fallback coordinates
  let coords = [-74.5, 40];
  // Use listing.geometry.coordinates if available
  if (listing?.geometry?.coordinates?.length === 2) {
    coords = listing.geometry.coordinates.map(Number);
  } else {
    console.warn('Listing coordinates invalid or missing, using fallback.');
  }

  mapboxgl.accessToken = mapToken;

  // Remove old map instance if exists
  if (mapEl._mapboxInstance) {
    try { mapEl._mapboxInstance.remove(); } catch (e) {}
    delete mapEl._mapboxInstance;
  }

  // Initialize Mapbox map
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coords,
    zoom: 12
  });
  mapEl._mapboxInstance = map;

  map.on('load', () => {
    map.addControl(new mapboxgl.NavigationControl());

    // Red circular marker
    const markerEl = document.createElement('div');
    Object.assign(markerEl.style, {
      width: '28px',
      height: '28px',
      background: '#ff3333',
      borderRadius: '50%',
      border: '2px solid #fff',
      boxShadow: '0 0 6px rgba(0,0,0,0.3)'
    });

    // Popup content
    const title = listing?.title || 'Listing';
    const locationText = listing?.location || '';

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<strong>${escapeHtml(title)}</strong><div>${escapeHtml(locationText)}</div>`);

    new mapboxgl.Marker({color:"red"})
      .setLngLat(coords)
      .setPopup(popup)
      .addTo(map)
      .togglePopup(); // open by default
  });

  map.on('error', e => console.error('Map error:', e));

  // Simple HTML escape
  function escapeHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
