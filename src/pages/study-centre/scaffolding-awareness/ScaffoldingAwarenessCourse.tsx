import {
  BookOpen,
  Scale,
  Wrench,
  ClipboardCheck,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Introduction to scaffolding',
    description:
      'Types of scaffolding, terminology, components and their roles in construction safety.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../scaffolding-awareness-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Scaffold regulations & standards',
    description:
      'Work at Height Regulations 2005, NASC guidance, TG20 compliance and BS EN 12811.',
    icon: Scale,
    duration: '30 mins',
    link: '../scaffolding-awareness-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Scaffold components & assembly',
    description:
      'Standards, ledgers, transoms, braces, base plates, sole boards and safe assembly sequences.',
    icon: Wrench,
    duration: '30 mins',
    link: '../scaffolding-awareness-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Scaffold inspection & tagging',
    description:
      '7-day inspections, scaffold tags, competent person requirements and inspection records.',
    icon: ClipboardCheck,
    duration: '30 mins',
    link: '../scaffolding-awareness-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Safe use & hazard awareness',
    description:
      'Working safely on scaffolds, loading limits, weather conditions and common hazards.',
    icon: ShieldCheck,
    duration: '30 mins',
    link: '../scaffolding-awareness-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../scaffolding-awareness-module-6',
    isExam: true,
  },
];

export default function ScaffoldingAwarenessCourse() {
  useSEO({
    title: 'Scaffolding Awareness | General Upskilling | Elec-Mate',
    description:
      'Scaffolding awareness training covering scaffold safety, inspection, hazard awareness and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Scaffolding awareness"
      description="Scaffold safety, inspection requirements and hazard awareness on site."
      tone="emerald"
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
