import { Calculator, FileText, Laptop, Wrench, Target, Award } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Mathematics for electricians',
    description:
      'Number systems, units, algebra, data handling and practical calculations for electrical work.',
    icon: Calculator,
    duration: '1h',
    link: '/study-centre/apprentice/functional-skills/module1',
  },
  {
    moduleNumber: 2,
    title: 'English for electricians',
    description:
      'Technical reading, writing, communication skills and professional documentation for the trade.',
    icon: FileText,
    duration: '1h',
    link: '/study-centre/apprentice/functional-skills/module2',
  },
  {
    moduleNumber: 3,
    title: 'Digital skills for electricians',
    description:
      'Computer basics, spreadsheets, digital documentation, apps and online safety.',
    icon: Laptop,
    duration: '1h',
    link: '/study-centre/apprentice/functional-skills/module3',
  },
  {
    moduleNumber: 4,
    title: 'Practical mathematics applications',
    description:
      'Electrical calculations, cable sizing, costing, quoting and geometry for installation work.',
    icon: Wrench,
    duration: '1h',
    link: '/study-centre/apprentice/functional-skills/module4',
  },
  {
    moduleNumber: 5,
    title: 'Assessment preparation',
    description:
      'Level 1 and Level 2 practice, study techniques, exam skills and portfolio building.',
    icon: Target,
    duration: '1h',
    link: '/study-centre/apprentice/functional-skills/module5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description:
      '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: Award,
    duration: '30 mins',
    link: '/study-centre/apprentice/functional-skills/module6',
    isExam: true,
  },
];

export default function FunctionalSkills() {
  useSEO({
    title: 'Functional Skills | Apprentice Training | Elec-Mate',
    description:
      'Functional skills training in maths, English and IT designed for electrical apprentices — five content modules and a final mock exam.',
  });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice training"
      eyebrow="Apprentice training"
      title="Functional skills"
      description="Maths, English and digital skills tailored for electrical apprentices, with practical examples drawn from the trade."
      tone="yellow"
      level="Essential"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="5h"
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
