const PortfolioStepByStepGuide = () => {
  const steps = [
    {
      number: 1,
      title: 'Understand Your Requirements',
      description:
        'Familiarise yourself with your apprenticeship framework requirements and assessment criteria.',
      tasks: [
        'Review your apprenticeship standard',
        'Understand the assessment criteria',
        'Identify required evidence types',
        'Note submission deadlines',
      ],
    },
    {
      number: 2,
      title: 'Plan Your Portfolio Structure',
      description:
        'Organise your portfolio into logical sections that align with your learning outcomes.',
      tasks: [
        'Create sections for each unit/module',
        'Plan evidence collection strategy',
        'Set up filing system (digital/physical)',
        'Create timeline for submissions',
      ],
    },
    {
      number: 3,
      title: 'Collect and Document Evidence',
      description: 'Gather evidence systematically throughout your apprenticeship journey.',
      tasks: [
        'Take photos of practical work',
        'Save certificates and qualifications',
        'Document workplace projects',
        'Collect witness testimonies',
      ],
    },
    {
      number: 4,
      title: 'Reflect and Analyse',
      description: 'Add reflective commentary to demonstrate your learning and development.',
      tasks: [
        'Write reflections for each piece of evidence',
        'Analyse what you learned',
        'Identify areas for improvement',
        'Link to theoretical knowledge',
      ],
    },
    {
      number: 5,
      title: 'Review and Submit',
      description: 'Regularly review your portfolio quality and submit according to deadlines.',
      tasks: [
        'Check against assessment criteria',
        'Ensure all requirements met',
        'Proofread all written work',
        'Submit on time',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Step-by-step portfolio guide
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Follow this systematic approach to build a comprehensive portfolio that demonstrates your
          competency and learning throughout your electrical apprenticeship.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Step {step.number}
              </span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
              {step.title}
            </h3>
            <p className="text-[14px] text-white/85 leading-relaxed">{step.description}</p>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Key tasks
              </span>
              <ul className="space-y-1.5">
                {step.tasks.map((task, index) => (
                  <li
                    key={index}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Portfolio success tips
        </span>
        <ul className="space-y-1.5">
          {[
            'Start collecting evidence from day one of your apprenticeship',
            'Take photos and make notes immediately after completing tasks',
            'Ask supervisors and colleagues for witness statements',
            'Keep original documents and make backup copies',
            'Review and update your portfolio regularly',
            'Seek feedback from tutors and mentors',
          ].map((tip, index) => (
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
  );
};

export default PortfolioStepByStepGuide;
