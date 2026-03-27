import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Eye,
  Flame,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Socket Sparking', href: '/guides/socket-sparking-when-plugging-in' },
];

const tocItems = [
  { id: 'overview', label: 'Why Does My Socket Spark?' },
  { id: 'normal-spark', label: 'The Normal Inductive Spark' },
  { id: 'dangerous-arcing', label: 'When Sparking Is Dangerous' },
  { id: 'worn-contacts', label: 'Worn Contacts and Loose Wiring' },
  { id: 'signs-of-damage', label: 'Visual Signs of Socket Damage' },
  { id: 'afdd-protection', label: 'AFDD Protection: Arc Fault Detection' },
  { id: 'when-to-replace', label: 'When to Replace a Socket' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A small, brief blue spark when you plug in an appliance is usually normal. It occurs because the appliance is already drawing current the instant the plug pin makes contact with the live socket terminal.',
  'Dangerous arcing is characterised by large, bright sparks, crackling sounds, sparks that continue after the plug is fully inserted, or sparks that occur when the plug is not being moved.',
  'Worn socket contacts, loose terminal screws, and damaged cables are the most common causes of abnormal sparking and are serious fire risks.',
  'AFDDs (Arc Fault Detection Devices) are designed to detect dangerous arcing and disconnect the circuit before a fire can start. BS 7671 Regulation 421.1 addresses AFDD requirements.',
  'BS 7671 Regulation 411.3.3 requires RCD protection on final socket-outlet circuits in domestic dwellings to reduce electric shock risk.',
  'If a socket is discoloured, warm, cracked, or emits a burning smell, stop using it immediately and have it inspected by a qualified electrician.',
];

const faqs = [
  {
    question: 'Is it normal for a socket to spark when I plug something in?',
    answer:
      'A small, brief spark is common and usually harmless. When you push a plug into a socket, the live pin makes contact with the socket terminal before the plug is fully seated. If the appliance has a load (for example, a lamp that is switched on, or a phone charger), current starts flowing the instant contact is made. This initial current flow creates a tiny arc across the small gap between the pin and the terminal. The spark is typically small, blue, and lasts for a fraction of a second. It is more noticeable in a dark room. This is normal electrical behaviour and does not indicate a fault.',
  },
  {
    question: 'What does a dangerous spark look like?',
    answer:
      'A dangerous spark is noticeably different from a normal one. Warning signs include: a large, bright white or yellow spark (rather than a small blue one), a spark that is accompanied by a loud crack or pop, sparking that continues after the plug is fully inserted, sparks visible at the edges of the socket faceplate, a burning smell, or black marks around the socket openings. Any of these signs indicate a fault that needs immediate investigation. Stop using the socket and have it checked by a qualified electrician.',
  },
  {
    question: 'Can a sparking socket cause a fire?',
    answer:
      'Yes. Arcing at a loose connection or worn contact generates extreme localised heat — temperatures can exceed 3,000 degrees Celsius at the arc point. This heat can melt the plastic socket faceplate, ignite the cable insulation, or set fire to the back box and surrounding wall material. Electrical arcing is one of the leading causes of domestic fires in the UK. This is precisely why AFDDs (Arc Fault Detection Devices) have been introduced — they are designed to detect the characteristic electrical signature of a dangerous arc and disconnect the circuit before the heat can cause ignition.',
  },
  {
    question: 'What is an AFDD and should I have one?',
    answer:
      'An AFDD (Arc Fault Detection Device) is a protective device that detects dangerous arcing on a circuit. Unlike an MCB (which detects overcurrent) or an RCD (which detects earth leakage), an AFDD analyses the electrical waveform on the circuit and can identify the high-frequency signature of a series arc (a loose connection) or a parallel arc (a short circuit through damaged insulation). When it detects a dangerous arc, it disconnects the circuit. AFDDs are recommended by BS 7671 for circuits in locations with sleeping accommodation, and for circuits where the risk of fire from arcing is elevated. They are installed in the consumer unit alongside the MCB or RCBO for the circuit.',
  },
  {
    question: 'Should I switch off the appliance before unplugging?',
    answer:
      'Yes, as good practice. Switching off the appliance at its own switch (or switching off the socket if it has a switch) before unplugging reduces the likelihood of a spark because no current is flowing at the moment of disconnection. This also reduces wear on the socket contacts over time. For high-power appliances like kettles and heaters, switching off at the socket before unplugging is particularly advisable because the higher current produces a larger spark at the contact point.',
  },
  {
    question: 'Can I replace a damaged socket myself?',
    answer:
      'Replacing a damaged socket outlet on a like-for-like basis (same type, same location, no new wiring) is not notifiable work under Part P of the Building Regulations and can be carried out by a competent person. However, if you are not confident working with electrical installations, or if the wiring behind the socket shows signs of damage (melted insulation, black marks, loose cables), you should engage a qualified electrician. The electrician will also check the circuit for broader issues — a damaged socket may be a symptom of a wider problem such as an overloaded circuit or a fault elsewhere.',
  },
  {
    question: 'How often should sockets be inspected?',
    answer:
      'For domestic properties, the recommended interval for an Electrical Installation Condition Report (EICR) is every 10 years for owner-occupied homes and every 5 years for rented properties (required by law for landlords under the Electrical Safety Standards in the Private Rented Sector Regulations 2020). Between inspections, you should visually check sockets for signs of damage — cracks, discolouration, warmth, loose faceplates, or a burning smell — and have any concerns investigated promptly. If you use extension leads or adaptors heavily, check these regularly as well, as they are common sources of overheating and sparking.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/afdd-arc-fault-detection',
    title: 'AFDD Guide',
    description: 'Complete guide to Arc Fault Detection Devices — how they work, when they are required, and installation guidance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Current regulations for consumer units including RCBO, AFDD, and dual RCD requirements.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding approach for electricians diagnosing socket and circuit faults.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/burning-smell-from-socket',
    title: 'Burning Smell From Socket',
    description: 'What to do if you smell burning from an electrical socket — causes and immediate actions.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR involves and when you need one for your home or rental property.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-fault-finding',
    title: 'Ring Circuit Fault Finding',
    description: 'How to diagnose faults on ring final circuits including broken rings and cross connections.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Does My Socket Spark When I Plug Something In?',
    content: (
      <>
        <p>
          You push a plug into a wall socket and see a quick flash of blue light inside. A tiny spark.
          It happens so fast you might wonder if you imagined it. Then it happens again with the next
          appliance, and now you are worried. Is your socket dangerous? Could it cause a fire?
        </p>
        <p>
          The answer depends entirely on what kind of spark you are seeing. A small, brief spark at
          the moment of connection is a normal electrical phenomenon that happens in every socket, every
          time. A large, persistent, or crackling spark is a warning sign of a fault that could be
          dangerous.
        </p>
        <p>
          This guide explains why sockets spark, how to tell the difference between normal and
          dangerous, what damage looks like, and when you need professional help. If you are an
          electrician, the later sections cover{' '}
          <SEOInternalLink href="/guides/afdd-arc-fault-detection">
            AFDD protection
          </SEOInternalLink>
          , the relevant BS 7671 regulations, and the diagnostic approach for socket faults.
        </p>
      </>
    ),
  },
  {
    id: 'normal-spark',
    heading: 'The Normal Inductive Spark: Why It Happens',
    content: (
      <>
        <p>
          To understand why a small spark is normal, you need to understand what happens electrically
          when a plug enters a socket. The UK three-pin plug is designed so that the earth pin (the
          longest pin at the top) enters the socket first and opens the shutters. Then the live and
          neutral pins make contact with the socket terminals.
        </p>
        <p>
          The key moment is when the live pin first touches the live terminal inside the socket. If the
          appliance is drawing current — because it is switched on, or because it has a standby load
          like a phone charger or TV — current begins to flow the instant contact is made. But at that
          instant, the pin and the terminal are not yet fully in contact. There is a tiny gap, and the
          current jumps across that gap as a small electrical arc.
        </p>
        <p>
          This arc is extremely brief (milliseconds), low energy, and completely harmless. It is the
          same principle that causes a spark when you flick a light switch — the contacts separate
          under load and a tiny arc forms momentarily. The spark is more visible in a dark room and
          more noticeable with higher-power appliances because the initial current is higher.
        </p>
        <p>
          A normal inductive spark has these characteristics: it is small and blue, it lasts for a
          fraction of a second, it only occurs at the moment of insertion (not after the plug is fully
          seated), there is no accompanying sound, smell, or heat, and the socket and plug show no
          signs of damage or discolouration.
        </p>
      </>
    ),
  },
  {
    id: 'dangerous-arcing',
    heading: 'When Sparking Becomes Dangerous Arcing',
    content: (
      <>
        <p>
          The line between a normal spark and dangerous arcing is clear once you know what to look for.
          Dangerous arcing is sustained, high-energy, and generates enough heat to damage components
          and start fires. Here is what distinguishes it:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Series arcing (loose connection)</strong> — when a terminal screw is loose, the
                cable can make and break contact as the plug is moved or as thermal expansion shifts the
                cable. Each break creates an arc. The arc generates extreme heat (over 3,000°C), which
                melts the terminal, loosens it further, and creates a progressively worse fault. This is
                the most common cause of electrical fires from socket faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Parallel arcing (damaged insulation)</strong> — if cable insulation is damaged
                (by a nail, a rodent, or deterioration), current can arc between the live and neutral
                conductors or between live and earth through the damaged section. This creates intense
                localised heating and can ignite surrounding materials. Parallel arcs can occur without
                any visible sign at the socket itself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tracking</strong> — over time, heat and moisture can create carbonised paths on
                the plastic backbox or faceplate of a socket. These carbon tracks become conductive and
                allow current to flow across the surface of the plastic, creating visible arcing and
                further carbonisation. This is progressive — it gets worse over time and will
                eventually cause failure.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The critical difference between a normal spark and dangerous arcing is energy and duration. A
          normal spark dissipates in milliseconds with negligible energy. Dangerous arcing can persist
          for seconds or longer, generating enough heat to melt metal and ignite plastic. If you hear
          crackling, see bright flashes, or notice any sign of heat damage, the socket needs immediate
          attention.
        </p>
      </>
    ),
  },
  {
    id: 'worn-contacts',
    heading: 'Worn Contacts and Loose Wiring',
    content: (
      <>
        <p>
          Socket outlets are mechanical devices with a limited lifespan. Every time you insert and
          remove a plug, the spring contacts inside the socket flex. Over thousands of cycles, these
          contacts lose their tension and no longer grip the plug pins as tightly. The looser the
          contact, the higher the resistance, and the more heat is generated when current flows.
        </p>
        <p>
          Common signs of worn socket contacts include: the plug feels loose or wobbly when inserted,
          you can see a gap between the plug and the socket faceplate, the plug falls out under its own
          weight or with slight movement, and you notice warmth on the plug pins after removing them
          from a loaded socket.
        </p>
        <p>
          Behind the faceplate, loose terminal screws are an equally serious concern. The cables
          connecting the socket to the circuit are secured by terminal screws (or in some modern
          sockets, spring-loaded terminals). If these are loose, the cable can shift and create an
          intermittent connection. Under load, this intermittent contact creates arcing — exactly the
          series arc fault described above.
        </p>
        <p>
          Section 421 of BS 7671 establishes fundamental protection objectives including
          preventing electric shock and limiting thermal effects by using appropriate protective
          devices. When socket contacts or connections deteriorate, these protection objectives are
          compromised. The installation is no longer compliant, and the risk of fire and shock
          increases significantly.
        </p>
        <SEOAppBridge
          title="Diagnose socket faults with AI"
          description="Elec-Mate's AI fault diagnosis tool guides you through systematic socket fault investigation with regulation references and observation codes. Complete the EICR on site."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'signs-of-damage',
    heading: 'Visual Signs of Socket Damage',
    content: (
      <>
        <p>
          You do not need to be an electrician to spot the visual warning signs of a damaged socket. A
          quick visual check can identify problems before they become dangerous. Look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Black marks or scorch marks</strong> around the pin openings — these indicate
                that arcing has occurred. The black marks are carbon deposits from the arc burning the
                plastic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Melted or deformed plastic</strong> — the faceplate or the area around the pin
                openings may appear warped, shiny, or discoloured from heat. This means the
                temperature has been high enough to soften the plastic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cracks in the faceplate</strong> — cracked plastic exposes the internal
                components and reduces the mechanical protection. A cracked socket should be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose faceplate</strong> — if the faceplate rocks or moves when you insert a
                plug, the fixing screws may be loose or the back box may be damaged. This can allow
                the socket to shift and put strain on the cable connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warm or hot to the touch</strong> — a socket that feels warm when an appliance
                is plugged in (particularly around the plug pins) indicates high resistance at the
                contacts or terminals. This is a fire risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you spot any of these signs, stop using the socket immediately. Do not attempt to force a
          plug in or tape over the damage. Unplug any appliances, and if the socket has a switch, turn
          it off. Then arrange for a qualified electrician to inspect and replace the socket.
        </p>
      </>
    ),
  },
  {
    id: 'afdd-protection',
    heading: 'AFDD Protection: Arc Fault Detection Devices',
    content: (
      <>
        <p>
          Arc Fault Detection Devices (AFDDs) represent one of the most significant advances in
          domestic electrical safety in recent years. While MCBs protect against overcurrent and RCDs
          protect against earth leakage, neither can detect a dangerous arc fault on a circuit where
          the current remains within normal limits.
        </p>
        <p>
          An AFDD monitors the electrical waveform on a circuit continuously. Series arcs (loose
          connections) and parallel arcs (damaged insulation) produce characteristic high-frequency
          disturbances on the waveform. The AFDD's electronic circuitry analyses these disturbances
          and, when it detects a pattern consistent with a dangerous arc, disconnects the circuit.
        </p>
        <p>
          BS 7671 Regulation 421.1 addresses AFDD requirements, noting that
          installations with AFDDs having a manual test facility should be tested six-monthly by
          pressing the test button. AFDDs are increasingly recommended for circuits in locations with
          sleeping accommodation and for circuits where the risk of fire from arcing is elevated —
          such as older properties with ageing wiring.
        </p>
        <p>
          AFDDs are installed in the consumer unit, typically as a combined AFDD/RCBO device that
          provides overcurrent protection, earth leakage protection, and arc fault detection in a
          single unit. For existing installations, AFDDs can be retrofitted during a{' '}
          <SEOInternalLink href="/guides/consumer-unit-upgrade">
            consumer unit upgrade
          </SEOInternalLink>
          . For new installations, they should be considered as standard protection on all socket and
          lighting circuits, particularly in bedrooms and living areas.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-replace',
    heading: 'When to Replace a Socket',
    content: (
      <>
        <p>
          Sockets do not last forever. Like any mechanical component that is used regularly, they wear
          out. Here is when replacement is necessary:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Any visible damage</strong> — cracks, scorch marks, melted plastic, or
                discolouration. Do not continue using a damaged socket.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose plug fit</strong> — if plugs no longer sit firmly in the socket, the
                internal contacts are worn. Loose contact means higher resistance, more heat, and
                increased fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warmth during use</strong> — a socket that gets warm when loaded indicates
                high-resistance connections. Replace the socket and check the wiring behind it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shutters not working</strong> — the shutters on a BS 1363 socket prevent
                children from inserting objects into the live terminal. If the shutters are stuck or
                missing, the socket must be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Persistent sparking</strong> — if the socket sparks visibly every time you
                plug something in, even when the appliance is switched off, the socket contacts or
                internal wiring is faulty.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When replacing a socket, choose a quality product from a reputable manufacturer. The cheapest
          sockets available often have thinner contacts that wear faster. A quality socket with robust
          spring contacts will last significantly longer, especially on heavily used outlets in kitchens
          and living rooms.
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
          While a like-for-like socket replacement can be done by a competent person, there are
          situations where you must call a qualified electrician:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell from the socket</strong> — this indicates active overheating.
                Isolate the circuit at the consumer unit immediately and do not use the socket until
                it has been inspected and repaired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring damage visible behind the faceplate</strong> — if you remove a socket
                faceplate and see melted insulation, blackened cables, or burnt terminal blocks, the
                damage may extend further into the circuit. An electrician needs to trace and repair
                the damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sparking from multiple sockets</strong> — if the problem is not isolated to
                one socket, the issue may be with the circuit itself, the consumer unit, or the supply.
                This needs professional diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The RCD or MCB trips when the socket is used</strong> — tripping indicates a
                fault on the circuit. An electrician needs to carry out insulation resistance testing
                and earth fault loop impedance measurement to locate the fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>You are not confident</strong> — if you have any doubt about your ability to
                safely isolate and work on the circuit, call a professional. Electrical work carries
                real risks and there is no shame in getting expert help.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When an electrician investigates a sparking socket, they will typically carry out insulation
          resistance testing (to check for damaged insulation), a tightness check on all connections,
          and visual inspection of the circuit. They may recommend an{' '}
          <SEOInternalLink href="/guides/eicr-certificate">
            EICR
          </SEOInternalLink>{' '}
          if the socket damage suggests wider installation issues. Regulation 411.3.3 of BS 7671
          requires RCD protection on final socket-outlet circuits in domestic dwellings — the
          electrician will verify this protection is in place.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Socket Fault Diagnosis',
    content: (
      <>
        <p>
          When investigating a customer report of socket sparking, apply a systematic diagnostic
          approach:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Visual Inspection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the circuit and remove the socket faceplate. Inspect the terminals, cables,
                  and back box for signs of overheating — discolouration, melted insulation, pitting
                  on terminal contacts, carbon deposits. Check cable condition and confirm correct
                  termination (no bare copper visible outside terminals, no nicked insulation).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Insulation Resistance Test</h4>
                <p className="text-white text-sm leading-relaxed">
                  Perform insulation resistance testing at 500V DC between live conductors and earth.
                  Acceptance criteria: minimum 1 megohm for final circuits. Low readings indicate
                  damaged insulation that could be the source of parallel arcing. Test L-E, N-E, and
                  L-N to identify the fault location.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Circuit Integrity Checks</h4>
                <p className="text-white text-sm leading-relaxed">
                  Verify the ring continuity (if applicable) using the{' '}
                  <SEOInternalLink href="/guides/ring-circuit-fault-finding">
                    ring circuit fault finding
                  </SEOInternalLink>{' '}
                  methodology. Check earth fault loop impedance (Zs) and verify it is within limits
                  for the protective device. Confirm RCD protection is present and operating correctly
                  per Regulation 411.3.3. Consider recommending AFDD installation if arcing has been
                  confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICR certificates on your phone"
          description="Document socket faults professionally with Elec-Mate's EICR certificate app. AI board scanning, observation codes with photos, and instant PDF export. Join 430+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SocketSparkingWhenPluggingInPage() {
  return (
    <GuideTemplate
      title="Socket Sparking When Plugging In | Safe or Dangerous?"
      description="Why does your socket spark when you plug something in? Learn the difference between a normal inductive spark and dangerous arcing, what worn contacts and loose wiring look like, AFDD protection, and when to call an electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Socket Sparking When Plugging In:{' '}
          <span className="text-yellow-400">Safe or Dangerous?</span>
        </>
      }
      heroSubtitle="A flash of light when you plug something in — is it normal? This guide explains the difference between a harmless inductive spark and dangerous arcing, covers worn contacts, loose wiring, AFDD protection, and when to call an electrician."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Socket Sparking"
      relatedPages={relatedPages}
      ctaHeading="Diagnose and Document Socket Faults on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, insulation resistance testing guidance, and professional EICR certificates. 7-day free trial, cancel anytime."
    />
  );
}
