import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Flame,
  ShieldCheck,
  Search,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  Power,
  Thermometer,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Burning Smell', href: '/guides/burning-smell-from-socket' },
];

const tocItems = [
  { id: 'what-causes-burning-smell', label: 'What Causes a Burning Smell' },
  { id: 'loose-connections', label: 'Loose Connections' },
  { id: 'overloaded-circuit', label: 'Overloaded Circuit' },
  { id: 'arcing-faults', label: 'Arcing Faults' },
  { id: 'when-to-isolate', label: 'When to Isolate' },
  { id: 'when-to-call-electrician', label: 'When to Call an Emergency Electrician' },
  { id: 'investigation-process', label: 'How an Electrician Investigates' },
  { id: 'prevention', label: 'Preventing Burning Smells' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A burning smell from a socket is always a sign of a serious electrical fault — never ignore it, as it can lead to an electrical fire within minutes.',
  'The three most common causes are loose connections, overloaded circuits, and arcing faults — all of which generate dangerous heat at the socket or within the wiring.',
  'If you smell burning, isolate the circuit immediately at the consumer unit and do not use the socket until a qualified electrician has inspected and repaired the fault.',
  'Arcing faults can occur behind the socket faceplate where you cannot see them, meaning the damage may be far worse than it appears from the front.',
  "Elec-Mate's AI fault diagnosis tool helps electricians identify the root cause quickly and generate the correct observation codes for the EICR report.",
];

const faqs = [
  {
    question: 'Is a burning smell from a socket an emergency?',
    answer:
      'Yes. A burning smell from a socket indicates that something is overheating — typically a loose connection, an overloaded circuit, or an arcing fault. Any of these can cause an electrical fire. You should immediately stop using the socket, unplug any appliances connected to it, and isolate the circuit at the consumer unit (turn off the MCB or remove the fuse for that circuit). Do not turn the socket back on until a qualified electrician has inspected it. If you see smoke, scorching, or flames, call 999 immediately and evacuate the property.',
  },
  {
    question: 'What does electrical burning smell like?',
    answer:
      'An electrical burning smell is often described as a sharp, acrid smell — similar to burning plastic or melting rubber. It is distinctly different from food burning or a candle. The smell comes from the PVC insulation on the cables or the plastic of the socket faceplate being damaged by excessive heat. If the overheating has been going on for some time, you may also notice a warm or hot socket faceplate, discolouration (yellowing or browning) around the socket, or scorch marks on the wall. In severe cases, the plastic may visibly melt or deform.',
  },
  {
    question: 'Can a loose connection cause a fire?',
    answer:
      'Absolutely. A loose terminal connection is one of the most common causes of electrical fires in the UK. When a conductor is not properly tightened in the terminal, the contact area is reduced. This increases the resistance at that point, which generates heat (P = I squared R). The more current flowing through the circuit, the more heat is generated at the loose joint. Over time, the heat damages the insulation, oxidises the copper conductor (further increasing resistance), and can eventually ignite the surrounding materials. This is why regular periodic inspection and testing — including torque-checking terminal connections — is so important.',
  },
  {
    question: 'Should I turn off the main switch if I smell burning?',
    answer:
      'If you can identify which circuit the burning smell is coming from, isolate just that circuit at the consumer unit by turning off the relevant MCB. This is preferable because it leaves other circuits (lighting, fridge, freezer) operational. If you cannot identify the specific circuit, or if the smell is coming from the consumer unit itself, turn off the main switch to isolate the entire installation. If you see visible damage, smoke, or flames at the consumer unit, do not touch it — call 999 and evacuate. After isolating, call an electrician. Do not attempt to investigate behind the socket faceplate yourself unless you are a qualified electrician.',
  },
  {
    question: 'How does an electrician find the cause of a burning smell?',
    answer:
      'A qualified electrician will carry out a systematic investigation. First, they will perform a visual inspection — removing the socket faceplate to check for signs of overheating, scorching, damaged insulation, or loose terminals. They will check the terminal connections with a torque screwdriver. They will inspect the cable entering the back of the socket for damage. They will then carry out dead testing — insulation resistance testing between live, neutral, and earth to check for insulation breakdown. They may also carry out a continuity test on the circuit to check for high-resistance joints. If the fault is intermittent or hard to locate, an infrared thermal imaging camera can identify hotspots in the wiring behind the wall without needing to remove plaster.',
  },
  {
    question: 'Can plug-in adaptors cause a burning smell?',
    answer:
      'Yes. Multi-socket adaptors, particularly the cube-type adaptors that plug directly into the socket, are a common cause of overheating. They allow you to draw more current through a single socket outlet than it was designed for. The BS 1363 socket is rated at 13A, but if you plug in multiple high-current appliances through an adaptor, the total load can exceed this rating. The adaptor itself can also have poor internal connections that generate heat. Extension leads with an integral fuse and overload protection are safer than adaptors, but even these should not be daisy-chained. If you need more socket outlets, the correct solution is to have additional sockets installed by a qualified electrician.',
  },
  {
    question: 'How much does it cost to repair a burnt socket?',
    answer:
      'The cost depends on the extent of the damage. Replacing a single damaged socket outlet and re-terminating the cables typically costs between £60 and £120 including parts and labour. If the cable behind the socket has been damaged by heat, the cable may need to be replaced, which involves chasing into the wall and making good — this could cost £150 to £300 depending on the cable run length and surface type. If the damage has spread to multiple sockets on the same circuit (for example, on a ring circuit where a loose connection has been overheating for months), a more extensive repair or partial rewire may be needed. An electrician using Elec-Mate can generate a priced remedial quote on site.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/overloaded-circuit-signs',
    title: 'Overloaded Circuit Signs',
    description:
      'How to recognise an overloaded circuit, maximum demand calculation, and when to add new circuits.',
    icon: Zap,
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
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Common causes of RCD tripping including earth leakage, moisture ingress, and insulation breakdown.',
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
    id: 'what-causes-burning-smell',
    heading: 'What Causes a Burning Smell from a Socket?',
    content: (
      <>
        <p>
          A burning smell from a socket outlet is one of the most serious warning signs in domestic
          electrical installations. It means something is generating excessive heat — enough to
          damage the PVC insulation on the cables or the thermoplastic faceplate of the socket
          itself. Left unchecked, this can progress to an electrical fire.
        </p>
        <p>
          The three most common causes are <strong>loose terminal connections</strong>,{' '}
          <strong>overloaded circuits</strong>, and <strong>arcing faults</strong>. Each produces
          heat through a different mechanism, but the result is the same: dangerously high
          temperatures at a point in the circuit that was never designed to get hot.
        </p>
        <p>
          According to Electrical Safety First, faulty electrics are the cause of nearly half of all
          accidental house fires in the UK. A burning smell is often the first detectable warning
          before visible damage appears. Taking immediate action when you notice the smell can
          prevent a fire.
        </p>
        <p>
          This guide covers the causes, the immediate actions you should take, when to call an
          emergency electrician, and how electricians investigate and fix these faults. If you are
          an electrician, Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-fault-diagnosis">
            AI fault diagnosis tool
          </SEOInternalLink>{' '}
          can help you rapidly identify the root cause and generate the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation codes
          </SEOInternalLink>{' '}
          for the report.
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
          A loose terminal connection at a socket outlet is the single most common cause of
          overheating and burning smells. The physics is straightforward: when a conductor is not
          properly tightened in the terminal, the contact area between the conductor and the
          terminal is reduced. A smaller contact area means higher resistance at that point. Higher
          resistance means more heat (P = I²R). The more current flowing through the circuit, the
          hotter the joint gets.
        </p>
        <p>
          Over time, the heat oxidises the copper conductor surface, which further increases the
          resistance and generates even more heat. This creates a positive feedback loop — the joint
          gets progressively hotter until the insulation begins to melt, giving off the
          characteristic burning plastic smell.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual signs:</strong> Discoloured or melted socket faceplate, browning or
                scorching around terminal screws, blackened conductor ends visible when the
                faceplate is removed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common locations:</strong> Ring circuit spurs (where only one cable enters
                the socket), sockets behind furniture where plugs are frequently inserted and
                removed, and older installations where terminals have not been torque-checked in
                decades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 requirement:</strong> Regulation 526.1 requires connections to be
                durable, have adequate mechanical strength, and provide reliable electrical
                continuity.{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                specifies torque values for terminal connections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          During periodic inspection, electricians should torque-check every accessible terminal
          connection. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/calculators">testing calculators</SEOInternalLink> help you
          verify that measured values are within acceptable limits for each circuit type.
        </p>
      </>
    ),
  },
  {
    id: 'overloaded-circuit',
    heading: 'Overloaded Circuit: Too Much Current',
    content: (
      <>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/overloaded-circuit-signs">
            overloaded circuit
          </SEOInternalLink>{' '}
          occurs when the current drawn by the connected appliances exceeds the rating of the cable
          or the socket outlet. A standard BS 1363 socket is rated at 13A (3kW at 230V). A ring
          circuit is typically protected by a 32A MCB, but each individual spur socket is still
          limited to 13A.
        </p>
        <p>Common overload scenarios that cause burning smells include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple high-power appliances on one socket:</strong> A fan heater (2kW), a
                kettle (3kW), and a toaster (1.5kW) plugged into a multi-socket adaptor draws 6.5kW
                — far exceeding the 13A socket rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized cable on a spur:</strong> A spur taken from a ring circuit using
                2.5mm² cable is protected by the 32A MCB, but the cable is only rated for 20A
                (Reference Method C). If the load exceeds 20A, the cable overheats before the MCB
                trips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daisy-chained extension leads:</strong> Connecting one extension lead to
                another creates long cable runs with multiple connection points, each adding
                resistance and heat.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The MCB should trip before the cable reaches a dangerous temperature, but this protection
          depends on correct cable sizing, correct MCB rating, and the MCB itself functioning
          properly. If any of these conditions are not met, the cable or socket can overheat without
          the MCB tripping.
        </p>
      </>
    ),
  },
  {
    id: 'arcing-faults',
    heading: 'Arcing Faults: Invisible and Dangerous',
    content: (
      <>
        <p>
          An arcing fault occurs when current jumps across a gap between two conductors or between a
          conductor and a terminal. The arc generates intense localised heat — potentially thousands
          of degrees Celsius — which can ignite surrounding materials. Arcing faults are
          particularly dangerous because they can occur behind the socket faceplate, inside junction
          boxes, or within the wall cavity where they cannot be seen.
        </p>
        <p>Common causes of arcing at sockets include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged conductor insulation:</strong> Where a cable has been nicked by a
                nail, screw, or cable clip, the exposed copper can arc to earth or to an adjacent
                conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose terminal with intermittent contact:</strong> A conductor that is
                barely touching the terminal can create a series arc — current flows intermittently,
                generating sparks each time contact is made and broken.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged socket contacts:</strong> Worn or bent pin contacts inside the
                socket allow the plug to make poor contact, creating arcing at the plug-socket
                interface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moisture ingress:</strong> Water tracking across the surface of a terminal
                block or the back of a socket creates a conductive path that can sustain an arc.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Arc faults are notoriously difficult to detect with standard testing. A standard RCD will
          not detect a series arc fault (since the current is not leaking to earth). Arc Fault
          Detection Devices (AFDDs), covered by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 Regulation 421.1.7
          </SEOInternalLink>
          , are designed to detect the high-frequency signature of an arcing fault and disconnect
          the circuit — but they are not yet mandatory in all domestic installations.
        </p>
        <SEOAppBridge
          title="AI fault diagnosis for arcing and overheating"
          description="Describe the symptoms — burning smell, discolouration, intermittent tripping — and Elec-Mate's AI fault diagnosis tool identifies probable causes, suggests test procedures, and generates the correct observation code for your EICR."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'when-to-isolate',
    heading: 'When to Isolate: Immediate Actions',
    content: (
      <>
        <p>If you detect a burning smell from a socket, follow these steps immediately:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Do not touch the socket</strong> if it is visibly damaged, smoking, or hot to
              the touch. There may be exposed live parts behind a melted faceplate.
            </li>
            <li>
              <strong>Unplug any appliances</strong> connected to the socket by pulling the plug,
              not the cable. If the plug feels hot, use a dry cloth or insulated gloves.
            </li>
            <li>
              <strong>Isolate the circuit</strong> at the consumer unit. Turn off the MCB for the
              affected circuit. If you are unsure which MCB controls the socket, turn off the main
              switch.
            </li>
            <li>
              <strong>Do not turn the socket back on.</strong> Even if the smell goes away after
              isolation, the fault is still present and will recur when power is restored.
            </li>
            <li>
              <strong>Call a qualified electrician.</strong> A burning socket is a C1 (Danger
              Present) or C2 (Potentially Dangerous) defect under{' '}
              <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                EICR observation codes
              </SEOInternalLink>
              .
            </li>
          </ol>
        </div>
        <p>
          If there is visible flame or heavy smoke, do not attempt to isolate — call 999, evacuate
          everyone from the property, and close doors behind you to contain the fire.
        </p>
        <p>
          Never attempt to investigate behind a socket faceplate yourself unless you are a qualified
          electrician who has carried out{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safe isolation</SEOInternalLink>{' '}
          and confirmed the circuit is dead using a proving unit and voltage indicator.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-call-electrician',
    heading: 'When to Call an Emergency Electrician',
    content: (
      <>
        <p>
          Any burning smell from an electrical socket warrants calling an electrician. However,
          certain situations are emergencies that require immediate attendance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visible smoke or sparks</strong> coming from the socket or the surrounding
                wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The socket faceplate is melted, deformed, or discoloured</strong> —
                indicating sustained high temperatures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The wall around the socket is hot to the touch</strong> — suggesting the
                fault is within the cable in the wall, not just at the terminal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The burning smell persists after isolation</strong> — this could indicate
                that the fault is on the supply side of the MCB, or that the consumer unit itself is
                the source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>You cannot identify or isolate the affected circuit</strong> — particularly
                in older installations without circuit labelling.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When calling an electrician, describe exactly what you noticed — the location, the smell,
          any visible damage, whether the socket was under load, and what you have done to isolate
          it. This helps the electrician assess urgency and bring the right equipment.
        </p>
      </>
    ),
  },
  {
    id: 'investigation-process',
    heading: 'How an Electrician Investigates a Burning Socket',
    content: (
      <>
        <p>
          When an electrician attends a burning socket fault, they will follow a systematic
          investigation process:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Confirm safe isolation.</strong> Verify the circuit is dead using a voltage
              indicator and proving unit following{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                GS38 safe isolation procedure
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Visual inspection.</strong> Remove the socket faceplate and inspect terminals,
              conductor insulation, and the back box for signs of overheating, scorching, or arcing.
            </li>
            <li>
              <strong>Terminal check.</strong> Check all terminal connections with a torque
              screwdriver. Loose terminals are often visible as blackened or oxidised conductor
              ends.
            </li>
            <li>
              <strong>Insulation resistance test.</strong> Test between L-E, N-E, and L-N to check
              for insulation breakdown. A reading below 1 M-ohm indicates damaged insulation.
            </li>
            <li>
              <strong>Continuity test.</strong> Check the R1+R2 values for the circuit. An unusually
              high reading may indicate a high-resistance joint elsewhere in the circuit.
            </li>
            <li>
              <strong>Thermal imaging (if available).</strong> An infrared camera can identify
              hotspots in the wiring behind the wall without removing plaster, helping locate damage
              that is not visible at the socket.
            </li>
          </ol>
        </div>
        <p>
          The electrician will then carry out the necessary repair — replacing the damaged socket,
          re-terminating cables, replacing damaged cable sections, or in severe cases, rewiring the
          affected circuit. An{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          or Minor Works Certificate should be issued for the repair work.
        </p>
        <SEOAppBridge
          title="Generate remedial quotes on site"
          description="Found a burnt socket? Elec-Mate's remedial works estimator prices the fix — socket replacement, cable repair, circuit rewire — and generates a professional quote before you leave. No desk time, no second visit."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'prevention',
    heading: 'Preventing Burning Smells from Sockets',
    content: (
      <>
        <p>
          Prevention is better than cure. The following measures significantly reduce the risk of
          overheating at sockets:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular periodic inspection.</strong> A 5-yearly{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink> includes
                checking terminal connections, insulation resistance, and the general condition of
                socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid overloading sockets.</strong> Do not use multi-socket adaptors for
                high-power appliances. If you need more sockets, have additional circuits installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check socket faceplates.</strong> Any socket that feels warm to the touch,
                shows discolouration, or has a cracked faceplate should be inspected by an
                electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consider AFDDs.</strong> Arc Fault Detection Devices provide protection
                against series and parallel arc faults that RCDs and MCBs cannot detect. They are
                recommended by BS 7671 for certain installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace damaged sockets immediately.</strong> A cracked, loose, or wobbling
                socket should be replaced before it causes a more serious fault. Do not tape over
                damage — have it replaced properly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, recommending AFDDs and regular thermal imaging surveys to clients is an
          opportunity to add value. Elec-Mate's{' '}
          <SEOInternalLink href="/training/18th-edition">
            18th Edition training courses
          </SEOInternalLink>{' '}
          cover the latest requirements for arc fault protection and socket circuit design.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BurningSmellFromSocketPage() {
  return (
    <GuideTemplate
      title="Burning Smell from Socket | Causes & What to Do"
      description="Burning smell from an electrical socket? Expert guide covering loose connections, overloaded circuits, arcing faults, when to isolate, and when to call an emergency electrician. Immediate safety actions and prevention tips."
      datePublished="2025-08-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Burning Smell from a Socket:{' '}
          <span className="text-yellow-400">Causes, Dangers, and What to Do</span>
        </>
      }
      heroSubtitle="A burning smell from a socket is a serious warning sign. It can indicate loose connections, circuit overload, or arcing — all of which can cause an electrical fire. This guide explains the causes, immediate safety actions, and how an electrician investigates and fixes the fault."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Burning Smells from Sockets"
      relatedPages={relatedPages}
      ctaHeading="Diagnose Electrical Faults Faster with AI"
      ctaSubheading="Elec-Mate's AI fault diagnosis tool, EICR certificate app, and testing calculators help electricians investigate faults, generate reports, and price remedial work — all from their phone. 7-day free trial."
    />
  );
}
