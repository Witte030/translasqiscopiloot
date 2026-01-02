-- Initial schema for QC MVP (PostgreSQL)
-- Run: psql -f migrations/000_initial_schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE drawing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drawing_number text NOT NULL,
  revision text,
  file_path text,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  notes text
);

CREATE UNIQUE INDEX ux_drawing_number_revision ON drawing (drawing_number, revision);

CREATE TABLE qcp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qcp_code text NOT NULL,
  drawing_id uuid REFERENCES drawing(id) ON DELETE CASCADE,
  revision text,
  description text,
  status text,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX ux_qcp_code_revision ON qcp (qcp_code, revision);

CREATE TABLE measurement_point (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qcp_id uuid REFERENCES qcp(id) ON DELETE CASCADE,
  drawing_id uuid REFERENCES drawing(id) ON DELETE SET NULL,
  source_type text DEFAULT 'drawing',
  point_code text,
  name text,
  nominal numeric,
  tolerance numeric,
  unit text,
  instructions_link text,
  notes text
);

CREATE TABLE supplier (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text,
  contact_info jsonb
);

CREATE UNIQUE INDEX ux_supplier_code ON supplier (code);

CREATE TABLE supplier_spec_override (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES supplier(id) ON DELETE CASCADE,
  measurement_point_id uuid REFERENCES measurement_point(id) ON DELETE CASCADE,
  allowed_nominal numeric,
  allowed_tolerance numeric,
  effective_from timestamptz,
  effective_to timestamptz
);

CREATE TABLE inspection (
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

CREATE INDEX ix_inspection_batch ON inspection (batch_number);

CREATE TABLE inspection_value (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id uuid REFERENCES inspection(id) ON DELETE CASCADE,
  measurement_point_id uuid REFERENCES measurement_point(id),
  sample_index int,
  value numeric,
  status text,
  recorded_by uuid,
  recorded_at timestamptz DEFAULT now()
);

CREATE INDEX ix_inspection_value_inspection ON inspection_value (inspection_id);
CREATE INDEX ix_inspection_value_point ON inspection_value (measurement_point_id);

CREATE TABLE non_conformance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inspection_id uuid REFERENCES inspection(id),
  measurement_point_id uuid REFERENCES measurement_point(id),
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  status text,
  severity text,
  assigned_to uuid,
  notes text
);

CREATE TABLE app_user (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kc_sub text,
  username text,
  display_name text,
  email text,
  roles jsonb
);

CREATE UNIQUE INDEX ux_app_user_kc_sub ON app_user (kc_sub);
CREATE UNIQUE INDEX ux_app_user_username ON app_user (username);

CREATE TABLE audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  action text,
  user_id uuid REFERENCES app_user(id),
  timestamp timestamptz DEFAULT now(),
  details jsonb
);

CREATE INDEX ix_audit_log_entity ON audit_log (entity_type, entity_id);
CREATE INDEX ix_audit_log_user ON audit_log (user_id);

CREATE TABLE aql_table (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  sampling_level text,
  lot_size_min numeric,
  lot_size_max numeric,
  acceptance_number int,
  rejection_number int
);
