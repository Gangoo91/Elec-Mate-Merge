import {
  BookOpen,
  Scale,
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
    title: 'Understanding fire',
    description:
      'The fire triangle, classes of fire, fire behaviour and how fires start in the workplace.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../fire-safety-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Fire safety legislation',
    description:
      'Regulatory Reform (Fire Safety) Order 2005, responsible person duties and fire risk assessment.',
    icon: Scale,
    duration: '30 mins',
    link: '../fire-safety-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Fire prevention & detection',
    description:
      'Fire prevention measures, detection systems, alarm systems and emergency lighting.',
    icon: Shield,
    duration: '30 mins',
    link: '../fire-safety-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Fire marshal duties & evacuation',
    description:
      'Fire marshal role, evacuation procedures, assembly points and personal emergency evacuation plans.',
    icon: HardHat,
    duration: '30 mins',
    link: '../fire-safety-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Firefighting equipment & incident response',
    description:
      'Fire extinguisher types, fire blankets, hose reels, incident reporting and investigation.',
    icon: Siren,
    duration: '30 mins',
    link: '../fire-safety-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../fire-safety-module-6',
    isExam: true,
  },
];

export default function FireSafetyCourse() {
  useSEO({
    title: 'Fire Safety & Fire Marshal | General Upskilling | Elec-Mate',
    description:
      'Fire prevention, evacuation procedures, extinguisher use, fire marshal responsibilities and mock exam preparation for tradespeople on site.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Fire safety & fire marshal"
      description="Fire prevention, evacuation procedures and fire marshal responsibilities for tradespeople on site."
      tone="amber"
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
