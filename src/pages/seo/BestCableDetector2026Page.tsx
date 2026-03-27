import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Radio,
  Zap,
  Gauge,
  Calculator,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Search,
  Wrench,
  Cable,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Best Cable Detector 2026', href: '/guides/best-cable-detector-2026' },
];

const tocItems = [
  { id: 'overview', label: 'Why Cable Detection Matters' },
  { id: 'active-vs-passive', label: 'Active vs Passive Detection' },
  { id: 'radiodetection-cat4', label: 'Radiodetection C.A.T4+' },
  { id: 'leica-dd220', label: 'Leica DD220' },
  { id: 'amprobe-at3500', label: 'Amprobe AT-3500' },
  { id: 'fluke-2042', label: 'Fluke 2042' },
  { id: 'budget-options', label: 'Budget Options' },
  { id: 'hse-guidance', label: 'HSE Guidance and Cable Strikes' },
  { id: 'comparison', label: 'Comparison Summary' },
  { id: 'verdict', label: 'Our Verdict' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Cable strikes during excavation or drilling remain one of the most common causes of serious electrical injury on UK construction sites. HSE guidance (HSG47) requires the use of a cable avoidance tool before any ground penetration.',
  'The Radiodetection C.A.T4+ with Genny4 signal generator is the industry standard for UK site work — it is the instrument most main contractors and clients require and most hire companies stock.',
  'Active detection (applying a signal to the cable with a transmitter) is more accurate and reliable than passive detection (detecting the electromagnetic field of a live cable). Always use active mode when possible.',
  'Budget wall scanners (under 100 pounds) are useful for domestic work — finding cables before drilling into walls — but are not suitable for ground excavation or professional cable route tracing.',
  'Training and competence matter more than the instrument. A cheap detector in the hands of someone who understands the limitations is safer than an expensive detector used by someone who trusts it blindly.',
];

const faqs = [
  {
    question: 'What is the difference between a CAT scanner and a wall scanner?',
    answer:
      'A CAT (Cable Avoidance Tool) scanner is designed for detecting underground cables and pipes at depths of up to 3 metres. It uses radio frequency detection and can be paired with a signal generator (Genny) for active tracing. A wall scanner is designed for detecting cables, pipes, and studs in walls at shallow depths (typically up to 50 to 80mm). Wall scanners are smaller, cheaper, and designed for domestic use — drilling into walls for sockets, shelves, and fixings. A CAT scanner is essential for excavation work and cable route tracing outdoors. A wall scanner is adequate for most indoor domestic electrical work.',
  },
  {
    question: 'Do I legally need a cable detector?',
    answer:
      'There is no specific legal requirement to own a cable detector. However, HSE Guidance Note HSG47 (Avoiding danger from underground services) states that cable avoidance tools must be used before any mechanical excavation near underground services. The Electricity at Work Regulations 1989 require that precautions are taken to prevent danger from underground cables. In practice, most main contractors and local authorities require evidence that a CAT scan has been performed before excavation is permitted. For domestic electricians working indoors, using a cable detector before drilling or chasing is considered good practice under the general duty of care in BS 7671.',
  },
  {
    question: 'How deep can a cable detector find cables?',
    answer:
      'Detection depth depends on the cable type, soil conditions, and detection mode. In active mode with a signal generator, professional CAT scanners can detect cables at depths of 2 to 3 metres in favourable conditions. In passive mode (detecting the electromagnetic field of a live cable), effective depth is typically 1 to 1.5 metres. Wall scanners designed for indoor use typically detect to a depth of 40 to 80mm in plasterboard and 30 to 50mm in solid masonry. Depth accuracy decreases as you go deeper — at maximum depth, the position may be accurate to plus or minus 200mm rather than the 50mm accuracy achievable at shallower depths.',
  },
  {
    question: 'What frequency modes should a cable detector have?',
    answer:
      'Professional cable detectors typically have four detection modes: Power mode (50Hz/60Hz) detects live power cables by their electromagnetic field. Radio mode detects signals re-radiated by metallic cables and pipes from long-wave radio transmitters. Genny (signal generator) mode detects a specific frequency applied to a cable by the paired transmitter — this is the most accurate mode. Some models add a fourth mode for specific frequencies used by telecoms or cathodic protection systems. For UK electrical work, Power mode and Genny mode are the most important. Radio mode is useful as a general-purpose scan but less precise.',
  },
  {
    question: 'Can a cable detector find plastic water pipes?',
    answer:
      'Standard cable detectors cannot detect plastic pipes directly because they have no metallic content to generate or re-radiate an electromagnetic signal. However, many plastic pipes have a metallic tracer wire buried alongside them specifically for detection purposes. If a tracer wire is present, the cable detector will find it. For plastic pipes without tracer wire, Ground Penetrating Radar (GPR) is required — this is specialist equipment costing 5,000 pounds or more, typically used by utility survey companies. If you suspect plastic services, commission a GPR survey rather than relying on a cable detector alone.',
  },
  {
    question: 'How often should a cable detector be calibrated?',
    answer:
      'Radiodetection recommends annual calibration for CAT4+ instruments. Most hire companies calibrate their fleet on a 6-month cycle. The self-test function built into the CAT4+ and other professional instruments checks basic functionality at power-on, but it does not replace a full laboratory calibration. If the instrument is dropped, damaged, or gives inconsistent readings, send it for calibration immediately regardless of the schedule. A dated calibration sticker on the instrument is required by most main contractors before allowing you to use it on their sites.',
  },
  {
    question: 'Should I buy or hire a cable detector?',
    answer:
      'If you do excavation or external groundwork regularly (weekly or more), buying makes financial sense — a CAT4+ with Genny costs 1,200 to 1,500 pounds and lasts 5 to 8 years. If you need one occasionally (a few times per year), hiring is more cost-effective at 30 to 50 pounds per day from most hire companies (HSS, Speedy, Sunbelt). For domestic electricians who only need indoor cable detection, buying a decent wall scanner at 50 to 150 pounds is the practical choice. Do not buy a CAT4+ if you only drill holes in walls — it is overkill. Equally, do not rely on a wall scanner for groundwork — it is not designed for that depth.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables correctly for every installation with automatic voltage drop and derating calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/best-multifunction-tester-2026',
    title: 'Best Multifunction Tester 2026',
    description:
      'Complete your testing toolkit with the right MFT for EICR and EIC testing.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on site with AI board scanning and instant PDF.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/best-thermal-imaging-camera-electricians',
    title: 'Best Thermal Imaging Camera 2026',
    description:
      'Detect overheating connections and hidden faults with a thermal camera alongside your cable detector.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with modules covering safe isolation, testing sequences, and certification.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Verify voltage drop on cable runs identified during route tracing.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Cable Detection Matters',
    content: (
      <>
        <p>
          Hitting an underground cable during excavation can kill. Hitting a cable in a wall while
          drilling can cause serious burns, electric shock, and fire. Cable strikes remain one of
          the most reported categories of electrical incident to the HSE, and the vast majority are
          preventable with proper detection, planning, and safe working practices.
        </p>
        <p>
          For electricians, cable detection is relevant in two main scenarios. First, excavation work
          — installing external supplies, EV charger feeds, garden lighting, or outbuilding cables
          where you need to dig or trench across ground that may contain existing services. Second,
          indoor work — drilling, chasing, or cutting into walls and floors where existing cables
          may be concealed.
        </p>
        <p>
          The instruments for these two scenarios are different. Underground cable detection requires
          a professional Cable Avoidance Tool (CAT) — typically paired with a signal generator
          (Genny) for active tracing. Indoor wall scanning uses simpler, cheaper devices designed
          for shallow-depth detection through plaster and plasterboard. This guide covers both.
        </p>
      </>
    ),
  },
  {
    id: 'active-vs-passive',
    heading: 'Active vs Passive Detection',
    content: (
      <>
        <p>
          Understanding the difference between active and passive detection is essential for using
          any cable detector effectively. Getting this wrong is the most common cause of missed
          cables and false confidence.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Active Detection</h3>
            <p className="text-white text-sm leading-relaxed">
              A signal generator (transmitter) applies a specific frequency signal to the target
              cable. The cable detector (receiver) is tuned to detect that specific frequency. This
              is the most accurate method because you are detecting a known signal on a known cable.
              Active detection requires access to the cable at one end — typically at the consumer
              unit, distribution board, or a cable chamber. The signal generator clips onto the cable
              or is coupled inductively. Active mode gives the best depth accuracy and the most
              reliable cable route tracing.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Passive Detection</h3>
            <p className="text-white text-sm leading-relaxed">
              The cable detector listens for electromagnetic fields generated by live power cables
              (50Hz power mode) or signals re-radiated by metallic conductors from background radio
              transmissions (radio mode). No transmitter is needed. Passive detection is useful for
              initial sweeps and for detecting cables you cannot access at either end. However, it is
              less accurate, less reliable, and cannot detect dead (de-energised) cables. A cable
              that is not carrying current and is not picking up radio signals will be invisible in
              passive mode.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Critical safety point:</strong> Passive detection alone cannot guarantee that an
              area is clear of cables. A de-energised cable, a cable with no load, or a cable shielded
              by other metallic objects may not be detected in passive mode. Always use active detection
              where possible, and always hand-dig within 500mm of a detected cable route.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'radiodetection-cat4',
    heading: 'Radiodetection C.A.T4+',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Radiodetection C.A.T4+ — The Industry Standard</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The C.A.T4+ (Cable Avoidance Tool) with Genny4 signal generator is the most widely
            used underground cable and pipe locator in the UK. It is the instrument specified by
            most main contractors, utility companies, and local authorities.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Detection modes:</strong> Power, Radio, Genny</p>
              <p className="text-white text-sm"><strong>Max depth (active):</strong> Up to 3 metres</p>
              <p className="text-white text-sm"><strong>Depth accuracy:</strong> +/- 5% at 1m depth</p>
              <p className="text-white text-sm"><strong>StrikeAlert:</strong> Yes (proximity warning)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Data logging:</strong> Yes (usage and avoidance data)</p>
              <p className="text-white text-sm"><strong>Swing warning:</strong> Yes (detects poor technique)</p>
              <p className="text-white text-sm"><strong>Battery:</strong> 4x AA, 30+ hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 1,200 to 1,500 pounds (with Genny4)</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The C.A.T4+ is purpose-built for avoiding underground services.
          StrikeAlert provides automatic sensitivity adjustment and an audible warning when a
          signal is detected above a threshold — it is harder to accidentally ignore a buried
          cable. The swing warning alerts you if you are not sweeping the detector correctly,
          which reduces the chance of missing a cable due to poor technique. Data logging records
          usage patterns, which is useful for demonstrating due diligence if an incident is
          investigated. The Genny4 signal generator has multiple output frequencies and coupling
          options. Battery life is excellent.
        </p>
        <p>
          <strong>Weaknesses:</strong> The price is the main barrier — 1,200 to 1,500 pounds with
          the Genny4 is a significant investment for a domestic electrician who rarely does
          groundwork. The instrument is designed for outdoor underground detection and is overkill
          for indoor wall scanning. It is larger and heavier than indoor-focused alternatives.
          Annual calibration adds 100 to 150 pounds per year to the running cost.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who regularly work on external cable installations,
          EV charger groundwork, or any project involving excavation. If you work on sites managed
          by main contractors, many require a C.A.T4+ specifically — other brands may not be
          accepted.
        </p>
      </>
    ),
  },
  {
    id: 'leica-dd220',
    heading: 'Leica DD220',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Leica DD220 — The Professional Alternative</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Leica (the surveying instrument manufacturer, not the camera company) produces a range of
            cable and pipe locators. The DD220 is their mid-range model aimed at electrical
            contractors and utility workers.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Detection modes:</strong> Power, Radio, Generator</p>
              <p className="text-white text-sm"><strong>Max depth (active):</strong> Up to 3 metres</p>
              <p className="text-white text-sm"><strong>Depth accuracy:</strong> +/- 5% at 1m depth</p>
              <p className="text-white text-sm"><strong>Auto-depth:</strong> Yes (continuous depth reading)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Data logging:</strong> Yes (Bluetooth to app)</p>
              <p className="text-white text-sm"><strong>Signal strength:</strong> Proportional bar + audio</p>
              <p className="text-white text-sm"><strong>Battery:</strong> Rechargeable, 20+ hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 1,000 to 1,300 pounds (with generator)</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The automatic depth reading is a standout feature — the DD220
          continuously displays the estimated depth to the detected cable, which is useful for
          planning excavation depth and safe digging margins. The Bluetooth data logging to the
          Leica app provides GPS-tagged detection records, useful for creating as-built cable
          route drawings. The rechargeable battery with 20+ hours life eliminates the need to
          carry spare AAs. The signal strength display is clear and intuitive.
        </p>
        <p>
          <strong>Weaknesses:</strong> The Leica brand has less market share in UK cable detection
          than Radiodetection. Some main contractors may not recognise or accept it as equivalent
          to a C.A.T4+. The DD220 signal generator (sold separately or in a kit) is less widely
          available than the Genny4 for hire or loan. The rechargeable battery, while long-lasting,
          means you are stranded if it fails on site — no AA backup option.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who want a professional-grade cable locator with
          excellent depth measurement and data logging, and who work for clients that accept
          Leica as an alternative to Radiodetection.
        </p>
      </>
    ),
  },
  {
    id: 'amprobe-at3500',
    heading: 'Amprobe AT-3500',
    content: (
      <>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Amprobe AT-3500 — The Multi-Purpose Locator</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            The Amprobe AT-3500 is designed for electricians who need to trace cables both
            underground and through buildings. It combines underground cable location with
            circuit identification and breaker finding capabilities.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Detection modes:</strong> Power, Tone, Active</p>
              <p className="text-white text-sm"><strong>Max depth (active):</strong> Up to 2.5 metres</p>
              <p className="text-white text-sm"><strong>Circuit identification:</strong> Yes (breaker finder)</p>
              <p className="text-white text-sm"><strong>Cable tracing:</strong> Through walls and underground</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Transmitter frequencies:</strong> 4 selectable</p>
              <p className="text-white text-sm"><strong>Signal clamp:</strong> Included</p>
              <p className="text-white text-sm"><strong>Battery:</strong> 9V + 8x AA, 15+ hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 800 to 1,000 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The dual-purpose design is genuinely useful for electricians.
          The transmitter can apply a signal to a cable for underground route tracing, but it also
          works as a circuit identifier — apply the signal at a socket and the receiver identifies
          which breaker controls that circuit at the consumer unit. This replaces the need for a
          separate breaker finder tool. The signal clamp allows you to apply the signal without
          disconnecting the cable. Four selectable frequencies help differentiate between multiple
          cables running in parallel.
        </p>
        <p>
          <strong>Weaknesses:</strong> It is not as accurate as the dedicated C.A.T4+ for
          underground detection — the depth accuracy and maximum detection depth are slightly
          inferior. Main contractors are less likely to accept it as equivalent to a C.A.T4+. The
          battery arrangement (9V plus 8x AA) is cumbersome. The receiver is bulkier than the
          Radiodetection or Leica models.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who need both underground cable detection and
          indoor circuit identification in one kit. If you regularly trace cables through buildings
          and occasionally do groundwork, the AT-3500 reduces the number of instruments you carry.
        </p>
      </>
    ),
  },
  {
    id: 'fluke-2042',
    heading: 'Fluke 2042',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Fluke 2042 — The Fluke Ecosystem Option</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Fluke's cable locator combines a receiver and transmitter for both underground and
            through-wall cable tracing. As with all Fluke instruments, the build quality is
            excellent but the price reflects the brand premium.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Detection modes:</strong> Power, Tone, Active</p>
              <p className="text-white text-sm"><strong>Max depth (active):</strong> Up to 2 metres</p>
              <p className="text-white text-sm"><strong>Circuit identification:</strong> Yes (fuse finder)</p>
              <p className="text-white text-sm"><strong>Cable tracing:</strong> Through walls and underground</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Transmitter frequencies:</strong> 2 selectable</p>
              <p className="text-white text-sm"><strong>Signal coupling:</strong> Direct connect + clamp</p>
              <p className="text-white text-sm"><strong>Battery:</strong> 9V batteries, 10+ hours</p>
              <p className="text-white text-sm"><strong>Street price:</strong> 600 to 800 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> Fluke build quality — the instrument feels solid and survives
          rough treatment. The fuse finder function is useful for domestic EICRs where the circuit
          labelling is missing or incorrect. The direct connect option allows the transmitter to
          apply a signal directly to a specific conductor for precise tracing. The price is lower
          than the Radiodetection C.A.T4+ kit while still providing active cable location
          capability.
        </p>
        <p>
          <strong>Weaknesses:</strong> Maximum detection depth of 2 metres is less than the C.A.T4+
          and Leica DD220. Only two transmitter frequencies (versus four on the Amprobe) limits
          your ability to differentiate parallel cables. No StrikeAlert or swing warning features.
          Not accepted as equivalent to a C.A.T4+ by most main contractors for excavation work.
          Better suited to cable tracing and circuit identification than safety-critical cable
          avoidance.
        </p>
        <p>
          <strong>Best for:</strong> Domestic and light commercial electricians who need cable
          tracing and circuit identification more than deep underground cable avoidance. If you
          already use Fluke instruments and value brand consistency, the 2042 fits your kit.
        </p>
      </>
    ),
  },
  {
    id: 'budget-options',
    heading: 'Budget Wall Scanners',
    content: (
      <>
        <p>
          For domestic electricians who primarily need to find cables before drilling into walls,
          a purpose-built wall scanner is more practical and affordable than a full cable
          avoidance tool.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bosch GMS 120 (80 to 100 pounds)</strong> — detects cables, metal pipes,
                and wooden studs. Three detection modes with separate indicators for each. Detection
                depth: 50mm in concrete for cables, 120mm for metal. The most popular wall scanner
                among UK electricians. Reliable, simple to use, and good enough for 90% of domestic
                wall scanning needs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stanley FatMax S300 (40 to 60 pounds)</strong> — basic stud, metal, and AC
                cable detection. Detection depth: 38mm for AC cables, 51mm for metal, 38mm for
                wood. Adequate for simple domestic jobs — finding cables before hanging a shelf or
                mounting a TV bracket. Less reliable in solid masonry than the Bosch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zircon MultiScanner i520 (50 to 70 pounds)</strong> — combines stud
                finding with AC cable detection. Works well in plasterboard partitions. Less
                effective in solid brick or concrete walls. The WireWarning feature indicates live
                AC cables, but only if they are carrying current. Good for timber-frame properties
                and stud partition walls.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Important:</strong> Budget wall scanners detect live AC cables by sensing the
              electromagnetic field. They cannot detect dead cables, DC cables (solar PV, battery
              storage), or cables in metallic conduit. Never assume a wall is clear of cables based
              solely on a wall scanner reading. Check both sides of the wall, use cable routes
              (safe zones as per BS 7671 Regulation 522.6), and drill with caution.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'hse-guidance',
    heading: 'HSE Guidance and Avoiding Cable Strikes',
    content: (
      <>
        <p>
          HSE Guidance Note HSG47 (Avoiding danger from underground services) sets out the safe
          system of work for excavation near underground cables. Even if you do not work on
          construction sites, understanding this guidance is important.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan</strong> — obtain service drawings from the asset owners before any
                excavation. For electrical cables, request drawings from the DNO (UK Power
                Networks, Western Power Distribution, etc.). Service drawings show approximate
                routes but are not always accurate — they are a starting point, not a guarantee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detect</strong> — use a cable avoidance tool (CAT) to scan the work area
                before excavation. Scan in multiple directions. Use active mode (with a signal
                generator) where possible. Mark detected services on the ground with spray paint or
                marker posts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dig safely</strong> — hand-dig within 500mm of a detected service. No
                mechanical excavation (mini digger, breaker) within this zone. Use insulated hand
                tools. Be aware that cables may not be at the expected depth — they can be as
                shallow as 100mm below the surface, especially near buildings, walls, and previous
                excavations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>If you strike a cable</strong> — stop work immediately. Do not touch the
                cable. Keep everyone clear. Call the DNO emergency number (105 in the UK). Do not
                attempt to repair the cable. Report the incident to the HSE under RIDDOR if there
                is an injury or a dangerous occurrence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Comparison Summary',
    content: (
      <>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">For Underground Cable Avoidance</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Industry standard:</strong> Radiodetection C.A.T4+ with Genny4 (1,200 to 1,500 pounds)</p>
              <p><strong>Professional alternative:</strong> Leica DD220 with generator (1,000 to 1,300 pounds)</p>
              <p><strong>Multi-purpose:</strong> Amprobe AT-3500 (800 to 1,000 pounds)</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">For Cable Tracing and Circuit ID</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Best:</strong> Amprobe AT-3500 (cable tracing + breaker finding in one kit)</p>
              <p><strong>Good:</strong> Fluke 2042 (cable tracing + fuse finding, Fluke quality)</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-3">For Domestic Wall Scanning</h4>
            <div className="space-y-2 text-white text-sm">
              <p><strong>Best:</strong> Bosch GMS 120 (80 to 100 pounds — reliable, three modes)</p>
              <p><strong>Budget:</strong> Stanley FatMax S300 (40 to 60 pounds — basic but functional)</p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'verdict',
    heading: 'Our Verdict',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">The Recommendation</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For excavation and groundwork: Radiodetection C.A.T4+ with Genny4.</strong> It
            is the industry standard for good reason. Main contractors require it, hire companies
            stock it, and training courses teach with it. If you do any regular excavation work,
            this is the instrument to own (or hire).
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For domestic electricians: Bosch GMS 120 + Fluke 2042 or Amprobe AT-3500.</strong>{' '}
            A wall scanner handles 90% of your indoor cable detection needs. Add a cable tracer
            like the Fluke 2042 for circuit identification and occasional outdoor cable tracing.
            The Amprobe AT-3500 combines both functions if you want one kit.
          </p>
          <p className="text-white text-sm leading-relaxed">
            <strong>The universal rule:</strong> No cable detector is 100% reliable. Always combine
            instrument detection with service drawings, safe zone awareness (BS 7671 Regulation
            522.6), visual inspection, and careful working practices. The detector reduces risk — it
            does not eliminate it.
          </p>
        </div>
        <SEOAppBridge
          title="Document cable routes and installation details"
          description="Elec-Mate's EIC certificate app records installation methods, cable routes, and protective measures as part of the Electrical Installation Certificate. Complete on site with photos and instant PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BestCableDetector2026Page() {
  return (
    <GuideTemplate
      title="Best Cable Detector 2026 | Pipe & Wire Finders UK"
      description="Honest comparison of the best cable detectors for UK electricians in 2026. Radiodetection C.A.T4+, Leica DD220, Amprobe AT-3500, Fluke 2042, and budget wall scanners compared on detection depth, accuracy, modes, and price."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Equipment Guide"
      badgeIcon={Radio}
      heroTitle={
        <>
          Best Cable Detector 2026:{' '}
          <span className="text-yellow-400">Pipe and Wire Finders for UK Electricians</span>
        </>
      }
      heroSubtitle="Avoid cable strikes, trace hidden circuits, and scan walls safely. Professional CAT scanners and budget wall detectors compared with honest buying advice."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cable Detectors"
      relatedPages={relatedPages}
      ctaHeading="Complete Certificates and Document Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EIC and EICR certificates with on-site completion and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
