import { RotateCcw, Settings, TrendingUp, AlertTriangle, Gauge, PlayCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Open loop vs closed loop systems', icon: RotateCcw, description: 'The difference between open and closed loop control systems.' },
  { id: 2, title: 'Components of a control loop: PV, setpoint, output', icon: Settings, description: 'Key components and their roles in control loop operation.' },
  { id: 3, title: 'PID control basics (proportional, integral, derivative)', icon: TrendingUp, description: 'PID control principles and tuning.' },
  { id: 4, title: 'Common loop faults: hunting, overshoot, lag', icon: AlertTriangle, description: 'Identifying and troubleshooting common control loop problems.' },
  { id: 5, title: 'Loop tuning and stability considerations', icon: Gauge, description: 'Techniques for optimising control loop performance.' },
  { id: 6, title: 'Examples: HVAC, pressure systems and motor speed control', icon: PlayCircle, description: 'Real-world applications of control loops.' },
];

export default function InstrumentationModule5() {
  useSEO({
    title: 'Module 5: Control Loops and Feedback | Instrumentation | Elec-Mate',
    description: 'Open vs closed loop systems, PID basics, common loop faults, tuning and worked examples in HVAC and motor control.',
  });

  return (
    <ModuleShell
      backTo="../instrumentation-course"
      backLabel="Instrumentation"
      moduleNumber={5}
      title="Control loops and feedback systems"
      description="The control theory behind every regulated process — from PID basics to tuning and troubleshooting."
      tone="cyan"
      sectionsCount={sections.length}
      duration="65 mins"
      prevModuleHref="../instrumentation-module-4"
      prevModuleLabel="Measurement of electrical quantities"
      nextModuleHref="../instrumentation-module-6"
      nextModuleLabel="Calibration methods and standards"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../instrumentation-module-5-section-${section.id}`}
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
