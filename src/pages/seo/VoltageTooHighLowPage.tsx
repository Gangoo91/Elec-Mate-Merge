import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Gauge,
  Activity,
  ShieldCheck,
  Search,
  Calculator,
  GraduationCap,
  FileCheck2,
  Cable,
  Brain,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Voltage Issues', href: '/guides/voltage-too-high-or-low' },
];

const tocItems = [
  { id: 'acceptable-voltage', label: 'Acceptable Voltage Range' },
  { id: 'voltage-too-high', label: 'Voltage Too High (Overvoltage)' },
  { id: 'voltage-too-low', label: 'Voltage Too Low (Undervoltage)' },
  { id: 'loose-neutral', label: 'Loose Neutral: The Dangerous Fault' },
  { id: 'dno-supply-issues', label: 'DNO Supply Issues' },
  { id: 'voltage-testing', label: 'How to Test and Record Voltage' },
  { id: 'voltage-optimisation', label: 'Voltage Optimisation' },
  { id: 'diagnosis-for-electricians', label: 'Diagnosis for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The nominal UK supply voltage is 230V AC. The acceptable range under BS EN 50160 is 230V +10%/-6%, giving a working range of 216.2V to 253V.',
  'Sustained overvoltage (above 253V) damages appliances, shortens LED and lamp life, and increases energy costs — the DNO has a legal obligation to keep the supply within limits.',
  'Sustained undervoltage (below 216V) causes motors to overheat, appliances to malfunction, and can indicate a serious fault such as a loose neutral.',
  'A loose or broken neutral on a single-phase supply can cause voltage to swing wildly between near-zero and over 400V — this is a dangerous emergency requiring immediate DNO intervention.',
  'Elec-Mate provides voltage drop calculators, cable sizing tools, and AI fault diagnosis to help electricians identify and resolve voltage-related issues on site.',
];

const faqs = [
  {
    question: 'What is the correct mains voltage in the UK?',
    answer:
      'The nominal UK mains voltage is 230V AC at 50Hz. This was harmonised across Europe in 1995 — previously the UK standard was 240V and continental Europe was 220V. The compromise was to set the nominal voltage at 230V, but with asymmetric tolerances: +10%/-6% for the UK (previously +10%/-6% of 240V) and -10%/+6% for continental Europe (previously -10%/+6% of 220V). In practice, this means the acceptable range for UK supplies is 216.2V to 253V. Most UK properties actually receive around 235-245V, which is within the upper half of the range. The voltage standard is defined in BS EN 50160, and the DNO is obligated to supply within these limits. If your measured voltage is consistently outside this range, the DNO must investigate and rectify the issue.',
  },
  {
    question: 'What happens if my voltage is too high?',
    answer:
      'Sustained overvoltage — consistently above 253V — causes several problems. Incandescent and halogen lamps burn brighter but have significantly shorter life. LED drivers and electronic power supplies run hotter and may fail prematurely. Motors run faster and draw more current, increasing energy consumption and wear. Sensitive electronics (computers, audio equipment, smart home devices) may be damaged. Your electricity bills increase because appliances consume more power at higher voltage. If you consistently measure over 253V, contact your DNO — they are obligated to investigate and may need to adjust the transformer tap settings at your local substation.',
  },
  {
    question: 'What happens if my voltage is too low?',
    answer:
      'Sustained undervoltage — consistently below 216V — is equally problematic. Motors (in washing machines, tumble dryers, refrigerators, pumps) draw more current to try to deliver the same mechanical power, causing them to overheat and potentially fail. Lighting becomes dim. Electronic devices may not start or may operate erratically. In severe cases, a compressor motor (in a fridge or air conditioning unit) can stall under load and burn out. Undervoltage can indicate a DNO supply issue (overloaded transformer, long service cable run, or high-resistance joint) or a fault within the installation (undersized meter tails, loose connections, or excessive voltage drop on long circuits). If you measure consistently low voltage at the main switch, contact your DNO.',
  },
  {
    question: 'Can a loose neutral cause damage to my appliances?',
    answer:
      'Yes — a loose or broken neutral is one of the most destructive electrical faults. On a single-phase supply, the neutral carries the return current from the load. If the neutral connection becomes loose (high-resistance) or breaks entirely, the voltage at the property can swing unpredictably. In a three-phase supply feeding multiple single-phase properties (as is typical in UK residential streets), a broken neutral on the supply cable can cause the voltage to redistribute unevenly across the phases — one property may receive 280V or more while another drops to 170V or less. Appliances connected at the moment the neutral breaks can be instantly destroyed by the overvoltage. This fault requires immediate DNO intervention. If you suspect a loose neutral (symptoms include lights brightening and dimming, voltage readings that fluctuate significantly, or appliances failing in quick succession), switch off the main switch and contact the DNO on 105.',
  },
  {
    question: 'How do I check the voltage at my property?',
    answer:
      'You need a voltmeter or multimeter. Set it to AC voltage, select the 250V or auto range, and measure between live and neutral at a socket or at the main switch of the consumer unit. A single reading only tells you the voltage at that moment — voltage fluctuates throughout the day depending on the load on the local network. For a meaningful picture, you need to measure at different times: morning, afternoon, evening (peak demand), and late at night (low demand). Better still, use a data logger that records voltage continuously over 24-48 hours. This captures peaks, dips, and transients that a spot measurement misses. If your readings are consistently outside the 216V-253V range, or if you see sudden swings of more than 10V, contact your DNO with the recorded data.',
  },
  {
    question: 'What is the voltage drop limit within an installation?',
    answer:
      'BS 7671 Appendix 12 specifies maximum voltage drop limits within an installation. For a public supply (connection to the DNO network), the voltage drop from the origin of the installation (meter position) to the most distant point of use should not exceed 3% for lighting circuits (6.9V on a 230V supply) and 5% for other circuits (11.5V on a 230V supply). These limits apply to the installation wiring only — they do not include any voltage drop on the DNO supply cable. If you are seeing excessive voltage drop on your circuits, the most common causes are: undersized cable, long cable runs, high load current, and poor connections. Elec-Mate voltage drop calculator helps you verify compliance during design and installation.',
  },
  {
    question: 'Does voltage optimisation save money?',
    answer:
      'Voltage optimisation devices reduce the incoming supply voltage (typically from 240-245V down to 220-225V) with the aim of reducing energy consumption. The energy savings depend on the types of loads in the property. Resistive loads (heaters, kettles, ovens) consume less power at lower voltage but also produce less heat — so they run longer to achieve the same result, and the saving is minimal. Motor loads can benefit — a motor running at lower voltage may be more efficient if it was running above its optimal voltage. LED lighting and electronic loads with switch-mode power supplies are largely voltage-independent and show little saving. For most domestic properties, the savings from voltage optimisation are modest (typically 5-10%) and the payback period for the equipment can be long. For commercial properties with large motor loads, the savings can be more significant.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/power-going-off-randomly',
    title: 'Power Going Off Randomly',
    description:
      'Causes of intermittent power loss including MCB tripping, loose connections, and DNO supply faults.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT earthing systems and how they affect supply voltage and fault protection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Calculate voltage drop for any cable size, length, and load to verify BS 7671 compliance.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly for current carrying capacity, voltage drop, and fault current.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete digital EICR certificates with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'acceptable-voltage',
    heading: 'The Acceptable Voltage Range: 216V to 253V',
    content: (
      <>
        <p>
          The UK mains supply is nominally 230V AC at 50Hz. This nominal voltage was harmonised
          across Europe in 1995, replacing the previous UK standard of 240V. However, the
          harmonisation was largely a paper exercise — the tolerances were set so that existing
          supply voltages remained acceptable.
        </p>
        <p>
          The current standard, BS EN 50160, specifies that the supply voltage at the point of
          connection must remain within <strong>230V +10%/-6%</strong> for 95% of the time, measured
          in 10-minute intervals over a week. This gives a working range of:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum: 216.2V</strong> (230V minus 6%). Below this, appliances may not
                operate correctly and motors may overheat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nominal: 230V</strong>. The target voltage. In practice, most UK supplies
                run at 235-245V due to the historical 240V infrastructure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum: 253V</strong> (230V plus 10%). Above this, appliances may be
                damaged and energy consumption increases.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The DNO is legally obligated to supply within these limits. If your measured voltage is
          consistently outside this range, the DNO must investigate. The Electricity Safety, Quality
          and Continuity Regulations 2002 (ESQCR) set the standards that DNOs must meet, and Ofgem
          regulates compliance.
        </p>
        <p>
          Note that the BS EN 50160 limits apply at the point of supply (the meter position). Within
          the installation, additional{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">voltage drop</SEOInternalLink>{' '}
          occurs on the circuit wiring — BS 7671 limits this to 3% for lighting and 5% for other
          circuits.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-too-high',
    heading: 'Voltage Too High: Causes and Consequences',
    content: (
      <>
        <p>
          Sustained overvoltage — readings consistently above 253V — is less common than
          undervoltage but can cause significant damage to appliances and increase energy costs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transformer tap settings.</strong> The DNO's distribution transformer has
                adjustable taps that set the output voltage. If the taps are set too high (often to
                compensate for voltage drop on long cable runs to distant properties), properties
                close to the transformer receive overvoltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light network load.</strong> Voltage on the network rises when demand is low
                (for example, late at night) and falls when demand is high (evening peak). If your
                voltage is borderline during the day, it may exceed 253V at night.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV export.</strong> Properties with solar PV systems export energy to
                the grid during the day. This can raise the voltage at the point of connection,
                particularly on long rural feeders where multiple solar installations are exporting
                simultaneously. The inverter should disconnect if the voltage exceeds the upper
                limit, but this means lost generation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The consequences of sustained overvoltage include: shortened lamp life (particularly
          incandescent and halogen), premature failure of LED drivers and electronic power supplies,
          increased motor speed and energy consumption, and higher electricity bills. If you
          consistently measure above 253V, contact your DNO with your recorded voltage data and
          request an investigation.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-too-low',
    heading: 'Voltage Too Low: Causes and Consequences',
    content: (
      <>
        <p>
          Undervoltage — readings consistently below 216V — is more common than overvoltage,
          particularly in rural areas with long supply cable runs, or in areas with high demand and
          ageing infrastructure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long supply cable run.</strong> Properties at the end of a long distribution
                cable experience more voltage drop, especially during peak demand. Rural properties
                are particularly affected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded transformer or feeder.</strong> New housing developments,
                electric vehicle chargers, and heat pumps are increasing demand on distribution
                networks that were designed for lower loads. The result is lower voltage at the end
                of the feeder during peak times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-resistance connection.</strong> A corroded or loose connection in the
                DNO's service cable, the cut-out, or the meter tails causes voltage drop under load.
                The voltage may be acceptable at low demand but drops below 216V when the load
                increases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal wiring issues.</strong> Undersized meter tails (for example, 16mm²
                where 25mm² is needed for a modern installation with an electric shower and EV
                charger) can cause significant voltage drop within the installation itself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The consequences of sustained undervoltage include: motors overheating and failing
          prematurely (a motor draws more current at lower voltage to deliver the same power), dim
          lighting, appliances not starting or running erratically, and electronic devices resetting
          or malfunctioning. Undervoltage is particularly damaging to compressor motors in
          refrigerators and air conditioning units.
        </p>
        <SEOAppBridge
          title="Calculate voltage drop on any circuit"
          description="Elec-Mate voltage drop calculator lets you check BS 7671 compliance for any cable size, length, and load — live on site. No spreadsheets, no guesswork."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'loose-neutral',
    heading: 'Loose Neutral: The Dangerous Fault',
    content: (
      <>
        <p>
          A loose or broken neutral is one of the most dangerous supply faults — and one of the most
          destructive. Understanding why requires knowing how the UK distribution network operates.
        </p>
        <p>
          Most UK residential areas are supplied from a three-phase transformer at the local
          substation. The 400V three-phase supply is distributed to properties, with each property
          receiving a single-phase 230V supply (one phase and neutral). The neutral conductor is
          shared between all properties on the same phase and returns current to the transformer.
        </p>
        <p>If the neutral conductor develops a high-resistance joint or breaks entirely:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The voltage becomes unbalanced.</strong> Without a solid neutral return
                path, the voltage across each property depends on the relative load on each phase. A
                lightly loaded property may see 280V or more, while a heavily loaded property may
                drop to 170V or less.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Appliances are destroyed.</strong> At 280V, appliances designed for 230V
                will overheat, smoke, and fail — potentially causing a fire. At 170V, motors stall
                and burn out. The damage can happen within seconds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The RCD will not help.</strong> A broken neutral fault is not an earth
                leakage fault — the RCD will not detect it. The MCBs will only trip if the current
                exceeds their rating, which may not happen before damage occurs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The symptoms of a broken neutral include: lights suddenly becoming very bright or very
          dim, appliances emitting unusual noises or smells, voltage readings that fluctuate wildly
          (readings of 180V one moment and 270V the next), and multiple appliances failing in quick
          succession.
        </p>
        <p>
          <strong>
            If you suspect a broken neutral, switch off the main switch immediately and contact the
            DNO on 105.
          </strong>{' '}
          Do not continue to use the supply — every minute of use risks further damage to appliances
          and a potential fire from overheating equipment.
        </p>
      </>
    ),
  },
  {
    id: 'dno-supply-issues',
    heading: 'DNO Supply Issues and Your Rights',
    content: (
      <>
        <p>
          The Distribution Network Operator (DNO) is responsible for the electricity supply from the
          substation to the meter position. Under the Electricity Safety, Quality and Continuity
          Regulations 2002 (ESQCR) and the conditions of their distribution licence, DNOs must:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintain supply voltage within BS EN 50160 limits</strong> (230V +10%/-6%)
                for 95% of the time. If your supply is consistently outside these limits, the DNO
                must investigate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respond to voltage complaints.</strong> If you report a voltage issue, the
                DNO must investigate. You can support your complaint with recorded voltage data — a
                log showing readings outside the tolerance band over a period of days strengthens
                your case.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay compensation for damage caused by supply faults.</strong> If a DNO
                supply fault (such as a broken neutral) damages your appliances, you may be entitled
                to compensation. Document the damage with photographs and keep receipts. Contact the
                DNO claims department or escalate to the Energy Ombudsman.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To contact your DNO, call 105 from any phone. You can also check your DNO's website for
          live voltage information and planned works. If the DNO does not resolve the issue, you can
          escalate to Ofgem (the energy regulator) or the Energy Ombudsman.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-testing',
    heading: 'How to Test and Record Voltage',
    content: (
      <>
        <p>
          Accurate voltage measurement requires the right equipment and methodology. A single spot
          measurement tells you the voltage at one moment — but voltage varies continuously
          throughout the day and night.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a true RMS multimeter.</strong> Cheap non-RMS meters can give inaccurate
                readings on distorted waveforms. For voltage measurements that you intend to submit
                to the DNO, use a calibrated true RMS instrument.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Measure at the main switch.</strong> Measure line-to-neutral voltage at the
                supply side of the main switch in the consumer unit. This gives you the voltage at
                the origin of the installation, excluding any voltage drop within your circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record at multiple times.</strong> Take readings in the morning (low
                demand), afternoon, evening peak (6-8pm, high demand), and late at night (low
                demand). The evening peak is when voltage is typically lowest; late night is when it
                is typically highest.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a data logger for evidence.</strong> A plug-in voltage data logger
                records voltage continuously over 24-72 hours, capturing peaks, dips, and
                transients. This data is far more convincing to a DNO than a handful of spot
                readings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When recording voltage on an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, measure and record
          the supply voltage at the origin. If it is outside the 216V-253V range, record it as an
          observation — the classification depends on the severity and whether it is a supply-side
          issue (refer to DNO) or an installation issue (for example, undersized meter tails causing
          excessive voltage drop).
        </p>
      </>
    ),
  },
  {
    id: 'voltage-optimisation',
    heading: 'Voltage Optimisation: Is It Worth It?',
    content: (
      <>
        <p>
          Voltage optimisation devices sit between the meter and the consumer unit and reduce the
          incoming voltage — typically from around 240-245V down to 220-225V. They are marketed as
          energy-saving devices, but the reality is more nuanced.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Where It Helps</h3>
            <p className="text-white text-sm leading-relaxed">
              Motor loads (pumps, fans, compressors) can operate more efficiently at lower voltage
              if they were running above their optimal point. Lighting on older dimmer circuits may
              consume less. Commercial buildings with large motor loads often see the best returns.
              Properties receiving consistently high voltage (above 245V) benefit most.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Where It Does Not Help</h3>
            <p className="text-white text-sm leading-relaxed">
              Resistive loads (heaters, kettles, ovens) use less power at lower voltage but also
              produce less heat — so they run longer to achieve the same result. Net saving: near
              zero. Modern switch-mode power supplies (computers, phone chargers, LED drivers) are
              voltage-independent. Properties already receiving 230V or below will see negligible
              savings.
            </p>
          </div>
        </div>
        <p>
          For a typical UK domestic property, the savings from voltage optimisation are modest —
          typically 5-10% of the total electricity bill. Given the cost of the equipment (£300-£800
          installed), the payback period can be 5-10 years. For most homeowners, investing in LED
          lighting, loft insulation, or a smart thermostat will deliver better returns.
        </p>
        <p>
          For commercial properties with large motor loads (workshops, factories, cold stores), the
          case is stronger — but a proper energy audit should be carried out before investing.
        </p>
      </>
    ),
  },
  {
    id: 'diagnosis-for-electricians',
    heading: 'For Electricians: Diagnosing Voltage Problems',
    content: (
      <>
        <p>
          When a customer reports voltage-related symptoms (lights too bright or too dim, appliances
          failing, flickering), a systematic approach identifies whether the issue is on the
          installation or the supply side.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Measure Supply Voltage</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measure L-N voltage at the supply side of the main switch. Record it. If it is
                  outside 216V-253V, the issue is on the DNO supply. If it is within range, measure
                  at the final circuit to check for excessive{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop
                  </SEOInternalLink>{' '}
                  within the installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Check Neutral Integrity</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measure L-N and L-E voltage. In a healthy TN-C-S supply, both should be
                  approximately equal. If L-E is significantly different from L-N, there may be a
                  neutral issue. Check the N-E voltage — it should be close to zero (typically less
                  than 2-3V). A high or fluctuating N-E voltage indicates a neutral fault.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Check Connections</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the supply isolated, inspect the meter tails, main switch terminals, and all
                  connections at the consumer unit for signs of overheating, discolouration, or
                  looseness. Tighten all connections to the manufacturer's torque specification.
                  Check the PEN conductor connection at the cut-out if accessible.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. AI-Assisted Analysis</h4>
                <p className="text-white text-sm leading-relaxed">
                  Input your voltage readings and symptoms into Elec-Mate AI fault diagnosis. It
                  identifies the most likely cause, suggests the next test, and generates the
                  correct observation code for the EICR if you are carrying out a periodic
                  inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          If the fault is on the DNO supply, advise the customer to contact their DNO on 105 and
          provide them with a written summary of your voltage measurements. If the fault is within
          the installation (for example, undersized meter tails or a loose main switch connection),
          quote for the remedial work and carry it out.
        </p>
        <SEOAppBridge
          title="All BS 7671 calculators in your pocket"
          description="Elec-Mate gives you voltage drop, cable sizing, prospective fault current, and earth loop impedance calculators — all on your phone, all following BS 7671:2018+A3:2024. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function VoltageTooHighLowPage() {
  return (
    <GuideTemplate
      title="Voltage Too High or Too Low | Causes & Solutions"
      description="Is your voltage too high or too low? Expert guide covering the acceptable UK range (216V-253V), loose neutral faults, DNO supply issues, voltage optimisation, and testing methods. Includes diagnostic steps for electricians."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Voltage Too High or Too Low?{' '}
          <span className="text-yellow-400">Causes, Testing, and Solutions</span>
        </>
      }
      heroSubtitle="The UK mains voltage should be between 216V and 253V. If your supply is outside this range, appliances can be damaged, motors overheat, and lighting flickers. This guide covers every cause — from DNO supply faults to loose neutrals — and what to do about it."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Supply Voltage"
      relatedPages={relatedPages}
      ctaHeading="Every BS 7671 Calculator on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for voltage drop calculations, cable sizing, AI fault diagnosis, and digital certificates. 7-day free trial, cancel anytime."
    />
  );
}
