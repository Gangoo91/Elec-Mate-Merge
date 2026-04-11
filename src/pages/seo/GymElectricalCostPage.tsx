import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Dumbbell,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Music,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Gym Electrical Cost', href: '/guides/gym-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Gym Electrical Overview' },
  { id: 'three-phase', label: '3-Phase for Commercial Equipment' },
  { id: 'shower-areas', label: 'Shower Areas and IP Ratings' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'music-pa', label: 'Music and PA Systems' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Gym Size' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Gym Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Gym electrical installation costs £8,000 to £30,000 in 2026 depending on gym size, equipment specification, whether 3-phase supply is needed, shower/changing facilities, and the extent of music/PA and lighting systems.',
  'Commercial gym equipment — treadmills, cross trainers, and cable machines — draws significant power. A bank of 20 treadmills can draw 30 to 40kW at peak load, requiring 3-phase distribution.',
  'Shower and changing areas require IP44 to IP65 rated accessories and careful zone planning similar to bathroom requirements under Section 701 of BS 7671. RCD protection per Regulation 411.3.3 is essential.',
  'Emergency lighting to BS 5266-1 is required throughout gym premises, with particular attention to free weights areas, studio spaces, and changing rooms where sudden darkness could cause injury.',
  'Music and PA systems are integral to the gym experience. A distributed audio system with zone control costs £2,000 to £6,000 including speakers, amplifier, mixer, and wiring.',
];

const faqs = [
  {
    question: 'How much does gym electrical installation cost in 2026?',
    answer:
      'Gym electrical installation costs £8,000 to £30,000 in 2026. A small studio gym or personal training space (100 to 200m²) with basic equipment, lighting, and sound costs £8,000 to £12,000. A medium gym (300 to 600m²) with cardio floor, free weights, studios, changing rooms, and full PA system costs £15,000 to £22,000. A large commercial gym or health club (800m²+) with extensive cardio equipment, multiple studios, swimming pool or spa area, sauna, steam room, and comprehensive audio-visual systems costs £22,000 to £30,000 or more.',
  },
  {
    question: 'Does a gym need 3-phase power?',
    answer:
      'Most commercial gyms need 3-phase power. Commercial treadmills draw 1.5 to 3kW each at peak load (incline and high speed). A bank of 20 treadmills at peak can draw 30 to 40kW. Cross trainers draw 0.5 to 1kW each (self-powered models draw less). Air conditioning for the gym floor adds 10 to 30kW. When total load exceeds 15kW (single-phase limit), 3-phase is required. Even smaller gyms benefit from 3-phase for better load distribution and future expansion capacity.',
  },
  {
    question: 'What IP rating is needed in gym shower areas?',
    answer:
      'Gym shower areas must comply with Section 701 of BS 7671 (locations containing a bath or shower). Zone 0 (inside the shower cubicle): IPX7 minimum, only SELV circuits up to 12V. Zone 1 (above the shower cubicle to 2.25m height): IPX4 minimum (IPX5 if jet washing is used). Zone 2 (0.6m from the shower): IPX4 minimum. Outside Zone 2: standard IP ratings but 30mA RCD protection per Regulation 411.3.3 remains mandatory. All socket outlets must be at least 3 metres from the shower zone (or outside Zone 2 if supplementary equipotential bonding is applied).',
  },
  {
    question: 'What emergency lighting does a gym need?',
    answer:
      'Gyms require emergency lighting under the Regulatory Reform (Fire Safety) Order 2005, compliant with BS 5266-1. Coverage must include all escape routes and exits, the main gym floor (free weights area where sudden darkness could cause injury from dropped weights), studio spaces, changing rooms and showers, reception area, and any stairways. Self-contained LED emergency fittings with 3-hour duration are standard. A medium gym typically needs 20 to 35 emergency fittings including illuminated exit signs. Cost: £2,000 to £5,000 installed.',
  },
  {
    question: 'What power supply do commercial treadmills need?',
    answer:
      'Commercial treadmills typically require a standard 13A socket outlet (BS 1363) on a dedicated circuit or a shared circuit with no more than 4 to 6 treadmills per 20A or 32A radial circuit. Peak power draw is 1.5 to 3kW per treadmill depending on the model. Some commercial treadmills have built-in surge protection, but an SPD at the distribution board is recommended. The socket outlet should be positioned behind or adjacent to the treadmill — avoid trailing cables across walkways. Self-generating treadmills (which power their own displays from the running belt) draw much less but still need a socket for the initial start-up.',
  },
  {
    question: 'How much does a gym sound system cost to install?',
    answer:
      'A gym sound system (distributed audio with zone control) costs £2,000 to £6,000 installed. A basic system with 6 to 8 ceiling speakers, a commercial amplifier, Bluetooth input, and a single zone costs £2,000 to £3,000. A multi-zone system with 12 to 20 speakers, independent volume control for the gym floor, studios, changing rooms, and reception, wireless microphone for classes, and rack-mounted equipment costs £4,000 to £6,000. The electrical work includes speaker cable runs, amplifier power supply, rack power, and loudspeaker installation.',
  },
  {
    question: 'What lighting is best for a gym?',
    answer:
      'Gym lighting should provide 300 to 500 lux on the training floor, with higher levels (500 lux) in free weights areas and studio spaces. LED panels or high-bay LED fittings (in high-ceiling gyms) are standard. Colour temperature of 4000K to 5000K provides an energetic, clean environment. Dimmable lighting in studios allows mood adjustment for different class types (bright for HIIT, dim for yoga). Feature lighting in reception and social areas (3000K, accent lighting) creates atmosphere. Budget £3,000 to £8,000 for gym floor and studio lighting depending on size.',
  },
  {
    question: 'Do gyms need fire alarm systems?',
    answer:
      'Yes. Gym premises require a fire alarm system under the Regulatory Reform (Fire Safety) Order 2005, designed to BS 5839-1. The category is determined by the fire risk assessment — typically Category L2 (escape routes plus rooms opening onto escape routes plus high-risk areas such as saunas and plant rooms) or Category M (manual call points only, for smaller premises). Where the gym includes sleeping accommodation (e.g. staff quarters), Category L1 (full coverage) is required. A fire alarm system for a medium gym costs £3,000 to £7,000.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial electrical installation costs per square metre.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Distribution board costs for commercial installations.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for gym installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote gym electrical work with equipment schedules and zone pricing.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Gym Electrical Overview',
    content: (
      <>
        <p>
          Gym electrical installation is demanding commercial work that combines high-power
          equipment circuits, wet area wiring (showers and changing rooms), audio-visual systems,
          feature lighting, and fire safety provisions. The electrical installation directly affects
          the gym experience — reliable power for equipment, motivating lighting and sound, and safe
          changing facilities are all dependent on the electrical design.
        </p>
        <p>
          Whether you are a gym owner planning a fit-out, a property developer including a gym in a
          mixed-use development, or an electrical contractor pricing a gym installation, this guide
          provides realistic cost breakdowns based on current UK market rates.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: '3-Phase for Commercial Equipment',
    content: (
      <>
        <p>
          The combined power draw of commercial gym equipment, air conditioning, lighting, and
          ancillary systems means most gyms require a 3-phase electrical supply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Equipment Loads</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardio equipment</strong> — Treadmills: 1.5 to 3kW each. Cross trainers: 0.3
                to 1kW each (self-powered models draw less). Rowing machines: 0.1 to 0.3kW each.
                Exercise bikes: 0.1 to 0.5kW each. A cardio floor with 30 machines can draw 30 to
                50kW at peak.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air conditioning</strong> — Commercial HVAC for a gym requires significant
                power due to the high occupancy and heat generated by exercising. Budget 10 to 30kW
                for a medium gym. Typically 3-phase for the compressor units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sauna and steam room</strong> — Sauna heater: 6 to 12kW (dedicated circuit,
                often 3-phase for larger saunas). Steam generator: 6 to 18kW (dedicated circuit).
                Both require local isolators and specific containment to withstand heat and
                moisture.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water heating</strong> — Commercial water heating for showers can draw 20 to
                50kW for instantaneous systems or 6 to 12kW for stored hot water. Some gyms use gas
                water heating with electrical controls only.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A 3-phase TPN distribution board with MCCB incomer and multiple sub-distribution boards
          costs £3,000 to £8,000 installed for a medium gym. If the premises does not have 3-phase,
          a DNO supply upgrade costs £1,500 to £5,000 additional and takes 8 to 12 weeks.
        </p>
      </>
    ),
  },
  {
    id: 'shower-areas',
    heading: 'Shower Areas and IP Ratings',
    content: (
      <>
        <p>
          Gym shower and changing areas must comply with Section 701 of BS 7671 (locations
          containing a bath or shower). This section defines zones around showers and baths with
          specific requirements for IP ratings and equipment types.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Zone Requirements (Section 701)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0 (inside shower tray)</strong> — IPX7 minimum. Only SELV circuits at
                maximum 12V AC or 30V DC. No socket outlets, no switches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1 (above shower to 2.25m)</strong> — IPX4 minimum (IPX5 if communal
                showers with jet washing). Only fixed equipment permanently connected to the
                electrical supply. Suitable for shower pumps, water heaters, and luminaires rated
                for Zone 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2 (0.6m from shower)</strong> — IPX4 minimum. Luminaires, fans, and
                hand dryers suitable for the zone. Socket outlets for shavers fed from an isolating
                transformer complying with BS EN 61558-2-5 are permitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outside Zone 2</strong> — Standard accessories are permitted but 30mA RCD
                protection per Regulation 411.3.3 is mandatory for all circuits in the room. Socket
                outlets for hair dryers (provided in many gyms) must be outside Zone 2.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Changing room and shower area electrical installation for a medium gym costs £2,000 to
          £5,000 depending on the number of showers, hair dryer stations, and hand dryer positions.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting',
    content: (
      <>
        <p>
          Emergency lighting is critical in gym premises. The gym floor contains heavy equipment
          that could cause serious injury if a member is exercising in sudden darkness. Free weights
          areas, studio spaces with group classes, and wet changing rooms all present specific
          risks.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">High-Risk Areas</h3>
            <p className="text-white text-sm leading-relaxed">
              Free weights areas (dropped weights, heavy barbells), studio spaces during classes
              (40+ people in a dark room), swimming pools (drowning risk), and sauna/steam rooms
              (disorientation risk) all require maintained emergency lighting that provides adequate
              illumination to prevent injury and allow safe evacuation.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Escape Routes</h3>
            <p className="text-white text-sm leading-relaxed">
              Minimum 1 lux on escape route centre lines to BS 5266-1. Illuminated exit signs at all
              exits and changes of direction. 3-hour duration is standard. Self-contained LED
              fittings are the most common choice. A medium gym typically needs 20 to 35 emergency
              fittings. Cost: £2,000 to £5,000 installed.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'music-pa',
    heading: 'Music and PA Systems',
    content: (
      <>
        <p>
          Music is fundamental to the gym experience. A properly designed and installed distributed
          audio system with zone control allows different music in different areas — high-energy on
          the cardio floor, instructor-led in studios, ambient in changing rooms.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Music className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling speakers</strong> — Commercial ceiling speakers for gym use cost £30
                to £80 each. A medium gym needs 12 to 20 speakers for adequate coverage. Use
                moisture-rated speakers (IP44) in changing rooms and wet areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial amplifier</strong> — A multi-zone commercial amplifier with 4 to
                6 zones costs £500 to £1,500. Rack-mounted with Bluetooth and aux inputs.
                Commercial-grade equipment is essential — domestic hi-fi equipment is not suitable
                for the continuous duty cycle of a gym.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio PA</strong> — Each studio needs a wireless microphone system (£200 to
                £500) for instructors, plus dedicated speakers and a sub-woofer for bass-heavy
                classes. Studio PA adds £500 to £1,500 per studio.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Music className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring</strong> — Speaker cable (2-core, 1.5mm² or 2.5mm² for longer runs)
                from the amplifier location to each speaker position. Allow £3 to £8 per metre
                installed including containment. Total wiring cost for a medium gym: £500 to £1,500.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total sound system cost for a medium gym: £2,000 to £6,000 installed. This is specialist
          work — if you are not experienced with audio installations, consider subcontracting the
          system design and commissioning to an AV specialist whilst handling the infrastructure
          wiring yourself.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Gym Size',
    content: (
      <>
        <p>Here are realistic total electrical installation costs for gyms in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small studio gym, 100 to 200m² (£8,000 to £12,000)</strong> — Single-phase
                or small 3-phase supply, 10 to 15 equipment sockets, basic sound system, LED panel
                lighting, small changing room with 2 to 4 showers (Section 701 compliance),
                emergency lighting, fire alarm (Category M). 1 to 2 weeks installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium gym, 300 to 600m² (£15,000 to £22,000)</strong> — 3-phase supply,
                main distribution board with sub-boards, 30+ equipment circuits, multi-zone sound
                system, feature lighting with dimming in studios, full changing rooms with 8 to 12
                showers, hair dryer stations, emergency lighting, fire alarm (Category L2), CCTV
                provisions, access control wiring, air conditioning supply. 2 to 4 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large gym or health club, 800m²+ (£22,000 to £30,000+)</strong> — Heavy
                3-phase distribution, multiple sub-boards, 50+ equipment circuits, comprehensive
                multi-zone AV with studio PA, premium lighting design, extensive changing
                facilities, sauna and steam room circuits, pool plant (if applicable), BMS
                integration, full CCTV and access control, Category L2 fire alarm, comprehensive
                emergency lighting. 4 to 6 weeks installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote gym electrical with equipment and zone pricing"
          description="Elec-Mate's quoting app handles gym electrical work with equipment schedules, zone pricing, sound system wiring, and Section 701 wet area provisions. Professional PDF quotes."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Standards',
    content: (
      <>
        <p>Gym electrical installations must comply with several standards and regulations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — Full compliance required. Section 701 for
                shower areas. RCD protection per Regulation 411.3.3 on all socket outlets and wet
                area circuits. SPD protection per Regulation 443.4.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5266-1</strong> — Emergency lighting in all escape routes and high-risk
                areas. 3-hour duration standard. Regular testing and maintenance records required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5839-1</strong> — Fire alarm system design and installation. Category
                determined by fire risk assessment. Separate commissioning certificate required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — All electrical equipment
                must be maintained in a safe condition. Regular EICR inspections (recommended
                annually for gym premises due to the intensive use).
              </span>
            </li>
          </ul>
        </div>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for the complete installation.
          Fire alarm and emergency lighting require separate commissioning certificates.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Gym Work',
    content: (
      <>
        <p>
          Gym electrical installations are high-value, multi-discipline projects. Here are practical
          tips for quoting:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Dumbbell className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Get the Equipment Floor Plan</h4>
                <p className="text-white text-sm leading-relaxed">
                  Request the gym equipment layout showing every piece of equipment that needs
                  power. Treadmills, cross trainers, bikes, cable machines, and display screens all
                  need socket outlets in specific positions. Use{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate's quoting app
                  </SEOInternalLink>{' '}
                  to build per-zone pricing based on the equipment layout.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Droplets className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Price the Wet Areas Separately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Changing rooms and shower areas with Section 701 compliance are significantly more
                  expensive per square metre than the gym floor. Price them as a separate section of
                  the quote with the IP-rated accessories and supplementary bonding clearly
                  itemised.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Music className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Sound System Specialist</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you are not experienced with commercial audio installations, subcontract the
                  system design and commissioning to an AV specialist. You provide the
                  infrastructure — speaker cable routes, power to the rack, and speaker positions —
                  they provide the equipment specification and commissioning.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote gym electrical with zone and equipment pricing"
          description="Elec-Mate's quoting app handles gym fit-outs with equipment circuits, wet area provisions, sound system wiring, and fire safety — all in one professional PDF quote. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GymElectricalCostPage() {
  return (
    <GuideTemplate
      title="Gym Electrical Cost 2026 | UK Commercial Gym Installation Guide"
      description="How much does gym electrical installation cost in 2026? UK guide covering 3-phase for commercial equipment, shower area IP ratings, emergency lighting, music/PA systems, and costs from £8,000 to £30,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Gym Electrical Cost: <span className="text-yellow-400">UK Commercial Gym Guide 2026</span>
        </>
      }
      heroSubtitle="What does gym electrical installation cost? This guide covers 3-phase for commercial equipment, shower area IP ratings, emergency lighting, music and PA systems, and realistic pricing from £8,000 to £30,000 — for gym owners and electrical contractors."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Gym Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Gym Electrical with Equipment and Zone Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for gym fit-out quoting with equipment schedules, wet area provisions, and professional PDF output. 7-day free trial."
    />
  );
}
