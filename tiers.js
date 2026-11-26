// kycBank prototype: tier decision from data/tier_table.json.
// Illustrative only. Runs in the browser; no data leaves the page.

function decideTier(table, answers) {
  const order = table.decision.order;
  let rank = 0;
  const reasons = [];
  for (const q of table.questions) {
    const value = answers[q.id];
    if (value === undefined) continue;
    const option = q.options.find(o => o.value === value);
    if (!option) throw new Error(`Unknown answer "${value}" for question "${q.id}"`);
    if (option.tier === null) continue;
    const r = order.indexOf(option.tier);
    if (r > 0) reasons.push({ question: q.id, answer: value, tier: option.tier });
    if (r > rank) rank = r;
  }
  const tier = order[rank];
  return { tier, details: table.tiers[tier], reasons };
}

if (typeof module !== "undefined") module.exports = { decideTier };
