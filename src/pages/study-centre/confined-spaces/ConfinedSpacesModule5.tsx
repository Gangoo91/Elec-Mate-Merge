import { Siren, Heart, HeartPulse, BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Emergency planning',
    icon: Siren,
    description:
      'Regulation 5 of the Confined Spaces Regulations 1997, rescue plan requirements before entry, rescue team competence standards, and the importance of regular rehearsals.',
  },
  {
    id: 2,
    title: 'Rescue equipment & techniques',
    icon: Heart,
    description:
      'Tripods and winches, davit systems, confined-space stretchers, breathing apparatus sets, first aid provisions, and lowering and raising procedures.',
  },
  {
    id: 3,
    title: 'Casualty retrieval',
    icon: HeartPulse,
    description:
      'Non-entry rescue as the preferred method, entry rescue as a last resort, self-rescue procedures, and the communication failure protocol.',
  },
  {
    id: 4,
    title: 'Incident reporting & lessons learned',
    icon: BookOpen,
    description:
      'RIDDOR reporting requirements, incident investigation processes, building a near-miss reporting culture, post-incident debriefing, and continuous improvement.',
  },
];

export default function ConfinedSpacesModule5() {
  useSEO({
    title: 'Module 5: Emergency & rescue procedures | Confined spaces awareness | Elec-Mate',
    description:
      'Emergency planning, rescue equipment and techniques, casualty retrieval methods and incident reporting for confined space work.',
  });

  return (
    <ModuleShell
      backTo="../confined-spaces-course"
      backLabel="Confined spaces awareness"
      moduleNumber={5}
      title="Emergency & rescue procedures"
      description="How to plan for emergencies before anyone enters a confined space, select and use rescue equipment, retrieve a casualty safely, and report incidents to drive continuous improvement."
      tone="cyan"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../confined-spaces-module-4"
      prevModuleLabel="Safe entry & working procedures"
      nextModuleHref="../confined-spaces-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../confined-spaces-module-5-section-${section.id}`}
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
