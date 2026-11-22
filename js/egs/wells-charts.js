/**
 * Shared well-level scatter helpers for Cost focus / User-facing / Insider / KPI detail.
 */
(function (global) {
  const STATUS_COLOR = {
    operating: "#15803d",
    planned: "#1d4ed8",
    abandoned: "#737373",
    concluded: "#737373",
    unknown: "#737373",
  };

  const COST_FOCUS = {
    commercial: "#E36A2E",
    other: "#9CA3AF",
    trend: "#6B7280",
  };

  function jitter(i, n) {
    if (n <= 1) return 0;
    return ((i % 5) - 2) * 0.12;
  }

  function statusColor(sc) {
    return STATUS_COLOR[sc] || STATUS_COLOR.unknown;
  }

  function symbolFor(pc) {
    if (pc === "commercial") return "circle";
    if (pc === "research") return "square";
    return "diamond";
  }

  function unpackYearSeries(points) {
    // group by year for light x-jitter
    const byYear = {};
    points.forEach((pt, idx) => {
      const y = pt.year;
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push({ pt, idx });
    });
    const xs = [];
    const ys = [];
    const texts = [];
    const colors = [];
    const symbols = [];
    Object.keys(byYear)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((year) => {
        const group = byYear[year];
        group.forEach((g, i) => {
          xs.push(year + jitter(i, group.length));
          ys.push(g.pt.value);
          texts.push(
            `${g.pt.project}<br>${g.pt.well}<br>Year ${g.pt.year}<br>Value: ${formatValue(g.pt.value)}`
          );
          colors.push(statusColor(g.pt.sc));
          symbols.push(symbolFor(g.pt.pc));
        });
      });
    return { xs, ys, texts, colors, symbols };
  }

  function formatValue(v) {
    if (typeof v !== "number") return v;
    if (Math.abs(v) >= 1000) return Math.round(v).toLocaleString();
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
  }

  function trendTrace(fit, name) {
    if (!fit) return null;
    return {
      type: "scatter",
      mode: "lines",
      x: [fit.x0, fit.x1],
      y: [fit.y0, fit.y1],
      name: name || "Trend",
      line: { color: "#404040", width: 1.5, dash: "dash" },
      hoverinfo: "skip",
      showlegend: false,
    };
  }

  function scatterTrace(points, opts) {
    opts = opts || {};
    const u = unpackYearSeries(points);
    return {
      type: "scatter",
      mode: "markers",
      x: u.xs,
      y: u.ys,
      text: u.texts,
      hovertemplate: "%{text}<extra></extra>",
      marker: {
        size: opts.markerSize || 9,
        color: u.colors,
        symbol: u.symbols,
        line: { color: "#ffffff", width: 1 },
        opacity: 0.92,
      },
      name: opts.name || "Wells",
      showlegend: false,
    };
  }

  /** Cost-focus palette: orange commercial, gray other */
  function costFocusTraces(points, fit, mode) {
    // mode: 'perM' | 'perWell'
    const commercial = [];
    const other = [];
    points.forEach((pt) => {
      const row =
        mode === "perWell"
          ? {
              project: pt.project,
              well: pt.well,
              year: pt.year,
              value: pt.cost_well,
              depth: pt.depth_m,
              depth_m: pt.depth_m,
              cost_per_m: pt.cost_per_m,
              cost_well: pt.cost_well,
              pc: pt.pc,
              sc: pt.sc,
            }
          : pt;
      if (pt.pc === "commercial") commercial.push(row);
      else other.push(row);
    });

    function pack(list, color, name) {
      if (mode === "perWell") {
        return {
          type: "scatter",
          mode: "markers",
          x: list.map((p) => p.depth),
          y: list.map((p) => p.value),
          customdata: list,
          text: list.map(
            (p) =>
              `${p.project}<br>${p.well}<br>${p.year}<br>Depth ${Math.round(p.depth).toLocaleString()} m<br>≈ $${Math.round(p.value).toLocaleString()} / well`
          ),
          hovertemplate: "%{text}<extra></extra>",
          marker: {
            size: 10,
            color: color,
            symbol: list.map((p) => symbolFor(p.pc)),
            line: { color: "#fff", width: 1 },
          },
          name: name,
        };
      }
      // Keep stable order for customdata (match jitter groups by year)
      const ordered = [];
      const byYear = {};
      list.forEach((pt) => {
        if (!byYear[pt.year]) byYear[pt.year] = [];
        byYear[pt.year].push(pt);
      });
      Object.keys(byYear)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((year) => {
          byYear[year].forEach((pt) => ordered.push(pt));
        });
      const u = unpackYearSeries(ordered);
      return {
        type: "scatter",
        mode: "markers",
        x: u.xs,
        y: u.ys,
        customdata: ordered,
        text: ordered.map(
          (p) =>
            `${p.project}<br>${p.well}<br>${p.year}<br>$${Math.round(p.value).toLocaleString()} / m`
        ),
        hovertemplate: "%{text}<extra></extra>",
        marker: {
          size: 10,
          color: color,
          symbol: ordered.map((p) => symbolFor(p.pc)),
          line: { color: "#fff", width: 1 },
        },
        name: name,
      };
    }

    const traces = [
      pack(commercial, COST_FOCUS.commercial, "Commercial"),
      pack(other, COST_FOCUS.other, "Other"),
    ];
    if (mode === "perM" && fit) {
      traces.push({
        type: "scatter",
        mode: "lines",
        x: [fit.x0, fit.x1],
        y: [fit.y0, fit.y1],
        line: { color: COST_FOCUS.trend, width: 1.6, dash: "dash" },
        hoverinfo: "skip",
        showlegend: false,
        name: "Trend",
      });
    }
    return traces;
  }

  function plotScatter(el, points, fit, opts) {
    const theme = global.ChartTheme;
    const traces = [scatterTrace(points, opts)];
    const trend = trendTrace(fit);
    if (trend && opts && opts.showTrend !== false) traces.push(trend);

    const layout = theme.layout({
      title: { text: opts.title || "", font: { size: 14 } },
      margin: { l: 64, r: 20, t: opts.title ? 48 : 28, b: 52 },
      xaxis: {
        title: { text: opts.xLabel || "Drill / recompletion year" },
        range: [2005.5, 2026.5],
        dtick: 4,
      },
      yaxis: {
        title: { text: opts.yLabel || "" },
        rangemode: "tozero",
      },
      hovermode: "closest",
    });

    if (opts.plain) {
      layout.paper_bgcolor = "#ffffff";
      layout.plot_bgcolor = "#ffffff";
    }

    return global.Plotly.newPlot(el, traces, layout, theme.config);
  }

  function plotCostFocus(el, data, mode) {
    const theme = global.ChartTheme;
    const points = mode === "perWell" ? data.costWell : data.cost;
    const traces = costFocusTraces(points, data.fits.costPerM, mode);
    const layout = theme.layout({
      paper_bgcolor: "#F7F1E8",
      plot_bgcolor: "#F7F1E8",
      font: { color: "#3F3A34" },
      margin: { l: 70, r: 24, t: 36, b: 56 },
      legend: { orientation: "h", y: 1.12, x: 0 },
      xaxis: {
        title: {
          text: mode === "perWell" ? "Measured depth (m)" : "Year drilled",
        },
        range: mode === "perWell" ? undefined : [2005.5, 2026.5],
        gridcolor: "#E8DFD2",
      },
      yaxis: {
        title: {
          text: mode === "perWell" ? "Est. cost / well ($2024)" : "Cost ($2024 / m)",
        },
        rangemode: "tozero",
        gridcolor: "#E8DFD2",
        tickformat: mode === "perWell" ? "~s" : undefined,
      },
      hovermode: "closest",
    });
    return global.Plotly.newPlot(el, traces, layout, theme.config);
  }

  async function loadWells() {
    const res = await fetch("data/wells-kpis.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  }

  /** Which charts belong on a KPI detail page for a plant section. */
  const SECTION_CHARTS = {
    resource: ["depth", "bht"],
    drilling: ["cost", "days", "costWell"],
    reservoir: ["depth", "bht"],
    monitoring: ["bht"],
    pumps: [],
    plant: ["surfacePlant"],
    water: [],
    grid: ["surfacePlant"],
  };

  global.WellsCharts = {
    loadWells,
    plotScatter,
    plotCostFocus,
    trendTrace,
    scatterTrace,
    statusColor,
    symbolFor,
    formatValue,
    SECTION_CHARTS,
    COST_FOCUS,
  };
})(window);
