import { Construction, DoorOpen, Flame, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Excavations & underground services',
    icon: Construction,
    description:
      'Excavation hazards, shoring and battering, service detection (CAT and Genny), and safe digging practices.',
  },
  {
    id: 2,
    title: 'Confined spaces & fire safety',
    icon: DoorOpen,
    description:
      'Confined space identification, safe entry procedures, fire prevention, evacuation routes and fire extinguisher types.',
  },
  {
    id: 3,
    title: 'Electrical safety on site',
    icon: Zap,
    description:
      'Electrical hazards, 110V reduced voltage, PAT testing, overhead power lines and underground cables.',
  },
  {
    id: 4,
    title: 'Demolition & emergency procedures',
    icon: Flame,
    description:
      'Demolition risks, exclusion zones, first aid arrangements, emergency procedures and site evacuation.',
  },
];

export default function CscsCardModule5() {
  useSEO({
    title: 'Module 5: Specialist Knowledge & Site Safety | CSCS Card Preparation | Elec-Mate',
    description:
      'Excavations, confined spaces, fire safety, electrical safety, demolition and emergency procedures for the CSCS HS&E test.',
  });

  return (
    <ModuleShell
      backTo="../cscs-card-course"
      backLabel="CSCS card preparation"
      moduleNumber={5}
      title="Specialist knowledge & site safety"
      description="Specialist site safety topics including excavations, confined spaces, fire safety, electrical safety on site, demolition risks and emergency procedures."
      tone="green"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../cscs-card-module-4"
      prevModuleLabel="Hazardous substances & environmental"
      nextModuleHref="../cscs-card-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cscs-card-module-5-section-${section.id}`}
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
