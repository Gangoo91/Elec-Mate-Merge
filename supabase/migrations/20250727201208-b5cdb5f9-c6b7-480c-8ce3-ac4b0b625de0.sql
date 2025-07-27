-- Add qualification categories for EAL and City & Guilds courses
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES

-- EAL Level 3 Building Services Engineering Craftsperson (Electrical) - 603/0149/3
('50e75a28-689f-41f1-86b9-15d7a0ecb893', 'Health & Safety', 'Health and safety practices in electrical work', 'Shield', '#ef4444', 3, 
ARRAY['Understand electrical safety regulations', 'Apply safe working practices', 'Identify and mitigate electrical hazards'], 
ARRAY['Demonstrate knowledge of electrical safety regulations', 'Show competence in safe isolation procedures', 'Complete risk assessments for electrical work']),

('50e75a28-689f-41f1-86b9-15d7a0ecb893', 'Electrical Theory', 'Fundamental electrical principles and theory', 'Zap', '#3b82f6', 4,
ARRAY['Understand electrical principles', 'Apply Ohm''s law and electrical calculations', 'Understand AC/DC theory'],
ARRAY['Solve electrical calculations', 'Explain electrical phenomena', 'Design basic electrical circuits']),

('50e75a28-689f-41f1-86b9-15d7a0ecb893', 'Installation Techniques', 'Practical electrical installation skills', 'Wrench', '#10b981', 5,
ARRAY['Install electrical systems safely', 'Use appropriate tools and equipment', 'Follow installation standards'],
ARRAY['Complete electrical installations to BS 7671', 'Demonstrate competent use of tools', 'Show understanding of installation methods']),

('50e75a28-689f-41f1-86b9-15d7a0ecb893', 'Testing & Inspection', 'Electrical testing and inspection procedures', 'CheckCircle', '#8b5cf6', 4,
ARRAY['Perform electrical tests', 'Interpret test results', 'Complete inspection reports'],
ARRAY['Carry out electrical tests safely', 'Identify electrical faults', 'Complete test certificates accurately']),

-- EAL Level 3 Installation and Maintenance Electrician Apprenticeship - 603/3895/8
('7a2bdf91-51d7-4363-87b9-d4f675331434', 'Workplace Safety', 'Workplace health and safety in electrical environments', 'HardHat', '#ef4444', 3,
ARRAY['Apply workplace safety procedures', 'Understand legal requirements', 'Promote safety culture'],
ARRAY['Conduct safety briefings', 'Complete accident reports', 'Implement safety improvements']),

('7a2bdf91-51d7-4363-87b9-d4f675331434', 'Technical Skills', 'Core electrotechnical competencies', 'Settings', '#3b82f6', 6,
ARRAY['Demonstrate technical competence', 'Apply industry standards', 'Use appropriate techniques'],
ARRAY['Complete practical tasks competently', 'Follow technical specifications', 'Adapt techniques to situations']),

('7a2bdf91-51d7-4363-87b9-d4f675331434', 'Professional Development', 'Professional skills and continuous improvement', 'TrendingUp', '#10b981', 2,
ARRAY['Reflect on professional practice', 'Identify development needs', 'Plan career progression'],
ARRAY['Complete self-assessment accurately', 'Set SMART objectives', 'Engage in continuous learning']),

-- City & Guilds Level 3 Electrotechnical Qualification (Apprenticeship Standard) - 5357
('8fba41dc-6af1-4b51-bb65-6baf391394f4', 'Regulatory Compliance', 'Understanding electrical regulations and compliance', 'BookOpen', '#8b5cf6', 3,
ARRAY['Understand BS 7671 requirements', 'Apply building regulations', 'Follow industry codes of practice'],
ARRAY['Interpret regulatory requirements', 'Apply regulations to practical situations', 'Ensure compliance in work activities']),

('8fba41dc-6af1-4b51-bb65-6baf391394f4', 'Practical Installation', 'Hands-on electrical installation work', 'Tool', '#10b981', 5,
ARRAY['Install electrical systems competently', 'Follow industry standards', 'Work safely and efficiently'],
ARRAY['Complete installations to BS 7671', 'Demonstrate safe working practices', 'Use tools and equipment correctly']),

('8fba41dc-6af1-4b51-bb65-6baf391394f4', 'Quality Assurance', 'Ensuring quality in electrical work', 'CheckSquare', '#f59e0b', 3,
ARRAY['Maintain quality standards', 'Check work against specifications', 'Implement quality improvements'],
ARRAY['Complete quality checks', 'Identify and rectify defects', 'Document quality procedures']),

-- City & Guilds NVQ Diploma in Installing Electrotechnical Systems - 2357
('1bdf0f01-963b-4bca-8d22-3699f781243a', 'System Design', 'Design and planning of electrical installations', 'Drafting', '#3b82f6', 3,
ARRAY['Design electrical circuits', 'Calculate electrical loads', 'Select appropriate components'],
ARRAY['Produce accurate circuit diagrams', 'Calculate cable sizes correctly', 'Specify suitable equipment']),

('1bdf0f01-963b-4bca-8d22-3699f781243a', 'Installation Methods', 'Various electrical installation techniques', 'Wrench', '#ef4444', 4,
ARRAY['Apply different installation methods', 'Adapt to site conditions', 'Follow manufacturer instructions'],
ARRAY['Install conduit and trunking systems', 'Route cables appropriately', 'Terminate connections correctly']),

-- City & Guilds Electrotechnical Experienced Worker - 2346-03
('fde0cace-3cb7-4e32-89e7-4c230e1fe1fb', 'Experience Validation', 'Validation of existing electrical experience', 'Award', '#8b5cf6', 2,
ARRAY['Document electrical experience', 'Demonstrate competent practice', 'Apply knowledge to new situations'],
ARRAY['Provide evidence of competence', 'Complete practical assessments', 'Show continuous development']);