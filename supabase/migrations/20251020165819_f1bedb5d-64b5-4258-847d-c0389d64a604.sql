-- BACKUP FIRST (just in case we need to rollback)
CREATE TABLE IF NOT EXISTS maintenance_knowledge_backup AS 
SELECT * FROM maintenance_knowledge;

-- DELETE Stage 1: Definitely garbage (very short content < 100 chars)
DELETE FROM maintenance_knowledge
WHERE LENGTH(content) < 100;

-- DELETE Stage 2: Short topics (<=3 chars) with short content (<500 chars)
DELETE FROM maintenance_knowledge
WHERE LENGTH(topic) <= 3 
  AND LENGTH(content) < 500;

-- DELETE Stage 3: Copyright headers and page numbers
DELETE FROM maintenance_knowledge
WHERE topic LIKE '©The Electrical Safety Council%'
   OR topic LIKE 'page %©The El%'
   OR topic LIKE '©%...'
   OR (topic LIKE '%...' AND LENGTH(content) < 300);

-- DELETE Stage 4: Truncated topics that are table fragments
DELETE FROM maintenance_knowledge
WHERE (topic LIKE ': ''%' OR (topic LIKE '%-%' AND LENGTH(topic) < 15))
  AND LENGTH(content) < 400;

-- Refresh statistics
ANALYZE maintenance_knowledge;