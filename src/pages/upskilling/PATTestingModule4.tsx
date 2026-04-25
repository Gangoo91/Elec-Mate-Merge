import { Wrench, Zap, RotateCcw, Activity, Settings, FileX } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Earth continuity testing (Class I)', icon: Zap, description: 'Testing earth connections in Class I appliances.' },
  { id: 2, title: 'Insulation resistance testing', icon: Settings, description: 'Testing insulation integrity in Class I and II appliances.' },
  { id: 3, title: 'Polarity testing of cords and leads', icon: RotateCcw, description: 'Verifying correct wiring polarity.' },
  { id: 4, title: 'Touch current and leakage testing', icon: Activity, description: 'Advanced current measurement techniques.' },
  { id: 5, title: 'Test equipment types', icon: Wrench, description: 'Manual, automatic and advanced PAT testing equipment.' },
  { id: 6, title: 'Interpreting results and common failures', icon: FileX, description: 'Understanding test results and failure modes.' },
];

export default function PATTestingModule4() {
  useSEO({
    title: 'Module 4: Electrical Testing Methods | PAT Testing | Elec-Mate',
    description: 'Earth continuity, insulation resistance, polarity, touch current and leakage testing — equipment and result interpretation.',
  });

  return (
    <ModuleShell
      backTo="../pat-testing-course"
      backLabel="PAT testing certification"
      moduleNumber={4}
      title="Electrical testing methods and equipment"
      description="The instrument tests behind a PAT pass — what each test proves and how to read the results."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../pat-testing-module-3"
      prevModuleLabel="Visual inspections and safety assessment"
      nextModuleHref="../pat-testing-module-5"
      nextModuleLabel="Documentation, labelling and legal requirements"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pat-testing-module-4-section-${section.id}`}
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
