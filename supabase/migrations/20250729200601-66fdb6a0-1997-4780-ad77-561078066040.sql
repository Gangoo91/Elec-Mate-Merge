-- Update the Electrotechnical Experienced Worker qualification to require portfolio
UPDATE qualifications 
SET requires_portfolio = true 
WHERE code = 'ELEC-EXP-WORKER';