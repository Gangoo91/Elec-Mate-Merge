-- Add more realistic UK electrical industry news articles
INSERT INTO public.industry_news (title, summary, content, category, source_name, date_published, regulatory_body) VALUES 
('Electric Vehicle Charging Infrastructure Investment Announced', 
 'The government has committed £500 million to expand electric vehicle charging infrastructure across the UK over the next three years.',
 'The government has announced a substantial £500 million investment programme to dramatically expand electric vehicle charging infrastructure across the UK, creating significant opportunities for electrical contractors.

The three-year programme will focus on:
• Installation of 50,000 new public charging points
• Upgrading existing charging infrastructure to faster standards
• Expanding rapid charging networks on major transport routes
• Supporting workplace and residential charging solutions

This investment is expected to create thousands of jobs for qualified electrical workers, including:
• EV charging point installation specialists
• High-power electrical connection specialists
• Maintenance and servicing technicians
• Project management and commissioning engineers

Transport Secretary Mark Harper said: "This investment will accelerate our transition to electric vehicles while creating high-quality jobs in the electrical sector. We''re committed to building the infrastructure needed for a clean transport future."

Electrical contractors interested in EV charging work should ensure they have appropriate qualifications, including IET Code of Practice for Electric Vehicle Charging Equipment Installation certification.',
 'Electric Vehicles',
 'Department for Transport',
 '2024-02-19',
 'DfT'),

('Fire Safety Regulations Updated for High-Rise Electrical Systems', 
 'New fire safety regulations specifically addressing electrical systems in high-rise buildings have come into effect following the Building Safety Act.',
 'New fire safety regulations specifically targeting electrical systems in high-rise residential buildings have come into effect as part of the Building Safety Act implementation.

The regulations, developed in response to lessons learned from recent building fires, introduce stringent requirements for:
• Fire-resistant cable installations throughout high-rise buildings
• Enhanced compartmentalisation of electrical risers
• Improved emergency lighting and alarm systems
• Regular inspection and testing schedules for all electrical systems

Key requirements include:
• Use of fire-resistant cables meeting enhanced standards
• Installation of arc fault detection devices in critical circuits
• Comprehensive documentation and digital records of all electrical work
• Annual safety assessments by qualified electrical engineers

Building Safety Regulator Chief Inspector Janet Wilson stated: "These regulations ensure that electrical systems contribute to building safety rather than pose additional risks. Every electrical worker in high-rise construction must understand and implement these critical safety measures."

Training courses on the new regulations are available through approved providers, with many electrical contractors already updating their procedures to comply with the enhanced requirements.',
 'Fire Safety',
 'Building Safety Regulator',
 '2024-02-26',
 'BSR'),

('Renewable Energy Skills Shortage Identified in New Report', 
 'A comprehensive study by Energy & Utility Skills has identified significant skills shortages in renewable energy electrical work.',
 'Energy & Utility Skills has published a major report highlighting critical skills shortages in renewable energy electrical work, warning that the UK''s net-zero targets could be at risk without urgent action.

The report identifies specific skill gaps in:
• Solar PV installation and maintenance (15,000 additional workers needed)
• Wind turbine electrical systems (8,000 additional specialists required)
• Energy storage system integration (5,000 qualified technicians needed)
• Grid connection and smart grid technologies (12,000 additional roles)

Key findings include:
• 67% of renewable energy employers struggling to recruit qualified electrical workers
• Average time to fill electrical positions increased to 16 weeks
• Significant regional variations in skills availability
• Growing demand for hybrid electrical and digital skills

Emma Buckingham, Chief Executive of Energy & Utility Skills, commented: "The renewable energy sector is growing rapidly, but we need more qualified electrical workers to meet demand. This presents excellent career opportunities for electricians willing to develop new skills."

The report recommends increased investment in training programmes and suggests fast-track qualifications for experienced electricians moving into renewable energy roles.',
 'Renewable Energy',
 'Energy & Utility Skills',
 '2024-03-05',
 'EUS'),

('New Digital Testing Standards for Electrical Installations', 
 'The IET has published new standards for digital testing and certification of electrical installations, introducing QR code-based certification.',
 'The Institution of Engineering and Technology has released groundbreaking new standards for digital testing and certification of electrical installations, revolutionising how electrical work is documented and verified.

The new standards introduce:
• QR code-based electrical installation certificates
• Digital testing instrument integration
• Cloud-based storage of test results and documentation
• Real-time verification of electrical safety compliance
• Enhanced traceability of electrical work

Benefits of the digital system include:
• Immediate access to installation records for inspectors and homeowners
• Reduced paperwork and administrative burden
• Enhanced accuracy through automated data transfer
• Improved fraud prevention through digital verification
• Better tracking of installation maintenance history

IET Technical Director Dr. Sarah Johnson explained: "This digital transformation will improve the quality and reliability of electrical certification while making the process more efficient for electricians and customers alike."

The new standards will be phased in over 12 months, with training available for electricians to learn the new digital processes. Compatible testing equipment is already available from major manufacturers.',
 'Testing Standards',
 'Institution of Engineering and Technology',
 '2024-03-12',
 'IET'),

('Major Hospital Electrical Upgrade Project Begins in Manchester', 
 'A £32 million electrical infrastructure upgrade project has commenced at Manchester Royal Infirmary, including critical care systems.',
 'Construction has begun on a major £32 million electrical infrastructure upgrade project at Manchester Royal Infirmary, representing one of the most significant healthcare electrical projects in the North West.

The comprehensive upgrade includes:
• Complete replacement of electrical distribution systems across 12 buildings
• Installation of advanced uninterruptible power supplies for critical care areas
• Upgrade of operating theatre electrical systems to latest standards
• Implementation of smart building management systems
• Enhanced emergency backup power systems

Project highlights:
• 18-month construction timeline with phased implementation
• Minimal disruption to hospital operations through careful planning
• Over 200 electrical workers employed during peak construction
• Integration with existing medical equipment and systems

The project, led by Kier Construction in partnership with Schneider Electric, represents a significant investment in healthcare infrastructure. Head of Estates James Mitchell said: "This upgrade will ensure our electrical systems can support the most advanced medical technologies while maintaining the highest safety standards."

The work includes extensive testing and commissioning phases to ensure seamless integration with critical medical equipment. Completion is scheduled for late 2025.',
 'Healthcare',
 'NHS Foundation Trust',
 '2024-03-19',
 'NHS'),

('Electrical Contractor Licensing Scheme Under Review', 
 'The government is consulting on proposals for a new licensing scheme for electrical contractors in England and Wales.',
 'The Department for Business and Trade has launched a consultation on proposals to introduce a mandatory licensing scheme for electrical contractors in England and Wales, following similar schemes in Scotland and Northern Ireland.

The proposed scheme would require:
• Mandatory registration for all electrical contracting businesses
• Proof of qualifications and competency for all electrical workers
• Regular assessment and renewal of contractor licenses
• Enhanced consumer protection through insurance requirements
• Standardised complaint and resolution procedures

Key benefits identified include:
• Improved consumer confidence in electrical work quality
• Better protection against unqualified electrical work
• Enhanced safety standards across the industry
• Clearer accountability for electrical contractors
• Reduced unfair competition from unqualified operators

Electrical Contractors Association CEO Darren Staniforth commented: "A well-designed licensing scheme could significantly improve standards in our industry while protecting both consumers and legitimate electrical contractors."

The consultation runs until April 30, 2024, with implementation potentially beginning in 2025. Industry stakeholders are encouraged to participate in the consultation process to ensure the scheme meets the needs of both contractors and consumers.',
 'Regulation',
 'Department for Business and Trade',
 '2024-03-26',
 'DBT');

-- Update created_at and updated_at timestamps to match the published dates
UPDATE public.industry_news 
SET created_at = date_published + interval '1 hour',
    updated_at = date_published + interval '1 hour'
WHERE created_at = updated_at;