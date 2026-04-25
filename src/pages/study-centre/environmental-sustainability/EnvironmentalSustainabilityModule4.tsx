import { Wind, Droplets, Volume2, Layers } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Air quality & dust control',
    icon: Wind,
    description:
      'Sources of airborne pollution on construction sites, dust suppression methods, monitoring air quality and legal requirements under the Clean Air Act.',
  },
  {
    id: 2,
    title: 'Water pollution prevention',
    icon: Droplets,
    description:
      'Preventing pollutants entering watercourses, containment of oils and chemicals, silt management and incident response for water pollution events.',
  },
  {
    id: 3,
    title: 'Noise & vibration control',
    icon: Volume2,
    description:
      'Noise and vibration impacts on workers and neighbours, Control of Noise at Work Regulations, best practicable means and Section 61 consents.',
  },
  {
    id: 4,
    title: 'Land contamination & remediation',
    icon: Layers,
    description:
      'Identifying contaminated land, the polluter-pays principle, remediation strategies and legal responsibilities under Part 2A of the Environmental Protection Act.',
  },
];

export default function EnvironmentalSustainabilityModule4() {
  useSEO({
    title: 'Module 4: Pollution Prevention | Environmental & Sustainability | Elec-Mate',
    description:
      'Air quality and dust control, water pollution prevention, noise and vibration management, and land contamination remediation.',
  });

  return (
    <ModuleShell
      backTo="../environmental-sustainability-course"
      backLabel="Environmental & sustainability"
      moduleNumber={4}
      title="Pollution prevention"
      description="Controlling dust and maintaining air quality, preventing water pollution, managing noise and vibration impacts, and your responsibilities for contaminated land."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../environmental-sustainability-module-3"
      prevModuleLabel="Energy & resource efficiency"
      nextModuleHref="../environmental-sustainability-module-5"
      nextModuleLabel="Biodiversity & best practice"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../environmental-sustainability-module-4-section-${section.id}`}
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
