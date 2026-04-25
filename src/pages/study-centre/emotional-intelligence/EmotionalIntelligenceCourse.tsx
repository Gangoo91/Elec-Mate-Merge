import {
  Smile,
  Eye,
  ShieldCheck,
  Flame,
  Users,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding emotional intelligence',
    description:
      "What EI is, the science behind emotions, why EI matters in construction, and Goleman's five domains overview.",
    icon: Smile,
    duration: '40 mins',
    link: '../ei-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Self-awareness',
    description:
      'Understanding your emotions, recognising triggers, strengths and blind spots, building self-awareness habits.',
    icon: Eye,
    duration: '40 mins',
    link: '../ei-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Self-regulation',
    description:
      'Managing reactions, impulse control, adaptability and handling change, accountability and trustworthiness.',
    icon: ShieldCheck,
    duration: '40 mins',
    link: '../ei-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Motivation & empathy',
    description:
      'Internal drive, optimism and resilience, understanding empathy, reading people and perspective-taking.',
    icon: Flame,
    duration: '40 mins',
    link: '../ei-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Social skills & applying EI',
    description:
      'Communication and influence, conflict management, leadership through EI, your EI development plan.',
    icon: Users,
    duration: '40 mins',
    link: '../ei-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../ei-module-6',
    isExam: true,
  },
];

export default function EmotionalIntelligenceCourse() {
  useSEO({
    title: 'Emotional Intelligence | Personal Development | Elec-Mate',
    description:
      "Self-awareness, self-regulation, motivation, empathy, social skills and mock exam — based on Daniel Goleman's EI framework.",
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Emotional intelligence"
      description="Self-awareness, managing reactions, reading people and building stronger working relationships on site."
      tone="purple"
      level="Foundation"
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
