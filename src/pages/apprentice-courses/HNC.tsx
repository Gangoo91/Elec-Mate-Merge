import {
  Shield,
  Beaker,
  Zap,
  Building2,
  FolderKanban,
  Leaf,
  Lightbulb,
  Wind,
  FileText,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    moduleNumber: 1,
    title: 'Health, safety and risk management',
    description:
      'HASAWA, EAWR, COSHH, CDM regulations, RAMS and risk assessment for building services engineering.',
    icon: Shield,
    duration: '2h',
    link: '../h-n-c-module1',
  },
  {
    moduleNumber: 2,
    title: 'Building services science',
    description:
      'Heat transfer, fluid mechanics, psychrometrics and environmental physics for HVAC, plumbing and fire systems.',
    icon: Beaker,
    duration: '2h',
    link: '../h-n-c-module2',
  },
  {
    moduleNumber: 3,
    title: 'Electrical and electronic principles',
    description:
      'DC and AC circuit theory, three-phase systems, machines, semiconductors and digital electronics.',
    icon: Zap,
    duration: '2h',
    link: '../h-n-c-module3',
  },
  {
    moduleNumber: 4,
    title: 'Design principles for building services',
    description:
      'Load calculations, cable sizing, BS 7671 compliance and specification writing for electrical installations.',
    icon: Building2,
    duration: '2h',
    link: '../h-n-c-module4',
  },
  {
    moduleNumber: 5,
    title: 'Project management',
    description:
      'Planning, procurement, cost control, quality, commissioning and CDM compliance for building services projects.',
    icon: FolderKanban,
    duration: '2h',
    link: '../h-n-c-module5',
  },
  {
    moduleNumber: 6,
    title: 'Sustainability and environmental engineering',
    description:
      'Part L compliance, renewables integration, BREEAM assessment and carbon-reduction strategies.',
    icon: Leaf,
    duration: '2h',
    link: '../h-n-c-module6',
  },
  {
    moduleNumber: 7,
    title: 'Power and lighting systems',
    description:
      'LV distribution design, emergency systems, lighting calculations, controls and energy-efficient solutions.',
    icon: Lightbulb,
    duration: '2h',
    link: '../h-n-c-module7',
  },
  {
    moduleNumber: 8,
    title: 'HVAC systems',
    description:
      'Heating, ventilation and air conditioning design, motor control, BMS integration and services coordination.',
    icon: Wind,
    duration: '2h',
    link: '../h-n-c-module8',
  },
  {
    moduleNumber: 9,
    title: 'Mock exam',
    description:
      '500-question bank, 30 random questions per attempt, 45-minute timer covering all eight modules.',
    icon: FileText,
    duration: '45 mins',
    link: '../h-n-c-module9',
    isExam: true,
  },
];

export default function HNC() {
  useSEO({
    title: 'HNC Electrical Engineering | Apprentice Training | Elec-Mate',
    description:
      'Higher National Certificate in electrical engineering for building services — eight content modules covering health and safety, science, design, project management and HVAC, plus a final mock exam.',
  });

  return (
    <CourseShell
      backTo="/study-centre/apprentice"
      backLabel="Apprentice training"
      eyebrow="Apprentice training"
      title="HNC electrical engineering"
      description="Higher National Certificate in electrical engineering for building services — 120 credits across eight content modules and a final assessment."
      tone="purple"
      level="Advanced"
      modulesCount={modules.length}
      pagesCount="500+"
      totalDuration="16h"
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
