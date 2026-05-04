const BuildingCollection = () => {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Essential safety & basic hand tools',
      timeframe: 'Months 1-6',
      budget: '£300-500',
      priority: 'Critical',
      items: [
        'Safety boots & hard hat',
        'Basic multimeter',
        'Screwdriver set (insulated)',
        'Wire strippers & side cutters',
        'Voltage tester (two-pole)',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Testing equipment & power tools',
      timeframe: 'Months 6-12',
      budget: '£400-700',
      priority: 'High',
      items: [
        'Insulation resistance tester',
        'Cordless drill & bits',
        'Spirit level (torpedo)',
        'Cable detector',
        'RCD tester',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Advanced testing & installation tools',
      timeframe: 'Months 12-24',
      budget: '£600-1000',
      priority: 'Medium',
      items: [
        'Loop impedance tester',
        'Angle grinder (115mm)',
        'SDS drill & bits',
        'Cable pulling system',
        'Advanced multimeter',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Professional specialisation tools',
      timeframe: 'Months 24+',
      budget: '£500-800',
      priority: 'Future',
      items: [
        'Advanced PAT tester',
        'Thermal imaging camera',
        'Specialised test equipment',
        'Professional tool storage',
        'Vehicle tool setup',
      ],
    },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Strategy
        </span>
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white leading-tight">
          Tool collection strategy
        </h2>
        <p className="text-[14px] text-white/85 leading-relaxed max-w-2xl">
          A strategic approach to building your electrical tool collection. Prioritise safety and
          testing tools first, then expand to power tools as your career progresses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4"
          >
            <div className="space-y-1">
              <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span>{phase.phase}</span>
                <span className="text-white/25">·</span>
                <span>{phase.priority}</span>
              </div>
              <h3 className="text-[16px] font-semibold text-white leading-tight">{phase.title}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-white/85">
              <div className="space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Timeline
                </span>
                <p>{phase.timeframe}</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Budget
                </span>
                <p className="font-mono">{phase.budget}</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Essential tools
              </span>
              <ul className="space-y-1.5">
                {phase.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Smart tool purchasing
          </span>
          <ul className="space-y-1 text-[14px] text-white/85 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Invest in quality tools that will last your career</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Check if your employer provides tool allowances</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Consider tool insurance for expensive equipment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Look for apprentice trade discounts</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Funding your tools
          </span>
          <ul className="space-y-1 text-[14px] text-white/85 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Apprenticeship training provider schemes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Government grants for apprentices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Employer tool purchase programmes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>Hire tools for one-off requirements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BuildingCollection;
