import { CircleDot, Mic, Settings, ArrowUpDown, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Hub types (Home Assistant, SmartThings, proprietary)', icon: CircleDot, description: 'The different smart home hub options.' },
  { id: 2, title: 'Alexa, Google Home and Siri integration', icon: Mic, description: 'Connecting smart homes with voice assistants.' },
  { id: 3, title: 'Voice control logic and routine mapping', icon: Settings, description: 'Programming voice commands and automation routines.' },
  { id: 4, title: 'Bridging systems and legacy devices', icon: ArrowUpDown, description: 'Integrating older systems with modern smart home platforms.' },
  { id: 5, title: 'Troubleshooting ecosystem conflicts', icon: AlertTriangle, description: 'Resolving compatibility issues between different systems.' },
];

export default function SmartHomeModule6() {
  useSEO({
    title: 'Module 6: Smart Hubs and Voice Assistants | Smart Home | Elec-Mate',
    description: 'Hub types, voice assistant integration, routine logic, bridging legacy systems and ecosystem troubleshooting.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={6}
      title="Smart hubs, voice assistants and interoperability"
      description="Centralise control with hubs and voice assistants — and unblock the inevitable ecosystem conflicts."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../smart-home-module-5"
      prevModuleLabel="Access control, CCTV and security integration"
      nextModuleHref="../smart-home-module-7"
      nextModuleLabel="Installation, testing and safety requirements"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-6-section-${section.id}`}
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
