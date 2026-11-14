/*
 * Shared Plotly styling so every chart on the dashboard matches the CATF brand.
 * Load order in index.html: Plotly, then this file, then js/app.js and the tabs.
 *
 * Basic use inside a tab's render():
 *   ChartTheme.plot(el, traces, { title: { text: 'EGS CapEx ($/kW)' } });
 *   ChartTheme.sourceNote(container, { source: 'NREL ATB 2024', link: 'https://...', date: '2024', type: 'actual' });
 *
 * Mark every data series as 'actual', 'target' or 'modeled' with ChartTheme.style(kind).
 */
const ChartTheme = (() => {
  const colors = {
    cobalt: '#0047BB',   // primary: geothermal / the series we are highlighting
    chathams: '#153171', // text, second series
    cadet: '#ABB8C3',    // comparison series (solar, hydro, gas) and gridlines
    accent: '#FFDE8D',   // highlights and annotations
    sky: '#56BFEE',      // optional extra series (approximate CATF button blue)
    gridline: '#E6EBEF',
  };

  // Default order when a chart has several series. Geothermal should always be the first (cobalt).
  const palette = [colors.cobalt, colors.chathams, colors.cadet, colors.sky, colors.accent];

  const fonts = {
    body: 'Montserrat, system-ui, sans-serif',
    display: '"Source Serif 4", Georgia, serif',
  };

  const baseLayout = {
    font: { family: fonts.body, color: colors.chathams, size: 13 },
    title: { font: { family: fonts.display, size: 20, color: colors.chathams } },
    colorway: palette,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 60, r: 24, b: 56, l: 64 },
    xaxis: { gridcolor: colors.gridline, linecolor: colors.cadet, zerolinecolor: colors.cadet },
    yaxis: { gridcolor: colors.gridline, linecolor: colors.cadet, zerolinecolor: colors.cadet },
    legend: { orientation: 'h', y: -0.2 },
    hoverlabel: { font: { family: fonts.body } },
  };

  const baseConfig = { responsive: true, displaylogo: false };

  // Merge two objects, going down into nested objects (so overriding xaxis.title keeps the gridlines)
  function merge(a, b) {
    const out = { ...a };
    for (const k in b) {
      out[k] = (b[k] && typeof b[k] === 'object' && !Array.isArray(b[k]) && a[k] && typeof a[k] === 'object')
        ? merge(a[k], b[k])
        : b[k];
    }
    return out;
  }

  /**
   * Line/marker style for each kind of data. Use it inside a Plotly trace:
   *   { x: years, y: values, name: 'Actual', ...ChartTheme.style('actual') }
   *   actual  = solid line, filled markers (reported/achieved numbers)
   *   target  = dashed line, diamond markers (announced goals)
   *   modeled = dotted line, open markers (forecasts, e.g. the 2026 ATB trajectory)
   */
  function style(kind) {
    switch (kind) {
      case 'target':
        return { mode: 'lines+markers', line: { dash: 'dash', width: 2 }, marker: { symbol: 'diamond', size: 9 } };
      case 'modeled':
        return {
          mode: 'lines+markers',
          line: { dash: 'dot', width: 2 },
          marker: { symbol: 'circle-open', size: 9, line: { width: 2 } },
        };
      default:
        return { mode: 'lines+markers', line: { dash: 'solid', width: 3 }, marker: { symbol: 'circle', size: 8 } };
    }
  }

  function plot(el, traces, layout = {}, config = {}) {
    const target = typeof el === 'string' ? document.getElementById(el) : el;
    return Plotly.newPlot(target, traces, merge(baseLayout, layout), { ...baseConfig, ...config });
  }

  /**
   * Adds the required source line (and the EGS caveat if needed) under a chart.
   *   ChartTheme.sourceNote(container, {
   *     source: 'Fervo Energy Q2 earnings call', link: 'https://...', date: 'Aug 2026',
   *     type: 'actual',        // 'actual' | 'target' | 'modeled'
   *     egsSpecific: false     // set false if the data is not EGS-specific, to show the caveat
   *   });
   */
  function sourceNote(container, { source, link, date, type, egsSpecific = true }) {
    const p = document.createElement('p');
    p.className = 'source-note';
    p.append(`Source: `);
    if (link) {
      const a = document.createElement('a');
      a.href = link; a.target = '_blank'; a.rel = 'noopener'; a.textContent = source;
      p.append(a);
    } else {
      p.append(source);
    }
    p.append(`, ${date}. Data type: ${type}.`);
    container.appendChild(p);

    if (!egsSpecific) {
      const c = document.createElement('p');
      c.className = 'egs-caveat';
      c.textContent = 'Note: this data is not specific to enhanced geothermal systems (EGS).';
      container.appendChild(c);
    }
  }

  return { colors, palette, fonts, baseLayout, baseConfig, style, plot, sourceNote };
})();