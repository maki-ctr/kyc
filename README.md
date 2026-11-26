# kycBank: Onboarding and KYC Refresh

A personal portfolio project by Malick Manso. **kycBank is a fictional bank. This is a prototype, not a real banking product and not client work.**

The prototype shows how a Belgian retail bank could open accounts remotely for newcomers (flow 1) and refresh existing customers' details (flow 2) under the EU AML Regulation, Regulation (EU) 2024/1624, which applies from 10 July 2027. It rebuilds the job of PreBank, a 2016 mobile account pre-opening app, to 2027 rules.

## What's here

| Path | Backlog item | Content |
| --- | --- | --- |
| docs/K-01_brief.md | K-01 | Goal, personas, success measures, scope |
| docs/K-02_current_state_journey.md | K-02 | Current newcomer journey at two Belgian banks, from public pages |
| docs/K-03_rule_notes.md | K-03 | AMLR Articles 22, 25, 26, 33, 34 and what they mean for the journey |
| data/tier_table.json | K-04 | Illustrative tier table: questions, "why we ask", tiers, next steps, test cases |
| docs/K-05_interview_guide.md | K-05 | Interview guide, consent wording, notes and synthesis templates |
| docs/K-11_decision_log.md | K-11 | Decisions with the option rejected |
| js/tiers.js | K-06 | Tier decision used by the prototype |
| tests/tiers.test.js | K-04 | Checks the table and that every tier is reachable |

Run the check: `node tests/tiers.test.js`

## Ground rules

- Static HTML and JavaScript; no data leaves the browser; no real identity checks or screening.
- "Prototype" and "kycBank" on every screen; no real bank names or logos in the app.
- The tier table is illustrative, not any bank's risk model.

## Releases

- v0.1, 10 Jan 2027: brief, journey map, rule notes, tier table, interview guide
- v0.2, 31 Jan 2027: interviews; flow 1 and flow 2 clickable
- v1.0, 21 Feb 2027: usability test, iteration, case study
