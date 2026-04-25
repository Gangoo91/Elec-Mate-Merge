import { Scale, Shield, BookOpen, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: "The first aider's role & legal framework",
    icon: Scale,
    description:
      'Health & Safety (First-Aid) Regulations 1981, L74 Approved Code of Practice, FAW vs EFAW, certificate validity and employer duties.',
  },
  {
    id: 2,
    title: 'Scene safety & the primary survey',
    icon: Shield,
    description:
      'Scene safety (DANGER), DR ABC / ABCDE assessment, airway management, breathing checks, calling 999/112, consent and capacity.',
  },
  {
    id: 3,
    title: 'Record keeping, RIDDOR & the accident book',
    icon: BookOpen,
    description:
      'Accident Book BI510, RIDDOR 2013 categories, first aid records vs RIDDOR, GDPR considerations and digital systems.',
  },
  {
    id: 4,
    title: 'First aid kits, equipment & workplace planning',
    icon: FileText,
    description:
      'BS 8599-1:2019 kit contents, high-risk additions, AED provision, first aid room requirements, signage and needs assessment.',
  },
];

export default function FirstAidModule1() {
  useSEO({
    title: "Module 1: The first aider's role, legislation & assessment | First Aid at Work",
    description:
      "UK first aid legislation, the first aider's role, scene safety, RIDDOR reporting, accident books and first aid equipment.",
  });

  return (
    <ModuleShell
      backTo="../first-aid-course"
      backLabel="First aid at work"
      moduleNumber={1}
      title="The first aider's role, legislation & assessment"
      description="UK first aid legislation, the role and responsibilities of the first aider, scene assessment, record keeping and first aid equipment."
      tone="red"
      sectionsCount={sections.length}
      duration="40 mins"
      nextModuleHref="../first-aid-module-2"
      nextModuleLabel="Life-threatening emergencies — CPR, AED & choking"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../first-aid-module-1-section-${section.id}`}
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
