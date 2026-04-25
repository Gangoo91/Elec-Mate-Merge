import { Recycle, FileText, AlertTriangle, ClipboardList } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The waste hierarchy',
    icon: Recycle,
    description:
      'The five steps of the waste hierarchy — prevention, reuse, recycling, recovery and disposal — and how to apply them on construction sites.',
  },
  {
    id: 2,
    title: 'Duty of care & waste transfer notes',
    icon: FileText,
    description:
      'Your legal duty of care for waste, how to complete waste transfer notes correctly, and the consequences of failing to comply.',
  },
  {
    id: 3,
    title: 'Hazardous vs non-hazardous waste',
    icon: AlertTriangle,
    description:
      'How to identify and classify hazardous waste, segregation requirements, consignment notes and safe handling procedures.',
  },
  {
    id: 4,
    title: 'Site waste management plans',
    icon: ClipboardList,
    description:
      'How to create and maintain a site waste management plan, setting waste reduction targets and recording waste movements.',
  },
];

export default function EnvironmentalSustainabilityModule2() {
  useSEO({
    title: 'Module 2: Waste Management | Environmental & Sustainability | Elec-Mate',
    description:
      'Waste hierarchy, duty of care, hazardous waste classification and site waste management plans for construction sites.',
  });

  return (
    <ModuleShell
      backTo="../environmental-sustainability-course"
      backLabel="Environmental & sustainability"
      moduleNumber={2}
      title="Waste management"
      description="The waste hierarchy and how to apply it on site, your legal duty of care, hazardous vs non-hazardous waste, and site waste management planning."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../environmental-sustainability-module-1"
      prevModuleLabel="Environmental awareness"
      nextModuleHref="../environmental-sustainability-module-3"
      nextModuleLabel="Energy & resource efficiency"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../environmental-sustainability-module-2-section-${section.id}`}
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
