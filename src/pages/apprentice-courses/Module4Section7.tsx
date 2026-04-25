import { Shield, FileText, Wrench, CheckCircle, Ruler } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Safe manual handling of equipment and materials',
    description: 'Proper lifting and handling techniques for electrical materials',
    icon: Shield,
    href: '7-1',
  },
  {
    number: 'Subsection 2',
    title: 'Using hand and power tools safely and legally',
    description: 'Safe operation of tools in compliance with regulations',
    icon: FileText,
    href: '7-2',
  },
  {
    number: 'Subsection 3',
    title: 'PPE for cutting, bending and fixing work',
    description: 'Appropriate personal protective equipment for installation tasks',
    icon: Wrench,
    href: '7-3',
  },
  {
    number: 'Subsection 4',
    title: 'Working in voids, risers and ceilings',
    description: 'Safety considerations for working in confined or elevated spaces',
    icon: CheckCircle,
    href: '7-4',
  },
  {
    number: 'Subsection 5',
    title: 'Keeping the work area safe and organised',
    description: 'Maintaining a clean, safe and organised workplace',
    icon: Ruler,
    href: '7-5',
  },
];

const Section7 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={7}
      title="Safe working and tool use during installation"
      description="Safety practices and proper tool use during installation work."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section6"
      prevSectionLabel="Testing and inspecting the completed installation"
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

export default Section7;
