# Datamodel Review - Checklist & Stakeholder Vragen

Datum: 2026-01-01

Doel: korte checklist voor stakeholders om het voorgestelde datamodel te reviewen en concrete feedback te verzamelen vóór implementatie van DB-migraties en tests.

Gebruik: deel dit document met operators, kwaliteitsmedewerkers, productie- en IT-contacten; verzamel antwoorden in de feedbacksectie of tijdens de reviewmeeting.

---

## Belangrijke aandachtspunten (kort)
- Dekking van meetpunten en tekeningen (één-op-één mapping).
- Validatieregels: AQL-beslising en per-sample evaluatie (batch samples: 5–20).
- Supplier-specific overrides (moeten per leverancier actief/zichtbaar zijn tijdens inspecties).
- Traceerbaarheid: wie, wat, wanneer (audit log) en onveranderbaarheid.
- Document- & revisiebeheer (QCP ↔ tekeningrevisies).
- Offline/ PWA-vereisten: drafts, sync, conflict handling.
- Data residency (China) en on-prem vereisten.

---

## Agenda voor reviewmeeting (30–45 min)
1. Intro (5 min): doel en scope van review
2. Walkthrough datamodel (10–15 min): entiteiten en belangrijke relaties
3. Use-cases & testcases (10 min): voorbeeld inspectie met batch-waarden (PASS/FAIL) en NC flow
4. Feedback & open vragen (10–15 min): verzamel concrete opmerkingen en wijzigingen
5. Actiepunten en besluiten (5 min)

---

## Concrete vragenlijst (kopieer + laat invullen)
- [x] Zijn alle relevante entiteiten aanwezig? (drawing, qcp, measurement_point, inspection, inspection_value, non_conformance, supplier, audit_log)
  - Opmerkingen: zover we nu kunnen zien zijn alle entiteiten aanwezig

- [x] Is de één-op-één relatie tussen tekening en meetpunt duidelijk en werkbaar in jullie proces? (nee)
  - Toelichting / uitzonderingen: Een meetpunt hoeft niet altijd op de tekening te staan dit kan ook een functie test zijn of iets anders wat niet op tekening staat.

- [x] Volstaat het data dat we per sample opslaan (sample_index, value, status)? Willen jullie extra metadata per sample? (bijv. operator comment, foto per sample)ja
  - Opmerkingen: Meschien in de toekomst handig dat er een foto toegevoegd kan worden met cometaar als een QCP NOK is

- [x] Zijn supplier-specific overrides (nominal/tolerance) functioneel en duidelijk genoeg? (hoe vaak verwacht je deze te gebruiken?) JA
  - Opmerkingen: We verwachten dit weinig nodig te zijn 

- [x] Voor offline (PWA): is het acceptabel dat drafts lokaal worden opgeslagen en later gesynct? Zijn er aanvullende eisen (bijv. encryptie lokaal, audit-overdracht)? JA
  - Opmerkingen:

- [x] Zijn de audit/log requirements voldoende (wie/wat/wanneer + details JSON)? Zijn er aanvullende compliance eisen? (bijv. WORM, retentieperioden)JA
  - Opmerkingen:

- [x] Acceptatiecriteria voor MVP: welke 3 zaken moeten zeker werken bij pilot (bijv. batch-invoer + AQL check; NC workflow; CSV import)?
  - Prioriteit 1: batch-invoer
  - Prioriteit 2: AQL check
  - Prioriteit 3: CSV import (mag handmatig door bestand te kiezen)

---

## Voorstel testcases om te valideren tijdens review
- Testcase A - PASS: 5 waarden binnen tolerance voor alle meetpunten → overall PASS (dit word later bepaald door de AQL tabel)
- Testcase B - FAIL minor: 1 van 5 values outside tolerance (minor) → overall FAIL, NC aangemaakt, notificatie 
- Testcase C - Supplier override: supplier X heeft afwijkende tolerantie → inspectie gebruikt override en accepteert waarden

Voor elk testcase: geef specifieke voorbeeldwaarden en gewenste uitkomst (resultaat en vervolgworkflow).

---

## Feedback template (kopiëren naar issue of mail)
- Reviewer: [naam]
- Rol: [operator / QC / productie / IT]
- Datum:
- Summary feedback (kort):
- Detailpunten & voorgestelde wijzigingen:
- Acceptatie (ok / beslissen na wijziging / afwijzen):

---

## Volgende acties (na review)
- Verwerk beslissingen in `docs/datamodel.md` en maak eventuele DB-migration drafts.
- Maak seed/testdata voor de drie testcases en voer lokale validations uit.
- Plan follow-up meeting als er grote wijzigingen nodig zijn.

---

Opslaan: `docs/datamodel_review.md`