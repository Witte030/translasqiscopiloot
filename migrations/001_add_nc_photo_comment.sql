-- Add photo and operator comment to non_conformance
-- Run after 000_initial_schema.sql

ALTER TABLE non_conformance
  ADD COLUMN photo_url text,
  ADD COLUMN operator_comment text;
