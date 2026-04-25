import { Zap, AlertTriangle, Flame, MapPin, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Electric Shock and Burns',
    description: 'Understanding electrical injuries and their prevention',
    icon: Zap,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Overloads, Short Circuits and Arcing',
    description: 'Electrical faults that can cause injury and damage',
    icon: AlertTriangle,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Fire Hazards and Explosive Environments',
    description: 'Fire risks and working in potentially explosive atmospheres',
    icon: Flame,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Working at Height and Confined Spaces',
    description: 'Special considerations for elevated and restricted work areas',
    icon: MapPin,
    href: '2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Slip, Trip and Manual Handling Risks',
    description: 'Common workplace hazards affecting electrical workers',
    icon: Users,
    href: '2-5',
  },
];

export default function Section2() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={2}
      title="Common electrical hazards"
      description="Identification and understanding of typical electrical risks and dangers."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="UK health and safety legislation"
      nextSectionHref="../section3"
      nextSectionLabel="Risk assessment and method statements"
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
