import {
  Scale,
  Layers,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Legislation & responsibilities',
    description:
      'Work at Height Regulations, HSWA 1974, CDM 2015, BS EN 1004 and PASMA competence requirements.',
    icon: Scale,
    duration: '30 mins',
    link: '../ipaf-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Tower types & components',
    description:
      'Standard, GRP and folding towers — components, stability, safe working loads and tower selection.',
    icon: Layers,
    duration: '35 mins',
    link: '../ipaf-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Assembly & dismantling',
    description:
      '3T and AGR assembly methods, planning, preparation and safe dismantling procedures.',
    icon: Wrench,
    duration: '40 mins',
    link: '../ipaf-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Inspection & maintenance',
    description:
      'Pre-use checks, formal inspections, common defects and documentation requirements.',
    icon: ClipboardCheck,
    duration: '30 mins',
    link: '../ipaf-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Hazards, risk assessment & rescue',
    description:
      'Common hazards, 5-step risk assessment, rescue procedures and moving towers safely.',
    icon: AlertTriangle,
    duration: '35 mins',
    link: '../ipaf-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../ipaf-module-6',
    isExam: true,
  },
];

export default function IpafCourse() {
  useSEO({
    title: 'IPAF Mobile Scaffold Training | General Upskilling | Elec-Mate',
    description:
      'Complete IPAF mobile access tower training — legislation, tower types, assembly methods, inspections, hazards and mock exam.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="IPAF mobile scaffold training"
      description="Safe assembly, use, inspection and dismantling of mobile access towers."
      tone="emerald"
      level="Foundation"
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
