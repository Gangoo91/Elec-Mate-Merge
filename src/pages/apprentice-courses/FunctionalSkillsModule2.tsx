import { BookOpen, PenTool, MessageSquare, SpellCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Reading technical documents',
    icon: BookOpen,
    description: 'BS 7671, datasheets, regulations, method statements and O&M manuals.',
    href: '/study-centre/apprentice/functional-skills/module2/section1',
  },
  {
    id: 2,
    title: 'Technical writing',
    icon: PenTool,
    description: 'EICR and EIC forms, method statements, emails, reports and site notes.',
    href: '/study-centre/apprentice/functional-skills/module2/section2',
  },
  {
    id: 3,
    title: 'Communication skills',
    icon: MessageSquare,
    description:
      'Client communication, site meetings, telephone manner and explaining technical work.',
    href: '/study-centre/apprentice/functional-skills/module2/section3',
  },
  {
    id: 4,
    title: 'Spelling, grammar and punctuation',
    icon: SpellCheck,
    description: 'Trade vocabulary, homophones, technical terminology and proofreading.',
    href: '/study-centre/apprentice/functional-skills/module2/section4',
  },
];

export default function FunctionalSkillsModule2() {
  useSEO({
    title: 'Module 2: English for Electricians | Functional Skills | Elec-Mate',
    description:
      'Technical reading, writing, communication and professional documentation for the electrical trade.',
  });

  return (
    <ModuleShell
      backTo="../functional-skills"
      backLabel="Functional skills"
      moduleNumber={2}
      title="English for electricians"
      description="Read, write and communicate clearly across regulations, certificates, site notes and client conversations."
      tone="yellow"
      sectionsCount={sections.length}
      duration="1h"
      prevModuleHref="/study-centre/apprentice/functional-skills/module1"
      prevModuleLabel="Mathematics for electricians"
      nextModuleHref="/study-centre/apprentice/functional-skills/module3"
      nextModuleLabel="Digital skills for electricians"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
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
