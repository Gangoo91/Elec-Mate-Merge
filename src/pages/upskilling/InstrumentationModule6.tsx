import { Target, Wrench, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'What is calibration and why it is important', icon: Target, description: 'Fundamentals and importance of calibration.' },
  { id: 2, title: 'Calibration equipment and reference standards', icon: Wrench, description: 'Tools and standards used for accurate calibration.' },
  { id: 3, title: 'Step-by-step calibration of pressure, temperature and electrical devices', icon: ClipboardCheck, description: 'Practical calibration procedures for different instruments.' },
  { id: 4, title: 'Recording and documenting calibration results', icon: FileText, description: 'Documentation and record-keeping for calibration activities.' },
  { id: 5, title: 'Calibration intervals, certificates and UKAS traceability', icon: Shield, description: 'Certification requirements and traceability standards.' },
  { id: 6, title: 'Advanced calibration topics and best practices', icon: Shield, description: 'Advanced techniques, troubleshooting and emerging trends.' },
];

export default function InstrumentationModule6() {
  useSEO({
    title: 'Module 6: Calibration Methods and Standards | Instrumentation | Elec-Mate',
    description: 'Calibration equipment, step-by-step procedures, documentation, certification and UKAS traceability.',
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
