import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Truck,
  Wrench,
  ShieldCheck,
  Calculator,
  FileCheck2,
  PoundSterling,
  Weight,
  Lock,
  Gauge,
  GraduationCap,
  Package,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Best Van Racking 2026', href: '/guides/best-van-racking-electricians' },
];

const tocItems = [
  { id: 'overview', label: 'Why Van Racking Matters' },
  { id: 'sortimo', label: 'Sortimo' },
  { id: 'bott-smartvan', label: 'Bott Smartvan' },
  { id: 'van-guard', label: 'Van Guard' },
  { id: 'modul-system', label: 'Modul-System' },
  { id: 'diy-options', label: 'DIY and Budget Options' },
  { id: 'van-models', label: 'By Van Model' },
  { id: 'cable-drum-storage', label: 'Cable Drum Storage' },
  { id: 'cost-analysis', label: 'Cost Analysis' },
  { id: 'installation', label: 'Self-Fit vs Professional Installation' },
  { id: 'verdict', label: 'Our Verdict' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Proper van racking saves 15 to 30 minutes per job in tool retrieval time alone. Over a year, that is 60 to 120 hours of paid work recovered from rummaging through a messy van.',
  'Sortimo and Bott are the premium choices — modular, configurable, and built to last 10+ years. They cost 2,000 to 5,000 pounds fitted but hold their resale value and can be transferred between vans.',
  'Van Guard and similar mid-range systems offer 80% of the functionality at 40% of the price. For sole traders and small firms, these represent the best value for money.',
  'Weight matters — every kilogram of racking reduces your payload capacity. A full Sortimo installation can weigh 80 to 120 kg. Check your van payload rating before specifying racking.',
  'DIY racking using plywood shelving and screwed-in brackets costs under 300 pounds but lacks the modularity, security, and crash-testing of commercial systems.',
];

const faqs = [
  {
    question: 'How much does van racking cost for an electrician van?',
    answer:
      'The cost depends on the system and complexity. Budget DIY plywood shelving costs 100 to 300 pounds in materials. Mid-range systems (Van Guard, Rhino) cost 500 to 1,500 pounds for a typical nearside and offside shelving layout, plus 200 to 400 pounds for professional fitting. Premium modular systems (Sortimo, Bott) cost 2,000 to 5,000 pounds installed, depending on the van size and configuration. Most sole-trader electricians spend 800 to 2,000 pounds on van racking — enough for organised shelving, a cable drum holder, and a secured tool compartment.',
  },
  {
    question: 'Can I fit van racking myself?',
    answer:
      'Yes, most mid-range van racking systems are designed for self-installation. Van Guard, Rhino, and similar brands provide fitting instructions and the racking bolts to the existing factory load lashing points in the van floor and walls. You need basic tools — a drill, socket set, and rivnut tool. Allow a full day for a typical nearside-and-offside installation. Premium systems (Sortimo, Bott) can also be self-fitted, but the modular components are more complex to configure and the manufacturers recommend professional fitting to ensure the system is crash-tested compliant. DIY plywood shelving is the simplest to install but offers the least protection in an accident.',
  },
  {
    question: 'Does van racking affect my insurance?',
    answer:
      'Van racking itself does not typically affect insurance premiums. However, you should inform your insurer about any permanent modifications to the van (racking, roof racks, tow bars) as failure to disclose modifications could void your policy. The tools and equipment stored in the van must be covered separately — standard van insurance covers the vehicle, not its contents. Tool insurance (either as an add-on to your van policy or a separate trade tools policy) typically costs 100 to 300 pounds per year depending on the value of tools covered. Keep a photographic inventory of your van contents and tools — Elec-Mate can help you document this.',
  },
  {
    question: 'What is the weight limit for van racking?',
    answer:
      'The weight limit is determined by your van payload capacity, not the racking system. Your van has a Gross Vehicle Weight (GVW) rating on the VIN plate — the payload is GVW minus the kerb weight. A Ford Transit Custom has a typical payload of 600 to 1,000 kg depending on the model. The racking system itself (shelving, brackets, fixings) weighs 40 to 120 kg depending on complexity. Add your tools (50 to 100 kg), cable stock (30 to 80 kg), accessories, and personal items. Many electricians are surprised to find they are close to the payload limit. Overloading is a fixed penalty offence, invalidates your insurance, and is dangerous — the van handles poorly and braking distances increase significantly.',
  },
  {
    question: 'Should I get racking on one side or both sides?',
    answer:
      'For most electrician vans, nearside (passenger side) racking with the offside (driver side) kept clear is the best layout. This gives you organised storage on one side and a clear floor area on the other for longer items — cable drums, conduit, trunking, and long cable runs. Full racking on both sides looks impressive but reduces your ability to carry bulky items and adds significant weight. If you regularly carry longer items (3-metre conduit, cable drums, sheet materials), keep the offside clear or install only a low shelf unit on the offside to maintain floor-to-roof clearance.',
  },
  {
    question: 'Is crash-tested racking worth the extra cost?',
    answer:
      'Crash-tested racking is tested to ECE R17 or similar standards, which simulate the forces in a frontal collision. In an accident, unsecured items in the cargo area become projectiles — a 5 kg tool bag hitting you at 50 mph has the force of a 150 kg weight. Crash-tested racking is designed to contain its contents during an impact. Sortimo and Bott systems are crash-tested as standard. Mid-range systems vary — check the manufacturer specification. DIY plywood shelving is not crash-tested and may fail in an accident. Whether it is worth the extra cost is a personal decision, but given that you spend 8 to 10 hours a day sitting in front of your cargo area, the safety argument is compelling.',
  },
  {
    question: 'Can I transfer van racking to a new van?',
    answer:
      'Modular systems (Sortimo, Bott, Modul-System) are designed to be transferred between vans. The shelving modules unbolt from the van-specific floor and wall brackets, and new brackets are fitted in the replacement van. The modules themselves — drawers, shelves, bins — are universal. This is a significant advantage over fixed racking that is built for a specific van model. Transferring a modular system to a new van typically costs 300 to 600 pounds for the new brackets and fitting labour. DIY and fixed systems cannot be transferred and must be rebuilt from scratch in the new van.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote jobs professionally from your van — materials, labour, and margins calculated automatically.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/best-multifunction-tester-2026',
    title: 'Best Multifunction Tester 2026',
    description:
      'The most important instrument to store securely in your van racking.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/best-label-printer-electricians',
    title: 'Best Label Printer 2026',
    description:
      'Keep a label printer in your van racking for on-site circuit labelling and warning labels.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete certificates on site from the van — no need to carry paperwork.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/best-cable-detector-2026',
    title: 'Best Cable Detector 2026',
    description:
      'Another essential tool for your van kit — cable detectors compared and reviewed.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/best-thermal-imaging-camera-electricians',
    title: 'Best Thermal Imaging Camera 2026',
    description:
      'Compact enough to fit in a van racking drawer — thermal cameras for electricians.',
    icon: Gauge,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Van Racking Matters for Electricians',
    content: (
      <>
        <p>
          Your van is your mobile workshop. The difference between a well-organised van with proper
          racking and a van with loose tools rolling around in the back is not just about
          tidiness — it directly affects your productivity, professionalism, and safety.
        </p>
        <p>
          An electrician with organised van racking spends 1 to 2 minutes finding a specific tool
          or material. An electrician with a messy van spends 5 to 10 minutes — and sometimes gives
          up and makes a trip to the wholesaler for something that was buried in the back all along.
          Over 250 working days, that time difference adds up to 60 to 120 hours per year. At 40
          pounds per hour, that is 2,400 to 4,800 pounds of productive time lost to poor
          organisation.
        </p>
        <p>
          Good van racking also protects your tools from theft (lockable compartments), damage
          (secured items do not bounce around), and accident damage (crash-tested racking contains
          items during a collision instead of turning them into projectiles).
        </p>
        <p>
          This guide compares the main van racking systems available in the UK, with specific
          advice for the van models most commonly used by electricians.
        </p>
      </>
    ),
  },
  {
    id: 'sortimo',
    heading: 'Sortimo',
    content: (
      <>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Sortimo — The Premium Modular System</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Sortimo is the market leader in commercial vehicle racking. German-engineered, fully
            modular, crash-tested, and used by major fleets including British Gas and BT. It is also
            the most expensive option by a significant margin.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Material:</strong> Powder-coated steel and aluminium</p>
              <p className="text-white text-sm"><strong>Crash tested:</strong> Yes (ECE R17)</p>
              <p className="text-white text-sm"><strong>Modularity:</strong> Fully modular (L-BOXX system)</p>
              <p className="text-white text-sm"><strong>Transferable:</strong> Yes (between van models)</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Weight (typical install):</strong> 80 to 120 kg</p>
              <p className="text-white text-sm"><strong>Warranty:</strong> 5 years</p>
              <p className="text-white text-sm"><strong>Installation:</strong> Professional recommended</p>
              <p className="text-white text-sm"><strong>Price range:</strong> 2,500 to 5,000 pounds fitted</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The L-BOXX case system integrates directly with the racking —
          cases slide in and out of the shelving and lock in place. Every component is engineered
          to fit together precisely. The crash-testing certification means your contents are
          contained in an accident. The modular design means you can reconfigure the layout as your
          needs change, and transfer the modules to a new van. Build quality is outstanding —
          Sortimo systems last 10 to 15 years with minimal wear. Resale value is strong.
        </p>
        <p>
          <strong>Weaknesses:</strong> The price. A full Sortimo installation for a Transit Custom
          costs 3,000 to 4,500 pounds. For a sole trader or small firm, this is a significant
          capital outlay. The system is also heavy — 80 to 120 kg for a typical two-side
          installation reduces your available payload. The L-BOXX cases are Sortimo-specific and
          more expensive than generic tool cases. Professional fitting adds 500 to 800 pounds to
          the material cost.
        </p>
        <p>
          <strong>Best for:</strong> Established electrical businesses with 3 or more vans, where
          the productivity gains and professional image justify the investment. Also worth
          considering if you plan to keep the racking for 10+ years across multiple van changes.
        </p>
      </>
    ),
  },
  {
    id: 'bott-smartvan',
    heading: 'Bott Smartvan',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Bott Smartvan — The Fleet Favourite</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Bott is a German manufacturer competing directly with Sortimo. The Smartvan range is
            widely used by UK electrical contractors and is the racking system chosen by several
            major electrical firms for their fleet vans.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Material:</strong> Powder-coated steel</p>
              <p className="text-white text-sm"><strong>Crash tested:</strong> Yes (ECE R17)</p>
              <p className="text-white text-sm"><strong>Modularity:</strong> Fully modular (Bott box system)</p>
              <p className="text-white text-sm"><strong>Transferable:</strong> Yes</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Weight (typical install):</strong> 70 to 100 kg</p>
              <p className="text-white text-sm"><strong>Warranty:</strong> 5 years</p>
              <p className="text-white text-sm"><strong>Installation:</strong> Professional or self-fit</p>
              <p className="text-white text-sm"><strong>Price range:</strong> 2,000 to 4,000 pounds fitted</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> Bott offers a slightly lighter system than Sortimo with
          comparable build quality and crash-test certification. The Bott online configurator
          lets you design your layout for your specific van model before ordering, which reduces
          fitting errors. The steel construction is extremely durable. Bott has a strong UK dealer
          network with fitting centres in most major cities. The Bott box system (drawer inserts,
          compartment dividers) is well-designed for electrical components — cable glands, terminals,
          connectors, and accessories all have appropriate compartment sizes.
        </p>
        <p>
          <strong>Weaknesses:</strong> Still expensive — 2,000 to 4,000 pounds is a large
          investment for a sole trader. The aesthetic is functional rather than premium (Sortimo
          looks slightly more polished). The Bott dealer network, while extensive, is smaller
          than Sortimo's in some regions. The case system is Bott-specific and not compatible with
          Sortimo L-BOXX or other industry-standard case systems.
        </p>
        <p>
          <strong>Best for:</strong> Electrical contractors who want fleet-grade racking at a
          slightly lower price point than Sortimo. Particularly good for firms that want to
          standardise across multiple vans.
        </p>
      </>
    ),
  },
  {
    id: 'van-guard',
    heading: 'Van Guard',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Van Guard — The Mid-Range Sweet Spot</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Van Guard is a UK-based manufacturer offering practical, affordable van racking that hits
            the sweet spot between budget DIY and premium modular systems. It is the most popular
            choice among sole-trader electricians.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Material:</strong> Steel with powder coating</p>
              <p className="text-white text-sm"><strong>Crash tested:</strong> Some models (check spec)</p>
              <p className="text-white text-sm"><strong>Modularity:</strong> Semi-modular (bolt-on shelving)</p>
              <p className="text-white text-sm"><strong>Transferable:</strong> Possible but not designed for it</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Weight (typical install):</strong> 40 to 70 kg</p>
              <p className="text-white text-sm"><strong>Warranty:</strong> 3 years</p>
              <p className="text-white text-sm"><strong>Installation:</strong> Self-fit (half day)</p>
              <p className="text-white text-sm"><strong>Price range:</strong> 500 to 1,500 pounds</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The price-to-quality ratio is excellent. A full nearside
          shelving unit with tool storage costs 600 to 900 pounds — about a third of the Sortimo
          equivalent. The systems are designed for self-fitting using the van's existing load
          lashing points, with clear instructions and pre-drilled holes. The lighter weight (40 to
          70 kg versus 80 to 120 kg for premium systems) preserves more of your payload capacity.
          Van Guard offers van-specific kits for popular models (Transit Custom, Vivaro, Berlingo),
          reducing the guesswork in ordering. The steel construction is robust and the powder
          coating resists scratches and corrosion well.
        </p>
        <p>
          <strong>Weaknesses:</strong> Not fully modular — you cannot easily reconfigure the layout
          once installed. Not all models are crash-tested (check the specific product
          specification). The case system is not integrated like Sortimo or Bott — you use your own
          tool cases and boxes on the shelves. The shelving is not as precisely engineered as
          the premium options — there may be small gaps or slight misalignments. Transferring to a
          new van requires buying new van-specific brackets and refitting.
        </p>
        <p>
          <strong>Best for:</strong> Sole traders and small firms who want proper metal racking
          without spending 3,000 pounds or more. If you are buying your first van racking system
          and want the best value, Van Guard is the answer.
        </p>
      </>
    ),
  },
  {
    id: 'modul-system',
    heading: 'Modul-System',
    content: (
      <>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Modul-System — The Scandinavian Approach</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            Modul-System is a Swedish manufacturer with a strong presence in Scandinavian and
            European fleet markets. Their lightweight aluminium-based systems are gaining traction
            in the UK.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Material:</strong> Aluminium with steel reinforcement</p>
              <p className="text-white text-sm"><strong>Crash tested:</strong> Yes (INSTA 7400)</p>
              <p className="text-white text-sm"><strong>Modularity:</strong> Fully modular</p>
              <p className="text-white text-sm"><strong>Transferable:</strong> Yes</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-white text-sm"><strong>Weight (typical install):</strong> 50 to 80 kg</p>
              <p className="text-white text-sm"><strong>Warranty:</strong> 5 years</p>
              <p className="text-white text-sm"><strong>Installation:</strong> Professional recommended</p>
              <p className="text-white text-sm"><strong>Price range:</strong> 2,000 to 4,000 pounds fitted</p>
            </div>
          </div>
        </div>
        <p>
          <strong>Strengths:</strong> The aluminium construction makes Modul-System significantly
          lighter than steel competitors — 50 to 80 kg versus 80 to 120 kg for a comparable
          Sortimo installation. For vans with tight payload margins (especially smaller vans like
          the Berlingo or Caddy), this weight saving is meaningful. The crash-testing standard
          (INSTA 7400) is actually more stringent than ECE R17 used by some competitors. The
          modular design is well-thought-out, and the Scandinavian engineering ethos means
          everything fits together cleanly.
        </p>
        <p>
          <strong>Weaknesses:</strong> The UK dealer and fitting network is smaller than Sortimo
          or Bott. Finding a local Modul-System fitter may require travelling to a larger city.
          The aluminium construction, while lighter, is more susceptible to denting than steel.
          The brand is less recognised among UK electricians, which does not affect functionality
          but may affect resale value when selling the van. The price is comparable to Bott and
          approaching Sortimo territory without the same brand recognition.
        </p>
        <p>
          <strong>Best for:</strong> Electricians who prioritise weight saving — particularly those
          with smaller vans or those who regularly carry heavy cable stock and need maximum
          remaining payload capacity.
        </p>
      </>
    ),
  },
  {
    id: 'diy-options',
    heading: 'DIY and Budget Options',
    content: (
      <>
        <p>
          Not everyone needs or can afford a commercial racking system. DIY van racking using
          plywood and basic metalwork is a time-honoured tradition in the trade.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plywood shelving (100 to 300 pounds)</strong> — 18mm plywood cut to fit your
                van dimensions, screwed to the van walls and floor using threaded rivnuts. Add
                edging strips to prevent items sliding off. Seal or varnish the plywood to prevent
                moisture damage. This is the cheapest functional option and can be customised to
                your exact needs. The main downsides are weight (plywood is heavier than you expect
                — a full shelving system can weigh 40 to 60 kg), no crash testing, and limited
                durability compared to metal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Slotted angle steel shelving (200 to 500 pounds)</strong> — Dexion or
                similar slotted angle iron with plywood or metal shelves. More rigid than plywood
                alone and easier to adjust shelf heights. Available from industrial suppliers. The
                exposed metal edges can damage tool cases and cables, so add rubber edging. Heavier
                than plywood alone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic storage systems (100 to 200 pounds)</strong> — heavy-duty plastic
                crates and stackable boxes secured with ratchet straps or bungee cords. The cheapest
                option and the easiest to install (no drilling). However, plastic crates slide around
                in transit, offer no security against theft, and provide no crash protection. This is
                a temporary solution at best.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Safety warning:</strong> DIY racking is not crash-tested. In a collision at
              30 mph, a 2 kg drill in an unsecured position hits you with the force of a 60 kg
              weight. If you use DIY racking, at minimum ensure heavy items are stored as low as
              possible and secured with straps or in closed containers. A lockable metal toolbox
              bolted to the floor is a worthwhile safety investment even with DIY shelving.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'van-models',
    heading: 'Racking by Van Model',
    content: (
      <>
        <p>
          The three most popular van models among UK electricians each have different cargo
          dimensions and racking considerations.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Ford Transit Custom (SWB)</h4>
            <p className="text-white text-sm leading-relaxed">
              The most popular electrician van in the UK. Cargo length 2,555mm, width 1,784mm
              (between wheel arches 1,268mm), height 1,406mm. Payload 600 to 1,000 kg depending on
              model. Excellent for full nearside racking with cable drum storage on the offside
              floor. All major racking manufacturers offer Transit Custom-specific kits. The wider
              cargo area between the wheel arches accommodates deeper shelving than the Vivaro.
              The L2H1 (long wheelbase, standard roof) version offers an additional 370mm of cargo
              length for those who carry more stock.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Vauxhall Vivaro / Renault Trafic</h4>
            <p className="text-white text-sm leading-relaxed">
              The same platform as the Vivaro. Cargo length 2,537mm (SWB), width 1,662mm (between
              wheel arches 1,268mm), height 1,387mm. Payload 1,000 to 1,200 kg. The narrower cargo
              width means slightly shallower shelving than the Transit Custom, but the higher
              payload capacity is an advantage for electricians who carry heavy cable stock. All
              major racking manufacturers have Vivaro/Trafic-specific kits. The wide sliding door
              opening provides good access to nearside racking.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Citroen Berlingo / Peugeot Partner / Vauxhall Combo</h4>
            <p className="text-white text-sm leading-relaxed">
              The smaller van option. Cargo length 1,817mm (M) or 2,167mm (XL), width 1,550mm
              (between wheel arches 1,229mm), height 1,236mm. Payload 650 to 1,000 kg. The smaller
              cargo area limits racking options — typically one side of shelving only, with the
              floor area used for cable drums and larger items. Weight is critical in smaller vans
              — choose lightweight racking (Modul-System or Van Guard) to preserve payload. The
              Berlingo is popular for domestic electricians and apprentices who do not need to carry
              large quantities of stock.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'cable-drum-storage',
    heading: 'Cable Drum Storage Solutions',
    content: (
      <>
        <p>
          Cable storage is the unique challenge of an electrician van. Cable drums are heavy,
          awkward, and need to be accessible without emptying the van. Here are the main
          approaches.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable reel holders</strong> — wall-mounted or floor-mounted brackets that
                hold cable reels horizontally, allowing you to pull cable directly off the drum
                without removing it from the van. Sortimo and Bott both offer integrated cable reel
                holders. Aftermarket options from Van Guard and Rhino cost 50 to 100 pounds each.
                Position them near the rear doors for easy access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable drum shelf</strong> — a low shelf at floor level designed to hold
                multiple cable drums upright. This is the simplest approach — drums sit on the
                shelf and are restrained by a bar or strap across the front. Less convenient than
                reel holders (you need to lift drums in and out) but accommodates more drums and
                different drum sizes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Package className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Under-shelf storage</strong> — using the space below the lowest shelf for
                cable drums on the floor. Simple and free if your shelving is high enough. The
                downside is that drums on the floor can roll around unless restrained, and accessing
                drums at the back requires moving drums at the front.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Most electricians settle on a combination — two or three cable reel holders for the most
          commonly used sizes (2.5mm and 1.5mm twin and earth, 6.0mm twin and earth, 1.5mm flex)
          and floor space for larger drums carried on a job-by-job basis.
        </p>
      </>
    ),
  },
  {
    id: 'cost-analysis',
    heading: 'Cost Analysis: Is Premium Racking Worth It?',
    content: (
      <>
        <p>
          The financial case for van racking depends on how much time you save and how long you
          keep the system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time saving</strong> — 15 to 30 minutes per job in tool retrieval, averaged
                over 250 working days, equals 62 to 125 hours per year. At 40 pounds per hour
                charge-out rate, that is 2,500 to 5,000 pounds per year in recovered productive time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY option (300 pounds)</strong> — pays for itself in 1 to 2 weeks of
                recovered time. No financial risk. But offers minimal security, no crash protection,
                and limited durability. Plan to rebuild every 2 to 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range (Van Guard, 800 to 1,200 pounds)</strong> — pays for itself in 4
                to 8 weeks. Good durability (5 to 7 years). Best value for sole traders. Van
                Guard-level racking is the point where the returns clearly justify the investment
                for almost every electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premium (Sortimo/Bott, 3,000 to 5,000 pounds)</strong> — pays for itself in
                12 to 20 weeks, but the additional benefit over mid-range is primarily modularity,
                transferability, and crash testing. The time saving is similar to mid-range once you
                are organised. The premium is justified for fleets (standardised layouts across
                vans), high-value tool storage (lockable compartments), and safety-conscious firms.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation',
    heading: 'Self-Fit vs Professional Installation',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Self-Fit</h3>
            <p className="text-white text-sm leading-relaxed">
              Mid-range systems (Van Guard, Rhino) are designed for self-installation. You need a
              drill, rivnut tool, socket set, tape measure, and a free day. Most kits use the van's
              existing load lashing points — no drilling through the van floor or walls if you use
              the factory threads. Self-fitting saves 200 to 500 pounds in labour. The risk is
              incorrect fitment — if shelving is not level or secure, it rattles in transit and
              items fall off. Follow the manufacturer instructions exactly and use the correct
              fixings.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Professional Fitting</h3>
            <p className="text-white text-sm leading-relaxed">
              Premium systems (Sortimo, Bott, Modul-System) are best professionally fitted. The
              fitter ensures the system is correctly installed, level, and crash-test compliant.
              Professional fitting typically costs 300 to 800 pounds depending on the complexity.
              The fitter can also advise on the optimal layout for your specific work pattern.
              Most Sortimo and Bott dealers have mobile fitting vans that come to your premises.
              Allow half a day to a full day for installation.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'verdict',
    heading: 'Our Verdict',
    content: (
      <>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">The Recommendation</h3>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For most sole-trader electricians: Van Guard.</strong> The best balance of cost,
            quality, and practicality. A nearside shelving unit with cable reel holders costs 800 to
            1,200 pounds, self-fits in a day, and lasts 5 to 7 years. It pays for itself within
            two months.
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For firms with 3+ vans: Bott Smartvan.</strong> Fleet-grade quality with
            standardised layouts across vehicles. Crash-tested, modular, and transferable between
            vans. The higher upfront cost is offset by longer lifespan and fleet consistency.
          </p>
          <p className="text-white text-sm leading-relaxed mb-3">
            <strong>For weight-sensitive smaller vans: Modul-System.</strong> The aluminium
            construction saves 30 to 40 kg versus steel systems — meaningful when your Berlingo
            payload is already tight.
          </p>
          <p className="text-white text-sm leading-relaxed">
            <strong>For apprentices and those starting out: DIY plywood.</strong> Spend 200 to 300
            pounds on materials, build shelving that fits your needs exactly, and upgrade to
            commercial racking when the business grows. There is no shame in plywood — most
            experienced electricians started with it.
          </p>
        </div>
        <SEOAppBridge
          title="Manage your tools, quotes, and certificates from the van"
          description="Elec-Mate puts quoting, cable sizing, and certificate completion on your phone. Quote from the survey, size cables on site, and complete certificates before you leave. Everything the well-organised electrician needs."
          icon={Truck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BestVanRackingElectriciansPage() {
  return (
    <GuideTemplate
      title="Best Van Racking for Electricians 2026 | Systems Compared"
      description="Honest comparison of the best van racking systems for UK electricians in 2026. Sortimo, Bott Smartvan, Van Guard, Modul-System, and DIY options compared by price, weight, modularity, and suitability for Transit Custom, Vivaro, and Berlingo vans."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Equipment Guide"
      badgeIcon={Truck}
      heroTitle={
        <>
          Best Van Racking for Electricians:{' '}
          <span className="text-yellow-400">2026 Systems Compared</span>
        </>
      }
      heroSubtitle="Stop wasting time rummaging through a messy van. Sortimo, Bott, Van Guard, Modul-System, and DIY options compared by price, weight, van model compatibility, and real-world value."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Van Racking for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Run Your Business From Your Van With Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, cable sizing, and on-site certificates. Professional tools on your phone — no paperwork, no office trips. 7-day free trial."
    />
  );
}
