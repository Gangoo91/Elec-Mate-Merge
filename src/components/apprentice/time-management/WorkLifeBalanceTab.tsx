const WorkLifeBalanceTab = () => {
  const balanceStrategies = [
    {
      title: 'Boundary setting',
      description: 'Create clear separation between work and personal time',
      strategies: [
        'Turn off work phone after hours unless emergency',
        'Designate specific study spaces at home',
        'Communicate your schedule clearly to family/friends',
        "Practice saying 'no' to non-essential commitments",
      ],
      tips: [
        "Set phone to 'Do Not Disturb'",
        'Use separate work/personal calendars',
        'Create evening wind-down routine',
      ],
    },
    {
      title: 'Physical wellbeing',
      description: 'Maintain your health throughout your apprenticeship',
      strategies: [
        'Schedule regular exercise sessions (even 20 minutes counts)',
        'Pack healthy lunches and snacks for site work',
        'Stay hydrated throughout long working days',
        'Get adequate sleep (7-8 hours) for concentration',
      ],
      tips: ['Use fitness apps for quick workouts', 'Meal prep on weekends', 'Track sleep patterns'],
    },
    {
      title: 'Social connections',
      description: 'Maintain relationships whilst managing demanding schedule',
      strategies: [
        'Schedule regular catch-ups with friends and family',
        'Be present during quality time (phones away)',
        'Include loved ones in your apprenticeship journey',
        'Join apprentice social groups or networks',
      ],
      tips: ['Weekly family dinners', 'Monthly friend meetups', 'Share your achievements'],
    },
  ];

  const warningSignsAndSolutions = [
    {
      warning: 'Constantly thinking about work during personal time',
      solution: 'Practice mindfulness techniques and create transition rituals',
      immediateAction:
        "Take 5 minutes to write down tomorrow's priorities, then close your notebook",
    },
    {
      warning: 'Neglecting personal relationships',
      solution: 'Schedule regular quality time and communicate your needs',
      immediateAction: 'Text a friend or family member right now to arrange a catch-up',
    },
    {
      warning: 'Chronic exhaustion or illness',
      solution: 'Review your schedule and prioritise rest and recovery',
      immediateAction: 'Book a full day off this weekend with no work or study',
    },
    {
      warning: 'Loss of interest in hobbies or activities you once enjoyed',
      solution: 'Gradually reintroduce enjoyable activities into your routine',
      immediateAction: 'Spend 30 minutes today doing something you love',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Work-life balance strategies
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {balanceStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div>
                <h3 className="text-[16px] font-semibold text-white leading-tight">
                  {strategy.title}
                </h3>
                <p className="text-[14px] text-white/70 leading-relaxed mt-1">
                  {strategy.description}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key strategies
                </span>
                <ul className="space-y-1.5">
                  {strategy.strategies.map((item, itemIndex) => (
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
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Quick tips
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {strategy.tips.map((tip, tipIndex) => (
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

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Warning signs & solutions
        </span>
        <div className="space-y-3">
          {warningSignsAndSolutions.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Warning sign
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{item.warning}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Solution
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{item.solution}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Take action now
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{item.immediateAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Weekly balance check-in
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <h4 className="text-[14px] font-semibold text-white">This week I will...</h4>
            <ul className="space-y-1.5">
              {[
                'Spend quality time with family/friends',
                'Take at least one complete evening off',
                'Do something I enjoy for at least 1 hour',
                'Get adequate sleep (aim for 7-8 hours)',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-center gap-2"
                >
                  <span className="w-4 h-4 border border-white/15 rounded flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
            <h4 className="text-[14px] font-semibold text-white">Balance reflection</h4>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70">Energy levels (1-10):</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div
                    key={num}
                    className="w-6 h-6 border border-white/15 rounded text-[11px] flex items-center justify-center text-white/85"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70">Relationship satisfaction (1-10):</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div
                    key={num}
                    className="w-6 h-6 border border-white/15 rounded text-[11px] flex items-center justify-center text-white/85"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkLifeBalanceTab;
