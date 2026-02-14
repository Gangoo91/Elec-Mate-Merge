import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Wrench,
  ShieldCheck,
  Calculator,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
  Activity,
  Lightbulb,
  Power,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides/troubleshooting' },
  { label: 'Lights Flickering', href: '/guides/lights-flickering-causes' },
];

const tocItems = [
  { id: 'when-to-worry', label: 'When to Worry About Flickering Lights' },
  { id: 'loose-connections', label: 'Loose Connections' },
  { id: 'voltage-fluctuations', label: 'Voltage Fluctuations' },
  { id: 'led-compatibility', label: 'LED Compatibility Issues' },
  { id: 'neutral-faults', label: 'Neutral Faults' },
  { id: 'high-load-switching', label: 'High-Load Switching' },
  { id: 'when-to-call-electrician', label: 'When to Call an Electrician' },
  { id: 'diagnosis-approach', label: 'Systematic Diagnosis Approach' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Flickering lights that affect the entire property — especially with dimming or brightening — can indicate a serious supply or neutral fault that requires urgent investigation.',
  'The most common cause of flickering in a single light or circuit is a loose connection at the lamp holder, switch, junction box, or distribution board terminal.',
  'LED lamps on incompatible dimmers are the most frequent cause of flickering that is annoying but not dangerous — the fix is to use a trailing-edge dimmer rated for LED loads.',
  'A loose or failing neutral connection at the supply cutout or meter can cause voltage fluctuations across the entire installation — this is a supply company responsibility (contact the DNO).',
  "Elec-Mate's AI fault diagnosis tool can guide you through a structured diagnostic process based on the flickering pattern, affected circuits, and associated symptoms.",
];

const faqs = [
  {
    question: 'Why do my LED lights flicker when I dim them?',
    answer:
      'LED lamps flicker on dimmers because of a mismatch between the dimmer technology and the LED driver. Traditional leading-edge dimmers (designed for incandescent and halogen lamps) work by chopping the mains waveform — they switch the power off for part of each cycle to reduce the average voltage. LED drivers are electronic devices that need a minimum current to operate, and when a leading-edge dimmer reduces the voltage below this threshold, the LED driver switches off momentarily and then back on, creating visible flicker. The solution is to replace the dimmer with a trailing-edge dimmer specifically designed for LED loads. Trailing-edge dimmers reduce the voltage more smoothly and maintain the minimum operating current that the LED driver needs. Additionally, check that the LED lamps are specified as "dimmable" — non-dimmable LEDs will flicker on any dimmer. Some LED manufacturers publish compatibility lists for their lamps with specific dimmer models.',
  },
  {
    question: 'Is it dangerous if my lights flicker?',
    answer:
      'It depends on the pattern and extent. Occasional flickering of a single LED lamp on a dimmer circuit is almost certainly a compatibility issue and is not dangerous. However, flickering that affects multiple circuits, the entire property, or is accompanied by other symptoms (buzzing from the consumer unit, warm switches, burning smell, lights dimming and brightening) can indicate a serious fault such as a loose neutral connection, an overloaded circuit, or arcing at a connection point. Arcing at loose connections generates extreme heat and is a significant fire risk. If your lights flicker throughout the house, or if the flickering is accompanied by any of the warning signs listed above, switch off the affected circuits and call a qualified electrician immediately. Do not wait — arcing faults can cause fires.',
  },
  {
    question: 'Why do my lights dim when I turn on the kettle or shower?',
    answer:
      'This is usually caused by voltage drop on the circuit supplying the high-power appliance, or on the supply to the property itself. When a kettle (3 kW) or electric shower (7 to 10 kW) switches on, it draws a large current. This current flowing through the supply cable and the internal wiring causes a voltage drop across the cable resistance. If the lighting circuit shares a supply path with the high-current appliance (for example, both are fed from the same distribution board via a single supply cable), the voltage at the lighting circuit drops momentarily when the appliance switches on. In most cases, this is normal and not dangerous — a brief dip of a few volts is within tolerance. However, if the dimming is severe, prolonged, or getting worse over time, it may indicate an undersized supply cable, a loose main connection, or an overloaded supply. Have the supply voltage and prospective fault current measured by a qualified electrician to confirm the supply is adequate.',
  },
  {
    question: 'Can a loose neutral cause lights to flicker?',
    answer:
      'Yes — a loose or failing neutral connection is one of the most serious causes of flickering lights and requires urgent attention. In a single-phase installation, the neutral conductor completes the circuit back to the transformer. If the neutral connection becomes loose or high-resistance (due to corrosion, thermal damage, or a failing connector), the voltage at the installation can fluctuate. In a single-phase system, this typically causes lights to dim when loads increase and brighten when loads decrease. In a three-phase installation (common in blocks of flats), a failing combined neutral can cause voltage imbalance between phases — lights on one phase may brighten dangerously while lights on another phase dim. A loose neutral at the supply cutout or meter is the responsibility of the Distribution Network Operator (DNO). Contact your electricity supplier immediately if you suspect a neutral fault — do not attempt to work on the supply company equipment yourself.',
  },
  {
    question: 'Why do my lights flicker in only one room?',
    answer:
      'If flickering is confined to one room, the fault is almost certainly localised to that room or to the circuit serving it. The most likely causes are: a loose connection in the light switch serving that room (the switching contact may be arcing intermittently); a loose connection at a junction box or ceiling rose in that room; a failing lamp holder where the contact spring has weakened; a loose connection at the distribution board terminal for the circuit serving that room; or, if the room has LED downlighters, a failing LED driver in one of the fittings. Start by checking the switch — turn the light off and on slowly, listening for any buzzing or crackling sound. Then check the lamp holder (with the circuit isolated). If the switch and lamp holder are sound, check the junction box and the circuit terminal at the distribution board. A continuity test on the circuit may reveal a high-resistance connection that fluctuates under load.',
  },
  {
    question: 'Should I replace my dimmer switch to stop LED flickering?',
    answer:
      'If your LED lamps flicker specifically when dimmed, replacing the dimmer is the correct first step. Standard leading-edge dimmers (the most common type in UK homes) are designed for resistive loads like incandescent and halogen lamps. They do not work well with the electronic drivers in LED lamps. Replace the existing dimmer with a trailing-edge dimmer specifically rated for LED loads. Check the dimmer minimum load rating — some dimmers require a minimum load of 25 W or more to operate correctly, and a single 5 W LED lamp may not meet this threshold. If the minimum load is the issue, you can add a "dummy load" device (a small resistor module that connects in parallel with the LED circuit) to bring the total load above the dimmer minimum. Always check the LED lamp manufacturer compatibility list to confirm the dimmer and lamp are compatible. If flickering persists after replacing the dimmer, the issue may be with the LED lamps themselves — try replacing one lamp with a different brand to test.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/nuisance-tripping',
    title: 'Nuisance Tripping',
    description:
      'RCD tripping can be related to the same loose connections that cause flickering lights.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/low-insulation-resistance',
    title: 'Low Insulation Resistance',
    description: 'Damaged cable insulation can cause both flickering and earth leakage issues.',
    icon: Activity,
    category: 'Troubleshooting',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Record flickering-related defects on a digital EICR with AI defect code suggestions.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order of dead and live tests for diagnosing lighting circuit faults.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/calculators',
    title: 'Voltage Drop Calculator',
    description:
      'Calculate voltage drop on lighting circuits to check whether long cable runs are the cause.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training covering lighting circuit diagnosis.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'when-to-worry',
    heading: 'When to Worry About Flickering Lights',
    content: (
      <>
        <p>
          Not all flickering lights are dangerous, but some patterns indicate serious faults that
          require urgent attention. Understanding the difference can prevent you from either
          ignoring a dangerous fault or over-reacting to a harmless LED compatibility issue.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Urgent — Investigate Immediately</h3>
            <ul className="space-y-3 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Lights flicker throughout the entire property</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Lights dim and brighten noticeably</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Buzzing or crackling from switches or the consumer unit</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Burning smell or discolouration around switches or sockets</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Warm or hot light switches or faceplates</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Likely Not Urgent</h3>
            <ul className="space-y-3 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Single LED lamp flickers on a dimmer circuit only</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Brief flicker when a large appliance switches on</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Flicker only occurs at low dimmer settings</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>New LED lamps flicker in an old fitting</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Flicker stops when the lamp is re-seated in the holder</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The key distinction is scope and severity. A single lamp flickering on a dimmer is almost
          certainly an LED/dimmer compatibility issue. Whole-house flickering with dimming and
          brightening is potentially a neutral fault or supply problem that can be dangerous.
        </p>
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Connections: The Most Common Cause',
    content: (
      <>
        <p>
          Loose connections are responsible for the majority of flickering light faults in UK homes.
          Every connection in the lighting circuit — from the distribution board terminal to the
          lamp holder contact — is a potential point of failure. Over time, terminals loosen due to
          thermal cycling (the connection heats up under load, the metal expands, then contracts
          when it cools), vibration, and simple age.
        </p>
        <p>
          When a connection is loose, the contact resistance increases. Under load, the increased
          resistance causes the voltage at the lamp to fluctuate — particularly when current changes
          (switching nearby loads, motor starting, or the lamp's own current draw varying slightly).
          The result is visible flickering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light switch terminals:</strong> The most common location. Plate switches
                with screw terminals can work loose over years of use. The flickering often worsens
                when the switch is operated slowly or when pressure is applied to the switch plate.
                Remove the switch (with the circuit isolated), check all terminals, and re-tighten.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lamp holder contacts:</strong> Bayonet (B22) and Edison screw (E27) lamp
                holders have spring contacts that press against the lamp base. Over time, these
                springs weaken and the contact becomes intermittent. The flickering may stop if the
                lamp is pushed more firmly into the holder. Replace the lamp holder if the contact
                is poor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction boxes and ceiling roses:</strong> Screw terminals in junction boxes
                and ceiling rose terminals can loosen over decades. Check all connections with the
                circuit isolated. Tighten to the manufacturer's recommended torque.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board terminals:</strong> The MCB or RCBO terminal for the
                lighting circuit can loosen. Check and re-tighten. Also check the neutral bar
                connection for the circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Loose connections that arc are a serious fire risk. If you find evidence of arcing
          (blackened terminals, melted plastic, burnt insulation), the connection point must be
          replaced, not just re-tightened. Record the finding on the{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR</SEOInternalLink> as a C1 (Danger
          Present) or C2 (Potentially Dangerous) observation depending on severity.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-fluctuations',
    heading: 'Voltage Fluctuations from the Supply',
    content: (
      <>
        <p>
          If lights throughout the entire property flicker, dim, or brighten, the cause may be
          voltage fluctuations on the incoming electricity supply. The UK standard supply voltage is
          230 V with a tolerance of +10% / -6% (216 V to 253 V). Occasional fluctuations within this
          range are normal and should not cause noticeable flickering. However, fluctuations outside
          this range — or rapid fluctuations within it — can cause visible flickering on all lights
          in the property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply-side causes:</strong> Overhead line faults, loose connections on the
                supply company's network, nearby industrial loads causing flicker, or a failing
                transformer. These are the DNO's responsibility — contact your electricity supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose main connections:</strong> A loose connection at the supply cutout,
                meter, or main switch causes voltage drop under load. This affects the entire
                installation. The supply cutout and meter connections are the DNO's responsibility —
                do not attempt to work on sealed supply company equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to check:</strong> Measure the supply voltage at the consumer unit with
                a calibrated voltmeter. Take readings over a period of time — ideally with a
                data-logging instrument — to capture any fluctuations. If the voltage drops below
                216 V or exceeds 253 V, report the issue to the DNO. Measure the{' '}
                <SEOInternalLink href="/guides/earth-loop-impedance-too-high">
                  prospective fault current (PFC)
                </SEOInternalLink>{' '}
                at the origin to check the supply impedance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If voltage fluctuations are confirmed, and the cause is not a loose connection within the
          installation, report it to the Distribution Network Operator (DNO). They are obligated
          under the Electricity Safety, Quality and Continuity Regulations 2002 to maintain the
          supply voltage within the specified tolerance.
        </p>
      </>
    ),
  },
  {
    id: 'led-compatibility',
    heading: 'LED Compatibility Issues',
    content: (
      <>
        <p>
          The switch from incandescent to LED lighting has introduced a range of compatibility
          issues that commonly present as flickering. These are usually not dangerous but are
          annoying for the customer and generate a significant number of callback requests.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Incompatible Dimmers</h4>
                <p className="text-white text-sm leading-relaxed">
                  Leading-edge dimmers designed for incandescent lamps chop the mains waveform in a
                  way that does not suit LED drivers. The LED driver receives insufficient voltage
                  for part of each cycle, causing visible flicker. Replace with a trailing-edge
                  dimmer rated for LED loads. Check the dimmer's minimum and maximum load ratings —
                  a dimmer rated for 60 W minimum will not work with a single 5 W LED.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Non-Dimmable LEDs on Dimmer Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Non-dimmable LED lamps connected to a dimmer circuit will flicker, buzz, or fail
                  prematurely. The lamp may appear to work at full brightness but will flicker
                  intermittently. Always check that LED lamps are marked as "dimmable" before
                  installing on a dimmer circuit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">LED Drivers with Ghost Current</h4>
                <p className="text-white text-sm leading-relaxed">
                  Some LED drivers are sensitive to small leakage currents through the switch when
                  the switch is off (neon-indicator switches, two-way switches with pilot lights, or
                  switches with very low off-state resistance). This tiny current trickles through
                  the LED driver and can cause the lamp to flash briefly at regular intervals —
                  typically once every few seconds. The solution is to remove the neon indicator,
                  replace the switch, or fit a "bleeder resistor" across the LED driver.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Mixed Lamp Types on One Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Mixing different brands, wattages, or technologies (e.g., one incandescent with
                  five LEDs on a dimmer circuit) can cause uneven current distribution and
                  flickering. For best results, use the same brand and model of LED lamp across the
                  entire circuit, especially on dimmer circuits.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="AI fault diagnosis for flickering lights"
          description="Describe the flickering pattern to Elec-Mate's AI fault diagnosis tool — which lights, when it happens, what type of lamps and dimmers — and get a prioritised diagnosis with recommended fixes. No more guessing whether it is the dimmer, the lamp, or the wiring."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'neutral-faults',
    heading: 'Neutral Faults: The Most Dangerous Cause',
    content: (
      <>
        <p>
          A failing neutral connection is the most serious cause of flickering lights and requires
          urgent attention. The neutral conductor carries the return current from all circuits in
          the installation back to the supply transformer. If this conductor becomes high-resistance
          or open-circuit, the consequences can be severe.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase neutral fault:</strong> The voltage at the installation
                fluctuates with load. Lights dim when a high-power appliance is switched on and
                brighten when it switches off. In extreme cases, the voltage can exceed the normal
                range, damaging sensitive electronic equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase neutral fault (blocks of flats):</strong> A failing combined
                neutral on the supply to a block of flats can cause a voltage imbalance between
                phases. One phase may see dangerously high voltage (potentially 400 V instead of 230
                V) while another phase sees very low voltage. This can destroy appliances and create
                a fire risk. This is known as a "floating neutral" or "neutral failure."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where neutral faults occur:</strong> The supply cutout (sealed unit — DNO
                responsibility), the meter tails, the main switch, the neutral bar in the consumer
                unit, or a{' '}
                <SEOInternalLink href="/guides/borrowed-neutral-explained">
                  borrowed neutral
                </SEOInternalLink>{' '}
                within the installation wiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you suspect a neutral fault on the supply side (the cutout or meter connections),
          contact the DNO immediately. Do not attempt to work on sealed supply company equipment. If
          the neutral fault is within the installation (consumer unit neutral bar, circuit neutral
          connections), isolate the supply, investigate, and repair. Record the finding on the EICR
          as a C1 (Danger Present) observation.
        </p>
      </>
    ),
  },
  {
    id: 'high-load-switching',
    heading: 'High-Load Switching',
    content: (
      <>
        <p>
          A brief dip in light output when a high-power appliance switches on is one of the most
          common lighting complaints. The customer turns on the kettle, the electric shower, or the
          oven, and the lights dip momentarily. In most cases, this is normal and not a cause for
          concern — but there are situations where it indicates a problem.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Normal:</strong> A momentary dip (less than 0.5 seconds) when a 3 kW kettle
                or 10 kW shower switches on. The inrush current causes a brief voltage drop across
                the supply impedance. The lights recover immediately. This is normal on
                installations with typical supply impedance values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Investigate:</strong> A prolonged dip (several seconds or longer) or a
                severe dip (lights visibly dim by more than 10 to 15 per cent) when an appliance
                switches on. This may indicate a high supply impedance, an undersized supply cable,
                or loose connections in the supply path. Measure the supply impedance (Ze) and the
                prospective fault current (PFC) at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Action:</strong> If the PFC is low (below 1 kA at the origin on a typical
                domestic supply), the supply impedance is high. This may be due to a long or
                undersized service cable, a loose connection at the cutout, or an issue on the DNO's
                network. Report to the DNO if the supply impedance is above their declared maximum.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call-electrician',
    heading: 'When to Call a Qualified Electrician',
    content: (
      <>
        <p>
          Homeowners can safely address some causes of flickering lights themselves (replacing a
          lamp, re-seating a bulb), but many require a qualified electrician. The following
          situations should always be referred to a registered electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Flickering affects the entire property or multiple circuits simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Lights are dimming and brightening (voltage fluctuation symptoms).</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                There is a burning smell, buzzing sound, or warmth from any switch, socket, or the
                consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The flickering started after a storm, power cut, or unusual electrical event.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The flickering has been getting progressively worse over weeks or months.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Any light switch, socket, or faceplate shows signs of discolouration, melting, or
                heat damage.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians attending a flickering lights call, a structured diagnostic approach
          saves time and ensures the root cause is found. Do not simply replace the lamp and leave —
          a single flickering lamp can be a symptom of a loose connection that is arcing and
          creating a fire risk.
        </p>
      </>
    ),
  },
  {
    id: 'diagnosis-approach',
    heading: 'Systematic Diagnosis Approach for Electricians',
    content: (
      <>
        <p>
          When called to diagnose flickering lights, follow this structured approach to identify the
          cause efficiently:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Determine the scope.</strong> Does the flickering affect one lamp, one
              circuit, multiple circuits, or the entire property? This immediately narrows the
              suspect area.
            </li>
            <li>
              <strong>Check the lamp and lamp holder.</strong> Try a different lamp. Re-seat the
              existing lamp. Check the lamp holder contact spring. If the flickering stops, the
              cause was the lamp or lamp holder.
            </li>
            <li>
              <strong>Check the switch.</strong> Operate the switch slowly. Listen for buzzing or
              crackling. With the circuit isolated, remove the switch and inspect the terminals for
              looseness, arcing, or heat damage.
            </li>
            <li>
              <strong>Check the circuit connections.</strong> With the circuit isolated, check all
              junction boxes, ceiling roses, and the distribution board terminal for the lighting
              circuit. Re-tighten all connections.
            </li>
            <li>
              <strong>Measure supply voltage.</strong> If the flickering affects the whole property,
              measure the supply voltage at the consumer unit. Monitor over time if possible. Check
              the PFC and Ze at the origin.
            </li>
            <li>
              <strong>Check for LED/dimmer compatibility.</strong> If the affected lamps are LEDs on
              a dimmer, check the dimmer type (leading-edge vs trailing-edge) and the lamp
              compatibility. Try a known-compatible trailing-edge dimmer.
            </li>
            <li>
              <strong>
                Perform{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                and continuity testing.
              </strong>{' '}
              A high-resistance connection may only be detectable under load (it works fine with a
              continuity tester but arcs under current). If continuity testing reveals a high R1 or
              R2 value for the circuit, there is a resistance in the circuit that should not be
              there.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="Record findings on a digital EICR"
          description="Document flickering light defects with Elec-Mate's EICR certificate app. The AI defect code tool suggests the correct observation code based on your finding — loose connection, arcing evidence, inadequate earthing — and the remedial action. Send the report from site."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LightsFlickeringPage() {
  return (
    <GuideTemplate
      title="Lights Flickering | Electrical Causes & Fixes"
      description="Complete guide to diagnosing flickering lights. Covers loose connections, voltage fluctuations, LED dimmer compatibility, neutral faults, high-load switching, and when to call an electrician. Written for UK homeowners and electricians."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Lights Flickering?{' '}
          <span className="text-yellow-400">Electrical Causes and How to Fix Them</span>
        </>
      }
      heroSubtitle="Flickering lights range from a harmless LED compatibility issue to a dangerous neutral fault or arcing connection. This guide covers every common cause, explains which ones are urgent, and provides a systematic diagnosis approach for electricians."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Flickering Lights"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Electrical Faults with AI"
      ctaSubheading="AI fault diagnosis, digital EICR certificates, defect code suggestions, and calculators for voltage drop, Zs, and more. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
    />
  );
}
