import { Wrench, FileText, Package, CheckCircle, Ruler } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Types of bends and when to use them',
    description: 'Different bend types and their applications',
    icon: Wrench,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Using conduit bending machines (PVC and metal)',
    description: 'Operating bending machines for different conduit types',
    icon: FileText,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Manual bending tools and techniques',
    description: 'Hand bending methods and tool usage',
    icon: Package,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Cutting, deburring and preparing conduit ends',
    description: 'Proper preparation of conduit ends for installation',
    icon: CheckCircle,
    href: '3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Common bending faults and how to correct them',
    description: 'Identifying and fixing common bending problems',
    icon: Ruler,
    href: '3-5',
  },
];

const Section3 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={3}
      title="Bending and forming conduit and trunking"
      description="Techniques for bending and shaping containment systems."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Measuring, marking and setting out"
      nextSectionHref="../section4"
      nextSectionLabel="Installing conduit, trunking, tray and cables"
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
