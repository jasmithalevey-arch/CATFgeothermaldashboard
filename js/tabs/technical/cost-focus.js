/**
 * Cost focus — $/m over time and $/well by depth stacked vertically.
 * Styled with this dashboard's ChartTheme (Montserrat / cobalt / chathams).
 */
(function (global) {
  const STATUS = {
    operating: '#03CDA7',
    planned: '#0047BB',
    inactive: '#ABB8C3',
    trend: '#153171',
  };

  function statusColor(sc) {
    if (sc === 'operating') return STATUS.operating;
    if (sc === 'planned') return STATUS.planned;
    return STATUS.inactive;
  }

  function purposeLabel(pc) {
    if (pc === 'commercial') return 'commercial well';
    if (pc === 'research') return 'research / test well';
    return 'purpose unspecified';
  }

  function symbolFor(pc) {
    if (pc === 'commercial') return 'circle';
    if (pc === 'research') return 'square';
    return 'diamond';
  }

  function formatMoneyM(m) {
    if (m == null) return '—';
    if (m >= 1) return '$' + m.toFixed(m >= 10 ? 1 : 2) + 'M';
    return '$' + Math.round(m * 1000).toLocaleString() + 'k';
  }

  function formatCpm(v) {
    return '$' + Math.round(v).toLocaleString();
  }

  function emptySidebarHtml() {
    return `
      <div class="cost-side-kicker">SELECTED WELL</div>
      <h3 class="cost-side-title">Hover a point</h3>
      <p class="cost-side-empty">Move over a well to see cost per meter, depth, estimated cost per well, temperature, and horizontal length when reported.</p>`;
  }

  function wellSidebarHtml(well, idx) {
    const rows = [{ label: 'Cost / meter', value: formatCpm(well.cpm) }];
    if (well.depth != null) {
      rows.push({ label: 'Measured depth', value: `${Math.round(well.depth).toLocaleString()} m` });
    }
    if (well.cpw != null) {
      rows.push({ label: 'Cost / well', value: formatMoneyM(well.cpw) });
    }
    if (well.bht != null) {
      rows.push({ label: 'Bottom-hole temp', value: `${well.bht} °C` });
    }
    if (well.horiz != null) {
      rows.push({ label: 'Horizontal length', value: `${Math.round(well.horiz).toLocaleString()} m` });
    }
    const nn = String(idx + 1).padStart(2, '0');
    return `
      <div class="cost-side-kicker">SELECTED WELL / ${nn}</div>
      <h3 class="cost-side-title">${well.project}</h3>
      <p class="cost-side-well">${well.well}</p>
      <p class="cost-side-meta">${well.year} completion · ${purposeLabel(well.pc)}</p>
      <dl class="cost-side-rows">
        ${rows.map((r) => `<div class="cost-side-row"><dt>${r.label}</dt><dd>${r.value}</dd></div>`).join('')}
      </dl>`;
  }

  function statusLegendHtml(trendLabel) {
    return `
      <span class="leg"><i style="background:${STATUS.operating}"></i>Operating</span>
      <span class="leg"><i style="background:${STATUS.planned}"></i>Planned / in development</span>
      <span class="leg"><i style="background:${STATUS.inactive}"></i>Abandoned / concluded / unknown</span>
      <span class="leg"><svg width="12" height="12"><circle cx="6" cy="6" r="4" fill="${STATUS.inactive}"/></svg>Commercial</span>
      <span class="leg"><svg width="12" height="12"><rect x="2" y="2" width="8" height="8" fill="${STATUS.inactive}"/></svg>Research / test</span>
      <span class="leg"><svg width="12" height="12"><path d="M6 1 L11 6 L6 11 L1 6 Z" fill="${STATUS.inactive}"/></svg>Purpose unspecified</span>
      <span class="leg"><svg width="22" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="${STATUS.trend}" stroke-width="1.5" stroke-dasharray="4 3"/></svg>${trendLabel}</span>`;
  }

  async function mount(container) {
    const yearChartId = 'tech-cost-year-chart';
    const depthChartId = 'tech-cost-depth-chart';

    container.innerHTML = `
      <section class="cost-focus-page">
        <div class="status-banner" data-tone="loading">Loading well cost data…</div>
        <div class="cost-focus-body" hidden>
          <div class="cost-chart-block" data-mode="year">
            <div class="cost-focus-header">
              <div class="cost-focus-heading">
                <h2 class="cost-focus-title">Cost per meter over the past 20 years</h2>
                <p class="cost-focus-lede">Normalized drilling cost per meter for wells completed from 2006 onward. The line is directional, not a forecast. Hover a point — the panel on the right shows that well’s reported values.</p>
              </div>
            </div>
            <div class="cost-legend">${statusLegendHtml('Linear direction')}</div>
            <div class="cost-focus-grid">
              <div class="cost-chart-wrap">
                <div id="${yearChartId}" style="width:100%;height:440px;"></div>
              </div>
              <aside class="cost-sidebar" data-role="sidebar-year" aria-live="polite">${emptySidebarHtml()}</aside>
            </div>
            <p class="cost-footer-note">Hover a point to inspect its reported values. Same-year wells are lightly separated on the time chart; the year in the panel is exact.</p>
          </div>

          <hr class="cost-chart-divider" />

          <div class="cost-chart-block" data-mode="depth">
            <div class="cost-focus-header">
              <div class="cost-focus-heading">
                <h2 class="cost-focus-title">Cost per well by measured depth</h2>
                <p class="cost-focus-lede">Estimated drilling cost per well versus measured depth. The dashed line is the average cost for a well at that depth — points below it are cheaper than average; points above it are more expensive than average. Hover a point for that well’s reported values.</p>
              </div>
            </div>
            <div class="cost-legend">${statusLegendHtml('Avg cost at that depth')}</div>
            <div class="cost-focus-grid">
              <div class="cost-chart-wrap">
                <div id="${depthChartId}" style="width:100%;height:440px;"></div>
              </div>
              <aside class="cost-sidebar" data-role="sidebar-depth" aria-live="polite">${emptySidebarHtml()}</aside>
            </div>
            <p class="cost-footer-note">Hover a point to inspect its reported values. Below the dashed line = better-than-average cost at that depth; above = above-average cost.</p>
          </div>
        </div>
      </section>`;

    const status = container.querySelector('.status-banner');
    const body = container.querySelector('.cost-focus-body');
    const sidebarYear = container.querySelector('[data-role="sidebar-year"]');
    const sidebarDepth = container.querySelector('[data-role="sidebar-depth"]');

    let payload;
    try {
      const res = await fetch('data/cost-focus-wells.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      payload = await res.json();
    } catch (err) {
      status.dataset.tone = 'error';
      status.textContent = 'Could not load data/cost-focus-wells.json.';
      return;
    }

    status.remove();
    body.hidden = false;

    const wells = payload.wells;
    const theme = global.ChartTheme || ChartTheme;

    function buildTraces(modeName) {
      const fit = modeName === 'year' ? payload.fitYear : payload.fitDepth;
      const xs = [];
      const ys = [];
      const colors = [];
      const symbols = [];
      const customdata = [];
      const texts = [];

      wells.forEach((w, i) => {
        const x = modeName === 'year' ? w.year : w.depth;
        const y = modeName === 'year' ? w.cpm : w.cpw;
        if (x == null || y == null) return;
        let xPlot = x;
        if (modeName === 'year') {
          const peers = wells.filter((p) => p.year === w.year);
          const j = peers.indexOf(w);
          xPlot = x + ((j % 5) - 2) * 0.12;
        }
        xs.push(xPlot);
        ys.push(y);
        colors.push(statusColor(w.sc));
        symbols.push(symbolFor(w.pc));
        customdata.push(i);
        texts.push(`${w.project}<br>${w.well}<br>${w.year}<br>${formatCpm(w.cpm)}/m`);
      });

      return [
        {
          type: 'scatter',
          mode: 'markers',
          x: xs,
          y: ys,
          customdata,
          text: texts,
          hoverinfo: 'none',
          marker: {
            size: 11,
            color: colors,
            symbol: symbols,
            line: { color: '#ffffff', width: 1.2 },
            opacity: 0.95,
          },
          name: 'Wells',
          showlegend: false,
        },
        {
          type: 'scatter',
          mode: 'lines',
          x: [fit.x0, fit.x1],
          y: [fit.y0, fit.y1],
          line: { color: STATUS.trend, width: 1.6, dash: 'dash' },
          hoverinfo: 'skip',
          showlegend: false,
          name: 'Trend',
        },
      ];
    }

    async function drawChart(chartId, modeName, sidebarEl) {
      const fonts = theme.fonts;
      const colors = theme.colors;
      const traces = buildTraces(modeName);

      await theme.plot(chartId, traces, {
        margin: { l: 64, r: 20, t: 16, b: 52 },
        title: { text: '' },
        xaxis: {
          title: {
            text: modeName === 'year' ? 'Year drilled' : 'Measured depth (m)',
            font: { family: fonts.body, size: 12, color: colors.chathams },
          },
          range: modeName === 'year' ? [2005.5, 2026.5] : undefined,
          zeroline: false,
          tickfont: { family: fonts.body, size: 11, color: colors.chathams },
        },
        yaxis: {
          title: {
            text: modeName === 'year' ? 'Cost ($2024 / m)' : 'Cost / well ($M)',
            font: { family: fonts.body, size: 12, color: colors.chathams },
          },
          rangemode: 'tozero',
          zeroline: false,
          tickfont: { family: fonts.body, size: 11, color: colors.chathams },
        },
        hovermode: 'closest',
      });

      const chart = document.getElementById(chartId);
      if (window.Plotly) Plotly.Plots.resize(chart);

      function select(ev) {
        const p = ev.points && ev.points[0];
        if (!p || p.customdata == null) return;
        const well = wells[p.customdata];
        if (!well) return;
        sidebarEl.innerHTML = wellSidebarHtml(well, p.customdata);
      }

      chart.on('plotly_hover', select);
      chart.on('plotly_click', select);
    }

    await drawChart(yearChartId, 'year', sidebarYear);
    await drawChart(depthChartId, 'depth', sidebarDepth);
  }

  global.TechnicalSections = global.TechnicalSections || {};
  global.TechnicalSections.costFocus = mount;
})(window);
