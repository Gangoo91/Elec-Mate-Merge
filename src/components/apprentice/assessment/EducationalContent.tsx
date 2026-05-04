import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EducationalContent = () => {
  const regulations = {
    bs7671: [
      { section: '132', title: 'Design requirements' },
      { section: '411', title: 'Protection against electric shock' },
      { section: '531', title: 'Devices for protection against overcurrent' },
      { section: '611', title: 'Common rules for initial verification' },
    ],
    healthSafety: [
      'Health and Safety at Work Act 1974',
      'Electricity at Work Regulations 1989',
      'CDM Regulations 2015',
      'PPE at Work Regulations 1992',
    ],
  };

  const highRiskHazards = [
    'Live electrical conductors',
    'Overhead power lines',
    'Underground cables',
    'Arc flash potential',
    'Stored electrical energy',
  ];

  const mediumRiskHazards = [
    'Damaged electrical equipment',
    'Poor environmental conditions',
    'Inadequate lighting',
    'Unstable access equipment',
    'Chemical hazards (COSHH)',
  ];

  const essentialPPE = [
    { item: 'Hard hat', spec: 'BS EN 397 with electrical protection' },
    { item: 'Safety glasses', spec: 'BS EN 166 impact resistant' },
    { item: 'Insulated gloves', spec: 'Voltage rated for task' },
    { item: 'Safety boots', spec: 'BS EN ISO 20345' },
  ];

  const ppeInspectionTips = [
    'Check for visible damage before use',
    'Verify certification dates',
    'Ensure proper fit and comfort',
    'Replace if damaged or expired',
  ];

  const assessmentTips = [
    'Always assess the site before starting any work',
    'Take photos to document conditions and concerns',
    'Involve the whole team in safety discussions',
    "Don't proceed if conditions are unsafe",
    'Regular reassessment as work progresses',
  ];

  const documentationTips = [
    'Use clear, specific language in reports',
    'Include measurements where relevant',
    'Note weather and environmental conditions',
    'Record any deviations from normal procedures',
    'Keep digital copies of all assessments',
  ];

  return (
    <div className="space-y-5">
      <h3 className="text-[16px] sm:text-[18px] font-medium text-white">Learn while you assess</h3>

      <Tabs defaultValue="regulations" className="w-full">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-5">
          <TabsList className="w-full min-w-max bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
            <TabsTrigger
              value="regulations"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Regulations
            </TabsTrigger>
            <TabsTrigger
              value="hazards"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Hazards
            </TabsTrigger>
            <TabsTrigger
              value="ppe"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              PPE
            </TabsTrigger>
            <TabsTrigger
              value="tips"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Tips
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="regulations" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                BS 7671 requirements
              </span>
              <ul className="space-y-1.5">
                {regulations.bs7671.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-2 text-[14px] text-white/85 leading-relaxed"
                  >
                    <span className="text-[11px] font-mono text-white/55 min-w-[36px]">
                      {item.section}
                    </span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Health & safety regulations
              </span>
              <ul className="space-y-1.5">
                {regulations.healthSafety.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hazards" className="space-y-3">
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
              High risk hazards
            </span>
            <ul className="space-y-1.5">
              {highRiskHazards.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-red-300 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Medium risk hazards
            </span>
            <ul className="space-y-1.5">
              {mediumRiskHazards.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="ppe" className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Essential PPE
              </span>
              <ul className="space-y-2">
                {essentialPPE.map((item, index) => (
                  <li key={index} className="text-[14px] leading-relaxed">
                    <span className="text-white">{item.item}: </span>
                    <span className="text-white/70">{item.spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                PPE inspection
              </span>
              <ul className="space-y-1.5">
                {ppeInspectionTips.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Assessment best practices
            </span>
            <ul className="space-y-1.5">
              {assessmentTips.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Documentation tips
            </span>
            <ul className="space-y-1.5">
              {documentationTips.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalContent;
