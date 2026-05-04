const IndustrialDesignConsiderations = () => {
  const designConsiderations = [
    {
      category: 'Motor control systems',
      considerations: [
        'Soft-start requirements for large motors',
        'Variable frequency drive integration',
        'Motor protection and overload settings',
        'Emergency stop circuit design',
        'Control voltage selection (24V/110V/240V)',
      ],
    },
    {
      category: 'Hazardous areas',
      considerations: [
        'ATEX zone classifications (Zone 0, 1, 2)',
        'Temperature class requirements',
        'Gas group classifications',
        'Ingress protection ratings',
        'Explosive atmosphere protection methods',
      ],
    },
    {
      category: 'Heavy machinery',
      considerations: [
        'Load calculations for large motors',
        'Starting current and diversity factors',
        'Mechanical protection requirements',
        'Maintenance access provisions',
        'Lifting and handling considerations',
      ],
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Design
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          Critical design considerations
        </h3>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Key factors for industrial electrical design.
        </p>
      </div>
      <div className="space-y-3">
        {designConsiderations.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 space-y-2"
          >
            <h4 className="text-[14px] font-medium text-white">{item.category}</h4>
            <ul className="space-y-1">
              {item.considerations.map((consideration, conIndex) => (
                <li
                  key={conIndex}
                  className="flex items-start gap-2 text-[13px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustrialDesignConsiderations;
