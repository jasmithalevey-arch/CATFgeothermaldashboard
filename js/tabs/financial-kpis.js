window.FinancialSections = window.FinancialSections || {};

Dashboard.registerTab({
  id: 'financial',
  label: 'Financial',
  title: 'Financial',
  render(container) {
    container.innerHTML = `
      <section id="fin-kpi-trends"></section>
      <section id="fin-capital-stack"></section>`;
    FinancialSections.kpiTrends?.(container.querySelector('#fin-kpi-trends'));
    FinancialSections.capitalStack?.(container.querySelector('#fin-capital-stack'));
  }
});
