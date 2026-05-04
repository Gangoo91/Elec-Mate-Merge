const TimeManagementTab = () => {
  const scheduleTemplates = [
    {
      title: 'Daily routine (30-45 minutes)',
      activities: [
        {
          time: '10 mins',
          activity: "Review yesterday's notes",
          description: 'Quick recap to refresh memory',
        },
        {
          time: '20 mins',
          activity: 'New material or practice questions',
          description: 'Main learning activity',
        },
        {
          time: '10 mins',
          activity: 'Quick quiz or flashcards',
          description: 'Test understanding',
        },
        {
          time: '5 mins',
          activity: "Plan tomorrow's session",
          description: 'Set goals for next day',
        },
      ],
    },
    {
      title: 'Weekly goals',
      activities: [
        { time: 'Monday', activity: 'New regulations/theory', description: 'Learn new concepts' },
        {
          time: 'Tuesday',
          activity: 'Calculations practice',
          description: 'Apply formulas and methods',
        },
        {
          time: 'Wednesday',
          activity: 'Review and consolidate',
          description: 'Connect concepts together',
        },
        { time: 'Thursday', activity: 'Mock exam questions', description: 'Test exam readiness' },
        {
          time: 'Friday',
          activity: 'Weekend revision planning',
          description: 'Organise weekend study',
        },
      ],
    },
  ];

  const timeManagementTips = [
    {
      category: 'Planning',
      tips: [
        {
          tip: 'Use a study calendar',
          explanation: 'Mark exam dates, deadlines, and study sessions',
        },
        {
          tip: 'Set SMART goals',
          explanation: 'Specific, Measurable, Achievable, Relevant, Time-bound',
        },
        {
          tip: 'Break large topics down',
          explanation: 'Divide complex subjects into manageable chunks',
        },
        { tip: 'Plan regular reviews', explanation: 'Schedule time to revisit previous material' },
      ],
    },
    {
      category: 'Execution',
      tips: [
        { tip: 'Use the 2-minute rule', explanation: 'If it takes less than 2 minutes, do it now' },
        {
          tip: 'Eliminate distractions',
          explanation: 'Put phone away, find quiet space, use website blockers',
        },
        {
          tip: 'Study at your peak time',
          explanation: "Identify when you're most alert and focused",
        },
        {
          tip: 'Take regular breaks',
          explanation: 'Use Pomodoro technique or similar structured breaks',
        },
      ],
    },
    {
      category: 'Tracking',
      tips: [
        { tip: 'Log study hours', explanation: 'Track actual time spent studying vs planned' },
        { tip: 'Monitor progress', explanation: 'Regular self-testing to measure improvement' },
        { tip: 'Adjust as needed', explanation: "Modify schedule based on what's working" },
        { tip: 'Celebrate milestones', explanation: 'Reward yourself for achieving study goals' },
      ],
    },
  ];

  const studyEnvironment = [
    {
      aspect: 'Physical space',
      recommendations: [
        'Good lighting — preferably natural light',
        'Comfortable chair and desk height',
        'Minimal clutter and distractions',
        'All materials within reach',
        'Quiet environment or noise-cancelling headphones',
      ],
    },
    {
      aspect: 'Digital setup',
      recommendations: [
        'Multiple monitors if available',
        'Good internet connection for online resources',
        'PDF reader for regulations and guides',
        'Calculator app or physical calculator',
        'Note-taking app or traditional notebooks',
      ],
    },
    {
      aspect: 'Study materials',
      recommendations: [
        'BS 7671:2018 + A4:2026',
        'On-Site Guide',
        'Guidance Note 3',
        'Practice exam papers',
        'Coloured pens for highlighting and diagrams',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Study schedule templates
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {scheduleTemplates.map((template, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h3 className="text-[15px] font-semibold text-white">{template.title}</h3>
              <div className="space-y-2">
                {template.activities.map((activity, activityIndex) => (
                  <div
                    key={activityIndex}
                    className="rounded-md border border-white/10 bg-white/[0.03] p-3 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                        {activity.time}
                      </span>
                      <h4 className="text-[13px] font-medium text-white">{activity.activity}</h4>
                    </div>
                    <p className="text-[12px] text-white/70">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Time management strategies
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {timeManagementTips.map((category, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h3 className="text-[15px] font-semibold text-white">{category.category}</h3>
              <div className="space-y-2">
                {category.tips.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-0.5">
                    <h4 className="text-[13px] text-white">{item.tip}</h4>
                    <p className="text-[12px] text-white/70 leading-relaxed">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Optimal study environment
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {studyEnvironment.map((env, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h3 className="text-[15px] font-semibold text-white">{env.aspect}</h3>
              <ul className="space-y-1.5">
                {env.recommendations.map((rec, recIndex) => (
                  <li
                    key={recIndex}
                    className="flex items-start gap-2 text-[13px] text-white/85"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeManagementTab;
