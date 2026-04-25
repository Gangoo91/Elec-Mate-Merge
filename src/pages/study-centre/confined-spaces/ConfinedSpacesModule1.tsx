import { DoorOpen, MapPin, AlertTriangle, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is a confined space?',
    icon: DoorOpen,
    description:
      'Legal definition under the Confined Spaces Regulations 1997 — enclosed, limited access, not designed for continuous occupancy, and foreseeable risk of serious injury.',
  },
  {
    id: 2,
    title: 'Common confined space examples',
    icon: MapPin,
    description:
      'Tanks, vessels, silos, pits, chambers, ducts, sewers, manholes, ceiling voids and cable tunnels found in construction and electrical work.',
  },
  {
    id: 3,
    title: 'Why confined spaces kill',
    icon: AlertTriangle,
    description:
      'Statistics showing approximately 15 deaths per year in the UK with 60% being rescuers, rapid atmospheric changes, and human behaviour factors.',
  },
  {
    id: 4,
    title: 'Confined spaces in electrical work',
    icon: Zap,
    description:
      'Cable ducts, transformer chambers, substations, plant rooms, risers and ceiling voids encountered by electricians.',
  },
];

export default function ConfinedSpacesModule1() {
  useSEO({
    title: 'Module 1: Understanding confined spaces | Confined spaces awareness | Elec-Mate',
    description:
      'Legal definition of confined spaces, common examples, fatality statistics and how confined spaces affect electrical work.',
  });

  return (
    <ModuleShell
      backTo="../confined-spaces-course"
      backLabel="Confined spaces awareness"
      moduleNumber={1}
      title="Understanding confined spaces"
      description="What legally defines a confined space, common examples across the construction industry, why they are so dangerous, and the specific confined-space hazards faced by electricians."
      tone="cyan"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../confined-spaces-module-2"
      nextModuleLabel="Legislation & risk assessment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../confined-spaces-module-1-section-${section.id}`}
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
