-- First, remove the incorrect City & Guilds courses
DELETE FROM public.qualifications WHERE awarding_body = 'City & Guilds';

-- Now insert the correct 6 City & Guilds courses
INSERT INTO public.qualifications (awarding_body, level, title, code, description, requires_portfolio) VALUES
('City & Guilds', 'Level 3', 'Electrotechnical Qualification (Installation or Maintenance) – Apprenticeship Standard', '5357', 'Level 3 electrotechnical qualification for apprenticeship standard pathway', true),
('City & Guilds', 'Level 3', 'NVQ Diploma in Installing Electrotechnical Systems and Equipment (Buildings, Structures and the Environment)', '2357', 'NVQ qualification for installing electrotechnical systems in buildings and structures', true),
('City & Guilds', 'Level 3', 'Electrotechnical Experienced Worker Qualification', '2346-03', 'Qualification for experienced workers in electrotechnical field', true),
('City & Guilds', 'Level 3', 'T Level in Building Services Engineering – Electrical Installation', '8202', 'Technical qualification in building services engineering for electrical installation', true),
('City & Guilds', 'Level 3', 'Maintenance Operations Engineering Technician Apprenticeship', 'MOET', 'Level 3 apprenticeship for maintenance operations engineering technicians', true),
('City & Guilds', 'Level 3', 'Building Services Engineering Installer Apprenticeship (Electrical Pathway)', '3529', 'Apprenticeship for building services engineering installers in electrical pathway', true);