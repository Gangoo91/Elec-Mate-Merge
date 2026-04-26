import { HardHat, Shield, Search, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'The purpose of PPE',
    description:
      'Why PPE exists, where it sits in the hierarchy of control, and why it’s the LAST line of defence — not the first.',
    icon: Shield,
    href: '4-1',
  },
  {
    number: 'Subsection 2',
    title: 'PPE for electrical work',
    description:
      'The specific PPE for sparks — ratings, standards and what each piece actually protects against.',
    icon: HardHat,
    href: '4-2',
  },
  {
    number: 'Subsection 3',
    title: 'GS38 — test instruments and leads',
    description:
      'The HSE guidance that defines what makes a tester safe for live work — probes, fuses, finger guards, CAT ratings, prove–test–prove.',
    icon: Search,
    href: '4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Safe working practices on site',
    description:
      'Pre-use checks, lone working, fatigue, drugs and alcohol, mental fitness — the daily habits that turn the regs into a safe working day.',
    icon: Wrench,
    href: '4-4',
  },
];

export default function Section4() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={4}
      title="PPE and safe working practices"
      description="Selection, use and maintenance of protective equipment and safe working methods."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Risk assessment and method statements"
      nextSectionHref="../section5"
      nextSectionLabel="Safe isolation procedures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 3 wrote the plan. Section 4 covers the kit and the daily
            habits that turn the plan into a safe working day. PPE is the LAST
            line of defence — eliminate, substitute, engineer and administrate
            the hazard out first, then put the gloves on. Get this section
            solid and you’ll stop seeing PPE as the first answer and start
            seeing it as the safety net underneath every other control.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Sub 1</span> covers the
            purpose of PPE and the hierarchy of control — why glove and goggles
            comes after every other option.{' '}
            <span className="text-white font-medium">Sub 2</span> covers the
            specific PPE a spark wears — Class 0 gloves, AS/NZS arc-rated
            clothing, EN 397 hard hats, EN 166 eye protection — and the
            standards each piece is rated to.{' '}
            <span className="text-white font-medium">Sub 3</span> dives into
            GS38 — the HSE guidance that defines a safe tester, the probe
            limits, finger guards and CAT ratings, plus the prove–test–prove
            rule that catches a broken indicator before it kills you.{' '}
            <span className="text-white font-medium">Sub 4</span> closes with
            the daily habits — pre-use checks, lone working, fatigue, drugs,
            alcohol and mental fitness — the unglamorous routines that turn
            the regs into a working day rather than a paragraph.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you’ll be able to pick the right PPE for any job, prove
            a tester before you trust it, and recognise the day-to-day risks
            (tiredness, distraction, working alone) that quietly cause more
            incidents than any single piece of failed equipment.
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
