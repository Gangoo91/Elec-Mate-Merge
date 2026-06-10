import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ClipboardCheck,
  Building2,
  Settings,
  Plug,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Installations', href: '/guides/specialist-electrical' },
  { label: 'Agricultural Electrical Installation', href: '/agricultural-electrical-installation' },
];

const tocItems = [
  { id: 'bs7671-section-705', label: 'BS 7671 Section 705' },
  { id: 'livestock-buildings', label: 'Livestock Building Requirements' },
  { id: 'ip-ratings', label: 'IP Ratings for Agricultural Use' },
  { id: 'rcd-requirements', label: 'RCD Requirements' },
  { id: 'damp-wet-environments', label: 'Damp & Wet Environments' },
  { id: 'lightning-protection', label: 'Lightning Protection Considerations' },
  { id: 'earthing', label: 'Earthing on Agricultural Sites' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671:2018+A4:2026 Section 705 — Agricultural and Horticultural Premises — covers all fixed electrical installations in farm buildings, outbuildings, livestock housing, and horticultural facilities across the UK.',
  'In locations intended for livestock, electrical equipment shall generally be inaccessible to animals (Regulation 705.513.2). Where equipment is unavoidably accessible — such as feeding or watering equipment — it must be adequately constructed and installed to withstand livestock contact and prevent injury.',
  'The damp and corrosive environment of farm buildings requires IP44 as the absolute minimum for all electrical equipment. IP54 or IP65 is strongly recommended for most agricultural applications.',
  'RCD protection is tiered under Regulation 705.411.1: socket outlet circuits rated ≤32 A must have an RCD per Regulation 415.1.1 (not exceeding 30 mA); circuits supplying socket outlets rated >32 A require an RCD with rated residual operating current not exceeding 100 mA; all other circuits require ≤300 mA. Section 705 imposes additional RCD requirements for fixed equipment in livestock buildings.',
  'Lightning protection is a significant consideration for isolated farm buildings and tall agricultural structures such as grain silos and barns. A risk assessment under BS EN 62305 should be carried out before installing electrical equipment in structures at risk.',
  'The recommended periodic inspection interval for agricultural installations is 3 years or annually following a change of tenancy (IET Guidance Note 3), reflecting the harsh operating environment.',
  'Regulation 705.411.4 prohibits the use of a PEN conductor within electrical installations of agricultural and horticultural premises. Additionally, the use of a PME (TN-C-S) earthing facility is not recommended in livestock buildings unless a metal grid is laid in the floor (Reg 705.411.4, NOTE 2).',
  'Electric fence installations fall outside the scope of Section 705 and must comply with BS EN 60335-2-76 instead (Reg 705.1 NOTE).',
];

const faqs = [
  {
    question: 'Which BS 7671 section covers agricultural electrical installations?',
    answer:
      'Section 705 of BS 7671:2018+A4:2026 (Part 7 — Special Installations or Locations) covers electrical installations in agricultural and horticultural premises. It applies to farms, market gardens, equestrian facilities, poultry units, pig units, and any other premises used for agricultural or horticultural purposes. Section 705 modifies and supplements the general requirements of BS 7671 to address the specific hazards of the agricultural environment.',
  },
  {
    question: 'Why is metalwork a problem in livestock buildings?',
    answer:
      'Livestock — particularly cattle and horses — are much more sensitive to electric shock than humans because they make simultaneous contact with the ground with four hooves over a large area, and their heart-to-forelimb path is particularly vulnerable to ventricular fibrillation. Touch voltages that would be tolerable to a person can be lethal to cattle. Regulation 705.513.2 therefore requires that electrical equipment in livestock buildings shall generally be inaccessible to animals. Where items such as feeding or watering equipment are unavoidably accessible, they must be adequately constructed and installed. All wiring in livestock areas must be contained in inaccessible conduit or routed out of reach.',
  },
  {
    question: 'What IP rating is required for agricultural electrical equipment?',
    answer:
      'BS 7671 Section 705 requires electrical equipment in agricultural premises to have a minimum IP rating appropriate to the environment. In practice, IP44 is the absolute minimum — protecting against solid objects greater than 1 mm and water splashing from any direction. In areas subject to hosing down (dairy parlours, poultry units, pig units), IP55 or IP65 is required. Outdoor equipment must also have UV-resistant enclosures. Never use domestic-grade equipment (rated only for indoor, dry conditions) in agricultural buildings.',
  },
  {
    question: 'What RCD protection is required in farm buildings?',
    answer:
      'Regulation 705.411.1 sets three tiers of RCD protection. (a) Final circuits supplying socket outlets rated ≤32 A: RCD with characteristics per Regulation 415.1.1 — in practice not exceeding 30 mA. (b) Final circuits supplying socket outlets rated >32 A: RCD with rated residual operating current not exceeding 100 mA. (c) All other circuits (including fixed equipment in livestock buildings): RCD with rated residual operating current not exceeding 300 mA. The 30 mA threshold therefore applies specifically to ≤32 A socket outlet circuits; larger socket outlet circuits may use up to 100 mA, and fixed equipment circuits up to 300 mA.',
  },
  {
    question: 'Do I need lightning protection on farm buildings?',
    answer:
      'Farm buildings and agricultural structures are at elevated risk from lightning strikes due to their isolated rural locations, height (tall grain stores, silos, and hay barns), and the large areas of metal roofing common in modern agricultural buildings. A formal lightning protection risk assessment under BS EN 62305-2 determines whether a lightning protection system is required. Where a lightning protection system is installed, the electrical installation must be co-ordinated with it to ensure equipotential bonding and SPD (surge protective device) requirements are met.',
  },
  {
    question: 'How often should agricultural electrical installations be inspected?',
    answer:
      'IET Guidance Note 3 recommends a maximum periodic inspection interval of 3 years for agricultural and horticultural premises, or 1 year where the installation is particularly harsh (for example, poultry or pig units with high ammonia levels). The inspection interval should also be shortened to 1 year following a change of tenancy. Agricultural inspections must cover all fixed wiring, distribution equipment, socket outlets, RCD testing, earth electrode resistance, and all external wiring and outdoor socket outlets.',
  },
  {
    question: 'What cable types are suitable for agricultural installations?',
    answer:
      'Standard PVC-insulated, PVC-sheathed cables (6242Y flat twin and earth) are not suitable for most agricultural applications due to moisture, rodent damage, and UV degradation risks. Steel wire armoured (SWA) cable or XLPE-insulated, XLPE-sheathed armoured cable is preferred for fixed wiring in agricultural buildings. For buried runs between buildings, armoured cable with additional mechanical protection (duct or concrete cover) is required. Conduit installations must use conduit systems rated for outdoor or industrial use — standard white plastic domestic conduit is not appropriate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/caravan-park-electrical',
    title: 'Caravan Park Electrical (Section 708)',
    description:
      'BS 7671 Section 708 requirements for caravan parks — CEE connectors, RCD protection, and earthing.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/guides/ip-ratings-explained',
    title: 'IP Ratings Explained',
    description:
      'Understanding IP ratings for electrical equipment — what IP44, IP55, and IP65 mean in practice.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete periodic inspection reports on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bs7671-section-705',
    heading: 'BS 7671 Section 705: Agricultural and Horticultural Premises',
    content: (
      <>
        <p>
          BS 7671:2018+A4:2026 Section 705 — Agricultural and Horticultural Premises — is the
          primary technical standard governing electrical installations on UK farms, market gardens,
          equestrian facilities, poultry units, and any other premises used for agricultural or
          horticultural purposes. It forms part of Part 7 (Special Installations or Locations) of
          the wiring regulations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — Section 705 applies to all fixed electrical installations
                in agricultural and horticultural premises, including farm buildings, outbuildings,
                livestock housing, milking parlours, poultry houses, glasshouses, and external
                installations between buildings. It does not apply to the farmhouse dwelling, which
                is treated as a standard domestic installation under the general requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specific hazards</strong> — agricultural electrical installations face a
                combination of hazards: damp and corrosive environments (ammonia from livestock,
                moisture, cleaning chemicals), rodent and livestock damage to cables, UV degradation
                of outdoor equipment, dust and chaff in grain handling areas, flammable materials
                (hay, straw, grain), elevated fire risk, and the particular sensitivity of livestock
                to electric shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Priority modifications</strong> — the key modifications Section 705 makes to
                the general requirements are: tiered RCD protection (≤30 mA for ≤32 A socket outlet
                circuits, ≤100 mA for &gt;32 A socket outlet circuits, ≤300 mA for all other
                circuits), equipment generally inaccessible to livestock, mandatory armoured or
                protected cables, enhanced IP ratings for all electrical equipment, and a
                prohibition on PEN conductors within the installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on agricultural installations should hold a current{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 qualification
          </SEOInternalLink>{' '}
          and be familiar with Section 705. The IET Guidance Note 7 (Special Locations) provides
          supplementary guidance including worked examples.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4 my-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-white text-sm leading-relaxed">
            <strong>Electric fence installations are outside the scope of Section 705</strong> —
            Regulation 705.1 NOTE states that electric fence installations are not covered by
            Section 705. They must comply with BS EN 60335-2-76 (Safety of household and similar
            electrical appliances — particular requirements for electric fence energisers) instead.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'livestock-buildings',
    heading: 'Livestock Building Requirements',
    content: (
      <>
        <p>
          Livestock buildings present the most demanding requirements within Section 705. The
          combination of animal sensitivity to electric shock, the damp and corrosive environment,
          and the physical risk posed by animals to electrical equipment requires a fundamentally
          different approach to wiring design compared to standard commercial or domestic premises.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment inaccessible to livestock</strong> — Regulation 705.513.2 requires
                that electrical equipment in livestock locations shall generally be inaccessible to
                animals. Conduit, cable management, switch bodies, socket outlet bodies, and motor
                casings must be routed at height, buried, or otherwise out of reach. Where equipment
                (such as feeding or watering equipment) is unavoidably accessible, it must be
                adequately constructed and installed. Animals will chew, rub, and apply significant
                force to anything within reach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Livestock shock sensitivity</strong> — cattle are particularly sensitive to
                low voltages. Touch voltages that a human would barely notice (as low as 1–2 V AC in
                some studies) can cause behavioural changes in dairy cows, affecting milk yield and
                causing distress. Livestock buildings should be designed to minimise all potential
                touch voltages, including those arising from earthing arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional RCD protection</strong> — in livestock buildings, fixed
                electrical equipment (heating lamps, ventilation fans, automatic feeding equipment,
                milking machines) must be protected by RCDs. Where 30 mA protection is impractical
                due to normal operating leakage currents (large motors), 300 mA time-delayed RCDs
                may be used, but a risk assessment should justify this decision.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable protection</strong> — cables in livestock buildings must be
                mechanically protected against damage by animals. Steel wire armoured (SWA) cable in
                heavy-gauge conduit mounted at height, or cables buried in concrete, are the
                standard approaches. PVC-sheathed flat cables clipped to surfaces accessible to
                animals are entirely unsuitable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Agricultural Electrical Equipment',
    content: (
      <>
        <p>
          Ingress protection (IP) ratings indicate a piece of electrical equipment's resistance to
          solid particle and liquid ingress, as defined in BS EN 60529. Selecting the correct IP
          rating for agricultural applications is critical to equipment longevity and safety.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 — minimum for agricultural buildings</strong> — protection against
                solid objects greater than 1 mm and water splashing from any direction. Suitable for
                general use in dry and moderately damp agricultural buildings such as hay stores and
                machinery sheds. Not suitable for areas subject to regular hosing down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP55 — for hosing-down areas</strong> — protection against dust ingress (no
                harmful deposits) and water jets from any direction. Required in dairy parlours,
                poultry houses, pig units, and any area subject to regular cleaning with hoses or
                pressure washers. Also recommended for outdoor equipment subject to driving rain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65 — for dust-heavy environments</strong> — complete dust protection and
                water jet protection. Required in grain stores, feed mills, and other locations with
                heavy dust. Also appropriate for outdoor socket outlets and distribution boards
                where a higher level of protection is desired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corrosion resistance</strong> — IP rating alone does not address chemical
                resistance. In poultry and pig units, high ammonia concentrations corrode standard
                metalwork and degrade standard PVC enclosures over time. Equipment in these
                environments should have GRP or stainless steel enclosures and be rated for use in
                high-ammonia environments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-requirements',
    heading: 'RCD Requirements Under Section 705',
    content: (
      <>
        <p>
          Section 705 imposes comprehensive RCD protection requirements that go beyond the general
          requirements of BS 7671. Both socket outlet circuits and fixed equipment in livestock
          buildings require RCD protection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-tier RCD requirement (Reg 705.411.1)</strong> — Regulation 705.411.1
                applies irrespective of earthing system. (a) Socket outlet circuits ≤32 A: RCD with
                characteristics per Regulation 415.1.1 — in practice not exceeding 30 mA. (b) Socket
                outlet circuits rated &gt;32 A: RCD with rated residual operating current not
                exceeding 100 mA. (c) All other circuits: RCD with rated residual operating current
                not exceeding 300 mA. The 30 mA threshold therefore applies specifically to standard
                ≤32 A socket outlet circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>300 mA for fixed equipment</strong> — in livestock buildings, circuits
                supplying fixed equipment must also have RCD protection. Where 30 mA protection
                causes nuisance tripping (due to normal operational leakage from large motors or
                long cable runs), a maximum of 300 mA time-delayed RCD protection is permitted as an
                alternative. The time delay must not exceed 1 s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A RCDs</strong> — variable-speed motor drives, soft starters, and
                electronic control equipment on agricultural machinery can produce DC residual
                currents. Type A RCDs are recommended for circuits supplying such equipment to
                ensure reliable detection of all fault current types.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Annual or three-yearly RCD testing is an essential part of the periodic inspection. Record
          all RCD test results — operating time at IΔn and at 5× IΔn — in the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            EICR schedule of test results
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'damp-wet-environments',
    heading: 'Wiring in Damp and Wet Agricultural Environments',
    content: (
      <>
        <p>
          Damp and wet conditions are normal in many agricultural buildings. Wiring methods and
          equipment selection must reflect the actual environment in which they are installed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Armoured cable</strong> — steel wire armoured (SWA) or aluminium wire
                armoured (AWA) cable is the standard for fixed wiring in agricultural buildings. The
                armouring provides both mechanical protection against rodent damage and physical
                abuse, and an additional conductive layer for fault protection. All cable glands and
                terminations must maintain the IP rating of the enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit systems</strong> — heavy-gauge galvanised steel conduit or
                IP67-rated plastic conduit systems (not standard domestic white conduit) may be used
                where cables require additional protection. All conduit fittings and boxes must be
                rated for the environment. Conduit routes must include inspection points and must
                drain condensation rather than trap it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External wiring between buildings</strong> — cables between separate farm
                buildings must be armoured and either buried at the correct depth with suitable
                protection (tiles or marker tape) or routed overhead as an aerial cable with
                adequate support and sag allowance. All buried cables must be recorded on an
                as-installed drawing retained on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Conduit and trunking specifications for livestock buildings (Reg 705.522.16)
                </strong>{' '}
                — in locations where livestock is kept, external influences shall be classified AF4.
                Conduit systems installed indoors in such locations must achieve at least Class 2
                (medium) corrosion protection per BS EN 61386-21; outdoors, at least Class 4 (high)
                corrosion protection is required. Where wiring may be exposed to impact from
                vehicles and mobile agricultural machinery (AG3 classification), conduit and cable
                trunking systems must provide a degree of protection against impact of at least 5 J
                in accordance with BS EN 61386-21 (conduit) and BS EN 50085-2-1 (trunking and
                ducting). Standard domestic-grade conduit meets none of these requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lightning-protection',
    heading: 'Lightning Protection Considerations for Farm Buildings',
    content: (
      <>
        <p>
          Farm buildings — particularly large steel-framed barns, grain silos, and isolated
          structures in open farmland — are at elevated risk from lightning strikes. Lightning
          strikes can cause catastrophic fire in hay and straw stores and can destroy electrical
          equipment through conducted and induced surges.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Risk assessment under BS EN 62305-2</strong> — whether a lightning
                protection system is required depends on a formal risk assessment. The assessment
                considers the thunderstorm days per year at the location, the dimensions and
                construction of the building, the consequences of a strike (fire risk from stored
                hay, loss of livestock), and nearby earthing arrangements. Electricians should be
                familiar with the risk assessment process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge protective devices (SPDs)</strong> — even where a formal lightning
                protection system is not required, surge protective devices (SPDs) complying with BS
                EN 61643-11 are recommended at the main distribution board and at sub-boards
                supplying sensitive electronic equipment (control systems, instrumentation, milking
                equipment electronics). SPDs divert conducted surge energy to earth before it can
                damage connected equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipotential bonding</strong> — all metallic structural elements of farm
                buildings (steel portal frames, metal roofing, water pipes, grain handling
                equipment) should be bonded together and connected to the electrical earth. This
                limits potential differences between metalwork during a lightning event and reduces
                the risk of side-flash between metalwork and conductors.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing on Agricultural Sites',
    content: (
      <>
        <p>
          Earthing on agricultural sites requires careful attention, particularly where multiple
          buildings are supplied from a single incoming supply and where livestock sensitivity to
          potential differences must be managed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT vs. TN-C-S</strong> — many rural farms are supplied from overhead
                networks where PME (TN-C-S) earthing may not be reliably available. TT earthing with
                a local earth electrode is common. Earth electrode resistance must be measured at
                commissioning and at each inspection. The earth electrode and conductor must be
                protected against corrosion and mechanical damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Touch voltages and livestock</strong> — the earth electrode layout in
                livestock buildings must be designed to minimise step and touch voltages in areas
                accessible to animals. Equipotential zones within livestock buildings (where all
                metallic floor grid elements, water troughs, and metallic building elements are
                bonded together) can reduce potential differences to safe levels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple building sites</strong> — where a single supply feeds multiple farm
                buildings, the main earthing terminal and the earth electrode for the whole site
                should be at the main incoming distribution board. Each building's earthing should
                be taken from this common point via the armoured cable armouring or a separate
                protective conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PEN conductor prohibition (Reg 705.411.4)</strong> — a PEN conductor shall
                not be used within electrical installations of agricultural and horticultural
                premises. This prohibition applies within the installation boundaries and also
                extends to associated residences and other locations belonging to the premises. NOTE
                1 clarifies that TN-C-S (PME) is not precluded by this prohibition — it is the use
                of a combined protective-and-neutral conductor inside the installation that is
                banned, not the supply system itself. NOTE 2 adds that unless a metal grid is laid
                in the floor, the use of a PME earthing facility as the means of earthing for the
                installation is not recommended in livestock buildings, owing to the risk of
                elevated touch voltages across the floor.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Agricultural Inspection and Certification',
    content: (
      <>
        <p>
          Agricultural electrical work is a specialist and rewarding area for electricians with the
          right knowledge and experience. Farm installations are large, complex, and require
          inspection every 3 years — providing valuable recurring work in rural areas where
          competition is often lower than in urban centres.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Agricultural EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete farm inspection reports building-by-building on your phone. Record RCD
                  test results, earth electrode resistance, and equipment IP rating observations in
                  the schedule. Generate the PDF report before leaving the farm.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Three-Year Inspection Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Agricultural installations require inspection every 3 years. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
                  offer 3-year maintenance and inspection packages to farm operators. A large farm
                  with multiple buildings represents a substantial single-client contract.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Agricultural inspection work made simple with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, test result recording, and instant PDF export."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AgriculturalElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Agricultural Electrical Installation UK | Farm Wiring BS"
      description="Complete guide to agricultural electrical installations under BS 7671 Section 705. Livestock building requirements, IP ratings, RCD protection…"
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Installation"
      badgeIcon={Building2}
      heroTitle={
        <>
          Agricultural Electrical Installation UK:{' '}
          <span className="text-yellow-400">BS 7671 Section 705</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about agricultural and horticultural electrical installations — BS 7671 Section 705, livestock building requirements, IP ratings, 30 mA RCD protection, damp environments, lightning protection considerations, and farm earthing arrangements."
      readingTime={14}
      answerBox={{
        question: 'What are the BS 7671 rules for agricultural electrical installations?',
        answer:
          'Agricultural and horticultural installations are covered by BS 7671 Section 705. Electrical equipment and isolation/switching devices must be inaccessible to livestock (Regs 705.513.2 and 705.537.2); RCDs provided for additional fire protection must have a rated residual operating current not exceeding 300 mA (Reg 705.422.7); socket-outlet circuits need 30 mA RCD additional protection; and equipment must be rated for the damp, dusty and corrosive conditions with an appropriate IP rating.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Agricultural Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Complete Agricultural EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site inspection reporting, test result entry, and instant PDF export. Perfect for farm and agricultural inspections. 7-day free trial."
    />
  );
}
