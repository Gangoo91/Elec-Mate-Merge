import { Shield, Zap, Cog, Wrench, Settings, FileText, Award } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Health, safety and compliance', description: 'Safe systems of work, electrical safety, RAMS, regulations and emergency procedures.', icon: Shield, duration: '4h', link: '../m-o-e-t-module1' },
  { moduleNumber: 2, title: 'Engineering principles and electrical theory', description: 'Electrical fundamentals, AC/DC systems, machines, protection and earthing.', icon: Zap, duration: '4h', link: '../m-o-e-t-module2' },
  { moduleNumber: 3, title: 'Electrical plant, equipment and systems', description: 'Switchgear, motors, control panels, lighting, UPS and emerging technologies.', icon: Cog, duration: '4h', link: '../m-o-e-t-module3' },
  { moduleNumber: 4, title: 'Maintenance techniques and fault diagnosis', description: 'PPM, condition monitoring, diagnostics, repairs, testing and root cause analysis.', icon: Wrench, duration: '5h', link: '../m-o-e-t-module4' },
  { moduleNumber: 5, title: 'Control, automation and instrumentation', description: 'Sensors, PLCs, safety circuits, process control and industrial communication.', icon: Settings, duration: '4h', link: '../m-o-e-t-module5' },
  { moduleNumber: 6, title: 'Technical documentation and communication', description: 'Drawings, schematics, maintenance records and stakeholder communication.', icon: FileText, duration: '3h', link: '../m-o-e-t-module6' },
  { moduleNumber: 7, title: 'End point assessment preparation', description: 'EPA preparation, knowledge tests, practical tasks, portfolio and behaviours.', icon: Award, duration: '4h', link: '../m-o-e-t-module7' },
];

export default function MOET() {
  useSEO({
    title: 'MOET | Apprentice Training | Elec-Mate',
    description:
      'Maintenance Operations Engineering Technician training — safety, electrical theory, plant, diagnostics, control systems and EPA preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice training"
      eyebrow="Apprentice training"
      title="MOET"
      description="Maintenance Operations Engineering Technician — the complete Level 3 programme covering safety, theory, plant, diagnostics, controls and EPA preparation."
      tone="orange"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="~28h"
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
          index={index}
        />
      ))}
    </CourseShell>
  );
}
