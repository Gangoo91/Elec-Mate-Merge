import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Zap, ShieldCheck, FileCheck2, ClipboardCheck, Home } from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wiring Guides', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Bonding Conductors UK Guide', href: '/bonding-conductors-guide' },
];

const tocItems = [
  { id: 'what-is-bonding', label: 'What Is Bonding?' },
  { id: 'main-bonding', label: 'Main Protective Bonding' },
  { id: 'main-bonding-sizing', label: 'Main Bonding Conductor Sizing' },
  { id: 'supplementary-bonding', label: 'Supplementary Bonding in Bathrooms' },
  { id: 'supplementary-omission', label: 'When Supplementary Bonding Can Be Omitted' },
  { id: 'common-mistakes', label: 'Common Bonding Mistakes' },
  { id: 'bonding-clamps', label: 'Bonding Clamps and Connections' },
  { id: 'eicr-findings', label: 'Bonding Defects on EICRs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Main protective bonding connects all metallic services entering the building (gas, water, oil pipes) to the main earthing terminal, ensuring they are all at the same potential and preventing dangerous voltage differences between them.',
  'BS 7671:2018+A4:2026 (Reg 544.1.1) requires main bonding conductors to be at least half the csa of the earthing conductor on non-PME supplies (minimum 6mm², maximum 25mm²), or sized per Table 54.8 against the PEN conductor on PME/TN-C-S supplies — typically 10mm² for domestic PME supplies (PEN ≤35mm²), rising to 16mm² where the PEN is over 35mm² up to 50mm².',
  'Supplementary bonding in bathroom zones connects simultaneously accessible metallic parts (taps, pipework, radiators, baths, shower trays) to prevent dangerous potential differences within the bathroom.',
  'Supplementary bonding in a bathroom can be omitted only when all three conditions in Reg 701.415.2 are simultaneously met: (d) all circuits comply with automatic disconnection per Reg 411.3.2; (e) all circuits have 30mA RCD additional protection per Reg 415.1.1; and (f) all extraneous-conductive-parts are effectively connected to main protective bonding per Reg 411.3.1.2.',
  'Missing or inadequate main bonding is one of the most common C2 observations on EICRs, particularly in older properties where gas or water services have been renewed without reconnecting bonding.',
  'Bonding conductors must be labelled with the safety label "Safety Electrical Connection | ~ Do Not Remove" (Reg 514.13.1) at: (a) the connection of every earthing conductor to an earth electrode; (b) the connection of every bonding conductor to an extraneous-conductive-part; and (c) the main earthing terminal where it is separate from the main switchgear.',
];

const faqs = [
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      'Earthing and bonding are related but distinct concepts. Earthing (or protective earthing) connects exposed metallic parts of electrical equipment — the parts that could become live if a fault occurs — back to the main earthing terminal and thence to the earth, so that fault currents operate protective devices. Bonding connects together metallic services and structural elements that are not part of the electrical installation (gas pipes, water pipes, structural steelwork) to ensure they are all at the same electrical potential, preventing dangerous voltage differences between them. Both are essential for electrical safety.',
  },
  {
    question: 'What services need to be bonded in a domestic property?',
    answer:
      'BS 7671 18th Edition requires main protective bonding to be applied to all metallic services entering the building, including: the incoming gas main (bonded as close as practicable to the meter), the incoming water main (bonded as close as practicable to the meter or entry point), and oil service pipes. Structural steelwork in contact with earth, and lightning protection systems, also require main bonding. Central heating systems fed from a bonded water main do not normally require separate bonding as they are already connected via the pipework, though this should be confirmed on a case-by-case basis.',
  },
  {
    question: 'What size bonding conductor do I need?',
    answer:
      'The minimum csa of main protective bonding conductors is determined by Reg 544.1.1. On non-PME supplies (TN-S, TT), the bonding conductor must be at least half the csa of the earthing conductor, subject to a minimum of 6mm² copper. On PME/TN-C-S supplies — which is the majority of UK domestic properties — the conductor is sized against the PEN conductor using Table 54.8: PEN ≤35mm² requires 10mm²; PEN over 35mm² up to 50mm² requires 16mm². The absolute maximum required is 25mm² for copper. In practice, 10mm² is the standard for most domestic TN-C-S supplies. For supplementary bonding, the minimum is 2.5mm² if mechanically protected or 4mm² if not.',
  },
  {
    question: 'Is supplementary bonding required in bathrooms?',
    answer:
      'Supplementary bonding in bathrooms is required by BS 7671:2018+A4:2026 (Reg 701.415.2) unless all three of the following conditions are simultaneously met: (d) all final circuits of the location comply with automatic disconnection per Reg 411.3.2; (e) all final circuits have additional 30mA RCD protection per Reg 415.1.1; and (f) all extraneous-conductive-parts are effectively connected to main protective bonding per Reg 411.3.1.2. All three conditions must be satisfied — meeting only one or two is not sufficient. In practice, a new installation with an all-RCBO consumer unit will typically satisfy all three, allowing supplementary bonding to be omitted. In an older installation with any unprotected circuit, supplementary bonding of all simultaneously accessible metallic parts remains required.',
  },
  {
    question: 'Can I remove a bonding conductor if I am replacing pipework with plastic?',
    answer:
      'If metallic pipework is replaced with plastic (uPVC, CPVC, or similar), the bonding conductor connected to that pipework may no longer serve its purpose, as there is nothing conductive to bond. However, you must ensure that any remaining metallic pipework downstream (including metallic fittings, taps, radiators, and baths) remains bonded. If the replacement creates a break in a previously bonded metallic circuit, the downstream metallic parts must be bonded separately. Do not simply disconnect bonding conductors from plastic pipework without checking the downstream metalwork.',
  },
  {
    question: 'What is the most common bonding defect found on EICRs?',
    answer:
      'The most common bonding defects found on EICRs are: (1) missing main bonding — often the gas bond or water bond was never installed, or has been removed during meter replacement or plumbing works; (2) undersized bonding conductors — older properties may have 6mm² bonding where 10mm² is now required; (3) bonding connected after an appliance (e.g. after the gas meter rather than before) which means the appliance itself is not bonded; (4) broken or corroded bonding clamps; and (5) missing safety labels on bonding conductors. All of these are typically C2 observations on an EICR, making the report Unsatisfactory.',
  },
  {
    question: 'Where exactly should the gas bonding conductor be connected?',
    answer:
      "The gas main bonding conductor should be connected to the gas installation pipework as close as practicable to the gas meter, and before the first appliance or fitting. It must be connected on the consumer's side of the meter (not to the gas provider's inlet pipe). The connection must be made using an approved bonding clamp that does not damage the pipe. The conductor then runs back to the main earthing terminal (MET) at the consumer unit. The connection point must be accessible and labelled with the safety electrical connection label.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/earthing-systems-guide',
    title: 'Earthing Systems Guide',
    description: 'TN-S, TN-C-S and TT earthing systems explained with practical examples.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/rcd-types-guide',
    title: 'RCD Types UK Guide',
    description: 'RCCB, RCBO, SRCD and RCDM explained with BS 7671 requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and common defects.',
    icon: Home,
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
    id: 'what-is-bonding',
    heading: 'What Is Bonding and Why Is It Required?',
    content: (
      <>
        <p>
          Protective bonding connects metallic parts of services (gas, water, oil pipes) and
          structural elements to a common reference point — the main earthing terminal — to ensure
          they are all at the same electrical potential. Without bonding, a fault in the electrical
          installation could cause a dangerous voltage difference to appear between, for example, a
          metal bath (connected to water pipes) and a metal radiator (connected to gas pipework),
          creating a risk of electric shock to anyone touching both simultaneously.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Equipotential zone</strong> — bonding creates an equipotential zone within
                the building, where all metallic parts accessible to occupants are at the same
                potential. Even if that potential is raised above true earth during a fault, the
                absence of a potential difference between simultaneously accessible parts prevents
                current flowing through a person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Two types of bonding</strong> — BS 7671 18th Edition distinguishes between
                main protective bonding (connecting services entering the building to the main
                earthing terminal) and supplementary bonding (connecting simultaneously accessible
                metallic parts within specific locations such as bathrooms). Both serve the same
                fundamental purpose but apply in different contexts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Mandatory, not optional</strong> — bonding requirements in BS 7671 18th
                Edition are prescriptive requirements, not recommendations. Missing bonding is
                consistently recorded as a C2 (potentially dangerous) or C1 (danger present)
                observation on EICRs, depending on the specific circumstances.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'main-bonding',
    heading: 'Main Protective Bonding',
    content: (
      <>
        <p>
          Main protective bonding conductors connect all metallic services entering the building —
          gas, water, and oil pipes — to the main earthing terminal (MET) at the consumer unit. The
          bonding connection must be made as close as practicable to the point where the service
          enters the building, before any branch or appliance connection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Gas service</strong> — bond to the gas installation pipework as close as
                practicable to the gas meter, on the consumer's side of the meter. The bonding must
                be before the first fitting or appliance. Under BS 7671:2018+A4:2026, where the
                incoming metallic gas pipe has a qualifying insulating section at the point of entry
                to the building, main protective bonding to that pipe is not required (see A4:2026
                note below). Where no insulating section is present and plastic pipework gives way
                to metallic internally, bond to the first metallic section.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Water service</strong> — bond to the incoming water main as close as
                practicable to the water meter or the point of entry into the building. Where the
                incoming metallic water pipe has a qualifying insulating section at the point of
                building entry, main protective bonding is not required under A4:2026. If no
                insulating section is present, bond to the first metallic section of internal
                pipework before any branch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Oil service</strong> — bond to the oil supply pipework entering the
                building, as close as practicable to the entry point or the oil storage tank supply
                connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Route to MET</strong> — main bonding conductors run directly from each
                service connection to the main earthing terminal at the consumer unit. They should
                be installed in a way that minimises damage risk and is accessible for inspection
                and testing. Where the run crosses walls or passes through hazardous locations,
                mechanical protection should be provided.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <div>
              <p className="font-bold text-white mb-1">
                A4:2026 change — insulating section exemption
              </p>
              <p className="text-white text-sm leading-relaxed">
                BS 7671:2018+A4:2026 introduced an important change to bonding requirements: a
                metallic service pipe (gas, water, oil) that enters the building via a qualifying
                insulating section <strong>at the point of entry</strong> need not be connected to
                the main protective equipotential bonding. The insulating section breaks any
                conductive path from the external network into the building, removing the hazard
                that bonding is intended to address. This exemption applies only where the
                insulating section is genuinely at the point of building entry — if it is located
                elsewhere in the run, the bonding requirement remains. Always verify the presence
                and location of the insulating section before deciding to omit bonding, and record
                the decision on the installation certificate as required by Reg 133.1.3.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'main-bonding-sizing',
    heading: 'Main Bonding Conductor Sizing',
    content: (
      <>
        <p>
          The minimum cross-sectional area (csa) of main protective bonding conductors is governed
          by Reg 544.1.1. The rule differs depending on whether PME (TN-C-S) or non-PME earthing
          applies:
        </p>
        {/* grounded: BS 7671:2018+A4:2026 Table 54.8 (standard PDF p.209), Reg 544.1.2 — PME main bonding vs PEN csa. */}
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-1">
            Table 54.8 — PME main bonding conductor sizing
          </h3>
          <p className="text-white/60 text-xs mb-4">
            Minimum main bonding conductor vs the supply PEN (neutral) conductor — BS 7671 Reg
            544.1.2
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              Supply PEN (Cu equiv)
            </div>
            <div className="p-2 rounded bg-white/[0.08] text-center font-bold text-white">
              Min main bonding
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">≤ 35 mm²</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              10 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">
              over 35 up to 50 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              16 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">
              over 50 up to 95 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              25 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">
              over 95 up to 150 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              35 mm²
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">over 150 mm²</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              50 mm²
            </div>
          </div>
          <p className="text-white/50 text-xs mt-3">
            Most UK domestic PME supplies use a 16–25 mm² PEN, so <strong>10 mm²</strong> is the
            standard main bonding size. Non-PME (TN-S/TT): at least half the earthing-conductor csa,
            minimum 6 mm² (Reg 544.1.1).
          </p>
        </div>
        <ul className="list-disc pl-6 space-y-1 text-white my-2">
          <li>
            <strong>Non-PME supplies (TN-S, TT)</strong> — the bonding conductor must be at least
            half the csa of the earthing conductor of the installation, subject to a minimum of 6mm²
            and a maximum of 25mm² copper-equivalent (Reg 544.1.1).
          </li>
          <li>
            <strong>PME / TN-C-S supplies</strong> — the bonding conductor is selected against the
            PEN conductor of the supply using Table 54.8: PEN ≤35mm² → <strong>10mm²</strong>; PEN
            &gt;35mm² up to 50mm² → <strong>16mm²</strong>; PEN &gt;50mm² up to 95mm² → 25mm² (Reg
            544.1.2 / Table 54.8).
          </li>
        </ul>
        <p>
          Most UK domestic properties are supplied on PME (TN-C-S) with a PEN conductor of 16mm² or
          25mm², so <strong>10mm² is the standard main bonding conductor size</strong>. The 6mm²
          minimum is the absolute floor and applies only to non-PME installations with a small
          earthing conductor — where in doubt, 10mm² should always be used.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Typical domestic PME supply (PEN ≤35mm²)</strong> — a standard 100A
                single-phase domestic TN-C-S supply uses a PEN conductor of 16mm² or 25mm². Table
                54.8 (Reg 544.1.1) requires a minimum <strong>10mm²</strong> main bonding conductor
                for these supplies. This is the most common bonding conductor size for domestic
                properties in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Larger PME supplies (PEN &gt;35mm² up to 50mm²)</strong> — where the network
                PEN conductor exceeds 35mm² (common for larger commercial premises or upgraded
                domestic supplies), Table 54.8 requires <strong>16mm²</strong> main bonding
                conductors. Using 10mm² in this situation would be undersized and is typically
                flagged C2 on an EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Non-PME supplies (TN-S, TT) and the 6mm² minimum</strong> — on non-PME
                supplies the bonding conductor is sized at half the csa of the earthing conductor,
                with a floor of 6mm² copper. This applies only to TN-S or TT installations; the
                overwhelming majority of UK properties are PME (TN-C-S) and so use Table 54.8. Never
                specify 6mm² on a standard PME domestic supply: it will typically be flagged C2 on
                the next EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Older installations with 6mm²</strong> — many older properties have 6mm²
                main bonding conductors installed to a previous edition's minimum. On a standard PME
                (TN-C-S) supply, Reg 544.1.1 / Table 54.8 requires 10mm² where the PEN conductor is
                ≤35mm². A 6mm² conductor on such a supply is undersized and is commonly observed as
                a C2 during EICRs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supplementary-bonding',
    heading: 'Supplementary Bonding in Bathrooms',
    content: (
      <>
        <p>
          Supplementary protective bonding is required in bathrooms and other specified locations to
          connect all simultaneously accessible metallic parts within the location, ensuring no
          dangerous potential differences exist between them. Bathrooms are the most common location
          requiring supplementary bonding in domestic installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>What must be bonded</strong> — in a bathroom, supplementary bonding
                connects: metal baths and shower trays, exposed metallic taps and pipework, metal
                radiators and heated towel rails, and the earth terminals of all fixed electrical
                equipment within the bathroom (electric shower, extractor fan, shaver socket, towel
                rail). All parts that a person could simultaneously touch must be bonded together.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Conductor sizing</strong> — supplementary bonding conductors must be a
                minimum of 2.5mm² if mechanically protected (e.g. in conduit or under plaster) or
                4mm² if not mechanically protected. This is smaller than the main bonding conductor
                requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Zones</strong> — BS 7671 18th Edition defines zones within bathrooms (Zone
                0, 1, 2, and outside zones) based on proximity to the water source. The zone
                designation affects what electrical equipment can be installed, but supplementary
                bonding applies to all metallic parts accessible within and near the bathroom
                regardless of zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>
                  Door architraves and window frames — not extraneous-conductive-parts
                </strong>{' '}
                — Reg 701.415.2 expressly states that metallic door architraves, window frames and
                similar parts are <em>not</em> considered extraneous-conductive-parts requiring
                supplementary bonding unless they are connected to metallic structural parts of the
                building. Do not bond these items unless they are genuinely structurally connected —
                unnecessary bonding of non-extraneous parts is a common on-site error and adds cost
                without safety benefit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'supplementary-omission',
    heading: 'When Supplementary Bonding Can Be Omitted',
    content: (
      <>
        <p>
          BS 7671:2018+A4:2026 (Reg 701.415.2) allows supplementary bonding to be omitted in a
          bathroom, but only where the building already has a main protective equipotential bonding
          system in accordance with Reg 411.3.1.2 <strong>and</strong> all three of the following
          conditions are simultaneously met:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Condition (d) — automatic disconnection (Reg 411.3.2)</strong> — all final
                circuits of the location shall comply with the requirements for automatic
                disconnection according to Reg 411.3.2 (i.e. fault loop impedance Zs is within the
                limit for the protective device).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Condition (e) — 30mA RCD additional protection (Reg 415.1.1)</strong> — all
                final circuits of the location shall have additional protection by a residual
                current device with a rated residual operating current not exceeding 30mA. This
                includes not just the bathroom lighting and shower circuits, but every circuit that
                could introduce a potential difference into the bathroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Condition (f) — main equipotential bonding (Reg 411.3.1.2)</strong> — all
                extraneous-conductive-parts of the location shall be effectively connected to the
                main protective equipotential bonding. Meeting this condition requires that main
                bonding of all incoming metallic services is intact and compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>All three conditions must be met simultaneously</strong> — failure on any
                one condition means supplementary bonding is still required. In a new installation
                with an all-RCBO consumer unit where all three conditions are satisfied,
                supplementary bonding can be omitted. In an older installation with any unprotected
                circuit, supplementary bonding remains necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Main bonding still required</strong> — the omission of supplementary bonding
                does not affect the requirement for main protective bonding of incoming services
                (gas, water, oil). Main bonding is always required regardless of RCD protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Bonding Mistakes',
    content: (
      <>
        <p>
          Bonding errors are among the most frequently observed defects on EICRs. Understanding the
          common mistakes helps electricians avoid them in new work and identify them correctly
          during inspections.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Bonding after the meter</strong> — connecting the gas or water bond
                downstream of the meter means the meter body itself is not bonded. The bond must be
                applied to the consumer's pipework, typically just after the meter on the consumer's
                side.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Bonding to the wrong point</strong> — bonding the gas pipe to an earthing
                conductor in a socket circuit rather than to the main earthing terminal directly is
                incorrect. All main bonding conductors must run back to the MET at the consumer
                unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Broken continuity due to plastic inserts</strong> — plastic isolating
                sections in gas or water pipework (installed to prevent galvanic corrosion) break
                the metallic continuity of the pipe. Bonding must be applied to each section of
                metallic pipework separated by such inserts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Missing safety labels</strong> — BS 7671 Reg 514.13.1 requires a warning
                notice "Safety Electrical Connection | ~ Do Not Remove" to be securely fixed at each
                bonding connection point (and at the earthing conductor-to-electrode connection and
                at any separate main earthing terminal). Missing labels are a commonly observed FI
                (Further Investigation) item on EICRs and a C3 observation in many cases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Poor bonding clamp contact</strong> — bonding clamps that are incorrectly
                sized for the pipe diameter, poorly tightened, or applied over paint or corrosion
                may not make reliable electrical contact. The bonding continuity test will reveal
                high resistance at a defective clamp.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bonding-clamps',
    heading: 'Bonding Clamps and Connection Requirements',
    content: (
      <>
        <p>
          The quality and type of the bonding clamp is critical to reliable bonding. A poor
          connection creates high resistance in the bonding path, which defeats the purpose of the
          bonding installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Approved clamp types</strong> — bonding clamps for gas and water pipes must
                be approved BS 951 pattern clamps. They must be sized to suit the pipe diameter and
                must not damage the pipe. The clamp must make direct metal-to-metal contact with the
                pipe surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Surface preparation</strong> — paint, lacquer, or corrosion on the pipe
                surface at the clamp contact point must be removed before fitting the clamp. A poor
                surface contact is one of the most common reasons for high-resistance bonding
                connections found during EICR testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Gas safety</strong> — when fitting a bonding clamp to a gas pipe, ensure the
                work is carried out by a Gas Safe registered engineer or by an electrician working
                on the electrical bonding only (not the gas pipework itself). The clamp must not
                damage the pipe or its protective coating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Safety labelling</strong> — fit a "Safety Electrical Connection | ~ Do Not
                Remove" notice to the bonding clamp and conductor at each connection point (Reg
                514.13.1). The notice is also required at any earthing conductor-to-electrode
                connection and at the main earthing terminal if it is separate from the main
                switchgear. BS 951 clamps may incorporate the notice on the clamp itself. The label
                also alerts future workers (gas fitters, plumbers) not to disconnect the bonding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-findings',
    heading: 'Bonding Defects on EICRs — Observation Codes',
    content: (
      <>
        <p>
          Bonding defects are among the most commonly observed items on{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> for older domestic
          properties. Understanding how to classify bonding defects correctly ensures accurate and
          consistent reporting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>C2 — Missing main bonding</strong> — absent gas or water bonding conductors
                are typically C2 (potentially dangerous) as they leave metallic services at an
                indeterminate potential relative to the installation's earth. Under certain fault
                conditions, this could produce a dangerous touch voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>C2 — Undersized bonding conductors</strong> — bonding conductors below the
                minimum csa required by BS 7671 for the supply size are typically C2. The undersized
                conductor may not be capable of carrying the fault current required to operate the
                protective device within the disconnection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>C3 — Missing safety labels</strong> — absent bonding conductor labels are
                typically C3 (improvement recommended) as the lack of labels does not immediately
                create an electrical hazard but could lead to the bonding being disconnected
                inadvertently by uninformed workers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>FI — High continuity resistance</strong> — where the bonding conductor and
                clamp appear to be present but the continuity resistance measurement is high (above
                approximately 0.05 ohms), this should be recorded as FI (Further Investigation) or
                C2 depending on the resistance value and circumstances.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Testing and Certification of Bonding',
    content: (
      <>
        <p>
          Bonding continuity must be tested and recorded during both new installation commissioning
          and EICR inspections. The test verifies that a low-resistance path exists between bonded
          parts and the main earthing terminal.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <div>
                <h4 className="font-bold text-white mb-1">Record Bonding Results on Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Main bonding continuity resistance values must be recorded on the Schedule of Test
                  Results on the EIC or EICR. Typical acceptable values are below 0.05 ohms for a
                  well-installed bonding conductor. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to record bonding test results on site and generate a compliant PDF instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <div>
                <h4 className="font-bold text-white mb-1">New Installation Bonding</h4>
                <p className="text-white text-sm leading-relaxed">
                  When installing a new consumer unit, always check for and install main bonding
                  conductors to all incoming metallic services. Quote for bonding as a standard item
                  of every consumer unit replacement — the small additional cost prevents a C2
                  observation on the next EICR and ensures the installation is safe from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Main Bonding Conductor Size Guide (BS 7671)"
          description="Main and supplementary bonding conductor sizes to BS 7671: minimum cross-sectional area by earthing arrangement and supply, with a sizing table."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BondingConductorsGuidePage() {
  return (
    <GuideTemplate
      title="Bonding Conductor Sizes BS 7671: Main + Supplementary"
      description="Bonding conductor sizes for UK installs: main protective bonding (gas, water, oil) and supplementary bonding to BS 7671:2018+A4:2026 Reg 544.1.1 / Table 54.8. Worked examples."
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Bonding Conductors UK Guide:{' '}
          <span className="text-yellow-400">Main and Supplementary Bonding Explained</span>
        </>
      }
      heroSubtitle="A complete practical guide to protective bonding conductors in UK electrical installations — main bonding of gas, water and oil services, supplementary bonding in bathrooms, conductor sizing, when bonding can be omitted with RCD protection, and common bonding defects found on EICRs."
      readingTime={12}
      answerBox={{
        question: 'What size main bonding conductor do I need?',
        answer:
          'Main protective bonding conductors must be at least half the cross-sectional area of the earthing conductor, subject to a minimum of 6mm² (BS 7671 Reg 544.1.1). For a typical domestic TN-C-S (PME) supply a minimum of 10mm² is required. Supplementary bonding conductors are sized separately under Reg 544.2.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bonding Conductors"
      relatedPages={relatedPages}
      ctaHeading="Complete Bonding Tests and EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with bonding continuity recording, AI board scanning, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
