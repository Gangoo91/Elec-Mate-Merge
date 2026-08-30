import { Cable, Power, Calculator, Palette, Shield, Wrench, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Reading a loop diagram',
    icon: Cable,
    description:
      'How a loop sheet differs from a P&ID, and reading one to find every device and terminal in a loop.',
  },
  {
    id: 2,
    title: 'Terminations and glanding',
    icon: Power,
    description:
      'Making off screened instrument cable, where the screen is earthed, and why glanding is a sealing job.',
  },
  {
    id: 3,
    title: 'Loop design and load calculations',
    icon: Calculator,
    description:
      'Working out whether the supply can drive the loop to 20 mA — and why devices, not cable, fill the budget.',
  },
  {
    id: 4,
    title: 'Instrument cable and identification',
    icon: Palette,
    description:
      'Choosing and identifying instrument cable, and why segregation from power cabling matters.',
  },
  {
    id: 5,
    title: 'Barriers and intrinsically safe loops',
    icon: Shield,
    description:
      'The four ways to be safe in a classified area, how a barrier limits fault current and voltage, and why its earth is the mechanism.',
  },
  {
    id: 6,
    title: 'Commissioning a loop',
    icon: Wrench,
    description:
      'Proving the installation before start-up — why commissioning asks a different question from calibration, and the transposed loop that looks perfect.',
  },
  {
    id: 7,
    title: 'Testing instrument cable',
    icon: AlertTriangle,
    description:
      'Testing the cable as a cable — why every device comes off first, which row of Table 64 applies, and why passing the minimum is not the same as being accurate.',
  },
];

export default function InstrumentationModule7() {
  useSEO({
    title: 'Module 7: 4-20 mA Loops and Wiring | Instrumentation | Elec-Mate',
    description:
      'Loop diagrams, terminations and glanding, loop budget calculations, instrument cable and segregation, and intrinsically safe loops.',
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
