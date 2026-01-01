# Testcases for Datamodel Review (MVP)

## Testcase A — PASS (5 samples)
- Context: QCP-1, MP1 (nominal=10.0, tol=±0.2)
- Samples (5): 10.05, 9.98, 10.10, 9.95, 10.00
- Expected:
  - Each sample within tolerance → MP1 PASS
  - Overall inspection: PASS
  - No NC created

## Testcase B — FAIL minor (5 samples)
- Context: QCP-1, MP2 (nominal=50.0, tol=±0.5)
- Samples (5): 50.2, 49.6, 50.1, 50.0, 49.4
- Expected:
  - Two samples out of tolerance (49.6 ok; 49.4 fail if tol ±0.5)
  - Overall MP2 status: FAIL (2/5)
  - Overall inspection: FAIL
  - Create NonConformance with severity=minor; notify QC manager

## Testcase C — Supplier override
- Context: Supplier S1 overrides MP3 tolerance to ±0.2 (nominal 5.0)
- Samples (5): 4.95, 5.05, 5.15, 4.90, 5.00
- Expected:
  - Using override ±0.2: 5.15 is FAIL, 4.90 is FAIL (2 fails)
  - If override makes them acceptable, inspection reflects PASS per override
  - Document use of override in inspection meta

---

## Where to run
- Use the provided seed SQL (`docs/seed_data.sql`) to create sample QCP and measurement points, then run the three testcases.

## Notes
- For POC demo: show entering batch values (5) in the prototype and executing the PASS/FAIL flow.
- Validate audit_log entries for each inspection and any created NC.
