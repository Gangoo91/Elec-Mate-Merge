import { BookOpen, Wrench, Shield, ClipboardCheck, Siren, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding working at height',
    description:
      'WAH Regulations 2005 definition, legal framework, risk assessment and the hierarchy of controls.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../working-at-height-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Access equipment & selection',
    description:
      'Ladders, stepladders, scaffolding, MEWPs, podium steps and equipment selection criteria.',
    icon: Wrench,
    duration: '30 mins',
    link: '../working-at-height-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Fall protection & prevention',
    description:
      'Collective fall prevention, personal fall protection systems, fragile surfaces and equipment inspection.',
    icon: Shield,
    duration: '30 mins',
    link: '../working-at-height-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Safe systems of work',
    description:
      'Planning, permit-to-work systems, method statements, rescue plans and environmental considerations.',
    icon: ClipboardCheck,
    duration: '30 mins',
    link: '../working-at-height-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Incident response & responsibilities',
    description:
      'Emergency procedures, RIDDOR reporting, roles and competence, inspection regimes and record keeping.',
    icon: Siren,
    duration: '30 mins',
    link: '../working-at-height-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../working-at-height-module-6',
    isExam: true,
  },
];

export default function WorkingAtHeightCourse() {
  useSEO({
    title: 'Working at Height | General Upskilling | Elec-Mate',
    description:
      'Working at height training covering risk assessment, fall prevention, access equipment, safe systems of work and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Working at height"
      description="Risk assessment, fall prevention and safe practices for working at height on site."
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
