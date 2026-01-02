-- Seed data for demo/testcases (Postgres)

-- 1) sample drawing
INSERT INTO drawing (id, drawing_number, revision, file_path, created_at)
VALUES ('11111111-1111-1111-1111-111111111111','DRW-100','rev2','drawings/DRW-100_rev2.pdf', now());

-- 2) sample QCP
INSERT INTO qcp (id, qcp_code, drawing_id, revision, description, status, created_at)
VALUES ('22222222-2222-2222-2222-222222222222','QCP-1','11111111-1111-1111-1111-111111111111','v1','Sample QCP','active', now());

INSERT INTO measurement_point (id, qcp_id, drawing_id, source_type, point_code, name, nominal, tolerance, unit)
VALUES
('33333333-3333-3333-3333-333333333333','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','drawing','MP1','Diameter A',10.0,0.2,'mm'),
('33333333-3333-3333-3333-333333333334','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','drawing','MP2','Length B',50.0,0.5,'mm'),
('33333333-3333-3333-3333-333333333335','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','drawing','MP3','Depth C',5.0,0.1,'mm'),
('33333333-3333-3333-3333-333333333336','22222222-2222-2222-2222-222222222222',NULL,'functional','MP4','Functional Flow Test',1.0,0.1,'bar');

-- 4) supplier and override example
INSERT INTO supplier (id, name, code)
VALUES ('44444444-4444-4444-4444-444444444444','Supplier S1','S1');

INSERT INTO supplier_spec_override (id, supplier_id, measurement_point_id, allowed_nominal, allowed_tolerance, effective_from)
VALUES ('55555555-5555-5555-5555-555555555555','44444444-4444-4444-4444-444444444444','33333333-3333-3333-3333-333333333335',5.0,0.2, now());

-- 5) demo inspection with functional test
INSERT INTO inspection (id, qcp_id, drawing_id, batch_number, created_at, result, notes)
VALUES ('66666666-6666-6666-6666-666666666666','22222222-2222-2222-2222-222222222222','11111111-1111-1111-1111-111111111111','BATCH-FT-001', now(),'PASS','Functional flow test pass example');

INSERT INTO inspection_value (id, inspection_id, measurement_point_id, sample_index, value, status, recorded_at)
VALUES
('77777777-7777-7777-7777-777777777771','66666666-6666-6666-6666-666666666666','33333333-3333-3333-3333-333333333336',1,1.03,'PASS', now()),
('77777777-7777-7777-7777-777777777772','66666666-6666-6666-6666-666666666666','33333333-3333-3333-3333-333333333336',2,0.97,'PASS', now()),
('77777777-7777-7777-7777-777777777773','66666666-6666-6666-6666-666666666666','33333333-3333-3333-3333-333333333336',3,1.01,'PASS', now());

-- NOTE: Use additional INSERTs into inspection and inspection_value to simulate more testcases during demo.
