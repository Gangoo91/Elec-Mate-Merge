import { HardHat, Settings, Home, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Types of PPE for Electrical Work',
    description: 'Essential protective equipment for electrical installations',
    icon: HardHat,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Selecting and Maintaining PPE',
    description: 'Choosing appropriate equipment and ensuring it remains effective',
    icon: Settings,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Site Housekeeping and Safety Signage',
    description: 'Maintaining clean, organised and well-signposted work areas',
    icon: Home,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Manual Handling and Tool Safety',
    description: 'Safe techniques for lifting and using electrical tools',
    icon: Wrench,
    href: '4-4',
  },
];

export default function Section4() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={4}
      title="PPE and safe working practices"
      description="Selection, use and maintenance of protective equipment and safe working methods."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Risk assessment and method statements"
      nextSectionHref="../section5"
      nextSectionLabel="Safe isolation procedures"
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
