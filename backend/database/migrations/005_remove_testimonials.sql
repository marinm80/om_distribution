-- Migration 005: permanently retire the fake testimonial feature.
-- Approved by the project owner on 2026-07-24.
-- Back up the production database before applying this migration.

DROP TABLE IF EXISTS testimonials;

-- Expected result: 0
SELECT COUNT(*) AS remaining_testimonial_tables
FROM information_schema.tables
WHERE table_schema = DATABASE()
  AND table_name = 'testimonials';
