import { CheckCircle, Shield, Wrench, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-entry procedures',
    icon: CheckCircle,
    description:
      'Mechanical, electrical and piping isolation techniques, purging the atmosphere, pre-entry atmospheric testing, and issuing the entry permit.',
  },
  {
    id: 2,
    title: 'Personal protective equipment',
    icon: Shield,
    description:
      'Selecting between breathing apparatus and respiratory protective equipment, harnesses and lanyards, tripod rescue systems, communication equipment and lighting.',
  },
  {
    id: 3,
    title: 'Working inside confined spaces',
    icon: Wrench,
    description:
      'Communication systems between entrant and top person, top-person duties and responsibilities, time limits, personnel rotation and continuous atmospheric monitoring.',
  },
  {
    id: 4,
    title: 'Electrical work in confined spaces',
    icon: Zap,
    description:
      'Reduced voltage requirements at 110V, 25V and 12V, residual current devices, battery-powered tools, hot work permit requirements and safe cable routing.',
  },
];

export default function ConfinedSpacesModule4() {
  useSEO({
    title: 'Module 4: Safe entry & working procedures | Confined spaces awareness | Elec-Mate',
    description:
      'Pre-entry procedures, PPE selection, safe working practices inside confined spaces and the special requirements for electrical work.',
  });

  return (
    <ModuleShell
      backTo="../confined-spaces-course"
      backLabel="Confined spaces awareness"
      moduleNumber={4}
      title="Safe entry & working procedures"
      description="Every step of safe confined-space entry from isolation and purging through to working inside, selecting the right PPE, and meeting the special electrical requirements that apply in enclosed environments."
      tone="cyan"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../confined-spaces-module-3"
      prevModuleLabel="Hazards & atmospheric monitoring"
      nextModuleHref="../confined-spaces-module-5"
      nextModuleLabel="Emergency & rescue procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../confined-spaces-module-4-section-${section.id}`}
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
