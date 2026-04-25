import { Lightbulb, Bell, Battery, Cpu, Flame, FileCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Emergency lighting design',
    description:
      'BS 5266 requirements, lux levels, duration, escape routes, open areas and high-risk task areas',
    icon: Lightbulb,
    href: '../h-n-c-module7-section2-1',
  },
  {
    number: '2.2',
    title: 'Fire alarm systems',
    description:
      'BS 5839 categories, detector types, zoning, cause and effect, voice alarm and system integration',
    icon: Bell,
    href: '../h-n-c-module7-section2-2',
  },
  {
    number: '2.3',
    title: 'Life safety power',
    description:
      'Essential supplies, safety services, fire-rated cables, switchover systems and testing requirements',
    icon: Battery,
    href: '../h-n-c-module7-section2-3',
  },
  {
    number: '2.4',
    title: 'Standby generator systems',
    description:
      'Generator sizing, fuel systems, starting sequences, AMF panels and maintenance requirements',
    icon: Cpu,
    href: '../h-n-c-module7-section2-4',
  },
  {
    number: '2.5',
    title: 'UPS systems',
    description:
      'UPS topologies, sizing calculations, battery systems, bypass arrangements and monitoring',
    icon: Flame,
    href: '../h-n-c-module7-section2-5',
  },
  {
    number: '2.6',
    title: 'Testing and compliance',
    description:
      'Periodic testing, documentation, fire risk assessment coordination and regulatory compliance',
    icon: FileCheck,
    href: '../h-n-c-module7-section2-6',
  },
];

const HNCModule7Section2 = () => {
  useSEO(
    'Emergency systems - HNC Module 7 Section 2 | Power Systems',
    'Master emergency systems: emergency lighting design, fire alarm systems, life safety power supplies, standby generators and UPS systems.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={2}
      title="Emergency systems"
      description="Design life safety systems including emergency lighting, fire alarms and standby power."
      tone="purple"
      subsectionsCount={subsections.length}
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

export default HNCModule7Section2;
