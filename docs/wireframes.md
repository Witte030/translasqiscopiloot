# Wireframes & Screen Flows (tekstueel)

Datum: 2026-01-01

## Dashboard - overzicht
- Zoekbalk: partijnummer/tekening/leverancier
- Snelle acties: Nieuwe inspectie, Open non-conformances
- KPI-kaarten: open NC's, time-to-approval, daily inspections

## Inspectie Invoerscherm (Tablet/Desktop)
- Hoofdvelden: Leverancier, Partij# / Batch, QCP, Tekening+Revisie
- Tabel met meetpunten (één regel per meetpunt): naam | nominal | tolerance | hertijn | invoerveld | status
- Knoppen: Opslaan draft, Verzend (final), Upload foto
- AQL-resultaat zichtbaar bovenaan; automatisch PASS/FAIL

Voorbeeld ASCII:
+---------------------------------------------------------+
| Leverancier: [ACME]  Partij: [12345]  QCP: [QCP-1 v2]    |
+---------------------------------------------------------+
| # | Meetpunt | Nom | Tol | Waarde | Resultaat | Foto |
| 1 | MP-100  | 10.0 | ±0.2 | [ 10.12 ] | PASS | [up] |
+---------------------------------------------------------+

## QCP Manager
- Lijst QCPs met versie, gekoppelde tekeningen, eigenaar
- Detail: meetpunten, revisiegeschiedenis, export/import

## NonConformance Review
- Detail NC met foto, inspectie-data, voorgestelde actie
- Buttons: Approve / Reject / Escalate

## Tekening & Meetpunt Editor
- Eén-op-één mapping check (geen duplicaten)
- Link naar werkinstructies, upload nieuwe revisie

Opslaan: `docs/wireframes.md`