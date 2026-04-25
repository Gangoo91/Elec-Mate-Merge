import {
  BookOpen,
  Layers,
  MapPin,
  Battery,
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
    title: 'Introduction to emergency lighting',
    description: 'Purpose, legal framework, system fundamentals and BS 5266 overview.',
    duration: '40 mins',
    icon: BookOpen,
    link: '../emergency-lighting-module-1',
  },
  {
    id: 2,
    title: 'System categories and lighting types',
    description: 'Escape, anti-panic, high-risk task lighting, maintained vs non-maintained systems.',
    duration: '45 mins',
    icon: Layers,
    link: '../emergency-lighting-module-2',
  },
  {
    id: 3,
    title: 'Design requirements and placement',
    description: 'Illumination levels, escape routes, mounting heights and risk-based design.',
    duration: '50 mins',
    icon: MapPin,
    link: '../emergency-lighting-module-3',
  },
  {
    id: 4,
    title: 'Cabling, battery backup and circuiting',
    description: 'Cable specs, self-contained vs central battery, autonomy and fire integrity.',
    duration: '55 mins',
    icon: Battery,
    link: '../emergency-lighting-module-4',
  },
  {
    id: 5,
    title: 'Installation, testing and maintenance',
    description: 'Functional and 3-hour duration tests, monthly/annual schedules and handover.',
    duration: '50 mins',
    icon: Wrench,
    link: '../emergency-lighting-module-5',
  },
  {
    id: 6,
    title: 'Regulatory compliance and BS 5266',
    description: 'BS 5266-1, EN 1838, fire safety integration and audit documentation.',
    duration: '40 mins',
    icon: FileCheck,
    link: '../emergency-lighting-module-6',
  },
  {
    id: 7,
    title: 'Mock exam',
    description: 'Test your emergency lighting knowledge under timed exam conditions.',
    duration: '75 mins',
    icon: GraduationCap,
    link: '../emergency-lighting-mock-exam',
    isExam: true,
  },
];

export default function EmergencyLightingCourse() {
  useSEO({
    title: 'Emergency Lighting Systems | Professional Upskilling | Elec-Mate',
    description:
      'Emergency lighting design, installation, testing schedules and BS 5266 compliance for commercial and public buildings.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Emergency lighting systems"
      description="Emergency lighting design, testing schedules and BS 5266 compliance."
      tone="yellow"
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
