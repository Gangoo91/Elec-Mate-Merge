import { Flame, BookOpen, AlertTriangle, Zap } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The fire triangle',
    icon: Flame,
    description:
      'The three elements required for combustion — heat, fuel and oxygen. Remove any one element and the fire cannot sustain itself.',
  },
  {
    id: 2,
    title: 'Classes of fire',
    icon: BookOpen,
    description:
      'Six classifications of fire (A through F) based on fuel type, from ordinary combustibles to cooking oils and fats.',
  },
  {
    id: 3,
    title: 'Fire behaviour & development',
    icon: AlertTriangle,
    description:
      'How fires grow through ignition, growth, flashover, full development and decay phases, including backdraught and flashover risks.',
  },
  {
    id: 4,
    title: 'How fires start in the workplace',
    icon: Zap,
    description:
      'Common ignition sources in electrical and construction work — hot works, faulty wiring, overloaded circuits and poor housekeeping.',
  },
];

export default function FireSafetyModule1() {
  useSEO({
    title: 'Module 1: Understanding Fire | Fire Safety & Fire Marshal | Elec-Mate',
    description:
      'The fire triangle, classes of fire, fire behaviour and development, and common causes of workplace fires.',
  });

  return (
    <ModuleShell
      backTo="../fire-safety-course"
      backLabel="Fire safety & fire marshal"
      moduleNumber={1}
      title="Understanding fire"
      description="The science behind fire, the six classes of fire, how fires develop and spread, and common causes of fires in electrical and construction workplaces."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../fire-safety-module-2"
      nextModuleLabel="Fire safety legislation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fire-safety-module-1-section-${section.id}`}
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
