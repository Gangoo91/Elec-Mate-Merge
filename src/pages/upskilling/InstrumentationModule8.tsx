import { Search, AlertTriangle, Wrench, Clipboard, FileText, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Systematic approach to fault diagnosis', icon: Search, description: 'Methodical troubleshooting techniques for instrumentation systems.' },
  { id: 2, title: 'Symptoms of sensor, loop or signal failure', icon: AlertTriangle, description: 'Identifying common failure modes and their symptoms.' },
  { id: 3, title: 'Using loop calibrators and simulators for diagnostics', icon: Wrench, description: 'Practical use of test equipment for fault finding.' },
  { id: 4, title: 'Preventive maintenance routines', icon: Clipboard, description: 'Scheduled maintenance to prevent system failures.' },
  { id: 5, title: 'Documenting faults and generating service reports', icon: FileText, description: 'Documentation and reporting procedures.' },
  { id: 6, title: 'Safety considerations during troubleshooting', icon: Shield, description: 'Safe working practices when diagnosing faults.' },
];

export default function InstrumentationModule8() {
  useSEO({
    title: 'Module 8: Fault Finding and Maintenance | Instrumentation | Elec-Mate',
    description: 'Systematic fault diagnosis, failure symptoms, loop calibrators, preventive maintenance and safe troubleshooting.',
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
