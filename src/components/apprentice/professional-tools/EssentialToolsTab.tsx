import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HandToolsTab from '@/components/apprentice/tools-guide/HandToolsTab';
import PowerToolsTab from '@/components/apprentice/tools-guide/PowerToolsTab';
import TestEquipmentTab from '@/components/apprentice/tools-guide/TestEquipmentTab';
import PPETab from '@/components/apprentice/tools-guide/PPETab';

const EssentialToolsTab = () => {
  const maintenanceSchedule = [
    {
      item: 'Hand tools',
      frequency: 'Monthly',
      task: 'Clean, oil, check for damage',
      cost: '£5–10/year',
    },
    {
      item: 'Power tools',
      frequency: 'Weekly',
      task: 'Battery check, cleaning, inspection',
      cost: '£20–40/year',
    },
    {
      item: 'Test equipment',
      frequency: 'Annual',
      task: 'Professional calibration required',
      cost: '£100–200/year',
    },
    {
      item: 'PPE',
      frequency: 'Daily',
      task: 'Visual inspection before use',
      cost: '£50–100/year replacement',
    },
  ];

  const certificationRequirements = [
    {
      standard: 'BS EN 60900',
      applies: 'Hand tools for electrical work',
      requirement: 'VDE certification mandatory',
      penalty: 'HSE prosecution risk',
    },
    {
      standard: 'GS38',
      applies: 'Test leads and voltage indicators',
      requirement: 'Safety specification compliance',
      penalty: 'Invalid test results',
    },
    {
      standard: 'BS EN 397',
      applies: 'Safety helmets',
      requirement: 'Impact and electrical protection',
      penalty: 'Site access denied',
    },
    {
      standard: 'BS EN ISO 20345',
      applies: 'Safety footwear',
      requirement: 'S3 rating minimum',
      penalty: 'Insurance claims rejected',
    },
  ];

  const progressionMilestones = [
    {
      milestone: 'Month 1–3: Foundation kit',
      cost: '£300–500',
      items: ['Basic PPE', 'Essential hand tools', 'Simple continuity tester'],
      competency: 'Safe to work under close supervision',
      nextStep: 'Learn proper tool usage and maintenance',
    },
    {
      milestone: 'Month 4–8: Building skills',
      cost: '£400–700',
      items: ['Cordless drill system', 'Advanced hand tools', 'Basic test equipment'],
      competency: 'Independent basic installations',
      nextStep: 'Develop testing and fault-finding skills',
    },
    {
      milestone: 'Month 9–18: Professional level',
      cost: '£800–1500',
      items: ['Multifunction tester', 'Specialist tools', 'Advanced PPE'],
      competency: 'Testing and certification work',
      nextStep: 'Specialisation and advanced techniques',
    },
    {
      milestone: 'Year 2+: Specialist equipment',
      cost: '£500–1000',
      items: ['Thermal imaging', 'Advanced test equipment', 'Specialist tools'],
      competency: 'Complex installations and fault diagnosis',
      nextStep: 'Mentoring and advanced qualifications',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Essential tools guide
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Essential tools form the foundation of your professional toolkit. This comprehensive
          guide covers specifications, maintenance, and strategic purchasing advice.
        </p>
      </div>

      <Tabs defaultValue="hand-tools" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl h-auto">
          <TabsTrigger
            value="hand-tools"
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation"
          >
            Hand tools
          </TabsTrigger>
          <TabsTrigger
            value="power-tools"
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation"
          >
            Power tools
          </TabsTrigger>
          <TabsTrigger
            value="test-equipment"
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation"
          >
            Test equipment
          </TabsTrigger>
          <TabsTrigger
            value="ppe"
            className="data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg h-10 touch-manipulation"
          >
            PPE & safety
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hand-tools" className="mt-4">
          <HandToolsTab />
        </TabsContent>
        <TabsContent value="power-tools" className="mt-4">
          <PowerToolsTab />
        </TabsContent>
        <TabsContent value="test-equipment" className="mt-4">
          <TestEquipmentTab />
        </TabsContent>
        <TabsContent value="ppe" className="mt-4">
          <PPETab />
        </TabsContent>
      </Tabs>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Apprentice tool progression timeline
          </span>
          <p className="text-[13px] text-white/55">
            Strategic toolkit development aligned with your learning journey
          </p>
        </div>
        <div className="space-y-3">
          {progressionMilestones.map((milestone, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="space-y-1">
                  <h3 className="text-[14px] font-semibold text-white">{milestone.milestone}</h3>
                  <p className="text-[13px] text-white/55">{milestone.competency}</p>
                </div>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {milestone.cost}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Key items
                  </span>
                  <ul className="space-y-1">
                    {milestone.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Next focus
                  </span>
                  <p className="text-[14px] text-white/85 leading-relaxed">{milestone.nextStep}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Tool maintenance schedule
          </span>
          <p className="text-[13px] text-white/55">
            Proper maintenance extends tool life and ensures safety compliance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {maintenanceSchedule.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-semibold text-white">{item.item}</h4>
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                  {item.frequency}
                </span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{item.task}</p>
              <p className="text-[12px] text-white/55 font-mono">{item.cost}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            UK certification requirements
          </span>
          <p className="text-[13px] text-white/55">
            Understanding compliance requirements and the risks of non-compliance
          </p>
        </div>
        <div className="space-y-3">
          {certificationRequirements.map((cert, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                  {cert.standard}
                </span>
                <span className="text-[14px] font-semibold text-white">{cert.applies}</span>
              </div>
              <p className="text-[14px] text-white/85 leading-relaxed">{cert.requirement}</p>
              <div className="rounded-md border border-red-500/30 bg-red-500/[0.04] p-3 space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                  Risk of non-compliance
                </span>
                <p className="text-[13px] text-white/85 leading-relaxed">{cert.penalty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Investment strategy
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Total essential toolkit cost: £1050–2700. Focus on quality over quantity, spread
          purchases strategically, and prioritise safety-critical items first. Your tools are an
          investment in your professional future.
        </p>
      </div>
    </div>
  );
};

export default EssentialToolsTab;
