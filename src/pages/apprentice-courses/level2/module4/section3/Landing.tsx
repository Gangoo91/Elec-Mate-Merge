import { FileText, Ruler, Wrench, Cable, Plug, ShieldCheck, Lock, Layers, ArrowRightLeft } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '3.1',
    title: 'Selecting materials from drawings (3.1)',
    description:
      'Reading the cable, accessory, containment and CU schedules. Cross-checking layout against schematic, taking off quantities, applying allowances.',
    icon: FileText,
    href: '3-1',
  },
  {
    number: '3.2',
    title: 'Marking out from drawings (3.2)',
    description:
      'Datums and FFL, standard heights, scale reading, marking media by substrate, tolerances. Translating a 1:50 layout into chalk on the wall.',
    icon: Ruler,
    href: '3-2',
  },
  {
    number: '3.3',
    title: 'Fixing accessories to dimensions (3.3)',
    description:
      'Back-boxes (steel, plastic, surface), depth selection, fixings by substrate, levelling and flushness. Setting boxes 1-3 mm recessed below the plaster line.',
    icon: Wrench,
    href: '3-3',
  },
  {
    number: '3.4',
    title: 'Installing wiring systems and supports (3.4)',
    description:
      'PVC and steel conduit, trunking, basket and ladder. OSG support intervals, A4:2026 fire-support requirement (Reg 521.10.202 — applies throughout), bend radii.',
    icon: Cable,
    href: '3-4',
  },
  {
    number: '3.5',
    title: 'Terminating wiring systems (3.5)',
    description:
      'Conductor prep, strip length, ferrules for stranded, torque settings, crimp lugs. BS 7671 526.1 / 526.5 / 526.9 (A4:2026 update) termination regulations.',
    icon: Plug,
    href: '3-5',
  },
  {
    number: '3.6',
    title: 'Maintaining safe working practices (3.6)',
    description:
      'Tidy as you go, lockout on upstream devices, communication with other trades and customers, working hours, welfare, fatigue, end-of-shift sign-off.',
    icon: ShieldCheck,
    href: '3-6',
  },
  {
    number: '3.7',
    title: 'JIB safe isolation procedures (3.7)',
    description:
      'The full JIB 9-step safe isolation procedure end-to-end. EAWR Reg 12/13/14, HSE GS38 voltage indicators, lockout-tagout, worked example on a 3-phase board.',
    icon: Lock,
    href: '3-7',
  },
  {
    number: '3.8',
    title: 'Wiring system selection deep dive',
    description:
      'T&E vs SWA vs MICC vs FP200/FP400 vs LSZH. Selection by environment, fire risk, mechanical risk, route type. A4:2026 escape-route cable selection.',
    icon: Layers,
    href: '3-8',
  },
  {
    number: '3.9',
    title: 'Cable pulling and dressing techniques',
    description:
      'Pre-pull prep, draw rope, lubricant, tension limits, pulling grips and eyes, bend radius, long-pull tactics, tray / basket dressing.',
    icon: ArrowRightLeft,
    href: '3-9',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={3}
      title="Installing wiring systems and enclosures"
      description="Reading drawings, marking out, fixing, installing, terminating, working safely throughout, and the JIB safe isolation procedure — aligned to LO3 of Unit 204. Plus supplementary deep dives on cable selection and pulling technique."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Preparing for installation"
      nextSectionHref="../section4"
      nextSectionLabel="Bonding mains services"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 3 is the heart of the unit — the install itself. By the time
            you reach it you have your tools, your hazards walked, your PPE on
            and your access set. Now the cable comes off the drum and the fixings
            come out of the box.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 3.1 to 3.3 walk the planning end — reading the drawings, marking
            out and fixing accessories. Sub 3.4 covers the actual install of wiring
            systems and supports across the common containment types. Sub 3.5 is
            terminations done properly. Sub 3.6 covers the safe-working discipline
            that runs through the whole job. Sub 3.7 is the JIB safe isolation
            procedure end-to-end — the procedure that keeps you alive. Subs 3.8
            and 3.9 are supplementary deep dives on cable selection and the
            mechanical craft of pulling and dressing cable.
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
