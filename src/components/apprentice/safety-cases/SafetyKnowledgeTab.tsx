import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Play, BookOpen, Star, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SafetyKnowledgeTab = () => {
  const isMobile = useIsMobile();
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const safetyModules = [
    {
      id: 'electrical-hazards',
      title: 'Electrical Hazards & Risks',
      description:
        'Understanding electrical dangers, risk assessment methodologies, and hazard identification techniques for UK electrical installations',
      topics: [
        'Arc Flash Hazards',
        'Electric Shock Mechanisms',
        'Thermal Burns',
        'Fire Hazards',
        'Secondary Injuries',
      ],
      duration: '35 min',
      difficulty: 'Essential',
      progress: 75,
      learningOutcomes: [
        'Identify the five main electrical hazards in the workplace',
        'Understand how electric shock affects the human body',
        'Calculate arc flash incident energy levels',
        'Recognise fire risk factors in electrical installations',
      ],
      keyRegulations: ['Electricity at Work Regulations 1989', 'BS 7671:2018', 'HASAWA 1974'],
    },
    {
      id: 'ppe-safety',
      title: 'Personal Protective Equipment',
      description:
        'Comprehensive guide to selecting, using, and maintaining PPE for electrical work in compliance with UK standards',
      topics: [
        'Safety Helmets (BS EN 397)',
        'Eye Protection',
        'Insulated Gloves',
        'Safety Footwear',
        'Arc Flash PPE',
        'Hi-Vis Clothing',
      ],
      duration: '30 min',
      difficulty: 'Essential',
      progress: 60,
      learningOutcomes: [
        'Select appropriate PPE for different electrical tasks',
        'Understand PPE inspection and maintenance requirements',
        'Know the voltage ratings for insulated equipment',
        'Recognise when PPE needs replacement',
      ],
      keyRegulations: ['PPE at Work Regulations 1992', 'BS EN 61482', 'GS38'],
    },
    {
      id: 'safe-isolation',
      title: 'Safe Isolation Procedures',
      description:
        'Step-by-step safe isolation procedures including lock-out/tag-out, proving dead, and permit-to-work systems',
      topics: [
        'Lock-out Tag-out (LOTO)',
        'Proving Dead Procedure',
        'Isolation Points',
        'Permit Systems',
        'Multi-Lock Isolation',
      ],
      duration: '45 min',
      difficulty: 'Critical',
      progress: 40,
      learningOutcomes: [
        'Execute the complete safe isolation procedure',
        'Use voltage indicators and proving units correctly',
        'Apply personal locks and tags appropriately',
        'Understand permit-to-work requirements',
      ],
      keyRegulations: ['EAWR 1989 Regulation 12-14', 'BS EN 50110', 'HSE GS38'],
    },
    {
      id: 'emergency-response',
      title: 'Emergency Response & First Aid',
      description:
        'Emergency procedures for electrical incidents, first aid for electric shock, and incident reporting requirements',
      topics: [
        'Electric Shock First Aid',
        'Emergency Contacts',
        'Evacuation Procedures',
        'RIDDOR Reporting',
        'Scene Safety',
      ],
      duration: '40 min',
      difficulty: 'Essential',
      progress: 20,
      learningOutcomes: [
        'Respond safely to electrical emergencies',
        'Administer appropriate first aid for electric shock',
        'Complete RIDDOR reports correctly',
        'Coordinate with emergency services',
      ],
      keyRegulations: [
        'Health and Safety (First Aid) Regulations 1981',
        'RIDDOR 2013',
        'HASAWA 1974',
      ],
    },
    {
      id: 'working-at-height',
      title: 'Working at Height Safety',
      description:
        'Safe practices for electrical work at height including ladder safety, scaffold requirements, and fall protection',
      topics: [
        'Ladder Selection & Use',
        'Mobile Platforms (MEWPs)',
        'Scaffold Safety',
        'Fall Arrest Systems',
        'Roof Work',
      ],
      duration: '35 min',
      difficulty: 'Essential',
      progress: 0,
      learningOutcomes: [
        'Select appropriate access equipment for the task',
        'Inspect ladders and platforms before use',
        'Understand fall protection requirements',
        'Recognise fragile surface hazards',
      ],
      keyRegulations: ['Work at Height Regulations 2005', 'BS EN 131', 'HSE INDG401'],
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment Methods',
      description:
        'Practical risk assessment techniques for electrical work including hazard identification and control measures',
      topics: [
        '5-Step Risk Assessment',
        'Hazard Identification',
        'Control Hierarchy',
        'Method Statements',
        'Dynamic Risk Assessment',
      ],
      duration: '40 min',
      difficulty: 'Essential',
      progress: 0,
      learningOutcomes: [
        'Conduct a thorough risk assessment for electrical tasks',
        'Apply the hierarchy of controls effectively',
        'Write clear method statements',
        'Perform dynamic risk assessments on site',
      ],
      keyRegulations: [
        'Management of Health and Safety at Work Regulations 1999',
        'CDM 2015',
        'HASAWA 1974',
      ],
    },
    {
      id: 'confined-spaces',
      title: 'Confined Space Working',
      description:
        'Safety requirements for electrical work in confined spaces including gas testing, ventilation, and rescue procedures',
      topics: [
        'Confined Space Definition',
        'Atmospheric Testing',
        'Ventilation Requirements',
        'Rescue Procedures',
        'Permit Systems',
      ],
      duration: '45 min',
      difficulty: 'Critical',
      progress: 0,
      learningOutcomes: [
        'Identify confined spaces in electrical installations',
        'Conduct atmospheric monitoring correctly',
        'Understand emergency rescue requirements',
        'Apply confined space permit procedures',
      ],
      keyRegulations: ['Confined Spaces Regulations 1997', 'BS 7671 Section 706', 'HSE L101'],
    },
    {
      id: 'manual-handling',
      title: 'Manual Handling for Electricians',
      description:
        'Safe manual handling techniques for electrical equipment, cables, and heavy components',
      topics: [
        'TILE Assessment',
        'Lifting Techniques',
        'Mechanical Aids',
        'Cable Handling',
        'Team Lifting',
      ],
      duration: '25 min',
      difficulty: 'Essential',
      progress: 0,
      learningOutcomes: [
        'Apply TILE risk assessment to manual handling tasks',
        'Use correct lifting techniques for electrical equipment',
        'Select appropriate mechanical handling aids',
        'Organise team lifts safely',
      ],
      keyRegulations: [
        'Manual Handling Operations Regulations 1992',
        'HSE INDG143',
        'L23 Guidance',
      ],
    },
    {
      id: 'hazardous-areas',
      title: 'Hazardous Area Working',
      description:
        'Electrical safety in explosive atmospheres, DSEAR compliance, and Ex-rated equipment selection',
      topics: [
        'Zone Classification',
        'ATEX/DSEAR Requirements',
        'Ex Equipment Types',
        'Hot Work Permits',
        'Intrinsic Safety',
      ],
      duration: '50 min',
      difficulty: 'Critical',
      progress: 0,
      learningOutcomes: [
        'Understand zone classification for explosive atmospheres',
        'Select appropriate Ex-rated equipment',
        'Apply DSEAR requirements to electrical work',
        'Recognise ignition sources in hazardous areas',
      ],
      keyRegulations: ['DSEAR 2002', 'BS EN 60079 Series', 'ATEX Directive 2014/34/EU'],
    },
    {
      id: 'site-safety',
      title: 'Construction Site Safety',
      description:
        'Site-specific safety requirements for electrical work on construction sites under CDM regulations',
      topics: [
        'CDM Duties',
        'Site Inductions',
        'Temporary Supplies',
        'Coordination Requirements',
        'Welfare Facilities',
      ],
      duration: '30 min',
      difficulty: 'Essential',
      progress: 0,
      learningOutcomes: [
        'Understand CDM duty holder responsibilities',
        'Comply with site induction requirements',
        'Install and maintain temporary electrical supplies safely',
        'Coordinate work with other trades',
      ],
      keyRegulations: ['CDM Regulations 2015', 'BS 7671 Section 704', 'HSE L153'],
    },
  ];

  const markAsCompleted = (moduleId: string) => {
    if (!completedTopics.includes(moduleId)) {
      setCompletedTopics([...completedTopics, moduleId]);
    }
  };

  type SafetyModule = (typeof safetyModules)[number];

  const ModuleCard = ({ module }: { module: SafetyModule }) => {
    const isCompleted = completedTopics.includes(module.id);

    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              <span>{module.difficulty}</span>
              <span className="text-white/25">·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {module.duration}
              </span>
            </div>
            {isCompleted && <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />}
          </div>
          <h3 className="text-[16px] sm:text-[18px] font-medium text-white leading-snug">
            {module.title}
          </h3>
          <p className="text-[14px] text-white/70 leading-relaxed">{module.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {module.topics.map((topic, idx) => (
            <span
              key={idx}
              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Progress
            </span>
            <span className="text-[12px] text-white/85 font-mono">{module.progress}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${module.progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            onClick={() => setActiveModule(module.id)}
            className="flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
          >
            <Play className="h-4 w-4 mr-2" />
            Start module
          </Button>
          {!isCompleted && (
            <Button
              variant="outline"
              onClick={() => markAsCompleted(module.id)}
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark complete
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 animate-fade-in text-left ${isMobile ? 'px-2' : ''}`}>
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Safety knowledge hub
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Safety modules
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Essential safety knowledge modules to keep you and your colleagues safe on-site. Complete
          these modules to build comprehensive safety awareness.
        </p>
      </div>

      {/* Stats strip */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Modules
          </span>
          <p className="text-[20px] font-semibold text-white font-mono">{safetyModules.length}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Completed
          </span>
          <p className="text-[20px] font-semibold text-white font-mono">{completedTopics.length}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Avg progress
          </span>
          <p className="text-[20px] font-semibold text-white font-mono">
            {Math.round(
              safetyModules.reduce((acc, mod) => acc + mod.progress, 0) / safetyModules.length
            )}
            %
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Total mins
          </span>
          <p className="text-[20px] font-semibold text-white font-mono">110</p>
        </div>
      </div>

      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/[0.02] border border-white/[0.06] h-auto">
          <TabsTrigger value="modules" className="flex items-center gap-2 text-[12px] py-2">
            <BookOpen className="h-4 w-4" />
            Modules
          </TabsTrigger>
          <TabsTrigger value="quick-reference" className="flex items-center gap-2 text-[12px] py-2">
            <Star className="h-4 w-4" />
            Reference
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2 text-[12px] py-2">
            <ChevronRight className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="mt-6">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {safetyModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick-reference" className="mt-6 space-y-4">
          {/* Emergency Numbers */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
              Emergency numbers
            </span>
            <div className="space-y-1.5 text-[14px] text-white/85">
              <div className="flex justify-between">
                <span>Emergency Services</span>
                <span className="font-mono text-white">999</span>
              </div>
              <div className="flex justify-between">
                <span>HSE Incident Line</span>
                <span className="font-mono text-white">0345 300 9923</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Emergency</span>
                <span className="font-mono text-white">0800 111 999</span>
              </div>
              <div className="flex justify-between">
                <span>Electricity DNO</span>
                <span className="font-mono text-white">105</span>
              </div>
              <div className="flex justify-between">
                <span>Poison Control</span>
                <span className="font-mono text-white">0344 892 0111</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Voltage classifications
              </span>
              <div className="space-y-1.5 text-[14px] text-white/85">
                <div className="flex justify-between">
                  <span>Extra Low Voltage</span>
                  <span className="font-mono text-white">≤50V AC / ≤120V DC</span>
                </div>
                <div className="flex justify-between">
                  <span>Low Voltage</span>
                  <span className="font-mono text-white">50V – 1000V AC</span>
                </div>
                <div className="flex justify-between">
                  <span>High Voltage</span>
                  <span className="font-mono text-white">&gt;1000V AC</span>
                </div>
                <div className="flex justify-between">
                  <span>UK Mains</span>
                  <span className="font-mono text-white">230V ±10%</span>
                </div>
                <div className="flex justify-between">
                  <span>Three Phase</span>
                  <span className="font-mono text-white">400V</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Safe isolation steps
              </span>
              <ol className="space-y-1.5 text-[14px] text-white/85 list-decimal list-inside">
                <li>Identify circuit</li>
                <li>Switch off supply</li>
                <li>Isolate at point</li>
                <li>Secure isolation (lock)</li>
                <li>Prove voltage indicator</li>
                <li>Test for dead</li>
                <li>Re-prove indicator</li>
              </ol>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                RCD trip times
              </span>
              <div className="space-y-1.5 text-[14px] text-white/85">
                <div className="flex justify-between">
                  <span>30mA @ rated</span>
                  <span className="font-mono text-white">≤300ms</span>
                </div>
                <div className="flex justify-between">
                  <span>30mA @ 5×IΔn</span>
                  <span className="font-mono text-white">≤40ms</span>
                </div>
                <div className="flex justify-between">
                  <span>100mA @ rated</span>
                  <span className="font-mono text-white">≤300ms</span>
                </div>
                <div className="flex justify-between">
                  <span>S-Type delay</span>
                  <span className="font-mono text-white">130–500ms</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                MCB disconnection times
              </span>
              <div className="space-y-1.5 text-[14px] text-white/85">
                <div className="flex justify-between">
                  <span>TN system ≤32A</span>
                  <span className="font-mono text-white">0.4s</span>
                </div>
                <div className="flex justify-between">
                  <span>TN system &gt;32A</span>
                  <span className="font-mono text-white">5s</span>
                </div>
                <div className="flex justify-between">
                  <span>TT system</span>
                  <span className="font-mono text-white">0.2s</span>
                </div>
                <div className="flex justify-between">
                  <span>Distribution</span>
                  <span className="font-mono text-white">5s max</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
                Electric shock effects
              </span>
              <div className="space-y-1.5 text-[14px] text-white/85">
                <div className="flex justify-between">
                  <span>1mA</span>
                  <span className="text-white">Perception threshold</span>
                </div>
                <div className="flex justify-between">
                  <span>5mA</span>
                  <span className="text-white">Pain threshold</span>
                </div>
                <div className="flex justify-between">
                  <span>10–30mA</span>
                  <span className="text-white">Muscle contraction</span>
                </div>
                <div className="flex justify-between">
                  <span>30–75mA</span>
                  <span className="text-white">Respiratory arrest</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt;75mA</span>
                  <span className="text-white">Ventricular fibrillation</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Key UK regulations
              </span>
              <div className="space-y-2 text-[14px]">
                <div>
                  <p className="text-white font-medium">EAWR 1989</p>
                  <p className="text-[12px] text-white/55">
                    Electricity at Work Regulations — criminal law for electrical safety
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium">BS 7671:2018 +A2:2022</p>
                  <p className="text-[12px] text-white/55">
                    18th Edition IET Wiring Regulations — technical standard
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium">HASAWA 1974</p>
                  <p className="text-[12px] text-white/55">
                    Health & Safety at Work Act — general duties
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium">CDM 2015</p>
                  <p className="text-[12px] text-white/55">
                    Construction Design & Management Regulations
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium">Building Regs Part P</p>
                  <p className="text-[12px] text-white/55">
                    Electrical safety in dwellings — England & Wales
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                PPE voltage ratings
              </span>
              <div className="space-y-2 text-[14px]">
                <div>
                  <p className="text-white font-medium">Class 00 Gloves</p>
                  <p className="text-[12px] text-white/55">Max 500V AC / 750V DC — beige</p>
                </div>
                <div>
                  <p className="text-white font-medium">Class 0 Gloves</p>
                  <p className="text-[12px] text-white/55">Max 1000V AC / 1500V DC — red</p>
                </div>
                <div>
                  <p className="text-white font-medium">Class 1 Gloves</p>
                  <p className="text-[12px] text-white/55">Max 7500V AC / 11250V DC — white</p>
                </div>
                <div>
                  <p className="text-white font-medium">GS38 Test Leads</p>
                  <p className="text-[12px] text-white/55">Fused, shrouded, max 4mm exposed tip</p>
                </div>
                <div>
                  <p className="text-white font-medium">Arc Flash PPE</p>
                  <p className="text-[12px] text-white/55">Rated in cal/cm² — match incident energy</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Safety documentation
              </span>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  BS 7671 Safety Guide
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  PPE Requirements Chart
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  Risk Assessment Templates
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Training videos
              </span>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Safe Isolation Procedure
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Emergency Response
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 justify-start border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Play className="h-4 w-4 mr-2" />
                  PPE Selection Guide
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SafetyKnowledgeTab;
