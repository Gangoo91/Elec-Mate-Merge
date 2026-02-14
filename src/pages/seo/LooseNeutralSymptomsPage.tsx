import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Activity,
  Search,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
  Brain,
  Lightbulb,
  Power,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Loose Neutral', href: '/guides/loose-neutral-symptoms' },
];

const tocItems = [
  { id: 'what-is-loose-neutral', label: 'What Is a Loose Neutral?' },
  { id: 'symptoms', label: 'Symptoms of a Loose Neutral' },
  { id: 'voltage-fluctuation', label: 'Voltage Fluctuation Explained' },
  { id: 'dangers', label: 'Dangers of an Open Neutral' },
  { id: 'tncs-open-neutral', label: 'Open Neutral on TN-C-S Systems' },
  { id: 'dno-responsibility', label: 'DNO Responsibility' },
  { id: 'how-to-diagnose', label: 'How to Diagnose a Loose Neutral' },
  { id: 'fixing-the-fault', label: 'Fixing the Fault' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A loose neutral connection causes voltage fluctuations across the installation — lights may brighten and dim unpredictably, and appliances can be damaged by over-voltage or under-voltage.',
  'On a TN-C-S (PME) earthing system, a broken or loose neutral on the supply side (between the meter and the transformer) is extremely dangerous because the neutral also serves as the earth path.',
  'Classic symptoms include flickering lights that worsen under load, appliances running fast then slow, tingling from taps or radiators, and voltage readings that fluctuate between 200V and 260V.',
  'If the loose neutral is on the supply side (DNO infrastructure), the Distribution Network Operator is responsible for the repair — not the electrician or the property owner.',
  "Elec-Mate's AI fault diagnosis tool helps electricians identify loose neutral symptoms, differentiate between internal and supply-side faults, and generate accurate EICR observation codes.",
];

const faqs = [
  {
    question: 'What are the symptoms of a loose neutral connection?',
    answer:
      'The most common symptoms of a loose neutral are flickering or fluctuating lights (brightening and dimming unpredictably), voltage readings that swing between approximately 200V and 260V when different loads are switched on and off, appliances behaving erratically (motors running fast then slow, electronic equipment resetting), and in severe cases, a tingling sensation from metalwork such as taps, radiators, or exposed pipework. The symptoms typically worsen when high-power appliances such as kettles, ovens, or showers are switched on, because the increased load current creates a larger voltage drop across the loose connection. If you notice these symptoms, it is important to have the installation investigated promptly, as the voltage fluctuations can damage sensitive electronics and, in the case of an open neutral on a TN-C-S system, can create a dangerous touch voltage on the earthing system.',
  },
  {
    question: 'Is a loose neutral dangerous?',
    answer:
      'Yes, a loose neutral can be very dangerous. On a single-phase supply, a loose neutral causes voltage fluctuations that can damage appliances and, in extreme cases, cause a fire at the point of the loose connection due to arcing and overheating. On a TN-C-S (PME) earthing system, the danger is even greater: the combined neutral-earth conductor (PEN conductor) provides both the neutral return path and the main earthing terminal. If this conductor becomes open-circuit (a "lost neutral"), the voltage on the earthing system rises to a potentially lethal level. Exposed metalwork connected to the earthing system — taps, radiators, gas pipes, boiler casings — can become live at up to 230V with respect to true earth. This is why BS 7671 requires additional earthing precautions (main bonding, supplementary bonding) on TN-C-S systems and why a lost neutral on PME is treated as a life-threatening emergency.',
  },
  {
    question: 'Who is responsible for fixing a loose neutral — the electrician or the DNO?',
    answer:
      "It depends on where the loose neutral is located. The demarcation point between the Distribution Network Operator (DNO) responsibility and the property owner responsibility is the meter. Everything from the transformer to the meter — including the service cable, cut-out fuse, and meter tails up to the metering equipment — is the DNO responsibility. Everything from the meter onwards — including the consumer unit, circuits, and accessories — is the property owner responsibility (and therefore the electrician's scope of work). If the loose neutral is at the supply terminals in the cut-out, or on the overhead or underground service cable, the DNO must be contacted to carry out the repair. The electrician should not interfere with the DNO equipment. If the loose neutral is at the consumer unit main neutral bar, at a junction box, or at an accessory within the installation, it is the electrician's responsibility to repair.",
  },
  {
    question: 'How do I test for a loose neutral?',
    answer:
      'To test for a loose neutral, you need a voltmeter and a systematic approach. First, measure the voltage between live and neutral at the consumer unit main switch — it should be a stable 230V (within the tolerance of +10% / -6%, so 216V to 253V). Then have someone switch on a high-power appliance (such as a kettle or electric shower) while you observe the voltage reading. If the voltage drops significantly (below 210V) or rises significantly (above 255V) when the load is switched on, this suggests a high-resistance connection in the neutral path. Next, measure the voltage between the neutral bar and the main earth terminal at the consumer unit — on a healthy installation, this should be close to 0V. A reading above 2V to 3V indicates a neutral problem. You can also use a clamp meter on the main neutral conductor to measure the current, and then check for a voltage drop across each connection point in the neutral path to locate the high-resistance joint.',
  },
  {
    question: 'Can a loose neutral damage appliances?',
    answer:
      'Yes. A loose neutral causes the voltage supplied to appliances to fluctuate. When a high-power appliance is switched on, it draws a large current through the neutral. If the neutral has a loose connection with high resistance, a significant voltage drop occurs across that connection. This means the voltage available at the socket drops below normal — which can cause motors to overheat and electronics to malfunction. Conversely, when the high-power appliance switches off, the voltage can spike above normal — potentially exceeding the rated voltage of sensitive equipment and causing damage. On a three-phase supply with a loose neutral, the situation is worse: the voltage on each phase becomes unbalanced, and one phase can rise to well above 253V while another drops well below 216V. This can destroy appliances connected to the high-voltage phase. Voltage surge protectors (SPDs) can provide some protection, but the correct fix is to repair the loose connection.',
  },
  {
    question: 'What is an "open neutral" and how is it different from a loose neutral?',
    answer:
      'A loose neutral is a connection that still makes contact but has high resistance — it is partially connected. An open neutral (also called a "lost neutral" or "broken neutral") is a complete break in the neutral conductor — no connection at all. An open neutral is more dangerous than a loose neutral because the neutral is entirely absent, meaning the full voltage fluctuation effect occurs on every load change. On a single-phase supply, an open neutral means the circuit cannot function properly — lights will not work, or they will behave very erratically depending on other paths to neutral. On a TN-C-S (PME) system, an open supply-side neutral means the main earthing terminal voltage rises to a potentially lethal level. The symptoms of an open neutral are similar to a loose neutral but more severe and more consistent — the lights do not just flicker, they stay bright or dim for extended periods.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/burning-smell-from-socket',
    title: 'Burning Smell from Socket',
    description:
      'Loose connections, arcing, and overheated terminals — causes, dangers, and emergency actions.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/intermittent-electrical-faults',
    title: 'Intermittent Electrical Faults',
    description:
      'Systematic approach to finding temperature-dependent, vibration, and loose connection faults.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-C-S, TN-S, and TT earthing systems — how they work and why they matter for fault finding.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'In-depth guide to C1, C2, C3, and FI classification codes with real-world examples.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-loose-neutral',
    heading: 'What Is a Loose Neutral?',
    content: (
      <>
        <p>
          A loose neutral is a high-resistance connection in the neutral conductor of an electrical
          installation. The neutral conductor carries the return current from the load back to the
          source (the transformer). When this connection is loose — whether at a terminal in the
          consumer unit, at a junction box, at the meter tails, or on the DNO supply cable — the
          resistance at that point increases, causing a voltage drop across the connection.
        </p>
        <p>
          The effect of this voltage drop is that the voltage available to the loads in the
          installation fluctuates depending on the current flowing through the neutral. When a
          high-power appliance draws current, the voltage drop across the loose connection
          increases, and the voltage at the sockets drops. When the appliance switches off, the
          voltage recovers. This creates the characteristic flickering lights and erratic appliance
          behaviour that are the hallmark of a loose neutral.
        </p>
        <p>
          The fault can occur anywhere in the neutral path — from the DNO's transformer through the
          service cable, cut-out, meter, meter tails, consumer unit, and circuit wiring to the final
          accessory. Identifying the exact location is critical because it determines who is
          responsible for the repair and what level of danger the fault represents.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-fault-diagnosis">
            AI fault diagnosis tool
          </SEOInternalLink>{' '}
          can help you differentiate between a supply-side and installation-side neutral fault based
          on the symptoms and test results you provide.
        </p>
      </>
    ),
  },
  {
    id: 'symptoms',
    heading: 'Symptoms of a Loose Neutral Connection',
    content: (
      <>
        <p>
          A loose neutral produces a distinctive set of symptoms that, once you know what to look
          for, are unmistakable:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flickering lights:</strong> Lights brighten and dim unpredictably, often
                getting worse when other appliances are switched on. The flickering is typically
                slower than the rapid flicker caused by a faulty lamp or driver — more of a pulsing,
                surging effect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage fluctuations:</strong> Voltage readings at the sockets swing between
                approximately 200V and 260V as different loads are switched on and off. A healthy
                supply should be stable at 230V (within +10% / -6%).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Erratic appliance behaviour:</strong> Motors run fast then slow, electronic
                equipment resets or displays errors, and sensitive devices (computers, routers) may
                shut down or restart unexpectedly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tingling from metalwork:</strong> On TN-C-S (PME) systems, a loose
                supply-side neutral can cause a voltage to appear on the earthing system. You may
                feel a tingle or mild shock from taps, radiators, gas pipes, or other exposed
                metalwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warm or hot neutral terminal:</strong> At the point of the loose connection,
                the terminal may be noticeably warm or hot due to the I²R heating effect.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The symptoms typically worsen at peak usage times when the household is drawing more
          current — for example, when cooking, running the shower, and watching television
          simultaneously. If the loose connection is on the supply side, neighbouring properties on
          the same supply may experience similar symptoms.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-fluctuation',
    heading: 'Voltage Fluctuation Explained',
    content: (
      <>
        <p>
          To understand why a loose neutral causes voltage fluctuations, consider the basic circuit.
          The supply voltage (230V) is shared between the load and any resistance in the circuit
          conductors. On a healthy installation, the resistance of the neutral conductor is very low
          (a fraction of an ohm), so the voltage drop across the neutral is negligible.
        </p>
        <p>
          When the neutral has a loose connection, the resistance at that point increases — perhaps
          to several ohms or even tens of ohms. Now, when current flows through the neutral, a
          significant voltage is dropped across the loose connection. This voltage is "lost" from
          the load — the appliance receives less than 230V.
        </p>
        <p>
          The voltage drop is proportional to the current: V = I x R. A 3kW kettle draws about 13A.
          If the loose neutral has a resistance of 2 ohms, the voltage drop across the connection is
          26V — meaning the kettle receives only 204V instead of 230V. This is below the minimum
          tolerance of 216V and can cause the kettle to heat slowly and the lights to dim
          noticeably.
        </p>
        <p>
          On a three-phase supply (common in larger properties, commercial premises, and blocks of
          flats), a loose neutral is even more problematic. The neutral carries the imbalance
          current between the three phases. If the neutral is lost, the phase voltages become
          unbalanced — one phase can rise to over 300V while another drops to under 150V. This can
          destroy appliances on the high-voltage phase within seconds.
        </p>
        <SEOAppBridge
          title="Test and record voltage readings with Elec-Mate"
          description="Use Elec-Mate's voice test entry to record supply voltage readings, Zs values, and prospective fault current while your hands are on the test leads. All readings feed directly into the EICR schedule of test results."
          icon={Activity}
        />
      </>
    ),
  },
  {
    id: 'dangers',
    heading: 'Dangers of an Open Neutral',
    content: (
      <>
        <p>
          An open neutral — where the neutral conductor is completely disconnected — takes the
          dangers of a loose neutral to the extreme:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over-voltage damage:</strong> Without a neutral reference, the voltage at
                sockets can rise well above 253V (the maximum tolerance). Appliances rated for 230V
                can be destroyed by sustained over-voltage — LED drivers burn out, power supply
                units fail, and motors overheat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire risk:</strong> The arcing at the point of the open connection generates
                intense heat that can ignite surrounding insulation, cable sheathing, or building
                materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shock risk on TN-C-S:</strong> On a PME earthing system, an open
                supply-side neutral means the MET voltage rises. All metalwork connected to the
                earthing system becomes live with respect to true earth, creating a lethal shock
                risk from taps, radiators, and pipes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral carries fault current:</strong> On a TN-C-S system, the neutral
                conductor serves as both the neutral return path and the earth fault path. A lost
                neutral means earth faults may not be cleared properly by protective devices.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An open neutral is classified as a C1 (Danger Present) defect under the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR observation code system
          </SEOInternalLink>
          . The inspector must make the installation safe immediately — which may mean isolating the
          supply and contacting the DNO if the fault is on the supply side.
        </p>
      </>
    ),
  },
  {
    id: 'tncs-open-neutral',
    heading: 'Open Neutral on TN-C-S (PME) Systems',
    content: (
      <>
        <p>
          The danger of a lost neutral is greatest on{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-explained">
            TN-C-S (Protective Multiple Earthing)
          </SEOInternalLink>{' '}
          installations, which are the most common earthing arrangement in the UK. On a TN-C-S
          system, the supply neutral and earth are combined into a single PEN (Protective Earth and
          Neutral) conductor from the transformer to the property's service head. At the service
          head, the PEN conductor is split into separate neutral and earth conductors.
        </p>
        <p>
          If the PEN conductor (or the neutral on the supply side of the split) becomes open
          circuit, the main earthing terminal (MET) at the property is no longer connected to the
          DNO's earth. Instead, the MET voltage rises to whatever voltage is being dropped across
          the loose connection by the load current. In a worst-case scenario, this can be up to
          230V.
        </p>
        <p>
          This means every piece of metalwork bonded to the MET — gas pipes, water pipes, central
          heating pipework, radiators, taps, boiler casings, and any Class I appliance — becomes
          live at up to 230V with respect to true earth. Anyone touching this metalwork while also
          in contact with true earth (standing on a wet floor, touching an outside tap) receives a
          potentially fatal electric shock.
        </p>
        <p>
          This is why{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          requires specific precautions for TN-C-S systems, including main protective bonding to
          gas, water, and oil pipework (Regulation 411.3.1.2) and restrictions on using PME earthing
          for certain installations such as petrol stations, caravan parks, and construction sites
          where the risk is considered too high.
        </p>
      </>
    ),
  },
  {
    id: 'dno-responsibility',
    heading: 'DNO Responsibility: When It Is Not Your Fault to Fix',
    content: (
      <>
        <p>
          The demarcation between the electrician's responsibility and the DNO's responsibility is
          critical when dealing with a loose neutral:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO responsibility:</strong> Everything from the transformer to the meter —
                the underground or overhead service cable, the cut-out fuse holder, the service
                head, and the meter. If the loose neutral is in any of these components, the DNO
                must be contacted. The electrician must not interfere with the DNO's equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician responsibility:</strong> Everything from the meter onwards —
                meter tails, main switch, consumer unit, circuits, and accessories. If the loose
                neutral is in the consumer unit neutral bar, a junction box, or an accessory, the
                electrician carries out the repair.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To determine which side the fault is on, measure the voltage between the incoming supply
          neutral (at the cut-out) and the main earth terminal. If the voltage is elevated here, the
          fault is on the supply side and is the DNO's responsibility. If the voltage at the cut-out
          is normal but becomes elevated at the consumer unit neutral bar, the fault is within the
          installation.
        </p>
        <p>
          If you suspect a supply-side neutral fault, contact the DNO's emergency number (found on
          the Energy Networks Association website or the National Grid Emergency line: 105). Advise
          the customer to avoid touching metalwork until the DNO attends, particularly if the
          property is on a TN-C-S earthing system.
        </p>
      </>
    ),
  },
  {
    id: 'how-to-diagnose',
    heading: 'How to Diagnose a Loose Neutral',
    content: (
      <>
        <p>
          Diagnosing a loose neutral requires systematic voltage measurements at multiple points in
          the installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Measure supply voltage at the consumer unit main switch.</strong> Record the
              voltage between L and N with no high-power loads running. It should be stable at
              approximately 230V.
            </li>
            <li>
              <strong>Apply a load.</strong> Have someone switch on a kettle or electric shower.
              Observe the voltage at the consumer unit. A drop of more than 10V suggests a
              high-resistance connection in the neutral path.
            </li>
            <li>
              <strong>Measure N-E voltage.</strong> Measure between the neutral bar and the MET at
              the consumer unit. This should be close to 0V on a healthy installation. A reading
              above 2 to 3V indicates a neutral fault.
            </li>
            <li>
              <strong>Check at the cut-out.</strong> Repeat the N-E voltage measurement at the
              supply cut-out. If the elevated voltage is present here, the fault is on the supply
              side (DNO responsibility).
            </li>
            <li>
              <strong>Locate the loose connection.</strong> If the fault is within the installation,
              work systematically through the neutral path — meter tails, main switch, neutral bar,
              individual circuit neutrals — measuring the voltage drop across each connection point
              to find the high-resistance joint.
            </li>
          </ol>
        </div>
        <p>
          A thermal imaging camera can also be invaluable for locating loose neutral connections
          within the consumer unit — the loose terminal will show as a hotspot under load.
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/calculators">testing calculators</SEOInternalLink> help you
          verify that measured values are within the acceptable ranges specified by BS 7671.
        </p>
        <SEOAppBridge
          title="Record test results by voice while diagnosing"
          description="Probes in hand? Speak your voltage readings and Elec-Mate enters them directly into the schedule of test results. No putting the probes down to type. Diagnose the loose neutral faster and document everything."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'fixing-the-fault',
    heading: 'Fixing a Loose Neutral Connection',
    content: (
      <>
        <p>
          Once the loose connection has been located, the repair is straightforward — but must be
          carried out safely:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation first.</strong> Carry out{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation
                </SEOInternalLink>{' '}
                before working on any terminal. On a TN-C-S system with a suspected open neutral, be
                especially careful — the neutral bar may be at an elevated voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean and re-terminate.</strong> Remove the conductor from the terminal,
                clean any oxidation from the copper, cut back to clean copper if the end is
                blackened, strip fresh insulation, and re-terminate with the correct torque.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace damaged components.</strong> If the terminal itself is damaged
                (burnt, deformed, or cracked), replace the accessory, junction box, or consumer unit
                neutral bar as appropriate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test after repair.</strong> Repeat the voltage measurements under load to
                confirm the voltage is now stable and the N-E voltage is close to 0V. Carry out
                insulation resistance testing to check for any damage caused by the overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issue certification.</strong> If the repair involves work at the consumer
                unit, issue a{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>
                . If a full inspection was carried out, issue the EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For supply-side faults, contact the DNO and advise the customer to avoid touching
          metalwork until the repair is completed. The DNO typically attends within 4 hours for a
          lost neutral on a PME system, as it is classified as an emergency.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LooseNeutralSymptomsPage() {
  return (
    <GuideTemplate
      title="Loose Neutral | Symptoms, Dangers & How to Fix"
      description="Expert guide to loose neutral symptoms: flickering lights, voltage fluctuations, tingling from metalwork, and the dangers of an open neutral on TN-C-S (PME) systems. How to diagnose, who is responsible, and how to fix it."
      datePublished="2025-09-12"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting Guide"
      badgeIcon={Activity}
      heroTitle={
        <>
          Loose Neutral:{' '}
          <span className="text-yellow-400">Symptoms, Dangers, and How to Fix It</span>
        </>
      }
      heroSubtitle="A loose neutral connection causes flickering lights, voltage fluctuations, and erratic appliance behaviour. On TN-C-S systems, it can create lethal voltages on exposed metalwork. This guide covers the symptoms, how to diagnose the fault, DNO vs electrician responsibility, and the repair process."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Loose Neutral Faults"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Electrical Faults with AI Assistance"
      ctaSubheading="Elec-Mate's AI fault diagnosis tool, voice test entry, and EICR certificate app help you diagnose loose neutrals, record test results, and produce professional reports — all from your phone. 7-day free trial."
    />
  );
}
