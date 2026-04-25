import { BookOpen, Map, Settings, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'What is instrumentation?', icon: BookOpen, description: 'Fundamentals of instrumentation and its role in industrial systems.' },
  { id: 2, title: 'Where and why instrumentation is used (HVAC, process, BMS, renewables)', icon: Map, description: 'Applications across industries and the benefits they bring.' },
  { id: 3, title: 'Measurement vs control vs indication', icon: Settings, description: 'The different functions and purposes of instrumentation.' },
  { id: 4, title: 'Key industry standards (BS EN, UKAS, ISO/IEC 17025)', icon: FileText, description: 'Relevant standards and certification requirements.' },
];

export default function InstrumentationModule1() {
  useSEO({
    title: 'Module 1: Introduction to Instrumentation | Instrumentation | Elec-Mate',
    description: 'Fundamentals of electrical instrumentation, where it is used, the difference between measurement and control, and key standards.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={1}
      title="Introduction to electrical instrumentation"
      description="What instrumentation is, where it is used and the standards that govern it."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      nextModuleHref="../instrumentation-module-2"
      nextModuleLabel="Sensors and transducers explained"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-1-section-${section.id}`}
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
