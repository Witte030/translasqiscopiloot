# Korte Tech-evaluatie (gratis / open-source opties)

Datum: 2026-01-01

Doel: keuze maken die snel MVP mogelijk maakt, minimumeisen: tablet-friendly UI, audit logging, eenvoudige integratie met Keyence (CSV) en on-premise of cloud deploy.

Optie A (Aanbevolen) — Node.js (TypeScript) + React + PostgreSQL + Keycloak + MinIO
- Voordelen: snelle iteratie, veel gratis tools, brede dev-vaardigheid, goed voor cross-platform (Linux/Windows), eenvoudige integratie met CSV/REST.
- Nadelen: extra werk voor zware Windows-integraties (maar meestal ok).

Optie B — .NET Core (C#) + React + PostgreSQL/SQL Server + Keycloak/Azure AD
- Voordelen: Enterprise/Windows-gericht, makkelijk integreren met bestaande Microsoft-infrastructuur, goede tooling op Windows.
- Nadelen: soms meer licentie- of hostingoverwegingen (SQL Server); nog steeds veel gratis opties.

Optie C — Volledig on-premise, OSS stack (e.g., Django/Flask + Vue + PostgreSQL + Keycloak + MinIO)
- Voordelen: eenvoudig on-premise beheer, veilige lokale deployments (China-data residency), weinig vendor-lockin.
- Nadelen: meer keuzewerk; afhankelijk van team-vaardigheden.

Aanbeveling:
- Start met **Optie A** voor snelheid en brede beschikbaarheid van ontwikkelaars. Gebruik Keycloak als auth om later eenvoudig naar Azure AD te linken indien nodig.
- Plan: MVP-implementatie met CSV-import/exports voor Keyence; pas realtime integratie in fase 2 in overleg met Keyence.

Opslaan: `docs/tech_evaluation.md`