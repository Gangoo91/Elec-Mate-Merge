import { FileText, Ruler, Wrench, Cable, Plug, ShieldCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '3.1',
    title: 'Selecting materials from drawings (3.1)',
    description:
      'Reading the spec and the drawings to pull the right cable, accessories, containment and fixings before you start.',
    icon: FileText,
    href: '3-1',
  },
  {
    number: '3.2',
    title: 'Marking out from drawings (3.2)',
    description:
      'Translating dimensions on a layout into chalk lines, datum points and centre marks on the actual wall.',
    icon: Ruler,
    href: '3-2',
  },
  {
    number: '3.3',
    title: 'Fixing accessories to dimensions (3.3)',
    description:
      'Back boxes, dado, pattress and consumer units — fixed plumb, level and at the height the drawing specifies.',
    icon: Wrench,
    href: '3-3',
  },
  {
    number: '3.4',
    title: 'Installing wiring systems and supports (3.4)',
    description:
      'T&E, singles in conduit, trunking, tray, SWA — running, supporting and protecting cable to BS 7671 and the OSG.',
    icon: Cable,
    href: '3-4',
  },
  {
    number: '3.5',
    title: 'Terminating wiring systems (3.5)',
    description:
      'T&E, singles, flex, ferrules, sleeving, glands, crimps — clean, tight, identified terminations every time.',
    icon: Plug,
    href: '3-5',
  },
  {
    number: '3.6',
    title: 'Maintaining safe working practices throughout (3.6)',
    description:
      'JIB safe isolation, lock-off, prove dead, tidy as you go — the habits that turn a competent install into a safe one.',
    icon: ShieldCheck,
    href: '3-6',
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
      description="Reading drawings, marking out, fixing, installing, terminating and working safely throughout — aligned to LO3 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Preparing for installation"
      nextSectionHref="../section4"
      nextSectionLabel="Bonding mains services"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 3 is the heart of the unit — the install itself. By the time you
            reach it you have your tools, your hazards walked, your PPE on and your
            access set. Now the cable comes off the drum and the fixings come out of
            the box.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 3.1 to 3.3 walk the planning end — reading the drawings, marking out
            and fixing accessories. Sub 3.4 covers the actual install of wiring
            systems and supports across the common containment types. Sub 3.5 is
            terminations done properly. Sub 3.6 closes the section by threading JIB
            safe isolation and safe working practice through everything you have
            just done.
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
