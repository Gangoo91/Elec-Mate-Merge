import { FileText, Clock, Target, BarChart3 } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mock exams',
    description: 'Practice exams and timed tests to prepare for real assessments.',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Practical help',
    description: 'Practical assessment guides and techniques for hands-on assessments.',
    icon: Target,
  },
  {
    id: 3,
    title: 'Exam tips',
    description: 'Time management, memory techniques and stress management strategies.',
    icon: Clock,
  },
  {
    id: 4,
    title: 'Results review',
    description: 'Score analysis and progress tracking to identify areas for improvement.',
    icon: BarChart3,
  },
];

export default function Level3Module8() {
  useSEO({
    title: 'Module 8: Mock Exams and Assessment | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Mock examinations, practical assessment guidance, exam tips and results review for the Level 3 electrical installation qualification.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={8}
      title="Mock exams and assessment"
      description="Mock examinations, practical assessment guidance, exam techniques and results review for the Level 3 qualification."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../level3-module7"
      prevModuleLabel="Career awareness and professional development"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module8-section${section.id}`}
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
