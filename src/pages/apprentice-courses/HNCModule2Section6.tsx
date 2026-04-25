import { Calculator, BarChart3, Cpu, Monitor, Settings, FileCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Load estimation methods',
    description: 'CIBSE methods, cooling loads, heating loads, diversity',
    icon: Calculator,
    href: '../h-n-c-module2-section6-1',
  },
  {
    number: '6.2',
    title: 'Energy analysis',
    description: 'Energy balances, benchmarking, TM54, operational energy',
    icon: BarChart3,
    href: '../h-n-c-module2-section6-2',
  },
  {
    number: '6.3',
    title: 'Building simulation',
    description: 'Dynamic simulation, software tools, validation, limitations',
    icon: Cpu,
    href: '../h-n-c-module2-section6-3',
  },
  {
    number: '6.4',
    title: 'Design tools and software',
    description: 'IES, TAS, EnergyPlus, compliance tools',
    icon: Monitor,
    href: '../h-n-c-module2-section6-4',
  },
  {
    number: '6.5',
    title: 'System integration',
    description: 'Multi-service coordination, optimisation, commissioning',
    icon: Settings,
    href: '../h-n-c-module2-section6-5',
  },
  {
    number: '6.6',
    title: 'Compliance and verification',
    description: 'Part L, BREEAM, NABERS, post-occupancy evaluation',
    icon: FileCheck,
    href: '../h-n-c-module2-section6-6',
  },
];

const HNCModule2Section6 = () => {
  useSEO(
    'Applied building services science - HNC Module 2 Section 6 | Building Services Engineering',
    'Master applied building science: load estimation, energy analysis, building simulation, design software, system integration and compliance verification.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={6}
      title="Applied building services science"
      description="Apply scientific principles using industry-standard tools and methods to design and verify building services performance."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule2Section6;
