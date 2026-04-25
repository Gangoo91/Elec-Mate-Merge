import { BookOpen, Users, FileText, PenTool, HardHat, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Introduction to CDM 2015',
    description:
      'What the CDM Regulations are, their history and evolution, key definitions, and when they apply.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../cdm-regulations-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Duty holders & their roles',
    description:
      'Client, principal designer, principal contractor, designers, contractors and worker responsibilities.',
    icon: Users,
    duration: '30 mins',
    link: '../cdm-regulations-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Pre-construction & planning',
    description:
      'Pre-construction information, construction phase plans, health and safety files, and HSE notification.',
    icon: FileText,
    duration: '30 mins',
    link: '../cdm-regulations-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Design & risk management',
    description:
      "Designers' duties, risk assessment in design, buildability, maintainability and coordination.",
    icon: PenTool,
    duration: '30 mins',
    link: '../cdm-regulations-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Construction phase & compliance',
    description:
      'Managing the construction phase, site inductions, welfare facilities, monitoring and enforcement.',
    icon: HardHat,
    duration: '30 mins',
    link: '../cdm-regulations-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../cdm-regulations-module-6',
    isExam: true,
  },
];

export default function CdmRegulationsCourse() {
  useSEO({
    title: 'CDM regulations awareness | General upskilling | Elec-Mate',
    description:
      'Complete CDM 2015 awareness training covering duty holders, pre-construction planning, design risk management and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="CDM regulations awareness"
      description="Construction Design and Management regulations, roles and responsibilities for all tradespeople."
      tone="blue"
      level="Intermediate"
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
