import {
  GitBranch,
  Power,
  Cable,
  PipetteIcon,
  Workflow,
  Building2,
} from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import { VideoList } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const subsections = [
  {
    number: '4.1',
    title: 'Earthing systems (4.1)',
    description:
      'TN-S, TN-C-S (PME and PNB), TT and IT — the four earthing arrangements you’ll meet at UK cut-outs.',
    icon: GitBranch,
    href: '4-1',
  },
  {
    number: '4.2',
    title: 'Component parts of ADS (4.2)',
    description:
      'The Automatic Disconnection of Supply chain — live-to-fault to MET to PE conductor back to source.',
    icon: Power,
    href: '4-2',
  },
  {
    number: '4.3',
    title: 'Exposed conductive parts (4.3)',
    description:
      'What counts as an exposed conductive part — metalwork that’s only live under fault conditions.',
    icon: Cable,
    href: '4-3',
  },
  {
    number: '4.4',
    title: 'Extraneous conductive parts (4.4)',
    description:
      'The 1667 Ω rule — identifying metalwork that introduces a potential and decides whether it needs bonding.',
    icon: PipetteIcon,
    href: '4-4',
  },
  {
    number: '4.5',
    title: 'Earth fault loop impedance path (4.5)',
    description:
      'Ze, R1+R2 and Zs — the components of the fault loop and how they limit the disconnection time.',
    icon: Workflow,
    href: '4-5',
  },
  {
    number: '4.6',
    title: 'Earthing in practice — three real installs (4.1-4.5)',
    description:
      'Synthesis Sub — domestic TN-C-S, commercial TT and small industrial IT side by side. What changes between them, where you look up info on the day and the common mistakes per system.',
    icon: Building2,
    href: '4-6',
  },
];

export default function Section4() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={4}
      title="Earthing systems and ADS"
      description="The five UK earthing arrangements (TN-S, TN-C-S as PME, TN-C-S as PNB, TT, IT), the Automatic Disconnection of Supply chain, exposed and extraneous conductive parts, and the fault loop impedance path. Aligned to LO4 of Unit 203."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section3"
      prevSectionLabel="Wiring systems theory"
      nextSectionHref="../section5"
      nextSectionLabel="How electricity is supplied"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Earthing is the single biggest life-safety topic in the trade. Get it
            right and a fault clears in under 0.4 seconds with nobody getting hurt.
            Get it wrong and the first person to touch the fridge gets killed.
            Section 4 is the theory behind that — every Sub here feeds directly
            into the inspection and testing work in Module 7.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 4.1 covers the five UK earthing arrangements per BS 7671 A4:2026
            — TN-S, TN-C-S (PME), TN-C-S (PNB — the new A4:2026 distinction), TT
            and IT. Sub 4.2 walks the Automatic Disconnection of Supply chain
            end-to-end — live to fault, to MET, back along the PE conductor to
            source. Sub 4.3 covers exposed conductive parts (the metalwork that's
            only live under fault). Sub 4.4 covers extraneous conductive parts and
            the famous 1667 Ω test that decides whether you bond. Sub 4.5
            closes with the earth fault loop impedance path — Ze, R1+R2, Zs — and
            why each piece matters.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 4.6 is the synthesis Sub — three real installs side by side
            (domestic TN-C-S, commercial TT, small industrial IT), showing what
            changes between them, where you look up information on the day and
            the common mistakes specific to each system.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of this section you'll be able to look at a cut-out and
            tell the supervisor the earthing system, the bonding requirements and
            roughly what you'd expect Zs to read on a circuit.
          </p>
        </div>
      }
      belowGrid={
        <VideoList
          title="Extra videos for keen learners"
          videos={[
            videos.circuitBreakersDontProtectPeople,
            videos.zeTest,
            videos.relays,
          ]}
        />
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
