import { Zap, BarChart, Filter, Settings, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Signal types: voltage, current, resistance, frequency',
    icon: Zap,
    description:
      'Not four equal choices — four points in the chain, and why a current survives a cable run.',
  },
  {
    id: 2,
    title: 'Standard signal ranges',
    icon: BarChart,
    description:
      '4–20 mA, 1–5 V, 0–10 V and 3–15 psi, plus the three loop topologies that decide the wiring.',
  },
  {
    id: 3,
    title: 'Signal conditioning: filtering, isolation, amplification',
    icon: Filter,
    description:
      'Wrong size, wrong reference, unwanted content — and the damping trap that makes a transmitter lie.',
  },
  {
    id: 4,
    title: 'Scaling, conversion and where error enters',
    icon: Settings,
    description:
      'Per unit, converter counts and quantisation, aliasing, and the square root that must be taken once.',
  },
  {
    id: 5,
    title: 'Signal integrity: noise, ground loops and shielding',
    icon: Shield,
    description:
      'Capacitive noise is common-mode, inductive noise is differential — and that decides the cure.',
  },
];

export default function InstrumentationModule3() {
  useSEO({
    title: 'Module 3: Signal Types and Conditioning | Instrumentation | Elec-Mate',
    description:
      'Signal types, standard ranges, conditioning, scaling and maintaining signal integrity in instrumentation systems.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={3}
      title="Signal types, conditioning and scaling"
      description="From raw sensor output to a clean, correctly scaled signal — and the faults that hide in between."
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
