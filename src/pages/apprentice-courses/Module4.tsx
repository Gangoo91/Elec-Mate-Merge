import { HardHat, Ruler, Wrench, Package, Plug, TestTube, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Preparing to install wiring systems',
    icon: HardHat,
    description: 'Planning and preparation for electrical installation work.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Measuring, marking and setting out',
    icon: Ruler,
    description: 'Accurate measurement and marking techniques for installations.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Bending and forming conduit and trunking',
    icon: Wrench,
    description: 'Techniques for bending and shaping containment systems.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Installing conduit, trunking, tray and cables',
    icon: Package,
    description: 'Installation methods for containment systems and cable runs.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Installing electrical accessories and terminations',
    icon: Plug,
    description: 'Installation of sockets, switches and cable terminations.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Testing and inspecting the completed installation',
    icon: TestTube,
    description: 'Testing procedures and inspection of completed work.',
    href: 'section6',
  },
  {
    id: 7,
    title: 'Safe working and tool use during installation',
    icon: Shield,
    description: 'Safety practices and proper tool use during installation work.',
    href: 'section7',
  },
];

export default function Module4() {
  useSEO({
    title: 'Module 4: Installing Wiring Systems and Enclosures | Level 2 Electrical | Elec-Mate',
    description:
      'Preparation, setting out, bending conduit, installing trunking and tray, terminations, inspection and safe working.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={4}
      title="Installing wiring systems and enclosures"
      description="Hands-on installation techniques for PVC, trunking, conduit and cable tray systems."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module3"
      prevModuleLabel="Installation methods and technology"
      nextModuleHref="../module5"
      nextModuleLabel="Design, planning and communication"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
