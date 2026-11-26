// kycBank prototype, flow 1: a newcomer opens an account.
// Content lives in data/*.json. Nothing is stored or sent: state lives in this page only.
(async function () {
  const $screen = document.getElementById("screen");
  const $step = document.getElementById("step");
  const $bar = document.getElementById("bar");

  let C, T;
  try {
    [C, T] = await Promise.all([
      fetch("data/content.en.json").then(r => r.json()),
      fetch("data/tier_table.json").then(r => r.json())
    ]);
  } catch (e) {
    $screen.innerHTML = "<p>Could not load the prototype content. Open it through a web server, not as a local file.</p>";
    return;
  }

  const SCREENS = ["welcome", "eligibility", "account", "checklist", "consent", "identity", "due_diligence", "result", "done"];
  const TQ = id => T.questions.find(q => q.id === id);
  const DD_IDS = T.questions.map(q => q.id).filter(id => !["product", "country_risk", "source_of_funds"].includes(id));
  const ELIG = C.eligibility.questions.map(q => q.from_tier_table ? TQ(q.from_tier_table) : q);

  let s;
  function reset() {
    s = { i: 0, answers: {}, route: null, docSteps: [], fields: {}, address: "", agreed: false, marketing: false, log: [], start: Date.now() };
  }
  reset();

  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function question(q) {
    const opts = q.options.map(o => `
      <label class="opt"><input type="radio" name="${q.id}" value="${o.value}" ${s.answers[q.id] === o.value ? "checked" : ""}>
      <span>${esc(o.label)}</span></label>`).join("");
    return `<fieldset><legend>${esc(q.text)}</legend>
      <details class="why"><summary>${C.nav.why}</summary>${esc(q.why_we_ask)}</details>${opts}</fieldset>`;
  }
  const answered = qs => qs.every(q => s.answers[q.id]);

  function checklist() {
    const a = s.answers, items = ["id"];
    if (a.residence_status === "abroad_moving") items.push("moving");
    else if (a.country_risk !== "eu_eea") items.push("permit");
    if (a.residence_status !== "registered") items.push("address");
    items.push({ salary_pension_documented: "payslip", salary_selfemployed_savings: "contract", cash_or_unclear: "funds_other" }[a.source_of_funds]);
    items.push(a.has_eid === "yes" ? "itsme" : "camera");
    return items;
  }

  function tier() { return decideTier(T, s.answers); }
  const needsAddress = () => tier().tier !== "simplified" && s.route !== "eid";

  function textField(f, value) {
    return `<label class="field" for="${f.id}">${esc(f.label)}</label>
      <input type="${f.type || "text"}" id="${f.id}" name="${f.id}" value="${esc(value || "")}" autocomplete="off">
      ${f.hint ? `<div class="hint">${esc(f.hint)}</div>` : ""}`;
  }

  const R = {
    welcome: {
      html: () => `<h1 tabindex="-1">${C.welcome.title}</h1><p class="lead">${C.welcome.lead}</p>
        <ul class="list">${C.welcome.points.map(p => `<li>${p}</li>`).join("")}</ul>`,
      ok: () => true, next: C.welcome.start
    },
    eligibility: {
      html: () => `<h1 tabindex="-1">${C.eligibility.title}</h1><p class="lead">${C.eligibility.lead}</p>${ELIG.map(question).join("")}`,
      ok: () => answered(ELIG)
    },
    account: {
      html: () => `<h1 tabindex="-1">${C.account.title}</h1>${question(TQ("product"))}<div class="note">${C.account.basic_right}</div>`,
      ok: () => !!s.answers.product
    },
    checklist: {
      html: () => `<h1 tabindex="-1">${C.checklist.title}</h1><p class="lead">${C.checklist.lead}</p>
        <ul class="docs">${checklist().map(k => { const it = C.checklist.items[k];
          return `<li>${esc(it.label)}<span class="why-line">${esc(it.why)}</span></li>`; }).join("")}</ul>`,
      ok: () => true
    },
    consent: {
      html: () => `<h1 tabindex="-1">${C.consent.title}</h1><ul class="list">${C.consent.points.map(p => `<li>${p}</li>`).join("")}</ul>
        <label class="check"><input type="checkbox" id="marketing" ${s.marketing ? "checked" : ""}><span>${C.consent.optional}</span></label>
        <label class="check"><input type="checkbox" id="agreed" ${s.agreed ? "checked" : ""}><span><strong>${C.consent.agree}</strong></span></label>`,
      ok: () => s.agreed
    },
    identity: {
      html: () => {
        const I = C.identity;
        let body = `<h1 tabindex="-1">${I.title}</h1><div class="sim">${I.simulated}</div>`;
        if (!s.route) {
          const eid = `<button class="route" data-route="eid"><strong>${I.route_eid.button}</strong>${I.route_eid.note}</button>`;
          const doc = `<button class="route" data-route="doc"><strong>${I.route_doc.button}</strong>${I.route_doc.note}</button>`;
          body += s.answers.has_eid === "yes" ? eid + doc : doc + eid;
        } else if (s.route === "eid") {
          body += `<p class="done-tick">${I.eid_done}</p>`;
        } else {
          body += I.doc_steps.map((t, n) => s.docSteps[n]
            ? `<p class="done-tick">Done: ${t}</p>`
            : `<button class="secondary" data-doc="${n}" ${n > s.docSteps.length ? "disabled" : ""}>${t}</button> `).join("");
          if (s.docSteps.length === I.doc_steps.length) {
            body += `<p>${I.doc_done}</p><details class="why"><summary>${C.nav.why}</summary>${I.why_we_ask}</details>`
              + I.fields.map(f => textField(f, s.fields[f.id])).join("");
          }
        }
        return body;
      },
      ok: () => s.route === "eid" || (s.route === "doc" && C.identity.fields.every(f => (s.fields[f.id] || "").trim()))
    },
    due_diligence: {
      html: () => `<h1 tabindex="-1">${C.due_diligence.title}</h1><p class="lead">${C.due_diligence.lead}</p>${DD_IDS.map(id => question(TQ(id))).join("")}`,
      ok: () => answered(DD_IDS.map(TQ))
    },
    result: {
      html: () => {
        const r = tier();
        const reasons = r.reasons.filter(x => x.tier === r.tier).map(x => { const q = TQ(x.question); return `<li>${esc(q.text)} <strong>${esc(q.options.find(o => o.value === x.answer).label)}</strong></li>`; }).join("");
        return `<h1 tabindex="-1">${C.result.title}</h1>
          <div class="card tier ${r.tier}"><h2>${r.details.label}</h2><p>${r.details.next_step}</p>
          ${reasons ? `<p class="muted">${C.result.because}</p><ul class="list">${reasons}</ul>` : ""}</div>
          <div class="sim">${C.result.illustrative}</div>
          ${needsAddress() ? `<p><strong>${C.result.address_needed}</strong></p>` + textField({ id: "address", label: C.result.address_label, hint: C.result.address_hint }, s.address) : ""}`;
      },
      ok: () => !needsAddress() || s.address.trim()
    },
    done: {
      html: () => {
        const r = tier(), now = r.details.account_opens === "now", D = C.done;
        const due = new Date(); due.setMonth(due.getMonth() + r.details.review_interval_months);
        const docs = now ? "" : `<ul class="docs">${r.details.extra_documents.map(d => `<li>${D.review_docs[d]}</li>`).join("")}</ul>`;
        return `<h1 tabindex="-1">${now ? D.title_now : D.title_review}</h1><h2 class="muted">${D.next}</h2>
          <ol class="list">${(now ? D.now_steps : D.review_steps).map(t => `<li>${t}</li>`).join("")}</ol>${docs}
          <p>${D.next_review.replace("{date}", due.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }))}</p>
          <div class="actions"><button class="secondary" id="restart">${D.restart}</button><button class="secondary" id="showlog">${D.log}</button></div>
          <div id="log"></div>`;
      },
      ok: () => true, last: true
    }
  };

  function testLog() {
    const end = Date.now(), r = tier();
    const lines = s.log.map((e, n) => { const nxt = s.log[n + 1] ? s.log[n + 1].t : end; return `${e.screen}: ${Math.round((nxt - e.t) / 1000)} s`; });
    const choices = Object.keys(s.answers).length;
    const typed = Object.values(s.fields).filter(v => v.trim()).length + (s.address.trim() ? 1 : 0);
    return [`Tier: ${r.tier}`, `Identity route: ${s.route}`, `Screens: ${s.log.length}`,
      `Questions answered: ${choices}`, `Fields typed: ${typed}`, `Checkboxes ticked: ${1 + (s.marketing ? 1 : 0)}`,
      `Total time: ${Math.round((end - s.start) / 1000)} s`, "", ...lines].join("\n");
  }

  function render() {
    const name = SCREENS[s.i], scr = R[name];
    if (!s.log.length || s.log[s.log.length - 1].screen !== name) s.log.push({ screen: name, t: Date.now() });
    $step.textContent = C.nav.step.replace("{n}", s.i + 1).replace("{total}", SCREENS.length);
    $bar.style.width = `${((s.i + 1) / SCREENS.length) * 100}%`;
    const back = s.i > 0 && !scr.last ? `<button class="secondary" id="back">${C.nav.back}</button>` : "";
    const next = scr.last ? "" : `<button class="primary" id="next" ${scr.ok() ? "" : "disabled"}>${scr.next || C.nav.next}</button>`;
    $screen.innerHTML = scr.html() + (scr.last ? "" : `<div class="actions">${back}${next}</div>`);
    const h = $screen.querySelector("h1"); if (h) h.focus();
  }
  const refreshNext = () => { const b = document.getElementById("next"); if (b) b.disabled = !R[SCREENS[s.i]].ok(); };

  $screen.addEventListener("change", e => {
    const t = e.target;
    if (t.type === "radio") s.answers[t.name] = t.value;
    if (t.id === "agreed") s.agreed = t.checked;
    if (t.id === "marketing") s.marketing = t.checked;
    refreshNext();
  });
  $screen.addEventListener("input", e => {
    const t = e.target;
    if (t.id === "address") s.address = t.value;
    else if (t.type === "text" || t.type === "date") s.fields[t.id] = t.value;
    refreshNext();
  });
  $screen.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.id === "next") { s.i++; render(); }
    else if (t.id === "back") { s.i--; render(); }
    else if (t.dataset.route) { s.route = t.dataset.route; render(); }
    else if (t.dataset.doc) { s.docSteps.push(true); render(); }
    else if (t.id === "restart") { reset(); render(); }
    else if (t.id === "showlog") { document.getElementById("log").innerHTML = `<pre class="log">${esc(testLog())}</pre>`; }
  });

  render();
})();
