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
  if (el._ktChartReadyHandler) {
    window.removeEventListener('load', el._ktChartReadyHandler);
    document.removeEventListener('visibilitychange', el._ktChartReadyHandler);
    el._ktChartReadyHandler = null;
  }
  if (el._ktCounterObserver) {
    el._ktCounterObserver.disconnect();
    el._ktCounterObserver = null;
  }
  if (el._ktCounterRaf != null) {
    cancelAnimationFrame(el._ktCounterRaf);
    el._ktCounterRaf = null;
  }
  if (el._ktCounterVisibilityHandler) {
    document.removeEventListener('visibilitychange', el._ktCounterVisibilityHandler);
    el._ktCounterVisibilityHandler = null;
  }
  if (el._ktCounterFallbackHandler) {
    window.removeEventListener('scroll', el._ktCounterFallbackHandler);
    window.removeEventListener('resize', el._ktCounterFallbackHandler);
    el._ktCounterFallbackHandler = null;
  }

  const sources = {
    iea: 'https://www.iea.org/commentaries/investment-in-next-generation-geothermal-is-surging-policies-are-key-to-further-growth',
    marketReport: 'https://docs.nlr.gov/docs/fy26osti/91898.pdf',
    marketPage: 'https://www.nlr.gov/geothermal/2025-us-geothermal-market-report',
    atb2025: 'https://atb.nlr.gov/electricity/2025/geothermal',
    atbWorkbook: 'https://data.openei.org/submissions/8759',
    atbWorkbookV2: 'https://data.openei.org/files/8759/2025_v2_Workbook_11-11-2026.xlsx',
    atbData: 'https://atb.nlr.gov/electricity/2025/data',
    atbDefinitions: 'https://atb.nlr.gov/electricity/2025/2023/definitions',
    atbArchive: 'https://atb.nlr.gov/archive',
    atb2021Data: 'https://data.openei.org/submissions/4129',
    atb2022Data: 'https://data.openei.org/submissions/5716',
    atb2023Data: 'https://data.openei.org/submissions/5865',
    atb2024Data: 'https://data.openei.org/submissions/6006',
    doeLiftoff: 'https://apps.openei.org/GeoCLUSTER/assets/pdfs/DOE%20Report%202024_Pathways%20to%20Commercial%20liftoff.pdf#page=37',
    doeLiftoffAnnouncement: 'https://content.govdelivery.com/accounts/USEERE/bulletins/39137dd',
    doeShot: 'https://www.energy.gov/sites/default/files/2023-09/Investing%20in%20Opportunity-%20How%20the%20Geothermal%20Technologies%20Office%20is%20Supporting%20Geothermal%20Everywhere.pdf',
    fervoPhaseI: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026055942/exhibit991earningsrelease8.htm',
    fervoGoogle: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026059707/frvo-20260826.htm',
    fervoProspectus: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026034849/fervoenergy-424b4.htm',
    drillingPaper: 'https://pangea.stanford.edu/ERE/pdf/IGAstandard/SGW/2025/Akindipe.pdf',
    fervoS1: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026033127/fervoenergy-sx1a3.htm',
    fervo10q: 'https://www.sec.gov/Archives/edgar/data/1853868/000162828026072482/frvo-20260930.htm',
    fervoQ3: 'https://ir.fervoenergy.com/news-releases/news-release-details/fervo-energy-reports-third-quarter-2026-results',
    fervoTranscript: 'https://www.fool.com/earnings/call-transcripts/2026/11/09/fervo-energy-frvo-q3-2026-earnings-call-transcript/',
    projectRed: 'https://www.energypolicy.columbia.edu/wp-content/uploads/2025/04/EGS-CGEP_EventSummary_040925.pdf',
    corsacPpa: 'https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/about-nvenergy/rates-regulatory/recent-regulatory-filings/irp/IRP-Volume-26.pdf#page=188',
    corsacLcoe: 'https://es.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/about-nvenergy/rates-regulatory/recent-regulatory-filings/irp/IRP-Volume-4.pdf'
  };
  const apa = (author, year, title, url, locator = '') => {
    const authorNames = {
      'International Energy Agency': 'Schulz et al.',
      'Akindipe, D., et al.': 'Akindipe et al.',
      'Akindipe, D., & Witter, E.': 'Akindipe & Witter',
      'Kah, M., & Kleinberg, R.': 'Kah & Kleinberg',
      'The Motley Fool': 'Timothy Latimer',
      'Lauren Boyd': 'Boyd',
      'Fervo Energy': 'Fervo Energy Company'
    };
    const name = authorNames[author] || author;
    const label = `${name}, ${year.split(',')[0]}${locator ? ', ' + locator : ''}`;
    const tooltip = title.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return `<a class="kt-citation" href="${url}" target="_blank" rel="noopener noreferrer" title="${tooltip}">(${label})</a>`;
  };

  const kpiData = {
    funding: {heating: 11.5, conventional: 5, nextGeneration: 2.2, growth: 80, grants: 9, debt: 30},
    // Company-level grant disclosures: award amounts, accounting balances and
    // conditional funding are distinct and must not be summed.
    fervoGrants: {
      originalDoeAwardM: 22.1, amendedDoeAwardM: 23.1,
      originalAwardDate: 'July 1, 2024', amendedTermEnd: 'July 31, 2027',
      smallerGrantAwardsM: 0.7, grantIncome2025M: 14.1,
      grantIncomeQ32026M: 19.5, potentialAwardsM: 20
    },
    // Q3 2026 consolidated financial statements (USD millions unless noted).
    // Income attribution and debt carrying value are distinct accounting measures.
    fervoQ3Financials: {
      operatingLossM: -43.746, revenueUSD: 116000,
      pretaxLossM: -18.251, incomeTaxBenefitM: 29.911,
      consolidatedNetIncomeM: 11.660,
      redeemableNoncontrollingIncomeM: 31.187,
      attributableNetLossM: -19.527,
      debtPrincipalM: 317.483, unamortizedDebtIssuanceCostsM: 15.874,
      debtNetOfIssuanceCostsM: 301.609
    },
    projectCapex: {red: 15000, cape: 7000, google: 5500},
    atb: {historicalYears: [2021, 2024], historicalCapex: [53240, 19757], hotOcc: 9868, binaryOcc: 16795,
      representativeFlashOcc: 6653, representativeBinaryOcc: 10758,
      flashOccRange: [7416, 14500], binaryOccRange: [10042, 26194],
      // A null value is a research gap, never a zero-cost or forecast observation.
      lcoePoints: [
        {edition: 2021, value: 480, status: 'approximate', dataset: 'atb2021Data'},
        {edition: 2022, value: 465, status: 'approximate', dataset: 'atb2022Data'},
        {edition: 2023, value: 473, status: 'approximate', dataset: 'atb2023Data'},
        {edition: 2024, value: 205, status: 'approximate', dataset: 'atb2024Data'},
        {edition: 2025, value: null, status: 'unverified', dataset: 'atbWorkbookV2'}
      ], latestEdition: 2025, forecastEdition: 2026},
    drilling: [994.62, 1106.74, 633.45, 471.59, 395.71, 346.45, 394.08, 357.36],
    capitalNeeded: {targetGWe: 40, targetYear: 2035},
    // Published DOE pathway, separate from the EGS-only benchmark calculations.
    commercialLiftoff: {
      reportYear: 2024, liftoffYear: 2030, scaleYear: 2050,
      deploymentBefore2030GW: [2, 5], investmentBefore2030B: [20, 25],
      additionalDeploymentGW: [88, 125], additionalInvestmentThrough2050B: [225, 250],
      technologyScope: 'Next-generation geothermal power (EGS and closed-loop)'
    },
    ppa: {price: 107, year: 2024}
  };
  const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
  const difference = (baseline, next) => (baseline - next) / baseline * 100;
  const dollars = (value, decimals = 0) => '$' + value.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
  const q3 = kpiData.fervoQ3Financials;
  const accountingMillions = value => value < 0
    ? '(' + dollars(Math.abs(value), 3) + 'M)'
    : dollars(value, 3) + 'M';
  const liftoff = kpiData.commercialLiftoff;
  const investmentRange = ([low, high]) => dollars(low) + '–' + dollars(high) + 'B';
  const capacityRange = ([low, high]) => low + '–' + high + ' GW';
  const grants = kpiData.fervoGrants;
  const grantIncreaseM = grants.amendedDoeAwardM - grants.originalDoeAwardM;
  const grantDollars = value => dollars(value, 1) + 'M';
  // Only like-for-like observations belong in this series. Replace a value and
  // its status together after validating the source filters and 2022-dollar basis.
  const lcoePoints = kpiData.atb.lcoePoints;
  const comparableLcoe = lcoePoints.filter(p => Number.isFinite(p.value) && ['approximate','verified'].includes(p.status));
  const latestLcoe = comparableLcoe[comparableLcoe.length - 1];
  const lcoeLabel = p => p && Number.isFinite(p.value) ? (p.status === 'approximate' ? '~' : '') + dollars(p.value) + '/MWh' : 'Not verified';
  const latestEditionLcoe = lcoePoints.find(p => p.edition === kpiData.atb.latestEdition);
  const latestEditionVerified = latestEditionLcoe && latestEditionLcoe.status === 'verified' && Number.isFinite(latestEditionLcoe.value);
  const redDrilling = average(kpiData.drilling.slice(0, 2));
  const capeDrilling = average(kpiData.drilling.slice(2));
  const drillingReduction = difference(redDrilling, capeDrilling);
  const capitalBillions = (cost) => kpiData.capitalNeeded.targetGWe * cost / 1000;
  const projectDifference = difference(kpiData.projectCapex.red, kpiData.projectCapex.cape);
  const ieaCitation = apa('International Energy Agency','2026','Investment in next-generation geothermal is surging. Policies are key to further growth',sources.iea,'Investment in next-generation geothermal has risen sharply');
  const doeCitation = apa('Lauren Boyd','2023','Investing in Opportunity: How the Geothermal Technologies Office is Supporting Geothermal Everywhere',sources.doeShot,'Enhanced Geothermal Shot technical pathways, slide 25');
  const liftoffCitation = apa('U.S. Department of Energy',String(liftoff.reportYear),'Pathways to Commercial Liftoff: Next-Generation Geothermal Power',sources.doeLiftoff,'Chapter 3, Fig. 15, pp. 31–35, notes o and q');
  const atbCitation = apa('National Laboratory of the Rockies','2025','2025 Electricity Annual Technology Baseline: Geothermal',sources.atb2025,'Geothermal Potential Resource and Cost Characteristics');
  const projectCitations = `${apa('Kah, M., & Kleinberg, R.','2025','The Potential Contribution of Enhanced Geothermal Systems to Future Power Supply',sources.projectRed,'p. 6')} ${apa('Fervo Energy','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results, Construction')} ${apa('The Motley Fool','2026','Fervo Energy Q3 2026 earnings call transcript',sources.fervoTranscript,'Nov. 9 earnings call')}`;

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
      #fin-kpi-trends .kt-jump-nav a:hover,#fin-kpi-trends .kt-jump-nav a:focus-visible{background:var(--cobalt);color:var(--page)}
      #fin-kpi-trends .kt-jump-nav a[aria-current="location"]{background:var(--cobalt);color:var(--page)}
      #fin-kpi-trends .kt-section:focus{outline:none}
      #fin-kpi-trends .kt-stack-link{display:inline-block;margin:.35rem 0 0;padding:7px 13px;border:1px solid var(--cobalt);border-radius:var(--radius-pill);background:var(--page);color:var(--cobalt);font:700 12px/1.4 "Proxima Nova",var(--font-body);cursor:pointer}
      #fin-kpi-trends .kt-stack-link[hidden]{display:none}
      #fin-kpi-trends .kt-stack-link:hover,#fin-kpi-trends .kt-stack-link:focus-visible{background:var(--cobalt);color:var(--page)}
      #fin-kpi-trends .kt-scope-note{border-left:4px solid var(--cadet);padding:.75rem 1rem;background:var(--card);margin:.85rem 0;color:var(--muted);font-size:13px;line-height:1.5}
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
      #fin-kpi-trends .kt-chart{width:100%;height:400px;min-width:0}#fin-kpi-trends .kt-chart.kt-chart-tall{height:520px}#fin-kpi-trends .kt-chart.kt-chart-compact{height:300px}#fin-kpi-trends #kt-project-capex{height:440px}#fin-kpi-trends #kt-atb-capex{height:520px}#fin-kpi-trends #kt-lcoe{height:540px}#fin-kpi-trends #kt-capital-needed-chart{height:440px}
      /* Horizontal y-axis labels sit to the left of each chart, never rotated. */
      #fin-kpi-trends .kt-axis-graph{display:grid;grid-template-columns:minmax(158px,18%) minmax(0,1fr);align-items:center;column-gap:10px;min-width:0}
      #fin-kpi-trends .kt-axis-graph.kt-axis-graph-small{grid-template-columns:minmax(90px,26%) minmax(0,1fr);column-gap:4px}
      #fin-kpi-trends .kt-side-axis-title{margin:0;color:var(--chathams);font:650 13px/1.4 "Proxima Nova",var(--font-body);text-align:left;overflow-wrap:normal;word-break:normal}
      #fin-kpi-trends .kt-side-axis-title span{display:block;font-weight:600;color:var(--muted)}
      #fin-kpi-trends .kt-axis-graph-small .kt-side-axis-title{font-size:11px;line-height:1.35}
      #fin-kpi-trends .kt-axis-graph > .kt-chart{width:100%;min-width:0}
      @media(max-width:720px){#fin-kpi-trends .kt-axis-graph,#fin-kpi-trends .kt-axis-graph.kt-axis-graph-small{grid-template-columns:minmax(0,1fr);row-gap:6px;column-gap:0}#fin-kpi-trends .kt-side-axis-title{font-size:11px}}
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
      #fin-kpi-trends .kt-lcoe-coverage{margin:1rem 0 0;padding:1rem 1.15rem;border-left:4px solid var(--cobalt);background:var(--card)}
      #fin-kpi-trends .kt-lcoe-coverage strong{display:block;margin:.35rem 0;color:var(--chathams);font-size:clamp(1.15rem,2.2vw,1.55rem)}
      #fin-kpi-trends .kt-lcoe-coverage .kt-note{margin:.55rem 0 0}
      #fin-kpi-trends .kt-capex-status{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem;margin:1rem 0}
      #fin-kpi-trends .kt-capex-status-item{min-width:0;padding:1rem;background:var(--card);border-left:4px solid var(--cadet)}
      #fin-kpi-trends .kt-capex-status-item.kt-achieved{border-left-color:var(--cobalt)}
      #fin-kpi-trends .kt-capex-status-item.kt-expected{border-left-color:var(--sky)}
      #fin-kpi-trends .kt-capex-status-item strong{display:block;color:var(--chathams);font-size:clamp(1.25rem,2.4vw,1.65rem);line-height:1.25;margin:.3rem 0}
      #fin-kpi-trends .kt-capex-status-item p{font-size:12px;line-height:1.45;color:var(--muted);margin:0}
      #fin-kpi-trends .kt-capex-status-item .kt-label{font-size:11px}
      #fin-kpi-trends .kt-q3-snapshot{margin-top:1.5rem;padding-top:1.1rem;border-top:1px solid var(--cadet-light)}
      #fin-kpi-trends .kt-q3-summary{margin:.85rem 0 0}
      #fin-kpi-trends .kt-q3-more{background:var(--card);margin-top:1rem}
      #fin-kpi-trends .kt-q3-details{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 1.25rem;margin:1rem 0 0}
      #fin-kpi-trends .kt-q3-details div{padding:.85rem 0;border-bottom:1px solid var(--cadet-light);min-width:0}
      #fin-kpi-trends .kt-q3-details dt{color:var(--muted);font-size:12px;font-weight:600}
      #fin-kpi-trends .kt-q3-details dd{margin:.3rem 0 0;color:var(--cobalt);font-weight:700;font-size:17px;font-variant-numeric:tabular-nums}
      #fin-kpi-trends .kt-q3-details dd span{display:block;margin-top:3px;color:var(--muted);font-size:11px;font-weight:400}
      @media(max-width:720px){#fin-kpi-trends .kt-q3-details,#fin-kpi-trends .kt-capex-status{grid-template-columns:1fr}}
      @media(max-width:900px){#fin-kpi-trends .kt-span-8,#fin-kpi-trends .kt-span-7,#fin-kpi-trends .kt-span-6,#fin-kpi-trends .kt-span-5,#fin-kpi-trends .kt-span-4,#fin-kpi-trends .kt-metric-primary,#fin-kpi-trends .kt-metric-secondary{grid-column:span 12}#fin-kpi-trends .kt-context{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:720px){#fin-kpi-trends #kt-atb-capex,#fin-kpi-trends #kt-lcoe,#fin-kpi-trends #kt-drilling-order{height:490px}#fin-kpi-trends #kt-project-capex,#fin-kpi-trends #kt-capital-needed-chart{height:460px}#fin-kpi-trends .kt-model-update{grid-template-columns:1fr}#fin-kpi-trends .kt-shell{margin:-2rem -1rem -2rem;padding:16px}#fin-kpi-trends .kt-shell h1{font-size:29px}#fin-kpi-trends .kt-context,#fin-kpi-trends .kt-stats,#fin-kpi-trends .kt-financials,#fin-kpi-trends .kt-model-update,#fin-kpi-trends #kt-fervo-section aside .kt-financials,#fin-kpi-trends #kt-funding+.kt-stats{grid-template-columns:1fr}#fin-kpi-trends .kt-chart{height:360px}#fin-kpi-trends .kt-chart.kt-chart-tall{height:440px}#fin-kpi-trends .kt-milestone{grid-template-columns:1fr}}
    </style>
    <div class="kt-shell">
      <header class="kt-hero">
        <p class="kt-eyebrow">Financial KPIs for Enhanced Geothermal Systems</p>
        <h1>EGS project economics and investment trends</h1>
        <p class="kt-subtitle">Capital costs, drilling performance, commercial progress, and capital needs</p>
        <p class="kt-copy">Enhanced geothermal systems (EGS) use engineered underground reservoirs to produce reliable electricity. This dashboard compares project capital costs (USD/kW), drilling costs (USD/ft), and modeled electricity costs (USD/MWh) to assess how EGS economics are evolving. The Fervo Energy case study connects drilling performance with reported spending and contracted capacity. Reported benchmarks, company expectations, targets, modeled estimates, and illustrative forecasts are distinguished throughout. EGS project metrics are separate from broader geothermal financing and company-wide financial context. MWe and kWe denote electrical power capacity. Source-reported MW and $/kW are retained where the precise denominator is not specified; these project capacity figures refer to electricity rather than heat.</p>
      </header>
      <nav class="kt-jump-nav" aria-label="KPI Trends section explorer"><a href="#kt-capex">CapEx</a><a href="#kt-drilling-section">Drilling</a><a href="#kt-lcoe-section">LCOE</a><a href="#kt-fervo-section">Fervo</a><a href="#kt-capital-needed">Capital Needed</a></nav>

      <section class="kt-section" aria-labelledby="kt-headlines"><div class="kt-section-head"><p class="kt-eyebrow">Investor snapshot</p><h2 id="kt-headlines">Capital deployment at a glance</h2></div><div class="kt-grid">
        <article class="card kt-card kt-metric kt-metric-primary"><span class="kt-label">2025 Global Geothermal Funding (All Technologies)</span><strong id="kt-funding-counter" class="kt-value" data-target="18.7" aria-live="off" aria-label="Approximately 18.7 billion U.S. dollars in global geothermal funding in 2025">~$18.7B</strong><p class="kt-note">Approximate annual global funding across geothermal categories, not cumulative EGS investment or a count of transactions</p><p class="kt-source">${ieaCitation}</p><details><summary>Funding methodology</summary><p>The approximately $18.7B total combines rounded estimates of annual geothermal funding worldwide. It includes heating, conventional power, and next-generation geothermal. It is not a cumulative EGS investment figure or a count of individual transactions.</p></details></article>
        <article class="card kt-card kt-metric kt-metric-secondary"><span class="kt-label">2025 Next-Generation Geothermal Financing</span><strong class="kt-value">~$2.2B</strong><p class="kt-note">Annual worldwide funding for next-generation geothermal, already included in the ~$18.7B total. Includes EGS and closed-loop geothermal; an EGS-only breakdown is not available.</p><p class="kt-source">${ieaCitation}</p></article>
        <article class="card kt-card kt-metric kt-metric-secondary"><span class="kt-label">Next-Generation Financing Growth (2025)</span><strong class="kt-value">+80%</strong><p class="kt-note">Increase from 2024 for EGS and closed-loop geothermal combined, not EGS alone.</p><p class="kt-source">${ieaCitation}</p></article>
      </div></section>

      <section class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Capital intelligence</p><h2>Funding Flows and Capital Stack Context</h2></div><div class="kt-grid"><article class="kt-card kt-span-8"><h3>Global Geothermal Funding in 2025</h3><p class="kt-note">Annual worldwide funding across geothermal technologies, not a cumulative or EGS-only total. The highlighted next-generation slice includes EGS and closed-loop geothermal.</p><div id="kt-funding" class="kt-chart kt-chart-tall" role="img" aria-label="Donut chart showing approximate shares of 2025 global geothermal funding, calculated from rounded IEA category figures"></div><p class="kt-note">Shares are calculated using rounded funding figures reported by the IEA. The ~$18.7B sum and the percentages are approximate rather than exact IEA totals.</p><div class="kt-highlight-stat"><span class="kt-label">Next-Generation Geothermal Financing (2023 to 2025)</span><strong>Nearly 30%</strong><span>came from debt, including concessional loans (EGS and closed-loop combined)</span></div><p class="kt-source">${ieaCitation}</p><details><summary>Sources &amp; methodology</summary><p>The ~$18.7B total combines rounded IEA categories: more than $11.5B for heating, nearly $5B for conventional power and nearly $2.2B for next-generation geothermal. The approximate shares of 61.5%, 26.7% and 11.8% are calculated from these rounded categories. The IEA does not report those percentages or the $18.7B sum as exact values.</p></details></article><article class="kt-card kt-span-4">
          <h3>Public Grants and Capital Stack</h3>
          <p class="kt-note">Broader next-generation geothermal financing, not EGS-only</p>
          <div class="kt-highlight-stat"><span class="kt-label">Global public grant share</span><strong>About 9%</strong><span>of next-generation geothermal funding (EGS and closed-loop combined)</span></div>
          <p class="kt-note">The IEA does not establish that this share uses the same annual denominator as the 2025 financing total. An EGS-only grant share or dollar total is not available.</p>
          <p class="kt-source">${ieaCitation}</p>
          <div class="kt-model-update">
            <h3>Fervo Grant Awards</h3>
            <div><strong>${grantDollars(grants.amendedDoeAwardM)}</strong><span>Amended DOE reimbursement-type grant award (2026)</span></div>
            <div><strong>${grantDollars(grants.smallerGrantAwardsM)}</strong><span>Other smaller grants awarded in 2025 and the first nine months of 2026</span></div>
            <p class="kt-note">Company-disclosed awards, not cash receipts or an industry-wide EGS funding total. The amended award includes the original award.</p>
          </div>
          <div class="kt-model-update">
            <h3>Fervo Project Development Grants</h3>
            <div><strong>${grantDollars(grants.grantIncome2025M)}</strong><span>December 31, 2025</span></div>
            <div><strong>${grantDollars(grants.grantIncomeQ32026M)}</strong><span>September 30, 2026</span></div>
            <p class="kt-note">Project-development grant income recorded as a reduction of property, plant and equipment (PP&amp;E). These are accounting amounts at two reporting dates, not annual cash receipts or separate award commitments.</p>
          </div>
          <div class="kt-stat"><strong>~${dollars(grants.potentialAwardsM)}M</strong><span>Potential DOE awards disclosed in Q3 2026, subject to definitive funding agreements; not cash received.</span></div>
          <p class="kt-source">${apa('Fervo Energy Company','2026','Form 10-Q for the quarter ended September 30, 2026',sources.fervo10q,'Note 16, Grant Income, p. F-24')} ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results, government funding')}</p>
          <details>
            <summary>Grant awards: sources &amp; methodology</summary>
            <p>The original DOE reimbursement-type award was ${grantDollars(grants.originalDoeAwardM)}, effective ${grants.originalAwardDate}. A 2026 amendment raised the award by ${grantDollars(grantIncreaseM)} to ${grantDollars(grants.amendedDoeAwardM)} and extended its term through ${grants.amendedTermEnd}. Grant funding is recognized when eligible costs are incurred under the agreement.</p>
            <p>Fervo also disclosed ${grantDollars(grants.smallerGrantAwardsM)} in smaller grant awards during 2025 and the first nine months of 2026. Note 16 does not establish an EGS-only industry total or allocate every award to a particular project.</p>
            <p>Keep award amounts, recognized grant income and potential awards separate. The original DOE award and its amendment are included in the amended total. Do not add these to the PP&amp;E amounts, combine the two reporting-date balances, or treat conditional awards as secured funding. Review future quarterly and annual SEC filings for updated award terms and accounting amounts; check company announcements for definitive funding agreements.</p>
          </details>
          <details><summary>Capital stack linkage</summary><p>Use the IEA debt and grant shares only with the same next-generation financing scope. Track Fervo grant commitments, accounting amounts and potential awards separately from equity, debt and tax incentives. Do not sum these categories or infer a grant amount by applying the IEA share to annual financing.</p></details>
          <button type="button" class="kt-stack-link" data-kt-capital-stack hidden>View Capital Stack</button>
        </article></div></section>

      <section id="kt-capex" class="kt-section">
         <div class="kt-section-head">
           <p class="kt-eyebrow">Project economics</p>
           <h2>EGS Project CapEx Benchmarks</h2>
           <p class="kt-copy">A reported EGS project benchmark, an expected Phase I cost, and a future cost target. The modeled ATB capital cost benchmarks below use the same USD/kW scale but are separated because their cost scope, dollar basis and technology assumptions differ. The 2025 resource-table values are specifically overnight capital cost (OCC) averages; the precise historical ATB cost parameter remains unverified.</p>
         </div>
         <div class="kt-card">
           <p class="kt-note">Project Red began producing electricity in 2023. Its $15,000/kW CapEx was reported by Columbia University in April 2025, without a specific expenditure year. Fervo's November 9, 2026 disclosure confirms Cape Station GeoBlock 1 operations and separately reports the expected total Phase I cost.</p>
           <div class="kt-capex-status" aria-label="Cape Station achieved operations versus expected capital cost">
             <div class="kt-capex-status-item kt-achieved">
               <span class="kt-label">Achieved operation (September 30, 2026)</span>
               <strong>33 MWe</strong>
               <p>Cape Station Phase I GeoBlock 1 began commercial operation. This is a reported operational achievement, not a final CapEx/kW figure.</p>
             </div>
             <div class="kt-capex-status-item kt-expected">
               <span class="kt-label">Expected Phase I total cost (Q3 2026)</span>
               <strong>~$7,000/kW</strong>
               <p>Expected total Phase I cost for approximately 100 MWe (three 33 MWe GeoBlocks, 99 MWe nominal). GeoBlocks 2 and 3 had not yet reached commercial operation when this estimate was reported. The 33 MWe operating block is not the cost denominator. Fervo reports these capacities in MW.</p>
             </div>
           </div>
           <div id="kt-project-capex" class="kt-chart kt-chart-tall" role="img" aria-label="EGS CapEx comparison: Project Red, operational since 2023, with a 15,000 dollar per kilowatt benchmark reported in 2025; Cape Station Phase I expected total cost 7,000 dollars per kilowatt; Cape Google 400 target 5,500 dollars per kilowatt"></div>
           <p class="kt-note"><strong>How to read the comparison:</strong> Cape Station Phase I's expected $7,000/kW is 53.3% below the $15,000/kW Project Red benchmark. Cape Google 400's $5,500/kW target is 63.3% below Project Red and 21.4% below Cape Station's expected cost. These comparisons involve different projects and reporting categories, so they should not be read as confirmed reductions in construction cost.</p>
            <p class="kt-scope-note"><strong>Comparability:</strong> Fervo's figures are reported project-cost benchmarks with unspecified constant-dollar years. ATB OCC excludes construction-period financing and separately accounts for grid connection in all-in CapEx. Fervo has not reconciled the cost components of its public benchmarks to ATB OCC. The high-temperature ATB class represents flash technology and the lower-temperature class represents binary technology; Fervo's projects cannot be assigned to those modeled classes on temperature alone. The chart retains source-reported $/kW for project costs; they concern electricity-generating capacity, but gross versus net capacity is not consistently disclosed.</p>
           <p class="kt-source">Project Red: ${apa('Kah, M., & Kleinberg, R.','2025','The Potential Contribution of Enhanced Geothermal Systems to Future Power Supply',sources.projectRed,'p. 6')}. Cape Station Phase I: ${apa('Fervo Energy','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results, Construction')} ${apa('Fervo Energy','2026','Fervo Energy Reports Second Quarter 2026 Results',sources.fervoPhaseI,'Aug. 12 Q2 results, Construction')}. Cape Google 400: ${apa('The Motley Fool','2026','Fervo Energy Q3 2026 earnings call transcript',sources.fervoTranscript,'Nov. 9 Q3 call, Timothy Latimer')} ${apa('Fervo Energy','2026','Form 8-K, Google PPA',sources.fervoGoogle,'Item 1.01')}. Cost scope: ${apa('National Laboratory of the Rockies','2025','2025 ATB Definitions',sources.atbDefinitions,'Overnight capital cost and capital expenditures')}.</p>
           <details>
             <summary>Sources &amp; methodology</summary>
             <p>The April 2025 Columbia University report (p. 6) states that Project Red began electricity production in 2023 and reports CapEx of $15,000/kW. The 2023 date refers only to the start of operation, not the expenditure year. The report does not provide a separate cost year or identify the figure as an audited actual expenditure. Fervo's November 9, 2026 results say <strong>expected total cost</strong> for Cape Station Phase I GeoBlocks 1 to 3 remained approximately $7,000/kW. Phase I is an approximately 100 MW installation of three 33 MW GeoBlocks (99 MW nominal). GeoBlock 1 entered commercial operation on September 30, 2026, while GeoBlocks 2 and 3 remained in testing or commissioning at the Q3 disclosure. MW is the company-reported unit for electrical output; a consistent gross or net basis is not specified. The approximately $514.3 million transferred from construction-in-process into property, plant and equipment is <strong>not</strong> the standalone cost of GeoBlock 1; it includes shared wellfield and infrastructure costs, as well as capitalized interest and financing costs. The asset transfer does not establish the cost boundary of the separate $7,000/kW expectation. The $5,500/kW Cape Google 400 figure is a future installed-cost target stated by Timothy Latimer on November 9, 2026. The Google PPA covers 396 MW of electrical capacity, which is distinct from the approximately 400 MW project designation. Percentage differences are calculated from the displayed rounded figures and do not prove realized cost reductions. ${apa('Fervo Energy Company','2026','Form 10-Q for the quarter ended September 30, 2026',sources.fervo10q,'Part I, Item 1, property, plant and equipment')}</p>
           </details>
          </div>
          <div class="kt-card kt-fervo-capex">
            <h3>Modeled Deep EGS Capital Costs by ATB Edition</h3>
            <p class="kt-note">Published model values on the same numerical scale as the project benchmarks. Historical modeled Deep EGS binary capital costs reported in Figure 18 are in 2022 USD/kWe; the 2025 resource-table OCC averages are in 2023 USD/kWe (source reports $/kW for electricity generation). The historical values are labeled as capital costs until their precise ATB parameter is verified. The 2025 classes are separate markers, not a continuation of the historical line.</p>
            <div class="kt-axis-graph">
              <div class="kt-side-axis-title" aria-hidden="true">Modeled capital cost<span>(USD/kWe; dollar year varies)</span></div>
              <div id="kt-atb-capex" class="kt-chart kt-chart-tall" role="img" aria-label="Published 2021 and 2024 modeled Deep EGS binary capital costs in 2022 dollars, with the precise historical ATB cost parameter unverified; two separate 2025 ATB temperature-class overnight capital cost averages in 2023 dollars; dotted no-change illustrative 2026 projections"></div>
            </div>
            <div class="kt-model-update"><h3>Latest ATB Model Update (2025 Edition)</h3><div><strong>$9,868/kW</strong><span>Deep EGS at or above 200°C, flash resource-table average OCC (2023 USD)</span></div><div><strong>$16,795/kW</strong><span>Deep EGS 150 to below 200°C, binary resource-table average OCC (2023 USD)</span></div><p class="kt-note">These modeled averages are not Fervo expenditures or representative example-plant costs. The historical $19,757/kW is a 2024 ATB point reported in Figure 18, not a directly comparable 2025 resource-table average.</p></div>
            <details>
              <summary>2025 ATB representative plant costs and resource ranges</summary>
              <p>The 2025 ATB geothermal resource table reports modeled Deep EGS overnight capital costs (OCC) in 2023 USD/kW of electrical capacity. The example-plant estimates are separate from the resource-table averages and ranges.</p>
              <div class="kt-history-table-wrap" role="region" aria-label="2025 ATB Deep EGS overnight capital costs by temperature class" tabindex="0">
                <table class="kt-history-table">
                  <thead><tr><th scope="col">OCC (2023 USD/kW)</th><th scope="col">Flash (&ge;200&deg;C)</th><th scope="col">Binary (150 to below 200&deg;C)</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Resource-table average</th><td>${dollars(kpiData.atb.hotOcc)}/kW</td><td>${dollars(kpiData.atb.binaryOcc)}/kW</td></tr>
                    <tr><th scope="row">Resource-table minimum</th><td>${dollars(kpiData.atb.flashOccRange[0])}/kW</td><td>${dollars(kpiData.atb.binaryOccRange[0])}/kW</td></tr>
                    <tr><th scope="row">Resource-table maximum</th><td>${dollars(kpiData.atb.flashOccRange[1])}/kW</td><td>${dollars(kpiData.atb.binaryOccRange[1])}/kW</td></tr>
                    <tr><th scope="row">Representative plant example</th><td>${dollars(kpiData.atb.representativeFlashOcc)}/kW</td><td>${dollars(kpiData.atb.representativeBinaryOcc)}/kW</td></tr>
                  </tbody>
                </table>
              </div>
              <p class="kt-note">The representative flash plant example is below the reported resource-table minimum. These are distinct model statistics as published, not an error in the range or observed project costs. Neither the examples nor the ranges establish a like-for-like comparison with Fervo's project benchmarks or the historical ATB capital cost series. The main chart continues to show only the 2025 resource-table averages, and the dotted extensions hold those averages constant.</p>
              <p class="kt-source">${atbCitation}</p>
            </details>
            <div class="kt-scope-note"><strong>ATB data coverage:</strong> No separate 2026 ATB edition was located as of November 27, 2026. The 2025 edition was released in 2026 and has an updated workbook dated November 11, 2026. Dotted extensions are illustrative no-change forecasts from the 2025 class averages (2026 value = 2025 value). They are not published ATB data or predictions of the next edition. Published data are solid lines or discrete markers.</div>
            <p class="kt-source">${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport,'Fig. 18, p. 23')} ${atbCitation} ${apa('National Laboratory of the Rockies','2025','2025 ATB Definitions',sources.atbDefinitions,'OCC, CAPEX and dollar year')} ${apa('National Laboratory of the Rockies','2025','2025 ATB data downloads',sources.atbData,'2025 ATB Data')}</p>
            <details><summary>Sources &amp; methodology</summary><p>Figure 18 reports $53,240/kW for 2021 and $19,757/kW for 2024, a ${difference(kpiData.atb.historicalCapex[0],kpiData.atb.historicalCapex[1]).toFixed(2)}% indicative difference. These are historical modeled Deep EGS binary capital costs reported in Figure 18 in 2022 dollars. The market report describes the figures as CapEx; the exact underlying ATB cost parameter has not been independently verified. They should not be classified as OCC until the original archived datasets establish that cost boundary. The 2025 ATB defines high-temperature Deep EGS as flash and lower-temperature Deep EGS as binary in its model. Its resource-table averages are a different statistic in 2023 dollars; no inflation adjustment or direct reduction calculation has been imposed across the break. The plotted dollar magnitudes are not like-for-like project costs. Future updates should use the <a href="${sources.atbWorkbookV2}" target="_blank" rel="noopener noreferrer">2025 ATB Electricity Workbook, Version 2 (November 11, 2026)</a> and the <a href="${sources.atbWorkbook}" target="_blank" rel="noopener noreferrer">official ATB data package</a>. Retain consistent resource class, cost boundary, financial assumptions, and dollar year when comparing values across editions.</p></details>
          </div>
        </section>



      <section id="kt-drilling-section" class="kt-section">
        <div class="kt-section-head"><p class="kt-eyebrow">Drilling economics</p><h2>Fervo's Drilling Costs: Project Red vs. Cape Station</h2><p class="kt-copy">EGS well-level costs in drilling order, with project averages for context.</p></div>
        <div class="kt-card"><p class="kt-note">Eight reported wells show how sampled EGS drilling cost per foot changed in drilling order across Project Red and Cape Station. The original market report confirms the well order. This measures drilling costs, not total project CapEx.</p><div id="kt-drilling" class="kt-chart kt-chart-tall" role="img" aria-label="Horizontal bar chart comparing reported drilling cost per foot for two Project Red wells and six Cape Station wells"></div><h3>Drilling Cost per Foot by Well Order</h3><div class="kt-axis-graph"><div class="kt-side-axis-title" aria-hidden="true">Drilling cost per foot<span>(USD/ft)</span></div><div id="kt-drilling-order" class="kt-chart" role="img" aria-label="Chronological chart of drilling cost per foot for Wells 1 to 8, with Project Red wells 1 and 2 followed by Cape Station wells 3 to 8"></div></div><div class="kt-stats"><div class="kt-stat"><strong>${dollars(redDrilling,2)}/ft</strong><span>Project Red, 2-well average</span></div><div class="kt-highlight-stat"><span class="kt-label">Sampled drilling cost per foot</span><strong>${drillingReduction.toFixed(2)}% lower</strong><span>Six Cape Station wells versus two Project Red wells</span></div><div class="kt-stat"><strong>${dollars(capeDrilling,2)}/ft</strong><span>Cape Station, 6-well average</span></div></div><p class="kt-note"><strong>$346.45/ft</strong> is the lowest drilling cost among these eight wells. It does not represent Fervo's all-time low or the total cost of developing a project.</p><p class="kt-note">Lower sampled drilling costs can improve project economics by reducing one component of development spending. They do not establish an equivalent reduction in total plant CapEx.</p><p class="kt-source">${apa('Akindipe, D., & Witter, E.','2025','2025 Geothermal Drilling Cost Curves Update',sources.drillingPaper,'Table 1, p. 3')} ${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport,'Fig. 21, p. 26, drilling order')}</p><details><summary>Sources &amp; methodology</summary><p>Table 1, p. 3 supplies the costs in USD/ft; a constant-dollar year is not specified. Figure 21 of the market report confirms the sequence is drilling order. The averages are arithmetic averages of two Project Red and six Cape Station wells. The reduction is (Project Red average minus Cape Station average) divided by Project Red average. Individual wells vary, so the chart does not imply that each successive well was cheaper.</p></details><details><summary>Supporting evidence: Utah FORGE drilling time</summary><p><strong>310 reported drilling hours in 2020</strong> compared with <strong>110 reported drilling hours in 2023</strong>. This measures time, not cost per foot. ${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport,'Fig. 20, p. 25')}</p></details></div>
      </section>

      <section id="kt-lcoe-section" class="kt-section">
        <div class="kt-section-head">
          <p class="kt-eyebrow">Electricity economics</p>
          <h2>Deep EGS LCOE: Model Trends and Price Benchmark</h2>
          <p class="kt-copy">This chart tracks how modeled Deep EGS Binary levelized cost of electricity (LCOE) estimates change across ATB publication editions as technology, resource and financial assumptions are revised. Each point refers to a model edition, not actual project generation costs in that year. Fervo's 2024 PPA is shown as a separate commercial price marker, not an LCOE.</p>
        </div>
        <div class="kt-grid">
          <div class="kt-card kt-span-8">
            <h3>Historical Modeled LCOE</h3>
            <p class="kt-note">Published historical estimates are approximate readings of Figure 23 in the 2025 U.S. Geothermal Market Report (2022 USD/MWh). The 2025 ATB changes the resource and technology assumptions. Its exact comparable LCOE has not been extracted from the underlying dataset. No separate 2026 ATB edition was located as of November 27, 2026. The 2025 edition was released in 2026 and has an updated workbook dated November 11, 2026.</p>
            <div class="kt-axis-graph">
              <div class="kt-side-axis-title" aria-hidden="true">Modeled LCOE / PPA price<span>(USD/MWh; dollar basis differs)</span></div>
              <div id="kt-lcoe" class="kt-chart kt-chart-tall" role="img" aria-label="Published modeled Deep EGS Binary LCOE estimates from 2021 to 2024; 2025 comparable value not extracted; illustrative dotted no-change forecast through 2026; separate 2024 Fervo PPA price marker"></div>
            </div>
            <div class="kt-lcoe-coverage">
              <h3>LCOE Data Coverage</h3>
              <span class="kt-label">Latest comparable point in this chart</span>
              <strong>${latestLcoe ? latestLcoe.edition + ' ATB: ' + lcoeLabel(latestLcoe) : 'No comparable value available'}</strong>
              <p class="kt-note">Modeled in 2022 dollars, not a measured project operating cost. The published 2025 edition is available, but its comparable Deep EGS LCOE value is not verified from the underlying dataset.</p>
              <p class="kt-note">The dotted extension to ${kpiData.atb.forecastEdition} is an illustrative no-change reference using the last comparable chart value (${lcoeLabel(latestLcoe)}). It is not a published ATB estimate. The PPA marker is a nominal contract price, not LCOE.</p>
            </div>
            <details>
              <summary>ATB LCOE data verification and update status</summary>
              <div class="kt-history-table-wrap" role="region" aria-label="LCOE data verification by ATB edition" tabindex="0">
                <table class="kt-history-table">
                  <thead><tr><th scope="col">ATB edition</th><th scope="col">Modeled LCOE (2022 USD/MWh)</th><th scope="col">Data status</th><th scope="col">Underlying dataset</th></tr></thead>
                  <tbody>
                    ${lcoePoints.map(p => `<tr><th scope="row">${p.edition}</th><td>${lcoeLabel(p)}</td><td>${p.status === 'verified' ? 'Workbook verified' : p.status === 'approximate' ? 'Approximate Figure 23 reading' : 'Comparable workbook value not verified'}</td><td><a href="${sources[p.dataset]}" target="_blank" rel="noopener noreferrer">${p.edition} ATB data</a></td></tr>`).join('')}
                    <tr><th scope="row">${kpiData.atb.forecastEdition} (illustrative)</th><td>${lcoeLabel(latestLcoe)}</td><td>Zero-change reference; not published ATB data</td><td>Derived from latest comparable chart value</td></tr>
                  </tbody>
                </table>
              </div>
              <p class="kt-note">To replace approximate points or add the missing 2025 value, first reproduce the Figure 23 selection from the archived workbook or summary CSV. Record the resource class, generation technology, projection year, innovation scenario, financial case, tax-credit treatment, cost recovery period, model parameter, original dollar year, conversion method, and exact source row or worksheet cell. If the selection cannot be reproduced, build a separately labeled comparison with consistently defined filters. Do not combine incompatible 2025 resource classes or infer LCOE from OCC alone.</p>
              <p class="kt-note">The missing 2025 input is intentionally stored as null. No substitute numerical value is plotted. Use the <a href="${sources.atbData}" target="_blank" rel="noopener noreferrer">official summary CSV or Parquet downloads</a> or the <a href="${sources.atbWorkbookV2}" target="_blank" rel="noopener noreferrer">revised 2025 workbook</a> to complete the verification.</p>
            </details>
            <p class="kt-source">${apa('Akindipe, D., et al.','2026','2025 U.S. Geothermal Market Report',sources.marketReport,'Fig. 23, p. 27')} ${apa('National Laboratory of the Rockies','2025','2025 ATB data downloads',sources.atbData,'2025 ATB Data')} ${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 26',sources.corsacPpa,'REN-6-CS2(d), PDF p. 188')}</p>
            <details>
              <summary>Sources &amp; methodology</summary>
              <p>The approximately $480, $465, $473 and $205/MWh values for the 2021 to 2024 ATB editions come from Figure 23. They are approximate readings, not exact workbook values or observed generation costs. The comparable model scenario, projection year and financial case need to be reconciled before extending the published series.</p>
              <p>The 2025 Electricity ATB was released in 2026. Its data package includes a revised Version 2 workbook dated November 11, 2026. A comparable Deep EGS LCOE value has not yet been independently extracted and verified from this workbook, so a numeric 2025 LCOE point is intentionally omitted.</p>
              <p>The dotted 2026 forecast holds the 2024 value constant (zero assumed change) as an illustrative baseline, not a prediction of a future ATB publication.</p>
              <p>Update from the <a href="${sources.atbWorkbookV2}" target="_blank" rel="noopener noreferrer">2025 ATB Workbook, Version 2 (November 11, 2026; XLSX)</a>, the <a href="${sources.atbWorkbook}" target="_blank" rel="noopener noreferrer">2025 ATB data package</a> and archived <a href="${sources.atb2021Data}" target="_blank" rel="noopener noreferrer">2021</a>, <a href="${sources.atb2022Data}" target="_blank" rel="noopener noreferrer">2022</a>, <a href="${sources.atb2023Data}" target="_blank" rel="noopener noreferrer">2023</a> and <a href="${sources.atb2024Data}" target="_blank" rel="noopener noreferrer">2024</a> datasets when the matching filters and dollar basis can be confirmed.</p>
            </details>
          </div>
          <aside class="kt-card kt-span-4">
            <p class="kt-eyebrow">Alternative commercial benchmark</p>
            <h3>Fervo Corsac 2 PPA</h3>
            <p class="kt-note">The 2024 EGS agreement provides a real-world electricity sale price for context. It is not an EGS LCOE measurement.</p>
            <div class="kt-stats">
              <div class="kt-stat"><span class="kt-label">2024 signed PPA</span><strong>$107/MWh</strong><span>Contracted sale price, not LCOE</span></div>
              <div class="kt-stat"><span class="kt-label">Utility calculation</span><strong>$107.69/MWh</strong><span>Contract-related levelized cost, including network upgrades</span></div>
            </div>
            <div class="kt-financials">
              <div><strong>115 MWe</strong><span>Contracted electrical capacity (source reports MW)</span></div>
              <div><strong>15 years</strong><span>Contract term with no price escalation</span></div>
              <div><strong>2030</strong><span>Expected commercial operation year in the 2024 utility filing. The project schedule may change.</span></div>
            </div>
            <p class="kt-note"><strong>How to interpret:</strong> The $107/MWh PPA is the agreed electricity sale price. NV Energy's separate $107.69/MWh calculation includes network upgrades. Neither figure represents observed generation costs, and neither is directly comparable to the modeled LCOE series in 2022 dollars. The flat PPA is shown in contract USD/MWh, with no inflation adjustment.</p>
            <p class="kt-source">PPA contract summary: ${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 26',sources.corsacPpa,'Vol. 26, REN-6-CS2(d), PDF p. 188')}. Supporting testimony: ${apa('NV Energy','2024','2024 Integrated Resource Plan, Volume 4',sources.corsacLcoe,'Vol. 4, Spitzer testimony, p. 22 (PDF p. 55)')}.</p>
            <details>
              <summary>Sources &amp; methodology</summary>
              <p>NV Energy documents the flat 15-year $107/MWh PPA in Volume 26, REN-6-CS2(d), PDF p. 188, and a separate $107.69/MWh contract-related levelized cost that includes network upgrades. The latter appears in Spitzer testimony, internal p. 22 (PDF p. 55). Neither amount is an observed plant generation cost.</p>
            </details>
          </aside>
        </div>
      </section>

      <section id="kt-fervo-section" class="kt-section"><div class="kt-section-head"><p class="kt-eyebrow">Company case study</p><h2>Fervo Energy: From Drilling Innovation to Commercial Development</h2><p class="kt-copy">Achieved EGS operations, company-wide consolidated financial results and future electricity contracts are shown separately. Company-wide results are not individual EGS project unit costs.</p></div><div class="kt-card"><div class="kt-milestone"><strong>33 MWe GeoBlock 1</strong><span><b>Achieved milestone:</b> commercial operation began September 30, 2026. Fervo reported <b>36 MWe of total operating capacity</b> at quarter-end. ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}</span></div><div class="kt-fervo-capex"><h3>Fervo's Annual Capital Expenditures (2024 to 2025)</h3><div class="kt-axis-graph"><div class="kt-side-axis-title" aria-hidden="true">Annual capital<br>expenditures<span>(USD millions)</span></div><div id="kt-fervo-capex" class="kt-chart kt-chart-compact" role="img" aria-label="Bar chart comparing Fervo Energy annual capital expenditures in 2024 and 2025, in USD millions"></div></div><p class="kt-note"><strong>Fervo's annual company-wide capital expenditures increased from $178.7 million in 2024 to $465.7 million in 2025, approximately 2.61 times the previous year's spending.</strong> This reflects greater total capital deployment, not an increase in the construction cost per kilowatt.</p><p class="kt-source">${apa('Fervo Energy Company','2026','Amendment No. 3 to Form S-1',sources.fervoS1,'Form S-1/A, p. F-9')} Audited consolidated statements of cash flows, p. F-9. U.S. Securities and Exchange Commission.</p></div><div class="kt-fervo-growth"><h3>Fervo's Contracted Power Capacity Growth</h3><p class="kt-note">Electrical capacity under binding power purchase agreements (PPAs), not operating generation. MWe is used to identify electric power; Fervo reports MW.</p><div class="kt-axis-graph"><div class="kt-side-axis-title" aria-hidden="true">Capacity under<br>binding PPAs<span>(MWe)</span></div><div id="kt-fervo-ppa-growth" class="kt-chart kt-chart-compact" role="img" aria-label="Bar chart showing Fervo Energy contracted PPA capacity rising from 658 megawatts at December 31, 2025 to 1,054 megawatts at September 30, 2026"></div></div><div class="kt-highlight-stat kt-takeaway"><strong>+60.2% contracted capacity growth</strong><span>+396 MWe from year-end 2025 to Q3 2026</span></div><p class="kt-note">Fervo's capacity under binding power purchase agreements increased from <strong>658 MWe at December 31, 2025</strong> to <strong>1,054 MWe in Q3 2026</strong>, an increase of <strong>396 MWe (60.2%)</strong>. The increase matches the 396 MW Google EGS power purchase agreement announced in 2026. Contracted capacity represents future power commitments, not megawatts already operating.</p><p class="kt-source">${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results, Commercial')} ${apa('Fervo Energy Company','2026','Final prospectus',sources.fervoProspectus,'Business, power purchase agreements')} ${apa('Fervo Energy Company','2026','Form 8-K, Google PPA',sources.fervoGoogle,'Item 1.01')}</p></div><div class="kt-fervo-history"><h3>Fervo's Historical Financial Performance (2024 to 2025)</h3><p class="kt-note">Audited full-year consolidated company results, not individual EGS project costs. All figures below are reported actuals.</p><div class="kt-history-table-wrap"><table class="kt-history-table"><thead><tr><th scope="col">Financial KPI</th><th scope="col">2024 actual</th><th scope="col">2025 actual</th></tr></thead><tbody><tr><th scope="row">Annual revenue</th><td>$199,000</td><td>$138,000</td></tr><tr><th scope="row">Operating loss</th><td>($41.838M)</td><td>($48.806M)</td></tr><tr><th scope="row">Net loss</th><td>($41.110M)</td><td>($57.788M)</td></tr><tr><th scope="row">Year-end cash and cash equivalents</th><td>$193.428M</td><td>$461.836M</td></tr></tbody></table></div><p class="kt-note"><strong>Investor context:</strong> Annual revenue remained below $200,000 in both years, while operating and net losses grew. Year-end cash increased from $193.428 million to $461.836 million as Fervo expanded. Cash on the balance sheet should not be confused with profit.</p><p class="kt-source">${apa('Fervo Energy Company','2026','Amendment No. 3 to Form S-1',sources.fervoS1,'Form S-1/A, pp. F-4, F-6')} Audited consolidated financial statements, pp. F-4 and F-6. U.S. Securities and Exchange Commission.</p></div><div class="kt-q3-snapshot">
          <h3>Fervo's Q3 2026 Financial Snapshot</h3>
          <p class="kt-note">Company-wide cash and contracted revenue backlog as of September 30, 2026; capital expenditures for the three months ended September 30, 2026.</p>
          <div class="kt-financials kt-q3-summary">
            <div class="kt-balance"><small>Reported actual</small><strong title="$1.916477 billion as reported">$1.916B</strong><span>Cash and cash equivalents, not profit</span></div>
            <div class="kt-contract"><small>Contractual</small><strong>~$11.9B</strong><span>Contracted revenue backlog, not recognized revenue</span></div>
            <div class="kt-operations"><small>Reported actual</small><strong>$256.7M</strong><span>Q3 2026 capital expenditures</span></div>
          </div>
          <details class="kt-q3-more">
            <summary>View additional Q3 financial and contract metrics</summary>
            <dl class="kt-q3-details">
              <div><dt>Total debt, net of unamortized debt issuance costs</dt><dd>${accountingMillions(q3.debtNetOfIssuanceCostsM)} <span>As of September 30, 2026; cash has not been deducted</span></dd></div>
              <div><dt>Capacity under binding PPAs</dt><dd>1,054 MWe <span>Contracted capacity, not operating generation</span></dd></div>
              <div><dt>Operating loss</dt><dd>${accountingMillions(q3.operatingLossM)} <span>Reported actual for Q3 2026</span></dd></div>
              <div><dt>Revenue</dt><dd>${dollars(q3.revenueUSD)} <span>Reported actual for Q3 2026</span></dd></div>
              <div><dt>Consolidated net income</dt><dd>${accountingMillions(q3.consolidatedNetIncomeM)} <span>Q3 2026; includes subsidiaries and noncontrolling interests</span></dd></div>
              <div><dt>Net loss attributable to Fervo Energy Company</dt><dd>${accountingMillions(q3.attributableNetLossM)} <span>Q3 2026; after allocation to redeemable noncontrolling interests</span></dd></div>
            </dl>
            <div class="kt-scope-note"><strong>Q3 income reconciliation:</strong> Consolidated net income of ${accountingMillions(q3.consolidatedNetIncomeM)} less ${accountingMillions(q3.redeemableNoncontrollingIncomeM)} of net income attributable to redeemable noncontrolling interests results in the ${accountingMillions(q3.attributableNetLossM)} loss attributable to Fervo Energy Company. These are separate accounting measures, not conflicting results or evidence of project-level profitability. The consolidated result also reflects a ${accountingMillions(q3.incomeTaxBenefitM)} income tax benefit against a pretax loss of ${accountingMillions(q3.pretaxLossM)}.</div>
            <p class="kt-note">Quarterly figures should not be directly compared with full-year totals. Backlog represents contracted future revenue rather than earned revenue; cash is not profit. All Q3 financial results are company-wide, unaudited reported actuals, not individual EGS project costs.</p>
          </details>
        </div><div class="kt-highlight-stat kt-takeaway"><strong>Investor takeaway</strong><span>Commercial operation links drilling and construction work to revenue. Long-term contracts show demand, but scaling remains capital intensive</span></div><p class="kt-source">${apa('Fervo Energy Company','2026','Form 10-Q for the quarter ended September 30, 2026',sources.fervo10q,'Part I, Item 1, statements of operations, p. F-4; Note 3, Debt, p. F-13; Item 2')} ${apa('Fervo Energy Company','2026','Fervo Energy Reports Third Quarter 2026 Results',sources.fervoQ3,'Nov. 9 Q3 results')}</p><details><summary>Sources &amp; methodology</summary><p>Cash and cash equivalents were $1.916477B before display rounding. Note 3 (p. F-13) reports debt principal of ${accountingMillions(q3.debtPrincipalM)} less ${accountingMillions(q3.unamortizedDebtIssuanceCostsM)} in unamortized debt issuance costs, resulting in total debt of ${accountingMillions(q3.debtNetOfIssuanceCostsM)} net of issuance costs, before deducting cash or the current portion. This is not conventional net debt (debt less cash). The unaudited condensed consolidated statements of operations (p. F-4) report the revenue, operating loss, pretax loss, income tax benefit, consolidated net income and income allocation for the three months ended September 30, 2026. Values reported in USD thousands are converted to USD millions where indicated; the parent-company loss is not the separate common-stockholder loss measure in Note 15. Backlog is not recognized revenue. Cash is not profit. For future updates, review the latest quarterly Form 10-Q or annual Form 10-K and preserve the reporting period and accounting captions.</p></details></div></section>
      <section id="kt-capital-needed" class="kt-section">
        <div class="kt-section-head">
          <p class="kt-eyebrow">Capital deployment outlook</p>
          <h2>Capital Needed for EGS Deployment</h2>
          <p class="kt-copy">Illustrative gross development-capital requirements for a U.S. EGS electricity deployment pathway by 2035. Capital needed is capacity multiplied by a selected project capital-cost benchmark. It is measured in USD billions and is not a financing shortfall, a forecast of future capital raised, or capital already deployed.</p>
        </div>
        <div class="kt-grid">
          <article class="kt-card kt-span-8">
            <h3>Current Financing vs. Illustrative EGS Capital Needed</h3>
            <p class="kt-note">The DOE Enhanced Geothermal Shot technical pathway identifies 40 GWe by 2035. Applying the three reported, expected and targeted EGS project benchmarks illustrates the gross development-capital scale for that capacity.</p>
            <div id="kt-capital-needed-chart" class="kt-chart kt-chart-tall" role="img" aria-label="Comparison of 2025 global next-generation geothermal financing of approximately 2.2 billion dollars with illustrative U.S. EGS gross capital requirements of 220, 280 and 600 billion dollars for 40 GWe by 2035"></div>
            <div class="kt-scope-note"><strong>Scope and comparability:</strong> The $2.2B figure is annual worldwide next-generation geothermal financing, including closed-loop systems. It is not EGS-only, cumulative construction spending, or deployed capital. The three EGS scenarios are cumulative illustrative U.S. development-capital amounts through 2035. The two sides differ in geography, technology, time horizon, dollar year and cost concept. The asterisk identifies the broader financing measure. Do not subtract them to calculate a funding gap.</div>
            <p class="kt-source">${doeCitation} ${projectCitations} ${ieaCitation}</p>
            <details><summary>Sources &amp; methodology</summary><p>40 GWe equals 40,000,000 kWe. Illustrative capital (USD billions) = capacity (kWe) × source-reported cost per kW ÷ 1,000,000,000. This assumes each project benchmark applies uniformly to the entire deployment target, treating its kW as electrical capacity for the calculation. The source cost years and accounting boundaries are not consistent or fully disclosed; no inflation conversion, financing adjustment, subtraction of existing capacity, or learning-rate reduction has been applied. These are scale scenarios, not official DOE capital forecasts. Update the deployment input when DOE issues a revised target or study, and the cost inputs as project disclosures change.</p></details>
          </article>
          <aside class="kt-card kt-span-4">
            <h3>EGS Deployment Assumptions</h3>
            <div class="kt-highlight-stat"><span class="kt-label">DOE technical pathway target</span><strong>${kpiData.capitalNeeded.targetGWe} GWe</strong><span>By ${kpiData.capitalNeeded.targetYear} (electrical capacity, not thermal capacity)</span></div>
            <div class="kt-financials" style="grid-template-columns:1fr;margin-top:.75rem">
              <div class="kt-contract"><small>Company target</small><strong>~${dollars(capitalBillions(kpiData.projectCapex.google))}B</strong><span>Cape Google 400 at ${dollars(kpiData.projectCapex.google)}/kW</span></div>
              <div class="kt-balance"><small>Expected total project cost</small><strong>~${dollars(capitalBillions(kpiData.projectCapex.cape))}B</strong><span>Cape Station Phase I at ~${dollars(kpiData.projectCapex.cape)}/kW</span></div>
              <div class="kt-operations"><small>Reported benchmark</small><strong>~${dollars(capitalBillions(kpiData.projectCapex.red))}B</strong><span>Project Red at ${dollars(kpiData.projectCapex.red)}/kW</span></div>
            </div>
            <p class="kt-note">These scenario amounts reflect different stages of project cost maturity; none is a verified industry-wide average. The earlier pilot benchmark should not be treated as a commercial-scale forecast.</p>
            <p class="kt-source">${doeCitation} ${projectCitations}</p>
          </aside>
          <article class="kt-card kt-span-12" aria-labelledby="kt-liftoff-title">
            <p class="kt-eyebrow">Published government investment pathway</p>
            <h3 id="kt-liftoff-title">DOE Commercial Liftoff Investment Estimates</h3>
            <p class="kt-note">The DOE's March ${liftoff.reportYear} report outlines two stages of U.S. next-generation geothermal power deployment. These published scenario estimates provide independent investment context alongside the illustrative EGS calculations above.</p>
            <div class="kt-grid">
              <div class="kt-span-6 kt-highlight-stat">
                <span class="kt-label">Stage 1 · Commercial liftoff by ${liftoff.liftoffYear}</span>
                <strong>${investmentRange(liftoff.investmentBefore2030B)}</strong>
                <span>${capacityRange(liftoff.deploymentBefore2030GW)} of deployment to demonstrate technical and commercial viability across geological settings.</span>
              </div>
              <div class="kt-span-6 kt-highlight-stat">
                <span class="kt-label">Stage 2 · Commercial scale by ${liftoff.scaleYear}</span>
                <strong>${investmentRange(liftoff.additionalInvestmentThrough2050B)}</strong>
                <span>Additional investment for ${capacityRange(liftoff.additionalDeploymentGW)} of additional deployment in the modeled scenarios.</span>
              </div>
            </div>
            <div class="kt-scope-note"><strong>Scope and comparability:</strong> ${liftoff.technologyScope}; not EGS-only. These are scenario-based U.S. investment requirements, not observed expenditures or committed funding. The second stage is incremental to liftoff. The DOE estimates use different technology coverage, time horizons and cost assumptions from the 40 GWe EGS pathway and fixed project-cost calculations above. Do not combine these separate pathways or subtract the annual global financing figure to infer a funding shortfall.</div>
            <p class="kt-source">${liftoffCitation} <a href="${sources.doeLiftoffAnnouncement}" target="_blank" rel="noopener noreferrer">DOE release announcement (March 18, 2024)</a></p>
            <details><summary>Sources &amp; methodology</summary><p>Chapter 3, Figure 15 and notes o and q describe the Earthshot and Earthshot with Limited Access modeling cases. The first-stage investment range covers initial development by 2029–2030; the second-stage range covers additional deployment by 2050. The source reports electrical capacity in GW and investment in USD billions; values are reproduced as reported without inflation adjustment. These estimates are not calculated from the Fervo benchmarks. Preserve the original scenario definitions and publication year, and review future DOE commercial liftoff reports or revised deployment studies for updates.</p></details>
          </article>
        </div>
      </section>
      <section class="kt-section kt-source-library" aria-labelledby="kt-references-heading">
        <div class="kt-section-head"><p class="kt-eyebrow">Source documentation</p><h2 id="kt-references-heading">Primary sources and methodology</h2></div>
        <p class="kt-note">Each chart and metric links to its supporting publication, filing or regulatory document. Where percentages are calculated from rounded inputs, the relevant chart explains that methodology.</p>
        <details>
          <summary>View all source documents</summary>
          <ol>
            <li>Schulz, R., Lyons, M., Ugur, D., Bennett, S., &amp; Turich, C. (2026, January 23). <em>Investment in next-generation geothermal is surging. Policies are key to further growth.</em> International Energy Agency. <a href="${sources.iea}" target="_blank" rel="noopener noreferrer">Original commentary</a></li>
            <li>Akindipe, D., Martinez Smith, F., Witter, E., Pauling, H., Oh, H., Podgorny, S., Rane, J., Harmon, J., Javed, S., Simpson, J., Shlosberg, D., Holt, E., Trainor-Guitton, W., Levine, A., Schmidt, B., &amp; Pedersen, A. (2026). <em>2025 U.S. Geothermal Market Report.</em> National Laboratory of the Rockies and Geothermal Rising. <a href="${sources.marketReport}" target="_blank" rel="noopener noreferrer">Original report, Figures 18 and 23</a></li>
            <li>National Laboratory of the Rockies. (2026). <em>2025 Electricity Annual Technology Baseline: Geothermal.</em> 2025 edition; revised data workbook dated November 11, 2026. <a href="${sources.atb2025}" target="_blank" rel="noopener noreferrer">ATB geothermal model and assumptions</a>; <a href="${sources.atbDefinitions}" target="_blank" rel="noopener noreferrer">Definitions</a>; <a href="${sources.atbWorkbook}" target="_blank" rel="noopener noreferrer">Official data package</a>; <a href="${sources.atbWorkbookV2}" target="_blank" rel="noopener noreferrer">Version 2 workbook (November 11, 2026)</a>; <a href="${sources.atbData}" target="_blank" rel="noopener noreferrer">Summary data downloads</a>; <a href="${sources.atbArchive}" target="_blank" rel="noopener noreferrer">ATB archive</a>.</li>
            <li>Boyd, L. (2023, August 30). <em>Investing in Opportunity: How the Geothermal Technologies Office is Supporting Geothermal Everywhere.</em> U.S. Department of Energy, slide 25. <a href="${sources.doeShot}" target="_blank" rel="noopener noreferrer">Enhanced Geothermal Shot technical pathways</a></li>
            <li>U.S. Department of Energy. (2024, March). <em>Pathways to Commercial Liftoff: Next-Generation Geothermal Power.</em> Chapter 3, Figure 15, pp. 31–35, notes o and q. <a href="${sources.doeLiftoff}" target="_blank" rel="noopener noreferrer">DOE report (OpenEI-hosted PDF)</a>; <a href="${sources.doeLiftoffAnnouncement}" target="_blank" rel="noopener noreferrer">DOE release announcement</a>.</li>
            <li>Fervo Energy Company. (2026, August 12). <em>Fervo Energy Reports Second Quarter 2026 Results.</em> <a href="${sources.fervoPhaseI}" target="_blank" rel="noopener noreferrer">Phase I capacity, Construction section</a></li>
            <li>Fervo Energy Company. (2026, August 26). <em>Form 8-K, Google power purchase agreement.</em> <a href="${sources.fervoGoogle}" target="_blank" rel="noopener noreferrer">Item 1.01, 396 MW agreement</a></li>
            <li>Fervo Energy Company. (2026, May). <em>Final prospectus.</em> <a href="${sources.fervoProspectus}" target="_blank" rel="noopener noreferrer">Previously executed PPAs</a></li>
            <li>Kah, M., &amp; Kleinberg, R. (2025). <em>The potential contribution of enhanced geothermal systems to future power supply.</em> Center on Global Energy Policy, Columbia University. <a href="${sources.projectRed}" target="_blank" rel="noopener noreferrer">Original roundtable summary, p. 6</a></li>
            <li>Akindipe, D., &amp; Witter, E. (2025). <em>2025 Geothermal Drilling Cost Curves Update.</em> Stanford Geothermal Workshop. <a href="${sources.drillingPaper}" target="_blank" rel="noopener noreferrer">Original paper, Table 1, p. 3</a></li>
            <li>Fervo Energy Company. (2026, November 9). <em>Fervo Energy Reports Third Quarter 2026 Results.</em> <a href="${sources.fervoQ3}" target="_blank" rel="noopener noreferrer">Company earnings release</a></li>
            <li>Latimer, T. (2026, November 9). <em>Fervo Energy Q3 2026 earnings call.</em> Transcript published by The Motley Fool. <a href="${sources.fervoTranscript}" target="_blank" rel="noopener noreferrer">Earnings call transcript</a></li>
            <li>Fervo Energy Company. (2026, May 11). <em>Amendment No. 3 to Form S-1.</em> U.S. Securities and Exchange Commission. <a href="${sources.fervoS1}" target="_blank" rel="noopener noreferrer">Audited historical financial statements</a></li>
            <li>Fervo Energy Company. (2026). <em>Form 10-Q for the quarter ended September 30, 2026.</em> U.S. Securities and Exchange Commission. <a href="${sources.fervo10q}" target="_blank" rel="noopener noreferrer">Quarterly financial statements (p. F-4), Note 3 (Debt, p. F-13) and Note 16 (Grant Income, p. F-24)</a></li>
            <li>NV Energy. (2024). <em>2024 Integrated Resource Plan, Volume 26.</em> <a href="${sources.corsacPpa}" target="_blank" rel="noopener noreferrer">Corsac 2 contract summary and $107/MWh price (REN-6-CS2(d), PDF p. 188)</a></li>
            <li>NV Energy. (2024). <em>2024 Integrated Resource Plan, Volume 4.</em> <a href="${sources.corsacLcoe}" target="_blank" rel="noopener noreferrer">Spitzer testimony and utility-calculated $107.69/MWh contract evaluation</a></li>
          </ol>
        </details>
      </section>
    </div>`;

  el.querySelectorAll('.kt-card').forEach((card) => card.classList.add('card'));
  el.querySelectorAll('.kt-chart').forEach((chart) => chart.closest('.kt-card')?.classList.add('kt-chart-card'));
  el.querySelectorAll('.kt-source').forEach((note) => note.classList.add('source-note'));
  el.querySelectorAll('.kt-pending-box').forEach((caveat) => caveat.classList.add('egs-caveat'));

  const jumpLinks = Array.from(el.querySelectorAll('.kt-jump-nav a'));
  jumpLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = el.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      jumpLinks.forEach((item) => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current','location');
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    });
  });
  // Link to the existing Capital Stack tab only when the shell exposes a matching control.
  // No guessed route or external navigation is introduced.
  const stackLink = el.querySelector('[data-kt-capital-stack]');
  const findStackControl = () => Array.from(document.querySelectorAll('[role="tab"],button,a,[data-tab]')).find((control) => {
    if (el.contains(control) || !control.getClientRects().length || control.hasAttribute('disabled') || control.getAttribute('aria-disabled') === 'true') return false;
    return (control.textContent || '').trim().replace(/\s+/g,' ').toLowerCase() === 'capital stack' || (control.getAttribute('aria-label') || '').trim().toLowerCase() === 'capital stack';
  });
  if (stackLink && findStackControl()) {
    stackLink.hidden = false;
    stackLink.addEventListener('click', () => {
      const control = findStackControl();
      if (control) control.click();
      else stackLink.hidden = true;
    });
  }

  const fundingCounter = el.querySelector('#kt-funding-counter');
  if (fundingCounter) {
    const target = Number(fundingCounter.dataset.target);
    const durationMs = 1800;
    const reduceMotion = Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const displayValue = (amount) => `~$${amount.toFixed(1)}B`;

    if (!Number.isFinite(target) || target < 0) {
      fundingCounter.textContent = 'Data unavailable';
    } else if (reduceMotion) {
      fundingCounter.textContent = displayValue(target);
    } else {
      // Keep the reported value visible until the in-view animation starts.
      fundingCounter.textContent = displayValue(target);
      let started = false;
      let elapsedMs = 0;
      let previousFrameTime = null;

      const isCounterVisible = () => {
        if (!fundingCounter.isConnected || document.visibilityState === 'hidden') return false;
        if (fundingCounter.getClientRects().length === 0) return false;
        for (let node = fundingCounter; node && node.nodeType === 1; node = node.parentElement) {
          const style = window.getComputedStyle(node);
          if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
        }
        const rect = fundingCounter.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
      };

      const removeCounterListeners = () => {
        if (el._ktCounterObserver) {
          el._ktCounterObserver.disconnect();
          el._ktCounterObserver = null;
        }
        if (el._ktCounterVisibilityHandler) {
          document.removeEventListener('visibilitychange', el._ktCounterVisibilityHandler);
          el._ktCounterVisibilityHandler = null;
        }
        if (el._ktCounterFallbackHandler) {
          window.removeEventListener('scroll', el._ktCounterFallbackHandler);
          window.removeEventListener('resize', el._ktCounterFallbackHandler);
          el._ktCounterFallbackHandler = null;
        }
      };

      const tick = (now) => {
        if (!fundingCounter.isConnected) {
          el._ktCounterRaf = null;
          removeCounterListeners();
          return;
        }
        if (previousFrameTime === null) previousFrameTime = now;
        const frameDelta = Math.max(0, Math.min(now - previousFrameTime, 50));
        previousFrameTime = now;
        if (isCounterVisible()) elapsedMs = Math.min(durationMs, elapsedMs + frameDelta);
        const progress = Math.min(elapsedMs / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        fundingCounter.textContent = displayValue(progress === 1 ? target : target * eased);
        if (progress < 1) {
          el._ktCounterRaf = requestAnimationFrame(tick);
        } else {
          el._ktCounterRaf = null;
          removeCounterListeners();
        }
      };

      const startCounter = () => {
        if (started || !isCounterVisible()) return;
        started = true;
        fundingCounter.textContent = displayValue(0);
        if (el._ktCounterObserver) {
          el._ktCounterObserver.disconnect();
          el._ktCounterObserver = null;
        }
        el._ktCounterRaf = requestAnimationFrame(tick);
      };

      if ('IntersectionObserver' in window) {
        el._ktCounterObserver = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.target === fundingCounter && entry.isIntersecting)) {
            startCounter();
          }
        }, { threshold: 0.15 });
        el._ktCounterObserver.observe(fundingCounter);
      } else {
        const checkVisibility = () => startCounter();
        el._ktCounterFallbackHandler = checkVisibility;
        window.addEventListener('scroll', checkVisibility, { passive: true });
        window.addEventListener('resize', checkVisibility);
        requestAnimationFrame(checkVisibility);
      }
      el._ktCounterVisibilityHandler = () => {
        if (document.visibilityState === 'visible') startCounter();
      };
      document.addEventListener('visibilitychange', el._ktCounterVisibilityHandler);
    }
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

  const chartIds = ['kt-funding','kt-project-capex','kt-atb-capex','kt-drilling','kt-drilling-order','kt-lcoe','kt-fervo-capex','kt-fervo-ppa-growth','kt-capital-needed-chart'];
  let renderedCompact;
  const renderCharts = () => {
  const compact = el.getBoundingClientRect().width < 720;
  renderedCompact = compact;
  const fundingHover = [
    '<b>Geothermal heating</b><br>More than $11.5B in 2025<br>Approximately 61.5% of global funding<br>Reported annual worldwide funding',
    '<b>Conventional geothermal power</b><br>Nearly $5.0B in 2025<br>Approximately 26.7% of global funding<br>Reported annual worldwide funding',
    '<b>Next-generation geothermal</b><br>Nearly $2.2B in 2025<br>Approximately 11.8% of global funding<br>EGS and closed-loop combined; not EGS-only'
  ];
  plot('kt-funding',[{type:'pie',labels:['Heating','Conventional power','Next-generation geothermal'],values:[kpiData.funding.heating,kpiData.funding.conventional,kpiData.funding.nextGeneration],hole:.62,sort:false,direction:'clockwise',marker:{colors:[colors.cadet,colors.chathams,colors.accent],line:{color:colors.page,width:3}},textinfo:'percent',texttemplate:'~%{percent:.1%}',textposition:'inside',automargin:true,hovertext:fundingHover,hoverinfo:'text'}],{margin:compact?{t:15,r:10,b:90,l:10}:{t:30,r:45,b:95,l:45},showlegend:true,legend:{orientation:'h',x:.5,xanchor:'center',y:-.13,yanchor:'top',font:{size:11}},annotations:[{text:'<b>2025</b><br>funding mix',x:.5,y:.5,showarrow:false,font:{family:chartFont,size:compact?13:18,color:colors.chathams}}]});
  // Short hover details on narrow screens prevent clipped tooltips.
  // Full supporting detail remains in the paragraphs and source notes below the chart.
  const capexHover = compact ? {
    red: '<b>Project Red</b><br>$15,000/kW benchmark<br>Reported April 2025<br>Expenditure year unspecified<br>Kah & Kleinberg (2025)',
    cape: '<b>Cape Station Phase I</b><br>~$7,000/kW<br>Expected total cost for ~100 MW<br>Q3 2026<br>Fervo Energy (2026)',
    google: '<b>Cape Google 400</b><br>$5,500/kW<br>Company target, Q3 2026<br>Fervo Energy (2026)'
  } : {
    red: '<b>Project Red</b><br>$15,000/kW reported CapEx benchmark<br>Electricity production began in 2023<br>Published by Columbia University in April 2025<br>Expenditure year not specified<br>Kah and Kleinberg (2025), p. 6',
    cape: '<b>Cape Station Phase I</b><br>~$7,000/kW expected total cost, GeoBlocks 1 to 3<br>Approximately 100 MW (three 33 MW blocks, 99 MW nominal)<br>November 9, 2026 company disclosure<br><b>Operational actual:</b> GeoBlock 1 (33 MW) reached commercial operation September 30, 2026<br><b>Cost classification:</b> expected total Phase I cost, not achieved final CapEx/kW<br>Fervo Energy (2026), Q3 results',
    google: '<b>Cape Google 400</b><br>$5,500/kW<br>Installed CapEx target (Q3 2026)<br>Company target, not an achieved cost<br>Timothy Latimer, Fervo Q3 2026 earnings call, Nov. 9, 2026'
  };
  plot('kt-project-capex', [
    {
      x: [0, kpiData.projectCapex.red], y: ['Project Red (reported 2025)', 'Project Red (reported 2025)'],
      name: 'Reported benchmark', type:'scatter',
      line: {color: colors.cobalt, width: 5, dash: 'solid'},
      marker: {color: colors.cobalt, size: [0, 16], symbol: 'circle'},
      text: ['', dollars(kpiData.projectCapex.red)+'/kW'], mode:'lines+markers+text', textposition:'middle right', hovertext: ['', capexHover.red], hoverinfo: 'text'
    },
    {
      x: [0, kpiData.projectCapex.cape], y: ['Cape Station Phase I', 'Cape Station Phase I'],
      name: 'Expected total cost', type:'scatter',
      line: {color: colors.chathams, width: 3, dash: 'dash'},
      marker: {color: colors.chathams, size: [0, 16], symbol: 'square'},
      text: ['', '~'+dollars(kpiData.projectCapex.cape)+'/kW'], mode:'lines+markers+text', textposition:'middle right', hovertext: ['', capexHover.cape], hoverinfo: 'text'
    },
    {
      x: [0, kpiData.projectCapex.google], y: ['Cape Google 400', 'Cape Google 400'],
      name: 'Company target', ...ChartTheme.style('target'), type:'scatter',
      line: {color: colors.sky, width: 3, dash: 'longdash'},
      marker: {color: colors.sky, size: [0, 16], symbol: 'diamond'},
      text: ['', dollars(kpiData.projectCapex.google)+'/kW'], mode:'lines+markers+text', textposition:'middle right', hovertext: ['', capexHover.google], hoverinfo: 'text'
    }
  ], {
    margin: compact ? {t: 104, r: 12, b: 78, l: 110} : {t: 88, r: 45, b: 78, l: 190},
    xaxis: {
      title: {text:compact?'CapEx (USD/kW)':'Project CapEx (USD/kW; source dollar years unspecified)',font:{size:compact?10:12}},
      range: [0, 60000], tickprefix: '$', tickformat: compact?'~s':',.0f', nticks:compact?4:7
    },
    yaxis: {
      categoryorder: 'array',
      categoryarray: ['Cape Google 400', 'Cape Station Phase I', 'Project Red (reported 2025)'], tickmode:'array',tickvals:['Cape Google 400','Cape Station Phase I','Project Red (reported 2025)'],ticktext:compact?['Cape Google 400','Cape Station<br>Phase I','Project Red<br>(reported 2025)']:['Cape Google 400','Cape Station Phase I','Project Red (reported 2025)'], tickfont:{size:compact?10:12}
    },
    hovermode: 'closest',
    hoverlabel: {font: {family: chartFont, color: colors.ink, size: compact ? 11 : 12}},
    showlegend:true, legend: {orientation: 'h', x: 0, xanchor: 'left', y: compact?1.28:1.13, font:{size:compact?10:11}},
    // The same 53.3% comparison is already explained under the chart.
    // On mobile, removing the bulky annotation prevents it from being clipped.
    annotations: compact ? [] : [{
      x: kpiData.projectCapex.cape, y: 'Cape Station Phase I',
      text: `<b>${projectDifference.toFixed(1)}% indicative difference</b><br>Project Red benchmark to Cape Station expected cost`,
      showarrow: true, arrowhead: 2, ax: 170, ay: -60,
      bgcolor: colors.accent, borderpad: 7,
      font: {size: 11, color: colors.chathams}
    }]
  });
  const atb = kpiData.atb;
  plot('kt-atb-capex',[
    {type:'scatter',x:atb.historicalYears,y:atb.historicalCapex,name:'Historical binary CapEx (2022 USD)',mode:'lines+markers+text',line:{color:colors.cobalt,width:3,dash:'solid'},marker:{color:colors.page,symbol:'circle',size:13,line:{color:colors.cobalt,width:3}},text:atb.historicalCapex.map(v=>dollars(v)),textposition:'top center',hovertemplate:'<b>%{x} ATB</b><br>%{y:$,.0f}/kW (2022 USD)<br>Modeled Deep EGS binary capital cost<br>Exact ATB cost parameter not verified<br>Akindipe et al. (2026), Fig. 18<extra></extra>'},
    {type:'scatter',x:[atb.latestEdition],y:[atb.hotOcc],name:'2025 flash OCC, ≥200°C',mode:'markers+text',marker:{color:colors.chathams,symbol:'square',size:14},text:[dollars(atb.hotOcc)],textposition:'bottom center',hovertemplate:'<b>2025 ATB, ≥200°C</b><br>%{y:$,.0f}/kW (2023 USD)<br>Deep EGS flash resource-table average OCC<br>Not directly comparable to the historical series<extra></extra>'},
    {type:'scatter',x:[atb.latestEdition],y:[atb.binaryOcc],name:'2025 binary OCC, 150 to <200°C',mode:'markers+text',marker:{color:colors.sky,symbol:'diamond',size:15,line:{color:colors.chathams,width:1}},text:[dollars(atb.binaryOcc)],textposition:'top center',hovertemplate:'<b>2025 ATB, 150 to below 200°C</b><br>%{y:$,.0f}/kW (2023 USD)<br>Deep EGS binary resource-table average OCC<br>Not directly comparable to the historical series<extra></extra>'},
    {type:'scatter',x:[atb.latestEdition,atb.forecastEdition],y:[atb.hotOcc,atb.hotOcc],name:'2026 no-change forecast',legendgroup:'occ-forecast',mode:'lines+markers',line:{color:colors.chathams,width:2,dash:'dot'},marker:{symbol:'square-open',size:[0,11],color:colors.chathams},hovertemplate:'<b>Illustrative no-change extension</b><br>%{y:$,.0f}/kW (2023 USD)<br>Held at 2025 flash average; not ATB data<extra></extra>'},
    {type:'scatter',x:[atb.latestEdition,atb.forecastEdition],y:[atb.binaryOcc,atb.binaryOcc],name:'2026 no-change forecast',legendgroup:'occ-forecast',showlegend:false,mode:'lines+markers',line:{color:colors.sky,width:2,dash:'dot'},marker:{symbol:'diamond-open',size:[0,11],color:colors.sky,line:{color:colors.chathams,width:1}},hovertemplate:'<b>Illustrative no-change extension</b><br>%{y:$,.0f}/kW (2023 USD)<br>Held at 2025 binary average; not ATB data<extra></extra>'}
  ],{margin:compact?{t:45,r:8,b:132,l:55}:{t:45,r:35,b:108,l:72},xaxis:{title:{text:'ATB edition / forecast year',font:{size:compact?10:12}},tickmode:'array',tickvals:[2021,2024,2025,2026],ticktext:['2021','2024','2025','2026*'],range:[2020.65,2026.5]},yaxis:{title:{text:''},automargin:false,range:[0,60000],tickprefix:'$',tickformat:compact?'~s':',.0f'},showlegend:true,legend:{orientation:'h',x:0,y:-.21,font:{size:compact?10:11}},annotations:compact?[]:[{xref:'x',yref:'paper',x:2024.5,y:.98,text:'<b>Change in statistic and dollar year</b>',showarrow:false,font:{size:11,color:colors.muted}}],shapes:[{type:'line',xref:'x',yref:'paper',x0:2024.5,x1:2024.5,y0:0,y1:1,line:{color:colors.gridline,width:1}}]});
  const wells=['Project Red, Well 1','Project Red, Well 2','Cape Station, Well 3','Cape Station, Well 4','Cape Station, Well 5','Cape Station, Well 6','Cape Station, Well 7','Cape Station, Well 8'];
  const costs=kpiData.drilling;
  const drillingHover = wells.map((well,index)=>`<b>${well}</b><br>$${costs[index].toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft<br>Published 2025 well comparison<br>Reported drilling cost<br>Akindipe and Witter (2025), Table 1, p. 3`);
  plot('kt-drilling',[{type:'bar',orientation:'h',x:costs.slice(0,2),y:wells.slice(0,2),name:'Project Red',marker:{color:colors.cobalt,line:{color:colors.chathams,width:1}},text:costs.slice(0,2).map(v=>`$${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft`),textposition:compact?'inside':'outside',cliponaxis:false,hovertext:drillingHover.slice(0,2),hoverinfo:'text'},{type:'bar',orientation:'h',x:costs.slice(2),y:wells.slice(2),name:'Cape Station',marker:{color:colors.sky,line:{color:colors.cadet,width:1}},text:costs.slice(2).map(v=>`$${v.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/ft`),textposition:compact?'inside':'outside',cliponaxis:false,hovertext:drillingHover.slice(2),hoverinfo:'text'}],{margin:compact?{t:55,r:20,b:62,l:110}:{t:62,r:100,b:62,l:175},xaxis:{title:{text:'Reported drilling cost (USD/ft)',font:{size:compact?10:12}},range:[0,1250],tickprefix:'$',tickformat:',.0f'},yaxis:{autorange:'reversed',categoryorder:'array',categoryarray:wells,tickfont:{size:compact?10:12}},legend:{orientation:'h',x:0,y:1.12},bargap:.3});
  plot('kt-drilling-order',[
    {type:'scatter',mode:'lines',x:[1,2,3,4,5,6,7,8],y:costs,name:'Drilling sequence',line:{color:colors.cadet,width:3,dash:'solid'},hoverinfo:'skip',showlegend:false},
    {type:'scatter',mode:'markers+text',x:[1,2],y:costs.slice(0,2),name:'Project Red',marker:{color:colors.cobalt,size:12,symbol:'circle'},text:costs.slice(0,2).map(v=>dollars(v,2)),textposition:['bottom center','top center'],textfont:{size:compact?9:11},hovertext:drillingHover.slice(0,2),hoverinfo:'text'},
    {type:'scatter',mode:'markers+text',x:[3,4,5,6,7,8],y:costs.slice(2),name:'Cape Station',marker:{color:colors.sky,size:12,symbol:'square',line:{color:colors.chathams,width:1}},text:costs.slice(2).map(v=>dollars(v,2)),textposition:['top center','bottom center','top center','bottom center','top center','bottom center'],textfont:{size:compact?9:11},hovertext:drillingHover.slice(2),hoverinfo:'text'}
  ],{margin:compact?{t:40,r:12,b:80,l:52}:{t:46,r:28,b:86,l:68},xaxis:{title:{text:'Well in drilling order',font:{size:compact?10:12}},tickmode:'array',tickvals:[1,2,3,4,5,6,7,8],ticktext:compact?['1','2','3','4','5','6','7','8']:['Well 1','Well 2','Well 3','Well 4','Well 5','Well 6','Well 7','Well 8'],range:[.5,8.5]},yaxis:{title:{text:''},range:[0,1250],tickprefix:'$',tickformat:',.0f',automargin:false},showlegend:true,legend:{orientation:'h',x:0,y:-.24}});
  const lcoeSeries = comparableLcoe;
  plot('kt-lcoe',[
    {type:'scatter',x:lcoeSeries.map(p=>p.edition),y:lcoeSeries.map(p=>p.value),name:'Modeled ATB estimates (see data status)',mode:'lines+markers+text',line:{color:colors.cobalt,dash:'solid',width:4},marker:{color:colors.page,symbol:'circle',size:13,line:{color:colors.cobalt,width:3}},text:lcoeSeries.map(p=>(p.status==='approximate'?'~':'')+dollars(p.value)),textposition:'top center',customdata:lcoeSeries.map(p=>[lcoeLabel(p),p.status==='verified'?'Workbook-verified comparable value':'Approximate Figure 23 reading, not exact workbook value']),hovertemplate:'<b>%{x} ATB edition</b><br>%{customdata[0]} (2022 USD)<br>Deep EGS Binary modeled LCOE<br>%{customdata[1]}<extra></extra>'},
    {type:'scatter',x:latestLcoe?[latestLcoe.edition,atb.forecastEdition]:[],y:latestLcoe?[latestLcoe.value,latestLcoe.value]:[],name:'Illustrative no-change forecast',mode:'lines+markers',line:{color:colors.cobalt,dash:'dot',width:3},marker:{color:colors.cobalt,symbol:'circle-open',size:[0,12]},hovertemplate:`<b>Illustrative no-change forecast</b><br>${lcoeLabel(latestLcoe)} (2022 USD)<br>${latestLcoe ? latestLcoe.edition : 'Latest'} value held constant; not an ATB edition<extra></extra>`},
    {type:'scatter',x:[kpiData.ppa.year],y:[kpiData.ppa.price],name:'Fervo PPA price (not LCOE)',mode:'markers+text',marker:{color:colors.accent,symbol:'diamond',size:17,line:{color:colors.chathams,width:1}},text:[dollars(kpiData.ppa.price)+'/MWh PPA'],textposition:'bottom center',hovertemplate:'<b>Fervo Corsac 2 PPA (2024)</b><br>%{y:$,.0f}/MWh nominal contract price<br>Not LCOE; different dollar basis<br>NV Energy (2024), Vol. 26, REN-6-CS2(d), PDF p. 188<extra></extra>'}
  ],{margin:compact?{t:70,r:12,b:126,l:54}:{t:70,r:28,b:110,l:70},xaxis:{title:{text:compact?'Edition / contract / forecast year':'ATB edition / PPA signing / forecast year',font:{size:compact?10:12}},tickmode:'array',tickvals:[2021,2022,2023,2024,2025,2026],ticktext:['2021','2022','2023','2024','2025','2026*'],range:[2020.6,2026.4]},yaxis:{title:{text:''},range:[0,550],tickprefix:'$',automargin:false},showlegend:true,legend:{orientation:'h',x:0,y:-.23,font:{size:compact?10:11}},annotations:latestEditionVerified?[]:[{xref:'x',yref:'paper',x:2025,y:.96,text:compact?'2025: no<br>verified value':'2025 ATB: comparable LCOE<br>not verified from workbook',showarrow:false,font:{size:compact?9:11,color:colors.muted},align:'center'}]});
  plot('kt-fervo-capex',[{type:'bar',x:['2024','2025'],y:[178.693,465.659],name:'Reported actual',marker:{color:[colors.cadet,colors.cobalt],line:{color:colors.chathams,width:1}},text:['$178.7M','$465.7M'],textposition:'outside',cliponaxis:false,hovertext:['<b>2024 annual capital expenditures</b><br>$178.693 million<br>Reported actual annual company CapEx<br>Fervo Energy Company (2026), p. F-9','<b>2025 annual capital expenditures</b><br>$465.659 million<br>Reported actual annual company CapEx<br>Fervo Energy Company (2026), p. F-9'],hoverinfo:'text'}],{margin:{t:42,r:28,b:60,l:80},xaxis:{title:{text:'Fiscal year',font:{size:compact?10:12}},type:'category'},yaxis:{title:{text:''},automargin:false,range:[0,535],tickprefix:'$',ticksuffix:'M'},legend:{orientation:'h',x:0,y:1.12}});
  plot('kt-fervo-ppa-growth',[{type:'bar',x:['Dec. 2025','Q3 2026'],y:[658,1054],name:'Contracted capacity (binding PPAs)',marker:{color:[colors.cadet,colors.cobalt],line:{color:colors.chathams,width:1}},text:['658 MWe','1,054 MWe'],textposition:'outside',cliponaxis:false,hovertext:['<b>December 31, 2025</b><br>658 MW under binding PPAs<br>Contracted future capacity, not operating generation<br>Fervo Energy (2026), final prospectus','<b>Q3 2026</b><br>1,054 MW under binding PPAs<br>396 MW increase (60.2%) from year-end 2025<br>Contracted future capacity, not operating generation<br>Fervo Energy (November 9, 2026)'],hoverinfo:'text'}],{margin:compact?{t:65,r:20,b:72,l:72}:{t:65,r:28,b:70,l:82},xaxis:{title:{text:'Reporting period',font:{size:compact?10:12}},type:'category'},yaxis:{title:{text:''},automargin:false,range:[0,1250],ticksuffix:' MWe',tickformat:',.0f'},showlegend:false});
  const capitalLabels = ['2025 financing*','Cape Google 400 target','Cape Station Phase I expected','Project Red benchmark'];
  const capitalValues = [kpiData.funding.nextGeneration,capitalBillions(kpiData.projectCapex.google),capitalBillions(kpiData.projectCapex.cape),capitalBillions(kpiData.projectCapex.red)];
  const capitalHover = [
    '<b>2025 global next-generation financing</b><br>~$2.2B; EGS and closed-loop<br>Annual financing, not EGS-only construction spending<br>Schulz et al. (2026), IEA',
    '<b>Cape Google 400 company target</b><br>~$220B illustrative gross development capital<br>40 GWe × $5,500/kW<br>DOE (2023) and Fervo Q3 call (2026)',
    '<b>Cape Station Phase I expected cost</b><br>~$280B illustrative gross development capital<br>40 GWe × ~$7,000/kW<br>DOE (2023) and Fervo Q3 results (2026)',
    '<b>Project Red reported benchmark</b><br>~$600B illustrative gross development capital<br>40 GWe × $15,000/kW<br>DOE (2023) and Kah & Kleinberg (2025)'
  ];
  plot('kt-capital-needed-chart',[
    {type:'bar',orientation:'h',x:capitalValues.slice(0,1),y:capitalLabels.slice(0,1),name:'Global next-generation financing',marker:{color:colors.cadet,line:{color:colors.chathams,width:1}},text:['~$2.2B'],textposition:'outside',cliponaxis:false,hovertext:capitalHover.slice(0,1),hoverinfo:'text'},
    {type:'bar',orientation:'h',x:capitalValues.slice(1),y:capitalLabels.slice(1),name:'Illustrative U.S. EGS capital',marker:{color:colors.cobalt,line:{color:colors.chathams,width:1}},text:capitalValues.slice(1).map(v=>'~'+dollars(v)+'B'),textposition:compact?'inside':'outside',cliponaxis:false,hovertext:capitalHover.slice(1),hoverinfo:'text'}
  ],{margin:compact?{t:92,r:38,b:76,l:105}:{t:58,r:75,b:68,l:180},xaxis:{title:{text:'Capital scale (USD billions)',font:{size:compact?10:12}},range:[0,690],tickprefix:'$',ticksuffix:'B',nticks:compact?4:7},yaxis:{autorange:'reversed',categoryorder:'array',categoryarray:capitalLabels,tickmode:'array',tickvals:capitalLabels,ticktext:compact?['2025 financing*','Cape Google<br>400 target','Cape Station<br>Phase I expected','Project Red<br>benchmark']:capitalLabels,tickfont:{size:compact?10:11}},bargap:.36,showlegend:true,legend:{orientation:'h',x:0,y:compact?1.23:1.13,font:{size:compact?10:11}}});
  };

  const renderIfReady = () => {
    if (!el.isConnected || el.getBoundingClientRect().width <= 0 || typeof Plotly === 'undefined') return false;
    const nextCompact = el.getBoundingClientRect().width < 720;
    if (renderedCompact === undefined || renderedCompact !== nextCompact) {
      try {
        renderCharts();
      } catch (error) {
        renderedCompact = undefined;
        console.error('Financial KPI chart rendering failed:', error);
        return false;
      }
    }
    return true;
  };
  el._ktChartReadyHandler = renderIfReady;
  window.addEventListener('load', el._ktChartReadyHandler);
  document.addEventListener('visibilitychange', el._ktChartReadyHandler);
  renderIfReady();
  requestAnimationFrame(() => requestAnimationFrame(renderIfReady));
  if (typeof ResizeObserver !== 'undefined') el._ktResizeObserver = new ResizeObserver(() => {
    if (!renderIfReady()) return;
    chartIds.forEach((id) => {
      const chart = el.querySelector(`#${id}`);
      if (chart && chart.classList.contains('js-plotly-plot') && typeof Plotly !== 'undefined' && chart.getBoundingClientRect().width > 0) Plotly.Plots.resize(chart);
    });
  });
  if (el._ktResizeObserver) el._ktResizeObserver.observe(el);
};