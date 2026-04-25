import { Eye, TestTube, Wrench, Zap, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'What to look for during visual checks',
    description: 'Key elements to examine during visual inspection',
    icon: Eye,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Signs of damage, wear or incorrect installation',
    description: 'Identifying physical defects and installation errors',
    icon: TestTube,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Checking cable routes, depths and zones',
    description: 'Verifying cable installation meets zone requirements',
    icon: Wrench,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Verifying correct terminations and polarity',
    description: 'Ensuring proper electrical connections and polarity',
    icon: Zap,
    href: '2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Confirming circuit labelling and identification',
    description: 'Checking circuit identification and labelling systems',
    icon: Shield,
    href: '2-5',
  },
  {
    number: 'Subsection 6',
    title: 'Visual inspection checklist and record-keeping',
    description: 'Systematic approach to visual inspection documentation',
    icon: TestTube,
    href: '2-6',
  },
];

const Section2 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={2}
      title="Visual inspection of electrical installations"
      description="Systematic visual inspection techniques for electrical systems."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Purpose of inspection and testing"
      nextSectionHref="../section3"
      nextSectionLabel="Basic testing procedures and instruments"
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
