import { Zap, BarChart, Target, Gauge, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Measuring voltage, current and resistance', icon: Zap, description: 'Fundamental electrical measurements and techniques.' },
  { id: 2, title: 'Frequency and time-based measurements', icon: BarChart, description: 'Measuring frequency, period and time-based parameters.' },
  { id: 3, title: 'Instrument accuracy, resolution and error', icon: Target, description: 'Understanding measurement precision and error sources.' },
  { id: 4, title: 'Measurement equipment: multimeters, clamp meters, oscilloscopes', icon: Gauge, description: 'Common electrical measurement instruments.' },
  { id: 5, title: 'Interpreting and logging readings in real-world systems', icon: FileText, description: 'Practical application of measurements in industrial systems.' },
];

export default function InstrumentationModule4() {
  useSEO({
    title: 'Module 4: Measurement of Electrical Quantities | Instrumentation | Elec-Mate',
    description: 'Voltage, current, resistance, frequency and time-based measurement — accuracy, equipment and interpreting results.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={4}
      title="Measurement of electrical quantities"
      description="The instruments and techniques behind every accurate electrical measurement."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../instrumentation-module-3"
      prevModuleLabel="Signal types, conditioning and scaling"
      nextModuleHref="../instrumentation-module-5"
      nextModuleLabel="Control loops and feedback systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-4-section-${section.id}`}
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
