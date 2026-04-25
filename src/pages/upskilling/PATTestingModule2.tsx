import { Zap, Shield, HardHat, Layers, Tag } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Overview of appliance classes', icon: Layers, description: 'Introduction to the Class I, II and III classification system.' },
  { id: 2, title: 'Class I: protective earthing explained', icon: Shield, description: 'Earthed appliances and protection methods.' },
  { id: 3, title: 'Class II: double insulation principles', icon: HardHat, description: 'Double-insulated appliances and safety principles.' },
  { id: 4, title: 'Class III: extra-low voltage and SELV', icon: Zap, description: 'Low-voltage appliances and safety systems.' },
  { id: 5, title: 'Identifying appliance class by markings and labels', icon: Tag, description: 'Visual identification of appliance classes.' },
];

export default function PATTestingModule2() {
  useSEO({
    title: 'Module 2: Class I, II and III Appliances | PAT Testing | Elec-Mate',
    description: 'Appliance classification — protective earthing, double insulation, SELV and how to identify each class on site.',
  });

  return (
    <ModuleShell
      backTo="../pat-testing-course"
      backLabel="PAT testing certification"
      moduleNumber={2}
      title="Class I, II and III appliances"
      description="The three appliance classes, the protection method behind each, and how to identify them by markings."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      prevModuleHref="../pat-testing-module-1"
      prevModuleLabel="Introduction to portable appliance testing"
      nextModuleHref="../pat-testing-module-3"
      nextModuleLabel="Visual inspections and safety assessment"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pat-testing-module-2-section-${section.id}`}
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
