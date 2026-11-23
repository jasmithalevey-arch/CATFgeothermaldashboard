// Loads the original Industry Comparison tab inside the Comparison tab's first sub-tab.
// Must load AFTER app.js and BEFORE js/tabs/industry-comparison.js.
(function () {
  window.ComparisonSections = window.ComparisonSections || {};
  const originalRegister = Dashboard.registerTab.bind(Dashboard);

  Dashboard.registerTab = function (tab) {
    if (tab.id === 'industry-comparison') {
      // Don't create a separate top-level tab; render it into the sub-tab instead
      ComparisonSections.industry = function (el) { tab.render(el); };
      return;
    }
    return originalRegister(tab);
  };
})();
