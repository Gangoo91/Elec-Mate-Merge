import { Lightbulb, Clock, Palette, Zap, Link2 } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Types of smart lighting systems', icon: Lightbulb, description: 'An overview of smart lighting technologies and controls.' },
  { id: 2, title: 'Scene-based control and schedules', icon: Clock, description: 'Programming lighting scenes and automated schedules.' },
  { id: 3, title: 'Dimming, RGBW and colour temperature', icon: Palette, description: 'Colour control and dimming capabilities.' },
  { id: 4, title: 'Load compatibility and control types', icon: Zap, description: 'Matching controls to different lighting load types.' },
  { id: 5, title: 'Grouping, linking and motion logic', icon: Link2, description: 'Intelligent lighting groups and motion-based control.' },
];

export default function SmartHomeModule3() {
  useSEO({
    title: 'Module 3: Smart Lighting and Scene Programming | Smart Home | Elec-Mate',
    description: 'Smart lighting types, scene control, dimming, colour temperature, load compatibility and motion logic.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={3}
      title="Smart lighting and scene programming"
      description="From colour temperature to motion logic — the design choices behind smart lighting."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../smart-home-module-2"
      prevModuleLabel="Smart protocols: Zigbee, Z-Wave, Wi-Fi and more"
      nextModuleHref="../smart-home-module-4"
      nextModuleLabel="Heating, HVAC and environmental control"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-3-section-${section.id}`}
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
