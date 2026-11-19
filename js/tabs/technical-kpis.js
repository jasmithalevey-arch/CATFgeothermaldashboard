Dashboard.registerTab({
  id: 'technical-kpis',
  label: 'Technical KPIs',
  title: 'Technical KPIs',
  render(container) {
    Dashboard.emptyState(container, 'Technical KPIs for geothermal (for example drilling cost and time, flow rate, thermal drawdown) will go here, compared with adjacent industries.');
  }
});
