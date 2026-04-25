import { Zap, Target, Settings, Wifi, FileCheck, Monitor } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Inverter types: string, central, hybrid, micro', icon: Zap, description: 'Different inverter technologies and their applications.' },
  { id: 2, title: 'MPPT tracking and sizing for PV arrays', icon: Target, description: 'Maximum Power Point Tracking and inverter sizing.' },
  { id: 3, title: 'Grid-tied vs off-grid vs hybrid configurations', icon: Settings, description: 'Different system configurations and their characteristics.' },
  { id: 4, title: 'Synchronisation, anti-islanding and export limits', icon: Wifi, description: 'Grid synchronisation and safety protection systems.' },
  { id: 5, title: 'G98/G99 compliance and DNO notifications', icon: FileCheck, description: 'UK grid connection standards and notification procedures.' },
  { id: 6, title: 'Monitoring platforms and remote management', icon: Monitor, description: 'System monitoring and remote management technologies.' },
];

export default function RenewableEnergyModule5() {
  useSEO({
    title: 'Module 5: Inverter Technology and Grid Integration | Renewable Energy | Elec-Mate',
    description: 'Inverter types, MPPT, grid-tied vs off-grid, anti-islanding, G98/G99 compliance and remote monitoring.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={5}
      title="Inverter technology and grid integration"
      description="Choosing inverters, sizing them and meeting UK grid connection requirements."
      tone="cyan"
      sectionsCount={sections.length}
      duration="65 mins"
      prevModuleHref="../renewable-energy-module-4"
      prevModuleLabel="Battery storage and energy management"
      nextModuleHref="../renewable-energy-module-6"
      nextModuleLabel="Off-grid vs grid-tied configurations"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-5-section-${section.id}`}
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
