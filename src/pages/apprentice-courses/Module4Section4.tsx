import { Package, FileText, Wrench, CheckCircle, Ruler, Shield, HardHat } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Fixing and supporting containment systems',
    description: 'Methods for securing containment systems properly',
    icon: Package,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Spacing rules and manufacturer guidelines',
    description: 'Following spacing requirements and manufacturer specifications',
    icon: FileText,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Assembling and joining containment (couplers, saddles, bushes)',
    description: 'Using accessories to assemble containment systems',
    icon: Wrench,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Pulling in single-core and multi-core cables',
    description: 'Techniques for installing different cable types',
    icon: CheckCircle,
    href: '4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Preventing damage to cables during installation',
    description: 'Protecting cables from damage during the installation process',
    icon: Ruler,
    href: '4-5',
  },
  {
    number: 'Subsection 6',
    title: 'Earthing of metallic containment systems',
    description: 'Proper earthing techniques for metal containment',
    icon: Shield,
    href: '4-6',
  },
  {
    number: 'Subsection 7',
    title: 'Working at height safely while installing systems',
    description: 'Safety procedures for working at height during installation',
    icon: HardHat,
    href: '4-7',
  },
];

const Section4 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={4}
      title="Installing conduit, trunking, tray and cables"
      description="Installation methods for containment systems and cable runs."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Bending and forming conduit and trunking"
      nextSectionHref="../section5"
      nextSectionLabel="Installing electrical accessories and terminations"
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
