import { Globe, Share2, Cable, Wifi, Network, Activity } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'How BMS devices talk',
    icon: Globe,
    description:
      'Before BACnet, Modbus or KNX in detail: the cables, the languages, and why a BMS only works when every device agrees on both.',
  },
  {
    id: 2,
    title: 'BACnet',
    icon: Share2,
    description:
      'The open protocol most UK building controls now speak: how it describes a building, how devices ask each other for things, and what you must get right when you wire it.',
  },
  {
    id: 3,
    title: 'Modbus RTU and Modbus TCP',
    icon: Cable,
    description:
      'The protocol behind most meters, drives and plant controllers you will connect to a BMS, and the RS-485 wiring rules that decide whether it works on the day.',
  },
  {
    id: 4,
    title: 'KNX, LonWorks, M-Bus and DALI as networks',
    icon: Wifi,
    description:
      'Four networks you will meet beside BACnet and Modbus: what each one is for, how it is wired and powered, and what the electrician has to get right for it to work.',
  },
  {
    id: 5,
    title: 'Gateways and integration',
    icon: Network,
    description:
      'How a gateway turns one protocol’s data into another’s, why the points schedule is the contract for an integration, and how to prove it works.',
  },
  {
    id: 6,
    title: 'Network design and cyber security',
    icon: Activity,
    description:
      'A BMS network can be reached, misused and switched off like any other. What the electrician can do to keep it separate, locked down and properly owned.',
  },
];

export default function BMSModule5() {
  useSEO({
    title: 'Module 5: Networks and protocols | BMS course | Elec-Mate',
    description:
      'How BMS devices talk: BACnet, Modbus, KNX, LonWorks, M-Bus and DALI, gateways and network security.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={5}
      title="Networks and protocols"
      description="How BMS devices talk: BACnet, Modbus, KNX, LonWorks, M-Bus and DALI, gateways, and keeping the network secure."
      tone="yellow"
      sectionsCount={sections.length}
      duration="3 hrs"
      prevModuleHref="../bms-module-4"
      prevModuleLabel="Lighting, access, blinds and metering"
      nextModuleHref="../bms-module-6"
      nextModuleLabel="Alarms, data and monitoring"
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
