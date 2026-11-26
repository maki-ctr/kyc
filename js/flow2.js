// kycBank prototype, flow 2: an existing customer refreshes their details.
// Content lives in data/*.json. Nothing is stored or sent: state lives in this page only.
(async function () {
  const $screen = document.getElementById("screen");
  const $step = document.getElementById("step");
  const $bar = document.getElementById("bar");

  let C, T, P;
  try {
    [C, T, P] = await Promise.all(["content.en", "tier_table", "flow2_profile"].map(f => fetch(`data/${f}.json`).then(r => r.json())));
  } catch (e) {
    $screen.innerHTML = "<p>Could not load the prototype content. Open it through a web server, not as a local file.</p>";
    return;
  }
  const RC = C.refresh;
  const TQ = id => T.questions.find(q => q.id === id);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = d => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const addDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return d; };

  let s;
  function reset() {
    s = { i: 0, agreed: false, change: {}, values: {}, idRenewed: false, typed: 0, log: [], start: Date.now() };
    for (const it of P.items) s.values[it.id] = it.value;
  }
  reset();

  const item = id => P.items.find(x => x.id === id);
  const shown = it => it.tier_question
    ? (TQ(it.tier_question).options.find(o => o.value === s.values[it.id]) || {}).label || "Not given"
    : it.value;
  const needsUpdate = () => P.items.some(it => s.change[it.id] || it.action === "renew_id");
  const screens = () => ["notice", "datause", "review", ...(needsUpdate() ? ["update"] : []), "done"];

  function radio(q, value, name) {
    return `<fieldset><legend>${esc(q.text)}</legend><details class="why"><summary>${C.nav.why}</summary>${esc(q.why_we_ask)}</details>
      ${q.options.map(o => `<label class="opt"><input type="radio" name="${name}" value="${o.value}" ${value === o.value ? "checked" : ""}><span>${esc(o.label)}</span></label>`).join("")}</fieldset>`;
  }

  function badge(it) {
    if (it.status === "expired" && !s.idRenewed) return `<span class="badge warn">${RC.review.expired.replace("{days}", it.expired_days_ago)}. ${RC.review.action_needed}</span>`;
    if (it.status === "missing") return `<span class="badge warn">${RC.review.missing}</span>`;
    if (s.change[it.id]) return `<span class="badge">Will be updated</span>`;
    return `<span class="badge ok">${RC.review.ok}</span>`;
  }

  function row(it) {
    if (it.status === "missing") {
      return `<li>${radio(TQ(it.tier_question), s.values[it.id], it.id)}</li>`;
    }
    const btn = it.editable
      ? `<button class="secondary small" data-toggle="${it.id}">${s.change[it.id] ? RC.review.keep : RC.review.change}</button>` : "";
    const locked = !it.editable && it.status === "ok" ? `<details class="why"><summary>Something wrong?</summary>${RC.review.locked}</details>` : "";
    return `<li><div class="rowhead"><span class="muted">${esc(it.label)}</span>${badge(it)}</div>
      <div class="rowval"><strong>${esc(shown(it))}</strong>${btn}</div>${locked}</li>`;
  }

  const R = {
    notice: {
      html: () => {
        const n = RC.notice, expired = P.items.some(i => i.status === "expired");
        return `<h1 tabindex="-1">${n.title.replace("{name}", esc(P.customer.first_name))}</h1>
          <p>${n.reason_periodic.replace("{years}", P.review.last_review_years_ago)}${expired ? " " + n.reason_expired : ""}</p>
          <div class="card"><strong>${n.deadline.replace("{date}", fmt(addDays(P.review.deadline_days)))}</strong><p class="muted">${n.consequence}</p></div>
          <p>${n.effort}</p>`;
      },
      ok: () => true, next: RC.notice.start
    },
    datause: {
      html: () => `<h1 tabindex="-1">${RC.datause.title}</h1><ul class="list">${RC.datause.points.map(p => `<li>${p}</li>`).join("")}</ul>
        <label class="check"><input type="checkbox" id="agreed" ${s.agreed ? "checked" : ""}><span><strong>${RC.datause.agree}</strong></span></label>`,
      ok: () => s.agreed
    },
    review: {
      html: () => `<h1 tabindex="-1">${RC.review.title}</h1><p class="lead">${RC.review.lead}</p>` +
        Object.entries(RC.review.groups).map(([g, title]) =>
          `<h2 class="group">${title}</h2><ul class="items">${P.items.filter(i => i.group === g).map(row).join("")}</ul>`).join(""),
      ok: () => P.items.filter(i => i.status === "missing").every(i => s.values[i.id])
    },
    update: {
      html: () => {
        const U = RC.update;
        let h = `<h1 tabindex="-1">${U.title}</h1><div class="sim">${C.identity.simulated}</div>`;
        if (P.items.some(i => i.action === "renew_id")) {
          h += `<div class="card"><h2 class="group">${U.renew_title}</h2><p class="muted">${U.why_id}</p>` +
            (s.idRenewed ? `<p class="done-tick">${U.renew_done}</p>`
              : `<button class="route" data-renew="eid"><strong>${U.renew_eid}</strong></button><button class="route" data-renew="doc"><strong>${U.renew_doc}</strong></button>`) + `</div>`;
        }
        for (const it of P.items.filter(i => s.change[i.id])) {
          h += it.tier_question ? radio(TQ(it.tier_question), s.values[it.id], it.id)
            : `<label class="field" for="f_${it.id}">${esc(it.label)}</label><input type="text" id="f_${it.id}" data-item="${it.id}" value="${esc(s.values[it.id])}">`;
        }
        return h;
      },
      ok: () => (!P.items.some(i => i.action === "renew_id") || s.idRenewed) &&
        P.items.filter(i => s.change[i.id] && !i.tier_question).every(i => (s.values[i.id] || "").trim())
    },
    done: {
      html: () => {
        const D = RC.done, r = result();
        const acted = actions();
        const due = new Date(); due.setMonth(due.getMonth() + r.details.review_interval_months);
        return `<h1 tabindex="-1">${r.tier === "enhanced" ? D.title_review : D.title}</h1>
          <p>${D.summary.replace("{confirmed}", P.items.length - acted).replace("{updated}", acted)}</p>
          ${r.tier === "enhanced" ? `<div class="sim">${D.review_note}</div>` : ""}
          <p>${D.next_review.replace("{date}", fmt(due))}</p>
          <p class="muted">${D.compare.replace("{full}", P.meta.full_reonboarding_items)}</p>
          <div class="actions"><button class="secondary" id="restart">${D.restart}</button><button class="secondary" id="showlog">${D.log}</button></div>
          <div id="log"></div>`;
      },
      ok: () => true, last: true
    }
  };

  function result() {
    const a = { product: P.customer.product, country_risk: P.customer.country_risk, purpose: P.customer.purpose };
    for (const it of P.items) if (it.tier_question) a[it.tier_question] = s.values[it.id];
    return decideTier(T, a);
  }
  const actions = () => P.items.filter(it => s.change[it.id] || it.status !== "ok").length;

  function testLog() {
    const end = Date.now();
    const lines = s.log.map((e, n) => `${e.screen}: ${Math.round(((s.log[n + 1] ? s.log[n + 1].t : end) - e.t) / 1000)} s`);
    return [`Tier after refresh: ${result().tier}`, `Screens: ${s.log.length}`, `Items shown pre-filled: ${P.items.length}`,
      `Items the customer had to act on: ${actions()}`, `Fields typed: ${s.typed}`,
      `Full re-onboarding would ask: ${P.meta.full_reonboarding_items} items`,
      `Total time: ${Math.round((end - s.start) / 1000)} s`, "", ...lines].join("\n");
  }

  function render() {
    const list = screens(), name = list[s.i], scr = R[name];
    if (!s.log.length || s.log[s.log.length - 1].screen !== name) s.log.push({ screen: name, t: Date.now() });
    $step.textContent = C.nav.step.replace("{n}", s.i + 1).replace("{total}", list.length);
    $bar.style.width = `${((s.i + 1) / list.length) * 100}%`;
    const back = s.i > 0 && !scr.last ? `<button class="secondary" id="back">${C.nav.back}</button>` : "";
    const next = scr.last ? "" : `<button class="primary" id="next" ${scr.ok() ? "" : "disabled"}>${scr.next || C.nav.next}</button>`;
    $screen.innerHTML = scr.html() + (scr.last ? "" : `<div class="actions">${back}${next}</div>`);
    const h = $screen.querySelector("h1"); if (h) h.focus();
  }
  const refreshNext = () => { const b = document.getElementById("next"); if (b) b.disabled = !R[screens()[s.i]].ok(); };

  $screen.addEventListener("change", e => {
    const t = e.target;
    if (t.id === "agreed") s.agreed = t.checked;
    if (t.type === "radio") s.values[t.name] = t.value;
    refreshNext();
  });
  $screen.addEventListener("input", e => {
    const t = e.target;
    if (t.dataset.item) { if (s.values[t.dataset.item] === item(t.dataset.item).value) s.typed++; s.values[t.dataset.item] = t.value; }
    refreshNext();
  });
  $screen.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.id === "next") { s.i++; render(); }
    else if (t.id === "back") { s.i--; render(); }
    else if (t.dataset.toggle) {
      const id = t.dataset.toggle;
      s.change[id] = !s.change[id];
      if (!s.change[id]) s.values[id] = item(id).value;
      render();
    }
    else if (t.dataset.renew) { s.idRenewed = true; render(); }
    else if (t.id === "restart") { reset(); render(); }
    else if (t.id === "showlog") { document.getElementById("log").innerHTML = `<pre class="log">${esc(testLog())}</pre>`; }
  });

  render();
})();
