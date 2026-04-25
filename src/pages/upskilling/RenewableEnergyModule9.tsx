import { PoundSterling, TrendingUp, Calculator, Wrench, CreditCard, Scale } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Feed-in tariff (legacy), SEG and net metering', icon: PoundSterling, description: 'Payment schemes and energy export mechanisms.' },
  { id: 2, title: 'Understanding ROI, payback periods and system lifespan', icon: TrendingUp, description: 'Financial metrics and return on investment calculations.' },
  { id: 3, title: 'Cost-benefit analysis (domestic vs commercial)', icon: Calculator, description: 'Comparing financial benefits across different system types.' },
  { id: 4, title: 'Tools for estimating yield and return (PV*Sol, SAP, etc.)', icon: Wrench, description: 'Software tools for financial modelling and yield estimation.' },
  { id: 5, title: 'Green finance and funding options', icon: CreditCard, description: 'Government schemes, commercial finance and green loan products.' },
  { id: 6, title: 'Tax implications and legal considerations', icon: Scale, description: 'VAT treatment, tax allowances, planning and consumer protection.' },
];

export default function RenewableEnergyModule9() {
  useSEO({
    title: 'Module 9: Incentives, Payback and Financial Modelling | Renewable Energy | Elec-Mate',
    description: 'SEG, ROI, payback, cost-benefit analysis, yield modelling tools, green finance and tax implications.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={9}
      title="Incentives, payback and financial modelling"
      description="The numbers behind every renewables proposal — payments, payback and financial modelling."
      tone="cyan"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../renewable-energy-module-8"
      prevModuleLabel="Regulations, planning and compliance"
      nextModuleHref="../renewable-energy-module-10"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-9-section-${section.id}`}
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
