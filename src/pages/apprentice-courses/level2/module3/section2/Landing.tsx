import { FileText, Layers, Hash, Maximize, FileStack } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '2.1',
    title: 'Sources of technical information (2.1)',
    description:
      'Specifications, manufacturer manuals, drawings, RAMS and BS 7671 — where to look for what.',
    icon: FileText,
    href: '2-1',
  },
  {
    number: '2.2',
    title: 'Drawing types (2.2)',
    description:
      'Block, schematic, wiring, circuit, layout and as-built drawings — what each one shows and when you reach for it.',
    icon: Layers,
    href: '2-2',
  },
  {
    number: '2.3',
    title: 'BS EN 60617 drawing symbols (2.3)',
    description:
      'The standardised symbols you read on every UK installation drawing — switches, sockets, lights, protection.',
    icon: Hash,
    href: '2-3',
  },
  {
    number: '2.4',
    title: 'Scale conversion (2.4)',
    description:
      'Reading scales (1:50, 1:100) and converting drawing dimensions back to actual metres on the floor.',
    icon: Maximize,
    href: '2-4',
  },
  {
    number: '2.5',
    title: 'Reading a real drawing pack end-to-end (2.1-2.4)',
    description:
      'Synthesis Sub — walking a sample 3-bed semi domestic install pack from front sheet to as-built. Floor plan, schematic, wiring diagram, schedule of accessories, cable schedule and scale legend on one project.',
    icon: FileStack,
    href: '2-5',
  },
];

export default function Section2() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={2}
      title="Technical information and drawings"
      description="Where to find the technical information you need on a job, the different drawing types you'll see, the BS EN 60617 symbol set and how to convert drawing scale to real-world dimensions. Aligned to LO2 of Unit 203."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Industry regulations and what they mean"
      nextSectionHref="../section3"
      nextSectionLabel="Wiring systems theory"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Day one on a real job, somebody hands you a drawing pack, a spec, a
            RAMS and a manufacturer manual — and walks off. Section 2 is the
            section that lets you read what you've been handed instead of pretending
            you can.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 2.1 covers the sources you'll meet — specs, manuals, drawings,
            RAMS, BS 7671 itself. Sub 2.2 introduces the six drawing types you'll
            see on UK installs (block, schematic, wiring, circuit, layout,
            as-built). Sub 2.3 is the BS EN 60617 symbol library — the visual
            shorthand every drawing uses. Sub 2.4 closes with scale conversion:
            turning a 1:50 or 1:100 drawing back into the metres you'll measure on
            the floor.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Get this section solid and you'll never again stare at a drawing and
            ask "what does this even mean?".
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
