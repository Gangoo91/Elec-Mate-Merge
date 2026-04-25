import { Search, Gauge, BarChart3, Award, LineChart, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Energy auditing',
    description:
      'Audit types, data collection, site surveys, measurement protocols and reporting standards',
    icon: Search,
    href: '../h-n-c-module6-section5-1',
  },
  {
    number: '5.2',
    title: 'Metering strategies',
    description:
      'Main metering, sub-metering, automatic meter reading, data loggers and metering hierarchies',
    icon: Gauge,
    href: '../h-n-c-module6-section5-2',
  },
  {
    number: '5.3',
    title: 'Monitoring and targeting',
    description:
      'M&T principles, degree day analysis, cusum charts, exception reporting and performance tracking',
    icon: BarChart3,
    href: '../h-n-c-module6-section5-3',
  },
  {
    number: '5.4',
    title: 'ISO 50001',
    description:
      'Energy management systems, Plan-Do-Check-Act, certification requirements and continual improvement',
    icon: Award,
    href: '../h-n-c-module6-section5-4',
  },
  {
    number: '5.5',
    title: 'Building performance',
    description:
      'Display Energy Certificates, benchmarking, performance gaps and operational rating improvement',
    icon: LineChart,
    href: '../h-n-c-module6-section5-5',
  },
  {
    number: '5.6',
    title: 'Energy efficiency measures',
    description:
      'ECM identification, payback analysis, implementation priorities and verification of savings',
    icon: Settings,
    href: '../h-n-c-module6-section5-6',
  },
];

const HNCModule6Section5 = () => {
  useSEO(
    'Energy management - HNC Module 6 Section 5 | Sustainability',
    'Master energy management: energy auditing, metering strategies, monitoring and targeting, ISO 50001 and building energy performance optimisation.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={5}
      title="Energy management"
      description="Implement effective energy management systems to optimise building energy performance."
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

export default HNCModule6Section5;
