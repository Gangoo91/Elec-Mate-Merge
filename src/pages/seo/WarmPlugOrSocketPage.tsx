import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Flame,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  Thermometer,
  Eye,
  ClipboardCheck,
  Phone,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Warm Plug or Socket', href: '/guides/warm-plug-or-socket' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My Plug or Socket Warm?' },
  { id: 'what-to-do-now', label: 'What to Do Right Now' },
  { id: 'causes', label: 'Causes of Warm Plugs and Sockets' },
  { id: 'loose-connections', label: 'Loose Connections: The Fire Risk' },
  { id: 'overloaded-sockets', label: 'Overloaded Sockets' },
  { id: 'fire-risk', label: 'Fire Risk and Protection' },
  { id: 'thermal-imaging', label: 'Thermal Imaging for Electricians' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A warm plug or socket is a warning sign that should never be ignored. It indicates that electrical energy is being converted to heat at a connection point — and heat at electrical connections causes fires.',
  'The most common causes are loose connections (either inside the socket or at the plug terminals), overloaded sockets (too much current through extension leads or adaptors), and poor contact between the plug pins and socket terminals.',
  'If a socket is hot (not just warm), discoloured, or producing a burning smell, it is an emergency. Unplug appliances, isolate the circuit at the consumer unit, and call an electrician immediately.',
  'BS 7671 Section 421 (Protection against fire caused by electrical equipment) requires that electrical equipment and wiring do not present a fire hazard. Regulation 424.1 addresses fire protection measures where preferred methods are impracticable.',
  'Overloaded ring final circuits are a common cause — multiple high-power appliances on one circuit through extension leads and adaptors exceed the circuit design capacity.',
  'Thermal imaging is the most effective method for identifying hot connections without dismantling the installation. Electricians can use thermal cameras during EICR inspections to detect developing faults.',
];

const faqs = [
  {
    question: 'Is it normal for a plug to be slightly warm?',
    answer:
      'A very slight warmth on a plug that is powering a high-current appliance (such as a fan heater drawing 13A) can be within normal limits. All electrical connections have some resistance, and current flowing through that resistance generates a small amount of heat (P = I squared x R). However, the plug should never be hot enough to be uncomfortable to hold. If you can hold the plug comfortably in your hand and it is only slightly above room temperature, it is likely within normal parameters. If it is too hot to hold, or noticeably warm when the appliance draws only a small current (such as a lamp or phone charger), there is a fault that needs investigation.',
  },
  {
    question: 'What should I do if my socket is hot?',
    answer:
      'If the socket is hot — not just warm, but genuinely hot to the touch — treat it as an emergency. First, unplug all appliances from the socket. Do not touch the pins of the plug immediately after removing it, as they may be extremely hot. Turn off the socket switch if it has one. Go to the consumer unit and turn off the circuit breaker for that circuit. Do not use the socket until it has been inspected by a qualified electrician. If there is a burning smell or visible damage (scorch marks, melted plastic), call an electrician as an emergency. If you see flames or smoke, call 999.',
  },
  {
    question: 'Can a warm socket start a fire?',
    answer:
      'Yes. A warm socket indicates that heat is being generated at the connection point. If the cause is a loose connection, the heat will increase over time as the connection deteriorates further. The temperatures at a loose electrical connection can exceed 3,000°C at the arc point — far above the ignition temperature of the plastic socket faceplate (typically 250-400°C) and cable insulation (approximately 160°C for PVC). Electrical faults are one of the leading causes of house fires in the UK, with loose connections and overloaded sockets being among the most common specific causes. This is why a warm socket should always be taken seriously and investigated promptly.',
  },
  {
    question: 'Can using an extension lead cause sockets to overheat?',
    answer:
      'Yes, and this is one of the most common causes of socket overheating. A standard UK socket outlet is rated at 13A (3kW at 230V). When you plug a four-way extension lead into a single socket and then plug multiple appliances into the extension lead, the total current flows through the single socket. If the combined load of all the appliances on the extension lead exceeds 13A, the socket is overloaded. Even below 13A, a fully loaded extension lead puts more stress on the socket contacts, and the additional connections (plug to socket, extension lead socket to plug) each add a small amount of resistance and heat. Using extension leads on a permanent basis is not recommended — if you need more sockets, have additional sockets installed by an electrician.',
  },
  {
    question: 'Should I replace a socket that has been warm?',
    answer:
      'If a socket has been running warm, it should be inspected by an electrician. The socket itself may need replacement if the contacts are worn or the terminal connections show signs of overheating (discolouration, pitting). However, simply replacing the socket may not fix the problem if the root cause is the wiring behind it (for example, a loose connection in a junction box upstream) or an overloaded circuit. The electrician should check the socket, the wiring connections, and the circuit load to identify the actual cause and carry out the appropriate repair.',
  },
  {
    question: 'What temperature is too hot for a plug or socket?',
    answer:
      'There is no single threshold, but as a general guide: a plug or socket at room temperature to about 40°C is within normal limits for a heavily loaded circuit. Between 40°C and 60°C indicates a potential problem that should be investigated. Above 60°C is abnormal and requires immediate attention — at this temperature, the plug is uncomfortably warm to hold. Above 80°C, there is a significant fire risk and the socket should be isolated immediately. Electricians using thermal imaging cameras typically flag any connection above 50°C as requiring investigation and any connection above 70°C as requiring immediate remedial action.',
  },
  {
    question: 'How can I prevent sockets from overheating?',
    answer:
      'The most effective prevention measures are: do not overload sockets — check that the total load on any one socket does not exceed 13A (3kW); avoid permanent use of extension leads and adaptors — if you need more sockets, have them installed properly; do not daisy-chain extension leads (plugging one extension lead into another); ensure plugs are fully inserted into sockets and feel firm; have your installation inspected regularly (every 10 years for owner-occupied, every 5 years for rented); and report any warmth, discolouration, or unusual sounds to a qualified electrician promptly.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/burning-smell-from-socket',
    title: 'Burning Smell From Socket',
    description: 'What to do if you smell burning from an electrical socket — causes and immediate actions.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding approach for electricians investigating overheating sockets.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-fault-finding',
    title: 'Ring Circuit Fault Finding',
    description: 'How to diagnose faults on ring final circuits including overloaded and broken rings.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'Upgrading to modern RCBO and AFDD protection to improve fire safety.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR involves and how it detects overheating connections and overloaded circuits.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-arc-fault-detection',
    title: 'AFDD Guide',
    description: 'How Arc Fault Detection Devices protect against fires caused by loose connections.',
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
    heading: 'Why Is My Plug or Socket Warm?',
    content: (
      <>
        <p>
          You pull a plug out of the wall socket and notice the pins are warm. Or you touch the socket
          faceplate and it feels warmer than the surrounding wall. This is not something to ignore.
        </p>
        <p>
          A warm plug or socket means that electrical energy is being converted to heat at a connection
          point. In a perfect electrical connection, all the energy flows through to the appliance with
          no loss. In reality, every connection has some resistance, and that resistance converts a
          tiny fraction of the energy to heat. In a healthy installation with good connections, this
          heat is so small it is undetectable. When a plug or socket is noticeably warm, the
          resistance is abnormally high — and that means something is wrong.
        </p>
        <p>
          This is a safety-critical issue. Overheating electrical connections are one of the leading
          causes of house fires in the UK. This guide covers the causes, the immediate actions you
          should take, the fire risk, and when to call an electrician. If you are an electrician, the
          later sections cover thermal imaging techniques and the relevant{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            BS 7671 regulations
          </SEOInternalLink>{' '}
          for fire protection.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-do-now',
    heading: 'What to Do Right Now',
    content: (
      <>
        <p>
          If you have discovered a warm plug or socket, here is what to do immediately, depending on
          the severity:
        </p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">If the plug is slightly warm after prolonged use with a high-power appliance:</h4>
            <p className="text-white text-sm leading-relaxed">
              Unplug the appliance and let it cool. Check that the plug pins are clean and the fuse is
              the correct rating. Reinsert the plug firmly, ensuring it is fully seated. Monitor the
              temperature on next use. If it continues to be warm, arrange an inspection.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h4 className="font-bold text-white mb-2">If the socket faceplate is warm or the plug is uncomfortably warm:</h4>
            <p className="text-white text-sm leading-relaxed">
              Unplug all appliances from the socket. Do not use the socket. Check whether other sockets
              on the same circuit are also warm — if so, the issue may be the circuit, not just one
              socket. Arrange for a qualified electrician to inspect the socket, the connections behind
              it, and the circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-2">If the socket is hot, discoloured, or smells of burning:</h4>
            <p className="text-white text-sm leading-relaxed">
              <strong>This is an emergency.</strong> Unplug appliances carefully (the plug may be very
              hot — use a dry cloth if needed). Turn off the circuit at the consumer unit. Do not use
              the socket or the circuit. Call an electrician for an emergency visit. If you see smoke or
              flames, leave the property and call 999.
            </p>
          </div>
        </div>
        <p>
          The key principle is: the hotter it is, the more urgent the action. A slightly warm plug on
          a fan heater may not be an emergency, but any socket that is hot to the touch, discoloured,
          or emitting a smell needs immediate isolation and professional inspection.
        </p>
      </>
    ),
  },
  {
    id: 'causes',
    heading: 'Causes of Warm Plugs and Sockets',
    content: (
      <>
        <p>
          There are several reasons why a plug or socket might become warm. Some are relatively
          straightforward to address; others indicate more serious faults:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose plug terminal screws</strong> — inside the plug, the live, neutral, and
                earth wires are secured by terminal screws. If these are loose, the reduced contact
                area increases resistance and generates heat. This is easy to check and fix by opening
                the plug and tightening the screws.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose socket terminal screws</strong> — behind the socket faceplate, the
                circuit cables are secured by terminal screws. Loose terminals here create the same
                problem but are more dangerous because they carry the full circuit load. This requires
                an electrician to inspect and retorque.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Worn socket contacts</strong> — the spring contacts inside the socket that grip
                the plug pins wear over thousands of insertion cycles. Worn contacts have a smaller
                contact area, higher resistance, and generate more heat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded socket</strong> — plugging too many appliances into a single socket
                via extension leads or adaptors draws more current than the socket was designed for.
                At 13A, a fully loaded socket is working at its maximum continuous rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged cable</strong> — if the cable inside the wall is damaged (nicked by a
                screw, crushed, or degraded by heat), the conductor cross-section is reduced at that
                point. The reduced cross-section has higher resistance and generates heat. This is
                hidden inside the wall and requires professional investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong fuse in the plug</strong> — a 13A fuse in a plug powering a 3A appliance
                will not blow until the current exceeds 13A. If the cable or appliance develops a
                partial fault drawing 5-6A, the 13A fuse will not disconnect. Always use the correct
                fuse rating for the appliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Connections: The Number One Fire Risk',
    content: (
      <>
        <p>
          Loose electrical connections are the single most dangerous cause of warm sockets and plugs.
          The physics is straightforward but the consequences are severe.
        </p>
        <p>
          When a connection is tight, the full cross-sectional area of the conductor is in contact with
          the terminal. The resistance is low, and the heat generated is negligible. When a connection
          loosens, the contact area shrinks. The same current flowing through a smaller contact area
          produces a higher current density, higher resistance, and significantly more heat.
        </p>
        <p>
          The temperature at a loose connection under load can be extraordinary. At the micro-level,
          where the last few strands of copper are making contact with the terminal, temperatures can
          reach hundreds of degrees Celsius. If the connection is loose enough to intermittently make
          and break contact (arcing), temperatures at the arc point exceed 3,000°C.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Why Loose Connections Get Worse</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            A loose connection is never stable. It follows a predictable deterioration cycle:
          </p>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold shrink-0">1.</span>
              <span>Connection loosens slightly (vibration, thermal cycling, poor initial tightening)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold shrink-0">2.</span>
              <span>Reduced contact area increases resistance and heat generation</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold shrink-0">3.</span>
              <span>Heat causes thermal expansion, which loosens the connection further</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold shrink-0">4.</span>
              <span>Oxidation forms on the copper surface (accelerated by heat), further increasing resistance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold shrink-0">5.</span>
              <span>More heat, more expansion, more loosening — the cycle accelerates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 font-bold shrink-0">6.</span>
              <span>Eventually: arcing, melting, ignition of surrounding materials</span>
            </li>
          </ul>
        </div>
        <p>
          This is why early detection matters. A connection that is slightly warm today may be
          dangerously hot in a few months. BS 7671 Section 543 requires the circuit protective
          conductor to connect exposed conductive parts to the main earthing terminal,
          ensuring fault currents flow safely. When connections deteriorate, this protective path is
          compromised.
        </p>
      </>
    ),
  },
  {
    id: 'overloaded-sockets',
    heading: 'Overloaded Sockets: The Most Common Cause',
    content: (
      <>
        <p>
          Socket overloading is the single most common reason homeowners experience warm plugs and
          sockets. The problem is simple: too much current through one outlet.
        </p>
        <p>
          A standard UK 13A socket is rated for a maximum continuous current of 13A (approximately
          3kW at 230V). Here is how quickly that limit is reached:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Kettle: 13A (3kW) — uses the entire socket capacity on its own</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Fan heater: 13A (3kW) — another full-capacity appliance</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Toaster: 9A (2kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Iron: 11A (2.5kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Microwave: 6A (1.4kW)</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Television: 0.5A (120W)</span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Phone charger: 0.1A (25W)</span>
            </li>
          </ul>
        </div>
        <p>
          Plugging a four-way extension lead into a single socket and running a toaster (9A) and a
          microwave (6A) simultaneously draws 15A through that one socket — 2A over its rated capacity.
          The socket will get warm, the plug will get warm, and the extension lead cable may also
          overheat.
        </p>
        <p>
          The danger increases when extension leads are daisy-chained (one plugged into another),
          because the total current flows through the first extension lead's cable and plug — which may
          be rated at only 10A or even lower. Regulation 826.1.4 of BS 7671 requires that overload
          protection is specified for the correct maximum current at every point in the installation.
          Extension leads bypass this protection by concentrating multiple loads through a single
          outlet.
        </p>
        <SEOAppBridge
          title="Check circuit loads with AI"
          description="Elec-Mate's AI circuit designer can model your circuit loads, identify overloaded circuits, and recommend redistribution. Prevent overheating by designing circuits correctly from the start."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'fire-risk',
    heading: 'Fire Risk and Regulation 424.1',
    content: (
      <>
        <p>
          The fire risk from warm plugs and sockets is real and well-documented. UK fire services
          report that faulty electrical installations and appliances cause thousands of house fires
          every year. Overheating connections are a leading specific cause.
        </p>
        <p>
          BS 7671 addresses fire protection through several regulations. Regulation 424.1 specifically
          addresses fire protection measures, noting that where preferred measures are impracticable,
          improved fire protection may be achieved through reactive systems. More broadly, Regulation
          Section 421 establishes fundamental protection objectives including preventing electric shock and
          limiting thermal effects through appropriate protective devices.
        </p>
        <p>
          For the homeowner, the practical implications are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metal consumer units</strong> — since Amendment 3 to BS 7671 (January 2016),
                new consumer units in domestic premises must be enclosed in a non-combustible material
                (metal). This provides fire containment at the consumer unit. If your consumer unit is
                still plastic, a{' '}
                <SEOInternalLink href="/guides/consumer-unit-upgrade">
                  consumer unit upgrade
                </SEOInternalLink>{' '}
                provides this protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AFDDs (Arc Fault Detection Devices)</strong> — these devices detect dangerous
                arcing on a circuit (which is what happens at a loose connection under load) and
                disconnect before a fire can start. AFDDs provide the most effective protection against
                the specific type of fault that causes warm sockets. See our{' '}
                <SEOInternalLink href="/guides/afdd-arc-fault-detection">
                  AFDD guide
                </SEOInternalLink>{' '}
                for details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular inspection</strong> — an EICR includes tightness checks on all
                accessible connections and visual inspection for signs of overheating. Regular
                inspection catches developing faults before they reach a dangerous level.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regulation 528.3 also addresses fire compartmentation — maintaining the integrity of fire
          barriers where cables pass through walls and floors. A fire that starts at an overheating
          socket can spread through cable penetrations if fire stopping has not been maintained.
        </p>
      </>
    ),
  },
  {
    id: 'thermal-imaging',
    heading: 'Thermal Imaging: Seeing the Invisible',
    content: (
      <>
        <p>
          Thermal imaging cameras are one of the most powerful diagnostic tools for identifying
          overheating connections. A thermal camera detects infrared radiation and produces an image
          showing temperature differences — hot spots appear as bright areas against the cooler
          background.
        </p>
        <p>
          For electricians, thermal imaging offers significant advantages over traditional inspection
          methods:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-invasive</strong> — you can scan a socket faceplate, consumer unit cover,
                or distribution board without removing covers or isolating circuits. Hot spots behind
                covers are visible through the thermal image.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-load detection</strong> — thermal imaging works best when the
                installation is under normal load. This is precisely when loose connections and
                overloaded circuits reveal themselves — under load, the heat generation at the fault
                point increases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hidden faults</strong> — a loose connection inside a wall-mounted back box
                may not be visible during a standard visual inspection but will show as a hot spot on
                a thermal image. Similarly, overheating cables behind plasterboard can be detected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — thermal images provide objective, visual evidence of
                a fault and its severity. They are excellent for including in{' '}
                <SEOInternalLink href="/guides/eicr-certificate">
                  EICR reports
                </SEOInternalLink>{' '}
                to show customers exactly what the problem is and why remedial work is necessary.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Affordable thermal camera attachments for smartphones (such as FLIR One) have made thermal
          imaging accessible to every electrician. A quick thermal scan during an EICR or a
          maintenance visit takes seconds and can identify developing faults that would otherwise be
          invisible until they become dangerous.
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
          A warm plug or socket should always be investigated. Here is the urgency scale:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency (call now)</strong> — the socket is hot to the touch, there is a
                burning smell, the faceplate is discoloured or melted, or you can see scorch marks.
                Isolate the circuit at the consumer unit and call an electrician immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent (within 24-48 hours)</strong> — the socket or plug is uncomfortably warm
                to hold, or the warmth is present on a low-power appliance (lamp, phone charger). Do
                not use the socket until it has been inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine (within a week)</strong> — the plug is slightly warm after prolonged
                use with a high-power appliance, but cools quickly after unplugging. Arrange an
                inspection at your earliest convenience to check the connections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When the electrician visits, they should inspect the socket connections, check terminal
          tightness, assess the condition of the plug and socket contacts, measure the circuit load,
          and carry out insulation resistance testing if damage is suspected. They may recommend a
          full EICR if the installation has not been inspected recently, as a warm socket may be
          symptomatic of wider installation issues.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Investigating Warm Sockets',
    content: (
      <>
        <p>
          When investigating a customer report of warm plugs or sockets, use this systematic approach:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Thermal Assessment Under Load</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before isolating, use an IR thermometer or thermal camera to measure the socket
                  temperature under normal load. This gives you baseline data and identifies the
                  specific hot point (is it one pin, the faceplate edge near a terminal, or the
                  whole socket?). Record temperatures and photograph the thermal image.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Isolate and Inspect</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the circuit and remove the socket faceplate. Inspect all terminals for signs
                  of overheating: discolouration, pitting, melted insulation, carbon deposits, or loose
                  wires. Check the back box condition. Retorque all terminals to manufacturer
                  specification. If the socket is on a ring circuit, check that the ring is continuous
                  at this point — a broken ring concentrates the current through one leg.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Test and Measure</h4>
                <p className="text-white text-sm leading-relaxed">
                  Perform insulation resistance testing at 500V DC (L-E, N-E, L-N) — acceptance
                  minimum 1 megohm. Measure earth fault loop impedance (Zs) and compare with maximum
                  permissible values for the protective device. For ring circuits, carry out the full
                  ring continuity test to verify the ring is complete. Measure actual load current with
                  a clamp meter under normal operating conditions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Remediate and Document</h4>
                <p className="text-white text-sm leading-relaxed">
                  Replace the socket if contacts are worn or the faceplate is damaged. Replace any cable
                  with damaged insulation. If the circuit is overloaded, advise on redistributing loads
                  or adding circuits. Consider recommending AFDD installation for additional fire
                  protection. Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  documenting the findings and remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document socket faults with professional certificates"
          description="Elec-Mate's certificate apps let you complete EICRs and Minor Works Certificates on your phone with thermal image attachments, observation codes, and instant PDF export. Join 430+ UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WarmPlugOrSocketPage() {
  return (
    <GuideTemplate
      title="Warm Plug or Socket | Causes & What to Do"
      description="Why is your plug or socket warm? Learn the causes — loose connections, overloaded sockets, worn contacts — the fire risk, what to do immediately, and when to call an electrician. Safety-critical guide for UK homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Alert"
      badgeIcon={Flame}
      heroTitle={
        <>
          Warm Plug or Socket:{' '}
          <span className="text-yellow-400">Causes and What to Do</span>
        </>
      }
      heroSubtitle="A warm plug or socket is a warning sign. This guide explains the causes — from loose connections to overloaded sockets — covers the real fire risk, tells you what to do right now, and explains when to call an electrician."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Warm Plugs and Sockets"
      relatedPages={relatedPages}
      ctaHeading="Identify and Document Overheating Faults on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, thermal imaging documentation, and professional EICR certificates. 7-day free trial, cancel anytime."
    />
  );
}
