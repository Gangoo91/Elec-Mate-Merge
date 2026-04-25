import { Shield, TestTube, Eye, Zap, AlertTriangle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Selection of test equipment for basic fault-finding',
    description: 'Choosing appropriate testing instruments for fault diagnosis',
    icon: Shield,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Checking instruments for safety and accuracy',
    description: 'Verifying test equipment condition before use',
    icon: TestTube,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'GS38-compliant testing practices',
    description: 'Following GS38 safety requirements for electrical testing',
    icon: Eye,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'PPE and environmental precautions during fault investigation',
    description: 'Personal protection and environmental safety during fault finding',
    icon: Zap,
    href: '5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Avoiding live testing where possible',
    description: 'Safe isolation practices and minimising live working',
    icon: AlertTriangle,
    href: '5-5',
  },
];

const Section5 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={5}
      title="Using tools and equipment safely when fault-finding"
      description="Safe practices and equipment use during fault finding."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Basic fault-finding process and logical testing"
      nextSectionHref="../section6"
      nextSectionLabel="Recording, reporting and rectifying faults"
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
