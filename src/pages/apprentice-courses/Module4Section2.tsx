import { Ruler, FileText, Wrench, Package } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Using measurement tools and marking equipment',
    description: 'Proper use of measuring and marking tools for accuracy',
    icon: Ruler,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Setting out for conduit, trunking and accessories',
    description: 'Layout techniques for containment systems and accessories',
    icon: FileText,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Following dimensions, levels and tolerances',
    description: 'Working to specified dimensions and tolerances',
    icon: Wrench,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Avoiding common errors in measurement and positioning',
    description: 'Preventing typical measurement and positioning mistakes',
    icon: Package,
    href: '2-4',
  },
];

const Section2 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={2}
      title="Measuring, marking and setting out"
      description="Accurate measurement and marking techniques for installations."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Preparing to install wiring systems"
      nextSectionHref="../section3"
      nextSectionLabel="Bending and forming conduit and trunking"
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
