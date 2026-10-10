import {
  BookOpen,
  Thermometer,
  Wind,
  Lightbulb,
  Wifi,
  Bell,
  Settings,
  GraduationCap,
  BookMarked,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'What a BMS is, and the rules around it',
    description:
      'How a BMS is built, what it controls, why buildings have one, the rules that require it and where you fit.',
    duration: '2 hrs 45 mins',
    icon: BookOpen,
    link: '../bms-module-1',
    isExam: false,
  },
  {
    id: 2,
    title: 'Field devices and signals',
    description:
      'Points, sensors, actuators, controllers and control wiring, through to the motor starter interface.',
    duration: '3 hrs 20 mins',
    icon: Thermometer,
    link: '../bms-module-2',
  },
  {
    id: 3,
    title: 'Controlling heating, ventilation and air conditioning',
    description:
      'Plant, control loops, schedules, demand-based control, overrides and hardwired safeties.',
    duration: '3 hrs',
    icon: Wind,
    link: '../bms-module-3',
  },
  {
    id: 4,
    title: 'Lighting, access, blinds and metering',
    description:
      'DALI and lighting control, daylight and presence detection, access and shading interfaces, sub-metering.',
    duration: '2 hrs 30 mins',
    icon: Lightbulb,
    link: '../bms-module-4',
  },
  {
    id: 5,
    title: 'Networks and protocols',
    description:
      'BACnet, Modbus, KNX, LonWorks, M-Bus and DALI, gateways, and keeping the network secure.',
    duration: '3 hrs',
    icon: Wifi,
    link: '../bms-module-5',
  },
  {
    id: 6,
    title: 'Alarms, data and monitoring',
    description:
      'Alarms that get acted on, trends, graphics, energy reporting, fire interfaces and remote access.',
    duration: '2 hrs 55 mins',
    icon: Bell,
    link: '../bms-module-6',
  },
  {
    id: 7,
    title: 'Design, installation, commissioning and handover',
    description:
      'Points schedules, control logic, addressing, software, commissioning, handover and fault finding.',
    duration: '3 hrs 30 mins',
    icon: Settings,
    link: '../bms-module-7',
  },
  {
    id: 8,
    title: 'Mock exam',
    description: '30 questions drawn across all seven modules, 45 minutes, 60% to pass.',
    duration: '45 mins',
    icon: GraduationCap,
    link: '../bms-mock-exam',
    isExam: true,
  },
];

export default function BMSCourse() {
  useSEO({
    title: 'Building management systems (BMS) course | Professional upskilling | Elec-Mate',
    description:
      'A BMS course for UK electricians: field devices and control wiring, HVAC and lighting control, BACnet and Modbus, fire interfaces, commissioning and fault finding. 43 lessons.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Building management systems (BMS)"
      description="Building management systems for UK electricians: field devices and wiring, HVAC and lighting control, BACnet and Modbus, commissioning and fault finding."
      tone="yellow"
      level="Advanced"
      modulesCount={modules.filter((m) => !m.isExam).length}
      pagesCount="43"
      totalDuration="21h"
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
          isExam={mod.isExam}
          index={index}
        />
      ))}
      <ModuleCard
        to="/study-centre/glossary?course=bms"
        moduleNumber={modules.length + 1}
        eyebrow="Reference"
        title="Glossary"
        description="Every abbreviation this course uses, defined in plain English — shared across the study centre so a term means the same thing wherever you meet it."
        icon={BookMarked}
        duration="Reference"
        index={modules.length}
      />
    </CourseShell>
  );
}
