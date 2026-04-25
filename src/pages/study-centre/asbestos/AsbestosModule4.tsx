import { Layers, ClipboardCheck, Shield, Wrench } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Categories of asbestos work', icon: Layers, description: 'Licensed, notifiable non-licensed and non-licensed work — requirements and restrictions for each.' },
  { id: 2, title: 'Risk assessment & method statements', icon: ClipboardCheck, description: 'RAMS for asbestos work, hierarchy of controls, task-specific assessment and HSE Essentials.' },
  { id: 3, title: 'RPE & PPE selection', icon: Shield, description: 'FFP3, half-mask, full-face, powered air — face-fit testing, coveralls and decontamination sequence.' },
  { id: 4, title: 'Controlled work techniques', icon: Wrench, description: 'Wet working, shadow vacuuming, glove bags, enclosures, Class H vacuums and prohibited tools.' },
];

export default function AsbestosModule4() {
  useSEO({
    title: 'Module 4: Safe Working Practices & PPE | Asbestos Awareness | Elec-Mate',
    description:
      'Work categories, risk assessment, RPE and PPE selection, decontamination procedures and controlled asbestos work techniques.',
  });

  return (
    <ModuleShell
      backTo="../asbestos-awareness-course"
      backLabel="Asbestos awareness"
      moduleNumber={4}
      title="Safe working practices & PPE"
      description="Work categories, risk controls, respiratory protection and the techniques used for safe asbestos work."
      tone="orange"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../asbestos-awareness-module-3"
      prevModuleLabel="Identifying asbestos-containing materials"
      nextModuleHref="../asbestos-awareness-module-5"
      nextModuleLabel="Emergency procedures & responsibilities"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../asbestos-awareness-module-4-section-${section.id}`}
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
