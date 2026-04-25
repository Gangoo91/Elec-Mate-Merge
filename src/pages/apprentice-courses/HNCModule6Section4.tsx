import { TrendingDown, Building2, Target, BarChart3, Leaf, Route } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Carbon fundamentals',
    description:
      'Carbon accounting, scopes 1-3, emission factors, carbon intensity and greenhouse gas protocols',
    icon: TrendingDown,
    href: '../h-n-c-module6-section4-1',
  },
  {
    number: '4.2',
    title: 'Operational carbon',
    description:
      'Energy-related emissions, regulated vs unregulated loads, benchmarking and reduction strategies',
    icon: Building2,
    href: '../h-n-c-module6-section4-2',
  },
  {
    number: '4.3',
    title: 'Embodied carbon',
    description:
      'Whole life carbon, material selection, product stage emissions, construction impacts and end of life',
    icon: Target,
    href: '../h-n-c-module6-section4-3',
  },
  {
    number: '4.4',
    title: 'Science-based targets',
    description:
      'SBTi framework, 1.5°C alignment, target setting, progress tracking and reporting requirements',
    icon: BarChart3,
    href: '../h-n-c-module6-section4-4',
  },
  {
    number: '4.5',
    title: 'Carbon offsetting',
    description:
      'Offset types, quality standards, additionality, permanence and the role of offsetting in net-zero',
    icon: Leaf,
    href: '../h-n-c-module6-section4-5',
  },
  {
    number: '4.6',
    title: 'Net-zero pathways',
    description:
      'Carbon hierarchy, reduction roadmaps, technology options, timeline planning and verification',
    icon: Route,
    href: '../h-n-c-module6-section4-6',
  },
];

const HNCModule6Section4 = () => {
  useSEO(
    'Carbon reduction strategies - HNC Module 6 Section 4 | Sustainability',
    'Master carbon reduction: carbon hierarchy, operational vs embodied carbon, offsetting, science-based targets and net-zero pathways for buildings.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={4}
      title="Carbon reduction strategies"
      description="Develop carbon reduction strategies and net-zero pathways for building services engineering."
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

export default HNCModule6Section4;
