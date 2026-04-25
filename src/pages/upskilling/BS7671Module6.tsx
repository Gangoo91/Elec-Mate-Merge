import { CheckCircle, Eye, FileText, AlertTriangle, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Requirements for initial verification',
    icon: CheckCircle,
    description: 'Mandatory verification procedures for new electrical installations.',
  },
  {
    id: 2,
    title: 'Visual inspection and testing responsibilities',
    icon: Eye,
    description: 'Systematic visual inspection requirements and testing responsibilities.',
  },
  {
    id: 3,
    title: 'Sequence of tests and testing procedures',
    icon: Lightbulb,
    description: 'Correct testing sequence and step-by-step procedures per BS 7671.',
  },
  {
    id: 4,
    title: 'Model forms and certification overview (EIC, MEIWC, EICR)',
    icon: FileText,
    description: 'Understanding and completing electrical installation certificates and reports.',
  },
  {
    id: 5,
    title: 'Certification errors and common pitfalls',
    icon: AlertTriangle,
    description: 'Avoiding mistakes and understanding common certification errors.',
  },
  {
    id: 6,
    title: 'Recording limitations and safety observations',
    icon: CheckCircle,
    description: 'Documenting inspection limitations and safety-related observations.',
  },
];

export default function BS7671Module6() {
  useSEO({
    title: 'Module 6: Inspection, Testing & Certification | BS 7671 | Elec-Mate',
    description:
      'Initial verification, sequence of tests, model forms (EIC, MEIWC, EICR) and common certification pitfalls.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={6}
      title="Inspection, testing and certification"
      description="Verification procedures, the sequence of tests and the certification process."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../bs7671-module-5"
      prevModuleLabel="Selection and erection of equipment"
      nextModuleHref="../bs7671-module-7"
      nextModuleLabel="Special installations and locations"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-6-section-${section.id}`}
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
