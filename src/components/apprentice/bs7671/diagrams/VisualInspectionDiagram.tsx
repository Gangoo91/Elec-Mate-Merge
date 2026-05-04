interface VisualInspectionDiagramProps {
  stepType: string;
  installationType?: string;
}

const VisualInspectionDiagram = ({ stepType, installationType }: VisualInspectionDiagramProps) => {
  void stepType;

  const inspectionAreas = [
    {
      area: 'External intake equipment',
      items: [
        'Service head seal integrity and security',
        'Meter tails condition and termination',
        'Main earthing conductor size and connection',
        'Main equipotential bonding conductor',
      ],
      regulation: 'BS 7671 Chapter 54',
      critical: true,
    },
    {
      area: 'Consumer unit / distribution board',
      items: [
        'Adequate access and working space',
        'Enclosure suitable for environment',
        'All circuits properly identified and labelled',
        'RCD(s) present and properly identified',
      ],
      regulation: 'BS 7671 Chapter 53',
      critical: true,
    },
    {
      area: 'Earthing arrangements',
      items: [
        'Main earthing conductor present and adequately sized',
        'Circuit protective conductors present',
        'Equipotential bonding conductors adequate',
        'Supplementary bonding where required',
      ],
      regulation: 'BS 7671 Section 544',
      critical: true,
    },
    {
      area: 'Wiring systems',
      items: [
        'Cables properly supported and protected',
        'Cables suitable for environmental conditions',
        'Adequate protection against mechanical damage',
        'Segregation from non-electrical services',
      ],
      regulation: 'BS 7671 Chapter 52',
      critical: false,
    },
    {
      area: 'Accessories & equipment',
      items: [
        'Socket outlets RCD protected ≤20A',
        'Adequate IP rating for location',
        'Switches and isolators correctly rated',
        'No damage or deterioration evident',
      ],
      regulation: 'BS 7671 Section 411',
      critical: false,
    },
    {
      area: 'Connections & terminations',
      items: [
        'All connections tight and secure',
        'Conductor identification correct',
        'Junction boxes accessible for inspection',
        'No signs of overheating or damage',
      ],
      regulation: 'BS 7671 Section 526',
      critical: true,
    },
    {
      area: 'Special locations',
      items: [
        'Bathroom zones comply with BS 7671',
        'Kitchen requirements observed',
        'Outdoor installation IP ratings adequate',
        'Swimming pool requirements (if applicable)',
      ],
      regulation: 'BS 7671 Part 7',
      critical: true,
    },
    {
      area: 'RCD protection',
      items: [
        'RCD manual test button operational',
        'RCD protection provided where required',
        'RCD ratings appropriate for circuits',
        'RCD quarterly test notice displayed',
      ],
      regulation: 'BS 7671 Section 531',
      critical: true,
    },
    {
      area: 'Isolation & switching',
      items: [
        'Main switch / isolator readily accessible',
        'Emergency switching arrangements adequate',
        'Isolation devices properly rated and marked',
        'Warning notices and labels present',
      ],
      regulation: 'BS 7671 Section 537',
      critical: true,
    },
    {
      area: 'Undervoltage protection',
      items: [
        'Undervoltage protection provided where required',
        'Protection devices correctly rated',
        'Manual reset facilities where required',
      ],
      regulation: 'BS 7671 Section 445',
      critical: true,
    },
  ];

  const outcomeClassifications = [
    {
      code: '✓',
      label: 'Acceptable',
      description: 'No defects found — installation complies',
    },
    {
      code: 'C1',
      label: 'Danger present',
      description: 'Immediate remedial action required',
    },
    {
      code: 'C2',
      label: 'Potentially dangerous',
      description: 'Urgent remedial action required',
    },
    {
      code: 'C3',
      label: 'Improvement recommended',
      description: 'Enhancement recommended for safety',
    },
    {
      code: 'N/V',
      label: 'Not verified',
      description: 'Unable to inspect — limitation',
    },
    {
      code: 'LIM',
      label: 'Limitation',
      description: 'Limitation encountered during inspection',
    },
    {
      code: 'N/A',
      label: 'Not applicable',
      description: 'Not applicable to this installation',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        Comprehensive EICR visual inspection for {installationType || 'electrical'} installations —
        10 main sections with 80+ inspection items.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          EICR outcome classifications
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {outcomeClassifications.map((outcome, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1"
            >
              <div className="text-[18px] font-bold text-white">{outcome.code}</div>
              <div className="text-[12px] font-medium text-white/85">{outcome.label}</div>
              <div className="text-[11px] text-white/55 leading-snug">{outcome.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {inspectionAreas.map((area, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  {area.area}
                </span>
                <p className="text-[11px] text-white/55 font-mono">{area.regulation}</p>
              </div>
              {area.critical && (
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  Critical
                </span>
              )}
            </div>
            <ul className="space-y-1.5">
              {area.items.map((item, itemIndex) => (
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

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Critical safety requirements
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Before starting
            </span>
            <ul className="space-y-1.5">
              {[
                'Verify safe isolation procedures followed',
                'Ensure adequate lighting for inspection',
                'Have appropriate access equipment available',
                'Check test equipment calibration certificates',
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
              During inspection
            </span>
            <ul className="space-y-1.5">
              {[
                'Do not remove covers unnecessarily',
                'Take photographs of defects for evidence',
                'Record all observations systematically',
                'Report immediate dangers (C1) immediately',
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

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Professional documentation standards
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Recording
            </span>
            <ul className="space-y-1.5">
              {[
                'Use official BS 7671 Schedule of Inspections',
                'Complete all applicable items',
                'Provide detailed notes for defects',
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
              Classification
            </span>
            <ul className="space-y-1.5">
              {[
                'Apply correct outcome codes (C1 / C2 / C3)',
                'Justify classification decisions',
                'Reference relevant regulations',
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
              Follow-up
            </span>
            <ul className="space-y-1.5">
              {[
                'Recommend remedial actions',
                'Set realistic timescales',
                'Arrange re-inspection if required',
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
    </div>
  );
};

export default VisualInspectionDiagram;
