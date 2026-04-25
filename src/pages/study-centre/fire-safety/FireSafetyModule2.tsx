import { Scale, Users, ClipboardCheck, BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The Regulatory Reform (Fire Safety) Order 2005',
    icon: Scale,
    description:
      'The primary fire safety legislation in England and Wales, replacing over 70 pieces of previous fire law with a single risk-based framework.',
  },
  {
    id: 2,
    title: 'The responsible person',
    icon: Users,
    description:
      'Who the responsible person is, their legal duties and the consequences of non-compliance including criminal prosecution.',
  },
  {
    id: 3,
    title: 'Fire risk assessment',
    icon: ClipboardCheck,
    description:
      'The five-step fire risk assessment process — identify hazards, identify people at risk, evaluate and act, record and plan, review and update.',
  },
  {
    id: 4,
    title: 'Supporting legislation & standards',
    icon: BookOpen,
    description:
      'Health and Safety at Work Act 1974, Management Regulations 1999, Building Regulations Part B, and BS 5839 fire detection standards.',
  },
];

export default function FireSafetyModule2() {
  useSEO({
    title: 'Module 2: Fire Safety Legislation | Fire Safety & Fire Marshal | Elec-Mate',
    description:
      'The Regulatory Reform (Fire Safety) Order 2005, the responsible person, fire risk assessments and supporting legislation.',
  });

  return (
    <ModuleShell
      backTo="../fire-safety-course"
      backLabel="Fire safety & fire marshal"
      moduleNumber={2}
      title="Fire safety legislation"
      description="The legal framework governing fire safety in England and Wales, the duties of the responsible person, the fire risk assessment process and key supporting legislation."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../fire-safety-module-1"
      prevModuleLabel="Understanding fire"
      nextModuleHref="../fire-safety-module-3"
      nextModuleLabel="Fire prevention & detection"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fire-safety-module-2-section-${section.id}`}
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
