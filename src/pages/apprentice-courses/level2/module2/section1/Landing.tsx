import { Calculator, Ruler, Zap, Repeat, Search } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '1.1',
    title: 'Maths principles for electricians (1.1)',
    description:
      'Fractions, percentages, transposition and ratios — the maths you actually use on site.',
    icon: Calculator,
    href: '1-1',
  },
  {
    number: '1.2',
    title: 'SI base and derived units (2.1)',
    description: 'The seven SI base units and the derived units electricians live with.',
    icon: Ruler,
    href: '1-2',
  },
  {
    number: '1.3',
    title: 'Electrical SI units — V, A, Ω, W (2.2)',
    description: 'Volts, amps, ohms and watts — what they are and how they relate.',
    icon: Zap,
    href: '1-3',
  },
  {
    number: '1.4',
    title: 'SI prefixes and conversions (2.2)',
    description: 'milli, kilo, mega — converting cleanly without 1000× errors.',
    icon: Repeat,
    href: '1-4',
  },
  {
    number: '1.5',
    title: 'Electrical instruments (2.3)',
    description: 'Multimeters and the basics of measuring V, A, Ω, continuity and IR safely.',
    icon: Search,
    href: '1-5',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={1}
      title="Maths and SI units for electrical work"
      description="Maths principles, SI base and derived units, electrical units, prefixes, and instruments — aligned to LO1 and LO2 of Unit 202."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Basic mechanics — force, work, energy and power"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Before you can size a cable, set a timer or read a test sheet, you need the
            maths and units that underpin everything else. This is the section that
            makes the rest of Module 2 readable — get it solid here and the formulae in
            Sections 3 and 4 stop looking like algebra and start looking like
            sentences.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            We start with the maths habits an electrician actually uses on site — Sub 1.1
            covers fractions, percentages, transposition and ratios. Sub 1.2 introduces
            the seven SI base units and the derived ones electricians live with.
            Sub 1.3 zeroes in on the four you'll meet every shift — volts, amps, ohms
            and watts — and how they relate. Sub 1.4 nails the prefixes (milli, kilo,
            mega) so you stop dropping factors of a thousand. Sub 1.5 then gets you
            measuring those quantities safely on a multimeter.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Without these, the rest of Module 2 won't land. With them, every formula in
            the module reads like a sentence.
          </p>
        </div>
      }
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
