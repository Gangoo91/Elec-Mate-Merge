-- Add the missing MOET course to City & Guilds qualifications
INSERT INTO public.qualifications (awarding_body, level, title, code, description, requires_portfolio) VALUES
('City & Guilds', 'Level 3', 'Maintenance Operability Electrical Testing (MOET)', '2391-52', 'Advanced competency in maintenance and operability of electrical systems', true);