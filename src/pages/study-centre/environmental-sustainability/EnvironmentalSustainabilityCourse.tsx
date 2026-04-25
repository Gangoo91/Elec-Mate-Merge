import {
  BookOpen,
  Recycle,
  Zap,
  CloudRain,
  TreePine,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Environmental awareness',
    description:
      'Environmental management principles, key legislation, impact assessments, and sustainability fundamentals.',
    icon: BookOpen,
    duration: '30 mins',
    link: '../environmental-sustainability-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Waste management',
    description:
      'Waste hierarchy, duty of care, hazardous waste classification, and site waste management plans.',
    icon: Recycle,
    duration: '30 mins',
    link: '../environmental-sustainability-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Energy & resource efficiency',
    description:
      'Energy use on construction sites, carbon reduction, water conservation, and sustainable materials.',
    icon: Zap,
    duration: '30 mins',
    link: '../environmental-sustainability-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Pollution prevention',
    description:
      'Air quality, water pollution, noise and vibration control, and land contamination management.',
    icon: CloudRain,
    duration: '30 mins',
    link: '../environmental-sustainability-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Biodiversity & best practice',
    description:
      'Protected species, ecological surveys, BREEAM standards, and environmental management systems.',
    icon: TreePine,
    duration: '30 mins',
    link: '../environmental-sustainability-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../environmental-sustainability-module-6',
    isExam: true,
  },
];

export default function EnvironmentalSustainabilityCourse() {
  useSEO({
    title: 'Environmental & Sustainability | General Upskilling | Elec-Mate',
    description:
      'Waste management, energy efficiency, pollution prevention, biodiversity and mock exam preparation for tradespeople on site.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="Environmental & sustainability"
      description="Waste management, energy efficiency and sustainable working practices for tradespeople on site."
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
