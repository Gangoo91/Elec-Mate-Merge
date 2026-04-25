import { Brain, Crosshair, Repeat, TrendingUp, FileText, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding goals & growth mindset',
    description:
      'Fixed vs growth mindset, why goal setting matters for tradespeople, types of goals and overcoming barriers to growth.',
    icon: Brain,
    duration: '40 mins',
    link: '../gs-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Setting effective goals',
    description:
      'The SMART framework for trade careers, short/medium/long-term planning, career goals for electricians and your personal goal map.',
    icon: Crosshair,
    duration: '40 mins',
    link: '../gs-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Building habits that stick',
    description:
      'The science of habit formation, building professional habits on site, breaking bad habits and habit stacking.',
    icon: Repeat,
    duration: '40 mins',
    link: '../gs-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Tracking progress & continuous improvement',
    description:
      'Measuring progress, reflective practice, CPD and continuous professional development, and accountability systems.',
    icon: TrendingUp,
    duration: '40 mins',
    link: '../gs-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Your growth action plan',
    description:
      'Pulling it all together, creating your 90-day plan, annual review and goal resetting, and staying motivated long-term.',
    icon: FileText,
    duration: '40 mins',
    link: '../gs-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../gs-module-6',
    isExam: true,
  },
];

export default function GoalSettingGrowthCourse() {
  useSEO({
    title: 'Goal setting & continuous growth | Personal Development | Elec-Mate',
    description:
      'Goal setting, habit-building and continuous growth course for electricians. Based on FranklinCovey 7 Habits, Carol Dweck growth mindset and UK trade CPD frameworks.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Goal setting & continuous growth"
      description="Set goals, build habits and track progress — drawn from FranklinCovey 7 Habits, Carol Dweck's growth mindset research and UK trade CPD frameworks."
      tone="purple"
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
