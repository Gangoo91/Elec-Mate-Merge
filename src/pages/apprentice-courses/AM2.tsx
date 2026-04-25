import { BookOpen, Shield, Wrench, TestTube, Search, Monitor, Trophy, Award } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Introduction to the AM2', description: 'Purpose, structure, marking criteria and common reasons candidates fail.', icon: BookOpen, duration: '2h', link: 'module1' },
  { moduleNumber: 2, title: 'Health, safety and documentation', description: 'Safe isolation, RAMS, drawings and paperwork under exam pressure.', icon: Shield, duration: '2h', link: 'module2' },
  { moduleNumber: 3, title: 'Installation tasks', description: 'Cable selection, power and lighting circuits, containment and time management.', icon: Wrench, duration: '3h', link: 'module3' },
  { moduleNumber: 4, title: 'Inspection and testing', description: 'Test sequence, instruments, certification and reporting non-compliances.', icon: TestTube, duration: '3h', link: 'module4' },
  { moduleNumber: 5, title: 'Fault diagnosis and rectification', description: 'Logical fault-finding, test equipment use and re-testing procedures.', icon: Search, duration: '2h', link: 'module5' },
  { moduleNumber: 6, title: 'Online knowledge test', description: 'Test format, core topics, time management and exam techniques.', icon: Monitor, duration: '1.5h', link: 'module6' },
  { moduleNumber: 7, title: 'Exam strategy and success tips', description: 'Time management, coping with pressure and avoiding common mistakes.', icon: Trophy, duration: '1.5h', link: 'module7' },
  { moduleNumber: 8, title: 'Full mock AM2 assessment', description: 'Simulated knowledge test with 30 questions from a 400-question bank.', icon: Award, duration: '1.5h', link: 'module8', isExam: true },
];

export default function AM2() {
  useSEO({
    title: 'AM2 Preparation & Guidance | Apprentice Training | Elec-Mate',
    description:
      'Complete AM2 preparation covering installation, inspection, testing, fault diagnosis, exam strategy and a full mock assessment.',
  });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice training"
      eyebrow="Apprentice training"
      title="AM2 preparation & guidance"
      description="The complete AM2 practical assessment preparation. Master safe isolation, installation, inspection, testing and fault diagnosis to pass first time."
      tone="yellow"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="40+"
      totalDuration="~16.5h"
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
