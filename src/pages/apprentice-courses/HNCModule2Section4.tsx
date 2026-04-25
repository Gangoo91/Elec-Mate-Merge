import { Eye, Calculator, Lightbulb, Volume2, VolumeX, Building } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Light and vision',
    description: 'EM spectrum, visual perception, colour temperature, CRI',
    icon: Eye,
    href: '../h-n-c-module2-section4-1',
  },
  {
    number: '4.2',
    title: 'Illumination calculations',
    description: 'Lumen method, point-by-point, maintained illuminance',
    icon: Calculator,
    href: '../h-n-c-module2-section4-2',
  },
  {
    number: '4.3',
    title: 'Lamp types and efficacy',
    description: 'LED, fluorescent, discharge, efficiency comparison',
    icon: Lightbulb,
    href: '../h-n-c-module2-section4-3',
  },
  {
    number: '4.4',
    title: 'Sound fundamentals',
    description: 'Frequency, wavelength, decibels, sound pressure levels',
    icon: Volume2,
    href: '../h-n-c-module2-section4-4',
  },
  {
    number: '4.5',
    title: 'Noise control methods',
    description: 'Source, path, receiver, attenuation, barriers',
    icon: VolumeX,
    href: '../h-n-c-module2-section4-5',
  },
  {
    number: '4.6',
    title: 'Building acoustics and compliance',
    description: 'Reverberation, Part E requirements, noise ratings',
    icon: Building,
    href: '../h-n-c-module2-section4-6',
  },
];

const HNCModule2Section4 = () => {
  useSEO(
    'Lighting and acoustics - HNC Module 2 Section 4 | Building Services Engineering',
    'Master lighting and acoustics: visual perception, illumination calculations, lamp types, sound fundamentals, noise control and building acoustics compliance.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={4}
      title="Lighting and acoustics"
      description="Apply the principles of lighting design and acoustic engineering to create comfortable building environments."
      tone="purple"
      subsectionsCount={subsections.length}
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default HNCModule2Section4;
