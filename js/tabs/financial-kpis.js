window.FinancialSections = window.FinancialSections || {};

Dashboard.registerTab({
  id: 'financial',
  label: 'Financial',
  title: 'Financial',
  render(container) {
    container.innerHTML = `
      <div class="subtabs">
        <button class="subtab" data-target="fin-kpi-trends">KPI Trends</button>
        <button class="subtab" data-target="fin-capital-stack">Capital Stack</button>
      </div>
      <section id="fin-kpi-trends"></section>
      <section id="fin-capital-stack" hidden></section>`;

    FinancialSections.kpiTrends?.(container.querySelector('#fin-kpi-trends'));
    FinancialSections.capitalStack?.(container.querySelector('#fin-capital-stack'));

    const buttons = container.querySelectorAll('.subtab');
    const sections = container.querySelectorAll('section');

    function show(id) {
      sections.forEach(s => { s.hidden = s.id !== id; });
      buttons.forEach(b => b.setAttribute('aria-selected', String(b.dataset.target === id)));
      // Charts drawn while hidden have no width, so resize any that are now visible
      container.querySelectorAll(`#${id} .js-plotly-plot`).forEach(p => Plotly.Plots.resize(p));
    }

    buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.target)));
    show('fin-kpi-trends');
  }
});
