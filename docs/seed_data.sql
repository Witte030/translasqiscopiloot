-- Seed data for demo/testcases (Postgres)

-- 1) sample drawing
INSERT INTO drawing (id, drawing_number, revision, file_path, created_at)
VALUES ('11111111-1111-1111-1111-111111111111','DRW-100','rev2','drawings/DRW-100_rev2.pdf', now());

-- 2) sample QCP
INSERT INTO qcp (id, qcp_code, drawing_id, revision, description, status, created_at)
VALUES ('22222222-2222-2222-2222-222222222222','QCP-1','11111111-1111-1111-1111-111111111111','v1','Sample QCP','active', now());

-- 3) measurement points
INSERT INTO measurement_point (id, qcp_id, drawing_id, point_code, name, nominal, tolerance, unit)
VALUES
('33333333-3333-3333-3333-333333333333','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','MP1','Diameter A',10.0,0.2,'mm'),
('33333333-3333-3333-3333-333333333334','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','MP2','Length B',50.0,0.5,'mm'),
('33333333-3333-3333-3333-333333333335','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','MP3','Depth C',5.0,0.1,'mm');

-- 4) supplier and override example
INSERT INTO supplier (id, name, code)
VALUES ('44444444-4444-4444-4444-444444444444','Supplier S1','S1');

INSERT INTO supplier_spec_override (id, supplier_id, measurement_point_id, allowed_nominal, allowed_tolerance, effective_from)
VALUES ('55555555-5555-5555-5555-555555555555','44444444-4444-4444-4444-444444444444','33333333-3333-3333-3333-333333333335',5.0,0.2, now());

-- NOTE: Use INSERTs into inspection and inspection_value to simulate the testcases during demo.
