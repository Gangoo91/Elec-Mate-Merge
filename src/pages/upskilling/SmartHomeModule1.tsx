import { Home, Lightbulb, Cpu, Cloud, Building } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'What is a smart home?', icon: Home, description: 'The fundamentals of smart home technology.' },
  { id: 2, title: 'Benefits and applications (lighting, HVAC, security, accessibility)', icon: Lightbulb, description: 'Smart home applications across different systems.' },
  { id: 3, title: 'Core components (sensors, actuators, controllers)', icon: Cpu, description: 'The essential hardware components.' },
  { id: 4, title: 'Smart home architectures: local, cloud, hybrid', icon: Cloud, description: 'Different architectural approaches and their benefits.' },
  { id: 5, title: 'System types: retrofit vs new build', icon: Building, description: 'Comparing installation approaches for different property types.' },
];

export default function SmartHomeModule1() {
  useSEO({
    title: 'Module 1: Introduction to Smart Home Systems | Smart Home | Elec-Mate',
    description: 'Smart home fundamentals, benefits, core components, system architectures and retrofit vs new build.',
  });

  return (
    <ModuleShell
      backTo="../smart-home-course"
      backLabel="Smart home technology"
      moduleNumber={1}
      title="Introduction to smart home systems"
      description="The big picture of smart home — what it is, what it does and how it is put together."
      tone="cyan"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../smart-home-module-2"
      nextModuleLabel="Smart protocols: Zigbee, Z-Wave, Wi-Fi and more"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../smart-home-module-1-section-${section.id}`}
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
