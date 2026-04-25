import { Globe, Settings, Cable, Wifi, Network, Activity } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Overview of BMS protocols',
    icon: Globe,
    description: 'Communication protocol fundamentals and how they fit into a BMS.',
  },
  {
    id: 2,
    title: 'BACnet devices and network types',
    icon: Settings,
    description: 'BACnet architecture, object models and network variants.',
  },
  {
    id: 3,
    title: 'Modbus RTU and TCP/IP use cases',
    icon: Cable,
    description: 'Modbus serial vs IP and where each is best applied.',
  },
  {
    id: 4,
    title: 'KNX topology and bus devices',
    icon: Wifi,
    description: 'KNX bus topology, addressing and device configuration.',
  },
  {
    id: 5,
    title: 'Gateways and interoperability between protocols',
    icon: Network,
    description: 'Protocol integration, translation and gateway selection.',
  },
  {
    id: 6,
    title: 'Network planning, segmentation and latency management',
    icon: Activity,
    description: 'Network design and performance optimisation for BMS traffic.',
  },
];

export default function BMSModule5() {
  useSEO({
    title: 'Module 5: BACnet, Modbus & KNX Protocols | BMS Course | Elec-Mate',
    description:
      'BACnet, Modbus, KNX and gateway interoperability — protocol selection, topology and network planning for BMS.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={5}
      title="Communication protocols: BACnet, Modbus, KNX"
      description="Industry communication standards and how to make them interoperate."
      tone="yellow"
      sectionsCount={sections.length}
      duration="70 mins"
      prevModuleHref="../bms-module-4"
      prevModuleLabel="Lighting, access and environmental control"
      nextModuleHref="../bms-module-6"
      nextModuleLabel="Alarms, monitoring and data logging"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-5-section-${section.id}`}
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
