# Risico / Impact Analyse & Implementatieplan

Datum: 2026-01-01

## Samenvatting
Korte, praktische risico- en impactanalyse voor het gekozen stack (Vue3+TS front, .NET Core back, PostgreSQL, Keycloak, MinIO, PWA, on-prem). Onderscheid: hoge-prioriteit (moet mitigeren voor MVP) en medium/laag risico's voor latere fases. Hieronder aanbevelingen, mitigaties en een gefaseerd implementatieplan.

---

## Belangrijkste risico's & mitigaties

1) Data residency & China-location (Hoog)
- Impact: wettelijke beperkingen op waar data mag staan, netwerk latency, en mogelijk beperkingen op externe services.
- Mitigatie: houd productiedata on-premise in China-locatie; plan datavoorziening (DB + MinIO) lokaal; test replicatie en backup-strategie die voldoet aan lokale wetgeving.

2) Keyence integratie (Medium → Hoog afhankelijk van realtime-vereiste)
- Impact: onduidelijke/speciale bestandsformaten of realtime-API behoeften kunnen scope blow-up geven.
- Mitigatie: MVP biedt CSV/JSON import-export; vraag Keyence sample bestanden en SDK-documentatie; plan SDK/integratie als fase 2.

3) Offline / PWA betrouwbaarheid (Medium)
- Impact: operators moeten vaak in (gedeeltelijk) offline fabrieksomgeving werken; inconsistente sync leidt tot data-loss of dubbele inspecties.
- Mitigatie: PWA met local DB (IndexedDB), conflict-resolutie regels en achtergrond-sync; duidelijke UX (draft/sync status) en retry strategie.

4) Auth & compliance (Keycloak) (Medium)
- Impact: RBAC en audits zijn kritisch; verkeerde configuratie kan compliance schenden.
- Mitigatie: setup Keycloak test realm, definieer rollen (operator, qc-operator, kwaliteitsmanager, supplier), schrijf audit policies en integratietests.

5) On-prem deployment complexity (Medium)
- Impact: provisioning, patching en monitoring zijn lastiger dan cloud; CI/CD & backups moeten on-prem geregeld worden.
- Mitigatie: standaardiseer met Docker compose/k8s manifests, documenteer install & rollback; gebruik GitHub Actions voor build & artifacts, maar deployment scripts voor on-prem.

6) Ops/schedule / team skills (Low → Medium)
- Impact: .NET + Vue + Keycloak + MinIO beheer vereist mix skills.
- Mitigatie: plan training, of kies managed opties voor onderdelen waar gewenst; stel runbook op.

7) Scalability & multi-site sync (Medium)
- Impact: meerdere vestigingen (incl. China) vereisen replicatie en central reporting.
- Mitigatie: begin met single-site MVP; definieer sync-architectuur (eventual consistency, message queue) voor fase 2.

---

## Prioritering (MVP focus)
- Must-fix vóór of tijdens MVP: Data residency, CSV Keyence spec, PWA offline basics, Auth & RBAC, audit logging.
- Later (fase 2): realtime Keyence integratie, multi-site replication, advanced monitoring.

---

## Implementatieplan - Fasen & Deliverables (hoog niveau)

Fase 0: Kickoff & voorbereidingen (1–2 weken)
- Doelen: access tot infra, Keyence contact & sample data, team-vaardigheden inventarisatie, test environment opzetten
- Deliverables: Runbook, toegangslijst (DB, MinIO, Keycloak), test datasets

Fase 1: Core MVP (8–12 weken)
- Backend (.NET): API, inspectie-entities, QCP, revisions, basic auth hooks
- Frontend (Vue3+TS): basic screens (inspectie, dashboard, QCP manager), PWA shell
- Database: PostgreSQL schema en migrations
- Auth: Keycloak PoC + RBAC model
- Storage: MinIO setup for drawings/photos
- Keyence: CSV import/export implemented
- Observability: Grafana + Loki basic logging for API
- Tests: unit + selected integration tests

Fase 2: Pilot & stabilisatie (3–6 weken)
- Pilot in 1 vestiging (incl. China if possible), feedback loop
- Add features: photo upload, revisit revision control, notifications
- Hardening: backup, restore tests, on-prem deployment automation

Fase 3: Scale & Integratie (ongoing)
- Realtime Keyence integration, multi-site sync, full i18n and advanced reporting

---

## Acceptatiecriteria MVP
- Operators kunnen een inspectie doen (single + batch samples), PASS/FAIL berekening werkt en wordt gelogd.
- Audit log toont wie, wat en wanneer; non-conformance workflow aanmaak werkt.
- CSV import/export werkt met voorbeeld Keyence files.
- PWA werkt offline: kan drafts maken en syncen wanneer netwerk beschikbaar.

---

## Directe next steps (acties voor week 1)
1. Team & infra inventarisatie: lijst met benodigde toegang & personen (DB, Keyence contact, ops).  
2. Vraag Keyence om 2 voorbeeld CSV/JSON exports en documentatie.  
3. Maak test Keycloak realm en definieer initiele rollen en policies.  
4. Provision test PostgreSQL + MinIO op lokaal test server.  
5. Plan pilot locatie en contactpersoon in China (data residency check).

---

## Checklist & open vragen
- Hebben we Keyence contact en sample data? (ja/nee)
- Is er bestaande on-prem infra (VMs / k8s) of moet dit opgezet worden? (beschrijf)
- Kunnen we een test Windows (of Linux) machine krijgen voor PoC Keycloak + MinIO? (ja/nee)

---

Als je wilt kan ik deze analyse committen naar git en een kort takenpakket (GitHub Issues) aanmaken voor de week-1 acties. Wat wil je dat ik nu doe? (commit/maak issues/anders)