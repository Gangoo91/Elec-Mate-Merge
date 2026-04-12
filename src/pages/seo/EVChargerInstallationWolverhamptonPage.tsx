import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  PoundSterling,
  ShieldCheck,
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
  {
    label: 'EV Charger Installation Wolverhampton',
    href: '/ev-charger-installation-wolverhampton',
  },
];

const tocItems = [
  { id: 'ev-charging-wolverhampton', label: 'EV Charging in Wolverhampton' },
  { id: 'ozev-grant', label: 'OZEV Grant — Up to £350 Off' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'costs', label: 'Installation Costs in Wolverhampton' },
  { id: 'west-midlands-context', label: 'West Midlands EV Context' },
  { id: 'regulations', label: 'BS 7671 Section 722' },
  { id: 'choosing-installer', label: 'Choosing an OZEV-Approved Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Wolverhampton typically costs £750 to £1,050 all-in — among the most affordable in England, reflecting West Midlands trade labour rates — with OZEV grants of up to £350 available for eligible properties.',
  'The West Midlands Clean Air Zone (CAZ) charges non-compliant diesel and petrol vehicles to drive in the zone — home EV charging significantly reduces the ongoing cost of EV ownership for Wolverhampton commuters.',
  "Wolverhampton's housing stock includes a large proportion of post-war and 1960s–1980s semis and terraces with garages and driveways, making home EV charger installation particularly straightforward.",
  'All EV charger installations must comply with BS 7671:2018+A3:2024 Section 722, including a dedicated circuit, RCD protection under Regulation 722.531.2, and a PME earthing assessment under Regulation 722.411.4.',
  'NICEIC and NAPIT registered, OZEV-approved electricians in Wolverhampton can self-certify the installation under Building Regulations Part P without the need to notify the City of Wolverhampton Council building control.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Wolverhampton?',
    answer:
      'A standard 7kW home EV charger installation in Wolverhampton costs between £750 and £1,050 all-in. This includes the charger unit, a dedicated 32A circuit, RCD protection as required by BS 7671 Section 722, commissioning, and the Electrical Installation Certificate. Wolverhampton benefits from West Midlands trade labour rates, which are lower than London and the South East, making installations here among the most affordable in England. After the OZEV EV Chargepoint Grant (up to £350), your net cost can be as low as £400 to £700.',
  },
  {
    question: 'Does the West Midlands Clean Air Zone affect EV ownership costs in Wolverhampton?',
    answer:
      'Yes. The West Midlands Clean Air Zone (CAZ) charges non-compliant diesel and petrol vehicles a daily fee to drive within the zone, which covers parts of central Birmingham and other West Midlands locations. Electric vehicles are exempt from CAZ charges. For Wolverhampton residents who regularly drive into the CAZ for work or leisure, switching to an EV eliminates these charges entirely. Home charging makes EV ownership significantly cheaper than public charging — a full overnight charge at home can cost as little as £3 to £5 on an EV tariff.',
  },
  {
    question: 'What OZEV grant can I get in Wolverhampton?',
    answer:
      'The OZEV EV Chargepoint Grant provides up to £350 towards a home EV charger for eligible Wolverhampton residents. You must own or have on order an eligible EV or plug-in hybrid, live in a flat or rented accommodation, and use an OZEV-approved installer. Homeowners in houses are no longer eligible for the residential grant (from April 2022). Wolverhampton businesses can apply for the Workplace Charging Scheme (up to £350 per socket, maximum 40 sockets) for EV chargers at commercial premises.',
  },
  {
    question: 'What earthing arrangement do Wolverhampton properties have?',
    answer:
      'Most Wolverhampton properties are supplied by Western Power Distribution (now National Grid Electricity Distribution) via a PME (Protective Multiple Earthing, TN-C-S) earthing arrangement. Under BS 7671 Regulation 722.411.4, the installer must carry out a PME earthing risk assessment before installing an EV charger. Where the PME earth is assessed as unsuitable — for example at a detached garage or outdoor installation — a separate earth electrode must be installed. A competent NICEIC or NAPIT registered installer will carry out this assessment as part of the pre-installation survey.',
  },
  {
    question: 'How long does EV charger installation take in Wolverhampton?',
    answer:
      "A typical 7kW home charger installation in Wolverhampton takes 2 to 4 hours. Wolverhampton's large proportion of post-war and 1960s–1980s housing typically has garages integrated with or adjacent to the house, making cable routes short and installation straightforward. Older Victorian terraces in areas such as Whitmore Reans or Blakenhall with rear yard parking may require slightly longer cable runs, adding 1 to 2 hours. A consumer unit upgrade (if required) extends the total time to a full day.",
  },
  {
    question:
      'Can I get an EV charger installed at a Wolverhampton council property or housing association home?',
    answer:
      "Possibly, but you will need permission from the City of Wolverhampton Council or your housing association before commissioning installation. Many social housing providers in the West Midlands are actively rolling out EV charging infrastructure as part of sustainability commitments. Contact your housing provider directly — they may have a preferred approved installer and may be able to fund part or all of the installation cost through separate grant schemes. If you are a private renter, you need your landlord's written permission before installing a charger.",
  },
  {
    question: 'What is the best charger type for Wolverhampton homes?',
    answer:
      "For most Wolverhampton properties, a 7kW smart charger is the optimal choice — compatible with all EVs sold in the UK, charges overnight from near-empty, and OZEV grant eligible. Popular models installed by Wolverhampton electricians include the Ohme Home Pro (excellent for EV tariff scheduling), Pod Point Solo 3 (straightforward and reliable), and Myenergi Zappi (ideal if you have solar PV panels). For Wolverhampton properties with solar panels — increasingly common across the West Midlands — the Zappi's solar divert function uses surplus generation to charge your EV at near-zero cost.",
  },
  {
    question: 'Do I need planning permission for an EV charger in Wolverhampton?',
    answer:
      'In most cases, no. Home EV charger installation in Wolverhampton is permitted development, provided the unit protrudes no more than 0.2 metres from the wall. Wolverhampton has some conservation areas — including parts of the city centre and Penn Road — where permitted development rights may be restricted. If your property is in a conservation area or is listed, contact the City of Wolverhampton Council planning department before commissioning installation. Most suburban Wolverhampton properties are outside conservation areas and installation is straightforward.',
  },
  {
    question: 'Are there any local Wolverhampton or West Midlands grants for EV chargers?',
    answer:
      "In addition to the national OZEV grant, the West Midlands Combined Authority (WMCA) has periodically offered local funding and co-investment for EV infrastructure as part of its Midlands Net Zero Hub and Transport Strategy. Check the WMCA website and City of Wolverhampton Council's sustainability pages for any current local grant schemes. The council has also invested in public EV charging infrastructure across car parks and on-street locations as part of its transport decarbonisation plans.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-installation-york',
    title: 'EV Charger Installation York',
    description: 'Home EV charging, OZEV grants, and conservation area guidance in York.',
    icon: Car,
    category: 'Location Guide',
  },
  {
    href: '/ev-charger-installation-norwich',
    title: 'EV Charger Installation Norwich',
    description: 'OZEV grants, installation costs, and approved installers in Norwich & Norfolk.',
    icon: Car,
    category: 'Location Guide',
  },
  {
    href: '/ev-charger-installation-oxford',
    title: 'EV Charger Installation Oxford',
    description: 'Home EV charging, OZEV grants, and NICEIC-approved installers in Oxford.',
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
    id: 'ev-charging-wolverhampton',
    heading: 'EV Charging in Wolverhampton',
    content: (
      <>
        <p>
          Wolverhampton is one of the West Midlands' key urban centres, with strong manufacturing,
          logistics, and professional services sectors. The city has a growing EV community, driven
          by the West Midlands Clean Air Zone (CAZ), City of Wolverhampton Council's climate action
          commitments, and the West Midlands Combined Authority's transport decarbonisation
          strategy. Home EV charger installation is the most cost-effective way for Wolverhampton
          residents to support EV ownership.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>West Midlands Clean Air Zone</strong> — the West Midlands CAZ charges
                non-compliant vehicles to drive within designated zones. Electric vehicles are fully
                exempt. For Wolverhampton residents who commute to Birmingham or other CAZ-covered
                areas, switching to an EV eliminates daily charges, improving the financial case for
                both EV purchase and home charger installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competitive installation costs</strong> — Wolverhampton benefits from West
                Midlands trade labour rates, which are significantly lower than London and the South
                East. This makes Wolverhampton one of the more affordable cities in England for home
                EV charger installation, with standard 7kW installations typically costing £100 to
                £200 less than equivalent South East installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing stock</strong> — Wolverhampton has a high proportion of post-war,
                1960s, and 1970s semis and terraces with integral or adjacent garages and driveways.
                This makes home EV charger installation particularly straightforward, with short
                cable runs from the consumer unit and ample wall space for charger mounting. The
                city also has newer estate developments in areas such as Wednesfield, Tettenhall,
                and Oxley.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you live in Tettenhall, Penn, Wednesfield, Bilston, Bushbury, or anywhere across
          the City of Wolverhampton, a 7kW home EV charger provides the lowest-cost and most
          convenient charging solution for your electric vehicle.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV Grant — Up to £350 Off Your Wolverhampton Installation',
    content: (
      <>
        <p>
          The OZEV EV Chargepoint Grant provides up to £350 towards a home EV charger for eligible
          Wolverhampton residents. Your OZEV-approved installer applies the grant and deducts it
          from your invoice — no waiting for reimbursement.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — you must own or have ordered an eligible EV or
                plug-in hybrid and live in a flat or rented accommodation. Homeowners in houses are
                no longer eligible for the residential grant (from April 2022).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amount</strong> — up to £350 or 75% of the installation cost
                (whichever is lower). On a typical Wolverhampton installation costing £850, the
                grant reduces your net cost to £500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Wolverhampton businesses, including the
                city's manufacturing and logistics sector, can claim up to £350 per socket (maximum
                40 sockets) for EV chargers at commercial premises through the OZEV Workplace
                Charging Scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer required</strong> — verify your installer's OZEV
                status at gov.uk before committing. Only OZEV-registered installers can apply the
                grant on your behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'EV Charger Installation Process in Wolverhampton',
    content: (
      <>
        <p>
          A home EV charger installation in Wolverhampton follows the same standardised five-step
          process as all compliant UK installations, with specific considerations for the West
          Midlands' National Grid Electricity Distribution (NGED) PME supply arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                1
              </span>
              <span>
                <strong>Pre-installation survey</strong> — assessment of consumer unit capacity,
                spare MCB ways, earthing arrangement (most Wolverhampton properties are on NGED PME
                supplies), cable route from consumer unit to charger location, and proposed charger
                mounting position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                2
              </span>
              <span>
                <strong>PME earthing risk assessment</strong> — required under BS 7671 Regulation
                722.411.4. The installer assesses whether the NGED PME earth is suitable for the EV
                charger circuit, particularly important at detached garage or outdoor installation
                locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                3
              </span>
              <span>
                <strong>Dedicated circuit installation</strong> — a new 32A radial circuit from the
                consumer unit to the charger location, protected by an appropriate RCBO or MCB with
                RCD protection per Regulation 722.531.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                4
              </span>
              <span>
                <strong>Charger installation and commissioning</strong> — wall mounting, connection,
                smart charging feature configuration (overnight scheduling, EV tariff integration),
                and pairing with your charging app and vehicle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                5
              </span>
              <span>
                <strong>Testing, EIC, Part P, and OZEV</strong> — verification testing per BS 7671
                Chapter 61, EIC issued, self-certification under Part P by NICEIC or NAPIT
                registered installer, and OZEV grant application submitted on your behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EV Charger Installation Costs in Wolverhampton (2026)',
    content: (
      <>
        <p>
          Wolverhampton offers some of the most competitive EV charger installation prices in
          England, with West Midlands trade labour rates reflecting the region's lower cost base
          compared to London and the South East.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard 7kW home installation</strong> — £750 to £1,050 all-in, including
                charger unit, dedicated circuit, RCD protection, EIC, and Part P certificate. After
                OZEV grant (where eligible): approximately £400 to £700.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integral garage installation</strong> — often the simplest and least
                expensive installation scenario in Wolverhampton, where the garage is attached and
                the consumer unit is adjacent. Cable run may be as short as 5 to 10 metres, reducing
                overall cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — £350 to £600 additional. Wolverhampton's
                stock of 1960s and 1970s properties sometimes includes older consumer units
                (particularly older rewireable fuse boards) that require upgrading before an EV
                charger circuit can be safely added.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode</strong> — £150 to £280 additional if required by the PME
                earthing risk assessment. Most straightforward Wolverhampton installations do not
                require a supplementary earth electrode.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Obtain at least two written, itemised quotes from OZEV-approved Wolverhampton installers.
          Confirm all costs are included and the OZEV grant deduction is shown where applicable.
        </p>
      </>
    ),
  },
  {
    id: 'west-midlands-context',
    heading: 'West Midlands EV Context — Why Home Charging Matters',
    content: (
      <>
        <p>
          The West Midlands has one of the UK's most ambitious regional EV transition plans, driven
          by the West Midlands Combined Authority (WMCA) and the region's automotive heritage.
          Understanding the regional context helps Wolverhampton residents and electricians
          appreciate why home charging is particularly important here.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WMCA EV strategy</strong> — the West Midlands Combined Authority has set
                targets for EV charging infrastructure across the region, including public charging
                hubs, rapid chargers on key routes, and support for home and workplace charging.
                Wolverhampton is included in the WMCA's regional charging network expansion plans.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automotive cluster</strong> — the West Midlands is home to a significant
                automotive manufacturing and supply chain cluster, including Jaguar Land Rover (now
                JLR) which produces plug-in hybrid and electric vehicles. Many Wolverhampton area
                workers in the automotive sector have access to EVs through employee schemes,
                increasing local demand for home charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public charging network</strong> — Wolverhampton has a growing network of
                public chargers at council car parks, supermarkets, and along key routes. However,
                home charging remains far cheaper — a full overnight home charge can cost as little
                as £3 on an EV tariff versus £25 to £40 at a public rapid charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Midlands Net Zero Hub</strong> — the Midlands Net Zero Hub supports local
                authorities and businesses across the region, including Wolverhampton, in developing
                EV charging infrastructure and accessing central government grant funding. Check the
                hub's website for any current local co-funding opportunities.
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
          All EV charger installations in Wolverhampton must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. Key requirements include:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.411.4 — PME earthing</strong> — most Wolverhampton properties
                are on NGED (National Grid Electricity Distribution) PME (TN-C-S) supplies. A PME
                earthing risk assessment must be carried out. Where a PME earth is unsuitable, an
                earth electrode must be installed at the charger location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531.2 — RCD protection</strong> — EV charger circuits must be
                protected by an appropriate RCD. Most modern OZEV-approved smart chargers
                incorporate Type B equivalent DC fault protection, allowing a Type A RCBO to be used
                at the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated 32A circuit</strong> — the EV charger must be supplied by its own
                dedicated final circuit, not shared with other loads. A Type B RCBO or MCB at the
                consumer unit is standard for a 7kW installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — EV charger installation is notifiable
                electrical work. NICEIC and NAPIT registered installers can self-certify under Part
                P. An EIC must be issued on completion. Non-registered installers must notify City
                of Wolverhampton Council building control before work begins.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing an OZEV-Approved Installer in Wolverhampton',
    content: (
      <>
        <p>
          The Wolverhampton area and wider West Midlands has a good number of OZEV-approved EV
          charger installers. Use the following criteria to identify the right contractor for your
          installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV registration</strong> — verify at gov.uk OZEV installer search. Only
                OZEV-registered installers can apply the EVHS grant on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — verify on the scheme's online
                register. Provides assurance of technical qualifications, regular assessment, and
                appropriate insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local West Midlands experience</strong> — confirm the installer is familiar
                with NGED's PME earthing arrangements and the specific housing types in
                Wolverhampton. West Midlands electricians with EV experience will understand the
                DNO's technical requirements and guidance documents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written all-inclusive quote</strong> — confirm all costs are included:
                charger unit, cable, protection devices, commissioning, EIC, Part P certification,
                and OZEV grant deduction where applicable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Wolverhampton',
    content: (
      <>
        <p>
          Wolverhampton and the wider West Midlands represent a growing and accessible market for
          OZEV-approved EV charger installers. The region's strong automotive sector, CAZ-driven EV
          adoption, and large proportion of semi-detached and detached properties with garages
          create ideal conditions for high-volume residential EV installation work.
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
                  to complete the EIC and OZEV documentation on your phone at the Wolverhampton
                  property. Send the certificate to your customer before driving away — no paperwork
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
                  Generate professional, itemised EV charger installation quotes using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include OZEV grant deductions, consumer unit upgrades, and earth electrode
                  costs. Win more Wolverhampton EV work with faster, more professional quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV installation business in Wolverhampton with Elec-Mate"
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

export default function EVChargerInstallationWolverhamptonPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Wolverhampton | Home EV Charging Wolverhampton"
      description="EV charger installation in Wolverhampton. OZEV grants up to £350, installation costs £750–£1,050 for 7kW, West Midlands Clean Air Zone context, BS 7671 Section 722 compliance, and NICEIC and NAPIT approved installers."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Installation Wolverhampton:{' '}
          <span className="text-yellow-400">Home EV Charging & OZEV Grants 2026</span>
        </>
      }
      heroSubtitle="Everything Wolverhampton residents need to know about home EV charger installation — OZEV grants up to £350, competitive costs of £750 to £1,050 for a 7kW unit, West Midlands CAZ context, and how to find a qualified OZEV-approved installer."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Wolverhampton"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Installation Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, OZEV documentation, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
