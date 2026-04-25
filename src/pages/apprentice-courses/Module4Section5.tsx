import { Plug, FileText, Wrench, CheckCircle, Ruler, Shield, HardHat, Package } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Mounting socket outlets, switches and spurs',
    description: 'Installation techniques for common electrical accessories',
    icon: Plug,
    href: '5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Installing lighting points and pendants',
    description: 'Proper installation of lighting fixtures and pendants',
    icon: FileText,
    href: '5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Terminating twin and earth, singles and flex',
    description: 'Correct termination methods for different cable types',
    icon: Wrench,
    href: '5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Using ferrules, sleeving, glands and crimps',
    description: 'Application of cable termination accessories',
    icon: CheckCircle,
    href: '5-4',
  },
  {
    number: 'Subsection 5',
    title: 'Dressing cables neatly within boxes and enclosures',
    description: 'Professional cable management in enclosures',
    icon: Ruler,
    href: '5-5',
  },
  {
    number: 'Subsection 6',
    title: 'Testing for polarity and continuity during install',
    description: 'Basic testing procedures during installation',
    icon: Shield,
    href: '5-6',
  },
  {
    number: 'Subsection 7',
    title: 'Making final fixes to accessories',
    description: 'Completing final installation and securing of accessories',
    icon: HardHat,
    href: '5-7',
  },
  {
    number: 'Subsection 8',
    title: 'Common faults and how to correct them',
    description: 'Identifying and rectifying common installation faults',
    icon: Package,
    href: '5-8',
  },
];

const Section5 = () => {
  return (
    <SectionShell
      backTo="/study-centre/apprentice/level2/module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={5}
      title="Installing electrical accessories and terminations"
      description="Installation of sockets, switches and cable terminations."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section4"
      prevSectionLabel="Installing conduit, trunking, tray and cables"
      nextSectionHref="../section6"
      nextSectionLabel="Testing and inspecting the completed installation"
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default Section5;
