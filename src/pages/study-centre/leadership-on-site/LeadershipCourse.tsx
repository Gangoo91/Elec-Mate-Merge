import {
  Compass,
  Users,
  MessageCircle,
  Lightbulb,
  HardHat,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'What makes a leader?',
    description:
      'Leadership vs management, leadership styles, self-awareness and the mate-to-manager transition.',
    icon: Compass,
    duration: '35 mins',
    link: '../leadership-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Leading your team',
    description:
      'Building trust, delegating effectively, motivating people and giving feedback that sticks.',
    icon: Users,
    duration: '35 mins',
    link: '../leadership-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Communication for leaders',
    description:
      'Toolbox talks, active listening, difficult conversations and professional written communication.',
    icon: MessageCircle,
    duration: '35 mins',
    link: '../leadership-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Decision-making & problem-solving',
    description:
      'Making decisions under pressure, problem-solving frameworks, managing conflict and accountability.',
    icon: Lightbulb,
    duration: '35 mins',
    link: '../leadership-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Leading on site',
    description:
      'Planning work, managing subcontractors, safety leadership and supporting apprentices.',
    icon: HardHat,
    duration: '35 mins',
    link: '../leadership-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../leadership-module-6',
    isExam: true,
  },
];

export default function LeadershipCourse() {
  useSEO({
    title: 'Leadership on Site | Personal Development | Elec-Mate',
    description:
      'Complete leadership course for electricians and tradespeople — based on ILM Level 2 team leading and CITB SSSTS principles.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Leadership on site"
      description="Delegating, decision-making, earning respect and leading teams — based on ILM Level 2 team leading and CITB SSSTS principles."
      tone="purple"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="6h"
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
