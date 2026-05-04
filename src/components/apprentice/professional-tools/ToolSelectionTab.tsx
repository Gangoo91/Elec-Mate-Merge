import ToolComparisonChart from '@/components/apprentice/tools-guide/ToolComparisonChart';

const ToolSelectionTab = () => {
  const qualityIndicators = [
    {
      category: 'Build quality',
      factors: [
        'Solid construction with minimal flex',
        'Quality materials (avoid cheap plastic)',
        'Smooth operation of moving parts',
        'Even paint/coating application',
        'Proper tool balance and ergonomics',
      ],
      redFlags: [
        'Excessive plastic construction',
        'Rough edges or poor finishing',
        'Wobbly joints or loose parts',
        'Unclear or missing markings',
      ],
    },
    {
      category: 'Safety compliance',
      factors: [
        'CE marking for European compliance',
        'VDE certification for electrical tools',
        'GS38 compliance for test equipment',
        'Valid calibration certificates',
        'Clear safety instructions included',
      ],
      redFlags: [
        'Missing safety certifications',
        'Unclear voltage ratings',
        'Poor insulation quality',
        'No proving unit with voltage indicators',
      ],
    },
    {
      category: 'Value assessment',
      factors: [
        'Warranty period (minimum 1 year)',
        'Local service availability',
        'Spare parts accessibility',
        'Brand reputation in UK market',
        'Total cost of ownership',
      ],
      redFlags: [
        'No warranty or very short period',
        'Unknown brand with no UK presence',
        'Unrealistic pricing (too cheap)',
        'No local service support',
      ],
    },
  ];

  const multimeterComparison = [
    {
      brand: 'Fluke',
      model: '87V Industrial',
      price: '£300-400',
      rating: 5,
      warranty: '3 years',
      features: ['True RMS', 'Temperature', 'Frequency', 'Min/Max recording'],
      pros: [
        'Industry standard reliability',
        'Excellent build quality',
        'Comprehensive functions',
      ],
      cons: ['Higher price point', 'Complex for beginners'],
      bestFor: 'Professional electricians requiring maximum accuracy and reliability',
    },
    {
      brand: 'Megger',
      model: 'AVO410',
      price: '£120-180',
      rating: 4,
      warranty: '2 years',
      features: ['Auto-ranging', 'Data hold', 'Backlight', 'Safety rated CAT III'],
      pros: ['Good UK brand', 'Reliable performance', 'Competitive pricing'],
      cons: ['Limited advanced features', 'Basic display'],
      bestFor: 'Apprentices and general electrical work',
    },
    {
      brand: 'Martindale',
      model: 'MM39',
      price: '£80-120',
      rating: 4,
      warranty: '1 year',
      features: ['Basic functions', 'LED continuity', 'Auto power-off'],
      pros: ['Budget-friendly', 'Simple operation', 'UK electrical focus'],
      cons: ['Limited functionality', 'Basic build quality'],
      bestFor: 'Basic electrical testing and apprentice training',
    },
  ];

  const purchasingGuidelines = [
    {
      stage: 'Research phase',
      duration: '1–2 weeks',
      activities: [
        'Read professional reviews and forums',
        'Check manufacturer specifications',
        'Compare prices from multiple suppliers',
        'Verify UK compliance and certifications',
        'Ask experienced colleagues for recommendations',
      ],
    },
    {
      stage: 'Evaluation phase',
      duration: '3–5 days',
      activities: [
        'Handle tools in person when possible',
        'Test basic functionality if allowed',
        'Check warranty terms and conditions',
        'Confirm local service availability',
        'Calculate total cost including accessories',
      ],
    },
    {
      stage: 'Purchase decision',
      duration: '1–2 days',
      activities: [
        'Choose reputable supplier with good return policy',
        'Verify delivery times and costs',
        'Check payment options and protection',
        'Register for warranty immediately',
        'Plan for proper storage and maintenance',
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Quality tool selection
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Quality tool selection is crucial for your professional development. This guide helps
          you make informed decisions and avoid costly mistakes.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Quality assessment guide
          </span>
          <p className="text-[13px] text-white/55">
            Learn to identify quality tools and avoid poor purchases
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {qualityIndicators.map((indicator, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4"
            >
              <h3 className="text-[14px] font-semibold text-white">{indicator.category}</h3>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Look for
                </span>
                <ul className="space-y-1.5">
                  {indicator.factors.map((factor, idx) => (
                    <li
                      key={idx}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                  Red flags
                </span>
                <ul className="space-y-1.5">
                  {indicator.redFlags.map((flag, idx) => (
                    <li
                      key={idx}
                      className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToolComparisonChart
        title="Digital Multimeter Comparison"
        tools={multimeterComparison}
        category="test equipment"
      />

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Smart purchasing process
          </span>
          <p className="text-[13px] text-white/55">
            Follow this structured approach to make better tool purchases
          </p>
        </div>
        <div className="space-y-3">
          {purchasingGuidelines.map((stage, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[14px] font-semibold text-white">{stage.stage}</h3>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                  {stage.duration}
                </span>
              </div>
              <ul className="space-y-1.5">
                {stage.activities.map((activity, idx) => (
                  <li
                    key={idx}
                    className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Investment tip
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Buy quality tools once rather than cheap tools multiple times. A good tool will last your
          entire career and maintain its resale value.
        </p>
      </div>
    </div>
  );
};

export default ToolSelectionTab;
