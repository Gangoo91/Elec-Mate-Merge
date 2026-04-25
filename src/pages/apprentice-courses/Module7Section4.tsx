import { TestTube, Search, Eye, Zap, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Using a systematic approach to fault diagnosis',
    description: 'Logical methodology for electrical fault diagnosis',
    icon: TestTube,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Understanding the sequence of operation',
    description: 'Analysing how electrical circuits should function normally',
    icon: Search,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Testing one component or section at a time',
    description: 'Methodical testing of individual circuit elements',
    icon: Eye,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Dividing the circuit into zones (split and isolate)',
    description: 'Sectional approach to fault location and isolation',
    icon: Zap,
    href: '4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Interpreting test readings at a basic level',
    description: 'Understanding basic electrical test measurements',
    icon: AlertTriangle,
    href: '4-5',
  },
  {
    number: 'Subsection 6',
    title: 'Knowing when to escalate or stop work',
    description: 'Recognising competence limits and safety boundaries',
    icon: TestTube,
    href: '4-6',
  },
];

const Section4 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={4}
      title="Basic fault-finding process and logical testing"
      description="Systematic approach to electrical fault diagnosis."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Signs and symptoms of fault conditions"
      nextSectionHref="../section5"
      nextSectionLabel="Using tools and equipment safely when fault-finding"
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
