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
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charger Installation', href: '/ev-charger-installation' },
  { label: 'EV Charger Installation Brighton', href: '/ev-charger-installation-brighton' },
];

const tocItems = [
  { id: 'ev-charging-brighton', label: 'EV Charging in Brighton & Hove' },
  { id: 'ozev-grant', label: 'OZEV Grant — Up to £350 Off' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'costs', label: 'Installation Costs in Brighton' },
  { id: 'terraced-houses', label: 'Terraced Houses Without Driveways' },
  { id: 'regulations', label: 'BS 7671 Section 722' },
  { id: 'choosing-installer', label: 'Choosing an OZEV-Approved Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Brighton & Hove typically costs £800 to £1,200 all-in, including the charger unit, dedicated circuit, RCD protection, and all certification.',
  'The OZEV EV Chargepoint Grant provides up to £350 towards home charger installation for eligible residents — primarily those in flats and rented accommodation.',
  "Brighton & Hove has one of the highest concentrations of EVs per capita in the South East, driven by the city's sustainability commitments and significant student and professional populations.",
  'All EV charger installations must comply with BS 7671:2018+A3:2024 Section 722, which requires a dedicated circuit, appropriate RCD protection (Regulation 722.531.2), and a PME earthing risk assessment (Regulation 722.411.4).',
  'Many Brighton properties are Victorian terraced houses without driveways — options include communal chargers for residential blocks and lamppost chargers managed by Brighton & Hove City Council.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Brighton?',
    answer:
      'A standard 7kW home EV charger installation in Brighton costs between £800 and £1,200 all-in. This covers the charger unit, a new dedicated 32A circuit from your consumer unit, RCD protection as required by BS 7671 Section 722, commissioning, and the Electrical Installation Certificate. If you are eligible for the OZEV EV Chargepoint Grant, the cost is reduced by up to £350, bringing your net cost to as low as £450 to £850.',
  },
  {
    question: 'Can I get an EV charger if I live in a Brighton flat?',
    answer:
      'Yes, if your flat has a designated parking space with access to electrical infrastructure. Residents of purpose-built flats in Brighton may be eligible for the EV Infrastructure Grant for Residential Car Parks (separate from the residential OZEV grant), which covers up to 75% of the cost of installing chargers across a car park, up to £30,000 per grant recipient. Individual flat owners may also be eligible for the standard OZEV EV Chargepoint Grant (up to £350) if they use an OZEV-approved installer and have an allocated parking space.',
  },
  {
    question: 'I live in a Brighton terraced house without a driveway — what are my options?',
    answer:
      "Brighton & Hove has a large number of Victorian terraced houses without off-street parking, which makes home EV charging more challenging. Options include: (1) Brighton & Hove City Council's lamp column charging scheme, which installs charge points on existing street lighting columns — contact the council about availability on your street; (2) community charging hubs being developed in car parks across the city; (3) public rapid chargers at Regency Square car park and other council-managed sites. If you have a garage but it is detached, an EV charger can be installed there with an appropriately designed outdoor circuit.",
  },
  {
    question: 'What are the BS 7671 requirements for EV charger installation in Brighton?',
    answer:
      'EV charger installations in Brighton must comply with BS 7671:2018+A3:2024, specifically Section 722 (Electric Vehicle Charging Installations). Key requirements include: Regulation 722.411.4 (PME earthing risk assessment — most Brighton properties are on PME supplies from the DNO), Regulation 722.531.2 (RCD protection — typically a Type A or Type B RCD or RCBO), a dedicated final circuit for the charger, and compliance with Building Regulations Part P (requiring either self-certification by a registered competent person or notification to Brighton & Hove City Council building control).',
  },
  {
    question: 'How long does EV charger installation take in Brighton?',
    answer:
      "A straightforward 7kW home charger installation in Brighton typically takes 2 to 4 hours. Brighton's older properties — particularly Victorian terraces in areas such as Hanover, Seven Dials, and Preston Park — can require longer cable runs through loft spaces and down external walls, adding 1 to 2 hours. Where a consumer unit upgrade is also required, allow a full day for the combined works.",
  },
  {
    question: 'Do I need planning permission for an EV charger in Brighton?',
    answer:
      'In most cases, no. Home EV charger installation in Brighton is permitted development, provided the unit does not protrude more than 0.2 metres from the wall. However, Brighton & Hove has numerous conservation areas — including the Regency Square and Kemp Town areas — and properties in these zones may require planning permission before installation. Listed buildings also require listed building consent. Contact Brighton & Hove City Council planning department if your property is within a conservation area or is listed.',
  },
  {
    question: 'What is the best EV charger for Brighton homes?',
    answer:
      "For most Brighton homes, a 7kW smart charger is the optimal choice. Popular OZEV-approved models used by Brighton installers include the Ohme Home Pro (excellent for time-of-use tariffs), the Myenergi Zappi (ideal for homes with solar PV), and the Pod Point Solo 3. For Brighton households with solar panels — increasingly common given the city's solar initiatives — the Zappi's solar divert function allows you to charge your EV on surplus solar generation, reducing electricity costs further.",
  },
  {
    question: 'Are there additional EV charging grants for Brighton businesses?',
    answer:
      'Yes. The Workplace Charging Scheme (WCS) provides up to £350 per socket (up to 40 sockets) for eligible businesses, charities, and public sector organisations in Brighton installing EV charge points at their premises. Applications are made through the OZEV portal before installation begins. Brighton & Hove has also provided some local authority co-funding for EV infrastructure in car parks and public spaces through its Electric Vehicle Strategy.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-installation-oxford',
    title: 'EV Charger Installation Oxford',
    description: 'OZEV grants, installation costs, and NICEIC-approved installers in Oxford.',
    icon: Car,
    category: 'Location Guide',
  },
  {
    href: '/ev-charger-installation-reading',
    title: 'EV Charger Installation Reading',
    description: 'Home EV charging costs, OZEV grants, and approved installers in Reading.',
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
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote EV charger installations in minutes with material and labour pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'ev-charging-brighton',
    heading: 'EV Charging in Brighton & Hove',
    content: (
      <>
        <p>
          Brighton & Hove is one of the South East's most progressive cities when it comes to
          electric vehicle adoption and sustainable transport. The city has a high density of EVs
          per capita, supported by Brighton & Hove City Council's Electric Vehicle Strategy and the
          city's strong environmental ethos. Home EV charger installation demand has grown
          significantly as residents upgrade to electric vehicles and seek the convenience and cost
          savings of home charging.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brighton & Hove EV strategy</strong> — the council has committed to
                expanding public charging infrastructure and supporting residential installations.
                The lamp column charging scheme converts existing street lighting into charge
                points, addressing the challenge of terraced streets without driveways. The council
                is also piloting on-street charging bays across the city.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV uptake</strong> — Brighton & Hove has some of the highest solar PV
                installation rates in the UK, benefiting from above-average sunshine hours. Many
                Brighton EV owners combine solar panels with a smart EV charger (such as the
                Myenergi Zappi) to charge their vehicle on surplus solar generation, further
                reducing fuel costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing challenges</strong> — Brighton's Victorian terraced streets —
                particularly in areas such as Hanover, Elm Grove, and Bevendean — present challenges
                for home charging due to the lack of off-street parking. Where off-street parking is
                available (garages, driveways), home EV charger installation is straightforward and
                highly beneficial.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For Brighton homeowners and renters with access to off-street or garage parking, a 7kW
          home EV charger is the most cost-effective charging solution — typically saving £700 to
          £1,200 per year in fuel costs compared to using public rapid chargers.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV Grant — Up to £350 Off Your Brighton Installation',
    content: (
      <>
        <p>
          The OZEV EV Chargepoint Grant provides up to £350 towards the cost of a home EV charger
          for eligible Brighton residents. The grant is deducted from your invoice by your
          OZEV-approved installer — no waiting for reimbursement.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — you must own or have on order an eligible EV or
                plug-in hybrid, and live in a flat or rented accommodation. Homeowners in houses
                lost access to the residential grant in April 2022, though the separate EV
                Infrastructure Grant for residential car parks covers flat developments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amount</strong> — up to £350 or 75% of total installation cost,
                whichever is less. On a typical Brighton installation of £900, the grant saves you
                £350, reducing your net cost to £550.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer required</strong> — only OZEV-registered installers
                can apply the grant. Verify your Brighton installer's OZEV status on the gov.uk OZEV
                installer search before agreeing to the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Brighton businesses can claim up to
                £350 per socket (maximum 40 sockets) through the separate Workplace Charging Scheme,
                making workplace EV charging infrastructure highly cost-effective.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'EV Charger Installation Process in Brighton',
    content: (
      <>
        <p>
          The installation process for a home EV charger in Brighton follows the same core steps as
          any UK installation, with some specific considerations for Brighton's older housing stock
          and the city's DNO (UK Power Networks) PME supply arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                1
              </span>
              <span>
                <strong>Pre-installation survey</strong> — assessment of consumer unit capacity and
                available ways (spare MCB positions), cable route from the consumer unit to the
                charger location, earthing arrangement (most Brighton properties are on PME TN-C-S
                systems), and the proposed mounting location for the charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                2
              </span>
              <span>
                <strong>PME earthing assessment</strong> — required under BS 7671 Regulation
                722.411.4. Where the property is on a PME supply (common in Brighton), the installer
                must assess whether a PME earth is suitable or whether an earth electrode should be
                installed at the charger location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                3
              </span>
              <span>
                <strong>Dedicated circuit installation</strong> — a new 32A radial circuit is
                installed from the consumer unit to the charger. In Brighton's Victorian properties
                this often involves routing through loft spaces, dropping cables through cavity
                walls, or running externally in weatherproof conduit or trunking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                4
              </span>
              <span>
                <strong>Charger installation and commissioning</strong> — the charger unit is
                wall-mounted, connected, and commissioned. Smart charging features are configured,
                and the unit is paired with your home wifi and EV charging app. The installer
                completes testing per BS 7671 Chapter 61.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                5
              </span>
              <span>
                <strong>Certification</strong> — an Electrical Installation Certificate (EIC) is
                issued and the work is self-certified under Part P (if the installer is NICEIC or
                NAPIT registered) or notified to Brighton & Hove City Council building control. The
                OZEV grant application is submitted by the installer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EV Charger Installation Costs in Brighton (2026)',
    content: (
      <>
        <p>
          Brighton EV charger installation costs are broadly in line with the South East average,
          with some upward variation for properties requiring longer cable runs or consumer unit
          upgrades.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard 7kW installation</strong> — £800 to £1,200 all-in, including
                charger unit, dedicated circuit, RCD protection, commissioning, and EIC. After OZEV
                grant (where eligible): approximately £450 to £850.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable run (over 15 metres)</strong> — add £100 to £250. Common in
                Brighton's Victorian terraced houses where the consumer unit is at the front of the
                property and the garage or parking space is at the rear.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — £400 to £700 additional. Older Brighton
                properties (pre-2000) often have full or outdated consumer units that need upgrading
                to accommodate the new EV circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode installation</strong> — £200 to £400 additional, if required
                following the PME earthing risk assessment. More common in detached garages with no
                existing earth path.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Request itemised quotes from at least two OZEV-approved Brighton installers. Confirm that
          the OZEV grant deduction is shown on the quote if you qualify, and that the quote includes
          all certification costs.
        </p>
      </>
    ),
  },
  {
    id: 'terraced-houses',
    heading: 'Terraced Houses Without Driveways — Your Options',
    content: (
      <>
        <p>
          A significant proportion of Brighton & Hove's housing stock consists of Victorian terraced
          houses without off-street parking. If you live in one of these properties, home charging
          options are more limited but not impossible.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lamp column charging</strong> — Brighton & Hove City Council is rolling out
                lamp column chargers across the city, converting existing street lighting into 3.6kW
                or 7kW charge points. These are ideal for residents without driveways. Contact the
                council's transport team to enquire about your street's inclusion in the programme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garage or rear access charging</strong> — if your terraced property has a
                rear garage or rear access yard (common in many Brighton terraced streets), a home
                EV charger can be installed in the garage or on an exterior rear wall. The cable
                route from the consumer unit may be longer, adding to installation cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public charging</strong> — Brighton has a growing network of public chargers
                including rapid chargers at Regency Square car park, Churchill Square, and a number
                of BP Pulse and Pod Point sites. For lower-mileage drivers, public charging may be
                sufficient without a home charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal charging for flats</strong> — residents of purpose-built flat
                developments in Brighton can apply for the EV Infrastructure Grant for Residential
                Car Parks, covering up to £30,000 (or 75% of costs) for installing multiple chargers
                in a shared car park.
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
          Every EV charger installation in Brighton must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. A competent NICEIC or NAPIT registered installer will ensure full compliance,
          but it is useful to understand the key requirements.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.411.4 — PME earthing</strong> — most Brighton properties are
                supplied via a PME (TN-C-S) earthing arrangement from UK Power Networks. The
                installer must complete a PME earthing risk assessment and, if required, install an
                earth electrode to supplement or replace the PME earth at the charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531.2 — RCD protection</strong> — the EV charger circuit must
                be protected by an appropriate RCD. Many modern OZEV-eligible smart chargers
                incorporate Type B equivalent DC fault protection, enabling a Type A RCBO to be used
                at the consumer unit. Your installer will specify the correct protection device
                based on the charger model selected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit requirement</strong> — the EV charger must be supplied by
                its own dedicated final circuit. It must not share a circuit with other loads. A 32A
                Type B MCB or RCBO is typically used for a 7kW charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — EV charger installation is notifiable
                electrical work. NICEIC and NAPIT registered installers can self-certify under Part
                P — you receive a Part P certificate and the council is notified automatically by
                the scheme. Non-registered installers must notify Brighton & Hove City Council
                building control before work begins.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing an OZEV-Approved Installer in Brighton',
    content: (
      <>
        <p>
          The Brighton area has a good number of OZEV-approved EV charger installers, but standards
          vary. Use the following criteria to identify a competent, properly insured installer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV registration</strong> — verify your installer is on the OZEV approved
                installer list at gov.uk. Only OZEV-registered installers can apply the EVHS grant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — provides assurance of technical
                competence, qualifications, and professional indemnity and public liability
                insurance. Verify registration on the scheme's online register before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local experience</strong> — choose an installer with experience of
                Brighton's specific housing challenges — Victorian terraces, rear garage cable runs,
                and the local DNO (UK Power Networks) PME earthing arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-inclusive written quote</strong> — confirm the quote includes the
                charger unit, all cabling, protection devices, earth electrode (if needed),
                commissioning, EIC, Part P certificate, and OZEV grant deduction.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Brighton',
    content: (
      <>
        <p>
          Brighton's high EV adoption rate and growing housing stock make it an excellent market for
          OZEV-approved EV charger installers. Residential 7kW installations are the bread and
          butter of EV installation work, but Brighton also offers commercial and workplace charging
          opportunities across the city's growing business sector.
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
                  to complete the EIC and all OZEV documentation on your phone while still at the
                  Brighton property. Send the certificate to your customer before you leave — no
                  evening admin.
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
                  Generate professional EV charger installation quotes using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include itemised materials, labour, and OZEV grant deduction automatically. Win
                  more Brighton EV jobs with faster, more professional quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV charger installation business in Brighton with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, instant PDF export, and professional quoting. Complete more installations per day. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationBrightonPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Brighton | EV Charging Brighton & Hove"
      description="EV charger installation in Brighton & Hove. OZEV grants up to £350, installation costs £800–£1,200 for 7kW, options for terraced houses without driveways, BS 7671 Section 722 compliance, and NICEIC and NAPIT approved installers."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Installation Brighton:{' '}
          <span className="text-yellow-400">Home EV Charging & OZEV Grants 2026</span>
        </>
      }
      heroSubtitle="Everything Brighton & Hove residents need to know about home EV charger installation — OZEV grants up to £350, typical costs of £800 to £1,200 for a 7kW unit, options for terraced houses without driveways, and how to find a qualified OZEV-approved installer."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Brighton"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Installation Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, OZEV documentation, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
