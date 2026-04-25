import { Clock3, FlaskConical, MapPin, HeartPulse } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'History, properties & why it was used', icon: Clock3, description: 'Natural mineral fibre, six types, fireproof properties, peak UK use and the timeline of discovery.' },
  { id: 2, title: 'Types of asbestos fibres', icon: FlaskConical, description: 'Chrysotile, amosite, crocidolite — serpentine vs amphibole, properties and relative dangers.' },
  { id: 3, title: 'Where asbestos is found', icon: MapPin, description: 'Common locations in pre-2000 buildings — roofs, walls, floors, services and domestic properties.' },
  { id: 4, title: 'Health effects of asbestos exposure', icon: HeartPulse, description: 'Mesothelioma, lung cancer, asbestosis, pleural disease — latency periods and the single-fibre theory.' },
];

export default function AsbestosModule1() {
  useSEO({
    title: 'Module 1: What Is Asbestos? | Asbestos Awareness | Elec-Mate',
    description:
      'History, fibre types, where asbestos is found in buildings and the health effects of exposure including mesothelioma and asbestosis.',
  });

  return (
    <ModuleShell
      backTo="../asbestos-awareness-course"
      backLabel="Asbestos awareness"
      moduleNumber={1}
      title="What is asbestos?"
      description="The history, properties, types, locations and devastating health effects of this once widely-used mineral fibre."
      tone="orange"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../asbestos-awareness-module-2"
      nextModuleLabel="Legislation & the duty to manage"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../asbestos-awareness-module-1-section-${section.id}`}
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
