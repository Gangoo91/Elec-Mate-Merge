-- Add qualification categories for EAL Level 3 courses
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES

-- EAL Level 3 Diploma in Electrical Installation (Buildings and Structures)
((SELECT id FROM public.qualifications WHERE code = '600/9332/8' LIMIT 1), 'Health & Safety', 'Health and safety practices in electrical work', 'Shield', '#ef4444', 3, 
ARRAY['Understand electrical safety regulations', 'Apply safe working practices', 'Identify and mitigate electrical hazards'], 
ARRAY['Demonstrate knowledge of electrical safety regulations', 'Show competence in safe isolation procedures', 'Complete risk assessments for electrical work']),

((SELECT id FROM public.qualifications WHERE code = '600/9332/8' LIMIT 1), 'Electrical Theory', 'Fundamental electrical principles and theory', 'Zap', '#3b82f6', 4,
ARRAY['Understand electrical principles', 'Apply Ohm''s law and electrical calculations', 'Understand AC/DC theory'],
ARRAY['Solve electrical calculations', 'Explain electrical phenomena', 'Design basic electrical circuits']),

((SELECT id FROM public.qualifications WHERE code = '600/9332/8' LIMIT 1), 'Installation Techniques', 'Practical electrical installation skills', 'Wrench', '#10b981', 5,
ARRAY['Install electrical systems safely', 'Use appropriate tools and equipment', 'Follow installation standards'],
ARRAY['Complete electrical installations to BS 7671', 'Demonstrate competent use of tools', 'Show understanding of installation methods']),

((SELECT id FROM public.qualifications WHERE code = '600/9332/8' LIMIT 1), 'Testing & Inspection', 'Electrical testing and inspection procedures', 'CheckCircle', '#8b5cf6', 4,
ARRAY['Perform electrical tests', 'Interpret test results', 'Complete inspection reports'],
ARRAY['Carry out electrical tests safely', 'Identify electrical faults', 'Complete test certificates accurately']),

((SELECT id FROM public.qualifications WHERE code = '600/9332/8' LIMIT 1), 'Communication Skills', 'Professional communication and documentation', 'MessageSquare', '#f59e0b', 2,
ARRAY['Communicate effectively with colleagues', 'Complete technical documentation', 'Present information clearly'],
ARRAY['Demonstrate effective verbal communication', 'Produce clear written reports', 'Work effectively in teams']),

-- EAL Level 3 Diploma in Electrical Installation (Buildings and Structures) - Advanced
((SELECT id FROM public.qualifications WHERE code = '601/4629/4' LIMIT 1), 'Advanced Installation', 'Complex electrical installation projects', 'Cpu', '#ef4444', 4,
ARRAY['Plan complex electrical installations', 'Install advanced electrical systems', 'Troubleshoot installation issues'],
ARRAY['Design electrical installations', 'Install three-phase systems', 'Commission electrical equipment']),

((SELECT id FROM public.qualifications WHERE code = '601/4629/4' LIMIT 1), 'Project Management', 'Managing electrical installation projects', 'FolderOpen', '#3b82f6', 3,
ARRAY['Plan electrical projects', 'Manage resources effectively', 'Ensure project compliance'],
ARRAY['Create project schedules', 'Manage project budgets', 'Coordinate with other trades']),

((SELECT id FROM public.qualifications WHERE code = '601/4629/4' LIMIT 1), 'Advanced Testing', 'Advanced electrical testing and fault finding', 'Search', '#10b981', 4,
ARRAY['Perform advanced electrical tests', 'Diagnose complex faults', 'Use advanced test equipment'],
ARRAY['Use oscilloscopes and advanced meters', 'Troubleshoot motor circuits', 'Test protective devices']),

-- City & Guilds Level 3 Electrotechnical Qualification (Apprenticeship Standard)
((SELECT id FROM public.qualifications WHERE code = '5357' LIMIT 1), 'Workplace Safety', 'Workplace health and safety in electrical environments', 'HardHat', '#ef4444', 3,
ARRAY['Apply workplace safety procedures', 'Understand legal requirements', 'Promote safety culture'],
ARRAY['Conduct safety briefings', 'Complete accident reports', 'Implement safety improvements']),

((SELECT id FROM public.qualifications WHERE code = '5357' LIMIT 1), 'Technical Skills', 'Core electrotechnical competencies', 'Settings', '#3b82f6', 6,
ARRAY['Demonstrate technical competence', 'Apply industry standards', 'Use appropriate techniques'],
ARRAY['Complete practical tasks competently', 'Follow technical specifications', 'Adapt techniques to situations']),

((SELECT id FROM public.qualifications WHERE code = '5357' LIMIT 1), 'Professional Development', 'Professional skills and continuous improvement', 'TrendingUp', '#10b981', 2,
ARRAY['Reflect on professional practice', 'Identify development needs', 'Plan career progression'],
ARRAY['Complete self-assessment accurately', 'Set SMART objectives', 'Engage in continuous learning']);

-- Add categories for other City & Guilds qualifications
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES

-- NVQ Diploma in Installing Electrotechnical Systems
((SELECT id FROM public.qualifications WHERE code = '2357' LIMIT 1), 'Installation Practice', 'Practical installation of electrotechnical systems', 'Wrench', '#ef4444', 5,
ARRAY['Install electrical systems competently', 'Follow industry standards', 'Work safely and efficiently'],
ARRAY['Complete installations to BS 7671', 'Demonstrate safe working practices', 'Use tools and equipment correctly']),

((SELECT id FROM public.qualifications WHERE code = '2357' LIMIT 1), 'System Design', 'Design and planning of electrical installations', 'Drafting', '#3b82f6', 3,
ARRAY['Design electrical circuits', 'Calculate electrical loads', 'Select appropriate components'],
ARRAY['Produce accurate circuit diagrams', 'Calculate cable sizes correctly', 'Specify suitable equipment']),

-- Electrotechnical Experienced Worker Qualification
((SELECT id FROM public.qualifications WHERE code = '2346-03' LIMIT 1), 'Regulatory Knowledge', 'Understanding of electrical regulations and standards', 'BookOpen', '#8b5cf6', 3,
ARRAY['Understand BS 7671 requirements', 'Apply building regulations', 'Follow industry codes of practice'],
ARRAY['Interpret regulatory requirements', 'Apply regulations to practical situations', 'Ensure compliance in work activities']),

((SELECT id FROM public.qualifications WHERE code = '2346-03' LIMIT 1), 'Practical Competence', 'Demonstration of practical electrical skills', 'Tool', '#10b981', 4,
ARRAY['Demonstrate competent electrical work', 'Apply experience to new situations', 'Maintain professional standards'],
ARRAY['Complete electrical tasks safely', 'Solve practical problems', 'Maintain quality standards']);