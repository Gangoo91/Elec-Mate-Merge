import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  PoundSterling,
  ShieldCheck,
  Home,
  Car,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Search,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charger Installation', href: '/ev-charger-installation' },
  { label: 'EV Charger Installation Reading', href: '/ev-charger-installation-reading' },
];

const tocItems = [
  { id: 'ev-charging-reading', label: 'EV Charging in Reading' },
  { id: 'ozev-grant', label: 'OZEV Grant — Up to £350 Off' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'costs', label: 'Installation Costs in Reading' },
  { id: 'new-builds', label: 'New-Build Properties in Reading' },
  { id: 'regulations', label: 'BS 7671 Section 722' },
  { id: 'choosing-installer', label: 'Choosing an OZEV-Approved Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Reading typically costs £800 to £1,200 all-in, including charger unit, dedicated circuit, RCD protection, and all certification under BS 7671 Section 722.',
  'The OZEV EV Chargepoint Grant provides up to £350 towards home charger installation for eligible residents in flats and rented accommodation in Reading.',
  'Reading is a major Thames Valley tech hub with high levels of EV adoption among commuters — home charging significantly reduces the cost of EV ownership versus using public chargers.',
  'New-build properties in Reading under the Building Regulations Part S (Electric Vehicle Charge Points) are required to include EV-ready infrastructure or charge points as standard from 2022 onwards.',
  'NICEIC and NAPIT registered, OZEV-approved installers provide the strongest assurance of compliance with BS 7671 Section 722 and can self-certify the work under Building Regulations Part P.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Reading?',
    answer:
      'A standard 7kW home EV charger installation in Reading costs between £800 and £1,200 all-in. This includes the charger unit, a dedicated 32A circuit from your consumer unit, RCD protection as required by BS 7671 Section 722, commissioning, and the Electrical Installation Certificate. Where you are eligible for the OZEV EV Chargepoint Grant, up to £350 is deducted from your bill by the installer, reducing your net cost to approximately £450 to £850.',
  },
  {
    question: 'What is the OZEV grant and can I get it in Reading?',
    answer:
      'The OZEV EV Chargepoint Grant provides up to £350 towards a home EV charger for eligible applicants across England, including Reading. You must own or have ordered an eligible EV or plug-in hybrid and live in a flat or rented accommodation. Homeowners in houses are no longer eligible for the residential grant (from April 2022), though the EV Infrastructure Grant for Residential Car Parks covers purpose-built flat developments. Your OZEV-approved installer applies the grant and deducts it directly from your invoice.',
  },
  {
    question: 'Do new-build properties in Reading already have EV chargers?',
    answer:
      "Under Building Regulations Part S (England), new residential buildings with associated parking, and buildings undergoing major renovation, must install EV charge points or EV-ready cable infrastructure. The regulation applies to homes with associated parking built or significantly renovated from June 2022. Many new-build estates in Reading — including those in Southcote, Earley, Woodley, and new developments along the Reading waterfront — include EV-ready spur outlets or fully installed charge points as standard. Check your new-build's specification with the developer.",
  },
  {
    question: 'How long does EV charger installation take in Reading?',
    answer:
      'A typical 7kW home charger installation in Reading takes 2 to 4 hours for a competent OZEV-approved electrician. Properties with straightforward cable routes (consumer unit close to the garage or parking space) can be completed more quickly. Older Reading properties — particularly 1930s and 1950s semis — may require longer cable runs through roof spaces and down exterior walls, extending the installation to 4 to 6 hours. If a consumer unit upgrade is also required, allow a full working day.',
  },
  {
    question: 'What earthing arrangement do Reading properties typically have?',
    answer:
      'Most Reading properties are supplied by Scottish and Southern Electricity Networks (SSEN) via a PME (Protective Multiple Earthing, TN-C-S) earthing arrangement. Under BS 7671 Regulation 722.411.4, the installer must carry out a PME earthing risk assessment before installing an EV charger. If the PME earth is assessed as unsuitable (for example, in an outdoor or detached garage location), a separate earth electrode must be installed. A competent Reading installer will carry out this assessment as part of the pre-installation survey.',
  },
  {
    question: 'Can I install a 22kW charger at my Reading home?',
    answer:
      'A 22kW charger requires a three-phase electricity supply. Whilst most Reading residential properties are supplied on a single-phase basis, some larger or commercial premises in the area have three-phase supplies. If your property has three-phase electricity, a 22kW charger is technically feasible, though most EVs cap their on-board AC charger at 7.4kW or 11kW, making 22kW home charging overkill for most vehicles. A 7kW charger is the practical and cost-effective choice for the vast majority of Reading homeowners.',
  },
  {
    question: 'Do I need planning permission for an EV charger in Reading?',
    answer:
      "In most cases, no. Home EV charger installation in Reading is permitted development, provided the unit does not protrude more than 0.2 metres from the wall. Reading has conservation areas — including parts of Caversham and the town centre — where permitted development rights may be restricted. If your property is in a conservation area or is listed, contact Reading Borough Council's planning department before commissioning an installation. Your installer can advise on whether planning is required.",
  },
  {
    question: 'What documentation should I receive after EV charger installation in Reading?',
    answer:
      "After a compliant EV charger installation in Reading you should receive: an Electrical Installation Certificate (EIC) issued under BS 7671, confirming the installation has been inspected and tested; a Building Regulations Part P completion certificate (if your installer is NICEIC or NAPIT registered, this is issued automatically — otherwise it comes from Reading Borough Council building control); OZEV grant confirmation documents (if applicable); and the charger manufacturer's warranty documentation and user instructions.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-installation-oxford',
    title: 'EV Charger Installation Oxford',
    description: 'OZEV grants, costs, and NICEIC-approved installers in Oxford.',
    icon: Car,
    category: 'Location Guide',
  },
  {
    href: '/ev-charger-installation-brighton',
    title: 'EV Charger Installation Brighton',
    description: 'Home EV charging, OZEV grants, and approved installers in Brighton & Hove.',
    icon: Car,
    category: 'Location Guide',
  },
  {
    href: '/ev-charger-installation-norwich',
    title: 'EV Charger Installation Norwich',
    description: 'Home EV charging costs, OZEV grants, and approved installers in Norwich.',
    icon: Car,
    category: 'Location Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the IET Wiring Regulations including Amendment 3:2024.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/ev-charger-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete EV installation certificates on site with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'ev-charging-reading',
    heading: 'EV Charging in Reading',
    content: (
      <>
        <p>
          Reading is one of the South East's most significant economic centres outside London, with
          a large professional and technology sector workforce. The area has seen strong growth in
          EV adoption, driven by higher-than-average household incomes, a significant daily commuter
          population (many of whom previously used the M4 corridor), and Reading Borough Council's
          commitment to achieving net zero by 2030.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reading's EV strategy</strong> — Reading Borough Council has invested in
                public EV charging infrastructure across car parks and on-street locations. The
                council's Electric Vehicle Charging Strategy supports both public charging expansion
                and home charger adoption. Home charging remains by far the most cost-effective way
                to run an EV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thames Valley commuters</strong> — many Reading residents who previously
                drove to London are switching to EVs, making home charging infrastructure essential.
                A full overnight charge at home on an EV tariff can cost as little as £3 to £5 —
                versus £20 to £40 at a public rapid charger for the same amount of energy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing types</strong> — Reading has a wide variety of housing stock
                including 1930s semis in Caversham and Earley, Victorian terraces near the town
                centre, and modern new-builds in Southcote, Green Park, and the Kennet Island
                development. Most suburban Reading properties have garages or driveways, making home
                EV charger installation straightforward.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you live in Caversham, Earley, Woodley, Tilehurst, Whitley, or the surrounding
          Berkshire villages, a home 7kW EV charger is the most practical and cost-effective
          charging solution for your electric vehicle.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV Grant — Up to £350 Off Your Reading Installation',
    content: (
      <>
        <p>
          The OZEV EV Chargepoint Grant reduces the cost of a home EV charger by up to £350 for
          eligible Reading residents. The grant is applied at the point of sale by your
          OZEV-approved installer — you never wait for a rebate.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who qualifies?</strong> — You must own or have on order an eligible EV or
                PHEV, and live in a flat or rented accommodation. The residential grant no longer
                applies to homeowners in houses. For flats and rented properties, the grant can be
                combined with an OZEV-approved smart charger to significantly reduce the upfront
                cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Reading businesses can claim up to £350
                per socket (maximum 40 sockets) for installing EV charge points at commercial
                premises through the OZEV Workplace Charging Scheme. This is particularly relevant
                for Reading's large technology and office campuses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV Infrastructure Grant for Residential Car Parks</strong> — reading flat
                developments and housing associations with shared car parks may be eligible for this
                grant, covering up to 75% of installation costs (maximum £30,000 per grant) for
                installing multiple chargers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer required</strong> — confirm your Reading installer
                is OZEV-registered before committing. Unregistered installers cannot apply the grant
                on your behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'EV Charger Installation Process in Reading',
    content: (
      <>
        <p>
          A home EV charger installation in Reading follows a consistent five-step process from
          survey to certification. Understanding what is involved helps you prepare the property and
          set realistic expectations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                1
              </span>
              <span>
                <strong>Pre-installation survey</strong> — assessment of consumer unit capacity,
                cable route, earthing arrangement (most Reading properties are on SSEN PME
                supplies), and proposed charger location. Free surveys are commonly offered by
                Reading-area OZEV-approved installers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                2
              </span>
              <span>
                <strong>PME earthing risk assessment</strong> — required under BS 7671 Regulation
                722.411.4. The installer determines whether the existing PME earth is suitable for
                the EV charger circuit or whether a supplementary earth electrode is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                3
              </span>
              <span>
                <strong>Dedicated 32A circuit installation</strong> — a new radial circuit is
                installed from the consumer unit to the charger location, protected by an
                appropriate RCBO or MCB with RCD protection per Regulation 722.531.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                4
              </span>
              <span>
                <strong>Charger installation and commissioning</strong> — the charger is
                wall-mounted, connected, and commissioned. Smart charging features are configured,
                including scheduling and any integration with your home energy tariff or solar PV
                system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                5
              </span>
              <span>
                <strong>Testing, certification, and notification</strong> — installation is tested
                per BS 7671 Chapter 61. An EIC is issued and the work is self-certified under Part P
                by your NICEIC or NAPIT registered installer. OZEV grant paperwork is submitted on
                your behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EV Charger Installation Costs in Reading (2026)',
    content: (
      <>
        <p>
          Reading EV charger installation costs are in line with South East England averages,
          reflecting the area's trade labour rates and straightforward property access in most
          suburban locations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard 7kW home installation</strong> — £800 to £1,200 all-in, including
                charger unit, dedicated circuit, RCD protection, EIC, and Part P certificate. After
                OZEV grant (where eligible): approximately £450 to £850.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garage installation</strong> — add £50 to £150 for detached garage
                installations where cabling must run underground or overhead between the house and
                garage. Conduit and weatherproof junction boxes are required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — £400 to £700 additional. 1930s and 1950s
                Reading properties often have older consumer units without adequate spare ways or
                RCD protection that require upgrading before an EV charger circuit can be installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode</strong> — £150 to £350 additional, if the PME earthing risk
                assessment determines a supplementary earth electrode is needed. More common at
                external or detached garage locations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Obtain at least two written, itemised quotes from OZEV-approved Reading installers.
          Confirm that all costs are included and that the OZEV grant deduction is shown where
          applicable.
        </p>
      </>
    ),
  },
  {
    id: 'new-builds',
    heading: 'New-Build Properties in Reading — Part S Requirements',
    content: (
      <>
        <p>
          Reading has seen substantial new-build residential development in recent years, including
          large estates at Shinfield, Arborfield Green, and the emerging new communities around the
          town. From June 2022, Building Regulations Part S requires new residential buildings with
          associated parking to include EV charge point infrastructure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New residential buildings</strong> — must include at least one EV charge
                point per dwelling with associated parking. Many Reading new-build developers
                install a 7kW smart charger as standard, or provide the cable infrastructure
                (EV-ready spur) for the homeowner to connect a charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Major renovations</strong> — buildings undergoing renovation or change of
                use (where more than 10 parking spaces are created or modified) must also comply
                with Part S. If you are undertaking a significant renovation of a Reading property
                with parking, check whether Part S applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV-ready vs fitted charger</strong> — some Reading developers supply only
                the cable infrastructure (a capped spur at the parking space) rather than a fitted
                charger. If your new-build has an EV-ready spur, you will need an OZEV-approved
                installer to connect and commission the charger of your choice — a simpler and
                cheaper installation than a full new circuit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'BS 7671 Section 722 — EV Charging Regulations',
    content: (
      <>
        <p>
          All EV charger installations in Reading must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The key regulatory requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.411.4 — PME earthing</strong> — most Reading properties
                served by SSEN are on PME (TN-C-S) supplies. A PME earthing risk assessment must be
                carried out. Where a PME earth is unsuitable, an earth electrode is required at the
                EV charger location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531.2 — RCD protection</strong> — the EV charger circuit must
                be protected by an RCD. OZEV-eligible smart chargers with integrated Type B
                equivalent DC fault detection allow the use of a Type A RCBO at the consumer unit —
                your installer will specify the correct device based on the chosen charger model.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — the EV charger must be supplied from its own
                dedicated final circuit. A 32A radial circuit protected by a Type B MCB or RCBO is
                standard for a 7kW charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — notifiable electrical work requiring
                self-certification by a NICEIC or NAPIT registered installer, or prior notification
                to Reading Borough Council building control. An EIC must be issued.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing an OZEV-Approved Installer in Reading',
    content: (
      <>
        <p>
          Reading and the surrounding Berkshire area have a good number of OZEV-approved EV charger
          installers. Use the following criteria to select a competent, properly insured contractor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV approval</strong> — verify registration at gov.uk OZEV installer
                search. Only OZEV-registered installers can apply the EVHS grant on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — provides assurance of technical
                qualifications, regular assessment, and appropriate insurance cover. Verify on the
                scheme's online register before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing competence</strong> — confirm your installer is familiar with
                the Regulation 722.411.4 PME earthing assessment. Ask whether they carry an earth
                electrode kit for installations where PME is unsuitable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written all-inclusive quote</strong> — insist on itemised costs covering
                charger unit, cable, protection devices, commissioning, EIC, Part P certification,
                and any earth electrode works. OZEV grant deduction should be shown separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Reading',
    content: (
      <>
        <p>
          Reading's affluent commuter demographic and high EV adoption rate make it an excellent
          market for OZEV-approved EV charger installers. The area's new-build activity also creates
          commercial EV installation opportunities at residential developments complying with
          Building Regulations Part S.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EV Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/ev-charger-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete the EIC and OZEV documentation on your phone before leaving the
                  Reading property. Send the certificate to your customer immediately — no paperwork
                  left for the evening.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote EV Jobs in Minutes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional, itemised EV charger quotes using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include OZEV grant deductions automatically. Win more Reading EV work by
                  responding to enquiries faster with a professional quote.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV installation business in Reading with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, instant PDF export, and professional quoting. 7-day free trial, cancel anytime."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationReadingPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Reading | Home EV Charging Reading"
      description="EV charger installation in Reading. OZEV grants up to £350, installation costs £800–£1,200 for 7kW, Building Regulations Part S for new-builds, BS 7671 Section 722 compliance, and NICEIC and NAPIT approved installers in Berkshire."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Installation Reading:{' '}
          <span className="text-yellow-400">Home EV Charging & OZEV Grants 2026</span>
        </>
      }
      heroSubtitle="Everything Reading residents need to know about home EV charger installation — OZEV grants up to £350, typical costs of £800 to £1,200 for a 7kW unit, Building Regulations Part S for new-builds, and how to find a qualified OZEV-approved installer in Berkshire."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Reading"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Installation Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, OZEV documentation, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
