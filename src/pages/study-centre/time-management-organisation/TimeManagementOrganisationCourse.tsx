import {
  Clock,
  CalendarDays,
  Target,
  FolderOpen,
  Repeat,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding time management',
    description:
      'Where your time goes, the Eisenhower Matrix, common time traps in construction and setting priorities.',
    icon: Clock,
    duration: '35 mins',
    link: '../tmo-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Planning & scheduling',
    description:
      'The GTD method, weekly planning, quoting and estimating time, and managing multiple jobs.',
    icon: CalendarDays,
    duration: '35 mins',
    link: '../tmo-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Focus & productivity',
    description:
      'Deep work, the Pomodoro Technique, batching and the 80/20 rule, and energy management.',
    icon: Target,
    duration: '35 mins',
    link: '../tmo-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Organisation & admin',
    description:
      'Paperwork and certificates, digital tools, van and tool organisation, and financial admin.',
    icon: FolderOpen,
    duration: '35 mins',
    link: '../tmo-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Building lasting habits',
    description:
      'The science of habit formation, creating routines, overcoming procrastination and your action plan.',
    icon: Repeat,
    duration: '35 mins',
    link: '../tmo-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../tmo-module-6',
    isExam: true,
  },
];

export default function TimeManagementOrganisationCourse() {
  useSEO({
    title: 'Time Management & Organisation | Personal Development | Elec-Mate',
    description:
      'Time management and organisation for electricians and tradespeople — GTD, Eisenhower Matrix, Pomodoro Technique and Deep Work.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Time management & organisation"
      description="Planning, scheduling, focus techniques and admin systems — based on GTD, the Eisenhower Matrix, the Pomodoro Technique and Deep Work."
      tone="indigo"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="4h"
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
