import {
  BookOpen,
  Gauge,
  Search,
  TrendingDown,
  BarChart,
  FileCheck,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'Introduction to energy efficiency',
    description: 'The business case, UK carbon targets, identifying waste and key standards.',
    duration: '45 mins',
    icon: BookOpen,
    link: '../energy-efficiency-module-1',
  },
  {
    id: 2,
    title: 'Power quality and load analysis',
    description: 'Harmonics, demand patterns, kW vs kVA vs kWh and power monitoring equipment.',
    duration: '55 mins',
    icon: Gauge,
    link: '../energy-efficiency-module-2',
  },
  {
    id: 3,
    title: 'Energy auditing methods',
    description: 'Walkthrough surveys, data collection, benchmarking and audit reporting.',
    duration: '60 mins',
    icon: Search,
    link: '../energy-efficiency-module-3',
  },
  {
    id: 4,
    title: 'Reducing demand and improving efficiency',
    description: 'LED upgrades, motor efficiency, smart controls and ROI calculators.',
    duration: '50 mins',
    icon: TrendingDown,
    link: '../energy-efficiency-module-4',
  },
  {
    id: 5,
    title: 'Monitoring, analytics and smart metering',
    description: 'Sub-metering strategy, energy dashboards, fault alerts and cybersecurity.',
    duration: '55 mins',
    icon: BarChart,
    link: '../energy-efficiency-module-5',
  },
  {
    id: 6,
    title: 'Regulations, carbon compliance and ROI',
    description: 'ESOS, SECR, building regs, payback models, incentives and KPI dashboards.',
    duration: '40 mins',
    icon: FileCheck,
    link: '../energy-efficiency-module-6',
  },
];

export default function EnergyEfficiencyCourse() {
  useSEO({
    title: 'Energy Efficiency & Management | Professional Upskilling | Elec-Mate',
    description:
      'Power quality analysis, energy auditing, monitoring, ROI modelling and carbon compliance for electrical professionals.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Energy efficiency and management"
      description="Power quality analysis, energy auditing and optimisation strategies for net-zero operations."
      tone="yellow"
      level="Advanced"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="5h"
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
          index={index}
        />
      ))}
    </CourseShell>
  );
}
