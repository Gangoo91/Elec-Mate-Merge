import { Activity, Repeat, Gauge, Compass, Power, FileSpreadsheet } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: '6.1',
    title: 'Testing continuity of CPC (6.1)',
    description: 'R1 + R2 across the circuit — the test that proves the earth path back to the MET is intact.',
    icon: Activity,
    href: '6-1',
  },
  {
    number: '6.2',
    title: 'Testing ring final circuit continuity (6.2)',
    description: 'End-to-end r1 / rn / r2 readings, then cross-connections to prove the ring is actually a ring.',
    icon: Repeat,
    href: '6-2',
  },
  {
    number: '6.3',
    title: 'Testing insulation resistance (6.3)',
    description: '500 V DC across L-N, L-E and N-E — minimum 1.0 MΩ for 230 V circuits.',
    icon: Gauge,
    href: '6-3',
  },
  {
    number: '6.4',
    title: 'Testing polarity (6.4)',
    description: 'Confirming line in the right place at every accessory and overcurrent device.',
    icon: Compass,
    href: '6-4',
  },
  {
    number: '6.5',
    title: 'Functional testing (6.5)',
    description: 'Operating switches, RCDs and interlocks under controlled conditions to prove they work as designed.',
    icon: Power,
    href: '6-5',
  },
  {
    number: '6.6',
    title: 'Recording test results (6.6)',
    description: 'The test schedule, schedule of inspections and the certificate that ties it all together.',
    icon: FileSpreadsheet,
    href: '6-6',
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
            Section 6 is the dead test sequence — the half-dozen tests every spark
            carries out on a new circuit before energising it for the live tests.
            Carried out in the right order, with leads nulled and instruments in
            calibration, they prove the install is safe to switch on.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Subs 6.1 to 6.4 walk the four core dead tests — CPC continuity, ring
            final, insulation resistance and polarity. Sub 6.5 covers functional
            testing of switches, RCDs and interlocks. Sub 6.6 closes the module with
            recording the lot on a schedule of test results that holds up to scrutiny.
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
