Dashboard.registerTab({
  id: 'overview',
  label: 'Overview',
  title: 'Geothermal Energy Deployment',
  render(container) {
    Dashboard.emptyState(container, 'A summary of the headline geothermal KPIs will go here. Use the tabs above to explore each category.');
  }
});
