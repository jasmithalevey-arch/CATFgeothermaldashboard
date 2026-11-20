Dashboard.registerTab({
  id: 'industry-comparison',
  label: 'Industry Comparison',
  title: 'Geothermal vs. Adjacent Industries',
  render(container) {
    const sources = ['Geothermal', 'Hydroelectric', 'Natural gas', 'Solar'];
    const sourceOptions = sources;
    const capacitySourceOrder = ['Geothermal', 'Hydroelectric', 'Natural gas', 'Solar'];
    const atb2025SourceCitation = {
      source: 'National Laboratory of the Rockies. (2025). Data | electricity | 2025 | ATB | NLR. Nlr.Gov.',
      url: 'https://atb.nlr.gov/electricity/2025/data',
    };
    const eiaElectricitySourceCitation = {
      source: 'U.S. Energy Information Administration. (2024). EIA - electricity data. Eia.Gov.',
      url: 'https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_6_07_b',
    };
    const policySourceCitation = {
      source: 'NCSL State Energy Legislation Database.',
      url: 'https://www.ncsl.org/energy/state-energy-legislation-database',
    };
    const aman2015SourceCitation = {
      source: 'Aman, M.M, Solangi, K.H, Hossain, M.S, A., B., Jasmon, G.B, H., M., Bakar, A.H.A, & Kazi, S.N. (2015). A review of Safety, Health and Environmental (SHE) issues of solar energy system. Renewable and Sustainable Energy Reviews, 41, 1190–1204.',
      url: 'https://doi.org/10.1016/j.rser.2014.08.086',
    };
    const createKpi = config => ({
      chartType: 'bar',
      chartMode: '',
      sourceIndependent: false,
      dataBySource: {},
      rangeData: [],
      learningCurveData: [],
      explanation: 'Explanation coming soon.',
      ...config,
    });
    const kpis = [
      createKpi({
        key: 'capacity',
        name: 'Capacity Factor',
        chartLabel: 'Source utilization',
        chartType: 'capacity',
        explanation: '<strong>Why this matters:</strong> Capacity factor measures how much electricity a plant generates as a share of the maximum output it could provide.<br><strong>What the chart shows:</strong> Hydroelectricity, utility-scale solar PV, and natural gas have lower capacity factors than EGS. EIA reports a 65.9% capacity factor for geothermal overall, not EGS specifically. The National Laboratory of the Rockies sets an 80%–90% capacity-factor range benchmark for its EGS projections.',
        dataBySource: {
          Geothermal: {
            benchmark: { value: '85% (range: 80%–90%)' },
            points: [{
              label: 'EGS',
              value: 85,
              valueLabel: '85%',
              error: 5,
              sourceCitation: atb2025SourceCitation,
            }],
          },
          Hydroelectric: {
            benchmark: { value: '34.40%' },
            points: [{
              label: 'Hydro',
              value: 34.4,
              valueLabel: '34.4%',
              sourceCitation: eiaElectricitySourceCitation,
            }],
          },
          Solar: {
            benchmark: { value: '24.00%' },
            points: [{
              label: 'Solar PV',
              value: 24,
              valueLabel: '24%',
              sourceCitation: eiaElectricitySourceCitation,
            }],
          },
          'Natural gas': {
            benchmark: { value: '58.70%' },
            points: [{
              label: 'Natural Gas',
              value: 58.7,
              valueLabel: '58.7%',
              sourceCitation: eiaElectricitySourceCitation,
            }],
          },
        },
        purpose: 'Revenue potential and utilization',
        availability: 'Available annually through EIA',
        featured: true,
      }),
      createKpi({
        key: 'lcoe',
        name: 'Levelized Cost of Energy',
        chartLabel: 'LCOE ranges',
        chartType: 'range',
        explanation: '<strong>Why this matters:</strong> Levelized cost of electricity measures the average cost of generating a unit of energy over a plant’s lifetime.<br><strong>What the chart shows:</strong> LCOEs vary with initial and operating expenses. Conventional geothermal has an LCOE of $67–$111 (Lazard) and a U.S. near-field baseline LCOE of $55–$80. Top-performing EGS projects can achieve very low LCOEs, outperforming other renewables.',
        benchmarkSource: 'Selected technology',
        dataBySource: {
          Geothermal: { benchmark: { value: 'EGS · $35–$250/MWh' } },
          Hydroelectric: { benchmark: { value: 'Hydropower · $20–$190/MWh' } },
          'Natural gas': { benchmark: { value: 'Natural Gas · $51–$129/MWh' } },
          Solar: { benchmark: { value: 'Solar PV · $40–$98/MWh' } },
        },
        rangeAxisTitle: 'Levelized cost ($/MWh)',
        rangePrefix: '$',
        rangeUnit: '/MWh',
        rangeData: [
          {
            technology: 'EGS',
            source: 'Geothermal',
            lower: 35,
            upper: 250,
            sourceCitation: {
              source: 'Zayed Bin, S., & Sheng, J. J. (2026). A critical review of the techno-economic feasibility and sustainability of enhanced geothermal systems (EGS): Global insights and strategic pathways. Renewable and Sustainable Energy Reviews, 230, 116689.',
              url: 'https://doi.org/10.1016/j.rser.2025.116689',
            },
          },
          {
            technology: 'Hydropower',
            source: 'Hydroelectric',
            lower: 20,
            upper: 190,
            sourceCitation: {
              source: 'Kamil Kaygusuz, & Ebru Kolay. (2025). Levelized cost of hydropower projects for sustainable electricity generation. Journal of Engineering Research and Applied Science, 14(1), 86–94.',
              url: 'https://journaleras.com/index.php/jeras/article/view/395',
            },
          },
          {
            technology: 'Natural Gas',
            source: 'Natural gas',
            lower: 51,
            upper: 129,
            sourceCitation: {
              source: 'Lazard. (2026). Lazard’s levelized cost of energy analysis—Version 19.0. In Levelized Cost of Energy + (LCOE+).',
              url: 'https://www.lazard.com/media/kcfconhf/lazards-lcoeplus_vf.pdf',
            },
          },
          {
            technology: 'Solar PV',
            source: 'Solar',
            lower: 40,
            upper: 98,
            sourceCitation: {
              source: 'Lazard. (2026). Lazard’s levelized cost of energy analysis—Version 19.0. In Levelized Cost of Energy + (LCOE+).',
              url: 'https://www.lazard.com/media/kcfconhf/lazards-lcoeplus_vf.pdf',
            },
          },
        ],
        purpose: 'Cost competitiveness',
        availability: 'Reported as lower and upper estimates',
        featured: true,
      }),
      createKpi({
        key: 'capex',
        name: 'Capital Expenditure',
        chartLabel: '2026 projection (2025 report)',
        chartType: 'range',
        explanation: '<strong>Why this matters:</strong> Capital expenditure measures the money required to build a project and is important for investors and initial permitting.<br><strong>What the chart shows:</strong> EGS has higher initial costs than natural gas and solar projects, but costs are declining as more projects are developed.<br><strong>Cape Station (Fervo):</strong> Phase I cost was approximately US$7,000/kW; Phase II target is US$5,500/kW; the long-term target is US$3,000/kW.',
        sourceIndependent: true,
        benchmarkSource: '2025 report',
        rangeAxisTitle: 'Capital expenditure ($)',
        rangePrefix: '$',
        rangeData: [
          {
            technology: 'Enhanced geothermal systems (EGS)',
            label: 'EGS',
            source: 'Geothermal',
            lower: 8560,
            upper: 13544,
            sourceCitation: atb2025SourceCitation,
          },
          {
            technology: 'Hydropower',
            source: 'Hydroelectric',
            lower: 3834,
            upper: 17958,
            sourceCitation: atb2025SourceCitation,
          },
          {
            technology: 'Natural gas (combined cycle, no CCS)',
            label: 'Natural gas',
            source: 'Natural gas',
            lower: 1348,
            upper: 1562,
            sourceCitation: atb2025SourceCitation,
          },
          {
            technology: 'Utility-scale solar PV',
            label: 'Solar PV',
            source: 'Solar',
            lower: 1405,
            upper: 1405,
            sourceCitation: atb2025SourceCitation,
          },
        ],
        benchmark: { value: 'Overall range: $1,348–$17,958' },
        purpose: 'Upfront capital requirement',
        availability: 'Projected for 2026 based on a 2025 report',
        featured: true,
      }),
      createKpi({
        key: 'payback',
        name: 'Energy Payback Time',
        chartLabel: 'Energy payback time ranges',
        chartType: 'range',
        explanation: '<strong>Why this matters:</strong> Financial payback is project-dependent and not clearly outlined for EGS. The chart instead uses energy payback time (EPT), the years a project takes to make up the energy spent on its development.<br><strong>What the chart shows:</strong> General energy payback-time ranges by power source; EGS is not specified separately from geothermal. The cited review was published in 2015, with the underlying data believed to be from 2014. Newer technologies—especially fast-growing fields such as EGS—may have lower energy payback times.',
        sourceIndependent: true,
        benchmarkSource: '2015 peer-reviewed study',
        rangeAxisTitle: 'Energy payback time (years)',
        rangeUnit: ' years',
        rangeData: [
          {
            technology: 'Geothermal (general)',
            source: 'Geothermal',
            lower: 0.6,
            upper: 3.6,
            sourceCitation: aman2015SourceCitation,
          },
          {
            technology: 'Hydropower',
            source: 'Hydroelectric',
            lower: 0.1,
            upper: 3.5,
            sourceCitation: aman2015SourceCitation,
          },
          {
            technology: 'Natural gas',
            source: 'Natural gas',
            lower: 1.2,
            upper: 3.9,
            sourceCitation: aman2015SourceCitation,
          },
          {
            technology: 'Solar PV',
            source: 'Solar',
            lower: 0.2,
            upper: 8,
            sourceCitation: aman2015SourceCitation,
          },
        ],
        benchmark: { value: 'Overall range: 0.1–8 years' },
        purpose: 'Time to generate the energy invested in construction',
        availability: 'The cited review was published in 2015; underlying data is believed to be from 2014.',
        featured: true,
      }),
      createKpi({
        key: 'lifetime',
        name: 'Operating Lifetime',
        chartLabel: 'Lifetime by technology',
        chartType: 'bar',
        explanation: '<strong>Why this matters:</strong> Lifetime represents how long a plant can operate. This matters because operating costs are generally much lower than capital expenditures.<br><strong>What the chart shows:</strong> The chart presents lifetime estimates for various power sources. EGS is not specified separately from geothermal.',
        unit: 'years',
        yAxisTitle: 'Lifetime (years)',
        categoryOrder: ['Geothermal (general)', 'Hydro', 'Natural gas', 'PV'],
        dataBySource: {
          'Natural gas': {
            benchmark: { value: '30 years' },
            points: [{ label: 'Natural gas', value: 30, sourceCitation: aman2015SourceCitation }],
          },
          Solar: {
            benchmark: { value: '25 years' },
            points: [{ label: 'PV', value: 25, sourceCitation: aman2015SourceCitation }],
          },
          Hydroelectric: {
            benchmark: { value: '70 years' },
            points: [{ label: 'Hydro', value: 70, sourceCitation: aman2015SourceCitation }],
          },
          Geothermal: {
            benchmark: { value: '30 years' },
            points: [{
              label: 'Geothermal (general)',
              value: 30,
              sourceCitation: aman2015SourceCitation,
            }],
          },
        },
        purpose: 'Revenue potential over the asset life',
        availability: 'Geothermal lifetime is a general estimate that also applies to EGS.',
        featured: true,
      }),
      createKpi({
        key: 'funding',
        name: 'Resource & Funding Allocation',
        chartLabel: '2024 EIA federal support ($M)',
        chartType: 'stacked',
        explanation: '<strong>Why this matters:</strong> Government spending is one of many possible funding measures and offers a comparable, evaluable basis across energy sources.<br><strong>What the chart shows:</strong> Geothermal federal support is lower than natural gas and petroleum, but higher than hydropower. EGS is not reported separately.<br><strong>2026 DOE announcement:</strong> More than <strong>$99 million</strong> was announced for 21 geothermal projects selected for award negotiations, five of which focused on EGS field tests.',
        dataBySource: {
          Geothermal: { benchmark: { value: 'Total: $353M · R&D: $45M' } },
          'Natural gas': { benchmark: { value: 'Total: $2,304M · R&D: $121M' } },
          Solar: { benchmark: { value: 'Total: $7,522M · R&D: $94M' } },
          Hydroelectric: { benchmark: { value: 'Total: $41M · R&D: $31M' } },
        },
        stackedData: [
          {
            source: 'Geothermal',
            label: 'Geothermal (all types)',
            total: 353,
            subset: 45,
            sourceCitation: eiaElectricitySourceCitation,
          },
          {
            source: 'Hydroelectric',
            label: 'Hydropower',
            total: 41,
            subset: 31,
            sourceCitation: eiaElectricitySourceCitation,
          },
          {
            source: 'Natural gas',
            label: 'Natural gas + petroleum liquids',
            total: 2304,
            subset: 121,
            sourceCitation: eiaElectricitySourceCitation,
          },
          {
            source: 'Solar',
            label: 'Solar',
            total: 7522,
            subset: 94,
            sourceCitation: eiaElectricitySourceCitation,
          },
        ],
        stackedAxisTitle: 'Federal support ($M)',
        stackedUnit: '$M',
        stackedRemainderLabel: 'Other federal support',
        stackedSubsetLabel: 'R&D investment',
        stackedTotalLabel: 'Total federal support',
        purpose: 'Total federal support and research & development investment',
        availability: '2024 EIA data',
        featured: true,
      }),
      createKpi({
        key: 'policy',
        name: 'Policy Support',
        chartLabel: 'State Energy Legislation',
        chartType: 'stacked',
        explanation: '<strong>Why this matters:</strong> Policy influences permitting speeds, tax rebates, funding, and other conditions for energy development.<br><strong>What the chart shows:</strong> Counts 2026 state-level policies by power source. Five enacted bills can relate to EGS. Geothermal has more proposed and enacted bills than hydropower, but remains behind solar and natural gas.',
        unit: 'bills',
        benchmarkSource: 'Selected technology',
        dataBySource: {
          Geothermal: {
            sourceLabel: 'EGS',
            benchmark: { value: 'EGS · Proposed: 32 · Enacted: 5' },
            points: [
              { label: 'Proposed', value: 32 },
              { label: 'Enacted', value: 5 },
            ],
          },
          Solar: {
            sourceLabel: 'Solar',
            benchmark: { value: 'Solar · Proposed: 603 · Enacted: 68' },
            points: [
              { label: 'Proposed', value: 603 },
              { label: 'Enacted', value: 68 },
            ],
          },
          'Natural gas': {
            sourceLabel: 'NG',
            benchmark: { value: 'NG · Proposed: 145 · Enacted: 15' },
            points: [
              { label: 'Proposed', value: 145 },
              { label: 'Enacted', value: 15 },
            ],
          },
          Hydroelectric: {
            sourceLabel: 'Hydro',
            benchmark: { value: 'Hydro · Proposed: 24 · Enacted: 3' },
            points: [
              { label: 'Proposed', value: 24 },
              { label: 'Enacted', value: 3 },
            ],
          },
        },
        stackedData: [
          {
            source: 'Geothermal',
            label: 'EGS',
            total: 32,
            subset: 5,
            sourceCitation: policySourceCitation,
          },
          {
            source: 'Hydroelectric',
            label: 'Hydropower',
            total: 24,
            subset: 3,
            sourceCitation: policySourceCitation,
          },
          {
            source: 'Natural gas',
            label: 'NG',
            total: 145,
            subset: 15,
            sourceCitation: policySourceCitation,
          },
          {
            source: 'Solar',
            label: 'Solar',
            total: 603,
            subset: 68,
            sourceCitation: policySourceCitation,
          },
        ],
        stackedAxisTitle: 'Number of bills',
        stackedUnit: 'bills',
        stackedRemainderLabel: 'Proposed, not enacted',
        stackedSubsetLabel: 'Enacted',
        stackedTotalLabel: 'Proposed total',
        purpose: 'State energy legislation activity',
        availability: 'Legislative records are public but fragmented',
      }),
      createKpi({
        key: 'learning-curve',
        name: 'PV Energy Learning Curve',
        chartLabel: 'Historical global PV · 2010–2023',
        chartType: 'learningCurve',
        sourceIndependent: true,
        benchmarkSource: 'Global PV',
        benchmark: { value: '2023: 1,417,124 MW · $44/MWh' },
        learningCurveData: [
          { year: 2010, capacity: 40222, lcoe: 460 },
          { year: 2011, capacity: 70954, lcoe: 343 },
          { year: 2012, capacity: 100249, lcoe: 256 },
          { year: 2013, capacity: 135745, lcoe: 197 },
          { year: 2014, capacity: 174249, lcoe: 177 },
          { year: 2015, capacity: 221748, lcoe: 132 },
          { year: 2016, capacity: 293547, lcoe: 116 },
          { year: 2017, capacity: 387273, lcoe: 91 },
          { year: 2018, capacity: 482035, lcoe: 77 },
          { year: 2019, capacity: 583752, lcoe: 67 },
          { year: 2020, capacity: 714816, lcoe: 60 },
          { year: 2021, capacity: 859555, lcoe: 52 },
          { year: 2022, capacity: 1051304, lcoe: 50 },
          { year: 2023, capacity: 1417124, lcoe: 44 },
        ],
        chartNote: 'The supplied data covers the historical PV curve; no EGS comparison values were included.',
        purpose: 'LCOE decline as cumulative PV capacity grows',
        availability: 'Historical data supplied for 2010–2023',
        featured: true,
      }),
      createKpi({
        key: 'sentiment',
        name: 'Stakeholder Sentiment',
        chartType: 'sentiment',
        explanation: '<strong>Why this matters:</strong> Public sentiment toward electricity sources helps identify concerns, inform policy initiatives, and guide development and investment, especially at location-dependent sites.<br><strong>What the chart shows:</strong> Geothermal is generally viewed favorably, though less so than solar and hydropower. The 72% figure includes conventional geothermal. A separate American EGS study reported +1.16 on a −3 to +3 scale; it cannot be converted to a comparable percentage, but suggests a generally positive view.<br><strong>EGS-specific study:</strong> Balog-Way, D., McComas, K., Lambert, C., Cousse, J., &amp; Trutnevyte, E. (2026). Public perceptions of enhanced geothermal systems: A cross-national study on affective imagery, familiarity, and support. <em>Energy Policy, 208</em>, 114917. <a href="https://doi.org/10.1016/j.enpol.2025.114917" target="_blank" rel="noopener">https://doi.org/10.1016/j.enpol.2025.114917</a>',
        benchmarkSource: 'Selected technology',
        dataBySource: {
          Geothermal: { benchmark: { value: '72% in favour' } },
          'Natural gas': { benchmark: { value: '38% in favour' } },
          Solar: { benchmark: { value: '83% in favour' } },
          Hydroelectric: { benchmark: { value: '80% in favour' } },
        },
        sentimentData: [
          {
            source: 'Geothermal',
            technology: 'Geothermal (general)',
            share: 72,
            sourceCitation: {
              source: 'Fraser, C. (2025). Voters support geothermal and nuclear energy development over fossil fuels.',
              url: 'https://www.filesforprogress.org/reports/dfp_nuclear_geothermal_report.pdf',
            },
          },
          { source: 'Hydroelectric', technology: 'Hydropower', share: 80 },
          {
            source: 'Natural gas',
            technology: 'Natural gas',
            share: 38,
            sourceCitation: {
              source: 'Krosnick, J., & Macinnis, B. (2024). American understanding of climate change.',
              url: 'https://media.rff.org/documents/Report_24-11.pdf',
            },
          },
          { source: 'Solar', technology: 'Solar', share: 83 },
        ],
        purpose: 'Public and local stakeholder support',
        availability: 'Survey data is available periodically',
      }),
    ];

    let selectedSource = sources[0];
    let themePromise;
    let renderVersion = 0;
    const chartClickHandlers = new WeakMap();

    container.innerHTML = `
      <div class="power-comparison-page">
        <section class="power-comparison-egs-placeholder" aria-labelledby="power-comparison-egs-title">
          <h2 id="power-comparison-egs-title">Geothermal vs. EGS</h2>
          <div class="power-comparison-egs-placeholder-grid">
            <div class="power-comparison-egs-placeholder-column"><strong>Geothermal</strong></div>
            <div class="power-comparison-egs-placeholder-column"><strong>EGS</strong></div>
          </div>
        </section>

        <div class="power-comparison-heading">
          <div>
            <p class="power-comparison-eyebrow">ENERGY TECHNOLOGY BENCHMARKS</p>
            <p class="power-comparison-intro">Compare financial, technical and policy indicators across energy technologies.</p>
          </div>
          <button class="power-comparison-export" type="button">Export</button>
        </div>

        <section class="power-comparison-snapshot" aria-labelledby="power-snapshot-title">
          <div class="power-comparison-source-filter" role="group" aria-label="Filter by energy source">
            ${sourceOptions.map(source => `
              <button
                class="power-comparison-source-button ${source === selectedSource ? 'active' : ''}"
                type="button"
                data-source="${source}"
                aria-pressed="${source === selectedSource}"
              ><strong>${source}</strong></button>`).join('')}
          </div>

          <div class="power-comparison-section-head">
            <div>
              <p class="power-comparison-eyebrow">INVESTOR OVERVIEW</p>
              <h2 id="power-snapshot-title">Major KPI snapshots</h2>
            </div>
            <span>Important metrics for investors: at a glance</span>
          </div>

          <div class="power-comparison-charts">
            ${kpis.map(kpi => `
              <article class="power-comparison-chart-card ${kpi.key === 'lcoe' ? 'power-comparison-lcoe' : ''} ${kpi.featured ? '' : 'power-comparison-kpi-card'}" data-kpi="${kpi.key}">
                <div class="power-comparison-chart-head">
                  <div>
                    <p>${kpi.chartLabel || 'KPI comparison'}</p>
                    <div class="power-comparison-chart-title">
                      <h3>${kpi.name}</h3>
                      <span class="power-comparison-info-wrap">
                        <button class="power-comparison-info-button" type="button" aria-label="More about ${kpi.name}" aria-describedby="power-kpi-explanation-${kpi.key}">ⓘ</button>
                        <span class="power-comparison-info-tooltip" id="power-kpi-explanation-${kpi.key}" role="tooltip">${kpi.explanation}</span>
                      </span>
                    </div>
                  </div>
                </div>
                ${kpi.key === 'capacity' ? `
                  <div class="power-comparison-transmission" aria-hidden="true">
                    <svg viewBox="0 0 240 56" preserveAspectRatio="xMidYMid meet">
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2">
                        <path d="M0 13 C42 23 75 22 118 14 S194 9 240 19" />
                        <path d="M0 25 C44 33 77 32 118 25 S194 20 240 30" />
                        <path d="M0 38 C45 44 79 42 118 36 S192 32 240 41" />
                        <path d="M108 54 116 7 H124 L132 54 M104 19 H136 M106 31 H134 M108 43 H132" />
                        <path d="M116 19 128 31 112 43 128 54 M124 19 112 31 128 43 112 54" />
                        <path d="M0 54 H240" />
                      </g>
                    </svg>
                  </div>` : ''}
                <div
                  id="power-kpi-chart-${kpi.key}"
                  class="power-comparison-chart ${kpi.chartType === 'range' ? 'power-comparison-range-chart' : ''} ${kpi.key === 'capex' ? 'power-comparison-capex-chart' : ''} ${kpi.key === 'payback' ? 'power-comparison-payback-chart' : ''} ${kpi.key === 'capacity' ? 'power-comparison-capacity-chart' : ''} ${kpi.key === 'sentiment' ? 'power-comparison-sentiment-chart' : ''} ${kpi.key === 'funding' ? 'power-comparison-funding-chart' : ''} ${kpi.key === 'policy' ? 'power-comparison-policy-chart' : ''} ${kpi.key === 'learning-curve' ? 'power-comparison-learning-curve-chart' : ''} ${kpi.featured ? '' : 'power-comparison-kpi-chart'}"
                  data-chart-type="${kpi.chartType}"
                  data-chart-mode="${kpi.chartMode}"
                  role="img"
                ></div>
                ${kpi.chartNote ? `<p class="power-comparison-chart-note">${kpi.chartNote}</p>` : ''}
                <div class="power-comparison-kpi-detail"><small>BENCHMARK · <span data-benchmark-source="${kpi.key}"></span></small><strong data-benchmark-value="${kpi.key}"></strong></div>
                <div class="power-comparison-kpi-detail">${kpi.purpose}</div>
              </article>`).join('')}
          </div>
        </section>
        <dialog class="power-comparison-source-dialog" aria-labelledby="power-source-dialog-title">
          <button class="power-comparison-source-dialog-close" type="button" aria-label="Close source details">×</button>
          <p class="power-comparison-eyebrow">DATA SOURCE</p>
          <h2 id="power-source-dialog-title">Source for selected data point</h2>
          <dl>
            <dt>Data point</dt>
            <dd data-source-dialog-point></dd>
            <dt>Source</dt>
            <dd data-source-dialog-citation>Source details will be added when provided.</dd>
          </dl>
          <a data-source-dialog-link target="_blank" rel="noopener" hidden>Open source</a>
          <p class="power-comparison-source-dialog-note" data-source-dialog-note></p>
        </dialog>
      </div>`;

    const sourceDialog = container.querySelector('.power-comparison-source-dialog');
    const sourceDialogPoint = sourceDialog.querySelector('[data-source-dialog-point]');
    const sourceDialogCitation = sourceDialog.querySelector('[data-source-dialog-citation]');
    const sourceDialogLink = sourceDialog.querySelector('[data-source-dialog-link]');
    const sourceDialogNote = sourceDialog.querySelector('[data-source-dialog-note]');

    sourceDialog.querySelector('.power-comparison-source-dialog-close')
      .addEventListener('click', () => sourceDialog.close());
    sourceDialog.addEventListener('click', event => {
      if (event.target === sourceDialog) sourceDialog.close();
    });

    function getChartTheme() {
      return typeof ChartTheme === 'undefined' ? null : ChartTheme;
    }

    function getVisiblePoints(kpi) {
      const sourceNames = kpi.sourceIndependent
        ? ['Source-independent']
        : sources;

      return sourceNames.flatMap(source => {
        const sourceData = kpi.dataBySource[source];
        return (sourceData && Array.isArray(sourceData.points))
          ? sourceData.points.map(point => ({
              ...point,
              source,
              sourceLabel: sourceData.sourceLabel || source,
            }))
          : [];
      });
    }

    function formatBenchmark(kpi, points) {
      if (kpi.sourceIndependent) {
        return kpi.benchmark
          ? `${kpi.benchmark.value}${kpi.benchmark.unit ? ` ${kpi.benchmark.unit}` : ''}`
          : 'Awaiting data.';
      }

      const sourceData = kpi.dataBySource[selectedSource];
      if (!sourceData) return 'No data available.';
      if (sourceData.benchmark) {
        return `${sourceData.benchmark.value}${sourceData.benchmark.unit ? ` ${sourceData.benchmark.unit}` : ''}`;
      }

      const latestPoint = points[points.length - 1];
      return latestPoint
        ? `${latestPoint.value}${kpi.unit ? ` ${kpi.unit}` : ''}`
        : 'No data available.';
    }

    function formatClickedDataPoint(kpi, point) {
      if (kpi.chartType === 'range') {
        const range = kpi.rangeData[point.curveNumber];
        if (!range) return `${point.y}: ${point.x}`;
        const prefix = kpi.rangePrefix || '';
        const lower = `${prefix}${range.lower.toLocaleString('en-US')}`;
        const upper = `${prefix}${range.upper.toLocaleString('en-US')}`;
        const value = range.lower === range.upper ? lower : `${lower}–${upper}`;
        return `${range.label || range.technology} · ${value}${kpi.rangeUnit || ''}`;
      }

      if (kpi.chartType === 'learningCurve') {
        const data = kpi.learningCurveData[point.pointNumber];
        return `${data.year} · ${data.capacity.toLocaleString('en-US')} MW · $${data.lcoe}/MWh`;
      }

      if (kpi.chartType === 'capacity') {
        const data = getVisiblePoints(kpi).sort((a, b) => (
          capacitySourceOrder.indexOf(a.source) - capacitySourceOrder.indexOf(b.source)
        ))[point.pointNumber];
        return data ? `${data.label} · ${data.valueLabel}` : `${point.x}: ${point.y}`;
      }

      if (kpi.chartType === 'sentiment') {
        const data = kpi.sentimentData[point.curveNumber];
        return `${data.technology} · ${point.label}: ${point.value}%`;
      }

      if (kpi.chartType === 'stacked') {
        const data = kpi.stackedData[point.pointNumber];
        const value = Number(point.x).toLocaleString('en-US');
        const formattedValue = kpi.stackedUnit === '$M' ? `$${value}M` : `${value} bills`;
        return `${data.label} · ${point.data.name}: ${formattedValue}`;
      }

      if (kpi.chartType === 'bar') {
        return `${point.data.name} · ${point.x}: ${point.y}${kpi.unit ? ` ${kpi.unit}` : ''}`;
      }

      return `${point.data.name || kpi.name} · ${point.x}: ${point.y}`;
    }

    function showSourceDialog(kpi, point) {
      const citation = Array.isArray(point.customdata)
        ? point.customdata.length > 1
          ? point.customdata[1]
          : point.customdata[0]
        : point.customdata;
      sourceDialogPoint.textContent = formatClickedDataPoint(kpi, point);
      sourceDialogCitation.textContent = typeof citation === 'string'
        ? citation
        : citation && (citation.source || citation.title)
          ? citation.source || citation.title
          : 'Source details will be added when provided.';
      sourceDialogNote.textContent = citation && typeof citation === 'object'
        ? citation.note || ''
        : '';
      sourceDialogLink.hidden = true;
      sourceDialogLink.removeAttribute('href');

      if (citation && typeof citation === 'object' && typeof citation.url === 'string'
        && /^https?:\/\//i.test(citation.url)) {
        sourceDialogLink.href = citation.url;
        sourceDialogLink.hidden = false;
      }

      if (!sourceDialog.open) sourceDialog.showModal();
    }

    function bindSourcePointClick(element, kpi) {
      const previousHandler = chartClickHandlers.get(element);
      if (previousHandler && typeof element.removeListener === 'function') {
        element.removeListener('plotly_click', previousHandler);
      }

      const handler = eventData => {
        const point = eventData && eventData.points && eventData.points[0];
        if (point) showSourceDialog(kpi, point);
      };

      element.on('plotly_click', handler);
      chartClickHandlers.set(element, handler);
    }

    function createRangeTraces(kpi, theme) {
      return kpi.rangeData.map(range => {
        const color = range.source === selectedSource ? theme.colors.cobalt : theme.colors.cadet;
        const prefix = kpi.rangePrefix || '';
        const lower = `${prefix}${range.lower.toLocaleString('en-US')}`;
        const upper = `${prefix}${range.upper.toLocaleString('en-US')}`;
        const isSingleValue = range.lower === range.upper;
        return {
          type: 'scatter',
          mode: 'lines+markers+text',
          name: range.technology,
          x: [range.lower, range.upper],
          y: [range.label || range.technology, range.label || range.technology],
          text: isSingleValue ? [lower, ''] : [lower, upper],
          textposition: ['bottom center', 'top center'],
          textfont: { size: kpi.key === 'lcoe' ? 9 : 10 },
          line: { color, width: 5 },
          marker: { color, size: 7 },
          customdata: [range.sourceCitation || null, range.sourceCitation || null],
          hovertemplate: `<b>${range.technology}</b><br>${isSingleValue ? 'Value' : 'Range'}: ${isSingleValue ? lower : `${lower}–${upper}`}${kpi.rangeUnit || ''}<extra></extra>`,
        };
      });
    }

    function createLearningCurveTraces(kpi, theme) {
      const color = selectedSource === 'Solar' ? theme.colors.cobalt : theme.colors.cadet;
      return [{
        type: 'scatter',
        mode: 'lines+markers+text',
        name: 'Historical global PV',
        x: kpi.learningCurveData.map(point => point.capacity),
        y: kpi.learningCurveData.map(point => point.lcoe),
        text: kpi.learningCurveData.map(point => String(point.year)),
        textposition: kpi.learningCurveData.map((_, index) => (
          index % 2 ? 'bottom center' : 'top center'
        )),
        customdata: kpi.learningCurveData.map(point => point.sourceCitation || null),
        textfont: { size: 9, color },
        line: { color, width: 2 },
        marker: { color, size: 6 },
        hovertemplate: '<b>%{text}</b><br>Cumulative capacity: %{x:,.0f} MW<br>LCOE: $%{y:,.0f}/MWh<extra></extra>',
      }];
    }

    function createCapacityTraces(points, theme) {
      const orderedPoints = points.slice().sort((a, b) => (
        capacitySourceOrder.indexOf(a.source) - capacitySourceOrder.indexOf(b.source)
      ));
      const egsSource = orderedPoints.find(point => point.error);
      const colors = orderedPoints.map(point => (
        point.source === selectedSource ? theme.colors.cobalt : theme.colors.cadet
      ));
      return [{
        type: 'bar',
        name: 'Capacity factor',
        x: orderedPoints.map(point => point.label),
        y: orderedPoints.map(point => point.value),
        text: orderedPoints.map(point => point.valueLabel),
        textposition: 'outside',
        cliponaxis: false,
        marker: { color: colors },
        customdata: orderedPoints.map(point => point.sourceCitation || null),
        error_y: {
          type: 'data',
          array: orderedPoints.map(point => point.error || 0),
          visible: true,
          color: egsSource && egsSource.source === selectedSource
            ? theme.colors.cobalt
            : theme.colors.cadet,
          thickness: 1,
          width: 4,
        },
        hovertemplate: '<b>%{x}</b><br>Capacity factor: %{y:.1f}%<extra></extra>',
      }];
    }

    function createSentimentChart(kpi, theme) {
      const domains = [
        { x: [0.015, 0.235], y: [0.18, 0.82], titleX: 0.125, titleY: 0.95 },
        { x: [0.265, 0.485], y: [0.18, 0.82], titleX: 0.375, titleY: 0.95 },
        { x: [0.515, 0.735], y: [0.18, 0.82], titleX: 0.625, titleY: 0.95 },
        { x: [0.765, 0.985], y: [0.18, 0.82], titleX: 0.875, titleY: 0.95 },
      ];

      return {
        traces: kpi.sentimentData.map((item, index) => ({
          type: 'pie',
          name: item.technology,
          labels: ['In favour', 'Other responses'],
          values: [item.share, 100 - item.share],
          sort: item.source !== 'Natural gas',
          direction: item.source === 'Natural gas' ? 'clockwise' : 'counterclockwise',
          customdata: [item.sourceCitation || null, item.sourceCitation || null],
          domain: { x: domains[index].x, y: domains[index].y },
          textinfo: 'percent',
          textposition: 'inside',
          textfont: { size: 10 },
          marker: {
            colors: [
              item.source === selectedSource ? theme.colors.cobalt : theme.colors.cadet,
              theme.colors.gridline,
            ],
            line: { color: '#ffffff', width: 1 },
          },
          hovertemplate: `<b>${item.technology}</b><br>%{label}: %{value}%<extra></extra>`,
        })),
        annotations: kpi.sentimentData.map((item, index) => ({
          x: domains[index].titleX,
          y: domains[index].titleY,
          xref: 'paper',
          yref: 'paper',
          xanchor: 'center',
          text: `${item.technology.replace(' (general)', '')}<br><b>${item.share}% in favour</b>`,
          showarrow: false,
          align: 'center',
          font: {
            size: 9,
            color: item.source === selectedSource ? theme.colors.cobalt : theme.colors.chathams,
          },
        })),
      };
    }

    function createStackedTraces(kpi, theme) {
      const isCurrency = kpi.stackedUnit === '$M';
      const subsetLabel = kpi.stackedSubsetLabel || 'R&D investment';
      const remainderLabel = kpi.stackedRemainderLabel || 'Other federal support';
      const totalLabel = kpi.stackedTotalLabel || 'Total federal support';
      const valueTemplate = isCurrency ? '$%{x:,.0f}M' : '%{x:,.0f} bills';
      const totalTemplate = isCurrency ? '$%{customdata[0]:,.0f}M' : '%{customdata[0]:,.0f} bills';

      function getSeriesColors(isSubset) {
        return kpi.stackedData.map(item => {
          if (item.source === selectedSource) {
            return isSubset ? theme.colors.sky : theme.colors.cobalt;
          }
          return isSubset ? theme.colors.gridline : theme.colors.cadet;
        });
      }

      return [
        {
          type: 'bar',
          orientation: 'h',
          name: remainderLabel,
          x: kpi.stackedData.map(item => item.total - item.subset),
          y: kpi.stackedData.map(item => item.label),
          customdata: kpi.stackedData.map(item => [item.total, item.sourceCitation || null]),
          marker: { color: getSeriesColors(false) },
          hovertemplate: `<b>%{y}</b><br>${remainderLabel}: ${valueTemplate}<br>${totalLabel}: ${totalTemplate}<extra></extra>`,
        },
        {
          type: 'bar',
          orientation: 'h',
          name: subsetLabel,
          x: kpi.stackedData.map(item => item.subset),
          y: kpi.stackedData.map(item => item.label),
          customdata: kpi.stackedData.map(item => [item.total, item.sourceCitation || null]),
          marker: { color: getSeriesColors(true) },
          hovertemplate: `<b>%{y}</b><br>${subsetLabel}: ${valueTemplate}<br>${totalLabel}: ${totalTemplate}<extra></extra>`,
        },
      ];
    }

    function createTraces(kpi, points, theme) {
      if (kpi.chartType === 'learningCurve') {
        return createLearningCurveTraces(kpi, theme);
      }

      if (kpi.chartType === 'capacity') {
        return createCapacityTraces(points, theme);
      }

      if (kpi.chartType === 'stacked') {
        return createStackedTraces(kpi, theme);
      }

      if (kpi.chartType === 'range') {
        return createRangeTraces(kpi, theme);
      }

      const groups = sources
        .map(source => ({
          source,
          points: points.filter(point => point.source === source),
        }))
        .filter(group => group.points.length);

      return groups.map(group => {
        const color = group.source === selectedSource ? theme.colors.cobalt : theme.colors.cadet;
        const sourceLabel = group.points[0].sourceLabel || group.source;
        if (kpi.chartType === 'scatter' && kpi.chartMode === 'lines+markers') {
          return {
            type: 'scatter',
            mode: 'lines+markers',
            name: group.source,
            x: group.points.map(point => point.date || point.label),
            y: group.points.map(point => point.value),
            customdata: group.points.map(point => point.sourceCitation || null),
            line: { color },
            marker: { color },
            hovertemplate: `<b>${group.source}</b><br>%{x}: %{y}${kpi.unit ? ` ${kpi.unit}` : ''}<extra></extra>`,
          };
        }

        if (kpi.chartType === 'scatter') {
          return {
            type: 'scatter',
            mode: 'markers',
            name: group.source,
            x: group.points.map(point => point.value),
            y: group.points.map(point => point.label || group.source),
            customdata: group.points.map(point => point.sourceCitation || null),
            marker: { color },
            hovertemplate: `<b>${group.source}</b><br>%{x}${kpi.unit ? ` ${kpi.unit}` : ''}<extra></extra>`,
          };
        }

        return {
          type: 'bar',
          name: sourceLabel,
          x: group.points.map(point => point.label || group.source),
          y: group.points.map(point => point.value),
          customdata: group.points.map(point => point.sourceCitation || null),
          text: group.points.map(point => `${point.value}${kpi.unit ? ` ${kpi.unit}` : ''}`),
          textposition: 'outside',
          cliponaxis: false,
          marker: { color },
          hovertemplate: `<b>${sourceLabel}</b><br>%{x}: %{y}${kpi.unit ? ` ${kpi.unit}` : ''}<extra></extra>`,
        };
      });
    }

    function renderKpiCharts() {
      const version = ++renderVersion;
      const charts = kpis.map(kpi => ({
        kpi,
        element: container.querySelector(`#power-kpi-chart-${kpi.key}`),
        points: getVisiblePoints(kpi),
        hasRangeData: kpi.rangeData.length > 0,
        hasSentimentData: Array.isArray(kpi.sentimentData) && kpi.sentimentData.length > 0,
        hasStackedData: Array.isArray(kpi.stackedData) && kpi.stackedData.length > 0,
        hasLearningCurveData: kpi.learningCurveData.length > 0,
      }));
      const chartsWithData = charts.filter(chart => (
        chart.points.length || chart.hasRangeData || chart.hasSentimentData
        || chart.hasStackedData || chart.hasLearningCurveData
      ));

      charts.forEach(({ kpi, element, points, hasRangeData, hasSentimentData, hasStackedData, hasLearningCurveData }) => {
        const sourceLabel = element.parentElement.querySelector(`[data-benchmark-source="${kpi.key}"]`);
        const benchmarkValue = element.parentElement.querySelector(`[data-benchmark-value="${kpi.key}"]`);
        sourceLabel.textContent = hasRangeData
          ? kpi.benchmarkSource || 'Technology ranges'
          : kpi.benchmarkSource || (kpi.sourceIndependent ? 'Source-independent' : selectedSource);
        benchmarkValue.textContent = formatBenchmark(kpi, points);
        element.setAttribute('aria-label', `${kpi.name} chart for ${sourceLabel.textContent}`);

        if (!points.length && !hasRangeData && !hasSentimentData && !hasStackedData && !hasLearningCurveData) {
          if (element.classList.contains('js-plotly-plot') && typeof Plotly !== 'undefined') {
            Plotly.purge(element);
          }
          element.textContent = kpi.sourceIndependent
            ? 'Awaiting data.'
            : `No data available for ${selectedSource}`;
        }
      });

      if (!chartsWithData.length) return;

      function drawCharts(theme) {
        if (version !== renderVersion) return;
        if (typeof Plotly === 'undefined') {
          console.error('Industry comparison charts could not load Plotly.');
          return;
        }

        chartsWithData.forEach(({ kpi, element, points }) => {
          const sentimentChart = kpi.chartType === 'sentiment'
            ? createSentimentChart(kpi, theme)
            : null;
          const traces = sentimentChart
            ? sentimentChart.traces
            : createTraces(kpi, points, theme);
          const layout = {
            margin: kpi.chartType === 'capacity'
              ? { t: 24, r: 18, b: 54, l: 60 }
              : kpi.chartType === 'learningCurve'
                ? { t: 24, r: 24, b: 68, l: 66 }
                : kpi.chartType === 'sentiment'
                  ? { t: 28, r: 12, b: 12, l: 12 }
              : kpi.chartType === 'range'
                ? { t: 24, r: 18, b: 68, l: 80 }
                : kpi.chartType === 'stacked'
                    ? { t: 16, r: 20, b: 72, l: kpi.key === 'policy' ? 80 : 175 }
                : { t: 18, r: 14, b: 48, l: 58 },
              showlegend: kpi.chartType === 'stacked',
              barmode: kpi.chartType === 'stacked' ? 'stack' : undefined,
            bargap: kpi.chartType === 'capacity' ? 0.6 : undefined,
            annotations: sentimentChart ? sentimentChart.annotations : undefined,
            xaxis: kpi.chartType === 'learningCurve'
              ? {
                    type: 'log',
                    title: { text: 'Cumulative Capacity (MW)', font: { size: 11 } },
                    range: [Math.log10(35000), Math.log10(1500000)],
                    tickmode: 'array',
                    tickvals: [50000, 100000, 500000, 1000000],
                    ticktext: ['50,000', '100,000', '500,000', '1,000,000'],
                    tickfont: { size: 10 },
                }
              : kpi.chartType === 'range'
              ? {
                    title: { text: kpi.rangeAxisTitle, font: { size: 11 } },
                  range: [0, Math.max(...kpi.rangeData.map(range => range.upper)) * 1.1],
                  tickprefix: kpi.rangePrefix || '',
                  tickfont: { size: 10 },
                }
              : kpi.chartType === 'capacity'
                ? { type: 'category', automargin: true }
                : kpi.chartType === 'stacked'
                      ? {
                          title: { text: kpi.stackedAxisTitle || 'Federal support ($M)', font: { size: 11 } },
                          tickprefix: kpi.stackedUnit === '$M' ? '$' : undefined,
                        }
                : kpi.categoryOrder
                  ? { type: 'category', categoryorder: 'array', categoryarray: kpi.categoryOrder, automargin: true }
              : kpi.chartType === 'scatter' && kpi.chartMode === 'markers'
                ? { title: kpi.unit ? { text: kpi.unit, font: { size: 11 } } : undefined }
                : {},
            yaxis: kpi.chartType === 'learningCurve'
              ? {
                  type: 'log',
                  title: { text: 'LCOE (USD/MWh)', font: { size: 11 } },
                  range: [Math.log10(35), Math.log10(600)],
                  tickmode: 'array',
                  tickvals: [40, 60, 80, 100, 200, 400, 600],
                  ticktext: ['40', '60', '80', '100', '200', '400', '600'],
                  tickfont: { size: 10 },
                }
              : kpi.chartType === 'range'
              ? {
                  type: 'category',
                  categoryorder: 'array',
                  categoryarray: kpi.rangeData.map(range => range.label || range.technology),
                  autorange: 'reversed',
                  automargin: true,
                }
              : kpi.chartType === 'capacity'
                ? {
                    range: [100, 0],
                    dtick: 20,
                    ticksuffix: '%',
                    title: { text: 'Capacity factor (%)', font: { size: 11 } },
                    automargin: true,
                  }
              : kpi.chartType === 'stacked'
                ? {
                    type: 'category',
                    categoryorder: 'array',
                    categoryarray: kpi.stackedData.map(item => item.label),
                    autorange: 'reversed',
                    automargin: true,
                  }
              : kpi.yAxisTitle
                ? {
                    title: { text: kpi.yAxisTitle, font: { size: 11 } },
                    range: [0, Math.max(...points.map(point => point.value)) * 1.15],
                    rangemode: 'tozero',
                    automargin: true,
                  }
              : kpi.chartType === 'scatter' && kpi.chartMode === 'markers'
                ? { type: 'category', automargin: true }
                : {},
          };

          theme.plot(element, traces, layout, { displayModeBar: false })
            .then(() => {
              if (version === renderVersion) bindSourcePointClick(element, kpi);
            })
            .catch(error => console.error(`Chart rendering failed for ${kpi.name}:`, error));
        });
      }

      if (getChartTheme()) {
        drawCharts(getChartTheme());
        return;
      }

      if (!themePromise) {
        themePromise = new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'js/chart-theme.js';
          script.onload = () => {
            const theme = getChartTheme();
            if (theme) resolve(theme);
            else reject(new Error('ChartTheme did not initialize.'));
          };
          script.onerror = () => reject(new Error('Could not load ChartTheme.'));
          document.head.appendChild(script);
        });
      }

      themePromise.then(drawCharts).catch(error => {
        console.error('Industry comparison charts could not load ChartTheme:', error);
      });
    }

    container.querySelectorAll('.power-comparison-source-button').forEach(button => {
      button.addEventListener('click', () => {
        selectedSource = button.dataset.source;
        container.querySelectorAll('.power-comparison-source-button').forEach(option => {
          const selected = option === button;
          option.classList.toggle('active', selected);
          option.setAttribute('aria-pressed', String(selected));
        });
        renderKpiCharts();
      });
    });

    renderKpiCharts();
    container.querySelector('.power-comparison-export').addEventListener('click', () => window.print());
  },
});
