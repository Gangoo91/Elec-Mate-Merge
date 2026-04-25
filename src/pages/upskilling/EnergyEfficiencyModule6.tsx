import { FileText, Calculator, Award, BarChart, CheckSquare } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'ESOS, SECR and building regs overview',
    icon: FileText,
    description: 'Understanding the key regulatory frameworks and compliance requirements.',
  },
  {
    id: 2,
    title: 'ROI models: payback, IRR, life-cycle costing',
    icon: Calculator,
    description: 'Financial modelling for energy efficiency investments.',
  },
  {
    id: 3,
    title: 'Incentives and funding opportunities',
    icon: Award,
    description: 'Available grants, incentives and funding schemes for efficiency works.',
  },
  {
    id: 4,
    title: 'Developing energy KPI dashboards',
    icon: BarChart,
    description: 'Creating KPI tracking systems and performance dashboards.',
  },
  {
    id: 5,
    title: 'Compliance reporting and audit trails',
    icon: CheckSquare,
    description: 'Maintaining compliance records and robust audit documentation.',
  },
];

export default function EnergyEfficiencyModule6() {
  useSEO({
    title: 'Module 6: Regulations, Carbon Compliance & ROI | Energy Efficiency | Elec-Mate',
    description:
      'ESOS, SECR, building regs, payback models, funding opportunities, KPI dashboards and audit trails.',
  });

  return (
    <ModuleShell
      backTo="../energy-efficiency-course"
      backLabel="Energy efficiency and management"
      moduleNumber={6}
      title="Regulations, carbon compliance and ROI"
      description="Understanding compliance requirements and the financial modelling that justifies investment."
      tone="yellow"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../energy-efficiency-module-5"
      prevModuleLabel="Monitoring, analytics and smart metering"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../energy-efficiency-module-6-section-${section.id}`}
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
