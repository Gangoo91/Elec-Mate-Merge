import { Brain, CloudRain, ShieldAlert, Puzzle, Building2, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding mental health & the MHFA role',
    description:
      'Mental health awareness, the MHFA role, workplace framework, communication skills and active listening.',
    icon: Brain,
    duration: '40 mins',
    link: '../mental-health-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Depression, anxiety & stress',
    description:
      'Recognising depression, anxiety disorders, workplace stress, burnout and supporting colleagues.',
    icon: CloudRain,
    duration: '45 mins',
    link: '../mental-health-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Substance misuse, self-harm & suicide',
    description:
      'Substance misuse and addiction, self-harm awareness, suicide prevention and crisis response.',
    icon: ShieldAlert,
    duration: '40 mins',
    link: '../mental-health-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Psychosis, eating disorders & complex needs',
    description:
      'Psychosis and schizophrenia, eating disorders, personality disorders, trauma and PTSD.',
    icon: Puzzle,
    duration: '40 mins',
    link: '../mental-health-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Workplace implementation & wellbeing',
    description:
      'Implementing MHFA programmes, signposting services, building healthy workplaces and self-care.',
    icon: Building2,
    duration: '40 mins',
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
    title: 'Mental Health First Aid | General Upskilling | Elec-Mate',
    description:
      'Mental Health First Aid training covering recognition, support strategies, crisis response, workplace protocols and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Mental Health First Aid"
      description="Recognise, support and respond to mental health conditions and crises in the workplace."
      tone="purple"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="3.5h"
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
