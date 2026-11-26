window.FinancialSections = window.FinancialSections || {};

window.FinancialSections.capitalStack = function (el) {
  const sources = {
    atb: {
      author: 'NLR',
      year: '2025',
      url: 'https://atb.nlr.gov/electricity/2025/geothermal',
    },
    fervoSeriesC: {
      author: 'Fervo Energy',
      year: '2024',
      url: 'https://fervoenergy.com/fervo-energy-raises-244-million-to-accelerate-deployment-of-next-generation-geothermal/',
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
    fervo2024Review: {
      author: 'Fervo Energy',
      year: '2025',
      url: 'https://fervoenergy.com/2024-year-in-review/',
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
      author: 'CFI Team',
      year: '2020',
      url: 'https://corporatefinanceinstitute.com/resources/commercial-lending/mezzanine-financing/',
    },
    bankRates: {
      author: 'Board of Governors of the Federal Reserve System',
      year: '2026',
      url: 'https://www.federalreserve.gov/releases/h15/',
    },
    dscr: {
      author: 'Fernando',
      year: '2026',
      url: 'https://www.investopedia.com/terms/d/dscr.asp',
    },
    fervoSeriesD: {
      author: 'Fervo Energy',
      year: '2024',
      url: 'https://fervoenergy.com/fervo-energy-secures-additional-255-million-funding/',
    },
    fervoJune2025: {
      author: 'Fervo Energy',
      year: '2025',
      url: 'https://fervoenergy.com/fervo-secures-new-financing-to-accelerate-development/',
    },
    irsCleanElectricityCredit: {
      author: 'Internal Revenue Service',
      year: '2024',
      url: 'https://www.irs.gov/credits-deductions/clean-electricity-investment-credit',
    },
    irsTaxLawUpdate: {
      author: 'Internal Revenue Service',
      year: '2026 (accessed Nov. 23)',
      url: 'https://www.irs.gov/newsroom/working-families-tax-cuts',
    },
  };

  const layers = [
    {
      id: 'pensions',
      short: 'P',
      name: 'Pensions',
      subtitle: 'Institutional long-term investment',
      color: 'var(--cobalt)',
      ink: '#ffffff',
      soft: '#eaf0fb',
      role: 'Pension funds pool employer and employee contributions and invest them to meet long-term benefit obligations; EGS exposure may be through equity, debt, or fund interests.',
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
      subtitle: 'Long-duration equity / private credit',
      color: 'var(--sky)',
      ink: 'var(--chathams)',
      soft: '#e9f7fc',
      role: 'Infrastructure funds invest in long-lived assets through ownership, private credit, or a combination of the two.',
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
      subtitle: 'Senior secured project debt',
      color: 'var(--cadet-light)',
      ink: 'var(--chathams)',
      soft: 'var(--cadet-light)',
      role: 'Commercial banks provide loans and credit facilities that are repaid under contractual terms and seniority.',
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
      subtitle: 'Subordinated debt / preferred equity',
      color: 'var(--accent)',
      ink: 'var(--chathams)',
      soft: '#fff7e6',
      role: 'Mezzanine finance is subordinated debt or hybrid capital below senior loans and above common equity in the capital structure.',
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
      subtitle: 'Growth / asset equity',
      color: 'var(--cobalt-dark)',
      ink: '#ffffff',
      soft: '#eaf0fb',
      role: 'Private-equity funds acquire or grow ownership stakes in private companies or assets, commonly through buyout or growth strategies.',
      evidence: [],
      caveat: 'No publicly disclosed EGS-specific private-equity transaction is cited here. This is a reporting gap, not evidence that private-equity investors do not participate.',
    },
    {
      id: 'venture-capital',
      short: 'VC',
      name: 'Venture capital',
      subtitle: 'Common / preferred equity',
      color: 'var(--chathams)',
      ink: '#ffffff',
      soft: '#e8edf7',
      role: 'Venture-capital funds invest equity in private, high-growth companies in exchange for ownership.',
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
      subtitle: 'Catalytic grants / impact capital',
      color: 'var(--cadet)',
      ink: 'var(--chathams)',
      soft: 'var(--cadet-light)',
      role: 'Foundations and donors provide mission-aligned grants or donations; financial return is not the objective.',
      evidence: [],
      caveat: 'No EGS-specific philanthropic project award or amount is included. Corporate investors and public grants are not reclassified as philanthropy.',
    },
    {
      id: 'government',
      short: 'GOV',
      name: 'Government subsidies',
      subtitle: 'Non-dilutive public funding',
      color: 'var(--cobalt)',
      ink: '#ffffff',
      soft: '#eaf0fb',
      role: 'Public agencies provide grants, subsidies, guarantees, loans, or tax incentives under program-specific rules.',
      evidence: [
        {
          text: 'DOE reported that Fervo received geothermal research funding and an EGS FORGE R&D award; the DOE announcement does not state the award amount.',
          citations: [sources.forgeAward],
        },
        {
          text: 'A separate $14 million Pennsylvania EGS project was selected for award negotiations. DOE states that selection is not a commitment to issue an award or provide funding, so it is not counted as a funded grant here.',
          status: 'actual',
          statusLabel: 'Actual / reported selection · not funded',
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
            text: 'Fervo reported selection for a $25 million DOE EGS Pilot award in April 2024; the source gives no day, and selection does not establish when funds were disbursed.',
            citations: [sources.fervo2024Review, sources.capeGrant, sources.egsPilot],
          },
          {
            text: 'DOE describes the EGS Pilot Demonstrations initiative as support for projects testing EGS in varied locations, geology, and subsurface conditions.',
            citations: [sources.egsPilot],
          },
          {
            text: 'Mazama Energy is a DOE EGS pilot participant. DOE lists a project in Oregon, but the $18 million figure reported in secondary commentary is not used here until the underlying award record is verified.',
            citations: [sources.egsPilot],
          },
        ],
        caveat: 'Awards are specific to their notices and projects; the examples do not establish a typical grant amount or a standard government share of project cost.',
      },
    },
  ];

  const sourceMetrics = [
    {
      label: 'Deep EGS overnight capital cost',
      value: '$7,416–26,194/kW',
      note: '2025 ATB minimum-to-maximum across listed resource-cost categories; not a project quote',
      status: 'modeled',
      citation: sources.atb,
    },
    {
      label: 'Near-field EGS overnight capital cost',
      value: '$4,001–60,166/kW',
      note: '2025 ATB minimum-to-maximum across listed temperature categories; highly site-specific',
      status: 'modeled',
      citation: sources.atb,
    },
    {
      label: 'Flow per production well',
      value: 'Conservative: 60 kg/s; Moderate: 60 flash / 90 binary; Advanced: 80 flash / 120 binary',
      note: '2025 ATB scenario assumptions for NF-EGS and Deep EGS',
      status: 'modeled',
      citation: sources.atb,
    },
    {
      label: 'Exploration well success assumptions',
      value: 'NF-EGS: 80% / 80% / 95%; Deep EGS: 60% / 60% / 95%',
      note: 'Conservative / Moderate / Advanced scenarios',
      status: 'modeled',
      citation: sources.atb,
    },
    {
      label: 'Development and stimulation success assumptions',
      value: 'NF-EGS: 82% / 85% / 95%; Deep EGS: 80% / 85% / 95%',
      note: 'Conservative / Moderate / Advanced; same rates for development and stimulation',
      status: 'modeled',
      citation: sources.atb,
    },
  ];

  let investorProfiles = [];

  const layerEconomics = {
    pensions: {
      projectRole: {
        text: 'Can provide long-duration risk capital for company growth or project equity before and alongside construction debt.',
        citations: [sources.fervoSeriesE],
      },
      typicalCost: {
        text: 'No standard EGS funding cost or disclosed pension commitment. The cited $462 million is Fervo’s company-level round, not an individual pension investment.',
        citations: [sources.fervoSeriesE],
      },
      repaymentPriority: {
        text: 'Depends on the instrument and share class. Equity claims are paid after creditors; the cited investor terms were not disclosed.',
        citations: [sources.fervoSeriesE],
      },
      derisking: {
        text: 'Long-horizon equity can absorb development risk ahead of project debt. Fervo’s round supports Cape Station and other projects, but its project-level allocation is not public.',
        citations: [sources.fervoSeriesE],
      },
      return: 'No source-published EGS pension target range',
      returnNote: 'Pension plan assumptions and portfolio targets are not an EGS project return hurdle; no range was disclosed for the cited participation.',
      returnStatus: 'undisclosed',
      returnStatusLabel: 'No EGS target disclosed',
      returnCitation: sources.fervoSeriesE,
      risk: 'Varies by instrument: senior debt, private credit, preferred equity or common equity',
      priorities: ['Long-duration fit', 'Contracted revenue', 'Risk-adjusted returns'],
    },
    infrastructure: {
      projectRole: {
        text: 'Long-duration equity or private credit can fund project development and construction, often alongside senior debt.',
        citations: [sources.eig],
      },
      typicalCost: {
        text: 'EIG did not disclose its Star Peak investment amount, instrument, or pricing; no EGS check-size or cost benchmark is inferred.',
        citations: [sources.eig],
      },
      repaymentPriority: {
        text: 'The Star Peak investment structure is undisclosed. Debt priority follows its loan terms; equity distributions are residual after creditors.',
        citations: [sources.eig],
      },
      derisking: {
        text: 'EIG says its investment supports the Star Peak EGS project and Power Planet’s EGS portfolio; the amount and specific risks addressed were not disclosed.',
        citations: [sources.eig],
      },
      return: 'No source-published EGS infrastructure target range',
      returnNote: 'Infrastructure returns vary by fund strategy and instrument; no EGS-specific target was disclosed for the cited investment.',
      returnStatus: 'undisclosed',
      returnStatusLabel: 'No EGS target disclosed',
      returnCitation: sources.eig,
      risk: 'Varies by instrument and project stage',
      priorities: ['Construction readiness', 'Contracted revenue', 'Long-life cash flow'],
    },
    banks: {
      projectRole: {
        text: 'Senior loans and credit facilities can finance construction, bridge funding needs, and support project credit requirements.',
        citations: [sources.bankFinancing],
      },
      typicalCost: {
        text: 'Cape Station disclosed a $421 million Phase I financing package; its loan pricing and fees were not disclosed. The package amount is not a typical borrowing cost.',
        citations: [sources.bankFinancing],
      },
      repaymentPriority: {
        text: 'Senior secured project debt is repaid ahead of subordinated debt and equity; actual security and cash-flow priority are set by the financing documents.',
        citations: [sources.bankFinancing],
      },
      derisking: {
        text: 'Non-recourse financing shows lenders accepted Cape Station Phase I project risk after commercial and technical diligence; it does not eliminate remaining construction or reservoir risk.',
        citations: [sources.bankFinancing],
      },
      return: 'No EGS debt pricing or lender target disclosed',
      returnNote: 'Cape Station loan rates, fees, and lender return targets were not disclosed; no bank return range is inferred.',
      returnStatus: 'undisclosed',
      returnStatusLabel: 'Project terms not disclosed',
      returnCitation: sources.bankFinancing,
      risk: 'Senior repayment priority; still exposed to construction and performance risk',
      priorities: ['Debt-service coverage (DSCR)', 'Offtaker credit', 'Permits and completion'],
      priorityNote: 'DSCR compares cash available for debt service with required principal and interest payments. This is a general financing metric, not an EGS-specific underwriting threshold.',
      priorityCitation: sources.dscr,
      flag: 'Order caveat: senior bank debt is usually repaid ahead of equity but appears after infrastructure equity in the requested display order. The stack is not a rising risk or return scale.',
    },
    mezzanine: {
      projectRole: {
        text: 'Subordinated debt or hybrid capital can fill a funding gap between senior loans and equity without requiring all capital to be common equity.',
      },
      typicalCost: {
        text: 'No EGS mezzanine pricing was disclosed; the generic 12–20% benchmark below is not an EGS borrowing quote.',
        citations: [sources.mezzanineReturns],
      },
      repaymentPriority: {
        text: 'Typically junior to senior debt and ahead of common equity; exact priority, fees, and any equity participation are contractual.',
        citations: [sources.mezzanineReturns],
      },
      derisking: {
        text: 'Subordination can provide senior lenders with a junior capital cushion and help close financing gaps; no EGS transaction explicitly labeled mezzanine was verified.',
      },
      return: '12–20% investor return range',
      returnNote: 'Generic mezzanine benchmark, not geothermal-specific and not a disclosed EGS deal term.',
      returnStatus: 'target',
      returnStatusLabel: 'General market benchmark',
      returnCitation: sources.mezzanineReturns,
      risk: 'Higher risk than senior secured debt',
      priorities: ['Downside protection', 'Coupon and PIK terms', 'Refinancing or exit'],
    },
    'private-equity': {
      projectRole: {
        text: 'Growth or buyout equity can fund ownership changes, expansion, or asset development; any acquisition debt is separate from the equity.',
      },
      typicalCost: {
        text: 'No EGS-specific private-equity deal, investment amount, or pricing was verified; check size and leverage vary by transaction.',
      },
      repaymentPriority: {
        text: 'Equity is residual after debt and any contractual preferred claims; buyout debt is repaid ahead of equity.',
      },
      derisking: {
        text: 'Equity can absorb first losses and fund expansion before or alongside senior debt, but no EGS transaction classified as private equity was verified here.',
      },
      return: 'No source-published EGS private-equity target range',
      returnNote: 'No EGS private-equity deal or target was verified; general private-market figures are not substituted for geothermal terms.',
      returnStatus: 'undisclosed',
      returnStatusLabel: 'No EGS target disclosed',
      risk: 'High; equity bears losses before creditors',
      priorities: ['Control and governance', 'Value creation', 'Exit path'],
    },
    'venture-capital': {
      projectRole: {
        text: 'Common or preferred equity can fund company growth, technology development, and milestones before projects are ready for non-recourse debt.',
        citations: [sources.fervoSeriesE],
      },
      typicalCost: {
        text: 'Fervo’s $462 million Series E is a company-level round, not a typical project cost; investor-specific amounts and pricing were not disclosed.',
        citations: [sources.fervoSeriesE],
      },
      repaymentPriority: {
        text: 'Equity has no scheduled debt repayment. Any preferred-stock liquidation priority depends on negotiated terms, which were not disclosed for the cited investors.',
        citations: [sources.fervoSeriesE],
      },
      derisking: {
        text: 'Risk-bearing company equity can fund technology and development milestones ahead of project finance; the cited round’s Cape Station allocation was not disclosed.',
        citations: [sources.fervoSeriesE],
      },
      return: 'No source-published EGS or Fervo target range',
      returnNote: 'Fund-level VC performance is not a universal target or a disclosed return for Fervo’s investors.',
      returnStatus: 'undisclosed',
      returnStatusLabel: 'No target disclosed',
      returnCitation: sources.fervoSeriesE,
      risk: 'Very high; early-stage equity can lose all invested capital',
      priorities: ['Technical milestones', 'Market scale', 'Follow-on and exit potential'],
    },
    philanthropy: {
      projectRole: {
        text: 'Mission-aligned grants or donations can support public-benefit research and early work that may not yet attract commercial capital.',
      },
      typicalCost: {
        text: 'No direct philanthropic EGS award or amount was verified; there is no standard commercial cost of capital for a donation.',
      },
      repaymentPriority: {
        text: 'Grants and donations generally have no investor repayment priority; use restrictions and any recovery conditions depend on the award.',
      },
      derisking: {
        text: 'Could support early research or public-benefit work that informs EGS development, but no direct EGS philanthropic deal was verified to show a project-level effect.',
      },
      return: 'No commercial investor return target',
      returnNote: 'Philanthropic capital targets mission or public benefit, not a financial yield.',
      returnStatus: 'not-applicable',
      returnStatusLabel: 'Not applicable',
      risk: 'Not comparable to commercial investment risk',
      priorities: ['Measurable impact', 'Additionality', 'Public benefit'],
    },
    government: {
      projectRole: {
        text: 'Public grants and subsidies can fund eligible EGS work; tax incentives and government-backed loans are separate instruments with their own rules.',
        citations: [sources.egsPilot],
      },
      typicalCost: {
        text: 'No standard award size. Fervo reported selection for a $25 million EGS Pilot award in April 2024 and approximately $20 million in DOE awards in 2026; these are project-specific, and selection is not disbursement.',
        citations: [sources.fervo2024Review, sources.capeGrant, sources.fervoGrants],
      },
      repaymentPriority: {
        text: 'Compliant grants are generally non-dilutive and do not have debt repayment priority; government loans and tax-credit bridge debt are repayable under separate terms.',
        citations: [sources.bankFinancing],
      },
      derisking: {
        text: 'DOE EGS awards support drilling, well completion, resource appraisal, and demonstrations—work that can reduce technical and subsurface uncertainty before commercial finance.',
        citations: [sources.egsPilot, sources.fervoGrants],
      },
      return: 'No private investor return target for grants',
      returnNote: 'Grants target program outcomes, not a financial yield. Any loan or bridge facility is a separate repayable instrument.',
      returnStatus: 'not-applicable',
      returnStatusLabel: 'Not applicable to grants',
      returnCitation: sources.egsPilot,
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

  const fidFinancingMilestones = [
    {
      date: '2024-02-29',
      dateLabel: 'Feb. 29, 2024',
      title: '$244M company financing',
      detail: 'Fervo said the funding would support continued operations at Cape Station; drilling there had begun.',
      citations: [sources.fervoSeriesC],
    },
    {
      date: '2024-04',
      datePrecision: 'month',
      dateLabel: 'April 2024 · day not disclosed',
      title: '$25M DOE EGS Pilot award selected',
      detail: 'Fervo reported selection for the Cape Station EGS award; the source gives only the month, not the award or disbursement day.',
      citations: [sources.fervo2024Review, sources.capeGrant, sources.egsPilot],
    },
    {
      date: '2024-09-10',
      dateLabel: 'Sept. 10, 2024',
      title: '$100M Cape Station bridge loan',
      detail: 'X-Caliber affiliate XRA closed a bridge loan for Phase I development costs.',
      citations: [sources.capeGrant],
    },
    {
      date: '2024-12-19',
      dateLabel: 'Dec. 19, 2024',
      title: '$255M in funding and capital availability',
      detail: 'Included $135M corporate equity and a $120M Mercuria letter-of-credit and term-loan facility.',
      citations: [sources.fervoSeriesD],
    },
    {
      date: '2025-06-11',
      dateLabel: 'June 11, 2025',
      title: '$206M additional capital; Phase I fully funded',
      detail: 'Included project-level preferred equity, an expanded corporate loan, and additional bridge debt; Fervo said construction was underway.',
      citations: [sources.fervoJune2025],
    },
    {
      date: '2025-12-10',
      dateLabel: 'Dec. 10, 2025',
      title: '$462M Series E',
      detail: 'Company-level equity to support Cape Station’s buildout and early development of other projects.',
      citations: [sources.fervoSeriesE],
    },
    {
      date: '2026-03-19',
      dateLabel: 'Mar. 19, 2026',
      title: '$421M non-recourse project financing',
      detail: 'Cape Station Phase I financial close, including construction-to-term debt and a tax-credit bridge facility.',
      citations: [sources.bankFinancing],
    },
  ];

  const statusLabels = {
    actual: 'Actual / reported',
    target: 'Target',
    modeled: 'Modeled forecast',
    undisclosed: 'Not disclosed',
    'not-applicable': 'Not applicable',
  };

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
        align-items: start;
        display: grid;
        gap: 1.25rem;
        grid-template-columns: minmax(245px, 280px) minmax(0, 1fr);
      }
      .cs-tower-column {
        align-content: start;
        display: grid;
        gap: 1.25rem;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 390px);
        min-width: 0;
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
      .cs-metrics-note { color: var(--cs-muted); font-size: .58rem; line-height: 1.5; margin: .6rem 0 0; }
      .cs-citation { color: var(--cs-muted); display: block; font-size: .55rem; line-height: 1.5; margin-top: .35rem; overflow-wrap: anywhere; }
      .cs-citation a, .cs-source-link { color: var(--cobalt); }
      .cs-investor-count { background: var(--accent); border-radius: 999px; color: var(--chathams); flex: 0 0 auto; font-size: .52rem; font-weight: 700; padding: .25rem .45rem; }
      .cs-investor-page { color: var(--chathams); grid-column: 1 / -1; grid-row: 2; margin: 0; max-width: none; min-width: 0; }
      .cs-investor-page-hero { background: linear-gradient(120deg, var(--chathams), var(--cobalt)); border-radius: 16px; color: #fff; padding: clamp(1.25rem, 3vw, 2.25rem); }
      .cs-investor-page-hero .cs-eyebrow { color: var(--cadet-light); }
      .cs-investor-page-hero h2 { color: #fff; font: 700 clamp(1.5rem, 3vw, 2.1rem)/1.2 var(--font-display); margin: .4rem 0 0; }
      .cs-investor-page-hero p:last-child { color: var(--cadet-light); font-size: .88rem; line-height: 1.6; margin: .55rem 0 0; max-width: 850px; }
      .cs-investor-page-title { align-items: center; display: flex; flex-wrap: wrap; gap: .55rem; justify-content: space-between; }
      .cs-investor-page-title h2 { margin-top: .4rem; }
      .cs-investor-controls { align-items: end; background: var(--cs-surface); border: 1px solid var(--cs-border); border-radius: 12px; display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1rem; padding: .85rem; }
      .cs-investor-filter { color: var(--chathams); display: grid; font-size: .61rem; font-weight: 700; gap: .3rem; min-width: 180px; }
      .cs-investor-filter select { background: #fff; border: 1px solid var(--cadet-light); border-radius: 7px; color: var(--chathams); font: 500 .68rem var(--font-body); min-height: 38px; padding: .45rem .6rem; }
      .cs-investor-result-count { color: var(--cs-muted); font-size: .64rem; margin: 0 0 .55rem auto; }
      .cs-investor-caveat { margin-top: .85rem; }
      .cs-investor-grid { display: grid; gap: .5rem; grid-template-columns: minmax(0, 1fr); margin-top: .9rem; max-height: 34rem; overflow-y: auto; overscroll-behavior: contain; padding-right: .25rem; }
      .cs-investor-profile { background: #fff; border: 1px solid var(--cadet-light); border-radius: 12px; min-width: 0; overflow: hidden; }
      .cs-investor-profile[hidden] { display: none; }
      .cs-investor-profile summary { align-items: center; cursor: pointer; display: grid; gap: .65rem; grid-template-columns: 40px minmax(0, 1fr) auto; list-style: none; padding: .75rem; }
      .cs-investor-profile summary::-webkit-details-marker { display: none; }
      .cs-investor-monogram { align-items: center; background: var(--chathams); border-radius: 9px; color: #fff; display: flex; font: 700 .65rem var(--font-body); height: 40px; justify-content: center; width: 40px; }
      .cs-investor-name { color: var(--chathams); display: block; font-size: .76rem; font-weight: 700; line-height: 1.25; }
      .cs-investor-category { color: var(--cobalt); display: block; font-size: .55rem; font-weight: 700; margin-top: .15rem; }
      .cs-investor-layer-tags { display: flex; flex-wrap: wrap; gap: .25rem; grid-column: 2 / -1; }
      .cs-investor-layer-tag { background: var(--card); border-radius: 999px; color: var(--chathams); font-size: .5rem; font-weight: 700; padding: .25rem .4rem; }
      .cs-investor-chevron { color: var(--cobalt); font-size: 1rem; transition: transform .16s ease; }
      .cs-investor-profile[open] .cs-investor-chevron { transform: rotate(90deg); }
      .cs-investor-profile[open] { border-color: var(--cobalt); box-shadow: 0 8px 20px rgba(21,49,113,.08); }
      .cs-investor-profile-body { border-top: 1px solid var(--cs-border); padding: .75rem; }
      .cs-investor-profile-body h3 { color: var(--chathams); font-size: .64rem; margin: 0 0 .35rem; }
      .cs-investor-profile-body p { color: var(--cs-muted); font-size: .61rem; line-height: 1.55; margin: .3rem 0; }
      .cs-investor-investment { background: var(--card); border-left: 2px solid var(--sky); margin-top: .5rem; padding: .55rem .65rem; }
      .cs-investor-scope { color: var(--muted); font-size: .56rem; font-weight: 700; margin-top: .35rem; }
      .cs-investor-metrics { display: grid; gap: .6rem; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: .65rem; }
      .cs-investor-metrics > div { background: #f8fafc; border-radius: 8px; padding: .55rem; }
      .cs-investor-metrics dt { color: var(--muted); font-size: .52rem; font-weight: 700; text-transform: uppercase; }
      .cs-investor-metrics dd { color: var(--cs-muted); font-size: .59rem; line-height: 1.5; margin: .25rem 0 0; }
      .cs-investor-load-error { background: #fff7e6; border-radius: 8px; color: var(--chathams); font-size: .68rem; grid-column: 1 / -1; line-height: 1.55; margin: 0; padding: .8rem; }
      .cs-transition { background: var(--card); border: 1px solid var(--cadet-light); border-radius: 12px; display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 1.25rem 0 0; padding: 1rem; }
      .cs-transition article { border-left: 2px solid var(--accent); padding-left: .65rem; }
      .cs-transition h3 { color: var(--chathams); font-size: .7rem; margin: 0; }
      .cs-transition p { color: var(--muted); font-size: .61rem; line-height: 1.55; margin: .35rem 0 0; }
      .cs-fid { margin-top: 1.25rem; }
      .cs-fid h3 { color: var(--chathams); font: 600 1.1rem/1.3 var(--font-body); letter-spacing: -.02em; margin: .3rem 0 0; }
      .cs-fid-intro { color: var(--cs-muted); font-size: .66rem; line-height: 1.55; margin: .45rem 0 0; max-width: 850px; }
      .cs-fid-track { display: grid; gap: .4rem; grid-template-columns: repeat(5, minmax(0, 1fr)); margin-top: .9rem; }
      .cs-fid-step { background: var(--card); border: 1px solid var(--cs-border); border-radius: 8px; color: var(--chathams); font-size: .62rem; font-weight: 700; line-height: 1.4; padding: .55rem; }
      .cs-fid-step[data-gate="true"] { background: var(--accent); border-color: var(--accent); }
      .cs-fid-step small { color: var(--cs-muted); display: block; font-size: .53rem; font-weight: 500; margin-top: .2rem; }
      .cs-fid-timeline { border-top: 1px solid var(--cs-border); margin-top: 1rem; padding-top: .85rem; }
      .cs-fid-timeline-head { align-items: flex-end; display: flex; flex-wrap: wrap; gap: .35rem 1rem; justify-content: space-between; }
      .cs-fid-timeline-head h4 { color: var(--chathams); font-size: .75rem; margin: 0; }
      .cs-fid-timeline-head p { color: var(--cs-muted); font-size: .56rem; line-height: 1.45; margin: 0; max-width: 540px; }
      .cs-fid-timeline-events { display: grid; gap: .55rem; grid-auto-columns: minmax(205px, 1fr); grid-auto-flow: column; margin-top: .65rem; overflow-x: auto; padding: .15rem .1rem .5rem; position: relative; scroll-snap-type: x mandatory; }
      .cs-fid-timeline-events::before { border-top: 2px solid var(--cadet-light); content: ""; left: .65rem; position: absolute; right: .65rem; top: .68rem; }
      .cs-fid-milestone { background: var(--card); border: 1px solid var(--cs-border); border-radius: 8px; min-width: 0; padding: .9rem .65rem .65rem; position: relative; scroll-snap-align: start; }
      .cs-fid-milestone::before { background: var(--sky); border: 2px solid var(--card); border-radius: 50%; content: ""; height: .55rem; left: .65rem; position: absolute; top: .39rem; width: .55rem; z-index: 1; }
      .cs-fid-milestone time { color: var(--cobalt); display: block; font-size: .57rem; font-weight: 700; }
      .cs-fid-milestone h5 { color: var(--chathams); font-size: .64rem; line-height: 1.35; margin: .3rem 0 0; }
      .cs-fid-milestone p { color: var(--cs-muted); font-size: .56rem; line-height: 1.45; margin: .3rem 0 0; }
      .cs-fid-milestone .cs-fid-elapsed { border-top: 1px solid var(--cs-border); color: var(--chathams); font-weight: 700; margin-top: .55rem; padding-top: .4rem; }
      .cs-fid-undated { background: rgba(255,222,141,.13); border-left: 3px solid var(--accent); border-radius: 0 7px 7px 0; margin-top: .65rem; padding: .6rem .75rem; }
      .cs-fid-undated strong { color: var(--chathams); display: block; font-size: .65rem; }
      .cs-fid-undated p { color: var(--cs-muted); font-size: .58rem; line-height: 1.5; margin: .25rem 0 0; }
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
      .cs-layer-nav:focus-visible, .cs-tower-layer:focus-visible, .cs-research-tab:focus-visible, .cs-export:focus-visible, .cs-source-link:focus-visible, .cs-investor-filter select:focus-visible, .cs-investor-profile summary:focus-visible {
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
        box-shadow: 0 16px 40px rgba(0, 0, 0, .18);
        color: #fff;
        min-height: 0;
        overflow: hidden;
        padding: 1.4rem;
        position: relative;
        align-self: start;
        grid-column: 1;
        grid-row: 1;
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
      .cs-tower-inner { display: flex; flex-direction: column; min-height: 0; position: relative; }
      .cs-tower-head { align-items: flex-start; display: flex; justify-content: space-between; gap: 1rem; }
      .cs-tower-kicker { color: #fff; font-size: .6rem; font-weight: 700; letter-spacing: .13em; margin: 0; text-transform: uppercase; }
      .cs-tower-kicker span { color: #fff; font-size: .85rem; margin-right: .25rem; }
      .cs-tower-head h3 { color: #fff; font: 600 1.45rem/1.2 var(--font-body); letter-spacing: -.035em; margin: .5rem 0 0; }
      .cs-tower-help { color: #fff; font-size: .58rem; line-height: 1.5; margin: 0; max-width: 155px; text-align: right; }
      .cs-tower-main { align-items: center; display: flex; justify-content: center; margin: 1.5rem 0 1rem; min-height: 360px; }
      .cs-tower-stack {
        display: flex;
        flex-direction: column;
        height: 360px;
        max-width: 420px;
        min-height: 360px;
        perspective: 900px;
        position: relative;
        width: 100%;
      }
      .cs-tower-stack::before {
        background: linear-gradient(to top, #777a7d, #fff);
        content: "";
        height: 29px;
        left: 50%;
        position: absolute;
        top: -28px;
        width: 3px;
        z-index: 0;
      }
      .cs-tower-stack::after {
        background: linear-gradient(90deg, #777a7d, #fff, #777a7d);
        bottom: -8px;
        content: "";
        height: 8px;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 108%;
        z-index: 0;
      }
      .cs-tower-layer {
        align-items: center;
        background: var(--layer-color);
        border: 0;
        border-top: 1px solid rgba(0,0,0,.16);
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
        z-index: 1;
        align-self: center;
      }
      .cs-tower-layer:nth-child(1) { background: #666; color: #fff; width: 56%; }
      .cs-tower-layer:nth-child(2) { background: #606060; color: #fff; width: 62%; }
      .cs-tower-layer:nth-child(3) { background: #5a5a5a; color: #fff; width: 68%; }
      .cs-tower-layer:nth-child(4) { background: #545454; color: #fff; width: 74%; }
      .cs-tower-layer:nth-child(5) { background: #4e4e4e; color: #fff; width: 80%; }
      .cs-tower-layer:nth-child(6) { background: #484848; color: #fff; width: 86%; }
      .cs-tower-layer:nth-child(7) { background: #424242; color: #fff; width: 93%; }
      .cs-tower-layer:nth-child(8) { background: #3c3c3c; color: #fff; width: 100%; }
      .cs-tower-layer:nth-child(1)::after { background: #666; }
      .cs-tower-layer:nth-child(2)::after { background: #606060; }
      .cs-tower-layer:nth-child(3)::after { background: #5a5a5a; }
      .cs-tower-layer:nth-child(4)::after { background: #545454; }
      .cs-tower-layer:nth-child(5)::after { background: #4e4e4e; }
      .cs-tower-layer:nth-child(6)::after { background: #484848; }
      .cs-tower-layer:nth-child(7)::after { background: #424242; }
      .cs-tower-layer:nth-child(8)::after { background: #3c3c3c; }
      .cs-tower-layer .cs-abbrev { background: #292929; color: #fff; }
      .cs-tower-layer:focus-visible { outline-color: #e5e5e5; }
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
      .cs-tower-layer:hover, .cs-tower-layer[data-focused="true"] { box-shadow: 12px 14px 30px rgba(0,0,0,.3); transform: translateX(-8px); z-index: 3; }
      .cs-tower-layer[data-dimmed="true"] { filter: grayscale(1); opacity: .23; }
      .cs-tower-label { display: block; min-width: 0; position: relative; z-index: 1; }
      .cs-tower-name { display: block; font-size: .69rem; font-weight: 700; line-height: 1.2; }
      .cs-fid-marker {
        align-items: center;
        background: rgba(255,255,255,.08);
        border-bottom: 1px dashed #bfc1c2;
        border-top: 1px dashed #bfc1c2;
        color: #fff;
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
        background: #292929;
        border: 1px solid #777;
        border-radius: 5px;
        color: #fff;
        display: block;
        font-size: .53rem;
        font-weight: 700;
        margin-top: .25rem;
        padding: .1rem .35rem;
        position: relative;
        z-index: 1;
      }
      .cs-tower-footer { border-top: 1px solid rgba(255,255,255,.15); color: #fff; font-size: .57rem; font-weight: 600; line-height: 1.5; padding-top: .65rem; }
      .cs-research { display: flex; flex-direction: column; grid-column: 2; grid-row: 1; min-height: 0; overflow: hidden; padding: 0; }
      .cs-profile-head { border-bottom: 1px solid var(--cs-border); padding: 1.25rem; }
      .cs-profile-top { align-items: flex-start; display: flex; gap: .75rem; justify-content: space-between; }
      .cs-profile-title { align-items: center; display: flex; gap: .7rem; }
      .cs-profile-title h3 { color: var(--chathams); font-size: 1rem; letter-spacing: -.025em; margin: .1rem 0 0; }
      .cs-definition { color: var(--cs-muted); font-size: .7rem; line-height: 1.65; margin: .8rem 0 0; }
      .cs-research-tabs { background: var(--card); border-radius: 8px; display: grid; gap: 3px; grid-template-columns: repeat(3, 1fr); margin-top: .85rem; padding: 3px; }
      .cs-research-tab { background: transparent; border: 0; border-radius: 6px; color: var(--muted); cursor: pointer; font: 600 .65rem var(--font-body); padding: .45rem .25rem; }
      .cs-research-tab[aria-selected="true"] { background: #fff; box-shadow: 0 1px 3px rgba(21,49,113,.1); color: var(--cobalt); }
      .cs-research-body { flex: 1; max-height: none; min-height: 0; overflow-y: auto; padding: 1.25rem; }
      .cs-research-section + .cs-research-section { margin-top: 1.1rem; }
      .cs-copy { color: var(--cs-muted); font-size: .67rem; line-height: 1.6; margin: .45rem 0 0; }
      .cs-economics { display: grid; gap: .45rem; margin-top: .8rem; }
      .cs-econ-grid { display: grid; gap: .4rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .cs-econ-item { background: var(--card); border: 1px solid var(--cs-border); border-radius: 8px; min-width: 0; padding: .55rem; }
      .cs-econ-item.cs-return-item { grid-column: 1 / -1; }
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
      .cs-data-status { background: var(--cadet-light); border: 1px solid var(--cs-border); border-radius: 999px; color: var(--chathams); display: inline-flex; font-size: .48rem; font-weight: 700; letter-spacing: .04em; margin-bottom: .35rem; padding: .14rem .4rem; text-transform: uppercase; }
      .cs-data-status[data-status="target"] { background: var(--sky); }
      .cs-data-status[data-status="modeled"] { background: var(--accent); }
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
        .cs-tower-column { grid-template-columns: minmax(0, 1fr); }
        .cs-tower { grid-column: 1; grid-row: 1; }
        .cs-research { grid-column: 1; grid-row: 2; }
        .cs-investor-page { grid-column: 1; grid-row: 3; }
        .cs-research-body { max-height: none; }
        .cs-below-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 760px) {
        .cs-workspace { grid-template-columns: minmax(0, 1fr); }
        .cs-research { grid-column: auto; }
        .cs-tower { padding: 1rem; }
        .cs-tower-main, .cs-tower-stack { min-height: 340px; }
        .cs-tower-stack { height: 340px; }
        .cs-tower-layer { padding: .35rem .55rem; }
        .cs-tower-name { font-size: .65rem; }
        .cs-below-grid { grid-template-columns: minmax(0, 1fr); }
        .cs-stages, .cs-glossary { grid-template-columns: minmax(0, 1fr); }
        .cs-below-head { align-items: flex-start; flex-direction: column; }
        .cs-intro-row { align-items: flex-start; }
        .cs-fid-track { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .cs-fid-details, .cs-fid-checklist { grid-template-columns: minmax(0, 1fr); }
        .cs-investor-controls { align-items: stretch; flex-direction: column; }
        .cs-investor-result-count { margin: 0; }
        .cs-transition { grid-template-columns: minmax(0, 1fr); }
      }
      @media (max-width: 420px) {
        .cs-tower-help { display: none; }
        .cs-tower-name { font-size: .62rem; }
        .cs-grant-sublayer { font-size: .45rem; }
        .cs-econ-grid { grid-template-columns: minmax(0, 1fr); }
      }
      @media (prefers-reduced-motion: reduce) {
        .cs-stack *, .cs-stack *::before, .cs-stack *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
      }
    </style>
    <div class="cs-stack">
      <header class="cs-intro">
        <div class="cs-breadcrumb">EGS project finance <span aria-hidden="true">›</span> Capital profiles</div>
        <div class="cs-intro-row">
          <div>
            <h2>Who funds EGS?</h2>
            <p>Capital channels for enhanced geothermal systems</p>
          </div>
          <button class="cs-export" type="button" data-export disabled><span aria-hidden="true">↓</span> Export research</button>
        </div>
      </header>

      <div class="cs-workspace">
        <aside class="cs-card">
          <div class="cs-card-heading">
            <div><h3>EGS resource and cost drivers</h3></div>
            <span class="cs-pill">NLR 2025 ATB</span>
          </div>
          <div class="cs-metrics" aria-label="EGS cost metrics">
            ${sourceMetrics.map((metric) => `
              <article class="cs-metric">
                ${statusMarkup(metric.status)}
                <h4>${escapeHtml(metric.label)}</h4>
                <strong>${escapeHtml(metric.value)}</strong>
                <p>${escapeHtml(metric.note)}</p>
                ${citationMarkup(metric.citation)}
              </article>
            `).join('')}
          </div>
          <p class="cs-metrics-note">ATB cost ranges are modeled resource estimates, not project quotes. Near-term EGS costs combine recent commercial drilling and completion costs with modeled improvements; future costs are projections.</p>
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

        <div class="cs-tower-column">
          <div class="cs-tower" role="region" aria-labelledby="cs-tower-title">
            <div class="cs-tower-inner">
              <header class="cs-tower-head">
                <div><p class="cs-tower-kicker"><span aria-hidden="true">✦</span> EGS funding channels</p><h3 id="cs-tower-title">Funding tower</h3></div>
                <p class="cs-tower-help">Hover or select a floor to open its EGS details.</p>
              </header>
              <div class="cs-fid-marker" role="note"><strong>FID gate</strong><span>Project-stage checkpoint · separate from provider order</span></div>
              <div class="cs-tower-main">
                <div class="cs-tower-stack" role="group" aria-label="Capital provider categories in the requested display order">
                  ${layers.map((layer) => `
                    <button class="cs-tower-layer" type="button" data-layer="${layer.id}" data-focused="false" data-dimmed="false" aria-pressed="false" style="--layer-color:${layer.color};--layer-ink:${layer.ink}">
                      <span class="cs-tower-label">
                        <span class="cs-tower-name">${escapeHtml(layer.name)}</span>
                        ${layer.grants ? '<span class="cs-grant-sublayer">Grants · EGS research, drilling &amp; demonstration</span>' : ''}
                      </span>
                      <span class="cs-abbrev" style="--layer-soft:${layer.soft};--layer-ink:${layer.ink}">${escapeHtml(layer.short)}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
              <footer class="cs-tower-footer">Requested provider order—not a risk ranking or funding waterfall. FID is a project gate, not a capital source.</footer>
            </div>
          </div>

          <aside class="cs-card cs-research" aria-label="EGS capital source details" aria-live="polite"></aside>

          <div class="cs-investor-page" id="cs-investor-details" data-investor-view role="region" aria-labelledby="cs-investor-title">
            <header class="cs-investor-page-hero">
              <p class="cs-eyebrow">EGS capital providers</p>
              <div class="cs-investor-page-title">
                <h2 id="cs-investor-title">Investor directory</h2>
                <span class="cs-investor-count" data-investor-profile-count>Loading...</span>
              </div>
              <p>Publicly named financing participants across EGS developers and adjacent geothermal technologies. Profiles are representative examples, not a ranking or a complete transaction ledger.</p>
            </header>
            <div class="cs-investor-controls" aria-label="Filter investors">
              <label class="cs-investor-filter" for="cs-filter-layer">Filter by capital layer
                <select id="cs-filter-layer" data-investor-layer-filter>
                  <option value="">All capital layers</option>
                  ${layers.map((layer) => `<option value="${escapeHtml(layer.id)}">${escapeHtml(layer.name)}</option>`).join('')}
                </select>
              </label>
              <label class="cs-investor-filter" for="cs-filter-type">Filter by investor type
                <select id="cs-filter-type" data-investor-type-filter>
                  <option value="">All investor types</option>
                </select>
              </label>
              <p class="cs-investor-result-count" data-investor-result-count role="status" aria-live="polite"></p>
            </div>
            <p class="cs-caveat cs-investor-caveat">EGS-specific evidence is distinguished from broader geothermal: Zanskar’s cited deals concern geothermal discovery and development but are not identified as EGS; Quaise is developing superhot-rock technology, not an EGS project. Only Fervo/Cape Station and Power Planet/Star Peak are identified in the cited sources as EGS-specific examples. Investor-specific payback, IRR, NPV priorities, and expected return ranges were not disclosed in the cited financing announcements.</p>
            <div class="cs-investor-grid" data-investor-list aria-label="Investor profiles"></div>
          </div>
        </div>
      </div>

      <div class="cs-card cs-fid" role="region" aria-labelledby="cs-fid-title">
        <header>
          <p class="cs-eyebrow">Project decision gate</p>
          <h3 id="cs-fid-title">Final investment decision (FID)</h3>
          <p class="cs-fid-intro">FID is the sponsor’s go/no-go commitment to proceed from development into construction, after diligence and financing commitments are ready. Fervo’s cited financing announcements do not give a formal Cape Station FID date; funding announcements and financial close are shown separately rather than treated as FID.</p>
        </header>
        <div class="cs-fid-track" aria-label="Project stage around FID">
          <div class="cs-fid-step">Development and de-risking<small>Confirm resource, design, site, and commercial path</small></div>
          <div class="cs-fid-step" data-gate="true">Final investment decision<small>Cape Station FID date not publicly disclosed in the cited releases</small></div>
          <div class="cs-fid-step">Construction underway<small>Reported by Fervo on June 11, 2025</small></div>
          <div class="cs-fid-step">Project financial close<small>$421M Cape Station Phase I close reported March 19, 2026; separate from formal FID</small></div>
          <div class="cs-fid-step">Operations<small>Commissioning and repayment begin</small></div>
        </div>
        <div class="cs-fid-timeline" role="region" aria-labelledby="cs-fid-timeline-title">
          <div class="cs-fid-timeline-head">
            <h4 id="cs-fid-timeline-title">Fervo financing milestones</h4>
            <p>Scroll horizontally to follow all seven events. Day gaps are between full-date announcements; April's grant selection has no reported day, so no duration is guessed.</p>
          </div>
          <div class="cs-fid-timeline-events" role="list" aria-label="Chronological financing announcements" tabindex="0">
            ${fidFinancingMilestones.map((milestone, index) => {
              return `
                <article class="cs-fid-milestone" role="listitem">
                  <time datetime="${milestone.date}">${escapeHtml(milestone.dateLabel)}</time>
                  <h5>${escapeHtml(milestone.title)}</h5>
                  <p>${escapeHtml(milestone.detail)}</p>
                  <p class="cs-fid-elapsed">${escapeHtml(milestoneElapsedLabel(index))}</p>
                  ${milestone.citations.map(citationMarkup).join('')}
                </article>
              `;
            }).join('')}
          </div>
          <div class="cs-fid-undated" role="note">
            <strong>Cape Station FID date: not publicly disclosed</strong>
            <p>Fervo’s June 2025 release reports Phase I fully funded and construction underway; its March 2026 release reports project financial close. Neither dates the formal FID, so no date or elapsed time is inferred. ${citationMarkup(sources.fervoJune2025)} ${citationMarkup(sources.bankFinancing)}</p>
          </div>
        </div>
        <div class="cs-fid-details">
          <div>
            <h4>What should be in place</h4>
            <ul class="cs-fid-checklist">${fidChecklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          </div>
          <div class="cs-fid-example">
            <h4>Deal example: Cape Station</h4>
            ${statusMarkup('actual')}
            <p>Fervo reported contracted power-purchase agreements and closed $421 million in non-recourse financing, including a construction-to-term loan, to fund remaining Phase I construction. The announcement illustrates FID readiness factors; it is not presented as a separately reported FID date.</p>
            ${citationMarkup(sources.bankFinancing)}
          </div>
        </div>
      </div>

      <div class="cs-transition" role="region" aria-label="EGS financing transition">
        <article>
          <h3>Availability is improving</h3>
          <p>EGS is moving from development-stage equity and public support toward preferred equity and institutional project finance.</p>
        </article>
        <article>
          <h3>The structure is maturing</h3>
          <p>Preferred equity, senior secured debt, non-recourse project finance and long-term power offtake indicate greater lender participation.</p>
        </article>
        <article>
          <h3>Cost of capital: not yet proven</h3>
          <p>Cape Station’s $421 million commitment shows improving availability, but comparable EGS interest rates and investor IRRs are not publicly disclosed. This does not establish cheaper capital.</p>
          ${citationMarkup(sources.bankFinancing)}
        </article>
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
          <p>Grants, loan guarantees, and other public programs can support development or reduce project risk, subject to program requirements and project eligibility. Tax-credit rules and deadlines can change; Fervo reported a $61 million tax-credit bridge within Cape Station’s 2026 financing, but that does not establish general EGS eligibility or a tax-credit value for other projects. Check the current IRS credit guidance and subsequent law updates before relying on tax treatment. ${citationMarkup(sources.bankFinancing)} ${citationMarkup(sources.irsCleanElectricityCredit)} ${citationMarkup(sources.irsTaxLawUpdate)}</p>
          <div class="cs-source-links">
            <a href="https://www.energy.gov/eere/geothermal/funding-opportunities" target="_blank" rel="noopener">DOE Geothermal Technologies Office funding opportunities</a>
            <a href="https://www.energy.gov/lpo/geothermal" target="_blank" rel="noopener">DOE Loan Programs Office: geothermal</a>
            <a href="${sources.irsCleanElectricityCredit.url}" target="_blank" rel="noopener">IRS Clean Electricity Investment Credit (2024 guidance)</a>
            <a href="${sources.irsTaxLawUpdate.url}" target="_blank" rel="noopener">IRS Working Families Tax Cuts (accessed Nov. 23, 2026)</a>
            <a href="https://atb.nlr.gov/electricity/2025/geothermal" target="_blank" rel="noopener">NLR Annual Technology Baseline 2025: Geothermal</a>
          </div>
        </div>
      </div>

    </div>
  `;

  const root = el.querySelector('.cs-stack');
  const workspace = root.querySelector('.cs-workspace');
  const tower = root.querySelector('.cs-tower');
  const researchPanel = root.querySelector('.cs-research');
  const syncResearchPanelHeight = () => {
    researchPanel.style.height = `${tower.getBoundingClientRect().height}px`;
  };
  syncResearchPanelHeight();
  new ResizeObserver(syncResearchPanelHeight).observe(tower);
  const investorLayerFilter = root.querySelector('[data-investor-layer-filter]');
  const investorTypeFilter = root.querySelector('[data-investor-type-filter]');
  const investorList = root.querySelector('[data-investor-list]');
  const investorResultCount = root.querySelector('[data-investor-result-count]');
  const investorProfileCount = root.querySelector('[data-investor-profile-count]');
  const exportButton = root.querySelector('[data-export]');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function statusLabel(status = 'actual', label) {
    const kind = Object.prototype.hasOwnProperty.call(statusLabels, status) ? status : 'actual';
    return label || statusLabels[kind];
  }

  function statusMarkup(status = 'actual', label) {
    const kind = Object.prototype.hasOwnProperty.call(statusLabels, status) ? status : 'actual';
    return `<span class="cs-data-status" data-status="${kind}">${escapeHtml(statusLabel(kind, label))}</span>`;
  }

  function citationMarkup(citation) {
    const url = escapeHtml(citation.url);
    return `<span class="cs-citation">(${escapeHtml(citation.author)}, ${escapeHtml(citation.year)}, <a href="${url}" target="_blank" rel="noopener">${url}</a>)</span>`;
  }

  function investorProfileMarkup(investor) {
    const monogram = investor.name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
    const layerNames = investor.layers.map((id) => {
      const layer = layers.find((item) => item.id === id);
      return layer ? layer.name : id;
    });

    return `
      <details class="cs-investor-profile">
        <summary>
          <span class="cs-investor-monogram" aria-hidden="true">${escapeHtml(monogram)}</span>
          <span>
            <span class="cs-investor-name">${escapeHtml(investor.name)}</span>
            <span class="cs-investor-category">${escapeHtml(investor.investorType)}</span>
          </span>
          <span class="cs-investor-chevron" aria-hidden="true">›</span>
          <span class="cs-investor-layer-tags">${layerNames.map((name) => `<span class="cs-investor-layer-tag">${escapeHtml(name)}</span>`).join('')}</span>
        </summary>
        <div class="cs-investor-profile-body">
          <dl class="cs-investor-metrics">
            <div><dt>Investor type</dt><dd>${escapeHtml(investor.investorType)}</dd></div>
            <div><dt>Capital stack layer(s)</dt><dd>${layerNames.map(escapeHtml).join(', ')}</dd></div>
          </dl>
          <h3>Representative investment</h3>
          ${investor.investments.map((example) => `
            <div class="cs-investor-investment">
              <p><strong>${escapeHtml(example.company)}</strong> — ${escapeHtml(example.description)}</p>
              <p class="cs-investor-scope">EGS status: ${escapeHtml(example.geothermalScope)}</p>
              ${citationMarkup(example.source)}
            </div>
          `).join('')}
          <dl class="cs-investor-metrics">
            <div><dt>Publicly disclosed investment priorities</dt><dd>${escapeHtml(investor.priorities)}</dd></div>
            <div><dt>Expected return range</dt><dd>${escapeHtml(investor.expectedReturns)}</dd></div>
          </dl>
          ${citationMarkup(investor.investments[0].source)}
        </div>
      </details>
    `;
  }

  function renderInvestorDirectory() {
    if (!investorProfiles.length) {
      investorList.innerHTML = '<p class="cs-investor-load-error" role="status">Loading investor profiles...</p>';
      investorResultCount.textContent = 'Loading investor data...';
      return;
    }

    const selectedLayer = investorLayerFilter.value;
    const selectedType = investorTypeFilter.value;
    const matches = investorProfiles.filter((investor) => (
      (!selectedLayer || investor.layers.includes(selectedLayer))
      && (!selectedType || investor.investorType === selectedType)
    ));

    investorList.innerHTML = matches.length
      ? matches.map(investorProfileMarkup).join('')
      : '<p class="cs-investor-load-error" role="status">No profiles match these filters.</p>';
    investorResultCount.textContent = `Showing ${matches.length} of ${investorProfiles.length} profiles`;
  }

  function validateInvestorProfiles(profiles) {
    const profileKeys = 'expectedReturns|investments|investorType|layers|name|priorities';
    const investmentKeys = 'company|description|geothermalScope|source';
    const sourceKeys = 'author|url|year';
    const hasExactKeys = (value, expectedKeys) => (
      value && Object.keys(value).sort().join('|') === expectedKeys
    );

    if (!Array.isArray(profiles) || !profiles.length || profiles.some((profile) => (
      !hasExactKeys(profile, profileKeys)
      || typeof profile.name !== 'string'
      || typeof profile.investorType !== 'string'
      || typeof profile.priorities !== 'string'
      || typeof profile.expectedReturns !== 'string'
      || !Array.isArray(profile.layers)
      || !profile.layers.length
      || profile.layers.some((id) => !layers.some((layer) => layer.id === id))
      || !Array.isArray(profile.investments)
      || profile.investments.length < 1
      || profile.investments.length > 3
      || profile.investments.some((example) => (
        !hasExactKeys(example, investmentKeys)
        || typeof example.company !== 'string'
        || typeof example.description !== 'string'
        || typeof example.geothermalScope !== 'string'
        || !hasExactKeys(example.source, sourceKeys)
        || typeof example.source.author !== 'string'
        || typeof example.source.year !== 'string'
        || typeof example.source.url !== 'string'
      ))
    ))) {
      throw new TypeError('Expected investor records with the same profile, investment, and source fields.');
    }
  }

  async function loadInvestorProfiles() {
    const response = await fetch(new URL('data/investors.json', document.baseURI));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const profiles = await response.json();
    validateInvestorProfiles(profiles);
    investorProfiles = profiles;
    investorTypeFilter.innerHTML = `
      <option value="">All investor types</option>
      ${[...new Set(investorProfiles.map((investor) => investor.investorType))]
        .sort()
        .map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`)
        .join('')}
    `;
    investorProfileCount.textContent = `${investorProfiles.length} profiles`;
    renderInvestorDirectory();
    exportButton.disabled = false;
  }

  function showInvestorDataError(error) {
    console.error('Could not load data/investors.json.', error);
    investorProfileCount.textContent = 'Unavailable';
    investorResultCount.textContent = 'Investor data unavailable';
    investorList.innerHTML = `<p class="cs-investor-load-error" role="alert">Could not load investor data: ${escapeHtml(error.message || error)}. Check data/investors.json and reload.</p>`;
  }

  function evidenceMarkup(items, emptyMessage) {
    if (!items.length) return `<div class="cs-gap">${escapeHtml(emptyMessage)}</div>`;
    return `<div class="cs-evidence-list">${items.map((item) => `
      <article class="cs-evidence">
        ${statusMarkup(item.status, item.statusLabel)}
        <p>${escapeHtml(item.text)}</p>
        ${item.citations.map(citationMarkup).join('')}
      </article>
    `).join('')}</div>`;
  }

  function economicsMarkup(layer) {
    const economics = layerEconomics[layer.id];
    const detailMarkup = (label, detail) => `
      <div class="cs-econ-item">
        <span class="cs-econ-label">${escapeHtml(label)}</span>
        <p>${escapeHtml(detail.text)}</p>
        ${(detail.citations || []).map(citationMarkup).join('')}
      </div>
    `;
    return `
      <div class="cs-economics">
        <h4 class="cs-section-label">Funding role and project terms</h4>
        <div class="cs-econ-grid">
          ${detailMarkup('Project role', economics.projectRole)}
          ${detailMarkup('Typical cost / terms', economics.typicalCost)}
          ${detailMarkup('Repayment priority', economics.repaymentPriority)}
          ${detailMarkup('How this de-risks EGS', economics.derisking)}
          ${detailMarkup('Risk position', { text: economics.risk })}
          <div class="cs-econ-item cs-return-item">
            <span class="cs-econ-label">Published return reference</span>
            ${statusMarkup(economics.returnStatus, economics.returnStatusLabel)}
            <strong>${escapeHtml(economics.return)}</strong>
            <p>${escapeHtml(economics.returnNote)}</p>
            ${economics.returnCitation ? citationMarkup(economics.returnCitation) : ''}
          </div>
        </div>
        <div class="cs-priorities">
          <span class="cs-econ-label">Investor priorities</span>
          <div class="cs-priority-list">${economics.priorities.map((item) => `<span class="cs-priority-chip">${escapeHtml(item)}</span>`).join('')}</div>
          ${economics.priorityNote ? `<p class="cs-copy">${escapeHtml(economics.priorityNote)}</p>${citationMarkup(economics.priorityCitation)}` : ''}
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
          <h4 class="cs-section-label">Examples and disclosed deals</h4>
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
          <h4 class="cs-section-label">Examples and disclosed deals</h4>
          ${evidenceMarkup(evidence, layer.caveat)}
          ${layer.grants ? `<div class="cs-caveat">${escapeHtml(layer.grants.caveat)}</div>` : ''}
        </div>
      `;
    } else {
      const citations = [
        ...[...layer.evidence, ...(layer.grants ? layer.grants.evidence : [])].flatMap((item) => item.citations),
        ...(layer.grants ? [layer.grants.citation] : []),
        ...['projectRole', 'typicalCost', 'repaymentPriority', 'derisking']
          .flatMap((key) => layerEconomics[layer.id][key].citations || []),
        ...(layerEconomics[layer.id].returnCitation ? [layerEconomics[layer.id].returnCitation] : []),
        ...(layerEconomics[layer.id].priorityCitation ? [layerEconomics[layer.id].priorityCitation] : []),
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
        <p class="cs-econ-label">Layer definition</p>
        <p class="cs-definition">${escapeHtml(layer.role)}</p>
        <div class="cs-research-tabs" role="tablist" aria-label="Capital source research">
          ${tabs.map((tab) => `<button class="cs-research-tab" id="cs-research-tab-${tab}" type="button" role="tab" data-research-tab="${tab}" aria-controls="cs-research-content" aria-selected="${researchTab === tab}">${tab === 'evidence' ? 'Examples' : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>`).join('')}
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

  investorLayerFilter.addEventListener('change', renderInvestorDirectory);
  investorTypeFilter.addEventListener('change', renderInvestorDirectory);
  renderInvestorDirectory();
  loadInvestorProfiles().catch(showInvestorDataError);

  workspace.addEventListener('focusin', (event) => {
    const button = event.target.closest('[data-layer]');
    if (button && workspace.contains(button)) {
      focusedId = button.dataset.layer;
      renderFocus();
    }
  });

  workspace.addEventListener('pointerover', (event) => {
    const button = event.target.closest('.cs-tower-layer');
    if (!button || !workspace.contains(button)) return;
    if (event.relatedTarget instanceof Node && button.contains(event.relatedTarget)) return;
    focusedId = button.dataset.layer;
    renderFocus();
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
      lines.push(`${metric.label}: ${metric.value} — ${metric.note} (${statusLabel(metric.status)})`, citationText(metric.citation));
    });
    lines.push('');
    layers.forEach((layer) => {
      lines.push(layer.name.toUpperCase(), layer.role);
      const economics = layerEconomics[layer.id];
      lines.push(
        `Project role: ${economics.projectRole.text}`,
        `Typical cost / terms: ${economics.typicalCost.text}`,
        `Repayment priority: ${economics.repaymentPriority.text}`,
        `How this de-risks EGS: ${economics.derisking.text}`,
        `Published return reference: ${economics.return} — ${economics.returnNote} (${statusLabel(economics.returnStatus, economics.returnStatusLabel)})`,
        `Risk position: ${economics.risk}`,
        `Investor priorities: ${economics.priorities.join(', ')}`,
      );
      ['projectRole', 'typicalCost', 'repaymentPriority', 'derisking'].forEach((key) => {
        (economics[key].citations || []).forEach((citation) => lines.push(citationText(citation)));
      });
      if (economics.returnCitation) lines.push(citationText(economics.returnCitation));
      if (economics.priorityCitation) lines.push(citationText(economics.priorityCitation));
      const evidence = layer.grants ? [...layer.evidence, ...layer.grants.evidence] : layer.evidence;
      if (evidence.length) {
        evidence.forEach((item) => {
          lines.push(`- ${item.text} (${statusLabel(item.status, item.statusLabel)})`, ...item.citations.map(citationText));
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
      'Cape Station formal FID date: not publicly disclosed in the cited Fervo financing announcements; no date is inferred.',
      ...fidFinancingMilestones.map((milestone, index) =>
        `${milestone.dateLabel}: ${milestone.title}. ${milestone.detail} (${milestoneElapsedLabel(index)}) ${milestone.citations.map(citationText).join(' ')}`,
      ),
      ...fidChecklist.map((item) => `- ${item}`),
      citationText(sources.bankFinancing),
    );
    lines.push(
      '',
      'GEOTHERMAL INVESTOR DIRECTORY',
      `${investorProfiles.length} representative financing participants; not a ranking. Broader-geothermal examples are labeled and are not EGS evidence.`,
      ...investorProfiles.flatMap((investor) => [
        `${investor.name} — Investor type: ${investor.investorType}; capital layer(s): ${investor.layers.map((id) => layers.find((layer) => layer.id === id).name).join(', ')}`,
        ...investor.investments.map((example) => `  ${example.company}: ${example.description}; EGS status: ${example.geothermalScope} (${citationText(example.source)})`),
        `  Publicly disclosed priorities: ${investor.priorities} (${citationText(investor.investments[0].source)})`,
        `  Expected return range: ${investor.expectedReturns} (${citationText(investor.investments[0].source)})`,
      ]),
      '',
      'EGS-SPECIFIC DATA UNAVAILABLE',
      'EGS-specific interest rates, preferred returns and investor IRRs remain limited. General market benchmarks are not observed EGS deal terms.',
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

  function milestoneElapsedLabel(index) {
    const current = fidFinancingMilestones[index];
    if (current.datePrecision === 'month') {
      return 'Source reports month only; elapsed days not calculated';
    }

    let previousIndex = index - 1;
    while (previousIndex >= 0 && fidFinancingMilestones[previousIndex].datePrecision === 'month') {
      previousIndex -= 1;
    }
    if (previousIndex < 0) return 'First precisely dated financing milestone shown';

    const previousDate = Date.parse(`${fidFinancingMilestones[previousIndex].date}T00:00:00Z`);
    const currentDate = Date.parse(`${current.date}T00:00:00Z`);
    const days = Math.round((currentDate - previousDate) / 86400000);
    const monthOnlyInBetween = fidFinancingMilestones
      .slice(previousIndex + 1, index)
      .some((milestone) => milestone.datePrecision === 'month');
    return monthOnlyInBetween
      ? `${days} days between precisely dated announcements; month-only award selection in between`
      : `${days} days since prior dated announcement`;
  }

  renderFocus();
};
