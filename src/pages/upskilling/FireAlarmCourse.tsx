import { Layers, Search, MapPin, Battery, Wrench, FileCheck, BookOpen, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Categories of fire alarm systems', description: 'L, P and M categories under BS 5839-1 and how to choose the right system for the building.', icon: Layers, duration: '2-3 hours', link: 'module-1' },
  { moduleNumber: 2, title: 'Detectors, call points and devices', description: 'Smoke, heat and multisensor detectors, call points, sounders and visual alarm devices.', icon: Search, duration: '3-4 hours', link: 'module-2' },
  { moduleNumber: 3, title: 'System design and zone planning', description: 'Zone layouts, addressable vs conventional, cause and effect programming and interfaces.', icon: MapPin, duration: '3-4 hours', link: 'module-3' },
  { moduleNumber: 4, title: 'Power supply, backup and cabling', description: 'Battery sizing, fire-resistant cables, wiring methods and earth fault monitoring.', icon: Battery, duration: '2-3 hours', link: 'module-4' },
  { moduleNumber: 5, title: 'Installation and commissioning', description: 'Planning, panel and device installation, wiring, commissioning and handover.', icon: Wrench, duration: '3-4 hours', link: 'module-5' },
  { moduleNumber: 6, title: 'Testing, servicing and certification', description: 'Routine testing, servicing, fault finding, record keeping and certification.', icon: FileCheck, duration: '3-4 hours', link: 'module-6' },
  { moduleNumber: 7, title: 'Regulatory compliance and BS 5839', description: 'Fire safety legislation, Building Regulations and BS 5839 parts 1 and 6.', icon: BookOpen, duration: '2-3 hours', link: 'module-7' },
  { moduleNumber: 8, title: 'Mock exam', description: 'Comprehensive assessment covering every fire alarm module.', icon: GraduationCap, duration: '90 mins', link: 'mock-exam', isExam: true },
];

export default function FireAlarmCourse() {
  useSEO({
    title: 'Fire Alarm Systems | Professional Upskilling | Elec-Mate',
    description:
      'Fire alarm system design, installation and maintenance to BS 5839-1 and BS 5839-6 — categories, detectors, design, power, installation, testing and compliance.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Fire alarm systems"
      description="Design, install and maintain fire detection and alarm systems to BS 5839-1 and BS 5839-6."
      tone="red"
      level="Specialist"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="20h"
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
