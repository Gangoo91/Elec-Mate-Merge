-- First, delete qualification categories associated with existing EAL qualifications
DELETE FROM public.qualification_categories 
WHERE qualification_id IN (
  SELECT id FROM public.qualifications 
  WHERE awarding_body = 'EAL'
);

-- Delete existing EAL qualifications
DELETE FROM public.qualifications 
WHERE awarding_body = 'EAL';

-- Insert new EAL qualifications with requires_portfolio = true
INSERT INTO public.qualifications (awarding_body, level, title, code, description, requires_portfolio, created_at, updated_at) VALUES
('EAL', 'Level 2', 'Diploma in Electrical Installations (Buildings and Structures)', 'EAL-600/4338/5', 'Level 2 Diploma in Electrical Installations covering buildings and structures installations', true, now(), now()),
('EAL', 'Level 3', 'Diploma in Electrical Installations (Buildings and Structures)', 'EAL-600/4340/3', 'Level 3 Diploma in Electrical Installations covering advanced buildings and structures installations', true, now(), now()),
('EAL', 'Level 2', 'Award in Safe Isolation of Electrical Supplies', 'EAL-600/4939/2', 'Level 2 Award covering safe isolation procedures for electrical supplies', true, now(), now()),
('EAL', 'Level 3', 'Award in the Requirements for Electrical Installations', 'EAL-600/4341/5', 'Level 3 Award covering requirements and regulations for electrical installations', true, now(), now()),
('EAL', 'Level 2', 'Certificate in Fundamental Inspection and Testing', 'EAL-600/4342/7', 'Level 2 Certificate covering fundamental inspection and testing procedures', true, now(), now()),
('EAL', 'Level 3', 'Certificate in Inspection, Testing and Certification', 'EAL-600/4343/9', 'Level 3 Certificate covering advanced inspection, testing and certification procedures', true, now(), now()),
('EAL', 'Level 2', 'Certificate in Electric Vehicle Charge Point Installation', 'EAL-600/7518/X', 'Level 2 Certificate covering installation of electric vehicle charge points', true, now(), now()),
('EAL', 'Level 3', 'Award in Solar Photovoltaic Systems', 'EAL-600/7519/1', 'Level 3 Award covering solar photovoltaic system installation and maintenance', true, now(), now());