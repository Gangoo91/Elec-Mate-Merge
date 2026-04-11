import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Truck,
  Wrench,
  ShieldCheck,
  Lock,
  Cable,
  Zap,
  PaintBucket,
  PoundSterling,
  FileCheck2,
  Users,
  TrendingUp,
  Package,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Van Setup', href: '/guides/electrician-van-setup-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Why Van Organisation Matters' },
  { id: 'racking-systems', label: 'Racking Systems Compared' },
  { id: 'tool-organisation', label: 'Tool Organisation' },
  { id: 'cable-storage', label: 'Cable and Materials Storage' },
  { id: 'test-instruments', label: 'Protecting Test Instruments' },
  { id: 'security', label: 'Van Security and Theft Prevention' },
  { id: 'electrical-setup', label: 'Electrical Setup: Inverters and Charging' },
  { id: 'branding', label: 'Van Branding and Signage' },
  { id: 'insurance', label: 'Insurance Considerations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A well-organised van saves you 30 to 60 minutes per day in time not spent searching for tools and materials. Over a year, that is 130 to 260 hours — the equivalent of 6 to 11 working weeks.',
  'The three main racking brands for UK electricians are Sortimo (premium, modular, expensive), Bott (mid-range, sturdy, good value), and Van Guard (budget-friendly, basic but functional).',
  'Secure your test instruments in padded cases and dedicate a specific location in the van where they will not be crushed, dropped, or exposed to extreme temperatures. A damaged MFT costs £800+ to replace.',
  'Tool theft from vans costs UK tradespeople an estimated £1.7 billion per year. Invest in a slam lock, deadlocks, a Thatcham-approved alarm, and tool insurance.',
  'A 12V to 240V inverter (1,000W to 2,000W) lets you charge batteries, run a kettle, and power a laptop from your van. Wire it to a leisure battery, not the starter battery.',
];

const faqs = [
  {
    question: 'What is the best van for an electrician in 2026?',
    answer:
      'The most popular choices among UK electricians are the Ford Transit Custom (SWB or LWB), Vauxhall Vivaro, Renault Trafic, Volkswagen Transporter, and Citroen Dispatch. For a sole trader doing domestic work, a short-wheelbase (SWB) medium-height van provides enough space without being difficult to park on residential streets. Long-wheelbase (LWB) vans suit electricians who carry large cable drums or work on commercial sites. The Ford Transit Custom is the most popular overall due to its reliability, wide availability of parts, and the range of aftermarket racking options. Budget £15,000 to £25,000 for a 2 to 3 year old van with reasonable mileage.',
  },
  {
    question: 'How much does professional van racking cost?',
    answer:
      'Van racking costs vary enormously depending on the system and complexity. Budget options (Van Guard, Modul-System basic) start at £300 to £600 for a basic shelf and drawer setup. Mid-range systems (Bott, Modul-System) cost £800 to £2,000 for a comprehensive electrician-specific layout. Premium systems (Sortimo, Bott SmartVan) with fully customised modular drawers, pull-out shelves, and integrated cases can cost £2,500 to £5,000 or more. Many electricians start with a DIY or budget system and upgrade to a professional setup after their first year when they know exactly what they need and where they want it.',
  },
  {
    question: 'Should I get a van inverter installed?',
    answer:
      'Yes — an inverter is one of the most useful additions to an electrician van. A 1,000W to 2,000W pure sine wave inverter connected to a leisure battery (NOT your starter battery) gives you 240V power for charging drill batteries, running a kettle, powering a laptop, and charging your phone. A split-charge relay or DC-DC charger keeps the leisure battery topped up from the alternator while driving. The total cost for a leisure battery, inverter, split-charge relay, and basic wiring is £300 to £600 if you install it yourself. Pure sine wave inverters are essential — modified sine wave inverters can damage sensitive equipment like laptops and battery chargers.',
  },
  {
    question: 'How do I prevent tool theft from my van?',
    answer:
      'Van tool theft is one of the biggest risks for self-employed electricians. A comprehensive approach includes: deadlocks on all doors (£150 to £300 fitted), a slam lock that automatically locks the side door when you close it (£100 to £200), a Thatcham Category 1 alarm (£300 to £500 fitted), visible deterrents such as "No tools left in this van overnight" stickers, a lockable internal tool vault or cabinet, removing high-value items (test instruments, specialist tools) every evening, parking in a well-lit area or garage, and a GPS tracker (£100 to £200 plus monthly subscription). Tool insurance is essential — ensure your policy covers tools in an unattended vehicle and check the single-item limit.',
  },
  {
    question: 'What racking layout works best for an electrician?',
    answer:
      'A typical electrician van racking layout has shelving and drawers along the nearside (left) wall, a cable drum holder or deep shelf at the rear, and the offside (right) wall either clear for long items (conduit, trunking, cable tray) or fitted with a narrow shelf unit. The nearside unit should have: shallow drawers at the bottom for small items (terminals, fixings, screws), medium drawers in the middle for hand tools and accessories, and open shelves at the top for power tools and cases. Keep the most-used items between waist and shoulder height. Label everything. The goal is to be able to find any item within 10 seconds without moving other items out of the way.',
  },
  {
    question: 'Is Sortimo worth the money?',
    answer:
      'Sortimo is the premium option and the price reflects it — a full Sortimo setup can cost 2 to 3 times more than a Bott or Van Guard equivalent. The advantages are the modular L-Boxx system (which integrates with the racking and can be removed as individual cases for carrying to site), the build quality, and the resale value if you sell the van. If you are a sole trader doing domestic work and you are careful with your budget, a Bott or Van Guard system provides 80% of the functionality at 40% of the cost. Sortimo makes more sense for electricians who frequently carry their tool cases into buildings (flats, multi-storey sites) because the removable L-Boxx system is genuinely excellent for that workflow.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Everything you need before your first job — insurance, registration, pricing, and marketing.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/compare/checkatrade-vs-mybuilder-vs-bark',
    title: 'Checkatrade vs MyBuilder vs Bark',
    description:
      'Compare lead generation platforms — costs, lead quality, and which suits your business stage.',
    icon: TrendingUp,
    category: 'Comparison',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Price jobs and send professional quotes from your phone. Include van and travel costs in your pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'Claim your van mileage from HMRC. Rates, rules, and record keeping for self-employed electricians.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates on your phone from the van. Instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Growing your team means a bigger van or a second vehicle. Plan the true cost of expansion.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Van Organisation Matters More Than You Think',
    content: (
      <>
        <p>
          Your van is your workshop, your office, and your warehouse. A well-organised van is not
          just about looking professional — it directly affects your productivity, your earnings,
          and your stress levels.
        </p>
        <p>
          Studies of tradespeople consistently show that disorganised vans cost 30 to 60 minutes per
          day in wasted time searching for tools, digging through boxes of materials, and making
          unnecessary trips to the wholesaler because you could not find what you already had. Over
          a year, that is 130 to 260 hours — the equivalent of 6 to 11 working weeks. At a charge-
          out rate of £40/hour, a disorganised van costs you £5,200 to £10,400 per year in lost
          productivity.
        </p>
        <p>
          Beyond productivity, a tidy van projects professionalism. When a customer sees you pull
          the right tool from a labelled drawer in seconds, it builds confidence. When they see you
          rummaging through a pile of loose cables and overturned buckets, it does the opposite.
        </p>
      </>
    ),
  },
  {
    id: 'racking-systems',
    heading: 'Van Racking Systems Compared',
    content: (
      <>
        <p>
          The three brands most commonly used by UK electricians are Sortimo, Bott, and Van Guard.
          Each targets a different budget and requirement.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Sortimo</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Price:</strong> £2,500 to £5,000+
              <br />
              <strong>Build quality:</strong> Excellent — lightweight aluminium, precision
              engineering.
              <br />
              <strong>Key feature:</strong> L-Boxx system — modular cases that click into the
              racking and can be removed individually to carry to site.
              <br />
              <strong>Best for:</strong> Electricians who work in flats, multi-storey buildings, or
              commercial sites where carrying tools from the van is a daily task.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Bott</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Price:</strong> £800 to £2,500
              <br />
              <strong>Build quality:</strong> Very good — steel construction, heavy-duty drawers.
              <br />
              <strong>Key feature:</strong> SmartVan range with electrician-specific layouts. Strong
              drawer mechanisms that handle daily abuse.
              <br />
              <strong>Best for:</strong> Sole traders and small firms wanting professional racking
              without the Sortimo price tag. Best value in the mid-range.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Van Guard</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Price:</strong> £300 to £800
              <br />
              <strong>Build quality:</strong> Functional — steel shelving, basic drawers.
              <br />
              <strong>Key feature:</strong> Affordable entry point with trade-specific kits
              available. Easy to install yourself.
              <br />
              <strong>Best for:</strong> New businesses on a budget. A Van Guard system with
              aftermarket organisers and labels can be very effective.
            </p>
          </div>
        </div>
        <p>
          Other options include Modul-System, Würth ORSYmobil, and DIY builds using plywood shelving
          with aftermarket storage boxes. A well-planned DIY build costs £100 to £300 in materials
          and can be surprisingly effective if you take time to design the layout properly.
        </p>
      </>
    ),
  },
  {
    id: 'tool-organisation',
    heading: 'Tool Organisation: A Place for Everything',
    content: (
      <>
        <p>
          The golden rule of van organisation: every tool has a home, and every tool goes back to
          its home at the end of every job. If you cannot name the location of every tool in your
          van within 3 seconds, your system needs work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power tools</strong> — dedicate a shelf or drawer for drill/drivers, SDS
                drills, jigsaws, and multi-tools. Each tool should have its own space so you can see
                at a glance if something is missing. Foam inserts (cut to the shape of each tool)
                are excellent for this — they protect the tools and make it obvious when something
                has been left on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hand tools</strong> — a tool bag or tool roll that you take to every job
                should contain your essential hand tools: screwdrivers (VDE insulated set), pliers,
                side cutters, cable strippers, crimp tool, junior hacksaw, tape measure, spirit
                level, and a torch. This bag lives in the van but comes out at every job site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixings and small parts</strong> — small compartment boxes (Stanley
                SortMaster, DeWalt ToughSystem) with labelled sections for screws, wall plugs, cable
                clips, terminal blocks, wago connectors, earth tags, and similar consumables. The
                cost of these boxes (£15 to £30 each) is negligible compared to the time saved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPE</strong> — keep your PPE (safety glasses, ear defenders, dust masks,
                gloves, hard hat) in a dedicated bag or box near the van door so you can grab it
                without climbing in.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-storage',
    heading: 'Cable and Materials Storage',
    content: (
      <>
        <p>
          Cable drums and loose materials are the biggest source of van chaos. A few simple
          solutions make a dramatic difference.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable drum holder</strong> — a wall-mounted or floor-mounted cable drum
                spindle lets you store 2 to 4 drums upright at the rear of the van and dispense
                cable without removing the entire drum. Available from £40 to £150. Some racking
                systems include an integrated drum holder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit and trunking</strong> — lengths of conduit, trunking, and cable tray
                should be stored along the offside wall or overhead in a pipe tube. Roof-mounted
                conduit carriers are available for longer lengths. Keep them secured so they do not
                slide forward under braking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer units and accessories</strong> — keep consumer units in their
                original boxes on a shelf. Do not stack heavy items on top of them. Accessories
                (MCBs, RCBOs, busbars) should be in labelled drawers sorted by manufacturer and
                type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tape and consumables</strong> — a dedicated small-parts drawer or wall-
                mounted rack for PVC tape, self-amalgamating tape, labels, markers, cable ties, and
                similar consumables. Mount it within arm's reach of the side door.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-instruments',
    heading: 'Protecting Your Test Instruments',
    content: (
      <>
        <p>
          Your multifunction tester, loop impedance tester, and voltage indicators are the most
          expensive and most fragile items in your van. A Megger MFT1845 costs over £1,000 to
          replace. Protecting these instruments is not optional.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Padded cases</strong> — always store test instruments in their original
                padded cases. If the manufacturer case is flimsy, upgrade to a hard case (Peli, MAX,
                or similar). The cost of a £50 case is trivial compared to the cost of a dropped or
                crushed instrument.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated location</strong> — assign a specific shelf or drawer for test
                instruments only. Do not pile other tools on top. Ideally, this location should be
                near the top of the racking where heavy items cannot fall onto it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature</strong> — extreme heat (summer sun on a metal van) and extreme
                cold can affect calibration accuracy and battery life. Park in shade when possible
                and consider a reflective windscreen cover to reduce internal temperatures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remove overnight</strong> — if your van is not in a secure garage, take your
                test instruments inside every evening. They are the single most valuable and most
                targeted item for van thieves.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'security',
    heading: 'Van Security and Theft Prevention',
    content: (
      <>
        <p>
          Tool theft from vans is estimated to cost UK tradespeople £1.7 billion per year. The
          average claim for tools stolen from a van is £3,000 to £5,000, and the disruption to your
          business while you replace everything can cost far more.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deadlocks</strong> — fit deadlocks to all doors (rear and side). Factory
                locks on most vans are inadequate — they can be defeated in seconds with a
                screwdriver or lock pick. Deadlocks (Locks 4 Vans, Van Vault) cost £150 to £300
                fitted and are the single most effective deterrent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Slam lock</strong> — replaces the side door handle with a lock that
                automatically engages when the door closes. You cannot accidentally leave the door
                unlocked. Essential for the side loading door. £100 to £200 fitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Alarm</strong> — a Thatcham-approved alarm with sensors on all doors. Some
                systems include tilt sensors to detect the van being jacked up or towed. Budget £300
                to £500 fitted. Your insurance premium may reduce enough to offset the cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal vault</strong> — a lockable steel cabinet inside the van provides a
                second layer of security. Even if a thief gets into the van, they cannot quickly
                access the contents of a bolted-down vault. Van Vault and Tuffbank make popular
                options from £200 to £500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GPS tracker</strong> — if the van is stolen, a GPS tracker increases the
                chances of recovery. Trackers cost £100 to £200 plus a monthly subscription (£5 to
                £15/month). Some insurers offer a discount for fitted trackers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Visible deterrents also matter. "No tools left in this van overnight" stickers, window
          tints (prevent thieves seeing inside), and parking in well-lit areas all reduce risk. The
          best security is layered — no single measure is enough on its own.
        </p>
      </>
    ),
  },
  {
    id: 'electrical-setup',
    heading: 'Electrical Setup: Inverters, Charging, and Lighting',
    content: (
      <>
        <p>
          A proper electrical setup in your van means you never arrive on site with flat drill
          batteries, a dead phone, or no way to make a cuppa.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leisure battery</strong> — a separate 12V leisure battery (AGM or lithium,
                100Ah to 200Ah) dedicated to powering your accessories. Never run an inverter from
                your starter battery — you will flatten it and be unable to start the van. An AGM
                battery costs £100 to £200; lithium (LiFePO4) costs £300 to £600 but lasts 5 to 10
                times longer and charges faster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Split-charge relay or DC-DC charger</strong> — keeps the leisure battery
                charged from the alternator while driving. A simple split-charge relay costs £30 to
                £50. A DC-DC charger (£100 to £200) is better for modern vans with smart alternators
                and is essential if you use a lithium leisure battery.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter</strong> — a 1,000W to 2,000W pure sine wave inverter converts 12V
                DC from the leisure battery to 240V AC. Use it for charging drill batteries,
                powering a laptop, running a kettle (a 750W travel kettle works well), and charging
                your phone. Mount the inverter securely and use appropriately sized cables — a
                2,000W inverter draws up to 170A at 12V, requiring 35mm or 50mm cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED strip lighting</strong> — 12V LED strips inside the van make a huge
                difference in winter when you are loading and unloading in the dark. Wire them to
                the leisure battery with a switch near the side door. Cost: £10 to £30 for a quality
                LED strip with a magnetic or adhesive mount.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB charging points</strong> — fit one or two USB sockets (12V to USB) in
                the cabin and cargo area for convenient phone and tablet charging without using the
                inverter. Cost: £5 to £15 each.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'branding',
    heading: 'Van Branding and Signage',
    content: (
      <>
        <p>
          Your van is a mobile billboard — every time you park on a customer's driveway or a
          residential street, it is advertising your business to the neighbours.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Magnetic Signs (Budget)</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> £50 to £100 for a pair.
              <br />
              Removable magnetic signs for the side panels. Include your business name, phone
              number, and "Part P Registered" or your scheme logo. Easy to remove if you use the van
              personally at weekends. A good starting point for a new business.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Vinyl Lettering (Mid-Range)</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> £200 to £500.
              <br />
              Cut vinyl lettering applied to the panels, rear, and sides. More durable and
              professional than magnetics. Include your business name, phone, email, website, and
              competent person scheme logo. Lasts the lifetime of the van.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Partial Wrap (Premium)</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> £800 to £1,500.
              <br />A partial wrap covers significant panel areas with printed graphics and
              branding. Very eye-catching and professional. Protects the paintwork underneath. Good
              investment once your business is established and you want to stand out.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Full Wrap (Maximum Impact)</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> £1,500 to £3,000+.
              <br />
              Full vehicle wrap with complete brand livery. Maximum visual impact. Typically only
              justified for established businesses with multiple vehicles. The wrap protects the
              original paintwork, which can improve resale value.
            </p>
          </div>
        </div>
        <p>
          Regardless of the option you choose, always include: your business name, phone number
          (large and easy to read from a distance), "Part P Registered" or your scheme logo, and
          your Google Business Profile name so people can find and review you.
        </p>
      </>
    ),
  },
  {
    id: 'insurance',
    heading: 'Van Insurance Considerations',
    content: (
      <>
        <p>
          Van insurance for electricians has specific requirements that differ from standard
          commercial vehicle insurance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial use</strong> — standard social/domestic vehicle insurance does
                NOT cover you when driving to and from jobs or carrying tools for work. You need
                commercial vehicle insurance with "carriage of own goods" cover at minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tool and contents cover</strong> — most standard commercial policies include
                minimal contents cover (often only £500 to £1,000). An electrician typically carries
                £3,000 to £10,000 of tools and test instruments. Add tool insurance with an adequate
                limit — check the single-item limit covers your MFT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overnight cover</strong> — check whether your policy covers tools left in
                the van overnight. Some policies require tools to be in a locked internal vault or
                exclude overnight theft entirely. Know your policy conditions and comply with them.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security discounts</strong> — deadlocks, slam locks, alarms, and trackers
                can reduce your premium. Inform your insurer about all security measures fitted. A
                Thatcham-approved alarm in particular can deliver a meaningful discount.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage your electrical business from your van"
          description="Elec-Mate gives you quoting, certification, and job management on your phone. Complete EICs, send quotes, and manage your schedule from the driver's seat. 7-day free trial."
          icon={Truck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianVanSetupGuidePage() {
  return (
    <GuideTemplate
      title="Electrician Van Setup Guide 2026 | Best Van Racking"
      description="Complete guide to setting up an electrician van. Racking systems compared (Sortimo, Bott, Van Guard), tool organisation, cable storage, test instrument protection, security, inverters, and van branding."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Truck}
      heroTitle={
        <>
          Electrician Van Setup Guide 2026:{' '}
          <span className="text-yellow-400">Racking, Tools, Security, and Branding</span>
        </>
      }
      heroSubtitle="Your van is your mobile workshop. This guide covers racking systems, tool organisation, cable storage, test instrument protection, security against theft, electrical setup (inverters and charging), branding, and insurance — everything you need to set up a van that works as hard as you do."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Van Setup"
      relatedPages={relatedPages}
      ctaHeading="Run Your Business From Your Van"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management — all from your phone. 7-day free trial, cancel anytime."
    />
  );
}
