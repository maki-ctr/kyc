// Checks the tier table: valid structure, every test case passes, every tier reachable.
const fs = require("fs");
const path = require("path");
const { decideTier } = require("../js/tiers.js");

const table = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/tier_table.json"), "utf8"));
let failures = 0;
const fail = msg => { failures++; console.log("FAIL", msg); };

for (const q of table.questions) {
  if (!q.why_we_ask) fail(`${q.id} has no why_we_ask`);
  for (const o of q.options) {
    if (o.tier !== null && !table.decision.order.includes(o.tier)) fail(`${q.id}.${o.value} has unknown tier ${o.tier}`);
  }
}

const reached = new Set();
for (const t of table.test_cases) {
  const got = decideTier(table, t.answers).tier;
  reached.add(got);
  if (got !== t.expected) fail(`${t.name}: expected ${t.expected}, got ${got}`);
  else console.log("ok  ", t.name, "->", got);
}
for (const tier of table.decision.order) if (!reached.has(tier)) fail(`tier ${tier} not reached by any test case`);

console.log(failures ? `${failures} failure(s)` : "all checks passed");
process.exit(failures ? 1 : 0);
