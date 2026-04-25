import { BookOpen, Zap, Eye, Wrench, FileText, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Introduction to portable appliance testing', description: 'PAT fundamentals, legal duties, equipment covered and inspection frequencies.', icon: BookOpen, duration: '40 mins', link: '../pat-testing-module-1' },
  { moduleNumber: 2, title: 'Class I, II and III appliances', description: 'Classification of electrical appliances and identifying the class on the unit.', icon: Zap, duration: '45 mins', link: '../pat-testing-module-2' },
  { moduleNumber: 3, title: 'Visual inspections and safety assessment', description: 'Cable, plug and fuse checks, environmental risks and risk-based test intervals.', icon: Eye, duration: '50 mins', link: '../pat-testing-module-3' },
  { moduleNumber: 4, title: 'Electrical testing methods and equipment', description: 'Earth continuity, insulation resistance, polarity, leakage tests and equipment.', icon: Wrench, duration: '55 mins', link: '../pat-testing-module-4' },
  { moduleNumber: 5, title: 'Documentation, labelling and legal requirements', description: 'Labels, asset registers, retest planning and certification.', icon: FileText, duration: '45 mins', link: '../pat-testing-module-5' },
  { moduleNumber: 6, title: 'Mock exam', description: 'Comprehensive assessment covering every PAT testing module.', icon: GraduationCap, duration: '60 mins', link: '../pat-testing-mock-exam', isExam: true },
];

export default function PATTestingCourse() {
  useSEO({
    title: 'PAT Testing Certification | Professional Upskilling | Elec-Mate',
    description:
      'Portable appliance testing procedures and certification — covering legal duties, appliance classes, visual inspection, electrical tests and documentation.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="PAT testing certification"
      description="Portable appliance testing procedures and certification for the working electrician."
      tone="yellow"
      level="Foundation"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="4h 35m"
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
