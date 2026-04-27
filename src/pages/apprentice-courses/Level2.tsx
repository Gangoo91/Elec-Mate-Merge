import {
  Shield,
  Zap,
  Wrench,
  HardHat,
  MessageSquare,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Health and safety in installation',
    description:
      'Legislation, common hazards, RAMS, PPE, safe isolation procedures and emergency response.',
    icon: Shield,
    link: 'module1',
  },
  {
    moduleNumber: 2,
    title: 'Principles of electrical science',
    description: "Quantities, Ohm's law, series and parallel circuits, AC/DC supply and power.",
    icon: Zap,
    link: 'module2',
  },
  {
    moduleNumber: 3,
    title: 'Installation methods and technology',
    description:
      'Wiring systems, cable types, containment, tools, environmental factors and standards.',
    icon: Wrench,
    link: 'module3',
  },
  {
    moduleNumber: 4,
    title: 'Installing wiring systems and enclosures',
    description:
      'Setting out, bending conduit, installing trunking and tray, terminations and inspection.',
    icon: HardHat,
    link: 'module4',
  },
  {
    moduleNumber: 5,
    title: 'Communicate with others within building services',
    description:
      'Site roles, statutory framework, workplace and customer information, communication methods and conflict — Unit 210.',
    icon: MessageSquare,
    link: 'module5',
  },
  {
    moduleNumber: 6,
    title: 'Mock examinations and assessment',
    description:
      'Practice exam papers and exam technique tips to build confidence for the real 2365-02 assessment.',
    icon: GraduationCap,
    link: 'module8',
    isExam: true,
  },
];

export default function Level2() {
  useSEO({
    title: 'Level 2 Electrical Installation | Apprentice Training | Elec-Mate',
    description:
      'Foundation Level 2 electrical installation training — health and safety, electrical science, installation methods, wiring systems, design, inspection and testing, fault finding and mock exams.',
  });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice training"
      eyebrow="Apprentice training"
      title="Level 2 electrical installation"
      description="Foundation electrical installation skills covering health and safety, electrical science, wiring systems, inspection and testing, and exam preparation."
      tone="emerald"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="500+"
      totalDuration="40h"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.moduleNumber}
          to={mod.link}
          moduleNumber={mod.moduleNumber}
          title={mod.title}
          description={mod.description}
          icon={mod.icon}
          isExam={mod.isExam}
          index={index}
        />
      ))}
    </CourseShell>
  );
}
