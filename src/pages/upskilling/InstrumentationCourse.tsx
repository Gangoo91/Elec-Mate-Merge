import {
  BookOpen,
  Thermometer,
  Zap,
  BarChart,
  RotateCcw,
  Target,
  Cable,
  Search,
  Award,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  // ⚠️ Durations here were inherited from the pre-rewrite pages and are wildly
  // short for the rewritten ones. Module 1 is ~30,400 words of prose plus five
  // quizzes and fifteen inline checks — roughly 3.5 hours, not 50 minutes.
  // Correct each module's figure as it is rewritten rather than guessing now.
  {
    moduleNumber: 1,
    title: 'Introduction to electrical instrumentation',
    description:
      'What instrumentation is, where it is used, measurement versus control, standards and traceability, and working safely on live plant.',
    icon: BookOpen,
    duration: '3.5 hours',
    link: '../instrumentation-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Sensors and transducers explained',
    description:
      'Temperature, pressure, flow, level and proximity — how each principle works, what it quietly depends on, and how to choose between them.',
    icon: Thermometer,
    duration: '5 hours',
    link: '../instrumentation-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Signal types, conditioning and scaling',
    description: '4-20 mA, 0-10 V, filtering, isolation and signal integrity.',
    icon: Zap,
    duration: '60 mins',
    link: '../instrumentation-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Measurement of electrical quantities',
    description: 'Voltage, current, resistance and frequency — accuracy and equipment.',
    icon: BarChart,
    duration: '50 mins',
    link: '../instrumentation-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Control loops and feedback systems',
    description: 'Open vs closed loops, PID basics, tuning and worked examples.',
    icon: RotateCcw,
    duration: '65 mins',
    link: '../instrumentation-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Calibration methods and standards',
    description: 'Equipment, procedures, certificates and UKAS traceability.',
    icon: Target,
    duration: '45 mins',
    link: '../instrumentation-module-6',
  },
  {
    moduleNumber: 7,
    title: 'Instrumentation wiring and 4-20 mA loops',
    description: 'Loop power, design, intrinsic safety and loop testing.',
    icon: Cable,
    duration: '55 mins',
    link: '../instrumentation-module-7',
  },
  {
    moduleNumber: 8,
    title: 'Fault finding, diagnostics and maintenance',
    description: 'Systematic diagnosis, preventive maintenance and reporting.',
    icon: Search,
    duration: '60 mins',
    link: '../instrumentation-module-8',
  },
  {
    moduleNumber: 9,
    title: 'Mock exam',
    description: 'Comprehensive assessment covering every instrumentation module.',
    icon: Award,
    duration: '120 mins',
    link: '../instrumentation-module-9',
    isExam: true,
  },
];

export default function InstrumentationCourse() {
  useSEO({
    title: 'Instrumentation | Professional Upskilling | Elec-Mate',
    description:
      'Industrial instrumentation systems, control loops and measurement techniques — sensors, signal conditioning, calibration, 4-20 mA loops and fault finding.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Instrumentation"
      description="Industrial instrumentation, control loops and measurement techniques for the modern electrician."
      tone="cyan"
      level="Specialist"
      modulesCount={modules.length}
      pagesCount="46"
      totalDuration="15h+"
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
