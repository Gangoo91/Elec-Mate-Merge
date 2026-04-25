import { Brain, Eye, MessageCircle, HeartHandshake, Shield, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding mental health',
    description:
      'What mental health really means, common conditions, risk factors in construction, and breaking the stigma.',
    icon: Brain,
    duration: '30 mins',
    link: '../mental-health-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Recognising the signs',
    description:
      'Signs in yourself and others, stress vs burnout, and crisis awareness including suicide prevention.',
    icon: Eye,
    duration: '30 mins',
    link: '../mental-health-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Starting conversations',
    description:
      'How to approach someone, active listening, the ALGEE model, and having conversations on site.',
    icon: MessageCircle,
    duration: '30 mins',
    link: '../mental-health-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Supporting others',
    description:
      'Mental health first aid in action, signposting to help, supporting recovery, and looking after yourself.',
    icon: HeartHandshake,
    duration: '30 mins',
    link: '../mental-health-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Creating a mentally healthy workplace',
    description:
      'Leadership and culture, legal framework, industry initiatives, and your personal wellbeing plan.',
    icon: Shield,
    duration: '30 mins',
    link: '../mental-health-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../mental-health-module-6',
    isExam: true,
  },
];

export default function MentalHealthCourse() {
  useSEO({
    title: 'Mental health awareness | Personal Development | Elec-Mate',
    description:
      'Mental health awareness for electricians and tradespeople. Recognising signs, starting conversations and supporting others — based on MHFA England and Mates in Mind.',
  });

  return (
    <CourseShell
      backTo="/study-centre/personal-development"
      backLabel="Personal Development"
      eyebrow="Personal Development"
      title="Mental health awareness"
      description="Recognising signs, starting conversations, and supporting others — based on MHFA England and Mates in Mind frameworks."
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
