const WeeklyStructureCard = () => {
  const weeklyStructure = {
    totalHours: 37.5,
    offJobRequired: 7.5,
    percentage: 20,
  };

  const sampleWeekSchedules = [
    {
      pattern: 'College day release',
      structure: '1 day per week at college',
      breakdown: [
        {
          day: 'Monday',
          type: 'On-the-job',
          hours: 7.5,
          activities: ['Site work', 'Practical tasks'],
        },
        {
          day: 'Tuesday',
          type: 'Off-the-job',
          hours: 7.5,
          activities: ['College attendance', 'Theory lessons'],
        },
        {
          day: 'Wednesday',
          type: 'On-the-job',
          hours: 7.5,
          activities: ['Site work', 'Skills practice'],
        },
        { day: 'Thursday', type: 'On-the-job', hours: 7.5, activities: ['Site work', 'Mentoring'] },
        {
          day: 'Friday',
          type: 'On-the-job',
          hours: 7.5,
          activities: ['Site work', 'Review session'],
        },
      ],
      pros: ['Consistent routine', 'Full day of focused learning', 'Peer interaction'],
      cons: ['Less flexibility', 'Fixed schedule', 'Travel requirements'],
    },
    {
      pattern: 'Block release',
      structure: '2-4 weeks at college per term',
      breakdown: [
        {
          period: 'Weeks 1-10',
          type: 'On-the-job',
          hours: 75,
          activities: ['Site work', 'Practical experience'],
        },
        {
          period: 'Weeks 11-12',
          type: 'Off-the-job',
          hours: 75,
          activities: ['Intensive college', 'Theory modules'],
        },
        {
          period: 'Weeks 13-22',
          type: 'On-the-job',
          hours: 75,
          activities: ['Site work', 'Applied learning'],
        },
        {
          period: 'Weeks 23-24',
          type: 'Off-the-job',
          hours: 75,
          activities: ['Assessment', 'Revision'],
        },
      ],
      pros: ['Intensive learning', 'Continuous assessment', 'Immersive experience'],
      cons: ['Long periods away', 'Adjustment challenges', 'Catch-up required'],
    },
    {
      pattern: 'Flexible learning',
      structure: 'Mixed delivery methods',
      breakdown: [
        {
          element: 'Online learning',
          type: 'Off-the-job',
          hours: '2-3 hrs/week',
          activities: ['E-learning modules', 'Virtual classrooms'],
        },
        {
          element: 'Workshop sessions',
          type: 'Off-the-job',
          hours: '4 hrs/week',
          activities: ['Practical skills', 'Assessments'],
        },
        {
          element: 'Study time',
          type: 'Off-the-job',
          hours: '1-2 hrs/week',
          activities: ['Research', 'Assignments'],
        },
        {
          element: 'Site work',
          type: 'On-the-job',
          hours: '30 hrs/week',
          activities: ['Practical application', 'Experience'],
        },
      ],
      pros: ['Very flexible', 'Self-paced options', 'Work-life balance'],
      cons: ['Requires discipline', 'Less structure', 'Coordination needed'],
    },
  ];

  const monthlyPlanning = [
    {
      month: 'Month 1',
      focus: 'Foundation & induction',
      offJobHours: 32,
      activities: [
        'Health & Safety training',
        'Basic electrical theory',
        'Tool familiarisation',
        'Industry standards introduction',
      ],
      assessments: ['H&S test', 'Basic knowledge quiz'],
    },
    {
      month: 'Month 6',
      focus: 'Intermediate skills',
      offJobHours: 30,
      activities: [
        'Circuit design principles',
        'Testing procedures',
        'Regulations deep-dive',
        'Practical assessments',
      ],
      assessments: ['Practical test', 'Theory examination'],
    },
    {
      month: 'Month 12',
      focus: 'Advanced applications',
      offJobHours: 28,
      activities: [
        'Complex installations',
        'Fault diagnosis',
        'Commercial systems',
        'Project management',
      ],
      assessments: ['Portfolio review', 'Competency assessment'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Weekly and monthly structure planning
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Understanding how to structure your off-the-job training time effectively
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            20% time allocation breakdown
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-2xl font-mono text-white">{weeklyStructure.totalHours}</div>
              <div className="text-[11px] text-white/55 mt-1">Total hours/week</div>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-2xl font-mono text-white">
                {weeklyStructure.offJobRequired}
              </div>
              <div className="text-[11px] text-white/55 mt-1">Off-the-job hours</div>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-2xl font-mono text-white">{weeklyStructure.percentage}%</div>
              <div className="text-[11px] text-white/55 mt-1">Required minimum</div>
            </div>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${weeklyStructure.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-white/55 font-mono">
            This equals approximately 278 hours over a 12-month period
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[14px] font-semibold text-white">Common delivery patterns</h4>
          {sampleWeekSchedules.map((schedule, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h5 className="text-[14px] font-semibold text-white">{schedule.pattern}</h5>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {schedule.structure}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Schedule breakdown
                  </span>
                  <div className="space-y-2">
                    {schedule.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2"
                      >
                        <div>
                          <span className="text-[13px] font-semibold text-white">
                            {item.day || item.period || item.element}
                          </span>
                          <div className="text-[12px] text-white/70">
                            {item.activities.join(', ')}
                          </div>
                        </div>
                        <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] whitespace-nowrap">
                          {typeof item.hours === 'number' ? `${item.hours}h` : item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                      Advantages
                    </span>
                    <ul className="space-y-1">
                      {schedule.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Considerations
                    </span>
                    <ul className="space-y-1">
                      {schedule.cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="text-[14px] font-semibold text-white">Monthly planning examples</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthlyPlanning.map((month, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-[14px] font-semibold text-white">{month.month}</h5>
                  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    {month.offJobHours}h
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Focus area
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">{month.focus}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Key activities
                  </span>
                  <ul className="space-y-1">
                    {month.activities.map((activity, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                    Assessments
                  </span>
                  <ul className="space-y-1">
                    {month.assessments.map((assessment, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span>{assessment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStructureCard;
