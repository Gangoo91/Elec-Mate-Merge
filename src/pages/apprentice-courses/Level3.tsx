import {
  Shield,
  Leaf,
  Zap,
  Search,
  TestTube,
  DraftingCompass,
  Users,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Health and safety in building services engineering',
    description: 'Advanced health and safety practices for complex electrical work environments.',
    icon: Shield,
    duration: '60 mins',
    link: '../level3-module1',
  },
  {
    moduleNumber: 2,
    title: 'Environmental technology systems',
    description: 'Energy-efficient systems, renewable technologies and environmental compliance.',
    icon: Leaf,
    duration: '60 mins',
    link: '../level3-module2',
  },
  {
    moduleNumber: 3,
    title: 'Electrical science principles',
    description: 'Advanced electrical theory, AC/DC circuits and complex electrical calculations.',
    icon: Zap,
    duration: '60 mins',
    link: '../level3-module3',
  },
  {
    moduleNumber: 4,
    title: 'Fault diagnosis and rectification',
    description: 'Advanced fault-finding techniques and systematic problem-solving methods.',
    icon: Search,
    duration: '60 mins',
    link: '../level3-module4',
  },
  {
    moduleNumber: 5,
    title: 'Inspection, testing and commissioning',
    description: 'Testing procedures, commissioning protocols and BS 7671 compliance verification.',
    icon: TestTube,
    duration: '60 mins',
    link: '../level3-module5',
  },
  {
    moduleNumber: 6,
    title: 'Electrical systems design',
    description: 'Design principles, load calculations and electrical system specification.',
    icon: DraftingCompass,
    duration: '60 mins',
    link: '../level3-module6',
  },
  {
    moduleNumber: 7,
    title: 'Career awareness and professional development',
    description: 'Professional standards, career progression and continuing professional development.',
    icon: Users,
    duration: '50 mins',
    link: '../level3-module7',
  },
  {
    moduleNumber: 8,
    title: 'Mock exams and assessment',
    description: 'Mock examinations, practical guidance and exam techniques for the Level 3 qualification.',
    icon: GraduationCap,
    duration: '60 mins',
    link: '../level3-module8',
    isExam: true,
  },
];

export default function Level3() {
  useSEO({
    title: 'Level 3 Electrical Installation | Apprentice Training | Elec-Mate',
    description:
      'Level 3 electrical installation course covering health and safety, environmental technology, electrical science, fault diagnosis, inspection and testing, design and professional development.',
  });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice training"
      eyebrow="Apprentice training"
      title="Level 3 electrical installation"
      description="Advanced electrical installation techniques, science, design, inspection and professional development for the Level 3 qualification."
      tone="blue"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="500+"
      totalDuration="8h"
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
