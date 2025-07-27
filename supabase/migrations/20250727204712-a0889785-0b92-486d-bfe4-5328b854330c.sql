-- Add portfolio categories for City & Guilds 8202 - T Level in Building Services Engineering – Electrical Installation
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '8202'), 'Electrical Installation Theory', 'Understanding electrical principles, regulations, and theoretical concepts', 'BookOpen', '#3B82F6', 8, 
ARRAY['Understand electrical principles and theory', 'Apply BS 7671 18th Edition requirements', 'Demonstrate knowledge of electrical systems'],
ARRAY['AC.1.1 Electrical principles application', 'AC.1.2 Wiring regulations compliance', 'AC.1.3 System design understanding']),

((SELECT id FROM qualifications WHERE code = '8202'), 'Practical Installation Skills', 'Hands-on electrical installation work and practical competencies', 'Zap', '#F59E0B', 12,
ARRAY['Perform safe electrical installations', 'Use appropriate tools and equipment', 'Complete installations to industry standards'],
ARRAY['AC.2.1 Safe installation practices', 'AC.2.2 Tool usage and maintenance', 'AC.2.3 Quality workmanship']),

((SELECT id FROM qualifications WHERE code = '8202'), 'Testing and Inspection', 'Electrical testing, inspection, and certification procedures', 'Search', '#10B981', 6,
ARRAY['Conduct electrical tests and inspections', 'Issue electrical certificates', 'Identify and rectify faults'],
ARRAY['AC.3.1 Testing procedures', 'AC.3.2 Certification compliance', 'AC.3.3 Fault diagnosis']),

((SELECT id FROM qualifications WHERE code = '8202'), 'Health and Safety', 'Workplace safety, risk assessment, and safe working practices', 'Shield', '#EF4444', 4,
ARRAY['Apply health and safety legislation', 'Conduct risk assessments', 'Implement safe working practices'],
ARRAY['AC.4.1 Safety legislation application', 'AC.4.2 Risk assessment completion', 'AC.4.3 Safe work procedures']),

((SELECT id FROM qualifications WHERE code = '8202'), 'Professional Development', 'Communication, teamwork, and continuous professional development', 'Users', '#8B5CF6', 3,
ARRAY['Demonstrate effective communication', 'Work collaboratively in teams', 'Engage in continuous learning'],
ARRAY['AC.5.1 Communication skills', 'AC.5.2 Team collaboration', 'AC.5.3 Professional development']);

-- Add portfolio categories for City & Guilds MOET - Maintenance Operations Engineering Technician Apprenticeship
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = 'MOET'), 'Engineering Principles', 'Core engineering concepts and mathematical applications', 'Calculator', '#3B82F6', 10,
ARRAY['Apply engineering mathematics', 'Understand mechanical principles', 'Demonstrate engineering problem-solving'],
ARRAY['AC.1.1 Mathematical applications', 'AC.1.2 Mechanical systems understanding', 'AC.1.3 Problem-solving techniques']),

((SELECT id FROM qualifications WHERE code = 'MOET'), 'Maintenance Practices', 'Planned and reactive maintenance procedures and techniques', 'Wrench', '#F59E0B', 15,
ARRAY['Plan maintenance schedules', 'Perform preventive maintenance', 'Execute reactive maintenance'],
ARRAY['AC.2.1 Maintenance planning', 'AC.2.2 Preventive procedures', 'AC.2.3 Reactive maintenance']),

((SELECT id FROM qualifications WHERE code = 'MOET'), 'Technical Systems', 'Understanding and working with various technical systems and equipment', 'Cog', '#10B981', 12,
ARRAY['Operate technical equipment', 'Understand system integration', 'Troubleshoot technical issues'],
ARRAY['AC.3.1 Equipment operation', 'AC.3.2 System integration', 'AC.3.3 Troubleshooting skills']),

((SELECT id FROM qualifications WHERE code = 'MOET'), 'Quality and Compliance', 'Quality control, regulatory compliance, and documentation', 'FileCheck', '#EF4444', 6,
ARRAY['Maintain quality standards', 'Ensure regulatory compliance', 'Complete accurate documentation'],
ARRAY['AC.4.1 Quality control procedures', 'AC.4.2 Compliance requirements', 'AC.4.3 Documentation standards']),

((SELECT id FROM qualifications WHERE code = 'MOET'), 'Professional Skills', 'Communication, teamwork, and continuous improvement', 'Users', '#8B5CF6', 4,
ARRAY['Communicate effectively', 'Work in multidisciplinary teams', 'Pursue continuous improvement'],
ARRAY['AC.5.1 Communication effectiveness', 'AC.5.2 Team collaboration', 'AC.5.3 Continuous improvement']);

-- Add portfolio categories for EAL 600/4337/4 - EAL Level 3 Electrotechnical Occupational Competence (AM2 Gateway)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '600/4337/4'), 'Electrical Installation', 'Practical electrical installation and wiring skills', 'Zap', '#3B82F6', 8,
ARRAY['Install electrical systems safely', 'Complete wiring installations', 'Follow installation procedures'],
ARRAY['AC.1.1 Safe installation practices', 'AC.1.2 Wiring competency', 'AC.1.3 Procedure compliance']),

((SELECT id FROM qualifications WHERE code = '600/4337/4'), 'Testing and Commissioning', 'Testing, commissioning, and verification of electrical installations', 'Search', '#F59E0B', 6,
ARRAY['Conduct installation testing', 'Commission electrical systems', 'Verify installation compliance'],
ARRAY['AC.2.1 Testing procedures', 'AC.2.2 Commissioning protocols', 'AC.2.3 Compliance verification']),

((SELECT id FROM qualifications WHERE code = '600/4337/4'), 'Fault Finding', 'Electrical fault diagnosis and rectification techniques', 'AlertTriangle', '#EF4444', 4,
ARRAY['Diagnose electrical faults', 'Rectify installation problems', 'Test fault repairs'],
ARRAY['AC.3.1 Fault diagnosis', 'AC.3.2 Problem rectification', 'AC.3.3 Repair verification']),

((SELECT id FROM qualifications WHERE code = '600/4337/4'), 'Occupational Competence', 'Workplace competency and professional standards', 'Award', '#10B981', 5,
ARRAY['Demonstrate workplace competency', 'Meet professional standards', 'Apply industry best practices'],
ARRAY['AC.4.1 Competency demonstration', 'AC.4.2 Professional standards', 'AC.4.3 Best practice application']);

-- Add portfolio categories for EAL 603/3928/7 - EAL Level 3 Electrotechnical Qualification (Maintenance) (NVQ)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '603/3928/7'), 'Electrical Maintenance', 'Maintenance of electrical systems and equipment', 'Wrench', '#3B82F6', 12,
ARRAY['Maintain electrical systems', 'Service electrical equipment', 'Prevent electrical failures'],
ARRAY['AC.1.1 System maintenance', 'AC.1.2 Equipment servicing', 'AC.1.3 Failure prevention']),

((SELECT id FROM qualifications WHERE code = '603/3928/7'), 'Fault Diagnosis', 'Identification and resolution of electrical faults', 'AlertTriangle', '#F59E0B', 8,
ARRAY['Identify electrical faults', 'Analyse fault causes', 'Implement fault solutions'],
ARRAY['AC.2.1 Fault identification', 'AC.2.2 Cause analysis', 'AC.2.3 Solution implementation']),

((SELECT id FROM qualifications WHERE code = '603/3928/7'), 'Testing and Inspection', 'Testing and inspection of electrical installations for maintenance', 'Search', '#10B981', 6,
ARRAY['Test electrical installations', 'Inspect electrical systems', 'Document test results'],
ARRAY['AC.3.1 Installation testing', 'AC.3.2 System inspection', 'AC.3.3 Results documentation']),

((SELECT id FROM qualifications WHERE code = '603/3928/7'), 'Health and Safety', 'Safe working practices in electrical maintenance', 'Shield', '#EF4444', 4,
ARRAY['Apply safety procedures', 'Use safety equipment', 'Maintain safe work environment'],
ARRAY['AC.4.1 Safety procedure application', 'AC.4.2 Equipment usage', 'AC.4.3 Environment maintenance']);

-- Add portfolio categories for EAL 603/3929/9 - EAL Level 3 Electrotechnical Qualification (Installation) (NVQ)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '603/3929/9'), 'Electrical Installation', 'Installation of electrical systems and equipment', 'Zap', '#3B82F6', 10,
ARRAY['Install electrical systems', 'Connect electrical equipment', 'Complete installation work'],
ARRAY['AC.1.1 System installation', 'AC.1.2 Equipment connection', 'AC.1.3 Work completion']),

((SELECT id FROM qualifications WHERE code = '603/3929/9'), 'Wiring Systems', 'Installation and termination of electrical wiring systems', 'Cable', '#F59E0B', 8,
ARRAY['Install wiring systems', 'Terminate electrical connections', 'Route cables correctly'],
ARRAY['AC.2.1 Wiring installation', 'AC.2.2 Connection termination', 'AC.2.3 Cable routing']),

((SELECT id FROM qualifications WHERE code = '603/3929/9'), 'Testing and Commissioning', 'Testing and commissioning of electrical installations', 'Search', '#10B981', 6,
ARRAY['Test electrical installations', 'Commission electrical systems', 'Verify system operation'],
ARRAY['AC.3.1 Installation testing', 'AC.3.2 System commissioning', 'AC.3.3 Operation verification']),

((SELECT id FROM qualifications WHERE code = '603/3929/9'), 'Health and Safety', 'Safe working practices in electrical installation', 'Shield', '#EF4444', 4,
ARRAY['Follow safety procedures', 'Use protective equipment', 'Maintain workplace safety'],
ARRAY['AC.4.1 Procedure compliance', 'AC.4.2 Equipment usage', 'AC.4.3 Safety maintenance']);

-- Add portfolio categories for EAL 603/4027/6 - EAL Level 3 Electrotechnical Experienced Worker Qualification (Installation or Maintenance)
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '603/4027/6'), 'Advanced Installation', 'Complex electrical installation techniques and procedures', 'Zap', '#3B82F6', 10,
ARRAY['Perform complex installations', 'Apply advanced techniques', 'Handle challenging projects'],
ARRAY['AC.1.1 Complex installation skills', 'AC.1.2 Advanced technique application', 'AC.1.3 Project management']),

((SELECT id FROM qualifications WHERE code = '603/4027/6'), 'Advanced Maintenance', 'Sophisticated maintenance and repair procedures', 'Wrench', '#F59E0B', 8,
ARRAY['Execute complex maintenance', 'Perform advanced repairs', 'Optimise system performance'],
ARRAY['AC.2.1 Complex maintenance execution', 'AC.2.2 Advanced repair techniques', 'AC.2.3 Performance optimisation']),

((SELECT id FROM qualifications WHERE code = '603/4027/6'), 'Professional Competence', 'Demonstration of experienced worker capabilities', 'Award', '#10B981', 6,
ARRAY['Demonstrate professional expertise', 'Apply industry experience', 'Mentor junior workers'],
ARRAY['AC.3.1 Expertise demonstration', 'AC.3.2 Experience application', 'AC.3.3 Mentoring abilities']),

((SELECT id FROM qualifications WHERE code = '603/4027/6'), 'Quality Assurance', 'Quality control and continuous improvement practices', 'FileCheck', '#8B5CF6', 4,
ARRAY['Ensure quality standards', 'Implement improvements', 'Monitor work quality'],
ARRAY['AC.4.1 Quality standards', 'AC.4.2 Improvement implementation', 'AC.4.3 Quality monitoring']);

-- Add portfolio categories for EAL 603/5806/9 - EAL Level 3 Building Services Engineering Installer (Electrical) Apprenticeship
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '603/5806/9'), 'Building Services Installation', 'Installation of electrical building services systems', 'Building', '#3B82F6', 12,
ARRAY['Install building electrical systems', 'Connect service equipment', 'Commission building services'],
ARRAY['AC.1.1 System installation', 'AC.1.2 Equipment connection', 'AC.1.3 Service commissioning']),

((SELECT id FROM qualifications WHERE code = '603/5806/9'), 'Control Systems', 'Installation and configuration of electrical control systems', 'Settings', '#F59E0B', 8,
ARRAY['Install control systems', 'Configure control equipment', 'Test control functions'],
ARRAY['AC.2.1 Control installation', 'AC.2.2 Equipment configuration', 'AC.2.3 Function testing']),

((SELECT id FROM qualifications WHERE code = '603/5806/9'), 'Energy Efficiency', 'Energy-efficient electrical systems and sustainability', 'Leaf', '#10B981', 6,
ARRAY['Apply energy efficiency principles', 'Install sustainable systems', 'Monitor energy performance'],
ARRAY['AC.3.1 Efficiency principles', 'AC.3.2 Sustainable installation', 'AC.3.3 Performance monitoring']),

((SELECT id FROM qualifications WHERE code = '603/5806/9'), 'Customer Service', 'Client interaction and professional service delivery', 'Users', '#8B5CF6', 4,
ARRAY['Provide professional service', 'Communicate with clients', 'Deliver customer satisfaction'],
ARRAY['AC.4.1 Service delivery', 'AC.4.2 Client communication', 'AC.4.3 Satisfaction achievement']);

-- Add portfolio categories for EAL 603/5933/7 - EAL T Level in Building Services Engineering – Electrical Installation
INSERT INTO qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria) VALUES
((SELECT id FROM qualifications WHERE code = '603/5933/7'), 'Engineering Fundamentals', 'Core engineering principles and building services concepts', 'BookOpen', '#3B82F6', 10,
ARRAY['Understand engineering principles', 'Apply mathematical concepts', 'Analyse building services'],
ARRAY['AC.1.1 Engineering principle application', 'AC.1.2 Mathematical problem solving', 'AC.1.3 Building services analysis']),

((SELECT id FROM qualifications WHERE code = '603/5933/7'), 'Electrical Installation', 'Comprehensive electrical installation skills and knowledge', 'Zap', '#F59E0B', 15,
ARRAY['Install electrical systems', 'Apply installation standards', 'Complete complex installations'],
ARRAY['AC.2.1 System installation competency', 'AC.2.2 Standards compliance', 'AC.2.3 Complex work completion']),

((SELECT id FROM qualifications WHERE code = '603/5933/7'), 'Digital Technology', 'Modern digital systems and smart building technologies', 'Smartphone', '#10B981', 8,
ARRAY['Implement digital systems', 'Configure smart technologies', 'Integrate modern solutions'],
ARRAY['AC.3.1 Digital implementation', 'AC.3.2 Technology configuration', 'AC.3.3 Solution integration']),

((SELECT id FROM qualifications WHERE code = '603/5933/7'), 'Project Management', 'Planning, coordination, and delivery of electrical projects', 'ClipboardList', '#8B5CF6', 6,
ARRAY['Plan electrical projects', 'Coordinate project activities', 'Deliver successful outcomes'],
ARRAY['AC.4.1 Project planning', 'AC.4.2 Activity coordination', 'AC.4.3 Outcome delivery']),

((SELECT id FROM qualifications WHERE code = '603/5933/7'), 'Professional Practice', 'Professional standards, ethics, and industry practices', 'Award', '#EF4444', 4,
ARRAY['Maintain professional standards', 'Apply ethical principles', 'Follow industry practices'],
ARRAY['AC.5.1 Standards maintenance', 'AC.5.2 Ethics application', 'AC.5.3 Practice compliance']);