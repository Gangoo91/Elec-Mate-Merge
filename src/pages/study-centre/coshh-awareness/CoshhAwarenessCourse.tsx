import {
  BookOpen,
  Scale,
  HardHat,
  Shield,
  Siren,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding COSHH',
    description:
      'COSHH Regulations 2002, substance types, routes of exposure and health effects of hazardous substances.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../coshh-awareness-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Legislation & risk assessment',
    description:
      'Legal framework, COSHH assessment process, safety data sheets and workplace exposure limits.',
    icon: Scale,
    duration: '30 mins',
    link: '../coshh-awareness-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Hazardous substances on site',
    description:
      'Construction and electrical trade hazards, dust and fume control, and biological risks.',
    icon: HardHat,
    duration: '30 mins',
    link: '../coshh-awareness-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Control measures & PPE',
    description:
      'Hierarchy of control, engineering controls, RPE and PPE selection, storage and disposal.',
    icon: Shield,
    duration: '30 mins',
    link: '../coshh-awareness-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Monitoring, surveillance & emergencies',
    description:
      'Workplace monitoring, health surveillance, emergency procedures and record keeping.',
    icon: Siren,
    duration: '30 mins',
    link: '../coshh-awareness-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../coshh-awareness-module-6',
    isExam: true,
  },
];

export default function CoshhAwarenessCourse() {
  useSEO({
    title: 'COSHH Awareness | General Upskilling | Elec-Mate',
    description:
      'COSHH awareness training covering hazardous substances, risk assessment, control measures, PPE and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="COSHH awareness"
      description="Control of substances hazardous to health — identification, risk assessment and safe handling for tradespeople."
      tone="purple"
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
