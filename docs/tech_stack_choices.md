# Tech Stack keuzes

Datum: 2026-01-01

Gebaseerd op jouw invulling:

- **Frontend:** Vue 3 + TypeScript
- **Styling / CSS:** Sass (BEM)
- **Backend:** .NET Core (C#)
- **Database:** PostgreSQL (met optie SQL Server)
- **Auth / RBAC:** Keycloak
- **Storage (tekeningen / foto's):** MinIO (S3-compat)
- **Keyence integratie (MVP / fase 2):** CSV import/export (MVP)
- **Logging / Monitoring / Audit:** Grafana + Loki
- **CI / CD:** GitHub Actions
- **Deployment / Hosting:** On-premise
- **Offline / Mobile support:** Progressive Web App (PWA)
- **i18n / Meertaligheid:** i18n frontend lib (Nederlands/Engels/Chinese)
- **Testing:** Unit-tests + Integration tests

Opmerkingen & aanbevelingen:
- .NET Core + PostgreSQL is een solide enterprise-combi en werkt goed on-premise; SQL Server kan als alternatieve DB gebruikt worden als er sterke Windows/SQL Server voorkeur is.
- Keycloak geeft je SSO/RBAC zonder betaalde vendor lock-in en is goed te integreren met .NET en Vue.
- MinIO biedt S3-compat opslag on-premise waardoor later eenvoudige migratie naar cloud mogelijk is.
- Voor Keyence: start met CSV/JSON import-export in MVP; plan SDK/API integratie als fase 2 in samenwerking met Keyence.

Volgende aanbevolen stap: risico/impact-analyse & implementatieplan (team skills, infra, data residency China).

Wil je dat ik deze file commit naar git en/of een korte risicoanalyse maak? (ja/nee)