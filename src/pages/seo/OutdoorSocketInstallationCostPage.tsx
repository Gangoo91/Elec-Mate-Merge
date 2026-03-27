import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Plug,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  GraduationCap,
  Cable,
  CloudRain,
  Wrench,
  ClipboardCheck,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Outdoor Socket Cost', href: '/guides/outdoor-socket-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Outdoor Socket Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'ip-ratings', label: 'IP Ratings Explained' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'cable-and-trenching', label: 'Cable Routes and Trenching' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'diy-vs-professional', label: 'DIY vs Professional Installation' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Outdoor Sockets' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An outdoor socket installation in the UK typically costs between £150 and £400, depending on the cable route, trenching requirements, and the type of socket fitted.',
  'Outdoor sockets must be IP66 rated (protected against powerful water jets) and supplied via a dedicated circuit with 30mA RCD protection as required by BS 7671.',
  'The cable route is the biggest variable cost — a short surface-mounted run from the consumer unit costs far less than a buried SWA cable run across a garden.',
  'Outdoor socket installation is notifiable under Part P of the Building Regulations in England and Wales, meaning the work must be carried out by a registered competent person or notified to Building Control.',
  'Material costs are modest (IP66 socket from around £10, weatherproof enclosure from around £5), so the majority of the cost is labour and any trenching or making good.',
];

const faqs = [
  {
    question: 'How much does it cost to install an outdoor socket in the UK?',
    answer:
      'The typical cost to install a single outdoor socket in the UK ranges from £150 to £400. A straightforward installation where the cable runs through an external wall directly behind an existing consumer unit is at the lower end (£150 to £200). If the cable needs to run underground in SWA (steel wire armoured cable) across a patio or garden, trenching and reinstatement push the cost to £250 to £400 or more. The socket unit itself (IP66 rated, double weatherproof) costs between £10 and £25 at trade price. The majority of the cost is labour, cable, and any groundwork.',
  },
  {
    question: 'Do I need an electrician to install an outdoor socket?',
    answer:
      'Yes. Installing an outdoor socket is notifiable work under Part P of the Building Regulations in England and Wales because it involves adding a new circuit in a special location (outdoors). The work must be carried out by an electrician registered with a competent person scheme (such as NICEIC, NAPIT, or ELECSA) who can self-certify the work, or you must apply to Building Control before starting. A qualified electrician will ensure the circuit is correctly protected by a 30mA RCD, the cable is appropriately rated and routed, and the installation complies with BS 7671. An Electrical Installation Certificate (EIC) or Minor Works Certificate must be issued on completion.',
  },
  {
    question: 'What IP rating does an outdoor socket need?',
    answer:
      'Outdoor sockets in the UK should be rated at least IP66 when the lid is closed. IP66 means the socket is completely dust-tight (6) and protected against powerful water jets (6). When the socket is in use with a plug inserted, the effective IP rating may be lower — some sockets maintain IP66 with the plug in place via a hinged cover, while others drop to IP44. For locations exposed to direct rainfall or garden hose spray, choose a socket that maintains at least IP55 with the plug inserted. The IP rating is stamped on the product and listed in the specification sheet.',
  },
  {
    question: 'Can an outdoor socket be on an existing ring main?',
    answer:
      'Technically, a spur from an existing ring main can supply an outdoor socket, but best practice is to install a dedicated radial circuit from the consumer unit protected by a 30mA RCD (or RCBO). A dedicated circuit means the outdoor socket can be isolated independently without affecting internal sockets, and the RCD protection is not shared with other circuits where nuisance tripping would be inconvenient. If the existing consumer unit has no spare ways, a small enclosure with an RCBO can be mounted adjacent to the consumer unit to supply the outdoor circuit. Regulation 701 and Section 722 of BS 7671 provide guidance on circuits in external locations.',
  },
  {
    question: 'How deep does cable need to be buried for an outdoor socket?',
    answer:
      'SWA (steel wire armoured) cable buried directly in the ground should be at a minimum depth of 500mm (0.5 metres). If the cable runs under a driveway or area subject to vehicular traffic, the minimum depth increases to 600mm. The cable should be laid on a bed of sand or fine soil, covered with marker tape (yellow "CAUTION ELECTRIC CABLE BELOW" tape), and backfilled. Alternatively, the cable can be routed through buried ducting (typically 50mm or 63mm MDPE duct), which allows the cable to be replaced in the future without re-excavating. The route should be recorded and a plan provided to the homeowner.',
  },
  {
    question: 'What size cable do I need for an outdoor socket?',
    answer:
      'For a single 13A outdoor socket on a radial circuit up to 20 metres from the consumer unit, 2.5mm² twin and earth cable is typically sufficient for an internal run. For an underground run, 2.5mm² 3-core SWA cable is the standard choice. The cable must be sized for current-carrying capacity, voltage drop (maximum 5% of 230V = 11.5V), and earth fault loop impedance. For longer runs or where multiple sockets are installed, 4.0mm² SWA may be required. Use the cable sizing calculator to verify the correct size for the specific installation conditions.',
  },
  {
    question: 'How long does it take to install an outdoor socket?',
    answer:
      'A straightforward outdoor socket installation — drilling through an external wall, mounting the socket, running cable from the consumer unit, and testing — takes approximately 2 to 3 hours. If underground trenching is required, allow a full day (6 to 8 hours) for excavation, cable laying, backfilling, and reinstatement. The electrical work itself (wiring, connections, testing, certification) typically takes 1.5 to 2 hours regardless of the cable route. The trenching and groundwork is what adds time and cost.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for outdoor socket installations including SWA buried cable runs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long outdoor cable runs from consumer unit to socket.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for outdoor socket installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Price outdoor socket installations accurately with itemised professional quotes.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Outdoor EV charger installations share many of the same cable routing and RCD requirements.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
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
    heading: 'Outdoor Socket Installation: What It Costs and What Is Involved',
    content: (
      <>
        <p>
          An outdoor socket is one of the most commonly requested domestic electrical jobs in the UK.
          Homeowners want power in the garden for lawnmowers, pressure washers, lighting,
          hot tubs, and electric barbecues. The installation is straightforward for a qualified
          electrician, but the cost varies significantly depending on the cable route and
          groundwork required.
        </p>
        <p>
          The typical price range is <strong>£150 to £400</strong> for a single IP66 rated
          outdoor socket. The lower end applies where the cable runs directly through an external
          wall behind the consumer unit. The higher end applies where underground SWA cable,
          trenching, and surface reinstatement are needed.
        </p>
        <p>
          This guide breaks down the costs, explains the technical requirements under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671
          </SEOInternalLink>
          , and covers Part P notification, IP ratings, RCD protection, and cable selection.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Outdoor Socket Cost Breakdown (2026 UK Prices)',
    content: (
      <>
        <p>
          The table below shows typical costs for outdoor socket installation in the UK. All prices
          include materials and labour unless stated otherwise. Prices are based on trade rates and
          a qualified electrician registered with a competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Simple through-wall installation</p>
                <p className="text-white text-sm">Cable through external wall, surface-mount socket, spur or new RCBO</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£150 – £200</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Surface-mounted SWA run (up to 10m)</p>
                <p className="text-white text-sm">SWA cable clipped to external wall or fence, IP66 socket</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£200 – £300</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Underground SWA run (up to 15m)</p>
                <p className="text-white text-sm">Trench, sand bed, SWA cable, marker tape, backfill</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£300 – £400</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Underground SWA run (15m+)</p>
                <p className="text-white text-sm">Longer trench, possible 4.0mm² SWA, additional making good</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£400 – £600+</p>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">IP66 weatherproof socket (materials only)</p>
                <p className="text-white text-sm">Double socket with hinged cover, trade price</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£10 – £25</p>
            </div>
          </div>
        </div>
        <p>
          Additional costs may apply if the consumer unit has no spare ways (add £80 to £150 for a
          new RCBO or small enclosure), if patio slabs or concrete need cutting and reinstating
          (add £100 to £200), or if the installation requires Building Control notification
          (£100 to £300 if not self-certified via a competent person scheme).
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Outdoor Sockets',
    content: (
      <>
        <p>
          IP (Ingress Protection) ratings define how well an enclosure protects against dust and
          water. For outdoor sockets in the UK, the minimum recommended rating is IP66:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP66</h3>
            <p className="text-white text-sm leading-relaxed">
              Dust-tight and protected against powerful water jets from any direction. This is the
              standard rating for outdoor sockets in the UK. The socket is fully sealed when the
              lid is closed. Suitable for wall-mounted positions and most garden locations.
              Weatherproof enclosures from manufacturers such as Legrand (Plexo range, trade price
              from approximately £5) provide IP55 or IP66 protection.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP67 / IP68</h3>
            <p className="text-white text-sm leading-relaxed">
              IP67 is protected against temporary immersion in water. IP68 is protected against
              continuous immersion. These ratings are not normally required for standard outdoor
              sockets but may be specified for sockets in locations at risk of flooding, near
              ponds, or in areas where standing water is possible. IP67/68 sockets and enclosures
              cost more and are less commonly stocked at wholesalers.
            </p>
          </div>
        </div>
        <p>
          When specifying an outdoor socket, check the IP rating with the lid both open and closed,
          and with a plug inserted. Some budget sockets achieve IP66 with the lid closed but drop
          to IP44 when a plug is inserted. For permanently connected equipment, this is acceptable.
          For general use where the socket may be left open in rain, choose a socket that maintains
          at least IP55 with the plug in place.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements',
    content: (
      <>
        <p>
          BS 7671 requires that socket outlets with a rated current not exceeding 32A installed
          outdoors or in locations where there is an increased risk of electric shock must be
          protected by a 30mA RCD. This is a mandatory requirement, not a recommendation.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD protection</strong> — required for all outdoor socket outlets.
                This can be provided by an RCBO (combined MCB and RCD) in the consumer unit, an
                RCD protecting a group of circuits, or a standalone RCD enclosure. An RCBO is
                preferred because it provides individual protection without affecting other circuits
                if it trips. Trade price for a branded RCBO starts from approximately £17 to £25.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional protection</strong> — Regulation 415.1.1 requires additional
                protection by an RCD with a rated residual operating current not exceeding 30mA
                for socket outlets rated 32A or less in all locations, with limited exceptions.
                Outdoor sockets fall squarely within this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance</strong> — the circuit must meet the maximum Zs
                value for the protective device to ensure disconnection within the required time
                (0.4 seconds for a socket outlet circuit). Longer SWA cable runs increase Zs, so
                this must be calculated at the design stage and verified by testing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-and-trenching',
    heading: 'Cable Routes and Trenching Costs',
    content: (
      <>
        <p>
          The cable route is the single biggest factor in the overall cost of an outdoor socket
          installation. The three common approaches are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Through-wall</strong> — the simplest and cheapest route. A core drill
                through the external wall directly behind the consumer unit, with the cable running
                through a sleeve and the socket mounted on the outside wall. Total cable run is
                typically under 2 metres. Cost: minimal (included in labour).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted SWA</strong> — SWA cable clipped to the external wall,
                along a fence, or along a garden structure. No trenching required, but the cable
                is visible. SWA is mechanically protected and suitable for external surface
                mounting. 2.5mm² 3-core SWA cable costs approximately £2.50 to £3.50 per metre at
                trade price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground SWA</strong> — the preferred route for sockets positioned away
                from the house. The trench must be at least 500mm deep (600mm under driveways).
                Trenching through a lawn is relatively easy; cutting through concrete or paving is
                significantly more expensive. Trenching costs vary from £20 to £40 per metre
                depending on the ground conditions. Reinstatement of paving adds further cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For cable runs exceeding 20 metres, voltage drop becomes a consideration. Use the{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          to check that the total voltage drop does not exceed 5% (11.5V) at full load. Longer
          runs may require upsizing from 2.5mm² to 4.0mm² SWA.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Building Regulations',
    content: (
      <>
        <p>
          In England and Wales, installing an outdoor socket is{' '}
          <SEOInternalLink href="/guides/building-regulations-electrical">
            notifiable work under Part P
          </SEOInternalLink>{' '}
          of the Building Regulations. This is because outdoor locations are classified as special
          locations, and the work involves adding a new circuit (or extending an existing circuit
          to a special location).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme</strong> — if the electrician is registered with
                NICEIC, NAPIT, ELECSA, or another approved scheme, they can self-certify the work
                and notify Building Control on the homeowner's behalf. No separate Building Control
                application is needed. This is the standard route and is included in the
                electrician's fee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control notification</strong> — if the electrician is not registered
                with a competent person scheme, the homeowner must apply to the local authority
                Building Control before the work starts. Building Control will inspect the work and
                issue a completion certificate. The fee for this varies by local authority, typically
                £100 to £300.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In Scotland, the Building Standards system applies. Electrical work in dwellings does not
          require a building warrant provided it is carried out by a competent person. In Northern
          Ireland, Part P applies similarly to England and Wales.
        </p>
      </>
    ),
  },
  {
    id: 'diy-vs-professional',
    heading: 'DIY vs Professional Installation',
    content: (
      <>
        <p>
          While some homeowners consider installing an outdoor socket themselves, this is not
          recommended and in most cases not legally compliant:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal requirement</strong> — outdoor socket installation is notifiable under
                Part P. DIY installation without Building Control approval is a breach of the
                Building Regulations and can cause problems when selling the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safety risk</strong> — outdoor circuits operate in wet conditions and are
                at higher risk of earth faults. Incorrect installation can result in electric shock,
                particularly if RCD protection is not correctly installed or the earthing
                arrangement is inadequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications</strong> — home insurance policies may not cover
                damage or injury caused by non-compliant electrical work. If a fire or injury
                results from a DIY outdoor socket, the insurer may reject the claim.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The cost difference between DIY and professional installation is modest — materials
          cost £30 to £60, while a professional installation is £150 to £400 including materials,
          testing, certification, and Part P compliance. The professional route includes an
          Electrical Installation Certificate that confirms the work meets BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Outdoor Socket Installations',
    content: (
      <>
        <p>
          Outdoor socket installations are bread-and-butter work for domestic electricians. They
          are quick to complete, have good margins, and often lead to additional work (garden
          lighting, EV charger preparation, hot tub supply). Here is how to quote them accurately:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the SWA cable run from consumer unit to outdoor socket with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Check voltage drop on longer runs. Get the correct cable size confirmed
                  on site during the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the complete job with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . IP66 socket, SWA cable (per metre), RCBO, glands, trenching labour, testing,
                  and Part P notification — all itemised with your margins.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Minor Works Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  on site after testing. AI-assisted test entry and instant PDF export. Send the
                  certificate to the homeowner before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify outdoor socket installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. Everything you need to price and complete outdoor socket jobs. 7-day free trial."
          icon={Plug}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutdoorSocketInstallationCostPage() {
  return (
    <GuideTemplate
      title="Outdoor Socket Installation Cost UK 2026 | Price Guide"
      description="How much does it cost to install an outdoor socket in the UK? Typical prices from £150 to £400. IP66 rated sockets, SWA cable, RCD protection, Part P notification, and trenching costs explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Outdoor Socket Installation Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does it cost to install an outdoor socket in the UK? This guide covers typical prices from £150 to £400, IP66 rated sockets, SWA cable routes, RCD protection requirements, Part P notification, and trenching costs."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outdoor Socket Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Outdoor Socket Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site certification. 7-day free trial, cancel anytime."
    />
  );
}
