-- Update EAL qualifications with proper course codes
UPDATE qualifications 
SET 
  code = 'QLS-600/2356/5',
  title = 'EAL Level 2 Diploma in Electrical Installation (Buildings and Structures)'
WHERE id = '184ed060-5464-4f54-bdf1-66fb3e4ad12d';

UPDATE qualifications 
SET 
  code = 'QLS-600/2357/7',
  title = 'EAL Level 3 Advanced Diploma in Electrical Installation (Buildings and Structures)'
WHERE id = '1e6eef8f-f951-4a28-9347-48f3d3fb306b';

UPDATE qualifications 
SET 
  code = 'QLS-600/1686/4',
  title = 'EAL Level 3 NVQ Diploma in Installing Electrotechnical Systems and Equipment'
WHERE id = '4d6732ad-ff5a-47fa-884f-529f2f691b6f';

-- Remove duplicate entries
DELETE FROM qualifications WHERE id IN ('64fde7cf-814d-41e2-b786-8379aa3259e5', '60fad04b-fae9-45e0-b0b5-0dddb94857e3');