import { Target, Wrench, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What calibration is, and what it is not',
    icon: Target,
    description:
      'Three jobs get called calibration and only one is — the one needing a known physical input.',
  },
  {
    id: 2,
    title: 'Calibration equipment and reference standards',
    icon: Wrench,
    description:
      'Read, source and simulate — and why any substitution tests everything downstream and nothing upstream.',
  },
  {
    id: 3,
    title: 'Calibration procedures',
    icon: ClipboardCheck,
    description:
      'Why analogue zero and span must be iterated, digital trims must not, and the output trim runs backwards.',
  },
  {
    id: 4,
    title: 'Recording results, tolerances and failed calibrations',
    icon: FileText,
    description:
      'Where a tolerance comes from, and what a failed calibration says about every reading since the last one.',
  },
  {
    id: 5,
    title: 'Calibration intervals',
    icon: Shield,
    description: 'A risk judgement argued from the as-found history — and what resets it entirely.',
  },
  {
    id: 6,
    title: 'Calibrating the loop, not just the instrument',
    icon: Shield,
    description:
      'Why a chain of perfectly calibrated devices can still be out of tolerance, and how errors combine.',
  },
];

export default function InstrumentationModule6() {
  useSEO({
    title: 'Module 6: Calibration Methods and Standards | Instrumentation | Elec-Mate',
    description:
      'What calibration actually is, the equipment, the procedures, tolerances and verdicts, intervals, and calibrating a whole loop.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={6}
      title="Calibration methods and standards"
      description="Procedures, documentation and certification — the calibration workflow from start to finish."
      tone="cyan"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../instrumentation-module-5"
      prevModuleLabel="Control loops and feedback systems"
      nextModuleHref="../instrumentation-module-7"
      nextModuleLabel="Instrumentation wiring and 4-20 mA loops"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-6-section-${section.id}`}
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
