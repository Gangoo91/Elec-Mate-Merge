import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EducationalResourcesTab = () => {
  const regulations = [
    {
      id: 1,
      title: 'BS 7671 (18th Edition) Wiring Regulations',
      category: 'Installation Standards',
      keyAreas: [
        'Protection against electric shock (Section 411)',
        'Isolation and switching procedures (Section 537)',
        'Initial verification requirements (Section 611)',
        'Periodic inspection schedules (Section 651)',
      ],
      whatItMeans:
        'These regulations ensure all electrical installations are safe and compliant. They specify minimum safety requirements for design, installation, inspection and testing.',
      whereToFind:
        "Available from IET (Institution of Engineering and Technology) website, technical libraries, and through your employer's document management system.",
    },
    {
      id: 2,
      title: 'Health and Safety at Work Act 1974',
      category: 'Safety Legislation',
      keyAreas: [
        'Employer duty of care responsibilities',
        'Employee safety obligations',
        'Risk assessment requirements',
        'Incident reporting procedures',
      ],
      whatItMeans:
        'This act places legal duties on both employers and employees to ensure workplace safety. Failure to comply can result in prosecution and serious penalties.',
      whereToFind:
        "HSE website (hse.gov.uk), workplace safety handbooks, and your company's health and safety policy documents.",
    },
    {
      id: 3,
      title: 'Electricity at Work Regulations 1989',
      category: 'Electrical Safety',
      keyAreas: [
        'Safe working procedures on electrical systems',
        'Competency requirements for electrical work',
        'Equipment maintenance standards',
        'Isolation and proving procedures',
      ],
      whatItMeans:
        'These regulations specifically address electrical safety in the workplace. They require that electrical systems are properly maintained and work is only carried out by competent persons.',
      whereToFind:
        'HSE website, electrical training materials, and workplace electrical safety procedures.',
    },
    {
      id: 4,
      title: 'CDM Regulations 2015',
      category: 'Construction Safety',
      keyAreas: [
        'Construction phase planning requirements',
        'Health and safety file maintenance',
        'Coordination between trades',
        'Risk assessment documentation',
      ],
      whatItMeans:
        'These regulations ensure health and safety is properly managed on construction projects. They define roles and responsibilities for all parties involved.',
      whereToFind:
        'HSE website, construction industry guidance documents, and project-specific health and safety plans.',
    },
  ];

  const practicalGuidance = [
    {
      title: 'Site safety checklist',
      description: 'Essential safety checks before starting work',
      items: [
        'Verify isolation procedures are followed',
        'Check all PPE is available and in good condition',
        'Identify emergency procedures and exits',
        'Confirm hazard identification is complete',
        'Ensure communication systems are working',
      ],
    },
    {
      title: 'Common assessment issues',
      description: 'Frequently encountered problems and solutions',
      items: [
        'Poor lighting conditions - bring additional portable lighting',
        'Damp conditions - use appropriate IP-rated equipment',
        'Confined spaces - ensure rescue procedures are in place',
        'Live equipment nearby - implement additional barriers',
        'Multiple trades working - coordinate activities carefully',
      ],
    },
    {
      title: 'Documentation requirements',
      description: 'Essential paperwork for site assessments',
      items: [
        'Risk assessment forms (RAMS)',
        'Method statements for planned work',
        'Equipment inspection certificates',
        'Competency records for team members',
        'Emergency contact information',
      ],
    },
  ];

  const officialPublications = [
    {
      title: 'IET On-Site Guide',
      description: 'Practical guidance for BS 7671 compliance in real-world scenarios.',
    },
    {
      title: 'HSE Guidance Notes',
      description: 'Detailed safety guidance for electrical work and site management.',
    },
    {
      title: 'NICEIC Technical Bulletins',
      description: 'Regular updates on electrical installation best practices.',
    },
  ];

  const emergencyProcedures = [
    {
      title: 'Emergency contacts',
      description:
        'Always have emergency services and supervisor contact details readily available.',
    },
    {
      title: 'First aid procedures',
      description: 'Know the location of first aid equipment and qualified first aiders.',
    },
    {
      title: 'Evacuation routes',
      description: 'Identify and communicate emergency evacuation procedures to all team members.',
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Educational resources
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
          Regulations, standards & practical guidance
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Understanding these regulations helps ensure your assessments meet legal and safety
          requirements.
        </p>
      </div>

      <Tabs defaultValue="regulations" className="w-full">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-full min-w-max bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
            <TabsTrigger
              value="regulations"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Regulations
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Guidance
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Resources
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="regulations" className="space-y-4 mt-5">
          <div className="grid gap-3">
            {regulations.map((regulation) => (
              <div
                key={regulation.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    {regulation.category}
                  </span>
                  <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
                    {regulation.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Key areas
                  </span>
                  <ul className="space-y-1.5">
                    {regulation.keyAreas.map((area, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    What this means
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {regulation.whatItMeans}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Where to find more
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">
                    {regulation.whereToFind}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guidance" className="space-y-4 mt-5">
          <div className="grid gap-3">
            {practicalGuidance.map((guide, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
              >
                <div className="space-y-1">
                  <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
                    {guide.title}
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">{guide.description}</p>
                </div>
                <ul className="space-y-1.5">
                  {guide.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Official publications
              </span>
              <div className="space-y-3">
                {officialPublications.map((pub, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-[14px] text-white">{pub.title}</p>
                    <p className="text-[13px] text-white/70 leading-relaxed">{pub.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Emergency procedures
              </span>
              <div className="space-y-3">
                {emergencyProcedures.map((proc, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-[14px] text-white">{proc.title}</p>
                    <p className="text-[13px] text-white/70 leading-relaxed">{proc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Pro tip
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Regulations and best practices evolve regularly. Stay updated by subscribing to
              industry publications, attending training courses, and participating in professional
              development activities. Your employer should provide access to the latest versions of
              all relevant documents and training materials.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalResourcesTab;
