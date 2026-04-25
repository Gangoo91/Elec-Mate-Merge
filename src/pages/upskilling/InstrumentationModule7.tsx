import { Cable, Power, Calculator, Palette, Shield, Wrench, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'What is a 4-20 mA loop and why it is used', icon: Cable, description: 'The 4-20 mA current loop standard and its advantages.' },
  { id: 2, title: 'Loop-powered vs externally powered devices', icon: Power, description: 'Different power supply configurations for instrumentation loops.' },
  { id: 3, title: 'Loop design and load calculations', icon: Calculator, description: 'Designing current loops and calculating power requirements.' },
  { id: 4, title: 'Wiring standards and colour coding', icon: Palette, description: 'Industry standards for instrumentation wiring and identification.' },
  { id: 5, title: 'Barriers, isolators and intrinsically safe loops', icon: Shield, description: 'Safety devices and intrinsically safe system design.' },
  { id: 6, title: 'Loop testing tools (loop calibrators, simulators, multimeters)', icon: Wrench, description: 'Equipment and techniques for testing current loops.' },
  { id: 7, title: 'Common wiring faults and loop integrity checks', icon: AlertTriangle, description: 'Troubleshooting wiring problems and verifying loop integrity.' },
];

export default function InstrumentationModule7() {
  useSEO({
    title: 'Module 7: 4-20 mA Loops and Wiring | Instrumentation | Elec-Mate',
    description: 'The 4-20 mA standard, loop design, wiring colour codes, intrinsic safety and loop testing tools.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={7}
      title="Instrumentation wiring and 4-20 mA loops"
      description="The 4-20 mA loop end-to-end — design, wiring, intrinsic safety and proving loop integrity."
      tone="cyan"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../instrumentation-module-6"
      prevModuleLabel="Calibration methods and standards"
      nextModuleHref="../instrumentation-module-8"
      nextModuleLabel="Fault finding, diagnostics and maintenance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-7-section-${section.id}`}
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
