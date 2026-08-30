import { Search, AlertTriangle, Wrench, Clipboard, FileText, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Systematic fault diagnosis',
    icon: Search,
    description:
      'Why every instrument is a box with an input and an output, and how to design a test that could prove you wrong.',
  },
  {
    id: 2,
    title: 'Reading the symptom',
    icon: AlertTriangle,
    description:
      'What a wrong signal tells you before you touch anything — low, high, frozen, noisy or dead.',
  },
  {
    id: 3,
    title: 'Intermittent faults',
    icon: Wrench,
    description:
      'The hardest class of fault: catching evidence of something that is not happening while you watch.',
  },
  {
    id: 4,
    title: 'Preventive maintenance',
    icon: Clipboard,
    description:
      'What is worth doing before anything fails, and how to tell useful maintenance from ritual.',
  },
  {
    id: 5,
    title: 'When the instrument is right',
    icon: FileText,
    description:
      'No fault found — the reading is correct and the process really is doing that. Knowing when to stop.',
  },
  {
    id: 6,
    title: 'Fault finding on running plant',
    icon: Shield,
    description:
      'The hazards created by the act of diagnosis itself — breaking loops, forcing outputs and working live.',
  },
];

export default function InstrumentationModule8() {
  useSEO({
    title: 'Module 8: Fault Finding and Maintenance | Instrumentation | Elec-Mate',
    description:
      'Systematic diagnosis and designing tests that can disprove, reading symptoms, intermittent faults, preventive maintenance, no-fault-found, and working safely on running plant.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={8}
      title="Fault finding, diagnostics and maintenance"
      description="A structured approach to keeping instrumentation systems healthy — diagnose, maintain and report."
      tone="cyan"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../instrumentation-module-7"
      prevModuleLabel="Instrumentation wiring and 4-20 mA loops"
      nextModuleHref="../instrumentation-module-9"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-8-section-${section.id}`}
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
