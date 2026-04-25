import { FlaskConical, Layers, Route, HeartPulse } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is COSHH?',
    icon: FlaskConical,
    description:
      'COSHH Regulations 2002 definition, scope, workplace statistics and why controlling hazardous substances matters.',
  },
  {
    id: 2,
    title: 'Types of hazardous substances',
    icon: Layers,
    description:
      'Chemicals, dusts, fumes, gases, biological agents and GHS classification of hazardous substances.',
  },
  {
    id: 3,
    title: 'Routes of exposure',
    icon: Route,
    description:
      'Inhalation, ingestion, skin absorption, injection and understanding workplace exposure limits (WELs).',
  },
  {
    id: 4,
    title: 'Health effects of hazardous substances',
    icon: HeartPulse,
    description:
      'Acute vs chronic health effects, occupational diseases, target organs and long-term consequences of exposure.',
  },
];

export default function CoshhAwarenessModule1() {
  useSEO({
    title: 'Module 1: Understanding COSHH | COSHH Awareness | Elec-Mate',
    description:
      'What COSHH means, types of hazardous substances, routes of exposure and the health effects of working with dangerous chemicals and materials.',
  });

  return (
    <ModuleShell
      backTo="../coshh-awareness-course"
      backLabel="COSHH awareness"
      moduleNumber={1}
      title="Understanding COSHH"
      description="The fundamentals of the Control of Substances Hazardous to Health — what COSHH covers, the substances involved, how they enter the body, and the damage they can cause."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../coshh-awareness-module-2"
      nextModuleLabel="Legislation & risk assessment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../coshh-awareness-module-1-section-${section.id}`}
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
