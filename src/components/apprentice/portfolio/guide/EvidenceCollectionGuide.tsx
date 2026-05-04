const EvidenceCollectionGuide = () => {
  const evidenceTypes = [
    {
      type: 'Photographic evidence',
      description: 'Visual documentation of practical work and installations',
      examples: [
        'Before and after installation photos',
        'Cable routing and terminations',
        'Control panel layouts',
        'Testing equipment setups',
        'Safety implementations',
      ],
      tips: [
        'Ensure photos are clear and well-lit',
        'Include context and scale references',
        'Take multiple angles of complex work',
        'Respect client confidentiality',
      ],
    },
    {
      type: 'Written documentation',
      description: 'Formal documents and certificates that validate your competency',
      examples: [
        'Test certificates and reports',
        'Risk assessments completed',
        'Method statements written',
        'Training certificates received',
        'Inspection and testing results',
      ],
      tips: [
        'Keep original documents safe',
        'Scan to digital formats',
        'Organise by date and category',
        'Include explanatory notes',
      ],
    },
    {
      type: 'Witness testimonies',
      description: 'Statements from supervisors and colleagues confirming your competence',
      examples: [
        'Supervisor observation forms',
        'Client feedback letters',
        'Peer assessment statements',
        'Mentor evaluation reports',
        'Customer satisfaction surveys',
      ],
      tips: [
        'Ask for testimonies immediately after tasks',
        'Provide clear guidance to witnesses',
        'Ensure testimonies are specific and detailed',
        'Include witness contact details',
      ],
    },
    {
      type: 'Practical assessments',
      description: 'Evidence of hands-on skills and practical competency',
      examples: [
        'Practical assessment results',
        'Skills demonstration videos',
        'Tool and equipment operation',
        'Installation completion records',
        'Troubleshooting documentation',
      ],
      tips: [
        'Document the assessment criteria met',
        'Include assessor feedback',
        'Record time taken and efficiency',
        'Note any challenges overcome',
      ],
    },
    {
      type: 'Safety documentation',
      description: 'Evidence of health and safety awareness and compliance',
      examples: [
        'Safety induction completions',
        'PPE usage documentation',
        'Accident/incident reports',
        'Safety meeting attendance',
        'Risk assessment contributions',
      ],
      tips: [
        'Always prioritise safety in documentation',
        'Show proactive safety thinking',
        'Document safety improvements suggested',
        'Include safety training completed',
      ],
    },
    {
      type: 'Professional development',
      description: 'Evidence of continuous learning and skill development',
      examples: [
        'Course completion certificates',
        'CPD activity records',
        'Conference attendance certificates',
        'Self-study documentation',
        'Skills progression records',
      ],
      tips: [
        'Link learning to workplace application',
        'Reflect on how training improved performance',
        'Set targets for future development',
        'Seek feedback on progress',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Evidence collection guide
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Comprehensive guidance on collecting, organising, and presenting evidence for your
          electrical apprenticeship portfolio. Quality evidence demonstrates your competency and
          learning journey effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {evidenceTypes.map((evidence) => (
          <div
            key={evidence.type}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <h3 className="text-[16px] font-semibold text-white leading-tight">{evidence.type}</h3>
            <p className="text-[14px] text-white/85 leading-relaxed">{evidence.description}</p>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Examples
              </span>
              <ul className="space-y-1.5">
                {evidence.examples.map((example, index) => (
                  <li
                    key={index}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                Best practice tips
              </span>
              <ul className="space-y-1.5">
                {evidence.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Evidence quality checklist
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              What makes good evidence
            </span>
            <ul className="space-y-1">
              {[
                'Clearly linked to assessment criteria',
                'Authentic and original',
                'Sufficient detail and context',
                'Recent and relevant',
                'Properly dated and witnessed',
              ].map((item) => (
                <li key={item} className="text-[14px] text-white/85 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Common evidence mistakes
            </span>
            <ul className="space-y-1">
              {[
                'Blurry or unclear photographs',
                'Missing context or explanation',
                'Outdated or irrelevant material',
                'Insufficient evidence quantity',
                'Poor organisation and filing',
              ].map((item) => (
                <li key={item} className="text-[14px] text-white/70 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCollectionGuide;
