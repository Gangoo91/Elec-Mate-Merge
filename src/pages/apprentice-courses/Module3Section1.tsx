import { Cable, FileText, Zap, Shield, Package } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Overview of common wiring systems',
    description: 'Introduction to different types of electrical wiring systems',
    icon: Cable,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'Twin and earth (flat PVC sheathed cable)',
    description: 'Understanding twin and earth cable construction and applications',
    icon: FileText,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Singles in conduit or trunking',
    description: 'Single core cables used in containment systems',
    icon: Zap,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Steel wire armoured (SWA) cables',
    description: 'Construction and applications of SWA cables',
    icon: Shield,
    href: '1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Flexible cords and flex outlets',
    description: 'Flexible cables and their connection points',
    icon: Package,
    href: '1-5',
  },
  {
    number: 'Subsection 6',
    title: 'Data, signal and low voltage cabling (basic awareness)',
    description: 'Introduction to data and low voltage cable systems',
    icon: Cable,
    href: '1-6',
  },
  {
    number: 'Subsection 7',
    title: 'Selecting cables based on application and environment',
    description: 'Criteria for choosing appropriate cables for different installations',
    icon: FileText,
    href: '1-7',
  },
];

const Section1 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={1}
      title="Wiring systems and cable types"
      description="Overview of different wiring systems, cable classifications and their applications."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Cable containment systems"
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
