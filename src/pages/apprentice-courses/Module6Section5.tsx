import { Shield, TestTube, Eye, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Purpose of insulation resistance testing',
    description: 'Understanding why insulation resistance testing is essential',
    icon: Shield,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Test equipment and safety considerations',
    description: 'Understanding the correct equipment and safety precautions for IR testing',
    icon: TestTube,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Performing the insulation resistance test',
    description: 'Step-by-step procedures for conducting accurate IR tests',
    icon: Eye,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Interpreting results against standards',
    description: 'Understanding BS 7671 requirements and making professional judgements',
    icon: Wrench,
    href: '5-4',
  },
];

const Section5 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={5}
      title="Insulation resistance testing (introduction)"
      description="Basic introduction to insulation resistance testing principles."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Continuity and polarity checks"
      nextSectionHref="../section6"
      nextSectionLabel="Recording test results and defect identification"
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

export default Section5;
