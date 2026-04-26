import {
  ScrollText,
  Ruler,
  Cable,
  ShieldCheck,
  Zap,
  Sun,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Industry regulations and what they mean',
    icon: ScrollText,
    description:
      'LO1 — statutory (HASAWA, EAWR, ESQCR, Building Regs Part P) and non-statutory (BS 7671, GN3, OSG, JIB, NICEIC, NAPIT) regs and what each one obliges you to do.',
    href: 'section1',
  },
  {
    id: 2,
    title: 'Technical information and drawings',
    icon: Ruler,
    description:
      'LO2 — sources of technical information, drawing types (block, schematic, wiring, layout), BS EN 60617 symbols and scale conversion.',
    href: 'section2',
  },
  {
    id: 3,
    title: 'Wiring systems theory',
    icon: Cable,
    description:
      'LO3 — final-circuit types, wiring systems for different environments, current-carrying capacity, protective devices, specialist tools and conduit/trunking fill.',
    href: 'section3',
  },
  {
    id: 4,
    title: 'Earthing systems and ADS',
    icon: ShieldCheck,
    description:
      'LO4 — earthing systems (TN-S, TN-C-S/PME-PNB, TT, IT), the ADS chain, exposed and extraneous conductive parts, and the earth fault loop impedance path.',
    href: 'section4',
  },
  {
    id: 5,
    title: 'How electricity is supplied',
    icon: Zap,
    description:
      'LO5 — generation methods, transmission voltages (400/275/132 kV), distribution voltages (33/11 kV / 400/230 V) and the UK distribution network end-to-end.',
    href: 'section5',
  },
  {
    id: 6,
    title: 'Micro-renewable energy',
    icon: Sun,
    description:
      'LO6 — types of micro-renewables (PV, wind, hydro, micro-CHP, heat pumps, batteries), installation requirements (G98/G99, MCS, BS 7671 712) and trade-offs.',
    href: 'section6',
  },
];

export default function Module3() {
  useSEO({
    title: 'Module 3: Electrical installations technology | Level 2 Electrical | Elec-Mate',
    description:
      'Regulations, drawings, wiring systems theory, earthing, the supply network and micro-renewables — aligned to City & Guilds 2365-02 Unit 203.',
  });

  return (
    <ModuleShell
      backTo=".."
      backLabel="Level 2 electrical installation"
      moduleNumber={3}
      title="Electrical installations technology"
      description="City & Guilds 2365-02 Unit 203 — regulations, drawings, wiring systems, earthing, supply network and micro-renewables. The theory you need before installing anything."
      tone="emerald"
      sectionsCount={sections.length}
      prevModuleHref="../module2"
      prevModuleLabel="Principles of electrical science"
      nextModuleHref="../module4"
      nextModuleLabel="Installation of wiring systems and enclosures"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Module 3 is the bridge between the science of Module 2 and the hands-on
            installation work of Module 4. Every cable you'll ever pull, every board
            you'll ever wire, sits inside a framework of regulations, drawings and
            system design — and this module is where that framework gets built.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            <span className="text-white font-medium">Section 1</span> sets the legal
            and industry ground — the statutory regs (HASAWA, EAWR, ESQCR, Building
            Regs Part P) and non-statutory guidance (BS 7671, GN3, OSG, JIB) you
            answer to every shift.{' '}
            <span className="text-white font-medium">Section 2</span> shows you how
            to read the technical information you'll be handed on day one — drawings,
            specs, RAMS, BS EN 60617 symbols and scale.{' '}
            <span className="text-white font-medium">Section 3</span> covers wiring
            systems theory — circuit types, environments, current-carrying capacity,
            protective devices and conduit fill.{' '}
            <span className="text-white font-medium">Section 4</span> opens up
            earthing — TN-S, TN-C-S, TT, IT, the Automatic Disconnection of Supply
            chain, exposed and extraneous conductive parts, and the fault loop.{' '}
            <span className="text-white font-medium">Section 5</span> zooms out to
            the National Grid — how electricity is generated, transmitted and
            distributed to the cut-out at your customer's wall. And{' '}
            <span className="text-white font-medium">Section 6</span> closes the
            module on micro-renewables — PV, wind, hydro, heat pumps, batteries —
            and the G98/G99 / MCS framework that governs them.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end of Module 3 you'll be able to read a drawing pack, pick the
            right wiring system and protective devices, identify the earthing
            arrangement at the cut-out and explain how the supply got there in the
            first place — the theory floor for everything you install in Module 4
            and beyond.
          </p>
        </div>
      }
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={section.href}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
