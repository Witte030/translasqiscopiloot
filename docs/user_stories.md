# User Stories - MVP

Datum: 2026-01-01

## Epics & Belangrijke User Stories

Epic: Inkomende Goederen (Inkoop)
- Als QC-operator wil ik een inkomende-inspectie starten voor een partij zodat ik snel kan bepalen of de levering voldoet aan specificaties.
  - Acceptatiecriteria: Selecteer leverancier, partijnummer, QCP; invoeren van meetpunten; AQL-check uitgevoerd; resultaat PASS/FAIL.

- Als kwaliteitsmanager wil ik meldingen ontvangen bij afkeur zodat ik actie kan ondernemen.
  - Acceptatiecriteria: Notificatie via e-mail/Teams/Webhook bij NonConformance.

Epic: Productie-Inspectie
- Als operator wil ik tijdens productie meetwaarden kunnen invullen op tablet zodat controles snel op de werkvloer gebeuren.
  - Acceptatiecriteria: Velden zijn touch-vriendelijk, defaults mogelijk, afkeur vereist opmerking en optioneel foto-upload.

Epic: QCP & Tekeningbeheer
- Als documentbeheerder wil ik QCPs kunnen koppelen aan tekeningrevisies zodat revisie-specifieke meetpunten worden gebruikt.
  - Acceptatiecriteria: QCP versies zichtbaar, history (wie/wat/wanneer), terugrollen mogelijk.

Epic: Afkeur & NonConformance
- Als kwaliteitsmanager wil ik NonConformance kunnen beoordelen en formeel goedkeuren of afsluiten.
  - Acceptatiecriteria: Audit-trail van beslissingen, notificaties, mogelijkheid tot export rapport.

Epic: Traceerbaarheid & Audit
- Als auditor wil ik kunnen zien wie welke inspectie heeft uitgevoerd en welke acties volgden.
  - Acceptatiecriteria: Immutable logrecords per inspectie met user, timestamp, wijzigingsdetails.


## Prioriteiten (MVP)
1. Basis inspectieflow (select QCP, meetpunten, invoer, AQL-resultaat) - MUST
2. Audit logging & traceerbaarheid - MUST
3. QCP koppeling aan tekening en revisiebeheer (basis) - MUST
4. Notificaties bij afkeur - SHOULD
5. Import/export Keyence CSV/JSON - SHOULD
6. Realtime Keyence integratie, offline mode, multi-site & meertaligheid - later fases


## Acceptance-testsuggesties
- Maak 3 testcases: PASS, FAIL (minor), FAIL (major) en controleer dat AQL & workflows het correcte vervolg initiëren.
- Controleer audit logs voor volledige info: user, timestamp, oude/nieuwe waarden.

---

Opslaan: `docs/user_stories.md`