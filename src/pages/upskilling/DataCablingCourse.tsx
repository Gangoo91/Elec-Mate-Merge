import {
  Cable,
  BookOpen,
  Wifi,
  Package,
  Wrench,
  FileCheck,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'Introduction to structured cabling systems',
    description: 'Network infrastructure fundamentals, topologies and future-proofing.',
    duration: '45 mins',
    icon: BookOpen,
    link: '../data-cabling-module-1',
  },
  {
    id: 2,
    title: 'Copper cabling standards (Cat5e, Cat6, etc.)',
    description: 'Twisted pair categories, shielding, performance and Power over Ethernet.',
    duration: '50 mins',
    icon: Cable,
    link: '../data-cabling-module-2',
  },
  {
    id: 3,
    title: 'Fibre optics: types, termination and testing',
    description: 'Singlemode vs multimode, connectors, splicing, OTDR and loss budgets.',
    duration: '60 mins',
    icon: Wifi,
    link: '../data-cabling-module-3',
  },
  {
    id: 4,
    title: 'Containment, labelling and installation best practice',
    description: 'Cable containment, separation, fire-stopping and rack organisation.',
    duration: '55 mins',
    icon: Package,
    link: '../data-cabling-module-4',
  },
  {
    id: 5,
    title: 'Termination and certification procedures',
    description: 'Termination tools, link vs channel testing and fault diagnosis.',
    duration: '50 mins',
    icon: Wrench,
    link: '../data-cabling-module-5',
  },
  {
    id: 6,
    title: 'TIA/EIA and ISO cabling standards explained',
    description: 'Class D/E/EA/F, TIA/EIA 568, ISO/IEC 11801 and documentation.',
    duration: '40 mins',
    icon: FileCheck,
    link: '../data-cabling-module-6',
  },
  {
    id: 7,
    title: 'Mock exam',
    description: 'Test your data cabling knowledge under timed exam conditions.',
    duration: '75 mins',
    icon: GraduationCap,
    link: '../data-cabling-mock-exam',
    isExam: true,
  },
];

export default function DataCablingCourse() {
  useSEO({
    title: 'Data & Communications Cabling | Professional Upskilling | Elec-Mate',
    description:
      'Structured cabling, copper categories, fibre optics, termination, certification and TIA/ISO standards for network infrastructure.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Data and communications cabling"
      description="Structured cabling, fibre optics and network infrastructure for electrical professionals."
      tone="cyan"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="6h"
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
