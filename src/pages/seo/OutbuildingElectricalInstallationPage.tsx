import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  Home,
  ShieldCheck,
  PoundSterling,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Outbuilding Guides', href: '/outbuilding-electrical-installation' },
  { label: 'Outbuilding Electrical Installation', href: '/outbuilding-electrical-installation' },
];

const tocItems = [
  { id: 'swa-armoured-cable', label: 'SWA Armoured Cable Requirement' },
  { id: 'trench-depth', label: 'Trench Depth Requirements' },
  { id: 'sub-board', label: 'Sub-Board for the Outbuilding' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'earthing-system', label: 'Earthing System (TT for Outbuildings)' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'SWA (steel wire armour) armoured cable is the correct cable type for underground runs from the house to an outbuilding. Standard twin and earth flat cable must never be buried directly in the ground.',
  'The minimum trench depth for buried armoured cable under a garden (where there is no risk of mechanical damage) is 500mm, and 600mm or more under paths, driveways, or other areas subject to digging or mechanical damage, in accordance with BS 7671 guidance.',
  'An outbuilding receiving a separate supply requires its own sub-distribution board (sub-board) or consumer unit, with its own main isolator, circuit breakers, and RCD protection for each circuit.',
  'TT earthing is the correct earthing system for most electrically separate outbuildings in the UK. The outbuilding requires its own earth electrode (typically a copper earth rod driven into the ground near the outbuilding) under Regulation 542.1.2.3 of BS 7671.',
  'All outbuilding electrical installation work is notifiable under Part P of the Building Regulations 2010. An Electrical Installation Certificate (EIC) must be issued on completion.',
];

const faqs = [
  {
    question: 'What cable do I need from my house to my outbuilding?',
    answer:
      'SWA (steel wire armour) armoured cable is required for underground runs from the house to an outbuilding. The cable cross-section is determined by the length of the run and the total load of the outbuilding circuits. For a garden office with a sub-board, 6mm² or 10mm² three-core SWA is typical for runs up to 30 metres. For longer runs or heavier loads, 16mm² or larger may be needed. The armoured cable must be connected at both ends using appropriate armour clamp glands in metal consumer units or termination boxes.',
  },
  {
    question: 'How deep should the cable trench be for an outbuilding?',
    answer:
      'BS 7671 and the IET Wiring Regulations guidance recommend a minimum depth of 500mm for armoured cable buried under a garden where the risk of mechanical damage is low. Under paths, driveways, or any surface that may be disturbed by digging, the minimum depth is 600mm. Where the cable route crosses an area that may be excavated in future, additional mechanical protection (cable cover tiles or marker tape at 150mm above the cable) provides warning and protection. In all cases, the route should be marked on a drawing kept with the property records.',
  },
  {
    question: 'Does an outbuilding need its own consumer unit?',
    answer:
      'Yes, if the outbuilding has more than one circuit. A sub-distribution board (consumer unit) provides a local main isolator, circuit protection for each circuit, and a point from which circuits can be safely isolated for maintenance. The sub-board must include RCD protection for all circuits — a dual-RCD unit or individual RCBOs are both acceptable. The sub-board enclosure must be suitable for the environment — a metal enclosure with appropriate IP rating for a workshop or outbuilding that may have dust or moisture.',
  },
  {
    question: 'What is a TT earthing system and why do outbuildings need it?',
    answer:
      'A TT earthing system is one where the installation earth is connected to the general mass of earth via a local earth electrode (typically a copper earth rod), rather than relying on an earth path provided by the electricity network (as in TN-C-S or TN-S systems). Most UK houses use TN-C-S (PME) earthing. However, the PME earth cannot be extended to a separate outbuilding under BS 7671 Regulation 8 of the Electricity Safety, Quality and Continuity Regulations 2002 — because if the supply neutral is broken in the street, the PME earth in the outbuilding can rise to a dangerous potential. A TT earth electrode in the outbuilding solves this problem.',
  },
  {
    question: 'Do I need planning permission to run electricity to my outbuilding?',
    answer:
      'The electrical work itself is controlled by Part P of the Building Regulations, not planning permission. Planning permission for the outbuilding structure is a separate matter — many garden buildings and sheds are permitted development and do not require planning permission. The electrical installation from the house to the outbuilding requires Part P notification regardless of whether planning permission was needed for the building itself.',
  },
  {
    question: 'Can I use a standard extension lead to power my outbuilding?',
    answer:
      'No. Extension leads are not intended for permanent outdoor or underground use and are not compliant with BS 7671. A temporary extension lead run across the garden or through a window is a fire and electric shock risk. An outbuilding must have a proper fixed electrical installation — SWA armoured cable from the house, sub-board in the outbuilding, and an EIC on completion. This is both a safety requirement and a building regulations requirement.',
  },
  {
    question: 'How much does it cost to run electricity to an outbuilding?',
    answer:
      'Costs vary significantly with the distance of the run, the complexity of the installation, and the size of the outbuilding. A straightforward installation — 20 metres of 6mm² SWA, a 4-way consumer unit, two double sockets, lighting, and an earth rod — typically costs £1,200 to £2,500 including materials, labour, and the EIC. Longer runs, harder ground conditions, or a larger sub-board installation will cost more. Always obtain at least three quotes from registered electricians.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/garden-room-electrical',
    title: 'Garden Room Electrical Installation',
    description:
      'Dedicated circuits, cable sizing for distance, EV charging, and sub-board options for garden rooms.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/garage-conversion-electrical',
    title: 'Garage Conversion Electrical Work',
    description: 'Upgrading from garage supply to habitable room standard — full wiring guide.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/house-extension-electrical-guide',
    title: 'House Extension Electrical Guide',
    description: 'Circuit planning, consumer unit checks, Part P, and EIC for house extensions.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Complete guide to the current wiring regulations for UK electricians.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'swa-armoured-cable',
    heading: 'SWA Armoured Cable: The Right Cable for Underground Runs',
    content: (
      <>
        <p>
          The cable used to supply an outbuilding from the main house must be suitable for direct
          burial in the ground. Standard PVC-insulated twin and earth flat cable (6242Y) is not
          suitable for underground use — it must never be buried directly in the ground, even in
          conduit, without additional armoured protection for runs in areas subject to digging.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA armoured cable</strong> — steel wire armour cable (to BS 5467 or BS
                6724) has a PVC outer sheath, copper conductors, PVC insulation, and a layer of
                galvanised steel wire armour. The armour provides mechanical protection against
                spades and accidental digging, and also serves as the circuit protective conductor
                (CPC) when properly terminated using armour clamp glands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — the cross-section of the SWA cable is determined by
                the total load of the outbuilding circuits, the length of the run, and the
                permissible voltage drop. For a garden office or workshop sub-board, 6mm² three-core
                SWA is typical for runs up to 25–30 metres. For runs over 30 metres or higher loads,
                10mm² or 16mm² cable should be used to keep voltage drop within the 3% limit for
                lighting circuits and 5% for power circuits under BS 7671 Section 525.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination</strong> — SWA cable must be terminated at both ends using
                proper armour clamp glands. At the house end, this is typically a gland into the
                main consumer unit or an outdoor IP-rated junction box. At the outbuilding end, it
                terminates into the sub-board. Correct armour termination is essential — the armour
                must be clamped and connected to the earth bar at both ends.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alternative — MICC cable or conduit</strong> — where the route is entirely
                in conduit with draw boxes (accessible for cable replacement), standard cable in
                rigid conduit to the appropriate depth is also acceptable. However, SWA armoured
                cable is the most common and practical solution for outbuilding supplies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'trench-depth',
    heading: 'Trench Depth for Buried Cable Under Paths and Drives',
    content: (
      <>
        <p>
          The depth at which the armoured cable is buried determines the level of mechanical
          protection it receives from accidental excavation. BS 7671 Appendix 4 and the IET On-Site
          Guide provide guidance on minimum depths.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under open garden — 500mm minimum</strong> — where the cable runs under lawn
                or garden beds that will only be disturbed by hand tools (spades and forks), a
                minimum depth of 500mm to the top of the cable is the accepted practice. The cable
                should be laid on a bed of soft sand or fine soil, with cable cover tiles or marker
                tape placed 150mm above it before backfilling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under paths and drives — 600mm minimum</strong> — where the cable crosses a
                path, driveway, or any surface that may be broken up for repair or alteration, a
                minimum depth of 600mm to the top of the cable is required. Heavy-duty cable cover
                tiles must be laid above the cable at this depth. Where mechanical excavation is
                likely, additional protection in steel conduit or a cable duct is advisable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the route</strong> — the cable route must be recorded on a drawing
                with measurements from fixed reference points (walls, fence posts). This drawing
                should be kept with the property's electrical installation documentation. Without a
                route record, any future excavation in the garden risks damaging the cable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sub-board',
    heading: 'Sub-Board for the Outbuilding',
    content: (
      <>
        <p>
          An outbuilding with more than one circuit requires a sub-distribution board (consumer
          unit) at the outbuilding end of the supply cable. This provides a local main isolator and
          circuit protection for each circuit in the outbuilding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main isolator</strong> — the sub-board must have a main switch (double-pole
                isolator) so that all circuits in the outbuilding can be isolated safely for
                maintenance. The main switch rating must be equal to or greater than the maximum
                demand of all circuits in the outbuilding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit breakers and RCDs</strong> — each circuit in the outbuilding must
                have appropriate overcurrent protection (MCB) and RCD protection. An RCBO (combined
                MCB and RCD) for each circuit provides the best arrangement — a fault on one circuit
                does not trip all circuits. Alternatively, a dual-RCD board with MCBs is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enclosure suitability</strong> — the sub-board enclosure must be appropriate
                for the outbuilding environment. In a dry, enclosed building, a standard metal
                consumer unit is acceptable. In a workshop, garage, or agricultural outbuilding
                where dust or moisture may be present, an IP-rated enclosure (IP44 or higher) is
                required. Under Regulation 421.1.201 of BS 7671, consumer units in domestic premises
                must have non-combustible enclosures — a metal enclosure is standard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Outbuilding Installations',
    content: (
      <>
        <p>
          RCD (Residual Current Device) protection is essential for outbuilding electrical
          installations. The risk of electric shock in an outbuilding environment (where the user
          may be working outdoors or with garden equipment) is higher than in a domestic living
          room.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD on all socket circuits</strong> — under Regulation 411.3.3 of BS
                7671, all socket-outlet circuits in an outbuilding must be protected by an RCD with
                a rated residual operating current not exceeding 30mA. This requirement applies
                regardless of whether the socket will be used to power garden equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection for outdoor socket-outlets</strong> — any socket-outlet
                intended for use with equipment used outdoors must be protected by a 30mA RCD under
                Regulation 411.3.3. This includes sockets on the exterior wall of the outbuilding
                used for mowers, hedge trimmers, or power tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD operating time</strong> — the RCD must operate within 300ms at its rated
                residual current and within 40ms at 5× the rated residual current. This must be
                verified by testing during the commissioning inspection and recorded on the EIC
                schedule of test results.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing-system',
    heading: 'Earthing System for Outbuildings: Why TT is the Right Choice',
    content: (
      <>
        <p>
          The earthing system for an outbuilding is one of the most important design decisions in
          the installation. In the UK, most domestic properties use TN-C-S earthing (also called PME
          — Protective Multiple Earthing). However, PME earthing must not be extended to a separate
          outbuilding in most circumstances.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why PME cannot be extended to outbuildings</strong> — in a TN-C-S (PME)
                system, the earth and neutral are combined in the supply cable. If the neutral
                conductor is broken between the transformer and the property, the PME earth terminal
                can rise to a dangerous voltage (up to 230V). This is safe in a house because all
                metalwork is bonded together, but in a separate outbuilding — where a person may
                simultaneously touch the earthed metalwork and true earth (the ground) — a risen PME
                earth is extremely dangerous. Regulation 8 of the Electricity Safety, Quality and
                Continuity Regulations 2002 restricts extension of PME earths to separate buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing — the correct solution</strong> — in a TT earthing system, the
                outbuilding has its own independent earth electrode (typically a 1.2m copper earth
                rod driven vertically into the ground near the outbuilding) connected to the earth
                bar of the sub-board. The outbuilding earth is completely independent of the house
                supply neutral. Under BS 7671 Regulation 542.1.2.3, a TT earth electrode must
                achieve a resistance to earth of 200Ω or less for the RCD to operate within
                acceptable limits — in practice, most installations achieve well under 100Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode test</strong> — the resistance to earth of the electrode
                must be measured during commissioning and recorded on the EIC schedule of test
                results. If the measured value exceeds 200Ω, a second or longer earth rod must be
                installed, or specialist electrodes used.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The three-core SWA cable from the house provides the live, neutral, and CPC conductors. In
          a TT system, the CPC (armour) connects to the earth bar in the outbuilding sub-board, and
          the earth bar also connects to the local earth electrode. The house end of the armour
          connects to the main earthing terminal in the house — this is correct and required under
          BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification for Outbuilding Electrical Work',
    content: (
      <>
        <p>
          Running electricity from the house to an outbuilding is notifiable under Part P of the
          Building Regulations 2010. This applies whether the outbuilding is a garden shed, a
          workshop, a summer house, or a purpose-built garden office.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a competent person scheme electrician</strong> — a NICEIC, NAPIT, or
                ELECSA registered electrician can self-certify the work and notify the scheme on
                your behalf. You receive a completion certificate confirming the notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — an Electrical Installation Certificate (EIC)
                covering the entire outbuilding installation (cable route, sub-board, all circuits,
                and earthing) must be issued on completion. Keep this with your property records.
                Use the{' '}
                <SEOInternalLink href="/tools/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                to complete and issue the certificate on site.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outbuilding Electrical Installations',
    content: (
      <>
        <p>
          Outbuilding electrical installations are satisfying, technically interesting jobs that
          combine cable routing, sub-board installation, earthing design, and full commissioning
          testing. These jobs generate consistent revenue and repeat business from homeowners
          upgrading their properties.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete the EIC Including Earth Test</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to record all test results including the earth electrode resistance value — a
                  common omission that can cause issues if the installation is ever inspected.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote for the Full Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to itemise SWA cable, glands, sub-board, earth rod, circuits, and testing. Clients
                  appreciate a detailed quote that explains what they are getting — it also protects
                  you from scope creep if additional work is requested later.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run outbuilding electrical jobs with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EIC certificates, quoting, and job management. Complete more jobs with less paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutbuildingElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Outbuilding Electrical Installation Guide UK | Garden Office Wiring"
      description="Complete guide to outbuilding electrical installation. SWA armoured cable requirements, trench depth under paths and drives, sub-board installation, RCD protection, and TT earthing for separate outbuildings under BS 7671."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Outbuilding Electrical Installation:{' '}
          <span className="text-yellow-400">Garden Office Wiring Guide UK</span>
        </>
      }
      heroSubtitle="Everything you need to know about running electricity to an outbuilding — SWA armoured cable requirements, trench depths under paths and drives, sub-board installation, 30mA RCD protection, and why TT earthing is the correct earthing system for separate outbuildings."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outbuilding Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Complete Outbuilding EICs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
