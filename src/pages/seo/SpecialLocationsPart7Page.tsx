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
  'Each section (701 to 712) defines specific zones, IP ratings, equipment restrictions, and protective measures tailored to the hazards of that environment.',
  'Bathrooms (701) and swimming pools (702) are the most commonly encountered special locations in domestic work — every electrician must know these inside out.',
  'Solar PV installations (712) have grown rapidly and Section 712 covers DC isolation, string protection, and fire safety requirements.',
  'Elec-Mate provides instant AI lookup of every Part 7 regulation, plus structured training courses covering all special locations for 18th Edition and 2391 exam preparation.',
];

const faqs = [
  {
    question: 'What is a special location under BS 7671?',
    answer:
      'A special location is any installation or location where the risk of electric shock is increased compared with a standard domestic or commercial environment. Part 7 of BS 7671:2018+A3:2024 identifies these locations and provides supplementary or amended regulations that apply in addition to the general requirements of Parts 1 to 6. The increased risk may be due to the presence of water (bathrooms, swimming pools), reduced body resistance (saunas), restricted movement (confined spaces), environmental conditions (construction sites, agricultural premises), or the temporary nature of the installation (exhibitions, shows). The electrician must apply the general requirements of BS 7671 first, then apply the additional Part 7 requirements on top. Where a Part 7 regulation contradicts a general regulation, the Part 7 regulation takes precedence for that location.',
  },
  {
    question: 'Do bathroom regulations apply to a downstairs cloakroom with just a basin?',
    answer:
      'Section 701 applies to locations containing a bath or shower. A room containing only a wash basin (no bath or shower) is not a bathroom under Section 701, so the supplementary regulations for zones 0, 1, and 2 do not apply. However, good practice still dictates that any socket outlet near a wash basin should be protected by a 30 mA RCD, and shaver supply units should comply with BS EN 61558-2-5. If the room has a shower cubicle — even a small one — then Section 701 applies in full and the zone system must be followed.',
  },
  {
    question: 'What IP rating is required in bathroom Zone 1?',
    answer:
      'Equipment installed in Zone 1 of a bathroom must have a minimum IP rating of IPX4 (protected against water splashing from any direction). If the bathroom is used for commercial or public purposes where water jets may be used for cleaning, a minimum of IPX5 is required. In Zone 0 (inside the bath or shower tray), the minimum is IPX7 (protected against temporary immersion). In Zone 2, a minimum of IPX4 is required. These ratings ensure that electrical equipment can withstand the level of water exposure expected in each zone. The IP rating must be maintained after installation — which means junction boxes, cable entries, and enclosures must all achieve the required rating.',
  },
  {
    question: 'Is RCD protection mandatory in all special locations?',
    answer:
      'RCD protection is mandatory in most special locations, but the specific requirements vary by section. In bathrooms (701), all circuits must be protected by a 30 mA RCD. In swimming pools (702), SELV at 12 V AC or 30 V DC is required in Zone 0, and 30 mA RCD protection is required for circuits in Zones 1 and 2. On construction sites (704), all socket outlets up to 32 A must be protected by a 30 mA RCD. In agricultural premises (705), 30 mA RCD protection is required for all circuits. In caravan parks (708) and marinas (709), each socket outlet must be individually protected by a 30 mA RCD. The common thread is that wherever the risk of electric shock is increased, additional discrimination and faster disconnection times apply.',
  },
  {
    question: 'What are the key requirements for solar PV installations under Section 712?',
    answer:
      'Section 712 covers safety requirements for the electrical installation of solar photovoltaic (PV) power supply systems. Key requirements include: DC isolator switches must be installed between the PV array and the inverter, accessible and clearly labelled. String overcurrent protection must be provided where multiple strings are connected in parallel. The installation must include warning labels at the consumer unit, meter position, and inverter location indicating the presence of a dual supply. All DC cables must be adequately protected against mechanical damage and be of the double-insulated type. Fire safety considerations require that PV cables on or within a building use cables with reduced fire propagation. Earthing and bonding of the PV array frame must comply with the general requirements and any manufacturer instructions. The inverter must disconnect automatically if the mains supply fails (G98/G99 compliance).',
  },
  {
    question: 'How does Amendment 3 (A3:2024) affect special locations?',
    answer:
      'Amendment 3 to BS 7671:2018 (published 31 July 2024) primarily introduces Regulation 530.3.201, which addresses bidirectional and unidirectional protective devices. While A3:2024 does not make sweeping changes to Part 7 itself, it affects special locations indirectly. For solar PV installations (712), the clarification around bidirectional devices is particularly relevant because PV systems export power back through the consumer unit. Electricians working on special locations should ensure they have access to the full text of BS 7671:2018+A2:2022+A3:2024 and are aware of the new regulation. Elec-Mate AI regulations lookup always references the latest edition including all amendments.',
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
    href: '/training/18th-edition',
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
            BS 7671:2018+A3:2024
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
          Part 7 currently covers twelve special locations, numbered from Section 701 to Section
          753. Not all section numbers are used — the numbering follows the international standard
          IEC 60364-7. The most commonly encountered special locations in UK domestic and commercial
          work are bathrooms (701), swimming pools (702), construction sites (704), and solar PV
          installations (712).
        </p>
        <p>
          Every electrician working in the UK must be familiar with Part 7. These sections are
          heavily tested in the{' '}
          <SEOInternalLink href="/training/18th-edition">C&G 2382 (18th Edition)</SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
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
                <strong>Zone 1</strong> — above the bath or shower tray up to 2.25 m from the
                finished floor level. Equipment must be rated IPX4 minimum (IPX5 if water jets are
                used for cleaning). Only SELV or equipment specifically designed for this zone.
                Current-using equipment rated minimum IPX4 is permitted (e.g., electric showers,
                instantaneous water heaters). No socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — extends 0.6 m horizontally from Zone 1 (and the area above
                Zone 1 up to 3 m from the floor if the ceiling is above 2.25 m). Equipment must be
                rated IPX4 minimum. Shaver supply units complying with BS EN 61558-2-5 are
                permitted. Luminaires, fans, and heating appliances rated IPX4 are permitted.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All circuits in a bathroom must be protected by a 30 mA RCD. Supplementary bonding is
          required unless all circuits are RCD-protected and the main protective bonding complies
          with the requirements of Regulation 411.3.1.2 — in practice, most modern installations
          meet this condition, but the electrician must verify it.
        </p>
        <SEOInternalLink href="/guides/consumer-unit-regulations-uk">
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
                <strong>Zone 0</strong> — the interior of the pool basin. Only SELV at 12 V AC or 30
                V DC with the safety source outside Zones 0 and 1. Equipment must be IPX8. Fixed
                equipment specifically designed for pool use only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — extends 2 m horizontally from the pool edge and up to 2.5
                m above the floor or any accessible surface. SELV at 12 V AC or 30 V DC only.
                Equipment must be IPX4 minimum (IPX5 where water jets are used). No socket outlets
                or switches other than SELV circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — extends 1.5 m beyond Zone 1. Socket outlets permitted only
                if protected by a 30 mA RCD or supplied by SELV or by electrical separation.
                Equipment must be IPX4 minimum.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Supplementary equipotential bonding is mandatory in swimming pool locations. All
          extraneous conductive parts within Zones 0, 1, and 2 must be connected together and to the
          protective conductor of every circuit serving the location.
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
          Saunas use a temperature-based zone system rather than a distance-based one. The room is
          divided into zones based on the height from the floor, with the highest temperatures at
          ceiling level near the heater.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring must withstand the temperature</strong> — cables within the sauna
                must be heat-resistant, rated for at least 170 degrees C (e.g., silicone rubber
                insulated cable or equivalent). Standard PVC-insulated cables are not suitable as
                they are rated to only 70 degrees C.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>No socket outlets or switches inside the sauna</strong> — the only equipment
                permitted is the sauna heater and luminaires specifically designed for sauna use.
                Controls must be located outside the sauna room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaires must be positioned correctly</strong> — they should not be
                mounted above the heater and must have an enclosure rated for the temperature at
                their installed height.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The sauna heater circuit must be protected by an appropriate overcurrent device and a 30
          mA RCD. A dedicated circuit from the consumer unit is standard practice.
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
                <strong>All socket outlets rated up to 32 A</strong> must be protected by a 30 mA
                RCD. This includes 110 V reduced voltage outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>110 V centre-tapped earth (CTE)</strong> is the preferred supply for
                portable tools on UK construction sites, giving a maximum of 55 V to earth. This is
                provided via a 230/110 V site transformer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution assemblies</strong> must comply with BS EN 61439-4 and be rated
                at least IP44. Cables must be armoured or otherwise mechanically protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular inspection and testing</strong> is required — BS 7671 recommends a
                maximum interval of 3 months for construction site installations.
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
                <strong>30 mA RCD protection on all circuits</strong> — not just socket outlets.
                This is more stringent than general domestic requirements because livestock can be
                killed by fault currents that would not harm a human.
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
                <strong>Disconnection times</strong> — Regulation 705.411.1 requires a disconnection
                time of 0.2 s for TN systems (compared with 0.4 s in general domestic installations)
                because of the lower body impedance of livestock.
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
                <strong>SELV or PELV is the preferred method of protection.</strong> The safety
                source (transformer) must be located outside the restrictive conductive location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>If SELV or PELV is not practicable,</strong> automatic disconnection of
                supply with supplementary equipotential bonding is permitted, provided the circuit
                is protected by a 30 mA RCD. The RCD must be located outside the restrictive
                location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>A competent person must supervise</strong> any work involving mains voltage
                equipment inside a restrictive conductive location. Portable tools must be 110 V CTE
                or battery-powered.
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
                <strong>Each pitch supply point</strong> must have a socket outlet complying with BS
                EN 60309-2 (the blue 16 A CEE connector), individually protected by a 30 mA RCD.
                Each socket outlet must also have its own overcurrent protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>The supply point must be located</strong> between 0.5 m and 1.5 m above
                ground level and within 20 m of the pitch it serves. It must be accessible without
                crossing another pitch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground cables</strong> must be buried at a minimum depth of 0.6 m and
                protected by route markers or cable covers. SWA cable is standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tent className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing (TN-C-S) must not be used</strong> to supply caravan pitches
                because of the risk of a broken PEN conductor. A TT earthing system or a separate
                earth electrode is required.
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
                RCD and have its own overcurrent device. Socket outlets must comply with BS EN
                60309-2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing must not be used.</strong> A TT earthing system is required
                because of the risk of electrochemical corrosion and the danger of a broken PEN
                conductor in a water environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution equipment</strong> must be rated at least IP44 and located as
                close to the berths as practicable. Feeder pillars must be securely fixed and
                positioned to avoid mechanical damage from mooring ropes and boat movements.
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
                <strong>All circuits must be protected by a 30 mA RCD.</strong> Where automatic
                disconnection is used as the protective measure, the maximum disconnection time for
                TN systems is 0.2 s.
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
                <strong>An inspection and test must be carried out</strong> after assembly and
                before the event opens to the public. The results must be recorded and available on
                site.
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
                <strong>Warning labels</strong> — labels must be displayed at the consumer unit,
                meter position, and inverter location indicating the presence of a PV system and
                dual supply. This is critical for firefighter safety and for any electrician working
                on the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection and protection</strong> — DC cables must be double-insulated
                and protected against mechanical damage. Where cables are installed on or within a
                building, they must have reduced fire propagation characteristics. Cable sizing must
                account for the temperature conditions on the roof.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>String protection</strong> — where multiple strings are connected in
                parallel, string overcurrent protection (fuses or MCBs) must be provided. This
                prevents reverse current flowing from one string into a faulted string.
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
          Amendment 3 (A3:2024) introduces Regulation 530.3.201 regarding bidirectional protective
          devices, which is directly relevant to PV installations where power flows both into and
          out of the consumer unit. Electricians installing or inspecting PV systems must be aware
          of this new regulation.
        </p>
        <SEOAppBridge
          title="Look up any PV regulation instantly"
          description="Elec-Mate AI regulations lookup covers every Section 712 regulation, every amendment, and every guidance note. Type your question and get the exact regulation number, requirement, and practical guidance — on site, in seconds."
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
          the <SEOInternalLink href="/training/18th-edition">18th Edition exam</SEOInternalLink> or
          preparing for the{' '}
          <SEOInternalLink href="/training/inspection-and-testing">
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
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
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
                  <SEOInternalLink href="/guides/voltage-drop-calculator-bs-7671">
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
          description="AI regulations lookup, 50+ training courses, and professional calculators — all built for UK electricians. Study for exams, look up regs on site, and complete certificates faster. 7-day free trial."
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
      title="Special Locations Part 7 BS 7671 | Complete Guide"
      description="Complete guide to Part 7 of BS 7671 — special locations including bathrooms (701), swimming pools (702), saunas (703), construction sites (704), agricultural premises (705), restrictive locations (706), caravan parks (708), marinas (709), exhibitions (711), and solar PV (712)."
      datePublished="2025-03-15"
      dateModified="2026-02-13"
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
      heroSubtitle="Part 7 of BS 7671:2018+A3:2024 contains supplementary regulations for locations where the risk of electric shock is increased. Bathrooms, swimming pools, saunas, construction sites, agricultural premises, caravan parks, marinas, exhibitions, and solar PV installations all have specific requirements. This guide covers every section."
      readingTime={12}
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
