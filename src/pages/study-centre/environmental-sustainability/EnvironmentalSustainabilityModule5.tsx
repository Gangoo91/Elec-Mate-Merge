import { TreePine, Search, Award, Settings } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Protected species & habitats',
    icon: TreePine,
    description:
      'UK protected species (bats, great crested newts, badgers), the Wildlife and Countryside Act 1981, and your legal obligations when working near habitats.',
  },
  {
    id: 2,
    title: 'Ecological surveys & assessments',
    icon: Search,
    description:
      'When ecological surveys are required, types of survey (Phase 1 habitat, protected species), seasonal constraints and working with ecologists.',
  },
  {
    id: 3,
    title: 'BREEAM & green building standards',
    icon: Award,
    description:
      'How BREEAM certification works, the rating categories, how electrical installations contribute to credits, and other green building standards.',
  },
  {
    id: 4,
    title: 'Environmental management systems',
    icon: Settings,
    description:
      'ISO 14001 framework, plan-do-check-act cycle, environmental policy development, auditing, and continuous improvement in environmental performance.',
  },
];

export default function EnvironmentalSustainabilityModule5() {
  useSEO({
    title: 'Module 5: Biodiversity & Best Practice | Environmental & Sustainability | Elec-Mate',
    description:
      'Protected species and habitats, ecological surveys, BREEAM green building standards and environmental management systems.',
  });

  return (
    <ModuleShell
      backTo="../environmental-sustainability-course"
      backLabel="Environmental & sustainability"
      moduleNumber={5}
      title="Biodiversity & best practice"
      description="Legal obligations around protected species and habitats, when ecological surveys are needed, BREEAM and green building standards, and environmental management systems."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../environmental-sustainability-module-4"
      prevModuleLabel="Pollution prevention"
      nextModuleHref="../environmental-sustainability-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../environmental-sustainability-module-5-section-${section.id}`}
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
