import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Shield,
  Activity,
  Gauge,
  AlertTriangle,
  Calculator,
  FileCheck2,
  GraduationCap,
  Mic,
  ShieldCheck,
  PoundSterling,
  Camera,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides/electrical-testing-guide' },
  { label: 'RCBO vs RCD+MCB', href: '/guides/rcbo-vs-rcd-mcb' },
];

const tocItems = [
  { id: 'rcbo-vs-rcd-overview', label: 'RCBO vs RCD + MCB: Overview' },
  { id: 'how-split-load-works', label: 'How a Split-Load Board Works' },
  { id: 'how-rcbo-board-works', label: 'How an RCBO Board Works' },
  { id: 'cost-comparison', label: 'Cost Comparison' },
  { id: 'nuisance-tripping', label: 'Nuisance Tripping Advantage' },
  { id: 'fault-finding', label: 'Fault Finding and Diagnosis' },
  { id: 'consumer-unit-trends', label: 'Consumer Unit Design Trends' },
  { id: 'when-to-use-which', label: 'When to Use Which Arrangement' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An RCBO combines RCD and MCB protection in a single device per circuit, providing individual earth fault and overcurrent protection for each circuit independently.',
  'A split-load board uses shared RCDs protecting groups of circuits with individual MCBs — cheaper upfront but any earth fault trips all circuits on that RCD.',
  'Full RCBO boards cost approximately £60 to £150 more than equivalent split-load boards, but the improved discrimination eliminates nuisance tripping and reduces call-back costs.',
  'Consumer unit design in the UK is trending strongly towards full RCBO boards — most major manufacturers now offer RCBO boards as their standard domestic product.',
  'Elec-Mate captures the protection arrangement (RCBO, RCD+MCB, or fuse) for every circuit on the EICR and EIC, and the AI board scanner identifies the devices from a photo.',
];

const faqs = [
  {
    question: 'Is an RCBO board required by BS 7671?',
    answer:
      'No. BS 7671 does not mandate RCBO boards. The regulations require that circuits have appropriate overcurrent protection (MCB or fuse) and, where required, RCD protection (30mA for socket outlets up to 32A, mobile equipment outdoors, and cables in walls). How you achieve this — with individual RCBOs or with shared RCDs and separate MCBs — is a design choice. Both arrangements are compliant. However, BS 7671 Regulation 314.1 does require that the design minimises inconvenience in the event of a fault, which arguably favours RCBO boards because a fault on one circuit does not affect others. In practice, both arrangements are widely accepted by competent person schemes and building control.',
  },
  {
    question: 'How much more does an RCBO board cost than a split-load board?',
    answer:
      'The cost difference depends on the number of circuits and the manufacturer. A typical domestic installation has 8 to 12 circuits. A Type A RCBO costs approximately £25 to £50 per device, while a standard MCB costs approximately £5 to £10. So replacing 10 MCBs with 10 RCBOs adds approximately £150 to £400 in device costs. However, the split-load board also needs two RCDs (approximately £25 to £40 each), so the total additional cost for the RCBO board is typically £100 to £350. When you factor in the reduced call-back rate (fewer nuisance tripping complaints), the time saved during fault diagnosis, and the better customer experience, the RCBO board is generally the better commercial decision for the electrician.',
  },
  {
    question: 'Can I mix RCBOs and MCBs in the same consumer unit?',
    answer:
      'Yes, and this is a common and practical approach. Some circuits require 30mA RCD protection under BS 7671 (socket outlets up to 32A, outdoor circuits, cables in walls) while others may not. You can install RCBOs on the circuits that need RCD protection and standard MCBs on circuits that do not. However, many electricians now install RCBOs on every circuit regardless of the BS 7671 requirement, because the additional protection and discrimination benefit is worth the modest extra cost. Some consumer unit enclosures are specifically designed for a mix of RCBOs and MCBs — for example, with RCBO positions on one side and MCB positions (behind a shared RCD) on the other.',
  },
  {
    question: 'Do RCBOs take up more space in the consumer unit?',
    answer:
      'Yes. A standard single-pole MCB is one module wide (typically 17.5mm or 18mm on a DIN rail). Most single-pole RCBOs are also one module wide, but some older or higher-rated RCBOs are 1.5 or 2 modules wide. In a split-load board, you also need to accommodate the RCDs, which are typically 2 modules wide each. In practice, a full RCBO board and a split-load board of the same capacity (same number of circuits) usually require similar enclosure sizes. The main space consideration is the overall number of ways — ensure the enclosure has enough ways for all the devices you need, plus spare ways for future circuits. BS 7671 recommends at least two spare ways in any new consumer unit.',
  },
  {
    question: 'What happens to the freezer circuit when the RCD trips on a split-load board?',
    answer:
      'This is one of the strongest arguments for RCBO boards. On a split-load board, an earth fault on any circuit (for example, a faulty kettle) will trip the shared RCD, disconnecting every circuit on that side of the board — including the freezer, fridge, burglar alarm, and any other essential circuits sharing that RCD. If the occupants are away from home (on holiday, at work), the food in the freezer may defrost and spoil, the fridge contents will warm, and the burglar alarm will go offline. With an RCBO board, the faulty kettle trips only the kitchen socket RCBO. The freezer, fridge, and every other circuit continue to operate unaffected. This single advantage alone is often enough to justify the additional cost of an RCBO board to homeowners.',
  },
  {
    question: 'Are dual-RCD split-load boards being phased out?',
    answer:
      'They are not being phased out by regulation, but the market trend is strongly towards full RCBO boards. Most major consumer unit manufacturers (Hager, Schneider, MK, Wylex, Contactum) now offer RCBO boards as their standard product and have expanded their RCBO ranges significantly. Dual-RCD split-load boards are still available and still compliant with BS 7671, but they are increasingly seen as the budget option. Many electrical wholesalers report that RCBO board sales now exceed split-load board sales. The driving factors are the nuisance tripping elimination, better fault diagnosis, and the expectation from homeowners and landlords for modern installations that do not trip the entire house when one circuit faults.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description:
      'Type AC, A, B, F, and S — which type to specify for each circuit and why it matters.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/mcb-types-b-c-d-explained',
    title: 'MCB Types B, C and D',
    description: 'Magnetic trip characteristics and when to use each type of circuit breaker.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Amendment 3 requirements, metal enclosures, and consumer unit replacement regulations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/maximum-zs-values-bs-7671',
    title: 'Maximum Zs Values BS 7671',
    description:
      'Complete Table 41.3 and 41.4 reference — maximum Zs applies whether the device is an MCB or RCBO.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates with AI board scanning that identifies RCBOs and MCBs automatically.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'rcbo-vs-rcd-overview',
    heading: 'RCBO vs RCD + MCB: What Is the Difference?',
    content: (
      <>
        <p>
          There are two fundamentally different ways to provide both earth fault (RCD) and
          overcurrent (MCB) protection for the circuits in an electrical installation. The choice
          between them affects the cost, the resilience, the ease of fault diagnosis, and the
          end-user experience.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">RCBO (Per Circuit)</h3>
            <p className="text-white text-sm leading-relaxed">
              An RCBO (Residual Current Breaker with Overcurrent protection) combines both functions
              in a single device. Each circuit gets its own RCBO, which provides independent earth
              fault and overcurrent protection. A fault on one circuit trips only that RCBO — every
              other circuit stays energised and unaffected.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">RCD + MCB (Split-Load)</h3>
            <p className="text-white text-sm leading-relaxed">
              A split-load board uses one or two shared RCDs, each protecting a group of circuits.
              Each individual circuit has its own MCB for overcurrent protection, but the earth
              fault protection is shared across the group. A fault on any circuit in the group trips
              the shared RCD, disconnecting every circuit on that side of the board.
            </p>
          </div>
        </div>
        <p>
          Both arrangements comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          provided the correct{' '}
          <SEOInternalLink href="/guides/rcd-types-explained">RCD type</SEOInternalLink> and rating
          are used. The difference is in how the installation behaves when a fault occurs — and this
          is where the RCBO board has a significant practical advantage.
        </p>
      </>
    ),
  },
  {
    id: 'how-split-load-works',
    heading: 'How a Split-Load Consumer Unit Works',
    content: (
      <>
        <p>
          A dual-RCD split-load consumer unit is the traditional arrangement that has been standard
          in UK domestic installations for over 15 years. The board is divided into two sides (or
          sometimes three), each protected by a separate RCD. The circuits are distributed between
          the RCDs, with critical circuits (lighting, fire alarm, freezer) ideally split across both
          sides so that a trip on one RCD does not plunge the entire house into darkness or silence
          the fire alarm.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Typical Split-Load Arrangement</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD 1 (63A 30mA):</strong> Upstairs lighting, downstairs sockets, cooker,
                immersion heater.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD 2 (63A 30mA):</strong> Downstairs lighting, upstairs sockets, shower,
                outdoor circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The idea is that if one RCD trips, you still have lighting and some sockets from the other
          side. In practice, this circuit allocation is often not done carefully enough, and
          homeowners are left in the dark or without any working sockets when one RCD trips. The
          fundamental problem remains: a fault on any single circuit takes out half the board.
        </p>
        <p>
          Some installations use a 100mA Type S (time-delayed) RCD as the main switch, with 30mA
          RCDs or RCBOs downstream. This provides better discrimination — the 100mA Type S is less
          sensitive and has a time delay, so the downstream 30mA device trips first. However, this
          adds cost and complexity, and does not solve the problem of shared 30mA RCDs tripping
          multiple circuits.
        </p>
      </>
    ),
  },
  {
    id: 'how-rcbo-board-works',
    heading: 'How an RCBO Consumer Unit Works',
    content: (
      <>
        <p>
          A full RCBO board eliminates the shared RCD entirely. Each circuit has its own RCBO, which
          provides both earth fault (30mA) and overcurrent protection independently. The main switch
          is either a simple isolator (non-RCD) or a 100mA Type S RCD that provides upstream fire
          protection and a secondary backup.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Benefits of Full RCBO Board</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete discrimination.</strong> A fault on any circuit trips only that
                circuit's RCBO. The kitchen socket faults — the lights stay on, the freezer keeps
                running, the alarm stays active, the boiler keeps heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No cumulative leakage issues.</strong> Each RCBO monitors only its own
                circuit. There is no risk of combined standing leakage from multiple circuits
                pushing the total above the 30mA trip threshold. Nuisance tripping from cumulative
                leakage is eliminated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Instant fault identification.</strong> When an RCBO trips, you know
                immediately which circuit has the fault. No isolation-and-reset sequence needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexibility in RCD types.</strong> Each RCBO can be a different type —{' '}
                <SEOInternalLink href="/guides/rcd-types-explained">
                  Type A for general circuits, Type F for a heat pump, Type B for an EV charger
                </SEOInternalLink>
                . On a split-load board, the shared RCD type applies to every circuit on that side.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="AI board scanner identifies every RCBO and MCB"
          description="Point your phone at the consumer unit. Elec-Mate's AI board scanner reads every device — RCBO, MCB, RCD, isolator — identifying type (A, B, F), rating, and manufacturer. The EICR schedule populates automatically. No writing anything down."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'cost-comparison',
    heading: 'Cost Comparison: RCBO Board vs Split-Load Board',
    content: (
      <>
        <p>
          Cost is the main reason split-load boards persist. The price difference is real — but it
          is smaller than many electricians assume, and the total cost of ownership (including
          call-backs) often favours the RCBO board.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">
            Cost Breakdown — 10-Way Domestic Installation
          </h4>
          <div className="space-y-3 text-white">
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 font-bold text-yellow-400 text-sm">
              <span>Component</span>
              <span>Split-Load</span>
              <span>RCBO Board</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-sm">
              <span>Enclosure</span>
              <span>£40 - £80</span>
              <span>£50 - £100</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-sm">
              <span>Main switch</span>
              <span>£15 - £30</span>
              <span>£15 - £30</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-sm">
              <span>2x RCDs (63A 30mA)</span>
              <span>£50 - £80</span>
              <span>Not needed</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/10 text-sm">
              <span>10x MCBs / 10x RCBOs</span>
              <span>£50 - £100</span>
              <span>£250 - £500</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-2 font-bold text-yellow-400 text-sm">
              <span>Total devices</span>
              <span>£155 - £290</span>
              <span>£315 - £630</span>
            </div>
          </div>
        </div>
        <p>
          The RCBO board costs approximately £160 to £340 more in devices. But consider the
          commercial picture: one call-back to a nuisance-tripping split-load board costs the
          electrician 1-2 hours of time (£50 to £120) plus fuel and disruption. Two call-backs and
          the RCBO board has paid for itself. Many electricians report that switching to RCBO boards
          as standard has virtually eliminated nuisance tripping call-backs.
        </p>
        <p>
          From the homeowner's perspective, the additional cost of an RCBO board (typically £100 to
          £200 on a consumer unit replacement quote) is a modest premium for a significantly better
          installation that eliminates the frustration of half the house tripping when one appliance
          faults.
        </p>
      </>
    ),
  },
  {
    id: 'nuisance-tripping',
    heading: 'The Nuisance Tripping Advantage',
    content: (
      <>
        <p>
          Nuisance tripping is the single biggest complaint electricians receive after a consumer
          unit installation. On a split-load board, the shared RCD sees the combined earth leakage
          from every circuit on its side of the board. Each circuit has a small natural leakage —
          typically 2 to 8 milliamps per circuit depending on the loads. With 5 or 6 circuits on one
          RCD, the combined standing leakage can reach 15 to 25 milliamps. Add a brief transient
          leakage event (switching on an appliance, a surge, moisture in an outdoor circuit) and the
          total exceeds the 30mA threshold — the RCD trips.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cumulative leakage:</strong> 6 circuits at 4mA each = 24mA standing leakage.
                One appliance switching on adds a 10mA transient. Total: 34mA. The 30mA RCD trips.
                No single circuit is faulty — it is the combination that causes the problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO solution:</strong> Each RCBO sees only its own circuit's leakage. A
                single circuit with 4mA standing leakage is nowhere near the 30mA threshold. Even a
                10mA transient on that circuit only brings the total for that RCBO to 14mA — well
                below the trip point. Nuisance tripping from cumulative leakage is physically
                impossible on an RCBO board.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The nuisance tripping problem gets worse over time. As the installation ages, insulation
          deteriorates slightly, increasing leakage. As the homeowner adds more electronic equipment
          (each with its own small leakage), the combined total creeps closer to 30mA. An
          installation that was fine when new may start nuisance-tripping after a few years. RCBO
          boards are immune to this ageing effect because each device monitors only one circuit.
        </p>
      </>
    ),
  },
  {
    id: 'fault-finding',
    heading: 'Fault Finding: RCBO Makes It Easy',
    content: (
      <>
        <p>
          When a shared RCD trips on a split-load board, the homeowner sees half the house go dark.
          They reset the RCD. It trips again. Or it stays on but trips again later. They call the
          electrician. The electrician arrives and must now identify which of the 5 or 6 circuits on
          that RCD is causing the fault.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Fault Finding on a Split-Load Board</h4>
          <ol className="space-y-3 text-white list-decimal list-inside">
            <li>Switch off all MCBs on the affected RCD side.</li>
            <li>Reset the RCD.</li>
            <li>Switch on one MCB at a time.</li>
            <li>When the RCD trips, the last MCB you switched on identifies the faulty circuit.</li>
            <li>
              If the RCD does not trip with any individual MCB, the fault may be caused by
              cumulative leakage — switch on MCBs in combinations until the RCD trips.
            </li>
            <li>
              Once the faulty circuit is identified, disconnect loads one at a time to determine
              whether the fault is in the fixed wiring or a connected appliance.
            </li>
          </ol>
        </div>
        <p>
          This process can take 30 minutes or more. If the fault is intermittent, it may not
          reproduce during the visit, leading to a wasted call-out and a frustrated customer.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Fault Finding on an RCBO Board</h4>
          <p className="text-white text-sm leading-relaxed">
            The RCBO that tripped identifies the faulty circuit immediately. No isolation sequence
            needed. The electrician goes straight to the correct circuit and begins investigating.
            The fault-finding process that took 30 minutes on a split-load board takes 30 seconds on
            an RCBO board.
          </p>
        </div>
        <SEOAppBridge
          title="Voice test entry for EICR schedule of tests"
          description="Whether the board has RCBOs or shared RCDs, Elec-Mate records the protection arrangement for every circuit. Speak your test results — 'RCBO 1, Type A, 30 milliamp, trip time positive 22 milliseconds' — and the schedule fills in automatically. 50+ calculators validate every reading against BS 7671."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'consumer-unit-trends',
    heading: 'Consumer Unit Design Trends in the UK',
    content: (
      <>
        <p>
          The UK consumer unit market has shifted significantly over the past five years. The trend
          is clear: full RCBO boards are becoming the standard, and split-load boards are
          increasingly seen as the budget option.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manufacturer focus:</strong> Hager, Schneider, MK, and Wylex have all
                expanded their RCBO product ranges and marketing. Several manufacturers now offer
                pre-populated RCBO boards (with RCBOs already fitted) as their flagship domestic
                product.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wholesaler trends:</strong> Electrical wholesalers report that RCBO board
                sales now match or exceed split-load board sales in many regions, with the gap
                widening year on year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger influence:</strong> The growth of EV charger installations has
                pushed electricians towards RCBO boards because the EV circuit often requires a
                specific{' '}
                <SEOInternalLink href="/guides/rcd-types-explained">
                  RCD type (Type A or Type B)
                </SEOInternalLink>{' '}
                that is most easily achieved with an individual RCBO rather than fitting a specific
                RCD type for the entire side of a split-load board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Customer expectations:</strong> Homeowners are increasingly aware of the
                nuisance tripping issue and specifically request RCBO boards. Landlords appreciate
                the reduced call-back risk. Commercial clients expect individual circuit protection
                as standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost of RCBOs has also decreased as production volumes have increased, making the
          price premium over split-load boards smaller each year. Type A RCBOs from major
          manufacturers are now available from £25 to £35 in wholesale quantities — making a full
          RCBO board an easy specification for most domestic installations.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-use-which',
    heading: 'When to Use Which Arrangement',
    content: (
      <>
        <p>
          While RCBO boards are the better technical solution in most cases, there are some
          scenarios where a split-load board may still be appropriate, and some where an RCBO board
          is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use an RCBO board when:</strong> The installation has an EV charger
                requiring a specific RCD type. The installation has known nuisance tripping issues.
                The customer wants the best possible installation. The installation has critical
                circuits (medical equipment, home office, security systems, freezers). The
                electrician wants to minimise call-back risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>A split-load board may be acceptable when:</strong> Budget is the absolute
                priority. The installation is small (4 to 6 circuits) with minimal cumulative
                leakage risk. The installation is in a property with very few electronic loads
                (increasingly rare).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regardless of which arrangement you choose, the important thing is that every circuit has
          the correct level of protection — the correct{' '}
          <SEOInternalLink href="/guides/mcb-types-b-c-d-explained">MCB type</SEOInternalLink> and
          rating for the cable and load, and the correct RCD type and sensitivity where required by
          BS 7671. Record the protection arrangement clearly on the{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            electrical certificate
          </SEOInternalLink>{' '}
          (EIC or EICR) so that future inspectors can verify compliance.
        </p>
        <SEOAppBridge
          title="Capture every protection device with AI board scanning"
          description="Elec-Mate's AI board scanner reads the consumer unit from a photo — identifying every MCB, RCBO, RCD, and isolator with its type, rating, and manufacturer. The EICR and EIC schedules auto-populate. Combined with voice test entry and 50+ calculators, you complete certificates faster and more accurately."
          icon={Camera}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RCBOvsRCDMCBPage() {
  return (
    <GuideTemplate
      title="RCBO vs RCD + MCB | Which Is Better?"
      description="Complete comparison of RCBO boards vs split-load RCD+MCB consumer units for UK electricians. Cost comparison, nuisance tripping advantage, fault diagnosis, consumer unit design trends, and practical guidance on when to use each arrangement."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Protection Design"
      badgeIcon={Shield}
      heroTitle={
        <>
          RCBO vs RCD + MCB: <span className="text-yellow-400">Which Is the Better Choice?</span>
        </>
      }
      heroSubtitle="An RCBO board costs more upfront but eliminates nuisance tripping, simplifies fault diagnosis, and keeps every other circuit running when one faults. A split-load board saves money but trips half the house when one circuit fails. This guide compares both arrangements in detail."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RCBO vs RCD + MCB"
      relatedPages={relatedPages}
      ctaHeading="Scan Any Consumer Unit With AI"
      ctaSubheading="Whether it is an RCBO board or a split-load, Elec-Mate's AI board scanner reads every device from a photo. Voice test entry records results hands-free. 50+ calculators check every reading. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
