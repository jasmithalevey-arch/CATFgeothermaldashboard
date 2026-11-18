Dashboard.registerTab({
  id: 'project-map',
  label: 'Project Map',
  title: 'US Geothermal Project Tracker',
  render(container) {
    container.innerHTML = `
      <div class="project-map-shell">
        <div id="project-map-chart" class="project-map-chart" role="img" aria-label="Map of United States geothermal projects"></div>
        <aside class="project-map-sidebar" aria-label="Map layers">
          <button class="project-map-sidebar-toggle" type="button" aria-expanded="true" aria-label="Collapse map layers">
            <span class="project-map-sidebar-chevron" aria-hidden="true">&#8249;</span>
          </button>
          <div class="project-map-sidebar-content">
            <h2>
              <button class="project-map-section-toggle" type="button" aria-expanded="true" aria-label="Collapse Map layers">
                <span>Map layers</span>
                <span class="project-map-section-chevron" aria-hidden="true">&#8963;</span>
              </button>
            </h2>
            <section class="project-map-layer-section" aria-label="State concentration map layer">
              <label class="project-map-layer-row">
                <span>
                  <strong><i class="project-map-layer-dot"></i>State concentration</strong>
                  <small>Projects Per State</small>
                </span>
                <input id="state-concentration-toggle" type="checkbox" checked>
                <span class="project-map-switch" aria-hidden="true"></span>
              </label>
              <div class="project-map-concentration-legend" aria-label="State concentration range">
                <div><i style="background:#eeeeee"></i><span>No data</span></div>
                <div><i style="background:#abb8c3"></i><span>1</span></div>
                <div><i style="background:#94a8b8"></i><span>2-3</span></div>
                <div><i style="background:#6f899c"></i><span>4-6</span></div>
                <div><i style="background:#4d687e"></i><span>7+</span></div>
              </div>
            </section>
          </div>
        </aside>
      </div>
      <p class="source-note">Source: CATF US Projects FINAL. Data type: actual and target/projected.</p>`;

    const projects = [
      { name: 'Baca', lat: 35.90, lon: -106.50, purpose: 'Demo', wells: '2', capacity: 50, capex: '$38', drilling: 'Not Publicly Disclosed', temp: '232-282', investors: 'US DOE, Union', depth: '1776', status: 'Abandoned', dates: '1981-1981', reason: 'Unproductive hydrothermal' },
      { name: 'Beowawe', lat: 40.55, lon: -116.62, purpose: 'Research', wells: '1', capacity: null, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: '197', investors: 'US DOE', depth: '2198', status: 'Abandoned', dates: '1983-1983', reason: 'Early unsuccessful stimulation test' },
      { name: 'Bradys Hot Springs', lat: 39.80, lon: -119.01, purpose: 'Demo', wells: '1', capacity: 15, capex: '$589.29', drilling: 'Not Publicly Disclosed', temp: '204', investors: 'US DOE', depth: '1527', status: 'Concluded', dates: '2008-present' },
      { name: 'Cape Station', lat: 38.50, lon: -112.90, purpose: 'Commercial', wells: '320', capacity: 400, capex: '$7,000', drilling: '4.8', temp: '220', investors: 'Capricorn, Breakthrough Energy, Ventures, CalSTRS, Congruent Ventures, CPP Investments, DCVC, Devon Energy, Galvanize Climate Solutions, Liberty', depth: '4251', status: 'In Development', dates: '2027-' },
      { name: 'Chevron New Energies EGS', lat: 38.30, lon: -122.50, purpose: 'Demo', wells: 'Not Publicly Disclosed', capacity: 20, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'US DOE, Chevron', depth: '6000', status: 'Proposed', dates: '2035-' },
      { name: 'Clear Lake', lat: 39.00, lon: -122.00, purpose: 'Demo', wells: 'Not Publicly Disclosed', capacity: 50, capex: 'Not Publicly Disclosed', drilling: '30.7 (per well?)', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: '4911', status: 'Abandoned', dates: '1996-1996', reason: 'Unknown' },
      { name: 'Corsac Station', lat: 39.60, lon: -118.90, purpose: 'Commercial', wells: 'Not Publicly Disclosed', capacity: 150, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: 'Not Publicly Disclosed', status: 'Proposed', dates: '2026-' },
      { name: 'Coso (FORGE)', lat: 36.00, lon: -117.79, purpose: 'Research; Commercial', wells: '2', capacity: null, capex: '4425-4802', drilling: 'Not Publicly Disclosed', temp: '250-300', investors: 'US DOE', depth: '2580', status: 'Abandoned', dates: '2002-2015', reason: 'Stuck equipment led to abandonment of stimulation efforts' },
      { name: 'CUBO', lat: 42.44, lon: -76.45, purpose: 'Commercial', wells: '1', capacity: null, capex: '2800-1400', drilling: 'Not Publicly Disclosed', temp: '80', investors: 'US DOE, Cornell University', depth: '2984', status: 'In Development', dates: '2035-' },
      { name: 'Desert Peak', lat: 39.75, lon: -118.95, purpose: 'Commercial', wells: '1', capacity: 1.7, capex: '$6000', drilling: '8.1', temp: '210', investors: 'US DOE', depth: '1765', status: 'Operating', dates: '2010-present' },
      { name: 'East Mesa', lat: 32.78, lon: -115.26, purpose: 'Research', wells: '1', capacity: null, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: '160-175', investors: 'US DOE', depth: '2227', status: 'Concluded', dates: '1980-1981' },
      { name: 'Fenton Hill I&2', lat: 35.88, lon: -106.67, purpose: 'Research', wells: '8', capacity: 60, capex: '1800', drilling: '9.8*', temp: '135-300', investors: 'US DOE, IEA', depth: '4572', status: 'Concluded', dates: '1974-1980 (I), 1979 - 1996 (II)' },
      { name: 'Geysers/Unocal', lat: 38.79, lon: -122.76, purpose: 'Research', wells: '1', capacity: null, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: '2691', status: 'Abandoned', dates: '1981-1981', reason: 'Unsuccessful stimulation' },
      { name: 'Kit Station (Nevada)', lat: 40.00, lon: -118.00, purpose: 'Commercial', wells: 'Not Publicly Disclosed', capacity: 7.09, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: 'Not Publicly Disclosed', status: 'Proposed', dates: '2027-' },
      { name: 'Mazama', lat: 43.75, lon: -121.31, purpose: 'Demo', wells: '2', capacity: 15, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'US DOE', depth: '4800', status: 'In Development', dates: '2024-' },
      { name: 'Milford (FORGE)', lat: 38.50, lon: -112.88, purpose: 'Research', wells: 'Not Publicly Disclosed', capacity: null, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: '175-230', investors: 'US DOE', depth: '3854', status: 'Operating', dates: '2015-' },
      { name: 'Naknek', lat: 58.75, lon: -156.90, purpose: 'Demo', wells: 'Not Publicly Disclosed', capacity: 25, capex: '$2914.64', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'US DOE', depth: '3471', status: 'Abandoned', dates: '2008-2011', reason: 'Lack of funding and drilling issues' },
      { name: 'New York Canyon', lat: 40.18, lon: -118.47, purpose: 'Commercial', wells: 'Not Publicly Disclosed', capacity: 70, capex: '$287.71', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'US DOE', depth: 'Not Publicly Disclosed', status: 'Abandoned', dates: '2009-2012', reason: 'Insufficient water' },
      { name: 'Newberry/Altarock (FORGE)', lat: 43.72, lon: -121.23, purpose: 'Demo', wells: '1', capacity: null, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'US DOE', depth: '3067', status: 'Abandoned', dates: '2010-2015', reason: 'Lack of funding' },
      { name: 'NW Geysers/Calpine', lat: 38.79, lon: -122.72, purpose: 'Demo', wells: '3', capacity: 5.8, capex: '$3241.4', drilling: 'Not Publicly Disclosed', temp: '400', investors: 'US DOE, Calpine', depth: '3396', status: 'Operating', dates: '2008-present' },
      { name: 'Obsidian', lat: 43.39, lon: -121.12, purpose: 'Commercial', wells: '6', capacity: 50, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: '365', investors: 'Not Publicly Disclosed', depth: '4900', status: 'In Development', dates: '2025-' },
      { name: 'Poplar Dome', lat: 48.16, lon: -105.19, purpose: 'Commercial', wells: 'Not Publicly Disclosed', capacity: null, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: '135-250', investors: 'Not Publicly Disclosed', depth: 'Not Publicly Disclosed', status: 'Abandoned', dates: '2006-2006', reason: 'Unknown' },
      { name: 'Project Blanford', lat: null, lon: null, purpose: 'Commercial', wells: 'Not Publicly Disclosed', capacity: 10.8, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: 'Not Publicly Disclosed', status: 'Not Publicly Disclosed', dates: '' },
      { name: 'Project Red', lat: 41.00, lon: -118.14, purpose: 'Commercial', wells: '2', capacity: 1.4, capex: 'Not Publicly Disclosed', drilling: '12.2', temp: 'Not Publicly Disclosed', investors: 'Devon Energy, Canada Pension Plan Investment Board (CPP Investments), Liberty Energy, Macquarie, Grantham Foundation', depth: '3420', status: 'Operating', dates: '2023-present' },
      { name: 'Raft River EGS', lat: 42.10, lon: -113.38, purpose: 'Demo', wells: '1', capacity: 15.5, capex: '$868.74', drilling: '1.4', temp: '300', investors: 'US DOE', depth: '1808', status: 'Operating', dates: '2012-present' },
      { name: 'SE Geysers', lat: 38.75, lon: -122.70, purpose: 'Demo', wells: 'Not Publicly Disclosed', capacity: 2.5, capex: 'Not Publicly Disclosed', drilling: '9.5', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: '1341', status: 'Abandoned', dates: '2008-2009', reason: 'Drilling difficulty, wellbore collapse, and seismicity risks' },
      { name: 'Soda Lake', lat: 39.56, lon: -118.84, purpose: 'Commercial', wells: '4', capacity: 26.5, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'Not Publicly Disclosed', depth: '2741', status: 'Operating', dates: '2011-present' },
      { name: 'St. Johns Dome', lat: 34.30, lon: -109.02, purpose: 'Research', wells: 'Not Publicly Disclosed', capacity: 2, capex: 'Not Publicly Disclosed', drilling: 'Not Publicly Disclosed', temp: 'Not Publicly Disclosed', investors: 'US DOE', depth: '1981', status: 'In Development', dates: '2010-' }
    ];

    const located = projects.filter(project => project.lat != null && project.lon != null);
    const knownCapacity = located.filter(project => project.capacity != null).map(project => project.capacity);
    const minCapacity = Math.min(...knownCapacity);
    const maxCapacity = Math.max(...knownCapacity);
    const sizeFor = capacity => {
      if (capacity == null) return 24;
      const ratio = maxCapacity === minCapacity ? 0.5 : (Math.sqrt(capacity) - Math.sqrt(minCapacity)) / (Math.sqrt(maxCapacity) - Math.sqrt(minCapacity));
      return 18 + ratio * 50;
    };

    const theme = window.ChartTheme;
    const chathams = theme ? theme.colors.chathams : '#153171';
    const cadet = theme ? theme.colors.cadet : '#ABB8C3';
    const accent = theme ? theme.colors.accent : '#FFDE8D';
    const bodyFont = theme ? theme.fonts.body : 'Montserrat, system-ui, sans-serif';

    const trace = {
      type: 'scattergeo',
      mode: 'markers',
      lat: located.map(project => project.lat),
      lon: located.map(project => project.lon),
      text: located.map(project => project.name),
      customdata: located,
      marker: {
        size: located.map(project => sizeFor(project.capacity)),
        color: '#0b4f8a',
        opacity: 0.5,
        line: { width: 0 }
      },
      hovertext: located.map(project => `${project.name}<br>Capacity: ${project.capacity == null ? 'N/A' : `${project.capacity.toLocaleString(undefined, { maximumFractionDigits: 3 })} MW`}`),
      hovertemplate: '<b>%{hovertext}</b><extra></extra>',
      showlegend: false
    };

    const legendEntries = [
      { label: '≤ 10 MW', size: 18 },
      { label: '10–25 MW', size: 26 },
      { label: '25–100 MW', size: 36 },
      { label: '100–400 MW', size: 46 },
      { label: '> 400 MW', size: 68 }
    ];
    const legendTraces = legendEntries.map(entry => ({
      type: 'scattergeo',
      mode: 'markers',
      lat: [null],
      lon: [null],
      name: entry.label,
      marker: { size: entry.size, color: '#0b4f8a', opacity: 0.5, line: { width: 0 } },
      showlegend: true,
      hoverinfo: 'skip'
    }));

    const concentration = {
      AK: 1, AL: 0, AR: 0, AZ: 0,
      CA: 7, CO: 0, CT: 0, DE: 0, FL: 0, GA: 0, HI: 0,
      ID: 1, IL: 0, IN: 0, IA: 0, KS: 0, KY: 0, LA: 0,
      ME: 0, MD: 0, MA: 0, MI: 0, MN: 0, MS: 0, MO: 0, MT: 1,
      NE: 0, NV: 8, NH: 0, NJ: 0, NM: 3, NY: 1, NC: 0, ND: 0,
      OH: 0, OK: 0, OR: 3, PA: 0, RI: 0, SC: 0, SD: 0, TN: 0, TX: 0,
      UT: 2, VT: 0, VA: 0, WA: 0, WV: 0, WI: 0, WY: 0
    };
    const concentrationLocations = Object.keys(concentration);
    const concentrationCategory = count => {
      if (count === 0) return 0;
      if (count === 1) return 1;
      if (count <= 3) return 2;
      if (count <= 6) return 3;
      return 4;
    };
    const concentrationValues = concentrationLocations.map(state => concentrationCategory(concentration[state]));

    const concentrationTrace = {
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: concentrationLocations,
      z: concentrationValues,
      text: concentrationLocations.map(state => `${concentration[state]} project${concentration[state] === 1 ? '' : 's'}`),
      colorscale: [
        [0, '#eeeeee'],
        [0.199, '#eeeeee'],
        [0.2, '#abb8c3'],
        [0.399, '#abb8c3'],
        [0.4, '#94a8b8'],
        [0.599, '#94a8b8'],
        [0.6, '#6f899c'],
        [0.799, '#6f899c'],
        [0.8, '#4d687e'],
        [1, '#4d687e']
      ],
      zmin: 0,
      zmax: 4,
      showscale: false,
      marker: { line: { color: '#ffffff', width: 0.8 } },
      hovertemplate: '<b>%{location}</b><br>%{text}<extra></extra>',
      visible: true
    };

    const layout = {
      margin: { t: 20, r: 20, b: 100, l: 20 },
      paper_bgcolor: chathams,
      plot_bgcolor: chathams,
      font: { family: bodyFont, color: '#ffffff', size: 13 },
      geo: {
        scope: 'usa',
        projection: { type: 'albers usa' },
        bgcolor: chathams,
        lakecolor: chathams,
        oceancolor: chathams,
        landcolor: '#eeeeee',
        showsubunits: true,
        subunitcolor: cadet,
        subunitwidth: 0.8,
        showcountries: false,
        countrycolor: '#eeeeee',
        showland: true,
        fitbounds: 'locations'
      },
      legend: {
        title: { text: 'CAPACITY (MW)' },
        orientation: 'h',
        x: 0.5,
        xanchor: 'center',
        y: -0.16,
        yanchor: 'top',
        traceorder: 'normal',
        bgcolor: 'rgba(21,49,113,0.96)',
        bordercolor: 'rgba(255,255,255,0.12)',
        borderwidth: 1,
        font: { family: bodyFont, color: '#ffffff', size: 11 }
      },
      hoverlabel: { bgcolor: chathams, bordercolor: accent, font: { family: bodyFont, color: '#ffffff' } }
    };

    const plot = (showConcentration = true) => {
      concentrationTrace.visible = showConcentration;
      if (typeof ChartTheme !== 'undefined' && ChartTheme.plot) {
        return ChartTheme.plot(document.getElementById('project-map-chart'), [concentrationTrace, trace, ...legendTraces], layout, { responsive: true, displaylogo: false, scrollZoom: false });
      }
      return Plotly.newPlot(document.getElementById('project-map-chart'), [concentrationTrace, trace, ...legendTraces], layout, { responsive: true, displaylogo: false, scrollZoom: false });
    };
    plot(true);

    const sidebar = container.querySelector('.project-map-sidebar');
    const sidebarToggle = container.querySelector('.project-map-sidebar-toggle');
    sidebarToggle.addEventListener('click', () => {
      const collapsed = sidebar.classList.toggle('is-collapsed');
      sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
      sidebarToggle.setAttribute('aria-label', collapsed ? 'Expand map layers' : 'Collapse map layers');
      sidebarToggle.querySelector('.project-map-sidebar-chevron').innerHTML = collapsed ? '&#8250;' : '&#8249;';
    });

    const sectionToggle = container.querySelector('.project-map-section-toggle');
    const layerSection = container.querySelector('.project-map-layer-section');
    sectionToggle.addEventListener('click', () => {
      const expanded = sectionToggle.getAttribute('aria-expanded') === 'true';
      sectionToggle.setAttribute('aria-expanded', String(!expanded));
      sectionToggle.setAttribute('aria-label', expanded ? 'Expand Map layers' : 'Collapse Map layers');
      layerSection.hidden = expanded;
      sectionToggle.querySelector('.project-map-section-chevron').innerHTML = expanded ? '&#8964;' : '&#8963;';
    });

    container.querySelector('#state-concentration-toggle').addEventListener('change', event => {
      concentrationTrace.visible = event.target.checked;
      Plotly.restyle(document.getElementById('project-map-chart'), { visible: [event.target.checked] }, [0]);
    });

    const shell = container.querySelector('.project-map-shell');
    const openPopups = new Map();
    let topZIndex = 20;

    const bringToFront = popup => {
      topZIndex += 1;
      popup.style.zIndex = String(topZIndex);
    };

    const makeDraggable = popup => {
      const handle = popup.querySelector('.project-popup-title');
      handle.classList.add('project-popup-drag-handle');
      let drag = null;

      handle.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        bringToFront(popup);
        const shellRect = shell.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        drag = {
          pointerId: event.pointerId,
          offsetX: event.clientX - popupRect.left,
          offsetY: event.clientY - popupRect.top,
          shellRect,
          popupRect
        };
        handle.setPointerCapture(event.pointerId);
        popup.classList.add('is-dragging');
        event.preventDefault();
      });

      handle.addEventListener('pointermove', event => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        const left = Math.min(
          drag.shellRect.width - 40,
          Math.max(-drag.popupRect.width + 40, event.clientX - drag.shellRect.left - drag.offsetX)
        );
        const top = Math.min(
          drag.shellRect.height - 40,
          Math.max(0, event.clientY - drag.shellRect.top - drag.offsetY)
        );
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        popup.style.right = 'auto';
      });

      const stopDragging = event => {
        if (!drag || event.pointerId !== drag.pointerId) return;
        drag = null;
        popup.classList.remove('is-dragging');
      };
      handle.addEventListener('pointerup', stopDragging);
      handle.addEventListener('pointercancel', stopDragging);
    };

    const openPopup = project => {
      let popup = openPopups.get(project.name);
      if (popup) {
        bringToFront(popup);
        return;
      }

      popup = document.createElement('aside');
      popup.className = 'project-popup';
      popup.setAttribute('aria-live', 'polite');
      popup.innerHTML = `
        <button class="project-popup-close" type="button" aria-label="Close project details">&times;</button>
        <h2 class="project-popup-title"></h2>
        <span class="project-popup-status"></span>
        <div class="project-popup-grid"></div>`;

      const offset = (openPopups.size % 5) * 24;
      popup.style.top = `${32 + offset}px`;
      popup.style.right = `${32 + offset}px`;
      popup.style.left = 'auto';
      shell.appendChild(popup);
      openPopups.set(project.name, popup);
      bringToFront(popup);

      popup.querySelector('.project-popup-close').addEventListener('click', () => {
        openPopups.delete(project.name);
        popup.remove();
      });
      popup.addEventListener('pointerdown', () => bringToFront(popup));
      makeDraggable(popup);

      popup.querySelector('.project-popup-title').textContent = project.name;
      const status = popup.querySelector('.project-popup-status');
      status.textContent = project.status;
      status.className = 'project-popup-status';
      status.classList.add(project.status === 'Operating' ? 'is-operating' : 'is-default');

      const fields = [
        ['Primary Purpose', project.purpose],
        ['Capacity', project.capacity == null ? 'N/A' : `${project.capacity.toLocaleString(undefined, { maximumFractionDigits: 3 })} MW`],
        ['# of Wells', project.wells],
        ['CAPEX ($/kW)', project.capex],
        ['Drilling Cost / Well', project.drilling],
        ['Resource Temperature', project.temp === 'Not Publicly Disclosed' ? project.temp : `${project.temp} °C`],
        ['Maximum Depth', project.depth === 'Not Publicly Disclosed' ? project.depth : `${project.depth} m`],
        ['Date Range', project.dates || 'Not Publicly Disclosed'],
        ['Investors', project.investors],
        ['Reason for Abandonment', project.reason || 'Not Applicable']
      ];
      popup.querySelector('.project-popup-grid').innerHTML = fields.map(([label, value]) => `
        <div class="project-popup-field">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>`).join('');
    };

    container.querySelector('#project-map-chart').on('plotly_click', event => {
      const project = event.points[0].customdata;
      if (!project) return;
      openPopup(project);
    });
  }
});
