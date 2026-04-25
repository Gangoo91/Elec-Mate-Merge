import { Layers, Paintbrush, Zap, FlaskConical } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Common ACMs — boards & sheets', icon: Layers, description: 'Asbestos insulating board and asbestos cement — identification, properties, locations and risk levels.' },
  { id: 2, title: 'Common ACMs — insulation & coatings', icon: Paintbrush, description: 'Pipe lagging, sprayed coatings, textured decorative coatings (Artex), rope seals and millboard.' },
  { id: 3, title: 'ACMs in electrical installations', icon: Zap, description: 'Flash guards, cable trenching, switchgear, fuse carriers and electrical backing boards.' },
  { id: 4, title: 'Presuming, sampling & analysis', icon: FlaskConical, description: 'The presumption approach, when to sample, PLM analysis, UKAS-accredited laboratories and costs.' },
];

export default function AsbestosModule3() {
  useSEO({
    title: 'Module 3: Identifying Asbestos-Containing Materials | Asbestos Awareness | Elec-Mate',
    description:
      'Identifying common ACMs in boards, insulation, coatings and electrical installations. Sampling, analysis and the presumption approach.',
  });

  return (
    <ModuleShell
      backTo="../asbestos-awareness-course"
      backLabel="Asbestos awareness"
      moduleNumber={3}
      title="Identifying asbestos-containing materials"
      description="How to recognise common ACMs in buildings and electrical installations, plus the process of sampling and analysis."
      tone="orange"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../asbestos-awareness-module-2"
      prevModuleLabel="Legislation & the duty to manage"
      nextModuleHref="../asbestos-awareness-module-4"
      nextModuleLabel="Safe working practices & PPE"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../asbestos-awareness-module-3-section-${section.id}`}
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
