import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Thermometer,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
  Brain,
  Activity,
  Timer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Intermittent Faults', href: '/guides/intermittent-electrical-faults' },
];

const tocItems = [
  { id: 'why-intermittent-faults-hard', label: 'Why Intermittent Faults Are Hard to Find' },
  { id: 'temperature-dependent', label: 'Temperature-Dependent Faults' },
  { id: 'vibration-faults', label: 'Vibration and Movement Faults' },
  { id: 'loose-connections-intermittent', label: 'Loose Connections' },
  { id: 'insulation-breakdown', label: 'Insulation Breakdown' },
  { id: 'systematic-approach', label: 'A Systematic Approach' },
  { id: 'tools-and-techniques', label: 'Tools and Techniques' },
  { id: 'documenting-faults', label: 'Documenting Intermittent Faults' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Intermittent electrical faults are the hardest to diagnose because they may not be present when the electrician arrives — requiring a systematic elimination approach rather than a single test.',
  'Temperature-dependent faults are caused by thermal expansion and contraction of conductors, which can open loose connections when the conductor heats under load and close them again when it cools.',
  'Insulation resistance can change dramatically with temperature and humidity — a cable that tests at 200 M-ohm in dry conditions may drop to 0.5 M-ohm on a damp morning, causing intermittent RCD tripping.',
  'The key to finding intermittent faults is to reproduce the conditions under which the fault occurs — time of day, ambient temperature, which appliances are running, and recent weather.',
  "Elec-Mate's AI fault diagnosis tool helps electricians narrow down probable causes from symptoms, plan a systematic test approach, and document findings on the EICR.",
];

const faqs = [
  {
    question: 'Why does my electrical fault only happen sometimes?',
    answer:
      'Intermittent electrical faults occur when the conditions that cause the fault are not always present. The most common reasons are temperature-dependent effects (a loose connection that opens when the conductor expands under load and closes again when it cools), humidity-dependent insulation breakdown (moisture causes insulation resistance to drop below the threshold that trips an RCD, and the insulation recovers when it dries out), vibration (a loose conductor in a terminal makes and breaks contact as the building or adjacent machinery vibrates), and load-dependent faults (a connection that works fine at low current but fails under high current due to increased I²R heating). The fault is real and present — it is just that the conditions needed to trigger it come and go. A systematic investigation that reproduces these conditions is needed to find and fix the fault.',
  },
  {
    question: 'How does an electrician find an intermittent fault?',
    answer:
      'Finding an intermittent fault requires patience, systematic testing, and an understanding of what conditions trigger the fault. The electrician will start by taking a detailed history from the customer — when does the fault occur, what appliances are running at the time, is it related to weather, time of day, or specific activities? Then the electrician will carry out standard tests (insulation resistance, continuity, earth fault loop impedance) to establish baseline readings. If the fault is not present during the visit, the electrician may need to apply stress conditions — for example, applying load to the circuit while monitoring voltage, or testing insulation resistance at elevated temperature. In some cases, data logging equipment can be left on site to monitor the circuit over several days and capture the fault when it occurs.',
  },
  {
    question: 'Can a loose connection cause an intermittent fault?',
    answer:
      'Yes, loose connections are one of the most common causes of intermittent faults. A conductor that is not properly tightened in a terminal may make good contact most of the time but lose contact under certain conditions. When the conductor heats up under load (due to the current flowing through it), it expands slightly. If the terminal is not tight enough, this expansion can push the conductor out of firm contact, causing the circuit to fail. When the current stops and the conductor cools, it contracts back into contact and the circuit appears to work normally. Vibration from nearby machinery, passing traffic, or even closing doors can also cause a loose conductor to intermittently lose contact. The fix is to identify and re-torque every terminal in the circuit, but the challenge is identifying which of the many connections in a circuit is the faulty one.',
  },
  {
    question: 'Why does my RCD only trip in wet weather?',
    answer:
      'This is a classic humidity-dependent insulation fault. When it rains or the humidity is high, moisture can penetrate the insulation of cables — particularly outdoor cables, cables in damp walls, underfloor heating cables, or old rubber-insulated wiring. The moisture reduces the insulation resistance, allowing a small leakage current to flow to earth. If this leakage current exceeds the RCD trip threshold (typically 30mA), the RCD trips. When the weather dries out, the insulation resistance recovers and the RCD stays on. The fix is to identify which circuit has the moisture-affected insulation (by testing insulation resistance on each circuit individually during wet conditions) and then either replace the affected cable, improve the waterproofing of the cable route, or replace accessories with higher IP-rated versions.',
  },
  {
    question: 'What is a high-resistance joint and how do you find it?',
    answer:
      'A high-resistance joint is a connection where the electrical resistance is significantly higher than it should be. This is usually caused by a loose terminal, corroded conductor, or a poor crimp. Under normal conditions, a joint should have negligible resistance (milliohms). A high-resistance joint can have resistance of several ohms, causing localised heating (P = I²R), voltage drop, and potentially intermittent circuit failure. To find a high-resistance joint, you can use several techniques: measure the voltage drop across each accessible connection point in the circuit while the circuit is under load (any measurable voltage drop indicates resistance); use a low-resistance ohmmeter to measure the resistance of individual connections; use a thermal imaging camera to identify hotspots at terminals and junction boxes; or carry out an R1+R2 continuity test and compare the measured value with the calculated expected value — a reading significantly higher than expected suggests a high-resistance joint somewhere in the circuit.',
  },
  {
    question: 'Should I leave the circuit turned off until the intermittent fault is found?',
    answer:
      'It depends on the nature of the fault. If the intermittent fault involves any of the following, the circuit should be left isolated until the fault is found and repaired: RCD tripping (the fault involves current leaking to earth, which is a shock risk), burning smell or scorch marks at any point in the circuit (fire risk), tingling sensation from appliances or metalwork on the circuit (earth fault with inadequate disconnection), or MCB tripping under normal load (overheating risk). If the intermittent fault is a loss of supply that does not involve any of the above safety concerns (for example, a light that occasionally does not work due to a loose connection in the switch), it is less urgent but should still be investigated promptly, as a loose connection can deteriorate over time and become a fire risk. In all cases, advise the customer of the risks and document your recommendation.',
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
    href: '/guides/loose-neutral-symptoms',
    title: 'Loose Neutral Symptoms',
    description:
      'Voltage fluctuations, flickering lights, and the dangers of an open neutral on TN-C-S systems.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Earth leakage causes, nuisance tripping, and systematic fault-finding for RCD circuits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-fault-finding',
    title: 'Ring Circuit Fault Finding',
    description:
      'Step-by-step guide to finding open rings, bridged rings, and interconnected ring faults.',
    icon: Search,
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
    id: 'why-intermittent-faults-hard',
    heading: 'Why Intermittent Faults Are the Hardest to Find',
    content: (
      <>
        <p>
          Every electrician knows the frustration: the customer describes a fault that happens
          regularly — lights flicker, an RCD trips, a socket stops working — but when you arrive on
          site, everything tests perfectly. The fault is real, but it is not present at the time of
          your visit.
        </p>
        <p>
          Intermittent electrical faults are difficult to find for a simple reason: standard
          electrical tests give you a snapshot of the installation at a single point in time. If the
          fault depends on conditions that are not present during the test — a specific temperature,
          humidity level, load pattern, or vibration — the test results will be normal even though
          the fault is genuine.
        </p>
        <p>
          The key to finding intermittent faults is understanding the conditions under which they
          occur and then either reproducing those conditions during testing or using monitoring
          equipment to capture the fault when it happens. This requires a combination of good
          customer communication (to understand the pattern), systematic testing (to eliminate
          possibilities), and sometimes specialised equipment such as data loggers or thermal
          imaging cameras.
        </p>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-fault-diagnosis">
            AI fault diagnosis tool
          </SEOInternalLink>{' '}
          is designed to help with exactly this problem. Describe the symptoms — when the fault
          occurs, what triggers it, what the customer has observed — and the AI suggests probable
          causes and a testing strategy to confirm them.
        </p>
      </>
    ),
  },
  {
    id: 'temperature-dependent',
    heading: 'Temperature-Dependent Faults',
    content: (
      <>
        <p>
          Temperature-dependent faults are caused by the physical effects of heating and cooling on
          conductors, insulation, and connections. They are among the most common types of
          intermittent fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal expansion at loose terminals:</strong> Copper expands when heated by
                current flow (coefficient of linear expansion: 16.5 x 10⁻⁶ per degree C). A
                conductor that is barely held by a loose terminal screw can push itself free as it
                expands, opening the circuit. When the current stops and the conductor cools, it
                contracts back into contact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cold-start failures:</strong> Some faults only appear when the installation
                is cold — for example, first thing in the morning. Insulation resistance of PVC
                cables is lower at low temperatures (below about 5 degrees C), and some protective
                devices may behave differently at low temperatures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underfloor heating cable faults:</strong> The insulation on underfloor
                heating cables can break down at operating temperature but test fine when cold.
                Testing insulation resistance at room temperature may not reveal the fault — the
                cable needs to be energised and brought up to operating temperature before testing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To diagnose temperature-dependent faults, carry out tests both with the circuit cold and
          after it has been under load for a sustained period. Compare the insulation resistance,
          continuity, and earth fault loop impedance readings between the cold and warm conditions.
          Any significant change points to a temperature-dependent fault.
        </p>
      </>
    ),
  },
  {
    id: 'vibration-faults',
    heading: 'Vibration and Movement Faults',
    content: (
      <>
        <p>
          Vibration faults occur when mechanical movement causes a conductor to intermittently lose
          contact at a terminal, or causes cable insulation to chafe against a sharp edge and
          intermittently short to earth.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nearby machinery:</strong> Washing machines, tumble dryers, and heat pumps
                generate vibration during operation. A loose terminal in a socket near the machine
                may lose contact only when the machine is running.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Traffic vibration:</strong> Properties near busy roads, railways, or
                construction sites experience regular vibration. Over time, this can loosen terminal
                connections and cause intermittent contact failures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable movement:</strong> Cables that are not properly clipped and are free
                to move (for example, in a loft space where someone walks near them) can chafe
                against joists, pipes, or other cables, wearing through the insulation over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Door and floorboard movement:</strong> Cables routed under floorboards or
                through door frames can be pinched when the floor flexes or the door closes,
                intermittently damaging the insulation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To diagnose vibration faults, try to reproduce the vibration while monitoring the circuit.
          Gently tap or flex the cable at various points while watching for a change in continuity,
          insulation resistance, or circuit operation. A "wiggle test" at each accessible connection
          point while the circuit is energised (with appropriate safety precautions) can reveal a
          loose terminal.
        </p>
      </>
    ),
  },
  {
    id: 'loose-connections-intermittent',
    heading: 'Loose Connections That Come and Go',
    content: (
      <>
        <p>
          As covered in the temperature and vibration sections above, loose connections are the root
          cause of many intermittent faults. The connection may work perfectly most of the time but
          fail under specific conditions — high load, high temperature, vibration, or a combination.
        </p>
        <p>
          The challenge is that a circuit may have dozens of connection points — at the consumer
          unit, at every junction box, at every socket, at every switch, and at every light fitting.
          Any one of these could be the faulty connection.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white text-base mb-3">Prioritise your search</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Start at the consumer unit.</strong> The most common location for loose
                connections is the consumer unit — particularly on older boards where terminals have
                not been torque-checked in years. Check every terminal with a torque screwdriver.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check junction boxes.</strong> Junction boxes in loft spaces and under
                floors are often overlooked. Open each one and check the terminal connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Focus on the affected area.</strong> If the customer says the fault affects
                only certain sockets or lights, concentrate on the connections serving that section
                of the circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Look for signs of overheating.</strong> Even if the connection has since
                cooled, there may be visible evidence — discoloured insulation, blackened copper, or
                a slightly melted terminal housing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            defect code AI
          </SEOInternalLink>{' '}
          helps classify any faults you find during investigation, ensuring your report accurately
          reflects the severity and location of each defect.
        </p>
      </>
    ),
  },
  {
    id: 'insulation-breakdown',
    heading: 'Insulation Breakdown: Humidity and Age',
    content: (
      <>
        <p>
          Cable insulation degrades over time due to heat, UV exposure, chemical exposure, and
          moisture absorption. This degradation can cause insulation resistance to drop below
          acceptable levels — but often only under certain environmental conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Humidity-dependent insulation failure:</strong> Old rubber-insulated cables
                (pre-1970s) and some early PVC cables absorb moisture from the environment. On damp
                days, the insulation resistance drops, potentially causing{' '}
                <SEOInternalLink href="/guides/rcd-keeps-tripping">RCD tripping</SEOInternalLink>.
                On dry days, the resistance recovers and the circuit works normally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat-damaged insulation:</strong> Cables routed near hot pipes, boilers, or
                in sun-exposed loft spaces can suffer heat damage that weakens the insulation. The
                insulation may hold up at room temperature but break down when the cable heats under
                load or when ambient temperatures rise in summer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rodent damage:</strong> Mice and rats chew through cable insulation,
                creating intermittent faults that depend on the position of the chewed cable — if
                the exposed copper contacts the wall or another cable, a fault occurs; if the cable
                flexes slightly, the contact is broken and the fault disappears.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To detect humidity-dependent insulation faults, test insulation resistance during the
          conditions that trigger the fault. If the customer reports that the RCD trips every
          morning but works fine in the afternoon, visit early morning when the humidity is highest.
          Compare circuit-by-circuit insulation resistance readings taken during the fault condition
          with readings taken later when the fault is absent. The circuit with the biggest change is
          your culprit.
        </p>
        <SEOAppBridge
          title="Test and document insulation resistance results"
          description="Record insulation resistance readings by voice while your hands stay on the probes. Elec-Mate flags any reading below the BS 7671 minimum and auto-fills the schedule of test results on your EICR. No paperwork, no re-typing."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'systematic-approach',
    heading: 'A Systematic Approach to Intermittent Faults',
    content: (
      <>
        <p>
          The key to successfully diagnosing intermittent faults is to work systematically rather
          than randomly testing and hoping to stumble on the answer:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Take a detailed history.</strong> When does the fault occur? What time of day?
              What appliances are running? Is it weather-related? How long has it been happening?
              Has anything changed recently (new appliance, building work, storm)?
            </li>
            <li>
              <strong>Carry out baseline testing.</strong> Test every circuit: insulation
              resistance, continuity (R1+R2), earth fault loop impedance, and RCD operation. Record
              all readings. These provide the baseline to compare against.
            </li>
            <li>
              <strong>Identify the affected circuit.</strong> If the fault involves an MCB or RCD
              tripping, you know which circuit or group of circuits is involved. If the fault is
              more general (flickering lights, voltage fluctuations), you may need to investigate
              the supply and main connections first.
            </li>
            <li>
              <strong>Apply stress conditions.</strong> Try to reproduce the fault: apply load to
              the circuit, increase temperature, introduce vibration, or wait for the environmental
              conditions that trigger the fault. Monitor with a voltmeter, clamp meter, or data
              logger.
            </li>
            <li>
              <strong>Divide and conquer.</strong> If the fault is on a specific circuit, disconnect
              sections of the circuit and test each section independently. On a{' '}
              <SEOInternalLink href="/guides/ring-circuit-fault-finding">
                ring circuit
              </SEOInternalLink>
              , for example, you can open the ring at the consumer unit and test each leg
              separately.
            </li>
            <li>
              <strong>Document everything.</strong> Record all test results, observations, and
              actions taken. Even if you do not find the fault on the first visit, the data from
              your investigation narrows the search for the next visit.
            </li>
          </ol>
        </div>
        <SEOAppBridge
          title="AI-assisted fault diagnosis"
          description="Describe the intermittent fault symptoms to Elec-Mate's AI — when it happens, what triggers it, what you've tested — and get a prioritised list of probable causes with recommended test procedures. Stop guessing, start diagnosing."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'tools-and-techniques',
    heading: 'Tools and Techniques for Intermittent Faults',
    content: (
      <>
        <p>
          Beyond standard test instruments, several specialised tools can help locate intermittent
          faults:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal imaging camera:</strong> Identifies hotspots at connections, cables,
                and accessories while the circuit is under load. A loose terminal that appears
                normal at room temperature will show as a bright hotspot on a thermal image when
                current is flowing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data logger:</strong> A voltage or current data logger can be left on site
                to monitor the circuit continuously over several days. When the fault occurs, the
                logger records the event — time, duration, and magnitude — giving you the data you
                need to identify the cause on your next visit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation tester with timed test:</strong> A timed insulation resistance
                test (measuring at 1 minute rather than the standard few seconds) can reveal
                insulation that is on the verge of failure — the resistance starts at an acceptable
                level but drops over the 1-minute period as the test voltage stresses the weakened
                insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low-resistance ohmmeter (micro-ohmmeter):</strong> Measures the resistance
                of individual connections in milliohms. A healthy terminal connection should have
                negligible resistance. A reading of 100 milliohms or more at a terminal indicates a
                high-resistance joint that will cause problems under load.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/calculators">testing calculators</SEOInternalLink> help you
          compare measured values against expected values for each circuit type, making it easier to
          spot abnormal readings that point to a developing fault.
        </p>
      </>
    ),
  },
  {
    id: 'documenting-faults',
    heading: 'Documenting Intermittent Faults on the EICR',
    content: (
      <>
        <p>
          Intermittent faults present a documentation challenge: if the fault is not present at the
          time of the inspection, how do you record it on the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>?
        </p>
        <p>
          The answer is to use the FI (Further Investigation) code. If a customer reports symptoms
          consistent with an intermittent fault but you cannot reproduce or confirm the fault during
          your visit, record an FI observation with a clear description of the reported symptoms and
          your recommendation for further investigation. This might include data logging, a return
          visit during the conditions that trigger the fault, or thermal imaging under load.
        </p>
        <p>
          If you do find evidence of the fault — for example, a loose terminal with signs of
          overheating, or insulation resistance readings that are borderline — classify it
          appropriately:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 (Danger Present):</strong> If the fault poses an immediate risk — for
                example, a burnt-out terminal with exposed live parts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 (Potentially Dangerous):</strong> If the fault is not immediately
                dangerous but could become so — for example, a loose terminal with signs of
                overheating that has not yet caused damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI (Further Investigation):</strong> If you cannot confirm the fault but the
                customer report is credible and consistent with a genuine electrical fault.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            defect code AI
          </SEOInternalLink>{' '}
          helps you select the correct observation code and generate a clear, professional
          description for each finding — even for complex intermittent faults where the
          classification is not immediately obvious.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IntermittentElectricalFaultsPage() {
  return (
    <GuideTemplate
      title="Intermittent Electrical Faults | How to Find Them"
      description="Expert guide to diagnosing intermittent electrical faults. Covers temperature-dependent faults, vibration, loose connections, insulation breakdown, and a systematic approach to fault-finding when the fault is not present during your visit."
      datePublished="2025-09-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Intermittent Electrical Faults:{' '}
          <span className="text-yellow-400">How to Find the Faults That Come and Go</span>
        </>
      }
      heroSubtitle="Intermittent faults are the hardest to diagnose because they may not be present when you arrive. This guide covers temperature-dependent faults, vibration, loose connections, insulation breakdown, and a systematic approach to finding faults that only appear under specific conditions."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Intermittent Electrical Faults"
      relatedPages={relatedPages}
      ctaHeading="AI Fault Diagnosis for Tricky Faults"
      ctaSubheading="Elec-Mate's AI fault diagnosis tool helps you narrow down intermittent fault causes from symptoms, plan a systematic test approach, and document findings on the EICR. 7-day free trial, cancel anytime."
    />
  );
}
