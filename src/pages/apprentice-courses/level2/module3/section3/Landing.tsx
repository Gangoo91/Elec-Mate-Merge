import {
  CircuitBoard,
  Cable,
  Activity,
  ShieldAlert,
  Wrench,
  Gauge,
  Calculator,
  Layers,
} from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '3.1',
    title: 'Final circuit types (3.1)',
    description:
      'Radial, ring, lighting loop-in, shower, cooker and FCU spurs — how each circuit works and when to use it.',
    icon: CircuitBoard,
    href: '3-1',
  },
  {
    number: '3.2',
    title: 'Wiring systems for different environments (3.2)',
    description:
      'T&E, SWA, MICC, FP200, conduit, trunking and tray — choosing the right system for the install environment.',
    icon: Cable,
    href: '3-2',
  },
  {
    number: '3.3',
    title: 'Minimum current carrying capacity (3.3)',
    description:
      'Reference Methods, Cg/Ca/Ci correction factors and BS 7671 Appendix 4 — sizing live conductors for the install.',
    icon: Activity,
    href: '3-3',
  },
  {
    number: '3.4',
    title: 'Protective device applications (3.4)',
    description:
      'BS 88 fuses, BS 60898 MCBs, RCBOs, RCDs, AFDDs and SPDs — what each device protects against and where it sits.',
    icon: ShieldAlert,
    href: '3-4',
  },
  {
    number: '3.5',
    title: 'Specialised wiring-system equipment (3.5)',
    description:
      'Rod and draw, fish tape, conduit benders, hydraulic crimps — the kit that makes wiring systems possible.',
    icon: Wrench,
    href: '3-5',
  },
  {
    number: '3.6',
    title: 'Spacing factor of enclosures (3.6)',
    description:
      'OSG Appendix H — calculating conduit and trunking fill so you don’t cook the cables you’ve installed.',
    icon: Gauge,
    href: '3-6',
  },
  {
    number: '3.7',
    title: 'Cable sizing worked end-to-end (3.3 synthesis)',
    description:
      'Synthesis — one real 32 A radial taken through every gate of the sizing calc, from CCC and Reference Method to voltage drop and thermal check.',
    icon: Calculator,
    href: '3-7',
  },
  {
    number: '3.8',
    title: 'Designing a small installation (3.1–3.6)',
    description:
      'LO3 synthesis — a small commercial unit designed end-to-end, producing a circuit schedule, protective device list, cable sizes and containment fill check.',
    icon: Layers,
    href: '3-8',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={3}
      title="Wiring systems theory"
      description="Final circuits, wiring systems for different environments, current-carrying capacity, protective devices, specialist tools and conduit/trunking fill — the theory behind every install you'll do. Aligned to LO3 of Unit 203."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Technical information and drawings"
      nextSectionHref="../section4"
      nextSectionLabel="Earthing systems and ADS"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 3 is the longest section in the module, and it earns it. Every
            decision you make in Module 4 — what cable to pull, what conduit to
            chase in, what MCB to land it on — flows from the six topics in here.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 3.1 covers the final-circuit families — radial, ring, lighting
            loop-in, shower, cooker, FCU spurs. Sub 3.2 covers wiring systems for
            different environments — T&E, SWA, MICC, FP200, conduit, trunking,
            tray. Sub 3.3 is current-carrying capacity — Reference Methods,
            Cg/Ca/Ci correction factors and BS 7671 Appendix 4. Sub 3.4 covers
            protective devices — BS 88, BS 60898, RCBOs, RCDs, AFDDs, SPDs. Sub
            3.5 covers the specialist tools that make all of this possible. Sub
            3.6 closes with the spacing-factor calc from OSG Appendix H — the
            maths that stops you stuffing too many cables into too small a
            conduit.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 3.7 and 3.8 are the synthesis pair. Sub 3.7 takes a single 32 A
            radial through every cable-sizing gate end-to-end — design current,
            Reference Method, derate stack, voltage drop, thermal check, Zs sanity
            check, mechanical install, the final Ib ≤ In ≤ Iz inequality. Sub 3.8
            then steps up to a complete small commercial unit and walks the whole
            LO3 toolkit through it — load list, diversity, circuit-by-circuit
            selection, schedule, devices, containment fill — producing the kind
            of design pack a supervisor will actually sign off.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of this section you should be able to look at a circuit
            schedule and explain every column on it.
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
