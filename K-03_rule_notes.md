# K-03 Rule notes: what the EU AML Regulation means for the kycBank journey

*Personal project with a fictional bank. Not legal advice. Status as of 26 Nov 2026; re-check before v1.0 (21 Feb 2027).*

## The short version

From 10 July 2027 one EU rulebook, Regulation (EU) 2024/1624 (AMLR), sets customer due diligence for every bank in the EU. For a retail current account that means four things the app must handle: identify and verify the customer (Article 22), understand why they want the account (Article 25), apply lighter or heavier checks depending on risk (Articles 33 and 34), and keep the file up to date for as long as the customer stays (Article 26). AMLA's detailed standards on what to collect are a final draft, not yet law.

## Article 22: who the customer is

**What to collect for a natural person.** Article 22(1)(a) lists all names and surnames, place and full date of birth, nationalities (or statelessness, refugee or subsidiary protection status), and usual place of residence (or a postal address where the person has none), plus the national identification number where applicable and the tax identification number where available.

**How to verify it.** Article 22(6) allows an identity document, passport or equivalent, together with information from reliable and independent sources where needed, or electronic identification that meets the eIDAS Regulation (EU) No 910/2014 at assurance level "substantial" or "high".

**AMLA's final draft standards (30 Sep 2026)** add the detail:
- Every Article 22(1) data point used for identification must be verified, not only collected. Gaps can be filled from reliable and independent sources.
- Low-risk customers get a reduced data set; the address is not required for them.
- eID and the identity document stay the default. A document-based remote alternative is allowed only when the person cannot reasonably be expected to present the document in person and has no qualifying eID, and the bank must be able to justify that. It needs a secure channel, a check that the presenter holds the document, good image quality, a stop on faults or doubts, and time-stamped copies.

**What this means for the journey.**
- In Belgium the qualifying eID route is itsme or the eID card with a card reader. itsme can only be set up with a Belgian eID card with chip or through an existing Belgian bank. A newcomer in their first weeks often has neither, so the app needs a second path.
- Flow 1 therefore offers two identity routes: "I have itsme or a Belgian eID" (fast) and "I don't have one yet" (document route, simulated and labelled). The second route must explain why it takes longer.
- The address step is skipped for the simplified tier.

## Article 25: why the customer wants the account

Before opening, the bank must understand the purpose and intended nature of the relationship and, where necessary, obtain: the purpose and economic rationale, the estimated amount of activity, the source of funds, the destination of funds, and the customer's occupation or business activity.

For low-risk situations, AMLA's final draft sets a minimum of three items: the intended use of the product, the estimated value of transactions where applicable, and the occupation. These may come from the customer, other sources, or be inferred from the product.

**What this means for the journey.** The due-diligence screen asks purpose, expected monthly activity, source of funds and occupation, each with a one-line "why we ask". For a basic payment account the app asks only the low-risk minimum and infers the rest from the product.

## Articles 33 and 34: lighter and heavier checks

- **Simplified (Article 33).** Allowed only where the relationship presents a low degree of risk against the risk factors in Annexes II and III, and it must stop as soon as that no longer holds, information is inconsistent, or there is suspicion. AMLA found no further way to simplify within its standards and is preparing separate guidelines (roundtables 9 Nov to 2 Dec 2026).
- **Enhanced (Article 34).** Applies whenever higher risk is identified and in the cases named in Articles 29, 30, 31 and 36 to 46. Article 29 requires enhanced measures for relationships involving persons from third countries the Commission designates as high-risk.
- **PEPs.** AMLA's final draft says PEP checks happen before the relationship starts, then at a risk-sensitive frequency, and without delay on new information.

**What this means for the journey.** The tier decides what the customer sees next: simplified and standard open straight away; enhanced asks for extra documents and a human review before the account opens. The tier table (K-04) is illustrative and says so on screen.

## Article 26: keeping the file up to date

- Article 26(2): the gap between updates of customer information depends on risk and may not exceed **one year** for higher-risk customers under enhanced measures and **five years** for all others. These are ceilings, not schedules.
- Article 26(3): the file must also be updated, whatever the cycle, when the customer's relevant circumstances change, when the bank must contact the customer in the year to review beneficial-ownership information or for tax cooperation, or when it learns a relevant fact about the customer.
- AMLA published draft guidelines on ongoing monitoring under Article 26(5) on 3 June 2026, covering periodic reviews and event-driven updates.
- For existing customers, the final draft standards require files to be brought into line on a risk-sensitive basis within the Article 26(2) periods, counted from the standards' entry into force.

**What this means for the journey.** Flow 2 opens with the reason and the deadline, shows what the bank already holds, and asks only for what is missing, expired or changed. The confirmation screen gives the next review date (12 months for enhanced, up to 60 months for others).

## Dates to watch

| Date | Event |
| --- | --- |
| 19 Jun 2024 | AMLR published in the Official Journal |
| 9 Feb 2026 | AMLA consultation on draft CDD standards |
| 3 Jun 2026 | AMLA draft guidelines on ongoing monitoring (Article 26(5)) |
| 30 Sep 2026 | AMLA final report: draft CDD standards sent to the Commission (announced 1 Oct) |
| Not yet known | Commission adoption; standards proposed to apply six months after entry into force |
| 10 Jul 2027 | AMLR applies |

If the Commission adopts the CDD standards before 21 Feb 2027, update this note and the tier table, and log the change.

## Sources

- AMLR Article 22, 25, 26, 29, 33, 34 text and summaries: springlex.eu/en/packages/aml/amlr-regulation/
- AMLA final draft CDD standards, summary: didit.me/blog/amla-final-cdd-standards-october-2026/
- Final RTS changes since consultation: paytechlaw.com/en/final-rts-on-customer-due-diligence-under-article-28-amlr/
- AMLA consultation of 9 Feb 2026: hlc.com/en/publications/amla-consults-on-draft-rts-on-customer-due-diligence-and-harmonized-supervision
- AMLA draft guidelines on ongoing monitoring: cms.law/en/nld/legal-updates/amla-publishes-draft-guidelines-on-ongoing-monitoring-under-article-26-5-amlr
- Low-risk minimum for purpose and nature (final draft Article 20): springlex.eu/en/packages/aml/rts-cdd-regulation-draft2/article-20/
- itsme activation requirements: itsme-id.com/en-BE/get-started
