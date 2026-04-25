import { MapPin, FileText, Lightbulb, Package, Users, MessageSquare } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Job breakdown and task sequencing',
    description: 'Breaking down installation work into manageable tasks',
    icon: MapPin,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Setting realistic timescales and milestones',
    description: 'Planning realistic timeframes for electrical work',
    icon: FileText,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Planning access and working platforms',
    description: 'Organising safe access to work areas',
    icon: Lightbulb,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Minimising disruption to other site activities',
    description: 'Planning work to reduce impact on other trades',
    icon: Package,
    href: '3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Dealing with variations and unforeseen issues',
    description: 'Managing changes and unexpected problems during installation',
    icon: Users,
    href: '3-5',
  },
  {
    number: 'Subsection 6',
    title: 'Health and safety considerations during planning',
    description: 'Incorporating safety planning into installation work',
    icon: MessageSquare,
    href: '3-6',
  },
];

const Section3 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Planning installation work on site"
      description="Planning and organising electrical installation projects."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Basic electrical design principles"
      nextSectionHref="../section4"
      nextSectionLabel="Materials, tools and resource planning"
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
