import { Star, Triangle, Scale, Calculator, Cable, Shield, Radio, Building } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Star and delta configurations',
    description: 'Three-phase connection methods and their electrical characteristics',
    icon: Star,
    href: '../h-n-c-module3-section4-1',
  },
  {
    number: '4.2',
    title: 'Line and phase voltage/current relationships',
    description:
      'Mathematical relationships between line and phase quantities in three-phase systems',
    icon: Triangle,
    href: '../h-n-c-module3-section4-2',
  },
  {
    number: '4.3',
    title: 'Balanced and unbalanced loads',
    description:
      'Analysis of symmetrical and asymmetrical loading conditions in three-phase systems',
    icon: Scale,
    href: '../h-n-c-module3-section4-3',
  },
  {
    number: '4.4',
    title: 'Calculations of three-phase power (kW, kVA, PF)',
    description:
      'Power calculations and measurement techniques for three-phase electrical systems',
    icon: Calculator,
    href: '../h-n-c-module3-section4-4',
  },
  {
    number: '4.5',
    title: 'Cable sizing and voltage drop in three-phase systems',
    description: 'Design considerations for three-phase cable selection and voltage regulation',
    icon: Cable,
    href: '../h-n-c-module3-section4-5',
  },
  {
    number: '4.6',
    title: 'Earthing and protective devices in distribution',
    description:
      'Safety systems and protection coordination in three-phase distribution networks',
    icon: Shield,
    href: '../h-n-c-module3-section4-6',
  },
  {
    number: '4.7',
    title: 'Harmonics and power quality issues',
    description: 'Power quality problems and mitigation techniques in three-phase installations',
    icon: Radio,
    href: '../h-n-c-module3-section4-7',
  },
  {
    number: '4.8',
    title: 'Applications in building distribution boards',
    description:
      'Practical design and installation of three-phase distribution systems in buildings',
    icon: Building,
    href: '../h-n-c-module3-section4-8',
  },
];

const HNCModule3Section4 = () => {
  useSEO(
    'Three-phase systems and distribution - HNC Module 3 Section 4',
    'Understanding three-phase electrical systems, load calculations, distribution methods and power quality in building services'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={4}
      title="Three-phase systems and distribution"
      description="Master three-phase electrical theory, power calculations and distribution system design for building services."
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

export default HNCModule3Section4;
