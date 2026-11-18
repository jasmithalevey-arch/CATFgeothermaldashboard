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
  const link = (url, label) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
  const apa = (author, year, title, url) => `${author.replace(/\.$/, '')}. (${year}). <em>${link(url, title)}</em>.`;

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
      #fin-kpi-trends .kt-metric-secondary{grid-column:span 4;justify-content:center}
      #fin-kpi-trends .kt-label{color:var(--muted);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
      #fin-kpi-trends .kt-value{color:var(--cobalt);font:650 clamp(2.1rem,5vw,3.6rem)/1 var(--font-body);font-variant-numeric:tabular-nums}
      #fin-kpi-trends .kt-value.kt-pending{color:var(--muted);font-size:clamp(1.45rem,3vw,2.25rem)}
      #fin-kpi-trends .kt-low-value{font-size:2rem}
      #fin-kpi-trends .kt-accent{color:var(--cobalt);font-weight:650}
      #fin-kpi-trends .kt-chart{width:100%;height:400px;min-width:0}#fin-kpi-trends .kt-chart.kt-chart-tall{height:520px}#fin-kpi-trends .kt-chart.kt-chart-compact{height:300px}#fin-kpi-trends #kt-project-capex{height:580px}#fin-kpi-trends #kt-lcoe{height:540px}
      #fin-kpi-trends .kt-source{margin-top:13px;line-height:1.45;font-size:12px;text-align:left}
      #fin-kpi-trends .kt-source a,#fin-kpi-trends details a,#fin-kpi-trends .kt-copy a{color:var(--cobalt);text-underline-offset:3px}
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
      #fin-kpi-trends .kt-secondary-financials{margin-top:.75rem;grid-template-columns:repeat(2,minmax(0,1fr))}
      @media(max-width:900px){#fin-kpi-trends .kt-span-8,#fin-kpi-trends .kt-span-7,#fin-kpi-trends .kt-span-6,#fin-kpi-trends .kt-span-5,#fin-kpi-trends .kt-span-4,#fin-kpi-trends .kt-metric-primary,#fin-kpi-trends .kt-metric-secondary{grid-column:span 12}#fin-kpi-trends .kt-context{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:720px){#fin-kpi-trends .kt-shell{margin:-2rem -1rem -2rem;padding:16px}#fin-kpi-trends .kt-shell h1{font-size:29px}#fin-kpi-trends .kt-context,#fin-kpi-trends .kt-stats,#fin-kpi-trends .kt-financials,#fin-kpi-trends .kt-model-update,#fin-kpi-trends #kt-fervo-section aside .kt-financials,#fin-kpi-trends #kt-funding+.kt-stats{grid-template-columns:1fr}#fin-kpi-trends .kt-chart{height:360px}#fin-kpi-trends .kt-chart.kt-chart-tall{height:440px}#fin-kpi-trends .kt-milestone{grid-template-columns:1fr}}
    </style>
    <div class="kt-shell">
      <header class="kt-hero">
        <p class="kt-eyebrow">Geothermal investment / KPI trends</p>
        <h1>Geothermal is attracting capital. EGS costs are coming down.</h1>
        <p class="kt-subtitle">The investment opportunity behind next-generation geothermal</p>
        <p class="kt-copy">Investors are watching whether drilling gains and lower modeled costs can turn dependable geothermal power into repeatable project economics</p>
      </header>
      <nav class="kt-jump-nav" aria-label="KPI Trends section explorer"><a href="#kt-capex">CapEx</a><a href="#kt-drilling-section">Drilling</a><a href="#kt-lcoe-section">LCOE</a><a href="#kt-fervo-section">Fervo</a></nav>

      <section class="kt-section" aria-labelledby="kt-headlines"><div class="kt-section-head"><p class="kt-eyebrow">Investor snapshot</p><h2 id="kt-headlines">Capital deployment at a glance</h2></div><div class="kt-grid">
        <article class="card kt-card kt-metric kt-metric-primary"><span class="kt-label">2025 Global Geothermal Funding</span><strong id="kt-funding-counter" class="kt-value" data-target="18.7">~$0.0B</strong><p class="kt-note">Approximate sum of rounded annual worldwide funding categories—not cumulative EGS capital or an investment count</p><p class="kt-source">${apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea)}</p><details><summary>Investment-dataset status</summary><p>No separate first-assignment transaction database was found in the accessible project files. A cumulative invested-capital total would require verified transaction amounts, and an investment count would require verified transaction or project records.</p></details></article>
      </div></section>

      <section class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Capital intelligence</p><h2>Funding flows and modeled cost progress</h2></div><div class="kt-grid"><article class="kt-card kt-span-8"><h3>Global Geothermal Funding in 2025</h3><p class="kt-note">Worldwide annual funding, not cumulative industry value or EGS-only investment</p><div id="kt-funding" class="kt-chart kt-chart-tall" role="img" aria-label="Donut chart of global geothermal funding in 2025"></div><div class="kt-highlight-stat"><span class="kt-label">Next-generation geothermal financing · 2023–2025</span><strong>Nearly 30%</strong><span>came from debt, including concessional loans</span></div><p class="kt-source">${apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea)}</p><details><summary>Sources &amp; methodology</summary><p>The ~$18.7B center value is calculated from rounded categories: more than $11.5B heating, nearly $5B conventional power and nearly $2.2B next-generation geothermal. Their approximate shares are 61.5%, 26.7% and 11.8%; totals reflect rounded inputs.</p></details></article><article class="kt-card kt-span-4"><h3>Modeled Deep EGS Capital Cost Improvements</h3><p class="kt-note">Deep EGS Binary overnight capital cost · 2022 USD/kW</p><div id="kt-atb-capex" class="kt-chart kt-chart-compact" role="img" aria-label="Connected-point chart comparing 2021 and 2024 modeled Deep EGS capital costs"></div><div class="kt-model-update"><h3>Latest ATB Model Update</h3><div><strong>$9,868/kW</strong><span>Deep EGS ≥200°C · 2025 ATB average OCC</span></div><div><strong>$16,795/kW</strong><span>Deep EGS 150–200°C · 2025 ATB average OCC</span></div><p class="kt-note">Different temperature categories and modeled assumptions—not actual Fervo costs or a directly comparable reduction</p></div><p class="kt-source">${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport)} ${apa('National Laboratory of the Rockies','2026','2025 Electricity Annual Technology Baseline: Geothermal',sources.atb2025)}</p><details><summary>Sources &amp; methodology</summary><p>Market Report Figure 18: the 62.89% difference compares $53,240/kW in the 2021 ATB with $19,757/kW in the 2024 ATB, both modeled Deep EGS Binary overnight costs in 2022 dollars. The latest-model values are average OCCs for separate 2025 ATB temperature bins and should not be treated as achieved project costs.</p></details></article></div></section>

      <section id="kt-capex" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Project economics</p><h2>EGS Project Capital Costs Are Declining</h2><p class="kt-copy">Reported, expected and targeted costs are classified separately</p></div><div class="kt-card"><div><span class="kt-pill kt-solid">Reported benchmark</span><span class="kt-pill kt-dot">Company expectation</span><span class="kt-pill kt-dash">Company target</span></div><div id="kt-project-capex" class="kt-chart kt-chart-tall"></div><p class="kt-note"><strong>Primary comparison:</strong> Project Red to Cape Station is an indicative 53.33% benchmark difference—not a verified achieved reduction</p><p class="kt-source">${apa('Kah, M., & Kleinberg, R.','2025','The Potential Contribution of Enhanced Geothermal Systems to Future Power Supply',sources.projectRed)} ${apa('Fervo Energy','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3)} ${apa('The Motley Fool','2026','Fervo Energy Q3 2026 earnings call transcript',sources.fervoTranscript)}</p><details><summary>Sources &amp; methodology</summary><p>Columbia report, p. 6: Project Red $15,000/kW reported benchmark; production began in 2023 and no 2022 cost year is established. Fervo release: Cape Station Phase I expected total cost of ~$7,000/kW. Earnings call: Cape Google 400 future target of $5,500/kW. Secondary indicative differences are 63.33% from Project Red to Cape Google 400 and 21.43% from Cape Station to Cape Google 400.</p></details></div></section>

      <section id="kt-drilling-section" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Drilling economics</p><h2>Reported Drilling Costs: Project Red vs. Cape Station</h2><p class="kt-copy">Eight reported wells show the sampled shift in drilling cost per foot</p></div><div class="kt-card"><div id="kt-drilling" class="kt-chart kt-chart-tall"></div><div class="kt-stats"><div class="kt-stat"><strong>$1,050.68/ft</strong><span>Project Red · 2-well baseline average</span></div><div class="kt-highlight-stat"><span class="kt-label">Sampled average comparison</span><strong>58.78% lower</strong><span>Cape Station versus Project Red</span></div><div class="kt-stat"><strong>$433.11/ft</strong><span>Cape Station · 6-well endpoint average</span></div></div><p class="kt-note"><strong>$346.45/ft</strong> is the lowest observation among the eight wells in this comparison—not necessarily Fervo's all-time low and not total-project CapEx</p><p class="kt-source">${apa('Akindipe, D., & Witter, E.','2025','2025 Geothermal Drilling Cost Curves Update',sources.drillingPaper)}</p><details><summary>Sources &amp; methodology</summary><p>Table 1, p. 3. Project averages are arithmetic means; the 58.78% comparison uses the Project Red average as the baseline.</p></details><details><summary>Supporting evidence: Utah FORGE drilling time</summary><p><strong>310 reported drilling hours in 2020</strong> compared with <strong>110 reported drilling hours in 2023</strong>. This is a drilling-time comparison, not cost per foot. ${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketPage)}</p></details></div></section>

      <section id="kt-lcoe-section" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Electricity economics</p><h2>Deep EGS Electricity Costs — Historical ATB Estimates</h2><p class="kt-copy">Approximate modeled LCOE by ATB publication edition · 2022 USD/MWh</p></div><div class="kt-grid"><div class="kt-card kt-span-8"><div id="kt-lcoe" class="kt-chart kt-chart-tall"></div><p class="kt-note">The historical line ends at the 2024 ATB edition; no 2025 or 2026 observation is implied</p><p class="kt-source">${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport)}</p><details><summary>Sources &amp; methodology</summary><p>Figure 23. Values are approximate chart readings in 2022 USD/MWh and modeled estimates—not measured operating costs. The November 11, 2026 ATB workbook includes multiple Deep EGS Binary projections by scenario and tax treatment, but no single comparable 2026 value was selected without an approved scenario and consistent dollar basis.</p></details></div><aside class="kt-card kt-span-4"><p class="kt-eyebrow">Commercial comparison</p><h3>Corsac Generating Station 2</h3><div class="kt-stats"><div class="kt-stat"><span class="kt-label">Contracted selling price</span><strong>$107/MWh</strong><span>PPA price</span></div><div class="kt-stat"><span class="kt-label">Utility cost estimate</span><strong>$107.69/MWh</strong><span>Contract-related LCOE</span></div></div><div class="kt-financials"><div><strong>115 MW</strong><span>Contracted capacity</span></div><div><strong>15 years</strong><span>Contract term</span></div><div><strong>Jan. 31, 2030</strong><span>Expected commercial operation</span></div></div><p class="kt-note">The utility LCOE includes network-upgrade assumptions and is not Fervo's measured operating LCOE. Neither measure demonstrates realized profitability</p><p class="kt-source">${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 26',sources.corsacPpa)} ${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 4',sources.corsacLcoe)}</p><details><summary>Sources &amp; methodology</summary><p>Volume 26, Exhibit 2A and Corsac PPA Key Provisions. Volume 4, Sean Spitzer testimony, p. 55. The PPA and utility-calculated contract LCOE are separate commercial measurements and are not ATB observations.</p></details></aside><div class="kt-pending-box kt-span-12"><strong>2026 forecast pending verification</strong> · Contact Kiki and Jasmitha to select the exact Deep EGS Binary scenario, tax treatment, financial assumptions and dollar basis before adding a dotted forecast. ${apa('Mirletz, B., et al.','2026','2025 Annual Technology Baseline Cost and Performance Data for Electricity Generation Technologies',sources.atbWorkbook)}</div></div></section>

      <section id="kt-fervo-section" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Company case study</p><h2>Fervo Energy: From Drilling Innovation to Commercial Development</h2><p class="kt-copy">Achieved operations, reported results and contracted future activity are classified separately</p></div><div class="kt-card"><div class="kt-milestone"><strong>33 MW GeoBlock 1</strong><span><b>Achieved operational milestone:</b> commercial operation declared September 30, 2026 · Fervo reported <b>36 MW total operating capacity</b> at quarter-end</span></div><p class="kt-label">Balance sheet and contracts · September 30, 2026</p><div class="kt-financials"><div class="kt-balance"><small>Reported actual</small><strong>$1.916477B</strong><span>Cash and cash equivalents—not profit</span></div><div class="kt-balance"><small>Reported actual</small><strong>$301.609M</strong><span>Debt, net of unamortized issuance costs</span></div><div class="kt-contract"><small>Contractual</small><strong>~$11.9B</strong><span>Revenue backlog—not recognized revenue</span></div></div><p class="kt-label">Third quarter 2026 development and contracts</p><div class="kt-financials"><div class="kt-contract"><small>Contractual</small><strong>1,054 MW</strong><span>Capacity under binding PPAs</span></div><div class="kt-operations"><small>Reported actual</small><strong>$256.7M</strong><span>Quarterly capital expenditures</span></div><div class="kt-operations"><small>Reported actual</small><strong>$(43.746)M</strong><span>Operating loss</span></div></div><p class="kt-label">Third quarter 2026 financial performance</p><div class="kt-financials kt-secondary-financials"><div class="kt-operations"><small>Reported actual</small><strong>$116,000</strong><span>Revenue</span></div><div class="kt-operations"><small>Reported actual</small><strong>$(19.527)M</strong><span>Net loss attributable to Fervo Energy Company</span></div></div><div class="kt-highlight-stat kt-takeaway"><strong>Investor takeaway</strong><span>Commercial operation connects drilling execution to revenue generation, while construction spending and contracted demand show the capital intensity of scaling</span></div><p class="kt-source">${apa('Fervo Energy Company','2026','Form 10-Q for the quarter ended September 30, 2026',sources.fervo10q)} ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3)}</p><details><summary>Sources &amp; methodology</summary><p>Outstanding debt principal was $317.483M; the $301.609M balance-sheet carrying value is net of unamortized issuance costs. Q3 revenue, operating loss and net loss attributable to Fervo Energy Company follow the 10-Q captions. The separate $20.8M net loss attributable to common stockholders is not displayed. Backlog is not recognized revenue, cash is not profit and capital expenditures do not establish profitability. See the drilling section for related technical-cost evidence.</p></details></div></section>
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
  const base = {paper_bgcolor:'transparent',plot_bgcolor:'transparent',font:{family:chartFont,color:colors.ink,size:12},margin:{t:38,r:20,b:68,l:72},hoverlabel:{bgcolor:colors.chathams,bordercolor:colors.sky,font:{family:chartFont,color:colors.page}},xaxis:{gridcolor:colors.gridline,linecolor:colors.cadet,zerolinecolor:colors.cadet,automargin:true},yaxis:{gridcolor:colors.gridline,linecolor:colors.cadet,zerolinecolor:colors.cadet,automargin:true},legend:{orientation:'h',y:-.24,font:{color:colors.ink}}};
  const merge=(a,b)=>{const out={...a};Object.keys(b).forEach(k=>{out[k]=b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object'?merge(a[k],b[k]):b[k]});return out};
  const plot=(id,traces,layout={})=>ChartTheme.plot(id,traces,merge(base,layout),{responsive:true});

  const chartIds = ['kt-funding','kt-project-capex','kt-atb-capex','kt-drilling','kt-lcoe'];
  let renderedCompact;
  const renderCharts = () => {
  const compact = el.getBoundingClientRect().width < 720;
  renderedCompact = compact;
  plot('kt-funding',[{type:'pie',labels:['Heating · >$11.5B','Conventional power · ~$5.0B','New technology · ~$2.2B'],values:[11.5,5,2.2],hole:.62,sort:false,direction:'clockwise',marker:{colors:[colors.cobalt,colors.chathams,colors.cadet],line:{color:colors.page,width:3}},textinfo:compact?'percent':'label+percent',textposition:compact?'inside':'outside',automargin:true,customdata:[['Geothermal heating','More than $11.5B','61.5%'],['Conventional geothermal power','Nearly $5.0B','26.7%'],['Next-generation geothermal','Nearly $2.2B','11.8%']],hovertemplate:'<b>%{customdata[0]}</b><br>%{customdata[1]} in 2025<br>Approx. %{customdata[2]} of rounded-category sum<br>Classification: reported annual worldwide funding<extra></extra>'}],{margin:compact?{t:15,r:10,b:90,l:10}:{t:30,r:45,b:95,l:45},showlegend:true,legend:{orientation:'h',x:.5,xanchor:'center',y:-.13,yanchor:'top',font:{size:11}},annotations:[{text:'<b>~$18.7B</b><br><span>annual funding</span>',x:.5,y:.5,showarrow:false,font:{family:chartFont,size:compact?13:18,color:colors.chathams}}]});
  plot('kt-project-capex',[{x:[0,15000],y:['Project Red','Project Red'],name:'Reported benchmark',...ChartTheme.style('actual'),line:{color:colors.cobalt,width:5,dash:'solid'},marker:{color:colors.cobalt,size:[0,16],symbol:'circle'},customdata:[['',''],['Reported project CapEx','53.33% vs. Cape Station expected cost · 63.33% vs. Cape Google target']],hovertemplate:'<b>Project Red</b><br>$%{x:,.0f}/kW<br>%{customdata[0]}<br>Classification: reported benchmark<br>%{customdata[1]}<br>Kah & Kleinberg (2025), p. 6<extra></extra>'},{x:[0,7000],y:['Cape Station Phase I','Cape Station Phase I'],name:'Company expectation',mode:'lines+markers',line:{color:colors.chathams,width:3,dash:'dot'},marker:{color:colors.chathams,size:[0,16],symbol:'square'},customdata:[['',''],['Expected total cost · GeoBlocks 1–3','53.33% vs. Project Red · 21.43% vs. Cape Google target']],hovertemplate:'<b>Cape Station Phase I</b><br>~$%{x:,.0f}/kW<br>%{customdata[0]}<br>Classification: company expectation—not achieved actual<br>%{customdata[1]}<br>Fervo Energy (2026)<extra></extra>'},{x:[0,5500],y:['Cape Google 400','Cape Google 400'],name:'Company target',...ChartTheme.style('target'),line:{color:colors.sky,width:3,dash:'dash'},marker:{color:colors.sky,size:[0,16],symbol:'diamond'},customdata:[['',''],['Future installed CapEx target · GeoBlocks 4–11','63.33% vs. Project Red · 21.43% vs. Cape Station expected cost']],hovertemplate:'<b>Cape Google 400</b><br>$%{x:,.0f}/kW<br>%{customdata[0]}<br>Classification: company target<br>%{customdata[1]}<br>Timothy Latimer, Q3 2026 earnings call<extra></extra>'}],{margin:compact?{t:70,r:15,b:78,l:115}:{t:88,r:95,b:78,l:175},xaxis:{title:'Installed capital cost (USD/kW)',range:[0,17000],tickprefix:'$',tickformat:',.0f'},yaxis:{categoryorder:'array',categoryarray:['Cape Google 400','Cape Station Phase I','Project Red']},legend:{orientation:'h',x:0,xanchor:'left',y:1.16},annotations:[{x:10500,y:'Cape Station Phase I',text:'<b>53.33% indicative difference</b><br>reported benchmark → expected cost',showarrow:true,arrowhead:0,ax:compact?0:75,ay:-48,bgcolor:colors.accent,borderpad:7,font:{size:11,color:colors.chathams}}]});
  plot('kt-atb-capex',[{x:['2021 ATB','2024 ATB'],y:[53240,19757],name:'Modeled estimate',...ChartTheme.style('modeled'),line:{color:colors.cadet,width:3,dash:'dot'},marker:{color:[colors.cadet,colors.cobalt],symbol:'circle-open',size:14,line:{width:3}},text:['$53,240/kW','$19,757/kW'],textposition:['top center','bottom center'],customdata:[['Deep EGS Binary · 2022 USD/kW','2021 ATB publication edition'],['Deep EGS Binary · 2022 USD/kW','2024 ATB publication edition']],hovertemplate:'<b>%{customdata[1]}</b><br>$%{y:,.0f}/kW<br>%{customdata[0]}<br>Classification: modeled ATB estimate—not project actual<br>Akindipe et al. (2026), fig. 18<extra></extra>'}],{margin:{t:55,r:25,b:52,l:72},yaxis:{title:'2022 USD/kW',rangemode:'tozero',tickprefix:'$',tickformat:',.0f'},showlegend:false,annotations:[{xref:'paper',yref:'paper',x:.5,y:.58,text:'<b>62.89% lower</b>',showarrow:false,bgcolor:colors.accent,borderpad:6,font:{color:colors.chathams,size:11}}]});
  const wells=['Project Red · Well 1','Project Red · Well 2','Cape Station · Well 3','Cape Station · Well 4','Cape Station · Well 5','Cape Station · Well 6','Cape Station · Well 7','Cape Station · Well 8'];
  const costs=[994.62,1106.74,633.45,471.59,395.71,346.45,394.08,357.36];
  plot('kt-drilling',[{type:'bar',orientation:'h',x:costs.slice(0,2),y:wells.slice(0,2),name:'Project Red',marker:{color:colors.cobalt,line:{color:colors.chathams,width:1}},text:costs.slice(0,2).map(v=>`$${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft`),textposition:compact?'inside':'outside',cliponaxis:false,hovertemplate:'<b>%{y}</b><br>$%{x:,.2f}/ft<br>Classification: reported well cost<br>Akindipe & Witter (2025), table 1, p. 3<extra></extra>'},{type:'bar',orientation:'h',x:costs.slice(2),y:wells.slice(2),name:'Cape Station',marker:{color:colors.sky,line:{color:colors.cadet,width:1}},text:costs.slice(2).map(v=>`$${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft`),textposition:compact?'inside':'outside',cliponaxis:false,hovertemplate:'<b>%{y}</b><br>$%{x:,.2f}/ft<br>Classification: reported well cost<br>Akindipe & Witter (2025), table 1, p. 3<extra></extra>'}],{margin:compact?{t:55,r:20,b:62,l:110}:{t:62,r:100,b:62,l:175},xaxis:{title:'Reported drilling cost (USD/ft)',range:[0,1250],tickprefix:'$',tickformat:',.0f'},yaxis:{autorange:'reversed'},legend:{orientation:'h',x:0,y:1.12},bargap:.3});
  plot('kt-lcoe',[{x:[2021,2022,2023,2024],y:[480,465,473,205],name:'Approximate modeled estimate',...ChartTheme.style('modeled'),line:{color:colors.cobalt,dash:'dot',width:4},marker:{color:colors.page,symbol:'circle',size:14,line:{color:colors.cobalt,width:3}},text:['~$480','~$465','~$473','~$205'],textposition:'top center',customdata:['2021 ATB edition','2022 ATB edition','2023 ATB edition','2024 ATB edition'],hovertemplate:'<b>%{customdata}</b><br>~$%{y:,.0f}/MWh (2022 USD)<br>Classification: modeled ATB estimate—not operating cost<br>Akindipe et al. (2026), fig. 23<extra></extra>'}],{margin:{t:78,r:35,b:70,l:82},xaxis:{title:'ATB publication edition—not generation year',dtick:1,range:[2020.75,2024.25]},yaxis:{title:'Approximate modeled LCOE (2022 USD/MWh)',rangemode:'tozero',tickprefix:'$'},showlegend:false,annotations:[{xref:'paper',yref:'paper',x:1,y:1.13,xanchor:'right',text:'<b>2026 forecast pending verification</b>',showarrow:false,bgcolor:colors.accent,borderpad:7,font:{color:colors.chathams,size:11}}]});
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
