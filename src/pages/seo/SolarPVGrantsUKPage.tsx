import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Sun,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  FileCheck2,
  AlertTriangle,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-pv-system-design' },
  { label: 'Solar Panel Grants UK 2025', href: '/solar-pv-grants' },
];

const tocItems = [
  { id: 'seg', label: 'Smart Export Guarantee (SEG)' },
  { id: 'vat', label: '0% VAT on Solar Installations' },
  { id: 'eco4', label: 'ECO4 Scheme' },
  { id: 'la-flex', label: 'LA Flex Schemes' },
  { id: 'scotland', label: "Scotland's Home Energy Scotland Loan" },
  { id: 'no-fit', label: 'No Feed-in Tariff for New Installations' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Smart Export Guarantee (SEG) requires licensed energy suppliers with 150,000+ customers to pay for surplus solar electricity exported to the grid. Rates vary by supplier and tariff — currently 3–15p/kWh depending on the tariff type.',
  'Solar PV installations attract 0% VAT in the UK until at least April 2027, reduced from 5% following the 2022 Energy Security Strategy. Battery storage installed alongside solar also qualifies for 0% VAT.',
  'ECO4 (Energy Company Obligation) can fund solar PV for low-income and fuel-poor households. Eligibility is means-tested; the homeowner must receive certain qualifying benefits or have a low EPC rating (D, E, F, or G).',
  'LA Flex allows local authorities to extend ECO4 eligibility to households that do not qualify through standard benefit criteria but are in fuel poverty. Coverage and availability vary significantly by local authority.',
  'There is no Feed-in Tariff (FiT) for new solar PV installations in Great Britain. The FiT scheme closed to new applications on 1 April 2019. Systems registered before that date continue to receive FiT payments until their 20-year term ends.',
  "Home Energy Scotland offers interest-free loans of up to £15,000 for energy efficiency and renewable energy improvements, including solar PV and battery storage. Available to Scottish homeowners and landlords.",
];

const faqs = [
  {
    question: 'What is the Smart Export Guarantee and how much does it pay?',
    answer:
      'The Smart Export Guarantee (SEG) is a government-mandated scheme that requires licensed electricity suppliers with 150,000 or more domestic customers to offer at least one export tariff to small-scale renewable generators, including solar PV. There is no minimum rate set by the government — suppliers set their own rates. As of early 2025, fixed SEG rates range from approximately 3p/kWh (some major suppliers) to 15p/kWh (some specialist tariffs), with flexible/Agile tariffs paying up to 30p+ per kWh at peak times. To qualify, your system must be MCS-certified and you must have a smart meter or export meter. Apply to your energy supplier — you do not have to use the same supplier for import and export.',
  },
  {
    question: 'Does solar PV still qualify for 0% VAT in 2025?',
    answer:
      'Yes. Solar PV panels, inverters, and battery storage installed alongside solar PV qualify for 0% VAT in the UK. This was introduced by the UK government in April 2022 as part of the Energy Security Strategy and applies until at least April 2027. Battery storage installed on a standalone basis (without solar PV) attracts 20% VAT. The 0% rate applies to the supply and installation of qualifying energy-saving materials, including solar panels and batteries. Scaffolding, labour charges directly related to installation, and associated electrical work (such as consumer unit upgrades) also qualify for 0% VAT when included in a qualifying solar PV installation quote.',
  },
  {
    question: 'Who qualifies for ECO4 solar panels?',
    answer:
      'ECO4 (Energy Company Obligation 4, running until March 2026) funds energy efficiency improvements including solar PV for eligible households. To qualify through the standard route, the household must: receive a qualifying benefit (including Universal Credit, Pension Credit, Child Tax Credit, or Working Tax Credit) AND have a home rated EPC band D, E, F, or G. The works must be part of a whole-house improvement plan — solar PV may be installed alongside insulation and heating upgrades. Contact a registered ECO4 installer (most large solar companies are registered) for a free eligibility assessment. Alternatively, your local authority may be able to refer you through the LA Flex route.',
  },
  {
    question: 'What happened to the Feed-in Tariff?',
    answer:
      'The Feed-in Tariff (FiT) scheme closed to new applications on 1 April 2019. Under the FiT, solar PV owners received a generation tariff (paid for every unit generated, regardless of whether it was used or exported) and an export tariff (paid for estimated or metered exported units). Rates were guaranteed for 20 years from the date of registration. Approximately 850,000 installations remain on the FiT scheme and continue to receive payments until their term ends. If you registered before April 2019, your FiT payments continue — you do not need to switch to the SEG. New solar PV installations from April 2019 onwards can only access the SEG for export payments.',
  },
  {
    question: 'Can landlords get solar grants for rental properties?',
    answer:
      "Landlords can access ECO4 and LA Flex funding for solar PV on rental properties where the tenant meets the qualifying benefit criteria. Home Energy Scotland loans are available to landlords in Scotland. There are no specific landlord grant schemes for solar PV in England and Wales beyond the ECO4 framework. However, landlords can benefit from the 0% VAT rate on installations, and solar PV installed on rental properties may qualify for capital allowances (business landlords should seek advice from an accountant). Some local authority LA Flex schemes have extended eligibility to private rented sector properties regardless of tenant benefit status — check with your local council.",
  },
  {
    question: 'How do I apply for the Smart Export Guarantee?',
    answer:
      'Contact your chosen licensed electricity supplier (you can use any supplier offering a SEG tariff, not just your import supplier) and apply for their SEG tariff. You will need: your MCS Installation Certificate (MIC) number; the details of your system (capacity in kW, installation date); and evidence that a smart meter or export meter is installed or arranged. The supplier will verify your details against the MCS database. Processing typically takes 2–6 weeks. Once approved, export payments are made based on smart meter half-hourly export readings (for smart meter SEG) or estimated export calculations (for meters that cannot measure half-hourly export).',
  },
  {
    question: 'Is there a grant for solar panels in Scotland?',
    answer:
      "Yes. Home Energy Scotland (administered by Energy Saving Trust on behalf of the Scottish Government) offers interest-free loans of up to £15,000 for energy efficiency and renewable energy improvements. Solar PV and battery storage are eligible. The loan is available to Scottish homeowners and some landlords. There is no minimum or maximum system size, and the loan can be repaid over up to 12 years. In addition, some households in Scotland may qualify for the Warmer Homes Scotland grant scheme (for fuel-poor households) and the Area-Based Schemes (ABS) funded by local authorities. Contact Home Energy Scotland on 0808 808 2282 for an assessment.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-pv-system-design',
    title: 'Solar PV System Design',
    description: 'System sizing, string design, inverter types, DC cable sizing, and G99/G98 notification.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-battery-storage-installation',
    title: 'Solar Battery Storage Installation',
    description: 'AC-coupled vs DC-coupled storage, popular batteries, costs, and MCS requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/mcs-certification-guide',
    title: 'MCS Certification Guide',
    description: 'How to become MCS certified, costs, annual audit, and MCS 001 standard.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/solar-pv-maintenance',
    title: 'Solar Panel Maintenance',
    description: 'Annual inspection checklist, cleaning, inverter replacement, and monitoring setup.',
    icon: ClipboardCheck,
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
    id: 'seg',
    heading: 'Smart Export Guarantee (SEG)',
    content: (
      <>
        <p>
          The Smart Export Guarantee (SEG) is the current mechanism for compensating solar PV
          owners who export surplus electricity to the grid. Unlike the old Feed-in Tariff, it is
          not a government-funded subsidy — it is a mandated market mechanism requiring large
          energy suppliers to offer competitive export rates.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who must offer the SEG:</strong> All licensed electricity suppliers with
                150,000 or more domestic customers. This includes all the major UK energy suppliers.
                Smaller suppliers can offer SEG tariffs voluntarily. You can apply to any SEG
                licensee — you are not restricted to your import supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current rates (early 2025):</strong> Fixed rates range from 3–15p/kWh
                depending on the supplier. Octopus Energy's Flux and Agile tariffs offer dynamic
                rates that track wholesale prices and can pay 30p+ per kWh during peak demand
                periods. The best SEG tariffs are often available to customers who also use that
                supplier for their import tariff and have a compatible smart inverter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility:</strong> Your system must be MCS-certified with a maximum
                capacity of 5 MW. A smart meter or export meter must be installed. The system
                must use grid-compatible inverter technology with anti-islanding protection.
                There is no upper limit on how much you can export.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A typical 4 kWp UK home system generates approximately 3,500 kWh/year and exports
          roughly 40–50% (1,400–1,750 kWh) to the grid. At 10p/kWh SEG rate, this generates
          £140–£175/year in export income — in addition to the value of self-consumed solar
          electricity (avoided import cost at 24p+/kWh).
        </p>
      </>
    ),
  },
  {
    id: 'vat',
    heading: '0% VAT on Solar Installations Until 2027',
    content: (
      <>
        <p>
          One of the most significant financial incentives for solar PV in the UK is the zero
          rate of VAT on qualifying installations. This was introduced in April 2022 and
          represents a saving of 20% on what was previously a 5% VAT rate.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What qualifies at 0%:</strong> Solar PV panels, inverters (string,
                micro, hybrid), mounting systems, DC and AC wiring, battery storage installed
                alongside solar PV, monitoring systems, generation meters, and installation
                labour. Consumer unit upgrades and scaffolding included in a solar installation
                quote also qualify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>What attracts 20% VAT:</strong> Standalone battery storage installed
                without solar PV. Solar diverters installed without solar PV. Repairs to
                existing systems (though MCS-certified maintenance work on qualifying systems
                may qualify — seek specific VAT advice).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration:</strong> The 0% VAT rate applies until at least April 2027
                under current legislation. The government has indicated an intention to maintain
                the zero rate through to at least 2035 for energy efficiency measures, though
                this is subject to future budget decisions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a typical 4 kWp solar plus 10 kWh battery system costing £11,000 installed, the
          0% VAT rate compared to the pre-2022 20% rate saves the customer approximately
          £1,833. This makes the UK one of the most VAT-favourable markets for solar PV in Europe.
        </p>
      </>
    ),
  },
  {
    id: 'eco4',
    heading: 'ECO4 Scheme for Low-Income Households',
    content: (
      <>
        <p>
          ECO4 (Energy Company Obligation 4) is the fourth iteration of the government's Energy
          Company Obligation scheme, running from April 2022 to March 2026. It requires large
          energy suppliers to fund energy efficiency and renewable energy improvements for
          low-income and fuel-poor households.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard eligibility:</strong> The household must receive at least one
                qualifying benefit (Universal Credit, Pension Credit, Income Support, Working Tax
                Credit, Child Tax Credit, Housing Benefit, or certain DWP benefits) AND the
                property must have an EPC rating of D, E, F, or G.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV under ECO4:</strong> Solar PV is an eligible measure under ECO4
                but is typically only funded as part of a whole-house improvement plan. The ECO4
                rules prioritise insulation and heating measures. Solar PV is more likely to be
                funded where the property already has adequate insulation and a heat pump or
                electric heating is being installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to access ECO4:</strong> Contact a registered ECO4 installer — most
                large insulation and solar companies are registered. Alternatively, contact your
                energy supplier directly, as they are obligated to fund the scheme and will direct
                you to registered installers. The government's Simple Energy Advice website also
                provides a referral pathway.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'la-flex',
    heading: 'LA Flex Schemes',
    content: (
      <>
        <p>
          LA Flex (Local Authority Flexible Eligibility) is a mechanism within ECO4 that allows
          local authorities to declare households eligible for ECO4 funding even if they do not
          meet the standard benefit criteria. This extends the scheme's reach to households in
          fuel poverty who are not receiving qualifying benefits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility criteria:</strong> The local authority sets its own criteria,
                but typically includes households with a low income (usually defined by household
                income thresholds), those in fuel poverty, households with a member who has a
                health condition affected by cold or damp, and households in high-cost-to-heat
                properties (EPC D, E, F, or G).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage and availability:</strong> LA Flex coverage varies enormously
                by local authority. Some councils have proactively used the scheme to fund
                hundreds of installations; others have not implemented it at all. Contact your
                local council's housing or energy team to find out whether LA Flex is available
                in your area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Declaration process:</strong> If your council operates LA Flex, they
                will issue a Declaration of Eligibility that allows a registered ECO4 installer
                to proceed with funded works. The council may conduct a home assessment
                beforehand.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scotland',
    heading: "Scotland's Home Energy Scotland Loan",
    content: (
      <>
        <p>
          Scottish homeowners and landlords have access to an interest-free loan through Home
          Energy Scotland, funded by the Scottish Government and administered by the Energy
          Saving Trust. This is one of the most generous solar and energy efficiency loan
          programmes in the UK.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loan amount:</strong> Up to £15,000 as an interest-free loan for
                energy efficiency and renewable energy improvements. Solar PV and battery
                storage are both eligible. The loan can be combined with other measures (e.g.,
                insulation, heat pump) up to the maximum amount.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cashback element:</strong> In addition to the loan, some measures may
                qualify for a cashback grant element (currently up to £7,500 for some eligible
                households). Fuel-poor households may qualify for larger grant support. The
                exact terms are updated periodically — check the Home Energy Scotland website
                for current rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to apply:</strong> Call Home Energy Scotland on 0808 808 2282
                (free from landlines and most mobiles) for an initial assessment. An adviser
                will discuss your home, your current energy costs, and the best improvements
                for your situation. If solar PV is appropriate, they will confirm loan
                eligibility and refer you to MCS-certified installers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repayment:</strong> Loans are repaid over up to 12 years. There is no
                interest charge. Early repayment is permitted without penalty. The loan must be
                used within 12 months of approval and works must be completed by an MCS-certified
                installer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'no-fit',
    heading: 'No Feed-in Tariff for New Installations',
    content: (
      <>
        <p>
          Homeowners considering solar PV often ask about the Feed-in Tariff. It is important
          to be clear: the Feed-in Tariff scheme closed to new applications on 1 April 2019
          and cannot be accessed by new installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing FiT installations:</strong> The approximately 850,000 UK
                installations registered before 1 April 2019 continue to receive FiT generation
                tariff payments for the remainder of their 20-year term. If you purchased a
                property with solar panels installed before April 2019, check with the previous
                owner whether the FiT was registered and whether it transferred with the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>New installations:</strong> All solar PV systems installed from 1 April
                2019 onwards use the SEG for export payments. There is no generation tariff —
                only an export tariff based on metered or estimated export. The economics of
                solar PV remain very favourable in 2025 due to high electricity import prices,
                the 0% VAT rate, and competitive SEG tariffs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for Solar Grants and Incentives',
    content: (
      <>
        <p>
          The process for accessing solar PV grants and incentives in the UK varies by scheme.
          Here is a summary of the application process for each:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SEG:</strong> Contact your chosen supplier after installation is
                complete. Provide your MCS certificate number and smart meter details. Processing
                takes 2–6 weeks. The supplier will contact you with tariff options and start date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% VAT:</strong> No application required. Your MCS-certified installer
                applies 0% VAT automatically on the invoice for qualifying solar PV and battery
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO4/LA Flex:</strong> Contact your energy supplier or a registered ECO4
                installer. For LA Flex, contact your local council first to obtain an eligibility
                declaration. There is no direct application to a central body — the process is
                managed by registered installers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home Energy Scotland loan:</strong> Call 0808 808 2282 or apply online
                at the Home Energy Scotland website. Complete the application before commissioning
                works — retrospective applications are not accepted.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Helping Customers Access Grants',
    content: (
      <>
        <p>
          MCS-certified electricians play a central role in helping customers access solar grants
          and incentives. The MCS Installation Certificate is the key document for SEG applications,
          VAT zero-rating, and Home Energy Scotland loans. Electricians who understand the grants
          landscape can provide more complete advice and win more installations.
        </p>
        <SEOAppBridge
          title="Manage MCS solar installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Issue MCS installation certificates and EICs on your phone. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPVGrantsUKPage() {
  return (
    <GuideTemplate
      title="Solar Panel Grants UK 2025 | Funding & Incentives Guide"
      description="Complete guide to solar panel grants and incentives in the UK. Smart Export Guarantee (SEG), 0% VAT until 2027, ECO4, LA Flex schemes, Home Energy Scotland loan, and why there is no Feed-in Tariff for new installations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Grants Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Solar Panel Grants UK 2025:{' '}
          <span className="text-yellow-400">Funding & Incentives Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about solar panel grants and financial incentives in the UK — the Smart Export Guarantee, 0% VAT, ECO4, LA Flex, and the Home Energy Scotland interest-free loan."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Grants"
      relatedPages={relatedPages}
      ctaHeading="Install Solar PV with Confidence Using Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for MCS certification, quoting, and job management. Issue solar installation certificates on your phone. 7-day free trial, cancel anytime."
    />
  );
}
