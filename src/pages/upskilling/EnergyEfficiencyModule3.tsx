import { Eye, ClipboardList, TrendingUp, Wrench, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Walkthrough and inventory surveys',
    icon: Eye,
    description: 'Conducting comprehensive site surveys and equipment inventories.',
  },
  {
    id: 2,
    title: 'Data collection (manual, smart meters, logs)',
    icon: ClipboardList,
    description: 'Methods for gathering reliable energy consumption data.',
  },
  {
    id: 3,
    title: 'Comparing to benchmarks and tariffs',
    icon: TrendingUp,
    description: 'Benchmarking site performance against industry standards.',
  },
  {
    id: 4,
    title: 'Tools and software for audits',
    icon: Wrench,
    description: 'Software and equipment used during energy auditing engagements.',
  },
  {
    id: 5,
    title: 'Audit reports and cost/carbon breakdown',
    icon: FileText,
    description: 'Producing comprehensive audit reports with prioritised recommendations.',
  },
];

export default function EnergyEfficiencyModule3() {
  useSEO({
    title: 'Module 3: Energy Auditing Methods | Energy Efficiency | Elec-Mate',
    description:
      'Walkthrough surveys, data collection, benchmarking, audit tools and producing actionable reports.',
  });

  return (
    <ModuleShell
      backTo="../energy-efficiency-course"
      backLabel="Energy efficiency and management"
      moduleNumber={3}
      title="Energy auditing methods"
      description="Comprehensive auditing techniques and the methodologies behind them."
      tone="yellow"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../energy-efficiency-module-2"
      prevModuleLabel="Power quality and load analysis"
      nextModuleHref="../energy-efficiency-module-4"
      nextModuleLabel="Reducing demand and improving efficiency"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../energy-efficiency-module-3-section-${section.id}`}
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
