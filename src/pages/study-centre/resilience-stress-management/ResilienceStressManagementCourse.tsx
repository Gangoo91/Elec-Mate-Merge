import { Zap, Shield, Wind, HeartPulse, Moon, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding stress',
    description:
      'What stress is, the stress-performance curve, stress in construction, and recognising the signs.',
    icon: Zap,
    duration: '35 mins',
    link: '../rsm-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Understanding resilience',
    description:
      'What resilience is, the science behind it, protective factors, and knowing your triggers.',
    icon: Shield,
    duration: '35 mins',
    link: '../rsm-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Coping strategies & mindfulness',
    description:
      'MBSR techniques, practical mindfulness, cognitive reframing, and problem-focused vs emotion-focused coping.',
    icon: Wind,
    duration: '35 mins',
    link: '../rsm-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Building daily resilience',
    description:
      'Physical wellbeing, social connection, healthy boundaries, and managing financial stress.',
    icon: HeartPulse,
    duration: '35 mins',
    link: '../rsm-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Switching off & sustaining wellbeing',
    description:
      'The importance of recovery, switching off after work, recognising burnout, and your personal action plan.',
    icon: Moon,
    duration: '35 mins',
    link: '../rsm-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../rsm-module-6',
    isExam: true,
  },
];

export default function ResilienceStressManagementCourse() {
  useSEO({
    title: 'Resilience & Stress Management | Personal Development | Elec-Mate',
    description:
      'Resilience and stress management training for electricians and tradespeople — MBSR, CBT, HSE Management Standards and Mates in Mind.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal development"
      eyebrow="Personal development"
      title="Resilience & stress management"
      description="Managing pressure, bouncing back and switching off — based on MBSR, CBT, HSE Management Standards and Mates in Mind."
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
