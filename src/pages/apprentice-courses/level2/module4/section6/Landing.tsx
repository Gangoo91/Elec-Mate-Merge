import { Activity, Repeat, Gauge, Compass, Power, FileSpreadsheet, ListChecks, ClipboardCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '6.1',
    title: 'Test continuity of protective conductor (6.1)',
    description: 'R1+R2 and R2-only methods — leads nulled, low-resistance ohmmeter, acceptance against A4:2026 Table 41.3.',
    icon: Activity,
    href: '6-1',
  },
  {
    number: '6.2',
    title: 'Test ring final circuit (6.2)',
    description: 'The three-part test — end-to-end r1/rn/r2, then L-N and L-CPC cross-connections to prove the ring really is a ring.',
    icon: Repeat,
    href: '6-2',
  },
  {
    number: '6.3',
    title: 'Test insulation resistance (6.3)',
    description: '500 V DC L-N / L-E / N-E plus the A4:2026 250 V DC follow-up after reconnection of disconnected electronics.',
    icon: Gauge,
    href: '6-3',
  },
  {
    number: '6.4',
    title: 'Test polarity (6.4)',
    description: 'Single-pole devices in the line, BC/ES outer contacts on neutral, line on the right terminal at every accessory.',
    icon: Compass,
    href: '6-4',
  },
  {
    number: '6.5',
    title: 'Test functionality (6.5)',
    description: 'A4:2026 simplified RCD trip-time test (≤ 300 ms at 1×IΔn), switchgear, interlocks, emergency stops, AFDD test facilities.',
    icon: Power,
    href: '6-5',
  },
  {
    number: '6.6',
    title: 'Record test results (6.6)',
    description: 'EIC + Schedule of Inspections + STR — the three-form certification pack required by Section 644.',
    icon: FileSpreadsheet,
    href: '6-6',
  },
  {
    number: '6.7',
    title: 'A4:2026 dead-test sequence end-to-end',
    description: 'Walk-through of the full sequence on an 8-circuit domestic CU swap-out, with realistic readings and the bridge to live tests.',
    icon: ListChecks,
    href: '6-7',
  },
  {
    number: '6.8',
    title: 'Completing the Schedule of Test Results',
    description: 'Column-by-column walk-through of the IET model STR with a fully worked row for a 32 A Type B RCBO ring final.',
    icon: ClipboardCheck,
    href: '6-8',
  },
];

export default function Section6() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={6}
      title="Testing a dead installation"
      description="Continuity, ring final, IR, polarity, functional checks and recording results — aligned to LO6 of Unit 204."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Inspecting a dead installation"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Section 6 is the dead-test sequence — the tests every electrician carries
            out on a new circuit before energising it for the live tests. Carried out
            in the right order, with leads nulled and instruments in calibration,
            they prove the installation is safe to switch on.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 6.1 to 6.4 walk the four core dead tests — CPC continuity, ring
            final, insulation resistance and polarity. Sub 6.5 covers functional
            testing of switches, RCDs and interlocks per the simplified A4:2026
            method. Sub 6.6 covers recording the lot on the certification pack.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 6.7 and 6.8 are the supplementary deep-dives. Sub 6.7 walks the
            full A4:2026 dead-test sequence end-to-end on a domestic CU swap-out
            with realistic readings at every step. Sub 6.8 walks every column of
            the Schedule of Test Results with a fully worked row.
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
