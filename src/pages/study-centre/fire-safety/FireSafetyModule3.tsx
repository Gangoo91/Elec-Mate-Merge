import { ShieldCheck, Bell, Siren, Lightbulb } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Fire prevention measures',
    icon: ShieldCheck,
    description:
      'Eliminating ignition sources, safe storage of flammable materials, hot work permits, electrical safety and good housekeeping.',
  },
  {
    id: 2,
    title: 'Fire detection systems',
    icon: Bell,
    description:
      'Conventional, addressable and analogue-addressable systems, detector types (smoke, heat, multi-sensor), BS 5839 categories L1-L5 and P1-P2.',
  },
  {
    id: 3,
    title: 'Fire alarm systems',
    icon: Siren,
    description:
      'Manual call points, alarm sounders, visual alarm devices, cause and effect, zoning and false alarm management.',
  },
  {
    id: 4,
    title: 'Emergency lighting',
    icon: Lightbulb,
    description:
      'BS 5266 requirements, maintained vs non-maintained, escape route lighting, open area lighting, testing and maintenance schedules.',
  },
];

export default function FireSafetyModule3() {
  useSEO({
    title: 'Module 3: Fire Prevention & Detection | Fire Safety & Fire Marshal | Elec-Mate',
    description:
      'Fire prevention measures, detection systems, fire alarm systems and emergency lighting requirements.',
  });

  return (
    <ModuleShell
      backTo="../fire-safety-course"
      backLabel="Fire safety & fire marshal"
      moduleNumber={3}
      title="Fire prevention & detection"
      description="Practical fire prevention measures, fire detection and alarm systems including BS 5839 categories, and emergency lighting requirements under BS 5266."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../fire-safety-module-2"
      prevModuleLabel="Fire safety legislation"
      nextModuleHref="../fire-safety-module-4"
      nextModuleLabel="Fire marshal duties & evacuation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fire-safety-module-3-section-${section.id}`}
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
