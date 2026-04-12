import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  FileCheck2,
  PoundSterling,
  Cable,
  Lightbulb,
  TreePine,
  Sun,
  Wrench,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Garden Lighting Cost', href: '/guides/garden-lighting-installation-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Garden Lighting Overview' },
  { id: 'lighting-types', label: 'Types of Garden Lighting' },
  { id: 'material-costs', label: 'Material Costs Breakdown' },
  { id: 'labour-costs', label: 'Labour and Installation Costs' },
  { id: 'total-costs', label: 'Total Costs by Project Type' },
  { id: 'section-714', label: 'Section 714: Outdoor Lighting Regulations' },
  { id: 'ip-ratings', label: 'IP Ratings for Outdoor Lighting' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Garden Lighting' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Garden lighting installation costs range from £500 for a simple scheme with 4 to 6 LED lights to £5,000+ for a comprehensive landscape lighting design with multiple zones, SWA cable runs, and automated controls.',
  'BS 7671:2018+A3:2024 Section 714 governs outdoor lighting installations including gardens, pathways, driveways, and amenity areas. Regulation 714.537.2 defines the scope and specific requirements.',
  'All outdoor lighting circuits require RCD protection (30mA). Regulation 710.511.1 confirms RCD requirements for outdoor outlet circuits to provide earth-fault protection.',
  'IP ratings are critical for garden lighting — IP44 minimum for sheltered locations, IP65 for exposed installations, IP67 or IP68 for in-ground or underwater fittings.',
  'Garden lighting that involves new outdoor circuits is notifiable under Part P of the Building Regulations and requires an Electrical Installation Certificate.',
];

const faqs = [
  {
    question: 'How much does it cost to install garden lighting in 2026?',
    answer:
      'Garden lighting installation costs vary widely depending on the scope of the project. A simple scheme with 4 to 6 LED post or spike lights on a single circuit typically costs £500 to £1,000. A mid-range project with pathway lights, feature lighting, and deck lights across two circuits costs £1,200 to £2,500. A comprehensive landscape lighting scheme with multiple zones, SWA cable runs, automated controls, and professional design can cost £3,000 to £5,000 or more. The biggest cost driver is typically the cable runs — burying SWA cable across a garden is labour-intensive.',
  },
  {
    question: 'Do I need an electrician to install garden lighting?',
    answer:
      'If the garden lighting is mains voltage (230V) and involves installing a new outdoor circuit from the consumer unit, this is notifiable work under Part P of the Building Regulations. It must be carried out by a registered electrician who can self-certify the work, or notified to Building Control. Low-voltage (12V or 24V) garden lighting powered by a plug-in transformer is not notifiable and can be installed by a homeowner, but the transformer itself must be connected to a suitable indoor socket outlet. Solar-powered garden lights require no electrical installation at all.',
  },
  {
    question: 'What IP rating do I need for garden lights?',
    answer:
      'IP (Ingress Protection) ratings indicate the level of protection against solid objects and water. For garden lighting: IP44 is the minimum for sheltered locations such as under a covered porch or overhang. IP65 is suitable for most exposed outdoor locations — it is dust-tight and protected against water jets from any direction. IP67 is required for lights that may be temporarily submerged (in-ground uplight fittings that may flood). IP68 is required for permanently submerged fittings such as pond lights. Always check the manufacturer specification and install fittings with the appropriate rating for the location.',
  },
  {
    question: 'What cable should I use for garden lighting?',
    answer:
      'For mains voltage garden lighting circuits buried underground, SWA (steel wire armoured) cable is the standard choice. SWA cable has built-in mechanical protection from the steel wire armouring, making it suitable for direct burial at a minimum depth of 500mm (or 450mm under a grass lawn). The typical size for a domestic garden lighting circuit is 1.5mm2 SWA for lighting loads. For longer runs or higher-power installations, 2.5mm2 SWA may be needed to manage voltage drop. Regulation 528.3 of BS 7671 requires adequate depth, warning tapes, and mechanical protection for buried cables.',
  },
  {
    question: 'Can I use solar-powered garden lights instead of mains lighting?',
    answer:
      'Solar-powered garden lights are a zero-installation option that works well for path marking and ambient decoration. However, they have significant limitations compared to mains lighting: lower light output (typically 10 to 50 lumens versus 200 to 800 lumens for mains LED fittings), unreliable performance in winter and overcast conditions, battery degradation over 2 to 3 years, and limited design options. For serious garden lighting — security lighting, entertaining areas, feature illumination, or reliable pathway lighting — mains-powered LED fixtures provide far superior performance and longevity.',
  },
  {
    question: 'Do garden lighting circuits need RCD protection?',
    answer:
      'Yes. All outdoor circuits must be protected by a 30mA RCD as required by BS 7671 Regulation 710.511.1. This provides earth-fault protection in an environment where the risk of electric shock is higher due to moisture, contact with earth, and the use of portable equipment outdoors. The garden lighting circuit should be protected by a dedicated RCBO at the consumer unit, ensuring that a fault on the outdoor circuit does not affect other circuits in the house.',
  },
  {
    question: 'How deep should garden lighting cable be buried?',
    answer:
      'SWA cable for garden lighting should be buried at a minimum depth of 500mm in soil (BS 7671 Regulation 528.3). Under a lawn, 450mm is generally acceptable. Under driveways or areas subject to vehicle traffic, the cable should be at a minimum depth of 600mm and ideally run through a duct for additional protection. Cable route markers or warning tape should be placed 150mm above the cable to alert anyone digging in the future. The cable route should be documented on the as-built drawings provided to the homeowner.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/garden-lighting-regs',
    title: 'Garden Lighting Regulations',
    description:
      'Detailed guide to the regulations covering outdoor and garden lighting installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/outdoor-electrics',
    title: 'Outdoor Electrics Guide',
    description:
      'Complete guide to outdoor electrical installations including sockets, lighting, and SWA cable.',
    icon: TreePine,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size SWA cable for garden lighting circuits with automatic voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on long garden lighting cable runs — critical for consistent brightness.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete EIC certificates for garden lighting installations with test result entry on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote garden lighting projects with itemised materials, cable runs, and labour.',
    icon: Wrench,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Garden Lighting: Transform Outdoor Spaces with Light',
    content: (
      <>
        <p>
          Garden lighting is one of the most satisfying electrical projects — the results are
          immediately visible, the homeowner gets to enjoy their outdoor space after dark, and the
          transformation from a dark garden to a professionally lit landscape is dramatic. It is
          also a high-margin job for electricians who know how to design and quote it properly.
        </p>
        <p>
          From subtle pathway bollards to dramatic tree uplighting, from secure motion-activated
          floodlights to cosy deck lighting for summer entertaining — the range of garden lighting
          options is enormous. The costs vary just as widely, depending on the number of fittings,
          the cable runs, the control system, and the complexity of the installation.
        </p>
        <p>
          This guide covers the real costs of garden lighting installation in 2026 — materials,
          labour, cable, and certification. It also explains the regulatory requirements under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 714 that apply to outdoor lighting installations.
        </p>
      </>
    ),
  },
  {
    id: 'lighting-types',
    heading: 'Types of Garden Lighting and Their Costs',
    content: (
      <>
        <p>
          Understanding the different types of garden lighting helps you scope the project correctly
          and quote with confidence. Here are the main categories:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Pathway and Bollard Lights</h3>
            <p className="text-white text-sm leading-relaxed">
              LED post lights and bollards for paths, driveways, and garden borders. Typically 2W to
              10W per fitting, producing 100 to 400 lumens. IP65 rated for outdoor use. Cost: £30 to
              £120 per fitting depending on quality and design. Budget for 4 to 8 fittings for a
              typical garden path.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Deck and Step Lights</h3>
            <p className="text-white text-sm leading-relaxed">
              Recessed LED fittings for timber decking, steps, and retaining walls. Low-profile and
              typically 1W to 3W per fitting. IP67 rated for recessed locations. Cost: £15 to £60
              per fitting. Usually installed in groups of 6 to 12 for consistent coverage across a
              deck area.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Uplights and Feature Lighting</h3>
            <p className="text-white text-sm leading-relaxed">
              In-ground or spike-mounted uplights for trees, walls, and architectural features. 5W
              to 20W per fitting for dramatic effect. IP67 minimum for in-ground. Cost: £40 to £150
              per fitting. These are the fittings that create the "wow factor" in a garden lighting
              scheme.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Security and Floodlighting</h3>
            <p className="text-white text-sm leading-relaxed">
              Motion-activated LED floodlights for driveways, side passages, and rear gardens.
              Typically 10W to 50W producing 800 to 4,000 lumens. IP65 rated. Cost: £30 to £100 per
              fitting. Usually 2 to 4 fittings per property covering all approach areas.
            </p>
          </div>
        </div>
        <p>
          The best garden lighting schemes combine several types — pathway lights for safe
          navigation, uplights for visual drama, and security lights for safety. A layered approach
          creates depth and interest while serving practical needs.
        </p>
      </>
    ),
  },
  {
    id: 'material-costs',
    heading: 'Material Costs: Fittings, Cable, and Accessories',
    content: (
      <>
        <p>
          The material costs for a garden lighting installation break down into the light fittings
          themselves, the cable, the consumer unit connection, and the control system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Cable and Wiring</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1.5mm2 3-core SWA cable</strong> — approximately £2.50 to £4.00 per metre. A
                typical garden installation requires 20 to 50 metres of SWA cable depending on the
                garden size and layout. Total cable cost: £50 to £200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable glands, junction boxes, and connectors</strong> — £5 to £15 per
                connection point. IP-rated junction boxes for outdoor use. Budget £30 to £80 for a
                typical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO at consumer unit</strong> — £25 to £55 for a dedicated 6A or 10A RCBO
                for the garden lighting circuit.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Control and Switching</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photocell (dusk-to-dawn)</strong> — £10 to £30. Automatically switches
                lights on at dusk and off at dawn. Simple and reliable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Astronomical time switch</strong> — £30 to £80. Programmable timer that
                adjusts automatically for sunset and sunrise times throughout the year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart lighting controller (WiFi/Zigbee)</strong> — £50 to £200.
                App-controlled lighting scenes, scheduling, and remote access. Integrates with smart
                home systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total material costs for a garden lighting installation range from approximately £200 for
          a simple 4-fitting scheme to £1,500+ for a comprehensive multi-zone installation with
          premium fittings and smart controls.
        </p>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Installation Costs',
    content: (
      <>
        <p>
          The labour component of garden lighting is often the largest cost element, primarily
          because of the time required to dig cable trenches. Trenching by hand through established
          garden soil is hard physical work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trenching</strong> — hand-digging a 500mm deep cable trench through lawn and
                flower beds takes approximately 3 to 5 metres per hour depending on soil conditions.
                A 30-metre trench can take a full day. Labour cost for trenching: £150 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable installation</strong> — laying SWA cable, making off glands, jointing
                at junction boxes, and connecting fittings. Allow 2 to 4 hours for a typical scheme.
                Labour cost: £100 to £200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit connection</strong> — installing the RCBO, connecting the SWA
                cable, and labelling the circuit. Allow 1 to 2 hours. Labour cost: £50 to £100.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and certification</strong> — testing the complete installation
                including continuity, insulation resistance, earth fault loop impedance, RCD
                operation, and completing the EIC. Allow 1 to 2 hours. Labour cost: £50 to £100.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total labour cost for a garden lighting installation: £350 to £800 for a typical domestic
          project. Larger schemes with extensive trenching, multiple zones, and complex control
          systems can exceed £1,000 in labour alone.
        </p>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total Garden Lighting Costs by Project Type',
    content: (
      <>
        <p>
          Here are realistic total costs for different garden lighting projects in 2026, including
          all materials, labour, testing, and certification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple pathway scheme (4 to 6 lights)</strong> — £500 to £1,000 total.
                Budget fittings, short cable run, single circuit, photocell control. Ideal for a
                front path or short garden walkway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range garden scheme (8 to 15 lights)</strong> — £1,200 to £2,500 total.
                Mix of pathway, deck, and feature lights across two circuits. SWA cable runs of 20
                to 40 metres. Astronomical time switch or smart controller.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Comprehensive landscape lighting (15 to 30+ lights)</strong> — £3,000 to
                £5,000+ total. Multiple zones with independent switching, premium fittings, SWA runs
                exceeding 50 metres, smart home integration, and professional lighting design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security lighting only (2 to 4 floodlights)</strong> — £300 to £700 total.
                Wall-mounted LED floodlights with PIR sensors, surface-wired from the consumer unit.
                No trenching required if mounted on the house exterior.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Design and quote garden lighting schemes"
          description="Elec-Mate's quoting app helps you build detailed, itemised quotes for garden lighting projects. Cable sizing, material costs, labour, and professional PDF quotes — all from your phone."
          icon={TreePine}
        />
      </>
    ),
  },
  {
    id: 'section-714',
    heading: 'Section 714: Outdoor Lighting Regulations',
    content: (
      <>
        <p>
          Section 714 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          contains the specific requirements for outdoor lighting installations. Regulation
          714.537.2 defines the scope to include luminaires, wiring, and accessories for gardens,
          parks, driveways, and public places.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope (Regulation 714.537.2)</strong> — Section 714 covers outdoor lighting
                installations for roads, parks, car parks, gardens, public places, sporting areas,
                monument illumination, floodlighting, and highway power supplies. It excludes
                temporary festoon lighting and luminaires fixed to the outside of a building when
                supplied from internal wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prohibited protective measures</strong> — Regulation 714.537.2 prohibits the
                use of "non-conducting location" (Regulation 418.1) and "earth-free local
                equipotential bonding" (Regulation 418.2) as protective measures for outdoor
                lighting installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic protection</strong> — when automatic disconnection is the protective
                measure, all live parts must have basic protection by insulation, barrier, or
                enclosure. Doors in street furniture are not acceptable as the barrier or enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnection time</strong> — a maximum automatic disconnection time of 5
                seconds applies for circuits feeding fixed outdoor lighting equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessibility</strong> — luminaires mounted less than 2.80m above ground
                must have the light source accessible only after removal of a barrier or enclosure
                requiring a tool. This prevents casual contact with live parts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic garden installations, the key practical implications are: use IP-rated
          fittings appropriate for the location, provide 30mA RCD protection, bury cables at
          adequate depth with mechanical protection (SWA), and ensure all outdoor connections use
          IP-rated enclosures.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Garden Lighting',
    content: (
      <>
        <p>
          Selecting the correct IP (Ingress Protection) rating for each fitting is essential for
          safety and longevity. Using a fitting with an inadequate IP rating in an exposed location
          leads to premature failure, potential electric shock, and will fail an inspection.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP44</h3>
            <p className="text-white text-sm leading-relaxed">
              Protected against solid objects greater than 1mm and splashing water from any
              direction. Minimum for sheltered outdoor locations such as under a porch, canopy, or
              pergola. Not suitable for exposed locations.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP65</h3>
            <p className="text-white text-sm leading-relaxed">
              Dust-tight and protected against water jets from any direction. The standard rating
              for most exposed garden lighting including wall lights, bollards, and post lights.
              Suitable for UK weather conditions.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP67</h3>
            <p className="text-white text-sm leading-relaxed">
              Dust-tight and protected against temporary immersion in water (up to 1 metre for 30
              minutes). Required for in-ground uplights, driveway lights, and fittings in locations
              that may flood temporarily after heavy rain.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IP68</h3>
            <p className="text-white text-sm leading-relaxed">
              Dust-tight and protected against continuous immersion in water beyond 1 metre.
              Required for pond lights, water feature lighting, and any permanently submerged
              installation. Must be a SELV or PELV supply.
            </p>
          </div>
        </div>
        <p>
          Always specify IP ratings on your quote and in the design documentation. Selecting the
          correct IP rating for each location demonstrates professional competence and protects you
          from liability if a fitting fails prematurely.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Garden Lighting Projects',
    content: (
      <>
        <p>
          Garden lighting is a high-margin job with strong upselling potential. A homeowner who
          starts with "a couple of lights on the path" can often be guided toward a more
          comprehensive scheme once they see a professional design proposal. The key to winning
          these jobs is presenting a clear, itemised quote that shows the value.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised garden lighting quotes. List each fitting type, cable
                  quantities, junction boxes, controls, labour for trenching, installation, testing,
                  and certification. Professional PDF sent to the customer.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Garden lighting cable runs are often long relative to the load. Use the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to confirm 1.5mm2 SWA is adequate or whether 2.5mm2 is needed for voltage drop
                  compliance on longer runs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>{' '}
                  on site after testing. Document the outdoor circuit, SWA cable details, IP ratings
                  of installed fittings, and test results. Instant PDF export to the homeowner.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote garden lighting and outdoor electrical work"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification. Win more garden lighting jobs with itemised, professional quotes. 7-day free trial."
          icon={TreePine}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GardenLightingCostPage() {
  return (
    <GuideTemplate
      title="Garden Lighting Installation Cost UK 2026 | Pricing Guide"
      description="How much does garden lighting installation cost in the UK in 2026? Complete pricing guide covering LED path lights, deck lights, uplights, security lighting, SWA cable costs, IP ratings, and Section 714 outdoor lighting regulations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Garden Lighting Installation Cost:{' '}
          <span className="text-yellow-400">UK Pricing Guide 2026</span>
        </>
      }
      heroSubtitle="From subtle pathway bollards to dramatic tree uplighting, garden lighting transforms outdoor spaces. This guide breaks down every cost — LED fittings, SWA cable, labour, trenching, controls, and certification — so you know exactly what to expect."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Garden Lighting Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Garden Lighting Projects with Confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, itemised quoting, and on-site EIC certification. Win more outdoor lighting work with professional quotes. 7-day free trial, cancel anytime."
    />
  );
}
