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
  'BS 7671:2018+A4:2026 Section 714 governs outdoor lighting installations including gardens, pathways, driveways, and amenity areas. Regulation 714.1 sets the scope to cover gardens and places open to the public.',
  'Domestic garden lighting circuits require 30mA RCD protection. Regulation 411.3.4 (added in A4:2026) requires additional protection by a 30mA RCD for all AC final circuits supplying luminaires within domestic premises.',
  'IP ratings are critical for garden lighting — IP44 minimum for sheltered locations, IP65 for exposed installations, IP67 or IP68 for in-ground or submerged fittings.',
  'Garden lighting that involves new outdoor circuits is notifiable under Part P of the Building Regulations and requires an Electrical Installation Certificate.',
];

const answerBox = {
  question: 'How much does garden lighting installation cost in the UK?',
  answer:
    'A simple pathway scheme of 4 to 6 LED lights on one circuit typically costs £500 to £1,000 fitted. A mid-range garden with pathway, deck and feature lights across two circuits runs £1,200 to £2,500. A comprehensive landscape scheme with multiple zones, long SWA runs and smart controls reaches £3,000 to £5,000 or more. Trenching and cable runs are usually the biggest cost driver, not the fittings.',
};

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
      'For mains voltage garden lighting circuits buried underground, SWA (steel wire armoured) cable is the standard choice. BS 7671 Regulation 522.8.10 requires that a cable buried in the ground incorporates an earthed armour or metal sheath (or both) suitable for use as a protective conductor, unless installed in a conduit or duct giving equivalent mechanical protection — SWA satisfies this directly. The same regulation requires the cable route to be marked with cable covers or a suitable marker tape, and buried at a sufficient depth to avoid damage from any reasonably foreseeable disturbance of the ground. The typical size for a domestic garden lighting circuit is 1.5mm2 SWA for lighting loads. For longer runs or higher-power installations, 2.5mm2 SWA may be needed to manage voltage drop.',
  },
  {
    question: 'Can I use solar-powered garden lights instead of mains lighting?',
    answer:
      'Solar-powered garden lights are a zero-installation option that works well for path marking and ambient decoration. However, they have significant limitations compared to mains lighting: lower light output (typically 10 to 50 lumens versus 200 to 800 lumens for mains LED fittings), unreliable performance in winter and overcast conditions, battery degradation over 2 to 3 years, and limited design options. For serious garden lighting — security lighting, entertaining areas, feature illumination, or reliable pathway lighting — mains-powered LED fixtures provide far superior performance and longevity.',
  },
  {
    question: 'Do garden lighting circuits need RCD protection?',
    answer:
      'Yes. Within domestic premises, BS 7671 Regulation 411.3.4 (added in A4:2026) requires additional protection by a 30mA RCD for all AC final circuits supplying luminaires — this captures garden lighting directly. Regulation 411.3.3 separately requires 30mA RCD protection for socket-outlets up to 32A and for mobile equipment up to 32A used outdoors. A 30mA RCD provides additional protection against electric shock in an environment where the risk is higher due to moisture and contact with earth. Best practice is to protect the garden lighting circuit with a dedicated RCBO at the consumer unit, so a fault outdoors does not trip other circuits in the house.',
  },
  {
    question: 'How deep should garden lighting cable be buried?',
    answer:
      'BS 7671 Regulation 522.8.10 does not set a single fixed depth — it requires buried cables to be at a sufficient depth to avoid damage from any reasonably foreseeable disturbance of the ground, with the route marked by cable covers or a suitable marker tape. In practice, the widely adopted UK conventions are around 450mm under a lawn or planted bed, 500mm or more across open garden soil, and 600mm under driveways or areas subject to vehicle traffic, ideally run through a duct for extra protection. Place marker tape above the cable run and document the route on the as-built drawings handed to the homeowner so future digging avoids the cable.',
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
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size SWA cable for garden lighting circuits with automatic voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
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
    href: '/tools/electrical-quoting-app',
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
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Section 714 that apply to outdoor lighting installations. For the regulatory detail on its
          own, see our{' '}
          <SEOInternalLink href="/guides/garden-lighting-regs">
            garden lighting regulations guide
          </SEOInternalLink>{' '}
          and the wider{' '}
          <SEOInternalLink href="/guides/outdoor-electrics">outdoor electrics guide</SEOInternalLink>
          .
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
            <p className="text-white text-sm leading-relaxed mb-4">
              LED post lights and bollards for paths, driveways, and garden borders. The everyday
              workhorse of a scheme — used to mark routes and edges for safe navigation after dark.
              Budget for 4 to 8 fittings for a typical garden path.
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-white/10 pt-3">
              <dt className="text-white/60">Power</dt>
              <dd className="text-white font-medium text-right">2W – 10W</dd>
              <dt className="text-white/60">Output</dt>
              <dd className="text-white font-medium text-right">100 – 400 lm</dd>
              <dt className="text-white/60">IP rating</dt>
              <dd className="text-white font-medium text-right">IP65</dd>
              <dt className="text-white/60">Cost each</dt>
              <dd className="text-yellow-300 font-semibold text-right">£30 – £120</dd>
            </dl>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Deck and Step Lights</h3>
            <p className="text-white text-sm leading-relaxed mb-4">
              Recessed low-profile LED fittings for timber decking, steps, and retaining walls.
              Usually installed in groups of 6 to 12 for consistent coverage across a deck area and
              to wash steps for safety.
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-white/10 pt-3">
              <dt className="text-white/60">Power</dt>
              <dd className="text-white font-medium text-right">1W – 3W</dd>
              <dt className="text-white/60">Mounting</dt>
              <dd className="text-white font-medium text-right">Recessed</dd>
              <dt className="text-white/60">IP rating</dt>
              <dd className="text-white font-medium text-right">IP67</dd>
              <dt className="text-white/60">Cost each</dt>
              <dd className="text-green-300 font-semibold text-right">£15 – £60</dd>
            </dl>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Uplights and Feature Lighting</h3>
            <p className="text-white text-sm leading-relaxed mb-4">
              In-ground or spike-mounted uplights for trees, walls, and architectural features.
              These are the fittings that create the "wow factor" — the dramatic effect that sells a
              full scheme to the homeowner.
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-white/10 pt-3">
              <dt className="text-white/60">Power</dt>
              <dd className="text-white font-medium text-right">5W – 20W</dd>
              <dt className="text-white/60">Mounting</dt>
              <dd className="text-white font-medium text-right">In-ground / spike</dd>
              <dt className="text-white/60">IP rating</dt>
              <dd className="text-white font-medium text-right">IP67 min</dd>
              <dt className="text-white/60">Cost each</dt>
              <dd className="text-blue-300 font-semibold text-right">£40 – £150</dd>
            </dl>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Security and Floodlighting</h3>
            <p className="text-white text-sm leading-relaxed mb-4">
              Motion-activated LED floodlights for driveways, side passages, and rear gardens.
              Usually 2 to 4 fittings per property covering all approach areas, often wall-mounted
              and surface-wired without trenching.
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-white/10 pt-3">
              <dt className="text-white/60">Power</dt>
              <dd className="text-white font-medium text-right">10W – 50W</dd>
              <dt className="text-white/60">Output</dt>
              <dd className="text-white font-medium text-right">800 – 4,000 lm</dd>
              <dt className="text-white/60">IP rating</dt>
              <dd className="text-white font-medium text-right">IP65</dd>
              <dt className="text-white/60">Cost each</dt>
              <dd className="text-red-300 font-semibold text-right">£30 – £100</dd>
            </dl>
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
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white/70">
                <th className="px-4 py-3 font-semibold">Project type</th>
                <th className="px-4 py-3 font-semibold">Fittings</th>
                <th className="px-4 py-3 font-semibold text-right">Typical total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white">
              <tr className="bg-green-900/20">
                <td className="px-4 py-3 align-top">
                  <span className="font-semibold text-white">Security lighting only</span>
                  <p className="text-white/60 text-xs mt-1">
                    Wall-mounted LED floodlights with PIR sensors, surface-wired from the consumer
                    unit. No trenching if mounted on the house exterior.
                  </p>
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">2 – 4</td>
                <td className="px-4 py-3 align-top text-right font-semibold text-green-300 whitespace-nowrap">
                  £300 – £700
                </td>
              </tr>
              <tr className="bg-yellow-900/20">
                <td className="px-4 py-3 align-top">
                  <span className="font-semibold text-white">Simple pathway scheme</span>
                  <p className="text-white/60 text-xs mt-1">
                    Budget fittings, short cable run, single circuit, photocell control. Ideal for a
                    front path or short garden walkway.
                  </p>
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">4 – 6</td>
                <td className="px-4 py-3 align-top text-right font-semibold text-yellow-300 whitespace-nowrap">
                  £500 – £1,000
                </td>
              </tr>
              <tr className="bg-blue-900/20">
                <td className="px-4 py-3 align-top">
                  <span className="font-semibold text-white">Mid-range garden scheme</span>
                  <p className="text-white/60 text-xs mt-1">
                    Mix of pathway, deck and feature lights across two circuits. SWA runs of 20 to
                    40 metres. Astronomical time switch or smart controller.
                  </p>
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">8 – 15</td>
                <td className="px-4 py-3 align-top text-right font-semibold text-blue-300 whitespace-nowrap">
                  £1,200 – £2,500
                </td>
              </tr>
              <tr className="bg-purple-900/20">
                <td className="px-4 py-3 align-top">
                  <span className="font-semibold text-white">Comprehensive landscape</span>
                  <p className="text-white/60 text-xs mt-1">
                    Multiple zones with independent switching, premium fittings, SWA runs exceeding
                    50 metres, smart home integration and professional lighting design.
                  </p>
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">15 – 30+</td>
                <td className="px-4 py-3 align-top text-right font-semibold text-purple-300 whitespace-nowrap">
                  £3,000 – £5,000+
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <SEOAppBridge
          title="Design and quote garden lighting schemes"
          description="Elec-Mate's quoting app helps you build detailed, itemised quotes for garden lighting projects."
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
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          contains the particular requirements for outdoor lighting installations. Regulation 714.1
          sets the scope to cover one or more luminaires, a wiring system and accessories for places
          including gardens, parks, car parks, driveways and places open to the public. The table
          below lists the regulations most relevant to a domestic garden lighting job.
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white/70">
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Regulation</th>
                <th className="px-4 py-3 font-semibold">Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white align-top">
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 whitespace-nowrap">714.1</td>
                <td className="px-4 py-3">
                  Scope — applies to outdoor lighting comprising luminaires, a wiring system and
                  accessories, including gardens, car parks, driveways and places open to the
                  public. Excludes temporary festoon lighting and luminaires fixed to the outside of
                  a building and supplied directly from that building's internal wiring.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 whitespace-nowrap">714.410.3.6</td>
                <td className="px-4 py-3">
                  The protective measures of non-conducting location (Regulation 418.1) and
                  earth-free local equipotential bonding (Regulation 418.2) shall not be used.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 whitespace-nowrap">714.411.201</td>
                <td className="px-4 py-3">
                  Where automatic disconnection of supply is the protective measure, all live parts
                  must have basic protection by insulation, barrier or enclosure. A door in street
                  furniture used for access shall not be used as the barrier or enclosure.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 whitespace-nowrap">714.411.2.201</td>
                <td className="px-4 py-3">
                  For a luminaire less than 2.80m above ground level, access to the light source
                  shall only be possible after removing a barrier or enclosure requiring the use of
                  a tool — preventing casual contact with live parts.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 whitespace-nowrap">714.411.3.4</td>
                <td className="px-4 py-3">
                  Except for lighting supplied from a SELV source, outdoor lighting accessible to
                  the public must have additional protection by an RCD with the rated residual
                  operating current specified in Regulation 415.1.1 (30mA).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 whitespace-nowrap">714.411.202</td>
                <td className="px-4 py-3">
                  A maximum disconnection time of 5 seconds applies to circuits feeding fixed
                  equipment used in highway power supplies (for compliance with 411.3.2.3 in a TN
                  system or 411.3.2.4 in a TT system).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-5 my-4">
          <p className="text-white text-sm leading-relaxed">
            <strong>Domestic garden takeaways:</strong> use IP-rated fittings suited to each
            location, provide 30mA RCD protection (Regulation 411.3.4 requires it for all AC final
            circuits supplying luminaires within domestic premises), use SWA for direct-buried runs
            so the armour acts as the protective conductor and mechanical protection (Regulation
            522.8.10), and ensure all outdoor connections use IP-rated enclosures.
          </p>
        </div>
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
          leads to premature failure, potential electric shock, and will fail an inspection. Match
          the rating to the location using the quick reference below.
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 my-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.06] text-white/70">
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Min. IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white">
              <tr>
                <td className="px-4 py-3">Under a porch, canopy or pergola (sheltered)</td>
                <td className="px-4 py-3 text-right font-mono text-blue-300">IP44</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Exposed walls, bollards, post lights (open weather)</td>
                <td className="px-4 py-3 text-right font-mono text-green-300">IP65</td>
              </tr>
              <tr>
                <td className="px-4 py-3">In-ground uplights, driveway and flood-prone spots</td>
                <td className="px-4 py-3 text-right font-mono text-yellow-300">IP67</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Pond, fountain and permanently submerged fittings</td>
                <td className="px-4 py-3 text-right font-mono text-red-300">IP68</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              installation. Submerged fittings are normally run at extra-low voltage (SELV/PELV) for
              safety.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
                  build itemised garden lighting quotes. List each fitting type, cable quantities,
                  junction boxes, controls, labour for trenching, installation, testing, and
                  certification. Professional PDF sent to the customer.
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
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
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
                  Complete the <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> on
                  site after testing. Document the outdoor circuit, SWA cable details, IP ratings of
                  installed fittings, and test results. Instant PDF export to the homeowner.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote garden lighting and outdoor electrical work"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification."
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
      description="How much does garden lighting installation cost in the UK in 2026? Complete pricing guide covering LED path lights, deck lights, uplights…"
      datePublished="2026-03-27"
      dateModified="2026-06-10"
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
      answerBox={answerBox}
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
