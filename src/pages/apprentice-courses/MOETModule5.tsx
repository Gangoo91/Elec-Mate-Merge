import { Gauge, Cpu, Shield, Settings, TestTube, Network } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Sensors and transducers', icon: Gauge, description: 'Sensing principles, proximity sensors, temperature/pressure measurement and signal conditioning.' },
  { id: 2, title: 'PLCs and control systems', icon: Cpu, description: 'PLC hardware, I/O devices, ladder logic, programming software and troubleshooting.' },
  { id: 3, title: 'Safety circuits and interlocks', icon: Shield, description: 'Emergency stops, interlocking devices, safety relays and functional safety principles.' },
  { id: 4, title: 'Process control and instrumentation', icon: Settings, description: 'PID control, pneumatic and hydraulic controls, DCS systems and instrument calibration.' },
  { id: 5, title: 'Testing and calibration of systems', icon: TestTube, description: 'Calibration procedures, test instruments, adjustments and documentation.' },
  { id: 6, title: 'Networking and industrial communication', icon: Network, description: 'Fieldbus, industrial Ethernet, wireless IoT and cybersecurity in industrial networks.' },
];

export default function MOETModule5() {
  useSEO({
    title: 'Module 5: Control, Automation and Instrumentation | MOET | Elec-Mate',
    description: 'Sensors, PLCs, safety circuits, process control, calibration and industrial networks for maintenance engineers.',
  });

  return (
    <ModuleShell
      backTo="../moet"
      backLabel="MOET"
      moduleNumber={5}
      title="Control, automation and instrumentation"
      description="Control systems, PLCs, sensors, safety circuits, process control and industrial communication."
      tone="orange"
      sectionsCount={sections.length}
      duration="4h"
      prevModuleHref="../m-o-e-t-module4"
      prevModuleLabel="Maintenance techniques and fault diagnosis"
      nextModuleHref="../m-o-e-t-module6"
      nextModuleLabel="Technical documentation and communication"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../m-o-e-t-module5-section${section.id}`}
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
