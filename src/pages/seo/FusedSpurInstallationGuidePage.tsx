import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Fused Spur Installation Guide', href: '/fused-spur-installation-guide' },
];

const tocItems = [
  { id: 'what-is-fcu', label: 'What is a Fused Connection Unit?' },
  { id: 'types', label: 'Types of FCU' },
  { id: 'when-to-use', label: 'When to Use a Fused Spur' },
  { id: 'fuse-ratings', label: 'Correct Fuse Ratings' },
  { id: 'wiring-guide', label: 'Wiring Guide' },
  { id: 'bs7671', label: 'BS 7671 Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A fused connection unit (FCU) is a fused spur outlet that provides a permanent, non-socket connection to a fixed appliance. It contains a cartridge fuse (typically 3A, 5A, or 13A) and can be switched or unswitched, with or without a flex outlet and indicator neon.',
  'FCUs are required where an appliance needs a permanent connection that cannot be unplugged — for example a dishwasher, washing machine, extractor fan, or immersion heater. They must not be positioned so the appliance blocks access for switching off.',
  'The fuse rating inside the FCU must match the rating of the appliance flex, not the ring main. A 3A fuse is appropriate for lighting loads and appliances up to 720W. A 5A fuse suits appliances up to 1,150W. A 13A fuse suits loads up to 3,000W.',
  'Under BS 7671 Regulation 537.5, every fixed appliance must have a means of isolation. A switched FCU (double-pole) satisfies this requirement and provides overcurrent protection for the appliance flex in a single unit.',
  'A spur from a ring main must be taken from a socket outlet or a junction box connected to the ring — not from another spur. Only one unfused spur is permitted per socket on a ring circuit under conventional ring main design rules.',
];

const faqs = [
  {
    question: 'Can I connect a dishwasher to a fused spur?',
    answer:
      'Yes — a fused connection unit is the recommended connection method for a built-in dishwasher. A 13A FCU (switched, with neon indicator) provides the required overcurrent protection for the appliance flex and a local isolation point. The FCU should be positioned where it is accessible without moving the dishwasher — typically inside an adjacent cupboard or on the wall above the worktop behind the dishwasher position. Connect the FCU as a spur from the ring main using a junction box or from the terminal block in a ring main socket.',
  },
  {
    question: 'What fuse rating should I use for a kitchen extractor fan?',
    answer:
      'Most kitchen extractor fans and cooker hoods have a rated current of 0.5A to 1.5A — well within the 3A fuse range. A 3A FCU is the standard choice for an extractor fan connected as a fused spur. If the hood incorporates an integral light fitting or variable speed motor, check the rating plate to confirm total load does not exceed 720W (3A at 240V). A 5A fuse is also acceptable as a more conservative choice. Never use a 13A fuse for a fan load — the fuse would provide no meaningful protection for the flex.',
  },
  {
    question: 'What is the difference between a switched and unswitched FCU?',
    answer:
      'A switched FCU incorporates a double-pole switch that disconnects both line and neutral conductors, providing a local means of isolation for the appliance without going to the consumer unit. An unswitched FCU provides overcurrent protection via the cartridge fuse but no local switching. Switched FCUs are preferred for most applications because they satisfy BS 7671 Regulation 537.2.1 (means of isolation for fixed equipment) in a single unit. Unswitched FCUs are used where the appliance has its own integral on/off switch or where isolation is provided elsewhere.',
  },
  {
    question: 'Can I take a spur from another spur?',
    answer:
      'No. Under conventional ring circuit design practice, a spur must be taken from a socket on the ring, or from a junction box connected into the ring cable. You must not take a spur from an existing spur. Doing so creates an unfused sub-circuit that may exceed the current-carrying capacity of the cables. This is a common C2 finding on EICRs. If you need multiple spurs in one area, use a junction box on the ring cable and run individual spurs from the junction box, or install a separate radial circuit.',
  },
  {
    question: 'Does an FCU need RCD protection?',
    answer:
      'Yes. Under Regulation 411.3.3 of BS 7671, all socket-outlet circuits (including FCUs supplied from a ring main) in domestic premises must be protected by a 30mA RCD. If the ring main is already RCD-protected at the consumer unit (dual-RCD board or RCBO per circuit), the FCU spur is automatically covered. If the existing installation lacks RCD protection on the ring, adding an FCU to the circuit requires the ring to be RCD-protected as part of the modification — recording the existing deficiency on the minor works certificate.',
  },
  {
    question: 'How do I wire a switched FCU for a washing machine?',
    answer:
      'Run a spur cable (typically 2.5mm\u00b2 twin and earth) from the ring main to the FCU\'s line and neutral "Supply" terminals (marked IN or MAINS). Connect the line, neutral, and earth of the appliance flex to the "Load" or "OUT" terminals on the FCU. Fit a 13A cartridge fuse in the FCU fuse carrier. Confirm the fuse matches the appliance rating plate — some washing machines specify a 13A fuse, others 10A. Earth continuity must be maintained through to the appliance body. Test polarity, earth continuity, and insulation resistance before energising.',
  },
  {
    question: 'Where should I position a fused spur for an immersion heater?',
    answer:
      'An immersion heater FCU should be positioned within easy reach of the airing cupboard or hot water cylinder, typically on the wall adjacent to the cylinder at a height of 1.2m to 1.5m. Use a 20A DP switch (often called a flex outlet plate or DP switch rather than an FCU) for immersion heaters, as immersion heaters typically draw 11A to 13A — a standard 13A FCU would operate at its rating limit. The immersion heater circuit is typically a dedicated 20A radial circuit (2.5mm\u00b2 on a 20A MCB) rather than a spur from the ring main.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Socket positions, cooker circuits, and RCD protection in kitchens.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/two-way-switch-wiring',
    title: 'Two-Way Switch Wiring Guide',
    description: 'Old and new colour codes, strappers, and intermediate switches explained.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations for rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/minor-works',
    title: 'Minor Works Certificate App',
    description: 'Issue minor works certificates instantly on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// How-To Steps
// -------------------------------------------------------------------

const howToSteps = [
  {
    name: 'Identify the correct spur point on the ring main',
    text: 'Switch off the circuit at the consumer unit and prove dead with an approved voltage indicator. Identify a suitable socket on the ring main (confirm it is on the ring, not already a spur) or install a 30A junction box in the ring cable at a convenient point. Do not use a non-standard junction — use a properly enclosed JB.',
  },
  {
    name: 'Run the spur cable',
    text: 'Use 2.5mm\u00b2 twin and earth cable for standard FCU applications. Route the cable in accordance with BS 7671 Chapter 52 — either in prescribed zones at 150mm from the floor or ceiling, or in conduit or trunking. Protect the cable mechanically where required. Leave sufficient tail length at each end.',
  },
  {
    name: 'Connect the supply side of the FCU',
    text: 'At the spur origin (socket or junction box), connect the spur cable using the appropriate terminals. At the FCU back box, connect line (brown) to the "Line In" or "Supply L" terminal, neutral (blue) to "Neutral In" or "Supply N", and earth (green/yellow) to the earth terminal. Ensure cores are sleeved correctly — earth in green/yellow.',
  },
  {
    name: 'Connect the load side of the FCU',
    text: 'Connect the appliance flex or a short length of flex (for a flex outlet plate) to the "Load" or "Out" terminals: line to "Load L", neutral to "Load N", earth to the earth terminal or the metal earth clip. Verify that the flex current rating is adequate for the appliance load.',
  },
  {
    name: 'Fit the correct fuse',
    text: 'Insert the correct BS 1362 cartridge fuse in the FCU fuse carrier: 3A (red) for loads up to 720W, 5A for loads up to 1,150W, 13A for loads up to 3,000W. Confirm the fuse rating against the appliance rating plate. Replace the fuse carrier and secure the FCU face plate.',
  },
  {
    name: 'Test and certify',
    text: 'With the circuit off, test insulation resistance between line/neutral/earth, verify polarity, and measure earth continuity from the FCU earth terminal back to the main earth terminal. Reconnect the circuit and verify correct operation of the switched FCU and the appliance. Issue a Minor Works Certificate (or EIC if the circuit is new) using the Elec-Mate app.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-fcu',
    heading: 'What is a Fused Connection Unit (FCU)?',
    content: (
      <>
        <p>
          A fused connection unit (FCU) — commonly called a fused spur — is a wiring accessory
          that provides a permanent, fused connection to a fixed electrical appliance. Unlike a
          standard socket outlet, the FCU does not have a removable plug — the appliance is
          hardwired to the load side of the FCU or connected via a short flex to a flex outlet
          plate on the FCU face.
        </p>
        <p>
          The FCU contains a cartridge fuse (BS 1362 type, identical to those used in 13A plugs)
          sized to protect the appliance flex rather than the circuit cable. This means the fuse
          provides an additional level of overcurrent protection downstream of the ring main
          protection — protecting the flex and the appliance rather than the supply cable.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FCU vs fused spur outlet</strong> — these terms are often used
                interchangeably. Strictly, an FCU is the wiring accessory (the plate with
                terminals), while a fused spur describes the circuit arrangement (spur from
                a ring main via a fuse). Both terms refer to the same physical accessory in
                common usage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not a replacement for a socket outlet</strong> — an FCU is for
                permanently connected appliances only. If the appliance will occasionally
                be moved or requires a removable connection, a standard 13A socket is more
                appropriate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'types',
    heading: 'Types of Fused Connection Unit',
    content: (
      <>
        <p>
          FCUs are available in several configurations. Choosing the right type for the
          application is important for compliance, safety, and usability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switched FCU</strong> — incorporates a double-pole rocker switch.
                Disconnects both line and neutral simultaneously. Provides a local means
                of isolation per Regulation 537.2.1. Used for dishwashers, washing machines,
                extractor fans, heated towel rails, and most kitchen appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unswitched FCU</strong> — no switch, fuse only. Used where the
                appliance has its own integral switch or where isolation is provided by
                a separate DP switch. Less common in practice since switched FCUs cost
                little more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FCU with neon indicator</strong> — includes an LED or neon lamp
                that illuminates when the switch is on or when the supply is present. Useful
                for appliances in concealed positions where it is important to know the
                appliance is energised (e.g. immersion heater, frost protection heater).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FCU with flex outlet</strong> — has a small rectangular aperture in
                the face plate through which the appliance flex emerges. The flex is connected
                to the load terminals inside the back box. Commonly used for cooker hood
                extractors and appliances where the flex routing is tight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20A DP switch / connection unit</strong> — for higher-current
                applications such as immersion heaters and some fixed heaters. Not a standard
                FCU (no cartridge fuse), but a double-pole switch for fixed loads. The circuit
                protection is provided by the MCB at the consumer unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-use',
    heading: 'When to Use a Fused Spur Instead of a Socket',
    content: (
      <>
        <p>
          The decision between a socket outlet and an FCU is not always obvious. These are the
          situations where an FCU is the appropriate choice:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Built-in dishwashers and washing machines</strong> — these appliances
                are not moved in normal use. An FCU inside the adjacent cupboard provides
                an accessible isolation point without requiring the appliance to be pulled
                out to reach a socket. The 13A fuse matches the appliance flex rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extractor fans (kitchen and bathroom)</strong> — wired as a 3A or 5A
                fused spur from the lighting circuit or ring main. The FCU protects the fan
                flex and provides isolation without entering the loft or void to access the
                consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed electric heaters and towel rails</strong> — panel heaters and
                heated towel rails installed as fixed equipment require a means of isolation.
                A switched FCU satisfies this requirement and provides flex protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor socket spurs</strong> — where a weatherproof garden socket
                is added as a spur from an indoor ring main, an FCU provides the fused
                connection point. The garden socket (IP44 minimum) is then connected as
                a load from the FCU.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underfloor heating thermostats</strong> — electric underfloor heating
                mats are commonly connected via a 13A FCU to a spur from the ring main.
                The thermostat is then wired between the FCU and the heating mat.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fuse-ratings',
    heading: 'Correct Fuse Ratings for FCUs',
    content: (
      <>
        <p>
          One of the most common mistakes with FCUs is fitting the wrong fuse rating. The
          fuse in an FCU protects the appliance flex — it should be rated as close as
          possible to (but above) the rated current of the appliance, not automatically
          set to 13A because that is the maximum.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">BS 1362 Fuse Rating Quick Reference</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3A fuse (red):</strong> appliances up to 720W — extractor fans,
                lamps, clock radios, low-wattage appliances, doorbell transformers
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5A fuse:</strong> appliances up to 1,150W — some extractor fans,
                small fridges, low-wattage heaters
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>13A fuse (brown):</strong> appliances up to 3,000W — dishwashers,
                washing machines, tumble dryers, electric heaters, microwave ovens
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always check the rating plate</strong> — do not assume a 13A fuse
                is correct for all appliances. A kitchen extractor fan with a 13A fuse has
                effectively no overcurrent protection for its flex (a 1A motor on a 13A fuse
                means the fuse will not operate until the current is 13 times higher than
                normal — well above the point at which the flex would be damaged).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671',
    heading: 'BS 7671 Requirements for FCUs',
    content: (
      <>
        <p>
          Fused connection units are covered by BS 7671:2018+A3:2024 and the relevant British
          Standard for the accessory itself (BS 1363-4 for FCUs to BS 1363). Key regulatory
          requirements include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 537.2.1 — Isolation:</strong> every fixed appliance must
                have a means of isolation, preferably a local switch adjacent to the appliance.
                A switched FCU satisfies this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3 — RCD protection:</strong> circuits supplying
                socket outlets and FCUs in domestic premises must have 30mA RCD protection.
                The spur circuit feeding the FCU must be RCD-protected at the consumer unit
                or via an inline 30mA RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 314.1 — Spur limitation:</strong> a spur from a ring
                circuit may not be connected to another spur. The number of spurs must not
                exceed the number of socket outlets and FCUs on the ring itself (for
                unfused spurs — fused spurs have no specified numerical limit per
                BS 7671, but practical loading limits apply).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conductor identification:</strong> Regulation 514.4.2 requires all
                conductors to be correctly identified. Earth conductors must be sleeved in
                green/yellow at termination points. Old red/black cable reused in a modification
                must have cores re-identified with brown and blue sleeving or tape.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes guide" />{' '}
          for common FCU-related C2 findings that arise during inspection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Certifying FCU Work',
    content: (
      <>
        <p>
          Adding an FCU as a spur from an existing ring main requires a Minor Works Certificate.
          If new cabling is installed that creates a new circuit, an Electrical Installation
          Certificate is required. Use Elec-Mate to generate compliant certificates on-site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" />{' '}
                — issue an MWC for FCU additions to existing circuits on your phone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eic-certificate" label="EIC Certificate" />{' '}
                — generate an EIC where a new dedicated circuit is installed for an appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" />{' '}
                — record any existing installation deficiencies found during the work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FusedSpurInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Fused Spur Installation Guide — UK FCU Wiring Guide 2024"
      description="Complete guide to installing fused connection units (FCUs): types, fuse ratings, when to use a fused spur, BS 7671 requirements, and step-by-step wiring for dishwashers, extractor fans, and fixed appliances."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Fused Spur Installation Guide{' '}
          <span className="text-yellow-400">— FCU Wiring Explained</span>
        </>
      }
      heroSubtitle="A complete practical guide to fused connection units (FCUs): types, correct fuse ratings, when to use a spur instead of a socket, BS 7671 requirements, and step-by-step wiring instructions."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Wire a Fused Spur — Step by Step"
      howToDescription="Follow these steps to install a switched fused connection unit as a spur from a ring main circuit."
      faqs={faqs}
      faqHeading="Fused Spur Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Issue Minor Works Certificates instantly"
      ctaSubheading="Generate compliant MWCs and EICs for FCU installations on your phone with Elec-Mate."
    />
  );
}
