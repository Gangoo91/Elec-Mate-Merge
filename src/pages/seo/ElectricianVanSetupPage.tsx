import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Car,
  Briefcase,
  Wrench,
  ShieldCheck,
  Package,
  Lock,
  Ruler,
  Fuel,
  PoundSterling,
  TrendingUp,
  BarChart3,
  Calculator,
  Receipt,
  Zap,
  Settings,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Career', href: '/guides' },
  { label: 'Van Setup', href: '/guides/electrician-van-setup' },
];

const tocItems = [
  { id: 'choosing-a-van', label: 'Choosing a Van' },
  { id: 'racking-systems', label: 'Racking Systems' },
  { id: 'tool-organisation', label: 'Tool Organisation' },
  { id: 'stock-management', label: 'Stock Management' },
  { id: 'van-security', label: 'Van Security' },
  { id: 'running-costs', label: 'Running Costs' },
  { id: 'van-setup-checklist', label: 'Setup Checklist' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Ford Transit Custom and Vauxhall Vivaro are the most popular vans for UK electricians -- large enough for a full tool kit and ladders, small enough to park on residential streets.',
  'A proper racking system (Sortimo, Bott, Van Guard) costs GBP 500-GBP 2,000 but pays for itself in time saved -- most electricians save 15-30 minutes per day finding tools and materials.',
  'Stock management is about carrying the right materials, not the most materials. A well-stocked van covers 80% of common jobs without a wholesaler visit.',
  'Van security is essential -- tool theft costs UK tradespeople over GBP 30 million per year. Deadlocks, slam locks, tool vaults, and GPS trackers are basic requirements.',
  'Total van running costs (finance, fuel, insurance, servicing, road tax) typically run GBP 5,000-GBP 10,000 per year -- a significant business expense that must be factored into your pricing.',
];

const faqs = [
  {
    question: 'What is the best van for an electrician in the UK?',
    answer:
      'The most popular van choices for UK electricians are the Ford Transit Custom (the best-seller by a significant margin), the Vauxhall Vivaro, the Citroen Dispatch, and the Volkswagen Transporter. These are all medium-sized vans (SWB or LWB) that offer a good balance of cargo space, fuel economy, and manoeuvrability. Most electricians do not need a full-size Transit or Movano unless they carry extensive stock, run a team, or do large commercial work. For domestic-only electricians with a minimal tool kit, a smaller van like the Citroen Berlingo or Ford Transit Connect can work, though space is tight with ladders. The key factors are: payload capacity (you need enough for tools, test equipment, materials, and a ladder set), internal height (can you fit racking?), fuel economy (diesel is still the most common, though electric vans are becoming viable for urban electricians), and reliability (downtime costs you money).',
  },
  {
    question: 'How much does it cost to set up an electrician van?',
    answer:
      'The cost of setting up a van from empty varies depending on the level of racking and organisation you want. A basic setup -- shelving, a few storage boxes, and some tool bags -- can be done for GBP 200-GBP 500. A professional racking system from Sortimo, Bott, or Van Guard typically costs GBP 800-GBP 2,000 for a medium van, including modular shelving, drawer units, cable reel holders, and pipe/conduit storage. Additional costs include a roof rack or internal ladder clamp (GBP 100-GBP 300), a power inverter for charging batteries (GBP 50-GBP 200), additional lighting (GBP 30-GBP 80), floor protection (GBP 50-GBP 150), and security upgrades such as deadlocks and slam locks (GBP 200-GBP 500). In total, a well-equipped electrician van setup costs GBP 1,500-GBP 3,500 on top of the van purchase price. Most electricians consider this a worthwhile investment that pays for itself in productivity within 3-6 months.',
  },
  {
    question: 'What racking system is best for electricians?',
    answer:
      "The three leading van racking brands for UK electricians are Sortimo, Bott, and Van Guard. Sortimo is the premium option (GBP 1,500-GBP 3,000 for a full setup) with the highest build quality, modular design, and removable cases. Bott is a strong mid-range choice (GBP 800-GBP 2,000) with excellent durability and a wide range of configurations. Van Guard offers good value (GBP 500-GBP 1,500) with a focus on simplicity and functionality. All three offer vehicle-specific fitting kits that bolt into existing anchor points without drilling. The best system depends on your budget, the van you drive, and how much stock you carry. For a sole trader doing domestic work, a simple Bott or Van Guard setup with shelving, drawers, and a cable reel holder is usually sufficient. For a contractor carrying extensive stock for multiple job types, Sortimo's modular case system allows you to configure and reconfigure your van layout as your needs change.",
  },
  {
    question: 'How do I prevent tool theft from my van?',
    answer:
      'Tool theft from vans is a serious problem in the UK, costing tradespeople over GBP 30 million per year. The most effective approach uses multiple layers of security. First, physical locks: replace the standard van lock with a deadlock or slam lock on the rear and side doors (GBP 100-GBP 250 per door). Second, a tool vault or safe bolted to the van floor for high-value items like multifunction testers and power tools (GBP 150-GBP 400). Third, a GPS tracker so the van can be located if stolen (GBP 100-GBP 300 for the unit plus a monthly subscription). Fourth, an alarm system with movement sensors (GBP 150-GBP 400). Fifth, park strategically -- in well-lit areas, with the rear doors against a wall, and avoid leaving the van in the same spot overnight if possible. Sixth, do not leave tools on display -- keep the load area out of sight with window blanking or a solid bulkhead. Finally, ensure your tool and equipment insurance is adequate and up to date -- check the single-item limit and total cover amount.',
  },
  {
    question: 'Should I buy, finance, or lease a van?',
    answer:
      'Each option has pros and cons. Buying outright (cash purchase) gives you immediate ownership with no monthly payments, but requires a large upfront sum (GBP 15,000-GBP 35,000 for a new medium van). Finance (hire purchase or personal contract purchase) spreads the cost over 3-5 years with monthly payments of GBP 300-GBP 600, and you own the van at the end. Leasing (contract hire) gives you a new van every 3-4 years with fixed monthly payments (GBP 250-GBP 500 including maintenance), but you never own the vehicle and there are mileage limits with excess charges. For most sole-trader electricians, hire purchase on a 1-2 year old van offers the best balance: you get a reliable vehicle at a lower price than new, you spread the cost, and you own it outright after 3-4 years of payments. Use the Elec-Mate Equipment ROI Calculator to compare the total cost of each option over your expected ownership period.',
  },
  {
    question: 'What stock should I carry in my van?',
    answer:
      "The goal is to carry enough to complete 80% of common jobs without visiting the wholesaler, without carrying so much that your van is overloaded and disorganised. For domestic electricians, a good starting stock includes: twin and earth cable (1mm, 1.5mm, 2.5mm, 4mm, 6mm, 10mm in small drums), 3-core flex (0.75mm, 1mm), earth sleeving, a selection of sockets, switches, and faceplates (white and chrome in the most common sizes), FCUs (fused connection units) both switched and unswitched, ceiling roses and battenholder, downlights, cable clips and fixings for all cable sizes, junction boxes (20A and 30A), wiring accessories (connector blocks, Wago connectors, crimp terminals), conduit and trunking in common sizes, consumer unit components (spare MCBs, RCBOs, SPD, blank modules), cable glands, fire hoods, and miscellaneous fixings (screws, rawl plugs, saddle clips). Keep a stock checklist and replenish weekly from the wholesaler. Elec-Mate's expense tracker can help you monitor stock costs by category.",
  },
  {
    question: 'Are electric vans practical for electricians?',
    answer:
      'Electric vans are becoming increasingly viable for urban electricians. The Ford E-Transit Custom, Vauxhall Vivaro Electric, and Citroen e-Dispatch all offer ranges of 150-200 miles on a single charge, which is sufficient for most electricians who operate within a city or local area. The advantages include significantly lower fuel costs (approximately 4p per mile for electricity versus 15-20p per mile for diesel), zero road tax, zero congestion charge in London, and lower maintenance costs (no oil changes, fewer brake pad replacements due to regenerative braking). The disadvantages are higher purchase price (typically GBP 10,000-GBP 15,000 more than the diesel equivalent), range anxiety on long-range days, charging time (overnight charging at home is the most practical approach), and reduced payload due to battery weight. For electricians who primarily work within a 30-mile radius and can charge at home overnight, an electric van is a strong financial choice. The total cost of ownership over 5 years can be lower than diesel when fuel savings and tax advantages are factored in.',
  },
];

const sections = [
  {
    id: 'choosing-a-van',
    heading: 'Choosing the Right Van for Electrical Work',
    content: (
      <>
        <p>
          Your van is your mobile workshop, your material store, your office, and your brand
          ambassador. The right van choice affects your daily productivity, your fuel costs, your
          professional image, and your comfort. It is worth investing time in the decision rather
          than buying the first thing you see on AutoTrader.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Van Size Guide for Electricians</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Small van (Berlingo, Caddy, Connect):</strong> GBP 18,000-GBP 25,000 new.
                Economical (40-50 mpg), easy to park, and cheap to insure. Suitable for
                domestic-only electricians with a compact tool kit. Limited ladder storage -- may
                need an external rack. Cargo volume: 3-4 cubic metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Medium van SWB (Transit Custom, Vivaro, Trafic):</strong> GBP 25,000-GBP
                35,000 new. The most popular choice. Fits a full racking system, internal ladders,
                and a good stock of materials. 35-42 mpg. Cargo volume: 5-6 cubic metres.
                Comfortable for daily driving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Medium van LWB (Transit Custom LWB, Vivaro LWB):</strong> GBP 27,000-GBP
                38,000 new. Extra length for more racking and stock. Better for electricians who
                carry extensive materials or work with an apprentice. Cargo volume: 6-7 cubic
                metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Large van (Transit, Master, Movano):</strong> GBP 32,000-GBP 45,000+ new.
                Only necessary for contractors carrying extensive stock, running teams with shared
                vehicles, or doing large-scale commercial work. 28-35 mpg. Cargo volume: 10-15 cubic
                metres. Harder to park.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most self-employed electricians doing a mix of domestic and light commercial work, a
          medium SWB van is the sweet spot. The Ford Transit Custom dominates the market for good
          reason: it is reliable, well-supported by dealers, has excellent aftermarket racking
          options, and holds its resale value well. The Vauxhall Vivaro and Citroen Dispatch are
          strong alternatives with competitive pricing.
        </p>
        <p>
          When buying, check the payload rating carefully. Racking, tools, materials, and a ladder
          set can easily weigh 300-500 kg. If the van's payload is only 800 kg, you are already at
          40-60% of capacity before you load any job-specific materials. Running overweight risks a
          fine, invalidates your insurance, and puts excessive wear on the vehicle.
        </p>
      </>
    ),
  },
  {
    id: 'racking-systems',
    heading: 'Van Racking Systems for Electricians',
    content: (
      <>
        <p>
          A racking system transforms a bare van into a professional mobile workshop. Without
          racking, tools and materials slide around, get damaged, and are impossible to find
          quickly. With proper racking, everything has a designated place, is immediately
          accessible, and is visible at a glance.
        </p>
        <p>
          <strong className="text-yellow-400">The time saving is the main benefit.</strong>{' '}
          Electricians with well-organised vans report saving 15-30 minutes per day compared to
          working from an unracked van. Over a year, that is 60-120 hours -- 8 to 15 additional
          billable days. At GBP 225 per day, that is GBP 1,800 to GBP 3,375 per year in productivity
          gains from a racking system that costs GBP 800 to GBP 2,000.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Essential Racking Components</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Modular shelving:</strong> Adjustable shelves on both sides of the van. Use
                smaller compartments at the top (for accessories, fixings, and small items) and
                larger shelves at the bottom (for cable drums, consumer units, and heavy items).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Drawer units:</strong> Ideal for fixings, connectors, fuses, and small
                accessories. Label every drawer. Pull-out drawers give full visibility of contents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Cable reel holder:</strong> A spindle or bracket that holds cable drums
                horizontally so you can pull off the length you need without removing the drum from
                the van.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Conduit and trunking storage:</strong> Overhead or side-mounted brackets to
                hold lengths of conduit, trunking, and mini-trunking without them rolling around the
                cargo area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Ladder clamp or internal rack:</strong> Secure your ladders inside the van
                (prevents theft and damage) or on an external roof rack with locking clamps.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The best racking systems use vehicle-specific mounting kits that bolt into the van's
          existing threaded anchor points. This means no drilling into the van body, easy removal if
          you change vehicles, and preserved resale value. Companies like Sortimo, Bott, and Van
          Guard all offer vehicle-specific kits for all popular van models.
        </p>
      </>
    ),
  },
  {
    id: 'tool-organisation',
    heading: 'Tool Organisation for Maximum Efficiency',
    content: (
      <>
        <p>
          Beyond the racking system itself, how you organise your tools within it determines your
          daily efficiency. The principle is simple: the tools you use most should be the most
          accessible. Tools you use every day should be within arm's reach when you open the van
          doors. Tools you use weekly can be on higher or deeper shelves.
        </p>
        <p>
          <strong className="text-yellow-400">A tool bag or tote system</strong> works alongside
          your van racking. Rather than carrying individual tools to and from the job, pack a tool
          bag with the essentials for the type of work you are doing. A "first fix" bag might
          contain your SDS drill, cable rods, fixings, and marking equipment. A "second fix" bag
          contains screwdrivers, pliers, strippers, and a selection of faceplates. A "testing" bag
          contains your{' '}
          <SEOInternalLink href="/guides/electrician-tool-list-uk">
            multifunction tester
          </SEOInternalLink>
          , voltage indicator, proving unit, and test leads. Pre-packing these bags means you grab
          one bag for the task and head to the job, rather than making multiple trips to the van.
        </p>
        <p>
          <strong className="text-yellow-400">Labelling everything</strong> is not overkill -- it is
          essential. Label every drawer, shelf, and storage box. When you are looking for a specific
          MCB or fuse at 4pm on a Friday, you do not want to open six drawers before finding it.
          Labels also help apprentices and new team members find what they need without asking.
        </p>
        <p>
          Consider a power management setup too. A small inverter (300-600W) connected to your van
          battery or a dedicated leisure battery lets you charge tool batteries, run a laptop for
          certificates, and power a small light for working in the van during dark winter mornings.
          The investment is typically GBP 50-GBP 200 and saves regular trips to find a socket.
        </p>
        <SEOAppBridge
          title="Tool and Equipment Tracking"
          description="Track your complete tool inventory, calibration dates, replacement costs, and insurance values. Get reminders when calibration is due. Know exactly what you own and what it is worth."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'stock-management',
    heading: 'Van Stock Management',
    content: (
      <>
        <p>
          The goal of van stock management is simple: carry enough to complete most common jobs
          without a wholesaler visit, but not so much that your van is overloaded, disorganised, or
          carrying obsolete stock. The sweet spot varies by electrician, but the 80/20 rule applies:
          20% of your stock items cover 80% of your jobs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Core Van Stock for Domestic Electricians
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Cable:</strong> T&E in 1mm, 1.5mm, 2.5mm, 4mm, 6mm, 10mm (small drums).
                3-core flex in 0.75mm and 1mm. SWA in 2.5mm and 4mm 3-core (short lengths for
                outdoor feeds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Accessories:</strong> Single and double sockets (white and chrome), 1-gang
                and 2-gang switches, FCUs, cooker switches, shaver sockets, ceiling roses,
                battenholders, and blank plates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Protection devices:</strong> Spare MCBs (6A, 16A, 20A, 32A, 40A), RCBOs
                (common ratings), SPDs, and blank modules for the most common consumer unit brands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fixings and sundries:</strong> Cable clips (all sizes), Wago connectors,
                crimp terminals, connector blocks, earth sleeving, PVC tape, self-amalgamating tape,
                cable ties, rawl plugs, screws.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Containment:</strong> Mini-trunking (16x16, 25x16, 38x25), oval and round
                conduit, trunking adaptors, and junction boxes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Establish a weekly restocking routine. Every Friday afternoon (or whichever day you visit
          the wholesaler), check your stock levels against your standard list and order what is
          running low. This prevents the Monday morning panic of discovering you have no 2.5mm T&E
          for a rewire starting at 8am.
        </p>
        <p>
          Track your stock costs using the{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            expenses manager
          </SEOInternalLink>{' '}
          to understand how much you spend on consumables and materials each month. This feeds into
          your overhead calculations and helps you price jobs more accurately.
        </p>
      </>
    ),
  },
  {
    id: 'van-security',
    heading: 'Van Security: Protecting Your Livelihood',
    content: (
      <>
        <p>
          Tool theft from vans is epidemic in the UK. According to trade insurer Vanarama, a van is
          broken into every 23 minutes. The average claim for tool theft is over GBP 3,000, and many
          electricians carry GBP 5,000 to GBP 10,000 worth of tools and test equipment. Beyond the
          financial cost, theft means you cannot work until replacements arrive -- which could be
          days if specialist items need ordering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Security Layers</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Upgraded locks:</strong> Replace factory locks with deadlocks or slam locks
                on all cargo doors. Brands like Locks4Vans and Van Locks UK offer vehicle-specific
                kits. Cost: GBP 100-GBP 250 per door.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Tool vault:</strong> A heavy-duty steel box bolted to the van floor. Store
                your multifunction tester, power tools, and other high-value items inside. Cost: GBP
                150-GBP 400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Alarm and immobiliser:</strong> A van alarm with movement sensors and a
                separate engine immobiliser. Cost: GBP 150-GBP 400. May reduce your insurance
                premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>GPS tracker:</strong> Allows you and the police to locate the van if stolen.
                Some trackers also send alerts if the van moves outside normal hours. Cost: GBP
                100-GBP 300 plus a monthly subscription.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Parking strategy:</strong> Park with rear doors against a wall. Choose
                well-lit areas with CCTV. Avoid leaving the van in the same spot overnight. Do not
                leave tools on display.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Check your insurance policy carefully. Many policies have a single-item limit (e.g. GBP
          500 per item) which will not cover a multifunction tester costing GBP 900+. Some policies
          require specific security measures (locks, alarms) to be fitted -- failing to comply can
          invalidate a claim. Specialist tool insurance from providers like Markel or Hiscox
          typically offers better cover for tradespeople.
        </p>
      </>
    ),
  },
  {
    id: 'running-costs',
    heading: 'Van Running Costs and Tax Implications',
    content: (
      <>
        <p>
          Understanding your van's total running costs is essential for pricing your work correctly.
          Many electricians underestimate vehicle costs because they only think about fuel, but the
          true cost includes finance or depreciation, fuel, insurance, road tax, servicing, MOT,
          tyres, repairs, breakdown cover, and parking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Annual Van Costs (Medium Van)
          </h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Finance/lease: GBP 3,600-GBP 7,200 (GBP 300-GBP 600/month)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fuel className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Fuel: GBP 2,400-GBP 4,000 (15,000-20,000 miles at 35-42 mpg)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Insurance: GBP 800-GBP 2,000 (commercial van policy)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Servicing, MOT, tyres, repairs: GBP 500-GBP 1,500
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Road tax, breakdown cover, parking: GBP 400-GBP 800
              </span>
            </li>
          </ul>
          <p className="text-white mt-4 font-semibold">
            Total: GBP 7,700-GBP 15,500 per year (GBP 640-GBP 1,290 per month)
          </p>
        </div>
        <p>
          <strong className="text-yellow-400">Tax treatment</strong> depends on whether you use HMRC
          mileage rates or actual vehicle costs. With mileage rates, you claim 45p per mile for the
          first 10,000 business miles and 25p thereafter -- this covers all vehicle costs, so you
          cannot claim separately for fuel, insurance, etc. With actual costs, you claim the
          business-use percentage of your total vehicle costs as a business expense. Use the{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            Elec-Mate expenses manager
          </SEOInternalLink>{' '}
          to track all vehicle costs and compare which method gives the larger tax deduction.
        </p>
        <p>
          For a detailed analysis of whether buying, financing, or leasing your van gives the best
          return, use the{' '}
          <SEOInternalLink href="/tools/equipment-roi-calculator">
            equipment ROI calculator
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'van-setup-checklist',
    heading: 'Complete Van Setup Checklist',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">
            Checklist: Setting Up Your Electrician Van
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Choose and purchase the van (new, nearly new, or used)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Arrange commercial van insurance (not domestic car insurance)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Install racking system (Sortimo, Bott, or Van Guard)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Fit ladder clamp or internal ladder rack</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Install security upgrades (deadlocks, slam locks, tool vault)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Fit GPS tracker and alarm system</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Install LED interior lighting for the cargo area
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Fit power inverter for charging tool batteries
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                Lay protective flooring (rubber matting or ply lining)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Stock initial materials and label everything</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">Add vehicle signage or magnetic branding</span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Van and Equipment Cost Tracking"
          description="Track every van-related expense -- fuel, insurance, servicing, racking, security. See your true monthly vehicle cost. Compare mileage rates versus actual costs for the best tax deduction."
          icon={Car}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/electrician-tool-list-uk',
    title: 'Electrician Tool List UK',
    description: 'Complete guide to hand tools, VDE insulated tools, test equipment, and PPE.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/equipment-roi-calculator',
    title: 'Equipment ROI Calculator',
    description: 'Calculate the payback period on vans, tools, and equipment purchases.',
    icon: Calculator,
    category: 'Business Tool',
  },
  {
    href: '/tools/expenses-manager-electrician',
    title: 'Expenses Manager',
    description: 'Track mileage, fuel, insurance, and all van-related expenses for tax.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description: 'Complete guide to setting up as a self-employed electrician in the UK.',
    icon: Briefcase,
    category: 'Business Guide',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description: 'Include van costs in your overhead calculations for accurate job pricing.',
    icon: BarChart3,
    category: 'Business Tool',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description: 'Salary guide including self-employed earnings and business costs.',
    icon: PoundSterling,
    category: 'Salary Guide',
  },
];

export default function ElectricianVanSetupPage() {
  return (
    <GuideTemplate
      title="Electrician Van Setup | Racking, Tools & Organisation"
      description="Complete guide to setting up an electrician van in the UK. Best vans, racking systems, tool organisation, stock management, security, and running costs. Make your mobile workshop work for you."
      datePublished="2025-01-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          Electrician Van Setup:{' '}
          <span className="text-yellow-400">Racking, Tools, and Organisation</span>
        </>
      }
      heroSubtitle="Your van is your mobile workshop. Get the setup right and you save 15-30 minutes per day in productivity. Get it wrong and you waste time, lose tools, and look unprofessional. This guide covers everything from choosing the right van to stocking it efficiently."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Van Setup"
      relatedPages={relatedPages}
      ctaHeading="Run Your Business from Your Van and Your Phone"
      ctaSubheading="Certificates, calculators, quoting, invoicing, expense tracking, and AI tools -- everything an electrician needs, accessible from anywhere. 7-day free trial, cancel anytime."
    />
  );
}
