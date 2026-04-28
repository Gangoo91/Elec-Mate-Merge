import {
  FileText,
  CheckCircle,
  BookOpen,
  Book,
  Settings,
  Shield,
  Wrench,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'Scope, object and fundamental principles',
    description: 'Foundational principles, scope and the legal framework of BS 7671.',
    duration: '45 mins',
    icon: BookOpen,
    link: '../bs7671-module-1',
  },
  {
    id: 2,
    title: 'Definitions and key terminology',
    description:
      'Essential vocabulary including CPC, ADS, SELV, PELV, PNB and the Amendment 4 (2026) term updates.',
    duration: '50 mins',
    icon: Book,
    link: '../bs7671-module-2',
  },
  {
    id: 3,
    title: 'General characteristics and selection criteria',
    description: 'Supply systems, earthing arrangements, voltage drop and design fundamentals.',
    duration: '55 mins',
    icon: Settings,
    link: '../bs7671-module-3',
  },
  {
    id: 4,
    title: 'Protection for safety',
    description:
      'Shock, overcurrent, RCDs, SPDs, AFDDs, bidirectional protection and the new Reg 411.3.4 luminaire RCD requirement.',
    duration: '60 mins',
    icon: Shield,
    link: '../bs7671-module-4',
  },
  {
    id: 5,
    title: 'Selection and erection of equipment',
    description:
      'Equipment ratings, cable selection, containment, isolation, ICT functional earthing (Section 545) and the new Chapter 57 stationary battery requirements.',
    duration: '65 mins',
    icon: Wrench,
    link: '../bs7671-module-5',
  },
  {
    id: 6,
    title: 'Inspection, testing and certification',
    description: 'Initial verification, sequence of tests, model forms and common pitfalls.',
    duration: '55 mins',
    icon: CheckCircle,
    link: '../bs7671-module-6',
  },
  {
    id: 7,
    title: 'Special installations and locations',
    description:
      'Bathrooms, EV charging (Part 722), agricultural, medical (revised Section 710), prosumer installations and the new Section 716 Power over Ethernet.',
    duration: '50 mins',
    icon: MapPin,
    link: '../bs7671-module-7',
  },
  {
    id: 8,
    title: 'Reference materials and Amendment 4 (2026)',
    description:
      'Appendices, Zs tables, conductor sizing, the new Chapter 81 (energy efficiency), revised Appendix 4 buried-cable methods and the full A4:2026 highlights.',
    duration: '45 mins',
    icon: FileText,
    link: '../bs7671-module-8',
  },
  {
    id: 9,
    title: 'Mock exam',
    description: 'Comprehensive practice examination plus hints and tips for success.',
    duration: '90 mins',
    icon: GraduationCap,
    link: '../bs7671-module-9',
    isExam: true,
  },
];

export default function BS7671Course() {
  useSEO({
    title: '18th Edition BS 7671 | Professional Upskilling | Elec-Mate',
    description:
      'BS 7671:2018+A4:2026 wiring regulations — current edition in force from 15 April 2026. Protection, special installations, Chapter 57 batteries, Section 716 PoE, Chapter 81 energy efficiency and the full Amendment 4 update.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling · Updated for A4:2026"
      title="18th edition (BS 7671)"
      description="BS 7671:2018+A4:2026 wiring regulations — current edition in force from 15 April 2026."
      tone="yellow"
      level="Advanced"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="8h"
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
