import {
  BookOpen,
  Shield,
  ArrowUpFromLine,
  FlaskConical,
  HardHat,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Introduction to CSCS & the HS&E test',
    description:
      'The CSCS scheme, card types, HS&E test format, booking procedures and study strategies.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../cscs-card-module-1',
  },
  {
    moduleNumber: 2,
    title: 'General health & safety',
    description:
      'Risk assessment, method statements, PPE, workplace welfare, toolbox talks and accident reporting.',
    icon: Shield,
    duration: '30 mins',
    link: '../cscs-card-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Working at height & manual handling',
    description:
      'Height safety regulations, access equipment, fall protection, manual handling assessment and safe lifting.',
    icon: ArrowUpFromLine,
    duration: '30 mins',
    link: '../cscs-card-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Hazardous substances & environmental',
    description:
      'COSHH, asbestos awareness, noise and vibration exposure, and environmental protection on site.',
    icon: FlaskConical,
    duration: '30 mins',
    link: '../cscs-card-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Specialist knowledge & site safety',
    description:
      'Excavations, confined spaces, fire safety, electrical safety, demolition and emergency procedures.',
    icon: HardHat,
    duration: '30 mins',
    link: '../cscs-card-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../cscs-card-module-6',
    isExam: true,
  },
];

export default function CscsCardCourse() {
  useSEO({
    title: 'CSCS Card Preparation | General Upskilling | Elec-Mate',
    description:
      'CSCS HS&E test preparation covering general safety, working at height, hazardous substances, specialist knowledge and mock exam.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="CSCS card preparation"
      description="Health, safety and environment test preparation for CSCS card applications."
      tone="green"
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
