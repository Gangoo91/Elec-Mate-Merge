import { HardHat, FileText, Wrench, Package, CheckCircle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Reading installation drawings and specifications',
    description: 'Understanding technical drawings and installation specifications',
    icon: HardHat,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'Identifying cable routes and fixing points',
    description: 'Planning cable routing and identifying fixing positions',
    icon: FileText,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Selecting materials, tools and PPE',
    description: 'Choosing appropriate materials, tools and personal protective equipment',
    icon: Wrench,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Planning workflow and sequencing tasks',
    description: 'Organising work sequence for efficient installation',
    icon: Package,
    href: '1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Preparing the work area (access, safety, lighting)',
    description: 'Setting up safe and accessible working conditions',
    icon: CheckCircle,
    href: '1-5',
  },
];

const Section1 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Preparing to install wiring systems"
      description="Planning and preparation for electrical installation work."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Measuring, marking and setting out"
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
