# MVP Scope & Prioriteiten

Datum: 2026-01-02

Doel: definitie van Minimum Viable Product (MVP) voor het QC-systeem op basis van stakeholder-eisen, datamodel review feedback en risico-analyse. Dit document beschrijft exact wat in MVP zit (scope IN) en wat voor latere fases is (scope OUT).

---

## MVP Doelstellingen

**Primair doel:**
Operators en QC-medewerkers kunnen inspecties uitvoeren met batch-invoer (5-20 samples), PASS/FAIL beslissing op basis van AQL-regels, en volledige traceerbaarheid voor audits.

**Succes criteria:**
- Pilot in 1 locatie succesvol afgerond binnen 8-12 weken
- Minimaal 80% van inspecties digitaal gedaan (vs. papier/Excel)
- Zero data-loss tijdens offline-online overgangen
- Audit-trail compleet en onveranderbaar

---

## Scope IN (MVP Features)

### 1. Core Inspectie Flow (MUST HAVE - Prioriteit 1)
- **Batch-invoer:** operators kunnen 5-20 waarden per meetpunt invoeren via aparte invoervakken
- **Enkele waarde-invoer:** optie voor enkele waarde indien batch niet nodig
- **Real-time validatie:** per sample PASS/FAIL check tegen nominal ±tolerance
- **Stats weergave:** min/max/avg per meetpunt na invoer
- **Supplier overrides:** systeem gebruikt supplier-specifieke toleranties indien aanwezig
- **Functional tests:** meetpunten zonder tekening (bijv. functietests, visuele checks)
- **Overall PASS/FAIL:** inspectie-niveau resultaat op basis van alle meetpunten

### 2. AQL Beslislogica (MUST HAVE - Prioriteit 2)
- **AQL-tabel configuratie:** basis AQL-tabellen aanmaken en koppelen aan QCP
- **Sample size bepaling:** op basis van lot size en AQL niveau
- **Acceptance/Rejection beslissing:** aantal fails vs. AQL acceptance number
- **Clear feedback:** duidelijke indicatie waarom inspectie PASS of FAIL is

### 3. CSV Import/Export (MUST HAVE - Prioriteit 3)
- **Handmatige upload:** gebruiker kan CSV-bestand kiezen en uploaden
- **Keyence CSV import:** parsing van Keyence-formaat (na ontvangst sample van leverancier)
- **Data mapping:** automatische koppeling meetwaarden aan measurement_points
- **Validatie & preview:** toon data voor import-bevestiging
- **Export resultaten:** inspectie-resultaten exporteren naar CSV voor rapportage

### 4. QCP & Meetpunt Beheer (MUST HAVE)
- **QCP aanmaken/bewerken:** koppeling aan tekening + revisie
- **Meetpunten definiëren:** naam, nominal, tolerance, unit, source_type (drawing/functional)
- **Revisiegeschiedenis:** wie/wat/wanneer per QCP-wijziging
- **Tekening upload:** link naar MinIO storage voor tekeningen (PDF/DWG)

### 5. Non-Conformance Workflow (MUST HAVE)
- **NC aanmaken:** automatisch bij FAIL, of handmatig
- **Severity selectie:** minor/major/critical
- **Status tracking:** OPEN → REVIEW → CLOSED
- **Notificaties:** e-mail/alert naar kwaliteitsmanager bij nieuwe NC
- **Toewijzing:** NC kan toegewezen worden aan verantwoordelijke

### 6. Traceerbaarheid & Audit Logging (MUST HAVE)
- **User tracking:** alle acties gekoppeld aan Keycloak user
- **Immutable logs:** audit_log entries niet verwijderbaar via UI
- **Entity-level tracking:** CREATE/UPDATE/DELETE/APPROVE/REJECT events
- **Details in JSON:** oude/nieuwe waarden voor wijzigingen

### 7. Auth & RBAC (MUST HAVE)
- **Keycloak integratie:** SSO met Keycloak test realm
- **Basis rollen:** operator, qc-operator, kwaliteitsmanager, admin
- **Permissies:** operators kunnen inspecties doen; QC kan NC goedkeuren; admin kan QCPs beheren

### 8. Dashboard & Rapportage (SHOULD HAVE)
- **Dashboard:** overzicht open NC's, recente inspecties, KPI's (aantal PASS/FAIL)
- **Inspectie-geschiedenis:** zoeken en filteren op batch, leverancier, QCP
- **Eenvoudige export:** lijst inspecties als CSV voor Excel-rapportage

### 9. Offline/PWA Basis (SHOULD HAVE)
- **Draft opslaan:** lokaal opslaan (IndexedDB) als internet weg is
- **Sync bij reconnect:** automatisch drafts uploaden naar server
- **Status indicator:** duidelijke UI feedback (online/offline/syncing)

---

## Scope OUT (Latere Fases)

### Fase 2 Features
- **Realtime Keyence integratie:** directe API-verbinding met Keyence apparaat (nu: CSV import)
- **Foto-upload bij NC:** foto's toevoegen aan non-conformances (datamodel al voorbereid)
- **Operator comments bij NC:** extra tekstveld (datamodel al voorbereid)
- **Multi-site sync:** replicatie tussen China en NL locaties
- **Advanced AQL:** complexere sampling schemes (nu: basis AQL)
- **Meertaligheid (i18n):** Nederlands/Engels/Chinese UI (nu: Nederlands met voorbereid i18n-framework)

### Fase 3+ Features
- **Advanced analytics:** trending, SPC charts, leverancier-scorecards
- **Document management:** volledige DMS voor werkinstructies en certificaten
- **ERP integratie:** koppeling met bestaande ERP-systeem
- **Mobile native apps:** native iOS/Android apps (nu: PWA)
- **Automated notifications:** WhatsApp/WeChat/Teams integraties (nu: e-mail)
- **Supplier portal:** externe toegang voor leveranciers om eigen NC's te zien

---

## Acceptatiecriteria MVP

### Functioneel
- ✅ Operator kan inspectie starten, batch-waarden invoeren (5-20), en resultaat krijgen binnen 2 minuten
- ✅ AQL-check wordt correct toegepast en PASS/FAIL is traceerbaar
- ✅ CSV-import werkt met Keyence sample-bestand (na ontvangst sample)
- ✅ NC wordt aangemaakt bij FAIL en kwaliteitsmanager krijgt notificatie
- ✅ Audit log bevat alle wijzigingen met user/timestamp
- ✅ Keycloak login werkt en rollen worden correct toegepast

### Technisch
- ✅ Database: PostgreSQL met migraties en rollback-mogelijkheid
- ✅ API: .NET Core met OpenAPI/Swagger documentatie
- ✅ Frontend: Vue 3 + TypeScript, responsive (tablet-friendly)
- ✅ Auth: Keycloak integratie met RBAC
- ✅ Storage: MinIO operationeel voor tekeningen
- ✅ Logging: Grafana + Loki voor monitoring
- ✅ PWA: service worker + offline draft save

### Performance
- ✅ Inspectie-invoer: max 3 sec response tijd voor PASS/FAIL berekening
- ✅ Dashboard load: < 2 sec voor recent inspecties (laatste 50)
- ✅ CSV import: < 10 sec voor bestand met 100 meetpunten
- ✅ Offline sync: < 30 sec voor upload van 10 drafts

### Usability
- ✅ Operators kunnen zonder training eenvoudige inspectie doen (max 5 min onboarding)
- ✅ Touch-friendly UI op tablet (knoppen min. 44x44px)
- ✅ Duidelijke foutmeldingen en validatie-feedback
- ✅ Geen data-verlies bij browser refresh of netwerk-onderbreking

---

## Timeline & Milestones

**Week 1-2: Setup & Infra**
- PostgreSQL + MinIO + Keycloak test environments
- Repository structure & CI/CD pipeline (GitHub Actions)
- Keyence sample CSV ontvangen

**Week 3-6: Core Development**
- Database schema + migrations
- API endpoints: inspection, measurement_point, QCP
- Frontend: inspectie-invoerscherm met batch-entry
- Keycloak auth integratie

**Week 6-9: AQL & Workflows**
- AQL-tabel configuratie + beslislogica
- NC workflow + notificaties
- CSV import/export functionaliteit
- Dashboard & rapportage basis

**Week 9-11: Offline & Testing**
- PWA service worker + offline draft
- Unit + integration tests
- End-to-end testcases (3 scenarios: PASS/FAIL/override)
- Performance tests & optimalisatie

**Week 11-12: Pilot Prep**
- Seed data + demo environment
- Gebruikersdocumentatie & training materiaal
- Pilot deployment op test infra
- Feedback sessie & bug fixes

**Week 13-14: Pilot**
- Pilot in 1 locatie (10-15 gebruikers)
- Dagelijkse monitoring & support
- Feedback verzamelen & prioriteren

**Week 15+: Stabilisatie & Fase 2 Prep**
- Bug fixes & kleine verbeteringen
- Plan voor Fase 2 features
- Scale-out naar andere locaties

---

## Resources & Team

**MVP Team (aanbevolen):**
- 1x Tech Lead / Architect (part-time)
- 2x Backend Developer (.NET Core)
- 2x Frontend Developer (Vue 3)
- 1x QA Engineer (test automation)
- 1x DevOps Engineer (infra & CI/CD)
- 1x Product Owner (stakeholder liaison)

**Externe Dependencies:**
- Keyence contact voor sample CSV & documentatie
- Infra team voor on-prem VM/container provisioning
- Kwaliteitsmanager voor pilot coordinatie
- China-locatie contactpersoon voor data residency check

---

## Risks & Mitigaties (kort)

**Top 3 MVP Risks:**
1. **Keyence CSV format onduidelijk** → Mitigatie: prioriteit 1 sample aanvragen + fallback handmatige mapping UI
2. **Offline sync complex** → Mitigatie: start met simpele draft-save, conflict resolution in Fase 2
3. **Pilot feedback leidt tot scope creep** → Mitigatie: strikte scope IN/OUT, duidelijke Fase 2 planning

---

## Definition of Done (MVP)

MVP is DONE wanneer:
- ✅ Alle acceptatiecriteria zijn gevalideerd (functioneel, technisch, performance, usability)
- ✅ Pilot succesvol afgerond met positieve feedback van minimaal 80% gebruikers
- ✅ Geen critical/blocker bugs open
- ✅ Documentatie compleet (user guide, API docs, runbook)
- ✅ Go/No-Go beslissing voor productie-uitrol genomen door stakeholders

---

Opslaan: `docs/mvp_scope.md`