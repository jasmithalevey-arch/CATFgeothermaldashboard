window.FinancialSections = window.FinancialSections || {};

window.FinancialSections.capitalStack = function (el) {
  const layers = [
    {
      id: 'senior',
      short: 'SD',
      name: 'Senior debt',
      subtitle: 'Bank and project-finance capital',
      color: '#278160',
      soft: '#ecf8f2',
      risk: 'Medium–low',
      priority: 'Paid first',
      research: {
        definition: `Senior debt is the first-ranking project loan. Banks protect principal through collateral, covenants, resource certainty, and cash flow that can service debt regardless of project upside.`,
        role: `Senior capital becomes viable after EGS drilling demonstrates sufficient capacity and the project can support conventional debt financing.`,
        evidence: [
          'Fervo Cape Station debt financing: $421M',
          'Fervo construction loan: $309M',
          'Fervo tax-credit bridge loan: $61M',
          'Fervo letter-of-credit facility: $51M',
        ],
        priorities: [
          { label: 'Repayment', value: 'DSCR and cash flow' },
          { label: 'Resource', value: 'Independent engineering report' },
          { label: 'Revenue', value: 'PPA and creditworthy buyer' },
          { label: 'Costs', value: 'CAPEX, OPEX, and construction budget' },
          { label: 'Technical', value: 'Flow, temperature, and well productivity' },
        ],
        risks: [
          'Construction and completion after the resource is demonstrated',
          'Operating performance and reservoir sustainability',
          'Contractual revenue and counterparty performance',
          'Tax-credit timing through a bridge facility',
        ],
        avoids: `EGS exploration and early drilling remain too risky for conventional debt before project-specific resource performance is demonstrated.`,
        firms: ['Barclays', 'HSBC', 'JPMorgan', 'Bank of America', 'BlackRock / GIP', 'Macquarie', 'Brookfield'],
        deals: [
          {
            name: 'Fervo Cape Station',
            detail: `In March 2026, Fervo secured $421M of non-recourse debt: a $309M construction loan, $61M tax-credit bridge loan, and $51M letter-of-credit facility. Barclays and HSBC were lead arrangers; JPMorgan and Bank of America participated.`,
            tag: 'EGS · $421M',
            source: 'Fervo financing',
          },
          {
            name: 'Brookfield–Google hydro precedent',
            detail: `Contracts cover 670 MW at Holtwood and Safe Harbor for 20 years, within a framework for up to 3,000 MW of U.S. hydroelectric capacity. It demonstrates the long-term contracted revenue sought by infrastructure capital.`,
            tag: 'Hydro · 20-year contract',
            source: 'Brookfield shareholder letter',
          },
        ],
        parallel: `The research found solar projects commonly use 60–80% debt and 20–40% equity. That is a solar benchmark, not an EGS allocation assumption. In hydro, Brookfield emphasizes long-lived assets, contracted cash flow, and operating improvements.`,
      },
    },
    {
      id: 'mezz',
      short: 'MZ',
      name: 'Mezzanine finance',
      subtitle: 'The bridge from proof to bankability',
      color: '#b85a1f',
      soft: '#fff2e9',
      risk: 'Medium–high',
      priority: 'After senior debt',
      research: {
        definition: `Mezzanine finance is a hybrid between debt and equity. It sits below senior debt and above common equity, and can include subordinated debt, convertible debt, preferred equity, HoldCo loans, or structured equity.`,
        role: `It addresses EGS's central financing gap: resource performance has been partially demonstrated, but the project is not yet sufficiently proven for full conventional project finance. It may fund confirmation, bridge to construction debt, or provide flexible scale-up capital.`,
        evidence: [
          'RIVE FCT Quartz first close: €55M',
          'RIVE investment size: €5–50M',
          'No public numerical target ROI identified for HASI or RIVE',
          'No specific EGS mezzanine transaction identified',
        ],
        priorities: [
          { label: 'Resource', value: 'Successful confirmation wells' },
          { label: 'Cash flow', value: 'Net generation after parasitic load' },
          { label: 'Economics', value: 'CAPEX, OPEX, IRR, and LCOE' },
          { label: 'Protection', value: 'Collateral and equity beneath it' },
          { label: 'Takeout', value: 'Clear path to senior financing' },
        ],
        risks: [
          'Partially proven resource and additional confirmation drilling',
          'Development and construction milestones',
          'Ramp-up before predictable operating cash flow',
          'Subordination to the senior lender',
        ],
        avoids: `The research does not show that early EGS exploration is a standard mezzanine investment. Proven technology, downside protection, experienced counterparties, and contracted revenue remain important.`,
        firms: ['HASI', 'New Energy Capital', 'RIVE Private Investment', 'AMP Capital'],
        deals: [
          {
            name: 'RIVE — Cap Vert Energie',
            detail: `RIVE provided mezzanine financing to a six-plant, 17 MW solar portfolio in southern France. Senior financing came from Natixis and Unifergie, making the repayment hierarchy a useful EGS capital-stack comparison.`,
            tag: 'Solar · 17 MW',
            source: 'RIVE investment announcement',
          },
          {
            name: 'HASI — Sunrun portfolio',
            detail: `HASI made a mezzanine loan to a residential solar lease portfolio covering 20 states, 335 MW, and more than 45,000 homeowners.`,
            tag: 'Solar · 335 MW',
            source: 'HASI investments',
          },
        ],
        parallel: `RIVE also financed a developer with rights to 61 solar plants totaling 152 MW, including 29 operating plants. Operating data, proven technology, and long-term electricity-sale contracts are the transferable protections for EGS.`,
      },
    },
    {
      id: 'preferred',
      short: 'PE',
      name: 'Preferred / structured equity',
      subtitle: 'Flexible capital with priority protection',
      color: '#5962b7',
      soft: '#f0f1ff',
      risk: 'Medium–high',
      priority: 'Before common equity',
      research: {
        definition: `Preferred or structured equity adds contractual protections and priority over common equity. The research places preferred equity within the broader mezzanine toolkit rather than documenting a standard EGS preferred-return structure.`,
        role: `This layer can support a project that has moved beyond venture-scale technology work but still needs risk-bearing capital before senior debt is sufficient. It can absorb development, drilling-repeatability, and commercialization risk while preserving a path to refinancing.`,
        evidence: [
          'New Energy Capital invests across senior debt, second-lien debt, mezzanine debt, preferred equity, and common equity',
          'HASI uses debt, structured equity, and common equity',
          'No universal preferred-equity return or holding period',
          'Fervo Series E: $462M in 2025',
        ],
        priorities: [
          { label: 'Returns', value: 'IRR, NPV, and cash flow' },
          { label: 'Technical', value: 'Evidence risk is declining' },
          { label: 'Scale', value: 'Commercialization pathway' },
          { label: 'Exit', value: 'Refinancing or strategic exit' },
          { label: 'Governance', value: 'Experienced developer and controls' },
        ],
        risks: [
          'Repeatability of successful wells across the field',
          'Commercialization and scale-up risk',
          'Construction risk not accepted by senior lenders',
          'Timing of contracted revenue and refinancing',
        ],
        avoids: `No preferred-equity terms should be inferred from the equity rounds in the source PDFs. The exact security, return, and control rights require original deal documents.`,
        firms: ['New Energy Capital', 'HASI', 'Climate and energy private equity', 'CalSTRS', 'CPP Investments'],
        deals: [
          {
            name: 'Fervo Series E',
            detail: `Fervo raised $462M in Series E funding in 2025. CalSTRS and CPP Investments participated. This is evidence of institutional EGS equity, not a confirmed preferred-equity security.`,
            tag: 'EGS equity · $462M',
            source: 'DCVC / Fervo announcement',
          },
          {
            name: 'Brookfield hydro asset sale',
            detail: `Brookfield announced a sale of two 25% interests in a U.S. hydro portfolio for approximately $520M, including approximately $250M net to Brookfield Renewable, and reported approximately three times invested capital since acquisition.`,
            tag: 'Hydro · capital recycling',
            source: 'Brookfield shareholder letter',
          },
        ],
        parallel: `The Brookfield hydro example shows how institutional equity can improve operations, collect contracted cash flow, and recycle mature assets. The research cautions that firm-level return targets are not project-level IRRs.`,
      },
    },
    {
      id: 'common',
      short: 'CE',
      name: 'Common equity',
      subtitle: 'First-loss technology and development capital',
      color: '#b83c5a',
      soft: '#fff0f4',
      risk: 'High',
      priority: 'Paid last',
      research: {
        definition: `Common equity is ownership capital that is paid after debt and preferred claims. Venture capital accepts technology and development risk in exchange for potential company-level upside; private equity enters later as cash flow and commercialization become clearer.`,
        role: `Common equity funds the risks that debt cannot: new EGS technology, exploration, first wells, stimulation, subsurface characterization, and early commercialization. Grants and philanthropy often sit alongside this layer to reduce first-loss exposure.`,
        evidence: [
          'Fervo Series E: $462M in 2025',
          'Fervo DOE awards: approximately $20M in 2026',
          'Deep EGS drilling and completion: approximately 57% of overnight cost',
          'Fervo Cape Station debt financing: $421M',
        ],
        priorities: [
          { label: 'Value', value: 'IRR, NPV, and potential return' },
          { label: 'Market', value: 'Large addressable opportunity' },
          { label: 'Team', value: 'Technical and management strength' },
          { label: 'Proof', value: 'Well productivity and success rate' },
          { label: 'Scale', value: 'Cost reduction and replication' },
        ],
        risks: [
          'Exploration uncertainty and unsuccessful drilling',
          'First-of-a-kind EGS technology and stimulation',
          'Subsurface characterization and resource confirmation',
          'Commercialization, permitting, and market adoption',
        ],
        avoids: `Equity has the broadest risk tolerance, but EGS investors still conduct milestone-based diligence around technical differentiation, declining risk, scalability, and a path to commercialization.`,
        firms: [
          'DCVC',
          'Capricorn Investment Group',
          'Congruent Ventures',
          'Breakthrough Energy Ventures',
          'Galvanize Climate Solutions',
          'Devon Energy',
        ],
        deals: [
          {
            name: 'Fervo financing pathway',
            detail: `Fervo progressed from Activate and Elemental support to venture and strategic equity, a $462M Series E in 2025, and $421M of bank project financing in 2026. The sequence illustrates how proof can unlock cheaper capital.`,
            tag: 'EGS · grants to debt',
            source: 'Fervo / Activate / Elemental',
          },
          {
            name: 'DOE EGS support',
            detail: `Approximately $20M in new DOE awards to Fervo in 2026 for EGS development and resource appraisal illustrates public capital's role in work private lenders consider too uncertain.`,
            tag: 'Public capital · $20M',
            source: 'DOE / Fervo announcement',
          },
        ],
        parallel: `Solar's LCOE fell by 80% from 2010 to 2023, and module costs fell by 90% over the research period cited in the PDFs. The transferable lesson for EGS is that technical learning, standardization, and deployment scale can reduce perceived risk and cost.`,
      },
    },
  ];

  const sourceMetrics = [
    {
      label: 'Deep EGS overnight cost',
      value: '$12,396–22,133/kW',
      note: 'NREL 2024 ATB range',
    },
    {
      label: 'Near-field EGS overnight cost',
      value: '$5,469–10,395/kW',
      note: 'NREL 2024 ATB range',
    },
    {
      label: 'Deep EGS drilling share',
      value: '≈57%',
      note: 'Drilling and completion share of overnight cost',
    },
    {
      label: 'Representative EGS flow',
      value: '≈60 kg/s',
      note: 'NREL modeled scenario',
    },
  ];

  let selectedId = 'senior';
  let focusedId = selectedId;
  let researchTab = 'brief';

  el.innerHTML = `
    <style>
      .cs-stack {
        --cs-ink: #153171;
        --cs-muted: #5d6b7a;
        --cs-border: #e6ebef;
        --cs-surface: #fff;
        --cs-subtle: #f5f7f9;
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
      .cs-intro > p { color: var(--cs-muted); font-size: .9rem; margin: .5rem 0 0; }
      .cs-workspace {
        align-items: stretch;
        display: grid;
        gap: 1.25rem;
        grid-template-columns: minmax(245px, 280px) minmax(360px, 1fr) minmax(320px, 390px);
      }
      .cs-card {
        background: var(--cs-surface);
        border: 1px solid var(--cs-border);
        border-radius: 14px;
        box-shadow: 0 8px 24px rgba(21, 49, 113, .045);
        min-width: 0;
        padding: 1.25rem;
      }
      .cs-eyebrow {
        color: var(--cadet);
        font-size: .63rem;
        font-weight: 700;
        letter-spacing: .13em;
        margin: 0;
        text-transform: uppercase;
      }
      .cs-card-heading {
        align-items: center;
        display: flex;
        gap: .75rem;
        justify-content: space-between;
      }
      .cs-card-heading h3 {
        color: var(--chathams);
        font-size: 1rem;
        letter-spacing: -.02em;
        margin: .25rem 0 0;
      }
      .cs-pill {
        background: #ecf8f2;
        border-radius: 999px;
        color: #278160;
        flex: 0 0 auto;
        font-size: .57rem;
        font-weight: 700;
        padding: .3rem .55rem;
      }
      .cs-metrics { display: grid; gap: .5rem; margin-top: 1rem; }
      .cs-metric {
        border: 1px solid var(--cs-border);
        border-radius: 10px;
        padding: .65rem .75rem;
      }
      .cs-metric h4 {
        color: var(--cadet);
        font-size: .57rem;
        letter-spacing: .08em;
        margin: 0;
        text-transform: uppercase;
      }
      .cs-metric strong {
        color: var(--chathams);
        display: block;
        font-size: .96rem;
        letter-spacing: -.02em;
        margin-top: .2rem;
      }
      .cs-metric p { color: var(--cs-muted); font-size: .58rem; line-height: 1.5; margin: .2rem 0 0; }
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
        padding: .5rem .6rem;
        text-align: left;
        transition: background .16s ease, border-color .16s ease;
        width: 100%;
      }
      .cs-layer-nav:hover, .cs-layer-nav[data-focused="true"] { background: #fbfcfd; border-color: var(--cadet-light); }
      .cs-layer-nav:focus-visible, .cs-tower-layer:focus-visible, .cs-research-tab:focus-visible, .cs-export:focus-visible, .cs-source-link:focus-visible {
        outline: 3px solid var(--cobalt);
        outline-offset: 3px;
      }
      .cs-nav-copy { align-items: center; display: flex; gap: .55rem; min-width: 0; }
      .cs-abbrev {
        align-items: center;
        border-radius: 6px;
        display: inline-flex;
        flex: 0 0 auto;
        font-size: .58rem;
        font-weight: 700;
        height: 28px;
        justify-content: center;
        width: 28px;
      }
      .cs-nav-name { display: block; font-size: .68rem; font-weight: 700; }
      .cs-nav-priority { color: var(--cs-muted); display: block; font-size: .58rem; margin-top: .1rem; }
      .cs-chevron { color: var(--cadet); font-size: 1.1rem; padding-left: .4rem; }
      .cs-tower {
        background: #153171;
        border: 1px solid #153171;
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
      .cs-tower-kicker {
        color: #abb8c3;
        font-size: .6rem;
        font-weight: 700;
        letter-spacing: .13em;
        margin: 0;
        text-transform: uppercase;
      }
      .cs-tower-kicker span { color: #56bfee; font-size: .85rem; margin-right: .25rem; }
      .cs-tower-head h3 { color: #fff; font: 600 1.45rem/1.2 var(--font-body); letter-spacing: -.035em; margin: .5rem 0 0; }
      .cs-tower-help { color: #abb8c3; font-size: .58rem; line-height: 1.5; margin: 0; max-width: 145px; text-align: right; }
      .cs-tower-main { align-items: center; display: flex; flex: 1; justify-content: center; margin: 1.25rem 0; min-height: 510px; }
      .cs-risk-scale {
        align-items: center;
        align-self: stretch;
        color: #abb8c3;
        display: flex;
        flex: 0 0 38px;
        flex-direction: column;
        font-size: .5rem;
        font-weight: 700;
        justify-content: space-between;
        letter-spacing: .08em;
        padding: .5rem 0;
        text-align: center;
        text-transform: uppercase;
      }
      .cs-risk-line { background: rgba(255,255,255,.25); flex: 1; margin: .6rem 0; position: relative; width: 1px; }
      .cs-risk-line::before { border-left: 1px solid rgba(255,255,255,.35); border-top: 1px solid rgba(255,255,255,.35); content: ""; height: 6px; left: -3px; position: absolute; top: 0; transform: rotate(45deg); width: 6px; }
      .cs-tower-stack {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 500px;
        margin-left: 1rem;
        max-width: 350px;
        perspective: 900px;
        transform: rotateX(-1deg);
      }
      .cs-tower-layer {
        align-items: center;
        border: 0;
        border-top: 1px solid rgba(255,255,255,.32);
        color: #fff;
        cursor: pointer;
        display: flex;
        flex: 1;
        font-family: var(--font-body);
        justify-content: space-between;
        min-height: 0;
        padding: .75rem 1rem;
        position: relative;
        text-align: left;
        transition: opacity .2s ease, transform .2s ease, box-shadow .2s ease, filter .2s ease;
        width: 100%;
      }
      .cs-tower-layer::after {
        background: inherit;
        bottom: -5px;
        content: "";
        filter: brightness(.6);
        position: absolute;
        right: -11px;
        top: 5px;
        transform: skewY(40deg);
        transform-origin: left top;
        width: 11px;
      }
      .cs-tower-layer:first-child { border-radius: 8px 8px 0 0; }
      .cs-tower-layer:last-child { border-radius: 0 0 8px 8px; }
      .cs-tower-layer[data-focused="true"] { box-shadow: 12px 14px 30px rgba(0,0,0,.3); transform: translateX(-8px); z-index: 1; }
      .cs-tower-layer[data-dimmed="true"] { filter: grayscale(1); opacity: .2; }
      .cs-tower-label { position: relative; z-index: 1; }
      .cs-tower-priority { color: rgba(255,255,255,.74); font-size: .55rem; font-weight: 700; letter-spacing: .1em; margin: 0; text-transform: uppercase; }
      .cs-tower-name { color: #fff; font-size: .78rem; font-weight: 700; margin: .22rem 0 0; }
      .cs-tower-subtitle { color: rgba(255,255,255,.72); font-size: .56rem; margin: .15rem 0 0; }
      .cs-risk-pill { border: 1px solid rgba(255,255,255,.35); border-radius: 999px; color: rgba(255,255,255,.9); font-size: .55rem; font-weight: 600; padding: .25rem .45rem; position: relative; white-space: nowrap; z-index: 1; }
      .cs-tower-footer { border-top: 1px solid rgba(255,255,255,.15); color: #abb8c3; display: flex; font-size: .53rem; font-weight: 700; justify-content: space-between; letter-spacing: .07em; padding-top: .75rem; text-transform: uppercase; }
      .cs-research { overflow: hidden; padding: 0; }
      .cs-profile-head { border-bottom: 1px solid var(--cs-border); padding: 1.25rem; }
      .cs-profile-top { align-items: flex-start; display: flex; gap: .75rem; justify-content: space-between; }
      .cs-profile-title { align-items: center; display: flex; gap: .7rem; }
      .cs-profile-title h3 { color: var(--chathams); font-size: 1rem; letter-spacing: -.025em; margin: .1rem 0 0; }
      .cs-risk-tag { background: var(--cs-subtle); border-radius: 999px; color: var(--cs-muted); flex: 0 0 auto; font-size: .55rem; font-weight: 700; padding: .3rem .5rem; }
      .cs-definition { color: #475467; font-size: .7rem; line-height: 1.65; margin: .8rem 0 0; }
      .cs-research-tabs { background: #f2f4f7; border-radius: 8px; display: grid; gap: 3px; grid-template-columns: repeat(3, 1fr); margin-top: .85rem; padding: 3px; }
      .cs-research-tab { background: transparent; border: 0; border-radius: 6px; color: #667085; cursor: pointer; font: 600 .65rem var(--font-body); padding: .45rem .25rem; text-transform: capitalize; }
      .cs-research-tab[aria-selected="true"] { background: #fff; box-shadow: 0 1px 3px rgba(16,24,40,.1); color: #153171; }
      .cs-research-body { max-height: 670px; overflow-y: auto; padding: 1.25rem; }
      .cs-research-section + .cs-research-section { margin-top: 1.25rem; }
      .cs-section-label { color: var(--cadet); font-size: .6rem; font-weight: 700; letter-spacing: .1em; margin: 0; text-transform: uppercase; }
      .cs-copy { color: #475467; font-size: .67rem; line-height: 1.6; margin: .45rem 0 0; }
      .cs-evidence-grid { display: grid; gap: .4rem; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: .5rem; }
      .cs-evidence { background: #fcfcfd; border: 1px solid #eaecf0; border-radius: 8px; color: #344054; font-size: .62rem; font-weight: 600; line-height: 1.45; padding: .55rem; }
      .cs-bullets { display: grid; gap: .55rem; list-style: none; margin: .5rem 0 0; padding: 0; }
      .cs-bullets li { align-items: flex-start; color: #475467; display: flex; font-size: .63rem; gap: .5rem; line-height: 1.45; }
      .cs-bullet { border-radius: 50%; flex: 0 0 6px; height: 6px; margin-top: .32rem; }
      .cs-caveat { background: #fff7ed; border-radius: 8px; color: #8a4b1f; font-size: .62rem; line-height: 1.5; margin-top: .75rem; padding: .65rem; }
      .cs-priority-list { border: 1px solid #eaecf0; border-radius: 9px; margin-top: .5rem; overflow: hidden; }
      .cs-priority-row { align-items: center; border-bottom: 1px solid #eaecf0; display: flex; font-size: .62rem; gap: .5rem; justify-content: space-between; padding: .55rem .65rem; }
      .cs-priority-row:last-child { border-bottom: 0; }
      .cs-priority-row span:first-child { color: #667085; }
      .cs-priority-row strong { color: #344054; font-size: .6rem; text-align: right; }
      .cs-firms { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .5rem; }
      .cs-firm { border: 1px solid #dfe3e8; border-radius: 999px; color: #475467; font-size: .58rem; font-weight: 600; padding: .3rem .5rem; }
      .cs-small-note { color: var(--cadet); font-size: .57rem; line-height: 1.5; margin: .6rem 0 0; }
      .cs-deals { display: grid; gap: .65rem; }
      .cs-deal { border: 1px solid #eaecf0; border-radius: 10px; padding: .75rem; }
      .cs-deal-tag { border-radius: 999px; display: inline-block; font-size: .52rem; font-weight: 700; letter-spacing: .06em; padding: .25rem .4rem; text-transform: uppercase; }
      .cs-deal h4 { color: #344054; font-size: .73rem; margin: .6rem 0 0; }
      .cs-deal p { color: #667085; font-size: .62rem; line-height: 1.55; margin: .35rem 0 0; }
      .cs-deal-source { border-top: 1px solid #f0f1f3; color: var(--cadet); font-size: .55rem !important; font-weight: 600; margin-top: .55rem !important; padding-top: .4rem; }
      .cs-analogy-note { align-items: flex-start; background: #f2f4f7; border-radius: 9px; color: #667085; display: flex; font-size: .58rem; gap: .45rem; line-height: 1.5; margin-top: .65rem; padding: .65rem; }
      .cs-below { background: #fff; border: 1px solid var(--cs-border); border-radius: 14px; box-shadow: 0 8px 24px rgba(21,49,113,.04); margin-top: 1.25rem; padding: 1.35rem; }
      .cs-below-head { align-items: flex-end; border-bottom: 1px solid var(--cs-border); display: flex; gap: 1rem; justify-content: space-between; padding-bottom: 1rem; }
      .cs-below-head h3 { color: var(--chathams); font: 600 1.15rem/1.3 var(--font-body); letter-spacing: -.025em; margin: .3rem 0 0; }
      .cs-aside-note { color: var(--cadet); font-size: .58rem; line-height: 1.5; margin: 0; max-width: 290px; }
      .cs-stages { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 1rem 0; }
      .cs-stage { border-left: 2px solid var(--cadet-light); padding-left: .8rem; }
      .cs-stage h4, .cs-glossary h4 { color: #344054; font-size: .7rem; margin: 0; }
      .cs-stage p, .cs-glossary p { color: #667085; font-size: .62rem; line-height: 1.6; margin: .35rem 0 0; }
      .cs-glossary { border-top: 1px solid var(--cs-border); display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); padding-top: 1rem; }
      .cs-public { border-top: 1px solid var(--cs-border); margin-top: 1rem; padding-top: 1rem; }
      .cs-public h4 { color: #344054; font-size: .7rem; margin: 0; }
      .cs-public p { color: #667085; font-size: .62rem; line-height: 1.6; margin: .35rem 0 0; }
      .cs-source-links { display: flex; flex-wrap: wrap; gap: .5rem 1rem; margin-top: .5rem; }
      .cs-source-link { color: var(--cobalt); font-size: .62rem; font-weight: 600; }
      .cs-disclaimer { align-items: flex-start; color: var(--cadet); display: flex; font-size: .58rem; gap: .45rem; line-height: 1.5; margin: .8rem .1rem 0; }
      .cs-export {
        align-items: center;
        background: #fff;
        border: 1px solid var(--cadet);
        border-radius: 8px;
        color: var(--chathams);
        cursor: pointer;
        display: inline-flex;
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
      }
      @media (max-width: 760px) {
        .cs-workspace { grid-template-columns: minmax(0, 1fr); }
        .cs-research { grid-column: auto; }
        .cs-tower { min-height: 640px; padding: 1rem; }
        .cs-tower-inner { min-height: 600px; }
        .cs-tower-main { min-height: 455px; }
        .cs-tower-stack { height: 430px; margin-left: .45rem; }
        .cs-tower-layer { padding: .65rem .7rem; }
        .cs-tower-subtitle { display: none; }
        .cs-stages, .cs-glossary { grid-template-columns: minmax(0, 1fr); }
        .cs-below-head { align-items: flex-start; flex-direction: column; }
        .cs-intro-row { align-items: flex-start; }
      }
      @media (max-width: 420px) {
        .cs-tower-help { display: none; }
        .cs-risk-scale { flex-basis: 30px; font-size: .44rem; }
        .cs-tower-name { font-size: .67rem; }
        .cs-risk-pill { font-size: .48rem; padding: .2rem .35rem; }
        .cs-evidence-grid { grid-template-columns: minmax(0, 1fr); }
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
            <h2>Who absorbs the risk?</h2>
            <p>Analyzing the EGS capital stack profiles</p>
          </div>
          <button class="cs-export" type="button" data-export>
            <span aria-hidden="true">↓</span> Export research
          </button>
        </div>
      </header>

      <div class="cs-workspace">
        <aside class="cs-card">
          <div class="cs-card-heading">
            <div>
              <p class="cs-eyebrow">Research data lens</p>
              <h3>EGS cost drivers</h3>
            </div>
            <span class="cs-pill">Source noted</span>
          </div>
          <div class="cs-metrics" aria-label="EGS cost metrics">
            ${sourceMetrics.map((metric) => `
              <article class="cs-metric">
                <h4>${metric.label}</h4>
                <strong>${metric.value}</strong>
                <p>${metric.note}</p>
              </article>
            `).join('')}
          </div>
          <div class="cs-nav">
            <p class="cs-eyebrow">Navigate the stack</p>
            <div class="cs-layer-list" role="group" aria-label="Capital stack layers">
              ${layers.map((layer) => `
                <button class="cs-layer-nav" type="button" data-layer="${layer.id}" data-focused="false" aria-pressed="false">
                  <span class="cs-nav-copy">
                    <span class="cs-abbrev" style="background:${layer.soft};color:${layer.color}">${layer.short}</span>
                    <span><span class="cs-nav-name">${layer.name}</span><span class="cs-nav-priority">${layer.priority}</span></span>
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
              <div>
                <p class="cs-tower-kicker"><span aria-hidden="true">✦</span> Risk allocation</p>
                <h3 id="cs-tower-title">EGS funding tower</h3>
              </div>
              <p class="cs-tower-help">Hover a layer to isolate it and open its source-bound profile.</p>
            </header>
            <div class="cs-tower-main">
              <div class="cs-risk-scale" aria-label="Risk decreases from top to bottom">
                <span>High risk</span><span class="cs-risk-line" aria-hidden="true"></span><span>Low risk</span>
              </div>
              <div class="cs-tower-stack" role="group" aria-label="EGS capital stack, from highest to lowest risk">
                ${layers.slice().reverse().map((layer) => `
                  <button class="cs-tower-layer" type="button" data-layer="${layer.id}" data-focused="false" data-dimmed="false" aria-pressed="false" style="background:${layer.color}">
                    <span class="cs-tower-label">
                      <span class="cs-tower-priority">${layer.priority}</span>
                      <span class="cs-tower-name">${layer.name}</span>
                      <span class="cs-tower-subtitle">${layer.subtitle}</span>
                    </span>
                    <span class="cs-risk-pill">${layer.risk}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            <footer class="cs-tower-footer"><span>Bankability increases downward</span><span>Repayment priority rises</span></footer>
          </div>
        </div>

        <aside class="cs-card cs-research" aria-label="Capital source details" aria-live="polite"></aside>
      </div>

      <div class="cs-below" role="region" aria-labelledby="cs-glossary-title">
        <header class="cs-below-head">
          <div>
            <p class="cs-eyebrow">Bankability glossary</p>
            <h3 id="cs-glossary-title">From resource potential to financeable output</h3>
          </div>
          <p class="cs-aside-note">A fully confirmed resource still retains long-term reservoir risk.</p>
        </header>
        <div class="cs-stages">
          <article class="cs-stage">
            <h4>Partially proven</h4>
            <p>Initial exploration or drilling confirms EGS potential, but commercial productivity or full resource capacity remains uncertain. Early equity is generally more suitable; mezzanine may become possible as uncertainty decreases.</p>
          </article>
          <article class="cs-stage">
            <h4>Fully confirmed</h4>
            <p>The resource demonstrates enough thermal capacity for the proposed plant through well productivity, flow rate, reservoir temperature, and evidence of sustainable generation. Independent reservoir engineering supports the case.</p>
          </article>
          <article class="cs-stage">
            <h4>Bank-ready evidence</h4>
            <p>Banks examine resource confirmation, debt repayment capacity, independent engineering, a PPA, construction budget, and a financial model incorporating CAPEX, OPEX, and electricity sales.</p>
          </article>
        </div>
        <div class="cs-glossary">
          <article>
            <h4>Senior vs. subordinated</h4>
            <p>Senior debt is paid first. Mezzanine or subordinated debt is paid after senior lenders, accepts greater default risk, and can receive fees or equity participation.</p>
          </article>
          <article>
            <h4>Gross vs. net generation</h4>
            <p>Net electricity equals gross generation minus parasitic consumption from pumps, cooling, and auxiliary systems. Revenue depends on saleable net output.</p>
          </article>
          <article>
            <h4>IRR, NPV, and payback</h4>
            <p>IRR measures annualized return; positive NPV indicates value at the required discount rate. Payback communicates capital recovery but omits important time-value effects.</p>
          </article>
        </div>
        <div class="cs-public">
          <h4>Public support and tax-credit capital</h4>
          <p>Grants, loan guarantees, and other public programs can support development or reduce project risk, subject to program requirements and project eligibility. Where a project qualifies, clean-energy tax credits may reduce investment costs or be monetized through eligible financing structures. Project debt is repaid under agreed terms; lenders assess resource performance, construction, operations, permits, and expected revenue. Developer and investor equity funds project costs while accepting risks lenders may not take. Confirm current requirements for each project.</p>
          <div class="cs-source-links">
            <a class="cs-source-link" href="https://www.energy.gov/eere/geothermal/funding-opportunities" target="_blank" rel="noopener">DOE Geothermal Technologies Office funding opportunities</a>
            <a class="cs-source-link" href="https://www.energy.gov/lpo/geothermal" target="_blank" rel="noopener">DOE Loan Programs Office: geothermal</a>
            <a class="cs-source-link" href="https://www.irs.gov/credits-deductions/businesses/energy-investment-tax-credit" target="_blank" rel="noopener">IRS business energy investment tax credit</a>
            <a class="cs-source-link" href="https://atb.nrel.gov/electricity/2024/" target="_blank" rel="noopener">NREL Annual Technology Baseline 2024</a>
          </div>
        </div>
      </div>
      <p class="cs-disclaimer"><span aria-hidden="true">ⓘ</span><span>Conceptual, source-bound research—not a typical allocation or a financing recommendation. Examples and adjacent-industry comparisons do not establish standard EGS terms; deal eligibility and figures should be verified against original documents.</span></p>
    </div>
  `;

  const root = el.querySelector('.cs-stack');
  const workspace = root.querySelector('.cs-workspace');
  const researchPanel = root.querySelector('.cs-research');

  function renderResearch() {
    const layer = layers.find((item) => item.id === focusedId) || layers[0];
    const { research } = layer;
    let panelContent = '';

    if (researchTab === 'brief') {
      panelContent = `
        <div class="cs-research-section">
          <h4 class="cs-section-label">Role in an EGS project</h4>
          <p class="cs-copy">${research.role}</p>
        </div>
        <div class="cs-research-section">
          <h4 class="cs-section-label">Common numbers</h4>
          <div class="cs-evidence-grid">${research.evidence.map((item) => `<div class="cs-evidence">${item}</div>`).join('')}</div>
        </div>
        <div class="cs-research-section">
          <h4 class="cs-section-label">EGS risk absorbed</h4>
          <ul class="cs-bullets">${research.risks.map((item) => `<li><span class="cs-bullet" style="background:${layer.color}"></span><span>${item}</span></li>`).join('')}</ul>
          <div class="cs-caveat">${research.avoids}</div>
        </div>
      `;
    } else if (researchTab === 'investors') {
      panelContent = `
        <div class="cs-research-section">
          <h4 class="cs-section-label">What investors prioritize</h4>
          <div class="cs-priority-list">${research.priorities.map((item) => `<div class="cs-priority-row"><span>${item.label}</span><strong>${item.value}</strong></div>`).join('')}</div>
        </div>
        <div class="cs-research-section">
          <h4 class="cs-section-label">Common names</h4>
          <div class="cs-firms">${research.firms.map((firm) => `<span class="cs-firm">${firm}</span>`).join('')}</div>
          <p class="cs-small-note">A name indicates relevant experience or research coverage, not a commitment to this project or this exact security.</p>
        </div>
        <div class="cs-research-section">
          <h4 class="cs-section-label">Solar / hydro read-through</h4>
          <p class="cs-copy">${research.parallel}</p>
        </div>
      `;
    } else {
      panelContent = `
        <div class="cs-deals">
          ${research.deals.map((deal) => `
            <article class="cs-deal">
              <span class="cs-deal-tag" style="background:${layer.soft};color:${layer.color}">${deal.tag}</span>
              <h4>${deal.name}</h4>
              <p>${deal.detail}</p>
              <p class="cs-deal-source">${deal.source}</p>
            </article>
          `).join('')}
        </div>
        <div class="cs-analogy-note"><span aria-hidden="true">ⓘ</span><span>Adjacent-industry examples are comparisons, not evidence of standard EGS financing terms.</span></div>
      `;
    }

    researchPanel.innerHTML = `
      <header class="cs-profile-head">
        <div class="cs-profile-top">
          <div class="cs-profile-title">
            <span class="cs-abbrev" style="background:${layer.soft};color:${layer.color};height:40px;width:40px;border-radius:10px">${layer.short}</span>
            <div><p class="cs-eyebrow">Source-bound profile</p><h3>${layer.name}</h3></div>
          </div>
          <span class="cs-risk-tag">${layer.risk} risk</span>
        </div>
        <p class="cs-definition">${research.definition}</p>
        <div class="cs-research-tabs" role="tablist" aria-label="Capital source research">
          ${['brief', 'investors', 'deals'].map((tab) => `<button class="cs-research-tab" id="cs-research-tab-${tab}" type="button" role="tab" data-research-tab="${tab}" aria-controls="cs-research-content" aria-selected="${researchTab === tab}">${tab}</button>`).join('')}
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

  workspace.addEventListener('pointerover', (event) => {
    const button = event.target.closest('[data-layer]');
    if (button && workspace.contains(button)) {
      focusedId = button.dataset.layer;
      renderFocus();
    }
  });

  workspace.addEventListener('pointerleave', () => {
    focusedId = selectedId;
    renderFocus();
  });

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
    }
  });

  root.querySelector('[data-export]').addEventListener('click', () => {
    const lines = [
      'EGS CAPITAL STACK — SOURCE-BOUND RESEARCH',
      'Conceptual overview; not a standard allocation or financing recommendation.',
      '',
    ];
    layers.forEach((layer) => {
      lines.push(
        layer.name.toUpperCase(),
        layer.research.definition,
        `Role: ${layer.research.role}`,
        'Common numbers:',
        ...layer.research.evidence.map((item) => `- ${item}`),
        'Investor priorities:',
        ...layer.research.priorities.map((item) => `- ${item.label}: ${item.value}`),
        'Common names:',
        ...layer.research.firms.map((item) => `- ${item}`),
        'EGS risks absorbed:',
        ...layer.research.risks.map((item) => `- ${item}`),
        `Caveat: ${layer.research.avoids}`,
        'Deals and research examples:',
        ...layer.research.deals.map((deal) => `- ${deal.name} (${deal.tag}; ${deal.source}): ${deal.detail}`),
        `Adjacent-industry context: ${layer.research.parallel}`,
        '',
      );
    });
    lines.push(
      'PUBLIC SUPPORT AND TAX-CREDIT CAPITAL',
      'Grants, loan guarantees, and other public programs can support development or reduce project risk, subject to program requirements and project eligibility.',
      'Eligible clean-energy tax credits may reduce investment costs or be monetized through eligible financing structures.',
      'Project debt is repaid under agreed terms; lenders assess resource performance, construction, operations, permits, and expected revenue.',
      'Developer and investor equity funds project costs while accepting risks lenders may not take.',
      'Sources:',
      '- DOE Geothermal Technologies Office funding opportunities: https://www.energy.gov/eere/geothermal/funding-opportunities',
      '- DOE Loan Programs Office: geothermal: https://www.energy.gov/lpo/geothermal',
      '- IRS business energy investment tax credit: https://www.irs.gov/credits-deductions/businesses/energy-investment-tax-credit',
      '- NREL Annual Technology Baseline 2024: https://atb.nrel.gov/electricity/2024/',
      '',
    );
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'egs-capital-stack-research.txt';
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  });

  renderFocus();
};
