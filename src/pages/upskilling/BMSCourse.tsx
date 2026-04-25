import {
  BookOpen,
  Thermometer,
  Wind,
  Lightbulb,
  Wifi,
  Bell,
  Settings,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'BMS overview and industry applications',
    description: 'Introduction to building management systems and their applications.',
    duration: '50 mins',
    icon: BookOpen,
    link: '../bms-module-1',
  },
  {
    id: 2,
    title: 'Control devices and field sensors',
    description: 'Sensors, actuators and the control components used across BMS installations.',
    duration: '60 mins',
    icon: Thermometer,
    link: '../bms-module-2',
  },
  {
    id: 3,
    title: 'HVAC integration and scheduling logic',
    description: 'Heating, ventilation, control strategies and time scheduling.',
    duration: '65 mins',
    icon: Wind,
    link: '../bms-module-3',
  },
  {
    id: 4,
    title: 'Lighting, access and environmental control',
    description: 'Integrated lighting, security and environmental subsystems.',
    duration: '55 mins',
    icon: Lightbulb,
    link: '../bms-module-4',
  },
  {
    id: 5,
    title: 'Communication protocols: BACnet, Modbus, KNX',
    description: 'Industry communication standards and interoperability.',
    duration: '70 mins',
    icon: Wifi,
    link: '../bms-module-5',
  },
  {
    id: 6,
    title: 'Alarms, monitoring and data logging',
    description: 'Alarm management, trend logging and dashboards.',
    duration: '45 mins',
    icon: Bell,
    link: '../bms-module-6',
  },
  {
    id: 7,
    title: 'BMS design, programming and commissioning',
    description: 'Full system design, programming methods and handover.',
    duration: '75 mins',
    icon: Settings,
    link: '../bms-module-7',
  },
  {
    id: 8,
    title: 'Mock exam',
    description: 'Test your knowledge with the BMS mock examination.',
    duration: '90 mins',
    icon: GraduationCap,
    link: '../bms-mock-exam',
    isExam: true,
  },
];

export default function BMSCourse() {
  useSEO({
    title: 'Building Management Systems (BMS) | Professional Upskilling | Elec-Mate',
    description:
      'HVAC control, lighting management and integrated building automation training covering protocols, design, programming and commissioning.',
  });

  return (
    <CourseShell
      backTo="/study-centre/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Building management systems (BMS)"
      description="HVAC control, lighting management and integrated building automation."
      tone="yellow"
      level="Advanced"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="8h"
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
    </CourseShell>
  );
}
