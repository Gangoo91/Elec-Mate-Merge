import {
  BookOpen,
  Shield,
  Link2,
  Zap,
  CircleDot,
  FileCheck,
  ToggleRight,
  Eye,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'Introduction to inspection & testing',
    description:
      'Purpose, legal duties, BS 7671 overview, test equipment selection and safety fundamentals.',
    duration: '45 mins',
    icon: BookOpen,
    link: '../inspection-testing/module-1',
  },
  {
    id: 2,
    title: 'Safe isolation procedures',
    description:
      'Isolation principles, lock-off and tag-out, proving dead and safe re-energisation.',
    duration: '50 mins',
    icon: Shield,
    link: '../inspection-testing/module-2',
  },
  {
    id: 3,
    title: 'Continuity testing',
    description:
      'R1+R2, ring final circuits, bonding conductors and low-resistance measurement techniques.',
    duration: '55 mins',
    icon: Link2,
    link: '../inspection-testing/module-3',
  },
  {
    id: 4,
    title: 'Insulation resistance testing',
    description:
      'Test voltages, procedures, SERDs, interpreting results and troubleshooting low insulation.',
    duration: '55 mins',
    icon: Zap,
    link: '../inspection-testing/module-4',
  },
  {
    id: 5,
    title: 'Earth fault loop impedance',
    description:
      'Zs and Ze testing, maximum values from BS 7671, PFC calculation and RCD-protected circuits.',
    duration: '60 mins',
    icon: CircleDot,
    link: '../inspection-testing/module-5',
  },
  {
    id: 6,
    title: 'RCD testing',
    description:
      'RCD types, trip-time testing, ramp testing and selective discrimination.',
    duration: '45 mins',
    icon: FileCheck,
    link: '../inspection-testing/module-6',
  },
  {
    id: 7,
    title: 'Polarity & functional testing',
    description:
      'Polarity verification, three-phase rotation and switchgear functional testing.',
    duration: '45 mins',
    icon: ToggleRight,
    link: '../inspection-testing/module-7',
  },
  {
    id: 8,
    title: 'Visual inspection & documentation',
    description:
      'Inspection checklists, EICs, periodic inspection reports and minor works certificates.',
    duration: '50 mins',
    icon: Eye,
    link: '../inspection-testing/module-8',
  },
  {
    id: 9,
    title: 'Mock exam',
    description:
      '300-question bank with 30 random questions per attempt to test your knowledge.',
    duration: '45 mins',
    icon: GraduationCap,
    link: '../inspection-testing-mock-exam',
    isExam: true,
  },
];

export default function InspectionTesting() {
  useSEO({
    title: 'Inspection & Testing | Professional Upskilling | Elec-Mate',
    description:
      'BS 7671 inspection and testing course covering safe isolation, continuity, insulation resistance, earth fault loop, RCD testing, polarity and certification.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Inspection & testing"
      description="Master BS 7671 inspection and testing procedures from safe isolation through to certification."
      tone="purple"
      level="Advanced"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="7h"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.id}
          to={mod.link}
          moduleNumber={mod.id}
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
