import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  BookOpen,
  BarChart3,
  FileCheck2,
  Grid3X3,
  ClipboardList,
  Building,
  Plug,
  Layers,
  Table2,
} from 'lucide-react';

export default function ElectricalLoadSchedulePage() {
  return (
    <ToolTemplate
      title="Electrical Load Schedule Calculator | Free Tool"
      description="Build a circuit-by-circuit electrical load schedule with automatic diversity and total demand calculation. Covers domestic and commercial installations to BS 7671. Free UK electrical calculator for electricians and designers."
      datePublished="2026-01-28"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Electrical Load Schedule', href: '/tools/electrical-load-schedule' },
      ]}
      tocItems={[
        { id: 'what-is-load-schedule', label: 'What Is a Load Schedule?' },
        { id: 'why-load-schedules-matter', label: 'Why Load Schedules Matter' },
        { id: 'building-the-schedule', label: 'Building the Schedule' },
        { id: 'diversity-application', label: 'Applying Diversity' },
        { id: 'three-phase-balancing', label: 'Three-Phase Load Balancing' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="BS 7671 Compliant"
      badgeIcon={Grid3X3}
      heroTitle={
        <>
          <span className="text-yellow-400">Electrical Load Schedule Calculator</span> —
          Circuit-by-Circuit Demand Analysis
        </>
      }
      heroSubtitle="Build a complete load schedule for any installation. List every circuit, apply IET diversity factors, and calculate the total maximum demand automatically. Essential for supply assessments, EIC certificates, and design documentation. Part of Elec-Mate's 50+ electrical calculators."
      heroFeaturePills={[
        { icon: ClipboardList, label: 'Circuit Listing' },
        { icon: BarChart3, label: 'Diversity Applied' },
        { icon: Grid3X3, label: 'Phase Balancing' },
        { icon: Shield, label: 'BS 7671' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'A load schedule lists every circuit in the installation with its connected load, protective device, cable size, and design current.',
        'Diversity is applied per IET On-Site Guide Table 1A to calculate the assessed maximum demand, which determines whether the supply is adequate.',
        'For three-phase installations, the load schedule shows phase allocation and helps balance loads across L1, L2, and L3.',
        'The total demand from the load schedule feeds directly into supply assessments, EIC certificates, and design documentation.',
        'Elec-Mate builds load schedules interactively — add circuits, and diversity and totals update in real time.',
      ]}
      sections={[
        {
          id: 'what-is-load-schedule',
          heading: 'What Is an Electrical Load Schedule?',
          content: (
            <>
              <p>
                An electrical load schedule is a tabulated list of every circuit in an electrical
                installation, showing the connected load, protective device rating, cable size, and
                design current for each circuit. It is the master document that captures the entire
                electrical demand of a building, from individual lighting circuits to heavy power
                feeds.
              </p>
              <p>
                The load schedule serves multiple purposes. For the designer, it is the basis for
                calculating the total maximum demand and verifying that the incoming supply is
                adequate. For the installer, it is the specification that defines what to install.
                For the inspector, it is the reference document checked during{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR inspections</SEOInternalLink>{' '}
                and initial verification. For the building owner, it is a permanent record of the
                electrical installation.
              </p>
              <p>
                A properly prepared load schedule includes the circuit reference number, circuit
                description (what the circuit supplies), the connected load in watts, the design
                current in amps, the protective device type and rating, the cable type and size, the
                wiring method, and the phase allocation for three-phase installations. It is one of
                the most important design documents an electrician produces, yet it is also one of
                the most time-consuming to prepare manually.
              </p>
            </>
          ),
          appBridge: {
            title: 'Build Load Schedules Interactively',
            description:
              'Add circuits one by one. Elec-Mate calculates design currents, applies diversity, and totals the maximum demand in real time. Export as PDF for your project records.',
            icon: ClipboardList,
          },
        },
        {
          id: 'why-load-schedules-matter',
          heading: 'Why Load Schedules Matter for Every Installation',
          content: (
            <>
              <p>
                Load schedules are not optional documentation — they are a fundamental part of
                electrical design and certification. The following scenarios all depend on an
                accurate load schedule:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Supply assessment</span> — the DNO
                  requires a maximum demand figure when you apply for a new supply or an upgrade.
                  This figure comes directly from the load schedule with diversity applied.
                </li>
                <li>
                  <span className="font-semibold text-white">EIC and EICR certificates</span> —
                  Section 6 of the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> and Section F
                  of the EICR require the assessed maximum demand. You cannot complete these
                  certificates accurately without a load schedule.
                </li>
                <li>
                  <span className="font-semibold text-white">Main cable and switchgear sizing</span>{' '}
                  — the load schedule determines the size of the main tails, the rating of the main
                  switch, and the busbar rating of the distribution board.
                </li>
                <li>
                  <span className="font-semibold text-white">Generator and UPS sizing</span> — if
                  the installation has standby generation or{' '}
                  <SEOInternalLink href="/tools/battery-backup-calculator">
                    battery backup
                  </SEOInternalLink>
                  , the load schedule identifies which circuits are essential and their combined
                  demand.
                </li>
                <li>
                  <span className="font-semibold text-white">Three-phase balancing</span> — for
                  three-phase installations, the load schedule ensures loads are distributed evenly
                  across phases, preventing neutral overloading and voltage imbalance.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'building-the-schedule',
          heading: 'Building the Load Schedule — What to Include',
          content: (
            <>
              <p>
                Each row in the load schedule represents one circuit. The following columns are
                standard for UK electrical design:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
                <div className="grid grid-cols-3 gap-px bg-white/10">
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Column
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Description
                  </div>
                  <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
                    Example
                  </div>
                </div>
                {[
                  {
                    col: 'Circuit Ref',
                    desc: 'Circuit number or reference',
                    example: 'C1, C2, C3...',
                  },
                  {
                    col: 'Description',
                    desc: 'What the circuit supplies',
                    example: 'Ground floor sockets',
                  },
                  {
                    col: 'Connected Load',
                    desc: 'Total load in watts',
                    example: '7,360 W (32 A ring)',
                  },
                  {
                    col: 'Design Current (Ib)',
                    desc: 'Current drawn by the load',
                    example: '32 A',
                  },
                  {
                    col: 'Protective Device',
                    desc: 'Type and rating',
                    example: 'B32 MCB / 30 mA RCBO',
                  },
                  { col: 'Cable Type & Size', desc: 'Cable specification', example: '2.5 mm² T&E' },
                  {
                    col: 'Wiring Method',
                    desc: 'Installation method',
                    example: 'Clipped direct, Ref C',
                  },
                  { col: 'Phase', desc: 'Phase allocation (3-phase)', example: 'L1, L2, or L3' },
                ].map((row) => (
                  <div key={row.col} className="grid grid-cols-3 gap-px bg-white/5">
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.col}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.desc}</div>
                    <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.example}</div>
                  </div>
                ))}
              </div>
              <p>
                For domestic installations, the load schedule is typically simple — 6 to 12 circuits
                covering lighting, socket outlets, cooker, shower, immersion heater, and EV charger.
                For commercial installations, the schedule may run to 50 or more circuits across
                multiple distribution boards. Elec-Mate supports both, with the ability to create
                sub-schedules for each distribution board and roll up to a main schedule. The{' '}
                <SEOInternalLink href="/tools/diversity-factor-calculator">
                  diversity factor calculator
                </SEOInternalLink>{' '}
                applies the correct percentages for each load type.
              </p>
            </>
          ),
        },
        {
          id: 'diversity-application',
          heading: 'Applying Diversity to the Load Schedule',
          content: (
            <>
              <p>
                Once every circuit is listed with its connected load, diversity is applied to
                calculate the assessed maximum demand. Without diversity, the total connected load
                of a typical domestic installation might exceed 30 kW. With diversity applied per
                IET On-Site Guide Table 1A, the assessed maximum demand typically falls to 12-18 kW.
              </p>
              <p>
                Diversity is applied by load type, not by circuit. The main categories and their
                diversity allowances are:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-semibold text-white">Lighting:</span> 66% of total connected
                  load
                </li>
                <li>
                  <span className="font-semibold text-white">Socket outlets:</span> first 10 A at
                  100%, then 50% of remainder
                </li>
                <li>
                  <span className="font-semibold text-white">Cooking appliances:</span> 10 A + 30%
                  of remainder + 5 A if socket outlet on cooker unit
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Showers, immersion heaters, storage heating:
                  </span>{' '}
                  100% (no diversity)
                </li>
                <li>
                  <span className="font-semibold text-white">EV charge points:</span> 100% for
                  single domestic unit
                </li>
              </ul>
              <p>
                Elec-Mate applies these rules automatically as you build the schedule. Each circuit
                is categorised by load type, and the diversity percentages are applied in the
                summary section. The result is the assessed maximum demand — the figure you enter on
                the <SEOInternalLink href="/tools/eic-certificate">EIC certificate</SEOInternalLink>{' '}
                and compare against the supply rating.
              </p>
            </>
          ),
          appBridge: {
            title: 'Diversity Applied Automatically',
            description:
              'Elec-Mate categorises each circuit by load type and applies IET On-Site Guide Table 1A diversity factors automatically. The assessed maximum demand updates in real time as you add circuits.',
            icon: BarChart3,
          },
        },
        {
          id: 'three-phase-balancing',
          heading: 'Three-Phase Load Balancing',
          content: (
            <>
              <p>
                For three-phase installations, the load schedule must show the phase allocation for
                each circuit. The aim is to balance the total load as evenly as possible across the
                three phases (L1, L2, L3) to minimise neutral current and prevent voltage imbalance.
              </p>
              <p>
                Perfect balance is rarely achievable in practice because individual circuit loads
                vary, but the designer should aim for the highest loaded phase to be within 10-15%
                of the lowest loaded phase. Significant imbalance causes excessive neutral current
                (which can overheat the neutral conductor in a system without an oversized neutral),
                voltage differences between phases (which can damage sensitive equipment), and
                reduced capacity from the supply transformer.
              </p>
              <p>
                Elec-Mate's load schedule calculator includes a phase balance display showing the
                total load on each phase and the percentage imbalance. As you allocate circuits to
                phases, the display updates in real time, helping you achieve good balance before
                installation begins. This is particularly important when combined with the{' '}
                <SEOInternalLink href="/tools/three-phase-power-calculator">
                  three-phase power calculator
                </SEOInternalLink>{' '}
                for commercial and industrial projects.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Create a new load schedule',
          text: 'Open the load schedule calculator in Elec-Mate. Choose domestic or commercial template, or start with a blank schedule. Name the schedule and set the supply details (single-phase or three-phase, supply rating).',
        },
        {
          name: 'Add circuits',
          text: 'Add each circuit with its description, connected load, protective device, and cable size. For common circuit types (ring final, radial, lighting, cooker, shower), select from pre-built templates that auto-fill typical values.',
        },
        {
          name: 'Assign phases (three-phase only)',
          text: 'For three-phase installations, assign each single-phase circuit to L1, L2, or L3. Three-phase circuits are automatically allocated across all phases. Monitor the phase balance display as you allocate.',
        },
        {
          name: 'Review diversity and totals',
          text: 'The summary section shows the total connected load, the diversity-applied load per category, and the assessed maximum demand. Verify that the maximum demand does not exceed the supply rating.',
        },
        {
          name: 'Export or link to certificate',
          text: 'Export the load schedule as a PDF for your design records, or link it directly to an EIC or EICR certificate. The assessed maximum demand figure is automatically entered on the certificate.',
        },
      ]}
      howToHeading="How to Build a Load Schedule"
      howToDescription="Five steps from blank schedule to complete demand analysis."
      features={[
        {
          icon: ClipboardList,
          title: 'Interactive Circuit Entry',
          description:
            'Add circuits with descriptions, loads, protective devices, and cables. Pre-built templates for common domestic and commercial circuit types speed up entry.',
        },
        {
          icon: BarChart3,
          title: 'Automatic Diversity',
          description:
            'IET On-Site Guide Table 1A diversity factors applied automatically by load type. Assessed maximum demand updates in real time as you add circuits.',
        },
        {
          icon: Grid3X3,
          title: 'Three-Phase Balancing',
          description:
            'Phase balance display for three-phase installations. See the load on each phase and the percentage imbalance, updated in real time.',
        },
        {
          icon: Table2,
          title: 'Multi-Board Support',
          description:
            'Create sub-schedules for each distribution board and roll up to a main incoming schedule. Handles complex installations with multiple sub-mains.',
        },
        {
          icon: FileCheck2,
          title: 'Certificate Integration',
          description:
            'Link the load schedule to an EIC or EICR certificate. The assessed maximum demand figure flows directly into the certificate.',
        },
        {
          icon: Shield,
          title: 'BS 7671 Compliant',
          description:
            "All diversity factors, load calculations, and documentation follow BS 7671:2018+A3:2024 and the IET On-Site Guide. Part of Elec-Mate's 50+ calculators.",
        },
      ]}
      featuresHeading="Load Schedule Calculator Features"
      featuresSubheading="Build professional load schedules in minutes, not hours."
      faqs={[
        {
          question: 'What is the difference between connected load and maximum demand?',
          answer:
            'Connected load is the sum of the rated power of every electrical appliance and circuit in the installation — it is the theoretical maximum if everything was switched on simultaneously at full power. Maximum demand (also called assessed demand or diversified demand) is the actual peak demand after diversity factors are applied, reflecting the fact that not all loads operate at the same time. For a typical domestic installation, the connected load might be 30 kW, but the assessed maximum demand with diversity is typically 12-18 kW.',
        },
        {
          question: 'Do I need a load schedule for a domestic installation?',
          answer:
            'Yes. While the load schedule for a domestic installation is simpler than a commercial one, you still need to calculate the assessed maximum demand to verify that the supply is adequate and to complete the EIC certificate. A typical domestic load schedule has 6-12 circuits and can be prepared in a few minutes using Elec-Mate. It is also essential when adding high-power loads like EV chargers, heat pumps, or electric showers to an existing installation.',
        },
        {
          question: 'How do I handle three-phase loads in a load schedule?',
          answer:
            'Three-phase loads (such as three-phase motors, three-phase ovens, or three-phase EV chargers) draw current equally from all three phases. In the load schedule, they are entered once with their total power, and the per-phase load is calculated as total power divided by three. Single-phase loads connected to a three-phase supply are assigned to individual phases (L1, L2, or L3). The aim is to balance the total load across all three phases to minimise neutral current.',
        },
        {
          question: 'What diversity factors should I use for a commercial installation?',
          answer:
            'The IET On-Site Guide Table 1A covers domestic and small commercial installations. For larger commercial installations, diversity is typically agreed with the client and the DNO based on the type of building, occupancy pattern, and historical usage data. Typical commercial diversity factors are: general socket outlets 50%, lighting 90% (higher than domestic because commercial lighting is usually all on during working hours), mechanical plant 80%, and IT equipment 70%. Always confirm with the DNO when applying for a commercial supply.',
        },
        {
          question: 'Can the load schedule help with generator sizing?',
          answer:
            'Yes. The load schedule is the starting point for generator sizing. Identify which circuits are essential (must run during a power outage) and which are non-essential. Sum the essential loads to determine the generator kVA requirement, allowing for starting currents of motor loads (typically 3-6 times the running current). The load schedule also determines the changeover switch rating and the essential circuits distribution board configuration.',
        },
        {
          question: 'How does the load schedule relate to the EICR?',
          answer:
            'The EICR Section F records the assessed maximum demand of the installation. This figure comes directly from the load schedule with diversity applied. During periodic inspection, the inspector checks whether the assessed maximum demand exceeds the supply rating — if it does, this is recorded as a departure or observation. The Elec-Mate load schedule calculator links directly to the EICR form, automatically populating the assessed demand figure.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Quick maximum demand calculation with IET diversity factors for domestic installations.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/diversity-factor-calculator',
          title: 'Diversity Factor Calculator',
          description:
            'Calculate diversity factors per IET On-Site Guide Table 1A for every load type.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/three-phase-power-calculator',
          title: 'Three-Phase Power Calculator',
          description:
            'Calculate three-phase power, current, and phase balance for commercial installations.',
          icon: Zap,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size cables for each circuit in the load schedule using BS 7671 tables and correction factors.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/eic-certificate',
          title: 'EIC Certificate',
          description:
            'Complete Electrical Installation Certificates with automatic assessed demand from load schedules.',
          icon: FileCheck2,
          category: 'Certificates',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'All Electrical Calculators',
          description:
            '50+ BS 7671 calculators for cable sizing, Zs verification, voltage drop, and more.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Build load schedules in minutes"
      ctaSubheading="Join UK electricians using Elec-Mate's 50+ calculators for on-site and design work. 7-day free trial, cancel anytime."
      toolPath="/tools/electrical-load-schedule"
    />
  );
}
