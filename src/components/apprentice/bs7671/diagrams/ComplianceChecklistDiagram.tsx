interface ComplianceChecklistDiagramProps {
  installationType?: string;
}

const ComplianceChecklistDiagram = ({ installationType }: ComplianceChecklistDiagramProps) => {
  void installationType;

  const complianceCategories = [
    {
      category: 'Design compliance',
      items: [
        'Installation method selection appropriate for environment',
        'Cable sizing calculations verified against load requirements',
        'Protective device discrimination and selectivity confirmed',
        'Voltage drop calculations within permitted limits',
        'Short circuit and earth fault calculations completed',
      ],
      regulation: 'BS 7671 Chapter 43 & 52',
    },
    {
      category: 'Protection requirements',
      items: [
        'Automatic disconnection of supply provisions verified',
        'Additional protection by RCD where required',
        'Protection against overcurrent correctly applied',
        'Protection against overvoltage where necessary',
        'Isolation and switching arrangements adequate',
      ],
      regulation: 'BS 7671 Chapter 41 & 46',
    },
    {
      category: 'Special location requirements',
      items: [
        'Bathroom zones and protection requirements',
        'Kitchen and wet area considerations',
        'Swimming pool and fountain installations',
        'Caravan, motor caravan and marina installations',
        'Medical location requirements where applicable',
      ],
      regulation: 'BS 7671 Part 7',
    },
    {
      category: 'Installation methods',
      items: [
        'Cable installation methods comply with manufacturer instructions',
        'Supports and fixings at correct intervals',
        'Protection against mechanical damage adequate',
        'Segregation of circuits where required',
        'Accessibility for inspection and maintenance',
      ],
      regulation: 'BS 7671 Chapter 52',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        BS 7671 compliance verification checklist.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Regulation 641.3 — inspection requirements
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          The inspection shall be made to verify that the installed electrical equipment is in
          accordance with BS 7671, is not visibly damaged or defective so as to impair safety, and
          is correctly selected and erected.
        </p>
      </div>

      <div className="space-y-3">
        {complianceCategories.map((category, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {category.category}
              </span>
              <p className="text-[11px] text-white/55 font-mono">{category.regulation}</p>
            </div>
            <ul className="space-y-1.5">
              {category.items.map((item, itemIndex) => (
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
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Competent person requirements (Regulation 641.4)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Inspector qualifications
            </span>
            <ul className="space-y-1.5">
              {[
                'Knowledge of BS 7671 requirements',
                'Understanding of installation methods',
                'Experience with testing procedures',
                'Ability to identify non-compliance',
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
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Testing personnel
            </span>
            <ul className="space-y-1.5">
              {[
                'Competent in use of test instruments',
                'Understanding of test sequences',
                'Knowledge of acceptable values',
                'Ability to interpret results',
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

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Non-compliance action required
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">If non-compliance is identified:</p>
        <ul className="space-y-1.5">
          {[
            'Document the specific regulation contravention',
            'Do not energise the installation until rectified',
            'Notify the responsible person immediately',
            'Re-inspect and test after modifications',
            'Update documentation to reflect changes',
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
  );
};

export default ComplianceChecklistDiagram;
