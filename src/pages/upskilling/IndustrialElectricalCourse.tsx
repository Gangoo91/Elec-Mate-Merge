import { Settings, Cog, PanelLeft, Cpu, Search, Cable, Activity, Lock, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Overview of industrial electrical distribution', description: 'Industrial vs domestic, HV/LV separation, MCC panels, busbars and earthing strategies.', icon: Settings, duration: '50 mins', link: '../industrial-electrical-module-1' },
  { moduleNumber: 2, title: 'Motors, starters and control gear', description: 'DOL, star-delta, soft starters, VSDs, contactors, overloads and emergency stops.', icon: Cog, duration: '65 mins', link: '../industrial-electrical-module-2' },
  { moduleNumber: 3, title: 'Industrial panel assembly and layout', description: 'MCC layout, DIN rail organisation, ferrule ID, IP ratings and functional testing.', icon: PanelLeft, duration: '60 mins', link: '../industrial-electrical-module-3' },
  { moduleNumber: 4, title: 'PLC basics and system integration', description: 'PLC architecture, ladder logic, industrial protocols, SCADA, HMI and safety PLCs.', icon: Cpu, duration: '70 mins', link: '../industrial-electrical-module-4' },
  { moduleNumber: 5, title: 'Industrial fault finding and troubleshooting', description: 'Strategy, control faults, loop testing, PLC diagnostics and root cause analysis.', icon: Search, duration: '65 mins', link: '../industrial-electrical-module-5' },
  { moduleNumber: 6, title: 'Cable types, containment and routing', description: 'Industrial cable selection, containment systems and segregation requirements.', icon: Cable, duration: '55 mins', link: '../industrial-electrical-module-6' },
  { moduleNumber: 7, title: 'Power factor correction and harmonics', description: 'Reactive power, capacitor banks and harmonic mitigation strategies.', icon: Activity, duration: '60 mins', link: '../industrial-electrical-module-7' },
  { moduleNumber: 8, title: 'Industrial safety, isolation and lock-off', description: 'Safe isolation procedures, LOTO and industrial safety legislation.', icon: Lock, duration: '45 mins', link: '../industrial-electrical-module-8' },
  { moduleNumber: 9, title: 'Mock exam', description: 'Comprehensive assessment covering every industrial electrical module.', icon: GraduationCap, duration: '120 mins', link: '../industrial-electrical-mock-exam', isExam: true },
];

export default function IndustrialElectricalCourse() {
  useSEO({
    title: 'Industrial Electrical Systems | Professional Upskilling | Elec-Mate',
    description:
      'High voltage systems, motor control, PLCs and industrial automation — covering distribution, panels, fault finding, power factor and safety isolation.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Industrial electrical systems"
      description="High voltage distribution, motor control, PLCs and industrial automation for the working electrician."
      tone="orange"
      level="Specialist"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="9h"
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
