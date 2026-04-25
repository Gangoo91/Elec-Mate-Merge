import { Activity, BarChart, Zap, Gauge, FileBarChart } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Power quality factors (harmonics, flicker, etc.)',
    icon: Activity,
    description: 'Understanding power quality issues and their downstream impact.',
  },
  {
    id: 2,
    title: 'Analysing loads and demand patterns',
    icon: BarChart,
    description: 'Load analysis techniques and demand profiling for accurate sizing.',
  },
  {
    id: 3,
    title: 'kW vs kVA vs kWh explained',
    icon: Zap,
    description: 'Understanding different electrical measurements and when to use each.',
  },
  {
    id: 4,
    title: 'Equipment for power monitoring',
    icon: Gauge,
    description: 'Selecting and using power monitoring equipment in the field.',
  },
  {
    id: 5,
    title: 'Reporting load profiles and variations',
    icon: FileBarChart,
    description: 'Creating meaningful reports from raw power monitoring data.',
  },
];

export default function EnergyEfficiencyModule2() {
  useSEO({
    title: 'Module 2: Power Quality & Load Analysis | Energy Efficiency | Elec-Mate',
    description:
      'Harmonics, demand patterns, kW vs kVA vs kWh, monitoring equipment and load profile reporting.',
  });

  return (
    <ModuleShell
      backTo="../energy-efficiency-course"
      backLabel="Energy efficiency and management"
      moduleNumber={2}
      title="Power quality and load analysis"
      description="Understanding power quality issues and the characteristics of electrical loads."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../energy-efficiency-module-1"
      prevModuleLabel="Introduction to energy efficiency"
      nextModuleHref="../energy-efficiency-module-3"
      nextModuleLabel="Energy auditing methods"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../energy-efficiency-module-2-section-${section.id}`}
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
