import { Wrench, TestTube, Eye, Zap, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Introduction to test instruments (multimeter, IR tester, continuity tester)',
    description: 'Overview of essential electrical testing equipment',
    icon: Wrench,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'GS38 compliance and tester safety',
    description: 'Safety requirements for electrical test equipment',
    icon: TestTube,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Setting up and zeroing instruments',
    description: 'Proper preparation and calibration of test equipment',
    icon: Eye,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Proving dead and safe to test',
    description: 'Essential safety procedure before testing begins',
    icon: Zap,
    href: '3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Using a proving unit and two-pole voltage tester',
    description: 'Safe voltage testing procedures and equipment',
    icon: Shield,
    href: '3-5',
  },
  {
    number: 'Subsection 6',
    title: 'When to use each instrument and why',
    description: 'Selecting appropriate test equipment for different applications',
    icon: Wrench,
    href: '3-6',
  },
];

const Section3 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={3}
      title="Basic testing procedures and instruments"
      description="Introduction to electrical testing equipment and procedures."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Visual inspection of electrical installations"
      nextSectionHref="../section4"
      nextSectionLabel="Continuity and polarity checks"
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

export default Section3;
