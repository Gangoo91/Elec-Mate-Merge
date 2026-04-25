import { FileText, BarChart3, AlertTriangle, X } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: "Purpose of the AM2 and who it's for", icon: FileText, description: 'Assessment objectives, qualification context and target candidates.' },
  { id: 2, title: 'Structure and timings of the assessment', icon: BarChart3, description: 'Breakdown of the AM2 components and time allocations.' },
  { id: 3, title: 'Marking criteria and pass/fail thresholds', icon: AlertTriangle, description: 'How the AM2 is marked and what counts as a pass.' },
  { id: 4, title: 'Common reasons for failure', icon: X, description: 'Typical mistakes and the areas where most candidates slip up.' },
];

export default function AM2Module1() {
  useSEO({
    title: 'Module 1: Introduction to the AM2 | Elec-Mate',
    description: 'Purpose, structure, marking criteria and common reasons candidates fail the AM2 assessment.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={1}
      title="Introduction to the AM2"
      description="The purpose, structure, marking criteria and common reasons candidates fail."
      tone="yellow"
      sectionsCount={sections.length}
      duration="2h"
      nextModuleHref="../module2"
      nextModuleLabel="Health, safety and documentation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section${section.id}`}
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
