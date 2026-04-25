import { MapPin, Car, TreePine, Building, Factory, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Locations requiring additional precautions (bathrooms, pools)',
    icon: MapPin,
    description: 'Special safety requirements for wet and hazardous locations.',
  },
  {
    id: 2,
    title: 'Electric vehicle charging installations (Part 722)',
    icon: Car,
    description: 'Requirements for EV charging points and associated electrical systems.',
  },
  {
    id: 3,
    title: 'Outdoor and agricultural installations',
    icon: TreePine,
    description: 'Electrical installations in agricultural and horticultural premises.',
  },
  {
    id: 4,
    title: 'Medical, commercial and industrial locations',
    icon: Building,
    description: 'Specific requirements for healthcare, commercial and industrial premises.',
  },
  {
    id: 5,
    title: 'Introduction to prosumer electrical installations (Part 8)',
    icon: Factory,
    description: 'New requirements for prosumer installations and energy storage.',
  },
  {
    id: 6,
    title: 'Amendment 2 highlights',
    icon: Lightbulb,
    description: 'Key changes and updates introduced in the latest amendment.',
  },
];

export default function BS7671Module7() {
  useSEO({
    title: 'Module 7: Special Installations & Locations | BS 7671 | Elec-Mate',
    description:
      'Bathrooms, EV charging Part 722, agricultural, medical, commercial and prosumer installations per BS 7671.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={7}
      title="Special installations and locations"
      description="Requirements for special locations and installations with unique safety considerations."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../bs7671-module-6"
      prevModuleLabel="Inspection, testing and certification"
      nextModuleHref="../bs7671-module-8"
      nextModuleLabel="Reference materials and Amendment 3"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-7-section-${section.id}`}
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
