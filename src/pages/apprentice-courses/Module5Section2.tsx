import { Lightbulb, FileText, MapPin, Package, Users } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: "What makes a 'safe and functional' design",
    description: 'Understanding the principles of safe electrical design',
    icon: Lightbulb,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Load estimation and circuit requirements (basic awareness)',
    description: 'Introduction to calculating electrical loads and circuit needs',
    icon: FileText,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Selecting suitable protective devices (MCBs, RCDs — intro only)',
    description: 'Basic introduction to choosing protection devices',
    icon: MapPin,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Zoning, environmental considerations and cable choice',
    description: 'Considering environment and location when selecting cables',
    icon: Package,
    href: '2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Designing for expansion, maintenance and accessibility',
    description: 'Planning electrical systems for future needs and maintenance',
    icon: Users,
    href: '2-5',
  },
];

const Section2 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={2}
      title="Basic electrical design principles"
      description="Fundamental principles of electrical system design."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Understanding installation specifications and drawings"
      nextSectionHref="../section3"
      nextSectionLabel="Planning installation work on site"
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
