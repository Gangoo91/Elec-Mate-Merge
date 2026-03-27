import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  AlertTriangle,
  Calculator,
  FileCheck2,
  ShieldCheck,
  Wrench,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Fixed vs Flexible Wiring', href: '/guides/fixed-wiring-vs-flexible-wiring-standards' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'fixed-wiring', label: 'Fixed Wiring: Types and Standards' },
  { id: 'flexible-wiring', label: 'Flexible Wiring: Cords and Cables' },
  { id: 'key-differences', label: 'Key Technical Differences' },
  { id: 'when-flexible-permitted', label: 'When Flexible Cable is Permitted' },
  { id: 'termination-inspection', label: 'Termination and Inspection Requirements' },
  { id: 'periodic-inspection', label: 'Periodic Inspection Considerations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Fixed wiring uses thermoplastic or thermosetting insulated cables (such as 6242Y twin and earth, SWA armoured cable, or singles in conduit/trunking) that are permanently installed and not intended to be moved. Fixed wiring must comply with BS 7671 in its selection, installation, and support.',
  'Flexible wiring includes flexible cords (such as 3182Y, 3093Y, or 3183Y) and flexible cables. Flexible cables use stranded conductors for durability under repeated flexing. They are used for appliances, luminaires, and equipment that must be moved or adjusted.',
  'BS 7671 Regulation 521.9.1 states that flexible cables must not be used as a substitute for fixed wiring unless expressly permitted by a specific regulation. Using flex where fixed wiring should be installed is a non-compliance.',
  'Flexible cable used in fixed installations must still comply with all BS 7671 requirements for the specific circuit: current-carrying capacity, voltage drop, mechanical protection, and earthing continuity.',
  'For EICR periodic inspection, the condition of flexible cords and their terminations is a common source of observations. Damaged sheath, inadequate strain relief, and loose connections are the most frequent defects found at flex terminations.',
];

const faqs = [
  {
    question: 'What is the difference between a flexible cord and a flexible cable?',
    answer:
      'In BS 7671 terminology, a flexible cord is a flexible cable with a cross-sectional area not exceeding 4mm² used for the supply of current to, or the interconnection of, equipment. Examples include the 3-core flex used for a table lamp (0.75mm²), the flex for a domestic appliance (1.5mm²), and the lead from a socket outlet to a portable power tool. A flexible cable is a multi-core cable with flexible stranded conductors, designed to be flexed repeatedly during use, with a cross-sectional area above 4mm² or designed for more arduous conditions — for example, the heavy duty flexible cable used to connect a portable generator or large welding equipment. Both use stranded (multi-wire) conductors, as opposed to fixed wiring which uses solid or stranded conductors optimised for fixed installation.',
  },
  {
    question: 'What BS 7671 regulations govern the use of flexible wiring?',
    answer:
      'The key BS 7671 regulations for flexible wiring include: Regulation 521.9.1 — flexible cables must not be used as a substitute for fixed wiring unless expressly permitted. Regulation 521.9.2 — where flexible wiring is used, it must comply with the requirements applicable to the circuit being supplied. Regulation 521.10.201 — flexible cables used for cooking appliances must comply with the temperature rating requirements of the cooking zone. Regulation 526.1 — all connections, including those of flexible cords, must be accessible for inspection and testing (except where designed to be maintenance-free). Regulation 526.3 — all terminations must be made using appropriate connectors, terminals, or soldered joints.',
  },
  {
    question: 'What types of fixed wiring cable are used in UK domestic installations?',
    answer:
      'The most common fixed wiring cables in UK domestic installations are: 6242Y twin and earth (PVC-insulated, PVC-sheathed, with a bare CPC) — used for ring finals, radials, lighting, and most general domestic circuits. 6181Y singles in conduit or trunking — used where the wiring must be accessible or replaceable. MICC (mineral insulated copper-clad) — high temperature-rated, fire-resistant cable used for fire alarm, emergency lighting, and high-temperature applications. SWA (steel wire armoured) — used for underground circuits, outdoor circuits, and where mechanical protection is required. For new extensions and rewires, 6242Y is the standard for domestic work; the installation method (clipped direct, in conduit, in thermal insulation) determines the derating factor to be applied.',
  },
  {
    question: 'Can flexible cable be used for a fixed lighting circuit?',
    answer:
      'Flexible cable is permitted for the final connection of luminaires (BS 7671 Regulation 559.5.1) where the luminaire is suspended from the ceiling using a ceiling rose and flexible pendant. The flexible pendant must be of a type appropriate for the weight of the luminaire and the temperature at the lamp position — heat-resisting flex (3093Y or similar) for fittings where the lamp is close to the flex entry. Flexible cable must not be used to replace fixed wiring in the ceiling void or wall — the wiring from the consumer unit to the ceiling rose must be fixed wiring (typically 1.0mm² or 1.5mm² 6241Y singles or 6242Y twin and earth). A common defect found during EICR is the use of ordinary PVC flex in ceiling voids as an extension of the lighting circuit — this is a non-compliance.',
  },
  {
    question: 'What is the current-carrying capacity of common flexible cord sizes?',
    answer:
      'The current-carrying capacity of flexible cords is given in BS 7671 Appendix 4 Table 4F4A (PVC flexible cords and cables). Common values for two-core and three-core flexible cords (70°C PVC, clipped direct): 0.5mm² — 3A; 0.75mm² — 6A; 1.0mm² — 10A; 1.5mm² — 16A; 2.5mm² — 25A; 4.0mm² — 32A. These ratings apply to flexes in open air — derating applies for grouping or for flexes in enclosures. For flexes wound on a drum or reel, BS 7671 Table 52.4 requires derating to avoid overheating from the coiled configuration. A 13A BS 1363 plug limits the maximum current on any domestic flex to 13A regardless of the flex rating — but commercial applications using different connectors can draw the full rated current of the flex.',
  },
  {
    question: 'What are the most common defects with flexible wiring found during EICR?',
    answer:
      'During EICR periodic inspection and testing, the most common flexible wiring defects are: (1) Damaged outer sheath — the outer PVC sheath is cut, cracked, or worn through, exposing the insulated conductors. Often found at the point where flex exits an appliance or passes through a cable entry grommet. Code C3 if insulation intact; C2 if conductors exposed. (2) Inadequate or absent strain relief — where the flex is not anchored at the entry to a plug or appliance, tension is transmitted to the internal terminals, causing loose connections. Code C2 when connection is insecure. (3) Incorrect flex type for the application — ordinary PVC flex used in a high-temperature location (near a boiler, in a luminaire with a close-fitting lampshade). Code C2 or C1. (4) Overlong flexible connection — using flex to permanently extend a fixed circuit rather than installing proper fixed wiring. Code C2.',
  },
  {
    question: 'Is armoured cable (SWA) fixed wiring or flexible wiring?',
    answer:
      'Steel wire armoured (SWA) cable is fixed wiring. It is not designed to be flexed during use and uses solid or stranded conductors similar to standard fixed wiring. The steel wire armour provides mechanical protection against impact and rodent damage, making SWA suitable for underground circuits, outdoor cable runs, and circuits in exposed locations. SWA cable must be terminated using appropriate SWA glands that grip the armour and provide the mechanical strength of the armour at the termination point. The steel armour of SWA must be earthed — the gland connects the armour to the earth terminal of the enclosure. SWA can be distinguished from flexible cable by its rigid, heavy construction — it cannot be bent sharply without specialised bending equipment and must be formed into smooth bends with a bend radius specified by the manufacturer.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size fixed wiring cables with BS 7671 Appendix 4 current ratings and derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates for fixed wiring installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/copper-vs-aluminium-cable',
    title: 'Copper vs Aluminium Cable Guide',
    description: 'Compare conductor materials for fixed wiring installations.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/pvc-vs-xlpe-vs-lsoh-cable',
    title: 'PVC vs XLPE vs LSOH Cable',
    description: 'Compare insulation types and temperature ratings for fixed wiring.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study cable selection, fixed wiring inspection, and flexible wiring defects for C&G 2391.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Fixed Wiring vs Flexible Wiring: Standards and Applications',
    content: (
      <>
        <p>
          Understanding the distinction between fixed wiring and flexible wiring is fundamental
          to compliant electrical installation and periodic inspection. The two categories have
          different conductor construction, different current-carrying capacity tables, different
          installation requirements, and different applications under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
        <p>
          A common source of non-compliance observed during EICR periodic inspections is the
          use of flexible cable in applications requiring fixed wiring — or the incorrect type
          of flexible cable for the application temperature or mechanical requirements. This
          guide covers the types of fixed and flexible wiring, the key technical differences,
          and the regulatory requirements for each.
        </p>
      </>
    ),
  },
  {
    id: 'fixed-wiring',
    heading: 'Fixed Wiring: Types and Standards',
    content: (
      <>
        <p>
          Fixed wiring is installed permanently and not intended to be moved. It serves the
          circuits of the electrical installation from the consumer unit to all fixed outlets,
          luminaires, and fixed equipment. Fixed wiring must be installed in accordance with
          all relevant sections of BS 7671 for the specific cable type and installation method.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Common Fixed Wiring Types (UK)</h3>
          <ul className="space-y-3 text-white text-sm">
            <li>
              <strong>6242Y twin and earth</strong> — flat twin and CPC PVC cable. Standard for domestic ring finals, radials, and lighting. Current ratings: Appendix 4 Tables 4D1A–4D5A.
            </li>
            <li>
              <strong>6181Y singles</strong> — single-core PVC cable for use in conduit or trunking. Allows replacement without disturbing the building structure.
            </li>
            <li>
              <strong>SWA armoured cable</strong> — steel wire armour provides mechanical protection. Used for underground, outdoor, and industrial circuits.
            </li>
            <li>
              <strong>MICC (mineral insulated)</strong> — copper conductors in mineral powder insulation, copper sheath. Fire-resistant, high temperature. Used for fire alarms, emergency lighting, and exposed industrial locations.
            </li>
            <li>
              <strong>XLPE/SWA/PVC armoured</strong> — XLPE-insulated armoured cable. Higher current rating than PVC/SWA for the same conductor size. Common for commercial and industrial submain cables.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flexible-wiring',
    heading: 'Flexible Wiring: Cords and Cables',
    content: (
      <>
        <p>
          Flexible cables and cords use stranded conductors — many fine wires twisted together —
          to withstand repeated flexing without conductor fracture. Fixed wiring uses larger
          strands or solid conductors optimised for installation rather than repeated movement.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">Common Flexible Cable Types (UK)</h3>
          <ul className="space-y-3 text-white text-sm">
            <li>
              <strong>3182Y / 3183Y</strong> — circular PVC flexible cord. Used for general domestic appliances. 3183Y has an additional earth conductor. Available 0.75mm² to 4.0mm².
            </li>
            <li>
              <strong>3093Y</strong> — heat-resisting PVC flexible cord. For use at higher temperatures — luminaires, cooker connections. Rated up to 85°C sheath temperature.
            </li>
            <li>
              <strong>Rubber flexible cord</strong> — vulcanised rubber insulation and sheath. Used where PVC is unsuitable: outdoor, oil-contaminated, or high-temperature environments. More durable than PVC in arduous conditions.
            </li>
            <li>
              <strong>Steel wire braided / armoured flex</strong> — flexible cable with steel wire braid for mechanical protection. Used for workshop tools and portable plant.
            </li>
          </ul>
        </div>
        <p>
          Current-carrying capacities for flexible cords are given in BS 7671 Appendix 4
          Table 4F4A (PVC insulated flexible cords) and Table 4F2A (rubber flexible cords).
          These differ from the fixed wiring tables — never apply fixed wiring current ratings
          to flexible cords.
        </p>
      </>
    ),
  },
  {
    id: 'key-differences',
    heading: 'Key Technical Differences',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 pr-4 font-bold">Property</th>
                <th className="text-left py-2 pr-4 font-bold">Fixed Wiring</th>
                <th className="text-left py-2 font-bold">Flexible Cord</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Conductor construction</td>
                <td className="py-2 pr-4">Solid or large-strand stranded</td>
                <td className="py-2">Fine-strand stranded</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">BS 7671 current rating table</td>
                <td className="py-2 pr-4">Tables 4D, 4E (Appendix 4)</td>
                <td className="py-2">Tables 4F (Appendix 4)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Intended for movement?</td>
                <td className="py-2 pr-4">No</td>
                <td className="py-2">Yes</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">CPC (earth) included?</td>
                <td className="py-2 pr-4">Yes (6242Y, SWA etc.)</td>
                <td className="py-2">Yes — 3183Y, not 3182Y</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Can substitute fixed wiring?</td>
                <td className="py-2 pr-4">N/A</td>
                <td className="py-2 text-red-400">No — Regulation 521.9.1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'when-flexible-permitted',
    heading: 'When Flexible Cable is Permitted in Fixed Installations',
    content: (
      <>
        <p>
          BS 7671 Regulation 521.9.1 prohibits flexible cables as substitutes for fixed
          wiring unless expressly permitted. Expressly permitted uses include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Luminaire flexible pendants</strong> (Regulation 559.5.1) — the final
                connection of a suspended luminaire using a ceiling rose and flexible pendant.
                The flex must be rated for the load and temperature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Final connection of appliances</strong> — the flex connecting an
                appliance to its fused connection unit or socket outlet. Must be appropriate
                flex type for the appliance power and environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Where flexibility is required during use</strong> — for equipment that
                must be moved for use (portable tools, portable appliances). The flex must be
                adequately protected against mechanical damage during movement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>In premises managed as flexible</strong> — temporary electrical
                installations at events, exhibitions, and construction sites where flexible
                wiring is appropriate for the duration of the installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'termination-inspection',
    heading: 'Termination and Inspection Requirements',
    content: (
      <>
        <p>
          BS 7671 Regulation 526.1 requires that every connection in an electrical installation
          is accessible for inspection and testing. For flexible cable terminations, the key
          inspection points are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strain relief:</strong> The flex must be anchored at the entry to
                every termination — plug, ceiling rose, fused connection unit, or appliance.
                Anchor clamps, cable grips, or approved strain relief devices must hold the
                flex sheath, not the individual conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct polarity:</strong> At a BS 1363 plug, the brown (live)
                conductor connects to the L (live) terminal; the blue (neutral) to N; the
                green/yellow (earth) to E. Reversed polarity is a Code C2 defect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sheath condition:</strong> The outer sheath must be undamaged and
                extend inside the termination enclosure — the sheath is gripped by the strain
                relief, not the insulated conductors.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-1">Common Non-Compliances at Flex Terminations</p>
              <ul className="space-y-1 text-white text-sm">
                <li>• Damaged outer sheath — Code C2 or C1 depending on extent of damage</li>
                <li>• No strain relief at plug or appliance entry — Code C2</li>
                <li>• Wrong flex type for temperature (PVC flex at high-temperature luminaire) — Code C2</li>
                <li>• Flex used as permanent fixed wiring in ceiling void — Code C2</li>
                <li>• Twin flex (no earth) where earthed flex required — Code C1</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'periodic-inspection',
    heading: 'Periodic Inspection Considerations for Flexible Wiring',
    content: (
      <>
        <p>
          During EICR periodic inspection, flexible wiring — particularly at socket outlets,
          ceiling roses, and fused connection units — is a primary source of observations.
          The visual inspection of flex terminations is carried out with the installation
          de-energised. Key checks:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>At ceiling roses: verify the correct flex is used (3-core with earth where required), adequate strain relief, and no overloading of the ceiling rose terminals.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>At fused connection units: verify the correct fuse rating for the connected flex and appliance, adequate strain relief on the flex entry, and that the flex is appropriate for the installed appliance.</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>In ceiling voids and under floors: check for flex used as an extension of fixed wiring — a common defect in older installations where a DIY extension was added using flex rather than proper fixed cable.</span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record flex defects on your EICR efficiently"
          description="Elec-Mate's EICR app includes voice-entry for observations, code C1/C2/C3 classification, photo attachment, and automatic schedule of circuits. Complete EICRs faster and generate professional PDF reports on site."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Cable Selection in Practice',
    content: (
      <>
        <p>
          The distinction between fixed and flexible wiring is examined in C&G 2357 (Electrical
          Installations) and C&G 2391 (Inspection and Testing). For periodic inspection work,
          recognising the incorrect use of flexible cable — particularly in ceiling voids, as
          extensions of ring circuits, or in high-temperature luminaires — and classifying it
          correctly on the EICR is a core competency.
        </p>
        <p>
          For installation work, always verify the cable type is appropriate for the application:
          check the current rating from the correct BS 7671 Appendix 4 table (4D/4E for fixed,
          4F for flexible), apply the correct derating factors, and use the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            Elec-Mate cable sizing calculator
          </SEOInternalLink>{' '}
          to confirm the selected cable size.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FixedVsFlexibleWiringPage() {
  return (
    <GuideTemplate
      title="Fixed Wiring vs Flexible Wiring Standards | BS 7671 UK Guide"
      description="Complete guide to fixed wiring vs flexible wiring standards for UK electricians. BS 7671 Regulation 521.9.1 requirements, current rating differences (Tables 4D vs 4F), when flexible cable is permitted, and EICR inspection of flex terminations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Wiring Standards Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Fixed Wiring vs Flexible Wiring:{' '}
          <span className="text-yellow-400">BS 7671 Standards, Current Ratings and When to Use Each</span>
        </>
      }
      heroSubtitle="BS 7671 Regulation 521.9.1 prohibits flexible cable as a substitute for fixed wiring. Fixed and flexible wiring have different current rating tables, different conductor construction, and different termination requirements. This guide covers the key differences, when flexible cable is permitted, and what to look for during EICR inspection."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Fixed vs Flexible Wiring"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Wiring Installations on Your Phone"
      ctaSubheading="Elec-Mate's cable sizing calculator applies the correct BS 7671 current rating tables for fixed and flexible wiring. EICR app for recording flex defects. 7-day free trial, cancel anytime."
    />
  );
}
