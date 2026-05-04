interface InitialVerificationDiagramProps {
  stepType: string;
  installationType?: string;
}

const InitialVerificationDiagram = ({
  stepType,
  installationType,
}: InitialVerificationDiagramProps) => {
  void stepType;

  const verificationSequence = [
    {
      phase: 'Planning & documentation review',
      items: [
        'Review installation drawings and specifications',
        'Check compliance with BS 7671 requirements',
        'Verify design calculations and cable schedules',
        'Confirm protective device coordination',
      ],
    },
    {
      phase: 'Visual inspection — external',
      items: [
        'Service head and meter position inspection',
        'Main earthing terminal arrangements',
        'External bonding conductor verification',
        'Cable entry and IP rating checks',
      ],
    },
    {
      phase: 'Visual inspection — internal',
      items: [
        'Consumer unit / distribution board inspection',
        'Circuit protective devices verification',
        'Cable installation methods and supports',
        'Socket outlets and accessory mounting',
      ],
    },
    {
      phase: 'Testing preparation',
      items: [
        'Isolation and proving dead procedures',
        'Test equipment calibration verification',
        'Circuit identification and labelling',
        'Load disconnection for testing',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[14px] text-white/85 leading-relaxed">
        Initial verification sequence for {installationType || 'electrical'} installations.
      </p>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          BS 7671 initial verification requirements
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Regulation 610.1
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Every installation shall be inspected and tested during erection and upon completion.
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Regulation 643.1
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Testing shall follow the sequence specified to avoid damage.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {verificationSequence.map((phase, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-[12px] font-mono text-white/55 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {phase.phase}
              </span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {phase.items.map((item, itemIndex) => (
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
          Initial verification critical points
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Before energising
            </span>
            <ul className="space-y-1.5">
              {[
                'Complete all visual inspections',
                'Verify all connections are secure',
                'Confirm protective device ratings',
                'Check polarity at all points',
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
              Documentation required
            </span>
            <ul className="space-y-1.5">
              {[
                'Electrical Installation Certificate',
                'Schedule of Inspections',
                'Schedule of Test Results',
                'Circuit charts and drawings',
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

      {installationType && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {installationType.charAt(0).toUpperCase() + installationType.slice(1)} installation —
            specific requirements
          </span>
          <ul className="space-y-1.5">
            {installationType === 'domestic' &&
              [
                'Verify main protective bonding to water, gas, and other services',
                'Check RCD protection for socket outlets ≤20A and circuits in special locations',
                'Confirm consumer unit location and accessibility',
                'Verify earthing arrangements and TN-C-S supply considerations',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            {installationType === 'commercial' &&
              [
                'Verify fire alarm and emergency lighting integration',
                'Check compliance with building regulations and fire safety',
                'Confirm isolation arrangements for maintenance',
                'Verify discrimination and selectivity of protective devices',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            {installationType === 'industrial' &&
              [
                'Check motor protection and control circuit arrangements',
                'Verify hazardous area classifications and equipment',
                'Confirm earthing and equipotential bonding systems',
                'Check compliance with relevant industry standards',
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
      )}
    </div>
  );
};

export default InitialVerificationDiagram;
