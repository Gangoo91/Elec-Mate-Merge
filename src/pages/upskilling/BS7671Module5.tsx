import { Settings, Cable, Package, Power, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Equipment ratings and suitability for purpose',
    icon: Settings,
    description: 'Selecting equipment including enhanced consumer units for renewable systems.',
  },
  {
    id: 2,
    title: 'Cable types, sizing, grouping and routing',
    icon: Cable,
    description: 'Cable selection, current-carrying capacity calculations and installation methods.',
  },
  {
    id: 3,
    title: 'Containment systems and mechanical protection',
    icon: Package,
    description: 'Cable management systems and protection against mechanical damage.',
  },
  {
    id: 4,
    title: 'Isolation, switching and emergency controls',
    icon: Power,
    description: 'Requirements for isolation devices, switching and emergency stops.',
  },
  {
    id: 5,
    title: 'Grid interaction and anti-islanding protection',
    icon: ShieldCheck,
    description: 'Grid interaction safety measures and anti-islanding for renewables.',
  },
  {
    id: 6,
    title: 'Environmental protection (IP ratings, fire resistance)',
    icon: Package,
    description: 'Protection against environmental influences and fire safety requirements.',
  },
];

export default function BS7671Module5() {
  useSEO({
    title: 'Module 5: Selection & Erection of Equipment | BS 7671 | Elec-Mate',
    description:
      'Equipment ratings, cable selection, containment, isolation, anti-islanding and environmental protection per BS 7671.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={5}
      title="Selection and erection of equipment"
      description="Equipment selection criteria, installation methods and protection requirements."
      tone="yellow"
      sectionsCount={sections.length}
      duration="65 mins"
      prevModuleHref="../bs7671-module-4"
      prevModuleLabel="Protection for safety"
      nextModuleHref="../bs7671-module-6"
      nextModuleLabel="Inspection, testing and certification"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-5-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
