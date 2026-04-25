import { Zap, TestTube, Eye, Wrench, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Continuity of protective conductors (CPCs)',
    description: 'Testing earth continuity in protective conductor circuits',
    icon: Zap,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Continuity of ring circuits (awareness level)',
    description: 'Basic understanding of ring circuit continuity testing',
    icon: TestTube,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Confirming polarity of switches and accessories',
    description: 'Verifying correct polarity in electrical installations',
    icon: Eye,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Common faults found during continuity/polarity tests',
    description: 'Identifying typical problems during continuity testing',
    icon: Wrench,
    href: '4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Recording results and actions required',
    description: 'Documenting test results and follow-up actions',
    icon: Shield,
    href: '4-5',
  },
];

const Section4 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={4}
      title="Continuity and polarity checks"
      description="Testing for electrical continuity and correct polarity."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Basic testing procedures and instruments"
      nextSectionHref="../section5"
      nextSectionLabel="Insulation resistance testing (introduction)"
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

export default Section4;
