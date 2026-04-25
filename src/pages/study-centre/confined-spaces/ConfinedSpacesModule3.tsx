import { Wind, AlertTriangle, Activity, Fan } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Atmospheric hazards',
    icon: Wind,
    description:
      'Oxygen depletion below 19.5%, oxygen enrichment above 23.5%, toxic gases including hydrogen sulphide, carbon monoxide, carbon dioxide and sulphur dioxide, and flammable gases such as methane and LPG.',
  },
  {
    id: 2,
    title: 'Non-atmospheric hazards',
    icon: AlertTriangle,
    description:
      'Engulfment and drowning, entrapment by converging walls or machinery, fire and explosion risks, electricity, extreme temperatures, noise, manual handling and biological hazards.',
  },
  {
    id: 3,
    title: 'Gas detection & monitoring',
    icon: Activity,
    description:
      'Four-gas monitors and their sensors, bump testing and calibration procedures, continuous versus pre-entry monitoring strategies, and understanding alarm set points.',
  },
  {
    id: 4,
    title: 'Ventilation in confined spaces',
    icon: Fan,
    description:
      'Natural versus forced ventilation, positive and negative pressure configurations, air change rate calculations, ductwork placement and monitoring the atmosphere during ventilation.',
  },
];

export default function ConfinedSpacesModule3() {
  useSEO({
    title: 'Module 3: Hazards & atmospheric monitoring | Confined spaces awareness | Elec-Mate',
    description:
      'Atmospheric and non-atmospheric hazards in confined spaces, gas detection techniques and ventilation requirements.',
  });

  return (
    <ModuleShell
      backTo="../confined-spaces-course"
      backLabel="Confined spaces awareness"
      moduleNumber={3}
      title="Hazards & atmospheric monitoring"
      description="Every hazard category found in confined spaces — toxic and flammable atmospheres, physical dangers, four-gas monitoring, and how to ventilate a space safely before and during entry."
      tone="cyan"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../confined-spaces-module-2"
      prevModuleLabel="Legislation & risk assessment"
      nextModuleHref="../confined-spaces-module-4"
      nextModuleLabel="Safe entry & working procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../confined-spaces-module-3-section-${section.id}`}
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
