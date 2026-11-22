/**
 * Plant map (from egs-dash) — EGS / Superhot rock / Closed-loop schematics.
 * Hover updates sticky popup. KPI detail navigation is stubbed for now.
 */
(function (global) {
  const STACK = ["egs", "shr", "clgs"];

  function sectionById(data, id) {
    return data.sections.find((s) => s.id === id);
  }

  function renderDiagram(kind, data, activeId) {
    const meta = data.plants[kind];
    const bubbles = data.bubbles[kind] || [];
    const bubbleHtml = bubbles
      .map((b) => {
        const sec = sectionById(data, b.id);
        const n = sec ? sec.num : "?";
        const active = activeId === b.id ? " is-active" : "";
        return `<button type="button" class="bubble${active}" data-kind="${kind}" data-section="${b.id}" style="left:${b.x}%;top:${b.y}%;" aria-label="${meta.label}: ${sec ? sec.short : b.id}. Hover for summary." title="Hover for summary">${n}</button>`;
      })
      .join("");

    return `
      <section class="diagram-card" data-kind="${kind}">
        <div class="diagram-card-head">
          <div class="diagram-card-label" style="color:${meta.accent}">${meta.label}</div>
          <div class="diagram-card-tag">${meta.tagline}</div>
        </div>
        <div class="diagram-frame">
          <img src="${meta.image}" alt="${meta.label} geothermal schematic" width="1254" height="1254" />
          ${bubbleHtml}
        </div>
      </section>`;
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sourceLabel(url) {
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, "");
      const leaf = u.pathname.split("/").filter(Boolean).pop() || "";
      if (leaf && /\.(pdf|html?)$/i.test(leaf)) {
        return host + " · " + decodeURIComponent(leaf);
      }
      return host + (u.pathname !== "/" ? u.pathname.replace(/\/$/, "") : "");
    } catch (err) {
      return url;
    }
  }

  function sourcesHtml(sources) {
    const list = (sources || []).filter(Boolean);
    if (!list.length) return "";
    const links = list
      .map(
        (url) =>
          `<a class="map-popup-source-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceLabel(url))}</a>`
      )
      .join("");
    return `
      <span class="map-popup-info" tabindex="0" aria-label="Sources">
        <span class="map-popup-info-mark" aria-hidden="true">i</span>
        <span class="map-popup-info-tip" role="tooltip">
          <span class="map-popup-info-tip-label">Sources</span>
          ${links}
        </span>
      </span>`;
  }

  function popupHtml(data, kind, sectionId) {
    if (!kind || !sectionId) {
      return `
        <p class="map-popup-plant">Interactive map</p>
        <h3 class="map-popup-title">Hover a numbered part</h3>
        <p class="map-popup-empty">Hover a numbered bubble for the sticky summary. Hover the (i) next to a title for sources.</p>`;
    }
    const meta = data.plants[kind];
    const card = data.hover[kind][sectionId];
    const sec = sectionById(data, sectionId);
    const kpis = (card.kpis || []).map((k) => `<li>${escapeHtml(k)}</li>`).join("");
    const diff = card.differenceFrom
      ? `<section class="map-popup-block">
          <h4 class="map-popup-subhead">${escapeHtml(card.differenceFrom.heading)}</h4>
          <p class="map-popup-note">${escapeHtml(card.differenceFrom.text)}</p>
        </section>`
      : "";
    const provenTone = /partially|early/i.test(card.proven && card.proven.heading ? card.proven.heading : "")
      ? "partial"
      : "proven";
    const proven = card.proven
      ? `<section class="map-popup-block map-popup-proven" data-tone="${provenTone}">
          <h4 class="map-popup-subhead">${escapeHtml(card.proven.heading)}</h4>
          <p class="map-popup-note">${escapeHtml(card.proven.text)}</p>
        </section>`
      : "";
    return `
      <p class="map-popup-plant" style="color:${meta.accent}">${escapeHtml(meta.label)} · ${sec ? sec.num + ". " + escapeHtml(sec.short) : ""}</p>
      <h3 class="map-popup-title">${escapeHtml(card.title)}${sourcesHtml(card.sources)}</h3>
      <p class="map-popup-blurb">${escapeHtml(card.blurb)}</p>
      ${diff}
      ${proven}
      <ul class="map-popup-kpis">${kpis}</ul>
      <p class="map-popup-cta"><span class="map-popup-soon">KPI detail coming soon</span></p>`;
  }

  function setActiveBubbles(root, kind, sectionId) {
    root.querySelectorAll(".bubble").forEach((btn) => {
      const on =
        btn.getAttribute("data-kind") === kind &&
        btn.getAttribute("data-section") === sectionId;
      btn.classList.toggle("is-active", on);
    });
  }

  async function mount(container) {
    container.innerHTML = `
      <div class="panel-intro">
        <h2>Plant map · EGS, Superhot rock, Closed-loop</h2>
        <p>Scroll the stacked schematics. Hover a numbered bubble for the sticky summary. Hover the <strong>(i)</strong> next to a part title for sources.</p>
      </div>
      <div class="status-banner" data-tone="loading">Loading map data…</div>
      <div class="map-layout" hidden>
        <div class="diagram-stack" data-role="stack"></div>
        <div class="map-popup-wrap">
          <aside class="map-popup" data-role="popup" aria-live="polite"></aside>
        </div>
      </div>`;

    const status = container.querySelector(".status-banner");
    const layout = container.querySelector(".map-layout");
    const stack = container.querySelector('[data-role="stack"]');
    const popup = container.querySelector('[data-role="popup"]');

    let data;
    try {
      const res = await fetch("data/hover-cards.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      data = await res.json();
    } catch (err) {
      status.dataset.tone = "error";
      status.textContent =
        "Could not load data/hover-cards.json. Serve this folder over HTTP (not as a file:// page) and try again.";
      return;
    }

    status.remove();
    layout.hidden = false;
    stack.innerHTML = STACK.map((k) => renderDiagram(k, data, null)).join("");
    popup.innerHTML = popupHtml(data, null, null);

    function activate(kind, section) {
      setActiveBubbles(stack, kind, section);
      popup.innerHTML = popupHtml(data, kind, section);
    }

    stack.addEventListener("mouseover", (e) => {
      const btn = e.target.closest(".bubble");
      if (!btn) return;
      activate(btn.getAttribute("data-kind"), btn.getAttribute("data-section"));
    });

    stack.addEventListener("focusin", (e) => {
      const btn = e.target.closest(".bubble");
      if (!btn) return;
      activate(btn.getAttribute("data-kind"), btn.getAttribute("data-section"));
    });

    stack.addEventListener("click", (e) => {
      const btn = e.target.closest(".bubble");
      if (!btn) return;
      e.preventDefault();
      activate(btn.getAttribute("data-kind"), btn.getAttribute("data-section"));
    });
  }

  global.TechnicalSections = global.TechnicalSections || {};
  global.TechnicalSections.plantMap = mount;
})(window);
