import { Magnet, Zap, Link2, Box, RotateCcw } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Magnetic fields and flux',
    description:
      'Understanding magnetic field strength, flux density and magnetic circuit principles',
    icon: Magnet,
    href: '../level3-module3-section3-1',
  },
  {
    number: '3.2',
    title: 'Electromagnetic induction',
    description:
      "Faraday's and Lenz's laws — the foundation of electrical generation and transformation",
    icon: Zap,
    href: '../level3-module3-section3-2',
  },
  {
    number: '3.3',
    title: 'Self and mutual inductance',
    description: 'Inductance in single circuits and the interaction between coupled circuits',
    icon: Link2,
    href: '../level3-module3-section3-3',
  },
  {
    number: '3.4',
    title: 'Transformers — theory and applications',
    description: 'Transformer principles, construction, efficiency and practical applications',
    icon: Box,
    href: '../level3-module3-section3-4',
  },
  {
    number: '3.5',
    title: 'Motors and generators',
    description:
      'Principles of operation for rotating electrical machines and their characteristics',
    icon: RotateCcw,
    href: '../level3-module3-section3-5',
  },
];

const Level3Module3Section3 = () => {
  useSEO(
    'Section 3: Electromagnetic Principles - Level 3 Module 3',
    'Magnetic fields, electromagnetic induction, transformers and rotating machines'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={3}
      title="Electromagnetic principles"
      description="Magnetic fields, electromagnetic induction, transformers and rotating machines."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module3-section2"
      prevSectionLabel="Resistive, inductive and capacitive circuits"
      nextSectionHref="../level3-module3-section4"
      nextSectionLabel="AC theory and waveforms"
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

export default Level3Module3Section3;
