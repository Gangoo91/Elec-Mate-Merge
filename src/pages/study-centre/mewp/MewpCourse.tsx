import {
  Scale,
  Search,
  Wrench,
  ShieldAlert,
  LifeBuoy,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Introduction, legislation & MEWP types',
    description:
      'Work at Height Regulations 2005, LOLER, PUWER, IPAF categories, scissor lifts, boom lifts, spider lifts and power sources.',
    icon: Scale,
    duration: '35 mins',
    link: '../mewp-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Risk assessment, planning & selection',
    description:
      'Risk assessment process, the six key hazards, machine selection criteria, ground conditions and weather limits.',
    icon: Search,
    duration: '35 mins',
    link: '../mewp-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Pre-use inspections, setup & fall protection',
    description:
      'Pre-use inspection checklist, thorough examination, outrigger setup, harnesses, lanyards and PPE.',
    icon: Wrench,
    duration: '40 mins',
    link: '../mewp-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Safe operating procedures',
    description:
      'Operating controls, travelling, elevating, platform loading, power lines, exclusion zones and banksman duties.',
    icon: ShieldAlert,
    duration: '35 mins',
    link: '../mewp-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Emergency procedures, rescue & reporting',
    description:
      'Emergency scenarios, lowering systems, rescue procedures, RIDDOR reporting and lessons learnt.',
    icon: LifeBuoy,
    duration: '35 mins',
    link: '../mewp-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../mewp-module-6',
    isExam: true,
  },
];

export default function MewpCourse() {
  useSEO({
    title: 'MEWP operator training | General upskilling | Elec-Mate',
    description:
      'Complete MEWP operator training covering legislation, risk assessment, inspections, safe operation, emergency procedures and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="MEWP operator training"
      description="Mobile elevating work platform operation, safety, pre-use inspections and emergency procedures."
      tone="emerald"
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
