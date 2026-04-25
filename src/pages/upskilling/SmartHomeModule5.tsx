import { Lock, Camera, Eye, Smartphone, Lightbulb, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Smart locks and keypads', icon: Lock, description: 'Installing and configuring smart access control systems.' },
  { id: 2, title: 'CCTV types, resolution and storage options', icon: Camera, description: 'Selecting and installing smart surveillance systems.' },
  { id: 3, title: 'Door/window contact sensors and PIR', icon: Eye, description: 'Installing perimeter detection and motion sensors.' },
  { id: 4, title: 'Remote access and alerts', icon: Smartphone, description: 'Setting up mobile notifications and remote monitoring.' },
  { id: 5, title: 'Linking with lighting and emergency scenes', icon: Lightbulb, description: 'Integrating security with lighting automation.' },
  { id: 6, title: 'Network security and user privacy', icon: Shield, description: 'Securing smart home networks and protecting user data.' },
];

export default function SmartHomeModule5() {
  useSEO({
    title: 'Module 5: Access Control, CCTV and Security | Smart Home | Elec-Mate',
    description: 'Smart locks, CCTV, contact sensors, PIR, remote alerts, security-lighting integration and network security.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={5}
      title="Access control, CCTV and security integration"
      description="Smart security done right — devices, integration and the network behind them."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../smart-home-module-4"
      prevModuleLabel="Heating, HVAC and environmental control"
      nextModuleHref="../smart-home-module-6"
      nextModuleLabel="Smart hubs, voice assistants and interoperability"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-5-section-${section.id}`}
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
