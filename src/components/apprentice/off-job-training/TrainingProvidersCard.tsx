const TrainingProvidersCard = () => {
  const providerTypes = [
    {
      type: 'Further education colleges',
      description: 'Traditional colleges offering apprenticeship programmes',
      characteristics: ['Established facilities', 'Qualified teaching staff', 'Broad curriculum'],
      examples: ['Local FE colleges', 'Sixth form colleges', 'Technical colleges'],
      considerations: ['Fixed timetables', 'Group-based learning', 'Academic focus'],
    },
    {
      type: 'Private training providers',
      description: 'Commercial organisations specialising in apprenticeship training',
      characteristics: ['Industry-focused', 'Flexible delivery', 'Employer partnerships'],
      examples: ['JTL', 'NICEIC Training', 'ECITB providers'],
      considerations: ['Specialist expertise', 'Industry connections', 'Variable quality'],
    },
    {
      type: 'University technical colleges',
      description: 'Specialist institutions for 14-19 year olds with industry focus',
      characteristics: [
        'State-of-the-art facilities',
        'Industry partnerships',
        'Technical specialisation',
      ],
      examples: ['Energy Coast UTC', 'Advanced Manufacturing UTC'],
      considerations: ['Age-specific', 'Limited locations', 'High standards'],
    },
    {
      type: 'Employer-led training',
      description: 'Large employers providing their own training programmes',
      characteristics: ['Company-specific', 'Career progression', 'Internal expertise'],
      examples: ['National Grid', 'BAE Systems', 'Rolls Royce'],
      considerations: ['Limited external recognition', 'Company culture', 'Career progression'],
    },
    {
      type: 'Online training platforms',
      description: 'Digital-first training providers offering flexible learning',
      characteristics: ['24/7 access', 'Self-paced learning', 'Interactive content'],
      examples: ['Multiverse', 'Baltic Training', 'Digital platforms'],
      considerations: [
        'Self-motivation required',
        'Limited practical work',
        'Technology dependence',
      ],
    },
    {
      type: 'Industry bodies',
      description: 'Professional organisations offering recognised training',
      characteristics: [
        'Industry credibility',
        'Professional standards',
        'Networking opportunities',
      ],
      examples: ['IET', 'SELECT', 'ECS'],
      considerations: ['Professional focus', 'Higher costs', 'Entry requirements'],
    },
  ];

  const renderList = (items: string[]) => (
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
        >
          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Training provider types
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Understanding different organisations that deliver off-the-job training
        </p>
      </div>

      <div className="space-y-4">
        {providerTypes.map((provider, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
          >
            <h4 className="text-[14px] font-semibold text-white">{provider.type}</h4>
            <p className="text-[14px] text-white/85 leading-relaxed">{provider.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key features
                </span>
                {renderList(provider.characteristics)}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Examples
                </span>
                {renderList(provider.examples)}
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Considerations
                </span>
                {renderList(provider.considerations)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Choosing the right provider
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Consider</h4>
            <ul className="space-y-1.5">
              {[
                'Location and accessibility',
                'Delivery methods offered',
                'Industry reputation',
                'Pass rates and outcomes',
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
            <h4 className="text-[14px] font-semibold text-white">Ask about</h4>
            <ul className="space-y-1.5">
              {[
                'Support services available',
                'Equipment and facilities',
                'Progression opportunities',
                'Employer feedback',
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

export default TrainingProvidersCard;
