# K-11 Decision log

*Personal project with a fictional bank (kycBank). One entry per decision, with the option rejected. "Proposed" entries wait for Malick's confirmation.*

| ID | Date | Decision | Option rejected | Why | Status |
| --- | --- | --- | --- | --- | --- |
| D-01 | 26 Nov 2026 | Build for a fictional Belgian bank under the EU AML Regulation first | Mozambique first | The portfolio targets Belgian banks and insurers; a Mozambique version needs Banco de Moçambique research that isn't in the 18 hours. Mozambique becomes a second rule file after v1.0 | Decided |
| D-02 | 26 Nov 2026 | Name the fictional bank kycBank; host on kyc.malickmanso.com | A realistic-sounding bank name | Reads as plainly fictional, so nobody mistakes it for a real bank; no real bank of that name found | Decided |
| D-03 | 26 Nov 2026 | Questions, "why we ask" text and the tier table live in JSON | Rules written into the code | A rule change, such as AMLA's final standards, becomes a data edit, and a Mozambique version a second file | Decided |
| D-04 | 26 Nov 2026 | Tier = the highest tier any answer points to | A points score | Transparent and easy to explain on screen; a score would look like a real risk model, which the prototype must not claim to be | Proposed |
| D-05 | 26 Nov 2026 | Non-EU residence or nationality not on the EU high-risk list leads to standard checks | Simplified checks for all non-listed countries | Keeps simplified for the clearest low-risk case; enhanced stays reserved for listed countries as AMLR Article 29 requires | Proposed |
| D-06 | 26 Nov 2026 | Offer two identity routes side by side: itsme or Belgian eID, and "I don't have one yet" | itsme only | itsme needs a Belgian eID or an existing Belgian bank, which newcomers often lack (K-02); AMLA's final draft allows a document-based remote route only when eID isn't available | Proposed |
| D-07 | 26 Nov 2026 | Mention the right to a basic payment account on the eligibility screen | Leave it out | It's the legal floor for anyone legally resident in the EU, and newcomers report refusals (Myria) | Proposed |
| D-08 | 26 Nov 2026 | Low-risk customers skip the address step | Ask everyone for an address | AMLA's final draft says the address is not required for low-risk customers; fewer fields for the simplified tier | Proposed |
| D-09 | 26 Nov 2026 | Account choice comes before the document list | Account choice after the tier result | The account type changes both the tier and the documents needed, so it has to be known first | Proposed |
| D-10 | 26 Nov 2026 | The data-use screen comes before the identity step | Data use after the tier result | People should know how their details are used before they give them | Proposed |
| D-11 | 26 Nov 2026 | Say the legal basis is the law, not consent; one optional, unticked box for marketing | One consent box covering everything | Due-diligence data is required by law, so asking for consent would mislead; marketing is the only real choice | Proposed |
| D-12 | 26 Nov 2026 | Ask for the address on the result screen, only when the tier needs it and itsme didn't supply it | Ask everyone for an address up front | Applies D-08; the simplified eID path needs no typed fields at all | Proposed |
| D-13 | 26 Nov 2026 | A "Show test log" button on the last screen with time per screen and counts | External analytics for the usability test | Gives the K-08 measures without any data leaving the browser | Proposed |
