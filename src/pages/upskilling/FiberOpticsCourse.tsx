import { BookOpen, Layers, Cable, Wrench, FileCheck, MapPin, Package, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Introduction to fibre optics', description: 'Fundamentals of fibre optic technology and applications.', icon: BookOpen, duration: '45 mins', link: '../fiber-optics-module-1' },
  { moduleNumber: 2, title: 'Fibre types and connectors', description: 'Singlemode vs multimode, OM/OS standards and connector compatibility.', icon: Layers, duration: '50 mins', link: '../fiber-optics-module-2' },
  { moduleNumber: 3, title: 'Fibre optic cables and installation', description: 'Cable types, bend radius, routing, containment and firestop.', icon: Cable, duration: '55 mins', link: '../fiber-optics-module-3' },
  { moduleNumber: 4, title: 'Termination and splicing techniques', description: 'Mechanical vs fusion splicing, cleaving, connectorisation and inspection.', icon: Wrench, duration: '60 mins', link: '../fiber-optics-module-4' },
  { moduleNumber: 5, title: 'Fibre testing and certification', description: 'Continuity, OTDR testing, pass/fail criteria and reporting.', icon: FileCheck, duration: '50 mins', link: '../fiber-optics-module-5' },
  { moduleNumber: 6, title: 'Standards and network design principles', description: 'TIA/EIA, ISO/IEC standards, loss budgets and structured cabling design.', icon: MapPin, duration: '45 mins', link: '../fiber-optics-module-6' },
  { moduleNumber: 7, title: 'Fault finding, maintenance and upgrades', description: 'Common faults, end-face cleaning, OTDR diagnostics and upgrade planning.', icon: Package, duration: '55 mins', link: '../fiber-optics-module-7' },
  { moduleNumber: 8, title: 'Mock exam', description: 'Comprehensive assessment covering every fibre optics module.', icon: GraduationCap, duration: '90 mins', link: '../fiber-optics-mock-exam', isExam: true },
];

export default function FiberOpticsCourse() {
  useSEO({
    title: 'Fibre Optics Technology | Professional Upskilling | Elec-Mate',
    description:
      'Optical fibre installation, fusion splicing and OTDR testing — covering fibre types, connectors, cables, design standards and certification.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Fibre optics technology"
      description="Optical fibre installation, fusion splicing and OTDR testing for commercial and industrial networks."
      tone="cyan"
      level="Specialist"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="6h 30m"
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
