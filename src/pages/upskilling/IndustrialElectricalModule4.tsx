import { Cpu, Route, Activity, Network, Monitor, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'PLC architecture and inputs/outputs', icon: Cpu, description: 'PLC system architecture and I/O configuration.' },
  { id: 2, title: 'Ladder logic and function blocks', icon: Route, description: 'Programming languages and logic development.' },
  { id: 3, title: 'Sensor/actuator integration', icon: Activity, description: 'Field device integration and interfacing.' },
  { id: 4, title: 'Industrial protocols (Modbus, Profibus, Ethernet/IP)', icon: Network, description: 'Communication protocols and networking.' },
  { id: 5, title: 'SCADA and HMI introduction', icon: Monitor, description: 'Supervisory control and human machine interfaces.' },
  { id: 6, title: 'Safety PLC and machine guarding', icon: Shield, description: 'Safety systems and machine protection.' },
];

export default function IndustrialElectricalModule4() {
  useSEO({
    title: 'Module 4: PLC Basics and Integration | Industrial Electrical | Elec-Mate',
    description: 'PLC architecture, ladder logic, sensor/actuator integration, industrial protocols, SCADA and safety PLCs.',
  });

  return (
    <ModuleShell
      backTo="../industrial-electrical-course"
      backLabel="Industrial electrical systems"
      moduleNumber={4}
      title="PLC basics and system integration"
      description="An electrician's introduction to PLCs — architecture, ladder logic, protocols and safety."
      tone="orange"
      sectionsCount={sections.length}
      duration="70 mins"
      prevModuleHref="../industrial-electrical-module-3"
      prevModuleLabel="Industrial panel assembly and layout"
      nextModuleHref="../industrial-electrical-module-5"
      nextModuleLabel="Industrial fault finding and troubleshooting"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../industrial-electrical-module-4-section-${section.id}`}
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
