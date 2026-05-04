const MistakeCategoriesTab = () => {
  const mistakeCategories = [
    {
      category: 'Learning Mistakes',
      severity: 'Minor',
      description: 'Normal part of the learning process',
      examples: [
        {
          mistake: 'Cutting cable too short for termination',
          consequence: 'Need to splice or run new cable',
          lesson: "Always leave extra length - you can cut off but can't add on",
          recovery: 'Measure twice, cut once - plan termination lengths',
        },
        {
          mistake: 'Forgetting to label cables during first fix',
          consequence: 'Confusion during second fix, extra time needed',
          lesson: 'Label as you go - it saves hours later',
          recovery: 'Develop a systematic labelling routine',
        },
        {
          mistake: 'Mixing up line and neutral on a light switch',
          consequence: "Switch doesn't work, quick fix needed",
          lesson: 'Double-check connections before testing',
          recovery: 'Use proper testing procedures before energising',
        },
      ],
    },
    {
      category: 'Technical Mistakes',
      severity: 'Moderate',
      description: 'Require immediate correction and learning',
      examples: [
        {
          mistake: 'Incorrect cable size calculation',
          consequence: 'Cable overheating, potential fire risk',
          lesson: 'Always verify calculations with multiple methods',
          recovery: 'Replace cable with correct size, document the error',
        },
        {
          mistake: 'Wrong protective device rating',
          consequence: 'Poor protection or nuisance tripping',
          lesson: 'Understand discrimination and selectivity principles',
          recovery: 'Calculate proper ratings, replace if necessary',
        },
        {
          mistake: 'Inadequate earthing connection',
          consequence: 'Dangerous touch voltages, compliance failure',
          lesson: 'Earth continuity is critical for safety',
          recovery: 'Improve connection, test thoroughly',
        },
      ],
    },
    {
      category: 'Safety Mistakes',
      severity: 'Serious',
      description: 'Never acceptable - immediate action required',
      isSafety: true,
      examples: [
        {
          mistake: 'Working live without proper procedures',
          consequence: 'Risk of electrocution or arc flash',
          lesson: 'Safety procedures exist for a reason',
          recovery: 'Stop work, isolate properly, review safety training',
        },
        {
          mistake: 'Not testing isolation before work',
          consequence: 'Working on live circuits unknowingly',
          lesson: 'Prove dead before starting any work',
          recovery: 'Always use approved voltage indicator and test it',
        },
        {
          mistake: 'Ignoring PPE requirements',
          consequence: 'Exposure to electrical hazards',
          lesson: 'PPE is the last line of defence',
          recovery: 'Obtain proper PPE, understand its limitations',
        },
      ],
    },
  ];

  const commonPatterns = [
    {
      pattern: 'Rushing Under Pressure',
      description: 'Making mistakes when time pressure increases',
      solutions: [
        'Break tasks into smaller steps',
        'Communicate delays early',
        'Practice standard procedures until automatic',
      ],
    },
    {
      pattern: 'Overconfidence in Familiar Tasks',
      description: 'Becoming complacent with routine work',
      solutions: [
        'Maintain consistent checking procedures',
        'Stay vigilant on repetitive tasks',
        'Ask for peer reviews occasionally',
      ],
    },
    {
      pattern: 'Fear of Asking Questions',
      description: 'Guessing instead of seeking clarification',
      solutions: [
        'Remember questions show critical thinking',
        'Build relationships with mentors',
        'Document answers for future reference',
      ],
    },
    {
      pattern: 'Incomplete Understanding',
      description: 'Applying procedures without understanding principles',
      solutions: [
        "Study the 'why' behind procedures",
        'Connect theory to practice',
        'Seek explanations, not just instructions',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Understanding mistake categories
        </span>
        <div className="space-y-5">
          {mistakeCategories.map((category, index) => {
            const containerClass = category.isSafety
              ? 'rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 space-y-3'
              : 'rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3';
            const eyebrowClass = category.isSafety
              ? 'text-[10px] font-medium uppercase tracking-[0.18em] text-red-300'
              : 'text-[10px] font-medium uppercase tracking-[0.18em] text-white/55';

            return (
              <div key={index} className={containerClass}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="space-y-1">
                    <h3 className="text-[18px] font-semibold text-white">{category.category}</h3>
                    <p className="text-[14px] text-white/85 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <span className={eyebrowClass}>{category.severity}</span>
                </div>

                <div className="space-y-3">
                  {category.examples.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                    >
                      <h4 className="text-[14px] font-semibold text-white">{example.mistake}</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Consequence
                          </span>
                          <p className="text-[13px] text-white/85 leading-relaxed">
                            {example.consequence}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Lesson
                          </span>
                          <p className="text-[13px] text-white/85 leading-relaxed">
                            {example.lesson}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                            Recovery
                          </span>
                          <p className="text-[13px] text-white/85 leading-relaxed">
                            {example.recovery}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Common mistake patterns
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonPatterns.map((pattern, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[16px] font-semibold text-white">{pattern.pattern}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{pattern.description}</p>
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Solutions
                </span>
                <ul className="space-y-1">
                  {pattern.solutions.map((solution, solutionIndex) => (
                    <li
                      key={solutionIndex}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MistakeCategoriesTab;
