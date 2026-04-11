import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Building2,
  Zap,
  FileCheck2,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'EV Charging Legislation UK', href: '/ev-charging-legislation' },
];

const tocItems = [
  { id: 'smart-charge-points-regs', label: 'Smart Charge Points Regulations 2021' },
  { id: 'building-regs-part-s', label: 'Building Regulations Part S' },
  { id: 'bs7671-section-722', label: 'BS 7671 Section 722' },
  { id: 'iet-code-of-practice', label: 'IET Code of Practice' },
  { id: 'public-charge-point-regs', label: 'Public Charge Point Regulations 2023' },
  { id: 'enforcement', label: 'Enforcement & Penalties' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) make smart functionality mandatory for all new AC charge points up to 22kW sold or installed in Great Britain from 30 June 2022.',
  'Building Regulations Part S (England) requires new non-residential buildings with more than 10 parking spaces to have at least one active charge point per 5 spaces, and cable ducting for all remaining spaces, from 15 June 2022.',
  'BS 7671:2018+A2:2022 Section 722 sets out the electrical installation requirements for EV charging installations, including earthing, protective devices, cable sizing, and testing requirements.',
  'The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition, 2023) is the authoritative installation guidance document referenced by OZEV, NICEIC, and NAPIT for EV installer certification.',
  'The Public Charge Point Regulations 2023 require publicly accessible charge points above 8kW to support contactless payment and meet 99% availability requirements — enforced by the Office for Zero Emission Vehicles.',
];

const faqs = [
  {
    question: 'What legislation governs EV charger installation in the UK?',
    answer:
      'EV charger installation in the UK is governed by multiple overlapping pieces of legislation and technical standards. The primary regulations are: the Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467), which mandate smart functionality; Building Regulations Part S (for new and renovated buildings in England); BS 7671:2018+A2:2022 Section 722, which covers the electrical installation requirements; and the IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th Edition, 2023), which provides detailed installation guidance. Public charge points must also comply with the Public Charge Point Regulations 2023.',
  },
  {
    question: 'What does Building Regulations Part S cover?',
    answer:
      'Part S of the Building Regulations (England), introduced by the Building Regulations etc. (Amendment) (England) Regulations 2021 and in force from 15 June 2022, covers EV infrastructure in new and renovated buildings. For new residential dwellings with associated parking: each dwelling must have a charge point or cable route. For new non-residential buildings with more than 10 car parking spaces: at least one active charge point per 5 spaces (minimum 7kW) and cable routes for all remaining spaces. For major renovations of non-residential buildings where the car park has more than 10 spaces, the same ratio applies. Compliance must be demonstrated to building control.',
  },
  {
    question: 'What does BS 7671 Section 722 require for EV charging?',
    answer:
      'BS 7671:2018+A2:2022 Section 722 sets out the specific requirements for electrical installations supplying EV charging equipment. Key requirements include: protective devices — circuit protection against overcurrent and fault current; earthing — earth electrode or PME earthing arrangements with specific requirements for outdoor charging; RCD protection — 30mA RCD protection for EV charging circuits; cable sizing — cables must be rated for continuous operation at the maximum charging current; labelling — the charging point and its supply circuit must be labelled; and testing — the installation must be tested and certificated in accordance with Part 6 (inspection and testing). The IET Code of Practice provides detailed guidance on meeting these requirements in practice.',
  },
  {
    question: 'Is the IET Code of Practice a legal requirement?',
    answer:
      'The IET Code of Practice for Electric Vehicle Charging Equipment Installation is not itself statutory legislation, but it is recognised by OZEV as the authoritative guidance for EV charger installation. OZEV-approved installer schemes (required for grant-funded installations) assess installers against the Code of Practice. In practice, following the Code of Practice is the standard method of demonstrating compliance with BS 7671 Section 722 and the Smart Charge Points Regulations. The 5th Edition (2023) is the current version and covers smart charging, load management, and DC charging.',
  },
  {
    question: 'What are the earthing requirements for EV charge points under BS 7671?',
    answer:
      'Earthing is a critical and frequently misunderstood aspect of EV charger installation under BS 7671 Section 722. For TN-C-S (PME) systems — the most common in the UK — a separate earth electrode must be provided for outdoor charge points or where EV charging takes place outdoors, due to the risk of elevated protective conductor potential in fault conditions. The earth electrode must achieve a resistance of 200 ohms or less (Regulation 722.411.4.1). For TN-S systems, a separate earth electrode is not required for outdoor charging but is best practice. For IT and TT systems, different arrangements apply. The IET Code of Practice Section 6 covers earthing in detail.',
  },
  {
    question: 'What are the Public Charge Point Regulations 2023?',
    answer:
      'The Public Charge Point Regulations 2023 (SI 2023/1168) apply to publicly accessible charge points above 8kW in Great Britain. Key requirements include: contactless payment — charge points must accept contactless debit and credit card payment without the need for a subscription, app, or membership; transparent pricing — price per kWh must be clearly displayed; roaming — charge points must support open roaming standards; availability — charge points must be available 99% of the time (measured annually); and reporting — operators must submit data to the National Charge Point Registry. These regulations are enforced by OZEV and the Competition and Markets Authority (CMA).',
  },
  {
    question: 'Do the Smart Charge Points Regulations apply to rapid DC chargers?',
    answer:
      'No. The Electric Vehicles (Smart Charge Points) Regulations 2021 apply only to privately-owned AC charge points up to 22kW (Mode 3 charging). They do not apply to publicly accessible rapid DC charge points (50kW+), which are covered by the Public Charge Point Regulations 2023 instead. However, DC charge points installed at private premises (e.g., fleet depots) are not subject to the Smart Charge Points Regulations either, as these regulations target the residential and workplace AC charging market.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/smart-ev-charging',
    title: 'Smart EV Charging UK',
    description: 'Smart Charge Points Regulations explained — tariffs, solar, and demand response.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/workplace-ev-charging',
    title: 'Workplace EV Charging',
    description:
      'Workplace Charging Scheme grants, load balancing, and fleet charger installation.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/ev-charger-grants',
    title: 'EV Charger Grants UK',
    description: 'EVHS and WCS grant guide — eligibility, amounts, and application process.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tethered-vs-untethered-ev-charger',
    title: 'Tethered vs Untethered EV Charger',
    description: 'Which type of charger is right for different installations — pros and cons.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/ev-charging-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete BS 7671 Section 722 certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'smart-charge-points-regs',
    heading: 'Electric Vehicles (Smart Charge Points) Regulations 2021',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) were made
          under powers in the Automated and Electric Vehicles Act 2018. They came into force on 30
          June 2022 and apply to all new privately-owned AC charge points up to 22kW sold or
          installed in Great Britain from that date.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope</strong> — applies to charge points at homes, workplaces, and private
                destinations (e.g., hotel car parks, supermarkets) that are not publicly accessible
                and are AC Mode 3 up to 22kW. Does not apply to public charge points (covered by PCP
                Regulations 2023) or DC charge points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory smart functionality</strong> — all qualifying charge points must
                support: scheduled charging, randomised startup delay (up to 10 minutes),
                demand-side response capability, energy metering and monitoring, and minimum
                cybersecurity standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Default off-peak setting</strong> — charge points must be pre-configured to
                charge during off-peak hours (midnight to 8am Monday to Friday, midnight to 11am
                Saturday and Sunday) unless the user actively changes this. This 'smart default'
                aims to shift demand away from peak grid periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement</strong> — OZEV can issue financial penalties to manufacturers
                and importers of non-compliant charge points. Electricians who install non-compliant
                charge points risk losing OZEV-approved installer status.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See our full guide to{' '}
          <SEOInternalLink href="/smart-ev-charging">smart EV charging</SEOInternalLink> for a
          detailed explanation of each smart functionality requirement and how it affects
          installation and commissioning.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs-part-s',
    heading: 'Building Regulations Part S — EV Infrastructure',
    content: (
      <>
        <p>
          Part S of Schedule 1 to the Building Regulations 2010 (England) was introduced by the
          Building Regulations etc. (Amendment) (England) Regulations 2021 (SI 2021/1392) and came
          into force on 15 June 2022. It requires EV charging infrastructure in new and certain
          renovated buildings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New residential dwellings with parking</strong> — each dwelling must have an
                EV charge point (minimum 7kW) or, where a charge point is not possible due to the
                electrical supply, a cable route (ducting) to enable future installation. This
                includes houses, flats, and houses converted into flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New non-residential buildings (more than 10 spaces)</strong> — at least one
                active charge point per 5 parking spaces (rounded down), plus cable routes for all
                remaining spaces. The charge point must be a minimum 7kW and must meet the Smart
                Charge Points Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Major renovation of non-residential buildings</strong> — where the
                renovation includes the car park or the car park has more than 10 spaces and the
                total cost of the renovation exceeds 25% of the building's value, the same charge
                point ratio applies. Buildings completed before 15 June 2022 are not retrospectively
                required to comply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Document S</strong> — the technical guidance for Part S compliance
                is set out in Approved Document S (2021 edition). It covers the minimum charge point
                specification, cable route requirements, metering, and documentation requirements
                for building control sign-off.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Wales and Scotland have separate building regulations with similar but not identical
          provisions. Northern Ireland follows the Building Regulations (Northern Ireland) 2012 (as
          amended), which currently has more limited EV infrastructure requirements.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-section-722',
    heading: 'BS 7671:2018+A2:2022 Section 722 — EV Charging Installations',
    content: (
      <>
        <p>
          Section 722 of BS 7671:2018+A2:2022 (the 18th Edition IET Wiring Regulations) sets out the
          specific electrical installation requirements for EV charging equipment. It supplements
          the general requirements of Parts 1–6 with EV-specific provisions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.411.4 — Earthing</strong> — for outdoor EV charging or where
                the charge point is in a location accessible from outdoors, and where the supply is
                TN-C-S (PME), a separate earth electrode is required. The electrode must achieve
                200Ω or less. For TN-S systems, a separate electrode is not required but is
                recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531 — Protective devices</strong> — EV charging circuits must
                be protected by an RCD with rated residual operating current not exceeding 30mA.
                Additionally, protection against DC fault currents is required, either by using a
                Type B RCD or an RCM (residual current monitor) with appropriate disconnection. Most
                dedicated EV chargers incorporate internal DC fault current protection, removing the
                need for a Type B RCD at the distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.533 — Overcurrent protection</strong> — the circuit
                protective device must be rated for the maximum continuous operating current. For a
                32A (7.4kW) charger, the circuit is typically protected by a 32A Type B or Type C
                MCB. For 40A (9.6kW, uncommon in UK), a 40A MCB is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.537 — Isolation</strong> — a means of isolation must be
                provided for the EV charging installation, capable of isolating both live conductors
                (L and N on single-phase). This is typically provided by a double-pole MCB or
                isolator at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 722 certification</strong> — EV charging installations must be
                inspected, tested, and certificated in accordance with Part 6 of BS 7671. Use the{' '}
                <SEOInternalLink href="/tools/ev-charging-certificate">
                  Elec-Mate EV charging certificate
                </SEOInternalLink>{' '}
                to complete the required documentation on site.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'iet-code-of-practice',
    heading: 'IET Code of Practice for EV Charging Equipment Installation',
    content: (
      <>
        <p>
          The IET Code of Practice for Electric Vehicle Charging Equipment Installation (5th
          Edition, 2023) is the definitive installation guidance document for UK EV charger
          installers. Published by the Institution of Engineering and Technology, it is co-sponsored
          by BEAMA, the Electrical Contractors' Association, and the Electricity Network
          Association.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Status</strong> — not statutory law, but recognised by OZEV, NICEIC, NAPIT,
                and the EV installer certification bodies as the authoritative guidance. Following
                the Code of Practice is the standard method of demonstrating competence and
                compliance with BS 7671 Section 722.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5th Edition coverage</strong> — the 2023 edition covers Mode 2 and Mode 3 AC
                charging, DC charging, smart charging requirements under the 2021 Regulations, load
                management, solar integration, energy storage, earthing arrangements for all system
                types, cable sizing, protective devices, and documentation requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV installer assessment</strong> — the OZEV-approved installer
                qualification (required for grant-funded installations) tests knowledge of the Code
                of Practice. Installers must demonstrate understanding of earthing, protective
                device selection, load management, and certification requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Purchasing the Code of Practice</strong> — the 5th Edition is available from
                the IET Shop (theiet.org) in print and digital formats. The digital edition includes
                hyperlinked cross-references and is updated between print editions when regulations
                change.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'public-charge-point-regs',
    heading: 'Public Charge Point Regulations 2023',
    content: (
      <>
        <p>
          The Public Charge Point Regulations 2023 (SI 2023/1168) set standards for publicly
          accessible EV charge points in Great Britain above 8kW. These regulations apply to
          operators of charge points accessible to the general public, including retail car parks,
          motorway service areas, and on-street charging.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contactless payment</strong> — publicly accessible charge points above 8kW
                must accept contactless payment (debit and credit card) without requiring a
                subscription, app download, or pre-registration. This ended the practice of
                network-only charging that locked out drivers without a specific RFID card.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transparent pricing</strong> — prices must be displayed clearly per kWh
                before the session starts. Session fees, connection fees, and time-based fees must
                be disclosed. Hidden fees or unclear pricing are prohibited.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Availability</strong> — operators of rapid chargers (50kW+) must maintain
                99% annual availability and publish availability data. Failure to maintain
                availability exposes operators to enforcement action by OZEV or the CMA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data reporting</strong> — operators must submit data to the National Charge
                Point Registry (NCPR), including charge point location, power rating, connector
                type, status, and pricing. This data is publicly accessible and used by navigation
                apps.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'enforcement',
    heading: 'Enforcement & Penalties',
    content: (
      <>
        <p>
          Multiple bodies have enforcement powers over different aspects of EV charging legislation.
          Understanding the enforcement landscape helps electricians and charge point operators
          avoid costly penalties.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV — Smart Charge Points Regulations</strong> — OZEV can issue civil
                penalties to manufacturers and importers of non-compliant charge points. Maximum
                penalty of £10,000 per non-compliant unit. OZEV-approved installer status can be
                revoked for repeated installation of non-compliant equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control — Part S</strong> — failure to comply with Part S during
                new construction or renovation can result in building control refusing to issue a
                completion certificate, preventing the building being occupied. Retrospective
                regularisation is possible but costly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>CMA — Public Charge Point Regulations</strong> — the Competition and Markets
                Authority enforces the Public Charge Point Regulations 2023. The CMA has powers to
                issue compliance notices and ultimately seek court orders requiring compliance.
                Financial penalties are available for continued non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authorities — planning</strong> — installing an EV charger without
                required planning permission can result in enforcement notices requiring removal.
                Listed building consent violations can result in criminal prosecution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Staying Compliant with EV Legislation',
    content: (
      <>
        <p>
          EV charging legislation is evolving rapidly. Electricians who keep their knowledge current
          and maintain OZEV-approved installer status are well-positioned to capture a growing
          market. The key obligations are straightforward: install only OZEV-approved smart
          chargers, follow BS 7671 Section 722 and the IET Code of Practice, and certify every
          installation correctly.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Certificate Every Installation Correctly
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete a BS 7671-compliant electrical installation certificate for every EV
                  charger you install. The app covers supply details, earthing arrangements,
                  protective device ratings, RCD type, insulation resistance, earth electrode
                  resistance, and all required test results — then exports a professional PDF for
                  the client and OZEV records.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Apply WCS Grants for Your Clients</h4>
                <p className="text-white text-sm leading-relaxed">
                  As an OZEV-approved installer you can apply for{' '}
                  <SEOInternalLink href="/ev-charger-grants">WCS grants</SEOInternalLink> on behalf
                  of your business clients, deducting £350 per socket from your invoice. Use the
                  Elec-Mate quoting app to show grant deductions clearly and increase your quote
                  acceptance rate.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Stay compliant with Elec-Mate EV charging certificates"
          description="Join 1,000+ UK electricians using Elec-Mate for EV charging certificates, quoting, and job management. Every installation certificated correctly, first time. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargingLegislationUKPage() {
  return (
    <GuideTemplate
      title="EV Charging Regulations UK 2025 | Laws & Standards for EV Chargers"
      description="Complete guide to EV charging legislation in the UK. Electric Vehicles (Smart Charge Points) Regulations 2021, Building Regulations Part S, BS 7671 Section 722, IET Code of Practice, and Public Charge Point Regulations 2023 — all explained for electricians and businesses."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Legislation Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          EV Charging Regulations UK 2025:{' '}
          <span className="text-yellow-400">Laws & Standards for EV Chargers</span>
        </>
      }
      heroSubtitle="The complete legal framework for EV charging in the UK — the Electric Vehicles (Smart Charge Points) Regulations 2021, Building Regulations Part S, BS 7671 Section 722, the IET Code of Practice, and the Public Charge Point Regulations 2023 — explained clearly for electricians, businesses, and property developers."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charging Regulations UK"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EV charging certificates, quoting, and job management. Stay compliant and win more work. 7-day free trial, cancel anytime."
    />
  );
}
