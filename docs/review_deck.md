# Datamodel Review - Short Deck (5 slides)

Slide 1 — Title & Goals
- Title: Datamodel Review (QC System)
- Goal: Validate entities, relationships, and acceptance criteria for MVP
- Duration: 30–45 min

Slide 2 — Key Entities
- Drawing, QCP, MeasurementPoint, Inspection, InspectionValue, NonConformance, Supplier, AuditLog
- One-line purpose for each entity

Slide 3 — Important Relationships & Rules
- QCP linked to Drawing (revision-aware)
- One-to-one mapping: Drawing ↔ MeasurementPoint (per rev)
- Inspection has many InspectionValues (sample_index 1..N)
- Supplier overrides (per measurement_point)

Slide 4 — Testcases & Acceptance
- Testcase A (PASS): 5 samples within tolerance → PASS
- Testcase B (FAIL minor): 1 of 5 samples outside tol → FAIL, NC created
- Testcase C (Supplier override): override applied and accepted
- Acceptance criteria checklist (audit log, NC workflow, CSV import sample)

Slide 5 — Next steps & Contact
- Review feedback captured in docs/datamodel_review.md
- Decisions → update datamodel.md & generate migration/seed
- Contact: [project owner]

---

Save this deck as a quick reference to present during the meeting.