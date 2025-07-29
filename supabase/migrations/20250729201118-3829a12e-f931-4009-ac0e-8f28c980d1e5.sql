-- Clear the current user selection and update to use our new qualification
UPDATE user_qualification_selections 
SET is_active = false 
WHERE user_id = '93e33dd2-d866-46ab-8bfc-4ecb7074849a' AND is_active = true;

-- Insert new selection for the correct qualification
INSERT INTO user_qualification_selections (
  user_id,
  qualification_id,
  is_active,
  progress_percentage
) VALUES (
  '93e33dd2-d866-46ab-8bfc-4ecb7074849a',
  (SELECT id FROM qualifications WHERE code = 'ELEC-EXP-WORKER'),
  true,
  0
);