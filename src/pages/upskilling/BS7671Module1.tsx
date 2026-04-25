import { BookOpen, Scale, FileText, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Purpose and legal status of BS 7671',
    icon: Scale,
    description: 'The regulatory framework and legal standing of the wiring regulations.',
  },
  {
    id: 2,
    title: 'Scope and application of the regulations',
    icon: BookOpen,
    description: 'Where and when BS 7671 applies to electrical installations.',
  },
  {
    id: 3,
    title: 'Structure of BS 7671 (parts, chapters, appendices)',
    icon: FileText,
    description: 'How the regulations are organised and how to navigate them efficiently.',
  },
  {
    id: 4,
    title: 'Amendment 3 highlights',
    icon: Lightbulb,
    description: 'Key changes including bidirectional protective devices and consumer unit requirements.',
  },
];

export default function BS7671Module1() {
  useSEO({
    title: 'Module 1: Scope, Object & Fundamental Principles | BS 7671 | Elec-Mate',
    description:
      'Foundational principles, scope and the legal framework of BS 7671 plus Amendment 3 highlights.',
  });

  return (
    <ModuleShell
      backTo="../bs7671-course"
      backLabel="18th edition (BS 7671)"
      moduleNumber={1}
      title="Scope, object and fundamental principles"
      description="Foundational principles and the legal framework that underpins BS 7671."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      nextModuleHref="../bs7671-module-2"
      nextModuleLabel="Definitions and key terminology"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bs7671-module-1-section-${section.id}`}
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
