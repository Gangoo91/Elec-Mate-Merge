import { FileText, Clock } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mock exams',
    icon: FileText,
    description:
      'Eight full Level 3 practice papers — one per unit (201 refresher, 301, 302, 303, 304, 305, 308) plus a mixed mock — sat under realistic closed-book conditions.',
    href: '../level3-module8-section1',
  },
  {
    id: 2,
    title: 'How to pass exams — tips and techniques',
    icon: Clock,
    description:
      'Exam strategy for the Level 3 closed-book multiple choice papers — pacing, question analysis, exam-day preparation and the common pitfalls.',
    href: '../level3-module8-section2',
  },
];

export default function Level3Module8() {
  useSEO({
    title: 'Mock Examinations and Assessment | Level 3 Electrical | Elec-Mate',
    description:
      'Practice exam papers and exam technique tips to build confidence for the Level 3 electrical installation closed-book multiple choice assessments.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 3 electrical installation"
      moduleNumber={8}
      title="Mock examinations and assessment"
      description="Practice papers and exam technique tips to build confidence for the Level 3 closed-book multiple choice assessments — one paper per unit plus a mixed mock."
      tone="blue"
      sectionsCount={sections.length}
      prevModuleHref="../level3-module7"
      prevModuleLabel="Career awareness and professional development"
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
