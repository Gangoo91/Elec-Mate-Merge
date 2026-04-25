import { GitBranch, Compass, Wifi, Settings, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Comparison: off-grid, grid-tied and hybrid systems', icon: GitBranch, description: 'The differences between system configurations.' },
  { id: 2, title: 'Off-grid design considerations (autonomy, generator backup)', icon: Compass, description: 'Designing standalone systems with backup generation.' },
  { id: 3, title: 'Grid-tied sizing and export management', icon: Wifi, description: 'Sizing grid-connected systems and managing energy export.' },
  { id: 4, title: 'Control strategies: manual vs automated switching', icon: Settings, description: 'Different control approaches for system switching.' },
  { id: 5, title: 'Load priority, critical loads and energy routing', icon: Zap, description: 'Managing energy distribution and prioritising loads.' },
];

export default function RenewableEnergyModule6() {
  useSEO({
    title: 'Module 6: Off-Grid vs Grid-Tied | Renewable Energy | Elec-Mate',
    description: 'Off-grid, grid-tied and hybrid configurations — design, export management and load prioritisation.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={6}
      title="Off-grid vs grid-tied system configuration"
      description="Pick the right configuration and design around critical loads, autonomy and export."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../renewable-energy-module-5"
      prevModuleLabel="Inverter technology and grid integration"
      nextModuleHref="../renewable-energy-module-7"
      nextModuleLabel="Installation, maintenance and troubleshooting"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-6-section-${section.id}`}
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
