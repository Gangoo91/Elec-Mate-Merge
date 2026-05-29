import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Layers,
  Zap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation Guides', href: '/guides/cable-installation' },
  { label: 'FP200 Gold Cable Guide', href: '/fp200-gold-cable-guide' },
];

const tocItems = [
  { id: 'what-is-fp200', label: 'What is FP200 Gold Cable?' },
  { id: 'temperature-and-standard', label: 'Temperature Rating and BS 7629' },
  { id: 'bs7671-requirements', label: 'BS 7671 Legal Requirements' },
  { id: 'bs5839-bs5266', label: 'BS 5839 and BS 5266 Requirements' },
  { id: 'installation-requirements', label: 'Installation Requirements' },
  { id: 'vs-micc', label: 'FP200 Gold vs MICC Cable' },
  { id: 'clip-and-support', label: 'Clipping and Support Spacing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'FP200 Gold is a fire-resistant cable compliant with BS 7629-1 / BS EN 50200, designed to maintain circuit integrity during a fire — powering fire alarm and emergency lighting systems when they are needed most.',
  'FP200 Gold has a continuous operating temperature rating of 105°C and is designed to maintain circuit integrity at 930°C for a minimum of 30 minutes (BS 7629-1 standard).',
  'BS 7671 Reg 560.8.1 requires fire-resistant wiring for safety services and lists four permitted routes — MICC, IEC 60331, BS EN 50200/BS 8434/BS 8491 cables (which FP200 Gold satisfies), and constructional protection.',
  'BS 5839-1 (fire detection and alarm systems) and BS 5266-1 (emergency lighting) both require fire-resistant cabling — FP200 Gold satisfies these requirements for most building types.',
  'Circuit integrity depends on the entire cable system. Fire-rated glands and termination enclosures are mandatory — using standard glands at entries or panels will void the fire performance of the installation.',
  'OSG Reg 7.4.1 requires — not merely recommends — that fire alarm and emergency lighting circuits are segregated from other cables and from each other, in compliance with BS 5839-1 and BS 5266-1 respectively.',
  'FP200 Gold must be installed using fire-resistant clips and fixings. Standard plastic cable clips will fail in a fire, defeating the purpose of using fire-resistant cable.',
  'Unlike MICC (mineral insulated cable), FP200 Gold uses conventional twisted conductors in an enhanced insulation system and does not require specialist crimping tools or moisture-sensitive termination kits.',
];

const faqs = [
  {
    question: 'What does FP200 Gold stand for?',
    answer:
      'FP200 Gold is a brand name for a fire-resistant cable manufactured by Prysmian (formerly Belden). "FP" stands for Fire Protection, "200" refers to the original product designation, and "Gold" denotes the premium grade of the product. It is compliant with BS 7629-1 (fire-resistant cables for fixed wiring systems) and is the most widely used fire-resistant cable in the UK for fire alarm and emergency lighting installations.',
  },
  {
    question: 'What is BS 7629 and does FP200 Gold comply with it?',
    answer:
      'BS 7629-1:2014 is the British Standard for "Specification for 300/500 V fire-resistant electric cables having low emission of smoke and corrosive gases when affected by fire." It specifies requirements for cables that must maintain circuit integrity during a fire. FP200 Gold is specifically designed and tested to comply with BS 7629-1. To pass BS 7629-1, cables are tested at 930°C flame temperature and must continue to function for at least 30 minutes. The cable must also meet low smoke and low halogen (LSOH) requirements to limit toxic gas emission during a fire.',
  },
  {
    question: 'Where is FP200 Gold cable required by BS 5839-1?',
    answer:
      'BS 5839-1:2017 (fire detection and fire alarm systems for buildings) specifies that all cables used in fire alarm systems must be either fire-resistant cables complying with BS 7629-1 (such as FP200 Gold), or mineral insulated cables. The requirement applies to all power supply cables, detector loop cables, sounder circuits, and control panel interconnects. In certain low-risk small installations, enhanced standard cables may be acceptable — but for any Type L or Type M system, fire-resistant cabling complying with BS 7629-1 is required.',
  },
  {
    question: 'Can FP200 Gold be used for emergency lighting circuits?',
    answer:
      'Yes. FP200 Gold is widely used for emergency lighting wiring circuits where maintained or non-maintained luminaires require continued power during a fire event. BS 5266-1:2016 (emergency lighting) requires fire-resistant cables for circuits feeding escape route luminaires in many building types. FP200 Gold complying with BS 7629-1 satisfies this requirement. The cable must be installed with fire-resistant fixings and routed away from other services to maintain integrity.',
  },
  {
    question: 'What is the maximum current rating of FP200 Gold cable?',
    answer:
      "Current ratings for FP200 Gold depend on the conductor size and installation method. At 70°C ambient, 1.5mm² FP200 Gold carries approximately 14A clipped direct, and 2.5mm² carries approximately 20A. However, fire-resistant cables are typically used for fire alarm and emergency lighting circuits which draw very modest currents — far below these limits. Always refer to the manufacturer's data sheet and apply BS 7671 derating factors for grouping, ambient temperature, and installation method.",
  },
  {
    question: 'Do I need special tools to install FP200 Gold cable?',
    answer:
      'FP200 Gold does not require specialist tools. It can be installed using conventional cable strippers and terminated in standard screw terminals, unlike MICC cable which requires crimping tools and moisture-sealing termination kits. However, fire-resistant cable clips (metal or approved plastic) must be used rather than standard white plastic clips, which melt in a fire and release the cable from its fixings. All metalwork associated with the installation should be earthed in the normal way.',
  },
  {
    question: 'What is the difference between FP200 Gold and standard T&E cable for fire alarms?',
    answer:
      'Standard twin and earth (T&E) cable or standard singles are not acceptable for fire alarm or emergency lighting installations requiring circuit integrity under fire conditions. Standard PVC insulation softens and melts at temperatures well below those reached in a building fire, causing the circuit to fail at the point of greatest need. FP200 Gold uses an enhanced insulation system with a glass fibre layer and mica tape that maintains circuit integrity at 930°C. It also has low smoke, low halogen (LSOH) outer sheath to reduce toxic gas emission.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/mineral-insulated-cable-guide',
    title: 'Mineral Insulated Cable (MICC) Guide',
    description: 'Pyrotenax MICC cable for extreme fire resistance — termination and applications.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/armoured-cable-installation',
    title: 'Armoured Cable (SWA) Installation',
    description: 'Steel Wire Armoured cable — types, current ratings, burial depths, and glands.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/conduit-installation-guide',
    title: 'Conduit Installation Guide',
    description: 'Steel and PVC conduit — bending, threading, and earthing for commercial work.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/cable-tray-installation',
    title: 'Cable Tray Installation',
    description: 'Commercial cable management — perforated, solid bottom, and wire mesh trays.',
    icon: Layers,
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
    id: 'what-is-fp200',
    heading: 'What is FP200 Gold Fire-Resistant Cable?',
    content: (
      <>
        <p>
          FP200 Gold is a fire-resistant electric cable manufactured by Prysmian, designed
          specifically for use in life-safety circuits that must continue to function during a fire.
          It is the UK's most widely installed fire-resistant cable for fire alarm systems,
          emergency lighting, and other circuits where circuit integrity in a fire is mandatory.
        </p>
        <p>
          Unlike standard PVC-insulated cables, which fail rapidly in a fire, FP200 Gold is
          engineered with an enhanced insulation system comprising a layer of mica tape and glass
          fibre beneath the LSOH (Low Smoke, Zero Halogen) outer sheath. This construction allows
          the cable to maintain electrical continuity even while exposed to direct flame — keeping
          fire alarm sounders operating and emergency lighting illuminated during evacuation.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit integrity under fire</strong> — designed to maintain circuit
                function at flame temperatures of 930°C for a minimum of 30 minutes per BS 7629-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low smoke, zero halogen</strong> — the outer sheath produces minimal smoke
                and no corrosive halogen gases when burning, reducing toxic risk to occupants and
                fire crews.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Easy installation</strong> — terminated with conventional tools. No
                specialist crimping equipment required, unlike MICC cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          FP200 Gold is available in single-core, 2-core, 3-core, and multi-core variants in
          conductor sizes from 1mm² to 4mm² for fire protection applications. The red outer sheath
          colour is conventional for fire alarm cabling in the UK, though cream or white sheath
          variants exist for use where red would be visually unacceptable.
        </p>
      </>
    ),
  },
  {
    id: 'temperature-and-standard',
    heading: 'Temperature Rating and BS 7629-1 Standard',
    content: (
      <>
        <p>
          FP200 Gold has a continuous operating temperature rating of 105°C — significantly higher
          than standard PVC cables rated at 70°C. More importantly, it is designed to maintain
          circuit integrity under direct fire exposure, which is the requirement tested under BS
          7629-1.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7629-1:2014 compliance</strong> — the standard specifies cable
                construction, testing methods, and performance criteria. Cables are tested at 930°C
                flame temperature whilst subjected to simultaneous water spray (simulating fire
                suppression) and mechanical shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30-minute minimum integrity</strong> — the cable must maintain circuit
                continuity for at least 30 minutes under the BS 7629-1 fire test conditions. FP200
                Gold is tested to maintain integrity beyond this minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage rating</strong> — FP200 Gold is rated at 300/500V, suitable for
                mains voltage fire alarm power supplies and low-voltage detection circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CPR classification</strong> — BS 7671 Reg 527.1.3 (A4:2026) requires that
                cables satisfy CPR reaction-to-fire requirements in addition to their electrical
                requirements. FP200 Gold carries a Cca-s1b,d1,a1 classification under the
                Construction Products Regulation (EU 305/2011 as retained in UK law). Specifiers
                should note that BS 7671 Reg 253.0 (Note) confirms that in the UK, MHCLG has not
                exercised CPR powers to set mandatory minimum reaction-to-fire performance levels
                for cables in specific applications — so the Cca-s1b,d1,a1 rating is a specification
                and CPR labelling requirement rather than a BS 7671 mandatory minimum. Project
                specifications and procurement documents should call up the required CPR class
                explicitly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Specifiers and system designers should verify that the cable selected for a project meets
          the required circuit integrity class (30, 60, or 90 minutes) and any additional
          project-specific fire engineering requirements. The 30-minute minimum of BS 7629-1 is the
          baseline — some specifications require 60 or 90 minutes.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-requirements',
    heading: 'BS 7671 Legal Requirements for Fire-Resistant Wiring',
    content: (
      <>
        <p>
          The legal obligation to use fire-resistant wiring for safety services comes from BS 7671
          Chapter 56. Reg 560.5.1 requires that safety services are capable of operating during
          mains failure and fire conditions — which means the wiring itself must maintain circuit
          integrity throughout the fire event. Reg 560.8.1 specifies the wiring systems that satisfy
          this obligation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-3">
            Reg 560.8.1 — Four Permitted Wiring Systems for Safety Services
          </p>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>(a) Mineral insulated cable</strong> — complying with BS EN 60702-1 and BS
                EN 60702-2, also tested to BS EN 60332-1-2. This is MICC/Pyrotenax cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>(b) Fire-resistant cables complying with IEC 60331-1, -2 or -3</strong> —
                the IEC circuit-integrity test series, also tested to BS EN 60332-1-2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  (c) Fire-resistant cables complying with BS EN 50200, BS 8434 or BS 8491
                </strong>{' '}
                — these are the test standards that BS 7629-1 cables such as FP200 Gold are assessed
                against. FP200 Gold satisfies this route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  (d) A wiring system maintaining the necessary fire and mechanical protection
                </strong>{' '}
                — for example, cables in concrete embedment or a fully fire-protected enclosure
                system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7629-1 is the underlying product standard for cables tested to route (c) — it is not
          itself named in Reg 560.8.1, which means IEC 60331 cables are an equally valid BS 7671
          route. The selected wiring system must also meet the requirements of the relevant code of
          practice for the application (typically BS 5839-1 for fire alarms and BS 5266-1 for
          emergency lighting). Always confirm that the specific cable selected meets the correct
          test standard for the integrity class (30, 60, or 90 minutes) required by the system
          design.
        </p>
      </>
    ),
  },
  {
    id: 'bs5839-bs5266',
    heading: 'Requirements Under BS 5839 and BS 5266',
    content: (
      <>
        <p>
          The two key standards requiring fire-resistant cabling in UK buildings are BS 5839-1 (fire
          detection and alarm systems) and BS 5266-1 (emergency lighting). Both standards are
          referenced in the Building Regulations Approved Documents and in insurers' requirements
          for commercial properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5839-1:2017 (Fire Alarm Systems)</strong> — requires that all cables in a
                fire alarm system either comply with BS 7629-1 (enhanced fire protection cables such
                as FP200 Gold) or are mineral insulated copper sheathed (MICC) cables. This
                requirement applies to detector circuits, sounder circuits, power supplies, panel
                interconnects, and all associated wiring. Cables routed through areas of high fire
                risk must be especially carefully considered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5266-1:2016 (Emergency Lighting)</strong> — requires that cables serving
                escape route luminaires and open area emergency lighting be fire-resistant in
                buildings where the loss of the circuit in a fire could compromise safe evacuation.
                FP200 Gold satisfying BS 7629-1 meets this requirement. The standard also requires
                that cable routes are designed to minimise fire exposure and that multiple circuits
                are segregated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Approved Document B</strong> — references both BS
                5839-1 and BS 5266-1 as part of fire safety requirements for new and significantly
                altered buildings. Compliance with these standards is required for Building
                Regulations sign-off on commercial, institutional, and multi-occupancy residential
                buildings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic premises, fire alarm wiring is typically low-risk and standard cable may be
          acceptable for Grade D (mains-powered with battery backup) systems. However, for Grade A
          systems or any commercial or institutional building, FP200 Gold or equivalent is required.
          Always follow the current edition of BS 5839-1 and the specific project risk assessment.
        </p>
      </>
    ),
  },
  {
    id: 'installation-requirements',
    heading: 'Installation Requirements for FP200 Gold Cable',
    content: (
      <>
        <p>
          The purpose of FP200 Gold is to maintain circuit integrity during a fire. Installation
          method is critical — a fire-resistant cable poorly installed can fail before its rated
          time due to fixings falling away or the cable being exposed to greater fire load than
          accounted for in the design.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-resistant fixings</strong> — use metal cable clips, steel saddles, or
                approved fire-resistant cable cleats. Standard white plastic cable clips melt at
                temperatures well below those in a building fire, releasing the cable. This is one
                of the most common installation errors found on fire alarm audits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support spacing</strong> — BS 5839-1 recommends support spacing in
                accordance with the cable manufacturer's data. For FP200 Gold, typical support
                spacing is 250mm horizontal and 400mm vertical on surface runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route segregation — mandatory requirement</strong> — OSG Reg 7.4.1 requires
                that fire alarm and emergency lighting circuits are separated from other cables and
                from each other. Compliance with BS 5839-1 is required for fire alarm circuit
                segregation, and compliance with BS 5266-1 for emergency lighting circuit
                segregation. This is a compliance requirement, not a best-practice recommendation.
                Failure to segregate is a notifiable defect on inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire stopping</strong> — all penetrations through fire-rated walls, floors,
                and ceilings must be fire stopped with an approved intumescent system. FP200 Gold
                must not be routed through penetrations that have not been properly fire stopped.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum bend radius</strong> — the minimum bend radius for FP200 Gold is 6×
                the overall cable diameter for fixed wiring (8× during installation). Overbending
                can damage the mica tape layer and compromise fire performance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-rated glands and termination accessories are essential</strong> — fire
                performance depends on the complete cable system, not the cable alone. Glands at
                panel entries, junction box entries, and conduit entries must be fire-rated products
                specified by the manufacturer. Using standard cable glands at these points is one of
                the most common installation failures on fire alarm audits — it voids the
                circuit-integrity rating of the cable at the point of termination.
                Manufacturer-approved fire-rated termination assemblies must be used throughout.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vs-micc',
    heading: 'FP200 Gold vs MICC Cable: Choosing the Right Cable',
    content: (
      <>
        <p>
          Both FP200 Gold and Mineral Insulated Copper Clad (MICC) cable are accepted for
          fire-resistant applications under BS 5839-1 and BS 5266-1. Each has advantages and
          disadvantages for different applications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>FP200 Gold — easier installation</strong> — stripped with conventional
                tools, terminated in standard screw terminals, jointed in standard junction boxes.
                Lower installation labour cost. No specialist equipment required. Better suited to
                most fire alarm and emergency lighting installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MICC — greater fire resistance</strong> — mineral insulated cable can
                withstand significantly higher temperatures and longer fire exposure times than
                FP200 Gold. MICC is preferred for high-risk environments, power circuits in extreme
                conditions, and installations requiring 90-minute or greater circuit integrity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost comparison</strong> — FP200 Gold is significantly cheaper per metre
                than MICC cable. MICC termination kits are expensive and require specialist tools.
                For standard fire alarm and emergency lighting circuits, FP200 Gold is the
                cost-effective choice. MICC is reserved for applications where its superior
                performance is genuinely required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexibility</strong> — FP200 Gold is more flexible than MICC cable and
                easier to route in congested ceiling voids and riser ducts. MICC is stiffer and
                requires a bending former for larger sizes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most standard fire alarm and emergency lighting projects in commercial and residential
          buildings, FP200 Gold is the preferred choice. MICC is specified where extreme fire
          conditions are expected, such as generator room wiring, tunnel lighting, or power circuits
          in petrochemical facilities. See the{' '}
          <SEOInternalLink href="/mineral-insulated-cable-guide">MICC cable guide</SEOInternalLink>{' '}
          for full details on mineral insulated cable installation.
        </p>
      </>
    ),
  },
  {
    id: 'clip-and-support',
    heading: 'Clipping and Support Spacing for FP200 Gold',
    content: (
      <>
        <p>
          Correct clipping is essential for FP200 Gold installations. The clips must hold the cable
          in position throughout the duration of the fire so that the cable does not fall away from
          its intended route and expose unprotected lengths to the fire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Horizontal runs</strong> — clip at maximum 250mm centres for 1.5mm² and
                2.5mm² cable. Larger cables may allow slightly greater spacing — refer to the
                Prysmian FP200 Gold installation guide.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vertical runs</strong> — clip at maximum 400mm centres. Gravity loading on a
                vertical run during a fire is greater than on a horizontal run, so vertical clips
                must grip the cable firmly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved clip types</strong> — Prysmian's own FP200 Gold metal clips (red
                and white) are specifically tested and rated for use with FP200 Gold. Third-party
                metal clips and steel saddles are acceptable provided they are rated for the fire
                conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not acceptable</strong> — standard oval or round white PVC cable clips,
                nylon cable ties used as the sole fixing, and self-adhesive cable clips are all
                unacceptable for FP200 Gold and will fail in a fire.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Certifying Fire Alarm Wiring',
    content: (
      <>
        <p>
          Fire alarm and emergency lighting installations must be certified by a competent person
          familiar with BS 5839-1 and BS 5266-1. The certification must include evidence that
          fire-resistant cable complying with BS 7629-1 (or another BS 7671 Reg 560.8.1 permitted
          route) has been used and that fixings and glands are fire-rated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-2">
            Testing: BS 7671 IR test regime does not fully apply to fire alarm circuits
          </p>
          <p className="text-white text-sm leading-relaxed">
            BS 7671 Reg 643.3.2 Note states that more specific testing requirements apply to fire
            detection and alarm system wiring — see BS 5839-1. The standard 500 V DC insulation
            resistance test regime in Table 64 is not a substitute for the commissioning tests
            required by BS 5839-1. Where stationary secondary batteries form part of the
            installation (e.g., emergency lighting battery packs or fire alarm panel batteries), Reg
            560.11 requires that Chapter 57 (Stationary Secondary Batteries) is also complied with,
            and certificates should reference this compliance.
          </p>
        </div>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue Fire Alarm Certificates on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to complete and issue electrical certificates for fire alarm and emergency
                  lighting installations on site. Record cable types, fixing methods, test results,
                  and BS 5839-1 compliance details — generate the PDF before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify fire alarm wiring installations on your phone"
          description="Elec-Mate's certificate app lets you complete EICs and fire alarm installation certificates on site."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FP200GoldCableGuidePage() {
  return (
    <GuideTemplate
      title="FP200 / BS 7629-1 Cable: Installation Guide (Fire Alarm)"
      description="FP200 Gold + BS 7629-1 cable for fire alarms + emergency lighting: 105°C rating, clipping intervals, glanding, 1.5mm² / 2.5mm² / 6mm² selection, BS 5839 install."
      datePublished="2026-03-27"
      dateModified="2026-05-23"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          FP200 Gold Fire Resistant Cable:{' '}
          <span className="text-yellow-400">UK Installation Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about FP200 Gold fire-resistant cable — BS 7629-1 compliance, 105°C temperature rating, correct clipping and support, BS 5839 and BS 5266 requirements, and how it compares to mineral insulated cable."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About FP200 Gold Fire-Resistant Cable"
      relatedPages={relatedPages}
      ctaHeading="Complete Fire Alarm Installation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate to certify fire alarm and emergency lighting installations on site. Record cable types, test results, and BS 5839-1 compliance — instant PDF export. 7-day free trial."
    />
  );
}
