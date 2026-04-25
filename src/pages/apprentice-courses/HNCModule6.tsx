import { FileCheck, Sun, Award, Leaf, Gauge, Puzzle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Building Regulations Part L',
    icon: FileCheck,
    description:
      'Part L compliance, SBEM, notional building method, U-values, air permeability and commissioning requirements.',
  },
  {
    id: 2,
    title: 'Renewable energy systems',
    icon: Sun,
    description:
      'Solar PV, heat pumps, biomass, wind, CHP and grid integration for building services.',
  },
  {
    id: 3,
    title: 'BREEAM assessment',
    icon: Award,
    description:
      'BREEAM categories, credits, evidence requirements, pre-assessment and certification process.',
  },
  {
    id: 4,
    title: 'Carbon reduction strategies',
    icon: Leaf,
    description:
      'Carbon hierarchy, operational and embodied carbon, offsetting, science-based targets and net-zero pathways.',
  },
  {
    id: 5,
    title: 'Energy management',
    icon: Gauge,
    description:
      'Energy auditing, metering strategies, monitoring and targeting, ISO 50001 and energy performance.',
  },
  {
    id: 6,
    title: 'Sustainable design integration',
    icon: Puzzle,
    description:
      'Passive design, fabric-first principles, system optimisation and whole-life carbon assessment.',
  },
];

export default function HNCModule6() {
  useSEO({
    title: 'Module 6: Sustainability and Environmental Engineering | HNC | Elec-Mate',
    description:
      'Part L compliance, renewable integration, BREEAM, carbon reduction and energy management for net-zero buildings.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={6}
      title="Sustainability and environmental engineering"
      description="Regulatory compliance, renewable systems and carbon-reduction strategies on the path to net-zero."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module5"
      prevModuleLabel="Project management"
      nextModuleHref="../h-n-c-module7"
      nextModuleLabel="Power and lighting systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module6-section${section.id}`}
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
