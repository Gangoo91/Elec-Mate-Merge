import {
  Scale,
  Layers,
  Wrench,
  ArrowDownToLine,
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
    title: 'Legislation & PASMA standards',
    description:
      'Work at Height Regulations 2005, HSWA 1974, EN 1004:2020, the PASMA Code of Practice and CDM 2015.',
    icon: Scale,
    duration: '35 mins',
    link: '../pasma-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Tower types & components',
    description:
      'Tower classifications, structural and safety components, selection planning and tower anatomy.',
    icon: Layers,
    duration: '35 mins',
    link: '../pasma-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Assembly methods',
    description:
      'Pre-assembly planning, the 3T Through The Trap method, the AGR Advance Guard Rail method and stability.',
    icon: Wrench,
    duration: '40 mins',
    link: '../pasma-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Dismantling, moving & storage',
    description:
      'Safe dismantling procedures, moving and repositioning, storage, maintenance and post-use checks.',
    icon: ArrowDownToLine,
    duration: '30 mins',
    link: '../pasma-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Inspection & compliance',
    description:
      'Pre-use visual checks, formal 7-day inspections, records and documentation, and the TowerSure app.',
    icon: ClipboardCheck,
    duration: '35 mins',
    link: '../pasma-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Safety, hazards & rescue',
    description:
      'Common hazards, risk assessment, rescue procedures, physical fitness and safe working practices.',
    icon: AlertTriangle,
    duration: '35 mins',
    link: '../pasma-module-6',
  },
  {
    moduleNumber: 7,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../pasma-module-7',
    isExam: true,
  },
];

export default function PasmaCourse() {
  useSEO({
    title: 'PASMA towers for users | General upskilling | Elec-Mate',
    description:
      'Complete PASMA towers for users training covering legislation, tower types, assembly methods, dismantling, inspections, safety and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="PASMA towers for users"
      description="PASMA-certified training for mobile access tower assembly, inspection and safe use."
      tone="blue"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="250+"
      totalDuration="4.5h"
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
