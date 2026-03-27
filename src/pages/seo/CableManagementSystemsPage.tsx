import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Wrench,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Cable Management Systems', href: '/cable-management-systems' },
];

const tocItems = [
  { id: 'conduit', label: 'Conduit Systems (BS EN 61386)' },
  { id: 'trunking', label: 'Cable Trunking (BS EN 50085)' },
  { id: 'cable-tray', label: 'Cable Tray and Basket Tray' },
  { id: 'fill-ratios', label: 'Fill Ratios and Space Factors' },
  { id: 'fire-barriers', label: 'Fire Barriers and Compartmentation' },
  { id: 'separation', label: 'Separation Requirements' },
  { id: 'earthing', label: 'Earthing of Metalwork' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Conduit systems are governed by BS EN 61386 (formerly BS 4607 and BS 6053). Conduit provides mechanical protection for cables and, in the case of steel conduit, can serve as the circuit protective conductor (CPC) if correctly installed and bonded.',
  'Cable trunking systems are governed by BS EN 50085. Trunking is used for surface-mounted wiring in commercial premises and provides easy access for cable additions and modifications. Fill ratios must comply with BS 7671 and the trunking manufacturer\'s data.',
  'Cable tray and basket tray are open cable management systems that allow heat dissipation from cables, permitting higher grouping factors than enclosed trunking. Fill ratios are not prescribed by BS 7671 for open tray — good engineering practice typically limits fill to 70% of tray area.',
  'Fire barriers must be installed in cable management systems wherever cables pass through fire-resistant compartment walls and floors, to prevent the passage of fire and smoke through the building structure. This is a mandatory requirement under BS 9999 and the Building Regulations.',
  'Where power and data or telecommunications cables are run in the same trunking or tray, segregation is required to prevent electromagnetic interference. BS 7671 Regulation 528 and CENELEC EN 50174-2 specify minimum separation distances.',
  'Metallic cable management systems (steel conduit, metal trunking, metal tray) that are not used as CPCs must be bonded to the protective earth system of the installation under BS 7671 Regulation 411.3. All extraneous conductive parts must be bonded.',
];

const faqs = [
  {
    question: 'What is the difference between conduit, trunking, and cable tray?',
    answer:
      "These are three distinct types of cable management system used for different applications. Conduit is a tube (circular cross-section) through which cables are drawn — it provides good mechanical protection and is standard for concealed and exposed wiring in commercial and industrial premises. Trunking is a rectangular channel with a removable lid — cables lie in the trunking and the lid is clipped on. Trunking is used for surface-mounted installations where easy access for cable additions is required. Cable tray is an open or perforated steel or aluminium channel without a lid — cables are laid on the tray and secured with cable ties. Tray is used in industrial and commercial premises for large quantities of cables, particularly in risers, plant rooms, and cable routes where thermal performance is important. Basket tray (wire basket) is a variant of open tray, lighter and more flexible, widely used in data centres and commercial fit-outs.",
  },
  {
    question: 'What is the fill ratio for cable trunking and why does it matter?',
    answer:
      "The fill ratio (also called the space factor) for cable trunking is the proportion of the trunking cross-sectional area occupied by cables. BS 7671 Regulation 522.8.1 and Appendix 5 specify that the total cross-sectional area of cables (including insulation) in a trunking should not exceed 45% of the internal cross-sectional area of the trunking for wiring systems installed during construction, 40% where installation must be carried out through access points in an installed conduit, and 35% for cables drawn into installed conduit. The reason is twofold: heat dissipation (cables must be able to dissipate heat — excessive fill increases thermal resistance) and installation practicality (a trunking too tightly packed with cables cannot have cables withdrawn and reinstalled). Exceeding the fill ratio is a common observation on EICRs for commercial installations.",
  },
  {
    question: 'Can steel conduit be used as a circuit protective conductor?',
    answer:
      "Yes. Steel conduit can serve as the circuit protective conductor (CPC) provided it meets the requirements of BS 7671 Regulation 543.2. The conduit must be of adequate cross-sectional area to carry the prospective fault current for the time required to operate the protective device — this is verified by the adiabatic equation (s² ≥ I²t/k²). Steel conduit is typically adequate as a CPC for circuits protected by 6A to 32A MCBs in most domestic and commercial applications. However, conduit used as a CPC must have all joints bonded — painted threads or non-conductive bushes that interrupt earth continuity are a common deficiency on EICRs. Where screwed steel conduit is used as the sole CPC, a continuity test at every accessible joint is required, and all joints must be tight and bonded using earth bonding strips where necessary.",
  },
  {
    question: 'What fire barrier requirements apply to cables passing through walls and floors?',
    answer:
      "Whenever cable management systems pass through compartment walls or floors (as defined in the Building Regulations Approved Document B), a fire barrier must be installed at the penetration to restore the fire resistance of the element. The barrier must seal the gap around cables and any residual space in the conduit or trunking, and must achieve the same fire resistance period as the penetrated element (typically 30, 60, or 120 minutes FRL). Approved products include intumescent putty, intumescent pillow systems, cementitious mortar systems, and intumescent cable transit frames. In steel conduit, the conduit itself can be fire-stopped using intumescent putty packed inside the tube. All fire barrier installations should be inspected and certified by the installer, with the product data sheet retained with the building records.",
  },
  {
    question: 'What is the required separation between power and data cables in trunking?',
    answer:
      "BS 7671 Regulation 528.1 requires that where low-voltage power cables and band I (telecommunications/data) circuits share an enclosure, there must be adequate segregation to prevent interference. The IET Code of Practice for In-Building Data Networks (and CENELEC EN 50174-2) specifies minimum separation distances between power and data cabling: 200mm minimum between unscreened power cables and unscreened Cat 5e/6 data cables run in parallel; 100mm where one or both are screened or in metallic containment. Where a shared trunking system is unavoidable, a metallic divider within the trunking provides the required separation. This is particularly important in commercial offices and data centres where long parallel cable runs between power and structured cabling are common.",
  },
  {
    question: 'How do I earth metallic cable management systems correctly?',
    answer:
      "Metallic cable management systems — steel conduit, metal trunking, metal tray, cable ladders — are extraneous conductive parts that must be bonded to the protective earth system of the installation under BS 7671 Regulation 411.3. The standard method is to install a dedicated protective bonding conductor (green/yellow) from the nearest earthing terminal to the metallic containment, and to ensure continuity throughout the system. For long trunking and tray runs, earth continuity must be maintained at every joint — trunking manufacturers supply earth continuity link straps for this purpose. Steel conduit that is not being relied upon as a CPC must still be earthed as an extraneous conductive part. The bonding conductor cross-section is determined by BS 7671 Table 54.8. All earth bonding must be tested for continuity as part of the initial verification under BS 7671 Regulation 643.",
  },
  {
    question: 'What is the difference between rigid, flexible, and pliable conduit, and when is each used?',
    answer:
      "Rigid conduit (heavy gauge steel — BS EN 61386-21, or rigid PVC — BS EN 61386-22) is used for fixed cable routes in walls, ceilings, floors, and exposed positions requiring maximum mechanical protection. Heavy gauge steel rigid conduit is the standard for industrial and high-risk environments. Rigid PVC conduit is used in domestic and light commercial environments where corrosion is a concern and mechanical protection demands are lower. Flexible conduit (metal or PVC — BS EN 61386-23) is used for final connections to motors, pumps, and other equipment that vibrates or moves — it absorbs vibration and allows positional adjustment. Pliable (corrugated) conduit — used almost exclusively in concealed domestic installations under plaster or concrete — is not suitable for exposed or surface-mounted use due to its low mechanical protection rating. BS EN 61386 classifies conduit by its mechanical, fire, and environmental resistance characteristics — always select the appropriate classification for the installation environment.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-load-calculation',
    title: 'Electrical Load Calculation',
    description: 'How to calculate electrical load, diversity factors, and cable sizing.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/solar-pv-system-sizing',
    title: 'Solar PV System Sizing',
    description: 'How to size a solar PV system — kWp, orientation, MCS, G98/G99, BS 7671 Section 712.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/two-way-switch-wiring',
    title: 'Two-Way Switch Wiring',
    description: 'Complete guide to two-way and intermediate switch wiring and BS 7671 requirements.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations, 5-year inspection cycle, and compliance requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'conduit',
    heading: 'Conduit Systems — BS EN 61386',
    content: (
      <>
        <p>
          Conduit systems provide a protective enclosure for electrical cables, offering
          mechanical protection against impact, compression, and penetration, as well as
          a degree of protection against dust and moisture. In the UK, conduit systems
          are governed by BS EN 61386 (the European harmonised standard for conduit
          systems for cable management), which replaced the older British standards
          BS 4607 (steel conduit) and BS 6053 (PVC conduit).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Main Conduit Types</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heavy gauge screwed steel conduit (BS EN 61386-21):</strong> The
                highest mechanical protection class. Standard for industrial and commercial
                premises, plant rooms, and exposed locations. Can serve as CPC if
                correctly installed and bonded. Hot-dip galvanised for corrosion resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rigid PVC conduit (BS EN 61386-22):</strong> Used in domestic and
                light commercial surface-mounted installations. Lighter and corrosion-resistant
                but lower impact resistance than steel. Cannot serve as CPC — a separate
                earth conductor is always required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pliable (corrugated) conduit:</strong> Used almost exclusively
                concealed in plaster, screed, or concrete. Not for surface-mounted or
                exposed use. Available in grey (non-corrugated outer, corrugated inner)
                or orange (standard for underground).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexible conduit (BS EN 61386-23):</strong> Final connections to
                motors, pumps, and vibrating equipment. Metal or PVC construction. Must
                not be used as fixed wiring routes — keep runs as short as practicable.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard conduit sizes:</strong> 16mm, 20mm, 25mm, 32mm, 40mm,
                50mm internal diameter are the most common in UK electrical installations.
                Select the size based on the number and diameter of cables to be installed,
                applying BS 7671 Appendix 5 fill ratios.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'trunking',
    heading: 'Cable Trunking Systems — BS EN 50085',
    content: (
      <>
        <p>
          Cable trunking is a rectangular channel with a removable lid used for
          surface-mounted wiring in commercial, industrial, and domestic premises.
          It provides easy access for cable installation and modification, and a
          professional appearance. BS EN 50085 is the European harmonised standard
          for cable trunking systems and cable ducting systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Common Trunking Types</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel trunking (BS EN 50085-1):</strong> The standard for industrial
                and heavy commercial premises. Available in galvanised and powder-coated
                finishes. Can serve as CPC where continuity joints are earth-bonded.
                Common sizes: 50×50mm to 300×150mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC trunking (BS EN 50085-2):</strong> Used in offices, schools,
                and domestic surface-mounted installations. Available in white, grey, and
                woodgrain finishes. Lighter and corrosion-resistant. Cannot serve as CPC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-compartment trunking:</strong> Divided internally into two
                or three compartments for segregation of power, data, and telecommunications
                cables. Required where BS 7671 Regulation 528 separation must be maintained
                within a single trunking route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skirting trunking and dado trunking:</strong> Perimeter trunking
                systems integrated into skirting boards and mid-wall dado positions in
                offices and commercial fit-outs. Provide power, data, and AV cable routes
                with access every 600mm via snap-in faceplates.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-tray',
    heading: 'Cable Tray and Basket Tray',
    content: (
      <>
        <p>
          Cable tray and basket tray are open cable management systems — unlike conduit
          and trunking, they do not enclose cables but support them on an open channel
          or mesh. This allows cables to dissipate heat effectively, which is particularly
          important for high-current circuits where grouping derating would otherwise
          significantly reduce cable capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Perforated cable tray:</strong> The standard in UK industrial and
                commercial installations — plant rooms, distribution risers, external cable
                routes. Available in hot-dip galvanised (standard), stainless steel (for
                food processing and corrosive environments), and PVC-coated. Width 50mm
                to 900mm, standard load classifications to BS EN 61537.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable ladder:</strong> Used for heavy cable loads and long spans.
                Ladder rungs at typically 300mm centres allow heat dissipation and give
                good support to large cables. Standard in power station, process plant,
                and large industrial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire basket tray:</strong> Lightweight, flexible, and quick to
                install. Widely used in data centres, commercial offices, and suspended
                ceiling spaces. Easily cut and bent on site. Cannot serve as CPC —
                a separate earth conductor must be installed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For cable tray, the IET Wiring Regulations guidance and BS EN 61537 (cable
          management systems — cable tray and cable ladder) apply. Metallic cable tray
          must be bonded to earth under BS 7671 Regulation 411.3.
        </p>
      </>
    ),
  },
  {
    id: 'fill-ratios',
    heading: 'Fill Ratios and Space Factors',
    content: (
      <>
        <p>
          Fill ratios control the proportion of a cable management system's internal
          cross-sectional area that can be occupied by cables. Exceeding the fill ratio
          causes overheating (cables cannot dissipate heat), makes cable installation and
          withdrawal impractical, and is a common observation on EICRs for commercial
          installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">BS 7671 Appendix 5 Fill Ratios</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit (wired during installation):</strong> 45% of internal
                cross-sectional area. For a 20mm conduit with 201mm² internal area,
                maximum cable area = 90mm².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit (cables drawn in after installation):</strong> 40% of
                internal cross-sectional area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trunking:</strong> 45% of internal cross-sectional area (same
                as conduit for wired installations). Multi-compartment trunking — apply
                45% to each compartment separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable tray (open):</strong> No specific BS 7671 fill ratio prescribed.
                Good practice limits fill to 70% of tray width for single-layer installation,
                with multi-layer installations using grouping derating from BS 7671 Appendix 4.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grouping derating on tray:</strong> Cables touching on cable tray
                are treated as grouped under BS 7671 Appendix 4. The grouping correction
                factor (Cg) must be applied when selecting cable size — for 4 cables
                touching, Cg = 0.65 (35% reduction in CCC). For thermally benign
                single-layer installations on cable tray with cables spaced apart by
                one cable diameter, no derating is required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-barriers',
    heading: 'Fire Barriers and Compartmentation',
    content: (
      <>
        <p>
          Fire barriers at cable penetrations through compartment walls and floors are
          a mandatory requirement under the Building Regulations (Approved Document B —
          Fire Safety) and under BS 9999 (Code of Practice for Fire Safety in the Design,
          Management and Use of Buildings). They are also required under BS 7671
          Regulation 527.2.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirement:</strong> Every penetration of a fire-resistant
                compartment wall or floor by a conduit, trunking, or tray run — or by
                individual cables — must be sealed to restore the fire resistance of the
                compartment element. The seal must achieve the same fire resistance period
                as the element penetrated (E = integrity, I = insulation, R = resistance).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved products:</strong> Intumescent putty and sealant, intumescent
                pillow and block systems, intumescent cable transit frames, and cementitious
                mortar systems. All must be third-party tested and certified to BS EN 1366-3
                (penetration seals) and marked with the achieved FRL.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel conduit penetrations:</strong> Pack the inside of the conduit
                with certified intumescent putty at the wall face. Also seal around the
                outside of the conduit in the wall aperture. Sealing conduit with ordinary
                caulk or foam is not acceptable — it must be tested fire-stopping product.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation:</strong> Retain the product data sheet and the
                installer's declaration for all fire barrier installations with the building
                records. These are required by the Building Safety Act 2022 for higher-risk
                buildings (7 storeys or 18 metres+).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'separation',
    heading: 'Separation Requirements for Power and Data Cables',
    content: (
      <>
        <p>
          BS 7671 Regulation 528 requires adequate separation between circuits of
          different voltage bands to prevent interference. Band I (extra-low voltage —
          telecommunications, data, fire alarms) and Band II (low voltage — standard
          electrical circuits) must be segregated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Segregation in trunking:</strong> Power and data cables may share
                a trunking if a metallic divider is installed between the two groups.
                Multi-compartment trunking systems designed for this purpose are available
                from most manufacturers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Separation distances on cable tray:</strong> CENELEC EN 50174-2
                specifies minimum separation distances for parallel cable runs: 200mm between
                unscreened power cables and Cat 5e/6 data cables (unscreened); 100mm
                where one or both are screened; 50mm where both are in metallic conduit
                or trunking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm and emergency lighting segregation:</strong> BS 5839-1
                (fire detection) and BS 5266 (emergency lighting) require their respective
                cable systems to be segregated from other services to prevent common-cause
                failure. Fire alarm cables in fire-resistant containment must not share
                containment with general power or lighting circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing of Metallic Cable Management',
    content: (
      <>
        <p>
          Metallic cable management systems — steel conduit, metal trunking, metal cable
          tray — are extraneous conductive parts under BS 7671 and must be bonded to the
          protective earth system of the installation. Failure to earth metallic containment
          is a common C2 observation on EICRs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Regulation 411.3:</strong> All metallic cable management
                not used as a CPC must be bonded to the protective earth. The bonding
                conductor cross-section is determined by BS 7671 Table 54.8 — minimum
                4mm² copper where the bonding conductor is not mechanically protected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trunking and tray earth continuity:</strong> Metallic trunking and
                tray joints must maintain earth continuity throughout the run. Trunking
                manufacturers supply earth continuity link straps to bridge each joint.
                Where earth continuity link straps are not fitted, a separate earth
                conductor must be bonded at each end of the run and at regular intervals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing:</strong> Earth continuity of metallic cable management
                must be verified as part of the initial verification test under BS 7671
                Regulation 643.2. The resistance must be low enough that a fault to the
                metalwork would operate the protective device within the required
                disconnection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes" />{' '}
          for how unearthed metallic containment is graded on electrical inspection reports
          and what remedial action is required.
        </p>
        <p>
          Use <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to record
          earth continuity test results and containment earthing observations in your
          EICR and initial verification documentation.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableManagementSystemsPage() {
  return (
    <GuideTemplate
      title="Cable Management Systems — UK Guide 2024 | Conduit, Trunking, Cable Tray, BS EN 61386, BS EN 50085"
      description="Complete guide to cable management systems for UK electricians: conduit (BS EN 61386), cable trunking (BS EN 50085), cable tray and basket tray, fill ratios, fire barriers, power and data segregation, and earthing of metallic containment."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Cable Management Systems{' '}
          <span className="text-yellow-400">— UK Electrician Guide</span>
        </>
      }
      heroSubtitle="A complete guide to cable management systems for UK electricians: conduit systems (BS EN 61386), cable trunking (BS EN 50085), cable tray and basket tray, fill ratios, fire barriers, power and data separation requirements, and earthing of metallic containment."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Cable Management Systems — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Record cable management observations in your EICR with Elec-Mate"
      ctaSubheading="Generate compliant EICR reports on your phone with full observations and remedial recommendations. Start your free 7-day trial."
    />
  );
}
