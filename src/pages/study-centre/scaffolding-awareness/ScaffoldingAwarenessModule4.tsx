import { ClipboardCheck, Search, Tag, Calendar } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'When to inspect',
    icon: ClipboardCheck,
    description:
      'Before first use, every 7 days, after weather events, after alteration, after any event affecting stability — and who must inspect.',
  },
  {
    id: 2,
    title: 'The inspection process',
    icon: Search,
    description:
      'Systematic inspection method, what to check (foundations, standards, ledgers, bracing, ties, platforms, guardrails) and defect identification.',
  },
  {
    id: 3,
    title: 'Scaffold tags & status',
    icon: Tag,
    description:
      'Green tag (safe to use), yellow tag (restrictions), red tag (do not use), tag information and the advanced scaffolding inspection scheme.',
  },
  {
    id: 4,
    title: 'Inspection records & reporting',
    icon: Calendar,
    description:
      'Written inspection reports, record retention, who sees the reports, reporting defects and enforcement.',
  },
];

export default function ScaffoldingAwarenessModule4() {
  useSEO({
    title: 'Module 4: Scaffold Inspection & Tagging | Scaffolding Awareness | Elec-Mate',
    description:
      'When and how to inspect scaffolds, the scaffold tag system, inspection records and reporting requirements.',
  });

  return (
    <ModuleShell
      backTo="../scaffolding-awareness-course"
      backLabel="Scaffolding awareness"
      moduleNumber={4}
      title="Scaffold inspection & tagging"
      description="Statutory inspection requirements, the systematic inspection process, the green/yellow/red tag system and how to complete and maintain inspection records."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../scaffolding-awareness-module-3"
      prevModuleLabel="Scaffold components & assembly"
      nextModuleHref="../scaffolding-awareness-module-5"
      nextModuleLabel="Safe use & hazard awareness"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../scaffolding-awareness-module-4-section-${section.id}`}
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
