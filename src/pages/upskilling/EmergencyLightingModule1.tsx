import { BookOpen, Scale, MapPin, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Purpose and legal framework',
    icon: Scale,
    description: 'Legal requirements and the regulatory framework for emergency lighting.',
  },
  {
    id: 2,
    title: 'Locations where emergency lighting is required',
    icon: MapPin,
    description: 'Building types and the areas where emergency lighting is mandatory.',
  },
  {
    id: 3,
    title: 'Types of emergency lighting systems',
    icon: BookOpen,
    description: 'System categories, configurations and where each is appropriate.',
  },
  {
    id: 4,
    title: 'Overview of BS 5266 and related standards',
    icon: FileCheck,
    description: 'Key standards and compliance requirements for the UK market.',
  },
];

export default function EmergencyLightingModule1() {
  useSEO({
    title: 'Module 1: Introduction to Emergency Lighting | Elec-Mate',
    description:
      'Purpose, legal framework, system fundamentals and BS 5266 overview for emergency lighting.',
  });

  return (
    <ModuleShell
      backTo="../emergency-lighting-course"
      backLabel="Emergency lighting systems"
      moduleNumber={1}
      title="Introduction to emergency lighting"
      description="Purpose, legal framework and the fundamentals of emergency lighting systems."
      tone="yellow"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../emergency-lighting-module-2"
      nextModuleLabel="System categories and lighting types"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../emergency-lighting-module-1-section-${section.id}`}
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
