import { BookOpen, Wrench, GraduationCap, ClipboardCheck, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'How people learn',
    description:
      "Adult learning theory, Kolb's experiential cycle, scaffolding and the zone of proximal development, motivation and barriers.",
    icon: BookOpen,
    duration: '40 mins',
    link: '../md-module-1',
  },
  {
    moduleNumber: 2,
    title: "The mentor's toolkit",
    description:
      'The GROW model, questioning techniques, giving effective feedback, building trust and the mentoring relationship.',
    icon: Wrench,
    duration: '40 mins',
    link: '../md-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Supporting apprentices',
    description:
      'JIB apprenticeship framework, NVQ evidence and portfolio building, planning learning on site, apprentice wellbeing.',
    icon: GraduationCap,
    duration: '40 mins',
    link: '../md-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Assessment & evaluation',
    description:
      "Principles of assessment (VACSR), observation and questioning, Kirkpatrick's four levels, giving assessment decisions.",
    icon: ClipboardCheck,
    duration: '40 mins',
    link: '../md-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Challenging situations & professional growth',
    description:
      'Difficult mentoring situations, maintaining motivation, diversity and inclusion, your development as a mentor.',
    icon: Shield,
    duration: '40 mins',
    link: '../md-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../md-module-6',
    isExam: true,
  },
];

export default function MentoringDevelopingOthersCourse() {
  useSEO({
    title: 'Mentoring & developing others | Personal Development | Elec-Mate',
    description:
      'Mentoring course covering adult learning theory, coaching models, apprentice support, assessment and professional growth — based on ILM coaching and JIB apprenticeship standards.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal Development"
      eyebrow="Personal Development"
      title="Mentoring & developing others"
      description="How people learn, giving feedback, supporting apprentices — based on ILM coaching and JIB apprenticeship standards."
      tone="indigo"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="5h"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.moduleNumber}
          to={mod.link}
          moduleNumber={mod.moduleNumber}
          title={mod.title}
          description={mod.description}
          icon={mod.icon}
          duration={mod.duration}
          isExam={mod.isExam}
          index={index}
        />
      ))}
    </CourseShell>
  );
}
