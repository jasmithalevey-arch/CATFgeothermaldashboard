window.ComparisonSections = window.ComparisonSections || {};

Dashboard.registerTab({
  id: 'comparison',
  label: 'Comparison',
  title: 'Comparison',
  render(container) {
    container.innerHTML = `
      <div class="subtabs">
        <button class="subtab" data-target="cmp-industry">Industry Comparison</button>
        <button class="subtab" data-target="cmp-global">Global Comparison</button>
      </div>
      <section id="cmp-industry"></section>
      <section id="cmp-global" hidden></section>`;

    ComparisonSections.industry?.(container.querySelector('#cmp-industry'));
    ComparisonSections.global?.(container.querySelector('#cmp-global'));

    const buttons = container.querySelectorAll('.subtab');
    const sections = container.querySelectorAll('section');

    function show(id) {
      sections.forEach(s => { s.hidden = s.id !== id; });
      buttons.forEach(b => b.setAttribute('aria-selected', String(b.dataset.target === id)));
      // Charts drawn while hidden have no width, so resize any that are now visible
      container.querySelectorAll(`#${id} .js-plotly-plot`).forEach(p => Plotly.Plots.resize(p));
    }

    buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.target)));
    show('cmp-industry');
  }
});
