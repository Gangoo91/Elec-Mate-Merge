const CourseSelectionTips = () => {
  const tips = [
    {
      title: 'Align with career goals',
      description:
        'Choose courses that directly support your career progression plans. Consider specialist areas like industrial, commercial, or domestic work. Research salary expectations for each path and match courses to desired outcomes.',
    },
    {
      title: 'Future-proof your skills',
      description:
        'Prioritise emerging technologies like EV charging, smart home systems, renewable energy and energy storage. These sectors are seeing strong year-on-year growth.',
    },
    {
      title: 'Check accreditations',
      description:
        'Ensure courses are recognised by NICEIC, ECA, SELECT, City & Guilds, EAL or JIB. Verify if the qualification counts towards your JIB grading. Look for courses that include competency assessments.',
    },
    {
      title: 'Consider timing & format',
      description:
        'Balance course duration with work commitments. Evening classes (6-9pm), weekend intensive courses, or online hybrid learning are available. Block release courses may suit some employers.',
    },
    {
      title: 'Funding & employer support',
      description:
        'Many employers offer funding through the apprenticeship levy. Check for government grants, skills bootcamps or sector-specific funding. Some courses qualify for career development loans.',
    },
    {
      title: 'Research training providers',
      description:
        'Compare course quality, pass rates and industry connections. Read reviews from recent students and check employment outcomes. Visit facilities to assess equipment quality.',
    },
    {
      title: 'Calculate return on investment',
      description:
        'Compare course costs against potential salary increases. Entry-level courses (£500-2,000) can lead to £3-5k salary jumps. Specialist qualifications (£2-5k) often result in £8-15k increases.',
    },
    {
      title: 'Network & learn from peers',
      description:
        'Join course-related forums, LinkedIn groups and professional associations. Connect with fellow students for study groups and future job opportunities. Build relationships with instructors.',
    },
  ];

  const costGuidance = [
    {
      category: 'Entry level (Level 2)',
      cost: '£500 - £2,000',
      duration: '6-12 months',
      outcome: 'Start as trainee, £18-22k salary',
    },
    {
      category: 'Intermediate (Level 3)',
      cost: '£1,500 - £4,000',
      duration: '12-24 months',
      outcome: 'Qualified electrician, £25-35k salary',
    },
    {
      category: 'Specialist courses',
      cost: '£800 - £3,000 per course',
      duration: '1-6 months',
      outcome: '£3-8k salary increase per specialism',
    },
  ];

  const qualityIndicators = [
    'Industry-standard equipment and facilities',
    'Qualified instructors with recent industry experience',
    'High pass rates (80%+ for practical assessments)',
    'Strong employer links and job placement support',
    'Up-to-date curriculum reflecting current regulations',
    'Good student reviews and graduate employment rates',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Course selection tips
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5"
            >
              <p className="text-[13px] text-white">{tip.title}</p>
              <p className="text-[12px] text-white/70 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Course cost guidance
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {costGuidance.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
            >
              <p className="text-[13px] text-white">{item.category}</p>
              <div className="space-y-1 text-[12px] text-white/85">
                <div className="flex justify-between">
                  <span className="text-white/55">Cost</span>
                  <span>{item.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/55">Duration</span>
                  <span>{item.duration}</span>
                </div>
              </div>
              <p className="text-[12px] text-white/70 pt-2 border-t border-white/[0.06]">
                {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Quality indicators to look for
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {qualityIndicators.map((indicator, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-[13px] text-white/85 rounded-md border border-white/10 bg-white/[0.03] p-3"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{indicator}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Industry insight & market trends
        </span>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-3">
          <p className="text-[13px] text-white">High-growth sectors</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              {
                title: 'EV charging infrastructure',
                tag: 'Strong growth',
                note: 'Premium rates for specialists',
              },
              {
                title: 'Renewable energy systems',
                tag: 'Strong growth',
                note: 'Solar and battery storage',
              },
              {
                title: 'Smart building technology',
                tag: 'Growing demand',
                note: 'Commercial and residential',
              },
              {
                title: 'Data centre infrastructure',
                tag: 'Critical shortage',
                note: 'Premium rates for qualified engineers',
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-md border border-white/10 bg-white/[0.03] p-3 space-y-1"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {s.tag}
                </span>
                <p className="text-[13px] text-white">{s.title}</p>
                <p className="text-[12px] text-white/70">{s.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <p className="text-[13px] text-white">Regional considerations</p>
          <div className="space-y-1.5">
            {[
              {
                region: 'London',
                note: 'Highest salaries but intense competition and higher course costs.',
              },
              {
                region: 'North',
                note: 'Strong demand for manufacturing and renewable energy skills.',
              },
              {
                region: 'Scotland',
                note: 'Offshore wind and renewable energy opportunities, government funding.',
              },
              {
                region: 'Wales',
                note: 'Growing green energy sector with apprenticeship support.',
              },
            ].map((r) => (
              <div
                key={r.region}
                className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
              >
                <span className="text-white/55 font-medium min-w-[70px]">{r.region}</span>
                <span>{r.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelectionTips;
