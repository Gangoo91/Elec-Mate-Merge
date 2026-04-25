import { Zap, CloudRain, Droplets, Package } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Energy use on construction sites',
    icon: Zap,
    description:
      'Common energy sources on site, how to monitor and measure energy consumption, and practical steps to reduce energy waste.',
  },
  {
    id: 2,
    title: 'Reducing your carbon footprint',
    icon: CloudRain,
    description:
      'Carbon emissions from construction activities, Scope 1, 2 and 3 emissions, and strategies for carbon reduction on site.',
  },
  {
    id: 3,
    title: 'Water conservation',
    icon: Droplets,
    description:
      'Why water is a precious resource on construction sites, practical water-saving techniques, rainwater harvesting and preventing water waste.',
  },
  {
    id: 4,
    title: 'Sustainable materials & procurement',
    icon: Package,
    description:
      'Choosing materials with lower environmental impact, responsible sourcing, embodied carbon and the role of supply chain sustainability.',
  },
];

export default function EnvironmentalSustainabilityModule3() {
  useSEO({
    title: 'Module 3: Energy & Resource Efficiency | Environmental & Sustainability | Elec-Mate',
    description:
      'Energy use on construction sites, carbon reduction, water conservation and sustainable materials procurement.',
  });

  return (
    <ModuleShell
      backTo="../environmental-sustainability-course"
      backLabel="Environmental & sustainability"
      moduleNumber={3}
      title="Energy & resource efficiency"
      description="How energy is used on construction sites, strategies to reduce your carbon footprint, water conservation techniques and choosing sustainable materials."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../environmental-sustainability-module-2"
      prevModuleLabel="Waste management"
      nextModuleHref="../environmental-sustainability-module-4"
      nextModuleLabel="Pollution prevention"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../environmental-sustainability-module-3-section-${section.id}`}
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
