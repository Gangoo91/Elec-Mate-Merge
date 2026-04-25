import { Wrench, CheckCircle, Calendar, Search, Gauge, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Installation best practices (DC safety, cable management, earth bonding)', icon: Wrench, description: 'Safe installation procedures and best practices for renewable systems.' },
  { id: 2, title: 'Commissioning checks: voltage, insulation, functional testing', icon: CheckCircle, description: 'Essential commissioning tests and verification procedures.' },
  { id: 3, title: 'Maintenance schedules (visual, electrical, firmware)', icon: Calendar, description: 'Planned maintenance schedules and inspection requirements.' },
  { id: 4, title: 'Fault-finding in PV, battery and inverter systems', icon: Search, description: 'Systematic troubleshooting for renewable energy systems.' },
  { id: 5, title: 'Using meters, test equipment and diagnostics', icon: Gauge, description: 'Test equipment and diagnostic tools for system analysis.' },
  { id: 6, title: 'Safety, isolation and working live considerations', icon: Shield, description: 'Safety procedures and isolation requirements for live systems.' },
];

export default function RenewableEnergyModule7() {
  useSEO({
    title: 'Module 7: Installation, Maintenance and Troubleshooting | Renewable Energy | Elec-Mate',
    description: 'Installation best practice, commissioning, maintenance schedules, fault finding and safe isolation for renewables.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={7}
      title="Installation, maintenance and troubleshooting"
      description="Practical guidance for installing, commissioning and maintaining renewable energy systems."
      tone="cyan"
      sectionsCount={sections.length}
      duration="70 mins"
      prevModuleHref="../renewable-energy-module-6"
      prevModuleLabel="Off-grid vs grid-tied system configuration"
      nextModuleHref="../renewable-energy-module-8"
      nextModuleLabel="Regulations, planning and compliance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-7-section-${section.id}`}
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
