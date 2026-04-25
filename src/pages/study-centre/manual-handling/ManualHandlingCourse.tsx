import {
  BookOpen,
  Dumbbell,
  Shield,
  HardHat,
  Siren,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding manual handling',
    description:
      'MHOR 1992 definition, injury statistics, the legal framework, risk assessment principles and spinal anatomy.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../manual-handling-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Principles of safe lifting',
    description:
      'Kinetic lifting technique, pushing and pulling, team handling and managing awkward loads.',
    icon: Dumbbell,
    duration: '30 mins',
    link: '../manual-handling-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Risk assessment & reduction',
    description:
      'The TILE framework, hazard identification, mechanical aids and designing out manual handling.',
    icon: Shield,
    duration: '30 mins',
    link: '../manual-handling-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Workplace-specific handling',
    description:
      'Electrical materials, construction environments, confined spaces and repetitive handling risks.',
    icon: HardHat,
    duration: '30 mins',
    link: '../manual-handling-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Health, welfare & responsibilities',
    description:
      'Musculoskeletal disorders, fitness and fatigue, incident reporting and legal responsibilities.',
    icon: Siren,
    duration: '30 mins',
    link: '../manual-handling-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../manual-handling-module-6',
    isExam: true,
  },
];

export default function ManualHandlingCourse() {
  useSEO({
    title: 'Manual Handling | General Upskilling | Elec-Mate',
    description:
      'Complete manual handling training — safe lifting techniques, risk assessment, injury prevention and mock exam.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Manual handling"
      description="Safe lifting techniques, risk assessment and injury prevention for tradespeople on site."
      tone="emerald"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="3h"
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
