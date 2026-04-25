import { TrendingUp, Sun, Wind, Battery, Zap, GitBranch, Wrench, FileText, PoundSterling, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Overview of renewable energy technologies', description: 'Why renewables, key systems, generation vs storage and the UK regulatory landscape.', icon: TrendingUp, duration: '45 mins', link: '../renewable-energy-module-1' },
  { moduleNumber: 2, title: 'Solar PV system design and operation', description: 'Panel types, site assessment, string design, mounting, layouts and SLDs.', icon: Sun, duration: '60 mins', link: '../renewable-energy-module-2' },
  { moduleNumber: 3, title: 'Wind turbines and microgeneration systems', description: 'Wind generation, HAWT vs VAWT, resource assessment and offshore systems.', icon: Wind, duration: '55 mins', link: '../renewable-energy-module-3' },
  { moduleNumber: 4, title: 'Battery storage and energy management', description: 'Battery chemistries, sizing, BMS, energy management and grid integration.', icon: Battery, duration: '50 mins', link: '../renewable-energy-module-4' },
  { moduleNumber: 5, title: 'Inverter technology and grid integration', description: 'Inverter types, MPPT, grid-tied vs off-grid, G98/G99 and remote monitoring.', icon: Zap, duration: '65 mins', link: '../renewable-energy-module-5' },
  { moduleNumber: 6, title: 'Off-grid vs grid-tied configurations', description: 'System comparison, off-grid design, export management and load priority.', icon: GitBranch, duration: '55 mins', link: '../renewable-energy-module-6' },
  { moduleNumber: 7, title: 'Installation, maintenance and troubleshooting', description: 'Installation best practice, commissioning, maintenance and fault finding.', icon: Wrench, duration: '70 mins', link: '../renewable-energy-module-7' },
  { moduleNumber: 8, title: 'Regulations, planning and compliance', description: 'MCS, Building Regulations, DNO applications, fire safety and handover.', icon: FileText, duration: '45 mins', link: '../renewable-energy-module-8' },
  { moduleNumber: 9, title: 'Incentives, payback and financial modelling', description: 'SEG, ROI, cost-benefit analysis, yield tools and tax considerations.', icon: PoundSterling, duration: '40 mins', link: '../renewable-energy-module-9' },
  { moduleNumber: 10, title: 'Mock exam', description: 'Comprehensive assessment covering every renewable energy module.', icon: GraduationCap, duration: '120 mins', link: '../renewable-energy-module-10', isExam: true },
];

export default function RenewableEnergyCourse() {
  useSEO({
    title: 'Renewable Energy Systems | Professional Upskilling | Elec-Mate',
    description:
      'Solar PV, wind, battery storage and inverter technology — design, installation, regulation and financial modelling for the modern installer.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Renewable energy systems"
      description="Solar, wind and battery storage installation and maintenance — from system design through to handover."
      tone="cyan"
      level="Specialist"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="9h 45m"
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
