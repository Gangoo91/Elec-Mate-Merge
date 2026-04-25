import { Gauge, Thermometer } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Difference between sensors and transducers', icon: Gauge, description: 'The distinction and relationship between sensors and transducers.' },
  { id: 2, title: 'Temperature sensors — thermocouples, RTDs, thermistors', icon: Thermometer, description: 'Temperature measurement devices, principles and applications.' },
  { id: 3, title: 'Pressure and flow sensors', icon: Gauge, description: 'Pressure and flow measurement for fluid and gas systems.' },
  { id: 4, title: 'Level, position and proximity sensors', icon: Gauge, description: 'Spatial awareness sensors for level, position and proximity.' },
  { id: 5, title: 'Digital vs analogue sensor output', icon: Gauge, description: 'Output types and their implications for signal processing.' },
  { id: 6, title: 'Choosing the right sensor for the application', icon: Gauge, description: 'Decision framework for selecting sensors against technical and environmental criteria.' },
];

export default function InstrumentationModule2() {
  useSEO({
    title: 'Module 2: Sensors and Transducers | Instrumentation | Elec-Mate',
    description: 'Temperature, pressure, flow, level, position and proximity sensors — operating principles and selection.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={2}
      title="Sensors and transducers explained"
      description="The sensors at the heart of every instrumentation system — what they do and how to choose them."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../instrumentation-module-1"
      prevModuleLabel="Introduction to electrical instrumentation"
      nextModuleHref="../instrumentation-module-3"
      nextModuleLabel="Signal types, conditioning and scaling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-2-section-${section.id}`}
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
