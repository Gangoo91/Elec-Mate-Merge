import { FileText, Tag, Database, Calendar, Award } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'PAT labels: pass/fail, retest dates, asset ID', icon: Tag, description: 'Labelling systems and identification requirements.' },
  { id: 2, title: 'Test record keeping and legal requirements', icon: FileText, description: 'Documentation standards and compliance.' },
  { id: 3, title: 'Asset register creation and management', icon: Database, description: 'Creating and maintaining equipment registers.' },
  { id: 4, title: 'Retest period planning', icon: Calendar, description: 'Schedule planning and resource management.' },
  { id: 5, title: 'Certification and reporting requirements', icon: Award, description: 'Professional certification and compliance reporting.' },
];

export default function PATTestingModule5() {
  useSEO({
    title: 'Module 5: Documentation and Labelling | PAT Testing | Elec-Mate',
    description: 'PAT labels, record keeping, asset registers, retest planning and certification — the paperwork side of PAT testing.',
  });

  return (
    <ModuleShell
      backTo="../pat-testing-course"
      backLabel="PAT testing certification"
      moduleNumber={5}
      title="Documentation, labelling and legal requirements"
      description="Labels, registers and certificates — the records that prove your PAT testing was done."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../pat-testing-module-4"
      prevModuleLabel="Electrical testing methods and equipment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pat-testing-module-5-section-${section.id}`}
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
