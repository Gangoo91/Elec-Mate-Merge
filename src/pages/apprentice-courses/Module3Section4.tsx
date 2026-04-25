import { Cog, Layers, Package, Wrench, CheckCircle } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Surface vs concealed wiring installations',
    description: 'Differences between surface and concealed installation methods',
    icon: Cog,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'First fix and second fix explained',
    description: 'Understanding the stages of electrical installation work',
    icon: Layers,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Terminating cables: sleeving, ferrules and crimps',
    description: 'Proper methods for cable termination and identification',
    icon: Package,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Jointing and glanding techniques',
    description: 'Methods for joining cables and cable entry techniques',
    icon: Wrench,
    href: '4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Supporting and securing cables',
    description: 'Techniques for properly supporting cable runs',
    icon: CheckCircle,
    href: '4-5',
  },
  {
    number: 'Subsection 6',
    title: 'Installing accessories (sockets, switches, FCUs)',
    description: 'Installation of common electrical accessories',
    icon: Cog,
    href: '4-6',
  },
];

const Section4 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={4}
      title="Installation methods and techniques"
      description="Practical installation methods and techniques for electrical systems."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Electrical tools and equipment"
      nextSectionHref="../section5"
      nextSectionLabel="Environmental considerations and external influences"
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

export default Section4;
