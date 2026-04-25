import { Home, Layers, Workflow, Calculator, RefreshCcw, CheckSquare } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Passive design principles',
    description:
      'Solar orientation, natural ventilation, daylighting, thermal mass and passive cooling strategies',
    icon: Home,
    href: '../h-n-c-module6-section6-1',
  },
  {
    number: '6.2',
    title: 'Fabric first approach',
    description:
      'Building envelope optimisation, insulation strategies, thermal bridging reduction and airtightness',
    icon: Layers,
    href: '../h-n-c-module6-section6-2',
  },
  {
    number: '6.3',
    title: 'Integrated design process',
    description:
      'Multi-disciplinary collaboration, early engagement, design workshops and value engineering',
    icon: Workflow,
    href: '../h-n-c-module6-section6-3',
  },
  {
    number: '6.4',
    title: 'Whole life carbon assessment',
    description:
      'RICS methodology, life cycle stages, data sources, benchmarking and reduction strategies',
    icon: Calculator,
    href: '../h-n-c-module6-section6-4',
  },
  {
    number: '6.5',
    title: 'Circular economy principles',
    description:
      'Design for disassembly, material passports, reuse strategies and waste elimination',
    icon: RefreshCcw,
    href: '../h-n-c-module6-section6-5',
  },
  {
    number: '6.6',
    title: 'Post-occupancy evaluation',
    description:
      'Performance monitoring, user satisfaction, lessons learned and continuous improvement',
    icon: CheckSquare,
    href: '../h-n-c-module6-section6-6',
  },
];

const HNCModule6Section6 = () => {
  useSEO(
    'Sustainable design integration - HNC Module 6 Section 6 | Sustainability',
    'Master sustainable design: passive principles, fabric first approach, system optimisation, whole-life carbon assessment and integrated design strategies.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={6}
      title="Sustainable design integration"
      description="Integrate sustainable design principles throughout the building services engineering process."
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

export default HNCModule6Section6;
