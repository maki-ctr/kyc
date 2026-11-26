# K-01 Brief: kycBank Onboarding and KYC Refresh

*Personal project by Malick Manso with a fictional bank. Not client work. Version 0.1, 26 Nov 2026.*

## Goal

Show, with a clickable prototype and measured tests, how a Belgian retail bank could open accounts remotely for newcomers and refresh existing customers' details under the EU AML Regulation, which applies from 10 July 2027. The product question is what each due-diligence tier means for the customer's journey, not how risk is scored.

It rebuilds the job of PreBank (2016), a mobile app to pre-open a bank account, to 2027 rules. PreBank collected data and booked a branch visit; it had no tiering, no "why we ask", no consent wording and no refresh flow (see the Phase 1 reconstruction).

## Personas

**Rafael, the newcomer (flow 1).** 34, software tester from Brazil, arrived in Leuven three weeks ago on a single permit. Speaks Portuguese and English. Has a passport, an employment contract and a rental contract; his residence card is not issued yet. Needs a Belgian account before his first salary and to pay the rental deposit.
- Problem (to confirm in interviews): he doesn't know which documents each bank wants; the fast online route needs itsme, which he can't set up yet; questions about income and where his money comes from feel intrusive when nobody explains them.

**Martine, the existing customer (flow 2).** 52, customer for 14 years, banks on her phone. Gets a message: "please update your details".
- Problem (assumed, labelled): the request asks for everything again, the deadline and the consequence of missing it are unclear, and she can't finish on her phone.

Both personas are illustrative. Their problems are hypotheses until the interviews (K-05) and usability tests (K-08).

## Who else cares

| Stakeholder | What they need |
| --- | --- |
| KYC operations team | Fewer incomplete files, fewer manual reminders |
| Compliance | A traceable reason for each tier decision |
| Digital channel product owner | Higher completion rate on mobile |

## Evidence so far

- Desk research (K-02): at KBC the documents route for a newcomer is 8 steps with 3 to 6 uploads and a branch visit; itsme, the 6-minute route, needs a Belgian eID or an existing Belgian bank. Myria reports employers refusing to pay salaries into non-Belgian accounts.
- Rules (K-03): AMLR Articles 22, 25, 26, 33 and 34; AMLA final draft CDD standards of 30 Sep 2026.

## Success measures

1. Three short interviews with newcomers about opening an account in Belgium (two are enough for v0.2).
2. Usability test with five people on both flows: completion rate, time to complete, hesitation points.
3. Flow 1 against the current state: steps, documents and fields compared with K-02.
4. Flow 2 against a full re-onboarding: fields the customer must touch when only expired items are asked for.
5. Optional: original PreBank against flow 1.

## Scope

**In:** current-state journey map from public bank pages; illustrative tier table; both flows clickable end to end; "why we ask" on every question; consent and data-use screen; usability test and one iteration; English and Portuguese.

**Out:** real identity checks, real screening, real bank systems, storage of any data, personal documents of test users, a business-customer flow.

## Constraints

- "Prototype" and the kycBank name on every screen. No real bank names or logos in the prototype.
- The identity step is simulated and labelled.
- The tier table is labelled "illustrative" on screen and in the case study.
- No data leaves the browser.
- Budget: about 18 hours of Malick's time across weeks 3 to 12; Should items go first if a week is tight.

## Releases

| Release | Date | Contents |
| --- | --- | --- |
| v0.1 | Sun 10 Jan 2027 | Brief, journey map, rule notes, tier table, interview guide |
| v0.2 | Sun 31 Jan 2027 | Interviews and synthesis; flow 1 and flow 2 clickable |
| v1.0 | Sun 21 Feb 2027 | Usability test, iteration, release notes, case study and video |
