const RecoveryStrategiesTab = () => {
  const recoverySteps = [
    {
      title: 'Immediate Response',
      timeframe: '0-5 minutes',
      description: 'Take control of the situation quickly and safely',
      steps: [
        'Stop work immediately if safety is compromised',
        'Assess the situation calmly and objectively',
        'Inform your supervisor or mentor promptly',
        "Document what happened whilst it's fresh",
      ],
      tips: ["Don't panic - stay calm", 'Be honest and transparent', 'Safety comes first always'],
    },
    {
      title: 'Analysis Phase',
      timeframe: '5-15 minutes',
      description: 'Understand the root cause thoroughly',
      steps: [
        'Identify the specific root cause',
        'Understand exactly what went wrong',
        'Consider all contributing factors',
        'Plan your corrective action carefully',
      ],
      tips: ["Ask 'why' five times", 'Consider all factors', 'Avoid blame - focus on facts'],
    },
    {
      title: 'Recovery Action',
      timeframe: '15+ minutes',
      description: 'Implement solutions and verify results',
      steps: [
        'Implement the corrective fix properly',
        'Test the solution thoroughly',
        'Verify full compliance with standards',
        'Update all relevant documentation',
      ],
      tips: ['Double-check all work', 'Test everything thoroughly', 'Document lessons learned'],
    },
  ];

  const successStories = [
    {
      title: 'Cable Mix-Up Recovery',
      description:
        'Connected wrong cables in a three-phase supply. Caught it during testing, immediately isolated, corrected the connections, and retested thoroughly. Supervisor appreciated the honesty and methodical approach.',
      outcome: 'Positive outcome',
      lesson: 'Testing procedures save the day',
    },
    {
      title: 'Wrong MCB Rating',
      description:
        'Installed a 32A MCB instead of 6A on a lighting circuit. Realised during final check that the protective device no longer coordinated with the 1.0mm² cable, replaced it immediately, and created a personal checklist to prevent future errors.',
      outcome: 'Learning applied',
      lesson: 'Systematic checking prevents repeats',
    },
    {
      title: 'Earthing Connection Issue',
      description:
        'Inadequate earth connection discovered during testing. Re-made connection properly, tested continuity, and learned about proper termination techniques from mentor.',
      outcome: 'Skill development',
      lesson: 'Every mistake teaches technique',
    },
    {
      title: 'Documentation Error',
      description:
        'Forgot to update circuit schedule after modification. Caught during handover, immediately updated all paperwork, and implemented a documentation checklist system.',
      outcome: 'Process improvement',
      lesson: 'Good systems prevent human error',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Mistake recovery framework
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {recoverySteps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-[16px] font-semibold text-white">{step.title}</h3>
                <span className="inline-block text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {step.timeframe}
                </span>
              </div>

              <p className="text-[14px] text-white/85 leading-relaxed">{step.description}</p>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key steps
                </span>
                <ol className="space-y-1.5">
                  {step.steps.map((stepItem, stepIndex) => (
                    <li
                      key={stepIndex}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-elec-yellow font-mono text-[12px] mt-0.5 flex-shrink-0">
                        {stepIndex + 1}.
                      </span>
                      <span>{stepItem}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Remember
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {step.tips.map((tip, tipIndex) => (
                    <span
                      key={tipIndex}
                      className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                    >
                      {tip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Recovery success stories
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[16px] font-semibold text-white">{story.title}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{story.description}</p>
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="inline-block w-fit text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {story.outcome}
                </span>
                <div className="text-[13px] text-white/85">
                  <span className="text-white/55">Key lesson: </span>
                  {story.lesson}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Why honest reporting is safe
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          A just culture separates honest mistakes from genuine recklessness. Reporting an error
          early lets it be put right before anyone is hurt — that is exactly what a good employer
          wants from an apprentice. Covering up a fault is what creates real danger and real
          consequences.
        </p>
        <ul className="space-y-1.5">
          {[
            'Tell your supervisor as soon as you spot a problem — speed matters more than blame',
            'Make the work safe and isolated before anything else',
            'Record what happened factually, without guessing at causes you cannot prove',
            'A dangerous-occurrence, certain injuries or an electric shock at work may be reportable under RIDDOR — your employer makes the report, but flag it so it is not missed',
          ].map((point, idx) => (
            <li
              key={idx}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecoveryStrategiesTab;
