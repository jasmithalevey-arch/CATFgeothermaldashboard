/**
 * Shared Plotly chart styling for the CATF EGS dashboard.
 * Import / use via window.ChartTheme from any tab.
 */
(function (global) {
  const COLORS = {
    brandA: "#0047BB",
    brandB: "#012169",
    brandC: "#00C2F3",
    brandF: "#C45B9B",
    accentEgs: "#2F6F5E",
    accentShr: "#9B2D6B",
    accentClgs: "#1F3F8A",
    muted: "#3D4F6F",
    faint: "#6B7A90",
    grid: "#E6EAF0",
    paper: "#FFFFFF",
    plot: "#FFFFFF",
  };

  const SEQUENCE = [
    COLORS.brandA,
    COLORS.brandF,
    COLORS.brandC,
    COLORS.accentEgs,
    COLORS.accentShr,
    COLORS.accentClgs,
    "#5B6C8F",
  ];

  const baseLayout = {
    font: {
      family: '"Source Sans 3", "Segoe UI", sans-serif',
      color: COLORS.brandB,
      size: 13,
    },
    paper_bgcolor: COLORS.paper,
    plot_bgcolor: COLORS.plot,
    margin: { l: 56, r: 24, t: 36, b: 48 },
    colorway: SEQUENCE,
    hoverlabel: {
      bgcolor: COLORS.brandB,
      bordercolor: COLORS.brandB,
      font: { family: '"Source Sans 3", sans-serif', color: "#fff", size: 12 },
    },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "left",
      x: 0,
      font: { size: 12, color: COLORS.muted },
    },
    xaxis: {
      gridcolor: COLORS.grid,
      zerolinecolor: COLORS.grid,
      linecolor: COLORS.grid,
      tickfont: { color: COLORS.muted, size: 11 },
      title: { font: { size: 12, color: COLORS.muted } },
    },
    yaxis: {
      gridcolor: COLORS.grid,
      zerolinecolor: COLORS.grid,
      linecolor: COLORS.grid,
      tickfont: { color: COLORS.muted, size: 11 },
      title: { font: { size: 12, color: COLORS.muted } },
    },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  function layout(overrides) {
    return deepMerge(baseLayout, overrides || {});
  }

  function deepMerge(a, b) {
    if (!b) return JSON.parse(JSON.stringify(a));
    const out = Array.isArray(a) ? a.slice() : { ...a };
    Object.keys(b).forEach((k) => {
      if (
        b[k] &&
        typeof b[k] === "object" &&
        !Array.isArray(b[k]) &&
        typeof a[k] === "object" &&
        a[k] !== null &&
        !Array.isArray(a[k])
      ) {
        out[k] = deepMerge(a[k], b[k]);
      } else {
        out[k] = b[k];
      }
    });
    return out;
  }

  global.ChartTheme = {
    COLORS,
    SEQUENCE,
    baseLayout,
    config,
    layout,
  };
})(window);
