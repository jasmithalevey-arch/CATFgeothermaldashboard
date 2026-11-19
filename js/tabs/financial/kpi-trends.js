window.FinancialSections = window.FinancialSections || {};

FinancialSections.kpiTrends = function (el) {
  if (!el) return;
  if (typeof ChartTheme === 'undefined') {
    let themeLoader = document.querySelector('script[data-kpi-chart-theme]');
    if (!themeLoader) {
      themeLoader = document.createElement('script');
      themeLoader.src = 'js/chart-theme.js';
      themeLoader.dataset.kpiChartTheme = 'true';
      document.head.appendChild(themeLoader);
    }
    themeLoader.addEventListener('load', () => FinancialSections.kpiTrends(el), { once: true });
    themeLoader.addEventListener('error', () => {
      el.innerHTML = '<p class="egs-caveat">The shared chart theme could not be loaded, so the financial charts are temporarily unavailable.</p>';
    }, { once: true });
    return;
  }
  if (el._ktResizeObserver) el._ktResizeObserver.disconnect();

  const sources = {
    iea: 'https://www.iea.org/commentaries/investment-in-next-generation-geothermal-is-surging-policies-are-key-to-further-growth',
    marketReport: 'https://www.nlr.gov/docs/fy26osti/91898.pdf',
    marketPage: 'https://www.nlr.gov/geothermal/2025-us-geothermal-market-report',
    atb2025: 'https://atb.nlr.gov/electricity/2025/geothermal',
    atbWorkbook: 'https://data.openei.org/submissions/8759',
    drillingPaper: 'https://pangea.stanford.edu/ERE/pdf/IGAstandard/SGW/2025/Akindipe.pdf',
    fervoS1: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026033127/fervoenergy-sx1a3.htm',
    fervo10q: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026072482/frvo-20260930.htm',
    fervoQ3: 'https://ir.fervoenergy.com/news-releases/news-release-details/fervo-energy-reports-third-quarter-2026-results',
    fervoTranscript: 'https://www.fool.com/earnings/call-transcripts/2026/11/09/fervo-energy-frvo-q3-2026-earnings-call-transcript/',
    projectRed: 'https://www.energypolicy.columbia.edu/wp-content/uploads/2025/04/EGS-CGEP_EventSummary_040925.pdf',
    corsacPpa: 'https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/about-nvenergy/rates-regulatory/recent-regulatory-filings/irp/IRP-Volume-26.pdf',
    corsacLcoe: 'https://es.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/about-nvenergy/rates-regulatory/recent-regulatory-filings/irp/IRP-Volume-4.pdf'
  };
  // Clickable parenthetical citations: (Author, year, page/figure), with the source URL in the link.
  // Author labels follow the bylines of the original source documents.
  const apa = (author, year, title, url, locator = '') => {
    const authorNames = {
      'International Energy Agency': 'Schulz et al.',
      'Akindipe, D., et al.': 'Akindipe et al.',
      'Akindipe, D., & Witter, E.': 'Akindipe & Witter',
      'Kah, M., & Kleinberg, R.': 'Kah & Kleinberg',
      'The Motley Fool': 'Latimer',
      'Fervo Energy': 'Fervo Energy Company'
    };
    const name = authorNames[author] || author;
    const label = `${name}, ${year.split(',')[0]}${locator ? ', ' + locator : ''}`;
    const tooltip = title.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return `<a class="kt-citation" href="${url}" target="_blank" rel="noopener noreferrer" title="${tooltip}">(${label})</a>`;
  };

  el.innerHTML = `
    <style>
      #fin-kpi-trends .kt-shell{background:var(--page);color:var(--ink);margin:-4rem -2rem -3rem;padding:clamp(16px,3vw,40px);font:400 16px/1.55 "Proxima Nova",var(--font-body);text-align:left}
      #fin-kpi-trends .kt-shell,#fin-kpi-trends .kt-shell *{box-sizing:border-box}
      #fin-kpi-trends .kt-shell h1,#fin-kpi-trends .kt-shell h2,#fin-kpi-trends .kt-shell h3,#fin-kpi-trends .kt-shell p{margin-top:0}
      #fin-kpi-trends .kt-shell h1{max-width:900px;margin-bottom:10px;color:var(--chathams);font:700 33.333px/1.12 "Proxima Nova",var(--font-body)}
      #fin-kpi-trends .kt-shell h2,#fin-kpi-trends .kt-shell h3{margin-bottom:6px;color:var(--chathams);font:700 18.667px/1.3 "Proxima Nova",var(--font-body)}
      #fin-kpi-trends .kt-eyebrow{color:var(--cobalt);font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
      #fin-kpi-trends .kt-subtitle{color:var(--cobalt);font-size:18.667px;font-weight:700}
      #fin-kpi-trends .kt-copy,#fin-kpi-trends .kt-note{max-width:920px;color:var(--muted)}
      #fin-kpi-trends .kt-note{font-size:14px;line-height:1.5}
      #fin-kpi-trends .kt-hero{padding:clamp(1.5rem,4vw,2.75rem) 0 1.5rem;border-bottom:1px solid var(--cadet-light)}
      #fin-kpi-trends .kt-section{padding:clamp(28px,3vw,40px) 0;border-bottom:1px solid var(--cadet-light);scroll-margin-top:140px}
      #fin-kpi-trends .kt-section-head{margin-bottom:1rem}
      #fin-kpi-trends .kt-jump-nav{position:sticky;top:8px;z-index:5;display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 0;padding:10px;background:var(--card);border:1px solid var(--cadet-light);border-radius:0}
      #fin-kpi-trends .kt-jump-nav a{padding:7px 13px;border-radius:var(--radius-pill);color:var(--cobalt);font-size:12px;font-weight:700;text-decoration:none}
      #fin-kpi-trends .kt-jump-nav a:hover{background:var(--cobalt);color:var(--page)}
      #fin-kpi-trends .kt-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:1rem;align-items:stretch}
      #fin-kpi-trends .kt-span-12{grid-column:span 12}#fin-kpi-trends .kt-span-8{grid-column:span 8}#fin-kpi-trends .kt-span-7{grid-column:span 7}#fin-kpi-trends .kt-span-6{grid-column:span 6}#fin-kpi-trends .kt-span-5{grid-column:span 5}#fin-kpi-trends .kt-span-4{grid-column:span 4}
      #fin-kpi-trends .kt-card{min-width:0;height:100%;padding:clamp(1rem,2vw,1.35rem);border-radius:0!important}
      #fin-kpi-trends .kt-card>:last-child{margin-bottom:0}
      #fin-kpi-trends .kt-chart-card{border-top:3px solid var(--cobalt);background:var(--page)}
      #fin-kpi-trends .kt-metric{min-height:190px;display:flex;flex-direction:column;gap:.6rem}
      #fin-kpi-trends .kt-metric-primary{grid-column:span 12;justify-content:center;background:var(--chathams);color:var(--page)}
      #fin-kpi-trends .kt-metric-primary .kt-label,#fin-kpi-trends .kt-metric-primary .kt-note{color:var(--cadet-light)}
      #fin-kpi-trends .kt-metric-primary .kt-value{color:var(--page)}
      #fin-kpi-trends .kt-metric-primary .kt-source,#fin-kpi-trends .kt-metric-primary .kt-source a{color:var(--cadet-light)}
      #fin-kpi-trends .kt-metric-primary details{border-color:var(--cadet);color:var(--cadet-light)}#fin-kpi-trends .kt-metric-primary summary{color:var(--accent)}
      #fin-kpi-trends .kt-metric-secondary{grid-column:span 6;justify-content:center}
      #fin-kpi-trends .kt-label{color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
      #fin-kpi-trends .kt-value{color:var(--cobalt);font:650 clamp(2.1rem,5vw,3.6rem)/1 var(--font-body);font-variant-numeric:tabular-nums}
      #fin-kpi-trends .kt-value.kt-pending{color:var(--muted);font-size:clamp(1.45rem,3vw,2.25rem)}
      #fin-kpi-trends .kt-low-value{font-size:2rem}
      #fin-kpi-trends .kt-accent{color:var(--cobalt);font-weight:650}
      #fin-kpi-trends .kt-chart{width:100%;height:400px;min-width:0}#fin-kpi-trends .kt-chart.kt-chart-tall{height:520px}#fin-kpi-trends .kt-chart.kt-chart-compact{height:300px}#fin-kpi-trends #kt-project-capex{height:580px}#fin-kpi-trends #kt-lcoe{height:540px}
      #fin-kpi-trends .kt-source{margin-top:13px;line-height:1.45;font-size:12px;text-align:left}
      #fin-kpi-trends .kt-source a,#fin-kpi-trends details a,#fin-kpi-trends .kt-copy a,#fin-kpi-trends .kt-citation{color:var(--cobalt);text-underline-offset:3px}
      #fin-kpi-trends .kt-citation{white-space:normal;text-decoration:underline;font-weight:600}
      #fin-kpi-trends .kt-source-library ol{padding-left:1.35rem}
      #fin-kpi-trends .kt-source-library li{margin:.55rem 0;overflow-wrap:anywhere}
      #fin-kpi-trends details{margin-top:13px;border:1px solid var(--cadet-light);padding:11px;color:var(--muted);font-size:12px;border-radius:0}
      #fin-kpi-trends summary{color:var(--cobalt);cursor:pointer;font-weight:650}#fin-kpi-trends details p{margin:.6rem 0 0}
      #fin-kpi-trends .kt-pill{display:inline-flex;align-items:center;gap:.4rem;margin:.2rem .35rem .2rem 0;padding:.3rem .55rem;border:1px solid var(--cadet-light);border-radius:var(--radius-pill);background:var(--page);color:var(--ink);font-size:.7rem}
      #fin-kpi-trends .kt-solid:before,#fin-kpi-trends .kt-dash:before,#fin-kpi-trends .kt-dot:before{content:'';width:22px;border-top:3px solid var(--cobalt)}#fin-kpi-trends .kt-dash:before{border-top-style:dashed}#fin-kpi-trends .kt-dot:before{border-top-style:dotted}
      #fin-kpi-trends .kt-context{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.75rem;margin-top:1rem}#fin-kpi-trends .kt-context div{border-left:2px solid var(--cobalt);padding-left:.75rem}#fin-kpi-trends .kt-context strong{display:block;color:var(--cobalt);font-size:1.2rem}#fin-kpi-trends .kt-context span{color:var(--muted);font-size:.78rem}
      #fin-kpi-trends .kt-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.7rem;margin:.9rem 0}#fin-kpi-trends .kt-stat{background:var(--page);border:1px solid var(--cadet-light);border-radius:0;padding:.75rem}#fin-kpi-trends .kt-stat strong{display:block;color:var(--cobalt);font-size:1.05rem}#fin-kpi-trends .kt-stat span{color:var(--muted);font-size:.75rem}
      #fin-kpi-trends .kt-pending-box{margin:0;border:1px dashed var(--cadet);border-radius:0!important;color:var(--ink)}
      #fin-kpi-trends .kt-financials{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}#fin-kpi-trends .kt-financials div{min-height:145px;padding:1rem;background:var(--page);border:1px solid var(--cadet-light);border-radius:0;display:flex;flex-direction:column;justify-content:center}#fin-kpi-trends .kt-financials strong{display:block;margin:.25rem 0;color:var(--cobalt);font-size:clamp(1.3rem,2.5vw,1.8rem);font-variant-numeric:tabular-nums}#fin-kpi-trends .kt-financials span{display:block;color:var(--muted);font-size:.78rem}#fin-kpi-trends .kt-financials small{color:var(--ink);font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
      #fin-kpi-trends .kt-financials .kt-balance{border-top:4px solid var(--cobalt)}#fin-kpi-trends .kt-financials .kt-contract{border-top:4px solid var(--sky)}#fin-kpi-trends .kt-financials .kt-operations{border-top:4px solid var(--cadet)}
      #fin-kpi-trends #kt-lcoe-section aside .kt-stats{grid-template-columns:repeat(2,minmax(0,1fr))}#fin-kpi-trends #kt-lcoe-section aside .kt-financials{grid-template-columns:1fr}#fin-kpi-trends #kt-lcoe-section aside .kt-financials div{min-height:auto}
      #fin-kpi-trends #kt-funding+.kt-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
      #fin-kpi-trends .kt-highlight-stat{background:var(--accent);border-radius:0;padding:1rem}#fin-kpi-trends .kt-highlight-stat strong{display:block;color:var(--chathams);font-size:clamp(1.8rem,4vw,2.75rem)}
      #fin-kpi-trends .kt-highlight-stat.kt-takeaway strong{font-size:18.667px;margin-bottom:4px}
      #fin-kpi-trends .kt-model-update{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:.65rem;margin-top:1rem;padding:1rem;border-left:4px solid var(--sky);background:var(--card)}
      #fin-kpi-trends .kt-model-update h3,#fin-kpi-trends .kt-model-update p{grid-column:1/-1;margin-bottom:0}#fin-kpi-trends .kt-model-update div{padding:.7rem;background:var(--page);border:1px solid var(--cadet-light)}#fin-kpi-trends .kt-model-update strong{display:block;color:var(--cobalt);font-size:1.3rem}#fin-kpi-trends .kt-model-update span{color:var(--muted);font-size:.75rem}
      #fin-kpi-trends .kt-milestone{display:grid;grid-template-columns:auto 1fr;gap:.85rem;align-items:center;margin:1rem 0;padding:1rem;border-left:5px solid var(--cobalt);background:var(--accent)}#fin-kpi-trends .kt-milestone strong{color:var(--chathams);font-size:1.45rem}#fin-kpi-trends .kt-milestone span{color:var(--ink);font-size:.82rem}
      #fin-kpi-trends .kt-fervo-drilling,#fin-kpi-trends .kt-fervo-capex,#fin-kpi-trends .kt-fervo-growth,#fin-kpi-trends .kt-fervo-history{margin:1.25rem 0;padding:1rem 0;border-top:1px solid var(--cadet-light);border-bottom:1px solid var(--cadet-light)}#fin-kpi-trends #kt-drilling-section{scroll-margin-top:140px}
      #fin-kpi-trends .kt-history-table-wrap{width:100%;overflow-x:auto}
      #fin-kpi-trends .kt-history-table{width:100%;min-width:540px;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums}
      #fin-kpi-trends .kt-history-table th,#fin-kpi-trends .kt-history-table td{padding:12px 14px;border-bottom:1px solid var(--cadet-light);text-align:right;white-space:nowrap}
      #fin-kpi-trends .kt-history-table thead th{background:var(--card);color:var(--chathams);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
      #fin-kpi-trends .kt-history-table thead th:first-child,#fin-kpi-trends .kt-history-table tbody th{text-align:left}
      #fin-kpi-trends .kt-history-table tbody th{color:var(--ink);font-weight:600;white-space:normal}
      #fin-kpi-trends .kt-history-table tbody td{color:var(--cobalt);font-weight:650}
      #fin-kpi-trends .kt-history-table tbody tr:last-child th,#fin-kpi-trends .kt-history-table tbody tr:last-child td{border-bottom:0}
      #fin-kpi-trends .kt-secondary-financials{margin-top:.75rem;grid-template-columns:repeat(2,minmax(0,1fr))}
      #fin-kpi-trends .kt-q3-snapshot{margin-top:1.5rem;padding-top:1.1rem;border-top:1px solid var(--cadet-light)}
      #fin-kpi-trends .kt-q3-summary{margin:.85rem 0 0}
      #fin-kpi-trends .kt-q3-more{background:var(--card);margin-top:1rem}
      #fin-kpi-trends .kt-q3-details{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 1.25rem;margin:1rem 0 0}
      #fin-kpi-trends .kt-q3-details div{padding:.85rem 0;border-bottom:1px solid var(--cadet-light);min-width:0}
      #fin-kpi-trends .kt-q3-details dt{color:var(--muted);font-size:12px;font-weight:600}
      #fin-kpi-trends .kt-q3-details dd{margin:.3rem 0 0;color:var(--cobalt);font-weight:700;font-size:17px;font-variant-numeric:tabular-nums}
      #fin-kpi-trends .kt-q3-details dd span{display:block;margin-top:3px;color:var(--muted);font-size:11px;font-weight:400}
      @media(max-width:720px){#fin-kpi-trends .kt-q3-details{grid-template-columns:1fr}}
      @media(max-width:900px){#fin-kpi-trends .kt-span-8,#fin-kpi-trends .kt-span-7,#fin-kpi-trends .kt-span-6,#fin-kpi-trends .kt-span-5,#fin-kpi-trends .kt-span-4,#fin-kpi-trends .kt-metric-primary,#fin-kpi-trends .kt-metric-secondary{grid-column:span 12}#fin-kpi-trends .kt-context{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:720px){#fin-kpi-trends .kt-shell{margin:-2rem -1rem -2rem;padding:16px}#fin-kpi-trends .kt-shell h1{font-size:29px}#fin-kpi-trends .kt-context,#fin-kpi-trends .kt-stats,#fin-kpi-trends .kt-financials,#fin-kpi-trends .kt-model-update,#fin-kpi-trends #kt-fervo-section aside .kt-financials,#fin-kpi-trends #kt-funding+.kt-stats{grid-template-columns:1fr}#fin-kpi-trends .kt-chart{height:360px}#fin-kpi-trends .kt-chart.kt-chart-tall{height:440px}#fin-kpi-trends .kt-milestone{grid-template-columns:1fr}}
    </style>
    <div class="kt-shell">
      <header class="kt-hero">
        <p class="kt-eyebrow">Financial KPIs for Enhanced Geothermal Systems</p>
        <h1>EGS project economics and investment trends</h1>
        <p class="kt-subtitle">Capital costs, drilling performance, and commercial progress</p>
        <p class="kt-copy">Enhanced geothermal systems (EGS) use engineered underground reservoirs to produce reliable electricity. This dashboard compares project capital costs (USD/kW), drilling costs (USD/ft), and modeled electricity costs (USD/MWh) to assess how EGS economics are evolving. The Fervo Energy case study connects drilling performance with reported spending and contracted capacity. Reported benchmarks, company expectations, targets, and modeled estimates are distinguished throughout.</p>
      </header>
      <nav class="kt-jump-nav" aria-label="KPI Trends section explorer"><a href="#kt-capex">CapEx</a><a href="#kt-drilling-section">Drilling</a><a href="#kt-lcoe-section">LCOE</a><a href="#kt-fervo-section">Fervo</a></nav>

      <section class="kt-section" aria-labelledby="kt-headlines"><div class="kt-section-head"><p class="kt-eyebrow">Investor snapshot</p><h2 id="kt-headlines">Capital deployment at a glance</h2></div><div class="kt-grid">
        <article class="card kt-card kt-metric kt-metric-primary"><span class="kt-label">2025 Global Geothermal Funding</span><strong id="kt-funding-counter" class="kt-value" data-target="18.7">~$0.0B</strong><p class="kt-note">Estimated from rounded annual worldwide funding categories. This is not cumulative EGS capital or an investment count</p><p class="kt-source">${apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea)}</p><details><summary>Investment dataset status</summary><p>No transaction database was found in the accessible project files. A cumulative total would require verified transaction amounts. An investment count would require verified transaction or project records.</p></details></article>
        <article class="card kt-card kt-metric kt-metric-secondary"><span class="kt-label">2025 Next-generation geothermal financing</span><strong class="kt-value">~$2.2B</strong><p class="kt-note">Worldwide annual financing for next-generation geothermal. This amount is included in the ~$18.7B global total and is not EGS-only.</p><p class="kt-source">${apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea)}</p></article>
        <article class="card kt-card kt-metric kt-metric-secondary"><span class="kt-label">Next-generation financing growth | 2025</span><strong class="kt-value">+80%</strong><p class="kt-note">Year-over-year increase compared with 2024, showing faster capital deployment into next-generation geothermal.</p><p class="kt-source">${apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea)}</p></article>
      </div></section>

      <section class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Capital intelligence</p><h2>Funding flows and modeled cost progress</h2></div><div class="kt-grid"><article class="kt-card kt-span-8"><h3>Global Geothermal Funding in 2025</h3><p class="kt-note">Worldwide annual funding, not cumulative industry value or EGS-only investment</p><div id="kt-funding" class="kt-chart kt-chart-tall" role="img" aria-label="Donut chart of global geothermal funding in 2025"></div><div class="kt-highlight-stat"><span class="kt-label">Next-generation geothermal financing | 2023 to 2025</span><strong>Nearly 30%</strong><span>came from debt, including concessional loans</span></div><p class="kt-source">${apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea)}</p><details><summary>Sources &amp; methodology</summary><p>The ~$18.7B total combines rounded IEA categories: more than $11.5B for heating, nearly $5B for conventional power and nearly $2.2B for next-generation geothermal. The calculated shares are approximately 61.5%, 26.7% and 11.8%.</p></details></article><article class="kt-card kt-span-4"><h3>Modeled Deep EGS Capital Cost Improvements</h3><p class="kt-note">Deep EGS Binary overnight capital cost | 2022 USD/kW</p><div id="kt-atb-capex" class="kt-chart kt-chart-compact" role="img" aria-label="Connected-point chart comparing 2021 and 2024 modeled Deep EGS capital costs"></div><div class="kt-model-update"><h3>Latest ATB Model Update</h3><div><strong>$9,868/kW</strong><span>Deep EGS ≥200°C | 2025 ATB average OCC</span></div><div><strong>$16,795/kW</strong><span>Deep EGS 150 to 200°C | 2025 ATB average OCC</span></div><p class="kt-note">These are modeled temperature categories. They are not actual Fervo costs or a direct measure of project improvement</p></div><p class="kt-source">${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport,'Fig. 18, p. 23')} ${apa('National Laboratory of the Rockies','2025','2025 Electricity Annual Technology Baseline: Geothermal',sources.atb2025)}</p><details><summary>Sources &amp; methodology</summary><p>Figure 18 compares $53,240/kW in the 2021 ATB with $19,757/kW in the 2024 ATB. Both are modeled Deep EGS Binary overnight costs in 2022 dollars. The 2025 values use separate temperature categories.</p></details></article></div></section>

      <section id="kt-capex" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Project economics</p><h2>EGS Project CapEx Benchmarks</h2><p class="kt-copy">Three project-specific figures with different evidence statuses, not a continuous time series of achieved costs</p></div><div class="kt-card"><div><span class="kt-pill kt-solid">Reported benchmark</span><span class="kt-pill kt-dot">Company expectation</span><span class="kt-pill kt-dash">Company target</span></div><p class="kt-note">Project Red's source was published in 2025, but it does not specify the year of the underlying $15,000/kW cost. Fervo's Cape Station expectation and Cape Google 400 target were reported in Q3 2026.</p><div id="kt-project-capex" class="kt-chart kt-chart-tall"></div><p class="kt-note"><strong>How to read the comparison:</strong> The $7,000/kW Cape Station Phase I expectation is 53.3% below the $15,000/kW Project Red benchmark. The $5,500/kW Cape Google 400 target is 63.3% below the Project Red benchmark and 21.4% below the Cape Station expectation. These are indicative comparisons across different projects and evidence types, not verified, achieved cost reductions.</p><p class="kt-source">Project Red: ${apa('Kah, M., & Kleinberg, R.','2025','The Potential Contribution of Enhanced Geothermal Systems to Future Power Supply',sources.projectRed,'p. 6')}. Cape Station Phase I: ${apa('Fervo Energy','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}. Cape Google 400: ${apa('The Motley Fool','2026','Fervo Energy Q3 2026 earnings call transcript',sources.fervoTranscript,'Nov. 9 Q3 call')}.</p><details><summary>Sources &amp; methodology</summary><p>Columbia report, p. 6, supports the $15,000/kW Project Red benchmark but does not establish the underlying cost year or identify it as an audited actual expenditure. Fervo's Q3 2026 results describe approximately $7,000/kW as an expected total cost for Cape Station Phase I GeoBlocks 1 to 3. The $5,500/kW Cape Google 400 figure is a company target discussed on Fervo's Q3 2026 earnings call. The percentage differences are calculated from the stated figures and should not be interpreted as realized savings.</p></details></div></section>



      <section id="kt-lcoe-section" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Electricity economics</p><h2>Deep EGS Electricity Costs: Historical ATB Estimates</h2><p class="kt-copy">Approximate modeled LCOE by ATB publication edition | 2022 USD/MWh</p></div><div class="kt-grid"><div class="kt-card kt-span-8"><div id="kt-lcoe" class="kt-chart kt-chart-tall"></div><p class="kt-note">The line ends with the 2024 ATB edition. No 2025 or 2026 value is shown</p><p class="kt-source">${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport,'Fig. 23, p. 27')}</p><details><summary>Sources &amp; methodology</summary><p>Figure 23 provides the approximate chart readings in 2022 USD/MWh. These are modeled estimates, not measured operating costs. No 2026 value is shown because the updated workbook contains several scenarios and tax treatments without one approved comparable series.</p></details></div><aside class="kt-card kt-span-4"><p class="kt-eyebrow">Commercial comparison</p><h3>Corsac Generating Station 2</h3><div class="kt-stats"><div class="kt-stat"><span class="kt-label">Contractual</span><strong>$107/MWh</strong><span>PPA selling price</span></div><div class="kt-stat"><span class="kt-label">Utility estimate</span><strong>$107.69/MWh</strong><span>Contract-related LCOE</span></div></div><div class="kt-financials"><div><strong>115 MW</strong><span>Contracted capacity</span></div><div><strong>15 years</strong><span>Contract term</span></div><div><strong>Jan. 31, 2030</strong><span>Expected commercial operation</span></div></div><p class="kt-note">The utility estimate includes network-upgrade assumptions. It is not Fervo's measured operating cost. Neither figure proves profitability</p><p class="kt-source">PPA price and contract terms: ${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 26',sources.corsacPpa,'Vol. 26, Exhibit 2A')}. Utility-calculated LCOE: ${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 4',sources.corsacLcoe,'Vol. 4, Spitzer p. 22')}.</p><details><summary>Sources &amp; methodology</summary><p>Volume 26 contains the PPA and key provisions. Volume 4, Sean Spitzer testimony, p. 55, contains the utility-calculated LCOE. These are separate commercial measures and are not ATB observations.</p></details></aside></div></section>

      <section id="kt-fervo-section" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Company case study</p><h2>Fervo Energy: From Drilling Innovation to Commercial Development</h2><p class="kt-copy">Achieved operations, reported results and future contracts are shown separately</p></div><div class="kt-card"><div class="kt-milestone"><strong>33 MW GeoBlock 1</strong><span><b>Achieved milestone:</b> commercial operation began September 30, 2026. Fervo reported <b>36 MW of total operating capacity</b> at quarter-end. ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}</span></div><div id="kt-drilling-section" class="kt-fervo-drilling"><p class="kt-eyebrow">Drilling economics</p><h3>Fervo's Drilling Costs: Project Red vs. Cape Station</h3><p class="kt-note">Eight reported wells show how sampled drilling cost per foot differed between two Fervo projects. This is a well-level cost comparison, not total project CapEx.</p><div id="kt-drilling" class="kt-chart kt-chart-tall" role="img" aria-label="Horizontal bar chart comparing reported drilling cost per foot for two Project Red wells and six Cape Station wells"></div><div class="kt-stats"><div class="kt-stat"><strong>$1,050.68/ft</strong><span>Project Red | 2-well average</span></div><div class="kt-highlight-stat"><span class="kt-label">Sampled average comparison</span><strong>58.78% lower</strong><span>Cape Station versus Project Red</span></div><div class="kt-stat"><strong>$433.11/ft</strong><span>Cape Station | 6-well average</span></div></div><p class="kt-note"><strong>$346.45/ft</strong> is the lowest observation among these eight wells. It is not Fervo's all-time low or a measure of total project cost.</p><p class="kt-note">Lower sampled drilling costs can improve project economics by reducing one component of development spending. They do not establish an equivalent reduction in total plant CapEx.</p><p class="kt-source">${apa('Akindipe, D., & Witter, E.','2025','2025 Geothermal Drilling Cost Curves Update',sources.drillingPaper,'Table 1, p. 3')}</p><details><summary>Sources &amp; methodology</summary><p>Table 1, p. 3. The averages use two Project Red wells and six Cape Station wells. The 58.78% comparison uses Project Red as the baseline.</p></details><details><summary>Supporting evidence: Utah FORGE drilling time</summary><p><strong>310 reported drilling hours in 2020</strong> compared with <strong>110 reported drilling hours in 2023</strong>. This measures time, not cost per foot. ${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketPage,'Fig. 20, p. 25')}</p></details></div><div class="kt-fervo-capex"><h3>Fervo's Annual Capital Expenditures (2024–2025)</h3><div id="kt-fervo-capex" class="kt-chart kt-chart-compact" role="img" aria-label="Bar chart comparing Fervo Energy annual capital expenditures in 2024 and 2025"></div><p class="kt-note"><strong>Fervo's annual capital expenditures increased from $178.7 million in 2024 to $465.7 million in 2025, approximately 2.61 times the previous year's spending.</strong> This reflects greater total capital deployment, not an increase in the construction cost per kilowatt.</p><p class="kt-source">${apa('Fervo Energy Company','2026','Amendment No. 3 to Form S-1',sources.fervoS1,'Form S-1/A, p. F-9')} Audited consolidated statements of cash flows, p. F-9. U.S. Securities and Exchange Commission.</p></div><div class="kt-fervo-growth"><h3>Fervo's Contracted Power Capacity Growth</h3><p class="kt-note">Capacity under binding power purchase agreements (PPAs), not operating generation</p><div id="kt-fervo-ppa-growth" class="kt-chart kt-chart-compact" role="img" aria-label="Bar chart showing Fervo Energy contracted PPA capacity rising from 658 megawatts in Q2 2026 to 1,054 megawatts in Q3 2026"></div><div class="kt-highlight-stat kt-takeaway"><strong>+60.2% contracted capacity growth</strong><span>+396 MW from Q2 to Q3 2026</span></div><p class="kt-note">Fervo's capacity under binding power purchase agreements increased from <strong>658 MW in Q2 2026</strong> to <strong>1,054 MW in Q3 2026</strong>, an increase of <strong>396 MW (60.2%)</strong>. The increase reflects additional contracted future electricity supply, including a 396 MW agreement with Google. Contracted capacity is not the same as operating generating capacity.</p><p class="kt-source">${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}</p></div><div class="kt-fervo-history"><h3>Fervo's Historical Financial Performance (2024–2025)</h3><p class="kt-note">Audited full-year company results. All figures below are reported actuals.</p><div class="kt-history-table-wrap"><table class="kt-history-table"><thead><tr><th scope="col">Financial KPI</th><th scope="col">2024 actual</th><th scope="col">2025 actual</th></tr></thead><tbody><tr><th scope="row">Annual revenue</th><td>$199,000</td><td>$138,000</td></tr><tr><th scope="row">Operating loss</th><td>($41.838M)</td><td>($48.806M)</td></tr><tr><th scope="row">Net loss</th><td>($41.110M)</td><td>($57.788M)</td></tr><tr><th scope="row">Year-end cash and cash equivalents</th><td>$193.428M</td><td>$461.836M</td></tr></tbody></table></div><p class="kt-note"><strong>Investor context:</strong> Revenue remained below $200,000 in both years, while operating and net losses increased. Year-end cash and cash equivalents rose from $193.428 million to $461.836 million. These results show a capital-intensive company still scaling its business; cash is a balance-sheet measure, not profit.</p><p class="kt-source">${apa('Fervo Energy Company','2026','Amendment No. 3 to Form S-1',sources.fervoS1,'Form S-1/A, pp. F-4, F-6')} Audited consolidated financial statements, pp. F-4 and F-6. U.S. Securities and Exchange Commission.</p></div><div class="kt-q3-snapshot">
          <h3>Fervo's Q3 2026 Financial Snapshot</h3>
          <p class="kt-note">Cash and contracted revenue backlog as of September 30, 2026; capital expenditures for the three months ended September 30, 2026. Sources: ${apa('Fervo Energy Company','2026','Form 10-Q for the quarter ended September 30, 2026',sources.fervo10q,'Form 10-Q')} ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}</p>
          <div class="kt-financials kt-q3-summary">
            <div class="kt-balance"><small>Reported actual</small><strong>$1.916477B</strong><span>Cash and cash equivalents, not profit</span></div>
            <div class="kt-contract"><small>Contractual</small><strong>~$11.9B</strong><span>Contracted revenue backlog, not recognized revenue</span></div>
            <div class="kt-operations"><small>Reported actual</small><strong>$256.7M</strong><span>Q3 2026 capital expenditures</span></div>
          </div>
          <details class="kt-q3-more">
            <summary>View additional Q3 financial and contract metrics</summary>
            <dl class="kt-q3-details">
              <div><dt>Debt, net of unamortized issuance costs</dt><dd>$301.609M <span>Reported actual ,  September 30, 2026</span></dd></div>
              <div><dt>Capacity under binding PPAs</dt><dd>1,054 MW <span>Contractual ,  not operating generation</span></dd></div>
              <div><dt>Operating loss</dt><dd>$(43.746)M <span>Reported actual ,  Q3 2026</span></dd></div>
              <div><dt>Revenue</dt><dd>$116,000 <span>Reported actual ,  Q3 2026</span></dd></div>
              <div><dt>Net loss attributable to Fervo Energy Company</dt><dd>$(19.527)M <span>Reported actual ,  Q3 2026</span></dd></div>
            </dl>
            <p class="kt-note">Quarterly figures should not be directly compared with full-year totals. Backlog represents contracted future revenue rather than earned revenue; cash is not profit.</p>
          </details>
        </div><div class="kt-highlight-stat kt-takeaway"><strong>Investor takeaway</strong><span>Commercial operation links drilling and construction work to revenue. Long-term contracts show demand, but scaling remains capital intensive</span></div><p class="kt-source">${apa('Fervo Energy Company','2026','Form 10-Q for the quarter ended September 30, 2026',sources.fervo10q,'Form 10-Q')} ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}</p><details><summary>Sources &amp; methodology</summary><p>Debt principal was $317.483M. The $301.609M balance sheet value is net of unamortized issuance costs. Q3 revenue, operating loss and company-attributable net loss follow the 10-Q captions. Backlog is not recognized revenue. Cash is not profit.</p></details></div></section>
      <section class="kt-section kt-source-library" aria-labelledby="kt-references-heading">
        <div class="kt-section-head"><p class="kt-eyebrow">Source documentation</p><h2 id="kt-references-heading">Primary sources and methodology</h2></div>
        <p class="kt-note">Click any parenthetical citation beside a metric or below a chart to open its underlying document. The source list below identifies the reports, company filings, and regulatory records used across this dashboard. Calculated percentages use the rounded figures stated on the relevant charts.</p>
        <details>
          <summary>View all source documents</summary>
          <ol>
            <li>Schulz, R., Lyons, M., Ugur, D., Bennett, S., &amp; Turich, C. (2026, January 23). <em>Investment in next-generation geothermal is surging. Policies are key to further growth.</em> International Energy Agency. <a href="${sources.iea}" target="_blank" rel="noopener noreferrer">Original commentary</a></li>
            <li>Akindipe, D., Martinez Smith, F., Witter, E., Pauling, H., Oh, H., Podgorny, S., Rane, J., Harmon, J., Javed, S., Simpson, J., Shlosberg, D., Holt, E., Trainor-Guitton, W., Levine, A., Schmidt, B., &amp; Pedersen, A. (2026). <em>2025 U.S. Geothermal Market Report.</em> National Laboratory of the Rockies and Geothermal Rising. <a href="${sources.marketReport}" target="_blank" rel="noopener noreferrer">Original report, Figures 18 and 23</a></li>
            <li>National Laboratory of the Rockies. (2025). <em>2025 Electricity Annual Technology Baseline: Geothermal.</em> <a href="${sources.atb2025}" target="_blank" rel="noopener noreferrer">ATB geothermal model and assumptions</a></li>
            <li>Kah, M., &amp; Kleinberg, R. (2025). <em>The potential contribution of enhanced geothermal systems to future power supply.</em> Center on Global Energy Policy, Columbia University. <a href="${sources.projectRed}" target="_blank" rel="noopener noreferrer">Original roundtable summary, p. 6</a></li>
            <li>Akindipe, D., &amp; Witter, E. (2025). <em>2025 Geothermal Drilling Cost Curves Update.</em> Stanford Geothermal Workshop. <a href="${sources.drillingPaper}" target="_blank" rel="noopener noreferrer">Original paper, Table 1, p. 3</a></li>
            <li>Fervo Energy Company. (2026, November 9). <em>Fervo Energy Reports Third Quarter 2026 Results.</em> <a href="${sources.fervoQ3}" target="_blank" rel="noopener noreferrer">Company earnings release</a></li>
            <li>Latimer, T. (2026, November 9). <em>Fervo Energy Q3 2026 earnings call.</em> Transcript published by The Motley Fool. <a href="${sources.fervoTranscript}" target="_blank" rel="noopener noreferrer">Earnings call transcript</a></li>
            <li>Fervo Energy Company. (2026, May 11). <em>Amendment No. 3 to Form S-1.</em> U.S. Securities and Exchange Commission. <a href="${sources.fervoS1}" target="_blank" rel="noopener noreferrer">Audited historical financial statements</a></li>
            <li>Fervo Energy Company. (2026). <em>Form 10-Q for the quarter ended September 30, 2026.</em> U.S. Securities and Exchange Commission. <a href="${sources.fervo10q}" target="_blank" rel="noopener noreferrer">Quarterly balance sheet and financial results</a></li>
            <li>NV Energy. (2024). <em>2024 Integrated Resource Plan, Volume 26.</em> <a href="${sources.corsacPpa}" target="_blank" rel="noopener noreferrer">Corsac contract and $107/MWh price</a></li>
            <li>NV Energy. (2024). <em>2024 Integrated Resource Plan, Volume 4.</em> <a href="${sources.corsacLcoe}" target="_blank" rel="noopener noreferrer">Spitzer testimony and utility-calculated $107.69/MWh LCOE</a></li>
          </ol>
        </details>
      </section>
    </div>`;

  el.querySelectorAll('.kt-card').forEach((card) => card.classList.add('card'));
  el.querySelectorAll('.kt-chart').forEach((chart) => chart.closest('.kt-card')?.classList.add('kt-chart-card'));
  el.querySelectorAll('.kt-source').forEach((note) => note.classList.add('source-note'));
  el.querySelectorAll('.kt-pending-box').forEach((caveat) => caveat.classList.add('egs-caveat'));

  const fundingCounter = el.querySelector('#kt-funding-counter');
  if (fundingCounter) {
    const target = Number(fundingCounter.dataset.target);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const started = performance.now();
    const duration = reduceMotion ? 0 : 1200;
    const tick = (now) => {
      const progress = duration ? Math.min((now - started) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      fundingCounter.textContent = `~$${(target * eased).toFixed(1)}B`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const rootStyles = getComputedStyle(document.documentElement);
  const token = (name) => rootStyles.getPropertyValue(name).trim();
  const colors = {
    ...ChartTheme.colors,
    cobalt: token('--cobalt'), chathams: token('--chathams'), cadet: token('--cadet'),
    accent: token('--accent'), sky: token('--sky'), gridline: token('--cadet-light'),
    page: token('--page'), card: token('--card'), ink: token('--ink'), muted: token('--muted')
  };
  const chartFont = `Proxima Nova, ${ChartTheme.fonts.body}`;
  const base = {paper_bgcolor:'transparent',plot_bgcolor:'transparent',font:{family:chartFont,color:colors.ink,size:12},margin:{t:38,r:20,b:68,l:72},hoverlabel:{bgcolor:colors.page,bordercolor:colors.cobalt,align:'left',namelength:-1,font:{family:chartFont,color:colors.ink,size:12}},xaxis:{gridcolor:colors.gridline,linecolor:colors.cadet,zerolinecolor:colors.cadet,automargin:true},yaxis:{gridcolor:colors.gridline,linecolor:colors.cadet,zerolinecolor:colors.cadet,automargin:true},legend:{orientation:'h',y:-.24,font:{color:colors.ink}}};
  const merge=(a,b)=>{const out={...a};Object.keys(b).forEach(k=>{out[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object'?merge(a[k],b[k]):b[k]});return out};
  const plot=(id,traces,layout={})=>ChartTheme.plot(id,traces,merge(base,layout),{responsive:true});

  const chartIds = ['kt-funding','kt-project-capex','kt-atb-capex','kt-drilling','kt-lcoe','kt-fervo-capex','kt-fervo-ppa-growth'];
  let renderedCompact;
  const renderCharts = () => {
  const compact = el.getBoundingClientRect().width < 720;
  renderedCompact = compact;
  const fundingHover = [
    '<b>Geothermal heating</b><br>More than $11.5B in 2025<br>Approximately 61.5% of global funding<br>Reported annual worldwide funding',
    '<b>Conventional geothermal power</b><br>Nearly $5.0B in 2025<br>Approximately 26.7% of global funding<br>Reported annual worldwide funding',
    '<b>Next-generation geothermal</b><br>Nearly $2.2B in 2025<br>Approximately 11.8% of global funding<br>Reported annual worldwide funding'
  ];
  plot('kt-funding',[{type:'pie',labels:['Heating','Conventional power','Next-generation geothermal'],values:[11.5,5,2.2],hole:.62,sort:false,direction:'clockwise',marker:{colors:[colors.cobalt,colors.chathams,colors.cadet],line:{color:colors.page,width:3}},textinfo:'percent',texttemplate:'%{percent:.1%}',textposition:'inside',automargin:true,hovertext:fundingHover,hoverinfo:'text'}],{margin:compact?{t:15,r:10,b:90,l:10}:{t:30,r:45,b:95,l:45},showlegend:true,legend:{orientation:'h',x:.5,xanchor:'center',y:-.13,yanchor:'top',font:{size:11}},annotations:[{text:'<b>2025</b><br>funding mix',x:.5,y:.5,showarrow:false,font:{family:chartFont,size:compact?13:18,color:colors.chathams}}]});
  plot('kt-project-capex',[{x:[0,15000],y:['Project Red','Project Red'],name:'Reported benchmark',...ChartTheme.style('actual'),line:{color:colors.cobalt,width:5,dash:'solid'},marker:{color:colors.cobalt,size:[0,16],symbol:'circle'},hovertext:['','<b>Project Red</b><br>$15,000/kW<br>Reported project benchmark<br>Source published 2025; underlying cost year not stated<br>Not identified in the source as an audited actual expenditure<br>Kah and Kleinberg (2025), p. 6'],hoverinfo:'text'},{x:[0,7000],y:['Cape Station Phase I','Cape Station Phase I'],name:'Company expectation',mode:'lines+markers',line:{color:colors.chathams,width:3,dash:'dot'},marker:{color:colors.chathams,size:[0,16],symbol:'square'},hovertext:['','<b>Cape Station Phase I</b><br>Approximately $7,000/kW<br>Expected total cost for GeoBlocks 1 to 3 | Q3 2026<br>Company expectation, not an achieved cost<br>Fervo Energy (2026)'],hoverinfo:'text'},{x:[0,5500],y:['Cape Google 400','Cape Google 400'],name:'Company target',...ChartTheme.style('target'),line:{color:colors.sky,width:3,dash:'dash'},marker:{color:colors.sky,size:[0,16],symbol:'diamond'},hovertext:['','<b>Cape Google 400</b><br>$5,500/kW<br>Installed CapEx target | Q3 2026<br>Company target, not an achieved cost<br>Timothy Latimer, Fervo Q3 2026 earnings call'],hoverinfo:'text'}],{margin:compact?{t:70,r:15,b:78,l:115}:{t:88,r:95,b:78,l:175},xaxis:{title:'Reported, expected or targeted CapEx (USD/kW)',range:[0,17000],tickprefix:'$',tickformat:',.0f'},yaxis:{categoryorder:'array',categoryarray:['Cape Google 400','Cape Station Phase I','Project Red']},legend:{orientation:'h',x:0,xanchor:'left',y:1.16},annotations:[{x:10500,y:'Cape Station Phase I',text:'<b>53.3% indicative difference</b><br>Project Red benchmark to Cape Station expectation',showarrow:true,arrowhead:0,ax:compact?0:75,ay:-48,bgcolor:colors.accent,borderpad:7,font:{size:11,color:colors.chathams}}]});
  plot('kt-atb-capex',[{x:['2021 ATB','2024 ATB'],y:[53240,19757],name:'Modeled estimate',...ChartTheme.style('modeled'),line:{color:colors.cadet,width:3,dash:'dot'},marker:{color:[colors.cadet,colors.cobalt],symbol:'circle-open',size:14,line:{width:3}},text:['$53,240/kW','$19,757/kW'],textposition:['top center','bottom center'],hovertext:['<b>2021 ATB edition</b><br>$53,240/kW | 2022 USD<br>Deep EGS Binary overnight capital cost<br>Modeled ATB estimate, not a project actual<br>Akindipe et al. (2026), Figure 18','<b>2024 ATB edition</b><br>$19,757/kW | 2022 USD<br>Deep EGS Binary overnight capital cost<br>Modeled ATB estimate, not a project actual<br>Akindipe et al. (2026), Figure 18'],hoverinfo:'text'}],{margin:{t:55,r:25,b:52,l:72},yaxis:{title:'2022 USD/kW',rangemode:'tozero',tickprefix:'$',tickformat:',.0f'},showlegend:false,annotations:[{xref:'paper',yref:'paper',x:.5,y:.58,text:'<b>62.89% lower</b>',showarrow:false,bgcolor:colors.accent,borderpad:6,font:{color:colors.chathams,size:11}}]});
  const wells=['Project Red | Well 1','Project Red | Well 2','Cape Station | Well 3','Cape Station | Well 4','Cape Station | Well 5','Cape Station | Well 6','Cape Station | Well 7','Cape Station | Well 8'];
  const costs=[994.62,1106.74,633.45,471.59,395.71,346.45,394.08,357.36];
  const drillingHover = wells.map((well,index)=>`<b>${well}</b><br>$${costs[index].toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft<br>Published 2025 well comparison<br>Reported drilling cost<br>Akindipe and Witter (2025), Table 1, p. 3`);
  plot('kt-drilling',[{type:'bar',orientation:'h',x:costs.slice(0,2),y:wells.slice(0,2),name:'Project Red',marker:{color:colors.cobalt,line:{color:colors.chathams,width:1}},text:costs.slice(0,2).map(v=>`$${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft`),textposition:compact?'inside':'outside',cliponaxis:false,hovertext:drillingHover.slice(0,2),hoverinfo:'text'},{type:'bar',orientation:'h',x:costs.slice(2),y:wells.slice(2),name:'Cape Station',marker:{color:colors.sky,line:{color:colors.cadet,width:1}},text:costs.slice(2).map(v=>`$${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft`),textposition:compact?'inside':'outside',cliponaxis:false,hovertext:drillingHover.slice(2),hoverinfo:'text'}],{margin:compact?{t:55,r:20,b:62,l:110}:{t:62,r:100,b:62,l:175},xaxis:{title:'Reported drilling cost (USD/ft)',range:[0,1250],tickprefix:'$',tickformat:',.0f'},yaxis:{autorange:'reversed'},legend:{orientation:'h',x:0,y:1.12},bargap:.3});
  plot('kt-lcoe',[{x:[2021,2022,2023,2024],y:[480,465,473,205],name:'Approximate modeled estimate',...ChartTheme.style('modeled'),line:{color:colors.cobalt,dash:'dot',width:4},marker:{color:colors.page,symbol:'circle',size:14,line:{color:colors.cobalt,width:3}},text:['~$480','~$465','~$473','~$205'],textposition:'top center',hovertext:['<b>2021 ATB edition</b><br>Approximately $480/MWh | 2022 USD<br>Modeled Deep EGS Binary LCOE<br>Modeled estimate, not an operating cost<br>Akindipe et al. (2026), Figure 23','<b>2022 ATB edition</b><br>Approximately $465/MWh | 2022 USD<br>Modeled Deep EGS Binary LCOE<br>Modeled estimate, not an operating cost<br>Akindipe et al. (2026), Figure 23','<b>2023 ATB edition</b><br>Approximately $473/MWh | 2022 USD<br>Modeled Deep EGS Binary LCOE<br>Modeled estimate, not an operating cost<br>Akindipe et al. (2026), Figure 23','<b>2024 ATB edition</b><br>Approximately $205/MWh | 2022 USD<br>Modeled Deep EGS Binary LCOE<br>Modeled estimate, not an operating cost<br>Akindipe et al. (2026), Figure 23'],hoverinfo:'text'}],{margin:{t:58,r:35,b:70,l:82},xaxis:{title:'ATB publication edition, not generation year',dtick:1,range:[2020.75,2024.25]},yaxis:{title:'Approximate modeled LCOE (2022 USD/MWh)',rangemode:'tozero',tickprefix:'$'},showlegend:false});
  plot('kt-fervo-capex',[{type:'bar',x:['2024','2025'],y:[178.693,465.659],name:'Reported actual',marker:{color:[colors.cadet,colors.cobalt],line:{color:colors.chathams,width:1}},text:['$178.7M','$465.7M'],textposition:'outside',cliponaxis:false,hovertext:['<b>2024 annual capital expenditures</b><br>$178.693 million<br>Reported actual annual company CapEx<br>Fervo Energy Company (2026), p. F-9','<b>2025 annual capital expenditures</b><br>$465.659 million<br>Reported actual annual company CapEx<br>Fervo Energy Company (2026), p. F-9'],hoverinfo:'text'}],{margin:{t:42,r:28,b:60,l:88},xaxis:{title:'Fiscal year',type:'category'},yaxis:{title:'Annual capital expenditures (USD millions)',range:[0,535],tickprefix:'$',ticksuffix:'M'},legend:{orientation:'h',x:0,y:1.12}});
  plot('kt-fervo-ppa-growth',[{type:'bar',x:['Q2 2026','Q3 2026'],y:[658,1054],name:'Contracted capacity (binding PPAs)',marker:{color:[colors.cadet,colors.cobalt],line:{color:colors.chathams,width:1}},text:['658 MW','1,054 MW'],textposition:'outside',cliponaxis:false,hovertext:['<b>Q2 2026</b><br>658 MW under binding PPAs<br>Contracted future capacity, not operating generation<br>Fervo Energy (November 9, 2026)','<b>Q3 2026</b><br>1,054 MW under binding PPAs<br>396 MW increase (60.2%) from Q2<br>Contracted future capacity, not operating generation<br>Fervo Energy (November 9, 2026)'],hoverinfo:'text'}],{margin:compact?{t:65,r:20,b:72,l:70}:{t:65,r:28,b:70,l:88},xaxis:{title:'Reporting quarter',type:'category'},yaxis:{title:'Capacity under binding PPAs (MW)',range:[0,1250],ticksuffix:' MW',tickformat:',.0f'},showlegend:false});
  };

  requestAnimationFrame(() => requestAnimationFrame(renderCharts));
  el._ktResizeObserver = new ResizeObserver(() => {
    const nextCompact = el.getBoundingClientRect().width < 720;
    if (renderedCompact !== undefined && nextCompact !== renderedCompact) {
      renderCharts();
      return;
    }
    chartIds.forEach((id) => {
      const chart = document.getElementById(id);
      if (chart && chart.classList.contains('js-plotly-plot')) Plotly.Plots.resize(chart);
    });
  });
  el._ktResizeObserver.observe(el);
};