const IndustrySpecificGuidance = () => {
  const sectors = [
    {
      name: 'Domestic electrical',
      description: 'Residential electrical installations and maintenance',
      keyAreas: [
        'Consumer unit installations and upgrades',
        'Domestic wiring systems (ring finals, radials)',
        'Kitchen and bathroom electrical work',
        'Garden and outdoor electrical installations',
        'Electric vehicle charging point installations',
      ],
      evidenceTypes: [
        'EICR certificates and reports',
        'Minor works certificates',
        'Installation certificates',
        'Customer testimonials',
        'Before/after installation photos',
      ],
      regulations: [
        'BS 7671 Wiring Regulations',
        'Part P Building Regulations',
        'NICEIC/NAPIT scheme requirements',
        'IET guidance notes',
        'Local authority building control',
      ],
    },
    {
      name: 'Commercial electrical',
      description: 'Office buildings, shops, and commercial installations',
      keyAreas: [
        'Three-phase distribution systems',
        'Emergency lighting systems',
        'Fire alarm installations',
        'Data and communications cabling',
        'Commercial lighting and controls',
      ],
      evidenceTypes: [
        'Periodic inspection reports',
        'Commissioning test results',
        'Emergency lighting certificates',
        'Fire alarm commissioning records',
        'Cable schedule documentation',
      ],
      regulations: [
        'BS 7671 Wiring Regulations',
        'BS 5266 Emergency lighting',
        'BS 5839 Fire detection systems',
        'CDM Regulations 2015',
        'Workplace Regulations',
      ],
    },
    {
      name: 'Industrial electrical',
      description: 'Manufacturing plants and heavy industrial installations',
      keyAreas: [
        'Motor control and automation',
        'High voltage switching and protection',
        'Industrial process control systems',
        'Hazardous area installations',
        'Power factor correction systems',
      ],
      evidenceTypes: [
        'Commissioning reports',
        'FAT/SAT documentation',
        'Loop testing certificates',
        'Motor testing results',
        'Safety system validation',
      ],
      regulations: [
        'BS 7671 Wiring Regulations',
        'BS EN 60079 Explosive atmospheres',
        'DSEAR Regulations',
        'PUWER Regulations',
        'Machinery Directive',
      ],
    },
  ];

  const universalRequirements = [
    {
      category: 'Health & safety',
      requirements: [
        'Risk assessment completion',
        'Method statement preparation',
        'PPE usage documentation',
        'Accident/incident reporting',
        'Safety training records',
      ],
    },
    {
      category: 'Testing & inspection',
      requirements: [
        'Initial verification testing',
        'Periodic inspection and testing',
        'Portable appliance testing',
        'Emergency lighting testing',
        'Fire alarm system testing',
      ],
    },
    {
      category: 'Regulations & standards',
      requirements: [
        'BS 7671 18th Edition knowledge',
        'IET Guidance Note understanding',
        'Building Regulations compliance',
        'CDM Regulations awareness',
        'Environmental regulations',
      ],
    },
  ];

  const renderList = (items: string[]) => (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
        >
          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Industry-specific portfolio guidance
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Tailored guidance for building portfolios specific to different electrical industry
          sectors. Each sector has unique requirements, regulations, and evidence types that must be
          demonstrated for competency assessment.
        </p>
      </div>

      <div className="space-y-6">
        {sectors.map((sector) => (
          <div
            key={sector.name}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
                {sector.name}
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed mt-1">{sector.description}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key work areas
                </span>
                {renderList(sector.keyAreas)}
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Evidence types
                </span>
                {renderList(sector.evidenceTypes)}
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key regulations
                </span>
                {renderList(sector.regulations)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Universal requirements (all sectors)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {universalRequirements.map((requirement) => (
            <div key={requirement.category} className="space-y-2">
              <h4 className="text-[14px] font-semibold text-white">{requirement.category}</h4>
              {renderList(requirement.requirements)}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Portfolio assessment tips
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">For assessors</h4>
            <ul className="space-y-1.5">
              {[
                'Evidence must be authentic and verifiable',
                'Check dates and witness signatures',
                'Look for progression and development',
                'Ensure coverage of all required competencies',
                'Quality over quantity in evidence selection',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">For apprentices</h4>
            <ul className="space-y-1.5">
              {[
                'Map evidence to assessment criteria clearly',
                'Include reflective commentary on learning',
                'Show understanding of why tasks were performed',
                'Demonstrate problem-solving abilities',
                'Include evidence of professional development',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySpecificGuidance;
