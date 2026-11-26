# K-02 Current-state journey: opening an account in Belgium as a newcomer

*Personal project with a fictional bank (kycBank). Mapped 26 Nov 2026 from public web pages only; no accounts opened, no forms submitted. Real bank names appear here because this is desk research of public pages; none of their branding is used in the prototype.*

## Who this maps

The flow 1 persona: a non-Belgian in the first months in Belgium who needs an account for salary and rent, has a passport and an employment contract, and may not yet have a Belgian residence card.

## Two routes exist, and the newcomer usually gets the slow one

**Fast route: itsme.** KBC says a current account opened with itsme takes about six minutes, including a first transfer. But itsme can only be activated through a major Belgian bank or with a Belgian eID card with chip and a card reader. A newcomer without a Belgian card or bank has neither. KBC states it plainly for applicants abroad: use the manual option, itsme is not available.

**Slow route: documents.** Upload copies, wait for checks, then often a branch visit.

## Bank A: KBC and KBC Brussels

| Step | What the customer does | Documents or data | Source |
| --- | --- | --- | --- |
| 1 | Choose an account (Basic or Plus) | None | KBC account pages |
| 2 | Choose the manual application (no itsme from abroad) | Must prove a coming move to Belgium or a Belgian address | KBC Plus Account page |
| 3 | Upload identity | Copy of front and back of ID card, or passport, as a clear photo or scan | KBC Brussels expat page |
| 4 | Upload proof of activity | Certificate from employer or school in Belgium | KBC Brussels expat page |
| 5 | Upload proof of address | Current domicile: municipality statement or utility bill | KBC Brussels expat page |
| 6 | Non-EU/EEA only: extra uploads | Visa or equivalent, "Annex 46", proof of official activity or establishment in Brussels | KBC Brussels expat page |
| 7 | After arrival: go to a branch | Sign for and collect the debit card; bring ID card and residence permit | KBC Basic Account page |
| 8 | Activate the account after getting the debit card | Card | KBC online account page |

Notes:
- A Basic account at KBC Brussels can, for now, only be opened in a branch by appointment.
- A university guide for incoming staff (UAntwerp) adds two timing rules: open no earlier than 7 days before arrival, and sign at a Belgian branch within 30 days or the account is blocked. This comes from a third party, not the bank's own page; confirm before quoting.

**Count, documents route, from the public pages:** 8 steps, 3 uploads for EU/EEA applicants and 6 for others, and 1 branch visit.

## Bank B: BNP Paribas Fortis

| Step | What the customer does | Documents or data | Source |
| --- | --- | --- | --- |
| 1 | Check eligibility | 18 or older; valid ID card or passport; residence in a country on the bank's eligible list; certificate of residence dated within three months | BNP Paribas Fortis expats page |
| 2 | Apply | Online application form | Same |
| 3 | Validate | Contract arrives by email | Same |
| 4 | Sign | Return the signed application by email | Same |
| 5 | Optional: contact an Expats branch | Multilingual advisers by email or phone; free insurance check-up, rental deposit advice | Same |

For residents, the bank's general page lists an identity card and proof of address (for example an electricity bill), and says the account is for individuals legally residing in Belgium.

**Count, from abroad, from the public page:** 4 steps, 2 documents (ID and certificate of residence), no branch visit described.

## The legal floor: the basic banking service

Anyone legally resident in the EU has a right to a basic payment account in Belgium under Article VII.57 of the Code of Economic Law, as Myria's guide explains. The customer must ask for it explicitly; if the criteria are met the account opens within ten days. A refusal must be given in writing within ten days on request.

## Pain points

| Pain point | Evidence | Status |
| --- | --- | --- |
| Newcomers can't use the fast route | itsme needs a Belgian eID card or an existing Belgian bank; KBC excludes itsme from abroad | Evidenced |
| Document lists differ by bank and by nationality, and are spread across pages | KBC asks for 3 to 6 uploads depending on EU status; BNP Paribas Fortis asks for a certificate of residence | Evidenced |
| A branch visit is still needed after "online" opening | KBC: sign for and collect the debit card in a branch | Evidenced |
| Salary and rent depend on a Belgian account | Myria reports employers refusing to pay salaries into non-Belgian accounts, utilities refusing direct debits from them, and trouble paying rental deposits | Evidenced (Myria) |
| Refusals linked to residence status or nationality | Reported to Myria and Unia | Evidenced (Myria) |
| Unclear why documents and income questions are asked | Not visible on public pages | Assumption, test in interviews |
| Drop-off at the identity step | Not measurable from public pages | Assumption, test in interviews |

## What kycBank flow 1 changes

1. Ask three eligibility questions first, then show the personalised document checklist before any form starts.
2. Offer the eID or itsme route and a "not yet" route side by side, and say how long each takes.
3. Explain every question in one line ("why we ask").
4. Tell the customer the tier result and the next step in plain words, including whether a branch visit is needed.
5. Mention the right to a basic payment account on the eligibility screen.

## Measures for v0.1

- Steps: KBC documents route 8; BNP Paribas Fortis from abroad 4.
- Documents: KBC 3 (EU/EEA) or 6 (non-EU/EEA); BNP Paribas Fortis 2.
- **Fields: not counted.** The public pages don't show the forms. Counting fields needs a walk-through of each online form up to, but not including, the submit step. This is open for Malick before 10 Jan 2027.
- A third bank (ING Belgium) was not mapped: its own expat page did not come up in the search. Add it if time allows.

## Sources

- KBC, open an account online: kbc.be/retail/en/payments/online-rekening-openen.html
- KBC Plus Account (opening from abroad): kbc.be/retail/en/products/payments/current-accounts/plusrekening-rekening-openen-c.html
- KBC Basic Account (branch visit on arrival): kbc.be/retail/en/products/payments/current-accounts/open-a-basic-account.html
- KBC, become a client (six minutes with itsme): kbc.be/retail/en/products/payments/current-accounts/become-client.html
- KBC Brussels, foreign ID card: kbcbrussels.be/retail/en/processes/payments/currrent-account-expats/open-current-account-expat.html
- KBC Brussels, open an account online (Basic only in branch): kbcbrussels.be/retail/en/payments/online-rekening-openen.html
- BNP Paribas Fortis, expats: bnpparibasfortis.be/en/public/individuals/expats
- BNP Paribas Fortis, open a current account: bnpparibasfortis.be/en/public/article/current-account-open
- itsme, get started: itsme-id.com/en-BE/get-started
- Myria guide via EU migrant integration site: migrant-integration.ec.europa.eu/index.php/library-document/belgium-guide-opening-bank-account_en
- UAntwerp staff guide (third party): medialibrary.uantwerpen.be/files/153699/289d76af-0d54-4a5e-9a57-6e169b3cf100.pdf
