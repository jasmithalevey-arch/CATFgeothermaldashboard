        const next = event.relatedTarget && event.relatedTarget.closest && event.relatedTarget.closest('[data-layer]');
    if (next && el.contains(next)) return;
    hoveredId = null;
    paint();
  });
  el.addEventListener('click', (event) => {
    const button = layerFrom(event);
    if (button) {
      selectedId = button.dataset.layer;
      hoveredId = null;
      paint();
      return;
    }
    const tab = event.target.closest('[data-panel-tab]');
    if (!tab) return;
    panelTab = tab.dataset.panelTab;
    shownId = null;
    renderPanel();
  });
  el.querySelector('#cs-export').addEventListener('click', () => {
    const lines = ['EGS CAPITAL STACK — SOURCE-BOUND RESEARCH', ''];
    layers.forEach((layer) => {
      lines.push(layer.name.toUpperCase(), layer.research.definition, ...layer.research.evidence, '');
    });
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'egs-capital-stack-research.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  });
  function note(container, { source, link, date, type, egsSpecific = true }) {
    if (typeof ChartTheme !== 'undefined' && ChartTheme.sourceNote) {
      ChartTheme.sourceNote(container, { source, link, date, type, egsSpecific });
      return;
    }
    const paragraph = document.createElement('p');
    paragraph.className = 'source-note';
    paragraph.textContent = `Source: ${source}, ${date}. Data type: ${type}.`;
    container.appendChild(paragraph);
  }
  function fallbackChart() {
    const chart = el.querySelector('#cs-chart');
    chart.innerHTML = `<ul class="cs-fallback">${capitalBars.map((bar) => `<li><span>${esc(bar.label)}</span><strong>$${bar.value} million</strong></li>`).join('')}</ul>`;
  }
  function drawChart() {
    const chart = el.querySelector('#cs-chart');
    if (typeof ChartTheme === 'undefined' || typeof Plotly === 'undefined') {
      fallbackChart();
      note(el.querySelector('#cs-chart-note'), {
        source: 'Fervo financing announcements and U.S. DOE award notice',
        date: '2025–2026',
        type: 'actual',
      });
      return;
    }
    ChartTheme.plot(chart, [{
      type: 'bar',
      orientation: 'h',
      y: capitalBars.map((bar) => bar.label),
      x: capitalBars.map((bar) => bar.value),
      marker: { color: capitalBars.map((bar) => ChartTheme.colors[bar.colorKey]) },
      hovertemplate: '%{y}<br>$%{x} million<extra>Actual</extra>',
    }], {
      margin: { t: 12, r: 20, b: 48, l: 160 },
      showlegend: false,
      xaxis: { title: { text: '$ million' }, rangemode: 'tozero' },
      yaxis: { automargin: true, categoryorder: 'array', categoryarray: capitalBars.map((bar) => bar.label).reverse() },
    }).then(() => {
      if (!el.hidden) Plotly.Plots.resize(chart);
    });
    note(el.querySelector('#cs-chart-note'), {
      source: 'Fervo financing announcements and U.S. DOE award notice',
      date: '2025–2026',
      type: 'actual',
    });
  }
  function loadChartTheme() {
    if (typeof ChartTheme !== 'undefined') return Promise.resolve();
    return new Promise((resolve) => {
      let script = document.querySelector('script[data-cs-chart-theme]');
      const finish = () => resolve();
      if (!script) {
        script = document.createElement('script');
        script.src = 'js/chart-theme.js';
        script.dataset.csChartTheme = '1';
        script.onload = finish;
        script.onerror = finish;
        document.head.appendChild(script);
        return;
      }
      script.addEventListener('load', finish);
      script.addEventListener('error', finish);
    });
  }
  function whenVisible(fn) {
    if (!el.hidden) {
      fn();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!el.hidden) {
        observer.disconnect();
        fn();
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['hidden'] });
  }
  paint();
  loadChartTheme().then(() => {
    note(el.querySelector('#cs-metric-note'), {
      source: 'NREL Annual Technology Baseline',
      link: 'https://atb.nrel.gov/',
      date: '2024',
      type: 'modeled',
    });
    whenVisible(drawChart);
  });
};
function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}