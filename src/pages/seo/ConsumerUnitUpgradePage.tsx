import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Shield,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Search,
  Home,
  ClipboardCheck,
  GraduationCap,
  PoundSterling,
  Camera,
  Send,
  Receipt,
  Flame,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides' },
  { label: 'Consumer Unit Upgrade', href: '/guides/consumer-unit-upgrade' },
];

const tocItems = [
  { id: 'what-is-consumer-unit', label: 'What Is a Consumer Unit?' },
  { id: 'when-to-upgrade', label: 'When to Upgrade' },
  { id: 'metal-vs-plastic', label: 'Metal vs Plastic Consumer Units' },
  { id: 'amendment-3', label: 'Amendment 3 Requirements' },
  { id: 'afdd-spd', label: 'AFDDs and SPDs' },
  { id: 'part-p', label: 'Part P and Certification' },
  { id: 'cost-guide', label: 'Cost Guide 2026' },
  { id: 'choosing-electrician', label: 'Choosing an Electrician' },
  { id: 'for-electricians', label: 'For Electricians: CU Upgrades' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit upgrade is one of the most important electrical safety improvements you can make — replacing outdated rewirable fuses with modern MCBs, RCDs, or RCBOs that disconnect in milliseconds.',
  'Since Amendment 3 to BS 7671 (January 2016), all new or replacement consumer units in domestic premises must be housed in a non-combustible (metal) enclosure.',
  'AFDDs (Arc Fault Detection Devices) are recommended by BS 7671:2018+A2:2022 for final circuits supplying socket outlets up to 32A in specific locations — expect them to become more widely required.',
  'A consumer unit upgrade is notifiable work under Part P of the Building Regulations — it must be carried out by a registered electrician who will issue an Electrical Installation Certificate (EIC).',
  'Elec-Mate helps electricians complete consumer unit upgrades efficiently — AI board scanner reads the existing board, the app generates the EIC, and the remedial estimator prices the job.',
];

const faqs = [
  {
    question: 'How much does a consumer unit upgrade cost in the UK?',
    answer:
      'The cost of a consumer unit upgrade depends on the number of circuits, the type of devices fitted (MCBs, RCBOs, AFDDs), and the condition of the existing installation. As a rough guide: a basic consumer unit upgrade (replacing a like-for-like board with MCBs and dual RCD protection) typically costs £500 to £800 including labour and materials. An upgrade with full RCBO protection (individual RCD protection for every circuit) typically costs £700 to £1,200. An upgrade that includes AFDDs on selected circuits adds approximately £50 to £80 per AFDD. These prices assume the existing cabling, earthing, and bonding are adequate. If the earthing arrangement needs upgrading (for example, fitting a TT earth rod system or upgrading the main earth conductor), or if the meter tails need replacing, additional costs will apply. Always get a detailed written quote that specifies exactly what is included — the board, the devices, earthing and bonding checks, Building Control notification, and the EIC.',
  },
  {
    question: 'Do I need a metal consumer unit by law?',
    answer:
      'Amendment 3 to BS 7671 (effective from January 2016) requires that all new or replacement consumer units in domestic premises must be enclosed in a non-combustible enclosure. In practice, this means a metal consumer unit. The amendment was introduced following research by the Chief Fire Officers Association that showed plastic consumer units were more likely to contribute to fire spread if an internal fault caused overheating or arcing. The requirement applies to new installations and replacements — you are not required by law to replace an existing plastic consumer unit if no other work is being done. However, if your consumer unit is being replaced for any reason (upgrading protection devices, adding circuits, or following an unsatisfactory EICR), the replacement must be a metal unit. Many electricians recommend upgrading a plastic consumer unit as part of any significant work on the installation, even if the regulations do not strictly require it, because the safety benefit is substantial.',
  },
  {
    question: 'What is the difference between an MCB, RCD, and RCBO?',
    answer:
      'These three devices provide different types of protection: An MCB (Miniature Circuit Breaker) protects against overload and short circuit by disconnecting the circuit when the current exceeds its rating. An RCD (Residual Current Device) protects against earth faults by detecting an imbalance between the live and neutral conductors — if current is "leaking" to earth (for example, through a person receiving a shock), the RCD trips in milliseconds. An RCD does not protect against overload or short circuit. An RCBO (Residual Current Breaker with Overcurrent protection) combines both functions in a single device — it protects against overload, short circuit, and earth faults. RCBOs are fitted individually to each circuit, meaning a fault on one circuit does not trip the RCD for other circuits. This is the main advantage over a split-load board where one RCD protects multiple circuits. A full RCBO board is the premium option for domestic installations, providing maximum discrimination and convenience.',
  },
  {
    question: 'What is an AFDD and do I need one?',
    answer:
      'An AFDD (Arc Fault Detection Device) detects dangerous arcing faults — electrical sparks caused by damaged cables, loose connections, or deteriorating insulation. Arcing faults can cause fires that conventional MCBs and RCDs may not detect, because the fault current may be too low to trip the overcurrent protection but hot enough to ignite surrounding materials. BS 7671:2018+A2:2022 (Regulation 421.1.7) recommends AFDDs for final circuits supplying socket outlets with a rated current not exceeding 32A in specific locations including higher-risk premises (buildings with sleeping accommodation, buildings constructed with combustible materials, locations with fire risk from stored materials, and locations with irreplaceable goods). AFDDs are currently a recommendation rather than a mandatory requirement in the UK, but many electricians expect them to become mandatory in future amendments. They are already required in several European countries. If you are upgrading your consumer unit, fitting AFDDs on bedroom and living room socket circuits is a sensible precaution.',
  },
  {
    question: 'Can I add more circuits to my existing consumer unit?',
    answer:
      'This depends on whether your consumer unit has spare ways (empty positions for additional MCBs or RCBOs). If there are spare ways available and the existing board is suitable (metal enclosure, adequate busbar rating, and appropriate RCD protection), an electrician can add circuits to the existing unit. However, if the consumer unit is full, has no spare ways, is a plastic enclosure, or is an older board without adequate protection, you will need a full consumer unit upgrade to accommodate the additional circuits. Adding a new circuit is notifiable work under Part P and requires an electrician registered with a competent person scheme. The electrician must issue an Electrical Installation Certificate (EIC) for the new circuit and notify Building Control. Adding a secondary consumer unit alongside the existing one is possible but generally not recommended — a single, properly sized main consumer unit is the better approach for domestic installations.',
  },
  {
    question: 'How long does a consumer unit upgrade take?',
    answer:
      'A straightforward consumer unit upgrade typically takes one full day — approximately 6 to 8 hours. This includes isolating the supply, disconnecting all circuits from the existing board, fitting the new consumer unit, reconnecting all circuits, testing every circuit (continuity, insulation resistance, earth fault loop impedance, RCD operation), completing the Electrical Installation Certificate, and restoring the supply. If additional work is required (upgrading earthing and bonding, replacing meter tails, adding circuits, or remedying defects found during the work), the job may take a day and a half or two days. The property will be without electricity for most of the day while the changeover takes place — plan accordingly. The electrician should let you know the expected duration and when the power will be off.',
  },
  {
    question: 'What is an SPD and should my consumer unit have one?',
    answer:
      'An SPD (Surge Protection Device) protects your electrical installation and connected equipment against transient overvoltages — voltage spikes caused by lightning strikes, switching of heavy loads on the network, or faults on the electricity supply. These surges can damage sensitive electronic equipment (computers, routers, smart home devices, TVs) and can also damage the fixed installation itself. BS 7671:2018+A2:2022 (Regulation 443.4) requires a risk assessment for transient overvoltages and requires SPD protection where the consequence of an overvoltage could cause serious injury, loss of life, or disruption to public services. For domestic installations, an SPD is required where the property has a lightning protection system, or where the risk assessment indicates that the consequences of a surge warrant protection. In practice, many electricians now recommend fitting an SPD as standard during a consumer unit upgrade — the cost is modest (£40 to £80 for the device) and the protection for expensive electronics is valuable.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Full guide to BS 7671 requirements for consumer units, SPDs, AFDDs, and non-combustible enclosures.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What electrical work requires notification, competent person schemes, and Building Control.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/guides/afdd-guide',
    title: 'AFDD Guide',
    description:
      'Arc Fault Detection Devices — how they work, where they are required, and BS 7671 recommendations.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-at-home',
    title: 'Electrical Safety at Home',
    description: 'When to call an electrician, DIY limits, danger signs, and EICR for homeowners.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type and guidance on what to charge.',
    icon: PoundSterling,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-consumer-unit',
    heading: 'What Is a Consumer Unit?',
    content: (
      <>
        <p>
          A consumer unit — commonly called a fuse box, fuse board, or distribution board — is the
          central control point for your home's electrical installation. It receives the incoming
          supply from the electricity meter and distributes it to individual circuits throughout the
          property: lighting, socket outlets, cooker, shower, and any other dedicated circuits.
        </p>
        <p>
          The consumer unit houses the protective devices that keep you safe. Modern consumer units
          contain MCBs (miniature circuit breakers) that automatically disconnect a circuit if it is
          overloaded or short-circuited, and RCDs or RCBOs that detect earth leakage (current
          flowing where it should not, such as through a person) and disconnect the circuit in
          milliseconds.
        </p>
        <p>
          If your consumer unit still has rewirable fuses — where a piece of fuse wire melts to
          disconnect the circuit — or if it has a wooden back board, no RCD protection, or a plastic
          enclosure, it is seriously outdated and a safety risk. Upgrading the consumer unit is the
          single most impactful electrical safety improvement you can make to your home.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-upgrade',
    heading: 'When to Upgrade Your Consumer Unit',
    content: (
      <>
        <p>
          There is no fixed legal requirement for homeowners to upgrade their consumer unit, but
          there are several situations where an upgrade is essential, strongly recommended, or
          required by the regulations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The board has rewirable fuses.</strong> Rewirable fuses provide
                significantly less protection than MCBs. They can be incorrectly rewired with the
                wrong rating fuse wire, they are slower to disconnect, and they provide no earth
                fault protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection.</strong> If your consumer unit does not have an RCD or
                RCBOs, your circuits lack the earth leakage protection that saves lives. This is
                especially critical for socket circuits and outdoor circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure.</strong> Pre-2016 consumer units in plastic enclosures do
                not meet the current requirement for non-combustible enclosures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adding new circuits.</strong> If you need additional circuits (EV charger,
                electric shower, extension) and the existing board has no spare ways or is
                inadequate, an upgrade is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR recommendation.</strong> An{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> identifying
                the consumer unit as a C2 (Potentially Dangerous) or C3 (Improvement Recommended)
                observation is a clear signal that an upgrade is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signs of damage or overheating.</strong> Scorch marks, melted plastic,
                discolouration, or a burning smell from the consumer unit require immediate
                investigation and likely replacement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'metal-vs-plastic',
    heading: 'Metal vs Plastic Consumer Units',
    content: (
      <>
        <p>
          Before January 2016, consumer units could be housed in plastic enclosures. Amendment 3 to{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          changed this. All new or replacement consumer units in domestic premises must now be in a
          non-combustible enclosure — which in practice means a metal unit.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Metal (Required)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Non-combustible enclosure — will not contribute to fire spread</li>
              <li>Required by BS 7671 for all new and replacement domestic consumer units</li>
              <li>Meets the recommendations of the Chief Fire Officers Association</li>
              <li>Contains an internal arc fault to the metal enclosure</li>
              <li>Slightly more expensive than plastic — typically £20 to £40 more for the unit</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Plastic (Legacy)</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Combustible material — can contribute to fire spread</li>
              <li>No longer permitted for new installations or replacements</li>
              <li>
                Existing plastic units are not required to be replaced unless other work triggers a
                change
              </li>
              <li>
                Research showed plastic units could ignite and spread fire from internal arc faults
              </li>
              <li>If your property has one, consider upgrading to metal as a safety improvement</li>
            </ul>
          </div>
        </div>
        <p>
          If your property has a plastic consumer unit that is otherwise functioning correctly and
          has adequate protection (MCBs and RCDs), there is no legal requirement to replace it
          immediately. However, if any work is done on the consumer unit — even adding a single
          circuit — the entire unit must be replaced with a metal enclosure.
        </p>
      </>
    ),
  },
  {
    id: 'amendment-3',
    heading: 'Amendment 3 Requirements for Consumer Units',
    content: (
      <>
        <p>
          Amendment 3 to{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">BS 7671</SEOInternalLink>{' '}
          (effective from January 2016) introduced several important changes for domestic consumer
          units. Any consumer unit upgrade must comply with these requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-combustible enclosure (Regulation 421.1.201)</strong> — all consumer
                units and similar switchgear in domestic premises must be enclosed in a
                non-combustible material (typically steel). This applies to new installations and
                replacements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection on all circuits</strong> — every circuit in a domestic
                installation should have RCD protection with a rated residual operating current not
                exceeding 30mA. This can be achieved with a split-load board (two RCDs protecting
                groups of circuits) or with individual RCBOs for each circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables concealed in walls</strong> — Regulation 522.6.202 requires
                additional protection (30mA RCD) for cables concealed in walls at a depth of less
                than 50mm, unless the cables are run in prescribed zones or are protected by earthed
                metallic covering.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These requirements mean that a modern consumer unit upgrade typically involves a metal
          enclosure, RCBO or dual-RCD protection on all circuits, and verification that the cable
          installation meets the concealed cable protection requirements.
        </p>
      </>
    ),
  },
  {
    id: 'afdd-spd',
    heading: 'AFDDs and SPDs: Additional Protection',
    content: (
      <>
        <p>
          Modern consumer units can include two additional types of protection device that go beyond
          the standard MCB/RCD/RCBO arrangement: AFDDs (Arc Fault Detection Devices) and SPDs (Surge
          Protection Devices).
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Flame className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AFDD — Arc Fault Detection Device</h4>
                <p className="text-white text-sm leading-relaxed">
                  AFDDs detect dangerous arcing faults — electrical sparks caused by damaged cables,
                  loose connections, or crushed wiring. These arcing faults can start fires that
                  normal MCBs and RCDs will not detect. BS 7671:2018+A2:2022 recommends AFDDs on
                  socket circuits up to 32A in higher-risk locations. Currently a recommendation —
                  expected to become mandatory in future amendments. Cost: approximately £50 to £80
                  per device.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">SPD — Surge Protection Device</h4>
                <p className="text-white text-sm leading-relaxed">
                  SPDs protect against transient voltage surges from lightning, network switching,
                  or supply faults. They divert surge energy safely to earth, protecting your
                  electrical installation and connected equipment. BS 7671 requires a risk
                  assessment and recommends SPDs where the consequences of a surge warrant
                  protection. A Type 2 SPD is fitted at the consumer unit. Cost: approximately £40
                  to £80 for the device.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Both AFDDs and SPDs are relatively inexpensive to include during a consumer unit upgrade.
          Discuss them with your electrician — the additional protection they provide is well worth
          the modest extra cost.
        </p>
        <SEOAppBridge
          title="Price consumer unit upgrades accurately"
          description="Elec-Mate's remedial estimator prices every component — the board, MCBs, RCBOs, AFDDs, SPDs, earthing, and labour. Generate a professional quote for the customer on site, with materials and margin calculated automatically."
          icon={Receipt}
        />
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P: Certification Requirements',
    content: (
      <>
        <p>
          A consumer unit upgrade is{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            notifiable work under Part P
          </SEOInternalLink>{' '}
          of the Building Regulations in England and Wales. This means:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The work must be carried out by a registered electrician</strong> — a
                contractor registered with NICEIC, NAPIT, or ELECSA who can self-certify the work
                under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>An Electrical Installation Certificate (EIC) must be issued</strong> — this
                is the formal certificate confirming the new installation complies with BS 7671. It
                includes the design, construction, and inspection and testing information.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control must be notified</strong> — the registered electrician does
                this automatically through their competent person scheme. You will receive a
                Building Regulations Compliance Certificate from the local authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep the certificates</strong> — the EIC and Building Regulations Compliance
                Certificate are important documents. Keep them with your property deeds. They may be
                required when selling the property.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If a consumer unit upgrade is carried out by an unregistered electrician without Building
          Control approval, the homeowner can face enforcement action and difficulty selling the
          property. Always check that the electrician is registered with a competent person scheme
          before the work begins.
        </p>
      </>
    ),
  },
  {
    id: 'cost-guide',
    heading: 'Consumer Unit Upgrade Cost Guide 2026',
    content: (
      <>
        <p>
          Consumer unit upgrade costs vary by location, number of circuits, and the specification of
          the new board. Here are typical prices for 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic upgrade (MCBs + dual RCD):</strong> £500 to £800. Metal consumer unit
                with MCBs and two RCDs (split-load arrangement). Suitable for smaller installations
                with fewer circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full RCBO board:</strong> £700 to £1,200. Metal consumer unit with
                individual RCBOs for every circuit. Maximum discrimination — a fault on one circuit
                does not affect others. The recommended option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO board with AFDDs:</strong> £900 to £1,500. Full RCBO board plus AFDDs
                on selected socket circuits. The premium option with the highest level of fire
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional earthing and bonding work:</strong> £100 to £300 extra if the
                main earth, bonding conductors, or earth electrode need upgrading.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All prices include labour, materials, testing, the Electrical Installation Certificate,
          and Building Control notification. Prices are higher in London and the South East and
          lower in other regions. Always get at least three written quotes and check the
          electrician's registration with a competent person scheme.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician for Your Consumer Unit Upgrade',
    content: (
      <>
        <p>
          A consumer unit upgrade is a safety-critical job that must be done right. Here is what to
          look for when choosing an electrician:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered with a competent person scheme</strong> —{' '}
                <SEOInternalLink href="/guides/why-choose-niceic-electrician">
                  NICEIC
                </SEOInternalLink>
                , NAPIT, or ELECSA. This is non-negotiable for notifiable work under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detailed written quote</strong> — specifying the make and model of the
                consumer unit, the type of devices (MCBs, RCBOs, AFDDs), earthing and bonding
                checks, and the certificates that will be issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — at least £2 million cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Will issue an EIC</strong> — not a Minor Works Certificate. A consumer unit
                upgrade is new work and requires an EIC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Avoid electricians who quote significantly below the market rate — they may be cutting
          corners on the specification of the consumer unit, the quality of the devices, or the
          thoroughness of the testing.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Efficient CU Upgrades with Elec-Mate',
    content: (
      <>
        <p>
          Consumer unit upgrades are one of the most common jobs in domestic electrical work. They
          are straightforward for a competent electrician but involve significant paperwork: the EIC
          requires design information, a schedule of test results for every circuit, and all the
          installation details.
        </p>
        <p>Elec-Mate eliminates the admin and lets you complete the entire workflow on site:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the existing consumer unit before you start. The AI reads the MCB
                  ratings and circuit descriptions, giving you a baseline for the upgrade. Then
                  photograph the new board after installation for the certificate record.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site. Voice-enter test results
                  as you test each circuit. The app validates every entry against BS 7671 maximum
                  values. Export as a professional PDF and send to the customer before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete CU upgrades end-to-end on your phone"
          description="Join 430+ UK electricians creating professional EICs with AI board scanning, voice test entry, and instant PDF delivery. Complete the certificate before you leave the job. 7-day free trial."
          icon={Camera}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitUpgradePage() {
  return (
    <GuideTemplate
      title="Consumer Unit Upgrade | Cost, Regulations & Guide UK"
      description="Complete guide to consumer unit upgrades in the UK. When to upgrade, metal vs plastic requirements, Amendment 3, AFDDs and SPDs, Part P certification, cost guide 2026, and choosing a qualified electrician."
      datePublished="2025-05-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Consumer Unit Upgrade:{' '}
          <span className="text-yellow-400">Cost, Regulations, and Complete Guide</span>
        </>
      }
      heroSubtitle="Your consumer unit is the heart of your home's electrical safety. This guide covers when to upgrade, the difference between metal and plastic enclosures, Amendment 3 requirements, AFDDs and SPDs, Part P certification, and what you should expect to pay in 2026."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Upgrades"
      relatedPages={relatedPages}
      ctaHeading="Professional EICs for Consumer Unit Upgrades"
      ctaSubheading="Join 430+ UK electricians completing Electrical Installation Certificates on their phones. AI board scanner, voice test entry, and instant delivery. 7-day free trial, cancel anytime."
    />
  );
}
