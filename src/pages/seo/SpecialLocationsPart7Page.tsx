import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Shield,
  Droplet,
  Flame,
  Tractor,
  Zap,
  Sun,
  Ship,
  Tent,
  AlertTriangle,
  Brain,
  GraduationCap,
  Calculator,
  FileCheck2,
  Search,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Special Locations', href: '/guides/special-locations-part-7-bs-7671' },
];

const tocItems = [
  { id: 'what-is-part-7', label: 'What Is Part 7?' },
  { id: 'section-701-bathrooms', label: '701 — Bathrooms' },
  { id: 'section-702-swimming-pools', label: '702 — Swimming Pools' },
  { id: 'section-703-saunas', label: '703 — Saunas' },
  { id: 'section-704-construction-sites', label: '704 — Construction Sites' },
  { id: 'section-705-agricultural', label: '705 — Agricultural Premises' },
  { id: 'section-706-restrictive', label: '706 — Restrictive Locations' },
  { id: 'section-708-caravan-parks', label: '708 — Caravan Parks' },
  { id: 'section-709-marinas', label: '709 — Marinas' },
  { id: 'section-711-exhibitions', label: '711 — Exhibitions' },
  { id: 'section-712-solar-pv', label: '712 — Solar PV Systems' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Part 7 of BS 7671 contains supplementary and amended regulations for special installations and locations where the risk of electric shock is increased.',
  'Each section (701 to 753) defines specific zones, IP ratings, equipment restrictions, and protective measures tailored to the hazards of that environment.',
  'Bathrooms (701) and swimming pools (702) are the most commonly encountered special locations in domestic work — every electrician must know these inside out.',
  'Solar PV installations (712) have grown rapidly and Section 712 covers DC isolation, string protection, and fire safety requirements.',
  'Elec-Mate provides instant AI lookup of every Part 7 regulation, plus structured training courses covering all special locations for 18th Edition and 2391 exam preparation.',
];

const faqs = [
  {
    question: 'What is a special location under BS 7671?',
    answer:
      'A special location is any installation or location where the risk of electric shock is increased compared with a standard domestic or commercial environment. Part 7 of BS 7671:2018+A4:2026 identifies these locations and provides supplementary or amended regulations that apply in addition to the general requirements of Parts 1 to 6. The increased risk may be due to the presence of water (bathrooms, swimming pools), reduced body resistance (saunas), restricted movement (confined spaces), environmental conditions (construction sites, agricultural premises), or the temporary nature of the installation (exhibitions, shows). The electrician must apply the general requirements of BS 7671 first, then apply the additional Part 7 requirements on top. Where a Part 7 regulation contradicts a general regulation, the Part 7 regulation takes precedence for that location.',
  },
  {
    question: 'Do bathroom regulations apply to a downstairs cloakroom with just a basin?',
    answer:
      'Section 701 applies to locations containing a bath or shower. A room containing only a wash basin (no bath or shower) is not a bathroom under Section 701, so the supplementary regulations for zones 0, 1, and 2 do not apply. However, good practice still dictates that any socket outlet near a wash basin should be protected by a 30 mA RCD, and shaver supply units should comply with BS EN 61558-2-5. If the room has a shower cubicle — even a small one — then Section 701 applies in full and the zone system must be followed.',
  },
  {
    question: 'What IP rating is required in bathroom Zone 1?',
    answer:
      'Regulation 701.512.2 requires equipment installed in Zone 1 of a bathroom to have a minimum IP rating of IPX4 (protected against water splashing from any direction). Where equipment is exposed to water jets, for example for cleaning purposes, a minimum of IPX5 is required. In Zone 0 (inside the bath tub or shower basin), the minimum is IPX7 (protected against temporary immersion). In Zone 2, a minimum of IPX4 is required, although the requirement does not apply to shaver supply units complying with BS EN 61558-2-5 installed in Zone 2 where direct spray from showers is unlikely. These ratings ensure that electrical equipment can withstand the level of water exposure expected in each zone. The IP rating must be maintained after installation — which means junction boxes, cable entries, and enclosures must all achieve the required rating.',
  },
  {
    question: 'Is RCD protection mandatory in all special locations?',
    answer:
      'RCD requirements vary considerably by section, and assuming "30 mA everywhere" is a common mistake. In bathrooms (701.411.3.3), all low voltage circuits serving the location, and any passing through Zones 1 or 2, must have 30 mA RCD additional protection. In swimming pools (702.410.3.4.1), Zone 0 requires SELV not exceeding 12 V AC or 30 V DC and Zone 1 requires SELV not exceeding 25 V AC or 60 V DC — in those two zones SELV is the protective measure, not an RCD; only in Zone 2 is automatic disconnection with a 30 mA RCD offered as an alternative to SELV or electrical separation. On construction sites (704.410.3.10), circuits supplying socket-outlets or hand-held equipment up to 32 A may use reduced low voltage, automatic disconnection with a 30 mA RCD, electrical separation, or SELV/PELV — the 30 mA RCD is one of four options. In agricultural premises (705.411.1), every circuit needs an RCD, but only socket-outlet circuits up to 32 A need one at 30 mA: over 32 A the limit is 100 mA, and all other circuits 300 mA. In caravan parks (708) and marinas (709.531.2), each socket outlet must be individually protected by a 30 mA RCD. The common thread is that wherever the risk of electric shock is increased, an additional layer of protection is required on top of the general rules of Parts 1 to 6 — not that disconnection times get shorter.',
  },
  {
    question: 'What are the key requirements for solar PV installations under Section 712?',
    answer:
      'Section 712 covers safety requirements for the electrical installation of solar photovoltaic (PV) power supply systems. Key requirements include: equipment on the DC side must be treated as energised even when the AC side is disconnected or the inverter is disconnected from the DC side (712.410.101), and the DC side must use either double or reinforced insulation or extra-low voltage (712.410.102), with DC-side equipment up to the inverter connection being Class II or equivalent (712.412.101). Means of isolation and clear labelling must be provided: an instruction notice showing the presence of a PV system at the origin, the metering position and the board the inverter feeds (712.514.101), a notice at every point of access to DC live parts warning they may remain energised after isolation (712.514.102), and a notice on every inverter to isolate both AC and DC before servicing (712.514.103). String overcurrent protection is required only where an array has more than two strings in parallel and the condition in 712.431.101 is met — with one or two parallel strings none is needed; where it is required, both polarities must be protected using gPV fuses to BS EN 60269-6, fuse-combination units to BS EN 60947-3, or DC-rated circuit-breakers. DC cables must be single-core with a non-metallic sheath such as H1Z2Z2-K to BS EN 50618, or insulated conductors in individually insulated conduit or trunking, and must not be laid directly on the roof surface (712.521.101). An insulation monitoring device is required to verify the insulation status of the DC array (712.421.101.1). Where an RCD protects the PV AC supply circuit it must be Type B unless one of the exemptions in 712.531.3.5.1 applies. The inverter must also comply with the relevant grid connection engineering recommendation, G98 or G99.',
  },
  {
    question: 'How does Amendment 4 (A4:2026) affect special locations?',
    answer:
      'BS 7671:2018+A4:2026 was issued on 15 April 2026 and the previous version (A2:2022 + Corrigendum + A3:2024) is withdrawn on 15 October 2026. Within Part 7, the changes A4:2026 itself lists are a major revision of Section 710 (Medical locations), including requirements for independent supplies in group 2 medical locations and a schedule of test results for supplementary protective equipotential bonding conductor resistance, and an entirely new Section 716 covering Power over Ethernet — the distribution of ELV DC power over balanced information technology cabling. Two commonly misattributed regulations are older than A4:2026: Regulation 411.3.4, requiring 30 mA RCD additional protection for AC final circuits supplying luminaires within domestic (household) premises, came in with BS 7671:2018 itself, as did Regulation 421.1.7 on arc fault detection devices; 421.1.7 was then redrafted by Amendment 2:2022 into a requirement for single-phase AC final circuits supplying socket-outlets up to 32 A in high rise residential buildings, houses in multiple occupation, purpose-built student accommodation and care homes, with A4:2026 only rewording indent (a). Likewise, the extensive revision of Section 712 (Solar PV) was made by Amendment 2:2022, not A4:2026. Elec-Mate always references BS 7671:2018+A4:2026 including all amendments.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/swimming-pool-electrical-regulations',
    title: 'Swimming Pool Electrical Regulations',
    description:
      'Deep dive into Section 702 — zones, IP ratings, SELV requirements, and bonding for pools and hot tubs.',
    icon: Droplet,
    category: 'Guide',
  },
  {
    href: '/guides/garden-lighting-regulations',
    title: 'Garden Lighting Regulations',
    description:
      'IP ratings, SWA cable, RCD protection, and Part P notification for outdoor lighting installations.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete overview of the IET Wiring Regulations including structure, amendments, and key changes.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/residual-current-monitoring',
    title: 'Residual Current Monitoring',
    description:
      'RCM systems, Type A vs Type B monitoring, and how they apply in special locations and EV charging.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/eighteenth-edition-course',
    title: '18th Edition Course',
    description:
      'Study all Part 7 special locations with structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/building-regulations-electrical',
    title: 'Building Regulations Electrical',
    description:
      'Approved Document P — notifiable work, self-certification, and competent person schemes.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-part-7',
    heading: 'What Is Part 7 of BS 7671?',
    content: (
      <>
        <p>
          Part 7 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          contains supplementary regulations for special installations and locations. These are
          environments where the general rules of Parts 1 to 6 are not sufficient on their own
          because the risk of electric shock, fire, or thermal effects is increased beyond normal
          conditions.
        </p>
        <p>
          The fundamental principle is additive: the general requirements still apply in full, but
          Part 7 adds extra requirements or modifies certain general rules for the specific
          environment. Where a Part 7 regulation conflicts with a general regulation, the Part 7
          regulation takes precedence for that location.
        </p>
        <p>
          Part 7 of BS 7671:2018+A4:2026 contains twenty-one special location sections, numbered
          from Section 701 to Section 753: 701, 702, 703, 704, 705, 706, 708, 709, 710, 711, 712,
          714, 715, 716, 717, 721, 722, 729, 730, 740 and 753 (Section 700 is the general
          introduction to Part 7). Not all section numbers are used — the numbering follows the
          international standard IEC 60364-7 (for example, there is no Section 707). The most
          commonly encountered special locations in UK domestic and commercial work are bathrooms
          (701), swimming pools (702), construction sites (704), and solar PV installations (712),
          and those are the sections this guide covers in detail.
        </p>
        <p>
          Every electrician working in the UK must be familiar with Part 7. These sections are
          heavily tested in the{' '}
          <SEOInternalLink href="/eighteenth-edition-course">
            C&G 2382 (18th Edition)
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/inspection-testing-course">
            C&G 2391 (Inspection & Testing)
          </SEOInternalLink>{' '}
          exams, and failure to apply the correct special location regulations on site can result in
          a dangerous installation.
        </p>
      </>
    ),
  },
  {
    id: 'section-701-bathrooms',
    heading: 'Section 701 — Bathrooms and Shower Rooms',
    content: (
      <>
        <p>
          Section 701 is the most commonly encountered special location. It applies to any room
          containing a fixed bath or shower, including en-suites, wet rooms, and shower rooms. A
          room with only a wash basin does not fall under Section 701.
        </p>
        <p>
          The key concept is the zone system. Section 701 defines three zones around the bath or
          shower, each with specific requirements for equipment IP ratings, wiring methods, and
          permitted accessories:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong> — inside the bath tub or shower tray. Only SELV at a maximum
                of 12 V AC or 30 V DC is permitted. Equipment must be rated IPX7 (protected against
                temporary immersion). No switches, socket outlets, or junction boxes allowed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — above the bath or shower tray up to the highest fixed
                shower head or water outlet, or 2.25 m above finished floor level, whichever is
                higher. Equipment must be rated IPX4 minimum (IPX5 where equipment is exposed to
                water jets, for example for cleaning). Only SELV or equipment specifically designed
                for this zone.
                Current-using equipment rated minimum IPX4 is permitted (e.g., electric showers,
                instantaneous water heaters). No socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — extends 0.6 m horizontally from Zone 1 (and the area above
                Zone 1 is bounded vertically by the finished floor level and the horizontal plane at the highest fixed shower head or water outlet, or 2.25 m above finished floor level, whichever is higher). Equipment must be
                rated IPX4 minimum. Shaver supply units complying with BS EN 61558-2-5 are
                permitted. Luminaires, fans, and heating appliances rated IPX4 are permitted.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>Socket-outlet siting (Reg 701.512.3):</strong> Socket-outlets are prohibited
          within 2.50 m measured horizontally from the boundary of Zone 1. This is the regulation
          inspectors check when assessing socket positions in bathrooms. The only exceptions are
          SELV socket-outlets complying with Section 414 and shaver supply units complying with
          BS EN 61558-2-5.
        </p>
        <p>
          All circuits in a bathroom must be protected by a 30 mA RCD (Reg 701.411.3.3).
          Supplementary bonding (Reg 701.415.2) may be omitted only where the building has a
          protective equipotential bonding system in accordance with Regulation 411.3.1.2, all
          final circuits of the location meet the automatic disconnection requirements of
          Regulation 411.3.2, all final circuits have 30 mA RCD additional protection, and all
          extraneous-conductive-parts of the location are effectively connected to that bonding —
          in practice most modern installations meet these conditions, but the electrician must
          verify it.
        </p>
        <SEOInternalLink href="/consumer-unit-regulations">
          Consumer unit regulations
        </SEOInternalLink>{' '}
        require that bathroom circuits are typically on dedicated RCBOs or protected via an RCD
        incomer.
      </>
    ),
  },
  {
    id: 'section-702-swimming-pools',
    heading: 'Section 702 — Swimming Pools and Basins',
    content: (
      <>
        <p>
          Section 702 applies to swimming pools, paddling pools, hot tubs, and their surrounding
          areas. The hazard level is significantly higher than a bathroom because of the large
          volume of water, the extended body immersion, and the reduced skin resistance when wet.
        </p>
        <p>The zone system for swimming pools is more extensive than for bathrooms:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong> — the interior of the pool basin. Only SELV at a nominal
                voltage not exceeding 12 V AC RMS or 30 V ripple-free DC, with the safety source
                installed outside Zones 0, 1 and 2 (Reg 702.410.3.4.1). Equipment must be IPX8.
                Fixed equipment specifically designed for pool use only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — extends 2 m horizontally from the rim of the basin and up
                to 2.5 m above the floor or surface expected to be occupied by persons. Only SELV
                at a nominal voltage not exceeding 25 V AC RMS or 60 V ripple-free DC is permitted,
                with the safety source outside Zones 0, 1 and 2 (Reg 702.410.3.4.1) — note this is
                a higher limit than the 12 V / 30 V that applies in Zone 0. Equipment must be IPX4
                minimum (IPX5 where water jets are likely for cleaning). No socket-outlets and no
                switchgear or controlgear may be installed in Zone 0 or Zone 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — extends 1.5 m beyond Zone 1. Socket-outlets and switches
                are permitted only where the supply circuit is protected by SELV, by automatic
                disconnection with a 30 mA RCD, or by electrical separation (Reg 702.53). Minimum
                IP rating is IPX2 for indoor locations and IPX4 for outdoor locations, rising to
                IPX5 where water jets are likely for cleaning (Reg 702.512.2). There is no Zone 2
                for fountains.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Supplementary equipotential bonding is mandatory in swimming pool locations (Reg
          702.415.2). All extraneous-conductive-parts in Zones 0, 1 and 2 must be connected by
          supplementary protective bonding conductors to the protective conductors of the
          exposed-conductive-parts of equipment situated in those zones.
        </p>
        <p>
          For a detailed breakdown of{' '}
          <SEOInternalLink href="/guides/swimming-pool-electrical-regulations">
            swimming pool electrical regulations
          </SEOInternalLink>
          , including hot tubs, paddling pools, and fountain installations, see our dedicated guide.
        </p>
      </>
    ),
  },
  {
    id: 'section-703-saunas',
    heading: 'Section 703 — Saunas and Steam Rooms',
    content: (
      <>
        <p>
          Section 703 covers rooms and cabins containing sauna heaters. The primary hazard is
          extreme temperature combined with humidity, which increases the risk of insulation
          degradation and reduces the body's skin resistance.
        </p>
        <p>
          Section 703 defines three zones (Regs 703.32.1 to 703.32.3). Zone 1 is the volume
          containing the sauna heater, bounded by the floor, the cold side of the ceiling
          insulation and a vertical surface 0.5 m from the heater. Zone 2 is the volume outside
          Zone 1 from the floor up to 1.0 m above the floor. Zone 3 is the volume outside Zone 1
          above that 1.0 m plane, up to the cold side of the ceiling insulation — it is Zone 3 that
          carries the heat-resistance requirements, because the hottest air sits high in the cabin.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring must withstand the temperature</strong> — in Zone 3, equipment must
                withstand a minimum of 125 degrees C and cable insulation and sheaths a minimum of
                170 degrees C (Reg 703.512.2). In Zone 2 there is no special heat-resistance
                requirement. The wiring system should preferably be installed outside the zones,
                on the cold side of the thermal insulation; where it is on the warm side in Zone 1
                or Zone 3 it must be heat-resisting (Reg 703.52). Standard 70 degrees C
                thermoplastic cable is not suitable where the 170 degrees C requirement applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>No socket-outlets inside the sauna</strong> — socket-outlets shall not be
                installed within the location containing the sauna heater. Switchgear and
                controlgear forming part of the sauna heater equipment, or of other fixed equipment
                installed in Zone 2, may be inside the cabin in accordance with the manufacturer's
                instructions; all other switchgear and controlgear, for example for lighting, must
                be placed outside the sauna room or cabin (Reg 703.537.5). In Zone 1 only the sauna
                heater and equipment belonging to it may be installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaires must be positioned correctly</strong> — they cannot be installed
                in Zone 1, and must have an enclosure rated for the temperature at their installed
                height. Equipment in the sauna must be at least IPX4, or IPX5 where cleaning by
                water jets may reasonably be expected (Reg 703.512.2).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regulation 703.411.3.3 requires additional protection by a 30 mA RCD for all circuits of
          the sauna — but it expressly states that RCD protection need not be provided for the
          sauna heater itself unless the manufacturer recommends it. A dedicated circuit from the
          consumer unit, with an appropriate overcurrent device, is standard practice.
        </p>
      </>
    ),
  },
  {
    id: 'section-704-construction-sites',
    heading: 'Section 704 — Construction and Demolition Sites',
    content: (
      <>
        <p>
          Section 704 applies to temporary electrical installations on construction and demolition
          sites. These are high-risk environments: exposed wiring, water, mud, mechanical damage,
          and a transient workforce unfamiliar with the electrical layout.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuits supplying socket-outlets up to 32 A</strong> — and any other
                circuit supplying hand-held equipment up to 32 A — must be protected by one of four
                measures (Reg 704.410.3.10): reduced low voltage (Reg 411.8); automatic
                disconnection of supply with additional protection by a 30 mA RCD; electrical
                separation, each socket-outlet or item of hand-held equipment fed by its own
                transformer or separate winding; or SELV/PELV. A 30 mA RCD is one option, not the
                only one — a 110 V reduced low voltage outlet satisfies the regulation in its own
                right and does not additionally require a 30 mA RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>110 V centre-tapped earth (CTE)</strong> is strongly preferred for portable
                handlamps, portable hand tools and local lighting up to 2 kW on UK construction
                sites. Reduced low voltage does not exceed 110 V AC between lines, giving 55 V to
                the earthed midpoint single-phase (63.5 V to the earthed neutral three-phase) —
                Reg 411.8.1.2. This is provided via a 230/110 V site transformer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution assemblies</strong> — all assemblies for the distribution of
                electricity on construction and demolition sites must comply with BS EN 61439-4
                (Reg 704.511.1). Plugs and socket-outlets rated 16 A to 125 A must comply with
                BS EN IEC 60309-2. Cables should not be run across site roads or walkways; where
                that is unavoidable, adequate protection against mechanical damage and contact with
                plant must be provided, and flexible cables subject to movement must be H07RN-F to
                BS EN 50525-2-21 or equivalent (Regs 704.522.8.11 and 704.522.8.101).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular inspection and testing</strong> is required throughout the duration
                of the construction project. The frequency must be appropriate to the risks and
                conditions on site; this is normally specified by the principal contractor.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on construction sites should also be familiar with the{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">
            safe isolation procedure
          </SEOInternalLink>{' '}
          (GS38) and the requirements of CDM Regulations 2015 for temporary electrical
          installations.
        </p>
      </>
    ),
  },
  {
    id: 'section-705-agricultural',
    heading: 'Section 705 — Agricultural and Horticultural Premises',
    content: (
      <>
        <p>
          Section 705 covers electrical installations in agricultural and horticultural premises
          including farms, barns, greenhouses, and livestock buildings. These environments present
          unique hazards: livestock have a lower body resistance than humans, moisture and corrosive
          atmospheres are common, and there is a high risk of mechanical damage from farm machinery
          and animals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tractor className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection on every circuit</strong> — Regulation 705.411.1 requires,
                whatever the earthing system: a 30 mA RCD on final circuits supplying socket-outlets
                rated up to 32 A; an RCD not exceeding 100 mA on final circuits supplying
                socket-outlets rated over 32 A; and an RCD not exceeding 300 mA on all other
                circuits. Every circuit needs an RCD, but only the smaller socket-outlet circuits
                need one at 30 mA. This is more stringent than general domestic requirements
                because livestock can be killed by fault currents that would not harm a human.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tractor className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary equipotential bonding</strong> is required in locations
                accessible to livestock. This includes bonding of metallic stalls, feeding troughs,
                water pipes, and any other extraneous conductive parts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tractor className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable protection</strong> — cables must be protected against mechanical
                damage from livestock and farm equipment. SWA or conduit is typically required.
                Cables must be installed at a height that prevents contact by animals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tractor className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>PEN conductor prohibition (Reg 705.411.4)</strong> — a PEN conductor shall
                not be used within agricultural or horticultural premises. Note 1 clarifies that
                this does not preclude a TN-C-S (PME) supply intake, but Note 2 advises against
                using PME as the installation earth where no metal floor grid is present.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Farm installations are often old and have been modified multiple times over decades. EICR
          inspections on agricultural premises require careful attention to the age and condition of
          the installation, the presence of corrosive atmospheres (e.g., silage storage, fertiliser
          stores), and the routing of cables through areas accessible to animals.
        </p>
      </>
    ),
  },
  {
    id: 'section-706-restrictive',
    heading: 'Section 706 — Restrictive Conductive Locations',
    content: (
      <>
        <p>
          Section 706 covers locations where a person is in contact with earthed metalwork and where
          movement is restricted — for example, inside a metal tank, boiler, or duct. The body is in
          intimate contact with conductive surfaces, and escape from an electric shock is difficult.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mobile equipment: SELV or electrical separation only.</strong> Regulation
                706.410.3.3 permits just two protective measures for the supply to mobile equipment
                — SELV (Section 414), or electrical separation (Section 413) supplying only one item
                of current-using equipment. The safety source or isolating transformer must be
                located outside the restrictive conductive location (Reg 706.414.3.101).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed equipment has five options.</strong> Regulation 706.410.3.3 permits,
                for the supply to fixed equipment: automatic disconnection of supply together with
                supplementary equipotential bonding; SELV; PELV with equipotential bonding between
                all exposed- and extraneous-conductive-parts and the PELV system earthed;
                electrical separation supplying only one item of current-using equipment; or double
                or reinforced insulation together with additional protection by a 30 mA RCD. The
                30 mA RCD is tied to the double-insulation option — it is not a blanket condition on
                automatic disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary protective equipotential bonding is mandatory</strong> in
                accordance with Regulation 415.2 (Reg 706.411.3.1.101), and where functional
                earthing is required it must also connect the functional earthing terminals. Note
                that 110 V reduced low voltage is <em>not</em> one of the protective measures
                Section 706 permits for hand-held or mobile equipment — battery tools, SELV, or an
                individually separated supply are the compliant options.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This section is less commonly encountered in domestic work but is critical for industrial
          electricians working on tanks, vessels, and large metallic enclosures.
        </p>
      </>
    ),
  },
  {
    id: 'section-708-caravan-parks',
    heading: 'Section 708 — Caravan and Camping Parks',
    content: (
      <>
        <p>
          Section 708 covers the electrical installation in caravan parks and similar sites where
          caravans, motor homes, or tents are connected to the site supply. The primary hazards are
          exposure to weather, temporary connections made by non-qualified users, and the fact that
          caravans are conductive metal shells.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Each pitch supply point</strong> must have a socket-outlet complying with
                BS EN IEC 60309-2 (the blue CEE connector) rated not less than 16 A and meeting at
                least IP44 (Regs 708.55.1.5 and 708.553.1.8), individually protected by a 30 mA RCD.
                Each socket-outlet must also have its own overcurrent protective device (Reg
                708.533), and no more than four socket-outlets may be grouped in one enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>The supply point must be located</strong> adjacent to the pitch and not more
                than 20 m from the connection facility on the caravan or tent when on its pitch
                (Reg 708.55.1.2). The lowest part of any socket-outlet must sit between 0.5 m and
                1.5 m above the ground (Reg 708.55.1.6) — the 1.5 m maximum may be exceeded only in
                extreme environmental conditions such as flood or heavy snow risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cables</strong> — underground distribution is the preferred
                method of supply. Unless provided with additional mechanical protection, a buried
                distribution circuit must be at a sufficient depth to avoid damage from tent pegs,
                ground anchors and vehicle movement; BS 7671 notes 0.6 m as the depth generally
                considered a minimum (Reg 708.521.7.2). Alternatively the cable may be routed
                outside the pitch. Overhead conductors must be insulated and at least 6 m above
                ground where vehicles move, 3.5 m elsewhere.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME must not earth the pitch</strong> — socket-outlet protective conductors
                shall not be connected to a PME earthing facility (Reg 708.553.1.14), because of the
                risk from a broken PEN conductor. In practice a local earth electrode (a TT
                arrangement) is provided for the pitch supplies. This does not prevent a PME
                earthing facility being used for permanent buildings on the site.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Caravan park installations must be inspected and tested at intervals not exceeding 1 year.
          The EICR should note the earthing arrangement at each pitch and confirm RCD operation for
          every socket outlet.
        </p>
      </>
    ),
  },
  {
    id: 'section-709-marinas',
    heading: 'Section 709 — Marinas and Boat Moorings',
    content: (
      <>
        <p>
          Section 709 covers electrical installations in marinas and similar locations providing
          shore-side electrical supplies to boats. The combination of water, salt, and conductive
          hulls creates an extremely high-risk environment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Each berth supply point</strong> must be individually protected by a 30 mA
                RCD that disconnects all live conductors including the neutral (Reg 709.531.2) and
                have its own overcurrent device (Reg 709.533). Socket-outlets must comply with BS EN
                IEC 60309-2 up to 63 A and BS EN IEC 60309-1 above 63 A, and one socket-outlet may
                supply only one craft.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME must not reach the boat.</strong> The Electricity Safety, Quality and
                Continuity Regulations prohibit connecting a PME earthing facility to any metalwork
                in a boat (Reg 709.411.4), and socket-outlet protective conductors must not be
                connected to a PME earthing facility (Reg 709.553.1.14) — so a local earth electrode
                (TT) arrangement is used for the berth supplies. It does not preclude PME being used
                as the means of earthing for permanent buildings on the marina.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlets</strong> must meet at least IP44, or IPX5 / IPX6 where water
                jets (AD5) or waves (AD6) apply, and be located as close as practicable to the berth
                served (Regs 709.553.1.8 and 709.553.1.9). They must be at least 1 m above the
                highest water level, reducible to 300 mm on floating pontoons or walkways with
                additional measures against splashing. No more than four may be grouped in one
                enclosure. Feeder pillars must be positioned to avoid mechanical damage (AG2).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Marina installations are inspected at intervals not exceeding 1 year. The corrosive marine
          environment means equipment deterioration is faster than in standard installations — IP
          ratings and cable gland integrity must be checked carefully during each inspection.
        </p>
      </>
    ),
  },
  {
    id: 'section-711-exhibitions',
    heading: 'Section 711 — Exhibitions, Shows, and Stands',
    content: (
      <>
        <p>
          Section 711 covers temporary electrical installations at exhibitions, shows, and similar
          events. The hazards include rapid assembly and dismantling by non-specialists, the use of
          temporary wiring, high public footfall, and the mix of fixed and portable equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit protection (Reg 711.410.3.101)</strong> — all final circuits for
                lighting, and all final circuits rated up to 32 A supplying socket-outlets or
                handheld equipment, shall use one of: automatic disconnection of supply (ADS) with
                additional protection by an RCD with a rated residual operating current not
                exceeding 30 mA; SELV or PELV; or electrical separation, where each socket-outlet
                and item of hand-held equipment is fed by an individual isolating transformer or a
                separate winding. Safety services circuits are excluded from this requirement.
                Separately, a cable supplying temporary structures must be protected at its origin
                by a time-delayed or Type S RCD not exceeding 300 mA (Reg 711.410.3.4).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables must be routed to avoid trip hazards</strong> and mechanical damage.
                Where cables cross walkways, cable ramps or overhead routing must be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>An inspection and test must be carried out</strong> on site in accordance
                with Chapter 64 after each assembly on site (Reg 711.6). The results must be
                recorded and available on site.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Exhibition installations are dismantled after each event, so durability is less of a
          concern than safety during assembly and the event itself. Electricians involved in
          exhibition work need to be comfortable with rapid installation and testing to tight
          deadlines.
        </p>
      </>
    ),
  },
  {
    id: 'section-712-solar-pv',
    heading: 'Section 712 — Solar PV Systems',
    content: (
      <>
        <p>
          Section 712 covers the electrical installation of solar photovoltaic (PV) power supply
          systems. With the growth of domestic and commercial solar installations across the UK,
          this section has become one of the most important in Part 7.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC isolation</strong> — a DC isolator must be installed between the PV array
                and the inverter, accessible for maintenance and clearly labelled. The isolator must
                be rated for the maximum DC voltage and current of the array.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning labels</strong> — an instruction notice indicating the presence of a
                PV system must be fixed at the origin of the installation, at the metering position
                if remote from the origin, and at the consumer unit or distribution board the
                inverter feeds (Reg 712.514.101). Every point of access to DC live parts needs a
                notice warning that live parts may remain energised after isolation (Reg
                712.514.102), and every inverter needs one worded to the effect of &lsquo;Isolate
                both AC and DC sides before servicing&rsquo; (Reg 712.514.103).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection and protection</strong> — equipment on the DC side up to the
                inverter's DC connection means must be Class II or equivalent insulation (Reg
                712.412.101). DC cables must be either single-core cables with a non-metallic
                sheath, for example H1Z2Z2-K to BS EN 50618, or insulated single-core conductors in
                individually insulated conduit or trunking, and must not be laid directly on the
                roof surface (Reg 712.521.101). For cables heated directly by the underside of the
                modules, the ambient temperature must be taken as at least 70 degrees C (Reg
                712.523.101).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>String protection</strong> — string overcurrent protection is only required
                in an array with <em>more than two</em> strings in parallel, and then only where the
                condition in Regulation 712.431.101 is met. With one or two strings in parallel no
                overcurrent protective device is required. Where devices are needed, both polarities
                must be protected and they must be gPV fuses to BS EN 60269-6, fuse-combination
                units to BS EN 60947-3, or DC-rated circuit-breakers (Regs 712.432.101 and
                712.533.101). The purpose is to limit reverse current flowing from the healthy
                strings into a faulted string.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid connection</strong> — the inverter must comply with G98 (up to 16 A per
                phase) or G99 (larger installations) for connection to the distribution network.
                Anti-islanding protection must be built into the inverter to disconnect
                automatically if the mains supply fails.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The technical content of Section 712 was extensively revised and expanded by Amendment
          2:2022, which also widened its scope to cover PV installations that are off-grid, in
          parallel with the public distribution system, or an alternative to it. That revised text
          is carried into BS 7671:2018+A4:2026, which also deleted Regulations 712.443 and
          712.551.7.2. Electricians installing or inspecting PV systems must work from
          BS 7671:2018+A4:2026 — earlier editions do not reflect the current requirements.
        </p>
        <SEOAppBridge
          title="Special Locations BS 7671:2018+A4:2026"
          description="Special Locations guidance for BS 7671:2018+A4:2026. Section 701–753 rules for bathrooms, saunas, pools, hazardous areas. Instant lookup, no guesswork."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Mastering Part 7 Special Locations',
    content: (
      <>
        <p>
          Part 7 is one of the most examination-heavy areas of BS 7671. Whether you are studying for
          the <SEOInternalLink href="/eighteenth-edition-course">18th Edition exam</SEOInternalLink>{' '}
          or preparing for the{' '}
          <SEOInternalLink href="/inspection-testing-course">
            C&G 2391 inspection and testing qualification
          </SEOInternalLink>
          , you need to know the zone dimensions, IP ratings, disconnection times, and permitted
          equipment for every special location.
        </p>
        <p>
          On site, the challenge is applying the regulations correctly. Is that shower room a
          Section 701 location or not? Does the hot tub in the garden fall under 702? What earthing
          arrangement does the caravan park need? These are real questions that come up on real jobs
          — and getting them wrong can create a dangerous installation or a failed EICR.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Regulations Lookup</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask Elec-Mate any question about Part 7 and get the exact regulation number,
                  requirement, and practical guidance. "What IP rating is needed in bathroom Zone
                  1?" — answered in seconds, with the regulation reference.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Structured Training Courses</h4>
                <p className="text-white text-sm leading-relaxed">
                  Elec-Mate includes 50+ structured training modules covering every Part 7 special
                  location. Each module breaks down the regulations into clear, exam-focused content
                  with practice questions. Study on your phone between jobs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Electrical Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Need to size a cable for an outdoor circuit, calculate maximum Zs for a bathroom
                  circuit, or work out{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop
                  </SEOInternalLink>{' '}
                  for a long SWA run to a caravan park feeder pillar? Elec-Mate calculators handle
                  it all.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Master Part 7 with Elec-Mate"
          description="AI regulations lookup, 50+ training courses, and professional calculators — all built for UK electricians."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SpecialLocationsPart7Page() {
  return (
    <GuideTemplate
      title="BS 7671 Special Locations: Part 7, 701-753"
      description="Part 7 special locations list, 701 to 753: 701 bathrooms, 702 pools, 703 saunas, 704 sites, 705 agricultural, 708 caravans, 709 marinas, 712 solar PV."
      datePublished="2025-03-15"
      dateModified="2026-08-06"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Special Locations Part 7:{' '}
          <span className="text-yellow-400">Every Section Explained for UK Electricians</span>
        </>
      }
      heroSubtitle="Part 7 of BS 7671:2018+A4:2026 contains supplementary regulations for locations where the risk of electric shock is increased. Bathrooms, swimming pools, saunas, construction sites, agricultural premises, caravan parks, marinas, exhibitions, and solar PV installations all have specific requirements. This guide covers every section."
      readingTime={12}
      answerBox={{
        question: 'What is Part 7 of BS 7671?',
        answer:
          'Part 7 of BS 7671 contains supplementary and amended regulations for special installations and locations where the risk of electric shock is increased. It runs from Section 701 to Section 753 and covers bathrooms (701), swimming pools (702), saunas (703), construction sites (704), agricultural premises (705), conducting locations with restricted movement (706), caravan parks (708), marinas (709), medical locations (710), exhibitions (711), solar PV (712), outdoor lighting (714), ELV lighting (715), Power over Ethernet (716), mobile units (717), caravans (721), EV charging (722), gangways (729), shore connections for inland navigation vessels (730), fairgrounds and amusement devices (740), and heating cables (753). Each section defines specific zones, IP ratings, equipment restrictions, and protective measures for that environment.',
        detail:
          'Bathrooms (701) and swimming pools (702) are the most common special locations in domestic work; Section 712 covers solar PV DC isolation, string protection, and fire safety.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Part 7 Special Locations"
      relatedPages={relatedPages}
      ctaHeading="Look Up Any Regulation Instantly"
      ctaSubheading="Elec-Mate AI regulations lookup covers every Part 7 special location — zones, IP ratings, disconnection times, and equipment restrictions. Ask a question, get the regulation. 7-day free trial."
    />
  );
}
