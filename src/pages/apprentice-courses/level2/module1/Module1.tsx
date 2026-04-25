import { Scale, AlertTriangle, FileCheck, Shield, Power, Phone } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'UK health and safety legislation',
    icon: Scale,
    description: 'Key health and safety laws and regulations governing electrical work.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Common electrical hazards',
    icon: AlertTriangle,
    description: 'Identifying typical electrical risks and dangers in the workplace.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Risk assessment and method statements',
    icon: FileCheck,
    description: 'Planning and documenting safe working procedures for electrical installations.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'PPE and safe working practices',
    icon: Shield,
    description: 'Selection, use and maintenance of protective equipment and safe working methods.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'Safe isolation procedures',
    icon: Power,
    description: 'Step-by-step procedures for safely isolating electrical circuits before work.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Accidents, reporting and emergency response',
    icon: Phone,
    description: 'Procedures for dealing with electrical accidents and emergency situations.',
    href: 'section6',
  },
];

export default function Module1() {
  useSEO({
    title: 'Module 1: Health and Safety | Level 2 Electrical | Elec-Mate',
    description:
      'Health and safety legislation, hazards, RAMS, PPE, safe isolation and emergency response for electrical apprentices.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={1}
      title="Health and safety in installation"
      description="Essential health and safety legislation, hazards, risk assessment, PPE, safe isolation and emergency procedures."
      tone="emerald"
      sectionsCount={sections.length}
      nextModuleHref="../module2"
      nextModuleLabel="Principles of electrical science"
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
