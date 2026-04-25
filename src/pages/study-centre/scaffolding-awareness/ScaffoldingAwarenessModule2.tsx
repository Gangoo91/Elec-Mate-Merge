import { Scale, FileText, ShieldCheck, BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Work at Height Regulations 2005',
    icon: Scale,
    description:
      'Legal framework for scaffolding, hierarchy of controls, duty holders and inspection requirements.',
  },
  {
    id: 2,
    title: 'NASC guidance & TG20',
    icon: FileText,
    description:
      'National Access and Scaffolding Confederation, TG20 compliance system, design configurations and when a scaffold design is needed.',
  },
  {
    id: 3,
    title: 'BS EN 12811 & other standards',
    icon: ShieldCheck,
    description:
      'British and European scaffold standards, load classes, performance requirements and width categories.',
  },
  {
    id: 4,
    title: 'CDM 2015 & scaffold design',
    icon: BookOpen,
    description:
      'Construction Design and Management duties, temporary works coordination, design review and handover.',
  },
];

export default function ScaffoldingAwarenessModule2() {
  useSEO({
    title: 'Module 2: Scaffold Regulations & Standards | Scaffolding Awareness | Elec-Mate',
    description:
      'Work at Height Regulations 2005, NASC guidance, TG20, BS EN 12811 and CDM 2015 scaffold design requirements.',
  });

  return (
    <ModuleShell
      backTo="../scaffolding-awareness-course"
      backLabel="Scaffolding awareness"
      moduleNumber={2}
      title="Scaffold regulations & standards"
      description="The legal framework governing scaffolding in the UK — Work at Height Regulations 2005, NASC guidance, TG20 compliance, British and European standards and CDM 2015 duties."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../scaffolding-awareness-module-1"
      prevModuleLabel="Introduction to scaffolding"
      nextModuleHref="../scaffolding-awareness-module-3"
      nextModuleLabel="Scaffold components & assembly"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../scaffolding-awareness-module-2-section-${section.id}`}
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
