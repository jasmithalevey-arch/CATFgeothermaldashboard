/*
 * Dashboard core: a tiny tab registry + hash router.
 * Each tab file calls Dashboard.registerTab({...}). See docs/ADDING_TABS.md.
 */
const Dashboard = (() => {
  const tabs = [];

  function registerTab(tab) {
    // tab = { id: 'kebab-case-id', label: 'Nav label', title: 'Page heading', render(container) {...} }
    if (!tab.id || !tab.label || typeof tab.render !== 'function') {
      console.error('registerTab: id, label and render() are required', tab);
      return;
    }
    if (tabs.some(t => t.id === tab.id)) {
      console.error(`registerTab: duplicate tab id "${tab.id}"`);
      return;
    }
    tabs.push(tab);
  }

  function buildShell() {
    const nav = document.getElementById('tab-nav');
    const panels = document.getElementById('tab-panels');

    tabs.forEach(tab => {
      const link = document.createElement('a');
      link.href = `#${tab.id}`;
      link.id = `tab-link-${tab.id}`;
      link.textContent = tab.label;
      link.setAttribute('role', 'tab');
      link.setAttribute('aria-controls', `panel-${tab.id}`);
      nav.appendChild(link);

      const panel = document.createElement('section');
      panel.className = 'tab-panel';
      panel.id = `panel-${tab.id}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-link-${tab.id}`);
      panel.hidden = true;

      const h1 = document.createElement('h1');
      h1.className = 'panel-title';
      h1.textContent = tab.title || tab.label;
      const body = document.createElement('div');
      body.className = 'panel-body';
      panel.append(h1, body);
      panels.appendChild(panel);

      tab._body = body;
      tab._rendered = false;
    });
  }

  function show(id) {
    const active = tabs.find(t => t.id === id) || tabs[0];
    tabs.forEach(tab => {
      const isActive = tab === active;
      document.getElementById(`panel-${tab.id}`).hidden = !isActive;
      document.getElementById(`tab-link-${tab.id}`).setAttribute('aria-selected', String(isActive));
    });
    // Render lazily the first time a tab is opened
    if (!active._rendered) {
      active.render(active._body);
      active._rendered = true;
    }
    document.title = `${active.label} | Geothermal KPI Dashboard`;
  }

  function start() {
    buildShell();
    const route = () => show(location.hash.slice(1));
    window.addEventListener('hashchange', route);
    route();
  }

  // Helper for placeholder tabs
  function emptyState(container, message) {
    container.innerHTML = `<div class="empty-state"><strong>Coming soon.</strong> ${message}</div>`;
  }

  return { registerTab, start, emptyState };
})();
