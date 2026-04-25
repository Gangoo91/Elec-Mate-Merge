import { Radio, Network, Wifi, Bluetooth, CircleDot, GitBranch } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Wireless protocol overview', icon: Radio, description: 'The different wireless communication protocols.' },
  { id: 2, title: 'Zigbee vs Z-Wave: range, mesh, power use', icon: Network, description: 'Comparing the two major mesh protocols.' },
  { id: 3, title: 'Wi-Fi, Bluetooth, Thread and Matter', icon: Wifi, description: 'Modern protocols including the new Matter standard.' },
  { id: 4, title: 'Interference, channels and bandwidth', icon: Bluetooth, description: 'Managing signal interference and channel allocation.' },
  { id: 5, title: 'Hub vs hubless ecosystems', icon: CircleDot, description: 'Centralised vs distributed architectures.' },
  { id: 6, title: 'Compatibility mapping and bridge use', icon: GitBranch, description: 'Connecting different protocols and legacy systems.' },
];

export default function SmartHomeModule2() {
  useSEO({
    title: 'Module 2: Smart Protocols | Smart Home | Elec-Mate',
    description: 'Zigbee, Z-Wave, Wi-Fi, Bluetooth, Thread and Matter — protocol comparison, interference and bridging.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={2}
      title="Smart protocols: Zigbee, Z-Wave, Wi-Fi and more"
      description="Pick the right protocol for the job and bridge ecosystems where they meet."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../smart-home-module-1"
      prevModuleLabel="Introduction to smart home systems"
      nextModuleHref="../smart-home-module-3"
      nextModuleLabel="Smart lighting and scene programming"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-2-section-${section.id}`}
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
