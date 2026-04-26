import { Calculator, GitBranch, Split, Sigma, Power, Layers } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '4.1',
    title: "Ohm's law made simple (4.4/4.5)",
    description:
      "V = I × R in plain English, the triangle method, unit conversion and sanity-checking.",
    icon: Calculator,
    href: '4-1',
  },
  {
    number: '4.2',
    title: 'Series circuits — current and voltage (4.4/4.5)',
    description:
      'How current and voltage behave in series, voltage divider rule, total resistance.',
    icon: GitBranch,
    href: '4-2',
  },
  {
    number: '4.3',
    title: 'Parallel circuits — current and voltage (4.4/4.5)',
    description:
      'Branch voltages, current division, and equivalent resistance for parallel networks.',
    icon: Split,
    href: '4-3',
  },
  {
    number: '4.4',
    title: 'Total resistance — series and parallel calcs (4.5)',
    description:
      'Combining series and parallel resistors step-by-step, with worked examples.',
    icon: Sigma,
    href: '4-4',
  },
  {
    number: '4.5',
    title: 'Power in series and parallel (4.6)',
    description: 'P = VI, P = I²R, P = V²/R — choosing the right formula for the job.',
    icon: Power,
    href: '4-5',
  },
  {
    number: '4.6',
    title: 'Putting it together — worked DC circuits',
    description:
      'Recognising circuit types on site, series vs parallel pros/cons, end-to-end DC examples.',
    icon: Layers,
    href: '4-6',
  },
];

export default function Section4() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={4}
      title="DC circuits — series, parallel and power"
      description="Ohm's law, series and parallel circuits, total resistance, power calculations, and recognising circuit types on site — LO4 part 2 of Unit 202."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Resistance, voltage and current — the basics"
      nextSectionHref="../section5"
      nextSectionLabel="Magnetism and electromagnetism"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 3 explained what's happening inside a single conductor. Now we wire
            those individual components into circuits and analyse them on a meter — the
            day-to-day skill of every electrician on every fault-find, every test sheet
            and every design.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 4.1 nails Ohm's law — V = I × R, the triangle, sanity checks. Sub 4.2
            takes that into series circuits where current is the same everywhere and
            voltages add. Sub 4.3 flips it into parallel where voltage is the same
            everywhere and currents add. Sub 4.4 combines the two — reducing a mixed
            series-parallel network into a single equivalent resistance step by step.
            Sub 4.5 gives you the three power formulae (P = VI, P = I²R, P = V²/R) and
            shows you when to use each. Sub 4.6 ties everything together with full
            worked DC circuits in the formats you'll meet on a board.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By Sub 4.6 you'll be able to take any DC circuit, reduce it to a single
            equivalent resistance, find every current and voltage, and sanity-check the
            answer with KVL and KCL.
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
