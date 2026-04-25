import { Battery, Zap, Settings, Cable, TrendingUp, Power } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Types of batteries (Li-ion, lead-acid, LFP, flow)', icon: Battery, description: 'Key battery types and their performance characteristics.' },
  { id: 2, title: 'Battery sizing, depth of discharge and lifespan', icon: TrendingUp, description: 'Calculating storage capacity and understanding performance metrics.' },
  { id: 3, title: 'Battery management systems (BMS)', icon: Settings, description: 'BMS functions and safety protection mechanisms.' },
  { id: 4, title: 'Energy management strategies', icon: Zap, description: 'Load management and demand-side response techniques.' },
  { id: 5, title: 'Grid integration and inverter systems', icon: Cable, description: 'Grid-tie capabilities and power conversion systems.' },
  { id: 6, title: 'Economics and business models', icon: Power, description: 'Costs, payback periods and revenue streams.' },
];

export default function RenewableEnergyModule4() {
  useSEO({
    title: 'Module 4: Battery Storage and Energy Management | Renewable Energy | Elec-Mate',
    description: 'Battery chemistries, sizing, BMS, energy management strategies and grid integration economics.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={4}
      title="Battery storage and energy management"
      description="Selecting, sizing and managing battery storage — from chemistry choice to commercial business case."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../renewable-energy-module-3"
      prevModuleLabel="Wind turbines and microgeneration systems"
      nextModuleHref="../renewable-energy-module-5"
      nextModuleLabel="Inverter technology and grid integration"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-4-section-${section.id}`}
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
