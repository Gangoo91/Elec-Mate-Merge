import { Scale, ClipboardCheck, FileText, Gauge } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The COSHH Regulations 2002',
    icon: Scale,
    description:
      'Legal framework, employer and employee duties, Approved Codes of Practice, and related health and safety legislation.',
  },
  {
    id: 2,
    title: 'COSHH risk assessment',
    icon: ClipboardCheck,
    description:
      'The 8-step assessment process, identifying hazards, evaluating exposure and recording findings.',
  },
  {
    id: 3,
    title: 'Safety data sheets',
    icon: FileText,
    description:
      'The 16 SDS sections, GHS pictograms, hazard and precautionary statements, and how to interpret them.',
  },
  {
    id: 4,
    title: 'Workplace exposure limits',
    icon: Gauge,
    description:
      'WELs explained, EH40 guidance document, monitoring methods and biological monitoring requirements.',
  },
];

export default function CoshhAwarenessModule2() {
  useSEO({
    title: 'Module 2: Legislation & Risk Assessment | COSHH Awareness | Elec-Mate',
    description:
      'The COSHH Regulations 2002, how to carry out a COSHH risk assessment, read safety data sheets and interpret workplace exposure limits.',
  });

  return (
    <ModuleShell
      backTo="../coshh-awareness-course"
      backLabel="COSHH awareness"
      moduleNumber={2}
      title="Legislation & risk assessment"
      description="The legal framework behind COSHH, how to carry out and record risk assessments, read safety data sheets, and understand workplace exposure limits."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../coshh-awareness-module-1"
      prevModuleLabel="Understanding COSHH"
      nextModuleHref="../coshh-awareness-module-3"
      nextModuleLabel="Hazardous substances on site"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../coshh-awareness-module-2-section-${section.id}`}
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
