# QC Project - Gesprekslog & Plan

Datum: 2026-01-01

## Gebruikersvereisten (samenvatting)
- Inkomende kwaliteitscontroles voor ingekochte producten
- Kwaliteitscontroles binnen eigen productie
- Beheer van Quality Control Plans (QCP’s), tekeningen en revisies
- Volledige traceerbaarheid en auditability
- Praktisch inzetbaar op de werkvloer, voldoen aan kwaliteits- & compliance-eisen

### Functionele eisen
- Ondersteuning AQL-tabellen & beslislogica
- Eén-op-één relatie tussen tekening en meetpunt
- QCP’s gekoppeld aan tekeningrevisies
- Supplier-specificatie-overrides zichtbaar en afdwingbaar
- Integratie / inzetbaarheid met Keyence 3D meettool

### Workflows & goedkeuringsstructuur
- Minimaal twee workflows: Inkomende goederen en Productie
- Afkeur moet formeel beoordeeld & goedgekeurd worden door bevoegde rol
- Alerts/notificaties bij afkeur en externe rapportage

### Traceerbaarheid & logging
- Wie heeft gecontroleerd, wie heeft geproduceerd
- Logging geschikt voor audits

### Documentatie & revisiebeheer
- Directe links van meetpunten naar werkinstructies
- Revisiegeschiedenis met wie/wat/wanneer

### Gebruik & adoptie
- Gebruiksvriendelijke invoer, minimaal administratieve last
- Multi-site (incl. China) en meertaligheid

---

## MVP Voorstel (kort)
- Rollen: operator, QC-operator, kwaliteitsmanager, leverancier contact
- Basis QCP beheer + revisies
- Invoervenster voor controles (meetpunten)
- AQL-check en beslislogica
- Audit logging (wie/wat/wanneer)
- Alerts bij afkeur
- Import/export voor Keyence (CSV/JSON)
- Responsive UI (desktop/tablet)

Prioriteit: traceerbaarheid en eenvoudige invoer eerst, hardware-integratie later.

---

## Architectuur & tooling (aanbevolen gratis/open-source opties)
- Frontend: React + TypeScript (gratis) of Vue
- Backend: Node.js (TypeScript) met Express/NestJS of .NET Core (als voorkeur Microsoft-stack)
- DB: PostgreSQL (gratis)
- Auth: Keycloak (open-source) of Azure AD (als je al in Azure zit)
- Storage: lokale opslag / MinIO (S3-compat) voor on-premise
- Logs: ELK-stack of Grafana + Loki

---

## Roadmap (hoog niveau)
- Wk 0–3: stakeholderinterviews, definitie MVP (VOLTOOID)
- Wk 3–6: wireframes, user stories, datamodel
- Wk 6–12: implementatie MVP
- Wk 12–14: integratie Keyence CSV import, interne tests
- Wk 14–18: pilot en feedback

---

## Huidige taken (kort)
- Stakeholderinterviews: voltooid
- Definieer MVP-scope & prioriteit: in-progress


---

Als je wilt, kan ik dit bestand ook direct committen naar git, of uploaden naar OneDrive/Google Drive (daarvoor heb ik jouw bevestiging/credentials nodig).