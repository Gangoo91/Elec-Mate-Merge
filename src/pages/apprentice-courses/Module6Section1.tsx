import { TestTube, Eye, Wrench, Zap, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Why electrical installations must be inspected and tested',
    description: 'Understanding the fundamental need for electrical inspection and testing',
    icon: TestTube,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'Legal and safety reasons (EAWR, BS 7671 principles)',
    description: 'Legal requirements under EAWR and BS 7671 standards',
    icon: Eye,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'When testing is required (new work, alterations, faults)',
    description: 'Circumstances that require electrical testing and inspection',
    icon: Wrench,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Difference between inspection and testing',
    description: 'Understanding the distinction between visual inspection and testing',
    icon: Zap,
    href: '1-4',
  },
  {
    number: 'Subsection 5',
    title: 'What Level 2 learners are expected to know and do',
    description: 'Scope of knowledge and practical requirements for Level 2',
    icon: Shield,
    href: '1-5',
  },
];

const Section1 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={1}
      title="Purpose of inspection and testing"
      description="Understanding why inspection and testing are essential for electrical safety."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Visual inspection of electrical installations"
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

export default Section1;
