import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  UtensilsCrossed,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Kitchen Island Power', href: '/guides/kitchen-island-power-supply' },
];

const tocItems = [
  { id: 'overview', label: 'Kitchen Island Power Overview' },
  { id: 'methods', label: 'Floor Box vs Pillar vs Pendant' },
  { id: 'induction-hob', label: 'Induction Hob Power Requirements' },
  { id: 'socket-circuits', label: 'Socket Outlets on the Island' },
  { id: 'first-fix', label: 'First Fix: Getting It Right' },
  { id: 'installation-steps', label: 'Step-by-Step Installation' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'costs', label: 'Realistic Pricing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Getting power to a kitchen island is primarily a first-fix challenge. The cable route must be planned and installed before the floor screed or finished floor goes down — retrofitting is expensive and disruptive.',
  'The three main methods are floor boxes (cables run under the floor and terminate in a flush floor box), island pillars/posts (cables run up through a vertical pillar at the end of the island), and pendant drops (cables drop from the ceiling — less common, mainly for pendant lights).',
  'An induction hob on a kitchen island typically draws 7kW to 7.4kW, requiring a dedicated 32A radial circuit with 6.0mm² cable. Some premium models draw up to 11kW, requiring a 45A circuit with 10.0mm² cable.',
  'Socket outlets on the island for small appliances can be supplied from the existing ring final circuit or a new radial circuit. If the island has both an induction hob and sockets, two separate circuits are needed.',
  'RCD protection is required under BS 7671 Regulation 411.3.3 for all socket outlets. The hob circuit also benefits from RCD protection, typically via an RCBO at the consumer unit.',
];

const faqs = [
  {
    question: 'What is the best way to get power to a kitchen island?',
    answer:
      'The best method depends on the construction stage. For new builds or major renovations where the floor is being laid or replaced, a floor route with a flush floor box is the cleanest solution — the cable runs under the screed or through the floor void and terminates in a metal floor box recessed into the floor beneath the island. For existing kitchens where lifting the floor is not practical, an island pillar (a vertical post at one end of the island containing the cables) or a ceiling drop are the alternatives. The pillar method runs cables down from the ceiling, through the pillar, and into the island carcass. Discuss the options with the kitchen fitter and customer at the design stage.',
  },
  {
    question: 'What size cable does an induction hob need?',
    answer:
      'Most domestic induction hobs in the UK are rated between 7kW and 7.4kW, drawing approximately 32A at 230V. These require a dedicated 32A radial circuit with 6.0mm² cable. Some premium or commercial-style induction hobs are rated up to 11kW (48A), requiring a 45A circuit with 10.0mm² cable. Always check the manufacturer data plate — do not assume all induction hobs are the same. The circuit must be dedicated to the hob and not shared with sockets or other appliances.',
  },
  {
    question: 'Can I connect an induction hob to a 13A plug?',
    answer:
      'No. Induction hobs draw far more than 13A and must be hardwired to a dedicated circuit via a connection unit or direct cable connection. Even the smallest domestic induction hobs (3.5kW to 4kW portable units) draw 15A to 17A, which exceeds the 13A plug rating. Attempting to connect a full-size induction hob to a 13A socket would immediately overload the circuit and trip the MCB (or, worse, overheat the plug and socket). This is a question customers frequently ask — the answer is always a dedicated hardwired circuit.',
  },
  {
    question: 'Do I need a floor box for a kitchen island?',
    answer:
      'A floor box is one option, not the only option. Floor boxes work well for socket outlets in the island — they are flush with the floor surface and allow cable access directly beneath the island. However, they require the cable to be installed before the finished floor is laid, and the floor box must be positioned to align with the island layout. If the floor is already finished, a pillar or ceiling drop is more practical. Some kitchen designers prefer to avoid floor boxes because they can collect water during floor cleaning — a raised stainless steel floor box with a waterproof lid addresses this.',
  },
  {
    question: 'How many sockets should a kitchen island have?',
    answer:
      'For a standard kitchen island used for food preparation and casual dining, two to four socket outlets are typical. Position them on the side of the island that faces away from the main cooking/prep area — usually the seating side. Consider what appliances will be used on the island: a food processor, stand mixer, blender, or charging point for phones and tablets. Two double sockets (four outlets) is a practical starting point. For larger islands with a breakfast bar, additional sockets for phone charging and a kettle may be requested.',
  },
  {
    question: 'What happens if the kitchen island moves after installation?',
    answer:
      'This is a genuine risk with floor boxes. If the island position changes during the kitchen fit-out (which happens more often than you would expect), the floor box may end up in the wrong place — exposed in the open floor or inaccessible behind the island plinth. The fix is either to relocate the floor box (which means lifting the floor again) or to use an extension from the existing floor box to the new position (which is untidy). To prevent this, always confirm the exact island position with the kitchen designer before installing the floor box. Get it in writing and mark the floor clearly.',
  },
  {
    question: 'Can I run the hob and sockets on the same circuit?',
    answer:
      'No. The induction hob must be on its own dedicated circuit because of its high current draw (typically 32A). Socket outlets should be on a separate circuit — either a spur from the existing ring final circuit (if the ring has capacity and the island sockets are within the rules for a non-fused spur or fused spur) or a new dedicated radial circuit. Running both on the same circuit would overload the protective device and cable when the hob is operating at full power with an appliance plugged in.',
  },
  {
    question: 'How much does it cost to wire a kitchen island?',
    answer:
      'The cost depends on the scope. Sockets only (from existing ring final circuit, short cable run): £200 to £400. Dedicated hob circuit (32A, 6.0mm² cable, connection unit): £350 to £600. Both sockets and hob circuit: £500 to £900. Floor box installation (during first fix, before screed): £150 to £300 extra for the floor box and installation. Retrofit through an existing floor: add £300 to £600 for floor cutting and making good. These prices include materials, labour, testing, and certification.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for induction hob circuits and island socket supplies.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Verify voltage drop on under-floor cable runs to kitchen islands.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/commercial-kitchen-electrical',
    title: 'Commercial Kitchen Electrical Guide',
    description:
      'Electrical requirements for commercial kitchen installations including three-phase.',
    icon: UtensilsCrossed,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete certificates for kitchen electrical installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/rewire-3-bed-semi-step-by-step',
    title: 'Rewire Guide: 3-Bed Semi',
    description: 'Full rewire walkthrough including kitchen circuit planning and first fix.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 covering testing of new circuits and alterations.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Kitchen Island Power Supply: Planning and Installation',
    content: (
      <>
        <p>
          Kitchen islands are a standard feature in modern UK kitchen designs. They create a
          freestanding work surface in the middle of the room — and that means getting electrical
          supplies to a location with no walls. Power for an induction hob, socket outlets for
          appliances, and sometimes lighting all need to reach the island.
        </p>
        <p>
          The challenge is almost entirely about cable routing. The electrical circuits themselves
          are standard domestic work — a dedicated radial for the hob, sockets from the ring or a
          new radial. But getting the cables from the consumer unit or existing circuits to the
          island, without visible cables crossing the floor, requires planning at the right stage of
          the build.
        </p>
        <p>
          This guide covers the three main methods for routing power to an island, induction hob
          requirements, socket circuit options, first-fix timing, and realistic pricing for 2026.
        </p>
      </>
    ),
  },
  {
    id: 'methods',
    heading: 'Floor Box vs Pillar vs Pendant Drop',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Floor Box</h3>
            <p className="text-white text-sm leading-relaxed">
              Cables run under the floor (in screed, through a floor void, or in conduit beneath
              floorboards) and terminate in a flush metal floor box recessed into the floor. The
              floor box sits directly below the island and is accessed by removing the island
              plinth. Best for new builds and renovations where the floor is being relaid. Provides
              the cleanest finish with no visible cables.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Island Pillar</h3>
            <p className="text-white text-sm leading-relaxed">
              A vertical post (usually matching the island worktop material) at one end of the
              island contains the cables. Cables route from the ceiling void, down through the
              pillar, and into the island carcass. Good for retrofits where the floor cannot be
              lifted. The pillar adds a design element but takes up worktop space. Socket outlets
              can be integrated into the pillar face.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-3">Ceiling/Pendant Drop</h3>
            <p className="text-white text-sm leading-relaxed">
              Cables drop from the ceiling directly above the island. This works for pendant
              lighting and can also supply power through a vertical conduit or decorative cable
              channel. Less common for power sockets (it looks industrial), but some modern kitchen
              designs incorporate a ceiling-mounted socket rail above the island.
            </p>
          </div>
        </div>
        <p>
          The choice between these methods should be made during the kitchen design stage — not
          after the floor is laid and the island is fitted. Discuss the options with the kitchen
          designer and customer early.
        </p>
      </>
    ),
  },
  {
    id: 'induction-hob',
    heading: 'Induction Hob Power Requirements',
    content: (
      <>
        <p>
          Induction hobs are the most common high-power appliance on a kitchen island. They require
          significantly more power than a gas hob or a standard ceramic hob:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li>
              <strong>Standard 4-zone induction hob:</strong> 7.0kW to 7.4kW — 32A circuit, 6.0mm²
              cable, 32A connection unit or cooker switch
            </li>
            <li>
              <strong>Large 5-zone induction hob:</strong> 7.4kW to 9.2kW — 40A circuit, 10.0mm²
              cable
            </li>
            <li>
              <strong>Premium/commercial-style hob:</strong> 9kW to 11kW — 45A circuit, 10.0mm²
              cable
            </li>
            <li>
              <strong>Vented induction hob (with downdraft):</strong> 7kW to 8kW for the hob plus
              the extraction motor — check combined rating
            </li>
          </ul>
        </div>
        <p>
          The hob must be connected via a dedicated radial circuit with a connection unit or cooker
          switch within 2 metres of the hob. For an island installation, the connection unit is
          typically inside the island carcass (accessed via the plinth or a service panel) or
          mounted on the wall behind the island if close enough. The cable must be correctly sized
          for the load and the run length — use the{' '}
          <SEOInternalLink href="/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to verify.
        </p>
      </>
    ),
  },
  {
    id: 'socket-circuits',
    heading: 'Socket Outlets on the Island',
    content: (
      <>
        <p>
          Socket outlets on the kitchen island for small appliances can be supplied in several ways:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused spur from ring final circuit</strong> — a fused connection unit (13A
                fuse) on the existing kitchen ring supplies the island sockets. This is the simplest
                method if the ring has capacity and the cable run is practical. Maximum load at the
                island sockets is limited to 13A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New radial circuit</strong> — a dedicated 20A radial circuit from the
                consumer unit to the island sockets. This provides more capacity and is the better
                option if the island will have multiple high-draw appliances (food processor, stand
                mixer, kettle).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extension of ring final circuit</strong> — if the ring routes conveniently
                past the island position, the ring can be extended to include sockets on the island.
                This must comply with the ring circuit rules in BS 7671 and is not always practical
                depending on the ring route.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All socket outlets must be RCD protected in accordance with BS 7671 Regulation 411.3.3
          (30mA RCD for socket outlets rated up to 32A). Position the sockets on the seating side of
          the island, away from the cooking zone, at a height of approximately 200mm above the
          worktop or integrated into the island end panel.
        </p>
      </>
    ),
  },
  {
    id: 'first-fix',
    heading: 'First Fix: Getting It Right',
    content: (
      <>
        <p>
          The single biggest mistake with kitchen island electrical work is timing. If the cables
          are not in place before the floor goes down, the options become much more expensive and
          disruptive.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before screed/floor</strong> — lay conduit or cable in the floor void to the
                exact island position. Use 25mm or 32mm conduit so cables can be pulled through
                later if the specification changes. Mark the conduit exit point clearly on the
                sub-floor so the floor layer does not cover it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Confirm island position in writing</strong> — get the exact dimensions and
                position from the kitchen designer before installing the floor route. If the island
                moves by even 200mm, the floor box or conduit exit may be in the wrong place.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Run extra conduit</strong> — it costs almost nothing to lay an extra conduit
                run during first fix. Run one for the hob circuit and one for the socket circuit.
                You can also run a conduit for island lighting or a network cable. Future-proofing
                during first fix is almost free; retrofitting later is very expensive.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-steps',
    heading: 'Step-by-Step Installation',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Design coordination</strong> — confirm island position, hob model (kW rating),
              number of sockets, and cable route method (floor box, pillar, or ceiling drop) with
              the kitchen designer and customer.
            </li>
            <li>
              <strong>First fix (before floor)</strong> — lay conduit from the consumer unit area to
              the island position. Install floor box frame if using floor box method. Draw cables
              through conduit or lay cables in the floor void.
            </li>
            <li>
              <strong>Consumer unit</strong> — install RCBO for the hob circuit (32A or 40A) and, if
              required, an RCBO or MCB for a new socket radial.
            </li>
            <li>
              <strong>Second fix (after kitchen fitted)</strong> — terminate cables at the hob
              connection unit and island socket outlets. Connect the hob to the connection unit per
              the manufacturer instructions.
            </li>
            <li>
              <strong>Test</strong> — continuity, insulation resistance, polarity, Zs, RCD
              operation. Functional test of hob and socket outlets.
            </li>
            <li>
              <strong>Certify</strong> — issue an EIC for new circuits or a Minor Works Certificate
              if the work is a fused spur from an existing ring.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>Testing requirements depend on the scope of work:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                New dedicated circuit (hob or sockets): full initial verification — continuity,
                insulation resistance, polarity, Zs, RCD. Issue an EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Fused spur from existing ring: test the new spur — continuity, insulation
                resistance, polarity, Zs at the new socket. Issue a Minor Works Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                If both a new hob circuit and new socket circuit are installed, a single EIC
                covering both circuits is appropriate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/eic-certificate">EIC certificate app</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works certificate app
          </SEOInternalLink>{' '}
          to complete certification on site.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Realistic Pricing for Kitchen Island Electrical Work (2026)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li>
              <strong>Island sockets only (fused spur from ring):</strong> £200 to £400 — materials,
              labour, Minor Works certificate
            </li>
            <li>
              <strong>Dedicated hob circuit (32A):</strong> £350 to £600 — RCBO, 6.0mm² cable,
              connection unit, EIC
            </li>
            <li>
              <strong>Both hob + socket circuits:</strong> £500 to £900 — two circuits, full
              testing, EIC
            </li>
            <li>
              <strong>Floor box supply and install:</strong> £150 to £300 — stainless steel floor
              box, conduit, installation during first fix
            </li>
            <li>
              <strong>Retrofit through existing floor:</strong> add £300 to £600 — floor cutting,
              conduit, making good
            </li>
            <li>
              <strong>Island pillar fabrication and wiring:</strong> add £200 to £400 — depends on
              pillar design and materials
            </li>
            <li>
              <strong>Consumer unit upgrade:</strong> add £350 to £600 if no spare ways
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Kitchen Island Tips',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Coordinate with the Kitchen Fitter</h4>
                <p className="text-white text-sm leading-relaxed">
                  The kitchen fitter needs to know where cables will emerge from the floor or
                  ceiling. You need to know the exact island position and carcass layout. A
                  15-minute call before first fix prevents expensive mistakes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Quote First Fix and Second Fix Separately
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Kitchen island work often has weeks or months between first fix and second fix.
                  Quote them as separate visits in the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  so the customer understands the timeline and cost breakdown.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify kitchen island electrical work"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. 7-day free trial."
          icon={UtensilsCrossed}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function KitchenIslandPowerPage() {
  return (
    <GuideTemplate
      title="Kitchen Island Power Supply | Floor Box & Hob Circuit Guide UK"
      description="Complete guide to getting power to a kitchen island in the UK. Floor box vs pillar, induction hob dedicated circuit, socket outlets, first fix planning, testing, certification, and pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={UtensilsCrossed}
      heroTitle={
        <>
          Kitchen Island Power Supply:{' '}
          <span className="text-yellow-400">Floor Box, Hob Circuits, and Socket Options</span>
        </>
      }
      heroSubtitle="Getting power to a kitchen island means planning the cable route before the floor goes down. This guide covers floor boxes, island pillars, induction hob circuits, socket supplies, and realistic pricing."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Kitchen Island Power Supply"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Kitchen Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
