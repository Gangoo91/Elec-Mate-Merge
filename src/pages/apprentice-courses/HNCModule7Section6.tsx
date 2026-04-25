import { LayoutGrid, Shield, Grip, CircleDot, PlayCircle, FileCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Distribution board design',
    description:
      'Board layouts, circuit groupings, labelling, IP ratings and installation considerations',
    icon: LayoutGrid,
    href: '../h-n-c-module7-section6-1',
  },
  {
    number: '6.2',
    title: 'Circuit protection',
    description:
      'Device selection, breaking capacity, let-through energy, selectivity and RCD coordination',
    icon: Shield,
    href: '../h-n-c-module7-section6-2',
  },
  {
    number: '6.3',
    title: 'Earthing systems',
    description:
      'TN-S, TN-C-S, TT systems, main earthing terminal, protective conductors and equipotential bonding',
    icon: Grip,
    href: '../h-n-c-module7-section6-3',
  },
  {
    number: '6.4',
    title: 'Coordination studies',
    description:
      'Short-circuit calculations, protective device coordination, software tools and documentation',
    icon: CircleDot,
    href: '../h-n-c-module7-section6-4',
  },
  {
    number: '6.5',
    title: 'Commissioning procedures',
    description:
      'Pre-commissioning checks, initial verification, functional testing and handover documentation',
    icon: PlayCircle,
    href: '../h-n-c-module7-section6-5',
  },
  {
    number: '6.6',
    title: 'Documentation requirements',
    description:
      'Single line diagrams, schedules, test certificates, O&M manuals and as-built drawings',
    icon: FileCheck,
    href: '../h-n-c-module7-section6-6',
  },
];

const HNCModule7Section6 = () => {
  useSEO(
    'System integration - HNC Module 7 Section 6 | Power Systems',
    'Master system integration: distribution board design, circuit protection coordination, earthing systems and commissioning requirements for commercial installations.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={6}
      title="System integration"
      description="Integrate power and lighting systems into complete, compliant electrical installations."
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

export default HNCModule7Section6;
