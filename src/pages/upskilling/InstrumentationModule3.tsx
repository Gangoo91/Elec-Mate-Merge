import { Zap, BarChart, Filter, Settings, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Signal types: voltage, current, resistance, frequency', icon: Zap, description: 'The different electrical signals used in instrumentation.' },
  { id: 2, title: 'Standard ranges: 4-20 mA, 0-10 V, pulse signals', icon: BarChart, description: 'Industry standard signal ranges and their applications.' },
  { id: 3, title: 'Signal conditioning: filtering, isolation, amplification', icon: Filter, description: 'Techniques for processing and conditioning instrumentation signals.' },
  { id: 4, title: 'Signal scaling, conversions and error introduction', icon: Settings, description: 'Converting between signal types and understanding error sources.' },
  { id: 5, title: 'Signal integrity: noise, ground loops and shielding', icon: Shield, description: 'Maintaining signal quality and preventing interference.' },
];

export default function InstrumentationModule3() {
  useSEO({
    title: 'Module 3: Signal Types and Conditioning | Instrumentation | Elec-Mate',
    description: 'Signal types, standard ranges, conditioning, scaling and maintaining signal integrity in instrumentation systems.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={3}
      title="Signal types, conditioning and scaling"
      description="From raw sensor output to a clean, scaled signal — the techniques that make instrumentation work."
      tone="cyan"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../instrumentation-module-2"
      prevModuleLabel="Sensors and transducers explained"
      nextModuleHref="../instrumentation-module-4"
      nextModuleLabel="Measurement of electrical quantities"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-3-section-${section.id}`}
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
