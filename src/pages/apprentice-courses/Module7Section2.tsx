import { Search, Zap, AlertTriangle, TestTube, Eye } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Open circuit faults (breaks in conductors)',
    description: 'Understanding breaks and discontinuity in electrical conductors',
    icon: Search,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Short circuits',
    description: 'Identifying and understanding short circuit conditions',
    icon: Zap,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Earth faults and leakage currents',
    description: 'Recognising earth fault conditions and current leakage',
    icon: AlertTriangle,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Overload conditions',
    description: 'Understanding electrical overload situations and their effects',
    icon: TestTube,
    href: '2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Incorrect polarity',
    description: 'Identifying polarity faults in electrical installations',
    icon: Eye,
    href: '2-5',
  },
  {
    number: 'Subsection 6',
    title: 'Loose or poor connections',
    description: 'Understanding connection faults and their consequences',
    icon: Search,
    href: '2-6',
  },
];

const Section2 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={2}
      title="Common fault types in electrical installations"
      description="Identifying different types of electrical faults and their causes."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Understanding electrical faults"
      nextSectionHref="../section3"
      nextSectionLabel="Signs and symptoms of fault conditions"
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

export default Section2;
