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
  { label: 'Two-Way Switch Wiring', href: '/two-way-switch-wiring' },
];

const tocItems = [
  { id: 'principles', label: 'How Two-Way Switching Works' },
  { id: 'colour-codes', label: 'Old and New Cable Colour Codes' },
  { id: 'two-way-wiring', label: 'Two-Way Switch Wiring' },
  { id: 'intermediate', label: 'Intermediate Switching (Three Points)' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'bs7671', label: 'BS 7671 Conductor Identification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Two-way switching allows a light to be controlled from two positions — for example, top and bottom of a staircase. It uses two two-way switches connected by a pair of "strapper" cables (the common terminal connects to line at one switch and the lamp at the other).',
  'Since April 2006, new UK wiring must use harmonised cable colours: brown (line), blue (neutral), green/yellow (earth). Old wiring uses red (line) and black (neutral). When adding new conductors to an old installation, old conductors must be re-identified with sleeving.',
  'The strappers in a two-way switching circuit connect terminals L1 and L2 of both switches. In old wiring this is typically a 3-core-and-earth cable (red, yellow, blue). In new wiring it is also 3-core-and-earth (brown, black, grey) — but the cores must be re-identified if any are used as line conductors.',
  'Intermediate switches are used where a light needs to be controlled from three or more positions. One intermediate switch is added between the two two-way switches for each additional control point. An intermediate switch has four terminals and crosses the strapper conductors.',
  'Under BS 7671 Regulation 514.4, conductors must be identified to prevent confusion. Where single-core cables or three-core cables are used in switching arrangements, cores used as line conductors must be marked with brown sleeving at each termination.',
];

const faqs = [
  {
    question: 'What is the difference between a one-way and a two-way switch?',
    answer:
      'A one-way switch has two terminals: common (C) and L1. When the switch is operated, it connects or disconnects the common from L1. A two-way switch has three terminals: common (C), L1, and L2. The common is always connected to either L1 or L2 depending on the switch position — it can never be completely open. This property allows two two-way switches to control a single light: the circuit is complete only when both switches are in the same position (both to L1 or both to L2).',
  },
  {
    question: 'How do I identify two-way switch terminals?',
    answer:
      'UK two-way switches are marked with C (common), L1, and L2. The common terminal is the single terminal on one side of the switch; L1 and L2 are the two terminals on the other side. Some older switches use 1, 2, and 3 notation. Always verify with a continuity tester: with the switch in one position, C connects to L1; in the other position, C connects to L2. Never connect both strappers to L1 and L2 of the same switch — the strappers must connect the L1 of switch A to the L1 of switch B, and L2 of switch A to L2 of switch B.',
  },
  {
    question: 'How many strapper cables do I need for two-way switching?',
    answer:
      'You need two strapper conductors between the two switches — one connecting L1 of both switches, one connecting L2. In practice, these are provided by a single 3-core-and-earth cable (the two coloured cores as strappers, the earth as CPC). In old wiring this is typically a red/yellow/blue 3-core-and-earth. In new wiring it is brown/black/grey 3-core-and-earth. Some older installations used two separate twin-and-earth cables as strappers, which is also acceptable.',
  },
  {
    question: 'Can I use a two-way switch as a one-way switch?',
    answer:
      'Yes. A two-way switch can be used as a one-way switch by connecting the supply to the common (C) and the load to L1 or L2, leaving the remaining L terminal unconnected. This is common practice when it is likely that two-way control will be added in future — fitting a two-way switch at each position during initial installation saves the cost of replacing the switches later. There is no safety issue with leaving one L terminal unused.',
  },
  {
    question: 'How does an intermediate switch work?',
    answer:
      'An intermediate switch has four terminals arranged in two pairs. In one position, it connects L1 of the first pair to L1 of the second pair, and L2 to L2 (straight through). In the other position, it crosses the connections: L1 of the first pair connects to L2 of the second pair. This crossing or un-crossing of the strapper conductors at any point in the circuit is what allows the light state to change regardless of the position of the outer two-way switches. For four control points, you would use two intermediate switches between the two outer two-way switches.',
  },
  {
    question: 'What cable do I use for a two-way lighting circuit?',
    answer:
      'For the supply to the first switch: 1.0mm\u00b2 twin-and-earth (T&E) is standard for lighting circuits protected by a 6A MCB. For the strapper cable between switches: 1.0mm\u00b2 3-core-and-earth. For the switch drop to the light fitting: 1.0mm\u00b2 twin-and-earth. Use 1.5mm\u00b2 on longer runs or where voltage drop is a concern. All new wiring must use harmonised colour cable (brown/blue/green-yellow). When connecting to old wiring, identify all conductors correctly with sleeving.',
  },
  {
    question: 'Do I need to re-identify old red and black cores when working on a switching circuit?',
    answer:
      'Yes. BS 7671 Regulation 514.4.2 requires that where conductors are likely to cause confusion, they must be re-identified at every accessible termination. In particular, where a black or blue conductor is used as a line conductor (for example, the black core of an old switch cable used as the switch wire returning from a ceiling rose), it must be sleeved with brown at both ends. This is one of the most commonly cited minor works observations when modifying old lighting circuits.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'Installing FCUs for dishwashers, extractor fans, and fixed appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Socket positions, cooker circuits, and RCD protection in kitchens.',
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
    description: 'Landlord EICR obligations — mandatory 5-year inspection cycle.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/minor-works',
    title: 'Minor Works Certificate App',
    description: 'Issue Minor Works Certificates for lighting modifications on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// How-To Steps
// -------------------------------------------------------------------

const howToSteps = [
  {
    name: 'Confirm the circuit is dead',
    text: 'Switch off the lighting circuit MCB and lock off or place warning notices. Prove dead at every switch and at the light fitting using an approved voltage indicator (not a screwdriver tester). Do not assume the circuit is dead — always prove it.',
  },
  {
    name: 'Identify the supply switch and the remote switch',
    text: 'Determine which switch will receive the incoming supply (line from the consumer unit via the ceiling rose or junction box) and which will be the remote (outgoing to the lamp). The supply switch common terminal takes the incoming line conductor. The remote switch common terminal feeds the lamp.',
  },
  {
    name: 'Wire the supply two-way switch',
    text: 'Connect the incoming line conductor to the common (C) terminal of the first switch. Run a 3-core-and-earth strapper cable from this switch to the second switch. At this switch, connect L1 to one strapper core and L2 to the second strapper core. Sleeve the earth in green/yellow. If using old wiring, sleeve the non-standard cores: any core used as line must be sleeved brown.',
  },
  {
    name: 'Wire the remote two-way switch',
    text: 'At the second switch, connect the same two strapper cores to L1 and L2 (L1 of switch 1 to L1 of switch 2, L2 of switch 1 to L2 of switch 2). Connect the common (C) terminal of this switch to the switch wire returning to the lamp (line conductor at the lamp).',
  },
  {
    name: 'Connect the light fitting',
    text: 'At the ceiling rose or junction box, connect the neutral from the supply directly to the lamp neutral. Connect the switch return wire (from the remote switch common) to the lamp line terminal. Earth the fitting if it has exposed metal parts. Confirm polarity before energising.',
  },
  {
    name: 'Test and certify',
    text: 'Restore the supply and test operation from both switch positions — the lamp should change state at each switch regardless of the position of the other. Record polarity, continuity, and insulation resistance results on a Minor Works Certificate using the Elec-Mate app.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'principles',
    heading: 'How Two-Way Switching Works',
    content: (
      <>
        <p>
          Two-way switching is one of the fundamental wiring arrangements in domestic electrical
          installations. It allows a single light (or group of lights) to be switched on or off
          from two separate locations — the most common application being at the top and bottom
          of a staircase, or at the two ends of a long hallway.
        </p>
        <p>
          The circuit works by using two special switches — two-way switches — each with three
          terminals: a common (C), an L1, and an L2. The common of the first switch is connected
          to the incoming line. The common of the second switch feeds the lamp. The two switches
          are connected together by two conductors called strappers, which link L1 of switch 1
          to L1 of switch 2, and L2 of switch 1 to L2 of switch 2.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Both switches up (L1):</strong> Line travels from switch 1 common
                to L1, across strapper to switch 2 L1, through switch 2 to common, and on
                to the lamp — circuit complete, lamp on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch 1 up (L1), Switch 2 down (L2):</strong> Line travels to
                switch 2 L1, but switch 2 is on L2 — no connection to common — lamp off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Operating either switch changes the lamp state</strong> — each
                switch toggles between L1 and L2, either completing or breaking the
                circuit path regardless of the other switch position.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'colour-codes',
    heading: 'Old and New Cable Colour Codes',
    content: (
      <>
        <p>
          In April 2006, the UK adopted the harmonised European cable colour code for fixed
          wiring. Electricians regularly encounter both old and new colour codes in existing
          domestic installations, often in the same property. Correctly identifying and
          re-identifying conductors is a critical safety and compliance requirement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Fixed Wiring Colour Codes</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New (post-2006) twin-and-earth:</strong> Brown (line) / Blue (neutral) / Green-Yellow (earth)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old (pre-2006) twin-and-earth:</strong> Red (line) / Black (neutral) / Green-Yellow (earth)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New 3-core-and-earth (strappers):</strong> Brown, Black, Grey — all three coloured cores used as line conductors in a switching circuit. Black and grey must be sleeved brown where used as line conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old 3-core-and-earth (strappers):</strong> Red, Yellow, Blue. In a switching circuit, all three are used as line conductors — yellow and blue must be re-identified with brown sleeving at each termination.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixing old and new wiring:</strong> where new cable is added to an
                existing old installation, a label must be fixed at the consumer unit and
                at the point of connection stating: "Caution — this installation has wiring
                colours to two versions of BS 7671." This is a mandatory requirement under
                Regulation 514.14.1 of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch cable black cores:</strong> in old wiring, the black core
                of a switch drop cable is used as the switch return wire — it carries
                line voltage. This black core must be sleeved red (old) or brown (new) at
                both ends. Failure to do so is a common C3 or C2 finding on EICRs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'two-way-wiring',
    heading: 'Two-Way Switch Wiring — Connections Explained',
    content: (
      <>
        <p>
          There are two common approaches to two-way switching in UK domestic wiring. The
          choice depends on the cable routing in the property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Method 1 — Loop at Ceiling Rose</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Supply (line and neutral) looped at the ceiling rose. Switch drop runs
                from the ceiling rose to switch 1. Strapper cable (3-core-and-earth) runs
                from switch 1 to switch 2. Switch return from switch 2 common back to
                the ceiling rose lamp terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Common approach in older houses where wiring was run from fitting to switch.
                The neutral does not visit the switch boxes — only the line-side conductors
                are at the switches.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Method 2 — Loop at Switch</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Supply cable (twin-and-earth) runs to switch 1 first. Line connects to
                common of switch 1. Neutral loops through the switch box (not connected to
                the switch) and continues to the ceiling rose or junction box. Strapper
                connects switch 1 L1/L2 to switch 2 L1/L2. Switch 2 common returns to
                the lamp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                More common in modern wiring where cables are run to the switch positions.
                Requires care to identify the neutral in the switch box — it must be sleeved
                blue and not connected to any switch terminal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'intermediate',
    heading: 'Intermediate Switching — Three or More Control Points',
    content: (
      <>
        <p>
          Where a light needs to be controlled from three or more positions (for example, a
          long landing with a switch at each end and one in the middle), an intermediate switch
          is inserted in the strapper cable between the two outer two-way switches.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intermediate switch terminals:</strong> four terminals in two pairs.
                L1 in and L1 out on one side; L2 in and L2 out on the other. The switch
                crosses or passes the strapper conductors between the pairs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing:</strong> run 3-core-and-earth from two-way switch 1
                to the intermediate switch (connect to one pair of terminals). Run another
                3-core-and-earth from the intermediate to two-way switch 2 (connect to the
                second pair). Use consistent colour mapping across both cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional intermediates:</strong> for four control points, add a
                second intermediate switch in series between the first intermediate and the
                second two-way switch. Each additional control point requires one additional
                intermediate switch and one additional strapper cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Intermediate switches are distinguishable from two-way switches by their four terminals.
          They are sometimes sold as combined two-way/intermediate switches with a link fitted
          at the factory — remove the link to use as intermediate.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in Two-Way Switch Wiring',
    content: (
      <>
        <p>
          Two-way switching is a source of numerous installation errors, many of which result
          in C2 or C3 findings on EICRs or persistent fault callbacks from customers.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connecting strappers to the wrong terminals</strong> — connecting both
                strappers from L1 of switch 1 to L1 and L2 of switch 2 (rather than L1 to
                L1 and L2 to L2) results in a light that only operates from one switch.
                Always map L1 to L1 and L2 to L2 consistently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Un-sleeved switch return blacks</strong> — old switch drop cables
                have a black core used as a line conductor (switch return). Leaving this
                core without brown or red sleeving creates a hazard for future workers who
                may assume it is neutral. This is a C3 in most EICR guidance, C2 if
                particularly hazardous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using a one-way switch in a two-way circuit</strong> — a common
                error when replacing a faulty switch. A one-way switch connected in a
                two-way circuit results in one switch position permanently disconnecting
                the circuit — the light cannot be controlled from the other switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral in the switch box connected to a switch terminal</strong> — in
                loop-at-switch wiring, the neutral passes through the switch box without
                connecting to the switch. Connecting it accidentally to a switch terminal
                creates an earth fault (neutral shorted to line via the lamp) when the
                switch operates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671',
    heading: 'BS 7671 Conductor Identification Requirements',
    content: (
      <>
        <p>
          Regulation 514.4.2 of BS 7671:2018+A3:2024 requires that every conductor in a
          switching circuit is identified so that there can be no confusion about which
          conductors carry line voltage at any given time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strapper conductors (3-core-and-earth):</strong> all coloured cores
                in a strapper cable carry line voltage in a switching circuit. In new cable
                (brown/black/grey), the black and grey must be sleeved or taped brown at
                every accessible termination. In old cable (red/yellow/blue), yellow and
                blue must be sleeved or taped red (old installations) or brown (new work).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switch return conductors (twin-and-earth):</strong> the blue (new) or
                black (old) core used as a switch return wire (line conductor) must be sleeved
                brown at both terminations — at the switch and at the ceiling rose or
                junction box.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed wiring label:</strong> where old and new cable colours are
                present in the same installation, a label must be fitted per Regulation
                514.14.1 at the origin of the installation and at any point where both
                colour schemes are present.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These identification requirements apply whenever any wiring work is carried out on
          an existing switching circuit — even if you are only replacing a switch. Failing to
          re-identify conductors when they are accessible is a common C3 finding and can be
          upgraded to C2 if the risks are significant.
        </p>
        <p>
          See the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes guide" />{' '}
          for how conductor identification issues are graded.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Certifying Switching Alterations',
    content: (
      <>
        <p>
          Any addition to or alteration of a lighting switching circuit requires a Minor Works
          Certificate. Where new cables are installed that form part of a new circuit, an
          Electrical Installation Certificate is required. Use Elec-Mate to generate compliant
          certificates on-site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" />{' '}
                — issue an MWC for two-way or intermediate switch additions to existing circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" />{' '}
                — record un-sleeved cores or incorrect conductor identification found when
                inspecting old switching circuits.
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

export default function TwoWaySwitchWiringPage() {
  return (
    <GuideTemplate
      title="Two-Way Switch Wiring — Complete UK Electrician Guide 2024"
      description="Complete guide to two-way and intermediate switch wiring: old and new colour codes, strappers, intermediate switches for three-point control, common mistakes, and BS 7671 conductor identification requirements."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Two-Way Switch Wiring{' '}
          <span className="text-yellow-400">— Complete UK Guide</span>
        </>
      }
      heroSubtitle="A practical guide to two-way and intermediate switch wiring for UK electricians: colour codes, strapper cables, intermediate switches for three-point control, common mistakes, and BS 7671 conductor identification."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Wire Two-Way Switches — Step by Step"
      howToDescription="Follow these steps to install a two-way switching circuit from scratch using new harmonised colour cable."
      faqs={faqs}
      faqHeading="Two-Way Switch Wiring — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Issue Minor Works Certificates for switching alterations"
      ctaSubheading="Generate compliant MWCs on your phone with Elec-Mate. Start your free 7-day trial."
    />
  );
}
