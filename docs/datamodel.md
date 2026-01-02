# Datamodel - concept (MVP)

Datum: 2026-01-01

Doel: overzicht van de belangrijkste entiteiten, relaties en voorbeeld SQL-schema voor MVP. Focus op inspecties, QCPs, tekeningen, meetpunten, leverancierspecificaties, non-conformance en audit logging.

---

## Entiteiten (hoog niveau)

1) drawing
- id (uuid, PK)
- drawing_number (string) - uniek
- revision (string)
- file_path (string) - verwijzing naar MinIO/object storage
- created_by (user_id)
- created_at (timestamp)
- notes (text)

2) qcp (quality control plan)
- id (uuid, PK)
- qcp_code (string)
- drawing_id (uuid, FK -> drawing.id)
- revision (string)
- description (text)
- status (draft/active/archived)
- created_by, created_at

3) measurement_point
- id (uuid, PK)
- qcp_id (uuid, FK -> qcp.id)
- drawing_id (uuid, FK -> drawing.id) NULLABLE  -- allow measurement points that are not tied to a drawing (e.g. functional checks); enforce one-to-one mapping where applicable at app-level/DB check
- source_type (enum: 'drawing'|'functional'|'other') DEFAULT 'drawing'  -- indicates whether the point is on a drawing or is a function/test
- point_code (string)
- name (string)
- nominal (numeric)
- tolerance (numeric)
- unit (string)
- instructions_link (string) - URL to work instruction
- notes (text) -- free text field for special instructions or clarifications

4) supplier
- id (uuid, PK)
- name (string)
- code (string)
- contact_info (json)

5) supplier_spec_override
- id (uuid, PK)
- supplier_id (uuid, FK -> supplier.id)
- measurement_point_id (uuid, FK -> measurement_point.id)
- allowed_nominal (numeric)
- allowed_tolerance (numeric)
- effective_from, effective_to

6) inspection
- id (uuid, PK)
- qcp_id (uuid, FK)
- drawing_id (uuid, FK)
- supplier_id (uuid, FK) nullable
- batch_number / lot_number (string)
- created_by (user_id)
- created_at (timestamp)
- result (PASS / FAIL / DRAFT)
- notes

7) inspection_value (sampled values per measurement point)
- id (uuid, PK)
- inspection_id (uuid, FK -> inspection.id)
- measurement_point_id (uuid, FK)
- sample_index (int) -- for batch samples 1..N
- value (numeric)
- status (PASS/FAIL)
- recorded_by (user_id)
- recorded_at (timestamp)

8) non_conformance
- id (uuid, PK)
- inspection_id (uuid, FK)
- measurement_point_id (uuid, FK) nullable
- created_by (user_id)
- created_at (timestamp)
- status (OPEN / REVIEW / CLOSED)
- severity (minor / major / critical)
- assigned_to (user_id) nullable
- notes, attachments
- photo_url (string) NULLABLE -- link to photo (stored in MinIO)
- operator_comment (text) NULLABLE -- additional operator notes at time of NC creation

9) user (auth user - references Keycloak subject)
- id (uuid, PK)
- kc_sub (string) - Keycloak subject id
- username, display_name, email
- roles (json / separate role table)

10) audit_log
- id (uuid, PK)
- entity_type (string)
- entity_id (uuid)
- action (CREATE/UPDATE/DELETE/APPROVE/REJECT)
- user_id
- timestamp
- details (json)

11) aql_table (optional, definities per control plan)
- id (uuid)
- name
- sampling_level
- lot_size_min/lot_size_max
- acceptance_number
- rejection_number

---

## Relaties en constraints
- `qcp.drawing_id` -> `drawing.id` (many-to-one)
- `measurement_point.qcp_id` -> `qcp.id` (many-to-one)
- `measurement_point.drawing_id` is NULLABLE; when NULL, the measurement_point is not tied to a drawing (e.g., functional test, visual inspection)
- Enforce application logic: één-op-één mapping tussen `drawing` en `measurement_point` only where `source_type='drawing'`
- Inspection -> meerdere `inspection_value` records (1..N) per measurement_point
- Supplier-specific overrides in `supplier_spec_override` kunnen overschrijven nominal/tol tijdens validatie
- Audit log: append-only entries; do not allow deletion in app UI (DB-level soft deletion only)
- NC can optionally have photo_url (stored in MinIO) and operator_comment for future reference

---

## Voorbeeld ERD (tekstueel)

drawing (1) <-- (M) qcp (1) <-- (M) measurement_point (1) <-- (M) inspection_value
inspection (1) <-- (M) inspection_value
inspection (1) <-- (0..1) non_conformance
supplier (1) <-- (M) supplier_spec_override

---

## Voorbeeld SQL (Postgres)

-- tables (excerpt)

CREATE TABLE "drawing" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drawing_number text NOT NULL,
  revision text,
  file_path text,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  notes text
);

CREATE TABLE "qcp" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qcp_code text NOT NULL,
  drawing_id uuid REFERENCES drawing(id) ON DELETE CASCADE,
  revision text,
  description text,
  status text,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE "measurement_point" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qcp_id uuid REFERENCES qcp(id) ON DELETE CASCADE,
  drawing_id uuid REFERENCES drawing(id) ON DELETE SET NULL, -- nullable: not all points on drawing
  source_type text DEFAULT 'drawing', -- 'drawing' | 'functional' | 'other'
  point_code text,
  name text,
  nominal numeric,
  tolerance numeric,
  unit text,
  instructions_link text,
  notes text
);

CREATE TABLE "inspection" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qcp_id uuid REFERENCES qcp(id),
  drawing_id uuid REFERENCES drawing(id),
  supplier_id uuid REFERENCES supplier(id),
  batch_number text,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  result text,
  notes text
);

CREATE TABLE "inspection_value" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id uuid REFERENCES inspection(id) ON DELETE CASCADE,
  measurement_point_id uuid REFERENCES measurement_point(id),
  sample_index int,
  value numeric,
  status text,
  recorded_by uuid,
  recorded_at timestamptz DEFAULT now()
);

CREATE TABLE "non_conformance" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id uuid REFERENCES inspection(id),
  measurement_point_id uuid REFERENCES measurement_point(id),
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  status text,
  severity text,
  assigned_to uuid,
  notes text,
  photo_url text, -- link to photo in MinIO (future feature)
  operator_comment text -- additional operator comment at NC creation
);

CREATE TABLE "audit_log" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  action text,
  user_id uuid,
  timestamp timestamptz DEFAULT now(),
  details jsonb
);

---

## Validatieregels (app / DB)
- AQL en beslislogica in app-layer: per inspection bereken PASS/FAIL op basis van per-sample check en AQL-tabel.
- Supplier overrides: bij inspectie, zoek eerst `supplier_spec_override` voor given supplier & measurement_point en gebruik deze waarden bij validatie.
- Audit: schrijf audit_log entry op create/update/approve/reject events.
- Measurement points not on drawings: allow `drawing_id` NULL for functional tests and other checks; use `source_type` to indicate the type.
- Photo + comment at NC: optionally store photo_url (MinIO) and operator_comment for future troubleshooting and audits.

---

## MVP Priorities (from review feedback 2026-01-02)
1. Batch-invoer (5–20 samples per measurement point)
2. AQL check en PASS/FAIL beslissing
3. CSV import (handmatig bestand kiezen)

---

## Volgende acties
- Review met QC-team: controleer dat alle meetpunten en traceervereisten gedekt zijn ✅ (VOLTOOID 2026-01-02)
- Maak DB-migratie scripts en voorbeeld data (seed) voor testcases (PASS/FAIL).
- Update seed_data.sql to include examples of functional measurement_points (no drawing).
- Add photo upload capability to NC workflow (future feature).

---

Opslaan: `docs/datamodel.md`