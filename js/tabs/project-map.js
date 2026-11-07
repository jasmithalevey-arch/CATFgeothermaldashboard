// Replace MAP_URL with the public/embed link of your CARTO map.
// If the iframe stays blank, enable public sharing in CARTO and use the "Embed" URL.
const MAP_URL = 'https://clausa.app.carto.com/map/29057f4f-e8c8-40c4-987b-4d77e37430f7';

Dashboard.registerTab({
  id: 'project-map',
  label: 'Project Map',
  title: 'US Geothermal Project Tracker',
  render(container) {
    container.innerHTML = `
      <iframe class="map-frame" src="${MAP_URL}" title="Map of US geothermal projects" loading="lazy"></iframe>
      <p><a href="${MAP_URL}" target="_blank" rel="noopener">Open the map in a new tab</a></p>`;
  }
});
