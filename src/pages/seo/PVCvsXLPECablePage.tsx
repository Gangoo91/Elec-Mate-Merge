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
  Flame,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'PVC vs XLPE vs LSOH Cable', href: '/guides/pvc-vs-xlpe-vs-lsoh-cable' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'pvc', label: 'PVC Cable Insulation' },
  { id: 'xlpe', label: 'XLPE Cable Insulation' },
  { id: 'lsoh', label: 'LSOH / LSZH Cable' },
  { id: 'temperature-ratings', label: 'Temperature Ratings' },
  { id: 'cpr-fire-classes', label: 'CPR Fire Classes (BS EN 50575)' },
  { id: 'when-to-use', label: 'When to Use Each Type' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'PVC (polyvinyl chloride) is the most common cable insulation in UK domestic installations. Conductor temperature rating is 70°C. PVC releases toxic hydrogen chloride gas and dense black smoke when burned.',
  'XLPE (cross-linked polyethylene) has a conductor temperature rating of 90°C, allowing higher current ratings for the same cable size compared to PVC. Used in power cables, submains, and industrial applications.',
  'LSOH (Low Smoke Zero Halogen), also written LSZH or LS0H, produces minimal smoke and no halogen gases when burned. Mandatory in public buildings, tunnels, underground railways, and locations where toxic gases in a fire would endanger evacuation.',
  'The Construction Products Regulation (CPR) requires cables fixed within buildings to be CE or UKCA marked with a reaction-to-fire classification under BS EN 50575. Classes range from Aca (best performance) to Fca (no declared performance).',
  'Selecting the wrong cable type — for example, using PVC in a location requiring LSOH, or a cable with insufficient temperature rating — is a non-compliance with BS 7671 and the CPR.',
];

const faqs = [
  {
    question: 'What does the 70°C temperature rating of PVC cable mean?',
    answer:
      'The 70°C temperature rating means the insulation on a PVC cable is designed to operate continuously with the conductor at a maximum temperature of 70°C. This temperature limit determines the current-carrying capacity given in BS 7671 Appendix 4 Tables 4D1A to 4D5A — the current values are those at which the conductor reaches but does not exceed 70°C under specified installation conditions. Exceeding the rated temperature degrades PVC insulation over time, reducing its insulating properties and eventually causing failure. Group rating factors from Table 4C1 must be applied to ensure the conductor temperature does not exceed 70°C under load.',
  },
  {
    question: 'Why does XLPE cable have a higher current rating than PVC cable of the same size?',
    answer:
      'XLPE (cross-linked polyethylene) insulation has a maximum continuous conductor operating temperature of 90°C compared to 70°C for PVC. Because the cable can operate at a higher temperature, it can carry more current for the same cross-sectional area before reaching its temperature limit. For example, a 6.0mm² copper cable in XLPE insulation (SWA, Method C) has a current rating approximately 15–25% higher than the equivalent PVC-insulated cable. This higher rating allows smaller cable sizes to be used for the same load. Current ratings for XLPE-insulated cables are given in BS 7671 Appendix 4 Tables 4E.',
  },
  {
    question: 'What is the difference between LSOH, LSZH, and LS0H cable?',
    answer:
      'LSOH (Low Smoke Zero Halogen), LSZH (Low Smoke Zero Halogen), and LS0H are all abbreviations for the same type of cable insulation — marketing and trade variations of the same designation. The cable uses a halogen-free compound (typically polyolefin-based) that, when burned, produces minimal smoke and does not release halogen gases (chlorine, bromine, fluorine). PVC contains chlorine and releases hydrogen chloride gas when burned — toxic and corrosive to equipment. LSOH cable performance is tested to IEC 60754 (halogen content and corrosivity of combustion gases) and IEC 61034 (smoke density).',
  },
  {
    question: 'When is LSOH cable required instead of PVC?',
    answer:
      'LSOH cable is required where the consequences of a fire producing toxic gases or dense smoke would be severe. Mandatory applications include: underground railways and tunnels, public buildings with high occupant density (shopping centres, hospitals, schools, airports), offshore oil and gas installations, data centres, and any installation where BS 7671 Section 422 or a client specification requires it. BS 7671 Regulation 422.3.1 requires that in locations with a risk of fire, cables must be selected to minimise fire propagation and toxic gas emission. Many local authority and NHS specifications require LSOH throughout new installations.',
  },
  {
    question: 'What are the CPR fire classes for cables and which class is required?',
    answer:
      'The Construction Products Regulation (CPR) requires cables permanently installed in buildings to be CE or UKCA marked with a reaction-to-fire classification under BS EN 50575. The classes are: Aca (highest — no contribution to fire), B1ca, B2ca, Cca, Dca, Eca, and Fca (lowest — no performance declared). The required class depends on building type and cable location. For most standard UK commercial installations, Dca-s1,d1,a1 is a common specification. Aca and B1ca are required for escape routes and high-risk areas in large public buildings.',
  },
  {
    question: 'Can PVC cable be used in high-temperature locations?',
    answer:
      'Standard PVC cable (70°C rated) must not be used in locations where the ambient temperature or proximity to heat sources will cause the conductor to exceed 70°C. In roof voids during summer, near boilers, in proximity to heating systems, or in industrial environments with elevated temperatures — cables with higher temperature ratings must be selected. XLPE-insulated cable (90°C rating) or silicone-insulated cable (150°C or 180°C for very high temperature applications) must be used. BS 7671 Regulation 522.1.1 requires cables to withstand the highest temperature likely to be encountered. The derating factor for high ambient temperature must be applied from BS 7671 Appendix 4 Table 4B.',
  },
  {
    question: 'Does the CPR apply to cables installed in existing buildings during rewires?',
    answer:
      'The CPR applies to cables placed on the UK market and permanently installed in buildings and civil engineering works. For a full rewire, new cable must comply with CPR requirements — it must be CE or UKCA marked with the appropriate reaction-to-fire classification. As a matter of best practice and to avoid liability, all new cable installed in UK buildings should be CPR-compliant. Manufacturers of standard UK wiring cable (such as 6242Y twin and earth) now CE/UKCA mark their products to Eca as the minimum class, which satisfies the requirement for most domestic and standard commercial applications.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size PVC and XLPE cables with correct current ratings and derating factors.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/copper-vs-aluminium-cable',
    title: 'Copper vs Aluminium Cable Guide',
    description: 'Compare conductor materials: current ratings, termination, and when aluminium is appropriate.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Record cable type, insulation, and CPR classification on EIC certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to BS 7671:2018+A3:2024 including cable selection requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study cable selection, temperature ratings, and fire class requirements.',
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
    heading: 'PVC vs XLPE vs LSOH Cable: Insulation Types Explained',
    content: (
      <>
        <p>
          The insulation and sheathing material of a cable determines its temperature rating,
          fire performance, and suitability for different environments. Three types dominate UK
          electrical installations: PVC (polyvinyl chloride), XLPE (cross-linked polyethylene),
          and LSOH (Low Smoke Zero Halogen). Each has distinct properties that affect where and
          how it can be used under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and the Construction Products Regulation (CPR).
        </p>
        <p>
          Cable selection is governed by BS 7671 Section 522 (selection and erection with respect
          to external influences) and Section 422 (protection against fire). Since July 2017, the
          CPR requires cables permanently installed in buildings to carry a reaction-to-fire
          classification under BS EN 50575.
        </p>
      </>
    ),
  },
  {
    id: 'pvc',
    heading: 'PVC Cable Insulation: Properties and Limitations',
    content: (
      <>
        <p>
          PVC (polyvinyl chloride) is the most widely used cable insulation in UK domestic and
          commercial installations. Standard twin and earth (6242Y), SY control cable, and most
          flexible cords use PVC insulation and sheathing.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">PVC Cable Properties</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Maximum conductor temperature: 70°C (continuous operation)</li>
            <li>• Maximum short-circuit temperature: 160°C</li>
            <li>• Current ratings: BS 7671 Appendix 4 Tables 4D1A–4D5A</li>
            <li>• Cost: lowest of the three insulation types</li>
            <li>• Fire performance: releases hydrogen chloride (HCl) gas and dense black smoke when burned</li>
            <li>• CPR class: typically Eca or Dca for standard 6242Y twin and earth cable</li>
            <li>• Minimum installation temperature: −5°C (cable becomes brittle below this)</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-1">PVC Fire Performance Warning</p>
              <p className="text-white text-sm">
                PVC releases hydrogen chloride gas when burned. HCl is toxic and highly corrosive
                — it destroys electronic equipment and is hazardous in escape routes. In locations
                where fire safety requires minimal toxic gas emission, PVC must not be used.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'xlpe',
    heading: 'XLPE Cable Insulation: Higher Temperature, Higher Rating',
    content: (
      <>
        <p>
          XLPE (cross-linked polyethylene) is produced by chemically cross-linking polyethylene
          polymer chains, dramatically improving its thermal stability. XLPE is the standard
          insulation for power cables, armoured submain cables (SWA), and medium-voltage
          distribution cables.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">XLPE Cable Properties</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Maximum conductor temperature: 90°C (continuous operation)</li>
            <li>• Maximum short-circuit temperature: 250°C</li>
            <li>• Current ratings: BS 7671 Appendix 4 Tables 4E (XLPE-specific)</li>
            <li>• Current rating approximately 15–25% higher than equivalent PVC cable</li>
            <li>• Excellent moisture and chemical resistance</li>
            <li>• Fire performance: better than PVC — base compound does not contain halogens</li>
            <li>• Common application: SWA armoured cables for submains and distribution</li>
          </ul>
        </div>
        <SEOAppBridge
          title="Size XLPE cables with correct 90°C ratings"
          description="Elec-Mate's cable sizing calculator applies the correct current rating tables for XLPE-insulated cables, with derating for grouping, ambient temperature, and installation method."
          icon={Cable}
        />
      </>
    ),
  },
  {
    id: 'lsoh',
    heading: 'LSOH / LSZH Cable: Fire-Safe, Halogen-Free',
    content: (
      <>
        <p>
          LSOH (Low Smoke Zero Halogen) cable uses a halogen-free polymer compound — typically
          a polyolefin mixture — for both insulation and sheathing. When burned, LSOH cable
          produces minimal visible smoke and does not release corrosive halogen gases. This is
          critical in enclosed public spaces where dense toxic smoke would impede evacuation.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-base mb-3">LSOH Cable Properties</h3>
          <ul className="space-y-2 text-white text-sm">
            <li>• Maximum conductor temperature: typically 70°C or 90°C depending on compound</li>
            <li>• Smoke emission: very low (tested to IEC 61034 — minimum 60% light transmission)</li>
            <li>• Halogen content: zero (tested to IEC 60754 — maximum 0.5% halogen by weight)</li>
            <li>• Fire performance: CPR class Cca or better for compliant products</li>
            <li>• Cost: higher than PVC — especially for large-CSA cables</li>
            <li>• Common applications: hospitals, schools, shopping centres, tunnels, data centres</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'temperature-ratings',
    heading: 'Temperature Ratings and Current-Carrying Capacity',
    content: (
      <>
        <p>
          The conductor temperature rating is the key factor in determining current-carrying
          capacity. Higher temperature ratings allow more current for the same cable size:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-2 pr-4 font-bold">Insulation Type</th>
                <th className="text-left py-2 pr-4 font-bold">Continuous Temp</th>
                <th className="text-left py-2 font-bold">Rating vs PVC</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">PVC</td>
                <td className="py-2 pr-4">70°C</td>
                <td className="py-2">Baseline (Tables 4D)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">XLPE / EPR</td>
                <td className="py-2 pr-4">90°C</td>
                <td className="py-2 text-green-400">~15–25% higher</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Silicone</td>
                <td className="py-2 pr-4">150–180°C</td>
                <td className="py-2 text-green-400">High-temp industrial only</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          When derating for high ambient temperature, the derating factor (BS 7671 Appendix 4
          Table 4B) differs between PVC and XLPE cables because the reference temperature and
          allowable temperature rise are different. Always use the correct column for the cable
          insulation type when applying ambient temperature derating.
        </p>
      </>
    ),
  },
  {
    id: 'cpr-fire-classes',
    heading: 'CPR Fire Classes: BS EN 50575',
    content: (
      <>
        <p>
          The Construction Products Regulation (CPR) requires cables permanently installed in
          UK buildings to be UKCA or CE marked with a reaction-to-fire classification. The
          classes under BS EN 50575:2014+A1:2016 are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span><strong>Aca</strong> — non-combustible. No contribution to fire. Concrete-encased conductors.</span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span><strong>B1ca / B2ca</strong> — very limited flame spread. Required for escape routes in high-rise and large public buildings.</span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Cca</strong> — limited flame spread. Required for fire alarm and emergency lighting cables in many applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-300 mt-0.5 shrink-0" />
              <span><strong>Dca</strong> — flame spread limited. Common specification for commercial installations. Standard LSOH cables are often Dca-s1,d1,a1.</span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-white mt-0.5 shrink-0" />
              <span><strong>Eca</strong> — minimum CPR performance. Standard PVC 6242Y twin and earth is typically Eca. Acceptable for most domestic wiring.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-use',
    heading: 'When to Use PVC, XLPE, or LSOH Cable',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Use PVC Cable For:</h3>
            <ul className="space-y-1 text-white text-sm">
              <li>• All standard domestic wiring (ring finals, radials, lighting)</li>
              <li>• Commercial wiring where no fire performance class is specified</li>
              <li>• Where cost is the primary driver</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Use XLPE Cable For:</h3>
            <ul className="space-y-1 text-white text-sm">
              <li>• Armoured submain cables (SWA) between distribution boards</li>
              <li>• High-load circuits where a smaller cable size is advantageous</li>
              <li>• Locations with elevated ambient temperatures (above 35°C)</li>
              <li>• Industrial power cables and motor feeds</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Use LSOH Cable For:</h3>
            <ul className="space-y-1 text-white text-sm">
              <li>• Public buildings (hospitals, schools, shopping centres, airports)</li>
              <li>• Tunnels, underground railways, and enclosed public spaces</li>
              <li>• Where the client or specification requires Cca, Dca or better CPR class</li>
              <li>• Fire alarm, emergency lighting, and life safety systems</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Cable Selection and CPR Compliance',
    content: (
      <>
        <p>
          Cable selection must be recorded on the EIC schedule of test results — the cable type
          and insulation material are required entries. When working on public buildings or
          commercial projects, check the specification for CPR class requirements before ordering
          cable. Installing PVC where LSOH (Cca or better) is specified is a non-compliance that
          could result in the installation failing the handover inspection.
        </p>
        <SEOAppBridge
          title="Record cable type and CPR class on your EIC"
          description="Elec-Mate's EIC certificate app captures cable type, conductor material, insulation type, and CPR classification. Generate compliant certificates on site and send to clients instantly."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PVCvsXLPECablePage() {
  return (
    <GuideTemplate
      title="PVC vs XLPE vs LSOH Cable | Temperature Ratings and CPR Classes UK"
      description="Complete guide to PVC, XLPE, and LSOH cable insulation types for UK electricians. Temperature ratings (70°C vs 90°C), BS EN 50575 CPR fire classes, when LSOH is required, and current rating differences."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cable Insulation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          PVC vs XLPE vs LSOH Cable:{' '}
          <span className="text-yellow-400">Temperature Ratings, CPR Fire Classes and When to Use Each</span>
        </>
      }
      heroSubtitle="PVC is rated to 70°C, XLPE to 90°C — giving XLPE a 15–25% higher current rating for the same cable size. LSOH is mandatory where fire-safe, halogen-free cable is required. This guide covers the differences, BS EN 50575 CPR classes, and how to specify the right cable for every application."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: PVC vs XLPE vs LSOH Cable"
      relatedPages={relatedPages}
      ctaHeading="Size Cables Correctly for Every Application"
      ctaSubheading="Elec-Mate's cable sizing calculator applies the correct current rating tables for PVC and XLPE cables, with automatic derating. 7-day free trial, cancel anytime."
    />
  );
}
