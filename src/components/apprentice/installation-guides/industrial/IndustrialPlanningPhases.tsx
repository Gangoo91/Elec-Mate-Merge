const IndustrialPlanningPhases = () => {
  const planningPhases = [
    {
      phase: 'Initial assessment & documentation',
      duration: '1-2 weeks',
      tasks: [
        'ATEX zone classification review',
        'Existing installation condition survey',
        'Load analysis and diversity calculations',
        'Coordination with production schedules',
        'HSE notification and permit applications',
      ],
    },
    {
      phase: 'Design & specification',
      duration: '2-3 weeks',
      tasks: [
        'Motor control system design',
        'Cable tray and containment routing',
        'Emergency stop system integration',
        'ATEX certified equipment specification',
        'Arc flash risk assessment',
      ],
    },
    {
      phase: 'Procurement & preparation',
      duration: '3-4 weeks',
      tasks: [
        'ATEX certified equipment procurement',
        'Specialist tooling and lifting equipment',
        'Coordination with plant shutdown schedules',
        'Method statements and risk assessments',
        'Competent person assignments',
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Planning phases
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          Industrial project planning phases
        </h3>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Structured approach to complex industrial installations.
        </p>
      </div>
      <div className="space-y-3">
        {planningPhases.map((phase, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 space-y-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="text-[14px] font-medium text-white">
                Phase {index + 1}: {phase.phase}
              </h4>
              <span className="text-[12px] text-white/55 font-mono flex-shrink-0">
                {phase.duration}
              </span>
            </div>
            <ul className="space-y-1">
              {phase.tasks.map((task, taskIndex) => (
                <li
                  key={taskIndex}
                  className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
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
  );
};

export default IndustrialPlanningPhases;
