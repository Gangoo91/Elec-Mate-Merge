import { Stethoscope, Eye, AlertTriangle, TestTube, Zap } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Tripping MCBs or RCDs',
    description: 'Understanding protective device operation as fault indicators',
    icon: Stethoscope,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Understanding the sequence of operation',
    description: 'Trace how a circuit functions to locate faults logically',
    icon: Eye,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Testing one component or section at a time',
    description: 'Isolate and confirm faults efficiently with step-by-step testing',
    icon: AlertTriangle,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Buzzing sounds, arcing or sparking',
    description: 'Recognising audible and visible signs of electrical problems',
    icon: TestTube,
    href: '3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Complaints from occupants or users',
    description: 'Understanding user-reported symptoms of electrical faults',
    icon: Zap,
    href: '3-5',
  },
];

const Section3 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={3}
      title="Signs and symptoms of fault conditions"
      description="Recognising indicators of electrical fault conditions."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Common fault types in electrical installations"
      nextSectionHref="../section4"
      nextSectionLabel="Basic fault-finding process and logical testing"
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
