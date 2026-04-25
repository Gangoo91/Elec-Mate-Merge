import { Package, Wrench, Shield, Layers, Cog } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Purpose of containment in electrical installations',
    description: 'Understanding why containment systems are essential',
    icon: Package,
    href: '2-1',
  },
  {
    number: 'Subsection 2',
    title: 'PVC and metal conduit (surface/recessed)',
    description: 'Types of conduit systems and installation methods',
    icon: Wrench,
    href: '2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Plastic and steel trunking systems',
    description: 'Trunking systems for cable containment and protection',
    icon: Shield,
    href: '2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Cable tray, basket and ladder systems',
    description: 'Open containment systems for larger installations',
    icon: Layers,
    href: '2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Underfloor trunking and dado trunking',
    description: 'Specialised trunking systems for concealed installations',
    icon: Cog,
    href: '2-5',
  },
  {
    number: 'Subsection 6',
    title: 'Fixings, clips and cable ties',
    description: 'Hardware for securing containment and cables',
    icon: Package,
    href: '2-6',
  },
  {
    number: 'Subsection 7',
    title: 'Good practice for installing containment',
    description: 'Best practices and techniques for containment installation',
    icon: Wrench,
    href: '2-7',
  },
];

const Section2 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={2}
      title="Cable containment systems"
      description="Methods and systems for containing, protecting and supporting electrical cables."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Wiring systems and cable types"
      nextSectionHref="../section3"
      nextSectionLabel="Electrical tools and equipment"
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
