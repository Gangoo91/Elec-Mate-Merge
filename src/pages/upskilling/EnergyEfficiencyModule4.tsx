import { Lightbulb, Settings, Users, Calculator } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'LED and lighting control upgrades',
    icon: Lightbulb,
    description: 'Upgrading to efficient lighting systems and modern control gear.',
  },
  {
    id: 2,
    title: 'Motor efficiency and VSD retrofitting',
    icon: Settings,
    description: 'Improving motor efficiency and retrofitting variable speed drives.',
  },
  {
    id: 3,
    title: 'Energy-efficient controls (timers, BMS)',
    icon: Settings,
    description: 'Implementing smart controls and building management systems.',
  },
  {
    id: 4,
    title: 'Behavioural measures and awareness',
    icon: Users,
    description: 'Energy awareness programmes and lasting behavioural change.',
  },
  {
    id: 5,
    title: 'ROI calculators and energy saving tools',
    icon: Calculator,
    description: 'Tools for calculating return on investment and projected savings.',
  },
];

export default function EnergyEfficiencyModule4() {
  useSEO({
    title: 'Module 4: Reducing Demand & Improving Efficiency | Energy Efficiency | Elec-Mate',
    description:
      'LED upgrades, motor efficiency, VSD retrofits, smart controls, behavioural measures and ROI tools.',
  });

  return (
    <ModuleShell
      backTo="../energy-efficiency-course"
      backLabel="Energy efficiency and management"
      moduleNumber={4}
      title="Reducing demand and improving efficiency"
      description="Practical measures for reducing energy demand and improving overall efficiency."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../energy-efficiency-module-3"
      prevModuleLabel="Energy auditing methods"
      nextModuleHref="../energy-efficiency-module-5"
      nextModuleLabel="Monitoring, analytics and smart metering"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../energy-efficiency-module-4-section-${section.id}`}
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
