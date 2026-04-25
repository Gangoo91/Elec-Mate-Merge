import { FileText, Lightbulb, MapPin, Package, Users, MessageSquare } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'What is a specification and why it matters',
    description: 'Understanding the importance of specifications in electrical work',
    icon: FileText,
    href: '1-1',
  },
  {
    number: 'Subsection 2',
    title: 'Reading basic electrical installation drawings',
    description: 'Interpreting electrical installation drawings and plans',
    icon: Lightbulb,
    href: '1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Symbols and conventions (BS 7671 and common site use)',
    description: 'Understanding electrical symbols and drawing conventions',
    icon: MapPin,
    href: '1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Interpreting floorplans, circuit layouts and cable routes',
    description: 'Reading and understanding building plans and electrical layouts',
    icon: Package,
    href: '1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Identifying installation requirements from drawings',
    description: 'Determining what work needs to be done from technical drawings',
    icon: Users,
    href: '1-5',
  },
  {
    number: 'Subsection 6',
    title: 'Dealing with incomplete or conflicting information',
    description: 'Managing situations where drawings or specifications are unclear',
    icon: MessageSquare,
    href: '1-6',
  },
];

const Section1 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={1}
      title="Understanding installation specifications and drawings"
      description="Reading and interpreting technical drawings and specifications."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Basic electrical design principles"
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
