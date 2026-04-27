import { Hammer, Drill, ShieldAlert, Cable, Gauge } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '1.1',
    title: 'Hand tools for different tasks (1.1)',
    description:
      "Eight categories of hand tool — cutting, forming, stripping, terminating, measuring, marking, fixing, cable management — and which one to reach for when.",
    icon: Hammer,
    href: '1-1',
  },
  {
    number: '1.2',
    title: 'Power tools for different tasks (1.2)',
    description:
      'Drills, SDS, grinders, jigsaws and the 110 V site supply story — picking the right tool by substrate and the PUWER training duty.',
    icon: Drill,
    href: '1-2',
  },
  {
    number: '1.3',
    title: 'Safety checks used for tools (1.3)',
    description:
      'The layered inspection routine — pre-use visual every shift, in-service inspection, formal PAT cycle. PUWER Reg 5 + EAWR Reg 4(2).',
    icon: ShieldAlert,
    href: '1-3',
  },
  {
    number: '1.4',
    title: 'Cable-prep tools deep dive (supplementary)',
    description:
      'Strippers, ratchet crimpers, ferrule colour codes (DIN 46228-4) and preset torque drivers — the precision toolkit behind BS 7671 526.1 terminations.',
    icon: Cable,
    href: '1-4',
  },
  {
    number: '1.5',
    title: 'Test instruments overview (supplementary)',
    description:
      'Multimeter, MFT, clamp meter, voltage tester + proving unit, socket tester. GS38 finger guards, calibration intervals and the orientation for LO6.',
    icon: Gauge,
    href: '1-5',
  },
];

export default function Section1() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={1}
      title="Tools used to install wiring systems"
      description="Hand tools, power tools and the safety checks that keep them on site — aligned to LO1 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      nextSectionHref="../section2"
      nextSectionLabel="Preparing for installation"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 1 is the toolbox — what to carry, what to plug in and what to check
            before either gets near a job. The tools themselves are simple; the
            difference between a tidy electrician and a hospital admission is knowing which
            tool fits which task and spotting the one that has gone bad before it bites.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 1.1 walks the hand tools you reach for every shift — pliers, strippers,
            screwdrivers, levels, tape. Sub 1.2 covers the power tools — drills, SDS,
            grinders, jigsaws — and the 110 V site transformer rules that come with
            them. Sub 1.3 closes the AC-tagged content with the safety checks and
            maintenance routine that keep a pouch and a flight case fit for use.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Two supplementary Subs sit on top. Sub 1.4 is a deep dive into the
            cable-prep toolkit — auto-strippers, ratchet crimpers, the DIN 46228-4
            bootlace ferrule colour code and the preset torque drivers that make
            BS 7671 526.1 terminations consistent. Sub 1.5 is the orientation for
            LO6 — multimeter, MFT, clamp meter, voltage tester + proving unit, socket
            tester — so the inspect / test deep dives in §5 and §6 can dive straight
            into procedure.
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
