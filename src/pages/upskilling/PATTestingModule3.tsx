import { Eye, Cable, Thermometer, TriangleAlert, BarChart3 } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Cable and plug damage checks', icon: Cable, description: 'Visual inspection of cables and plugs for safety issues.' },
  { id: 2, title: 'Rewiring and correct fuse ratings', icon: Eye, description: 'Assessment of wiring quality and fuse specifications.' },
  { id: 3, title: 'Signs of overheating or modification', icon: Thermometer, description: 'Identifying damage and unauthorised modifications.' },
  { id: 4, title: 'Environmental considerations', icon: TriangleAlert, description: 'Risk assessment for different work environments.' },
  { id: 5, title: 'Risk-based approaches to test intervals', icon: BarChart3, description: 'Using risk assessment to set testing frequencies.' },
];

export default function PATTestingModule3() {
  useSEO({
    title: 'Module 3: Visual Inspections | PAT Testing | Elec-Mate',
    description: 'Cable and plug damage, fuse ratings, signs of overheating, environmental considerations and risk-based test intervals.',
  });

  return (
    <ModuleShell
      backTo="../pat-testing-course"
      backLabel="PAT testing certification"
      moduleNumber={3}
      title="Visual inspections and safety assessment"
      description="Most PAT failures show before the meter touches them — what to look for and how to risk-assess."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../pat-testing-module-2"
      prevModuleLabel="Class I, II and III appliances"
      nextModuleHref="../pat-testing-module-4"
      nextModuleLabel="Electrical testing methods and equipment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pat-testing-module-3-section-${section.id}`}
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
