-- Update City & Guilds qualifications with proper course codes
UPDATE qualifications 
SET 
  code = '2365-02',
  title = 'Level 2 Diploma in Electrical Installations (Buildings and Structures)'
WHERE id = 'd16cf47a-9d95-4bb8-865e-ee8822822016';

UPDATE qualifications 
SET 
  code = '2365-03',
  title = 'Level 3 Diploma in Electrical Installations (Buildings and Structures)'
WHERE id = 'a7713d2e-3fe3-40b2-abe9-4b7d35c859f6';

-- Remove duplicate entries
DELETE FROM qualifications WHERE id IN ('dc73bae6-43fb-435d-973b-5691f16c2fcb', '89b00f93-9900-4ef6-9c43-db085a4040d9');

-- Update the inspection and testing qualification
UPDATE qualifications 
SET 
  code = '2391-52',
  title = 'Level 3 Award in Initial Verification and Certification of Electrical Installations'
WHERE id = '5c1b780c-c851-4735-94ba-b053b630abb7';