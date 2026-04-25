import {
  BookOpen,
  Zap,
  Calculator,
  Shield,
  BarChart,
  Wrench,
  Award,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'Introduction to EV charging infrastructure',
    description: 'EV charging fundamentals, market hardware and installer responsibilities.',
    duration: '40 mins',
    icon: BookOpen,
    link: '../ev-charging-module-1',
  },
  {
    id: 2,
    title: 'EVSE types, modes and standards',
    description: 'Modes 1–4, socketed vs tethered, smart chargers, IEC 61851 and 62196.',
    duration: '50 mins',
    icon: Zap,
    link: '../ev-charging-module-2',
  },
  {
    id: 3,
    title: 'Electrical design and load calculation',
    description: 'Load estimation, diversity, cable sizing, RCDs and future-proofing.',
    duration: '55 mins',
    icon: Calculator,
    link: '../ev-charging-module-3',
  },
  {
    id: 4,
    title: 'Earthing and protection considerations',
    description: 'TT, TN-S, TN-C-S, open PEN protection, earth rods and surge protection.',
    duration: '45 mins',
    icon: Shield,
    link: '../ev-charging-module-4',
  },
  {
    id: 5,
    title: 'Load management and diversity in EV systems',
    description: 'Dynamic load management, EV/PV/battery integration via HEMS and off-peak strategies.',
    duration: '50 mins',
    icon: BarChart,
    link: '../ev-charging-module-5',
  },
  {
    id: 6,
    title: 'Installation, inspection and testing procedures',
    description: 'Site prep, BS 7671 Part 722 testing, RCD types and customer handover.',
    duration: '60 mins',
    icon: Wrench,
    link: '../ev-charging-module-6',
  },
  {
    id: 7,
    title: 'Government incentives and certification (OZEV, etc.)',
    description: 'OZEV scheme, approved installer registration, grants and audit-readiness.',
    duration: '35 mins',
    icon: Award,
    link: '../ev-charging-module-7',
  },
  {
    id: 8,
    title: 'Mock exam',
    description: 'Test your EV charging knowledge under timed exam conditions.',
    duration: '90 mins',
    icon: GraduationCap,
    link: '../ev-charging-mock-exam',
    isExam: true,
  },
];

export default function EVChargingCourse() {
  useSEO({
    title: 'EV Charging Installation | Professional Upskilling | Elec-Mate',
    description:
      'EV charging infrastructure installation, BS 7671 Part 722, OZEV grants and load management for electrical installers.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="EV charging installation"
      description="EV charging infrastructure installation, maintenance and safety protocols."
      tone="green"
      level="Intermediate"
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
