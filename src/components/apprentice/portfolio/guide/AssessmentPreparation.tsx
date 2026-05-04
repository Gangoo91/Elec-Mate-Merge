const AssessmentPreparation = () => {
  const assessmentTypes = [
    {
      type: 'Portfolio review',
      description: 'Comprehensive review of your complete portfolio',
      duration: '2-3 hours',
      format: 'Face-to-face with assessor',
      preparation: [
        'Organise portfolio with clear contents page',
        'Prepare summary of key achievements',
        'Practice explaining your evidence',
        'Have backup evidence ready',
      ],
    },
    {
      type: 'Professional discussion',
      description: 'Structured conversation about your learning and development',
      duration: '45-90 minutes',
      format: 'One-to-one discussion',
      preparation: [
        'Review learning outcomes and competency criteria',
        'Prepare examples of problem-solving scenarios',
        'Think about challenges overcome',
        'Consider future development goals',
      ],
    },
    {
      type: 'Practical assessment',
      description: 'Demonstration of practical skills and knowledge',
      duration: 'Half day',
      format: 'Workplace observation',
      preparation: [
        'Ensure workplace access is arranged',
        'Prepare tools and equipment',
        'Review safety procedures',
        'Practice explaining your work process',
      ],
    },
  ];

  const assessmentCriteria = [
    {
      category: 'Knowledge',
      weight: '30%',
      description: 'Understanding of electrical principles, regulations, and standards',
      evidence: [
        'Technical explanations in portfolio commentary',
        'Correct application of calculations',
        'Reference to relevant standards and regulations',
        'Problem-solving approaches documented',
      ],
    },
    {
      category: 'Skills',
      weight: '40%',
      description: 'Practical electrical skills and competencies',
      evidence: [
        'Quality of practical work demonstrated',
        'Correct use of tools and equipment',
        'Testing and inspection competency',
        'Installation techniques and methods',
      ],
    },
    {
      category: 'Behaviours',
      weight: '30%',
      description: 'Professional behaviours and work ethic',
      evidence: [
        'Health and safety awareness',
        'Communication with customers and colleagues',
        'Initiative and problem-solving',
        'Continuous learning and development',
      ],
    },
  ];

  const preparationTimeline = [
    {
      timeframe: '3 months before',
      tasks: [
        'Complete portfolio gap analysis',
        'Identify any missing evidence',
        'Schedule additional workplace opportunities',
        'Begin preparing assessment documentation',
      ],
    },
    {
      timeframe: '6 weeks before',
      tasks: [
        'Submit draft portfolio for review',
        'Incorporate feedback from supervisor',
        'Practice professional discussion scenarios',
        'Confirm assessment dates and logistics',
      ],
    },
    {
      timeframe: '2 weeks before',
      tasks: [
        'Finalise portfolio organisation',
        'Prepare presentation materials',
        'Review all evidence one final time',
        'Confirm assessment venue and requirements',
      ],
    },
    {
      timeframe: '1 week before',
      tasks: [
        'Print and bind portfolio copies',
        'Prepare assessment day kit',
        'Review learning outcomes one last time',
        'Get good rest and prepare mentally',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Assessment preparation guide
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Prepare thoroughly for your end-point assessment with this comprehensive guide covering
          portfolio review, professional discussion, and practical assessment components.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-tight">
          Assessment components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assessmentTypes.map((assessment, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
            >
              <div>
                <h4 className="text-[16px] font-semibold text-white">{assessment.type}</h4>
                <p className="text-[14px] text-white/70 leading-relaxed mt-1">
                  {assessment.description}
                </p>
              </div>
              <div className="space-y-1 text-[13px] text-white/85">
                <div>
                  <span className="text-white/55">Duration:</span> {assessment.duration}
                </div>
                <div>
                  <span className="text-white/55">Format:</span> {assessment.format}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Preparation checklist
                </span>
                <ul className="space-y-1.5">
                  {assessment.preparation.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Assessment criteria breakdown
        </span>
        <p className="text-[14px] text-white/70 leading-relaxed">
          Understanding how you'll be assessed across knowledge, skills, and behaviours
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {assessmentCriteria.map((criteria, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-semibold text-white">{criteria.category}</h4>
                <span className="text-[12px] text-elec-yellow px-2 py-0.5 rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04]">
                  {criteria.weight}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{criteria.description}</p>
              <div className="space-y-1.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Evidence types
                </span>
                <ul className="space-y-1">
                  {criteria.evidence.map((evidence, evidenceIndex) => (
                    <li
                      key={evidenceIndex}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Assessment preparation timeline
        </span>
        <div className="space-y-4">
          {preparationTimeline.map((period, index) => (
            <div key={index} className="space-y-2">
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] inline-block">
                {period.timeframe}
              </span>
              <ul className="space-y-1.5">
                {period.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Top tips for assessment success
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Before assessment</h4>
            <ul className="space-y-1.5">
              {[
                'Practice explaining your work to others',
                'Ensure all evidence is clearly labelled and dated',
                'Prepare specific examples for each competency',
                'Get feedback from supervisors and mentors',
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
            <h4 className="text-[14px] font-semibold text-white">During assessment</h4>
            <ul className="space-y-1.5">
              {[
                'Be confident and speak clearly about your work',
                'Reference specific evidence when answering questions',
                "Admit when you don't know something — it's professional",
                "Ask for clarification if you don't understand a question",
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

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Common assessment pitfalls to avoid
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Portfolio issues</h4>
            <ul className="space-y-1.5">
              {[
                'Insufficient reflection in evidence commentary',
                'Poor organisation making evidence hard to find',
                'Missing evidence for key competencies',
                'Weak links between evidence and learning outcomes',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Assessment day issues</h4>
            <ul className="space-y-1.5">
              {[
                'Not being able to explain your own work',
                'Failing to reference portfolio evidence',
                'Poor time management during assessment',
                'Not demonstrating professional behaviours',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
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

export default AssessmentPreparation;
