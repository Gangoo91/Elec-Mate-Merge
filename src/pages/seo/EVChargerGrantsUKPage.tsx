import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Building2,
  Home,
  FileCheck2,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'EV Charger Grants UK', href: '/ev-charger-grants' },
];

const tocItems = [
  { id: 'evhs-closed', label: 'EVHS — Closed March 2022' },
  { id: 'wcs-grant', label: 'Workplace Charging Scheme (WCS)' },
  { id: 'ev-infrastructure-grant', label: 'EV Infrastructure Grant for Carparks' },
  { id: 'vat-exemption', label: '0% VAT on Home Charger Installation' },
  { id: 'home-energy-scotland', label: 'Home Energy Scotland' },
  { id: 'homeowners-alternatives', label: 'What Homeowners Can Do Instead' },
  { id: 'approved-installer', label: 'OZEV-Approved Installer Requirement' },
  { id: 'how-to-apply', label: 'How to Apply (WCS)' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The EV Homecharge Scheme (EVHS) closed in March 2022 and is no longer available to anyone — homeowners, renters, or flat owners. Do not rely on any information referencing this grant as currently available.',
  'The Workplace Charging Scheme (WCS) is still active in 2026 — £350 per socket, up to 40 sockets (£14,000 maximum), open to businesses, charities, and public sector organisations.',
  'The EV Infrastructure Grant for Residential Carparks is available to landlords and flat owners with off-street parking, replacing the EVHS for multi-unit buildings.',
  'Residential and charity EV charger installations benefit from 0% VAT (reduced from the standard 20%), which effectively reduces installation costs — verify current HMRC guidance before quoting.',
  'Scottish homeowners can access Home Energy Scotland funding: up to £300 cashback plus a 0% interest loan of up to £7,500 for home EV charger installation.',
  'All grant-funded chargers must be on the OZEV-approved product list and must be installed by an OZEV-approved installer.',
];

const faqs = [
  {
    question: 'Is the EV Homecharge Scheme (EVHS) still available in 2026?',
    answer:
      'No. The EV Homecharge Scheme (EVHS) closed in March 2022 and is no longer available to anyone — including homeowners, renters, and flat owners. Any website or adviser telling you that you can apply for an EVHS grant is providing outdated information. The scheme was replaced by separate provisions: the EV Infrastructure Grant for Residential Carparks (for landlords and buildings with shared parking), and the Workplace Charging Scheme (for businesses). Scottish residents can access the Home Energy Scotland grant and loan scheme instead.',
  },
  {
    question: 'What EV charger support is available to homeowners in 2026?',
    answer:
      'There is no direct government grant for homeowners in England, Wales, or Northern Ireland in 2026. However, homeowners benefit from 0% VAT on EV charger installation (instead of the standard 20%), which reduces the cost of a typical 7kW charger installation. In Scotland, homeowners can apply to Home Energy Scotland for up to £300 cashback and a 0% interest loan of up to £7,500 to cover the full installation cost. For homeowners with company cars or employer EV schemes, there may also be employer-funded charging options to explore.',
  },
  {
    question: 'How much is the Workplace Charging Scheme grant?',
    answer:
      'The Workplace Charging Scheme provides a grant of £350 per charging socket, up to a maximum of 40 sockets per applicant — a total of £14,000. The grant applies per socket, so a dual-socket charger would attract two grants of £350 (£700 total). The grant is available to UK-registered businesses, charities, and public sector organisations. There is no vehicle requirement — businesses do not need to own an electric vehicle to apply. Applications are submitted by an OZEV-approved installer on the business\'s behalf.',
  },
  {
    question: 'What is the EV Infrastructure Grant for Residential Carparks?',
    answer:
      'The EV Infrastructure Grant for Residential Carparks is aimed at landlords, flat owners, and housing associations who want to install EV charging infrastructure in shared or private off-street car parks. It is designed to support multi-unit residential buildings where individual home charger installation is not practical. The grant covers up to 75% of the cost of installing the wiring infrastructure (not the chargers themselves) — up to £30,000 per grant application. This replaced some of the functionality of the old EVHS for flat owners and landlords.',
  },
  {
    question: 'Does VAT exemption apply to EV charger installation?',
    answer:
      'Yes — as of current HMRC guidance, the installation of EV charge points in residential properties and by charities is subject to 0% VAT (rather than the standard 20%). This is a meaningful saving: on a £900 installation, it saves £180 compared to paying full VAT. However, VAT rules can change, and electricians should always verify the current position with HMRC or an accountant before quoting VAT-exempt rates to customers. The 0% rate does not automatically apply to all EV-related work — it is specific to the supply and installation of charge points at qualifying premises.',
  },
  {
    question: 'What does a home EV charger installation cost without a grant?',
    answer:
      'A standard 7kW smart home EV charger installed by an OZEV-approved electrician typically costs £700–£1,200 supply and install (2026 prices, including VAT at 0% for residential). The exact cost depends on the charger brand, the distance from the consumer unit to the parking space, whether any earthing upgrades are required, and regional labour rates. While there is no government grant for most homeowners in England and Wales, the 0% VAT rate and the long-term running cost savings from smart off-peak charging (potentially saving £500–£1,000 per year versus public charging) still make home charger installation highly cost-effective.',
  },
  {
    question: 'Can an electrician claim the WCS grant on behalf of their customer?',
    answer:
      'Yes, and this is the standard process for the Workplace Charging Scheme. OZEV-approved installers apply via the OZEV online portal on behalf of the business customer. The installer receives grant authorisation, carries out the installation, and claims the grant directly from OZEV — deducting £350 per socket from the customer\'s invoice. The business pays only the net cost. Becoming an OZEV-approved installer is therefore a commercial necessity for electricians who want to offer grant-funded commercial installations.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/smart-ev-charging',
    title: 'Smart EV Charging UK',
    description: 'Smart Charge Points Regulations, off-peak tariffs, and solar PV integration.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/workplace-ev-charging',
    title: 'Workplace EV Charging',
    description: 'Workplace Charging Scheme in detail — load balancing, fleet charging, and costs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/ev-charging-legislation',
    title: 'EV Charging Legislation UK',
    description: 'Smart Charge Points Regulations 2021, Part S, BS 7671 Section 722 explained.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/ev-charger-brand-comparison',
    title: 'EV Charger Brand Comparison',
    description: 'Compare OZEV-approved chargers — Zappi, Ohme, Pod Point, Easee, and Wallbox.',
    icon: CheckCircle,
    category: 'Guide',
  },
  {
    href: '/tools/ev-charging-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete BS 7671 EV charging certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'evhs-closed',
    heading: 'EV Homecharge Scheme (EVHS) — Closed March 2022',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-2">The EVHS is no longer available</p>
              <p className="text-white">
                The EV Homecharge Scheme closed in March 2022. It is not available to homeowners,
                renters, or flat owners. Any website stating you can currently apply for an EVHS
                grant is providing outdated information. The scheme has been replaced by separate
                provisions for different property types and locations, detailed below.
              </p>
            </div>
          </div>
        </div>
        <p>
          Prior to March 2022, the EVHS provided a £350 contribution towards home charger
          installation. When the scheme closed, the government did not replace it with a
          like-for-like grant for individual homeowners in England, Wales, and Northern Ireland.
          Instead, support was redirected towards commercial charging infrastructure (via the
          Workplace Charging Scheme), shared residential car parks (via the EV Infrastructure
          Grant), and targeted regional support (via Home Energy Scotland for Scottish residents).
        </p>
        <p>
          For most homeowners in England and Wales, the primary remaining benefit is the{' '}
          <strong>0% VAT rate</strong> on residential EV charger installation — explained in the
          VAT section below.
        </p>
      </>
    ),
  },
  {
    id: 'wcs-grant',
    heading: 'Workplace Charging Scheme (WCS) — Up to £14,000 for Businesses',
    content: (
      <>
        <p>
          The Workplace Charging Scheme is the main active EV charging grant in the UK in 2026.
          It provides £350 per socket — up to 40 sockets and £14,000 per business — for the
          installation of smart EV charge points at business premises.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — UK-registered businesses, charities, and public
                sector organisations with dedicated off-street parking. No minimum or maximum
                business size. Businesses do not need to own EVs — the chargers can be for
                employees, visitors, or future fleet use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amount</strong> — £350 per socket, maximum 40 sockets per
                applicant (£14,000). A dual-socket charger counts as two sockets. Multiple
                applications from the same business at different sites are each capped at
                40 sockets per application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No vehicle requirement</strong> — unlike the old EVHS, the WCS does not
                require the business to own or have ordered an electric vehicle. This makes it
                accessible for businesses installing chargers in anticipation of future EV
                adoption by their workforce or fleet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Application process</strong> — businesses apply through an
                OZEV-approved installer via the OZEV online portal. The installer handles
                the application, installation, and grant claim. The £350 per socket is
                deducted from the customer invoice — the business pays only the net cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a 10-charger installation, the WCS grant of £3,500 can represent a significant
          reduction in total project cost. For the maximum 40 sockets, the £14,000 grant is
          available in full. See our full guide to{' '}
          <SEOInternalLink href="/workplace-ev-charging">workplace EV charging</SEOInternalLink>{' '}
          for installation specifications and load management details.
        </p>
      </>
    ),
  },
  {
    id: 'ev-infrastructure-grant',
    heading: 'EV Infrastructure Grant for Residential Carparks',
    content: (
      <>
        <p>
          For landlords, flat owners, and residential property managers, the EV Infrastructure
          Grant for Residential Carparks provides funding towards installing the electrical
          infrastructure needed to support EV charging in shared or private off-street car parks.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who it is for</strong> — landlords of residential properties with
                off-street parking, flat owners (leaseholders) in buildings with shared car parks,
                housing associations, and property management companies. It is specifically
                designed for multi-unit residential buildings where individual home charger
                installation is not practical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it covers</strong> — up to 75% of the cost of installing the
                wiring infrastructure (cable runs, distribution boards, metering) needed to
                enable EV charging. The grant covers infrastructure costs up to £30,000 per
                application. The charger units themselves are not covered by this grant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Opportunity for electricians</strong> — infrastructure grant projects
                typically involve significant electrical work: sub-mains, distribution boards,
                metering arrangements, and containment. Electricians with experience in commercial
                electrical installation and{' '}
                <SEOInternalLink href="/ev-charging-legislation">
                  the relevant technical standards
                </SEOInternalLink>{' '}
                are well-placed to quote for this work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always verify the current eligibility criteria and grant amounts directly with OZEV
          (gov.uk/ev-chargepoint-grants) before advising clients, as grant terms can change.
        </p>
      </>
    ),
  },
  {
    id: 'vat-exemption',
    heading: '0% VAT on EV Charger Installation',
    content: (
      <>
        <p>
          One of the most significant remaining benefits for homeowners and charities in 2026 is
          the 0% VAT rate on EV charger installation. Under current HMRC guidance, the supply and
          installation of EV charge points at residential properties and by charities is zero-rated
          for VAT purposes — rather than being subject to the standard 20% rate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who benefits</strong> — residential homeowners and charities having
                EV chargers installed at qualifying premises. This includes the charger unit
                and the installation labour.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical saving</strong> — on a £900 supply-and-install job, 0% VAT
                saves approximately £180 compared to paying the standard 20% rate. This
                partially offsets the loss of the EVHS £350 grant for homeowners.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always verify</strong> — VAT rules are set by HMRC and can change.
                Electricians must verify the current position with HMRC or an accountant
                before applying the 0% rate. Incorrectly zero-rating VAT can result in
                penalties and back-payments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'home-energy-scotland',
    heading: 'Home Energy Scotland — Up to £300 Cashback + £7,500 Loan',
    content: (
      <>
        <p>
          Scottish homeowners have access to dedicated EV charger support through the Home Energy
          Scotland scheme, administered by Energy Saving Trust on behalf of the Scottish Government.
          This provides both a cashback grant and a 0% interest loan.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cashback grant</strong> — up to £300 cashback towards the cost of
                purchasing and installing an EV charger at a Scottish home. The cashback is
                claimed after installation and paid directly to the homeowner.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% interest loan</strong> — up to £7,500 to cover the cost of home
                energy improvements including EV charger installation. The loan is repaid over
                a fixed term with no interest charges, making it genuinely interest-free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — Scottish homeowners (owner-occupiers) in
                properties that have reached a minimum energy efficiency threshold. Renters and
                landlords have separate schemes. Apply via the Home Energy Scotland helpline
                or website — an approved installer is required for grant claims.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify current terms</strong> — Home Energy Scotland funding is
                subject to annual budget rounds. Always confirm current cashback amounts and
                loan terms directly with Home Energy Scotland before advising Scottish
                clients, as figures can change year to year.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'homeowners-alternatives',
    heading: 'What Homeowners Can Do Instead',
    content: (
      <>
        <p>
          For most homeowners in England, Wales, and Northern Ireland, there is no direct
          government grant for EV charger installation in 2026. However, there are several
          ways to reduce costs and maximise value from a home charger installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take advantage of 0% VAT</strong> — ensure your installer is applying
                the 0% VAT rate for residential installation. This saves approximately £150–£200
                on a typical job compared to paying 20% VAT.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check employer EV schemes</strong> — many employers offer salary
                sacrifice schemes for EVs that include home charger installation as part of
                the package. Company car drivers in particular should check whether their
                employer or leasing company provides a funded charger installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use smart charging to reduce running costs</strong> — a 7kW smart
                charger on an EV-optimised tariff (such as Octopus Intelligent or OVO Beyond)
                can charge overnight at rates as low as 7p/kWh, compared to 35p–50p/kWh on
                public rapid chargers. Over a year, this can save £500–£1,200 for a typical
                driver — far exceeding the value of the old £350 EVHS grant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost context — installation is still cost-effective</strong> — a
                standard 7kW home charger installed by an OZEV-approved electrician typically
                costs £700–£1,200 supply and install (at 0% VAT). Given the running cost
                savings from smart off-peak charging, most homeowners recoup this cost within
                12–24 months compared to relying on public charging networks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scottish homeowners</strong> — apply to Home Energy Scotland for up to
                £300 cashback and a 0% interest loan of up to £7,500. This is the most
                significant remaining residential EV charger support in the UK in 2026.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'approved-installer',
    heading: 'OZEV-Approved Installer Requirement',
    content: (
      <>
        <p>
          All WCS and EV Infrastructure Grant applications must be processed through an
          OZEV-approved installer. This is not optional — grant applications submitted without
          an OZEV-approved installer will be rejected. Understanding the approval requirements
          is essential for electricians who want to offer grant-funded installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualification requirements</strong> — OZEV-approved installer status
                requires: a relevant electrical installation qualification (e.g., City and Guilds
                2365 or equivalent); current 18th Edition (BS 7671) qualification (C&G 2382);
                an EV-specific qualification assessed against the IET Code of Practice (e.g.,
                C&G 2919 or NAPIT/NICEIC EV qualification); and registration with an
                OZEV-approved scheme (NICEIC, NAPIT, or similar).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ongoing compliance</strong> — approved installers must keep their
                qualification current, install only OZEV-approved products, and submit accurate
                grant applications. OZEV audits installers periodically and can revoke approval
                for non-compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Benefits of approved status</strong> — access to WCS and EV
                Infrastructure Grant applications; competitive advantage over non-approved
                installers; access to charger manufacturer partner programmes (often with
                preferential pricing and leads); and the ability to advertise as an
                OZEV-approved installer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-apply',
    heading: 'How to Apply for the Workplace Charging Scheme',
    content: (
      <>
        <p>
          The application process for the WCS is straightforward, but requires the involvement
          of an OZEV-approved installer at every stage.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — find an OZEV-approved installer</strong> — use the OZEV
                installer finder tool at gov.uk to locate an approved installer in your area.
                Get at least two quotes. Confirm that the installer&apos;s approval is currently
                active (approval can lapse if qualifications expire).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — installer submits the application</strong> — your installer
                logs into the OZEV grant portal and submits an application on behalf of the
                business, with details of the premises and the proposed number of sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — installation carried out</strong> — once the grant voucher
                is authorised, the installer carries out the installation. The charger must
                be from the OZEV-approved product list. A BS 7671 electrical installation
                certificate must be completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — installer claims the grant</strong> — the installer submits
                the claim to OZEV with evidence of installation (photos, certificate). OZEV
                pays the grant directly to the installer, who has already deducted it from
                the customer&apos;s invoice. The business pays only the net cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Becoming an OZEV-Approved Installer',
    content: (
      <>
        <p>
          Becoming an OZEV-approved installer opens access to WCS and EV Infrastructure Grant
          applications, differentiating you from non-approved competitors. The EV installation
          market continues to grow — the number of new EV registrations in the UK reached
          over 380,000 in 2024, each representing a potential charge point installation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate Every Grant Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  OZEV grant claims require photographic evidence and an electrical installation
                  certificate. Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete the BS 7671 Section 722 certificate on site, take the required
                  photos within the app, and export everything to PDF for the grant claim —
                  all before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Show Grant Savings on Your Quotes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to present WCS quotes with the per-socket grant deduction clearly shown.
                  Business customers who see their net cost (after the WCS grant) convert at
                  a much higher rate than those who only see the gross installation price.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EV charger grant installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for EV certificates, quoting, and job management. Complete OZEV grant documentation on site. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerGrantsUKPage() {
  return (
    <GuideTemplate
      title="EV Charger Grants UK 2026 | WCS, EV Infrastructure Grant & VAT Exemption"
      description="Complete guide to EV charger grants in the UK in 2026. The EVHS closed March 2022 — find out what is still available: Workplace Charging Scheme (£350/socket, up to £14,000), EV Infrastructure Grant for Carparks, 0% VAT on residential installation, and Home Energy Scotland."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Grant Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          EV Charger Grants UK 2026:{' '}
          <span className="text-yellow-400">What Is (and Is Not) Still Available</span>
        </>
      }
      heroSubtitle="The EVHS closed in March 2022 and is no longer available. This guide covers what IS still available in 2026 — the Workplace Charging Scheme (£350/socket, up to £14,000 for businesses), the EV Infrastructure Grant for residential carparks, 0% VAT on home installations, and Home Energy Scotland for Scottish homeowners."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Grants UK"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EV certificates, quoting, and OZEV grant documentation. 7-day free trial, cancel anytime."
    />
  );
}
