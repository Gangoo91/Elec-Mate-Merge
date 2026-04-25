import { Target, Calculator, AlertTriangle, Sliders, Sun, Leaf } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Lighting design criteria',
    description:
      'Task illuminance levels, uniformity ratios, glare control and colour rendering requirements',
    icon: Target,
    href: '../h-n-c-module4-section4-1',
  },
  {
    number: '4.2',
    title: 'Interior lighting calculations',
    description: 'Lumen method, utilisation factors, DIALux and Relux software applications',
    icon: Calculator,
    href: '../h-n-c-module4-section4-2',
  },
  {
    number: '4.3',
    title: 'Emergency lighting design',
    description:
      'BS 5266 requirements, escape routes, open areas, maintained and non-maintained systems',
    icon: AlertTriangle,
    href: '../h-n-c-module4-section4-3',
  },
  {
    number: '4.4',
    title: 'Lighting controls',
    description: 'DALI systems, presence detection, daylight linking and scene setting',
    icon: Sliders,
    href: '../h-n-c-module4-section4-4',
  },
  {
    number: '4.5',
    title: 'External lighting',
    description:
      'Security lighting, amenity lighting, Part L compliance and light pollution control',
    icon: Sun,
    href: '../h-n-c-module4-section4-5',
  },
  {
    number: '4.6',
    title: 'Energy efficient lighting',
    description:
      'LED selection, Part L requirements, controls strategies and lighting energy calculations',
    icon: Leaf,
    href: '../h-n-c-module4-section4-6',
  },
];

const HNCModule4Section4 = () => {
  useSEO(
    'Lighting design - HNC Module 4 Section 4 | Building Services Design',
    'Master lighting design: design criteria, interior calculations, emergency lighting, controls, external lighting and energy efficient solutions.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={4}
      title="Lighting design"
      description="Design effective lighting systems that meet functional requirements, enhance wellbeing and minimise energy consumption."
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

export default HNCModule4Section4;
