import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import TapShockChecker from '@/components/seo/TapShockChecker';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  Search,
  Droplets,
  ThermometerSun,
  Cable,
  GraduationCap,
  FileCheck2,
  Brain,
  Calculator,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Electric Shock from Tap', href: '/guides/electric-shock-from-tap' },
];

const tocItems = [
  { id: 'shock-checker', label: 'Likely Cause Checker' },
  { id: 'what-causes-shock', label: 'What Causes Electric Shock from a Tap' },
  { id: 'immersion-heater-fault', label: 'Immersion Heater Faults' },
  { id: 'bonding-failure', label: 'Bonding Failures' },
  { id: 'pme-earthing', label: 'PME Earthing and Lost Neutral' },
  { id: 'what-to-do', label: 'What to Do Immediately' },
  { id: 'testing-for-electricians', label: 'Testing for Electricians' },
  { id: 'prevention', label: 'Prevention and Remediation' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An electric shock from a tap is a serious safety issue — it means live current is energising metalwork that should be at earth potential.',
  'The most common cause is a failed immersion heater element where the heating element has broken down and is making contact with the water.',
  'Missing or disconnected main protective bonding to water and gas pipes is a major contributor to shock risk on metalwork.',
  'In properties with PME (TN-C-S) earthing, a broken PEN conductor (combined neutral and earth) on the DNO supply can put dangerous voltage on all bonded metalwork.',
  'Elec-Mate AI fault diagnosis helps electricians quickly identify whether the cause is an appliance fault, bonding issue, or supply-side problem.',
  'BS 7671 Regulation 411.3.4 requires 30mA RCD protection on AC final circuits supplying luminaires in domestic premises — protection against fault currents reaching metalwork via luminaire wiring.',
];

const faqs = [
  {
    question: 'Why am I getting an electric shock from my kitchen tap?',
    answer:
      'An electric shock from a tap means that the metalwork (pipework, taps, sink) has become live — there is a voltage difference between the tap and the earth you are standing on (usually a wet floor, which makes the shock worse). The most common causes are: a faulty immersion heater where the element has broken down and is energising the water and pipework, a faulty appliance (washing machine, dishwasher) with a live-to-earth fault that is feeding current onto the pipework via its water connection, missing or disconnected main protective bonding conductors to the water pipes, or in rare cases a broken PEN conductor on the DNO supply (in PME/TN-C-S earthing systems). Whatever the cause, stop using the tap immediately and call a qualified electrician. Do not attempt to investigate the fault yourself — the combination of water and electricity is extremely dangerous.',
  },
  {
    question: 'Is a tingling sensation from a tap dangerous?',
    answer:
      'Yes. Even a mild tingle indicates that there is a voltage on the metalwork. The severity of the shock depends on the voltage, the current path through your body, and your contact resistance (which is much lower when your hands are wet). A mild tingle from a tap could become a severe or fatal shock if conditions change — for example, if you are standing in water, if the fault worsens, or if the bonding deteriorates further. Any shock or tingle from metalwork in a property is a C1 (Danger Present) defect under BS 7671 and requires immediate investigation and remediation. Do not ignore it.',
  },
  {
    question: 'Can a faulty immersion heater electrify the water?',
    answer:
      'Yes. An immersion heater has an electrical heating element sealed inside a metal sheath, immersed directly in the hot water cylinder. If the element sheath develops a crack or the insulation breaks down, the live conductor can make contact with the water. This energises the water itself and all connected metalwork — pipes, taps, radiators, and towel rails. The RCD should trip when this happens (because the current flowing through the water to earth is an earth leakage), but if the property has no RCD protection on the immersion heater circuit, or if the RCD is faulty, the fault can persist. In modern installations, consumer units are fully RCD-protected, so immersion heater circuits are typically covered. If you suspect a faulty immersion heater, switch off the immersion heater circuit at the consumer unit immediately and call a qualified electrician.',
  },
  {
    question: 'What is protective bonding and why does it matter?',
    answer:
      'Main protective bonding is a fundamental safety measure required by BS 7671. It involves connecting the main earthing terminal of the electrical installation to extraneous-conductive-parts — metalwork that is not part of the electrical installation but could introduce a potential. Regulation 544.1.2 requires that the bonding connection to any extraneous-conductive-part (water pipe, gas pipe, other metallic service) shall be made as near as practicable to the point of entry into the premises. In a domestic property, this means bonding conductors connected to the incoming water pipe, the incoming gas pipe, and (where applicable) incoming oil pipes and structural steelwork. The purpose is to ensure that all metalwork in the property is at the same potential — so if a fault puts a voltage on one piece of metalwork, the bonding ensures all metalwork rises to the same voltage, preventing a dangerous voltage difference. Bonding conductor sizing is governed by Regulation 544.1.1: under PME (TN-C-S) supplies, sizing follows Table 54.8 based on the PEN conductor CSA; under non-PME supplies (TN-S or TT) the conductor must be at least half the CSA of the earthing conductor, with a minimum of 6mm² copper. If the bonding is missing, disconnected, or undersized, a fault can create a dangerous voltage difference between metalwork — which is exactly what causes a shock from a tap.',
  },
  {
    question: 'Could the shock be caused by my neighbour installation?',
    answer:
      'In some circumstances, yes — particularly in properties with PME (TN-C-S) earthing where metal pipework is shared between properties (such as in a block of flats or terraced houses with shared water mains). If a neighbouring property has a fault that puts current onto shared metalwork, you may experience a shock even though your own installation is fault-free. Additionally, if the PEN conductor (combined neutral and earth) on the DNO supply develops a high-resistance joint or breaks, neutral current from other properties on the same supply can flow through the earth path, raising the voltage on all bonded metalwork. This is known as a "lost neutral" or "broken PEN" fault and is the DNO responsibility. If you suspect this, measure the voltage between the incoming water pipe and a known earth reference — if it is above a few volts and varies with time (especially during peak hours), contact your DNO.',
  },
  {
    question: 'Should I turn off the water or the electricity first?',
    answer:
      'Turn off the electricity first. Go to the consumer unit and switch off the main switch. This removes the source of the fault. Do not touch the taps or any metalwork until the electricity is off. If you cannot reach the consumer unit without touching metalwork that may be live, call an emergency electrician or call 999 if someone has been seriously shocked. Once the electricity is off, the taps are safe to use — but leave the electricity off until a qualified electrician has investigated and fixed the fault. Turning off the water supply does not remove the electrical hazard — the pipework can still be energised even with no water flowing through it.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earthing-fault-diagnosis',
    title: 'Earthing Fault Diagnosis',
    description:
      'How to find earth faults using insulation resistance testing, half-split method, and clamp meters.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'In-depth guide to RCD tripping causes including earth leakage, moisture ingress, and faulty appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/earthing-arrangements',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT earthing systems — how they work and why they matter for fault protection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description:
      'Step-by-step safe isolation following GS38 requirements before working on any circuit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/inspection-testing-course',
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
    id: 'shock-checker',
    heading: 'Find the Likely Cause in Two Taps',
    content: (
      <>
        <p>
          The quick answer before the theory: where you feel the shock narrows the cause sharply —
          pick what matches and get the immediate action.
        </p>
        <TapShockChecker />
      </>
    ),
  },
  {
    id: 'what-causes-shock',
    heading: 'What Causes an Electric Shock from a Tap?',
    content: (
      <>
        <p>
          Getting an electric shock from a tap is alarming — and it should be. It means that
          metalwork in the property which should be at earth potential has become energised. There
          is a voltage on the pipework, and when you touch the tap (especially with wet hands),
          current flows through your body to earth.
        </p>
        <p>
          The shock can range from a mild tingle to a severe jolt, depending on the voltage, the
          resistance of the fault path, and your own body resistance (which drops significantly when
          wet). In the worst cases, electric shock from water contact can be fatal.
        </p>
        <p>
          There are four main causes, and understanding them is critical for both homeowners and
          electricians:
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty immersion heater element</strong> — the most common cause. The
                heating element breaks down, allowing the live conductor to contact the water and
                energise all connected pipework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or disconnected main protective bonding</strong> — without bonding,
                metalwork can sit at different potentials, creating a shock risk when you bridge the
                gap (for example, touching a tap while standing on a tiled floor).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty appliance connected to water</strong> — a washing machine,
                dishwasher, or electric shower with a live-to-earth fault can feed current onto the
                pipework through its water connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing fault (broken PEN conductor)</strong> — in TN-C-S systems, a
                broken combined neutral/earth on the DNO supply can put dangerous voltage on all
                bonded metalwork.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'immersion-heater-fault',
    heading: 'Immersion Heater Faults: The Most Common Cause',
    content: (
      <>
        <p>
          The immersion heater is the single most common cause of electric shock from taps and
          pipework. It works by immersing an electrical heating element directly in the water inside
          the hot water cylinder. The element consists of a resistive conductor inside a sealed
          metal sheath — the sheath keeps the electrical conductor isolated from the water.
        </p>
        <p>
          Over time, the element sheath can corrode (especially in areas with hard water or high
          mineral content), develop hairline cracks, or the internal insulation can break down. When
          this happens, the live conductor makes contact with the water. The water becomes
          energised, and because the water is in direct contact with the copper pipework, all
          connected metalwork — hot water pipes, taps, radiators, towel rails — becomes live.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The RCD should trip.</strong> Under BS 7671, socket-outlet circuits rated up
                to 32A (Reg 411.3.3) and AC final circuits supplying luminaires in domestic premises
                (Reg 411.3.4) require 30mA RCD protection. Many immersion heater circuits are also
                RCD-protected as part of a fully RCD-protected consumer unit. When the element
                fails, current flows from the live conductor through the water to earth via the
                pipework and bonding — this earth leakage should cause the RCD to operate,
                interrupting the supply. Regulation 643.8 verifies that operation with a single
                alternating current test at the rated residual operating current (IΔn): for a
                general non-delay type RCD the device must disconnect within 300ms maximum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>But older installations may not have RCD protection.</strong> Many
                properties still have immersion heaters on circuits without RCD protection —
                particularly if the consumer unit pre-dates the 17th or 18th Edition requirements.
                Without an RCD, the fault can persist indefinitely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to test:</strong> switch off the immersion heater circuit at the
                consumer unit. If the shock from the tap stops, the immersion heater is almost
                certainly the cause. An electrician can confirm by testing the insulation resistance
                of the immersion heater element — it should read at least 1M ohm between the element
                and the sheath.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the immersion heater element has failed, it must be replaced. The replacement element
          should be a direct equivalent (same length, wattage, and thread size), fitted with a new
          fibre washer, and the circuit should be upgraded to include 30mA RCD protection if it does
          not already have it.
        </p>
      </>
    ),
  },
  {
    id: 'bonding-failure',
    heading: 'Bonding Failures: The Hidden Danger',
    content: (
      <>
        <p>
          Main protective bonding is one of the most critical safety measures in any electrical
          installation, yet it is frequently found to be missing, disconnected, or inadequate —
          particularly in older properties that have never had a full{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR inspection</SEOInternalLink>.
        </p>
        <p>
          Under BS 7671 Regulation 544.1.2, the main protective bonding connection to any
          extraneous-conductive-part (gas, water, or other metallic pipework or service) shall be
          made as near as practicable to the point of entry of that service into the premises. The
          bonding conductors must be connected between the main earthing terminal and the following
          extraneous-conductive-parts:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incoming water pipe</strong> — bonded as close as practicable to the point
                of entry, but on the consumer's side of any insulating insert and before any branch
                connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incoming gas pipe</strong> — bonded to the consumer's hard metal pipework
                after the meter and before any branch pipework; where practicable within 600mm of
                the meter outlet union, or at the point of entry to the building where the meter is
                external.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Other services</strong> — incoming oil pipes, structural steelwork,
                lightning protection systems, and central heating pipework where it enters the
                building.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The minimum bonding conductor size is determined by Regulation 544.1.1 and depends on the
          earthing arrangement. Where PME (TN-C-S) conditions apply, the conductor shall be selected
          in accordance with the PEN conductor CSA and Table 54.8 — typically 10mm², 16mm², or 25mm²
          copper depending on the supply. Where PME does not apply (TN-S or TT), the conductor shall
          be not less than half the CSA of the earthing conductor for the installation, with a
          minimum of 6mm² copper. The bonding must be continuous, securely fixed, and connected with
          clamps to BS 951 (Electrical earthing — clamps for earthing and bonding), carrying the
          warning notice "Safety Electrical Connection — Do Not Remove" required by Regulation
          514.13.1.
        </p>
        <p>
          Common bonding failures include: clamps that have been removed during plumbing work and
          not refitted, bonding bypassed by plastic pipe sections (where a plumber replaces a
          section of copper with plastic without reinstating the bond), corroded or loose clamps,
          and undersized conductors (for example, 4mm² earth wire used as a bonding conductor).
        </p>
        <SEOAppBridge
          title="AI identifies bonding defects from your EICR observations"
          description="Describe the bonding situation — Elec-Mate AI returns the correct observation code, the BS 7671 regulation reference, and whether it is a C1, C2…"
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing and the Broken PEN Conductor',
    content: (
      <>
        <p>
          Most modern UK domestic properties are supplied with a PME (Protective Multiple Earthing)
          system, technically known as{' '}
          <SEOInternalLink href="/earthing-arrangements">TN-C-S earthing</SEOInternalLink>. In this
          system, the DNO combines the neutral and earth conductors into a single PEN (Protective
          Earth Neutral) conductor in the supply cable. At the property, the DNO provides an earth
          terminal by connecting it to the neutral.
        </p>
        <p>
          This works well under normal conditions. But if the PEN conductor develops a
          high-resistance joint or breaks entirely (a "lost neutral" or "broken PEN" fault), the
          consequences can be dangerous:
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral current flows through the earth path.</strong> With the PEN
                conductor broken, the return current from all properties on that supply section has
                to find another path back to the transformer. It flows through the earth electrode,
                the bonding, and the metalwork — including water and gas pipes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage appears on all bonded metalwork.</strong> The voltage on the
                metalwork can reach dangerous levels — potentially tens of volts or more, depending
                on the load on the supply and the resistance of the earth path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The fault is not on the property installation.</strong> This is a DNO supply
                fault. It can affect multiple properties on the same supply section. The property
                installation may be perfectly compliant with BS 7671, yet the occupants experience
                shocks from taps and pipework.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This is the reason BS 7671 has specific requirements for locations with increased risk —
          for example, bathroom supplementary bonding (Regulation 701.415.2) and restrictions on PME
          earthing for certain special installations. It is also why{' '}
          <SEOInternalLink href="/guides/marina-electrical-installations">
            marina installations
          </SEOInternalLink>{' '}
          and caravan sites often use TT earthing instead of TN-C-S.
        </p>
        <p>
          If you suspect a broken PEN conductor, measure the voltage between the incoming water pipe
          (before the bonding connection) and a known earth reference (for example, an earth rod).
          If the voltage fluctuates and is more than a few volts, contact the DNO immediately.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-do',
    heading: 'What to Do Immediately If You Get a Shock from a Tap',
    content: (
      <>
        <p>
          If you or someone in the property receives an electric shock from a tap, follow these
          steps immediately:
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Do not touch the tap or any metalwork again.</strong> If someone is in contact
              with a live tap and cannot let go, do not grab them — you will receive the same shock.
              Switch off the electricity at the consumer unit main switch, or if you cannot reach
              it, use a dry non-conductive object (wooden broom handle, dry towel) to push the
              person away from the tap.
            </li>
            <li>
              <strong>Switch off the main switch at the consumer unit.</strong> This removes the
              source of the fault. Once the electricity is off, the taps are safe.
            </li>
            <li>
              <strong>Call 999 if anyone is injured.</strong> Electric shock can cause burns,
              cardiac arrhythmia, and loss of consciousness. Even if the person feels fine, they
              should be assessed by a medical professional — the effects of electric shock can be
              delayed.
            </li>
            <li>
              <strong>Call a qualified electrician.</strong> Do not turn the electricity back on
              until the fault has been identified and fixed. The electrician will test the
              insulation resistance of all circuits, check the bonding, and test each appliance
              connected to the water supply.
            </li>
            <li>
              <strong>If the shock came from the hot water tap only,</strong> switch off the
              immersion heater circuit at the consumer unit. This is the most common cause and
              isolating that circuit may make the rest of the installation safe to use temporarily.
            </li>
          </ol>
        </div>
        <p>
          Never ignore a shock from a tap, even if it is mild. The fault will not fix itself and is
          likely to get worse. What starts as a tingle can become a life-threatening shock as the
          insulation deteriorates further.
        </p>
      </>
    ),
  },
  {
    id: 'testing-for-electricians',
    heading: 'For Electricians: Testing and Diagnosis',
    content: (
      <>
        <p>
          When called to investigate a shock from a tap or pipework, follow a systematic approach to
          identify the source. The fault could be on the property installation, a connected
          appliance, or the DNO supply.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Voltage Measurement on Metalwork</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the supply on, measure the AC voltage between the tap/pipework and a known
                  earth reference (earth rod, or MET if accessible). Any voltage above 2-3V AC
                  indicates a fault. Note whether the voltage is present on hot water pipes only
                  (immersion heater fault) or all metalwork (bonding or supply issue).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Bonding Continuity Check</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the supply isolated, test the continuity of the main protective bonding
                  conductors. Measure from the MET to the bonding clamp on the water pipe, gas pipe,
                  and any other bonded services. Guidance Note 3 advises that readings across bonds
                  made by earth clamps should approach 0.05 ohm, allowing for instrument resolution,
                  accuracy at low values and contact resistance; where the expected resistance is
                  below the instrument's resolution, the guideline is a reading not exceeding 0.1
                  ohm. An open-circuit or high-resistance bond is a defect requiring immediate
                  remedy.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  3. Insulation Resistance of Appliances
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Disconnect each appliance that connects to water (immersion heater, washing
                  machine, dishwasher, electric shower) and test the insulation resistance between
                  live/neutral and earth. The reading must be at least 1M ohm at 500V DC. A low
                  reading on the immersion heater element is the most common finding.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Check for PEN Conductor Fault</h4>
                <p className="text-white text-sm leading-relaxed">
                  If the bonding and appliances test satisfactory, suspect a supply-side fault.
                  Measure the voltage between the incoming water pipe (before the bonding clamp) and
                  an independent earth reference. A fluctuating voltage (especially one that varies
                  with load or time of day) suggests a broken or high-resistance PEN conductor.
                  Contact the DNO.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Always carry out{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          before working on any circuit. When testing near water and metalwork, use GS38-compliant
          test leads with fused probes, and take particular care with wet surfaces.
        </p>
        <SEOAppBridge
          title="AI fault diagnosis for shock from metalwork"
          description="Enter the symptoms and test results into Elec-Mate AI — it identifies the most likely cause, suggests the next test…"
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'prevention',
    heading: 'Prevention: How to Stop It Happening Again',
    content: (
      <>
        <p>Once the immediate fault has been fixed, there are steps to prevent a recurrence:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ensure the circuits BS 7671 requires to be RCD-protected actually are.</strong>{' '}
                30mA additional protection is required for socket-outlets rated up to 32A (Reg
                411.3.3), AC final circuits supplying luminaires in domestic premises (Reg 411.3.4),
                cables concealed in walls and partitions (Reg 522.6.202 and Table 52.1), and all low
                voltage circuits serving a location containing a bath or shower (Reg 701.411.3.3).
                In practice a modern fully RCD-protected consumer unit covers all of these. The RCD
                is the primary defence against electric shock — it trips before a dangerous current
                can flow through a person for long enough to cause harm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify main protective bonding.</strong> Check that bonding conductors are
                connected to water and gas pipes, correctly sized per Reg 544.1.1 (Table 54.8 under
                PME; minimum 6mm² half-earthing-conductor rule under non-PME), and securely clamped
                with labelled BS EN clamps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ensure domestic lighting circuits have 30mA RCD protection.</strong> BS 7671
                Regulation 411.3.4 requires that, within domestic (household) premises, AC final
                circuits supplying luminaires shall have additional protection by an RCD with a
                rated residual operating current not exceeding 30mA. This has applied since the 18th
                Edition (BS 7671:2018) and is unchanged in A4:2026, so older installations
                predating it are commonly found without it. It directly reduces the risk of fault
                currents from luminaire wiring reaching metalwork and causing a shock — the same
                mechanism described on this page.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check supplementary bonding in bathrooms.</strong> BS 7671 Regulation
                701.415.2 requires supplementary bonding in a room containing a bath or shower —
                connecting the protective conductor terminals of every circuit supplying Class I and
                Class II equipment to the accessible extraneous-conductive-parts. It may be omitted
                only where the building has protective equipotential bonding to Regulation 411.3.1.2
                and all three omission conditions are met: every final circuit of the location
                complies with automatic disconnection (Reg 411.3.2), every final circuit has 30mA
                RCD additional protection (Reg 415.1.1), and all extraneous-conductive-parts of the
                location are effectively connected to the main protective bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular periodic inspection.</strong> A 5-yearly{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> will identify
                bonding deficiencies, missing RCD protection, and deteriorating insulation
                resistance before they cause a shock incident.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace ageing immersion heaters.</strong> If the immersion heater is more
                than 10-15 years old, consider proactive replacement. Element failure is a matter of
                when, not if.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, every call-out for a shock from metalwork should result in a thorough
          check of the bonding and RCD protection across the entire installation — not just the
          specific fault that caused the call. Use Elec-Mate's EICR app to record your findings and
          issue a certificate if a periodic inspection is warranted.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricShockFromTapPage() {
  return (
    <GuideTemplate
      title="Electric Shock from Tap: Causes & How to Fix"
      description="Shocks from a water tap usually mean a failed immersion heater element energising the pipework. Isolate at the consumer unit, check bonding and the PEN."
      datePublished="2025-04-20"
      dateModified="2026-08-06"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Zap}
      heroTitle={
        <>
          Electric Shock from a Tap?{' '}
          <span className="text-yellow-400">Causes and Emergency Response</span>
        </>
      }
      heroSubtitle="An electric shock from a tap means live current is energising your pipework. The most common cause is a faulty immersion heater, but bonding failures and PME supply faults can also be responsible. This guide covers what to do immediately, the causes, and how electricians diagnose the problem."
      readingTime={10}
      answerBox={{
        question: 'Why am I getting an electric shock from my tap?',
        answer:
          'A shock from a metal tap means the pipework has risen to a dangerous voltage. The most common causes are a faulty appliance such as an immersion heater leaking to the pipe, a missing or disconnected main protective bonding conductor to the water or gas service, or a lost PEN (combined neutral-earth) conductor on a TN-C-S (PME) supply. It is potentially dangerous — stop using the water, isolate, and have it investigated urgently.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electric Shock from Taps"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Electrical Faults Faster with AI"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI fault diagnosis, BS 7671 calculators, and digital certificates. 7-day free trial, cancel anytime."
    />
  );
}
