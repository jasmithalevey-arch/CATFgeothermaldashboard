window.FinancialSections = window.FinancialSections || {};

window.FinancialSections.capitalStack = function (el) {
  const sources = {
    atb: {
      author: 'NREL',
      year: '2024',
      url: 'https://atb.nrel.gov/electricity/2024/',
    },
    fervoSeriesE: {
      author: 'Fervo Energy',
      year: '2025',
      url: 'https://fervoenergy.com/fervo-energy-raises-462-million-series-e-to-accelerate-geothermal-development-and-meet-surging-energy-demand-with-clean-firm-power/',
    },
    eig: {
      author: 'EIG Partners',
      year: '2026',
      url: 'https://eigpartners.com/eig-geothermal-catalyst-partners-completes-inaugural-investment/',
    },
    bankFinancing: {
      author: 'Fervo Energy',
      year: '2026',
      url: 'https://fervoenergy.com/fervo-energy-secures-421-million-in-non-recourse-project-financing-for-cape-station/',
    },
    fervoGrants: {
      author: 'Fervo Energy',
      year: '2026',
      url: 'https://fervoenergy.com/fervo-energy-secures-two-u-s-department-of-energy-awards-to-develop-next-generation-geothermal-in-idaho-and-nevada/',
    },
    forgeAward: {
      author: 'U.S. Department of Energy',
      year: '2023',
      url: 'https://www.energy.gov/hgeo/geothermal/articles/fervo-energy-sets-stage-accelerating-geothermal-deployment-successful-well',
    },
    capeGrant: {
      author: 'X-Caliber Rural Capital',
      year: '2024',
      url: 'https://fervoenergy.com/x-caliber-rural-capital-affiliate-closes-100mm-loan-for-worlds-largest-next-generation-geothermal-energy-project/',
    },
    egsPilot: {
      author: 'U.S. Department of Energy',
      year: '2026',
      url: 'https://www.energy.gov/hgeo/geothermal/egs-pilot-demonstrations',
    },
    paSelection: {
      author: 'U.S. Department of Energy',
      year: '2026',
      url: 'https://www.energy.gov/hgeo/geothermal/articles/office-geothermal-selects-14-million-enhanced-geothermal-systems',
    },
    mezzanineReturns: {
      author: 'Corporate Finance Institute',
      year: '2020',
      url: 'https://corporatefinanceinstitute.com/resources/commercial-lending/mezzanine-financing/',
    },
    bankRates: {
      author: 'Board of Governors of the Federal Reserve System',
      year: '2026',
      url: 'https://www.federalreserve.gov/releases/h15/',
    },
  };

  const layers = [
    {
      id: 'pensions',
      short: 'P',
      name: 'Pensions',
      subtitle: 'Long-horizon institutional capital',
      color: 'var(--cobalt)',
      ink: '#ffffff',
      soft: '#eaf0fb',
      role: 'Pension investors may participate through company equity or project vehicles. Public disclosures identify participation in an EGS developer funding round, but do not disclose the pension investors’ individual commitments or a project-level allocation.',
      evidence: [
        {
          text: 'CalSTRS and CPP Investments participated in Fervo Energy’s $462 million Series E round. Fervo said the round supports Cape Station and early development of other geothermal projects; investor-specific amounts were not disclosed.',
          citations: [sources.fervoSeriesE],
        },
      ],
      caveat: 'This is evidence of participation in a company-level round, not a separately disclosed pension-fund investment amount in a specific EGS project.',
    },
    {
      id: 'infrastructure',
      short: 'IF',
      name: 'Infrastructure funds',
      subtitle: 'Development and project capital',
      color: 'var(--sky)',
      ink: 'var(--chathams)',
      soft: '#e9f7fc',
      role: 'Infrastructure investors can provide development capital to projects moving through technical and commercial milestones. The example below is an EGS-focused fund investment; its amount and instrument were not made public.',
      evidence: [
        {
          text: 'EIG Geothermal Catalyst Partners completed its first investment in Power Planet to support the Star Peak EGS project and the company’s broader EGS portfolio.',
          citations: [sources.eig],
        },
      ],
      caveat: 'The investor did not disclose the investment amount or financing structure, so neither is estimated here.',
    },
    {
      id: 'banks',
      short: 'CB',
      name: 'Commercial banks',
      subtitle: 'Construction and project debt',
      color: 'var(--cadet-light)',
      ink: 'var(--chathams)',
      soft: 'var(--cadet-light)',
      role: 'Lenders can provide construction-to-term debt and credit facilities when a project has enough technical, contractual, and financial evidence to support repayment.',
      evidence: [
        {
          text: 'Fervo closed $421 million of non-recourse financing for Cape Station Phase I: a $309 million construction-to-term loan, a $61 million tax-credit bridge loan, and a $51 million letter-of-credit facility. Coordinating lead arrangers included Barclays, BBVA, HSBC, MUFG, RBC, and Société Générale.',
          citations: [sources.bankFinancing],
        },
      ],
      caveat: 'This is a disclosed EGS project-finance transaction; the facility mix is specific to Cape Station and is not a standard EGS capital allocation.',
    },
    {
      id: 'mezzanine',
      short: 'MZ',
      name: 'Mezzanine finance',
      subtitle: 'Subordinated or hybrid capital',
      color: 'var(--accent)',
      ink: 'var(--chathams)',
      soft: '#fff7e6',
      role: 'Mezzanine finance generally describes capital that is subordinate to senior debt and may combine debt-like and equity-like features. No primary-source EGS transaction explicitly labeled mezzanine was identified in the sources shown here.',
      evidence: [
        {
          text: 'Fervo disclosed a $75 million preferred-equity commitment for Cape Station Phase I. The company identifies it as preferred equity, not mezzanine financing, so it is not classified as a mezzanine deal.',
          citations: [sources.fervoSeriesE],
        },
      ],
      caveat: 'Preferred equity, bridge debt, and mezzanine financing are not interchangeable. No EGS mezzanine amount or terms are inferred from the preferred-equity example.',
    },
    {
      id: 'private-equity',
      short: 'PE',
      name: 'Private equity',
      subtitle: 'Growth and ownership capital',
      color: 'var(--cobalt-dark)',
      ink: '#ffffff',
      soft: '#eaf0fb',
      role: 'Private-equity capital can take ownership positions in companies or projects. The sources reviewed do not identify a distinct EGS transaction explicitly classified as private equity; company equity rounds are not treated as project-level PE.',
      evidence: [],
      caveat: 'No publicly disclosed EGS-specific private-equity transaction is cited here. This is a reporting gap, not evidence that private-equity investors do not participate.',
    },
    {
      id: 'venture-capital',
      short: 'VC',
      name: 'Venture capital',
      subtitle: 'Company-level technology and growth equity',
      color: 'var(--chathams)',
      ink: '#ffffff',
      soft: '#e8edf7',
      role: 'Venture and growth investors can fund EGS companies as they develop technology and advance projects. Disclosed company rounds should not be read as a project-by-project allocation.',
      evidence: [
        {
          text: 'Fervo closed a $462 million Series E led by B Capital. Fervo said the proceeds would support continued development of Cape Station and other projects in its geothermal pipeline.',
          citations: [sources.fervoSeriesE],
        },
      ],
      caveat: 'The disclosed amount is the total company financing round; it is not the amount invested by B Capital alone or a Cape Station-only equity figure.',
    },
    {
      id: 'philanthropy',
      short: 'PH',
      name: 'Philanthropy',
      subtitle: 'Mission-aligned grants and support',
      color: 'var(--cadet)',
      ink: 'var(--chathams)',
      soft: 'var(--cadet-light)',
      role: 'Philanthropic support can be relevant to early research or public-benefit work, but the sources shown here do not verify a philanthropic grant or donation directly funding an EGS project.',
      evidence: [],
      caveat: 'No EGS-specific philanthropic project award or amount is included. Corporate investors and public grants are not reclassified as philanthropy.',
    },
    {
      id: 'government',
      short: 'GOV',
      name: 'Government subsidies',
      subtitle: 'Grants and public programs',
      color: 'var(--cobalt)',
      ink: '#ffffff',
      soft: '#eaf0fb',
      role: 'Government support can fund EGS research, drilling, appraisal, and demonstrations. The grant layer below keeps those awards within the government section rather than treating grants as private capital.',
      evidence: [
        {
          text: 'DOE reported that Fervo received geothermal research funding and an EGS FORGE R&D award; the DOE announcement does not state the award amount.',
          citations: [sources.forgeAward],
        },
        {
          text: 'A separate $14 million Pennsylvania EGS project was selected for award negotiations. DOE states that selection is not a commitment to issue an award or provide funding, so it is not counted as a funded grant here.',
          citations: [sources.paSelection],
        },
      ],
      grants: {
        definition: 'Grants are public awards for eligible work; each funding opportunity sets its own scope, cost-share, and eligibility terms.',
        role: 'For EGS, the cited awards support work such as drilling and completing wells, high-temperature tools, resource appraisal, and demonstration. These activities can address technical and subsurface uncertainty before commercial operation.',
        citation: sources.egsPilot,
        evidence: [
          {
            text: 'Fervo said its two DOE awards total approximately $20 million: Idaho funding supports EGS well drilling/completion and high-temperature operations technology; Nevada funding supports a targeted resource-appraisal campaign.',
            citations: [sources.fervoGrants],
          },
          {
            text: 'Fervo’s Cape Station project received a $25 million award through DOE’s EGS Pilot Demonstrations program, according to X-Caliber Rural Capital’s 2024 project-financing announcement.',
            citations: [sources.capeGrant, sources.egsPilot],
          },
          {
            text: 'DOE describes the EGS Pilot Demonstrations initiative as support for projects testing EGS in varied locations, geology, and subsurface conditions.',
            citations: [sources.egsPilot],
          },
        ],
        caveat: 'Awards are specific to their notices and projects; the examples do not establish a typical grant amount or a standard government share of project cost.',
      },
    },
  ];

  const sourceMetrics = [
    {
      label: 'Deep EGS overnight cost',
      value: '$12,396–22,133/kW',
      note: 'NREL 2024 ATB range',
      citation: sources.atb,
    },
    {
      label: 'Near-field EGS overnight cost',
      value: '$5,469–10,395/kW',
      note: 'NREL 2024 ATB range',
      citation: sources.atb,
    },
    {
      label: 'Deep EGS drilling share',
      value: '≈57%',
      note: 'Drilling and completion share of overnight cost',
      citation: sources.atb,
    },
    {
      label: 'Representative EGS flow',
      value: '≈60 kg/s',
      note: 'NREL modeled scenario',
      citation: sources.atb,
    },
  ];

  const layerEconomics = {
    pensions: {
      debt: 'Pension funds are capital providers, not a debt instrument. They may invest through fund interests or equity; no debt terms for the cited investors were disclosed.',
      return: 'No layer-specific, source-published return range',
      returnNote: 'Do not substitute a pension plan’s total-portfolio assumption for an EGS deal hurdle.',
      risk: 'Varies by allocation and mandate',
      priorities: ['Long-duration fit', 'Risk-adjusted return', 'Liquidity planning'],
    },
    infrastructure: {
      debt: 'Typically equity or fund capital; the project may also use senior debt. EIG did not disclose the Star Peak investment structure.',
      return: 'No source-published target range for this example',
      returnNote: 'Fund targets vary by strategy and asset maturity; no range is inferred.',
      risk: 'Development and asset risk',
      priorities: ['Construction readiness', 'Contracted revenue', 'Long-life cash flow'],
    },
    banks: {
      debt: 'Senior project debt, which may include construction-to-term loans, bridge facilities, and letters of credit. Cape Station pricing was not disclosed.',
      return: 'Deal rate not disclosed',
      returnNote: 'Federal Reserve prime rate: 7.00% (November 2026 reference only; not Cape Station pricing).',
      returnCitation: sources.bankRates,
      risk: 'Senior repayment priority; still exposed to construction and performance risk',
      priorities: ['Repayment coverage', 'Offtaker credit', 'Permits and completion'],
      flag: 'Order caveat: senior bank debt is usually repaid ahead of equity but appears after infrastructure equity in the requested display order. The stack is not a rising risk or return scale.',
    },
    mezzanine: {
      debt: 'Subordinated debt or hybrid capital; returns can include cash interest, payment-in-kind interest, fees, or equity participation.',
      return: '12–20% investor return range',
      returnNote: 'Generic mezzanine benchmark, not geothermal-specific and not a disclosed EGS deal term.',
      returnCitation: sources.mezzanineReturns,
      risk: 'Higher risk than senior secured debt',
      priorities: ['Downside protection', 'Coupon and PIK terms', 'Refinancing or exit'],
    },
    'private-equity': {
      debt: 'Equity ownership; a buyout may use debt at the company or asset level. No distinct EGS private-equity deal was verified.',
      return: 'No standardized, source-published target range',
      returnNote: 'No target is invented for this layer; strategy, leverage, and exit timing drive outcomes.',
      risk: 'High; equity bears losses before creditors',
      priorities: ['Control and governance', 'Value creation', 'Exit path'],
    },
    'venture-capital': {
      debt: 'Usually preferred or common equity with no scheduled principal repayment; investors accept dilution and company-level risk.',
      return: 'No universal, source-published target range',
      returnNote: 'A 40% target is not treated as a general VC expectation without a source; it may describe an individual fund’s hurdle.',
      risk: 'Very high; early-stage equity can lose all invested capital',
      priorities: ['Technical milestones', 'Market scale', 'Follow-on and exit potential'],
    },
    philanthropy: {
      debt: 'Usually a grant or donation, not repayable debt; financial return is not the objective.',
      return: 'Not applicable: no financial return expected',
      returnNote: 'Impact is the relevant outcome, not a commercial yield.',
      risk: 'Not comparable to commercial investment risk',
      priorities: ['Measurable impact', 'Additionality', 'Public benefit'],
    },
    government: {
      debt: 'Grants and subsidies can reduce project cost; tax-credit bridges or loans are separate instruments and may be repayable.',
      return: 'Not applicable: grants do not target investor returns',
      returnNote: 'Public benefits and program outcomes are not a private financial yield.',
      risk: 'Not comparable to commercial investment risk',
      priorities: ['Program eligibility', 'Public benefit', 'Cost share and milestones'],
    },
  };

  const fidChecklist = [
    'Resource and production case supported by technical evidence',
    'Site control, permits, and required interconnection approvals',
    'Offtake or revenue arrangements that support the business case',
    'Construction and operating plans with credible cost and schedule assumptions',
    'Committed equity and debt terms, with a financeable model and contingencies',
  ];

  let selectedId = 'pensions';
  let focusedId = selectedId;
  let researchTab = 'overview';

  el.innerHTML = `
    <style>
      .cs-stack {
        --cs-ink: var(--chathams);
        --cs-muted: var(--muted);
        --cs-border: var(--cadet-light);
        --cs-surface: #fff;
        --cs-subtle: var(--card);
        color: var(--cs-ink);
        font-family: var(--font-body);
        margin: 0 auto;
        max-width: 1600px;
      }
      .cs-stack * { box-sizing: border-box; }
      .cs-intro { margin: 0 0 1.5rem; }
      .cs-breadcrumb {
        align-items: center;
        color: var(--cs-muted);
        display: flex;
        font-size: .75rem;
        font-weight: 600;
        gap: .5rem;
        margin-bottom: .5rem;
      }
      .cs-breadcrumb span { color: var(--cobalt); }
      .cs-intro h2 {
        color: var(--chathams);
        font: 700 clamp(1.9rem, 3vw, 2.5rem)/1.15 var(--font-display);
        letter-spacing: -.035em;
        margin: 0;
      }
      .cs-intro-row p { color: var(--cs-muted); font-size: .9rem; margin: .5rem 0 0; }
      .cs-workspace {
        align-items: stretch;
        display: grid;
        gap: 1.25rem;
        grid-template-columns: minmax(245px, 280px) minmax(360px, 1fr) minmax(320px, 390px);
      }
      .cs-card, .cs-below {
        background: var(--cs-surface);
        border: 1px solid var(--cs-border);
        border-radius: 14px;
        box-shadow: 0 8px 24px rgba(21, 49, 113, .045);
        min-width: 0;
        padding: 1.25rem;
      }
      .cs-eyebrow, .cs-section-label {
        color: var(--muted);
        font-size: .63rem;
        font-weight: 700;
        letter-spacing: .13em;
        margin: 0;
        text-transform: uppercase;
      }
      .cs-card-heading { align-items: center; display: flex; gap: .75rem; justify-content: space-between; }
      .cs-card-heading h3 { color: var(--chathams); font-size: 1rem; letter-spacing: -.02em; margin: .25rem 0 0; }
      .cs-pill { background: var(--accent); border-radius: 999px; color: var(--chathams); flex: 0 0 auto; font-size: .57rem; font-weight: 700; padding: .3rem .55rem; }
      .cs-metrics { display: grid; gap: .5rem; margin-top: 1rem; }
      .cs-metric { border: 1px solid var(--cs-border); border-radius: 10px; padding: .65rem .75rem; }
      .cs-metric h4 { color: var(--muted); font-size: .57rem; letter-spacing: .08em; margin: 0; text-transform: uppercase; }
      .cs-metric strong { color: var(--chathams); display: block; font-size: .96rem; letter-spacing: -.02em; margin-top: .2rem; }
      .cs-metric p { color: var(--cs-muted); font-size: .58rem; line-height: 1.5; margin: .2rem 0 0; }
      .cs-citation { color: var(--cs-muted); display: block; font-size: .55rem; line-height: 1.5; margin-top: .35rem; overflow-wrap: anywhere; }
      .cs-citation a, .cs-source-link { color: var(--cobalt); }
      .cs-investor-card { background: linear-gradient(135deg, #fff, var(--card)); border: 1px solid var(--cs-border); border-radius: 10px; margin-top: 1rem; padding: .8rem; }
      .cs-investor-card-top { align-items: flex-start; display: flex; gap: .5rem; justify-content: space-between; }
      .cs-investor-card h4 { color: var(--chathams); font-size: .76rem; margin: .2rem 0 0; }
      .cs-investor-count { background: var(--accent); border-radius: 999px; color: var(--chathams); flex: 0 0 auto; font-size: .52rem; font-weight: 700; padding: .25rem .45rem; }
      .cs-investor-card p { color: var(--cs-muted); font-size: .59rem; line-height: 1.55; margin: .4rem 0 0; }
      .cs-investor-link { align-items: center; background: transparent; border: 0; color: var(--cobalt); cursor: pointer; display: flex; font: 700 .62rem var(--font-body); justify-content: space-between; margin-top: .6rem; padding: 0; text-align: left; text-decoration: none; width: 100%; }
      .cs-investor-link:hover { text-decoration: underline; }
      .cs-stack[data-view="investors"] > :not(.cs-investor-page) { display: none !important; }
      .cs-investor-page[hidden] { display: none !important; }
      .cs-investor-page { color: var(--chathams); margin: 0 auto; max-width: 1200px; }
      .cs-investor-page-hero { background: linear-gradient(120deg, var(--chathams), var(--cobalt)); border-radius: 16px; color: #fff; padding: clamp(1.25rem, 3vw, 2.25rem); }
      .cs-investor-page-hero .cs-eyebrow { color: var(--cadet-light); }
      .cs-investor-page-hero h2 { color: #fff; font: 700 clamp(1.5rem, 3vw, 2.1rem)/1.2 var(--font-display); margin: .4rem 0 0; }
      .cs-investor-page-hero p:last-child { color: var(--cadet-light); font-size: .88rem; line-height: 1.6; margin: .55rem 0 0; max-width: 720px; }
      .cs-investor-pending { align-items: center; background: #fff; border: 1px solid var(--cadet-light); border-radius: 14px; box-shadow: 0 8px 24px rgba(21,49,113,.045); display: flex; gap: 1rem; margin-top: 1.25rem; padding: 1.25rem; }
      .cs-investor-pending-mark { align-items: center; background: var(--accent); border-radius: 14px; color: var(--chathams); display: flex; flex: 0 0 64px; font: 700 1.25rem var(--font-body); height: 64px; justify-content: center; }
      .cs-investor-pending h2 { color: var(--chathams); font: 600 1rem/1.35 var(--font-body); margin: .2rem 0 0; }
      .cs-investor-pending p:last-child { color: var(--muted); font-size: .75rem; line-height: 1.6; margin: .35rem 0 0; }
      .cs-investor-back { background: transparent; border: 0; color: var(--cobalt); cursor: pointer; display: inline-flex; font: 700 .75rem var(--font-body); margin-top: 1rem; padding: 0; text-decoration: none; }
      .cs-investor-back:hover { text-decoration: underline; }
      .cs-fid { margin-top: 1.25rem; }
      .cs-fid h3 { color: var(--chathams); font: 600 1.1rem/1.3 var(--font-body); letter-spacing: -.02em; margin: .3rem 0 0; }
      .cs-fid-intro { color: var(--cs-muted); font-size: .66rem; line-height: 1.55; margin: .45rem 0 0; max-width: 850px; }
      .cs-fid-track { display: grid; gap: .4rem; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: .9rem; }
      .cs-fid-step { background: var(--card); border: 1px solid var(--cs-border); border-radius: 8px; color: var(--chathams); font-size: .62rem; font-weight: 700; line-height: 1.4; padding: .55rem; }
      .cs-fid-step[data-gate="true"] { background: var(--accent); border-color: var(--accent); }
      .cs-fid-step small { color: var(--cs-muted); display: block; font-size: .53rem; font-weight: 500; margin-top: .2rem; }
      .cs-fid-details { display: grid; gap: 1rem; grid-template-columns: minmax(0, 1.2fr) minmax(250px, .8fr); margin-top: .85rem; }
      .cs-fid-details h4 { color: var(--chathams); font-size: .67rem; margin: 0; }
      .cs-fid-checklist { display: grid; gap: .35rem; grid-template-columns: repeat(2, minmax(0, 1fr)); list-style: none; margin: .45rem 0 0; padding: 0; }
      .cs-fid-checklist li { color: var(--cs-muted); font-size: .59rem; line-height: 1.45; padding-left: 1rem; position: relative; }
      .cs-fid-checklist li::before { color: var(--cobalt); content: "✓"; font-weight: 700; left: 0; position: absolute; }
      .cs-fid-example { border-left: 2px solid var(--sky); padding-left: .75rem; }
      .cs-fid-example p { color: var(--cs-muted); font-size: .6rem; line-height: 1.5; margin: .4rem 0 0; }
      .cs-nav { border-top: 1px solid var(--cs-border); margin-top: 1.1rem; padding-top: .85rem; }
      .cs-layer-list { display: grid; gap: .25rem; margin-top: .5rem; }
      .cs-layer-nav {
        align-items: center;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--chathams);
        cursor: pointer;
        display: flex;
        font: inherit;
        justify-content: space-between;
        padding: .42rem .55rem;
        text-align: left;
        transition: background .16s ease, border-color .16s ease;
        width: 100%;
      }
      .cs-layer-nav:hover, .cs-layer-nav[data-focused="true"] { background: var(--card); border-color: var(--cadet-light); }
      .cs-layer-nav:focus-visible, .cs-tower-layer:focus-visible, .cs-research-tab:focus-visible, .cs-export:focus-visible, .cs-source-link:focus-visible, .cs-investor-link:focus-visible, .cs-investor-back:focus-visible {
        outline: 3px solid var(--cobalt);
        outline-offset: 3px;
      }
      .cs-nav-copy { align-items: center; display: flex; gap: .55rem; min-width: 0; }
      .cs-abbrev {
        align-items: center;
        background: var(--layer-soft);
        border-radius: 6px;
        color: var(--layer-ink);
        display: inline-flex;
        flex: 0 0 auto;
        font-size: .58rem;
        font-weight: 700;
        height: 28px;
        justify-content: center;
        width: 28px;
      }
      .cs-nav-name { display: block; font-size: .68rem; font-weight: 700; }
      .cs-nav-subtitle { color: var(--cs-muted); display: block; font-size: .56rem; margin-top: .1rem; }
      .cs-chevron { color: var(--cadet); font-size: 1.1rem; padding-left: .4rem; }
      .cs-tower {
        background: var(--chathams);
        border: 1px solid var(--chathams);
        border-radius: 14px;
        box-shadow: 0 16px 40px rgba(21, 49, 113, .14);
        color: #fff;
        min-height: 700px;
        overflow: hidden;
        padding: 1.4rem;
        position: relative;
      }
      .cs-tower::before {
        background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
        background-size: 42px 42px;
        content: "";
        inset: 0;
        mask-image: linear-gradient(to bottom, black, transparent 78%);
        opacity: .6;
        pointer-events: none;
        position: absolute;
      }
      .cs-tower-inner { display: flex; flex-direction: column; min-height: 660px; position: relative; }
      .cs-tower-head { align-items: flex-start; display: flex; justify-content: space-between; gap: 1rem; }
      .cs-tower-kicker { color: var(--cadet); font-size: .6rem; font-weight: 700; letter-spacing: .13em; margin: 0; text-transform: uppercase; }
      .cs-tower-kicker span { color: var(--accent); font-size: .85rem; margin-right: .25rem; }
      .cs-tower-head h3 { color: #fff; font: 600 1.45rem/1.2 var(--font-body); letter-spacing: -.035em; margin: .5rem 0 0; }
      .cs-tower-help { color: var(--cadet); font-size: .58rem; line-height: 1.5; margin: 0; max-width: 155px; text-align: right; }
      .cs-tower-main { align-items: center; display: flex; flex: 1; justify-content: center; margin: 1.25rem 0; min-height: 530px; }
      .cs-tower-stack {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 530px;
        max-width: 420px;
        perspective: 900px;
        transform: rotateX(-1deg);
      }
      .cs-tower-layer {
        align-items: center;
        background: var(--layer-color);
        border: 0;
        border-top: 1px solid rgba(21,49,113,.16);
        color: var(--layer-ink);
        cursor: pointer;
        display: flex;
        flex: 1;
        font-family: var(--font-body);
        justify-content: space-between;
        min-height: 0;
        padding: .45rem .8rem;
        position: relative;
        text-align: left;
        transition: opacity .2s ease, transform .2s ease, box-shadow .2s ease, filter .2s ease;
        width: 100%;
      }
      .cs-tower-layer::after {
        background: var(--layer-color);
        bottom: -5px;
        content: "";
        filter: brightness(.72);
        position: absolute;
        right: -11px;
        top: 5px;
        transform: skewY(40deg);
        transform-origin: left top;
        width: 11px;
      }
      .cs-tower-layer:first-child { border-radius: 8px 8px 0 0; }
      .cs-tower-layer:last-child { border-radius: 0 0 8px 8px; }
      .cs-tower-layer:hover, .cs-tower-layer[data-focused="true"] { box-shadow: 12px 14px 30px rgba(0,0,0,.3); transform: translateX(-8px); z-index: 1; }
      .cs-tower-layer[data-dimmed="true"] { filter: grayscale(1); opacity: .23; }
      .cs-tower-label { display: block; min-width: 0; position: relative; z-index: 1; }
      .cs-tower-name { display: block; font-size: .75rem; font-weight: 700; line-height: 1.2; }
      .cs-tower-subtitle { display: block; font-size: .55rem; line-height: 1.25; margin-top: .16rem; opacity: .82; }
      .cs-fid-marker {
        align-items: center;
        background: rgba(255,222,141,.13);
        border-bottom: 1px dashed var(--accent);
        border-top: 1px dashed var(--accent);
        color: var(--accent);
        display: flex;
        flex: 0 0 auto;
        font-size: .54rem;
        font-weight: 700;
        gap: .45rem;
        justify-content: center;
        line-height: 1.3;
        margin-top: .75rem;
        padding: .45rem .55rem;
      }
      .cs-fid-marker strong { color: #fff; flex: 0 0 auto; }
      .cs-grant-sublayer {
        background: var(--accent);
        border: 1px solid rgba(21,49,113,.2);
        border-radius: 5px;
        color: var(--chathams);
        display: block;
        font-size: .53rem;
        font-weight: 700;
        margin-top: .25rem;
        padding: .1rem .35rem;
        position: relative;
        z-index: 1;
      }
      .cs-tower-footer { border-top: 1px solid rgba(255,255,255,.15); color: var(--cadet); font-size: .57rem; font-weight: 600; line-height: 1.5; padding-top: .75rem; }
      .cs-research { overflow: hidden; padding: 0; }
      .cs-profile-head { border-bottom: 1px solid var(--cs-border); padding: 1.25rem; }
      .cs-profile-top { align-items: flex-start; display: flex; gap: .75rem; justify-content: space-between; }
      .cs-profile-title { align-items: center; display: flex; gap: .7rem; }
      .cs-profile-title h3 { color: var(--chathams); font-size: 1rem; letter-spacing: -.025em; margin: .1rem 0 0; }
      .cs-definition { color: var(--cs-muted); font-size: .7rem; line-height: 1.65; margin: .8rem 0 0; }
      .cs-research-tabs { background: var(--card); border-radius: 8px; display: grid; gap: 3px; grid-template-columns: repeat(3, 1fr); margin-top: .85rem; padding: 3px; }
      .cs-research-tab { background: transparent; border: 0; border-radius: 6px; color: var(--muted); cursor: pointer; font: 600 .65rem var(--font-body); padding: .45rem .25rem; }
      .cs-research-tab[aria-selected="true"] { background: #fff; box-shadow: 0 1px 3px rgba(21,49,113,.1); color: var(--cobalt); }
      .cs-research-body { max-height: 670px; overflow-y: auto; padding: 1.25rem; }
      .cs-research-section + .cs-research-section { margin-top: 1.1rem; }
      .cs-copy { color: var(--cs-muted); font-size: .67rem; line-height: 1.6; margin: .45rem 0 0; }
      .cs-economics { display: grid; gap: .45rem; margin-top: .8rem; }
      .cs-econ-grid { display: grid; gap: .4rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .cs-econ-item { background: var(--card); border: 1px solid var(--cs-border); border-radius: 8px; min-width: 0; padding: .55rem; }
      .cs-econ-item:nth-child(3) { grid-column: 1 / -1; }
      .cs-econ-label { color: var(--muted); display: block; font-size: .52rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
      .cs-econ-item strong { color: var(--chathams); display: block; font-size: .65rem; line-height: 1.4; margin-top: .25rem; }
      .cs-econ-item p { color: var(--cs-muted); font-size: .58rem; line-height: 1.45; margin: .25rem 0 0; }
      .cs-priorities { border-top: 1px solid var(--cs-border); padding-top: .45rem; }
      .cs-priority-list { display: flex; flex-wrap: wrap; gap: .3rem; margin-top: .35rem; }
      .cs-priority-chip { background: #fff; border: 1px solid var(--cs-border); border-radius: 999px; color: var(--chathams); font-size: .54rem; line-height: 1.3; padding: .2rem .45rem; }
      .cs-econ-flag { background: #fff7e6; border-left: 3px solid var(--accent); border-radius: 6px; color: var(--chathams); font-size: .58rem; line-height: 1.5; padding: .5rem .55rem; }
      .cs-evidence-list { display: grid; gap: .6rem; }
      .cs-evidence {
        background: #fff;
        border: 1px solid var(--cs-border);
        border-left: 3px solid var(--cobalt);
        border-radius: 8px;
        color: var(--chathams);
        font-size: .64rem;
        line-height: 1.55;
        padding: .65rem .7rem;
      }
      .cs-evidence p { margin: 0; }
      .cs-gap, .cs-caveat {
        background: #fff7e6;
        border-radius: 8px;
        color: var(--chathams);
        font-size: .63rem;
        line-height: 1.55;
        margin-top: .7rem;
        padding: .65rem;
      }
      .cs-grant-info { background: var(--card); border: 1px solid var(--cs-border); border-radius: 9px; margin-bottom: .8rem; padding: .75rem; }
      .cs-grant-info h4 { color: var(--chathams); font-size: .72rem; margin: 0; }
      .cs-grant-info p { color: var(--cs-muted); font-size: .63rem; line-height: 1.55; margin: .35rem 0 0; }
      .cs-sources { display: grid; gap: .6rem; list-style: none; margin: 0; padding: 0; }
      .cs-sources li { border-bottom: 1px solid var(--cs-border); padding-bottom: .55rem; }
      .cs-source-name { color: var(--chathams); display: block; font-size: .63rem; font-weight: 700; }
      .cs-source-link { display: block; font-size: .56rem; line-height: 1.5; margin-top: .2rem; overflow-wrap: anywhere; }
      .cs-below { margin-top: 1.25rem; }
      .cs-below-head { align-items: flex-end; border-bottom: 1px solid var(--cs-border); display: flex; gap: 1rem; justify-content: space-between; padding-bottom: 1rem; }
      .cs-below-head h3 { color: var(--chathams); font: 600 1.15rem/1.3 var(--font-body); letter-spacing: -.025em; margin: .3rem 0 0; }
      .cs-aside-note { color: var(--muted); font-size: .6rem; line-height: 1.5; margin: 0; max-width: 350px; }
      .cs-below-grid { display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 1rem 0; }
      .cs-below-item { border-left: 2px solid var(--cadet); padding-left: .8rem; }
      .cs-below-item h4 { color: var(--chathams); font-size: .7rem; margin: 0; }
      .cs-below-item p { color: var(--cs-muted); font-size: .62rem; line-height: 1.6; margin: .35rem 0 0; }
      .cs-glossary-group { margin-top: 1rem; }
      .cs-glossary-group > h4, .cs-public h4 { color: var(--chathams); font-size: .76rem; margin: 0; }
      .cs-glossary-context { color: var(--cs-muted); font-size: .62rem; line-height: 1.6; margin: .3rem 0 0; }
      .cs-stages, .cs-glossary { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 1rem 0; }
      .cs-stage, .cs-glossary article { border-left: 2px solid var(--cadet-light); padding-left: .8rem; }
      .cs-stage h5, .cs-glossary h5 { color: var(--chathams); font-size: .68rem; margin: 0; }
      .cs-stage p, .cs-glossary p { color: var(--cs-muted); font-size: .62rem; line-height: 1.6; margin: .35rem 0 0; }
      .cs-glossary { border-top: 1px solid var(--cs-border); margin-top: .2rem; }
      .cs-public { border-top: 1px solid var(--cs-border); margin-top: .3rem; padding-top: 1rem; }
      .cs-public p { color: var(--cs-muted); font-size: .62rem; line-height: 1.6; margin: .35rem 0 0; }
      .cs-source-links { display: flex; flex-wrap: wrap; gap: .5rem 1rem; margin-top: .5rem; }
      .cs-source-links a { color: var(--cobalt); font-size: .62rem; font-weight: 600; }
      .cs-disclaimer { align-items: flex-start; background: var(--accent); border-radius: var(--radius); color: var(--chathams); display: flex; font-size: .68rem; gap: .5rem; line-height: 1.55; margin: 1rem 0 0; padding: .7rem .8rem; }
      .cs-export {
        align-items: center;
        background: #fff;
        border: 1px solid var(--cadet);
        border-radius: 8px;
        color: var(--chathams);
        cursor: pointer;
        display: inline-flex;
        flex: 0 0 auto;
        font: 600 .68rem var(--font-body);
        gap: .45rem;
        padding: .5rem .7rem;
      }
      .cs-export:hover { background: var(--card); }
      .cs-intro-row { align-items: flex-end; display: flex; gap: 1rem; justify-content: space-between; }
      @media (max-width: 1180px) {
        .cs-workspace { grid-template-columns: minmax(230px, 280px) minmax(360px, 1fr); }
        .cs-research { grid-column: 1 / -1; }
        .cs-research-body { max-height: none; }
        .cs-below-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 760px) {
        .cs-workspace { grid-template-columns: minmax(0, 1fr); }
        .cs-research { grid-column: auto; }
        .cs-tower { min-height: 680px; padding: 1rem; }
        .cs-tower-inner { min-height: 640px; }
        .cs-tower-main { min-height: 550px; }
        .cs-tower-stack { height: 540px; }
        .cs-tower-layer { padding: .4rem .55rem; }
        .cs-tower-subtitle { font-size: .5rem; }
        .cs-tower-name { font-size: .68rem; }
        .cs-below-grid { grid-template-columns: minmax(0, 1fr); }
        .cs-stages, .cs-glossary { grid-template-columns: minmax(0, 1fr); }
        .cs-below-head { align-items: flex-start; flex-direction: column; }
        .cs-intro-row { align-items: flex-start; }
        .cs-fid-track { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .cs-fid-details, .cs-fid-checklist { grid-template-columns: minmax(0, 1fr); }
        .cs-investor-pending { align-items: flex-start; flex-direction: column; }
      }
      @media (max-width: 420px) {
        .cs-tower-help { display: none; }
        .cs-tower-name { font-size: .62rem; }
        .cs-tower-subtitle { font-size: .46rem; }
        .cs-grant-sublayer { font-size: .45rem; }
        .cs-econ-grid { grid-template-columns: minmax(0, 1fr); }
      }
      @media (prefers-reduced-motion: reduce) {
        .cs-stack *, .cs-stack *::before, .cs-stack *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
      }
    </style>
    <div class="cs-stack" data-view="stack">
      <header class="cs-intro">
        <div class="cs-breadcrumb">EGS project finance <span aria-hidden="true">›</span> Capital profiles</div>
        <div class="cs-intro-row">
          <div>
            <h2>Who funds EGS?</h2>
            <p>Source-linked capital channels for enhanced geothermal systems</p>
          </div>
          <button class="cs-export" type="button" data-export><span aria-hidden="true">↓</span> Export research</button>
        </div>
      </header>

      <div class="cs-workspace">
        <aside class="cs-card">
          <div class="cs-card-heading">
            <div><p class="cs-eyebrow">EGS-specific data</p><h3>EGS cost drivers</h3></div>
            <span class="cs-pill">NREL 2024 ATB</span>
          </div>
          <div class="cs-metrics" aria-label="EGS cost metrics">
            ${sourceMetrics.map((metric) => `
              <article class="cs-metric">
                <h4>${escapeHtml(metric.label)}</h4>
                <strong>${escapeHtml(metric.value)}</strong>
                <p>${escapeHtml(metric.note)}</p>
                ${citationMarkup(metric.citation)}
              </article>
            `).join('')}
          </div>
          <div class="cs-investor-card">
            <div class="cs-investor-card-top">
              <div><p class="cs-eyebrow">Developer resource</p><h4>Investor directory</h4></div>
              <span class="cs-investor-count">10 profiles</span>
            </div>
            <p>Source-backed geothermal investors, capital-stack categories, logos, and deal details will be added from the Currence data.</p>
            <button class="cs-investor-link" type="button" aria-controls="cs-investor-details" aria-expanded="false" data-open-investors><span>More information</span><span aria-hidden="true">→</span></button>
          </div>
          <div class="cs-nav">
            <p class="cs-eyebrow">Navigate the stack</p>
            <div class="cs-layer-list" role="group" aria-label="Capital provider categories">
              ${layers.map((layer) => `
                <button class="cs-layer-nav" type="button" data-layer="${layer.id}" data-focused="false" aria-pressed="false">
                  <span class="cs-nav-copy">
                    <span class="cs-abbrev" style="--layer-soft:${layer.soft};--layer-ink:${layer.ink}">${escapeHtml(layer.short)}</span>
                    <span><span class="cs-nav-name">${escapeHtml(layer.name)}</span><span class="cs-nav-subtitle">${escapeHtml(layer.subtitle)}</span></span>
                  </span>
                  <span class="cs-chevron" aria-hidden="true">›</span>
                </button>
              `).join('')}
            </div>
          </div>
        </aside>

        <div class="cs-tower" role="region" aria-labelledby="cs-tower-title">
          <div class="cs-tower-inner">
            <header class="cs-tower-head">
              <div><p class="cs-tower-kicker"><span aria-hidden="true">✦</span> EGS funding channels</p><h3 id="cs-tower-title">Funding tower</h3></div>
              <p class="cs-tower-help">Select a category to view EGS-specific evidence and source citations.</p>
            </header>
            <div class="cs-fid-marker" role="note"><strong>FID gate</strong><span>Project-stage checkpoint · separate from provider order</span></div>
            <div class="cs-tower-main">
              <div class="cs-tower-stack" role="group" aria-label="Capital provider categories in the requested display order">
                ${layers.map((layer) => `
                  <button class="cs-tower-layer" type="button" data-layer="${layer.id}" data-focused="false" data-dimmed="false" aria-pressed="false" style="--layer-color:${layer.color};--layer-ink:${layer.ink}">
                    <span class="cs-tower-label">
                      <span class="cs-tower-name">${escapeHtml(layer.name)}</span>
                      <span class="cs-tower-subtitle">${escapeHtml(layer.subtitle)}</span>
                      ${layer.grants ? '<span class="cs-grant-sublayer">Grants · EGS research, drilling &amp; demonstration</span>' : ''}
                    </span>
                    <span class="cs-abbrev" style="--layer-soft:${layer.soft};--layer-ink:${layer.ink}">${escapeHtml(layer.short)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            <footer class="cs-tower-footer">Requested provider order, not a risk/return ranking or funding waterfall. FID is a project gate, not a capital source.</footer>
          </div>
        </div>

        <aside class="cs-card cs-research" aria-label="EGS capital source details" aria-live="polite"></aside>
      </div>

      <div class="cs-card cs-fid" role="region" aria-labelledby="cs-fid-title">
        <header>
          <p class="cs-eyebrow">Project decision gate</p>
          <h3 id="cs-fid-title">Final investment decision (FID)</h3>
          <p class="cs-fid-intro">FID is the sponsor’s go/no-go commitment to proceed from development into construction, after diligence and financing commitments are ready. The marker is separate from the provider rows: sources can participate across project stages and financing can close in varying orders.</p>
        </header>
        <div class="cs-fid-track" aria-label="Project stage around FID">
          <div class="cs-fid-step">Development and de-risking<small>Confirm resource, design, site, and commercial path</small></div>
          <div class="cs-fid-step" data-gate="true">FID and financial close<small>Proceed decision with committed capital</small></div>
          <div class="cs-fid-step">Construction<small>Construction financing is drawn as agreed</small></div>
          <div class="cs-fid-step">Operations<small>Commissioning and repayment begin</small></div>
        </div>
        <div class="cs-fid-details">
          <div>
            <h4>What should be in place</h4>
            <ul class="cs-fid-checklist">${fidChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          </div>
          <div class="cs-fid-example">
            <h4>Deal example: Cape Station</h4>
            <p>Fervo reported contracted power-purchase agreements and closed $421 million in non-recourse financing, including a construction-to-term loan, to fund remaining Phase I construction. The announcement illustrates FID readiness factors; it is not presented as a separately reported FID date.</p>
            ${citationMarkup(sources.bankFinancing)}
          </div>
        </div>
      </div>

      <div class="cs-below" role="region" aria-labelledby="cs-evidence-title">
        <header class="cs-below-head">
          <div><p class="cs-eyebrow">How to read this view</p><h3 id="cs-evidence-title">EGS funding evidence, not an assumed capital stack</h3></div>
          <p class="cs-aside-note">Capital providers and financing instruments can overlap. Reported round totals are not split across investors unless the source does so.</p>
        </header>
        <div class="cs-below-grid">
          <article class="cs-below-item">
            <h4>EGS-only examples</h4>
            <p>Transaction examples shown are tied to EGS developers or projects. No non-EGS transaction is used as a substitute for missing EGS evidence.</p>
          </article>
          <article class="cs-below-item">
            <h4>Public disclosure gaps</h4>
            <p>Where a primary-source EGS example was not found, the profile says so. Missing public data is not treated as a zero-dollar allocation or proof that a funding type is unavailable.</p>
          </article>
          <article class="cs-below-item">
            <h4>Risk and return caveat</h4>
            <p>Published target ranges are shown only when a source supports them. Debt coupons, fund targets, and pension assumptions are different measures; the requested stack order does not imply a smooth risk-return curve.</p>
          </article>
          <article class="cs-below-item">
            <h4>Government grants</h4>
            <p>The nested grant layer shows EGS awards for research, drilling, appraisal, and demonstrations. Program selections are not counted as funding unless an award is reported as received.</p>
          </article>
        </div>
      </div>
      <p class="cs-disclaimer"><span aria-hidden="true">ⓘ</span><span>Conceptual provider map—not an EGS financing recommendation or a standard waterfall. Each cited amount refers only to the project, company round, or award described in its source; no allocation is inferred.</span></p>

      <div class="cs-below" role="region" aria-labelledby="cs-glossary-title">
        <header class="cs-below-head">
          <div><p class="cs-eyebrow">EGS project finance</p><h3 id="cs-glossary-title">Bankability glossary</h3></div>
          <p class="cs-aside-note">A fully confirmed resource still retains long-term reservoir risk.</p>
        </header>
        <div class="cs-glossary-group">
          <h4>Resource provenness and bankability stages</h4>
          <p class="cs-glossary-context">These stages describe how project-specific resource evidence can affect financing readiness.</p>
          <div class="cs-stages">
            <article class="cs-stage">
              <h5>Partially proven</h5>
              <p>Initial exploration or drilling confirms EGS potential, but commercial productivity or full resource capacity remains uncertain. Early equity is generally more suitable; mezzanine may become possible as uncertainty decreases.</p>
            </article>
            <article class="cs-stage">
              <h5>Fully confirmed</h5>
              <p>The resource demonstrates enough thermal capacity for the proposed plant through well productivity, flow rate, reservoir temperature, and evidence of sustainable generation. Independent reservoir engineering supports the case.</p>
            </article>
            <article class="cs-stage">
              <h5>Bank-ready evidence</h5>
              <p>Banks examine resource confirmation, debt repayment capacity, independent engineering, a PPA, construction budget, and a financial model incorporating CAPEX, OPEX, and electricity sales.</p>
            </article>
          </div>
        </div>
        <div class="cs-glossary-group">
          <h4>Financing and project-performance concepts</h4>
          <p class="cs-glossary-context">These terms clarify repayment priority, saleable electricity, and how developers and funders evaluate project economics.</p>
          <div class="cs-glossary">
            <article>
              <h5>Senior vs. subordinated</h5>
              <p>Senior debt is paid first. Mezzanine or subordinated debt is paid after senior lenders, accepts greater default risk, and can receive fees or equity participation.</p>
            </article>
            <article>
              <h5>Gross vs. net generation</h5>
              <p>Net electricity equals gross generation minus parasitic consumption from pumps, cooling, and auxiliary systems. Revenue depends on saleable net output.</p>
            </article>
            <article>
              <h5>IRR, NPV, and payback</h5>
              <p>IRR measures annualized return; positive NPV indicates value at the required discount rate. Payback communicates capital recovery but omits important time-value effects.</p>
            </article>
          </div>
        </div>
        <div class="cs-public">
          <h4>Public support and tax-credit capital</h4>
          <p>Grants, loan guarantees, and other public programs can support development or reduce project risk, subject to program requirements and project eligibility. Where a project qualifies, clean-energy tax credits may reduce investment costs or be monetized through eligible financing structures. Project debt is repaid under agreed terms; lenders assess resource performance, construction, operations, permits, and expected revenue. Developer and investor equity funds project costs while accepting risks lenders may not take. Confirm current requirements for each project.</p>
          <div class="cs-source-links">
            <a href="https://www.energy.gov/eere/geothermal/funding-opportunities" target="_blank" rel="noopener">DOE Geothermal Technologies Office funding opportunities</a>
            <a href="https://www.energy.gov/lpo/geothermal" target="_blank" rel="noopener">DOE Loan Programs Office: geothermal</a>
            <a href="https://www.irs.gov/credits-deductions/businesses/energy-investment-tax-credit" target="_blank" rel="noopener">IRS business energy investment tax credit</a>
            <a href="https://atb.nrel.gov/electricity/2024/" target="_blank" rel="noopener">NREL Annual Technology Baseline 2024</a>
          </div>
        </div>
      </div>

      <div class="cs-investor-page" id="cs-investor-details" data-investor-view hidden>
        <header class="cs-investor-page-hero">
          <p class="cs-eyebrow">EGS capital providers</p>
          <h2 tabindex="-1">Investor directory</h2>
          <p>Explore geothermal investors by capital-stack role, with company logos and source-linked details on their geothermal investments.</p>
        </header>
        <div class="cs-investor-pending" role="status" aria-live="polite">
          <div class="cs-investor-pending-mark" aria-hidden="true">10</div>
          <div>
            <p class="cs-eyebrow">Investor data pending</p>
            <h2>Profiles will appear here when the Currence data is added</h2>
            <p>The directory is set up for investor names, capital-stack categories, logos, and geothermal deal details. No ranking or investment information has been inferred.</p>
          </div>
        </div>
        <button class="cs-investor-back" type="button" data-back-to-stack>← Back to Capital Stack</button>
      </div>
    </div>
  `;

  const root = el.querySelector('.cs-stack');
  const workspace = root.querySelector('.cs-workspace');
  const researchPanel = root.querySelector('.cs-research');
  const investorPage = root.querySelector('[data-investor-view]');
  const investorOpen = root.querySelector('[data-open-investors]');
  const investorBack = root.querySelector('[data-back-to-stack]');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function citationMarkup(citation) {
    const url = escapeHtml(citation.url);
    return `<span class="cs-citation">(${escapeHtml(citation.author)}, ${escapeHtml(citation.year)}, <a href="${url}" target="_blank" rel="noopener">${url}</a>)</span>`;
  }

  function evidenceMarkup(items, emptyMessage) {
    if (!items.length) return `<div class="cs-gap">${escapeHtml(emptyMessage)}</div>`;
    return `<div class="cs-evidence-list">${items.map((item) => `
      <article class="cs-evidence">
        <p>${escapeHtml(item.text)}</p>
        ${item.citations.map(citationMarkup).join('')}
      </article>
    `).join('')}</div>`;
  }

  function economicsMarkup(layer) {
    const economics = layerEconomics[layer.id];
    return `
      <div class="cs-economics">
        <div class="cs-econ-grid">
          <div class="cs-econ-item">
            <span class="cs-econ-label">Debt / capital structure</span>
            <p>${escapeHtml(economics.debt)}</p>
          </div>
          <div class="cs-econ-item">
            <span class="cs-econ-label">Published return reference</span>
            <strong>${escapeHtml(economics.return)}</strong>
            <p>${escapeHtml(economics.returnNote)}</p>
            ${economics.returnCitation ? citationMarkup(economics.returnCitation) : ''}
          </div>
          <div class="cs-econ-item">
            <span class="cs-econ-label">Risk position</span>
            <p>${escapeHtml(economics.risk)}</p>
          </div>
        </div>
        <div class="cs-priorities">
          <span class="cs-econ-label">Investor priorities</span>
          <div class="cs-priority-list">${economics.priorities.map((item) => `<span class="cs-priority-chip">${escapeHtml(item)}</span>`).join('')}</div>
        </div>
        ${economics.flag ? `<div class="cs-econ-flag">${escapeHtml(economics.flag)}</div>` : ''}
      </div>
    `;
  }

  function renderResearch() {
    const layer = layers.find((item) => item.id === focusedId) || layers[0];
    let panelContent = '';
    let tabs = ['overview', 'evidence', 'sources'];

    if (researchTab === 'overview') {
      panelContent = `
        <div class="cs-research-section">
          ${economicsMarkup(layer)}
        </div>
        <div class="cs-research-section">
          <h4 class="cs-section-label">EGS-specific evidence</h4>
          ${evidenceMarkup(layer.evidence, layer.caveat)}
        </div>
        ${layer.grants ? `
          <div class="cs-research-section">
            <h4 class="cs-section-label">Grants within government subsidies</h4>
            <div class="cs-grant-info">
              <h4>What grants are</h4>
              <p>${escapeHtml(layer.grants.definition)}</p>
              <p>${escapeHtml(layer.grants.role)}</p>
              ${citationMarkup(layer.grants.citation)}
            </div>
            ${evidenceMarkup(layer.grants.evidence, 'No EGS grant examples are available in the cited sources.')}
            <div class="cs-caveat">${escapeHtml(layer.grants.caveat)}</div>
          </div>
        ` : ''}
      `;
    } else if (researchTab === 'evidence') {
      const evidence = layer.grants ? [...layer.evidence, ...layer.grants.evidence] : layer.evidence;
      panelContent = `
        <div class="cs-research-section">
          <h4 class="cs-section-label">Verified EGS examples</h4>
          ${evidenceMarkup(evidence, layer.caveat)}
          ${layer.grants ? `<div class="cs-caveat">${escapeHtml(layer.grants.caveat)}</div>` : ''}
        </div>
      `;
    } else {
      const citations = [
        ...[...layer.evidence, ...(layer.grants ? layer.grants.evidence : [])].flatMap((item) => item.citations),
        ...(layer.grants ? [layer.grants.citation] : []),
        ...(layerEconomics[layer.id].returnCitation ? [layerEconomics[layer.id].returnCitation] : []),
      ]
        .filter((citation, index, all) => all.findIndex((other) => other.url === citation.url) === index);
      panelContent = citations.length
        ? `<ul class="cs-sources">${citations.map((citation) => `
            <li>
              <span class="cs-source-name">${escapeHtml(citation.author)} (${escapeHtml(citation.year)})</span>
              <a class="cs-source-link" href="${escapeHtml(citation.url)}" target="_blank" rel="noopener">${escapeHtml(citation.url)}</a>
            </li>
          `).join('')}</ul>`
        : `<div class="cs-gap">${escapeHtml(layer.caveat)} This category has no transaction source to cite.</div>`;
    }

    researchPanel.innerHTML = `
      <header class="cs-profile-head">
        <div class="cs-profile-top">
          <div class="cs-profile-title">
            <span class="cs-abbrev" style="--layer-soft:${layer.soft};--layer-ink:${layer.ink};height:40px;width:40px;border-radius:10px">${escapeHtml(layer.short)}</span>
            <div><p class="cs-eyebrow">EGS capital profile</p><h3>${escapeHtml(layer.name)}</h3></div>
          </div>
        </div>
        <p class="cs-definition">${escapeHtml(layer.role)}</p>
        <div class="cs-research-tabs" role="tablist" aria-label="Capital source research">
          ${tabs.map((tab) => `<button class="cs-research-tab" id="cs-research-tab-${tab}" type="button" role="tab" data-research-tab="${tab}" aria-controls="cs-research-content" aria-selected="${researchTab === tab}">${tab === 'evidence' ? 'EGS evidence' : tab}</button>`).join('')}
        </div>
      </header>
      <div class="cs-research-body" id="cs-research-content" role="tabpanel" aria-labelledby="cs-research-tab-${researchTab}">${panelContent}</div>
    `;

    researchPanel.querySelectorAll('[data-research-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        researchTab = button.dataset.researchTab;
        renderResearch();
      });
    });
  }

  function renderFocus() {
    root.querySelectorAll('[data-layer]').forEach((button) => {
      const focused = button.dataset.layer === focusedId;
      const selected = button.dataset.layer === selectedId;
      if (button.classList.contains('cs-tower-layer')) {
        button.dataset.focused = String(focused);
        button.dataset.dimmed = String(focusedId !== selectedId && !focused);
      } else {
        button.dataset.focused = String(focused);
      }
      button.setAttribute('aria-pressed', String(selected));
    });
    renderResearch();
  }

  function setCapitalStackView(view) {
    const showInvestors = view === 'investors';
    root.dataset.view = showInvestors ? 'investors' : 'stack';
    investorPage.hidden = !showInvestors;
    investorOpen.setAttribute('aria-expanded', String(showInvestors));
  }

  function syncCapitalStackView() {
    const view = new URL(window.location.href).searchParams.get('view');
    setCapitalStackView(view === 'investors' ? 'investors' : 'stack');
  }

  investorOpen.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'investors');
    window.history.pushState({ capitalStackView: 'investors' }, '', url);
    setCapitalStackView('investors');
    investorPage.querySelector('header h2').focus();
  });

  investorBack.addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    window.history.pushState({ capitalStackView: 'stack' }, '', url);
    setCapitalStackView('stack');
    investorOpen.focus();
  });

  window.addEventListener('popstate', syncCapitalStackView);
  syncCapitalStackView();

  workspace.addEventListener('focusin', (event) => {
    const button = event.target.closest('[data-layer]');
    if (button && workspace.contains(button)) {
      focusedId = button.dataset.layer;
      renderFocus();
    }
  });

  workspace.addEventListener('click', (event) => {
    const button = event.target.closest('[data-layer]');
    if (button && workspace.contains(button)) {
      selectedId = button.dataset.layer;
      focusedId = selectedId;
      renderFocus();
      researchPanel.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  });

  root.querySelector('[data-export]').addEventListener('click', () => {
    const lines = [
      'EGS CAPITAL PROVIDER MAP — SOURCE-BOUND RESEARCH',
      'Categories are shown in the requested order; no allocation or repayment priority is implied.',
      '',
    ];
    sourceMetrics.forEach((metric) => {
      lines.push(`${metric.label}: ${metric.value} — ${metric.note}`, citationText(metric.citation));
    });
    lines.push('');
    layers.forEach((layer) => {
      lines.push(layer.name.toUpperCase(), layer.role);
      const economics = layerEconomics[layer.id];
      lines.push(
        `Debt / capital structure: ${economics.debt}`,
        `Published return reference: ${economics.return} — ${economics.returnNote}`,
        `Risk position: ${economics.risk}`,
        `Investor priorities: ${economics.priorities.join(', ')}`,
      );
      if (economics.returnCitation) lines.push(citationText(economics.returnCitation));
      if (economics.flag) lines.push(`Risk/return flag: ${economics.flag}`);
      const evidence = layer.grants ? [...layer.evidence, ...layer.grants.evidence] : layer.evidence;
      if (evidence.length) {
        evidence.forEach((item) => {
          lines.push(`- ${item.text}`, ...item.citations.map(citationText));
        });
      } else {
        lines.push(`Evidence gap: ${layer.caveat}`);
      }
      if (layer.grants) {
        lines.push(
          'GRANTS WITHIN GOVERNMENT SUBSIDIES',
          layer.grants.definition,
          layer.grants.role,
          citationText(layer.grants.citation),
          layer.grants.caveat,
        );
      }
      lines.push('');
    });
    lines.push(
      'FINAL INVESTMENT DECISION (FID)',
      'Project-stage gate after development and financing commitments and before construction; it is not a capital layer.',
      ...fidChecklist.map((item) => `- ${item}`),
      citationText(sources.bankFinancing),
    );

    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'egs-capital-provider-research.txt';
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  });

  function citationText(citation) {
    return `(${citation.author}, ${citation.year}, ${citation.url})`;
  }

  renderFocus();
};
