import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  CookingPot,
  Lightbulb,
  Cable,
  FileCheck2,
  Calculator,
  GraduationCap,
  Wrench,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Fan,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Kitchen Rewire Cost', href: '/guides/kitchen-rewire-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Kitchen Rewire Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'circuits', label: 'Kitchen Circuits Explained' },
  { id: 'cooker-circuit', label: 'Cooker Circuit' },
  { id: 'lighting', label: 'Kitchen Lighting' },
  { id: 'island-power', label: 'Kitchen Island Power' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Kitchen Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A kitchen rewire in the UK typically costs between £800 and £2,500 depending on the number of circuits, appliances, and whether a new consumer unit is needed.',
  'A modern kitchen requires multiple dedicated circuits: cooker (45A), ring main for sockets, dedicated circuits for dishwasher, washing machine, and fridge-freezer, plus lighting circuits.',
  'Kitchen electrical work is notifiable under Part P of the Building Regulations in England and Wales — it must be carried out by a registered competent person or notified to Building Control.',
  'The cooker circuit alone (45A switch, 6.0mm² or 10.0mm² cable, connection unit) typically costs £200 to £350 to install, with cooker control units from approximately £7.60 at trade price.',
  'Under-cabinet lighting, island power, and extractor fan circuits are commonly added during a kitchen rewire and should be planned during the design stage to avoid costly retrospective work.',
];

const faqs = [
  {
    question: 'How much does a kitchen rewire cost in the UK?',
    answer:
      'A full kitchen rewire typically costs between £800 and £2,500 in the UK. A straightforward rewire of a small to medium kitchen (replacing existing circuits with modern wiring, new sockets, cooker connection, and lighting) is at the lower end. A large kitchen with a dedicated cooker circuit, island power supply, multiple dedicated appliance circuits, under-cabinet lighting, extractor fan, and a consumer unit upgrade is at the higher end. The cost depends on the number of circuits, the length of cable runs, accessibility (first floor kitchens cost more due to difficult cable routing), and whether the consumer unit needs replacing or upgrading.',
  },
  {
    question: 'Do I need a separate circuit for each kitchen appliance?',
    answer:
      'Not every appliance needs its own circuit, but certain high-power appliances do. A cooker must have a dedicated circuit (typically 45A with 6.0mm² or 10.0mm² cable depending on the cooker rating). An electric hob may also need a dedicated circuit. Dishwashers, washing machines, and fridge-freezers should ideally each have a dedicated spur or radial circuit (or at minimum be on a separate ring main from the general kitchen sockets) so that a tripped breaker does not affect the fridge-freezer. The socket ring main for worktop sockets is a separate circuit. Under-cabinet lighting and the extractor fan may share a lighting circuit or have dedicated circuits depending on the design.',
  },
  {
    question: 'How long does a kitchen rewire take?',
    answer:
      'A kitchen rewire typically takes 1.5 to 3 days for the electrical work. Day one covers first fix — running cables from the consumer unit, installing back boxes, and routing cables to appliance positions. Day two covers second fix — fitting sockets, switches, light fittings, connecting appliances, and testing. A third day may be needed for larger kitchens with multiple dedicated circuits, under-cabinet lighting, or if the consumer unit needs replacing. The electrician may need to coordinate with the kitchen fitter — ideally, the first-fix electrical work is done before the kitchen units are installed, and the second fix is completed after.',
  },
  {
    question: 'Should I rewire the kitchen during a kitchen renovation?',
    answer:
      'Absolutely. A kitchen renovation is the ideal time to rewire because the walls are accessible, appliance positions are being planned, and the cost of routing cables is much lower before new units and worktops are fitted. Retrofitting electrical work after a kitchen is finished means cutting into new plasterwork, lifting worktops, and making good — which adds significant cost and disruption. If the existing kitchen wiring is more than 25 years old, rewiring during the renovation is strongly recommended. Even if the wiring is newer, the renovation is an opportunity to add dedicated circuits, improve socket positions, and upgrade the lighting.',
  },
  {
    question: 'Can I add a socket to a kitchen island?',
    answer:
      'Yes, and it is increasingly requested. Power to a kitchen island requires a cable run under the floor to the island position. This is straightforward on a ground floor with access from below (cellar or crawl space) but more complex on a concrete slab where the cable must be routed through the floor screed or around the perimeter. The floor outlet can be a pop-up socket (flush-mounted in the worktop or the floor), a socket fitted into the island kickboard, or a pendant-style drop from the ceiling (for larger islands). A pop-up worktop socket costs £30 to £80 at trade price. The cable run and installation labour typically adds £150 to £300 to the project.',
  },
  {
    question: 'What size cable does a cooker need?',
    answer:
      'Most domestic cookers up to 13kW can be supplied by a 6.0mm² twin and earth cable on a 32A or 45A circuit. For cookers rated above 13kW (typically large range cookers), a 10.0mm² cable on a 45A circuit is required. The cooker control unit (typically a 45A double pole switch with a 13A socket, trade price from approximately £7.60) is mounted at a height between 1 and 1.5 metres, accessible but away from the hob heat zone. The cable must be sized for the current demand accounting for diversity — BS 7671 Table 10.2 provides the calculation method. Use the cable sizing calculator to verify the correct cable size for the specific cooker rating and circuit length.',
  },
  {
    question: 'Do I need an Electrical Installation Certificate for a kitchen rewire?',
    answer:
      'Yes. A kitchen rewire involves new circuits and is notifiable work under Part P. The electrician must issue an Electrical Installation Certificate (EIC) confirming that the new installation complies with BS 7671. If the work is carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA), they will self-certify the work and notify Building Control. If the electrician is not registered, the homeowner must apply to Building Control before the work starts. Keep the EIC — it is required when selling the property and may be requested by insurers.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for cooker circuits, ring mains, and dedicated appliance circuits.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on cooker circuits and long cable runs to kitchen islands.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for kitchen rewires on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create itemised quotes for kitchen rewires with accurate material and labour pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'Kitchen rewires often require a consumer unit upgrade to accommodate new circuits.',
    icon: ShieldCheck,
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
    heading: 'Kitchen Rewire: What It Costs in the UK',
    content: (
      <>
        <p>
          The kitchen is the most electrically demanding room in a UK home. It contains the
          highest-power appliances (cooker, hob, oven, dishwasher, washing machine), the most
          socket outlets, and increasingly sophisticated lighting. A kitchen rewire ensures that
          the electrical installation can safely supply all these loads with modern cable,
          properly rated circuits, and RCD protection.
        </p>
        <p>
          A typical kitchen rewire costs <strong>£800 to £2,500</strong> depending on the number
          of circuits, the size of the kitchen, and whether a consumer unit upgrade is included.
          The work is notifiable under{' '}
          <SEOInternalLink href="/guides/building-regulations-electrical">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          and must be carried out by a qualified electrician.
        </p>
        <p>
          This guide breaks down the costs, explains the circuits required for a modern kitchen,
          and covers the regulatory requirements.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Kitchen Rewire Cost Breakdown (2026 UK Prices)',
    content: (
      <>
        <p>
          The following table shows typical costs for kitchen electrical work in the UK. All
          prices include materials and labour.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Basic kitchen rewire</p>
                <p className="text-white text-sm">Ring main, cooker circuit, lighting, 6–8 sockets</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£800 – £1,200</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Mid-range kitchen rewire</p>
                <p className="text-white text-sm">Ring main, cooker, dedicated appliance circuits, under-cabinet lighting, extractor</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£1,200 – £1,800</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Large kitchen rewire</p>
                <p className="text-white text-sm">All above plus island power, multiple lighting zones, consumer unit upgrade</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£1,800 – £2,500</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Cooker circuit only</p>
                <p className="text-white text-sm">45A switch, 6.0mm² cable, connection to consumer unit</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£200 – £350</p>
            </div>
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <p className="font-bold text-white">Under-cabinet LED lighting</p>
                <p className="text-white text-sm">LED strip or puck lights, switched supply, 3–5 metre run</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£150 – £300</p>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white">Consumer unit upgrade (if needed)</p>
                <p className="text-white text-sm">New dual RCD or RCBO board with spare ways</p>
              </div>
              <p className="font-bold text-yellow-400 whitespace-nowrap ml-4">£350 – £600</p>
            </div>
          </div>
        </div>
        <p>
          Material costs are a relatively small proportion of the total. A 45A cooker control
          unit costs from approximately £7.60 at trade price. An extractor fan isolator switch
          costs from approximately £6 to £8. 2.5mm² twin and earth cable for the ring main costs
          approximately £0.80 to £1.20 per metre. The majority of the cost is labour for
          routing cables, fitting accessories, and testing.
        </p>
      </>
    ),
  },
  {
    id: 'circuits',
    heading: 'Kitchen Circuits Explained',
    content: (
      <>
        <p>
          A modern kitchen typically requires the following dedicated circuits from the consumer
          unit:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ring main (32A)</strong> — supplies the general worktop socket outlets.
                Typically 6 to 10 double sockets positioned above the worktop for small appliances
                (kettle, toaster, food processor, etc.). The ring main uses 2.5mm² twin and earth
                cable and is protected by a 32A MCB or RCBO with 30mA RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker circuit (32A or 45A)</strong> — a dedicated radial circuit for the
                cooker or built-in oven and hob. Cable size depends on the cooker rating: 6.0mm²
                for most cookers up to 13kW, 10.0mm² for larger range cookers. The circuit
                terminates at a 45A cooker control unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated appliance circuits</strong> — dishwasher, washing machine, and
                tumble dryer should each have a dedicated fused connection unit (FCU) or unswitched
                socket. This prevents a fault on one appliance from affecting others and ensures
                the fridge-freezer remains powered if another appliance trips a breaker.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuit</strong> — kitchen lighting (ceiling downlights,
                under-cabinet lights, pendant over island) on a dedicated lighting circuit or
                shared with the ground floor lighting. Separate switching zones for general ceiling
                light and under-cabinet task lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extractor fan</strong> — supplied from a fused spur (typically 3A fuse) or
                from the lighting circuit, depending on the fan type. A cooker hood may be supplied
                from an adjacent socket or a dedicated FCU. An isolator switch (trade price from
                approximately £6 to £8) should be accessible for maintenance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cooker-circuit',
    heading: 'Cooker Circuit: Sizing and Installation',
    content: (
      <>
        <p>
          The cooker circuit is the highest-power circuit in most kitchens. Getting it right
          requires careful cable sizing based on the cooker rating and the circuit length:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Cooker (up to 13kW)</h3>
            <p className="text-white text-sm leading-relaxed">
              Most built-in ovens and four-ring hobs with a combined rating up to 13kW can be
              supplied by a 32A circuit with 6.0mm² twin and earth cable. With the diversity
              allowance in BS 7671 Table 10.2 (first 10A + 30% of remainder + 5A for socket if
              fitted), the actual calculated demand is typically 20 to 30A. A 45A cooker control
              unit (trade price from approximately £7.60 for a basic unit, or £12.60 for a unit
              with neon indicator) provides the connection point and local isolation.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Range Cooker (above 13kW)</h3>
            <p className="text-white text-sm leading-relaxed">
              Large range cookers (such as Rangemaster, AGA, or Falcon) can draw 15 to 20kW or
              more. These require a 45A circuit with 10.0mm² twin and earth cable and a 45A
              connection unit. Some dual-fuel range cookers have a lower electrical rating because
              the hob is gas — check the data plate for the actual electrical rating before
              sizing the cable. The cable must be sized for voltage drop as well as current
              capacity, especially on longer runs.
            </p>
          </div>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          to verify the correct cable size for the specific cooker rating, circuit length, and
          installation method.
        </p>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Kitchen Lighting Options and Costs',
    content: (
      <>
        <p>
          Good kitchen lighting requires multiple layers — general ceiling lighting, task lighting
          over work surfaces, and accent or feature lighting. A well-designed lighting scheme
          transforms a kitchen and is a strong upsell opportunity for electricians:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED downlights</strong> — the standard for modern kitchen ceiling lighting.
                Fire-rated IP65 LED downlights from approximately £5 to £15 each at trade price
                (with spring clips from approximately £4). Typically 4 to 8 downlights in a medium
                kitchen. Supply and fit: £30 to £50 per downlight including cabling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-cabinet lighting</strong> — LED strip or individual puck lights
                mounted under wall units to illuminate the worktop. Provides essential task lighting
                for food preparation. LED strip costs £10 to £30 per metre. Requires a switched
                fused spur or connection to the lighting circuit. Total installed cost: £150 to £300.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pendant over island</strong> — decorative pendant lights over a kitchen
                island provide feature lighting and define the dining/social zone. Requires a
                ceiling outlet positioned above the island. The electrician needs the island
                position confirmed during first fix. Pendant wiring cost: £80 to £150 per pendant
                point (excluding the fitting).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'island-power',
    heading: 'Kitchen Island Power Supply',
    content: (
      <>
        <p>
          Kitchen islands are increasingly popular, and many homeowners want power sockets on
          the island for small appliances, phone charging, or a pop-up workspace. Providing power
          to a freestanding island requires planning:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor route</strong> — the standard approach is to run the cable under the
                floor to the island position. On suspended timber floors, this is straightforward.
                On concrete slab floors, the cable must be routed through a channel cut in the
                screed (before tiling) or around the perimeter of the room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pop-up sockets</strong> — flush-mounted sockets that pop up from the
                worktop when needed and push back flush when not in use. Available with 13A sockets
                and USB charging. Trade price: £30 to £80 per unit. Popular with homeowners because
                they keep the worktop clear.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kickboard sockets</strong> — sockets fitted into the kickboard (plinth)
                of the island, below the overhanging worktop. Less visible than worktop-mounted
                sockets. Requires coordination with the kitchen fitter to position the cut-out.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key is to plan the island power supply during the first-fix stage. Once the floor
          is tiled and the island is installed, adding a power supply retrospectively is
          significantly more expensive and disruptive. Typical cost for island power (cable run
          plus pop-up socket or kickboard socket): £150 to £350.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Building Regulations',
    content: (
      <>
        <p>
          A kitchen rewire is notifiable work under Part P of the Building Regulations in England
          and Wales. This is because it involves the installation of new circuits and typically
          takes place in a room containing a sink (which is treated as a special location in some
          interpretations of the regulations).
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Notifiable work</strong> — adding new circuits, installing a new consumer
                unit, or modifying existing circuits in a kitchen is notifiable. The work must be
                carried out by a registered competent person who can self-certify, or Building
                Control must be notified before the work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — an Electrical Installation Certificate (EIC)
                must be issued for a kitchen rewire. The certificate confirms that the installation
                has been designed, constructed, inspected, and tested in accordance with BS 7671.
                The homeowner should retain this certificate for property sale and insurance
                purposes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — all circuits in a kitchen must have 30mA RCD
                protection. This is provided by RCBOs at the consumer unit (one per circuit) or
                by an RCD protecting a group of circuits. Socket outlets must have additional
                protection per Regulation 411.3.3.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Kitchen Rewires',
    content: (
      <>
        <p>
          Kitchen rewires are high-value domestic jobs with good margins. A typical kitchen
          rewire takes 1.5 to 3 days and is worth £800 to £2,500. They also create opportunities
          for upselling — under-cabinet lighting, island power, smart switches, and consumer unit
          upgrades.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size cooker circuits, ring mains, and dedicated appliance circuits with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Apply diversity for cooker circuits per BS 7671 Table 10.2.
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
                  Price the full kitchen rewire with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Ring main, cooker circuit, appliance circuits, lighting, extractor, island
                  power, consumer unit — all itemised with your margins. Send a professional PDF
                  quote from the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  after testing the kitchen rewire. AI board scanning captures all circuit details.
                  Voice test entry speeds up the schedule of test results. Issue the certificate
                  to the homeowner on the day of completion.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify kitchen rewires on your phone"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Price kitchen rewires accurately and deliver professional documentation. 7-day free trial."
          icon={CookingPot}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function KitchenRewireCostPage() {
  return (
    <GuideTemplate
      title="Kitchen Rewire Cost UK 2026 | Electrical Pricing Guide"
      description="How much does a kitchen rewire cost in the UK? Typical prices from £800 to £2,500. Cooker circuits, ring mains, under-cabinet lighting, island power, extractor fans, and Part P requirements explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Kitchen Rewire Cost:{' '}
          <span className="text-yellow-400">UK Electrical Pricing Guide 2026</span>
        </>
      }
      heroSubtitle="How much does a kitchen rewire cost in the UK? This guide covers typical prices from £800 to £2,500, cooker circuits, dedicated appliance circuits, under-cabinet lighting, island power, and Part P notification requirements."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Kitchen Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Kitchen Rewires on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for kitchen rewires. 7-day free trial, cancel anytime."
    />
  );
}
