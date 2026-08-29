import { RotateCcw, Settings, TrendingUp, AlertTriangle, Gauge, PlayCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Open loop vs closed loop systems',
    icon: RotateCcw,
    description:
      'What feedback fundamentally cannot do — and what putting a loop in manual really costs.',
  },
  {
    id: 2,
    title: 'Components of a control loop: PV, setpoint, output',
    icon: Settings,
    description:
      'Reading PV, SP and output as a diagnostic, and the direction of action that decides everything.',
  },
  {
    id: 3,
    title: 'PID control basics (proportional, integral, derivative)',
    icon: TrendingUp,
    description:
      'Why proportional alone can never hold setpoint, and which process needs which term.',
  },
  {
    id: 4,
    title: 'Common loop faults: hunting, overshoot, lag',
    icon: AlertTriangle,
    description:
      'Using the phase between output and PV to name the over-tuned term — and the faults tuning cannot fix.',
  },
  {
    id: 5,
    title: 'Loop tuning and stability considerations',
    icon: Gauge,
    description:
      'Establishing what good means before you adjust anything, and the limits of the ultimate-gain method.',
  },
  {
    id: 6,
    title: 'Examples: HVAC, pressure systems and motor speed control',
    icon: PlayCircle,
    description:
      'Three very different loops, one method — including the cascade hiding inside every VSD.',
  },
];

export default function InstrumentationModule5() {
  useSEO({
    title: 'Module 5: Control Loops and Feedback | Instrumentation | Elec-Mate',
    description:
      'Open vs closed loop systems, PID basics, common loop faults, tuning and worked examples in HVAC and motor control.',
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
