# Post-meeting PR & Summary Template

Use this template to prepare the follow-up PR after the datamodel review meeting.

## PR title
- [DM] Update datamodel according to review — summary

## PR description
- Summary of changes
- Decisions from meeting (link to issue #8)
- Files updated: `docs/datamodel.md`, migrations, seed data
- Test plan: include how to run the three testcases (link to `docs/testcases.md`)

## Checklist
- [ ] Update `docs/datamodel.md` with agreed changes
- [ ] Add or update DB migration scripts
- [ ] Add seed/test data and tests
- [ ] Add unit/integration tests verifying PASS/FAIL/override
- [ ] Update README / developer docs

## Reviewer notes
- Pay attention to AQL logic and supplier override behavior
- Ensure audit_log entries are created on inspection/NC actions

---

Include references to meeting minutes and tag stakeholders for review.