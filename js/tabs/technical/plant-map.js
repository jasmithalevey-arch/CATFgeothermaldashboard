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

  function popupHtml(data, kind, sectionId) {
    if (!kind || !sectionId) {
      return `
        <p class="map-popup-plant">Interactive map</p>
        <h3 class="map-popup-title">Hover a numbered part</h3>
        <p class="map-popup-empty">Hover for a Week 8 summary. KPI detail charts from egs-dash will be wired later.</p>`;
    }
    const meta = data.plants[kind];
    const card = data.hover[kind][sectionId];
    const sec = sectionById(data, sectionId);
    const kpis = (card.kpis || []).map((k) => `<li>${k}</li>`).join("");
    const diff = card.differenceFrom
      ? `<section class="map-popup-block">
          <h4 class="map-popup-subhead">${card.differenceFrom.heading}</h4>
          <p class="map-popup-note">${card.differenceFrom.text}</p>
        </section>`
      : "";
    const proven = card.proven
      ? `<section class="map-popup-block map-popup-proven" data-tone="${/partially/i.test(card.proven.heading) ? "partial" : "proven"}">
          <h4 class="map-popup-subhead">${card.proven.heading}</h4>
          <p class="map-popup-note">${card.proven.text}</p>
        </section>`
      : "";
    return `
      <p class="map-popup-plant" style="color:${meta.accent}">${meta.label} · ${sec ? sec.num + ". " + sec.short : ""}</p>
      <h3 class="map-popup-title">${card.title}</h3>
      <p class="map-popup-blurb">${card.blurb}</p>
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
        <p>Scroll the stacked schematics. Hover a numbered bubble for the sticky summary. I still need to revise the blurbs to be more quantifiable and add sourcing (they are in my docs but I haven't had the chance to link all of them here yet).</p>
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
