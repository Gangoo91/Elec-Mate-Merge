import { Building2, BarChart2, Handshake, HardHat, Leaf, CheckCircle2 } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Site organisation',
    description:
      'Site facilities, welfare provisions, security arrangements, access control and temporary services coordination',
    icon: Building2,
    href: '../h-n-c-module5-section6-1',
  },
  {
    number: '6.2',
    title: 'Progress monitoring',
    description:
      'Site diaries, progress reports, programme updates, progress meetings and performance measurement',
    icon: BarChart2,
    href: '../h-n-c-module5-section6-2',
  },
  {
    number: '6.3',
    title: 'Interface coordination',
    description:
      'Coordination with other trades, client operations interface, occupied premises and live services management',
    icon: Handshake,
    href: '../h-n-c-module5-section6-3',
  },
  {
    number: '6.4',
    title: 'CDM site compliance',
    description:
      'Construction phase plan requirements, site inductions, toolbox talks and CDM 2015 compliance procedures',
    icon: HardHat,
    href: '../h-n-c-module5-section6-4',
  },
  {
    number: '6.5',
    title: 'Environmental management',
    description:
      'Waste management, noise control, dust suppression, permit requirements and environmental compliance',
    icon: Leaf,
    href: '../h-n-c-module5-section6-5',
  },
  {
    number: '6.6',
    title: 'Practical completion',
    description:
      'Practical completion requirements, defects liability period, sectional completion and handover procedures',
    icon: CheckCircle2,
    href: '../h-n-c-module5-section6-6',
  },
];

const HNCModule5Section6 = () => {
  useSEO(
    'Site management and CDM - HNC Module 5 Section 6 | Building Services',
    'Master site management: site organisation, progress monitoring, interface coordination, CDM compliance, environmental management and practical completion.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={6}
      title="Site management and CDM"
      description="Manage site operations, coordinate interfaces and ensure CDM compliance for building services projects."
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

export default HNCModule5Section6;
