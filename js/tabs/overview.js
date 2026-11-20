window.TechnicalSections = window.TechnicalSections || {};

Dashboard.registerTab({
  id: 'overview',
  label: 'Overview',
  title: 'Geothermal Energy Deployment',
  render(container) {
    container.innerHTML = `
      <div class="tech-stack-block" data-role="plant-map-host"></div>
      <hr class="tech-stack-divider" />
      <div class="tech-stack-block" data-role="cost-focus-host"></div>`;

    // Mount after the panel is visible so Plotly gets a real width
    TechnicalSections.plantMap?.(container.querySelector('[data-role="plant-map-host"]'));
    TechnicalSections.costFocus?.(container.querySelector('[data-role="cost-focus-host"]'));
  }
});
