import { Eye, Zap, CheckCircle, Target, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Visual inspection techniques',
    description: 'Systematic visual inspection methods for identifying electrical faults',
    icon: Eye,
    href: '../level3-module4-section4-1',
  },
  {
    number: '4.2',
    title: 'Continuity and insulation resistance testing',
    description: 'Testing procedures for circuit continuity and insulation integrity',
    icon: Zap,
    href: '../level3-module4-section4-2',
  },
  {
    number: '4.3',
    title: 'Polarity checks',
    description: 'Verifying correct polarity in electrical installations and circuits',
    icon: CheckCircle,
    href: '../level3-module4-section4-3',
  },
  {
    number: '4.4',
    title: 'Earth fault loop impedance testing',
    description: 'Testing earth fault loop impedance for protective device effectiveness',
    icon: Target,
    href: '../level3-module4-section4-4',
  },
  {
    number: '4.5',
    title: 'Functional and operational testing',
    description: 'Testing the operational performance and functionality of electrical systems',
    icon: Settings,
    href: '../level3-module4-section4-5',
  },
];

const Level3Module4Section4 = () => {
  useSEO(
    'Section 4: Systematic Fault-Finding Techniques - Level 3 Module 4',
    'Visual inspection, testing procedures, polarity checks and functional testing'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={4}
      title="Systematic fault-finding techniques"
      description="Visual inspection, testing procedures, polarity checks and functional testing."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module4-section3"
      prevSectionLabel="Common faults in electrical systems"
      nextSectionHref="../level3-module4-section5"
      nextSectionLabel="Rectification and verification"
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

export default Level3Module4Section4;
