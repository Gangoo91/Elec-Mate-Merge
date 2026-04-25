import { Scale, HeartPulse, Droplets, Thermometer, Bone, GraduationCap } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: "The first aider's role, legislation & assessment",
    description:
      'Health & Safety (First-Aid) Regulations 1981, scene safety, DR ABC, RIDDOR, accident books and first aid kits.',
    icon: Scale,
    duration: '40 mins',
    link: '../first-aid-module-1',
  },
  {
    moduleNumber: 2,
    title: 'Life-threatening emergencies — CPR, AED & choking',
    description:
      'Chain of survival, adult CPR, automated external defibrillators, recovery position and choking management.',
    icon: HeartPulse,
    duration: '45 mins',
    link: '../first-aid-module-2',
  },
  {
    moduleNumber: 3,
    title: 'Bleeding, burns & shock',
    description:
      'Haemorrhage control, wound management, tourniquets, burns and scalds, shock recognition and anaphylaxis.',
    icon: Droplets,
    duration: '40 mins',
    link: '../first-aid-module-3',
  },
  {
    moduleNumber: 4,
    title: 'Medical emergencies & environmental conditions',
    description:
      'Heart attack, stroke, seizures, diabetes, electric shock, heat exhaustion and hypothermia.',
    icon: Thermometer,
    duration: '40 mins',
    link: '../first-aid-module-4',
  },
  {
    moduleNumber: 5,
    title: 'Injuries, specific conditions & workplace protocol',
    description:
      'Fractures, head and spinal injuries, eye injuries, poisoning, COSHH, mental health and first aider wellbeing.',
    icon: Bone,
    duration: '40 mins',
    link: '../first-aid-module-5',
  },
  {
    moduleNumber: 6,
    title: 'Mock exam',
    description: '200-question bank, 20 random questions per attempt, 30-minute timer, 80% pass mark.',
    icon: GraduationCap,
    duration: '30 mins',
    link: '../first-aid-module-6',
    isExam: true,
  },
];

export default function FirstAidCourse() {
  useSEO({
    title: 'First Aid at Work | General Upskilling | Elec-Mate',
    description:
      'Complete First Aid at Work training covering legislation, CPR, AED, bleeding, burns, shock, medical emergencies, injuries and mock exam preparation.',
  });

  return (
    <CourseShell
      backTo="/study-centre/general-upskilling"
      backLabel="General upskilling"
      eyebrow="General upskilling"
      title="First aid at work"
      description="Workplace first aid procedures, CPR, emergency response, injury management and legal requirements."
      tone="red"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="3.5h"
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
