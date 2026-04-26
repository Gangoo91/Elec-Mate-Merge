import { Cpu, ArrowRight, Battery, ToggleLeft, Eye, ShieldAlert } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import { VideoList } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const subsections = [
  {
    number: '6.1',
    title: 'Why electronics matters on site + the resistor (6.1)',
    description:
      "Why a spark needs the basics, plus the resistor as a component (colour code, series/parallel).",
    icon: Cpu,
    href: '6-1',
  },
  {
    number: '6.2',
    title: 'Diodes and rectifiers (6.1/6.2)',
    description:
      'Diode operation, half-wave and full-wave (bridge) rectification, on-site examples.',
    icon: ArrowRight,
    href: '6-2',
  },
  {
    number: '6.3',
    title: 'Capacitors (6.1/6.2)',
    description:
      'Capacitance in farads, charging/discharging, and uses (motor start, PFC, smoothing).',
    icon: Battery,
    href: '6-3',
  },
  {
    number: '6.4',
    title: 'Transistors and switching (6.1/6.2)',
    description:
      'BJT and FET basics, transistor as a switch, examples in drives and dimmers.',
    icon: ToggleLeft,
    href: '6-4',
  },
  {
    number: '6.5',
    title: 'Sensors — LDR, thermistor, NTC/PTC (6.1)',
    description:
      'Light- and temperature-dependent resistors and where you meet them on site.',
    icon: Eye,
    href: '6-5',
  },
  {
    number: '6.6',
    title:
      'Real on-site electronics — relays, contactors, RCD/AFDD electronics, surge protection (6.1)',
    description:
      'Relays vs contactors, RCD/AFDD detection electronics, surge protection devices (SPDs).',
    icon: ShieldAlert,
    href: '6-6',
  },
];

export default function Section6() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={6}
      title="Electronic components in electrical systems"
      description="Resistors, diodes, capacitors, transistors, sensors and the on-site electronics inside relays, RCDs, AFDDs and SPDs — LO6 of Unit 202."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="Magnetism and electromagnetism"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            The last section closes the loop: every device inside a modern consumer
            unit is built from the components you'll meet here. Smart RCBOs, AFDDs,
            SPDs, dimmers and drives all live or die on the resistors, diodes,
            capacitors, transistors and sensors inside them.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 6.1 covers why electronics matters on site, plus the resistor — colour
            code, series and parallel. Sub 6.2 introduces the diode and its job in
            half-wave and full-wave rectification. Sub 6.3 takes on the capacitor —
            farads, charging, discharging, and uses in motor start, power factor
            correction and smoothing. Sub 6.4 covers the transistor as a switch (BJT
            and FET basics) — the device behind every drive and dimmer. Sub 6.5
            introduces sensors — LDRs, thermistors, NTC and PTC. Sub 6.6 ties it all
            together with on-site electronics: relays vs contactors, RCD and AFDD
            detection circuits, and surge protection devices.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Sub 6.6 you'll be able to look at a smart RCBO, AFDD or SPD
            and recognise the resistors, diodes, capacitors, transistors and sensors
            inside it.
          </p>
        </div>
      }
      belowGrid={
        <div className="pt-4">
          <VideoList
            title="Go deeper — extra electronics videos"
            videos={[videos.capacitorCalcs, videos.inductors, videos.leds, videos.fuses]}
          />
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
