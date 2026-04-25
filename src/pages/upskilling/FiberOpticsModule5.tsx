import { CheckCircle, Activity, BarChart, Award, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

// Section 2 intentionally omitted — no content file exists.
const sections = [
  { id: 1, title: 'Continuity and polarity checks', icon: CheckCircle, description: 'Basic connectivity and polarity verification.' },
  { id: 3, title: 'OTDR testing basics', icon: Activity, description: 'Optical time domain reflectometer fundamentals.' },
  { id: 4, title: 'Interpreting test results', icon: BarChart, description: 'Understanding and analysing measurement data.' },
  { id: 5, title: 'Fibre testing pass/fail criteria', icon: Award, description: 'Performance standards and acceptance criteria.' },
  { id: 6, title: 'Generating test reports', icon: FileText, description: 'Documentation and certification reporting.' },
];

export default function FiberOpticsModule5() {
  useSEO({
    title: 'Module 5: Fibre Testing and Certification | Fibre Optics | Elec-Mate',
    description: 'Continuity, OTDR testing, interpreting results, pass/fail criteria and producing certification reports.',
  });

  return (
    <ModuleShell
      backTo="../fiber-optics-course"
      backLabel="Fibre optics technology"
      moduleNumber={5}
      title="Fibre testing and certification"
      description="The full test workflow — from continuity checks through OTDR analysis to producing the final report."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../fiber-optics-module-4"
      prevModuleLabel="Termination and splicing techniques"
      nextModuleHref="../fiber-optics-module-6"
      nextModuleLabel="Standards and network design principles"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fiber-optics-module-5-section-${section.id}`}
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
