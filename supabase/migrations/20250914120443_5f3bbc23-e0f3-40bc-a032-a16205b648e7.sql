-- Fix the migration by including the regulatory_body field
INSERT INTO public.industry_news (title, summary, content, category, source_name, date_published, regulatory_body) VALUES 
('BS7671 18th Edition Amendment 1 Now Mandatory for New Installations', 
 'The IET has confirmed that Amendment 1 to BS7671:2018 is now mandatory for all new electrical installations and major modifications.',
 'The Institution of Engineering and Technology (IET) has announced that Amendment 1 to BS7671:2018 (the 18th Edition of the IET Wiring Regulations) is now mandatory for all new electrical installations and major modifications. The amendment introduces important changes to surge protection requirements, with SPDs now required in more circumstances.

Key changes include:
• Enhanced surge protection device (SPD) requirements for installations
• Updated guidance on electric vehicle charging installations
• Revised requirements for energy storage systems
• New provisions for smart installations and monitoring systems

Electricians must ensure they are familiar with these changes and have updated their testing procedures accordingly. The amendment affects both domestic and commercial installations, with particular emphasis on protecting modern electronic equipment from power surges.

Training courses are available through approved providers to help electricians understand and implement these new requirements.',
 'BS7671',
 'Institution of Engineering and Technology',
 '2024-01-15',
 'IET'),

('HSE Issues New Guidance on Electrical Safety in Construction', 
 'The Health and Safety Executive has published updated guidance on electrical safety for construction sites following recent accident investigations.',
 'The Health and Safety Executive (HSE) has released comprehensive new guidance on electrical safety in construction environments, emphasising the critical importance of proper risk assessment and control measures.

The guidance, developed following analysis of recent electrical accidents on construction sites, covers:
• Temporary electrical installations and their inspection requirements
• Safe use of portable electrical equipment in harsh environments
• Proper earthing and bonding procedures for construction sites
• Emergency response procedures for electrical incidents

HSE Inspector Sarah Matthews commented: "Too many workers are still being injured or killed by preventable electrical accidents. This guidance provides clear, practical advice that can save lives."

The document emphasises the need for competent persons to design, install, and maintain electrical systems on construction sites. It also highlights the importance of regular testing and inspection schedules to ensure ongoing safety.',
 'HSE',
 'Health and Safety Executive',
 '2024-01-22',
 'HSE'),

('Major Infrastructure Project Awards £180M Electrical Contract', 
 'National Grid has awarded a substantial electrical infrastructure contract for the new East Anglia offshore wind connection project.',
 'National Grid has announced the award of a £180 million electrical infrastructure contract for the East Anglia Three offshore wind farm connection project. The contract, awarded to a consortium led by Siemens Energy and including several UK electrical contractors, represents one of the largest electrical infrastructure investments this year.

Project scope includes:
• Installation of 50km of high-voltage transmission cables
• Construction of two new electrical substations
• Integration with existing National Grid infrastructure
• Advanced monitoring and control systems

The project is expected to create over 300 jobs for qualified electrical workers, including roles for:
• High voltage cable installation specialists
• Substation construction teams
• Testing and commissioning engineers
• Ongoing maintenance personnel

Work is scheduled to begin in March 2024, with completion expected by late 2025. The project will enable the connection of 800MW of renewable energy to the UK grid.',
 'Infrastructure',
 'National Grid',
 '2024-01-29',
 'Ofgem'),

('New Apprenticeship Standards for Electrical Installation Published', 
 'The Institute for Apprenticeships has approved updated standards for electrical installation apprenticeships, including new digital competencies.',
 'The Institute for Apprenticeships and Technical Education has published revised standards for electrical installation apprenticeships, incorporating new competencies for digital technologies and smart systems.

Key updates to the apprenticeship standards include:
• Electric vehicle charging point installation and maintenance
• Smart home technology and IoT device integration
• Energy storage system installation and commissioning
• Advanced testing using digital instruments and software
• Understanding of building management systems

The updated standards reflect the rapidly evolving electrical industry and ensure apprentices are prepared for modern electrical work. Training providers have been given six months to update their programmes to meet the new requirements.

John Harrison, representing the Electrical Contractors Association, said: "These updates are essential to ensure our apprentices have the skills needed for tomorrow''s electrical installations. The industry is changing rapidly, and our training must keep pace."

The new standards will apply to all electrical installation apprenticeships starting from September 2024.',
 'Training',
 'Institute for Apprenticeships',
 '2024-02-05',
 'IfATE'),

('Smart Meter Rollout Reaches 30 Million UK Homes', 
 'The government has announced that the smart meter programme has now reached 30 million homes and businesses across the UK.',
 'The Department for Business, Energy and Industrial Strategy has confirmed that the UK smart meter rollout has reached the significant milestone of 30 million installations across homes and businesses.

The programme, which aims to replace traditional gas and electricity meters with smart alternatives, has accelerated significantly in the past year. Key achievements include:
• 30 million smart meters now installed nationwide
• 85% customer satisfaction rates
• Estimated £2.8 billion in energy savings to date
• Over 12,000 qualified smart meter installers certified

Energy Minister Graham Stuart commented: "Smart meters are a crucial part of our net-zero strategy, helping consumers understand and reduce their energy usage while supporting the integration of renewable energy sources."

The rollout has created substantial opportunities for electrical workers, with many contractors expanding their services to include smart meter installation. Specialist training courses are available for electricians looking to enter this growing market.

The programme is scheduled for completion by 2026, with the remaining installations focusing on hard-to-reach properties and complex industrial sites.',
 'Smart Technology',
 'Department for Business, Energy and Industrial Strategy',
 '2024-02-12',
 'Ofgem');

-- Update created_at and updated_at timestamps to match the published dates
UPDATE public.industry_news 
SET created_at = date_published + interval '1 hour',
    updated_at = date_published + interval '1 hour';