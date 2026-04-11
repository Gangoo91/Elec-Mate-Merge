import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Zap,
  AlertTriangle,
  ShieldCheck,
  Wrench,
  Layers,
  ThermometerSun,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'Armoured Cable Installation', href: '/armoured-cable-installation' },
];

const tocItems = [
  { id: 'what-is-swa', label: 'What is SWA Armoured Cable?' },
  { id: 'types-and-cores', label: 'Types and Core Configurations' },
  { id: 'current-ratings', label: 'Current Ratings' },
  { id: 'stripping-and-terminating', label: 'Stripping and Terminating' },
  { id: 'underground-burial', label: 'Underground Burial Depths' },
  { id: 'ip-ratings', label: 'IP Ratings for Glands' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Steel Wire Armoured (SWA) cable is the standard for underground and external electrical installations in the UK, providing mechanical protection against accidental damage.',
  'The armour wires on SWA cable must be connected to earth at both ends of the run using appropriate SWA cable glands with a lock-nut and earth tag — the armour itself provides the circuit protective conductor.',
  'Minimum burial depth under footpaths is 500mm and under driveways or roads is 600mm, measured to the top of the cable. Route markers and warning tape should be installed above the cable.',
  'Select the correct number of cores for the application: 2-core for single-phase with separate earth, 3-core for single-phase with armour earth, 4-core for three-phase.',
  'SWA cable glands must be rated to at least the same IP rating as the enclosure they terminate into. IP66 and IP68 glands are common for outdoor and underground work.',
];

const faqs = [
  {
    question: 'Does SWA cable need to be earthed at both ends?',
    answer:
      'Yes. The steel wire armour of SWA cable must be connected to earth at both the supply end and the load end. SWA glands with an earth tag and locknut are used to clamp the armour and provide the earth connection at each termination point. Earthing the armour at both ends ensures earth fault protection across the full length of the cable run and satisfies the requirements of BS 7671 Regulation 543.',
  },
  {
    question: 'What is the minimum burial depth for SWA cable in the UK?',
    answer:
      'Under BS 7671 and the IET Wiring Regulations, the minimum burial depth for SWA cable is 500mm under footpaths and areas unlikely to be disturbed, and 600mm under driveways, roads, or areas subject to vehicle loading. These depths are measured from the surface to the top of the cable. Cable route marker tape should be laid 150mm above the cable, and cable route markers should be installed at the surface at regular intervals and at every change of direction.',
  },
  {
    question: 'Can SWA cable be used as the earth conductor?',
    answer:
      'The steel wire armour can be used as the circuit protective conductor (CPC/earth conductor) provided the armour cross-sectional area is sufficient to meet the requirements of BS 7671 Regulation 543. In many 3-core SWA installations, the armour carries the earth with separate line and neutral conductors inside. However, for installations where the armour CSA is insufficient, a separate earth conductor must be included or a 4-core cable used with one core dedicated to earth.',
  },
  {
    question: 'What type of gland is used for SWA cable?',
    answer:
      'SWA cable requires a specific armoured cable gland, commonly a "BW" or "CW" type brass gland with a cone and back-nut that grips the armour wires mechanically. The gland body clamps the armour to provide mechanical retention and earth continuity. An earth tag is fitted under the lock-nut to provide the earth connection to the enclosure. For outdoor and underground work, use IP66 or IP68 rated glands. For indoor dry locations, IP54 may be acceptable.',
  },
  {
    question: 'What size SWA cable do I need for a 100A supply?',
    answer:
      "For a 100A single-phase supply run underground (reference method D — buried direct in ground), 35mm² 2-core SWA is typically required. The exact cable size depends on the run length, voltage drop allowance (maximum 4% for final circuits under BS 7671 Appendix 4), installation method, grouping with other cables, and ambient ground temperature. Always carry out a full cable sizing calculation and check voltage drop for your specific installation. Elec-Mate's cable sizing calculator can assist with this.",
  },
  {
    question: 'Does SWA cable need additional protection in the ground?',
    answer:
      'SWA cable provides its own mechanical protection by virtue of the steel wire armour, so additional conduit or ducting is not generally required for burial. However, where the cable passes under roads, driveways, or through building walls, it is good practice to route it through a duct to allow future replacement without excavation. Where cables are buried in concrete or pass through corrosive soils, consult the cable manufacturer for additional protection requirements.',
  },
  {
    question: 'How do I strip SWA cable correctly?',
    answer:
      'Stripping SWA cable requires an armoured cable stripper or a sharp hacksaw and care to avoid nicking the inner insulation. Score around the outer sheath at the required strip length, bend the cable to crack the sheath, then cut back. Fan out the armour wires and cut them to the correct length for the gland using side cutters. Slide the gland body over the armour wires before applying the cone and back-nut. Never cut the armour wires too short — they must be gripped firmly by the gland cone.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/mineral-insulated-cable-guide',
    title: 'Mineral Insulated Cable Guide',
    description: 'MICC/Pyrotenax cable for fire circuits and high-temperature environments.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/fp200-gold-cable-guide',
    title: 'FP200 Gold Cable Guide',
    description: 'Fire-resistant cable for fire alarm and emergency lighting circuits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/cable-tray-installation',
    title: 'Cable Tray Installation',
    description: 'Perforated, solid bottom, and wire mesh cable management for commercial work.',
    icon: Layers,
    category: 'Guide',
  },
  {
    href: '/conduit-installation-guide',
    title: 'Conduit Installation Guide',
    description: 'Steel and PVC conduit wiring — bending, threading, and earthing.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-swa',
    heading: 'What is Steel Wire Armoured (SWA) Cable?',
    content: (
      <>
        <p>
          Steel Wire Armoured (SWA) cable is a robust, multi-core power cable designed for fixed
          installation in situations where mechanical protection is required. It is the standard
          cable type for underground power runs, external installations between buildings, and
          industrial and commercial wiring where the cable may be exposed to accidental damage.
        </p>
        <p>
          SWA cable comprises an inner conductor (copper or aluminium), XLPE or PVC insulation on
          each core, a bedding layer, a layer of galvanised steel wires wound helically around the
          cable (the armour), and an outer PVC sheath. The steel wire armour provides excellent
          mechanical protection and, crucially, provides the circuit protective conductor (earth)
          path for the installation when correctly terminated with appropriate glands.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> — the steel wire armour protects against
                physical damage from excavation equipment, rodents, and accidental impact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground suitability</strong> — SWA cable is approved for direct burial
                in ground and does not generally require additional conduit protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity</strong> — when correctly terminated, the armour wires
                provide a low-impedance earth path meeting BS 7671 requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SWA cable must be installed in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations). Cable sizing, burial depth, and termination requirements are
          all specified in BS 7671 and the associated IET Guidance Notes.
        </p>
      </>
    ),
  },
  {
    id: 'types-and-cores',
    heading: 'Types and Core Configurations',
    content: (
      <>
        <p>
          SWA cable is available in several core configurations, each suited to different
          applications. Selecting the correct number of cores is essential to ensure the
          installation meets both functional and earthing requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2-core SWA</strong> — line and neutral conductors only. Used for
                single-phase circuits where the armour itself provides the earth (circuit protective
                conductor). The armour must be connected to earth at both termination points. Common
                for sub-main feeds to outbuildings, garden offices, and garages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-core SWA</strong> — line, neutral, and earth conductors. The dedicated
                earth core allows a larger CPC cross-section than the armour alone may provide. Also
                used for three-phase delta circuits (three lines, no neutral) where the armour
                provides the earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-core SWA</strong> — three line conductors and a neutral. The standard
                cable for three-phase and neutral (TN-S or TN-C-S) power distribution. The armour
                provides the earth. Used for feeding three-phase distribution boards, large
                machinery, and commercial sub-mains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5-core SWA</strong> — three line conductors, neutral, and earth. Used where
                a separate dedicated earth core is required in addition to the armour earth,
                typically in TN-S systems with strict earth impedance requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Conductor sizes range from 1.5mm² to 400mm² and above for large power cables. XLPE
          insulation is preferred over PVC for higher-temperature applications and improved
          current-carrying capacity. Aluminium conductor SWA (AWSWA) is used for large distribution
          cables where copper would be prohibitively heavy and expensive.
        </p>
      </>
    ),
  },
  {
    id: 'current-ratings',
    heading: 'Current Ratings for SWA Cable',
    content: (
      <>
        <p>
          Current ratings for SWA cable depend on the installation method, number of circuits
          grouped together, ambient temperature, and conductor material. The following figures are
          approximate for copper conductor XLPE-insulated SWA cable buried directly in ground
          (reference method D, BS 7671 Appendix 4, Table 4D4A) at 15°C ground temperature:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4mm² 2-core</strong> — approximately 44A buried, 36A clipped direct.
                Suitable for ring final circuits and small sub-feeds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10mm² 2-core</strong> — approximately 73A buried, 61A clipped direct.
                Suitable for cooker circuits and moderate sub-mains.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>25mm² 4-core</strong> — approximately 130A buried. Common for three-phase
                sub-mains feeding distribution boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>95mm² 4-core</strong> — approximately 265A buried. Used for large
                three-phase distribution feeds and main supplies.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always apply correction factors for grouping (Ca), ambient temperature (Cg), and soil
          thermal resistivity before selecting cable size. Verify voltage drop does not exceed the
          limits in BS 7671 Appendix 12 (4% for final circuits, 3% for lighting circuits from the
          origin of the installation). A cable sizing calculation should be documented and retained
          as part of the installation records.
        </p>
      </>
    ),
  },
  {
    id: 'stripping-and-terminating',
    heading: 'Stripping and Terminating SWA Cable',
    content: (
      <>
        <p>
          Correct termination of SWA cable is critical for both mechanical security and earth
          continuity. The armour must be correctly dressed and gripped by the gland to maintain the
          earth path and prevent the cable pulling out under mechanical stress.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — measure and mark</strong> — measure the depth of the gland entry
                plus additional length for the armour to be gripped. Mark the outer sheath with a
                knife or tape. Allow additional length inside the enclosure for core dressing and
                connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — remove outer sheath</strong> — score around the outer PVC sheath
                with a sharp knife, taking care not to cut into the armour wires. Bend the cable to
                crack and remove the sheath section. Use an armoured cable stripping tool where
                available to avoid knife slips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — dress the armour</strong> — fan out and straighten the steel armour
                wires. Cut them square at the correct length using sharp side cutters. The armour
                wire tips should align consistently — uneven armour leads to poor gland grip and
                reduced earth continuity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — fit the gland</strong> — slide the back-nut and cone over the
                armour wires (cone first, cone taper facing the gland body). Feed the cable through
                the gland body entry hole in the enclosure. Tighten the back-nut to draw the cone
                under the armour wires and clamp them firmly. Do not overtighten — the armour wires
                should be gripped firmly without being crushed or cut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5 — earth connection</strong> — fit an earth tag (lug) between the
                gland body and the enclosure lock-nut. Connect a green/yellow earth conductor from
                the earth tag to the enclosure earth bar. This provides the earth continuity between
                the armour and the installation earth.
              </span>
            </li>
          </ul>
        </div>
        <p>
          After termination, verify earth continuity with a low-resistance ohmmeter from the armour
          at one end to the earth connection at the other. The earth loop impedance should be
          calculated and verified to be within the limits in{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            BS 7671 Table 41.2
          </SEOInternalLink>{' '}
          for the relevant protective device.
        </p>
      </>
    ),
  },
  {
    id: 'underground-burial',
    heading: 'Underground Burial Depth Requirements',
    content: (
      <>
        <p>
          Burial depth is a critical aspect of underground SWA cable installation. Insufficient
          depth increases the risk of accidental damage from digging, which can cause electrocution
          and fire. BS 7671 and the IET On-Site Guide specify minimum depths.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>500mm minimum</strong> — under footpaths, garden areas, and other areas not
                subject to vehicle loading. Measured from the finished ground level to the top of
                the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>600mm minimum</strong> — under driveways, car parks, and areas subject to
                vehicle loading. The additional depth provides protection from the increased risk of
                damage from vehicles parked or driving over the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning tape</strong> — yellow/black cable warning tape should be laid 150mm
                above the cable for its full run length. This warns anyone digging above the cable
                before they reach it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route markers</strong> — cable route marker posts or tiles should be
                installed at regular intervals (typically every 3m to 5m) and at every change of
                direction to allow the cable route to be traced at the surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bedding</strong> — lay the cable on 50mm of fine sand or selected fill (free
                from sharp stones and debris). Cover with a further 50mm of sand or selected fill
                before backfilling.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Where it is not practical to achieve minimum burial depths (for example where the cable
          must cross a shallow area of bedrock), the cable must be provided with supplementary
          mechanical protection such as duct, tiles, or concrete encasement. Record cable routes on
          as-fitted drawings and retain these for the life of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for SWA Glands',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating of SWA cable glands must be appropriate for the
          installation environment. A gland with insufficient IP rating will allow moisture and dust
          ingress that can cause premature failure of the termination and earth continuity issues.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP54</strong> — dust protected, splash-proof. Suitable for indoor
                installations in locations where dust or occasional water splash is possible (e.g.,
                garages, plant rooms). Not suitable for outdoor or underground use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP66</strong> — dust tight, powerful water jet proof. The standard minimum
                rating for outdoor glands and cable entry into outdoor enclosures. Suitable for
                surface-mounted external installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP68</strong> — dust tight, continuous submersion. Required for glands at
                underground cable entry points into pits, chambers, and below-ground enclosures.
                Also required where cables pass through below-ground walls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The gland IP rating must match or exceed the IP rating of the enclosure. Where an IP68
          gland enters an IP66 enclosure, the overall protection is limited to IP66. Ensure the
          correct gland seal (neoprene, EPDM, or silicone depending on temperature and chemical
          exposure) is selected for the application.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in SWA Cable Installation',
    content: (
      <>
        <p>
          SWA cable installation errors frequently appear as observations on{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICRs</SEOInternalLink>{' '}
          and can result in dangerous conditions if left uncorrected.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Armour not earthed at one or both ends</strong> — the most dangerous and
                most common mistake. An unearthed armour provides no fault protection and can become
                live if a conductor within the cable faults to the sheath.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong gland type</strong> — using standard (non-armoured) cable glands on
                SWA cable. These grip only the outer sheath and provide no armour retention or earth
                continuity path.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient burial depth</strong> — cables buried too shallow are routinely
                damaged during garden work and landscaping. Always verify depth with a measurement
                and record it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No route markers or warning tape</strong> — without markers, future
                groundworks will have no warning that a buried cable exists. Route markers are a BS
                7671 requirement, not an optional extra.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized cable for voltage drop</strong> — SWA cable runs are often long.
                Voltage drop must be calculated for the full run length and verified against BS 7671
                Appendix 12 limits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Documenting SWA Installations',
    content: (
      <>
        <p>
          Every SWA cable installation must be certified with an Electrical Installation Certificate
          (EIC) or Minor Electrical Installation Works Certificate (MEIWC) as appropriate. As-fitted
          cable route drawings and cable sizing calculations should be attached or retained.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EIC certificate app
                  </SEOInternalLink>{' '}
                  to complete and issue the Electrical Installation Certificate on site. Record
                  earth loop impedance, continuity results, and the cable route description directly
                  in the app and send the PDF to the client before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete SWA installation certificates on your phone"
          description="Elec-Mate's EIC and EICR apps let you certify underground and external cable installations on site. Record test results, cable details, and route descriptions — instant PDF, no paperwork. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ArmaCableInstallationPage() {
  return (
    <GuideTemplate
      title="Armoured Cable Installation UK | SWA Cable Guide"
      description="Complete UK guide to Steel Wire Armoured (SWA) cable installation. Types, current ratings, stripping and terminating with SWA glands, underground burial depths, IP ratings, and common mistakes — fully compliant with BS 7671."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Armoured Cable Installation UK: <span className="text-yellow-400">SWA Cable Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about Steel Wire Armoured (SWA) cable — core configurations, current ratings, correct gland termination for earth continuity, underground burial depths, IP ratings, and the common mistakes that generate EICR observations."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SWA Armoured Cable Installation"
      relatedPages={relatedPages}
      ctaHeading="Certify SWA Cable Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to complete Electrical Installation Certificates on site. Record test results, cable details, and route descriptions — instant PDF export. 7-day free trial."
    />
  );
}
