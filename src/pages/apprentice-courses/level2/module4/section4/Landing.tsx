import { Ruler, Plug, Link2, Activity } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '4.1',
    title: 'Identifying cable sizes (4.1)',
    description:
      '10 mm² / 16 mm² / 25 mm² — the rules in BS 7671 411 and 544 that decide which to fit for main bonding.',
    icon: Ruler,
    href: '4-1',
  },
  {
    number: '4.2',
    title: 'Terminating bonding cables (4.2)',
    description:
      'Stripping, sleeving, identifying and landing the bond cable into the MET and the clamp without damage.',
    icon: Plug,
    href: '4-2',
  },
  {
    number: '4.3',
    title: 'Connecting bonding clamps (4.3)',
    description:
      'BS 951 clamps within 600 mm of the meter, on clean pipework — gas, water, oil and structural steel.',
    icon: Link2,
    href: '4-3',
  },
  {
    number: '4.4',
    title: 'Testing continuity of main bonds (4.4)',
    description:
      'Low-resistance ohmmeter, leads nulled, reading recorded — the test that proves the bond actually does its job.',
    icon: Activity,
    href: '4-4',
  },
];

export default function Section4() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={4}
      title="Bonding mains services"
      description="Sizing, terminating, clamping and testing main protective bonding — aligned to LO4 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Installing wiring systems and enclosures"
      nextSectionHref="../section5"
      nextSectionLabel="Inspecting a dead installation"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 4 is main bonding — sizing, terminating, clamping and proving the
            connection that ties extraneous-conductive parts (gas, water, oil,
            structural steel) back to the main earthing terminal. Get this wrong and a
            fault on a separate appliance can put dangerous voltage onto every metal
            pipe in the building.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 4.1 covers picking the right cable size against BS 7671 544.1. Sub 4.2
            walks the termination of bonding cables — sleeving, labelling and landing.
            Sub 4.3 covers BS 951 clamps onto each service. Sub 4.4 closes the section
            with the continuity test and how the result lands on the test schedule.
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
