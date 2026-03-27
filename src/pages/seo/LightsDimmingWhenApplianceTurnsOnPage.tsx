import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  AlertTriangle,
  Zap,
  Cable,
  Gauge,
  ShieldCheck,
  Wrench,
  FileCheck2,
  Calculator,
  Search,
  GraduationCap,
  Phone,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Lights Dimming', href: '/guides/lights-dimming-when-appliance-turns-on' },
];

const tocItems = [
  { id: 'overview', label: 'Why Do My Lights Dim?' },
  { id: 'electrical-science', label: 'The Electrical Science' },
  { id: 'common-causes', label: 'Common Causes' },
  { id: 'normal-vs-dangerous', label: 'Normal vs Dangerous' },
  { id: 'high-inrush-appliances', label: 'High-Inrush Appliances' },
  { id: 'shared-circuits', label: 'Shared Circuits and Undersized Cables' },
  { id: 'supply-issues', label: 'Supply-Side Issues' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A brief, slight dim when a large appliance starts is usually normal and caused by the inrush current drawing voltage down momentarily on the shared supply.',
  'Persistent, severe, or worsening dimming is not normal and may indicate loose connections, undersized cables, overloaded circuits, or a supply problem that needs professional investigation.',
  'Voltage drop is governed by Ohm\'s law: when a high-current appliance starts, the voltage at other points on the same circuit or supply drops temporarily because of the impedance of the cables and connections.',
  'BS 7671 Regulation 133.2 requires conductors to be sized so that voltage drop remains within permissible limits under normal load conditions.',
  'Loose connections are a serious fire risk. If dimming is accompanied by flickering, buzzing, warm sockets, or a burning smell, isolate the circuit and call an electrician immediately.',
];

const faqs = [
  {
    question: 'Is it normal for lights to dim when the washing machine starts?',
    answer:
      'A very brief, slight dim lasting less than a second when a large motor starts is usually normal. Washing machines, tumble dryers, and dishwashers have motors that draw a high inrush current for a fraction of a second when starting. This momentary current surge causes a small voltage drop across the supply cables, which makes the lights dip briefly. If the dim is barely noticeable and lasts less than a second, it is unlikely to indicate a fault. However, if the lights dim significantly, stay dim for several seconds, or the dimming is getting worse over time, you should have the installation checked by a qualified electrician.',
  },
  {
    question: 'Why do my lights dim when the kettle or heater turns on?',
    answer:
      'Kettles and electric heaters draw a high continuous current (a 3kW kettle draws about 13A on a 230V supply). If the lighting circuit shares the same supply cables as the socket circuit (for example, from the same consumer unit with a limited supply), the sudden load increase causes a voltage drop across the meter tails and supply cables. This is particularly noticeable in older properties with undersized meter tails (6mm or even 4mm), long cable runs from the meter to the consumer unit, or a weak incoming supply. If the dimming is noticeable every time you use the kettle, it is worth having the supply cables and connections checked.',
  },
  {
    question: 'Could dimming lights mean a loose connection?',
    answer:
      'Yes, and this is the most dangerous cause. A loose connection anywhere in the circuit — at the consumer unit, a junction box, a socket, or even at the meter — increases the resistance at that point. Under load, the increased resistance causes localised voltage drop and heating. The dimming may be accompanied by flickering, a buzzing sound, or warmth at the connection point. Loose connections are one of the most common causes of electrical fires in the UK. If you suspect a loose connection, do not ignore it. Have a qualified electrician carry out an inspection.',
  },
  {
    question: 'Can undersized cables cause lights to dim?',
    answer:
      'Absolutely. If the cables feeding the consumer unit (the meter tails) or the cables on a particular circuit are undersized for the load they carry, the voltage drop along the cable will be excessive. BS 7671 Regulation 133.2 requires that conductor cross-sectional area is selected to limit voltage drop to permissible levels. In practice, the maximum allowable voltage drop for lighting circuits is 3% of the nominal voltage (approximately 6.9V on a 230V supply). Older installations may have meter tails or circuit cables that were adequate for the original load but are now undersized due to the addition of modern high-power appliances.',
  },
  {
    question: 'Do LED lights dim more noticeably than halogen or incandescent?',
    answer:
      'Yes. LED lamps are more sensitive to voltage fluctuations than incandescent or halogen lamps. A small voltage drop that would be imperceptible with a 60W incandescent bulb may be clearly visible with an LED lamp because the LED driver circuitry responds differently to voltage changes. This means that switching from incandescent to LED lighting can sometimes make an existing voltage drop problem more noticeable, even though the underlying electrical issue has not changed. The good news is that LEDs draw far less current than incandescent lamps, so they are actually less likely to cause voltage drop themselves.',
  },
  {
    question: 'Should I get an EICR if my lights keep dimming?',
    answer:
      'If the dimming is persistent, severe, or worsening, an Electrical Installation Condition Report (EICR) is a sensible step. An EICR involves a thorough inspection and testing of the entire installation, including checking all connections for tightness, measuring earth fault loop impedance (which reveals the condition of the supply and earthing), and testing insulation resistance. The electrician will identify any defects — such as loose connections, undersized cables, or overloaded circuits — and code them by severity. This gives you a clear picture of the installation condition and a prioritised list of remedial work.',
  },
  {
    question: 'Could the problem be with the electricity supply, not my wiring?',
    answer:
      'Yes. If the incoming supply voltage is low or the supply cable from the street to your property is undersized or damaged, you may experience dimming when any significant load is applied. This is more common in rural areas with long overhead supply cables, or in older urban properties where the supply infrastructure has not been upgraded. Your electrician can measure the supply voltage at the meter position under load and no-load conditions. If the voltage is below the statutory limit (230V -6%, which is 216.2V), the issue is with the Distribution Network Operator (DNO) supply and you should report it to your DNO.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Calculate voltage drop on cable runs to check if cables are correctly sized for the load.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables correctly for current-carrying capacity and voltage drop limits.',
    icon: Cable,
    category: 'Tool',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic approach to diagnosing electrical faults including voltage drop issues.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'When and why to upgrade a consumer unit, including addressing undersized supplies.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an Electrical Installation Condition Report involves and when you need one.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-tripping',
    title: 'Circuit Breaker Tripping',
    description: 'Causes and solutions when circuit breakers keep tripping.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Do My Lights Dim When an Appliance Turns On?',
    content: (
      <>
        <p>
          You switch on the washing machine and the kitchen lights dip for a moment. The kettle clicks
          on and the living room lamp dims briefly. It is one of the most common electrical concerns in
          UK homes, and it is natural to wonder whether something is wrong.
        </p>
        <p>
          The short answer is: a brief, barely noticeable dim when a large appliance starts is usually
          harmless. But persistent, severe, or worsening dimming is a warning sign that should not be
          ignored. The difference between the two comes down to what is causing the voltage to drop —
          and whether the cause is a normal electrical characteristic or a developing fault.
        </p>
        <p>
          This guide explains the electrical science behind dimming lights in plain language, covers
          the most common causes, helps you tell the difference between normal and dangerous, and tells
          you exactly when to call an electrician. If you are an electrician, the later sections cover
          the diagnostic approach and relevant{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>{' '}
          regulations.
        </p>
      </>
    ),
  },
  {
    id: 'electrical-science',
    heading: 'The Electrical Science: Why Voltage Drops Under Load',
    content: (
      <>
        <p>
          Every cable in your home has resistance. It is tiny — fractions of an ohm per metre — but it
          is always there. When current flows through a cable, some of the voltage is "used up"
          overcoming that resistance. This is voltage drop, and it is an unavoidable consequence of
          Ohm's law: voltage drop equals current multiplied by resistance (V = I x R).
        </p>
        <p>
          Under normal conditions, the voltage drop across your home's cables is small enough that you
          never notice it. Your lights receive close to the full 230V supply and shine at their normal
          brightness. But when a large appliance switches on and suddenly draws a high current, the
          voltage drop across the shared supply cables increases proportionally. The voltage available
          to your lights temporarily decreases, and they dim.
        </p>
        <p>
          Think of it like water pressure in a house. If someone turns on the garden hose full blast,
          the shower pressure drops momentarily because the pipes are shared. The same principle applies
          to electricity — the supply cables are shared, and a sudden large current draw reduces the
          voltage available to everything else on that supply.
        </p>
        <p>
          BS 7671 Regulation 133.2 addresses this directly. It requires that conductor cross-sectional
          area is selected to limit voltage drop to permissible levels, ensuring that connected
          equipment receives adequate voltage under normal load conditions. For lighting circuits, the
          maximum permissible voltage drop is typically 3% of the nominal supply voltage — approximately
          6.9V on a 230V supply.
        </p>
      </>
    ),
  },
  {
    id: 'common-causes',
    heading: 'Common Causes of Dimming Lights',
    content: (
      <>
        <p>
          Not all dimming has the same cause, and not all causes carry the same risk. Here are the most
          common reasons your lights might dim when an appliance switches on:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High inrush current from motors</strong> — washing machines, tumble dryers,
                fridge compressors, and air conditioning units have electric motors that draw 5 to 8
                times their normal running current for a fraction of a second when starting. This
                momentary surge causes a brief voltage dip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized meter tails or supply cables</strong> — older properties may have
                4mm or 6mm meter tails that were adequate for the original load but are now undersized
                for modern demand. Every amp of current through an undersized cable produces a larger
                voltage drop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose connections</strong> — this is the dangerous one. A loose terminal
                anywhere in the circuit increases resistance at that point. Under load, the extra
                resistance causes voltage drop and generates heat. Loose connections are a leading cause
                of electrical fires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits</strong> — if a circuit is carrying close to its maximum
                rated current, any additional load pushes the voltage drop higher. This is common where
                multiple high-power appliances share a ring final circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs</strong> — the longer the cable, the higher the resistance, the
                greater the voltage drop. Properties with long runs from the meter to the consumer unit,
                or from the consumer unit to distant rooms, are more susceptible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low incoming supply voltage</strong> — if the DNO supply is already at the lower
                end of the permitted range (230V -6% = 216.2V), any additional voltage drop within the
                installation becomes more noticeable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'normal-vs-dangerous',
    heading: 'Normal vs Dangerous: How to Tell the Difference',
    content: (
      <>
        <p>
          This is the critical question. Here is how to distinguish between harmless dimming and a sign
          of a developing fault:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Probably Normal</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Slight dim lasting less than one second</li>
              <li>Only happens when a large motor starts (washing machine, fridge, tumble dryer)</li>
              <li>Lights return to full brightness immediately</li>
              <li>Has always happened at roughly the same level since you moved in</li>
              <li>No flickering, buzzing, or warmth at switches or sockets</li>
              <li>Affects the whole house equally (not just one circuit)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Potentially Dangerous</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Significant, noticeable dimming lasting several seconds or more</li>
              <li>Dimming is getting worse over time</li>
              <li>Lights flicker or pulse rather than dim smoothly</li>
              <li>Buzzing or crackling from switches, sockets, or the consumer unit</li>
              <li>Warm or discoloured sockets or switches</li>
              <li>Burning smell near any electrical fitting</li>
              <li>Dimming affects only one circuit or one part of the house</li>
            </ul>
          </div>
        </div>
        <p>
          If you recognise any of the items in the "potentially dangerous" column, do not wait. The
          combination of loose connections and high current is exactly how electrical fires start. The
          connection heats up under load, the heat loosens it further, the resistance increases, it
          gets hotter — it is a vicious cycle that can end in a fire.
        </p>
      </>
    ),
  },
  {
    id: 'high-inrush-appliances',
    heading: 'High-Inrush Appliances: The Usual Suspects',
    content: (
      <>
        <p>
          Certain appliances are well-known for causing momentary dimming because of their high startup
          current. Understanding which appliances are the usual culprits helps you determine whether the
          dimming is expected behaviour or something to worry about.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Washing machines and tumble dryers</strong> — motor inrush can be 30A to 60A
                for a fraction of a second. The drum motor starting under load (especially on spin
                cycles) draws the highest peak current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fridge and freezer compressors</strong> — compressor motors have significant
                locked-rotor current. Older fridges without soft-start circuits are particularly prone
                to causing a noticeable dip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vacuum cleaners</strong> — universal motors in vacuum cleaners draw high inrush
                current. A 2kW vacuum can draw 20A+ at startup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric showers</strong> — while showers do not have motors, a 10.5kW shower
                draws approximately 45A continuously. The sudden switch-on of that load can cause a
                noticeable voltage dip, especially on properties with undersized supply cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heaters and storage heaters</strong> — 3kW immersion heaters draw
                about 13A. While this is not a huge inrush, it is a continuous load that appears
                suddenly and can cause a noticeable dip on a weak supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Modern appliances increasingly use soft-start circuits, inverter-driven motors, and electronic
          controls that reduce the inrush current significantly. If you have recently replaced an old
          appliance with a new one and the dimming has stopped, the soft-start technology is the reason.
        </p>
        <SEOAppBridge
          title="Diagnose electrical issues with AI fault finding"
          description="Elec-Mate's AI fault diagnosis tool helps electricians systematically identify the cause of voltage drop issues, dimming lights, and other common faults. Guided diagnostic workflows with BS 7671 regulation references."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'shared-circuits',
    heading: 'Shared Circuits and Undersized Cables',
    content: (
      <>
        <p>
          One of the most common underlying causes of dimming lights is the supply infrastructure
          within the property. The meter tails — the cables connecting the electricity meter to the
          consumer unit — carry the total load for the entire house. If these cables are undersized, the
          voltage drop across them increases with every additional amp of load.
        </p>
        <p>
          In older UK properties (pre-1990s), it was common to install 6mm or even 4mm meter tails.
          These were adequate for the electrical loads of the time — a few lights, a cooker, and perhaps
          an immersion heater. Today, with electric showers, multiple high-power kitchen appliances, EV
          chargers, and heat pumps, the same meter tails may be carrying far more current than they were
          designed for.
        </p>
        <p>
          BS 7671 Regulation 528.3 requires that voltage drop is calculated and limited to ensure
          equipment operates correctly. The{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          can help determine whether the existing cables are adequate for the current load. If they are
          not, the solution is straightforward: upgrade the meter tails and, if necessary, the supply
          cable.
        </p>
        <p>
          Within the installation itself, shared circuits can also contribute to dimming. If the
          lighting circuit and a high-power socket circuit share a distribution board with inadequate
          busbar connections or undersized main switch, the voltage drop under load will be higher than
          necessary. A{' '}
          <SEOInternalLink href="/guides/consumer-unit-upgrade">
            consumer unit upgrade
          </SEOInternalLink>{' '}
          can resolve this by providing better connections and adequate ratings for modern loads.
        </p>
      </>
    ),
  },
  {
    id: 'supply-issues',
    heading: 'Supply-Side Issues',
    content: (
      <>
        <p>
          Sometimes the problem is not inside your home at all. The electricity supply from the
          Distribution Network Operator (DNO) can be the root cause. Supply-side issues include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low supply voltage</strong> — the statutory voltage in the UK is 230V +10%/-6%,
                giving a range of 216.2V to 253V. If your supply is at the lower end, any voltage drop
                within the installation is more noticeable. Your electrician can measure this at the
                meter position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long or undersized service cable</strong> — the cable from the street to your
                property (the service cable) belongs to the DNO. If it is long, undersized, or has
                corroded joints, the voltage drop on this cable under load will be significant. This is
                particularly common in rural properties with overhead supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared supply transformer</strong> — in some areas, multiple properties share
                a supply transformer. If a neighbour's high-power load (for example, an EV charger)
                causes the transformer voltage to dip, your lights may dim too. This is a DNO network
                issue.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your electrician determines that the supply voltage is consistently low or drops
          significantly under load, the next step is to contact your DNO. They are obligated to
          maintain the supply voltage within the statutory limits. You can find your DNO by entering
          your postcode on the Energy Networks Association website.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Not every instance of dimming lights requires a professional visit. But certain signs demand
          immediate action. Call a qualified electrician if:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The dimming is getting worse over time</strong> — this suggests a connection is
                deteriorating, which means it is heating up more and more each time. This is the
                pattern that leads to fires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>You can smell burning near any electrical fitting</strong> — this is an
                emergency. Isolate the circuit at the consumer unit immediately and call an electrician.
                Do not use the circuit until it has been inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sockets or switches feel warm or are discoloured</strong> — warmth or brown
                marks on a socket faceplate indicate overheating at the terminals. Stop using the socket
                and get it inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lights flicker rather than dim smoothly</strong> — flickering suggests an
                intermittent connection (one that makes and breaks contact) rather than a simple voltage
                drop. This is more dangerous because the arcing at the loose point generates extreme
                heat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The dimming only affects one part of the house</strong> — if the dimming is
                localised to one circuit or one room, the fault is likely on that specific circuit
                rather than the main supply. This narrows the location of the problem.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A qualified electrician will carry out a systematic investigation, typically starting with
          visual inspection and tightness checks at the consumer unit, then measuring supply voltage
          under load, earth fault loop impedance, and insulation resistance on affected circuits. An{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            EICR
          </SEOInternalLink>{' '}
          is the most thorough approach and will identify all defects in the installation, not just
          the one causing the dimming.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Diagnostic Approach',
    content: (
      <>
        <p>
          When a customer reports dimming lights, the diagnostic approach should be systematic. Start
          with the supply and work inward:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Measure Supply Voltage</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measure the supply voltage at the meter position under no-load and under load
                  (switch on a known high-power appliance). If the voltage drops below 216.2V under
                  load, the issue may be supply-side — refer to the DNO. Record the Ze (external earth
                  fault loop impedance) at the same time, as a high Ze can indicate supply cable
                  issues.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Inspect and Tighten Connections</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the supply and carry out a tightness check on all terminations in the
                  consumer unit, including the main switch, busbars, and all outgoing ways. Look for
                  signs of overheating — discolouration, melted insulation, or burnt smell. Check the
                  meter tails and the supply fuse connections. Regulation 543.1.1 requires the circuit
                  protective conductor to connect exposed conductive parts to the main earthing terminal
                  for fault currents to flow safely.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Calculate Voltage Drop</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>{' '}
                  to check that existing cable sizes meet the BS 7671 voltage drop limits for the
                  actual load. Pay particular attention to meter tails — if they are 6mm or smaller and
                  the maximum demand exceeds 60A, they are almost certainly undersized. Regulation
                  Appendix 4 provides tabulated mV/A/m values for calculating voltage drop on
                  single-phase runs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICR certificates on your phone"
          description="Found a fault? Document it professionally with Elec-Mate's EICR certificate app. AI board scanning, observation codes, and instant PDF export. Join 430+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LightsDimmingWhenApplianceTurnsOnPage() {
  return (
    <GuideTemplate
      title="Lights Dimming When Appliance Turns On | Causes & Fixes"
      description="Why do your lights dim when an appliance turns on? Learn the causes — from normal inrush current to dangerous loose connections — and when to call an electrician. Covers voltage drop, undersized cables, and supply issues."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Lights Dimming When an Appliance Turns On:{' '}
          <span className="text-yellow-400">Causes, Fixes, and When to Worry</span>
        </>
      }
      heroSubtitle="Your lights dip when the washing machine starts. Is it normal? This guide explains the electrical science behind dimming lights, covers the common causes from harmless inrush current to dangerous loose connections, and tells you exactly when to call an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Dimming Lights"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Document Electrical Faults on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, voltage drop calculations, and professional EICR certificates. 7-day free trial, cancel anytime."
    />
  );
}
