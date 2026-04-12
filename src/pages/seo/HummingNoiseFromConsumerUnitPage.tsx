import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Volume2,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  Thermometer,
  Gauge,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Consumer Unit Humming', href: '/guides/humming-noise-from-consumer-unit' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My Consumer Unit Humming?' },
  { id: 'mcb-buzz', label: 'MCB Buzz Under Load' },
  { id: 'contactor-hum', label: 'Contactor and RCD Magnetic Hum' },
  { id: 'loose-connections', label: 'Loose Busbar Connections' },
  { id: 'overloaded-circuits', label: 'Overloaded Circuits' },
  { id: 'thermal-effects', label: 'Thermal Effects and Overheating' },
  { id: 'normal-vs-emergency', label: 'Normal Hum vs Emergency' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A faint hum from the consumer unit is often normal — protective devices contain electromagnetic components (coils and contacts) that vibrate at mains frequency (50Hz) under load.',
  'A loud, persistent, or new buzzing sound is not normal and may indicate loose busbar connections, an overloaded circuit, or a protective device under stress.',
  'Loose connections inside a consumer unit are extremely dangerous. They cause localised heating that can melt busbars, damage devices, and in the worst case cause a fire.',
  'BS 7671 Section 421 establishes fundamental protection objectives including limiting thermal effects through appropriate protective device selection.',
  'If the humming is accompanied by a burning smell, warmth on the consumer unit enclosure, or visible discolouration, isolate the main switch and call an electrician immediately.',
  'Regular inspection under an EICR regime catches developing connection issues before they become dangerous.',
];

const faqs = [
  {
    question: 'Is it normal for a consumer unit to hum?',
    answer:
      'A very faint hum that is only audible when standing directly next to the consumer unit in a quiet room is usually normal. The electromagnetic components inside MCBs, RCDs, and RCBOs vibrate at 50Hz (the mains frequency) and can produce a barely perceptible hum, particularly when the circuits are under load. This is the same principle that causes transformers to hum. However, if the hum is loud enough to hear from across the room, has recently appeared or increased in volume, or is accompanied by any other symptom (warmth, smell, flickering lights), it is not normal and should be investigated.',
  },
  {
    question: 'Why does the humming get louder at certain times of day?',
    answer:
      'If the humming is louder during peak usage times (evenings, when cooking, when the shower is on), it correlates with higher current draw through the consumer unit. Under heavier load, more current flows through the electromagnetic components and the busbars, increasing the magnetic field strength and the associated vibration. This pattern suggests the humming is load-dependent, which is consistent with either normal magnetic hum amplified by high load, or a connection that becomes more stressed under load. If the increase is significant, it is worth having the connections checked.',
  },
  {
    question: 'Can a humming consumer unit cause a fire?',
    answer:
      'A faint hum from normal electromagnetic vibration will not cause a fire. However, humming caused by loose connections is a genuine fire risk. A loose busbar connection or terminal has higher resistance than a tight one. Under load, this resistance generates heat (P = I squared x R). The heat loosens the connection further, increasing resistance, increasing heat — a feedback loop that can escalate to melting, arcing, and ignition of the enclosure plastic or surrounding materials. This is why the humming itself matters less than the cause of the humming. A professional inspection can determine whether the hum is benign or indicates a developing fault.',
  },
  {
    question: 'What does it mean if one specific MCB is buzzing?',
    answer:
      'If a single MCB or RCBO is buzzing more than the others, it usually means that circuit is carrying a higher load relative to its rating. The MCB internal mechanism vibrates more when carrying a current close to its rated capacity. Check what is connected to that circuit — you may find high-power appliances running simultaneously. If the circuit is genuinely overloaded (load exceeds the MCB rating), the MCB should trip. Persistent buzzing without tripping, but close to the rated current, indicates the circuit is working hard and may benefit from being redistributed across multiple circuits. Alternatively, the MCB itself may be worn or defective and should be replaced.',
  },
  {
    question: 'Should I turn off the main switch if the consumer unit is humming?',
    answer:
      'If the humming is faint and has been present for a long time without any other symptoms, there is no immediate need to turn off the main switch — but do arrange an inspection at the earliest opportunity. If the humming is loud, new, or accompanied by a burning smell, warmth on the enclosure, visible discolouration, or flickering lights, you should turn off the main switch and call an electrician. In the case of a burning smell, do not turn the switch back on until the installation has been inspected and any faults rectified.',
  },
  {
    question: 'How often should a consumer unit be inspected?',
    answer:
      'For domestic properties, BS 7671 recommends inspection and testing (EICR) every 10 years for owner-occupied homes and every 5 years for rented properties. For landlords, a 5-yearly EICR is a legal requirement under the Electrical Safety Standards in the Private Rented Sector Regulations 2020. However, if you notice any unusual sounds, smells, or visual changes at the consumer unit, do not wait for the scheduled inspection — arrange a check immediately. An electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or similar) can carry out the inspection and issue the EICR.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description:
      'When and why to upgrade your consumer unit, including metal enclosure requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Current regulations for consumer units including RCBO, AFDD, and metal enclosure requirements.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/circuit-breaker-tripping',
    title: 'Circuit Breaker Tripping',
    description: 'Causes and solutions when MCBs and RCBOs keep tripping.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding approach for diagnosing consumer unit issues.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Guide',
    description: 'What an EICR involves and when you need one for your property.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/burning-smell-from-socket',
    title: 'Burning Smell From Socket',
    description: 'What to do if you smell burning from any electrical fitting — immediate actions.',
    icon: AlertTriangle,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Is My Consumer Unit Humming?',
    content: (
      <>
        <p>
          You are standing in the hallway and you notice it — a low, persistent hum coming from the
          consumer unit (fuse box). It might be something you have only just noticed, or something
          that has been getting louder over time. Either way, a noise from the thing that controls
          all the electricity in your home is understandably concerning.
        </p>
        <p>
          Consumer units contain electromagnetic components — coils, contacts, and bimetallic strips
          inside MCBs, RCDs, and RCBOs — that can vibrate at mains frequency and produce a hum. In
          many cases, this is normal operation. But in some cases, the hum is a symptom of a
          developing fault that needs attention before it becomes dangerous.
        </p>
        <p>
          This guide explains what causes the different types of humming noise, helps you assess
          whether what you are hearing is normal or a warning sign, and tells you when to call an
          electrician. If you are an electrician, the later sections cover the diagnostic approach
          for consumer unit noise complaints and the relevant{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            consumer unit regulations
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'mcb-buzz',
    heading: 'MCB Buzz Under Load: Why Breakers Hum',
    content: (
      <>
        <p>
          Inside every MCB (Miniature Circuit Breaker) is an electromagnetic coil. When current
          flows through the coil, it creates a magnetic field. This magnetic field is what enables
          the MCB to trip quickly on a short circuit — the sudden surge of current generates a
          strong magnetic force that mechanically opens the contacts.
        </p>
        <p>
          Under normal load, a much weaker magnetic field is present. This field oscillates at 50Hz
          (the UK mains frequency) and causes tiny physical vibrations in the coil and the metal
          parts of the MCB. The result is a faint hum at 50Hz or 100Hz (the second harmonic). The
          heavier the load on the circuit, the stronger the magnetic field, and the louder the hum.
        </p>
        <p>
          This is the same principle that causes power transformers to hum — it is called
          magnetostriction, and it is a fundamental physical effect of alternating current in
          electromagnetic components. In a well-made MCB carrying a normal load, the hum should be
          barely perceptible. If an MCB is buzzing loudly, it may be:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carrying a load close to its rated current</strong> — a 32A MCB carrying 28A
                will hum more than one carrying 10A. Check the actual load using a clamp meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not seated properly on the busbar</strong> — if the MCB is not clicked fully
                onto the DIN rail or the busbar connection is not clean and tight, vibration
                increases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Defective</strong> — internal wear, a weakened trip mechanism, or a loose
                internal connection can cause excessive vibration. A defective MCB should be
                replaced.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'contactor-hum',
    heading: 'Contactor and RCD Magnetic Hum',
    content: (
      <>
        <p>
          RCDs (Residual Current Devices) and RCBOs contain a toroidal transformer — a ring-shaped
          coil through which the live and neutral conductors pass. This transformer is the sensing
          element that detects current imbalance. Like any transformer, it can produce a hum at
          mains frequency, particularly under load.
        </p>
        <p>
          The hum from an RCD is usually quieter than from an MCB because the toroidal transformer
          carries very little current itself — it only detects the difference between live and
          neutral currents. However, if the RCD is protecting multiple circuits and the total load
          through it is high, the hum may become noticeable.
        </p>
        <p>
          Some consumer units also contain contactors — electromechanical switches used for time
          clocks, immersion heater control, or Economy 7/10 switching. Contactors have a more
          substantial electromagnetic coil and are one of the loudest sources of humming in a
          consumer unit. A contactor hum is normal when the contactor is energised (for example,
          when the immersion heater is on). If the contactor buzzes loudly or chatters (makes a
          rapid clicking sound), the coil or contacts may be worn and the contactor should be
          replaced.
        </p>
        <p>
          Section 421 of BS 7671 establishes fundamental protection objectives including limiting
          thermal effects through appropriate protective device selection and ensuring
          discrimination between devices. Correctly rated and properly installed protective devices
          should operate quietly under normal conditions.
        </p>
      </>
    ),
  },
  {
    id: 'loose-connections',
    heading: 'Loose Busbar Connections: The Serious Concern',
    content: (
      <>
        <p>
          This is where a humming consumer unit goes from "probably fine" to "potentially
          dangerous." The busbars in a consumer unit are copper or tinned copper strips that
          distribute power from the main switch to each individual MCB, RCBO, or RCD. Each device
          clips onto the busbar, and the connection relies on spring tension and physical contact
          pressure.
        </p>
        <p>
          If a busbar connection is loose — because the device is not fully seated, the busbar is
          damaged, or the spring clip has weakened — the contact area is reduced. Current flowing
          through a reduced contact area generates heat, and the electromagnetic vibration at the
          loose contact point produces audible buzzing.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat damage cycle</strong> — a loose busbar connection generates heat. The
                heat causes thermal expansion, which can loosen the connection further. The looser
                connection has even higher resistance, generating more heat. This cycle can escalate
                to melting the busbar, damaging adjacent devices, and in the worst case, causing a
                fire within the consumer unit enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminal connections</strong> — the outgoing cables from each MCB or RCBO
                are secured by terminal screws. If these are loose, the same heat-vibration cycle
                applies. Terminals should be checked and retorqued to the manufacturer specification
                during every inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch connections</strong> — the meter tails connect to the main
                switch. If these connections are loose, the entire installation is affected. A loose
                main switch connection carrying the full household load is one of the most dangerous
                faults in a domestic installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This is why a humming consumer unit should never be dismissed without investigation. The
          hum itself is harmless — but the loose connection causing it can be lethal.
        </p>
      </>
    ),
  },
  {
    id: 'overloaded-circuits',
    heading: 'Overloaded Circuits and Excessive Current',
    content: (
      <>
        <p>
          When a circuit carries more current than it was designed for, every component in the path
          works harder. The MCB or RCBO carries more current through its electromagnetic coil,
          increasing the hum. The busbar connections carry more current, increasing heat generation.
          The cables heat up, potentially affecting the insulation.
        </p>
        <p>
          Regulation 826.1.4 of BS 7671 requires that overload and short-circuit currents must be
          determined at every point where protection is installed, for every configuration of the
          installation, to ensure correct protective device selection. If circuits have been added
          or loads increased since the original installation, the protective devices may no longer
          be correctly rated for the actual load.
        </p>
        <p>Common signs of an overloaded circuit include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                An MCB that trips periodically under heavy load (for example, when multiple kitchen
                appliances are used simultaneously)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cables that feel warm to the touch near the consumer unit (check with the back of
                your hand — do not grip a warm cable)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Buzzing from a specific MCB that correlates with specific appliances being used
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Dimming lights when high-power appliances start (see our{' '}
                <SEOInternalLink href="/guides/lights-dimming-when-appliance-turns-on">
                  lights dimming guide
                </SEOInternalLink>{' '}
                for more detail)
              </span>
            </li>
          </ul>
        </div>
        <p>
          The solution to circuit overloading is to redistribute the load across additional circuits
          or to upgrade the existing circuit (larger cable, higher-rated MCB if appropriate). This
          typically involves a{' '}
          <SEOInternalLink href="/guides/consumer-unit-upgrade">
            consumer unit upgrade
          </SEOInternalLink>{' '}
          to add the necessary ways and protection.
        </p>
      </>
    ),
  },
  {
    id: 'thermal-effects',
    heading: 'Thermal Effects and Overheating',
    content: (
      <>
        <p>
          Heat is the enemy of electrical connections. Regulation 133.2 of BS 7671 requires that
          conductor cross-sectional area is determined considering maximum permissible temperature,
          particularly when cables pass through thermal insulation where heat dissipation is
          reduced. The same principle applies inside the consumer unit — heat must be able to
          dissipate from the devices and connections.
        </p>
        <p>
          Modern consumer units are required to be metal-enclosed (since January 2016 under
          Amendment 3 to BS 7671). The metal enclosure provides fire containment — if a fault causes
          overheating inside the consumer unit, the metal box prevents the fire from spreading to
          the surrounding building fabric. Older plastic consumer units do not provide this
          protection and are one of the reasons why consumer unit upgrades are recommended.
        </p>
        <p>Signs of thermal effects in a consumer unit include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warmth on the enclosure</strong> — if the metal or plastic enclosure feels
                warm to the touch, connections inside are generating more heat than expected. A
                correctly loaded consumer unit should be at or near ambient temperature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discolouration</strong> — brown or yellow marks on a white or grey
                enclosure, particularly near specific devices, indicate localised heating at that
                point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell</strong> — the smell of hot plastic or burnt electrical
                insulation from a consumer unit is a serious warning sign. Isolate the main switch
                and call an electrician immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Melted cable insulation</strong> — visible only when the enclosure cover is
                removed, but can sometimes be detected by smell. Melted insulation confirms
                sustained overheating.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Identify consumer unit faults with AI"
          description="Elec-Mate's AI board scanner identifies consumer unit components and flags potential issues. Combined with the fault diagnosis tool, you can systematically investigate and document consumer unit problems."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'normal-vs-emergency',
    heading: 'Normal Hum vs Emergency: A Quick Guide',
    content: (
      <>
        <p>
          Here is a straightforward way to assess whether the noise from your consumer unit is
          something to monitor or something to act on immediately:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Monitor (Not Urgent)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Very faint hum, only audible in a quiet room</li>
              <li>Has been present at the same level for a long time</li>
              <li>Gets slightly louder when heavy loads are on (evenings)</li>
              <li>No warmth on the enclosure</li>
              <li>No smell</li>
              <li>No discolouration</li>
              <li>Lights are steady (no flickering)</li>
            </ul>
            <p className="text-white text-sm mt-3">
              Arrange an inspection at your next convenient opportunity.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Act Now (Urgent)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Loud buzzing or crackling</li>
              <li>New noise that was not there before</li>
              <li>Noise getting louder over time</li>
              <li>Consumer unit enclosure is warm or hot</li>
              <li>Burning smell</li>
              <li>Brown marks or discolouration</li>
              <li>Lights flickering or dimming</li>
              <li>MCBs tripping unexpectedly</li>
            </ul>
            <p className="text-white text-sm mt-3">
              Turn off the main switch and call an electrician today.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          The consumer unit is the heart of your home's electrical installation. It is not something
          to investigate yourself unless you are a qualified electrician. Call a professional if:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Any burning smell</strong> — this is the single most important warning sign.
                Isolate the main switch and call an electrician. Do not open the consumer unit
                yourself.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The enclosure is warm</strong> — touch the consumer unit cover with the back
                of your hand. If it is noticeably warm, there is excessive heat generation inside.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>New or increasing noise</strong> — a change in the noise level suggests a
                change in the installation — a connection loosening, a device degrading, or a load
                increasing beyond safe limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Crackling or popping sounds</strong> — these suggest arcing at a connection
                point, which is a fire risk. Do not ignore these sounds.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrician will carry out a visual inspection with the cover removed, tightness
          checks on all connections, thermal imaging (if available) to identify hot spots, and may
          recommend a full <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>{' '}
          if the consumer unit shows signs of ageing or the installation has not been inspected
          recently. If the consumer unit is an older plastic type, the electrician may recommend an
          upgrade to a modern metal-enclosed unit with RCBO protection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Investigating Consumer Unit Noise',
    content: (
      <>
        <p>
          When a customer reports a humming consumer unit, the investigation should be methodical:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Thermal Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before opening the consumer unit, assess the enclosure temperature. Use an IR
                  thermometer to check for hot spots on the cover and sides. If thermal imaging is
                  available, image the enclosure under load — hot spots indicate connection issues
                  behind the cover. Record the readings as baseline.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Visual Inspection and Tightness</h4>
                <p className="text-white text-sm leading-relaxed">
                  Isolate the main switch. Remove the cover. Inspect all connections for
                  discolouration, melted insulation, or carbon deposits. Check that all devices are
                  fully seated on the DIN rail and busbar. Retorque all terminal connections to
                  manufacturer specification. Pay particular attention to the main switch terminals
                  and the neutral bar connections.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. Load Assessment</h4>
                <p className="text-white text-sm leading-relaxed">
                  With the supply restored, use a clamp meter to measure the load on each circuit
                  and the total load on the main switch. Compare against the rated capacity of each
                  device and the maximum demand of the installation. If any circuit is consistently
                  above 80% of its rated capacity, recommend redistributing the load or adding
                  circuits.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Document and Advise</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record findings and any remedial work carried out. If the consumer unit is a
                  plastic type, advise on upgrading to metal-enclosed. If the installation has not
                  had an EICR within the recommended interval, recommend a full inspection. Issue an{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  if any remedial work was carried out.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document consumer unit inspections on your phone"
          description="Elec-Mate's EICR and Minor Works certificate apps let you document consumer unit findings with photos, observation codes, and instant PDF export. AI board scanning identifies components automatically."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HummingNoiseFromConsumerUnitPage() {
  return (
    <GuideTemplate
      title="Humming Noise From Consumer Unit | What It Means"
      description="Why is your consumer unit humming? Learn the difference between normal MCB buzz and dangerous loose connections, what thermal effects look like, and when to call an electrician. Covers busbar issues, overloaded circuits, and fire safety."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Volume2}
      heroTitle={
        <>
          Humming Noise From Consumer Unit:{' '}
          <span className="text-yellow-400">What It Means and When to Act</span>
        </>
      }
      heroSubtitle="A hum or buzz from your consumer unit — is it normal? This guide explains the causes from harmless electromagnetic vibration to dangerous loose connections, covers the warning signs of overheating, and tells you when to call an electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Humming"
      relatedPages={relatedPages}
      ctaHeading="Inspect and Document Consumer Units on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for AI board scanning, professional EICR certificates, and fault documentation. 7-day free trial, cancel anytime."
    />
  );
}
