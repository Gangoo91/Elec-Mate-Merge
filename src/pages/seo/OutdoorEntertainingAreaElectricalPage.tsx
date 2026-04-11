import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Wrench,
  Cable,
  ClipboardCheck,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Outdoor Entertaining Area Electrical',
    href: '/guides/outdoor-entertaining-area-electrical',
  },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'ip-ratings', label: 'IP Ratings for Outdoor Use' },
  { id: 'outdoor-sockets', label: 'Outdoor Sockets and Kitchen Circuits' },
  { id: 'lighting', label: 'Outdoor Lighting: LED Strip and Festoon' },
  { id: 'rcd-section714', label: 'Section 714 and Regulation 411.3.3' },
  { id: 'hot-tub', label: 'Hot Tubs and Other Equipment' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Outdoor electrical installations must use equipment with appropriate IP ratings: IPX4 (splash protection) is the minimum for sheltered outdoor locations, IPX5 (water jet protection) for areas within 2m of a hose or power washer point, and IPX6 or IPX7/IPX8 for more exposed locations.',
  'BS 7671 Section 714 covers outdoor lighting installations and requires RCD protection (30mA) for all outdoor socket outlets and circuits supplying portable equipment.',
  'Regulation 411.3.3 of BS 7671 requires 30mA RCD protection for socket outlets that may reasonably be expected to supply portable equipment for use outdoors.',
  'Outdoor kitchen and BBQ areas require dedicated circuits for appliances (if electric), IP66-rated socket outlets, and a weatherproof consumer unit or junction box. All metalwork must be bonded.',
  'Outdoor LED strip lighting can be 230V (IPX4+ rated, direct burial or IP68 for ground level) or 12V SELV (safer near water, lower voltage drop risk over short runs). 12V SELV is preferred within 2m of a pool or water feature.',
];

const faqs = [
  {
    question: 'What IP rating is required for outdoor electrical equipment?',
    answer:
      'IP (Ingress Protection) ratings are defined in BS EN 60529. The first digit indicates protection against solid particles (dust), the second against liquids. For outdoor electrical equipment: sheltered outdoor locations (under a pergola or covered veranda, not exposed to direct rain) — IPX4 minimum (splashing from any direction). Exposed outdoor locations (open to rain) — IPX5 minimum (water jets). Locations where equipment may be hosed down or within 2m of a hosepipe point — IPX5 (water jets from any direction). Ground-mounted or in-ground applications — IPX7 (temporary immersion) or IPX8 (continuous immersion). IP66 is a common rating for outdoor socket housings (dustproof + water jet resistant) and is appropriate for most UK garden and entertaining area applications.',
  },
  {
    question: 'Can I use a standard 13A socket outside?',
    answer:
      'No. Standard indoor 13A socket outlets (IP2X, suitable only for dry indoor environments) must not be used outdoors or in locations exposed to moisture. Outdoor socket outlets must be: IP44 minimum for sheltered outdoor positions (under a covered patio or pergola), IP65 or IP66 for exposed outdoor positions (directly open to rain or hose water). Outdoor sockets must be on a dedicated circuit with 30mA RCD protection (Regulation 411.3.3). The socket must be on a dedicated circuit or clearly marked spur from a ring final, protected by a 30mA RCD at the consumer unit or by an RCBO at the socket position.',
  },
  {
    question: 'What electrical supply does an outdoor kitchen or BBQ area need?',
    answer:
      'An outdoor kitchen or BBQ area with electric appliances (induction hob, electric grill, outdoor fridge, lighting) requires a dedicated circuit from the house consumer unit. The circuit specification depends on the appliances: an outdoor induction hob (typically 2kW to 3.5kW) requires a 16A or 20A circuit on 2.5mm cable; an outdoor electric grill or pizza oven (typically 2kW to 4kW) requires a 16A or 32A circuit depending on the rated load; a general-purpose outdoor socket circuit for a fridge, kettle, and small appliances requires a standard 20A radial or 32A ring on 2.5mm cable. IP66 socket outlets with weatherproof lids are required. The outdoor enclosure (consumer unit or junction box) must be IP44 minimum and should be mounted at a position protected from direct rain. All metalwork in the outdoor kitchen must be bonded to earth.',
  },
  {
    question: 'What is the difference between 12V SELV and 230V outdoor LED strip lighting?',
    answer:
      '230V LED strip (mains voltage): available in IP65 (silicone coated) and IP68 (fully waterproof) ratings. Suitable for longer runs (voltage drop is lower at 230V than 12V). Must be installed in a weatherproof enclosure or in a purpose-made LED strip profile with waterproof end caps. 30mA RCD protection required. No length limitation from a safety perspective (voltage drop is the limiting factor). 12V SELV LED strip: powered by a weatherproof 12V transformer (safety isolating transformer). Maximum 12V AC or 30V DC — classified as SELV, which is safe to touch even when wet. Voltage drop limits the maximum run length to approximately 5m for standard 14.4W/m strip on 12V (upgrade to 24V SELV for longer runs). Required in Zone 1 of a swimming pool (within 2m of the pool edge). Preferred for any lighting near water features, ponds, or where children may come into contact with the lighting.',
  },
  {
    question: 'What is BS 7671 Section 714 and how does it apply to garden lighting?',
    answer:
      'BS 7671 Section 714 covers outdoor lighting installations — including decorative, amenity, and functional outdoor lighting in gardens, parks, and public spaces. Section 714 requirements for garden lighting include: RCD protection (30mA) for all outdoor luminaire circuits, appropriate IP ratings for the installation location, protection of cables against mechanical damage (armoured cable, conduit, or cable at least 500mm deep for buried cables not in conduit), and adequate protection against thermal effects (outdoor luminaires can reach high surface temperatures). Section 714 does not override the general BS 7671 requirements — it supplements them with outdoor-specific provisions. In practice, the key Section 714 requirements for domestic garden lighting are RCD protection, correct IP ratings, and appropriate cable installation depth for buried runs.',
  },
  {
    question: 'Does a hot tub in the garden need a separate electrical installation?',
    answer:
      "Yes. Hot tubs require a dedicated electrical installation that is separate from the general garden electrical supply. The hot tub supply is covered in a separate guide — the HotTubElectricalConnectionPage. In brief: hot tubs typically require a 32A or 40A dedicated single-phase supply (for domestic models up to 3.5kW heater) or a three-phase supply (for commercial-grade models). The supply must be on a dedicated circuit with 30mA RCD, armoured cable, and an external isolator adjacent to the tub. Supplementary bonding of the hot tub metalwork is required. The installation must comply with BS 7671 special location requirements for outdoor areas near water. The hot tub manufacturer's installation manual specifies the exact electrical requirements.",
  },
  {
    question: 'Can festoon lighting be connected to the house ring circuit?',
    answer:
      'Festoon lighting (outdoor string lights) is typically low-power (LED bulbs of 1W to 5W each, 25 to 50 bulbs on a string = 25W to 250W total) and can be connected to the house ring circuit via an outdoor socket on a 30mA RCD-protected circuit — it does not need a dedicated circuit. However, the outdoor socket must be IP44 minimum, and the festoon light cable must be rated for outdoor use (not an extension lead intended for indoor use only). Many modern LED festoon lights are rated IP65 and can be used in rain. For permanent outdoor festoon installations wired into the outdoor socket infrastructure, use a weatherproof outdoor socket (IP66) and route the cable in a weatherproof conduit to the installation points.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size armoured cables for underground outdoor circuits to garden buildings and entertaining areas.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for outdoor garden electrical installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote outdoor entertaining area electrical packages including armoured cable and IP66 sockets.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/swimming-pool-electrical-installation',
    title: 'Swimming Pool Electrical Installation',
    description:
      'BS 7671 Section 702 requirements for pools adjacent to outdoor entertaining areas.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on armoured cable runs to remote garden buildings and BBQ areas.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description: 'Electrical considerations for garden rooms and orangeries adjacent to the house.',
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
    heading: 'Outdoor Entertaining Area Electrical: Gardens, Kitchens and Lighting',
    content: (
      <>
        <p>
          Outdoor entertaining areas — covered patios, garden kitchens, pergolas, decking areas, and
          garden bars — are one of the fastest-growing areas of domestic electrical work in the UK.
          Homeowners are investing in outdoor living spaces and expect the same level of electrical
          provision as indoors: weatherproof sockets, high-quality outdoor lighting, and sufficient
          supply for cooking appliances and audio-visual equipment.
        </p>
        <p>
          Outdoor electrical installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 714 (outdoor lighting) and the general requirements for protection against
          electric shock in outdoor environments, including Regulation 411.3.3 (mandatory RCD
          protection for outdoor sockets). Correct IP ratings, appropriate cable installation
          methods, and proper earthing and bonding are all critical elements.
        </p>
        <p>
          This guide covers IP ratings for outdoor use, outdoor socket and kitchen circuits, LED
          strip and festoon lighting options, the RCD requirements under Section 714 and Regulation
          411.3.3, hot tub considerations, and the testing and certification process.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Outdoor Electrical Equipment',
    content: (
      <>
        <p>
          IP (Ingress Protection) ratings define how well equipment is protected against water and
          dust ingress. The correct IP rating depends on the location:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">IPX4 — Splash Protected</h3>
            <p className="text-white text-sm leading-relaxed">
              Protected against water splashing from any direction. Minimum for sheltered outdoor
              locations under a covered patio or pergola where direct rain does not reach. Suitable
              for under-canopy luminaires and enclosed outdoor junction boxes in sheltered
              positions.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-600/15 border border-blue-600/25 p-5">
            <h3 className="font-bold text-white text-base mb-2">IPX5 — Water Jet Protected</h3>
            <p className="text-white text-sm leading-relaxed">
              Protected against water jets from any direction. Required for locations within 2m of a
              hosepipe point, outdoor shower, or power washer point. Suitable for exposed outdoor
              wall-wash luminaires and sockets in areas that may be hosed down.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-700/15 border border-blue-700/25 p-5">
            <h3 className="font-bold text-white text-base mb-2">
              IP65/IP66 — Dustproof and Jet Protected
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Fully dustproof (6) and protected against water jets (5) or powerful jets (6). IP66 is
              the standard for outdoor socket housings and weatherproof enclosures. IP65 is suitable
              for most outdoor luminaires not exposed to direct powerful jets.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-800/15 border border-blue-800/25 p-5">
            <h3 className="font-bold text-white text-base mb-2">IPX7/IPX8 — Immersion Protected</h3>
            <p className="text-white text-sm leading-relaxed">
              Protected against temporary (IPX7) or continuous (IPX8) immersion. Required for
              in-ground luminaires, underground cable junction points, and equipment in areas
              subject to flooding. IP68 is used for underwater pool lighting.
            </p>
          </div>
        </div>
        <p>
          Always verify the IP rating of each piece of equipment against its intended installation
          location. Downgrading IP ratings to reduce cost is a false economy — a luminaire that
          fails due to water ingress within its first winter is costly to replace and may cause a
          fault that trips the RCD.
        </p>
      </>
    ),
  },
  {
    id: 'outdoor-sockets',
    heading: 'Outdoor Sockets and Kitchen Circuits',
    content: (
      <>
        <p>
          Outdoor socket provision for an entertaining area should be generous — homeowners
          regularly need to connect outdoor speakers, string lights, phone chargers, a garden
          vacuum, and kitchen appliances simultaneously. Key requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP66 socket outlets</strong> — double sockets in weatherproof enclosures
                with spring-loaded flap covers (IP66 when closed, IPX4 or better when open and in
                use). Mount at a height of 450mm minimum from the finished floor level to avoid
                surface water ingress. Provide at least 2 double sockets per entertaining zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated kitchen appliance circuits</strong> — if the outdoor kitchen
                includes an induction hob (2kW to 3.5kW), electric grill, or pizza oven, a dedicated
                circuit from the consumer unit is required. An outdoor fridge (typically 100 to
                150W) can share the general outdoor socket circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD protection mandatory</strong> — Regulation 411.3.3 requires 30mA
                RCD protection for all socket outlets that may be expected to supply portable
                equipment for use outdoors. This applies to every outdoor socket regardless of the
                circuit type.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Armoured cable (SWA — steel wire armoured) is the standard cable type for buried outdoor
          circuits. Bury at a minimum depth of 500mm in a dedicated cable route, or 750mm under
          paths and driveways that may be subject to mechanical damage. Mark the cable route with
          cable marker tiles at 150mm depth above the cable, and record the route in the EIC
          documentation.
        </p>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Outdoor Lighting: LED Strip and Festoon',
    content: (
      <>
        <p>
          Outdoor lighting choices for entertaining areas range from 12V SELV LED strip (safe near
          water, ideal for under-seat and step lighting) to 230V weatherproof festoon lights
          (classic warm aesthetic for overhead coverage). Each has appropriate applications:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <Sun className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">12V SELV LED Strip</h3>
            <p className="text-white text-sm leading-relaxed">
              Powered by a weatherproof 12V or 24V transformer. Safe to touch even when wet — ideal
              for under-seat recesses, step lighting, and anywhere near water. Maximum run 5m at 12V
              (14.4W/m strip) before voltage drop requires upsizing to 24V. IP65 (silicone sleeve)
              or IP68 (fully waterproof) rating required for outdoor use.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <Sun className="w-6 h-6 text-orange-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">230V LED Strip and Festoon</h3>
            <p className="text-white text-sm leading-relaxed">
              Longer runs without voltage drop issues. Festoon lights (IP65 rated) on a weather-
              proof cable are the most popular outdoor entertaining lighting choice — warm white
              2700K LED filament bulbs create an excellent ambience. Must be connected to a 30mA
              RCD-protected outdoor socket or circuit.
            </p>
          </div>
        </div>
        <p>
          Wall-wash luminaires for boundary walls or fencing, spike spotlights for plants and garden
          features, and step lights in decking are all common elements of an outdoor entertaining
          area lighting scheme. All must be IP65 minimum for exposed outdoor use and connected to a
          30mA RCD-protected lighting circuit. Section 714 of BS 7671 applies to the outdoor
          lighting installation.
        </p>
        <SEOAppBridge
          title="Quote outdoor entertaining area electrical packages"
          description="Elec-Mate's quoting app allows UK electricians to price outdoor electrical packages with itemised armoured cable, IP66 sockets, LED strip lighting, and festoon supplies. Professional PDF quotes from the survey."
          icon={Sun}
        />
      </>
    ),
  },
  {
    id: 'rcd-section714',
    heading: 'Section 714 and Regulation 411.3.3: RCD Requirements',
    content: (
      <>
        <p>
          Two key references in BS 7671 govern RCD protection for outdoor electrical installations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3</strong> — requires that socket outlets with a rated
                current not exceeding 32A, that are for general use and may be expected to supply
                portable equipment for use outdoors, must have 30mA RCD protection. This is a
                mandatory requirement that applies to every outdoor socket outlet. An RCBO at the
                consumer unit, an RCD at the consumer unit covering the outdoor circuit, or an
                in-line RCD at the socket position are all acceptable methods of compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 714 (Outdoor Lighting)</strong> — additional requirements for
                outdoor luminaire circuits: RCD protection (30mA) for all outdoor luminaire
                circuits; cables buried in the ground must comply with Regulation 522.8.10 (minimum
                depth 500mm, or protected by conduit or armoured cable); luminaires must have
                appropriate IP rating for the installation location; and protection against thermal
                effects from luminaires must be considered (particularly for luminaires near
                combustible materials such as timber decking or garden furniture).
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, the most efficient way to comply is to install a dedicated outdoor circuits
          RCBO at the consumer unit (combining the MCB and 30mA RCD in one device) for each outdoor
          circuit — socket circuit, lighting circuit, and any dedicated appliance circuits. This
          provides individual fault discrimination and avoids the risk of a single RCD tripping all
          outdoor circuits simultaneously.
        </p>
      </>
    ),
  },
  {
    id: 'hot-tub',
    heading: 'Hot Tubs and Swim Spas',
    content: (
      <>
        <p>
          Hot tubs and swim spas are popular additions to outdoor entertaining areas and require
          their own dedicated electrical installation — they cannot simply be plugged into the
          outdoor socket circuit. The electrical requirements for a hot tub are covered in full in
          the HotTubElectricalConnectionPage. Key points:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated supply</strong> — a hot tub requires a dedicated circuit from the
                consumer unit — typically 32A or 40A single-phase on 6mm armoured cable. The outdoor
                entertaining area socket circuit cannot supply the hot tub.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding</strong> — all metalwork in and around the hot tub
                must be supplementary bonded to earth. This includes the tub frame, pipework, and
                the surrounding decking structure if it contains metalwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>External isolator</strong> — an external isolator (non-automatic, lockable)
                must be installed adjacent to the hot tub, within sight of the tub, for safe
                isolation during maintenance and emergency.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Where the outdoor entertaining area includes a hot tub, the zone distances from BS 7671
          Section 702 (swimming pools and similar) should be applied to the hot tub location — no
          general-purpose socket outlets within 2m of the hot tub perimeter.
        </p>
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          All new outdoor circuits must be tested and certified in accordance with BS 7671. The test
          schedule for outdoor circuits includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors throughout all outdoor circuit runs</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance (500V DC, minimum 1 megohm) — with all luminaires and
                equipment disconnected
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Polarity at all socket outlets, luminaire positions, and appliance connection points
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earth fault loop impedance (Zs) at the furthest outdoor socket on each circuit
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCD operation (30mA test) on each outdoor circuit at the RCBO or RCD device
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Functional test of all luminaires, sockets, and appliance circuits</span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          must be issued for all new outdoor circuits. The EIC should note the buried cable routes,
          the IP ratings of equipment installed, and the RCD protection on each circuit. Part P
          notification is required for all new circuits in a domestic dwelling.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outdoor Entertaining Electrical Work',
    content: (
      <>
        <p>
          Outdoor entertaining area electrical work is growing rapidly and the projects are often
          well-scoped and well-funded. Homeowners spending £10,000 to £50,000 on a garden redesign
          with outdoor kitchen, lighting, and decking will not baulk at a professional electrical
          package. Key points:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Coordinate with the Landscape Contractor
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Armoured cable must be buried before decking and paving is laid. Coordinate with
                  the landscape contractor to identify cable routes and burial depths before
                  groundworks begin. Returning after the decking is down to bury cables is expensive
                  for the homeowner and unprofessional.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Cable Routes in the EIC</h4>
                <p className="text-white text-sm leading-relaxed">
                  Buried cable routes must be documented on the EIC. Photograph the route before
                  covering, note the depths, and include the cable route plan as an attachment to
                  the certificate. This protects you and the homeowner if the cable is damaged in
                  future garden works.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Check Voltage Drop for Long Runs</h4>
                <p className="text-white text-sm leading-relaxed">
                  A 20m armoured cable run to a garden kitchen or remote entertaining area can have
                  significant voltage drop on 2.5mm cable. Use the{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>{' '}
                  to confirm that the cable size is adequate for the run length and confirm the MCB
                  size at the consumer unit end.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote outdoor entertaining area electrical packages on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for outdoor electrical quoting, cable sizing, and on-site EIC certification. Professional PDF quotes from the survey — armoured cable, IP66 sockets, and LED lighting all itemised. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutdoorEntertainingAreaElectricalPage() {
  return (
    <GuideTemplate
      title="Outdoor Entertaining Area Electrical UK | IP Ratings, Sockets and Lighting"
      description="Complete guide to outdoor entertaining area electrical installations in the UK. IP ratings for outdoor equipment, IP66 sockets, outdoor kitchen circuits, 12V SELV vs 230V LED strip, Section 714 and Regulation 411.3.3 RCD requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Outdoor Entertaining Area Electrical:{' '}
          <span className="text-yellow-400">IP Ratings, Sockets, Lighting and RCD Protection</span>
        </>
      }
      heroSubtitle="Outdoor entertaining areas need weatherproof sockets (IP66), dedicated kitchen circuits, LED strip and festoon lighting, and mandatory 30mA RCD protection under Regulation 411.3.3 and Section 714. This guide covers everything electricians need to know."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outdoor Entertaining Area Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Quote Outdoor Electrical Packages on Your Phone"
      ctaSubheading="Elec-Mate gives UK electricians professional quoting, cable sizing, and on-site EIC certification for outdoor entertaining area electrical installations. 7-day free trial, cancel anytime."
    />
  );
}
