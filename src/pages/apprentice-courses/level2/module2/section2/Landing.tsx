import { Scale, Move, Settings, Zap, Activity, TrendingUp } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '2.1',
    title: 'Mass vs weight (3.1)',
    description: 'The difference between mass (kg) and weight (N) — and why it matters on site.',
    icon: Scale,
    href: '2-1',
  },
  {
    number: '2.2',
    title: "Force and Newton's basics (3.2/3.3)",
    description: "Force, F = m × a, and Newton's three laws in plain English.",
    icon: Move,
    href: '2-2',
  },
  {
    number: '2.3',
    title: 'Levers, gears and pulleys (3.2)',
    description: 'Simple machines: classes of lever, gear ratios, pulley systems.',
    icon: Settings,
    href: '2-3',
  },
  {
    number: '2.4',
    title: 'Work and energy — kinetic and potential (3.3)',
    description: 'Work (W = F × d), KE = ½mv², PE = mgh, and energy conservation.',
    icon: Zap,
    href: '2-4',
  },
  {
    number: '2.5',
    title: 'Mechanical power (3.3)',
    description: 'Power as work over time (P = W ÷ t) and the link to electrical power.',
    icon: Activity,
    href: '2-5',
  },
  {
    number: '2.6',
    title: 'Efficiency, inter-relationships and calculations (3.3/3.4)',
    description:
      'Efficiency in motors and lifting kit, plus how force, work, energy and power link up.',
    icon: TrendingUp,
    href: '2-6',
  },
];

export default function Section2() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={2}
      title="Basic mechanics — force, work, energy and power"
      description="Mechanical principles for electricians: mass and weight, force, simple machines, work, energy, power and efficiency. Aligned to LO3 of Unit 202."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section1"
      prevSectionLabel="Maths and SI units for electrical work"
      nextSectionHref="../section3"
      nextSectionLabel="Resistance, voltage and current — the basics"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Why is mechanics in an electrical syllabus? Because every cable run involves
            lifting, hoisting, torquing and pulling — and because the maths of force,
            work, energy and power is the same maths you'll use later for I²R heating
            in Section 3 and electrical power in Section 4. Build it once, mechanically,
            and the electrical version comes for free.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 2.1 separates mass (kg) from weight (N) — the source of half the lifting
            mistakes on site. Sub 2.2 introduces force and Newton's three laws so
            F = m × a stops being a formula and starts being intuition. Sub 2.3 covers
            the simple machines you actually meet — levers, gears and pulleys — and how
            they trade force for distance. Sub 2.4 gives you work and energy
            (W = F × d, KE, PE). Sub 2.5 turns work into mechanical power (P = W ÷ t).
            Sub 2.6 ties the lot together with efficiency.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Watch for Sub 2.5 in particular — mechanical power in watts is the same
            quantity, in the same units, as the electrical power you'll calculate from
            P = VI in Section 4. Once you see that, Section 4 is half done already.
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
