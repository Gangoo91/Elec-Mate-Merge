import { PackageOpen, Scale, Search, HeartPulse } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What is manual handling?',
    icon: PackageOpen,
    description:
      'MHOR 1992 definition, injury statistics, common manual handling activities and why it matters for electricians.',
  },
  {
    id: 2,
    title: 'The legal framework',
    icon: Scale,
    description:
      'MHOR 1992, HASAWA 1974, Management Regs 1999 and employer/employee duties.',
  },
  {
    id: 3,
    title: 'Manual handling risk assessment',
    icon: Search,
    description:
      'The TILE framework — Task, Individual, Load, Environment — and the five-step assessment process.',
  },
  {
    id: 4,
    title: 'Anatomy & injury mechanisms',
    icon: HeartPulse,
    description:
      'Spinal structure, intervertebral discs, herniation and how manual handling injuries occur.',
  },
];

export default function ManualHandlingModule1() {
  useSEO({
    title: 'Module 1: Understanding Manual Handling | Elec-Mate',
    description:
      'MHOR 1992 definition, the legal framework, TILE risk assessment and anatomy of manual handling injuries.',
  });

  return (
    <ModuleShell
      backTo="../manual-handling-course"
      backLabel="Manual handling"
      moduleNumber={1}
      title="Understanding manual handling"
      description="The regulations, legal duties, TILE risk assessment process and anatomy of manual handling injuries."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../manual-handling-module-2"
      nextModuleLabel="Principles of safe lifting"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../manual-handling-module-1-section-${section.id}`}
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
