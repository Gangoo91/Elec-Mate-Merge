import { BookOpen, Scale, Shield, HardHat, Siren, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Understanding confined spaces',
    description:
      'Legal definition, common examples, why confined spaces kill, and the statistics behind the risk.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../confined-spaces-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Legislation & risk assessment',
    description:
      'Confined Spaces Regulations 1997, risk assessment, safe systems of work and permit-to-work.',
    icon: Scale,
    duration: '30 mins',
    link: '../confined-spaces-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Hazards & atmospheric monitoring',
    description:
      'Toxic gases, oxygen depletion, flammable atmospheres, gas detection and monitoring techniques.',
    icon: Shield,
    duration: '30 mins',
    link: '../confined-spaces-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Safe entry & working procedures',
    description:
      'Entry procedures, ventilation, PPE, communication systems and working safely inside confined spaces.',
    icon: HardHat,
    duration: '30 mins',
    link: '../confined-spaces-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Emergency & rescue procedures',
    description:
      'Emergency planning, rescue equipment, casualty retrieval, first aid and incident reporting.',
    icon: Siren,
    duration: '30 mins',
    link: '../confined-spaces-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../confined-spaces-module-6',
    isExam: true,
  },
];

export default function ConfinedSpacesCourse() {
  useSEO({
    title: 'Confined spaces awareness | General upskilling | Elec-Mate',
    description:
      'Complete confined spaces awareness training covering hazard identification, safe entry procedures, atmospheric monitoring and emergency rescue.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Confined spaces awareness"
      description="Hazard identification, safe entry procedures and emergency rescue for work in confined spaces."
      tone="cyan"
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
