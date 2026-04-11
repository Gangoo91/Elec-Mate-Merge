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
  { label: 'EV Charger Installation Oxford', href: '/ev-charger-installation-oxford' },
];

const tocItems = [
  { id: 'ev-charging-oxford', label: 'EV Charging in Oxford' },
  { id: 'ozev-grant', label: 'OZEV Grant — Up to £350 Off' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'costs', label: 'Installation Costs in Oxford' },
  { id: 'charger-types', label: 'Charger Types Explained' },
  { id: 'regulations', label: 'BS 7671 Section 722' },
  { id: 'choosing-installer', label: 'Choosing an OZEV-Approved Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Oxford typically costs £800 to £1,200 all-in for a single-phase supply, including the OZEV-approved charger unit and all wiring back to the consumer unit.',
  'The OZEV EV Chargepoint Grant provides up to £350 towards the cost of a home charger for eligible applicants — the grant is applied by your installer and deducted from your invoice.',
  'All EV charger installations must comply with BS 7671:2018+A3:2024 Section 722 (Electric Vehicle Charging Installations), which specifies requirements for protective devices, earthing, and load management.',
  'Oxford City Council and the surrounding Oxfordshire area have seen rapid EV adoption, driven by the Ultra Low Emission Zone (ULEZ) and local Net Zero commitments — demand for home charger installations has grown significantly.',
  'Only OZEV-approved installers can apply the grant on your behalf. NICEIC and NAPIT registration also provides assurance of competence and appropriate insurance cover.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Oxford?',
    answer:
      'A standard 7kW home EV charger installation in Oxford costs between £800 and £1,200 all-in. This includes the charger unit, cabling back to the consumer unit, a new dedicated circuit with RCD protection (required under BS 7671 Section 722), and the installation labour. If you are eligible for the OZEV EV Chargepoint Grant, the cost is reduced by up to £350, bringing the net cost to as low as £450 to £850 depending on the charger model chosen.',
  },
  {
    question: 'What is the OZEV grant and am I eligible in Oxford?',
    answer:
      'The OZEV (Office for Zero Emission Vehicles) EV Chargepoint Grant provides up to £350 towards the purchase and installation of a home EV charger. To be eligible, you must own or have ordered an eligible electric or plug-in hybrid vehicle, live in a flat or rented accommodation (homeowners in houses no longer qualify for the residential grant as of 2022), and use an OZEV-approved installer. Residents of Oxford in eligible properties can claim the grant. Your installer applies on your behalf and deducts the amount from your invoice.',
  },
  {
    question: 'What regulations apply to EV charger installations in Oxford?',
    answer:
      'All EV charger installations in Oxford must comply with BS 7671:2018+A3:2024 (the IET Wiring Regulations), specifically Section 722 — Electric Vehicle Charging Installations. Key requirements include a dedicated circuit for the EV charger, RCD protection (Regulation 722.531.2), earthing arrangements including a PME earthing risk assessment (Regulation 722.411.4), and appropriate load management where multiple chargers are installed. The installation must also comply with the Building Regulations Part P (England), requiring notification to the local authority or self-certification by a registered competent person.',
  },
  {
    question: 'How long does EV charger installation take in Oxford?',
    answer:
      'A straightforward single 7kW home EV charger installation in Oxford typically takes between 2 and 4 hours for a competent OZEV-approved electrician. This covers installing the charger unit on the wall or in a weatherproof enclosure, running a new dedicated cable back to the consumer unit (which may involve routing through garages, lofts, or external walls), fitting an appropriate MCB and RCD protection, and completing the commissioning and paperwork. More complex installations — such as those requiring a new consumer unit, three-phase supply, or cable runs exceeding 20 metres — can take a full day.',
  },
  {
    question: 'Can I install an EV charger myself in Oxford?',
    answer:
      "No. EV charger installation is notifiable electrical work under Part P of the Building Regulations. This means it must either be carried out by a registered competent person (such as a NICEIC or NAPIT registered electrician) who self-certifies the work, or be notified to Oxford City Council's building control before work begins. Additionally, only OZEV-approved installers can claim the OZEV EV Chargepoint Grant on your behalf. Attempting to self-install risks invalidating your vehicle warranty, home insurance, and the charger manufacturer's warranty.",
  },
  {
    question: 'What charger do I need for my electric car in Oxford?',
    answer:
      'For home use in Oxford, a 7kW single-phase AC charger is the most popular choice and works with all electric vehicles sold in the UK. It charges most EVs from near-empty overnight (typically 8 to 12 hours for a full charge). If your property has a three-phase electricity supply (uncommon in residential properties but more common in commercial premises), a 22kW charger can be installed, charging three times faster. Popular models used by Oxford installers include the Ohme Home Pro, Myenergi Zappi, and Easee One — all OZEV-eligible units.',
  },
  {
    question: 'Do I need planning permission for an EV charger in Oxford?',
    answer:
      "In most cases, no. Domestic EV charger installations in Oxford are permitted development under the Town and Country Planning (General Permitted Development) (England) Order 2015, provided the charger unit does not protrude more than 0.2 metres from the wall and is not installed on a listed building or in a conservation area without prior consent. Oxford has a number of conservation areas — if your property is within one, contact Oxford City Council's planning department before commissioning an installation.",
  },
  {
    question: 'What is the difference between a 3.6kW and 7kW home charger?',
    answer:
      'A 3.6kW charger uses a single-phase 16A circuit and charges at roughly half the rate of a 7kW unit. Most modern EVs can accept 7kW AC charging, so a 7kW charger (32A single-phase circuit) is the recommended choice for new installations in Oxford. The cable and circuit costs are similar for both — the main difference is the charger unit price, which is typically £50 to £100 more for a 7kW model. The faster charge rate makes the 7kW option better value in the long term.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-installation-brighton',
    title: 'EV Charger Installation Brighton',
    description:
      'OZEV grants, installation costs, and NICEIC-approved installers in Brighton & Hove.',
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
    href: '/tools/ev-charging-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete EV installation certificates on site with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
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
    id: 'ev-charging-oxford',
    heading: 'EV Charging in Oxford',
    content: (
      <>
        <p>
          Oxford has positioned itself as one of the UK's leading cities for electric vehicle
          adoption. The city's Zero Emission Zone — the UK's first city-centre ZEZ, launched in
          February 2022 — has accelerated the transition to electric vehicles among Oxford residents
          and businesses. Combined with the University of Oxford's sustainability commitments and
          Oxfordshire County Council's electric vehicle infrastructure strategy, demand for home EV
          charger installation in Oxford has grown substantially.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zero Emission Zone</strong> — Oxford's ZEZ covers the city centre and
                charges non-zero-emission vehicles to enter. This has driven a significant uplift in
                EV registrations across Oxford and surrounding Oxfordshire villages, with many
                households installing home chargers to reduce running costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property types</strong> — Oxford's housing stock includes Victorian
                terraces, inter-war semis, modern new-builds, and student accommodation HMOs. Most
                Victorian and Edwardian properties have off-street parking in rear gardens, which
                often requires a longer cable run from the consumer unit. New-build properties in
                areas such as Barton Park and Bicester (nearby) are increasingly supplied with
                EV-ready infrastructure as standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public vs home charging</strong> — Oxford has a growing network of public EV
                chargers, but home charging remains significantly cheaper per kWh on a standard
                tariff and dramatically cheaper on an EV-optimised overnight tariff such as Octopus
                Go. A 7kW home charger pays for itself in fuel savings within two to three years for
                a typical Oxford commuter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you live in Jericho, Cowley, Headington, Botley, or the surrounding Oxfordshire
          villages, a home EV charger installation is the most practical and cost-effective way to
          keep your electric vehicle charged.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV Grant — Up to £350 Off Your Installation',
    content: (
      <>
        <p>
          The Office for Zero Emission Vehicles (OZEV) EV Chargepoint Grant provides up to £350
          towards the cost of purchasing and installing a home EV charger. The grant is applied
          directly by your OZEV-approved installer, who deducts it from your invoice — you pay the
          net amount without waiting for reimbursement.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who qualifies?</strong> — You must own or have ordered an eligible EV or
                plug-in hybrid (PHEV), and live in a flat or rented property. Homeowners in houses
                are no longer eligible for the residential grant (as of April 2022), though the
                separate EV Infrastructure Grant for Residential Car Parks may apply to
                purpose-built flat developments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amount</strong> — up to £350 or 75% of the total installation cost
                (whichever is lower). For a typical Oxford installation costing £900, the grant
                reduces your net payment to approximately £550.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installers</strong> — you must use an installer registered on
                the OZEV approved installer list. NICEIC and NAPIT registered electricians who are
                also OZEV-approved can claim the grant and handle all paperwork on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligible chargers</strong> — the charger unit must be on the OZEV approved
                product list, which includes the majority of popular smart charger models sold in
                the UK including Ohme, Myenergi Zappi, Easee, Pod Point, and Andersen.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always confirm your installer's OZEV approval status before committing to an installation.
          Your installer will require details of your vehicle (registration number and make/model)
          and proof of your Oxford address. The grant application is submitted online by the
          installer after installation is complete.
        </p>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'The EV Charger Installation Process',
    content: (
      <>
        <p>
          A professional EV charger installation in Oxford follows a consistent process from survey
          through to completion and certification. Understanding what to expect helps you plan
          around the installation and ensure the work is done correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                1
              </span>
              <span>
                <strong>Survey</strong> — your installer will assess your consumer unit capacity,
                the route for the new dedicated circuit cable, earthing arrangements (PME or TT
                earth), and the proposed charger location. A PME earthing risk assessment is
                required under Regulation 722.411.4 of BS 7671 before installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                2
              </span>
              <span>
                <strong>Dedicated circuit installation</strong> — a new 32A (7kW) or 16A (3.6kW)
                radial circuit is run from your consumer unit to the charger location. This circuit
                must be protected by an MCB and RCD (or RCBO) meeting the requirements of Regulation
                722.531.2. Cable routes through Oxford's older properties may require routing
                through lofts, cavity walls, or externally in trunking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                3
              </span>
              <span>
                <strong>Charger mounting and connection</strong> — the charger unit is wall-mounted
                at an appropriate height (typically 0.75 to 1.2 metres for accessibility) and
                connected to the dedicated circuit. Outdoor chargers must be IP54-rated or better
                and positioned away from flood risk zones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                4
              </span>
              <span>
                <strong>Testing and commissioning</strong> — the installation is tested in
                accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Chapter 61
                </SEOInternalLink>{' '}
                (initial verification), and an Electrical Installation Certificate (EIC) is issued.
                The charger is configured for smart charging (mandatory for grant-funded units) and
                paired with your vehicle or charging app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">
                5
              </span>
              <span>
                <strong>Building Regulations notification</strong> — as notifiable electrical work
                under Part P, the installation is either self-certified by your registered competent
                person electrician (NICEIC/NAPIT) or notified to Oxford City Council building
                control. You will receive a Part P certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EV Charger Installation Costs in Oxford (2026)',
    content: (
      <>
        <p>
          EV charger installation costs in Oxford are broadly in line with the South East England
          average, though inner-city properties can be slightly more expensive due to parking
          restrictions, longer cable runs through older buildings, and higher overall trade labour
          rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard 7kW home installation</strong> — £800 to £1,200 all-in. Includes
                charger unit, dedicated 32A circuit, RCD protection, commissioning, and EIC. After
                OZEV grant: approximately £450 to £850.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable run (over 15 metres)</strong> — add £100 to £300 depending on
                route complexity. Victorian Oxford properties with rear parking often require runs
                through loft spaces and down exterior walls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — if your existing consumer unit is full or
                does not meet current standards, a new consumer unit costs an additional £400 to
                £700. Many Oxford properties built before 2000 have older consumer units without RCD
                protection that may require upgrading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV integration (Zappi or similar)</strong> — solar-diverting smart
                chargers such as the Myenergi Zappi cost £200 to £400 more than a standard charger
                unit, but can use surplus solar generation to charge your EV at near-zero cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain at least two quotes from OZEV-approved, NICEIC or NAPIT registered
          installers. Confirm that the quote is all-inclusive (charger unit, cable, protection
          devices, commissioning, and certification) and that the OZEV grant has been applied where
          you are eligible.
        </p>
      </>
    ),
  },
  {
    id: 'charger-types',
    heading: 'Charger Types Explained',
    content: (
      <>
        <p>
          Understanding the different charger types and charging speeds helps Oxford homeowners
          choose the right unit for their vehicle and usage pattern.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3.6kW (Mode 3, 16A)</strong> — slower home charging option. Suitable for
                plug-in hybrids with small batteries (under 20kWh) or where electrical supply
                capacity is limited. Charges a 60kWh battery EV from 20% to 80% in approximately 10
                hours. Less commonly installed for pure EVs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7kW (Mode 3, 32A)</strong> — the standard home EV charger in the UK.
                Compatible with all EVs sold in the UK. Charges a 60kWh battery EV from 20% to 80%
                in approximately 5 to 6 hours. Most Oxford homes have sufficient supply capacity for
                a 7kW charger without supply upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW (Mode 3, three-phase)</strong> — requires a three-phase electricity
                supply, uncommon in Oxford residential properties but available at some commercial
                and new-build premises. Charges a compatible EV three times faster than a 7kW unit.
                Most EVs cap AC acceptance at 7.4kW or 11kW, making 22kW chargers primarily useful
                for vehicles with 11kW or 22kW on-board chargers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart chargers</strong> — all OZEV grant-eligible chargers must be smart
                chargers capable of remote access, scheduling, and load management. Smart features
                allow overnight charging at lower-rate electricity tariffs and integration with
                solar PV systems.
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
          All EV charger installations in Oxford must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations). Section 722 specifically covers Electric Vehicle Charging
          Installations and contains a number of requirements that differ from standard domestic
          electrical installations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.411.4 — PME earthing</strong> — where the installation is
                supplied via a PME (Protective Multiple Earthing) terminal from the distributor's
                network, the installer must assess the risk of a floating neutral fault and
                determine whether a PME earth is suitable for the EV charger or whether a separate
                earth electrode is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531.2 — RCD protection</strong> — EV charger circuits must be
                protected by an RCD. Where Mode 3 charging equipment incorporates a DC fault current
                detection device providing equivalent protection to a Type B RCD, a Type A RCD may
                be acceptable. Otherwise a Type B RCD is required. Most modern OZEV-approved
                chargers include this functionality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.55 — dedicated circuit</strong> — EV charging circuits should
                be supplied by a dedicated final circuit. Sharing an EV charger circuit with other
                loads creates risks of overloading and nuisance tripping, and does not comply with
                the intent of Section 722.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — EV charger installation is notifiable
                electrical work. Compliance requires either self-certification by a registered
                competent person (NICEIC/NAPIT) or prior notification to Oxford City Council
                building control. An EIC must be issued on completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Compliance with Section 722 is verified at the initial verification stage of the
          installation. A competent NICEIC or NAPIT registered installer will complete the
          verification, issue the EIC, and self-certify the work under Part P without the need for
          local authority building control involvement.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing an OZEV-Approved Installer in Oxford',
    content: (
      <>
        <p>
          The quality of your EV charger installation depends heavily on the competence and
          experience of your chosen installer. Oxford has a number of OZEV-approved electricians,
          but not all have equal experience with EV installations or the specific challenges of
          Oxford's older housing stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV approved installer list</strong> — only OZEV-registered installers can
                apply the EVHS grant on your behalf. Verify your installer's OZEV status on the
                official OZEV installer search at gov.uk before signing any contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — registration with NICEIC or NAPIT
                provides assurance that the installer is assessed against BS 7671, holds appropriate
                qualifications (including C&G 2391 Inspection and Testing), and carries public
                liability and professional indemnity insurance. Always verify registration on the
                scheme's online register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV-specific experience</strong> — ask your installer how many EV charger
                installations they have completed in Oxford and whether they are familiar with the
                PME earthing assessment requirements of Regulation 722.411.4. Inexperienced
                installers may miss the earthing risk assessment, which creates safety risks and
                non-compliance with BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quote</strong> — insist on a written, itemised quote covering the
                charger unit, all cabling, protection devices, commissioning, EIC, and Part P
                certification. Confirm that the OZEV grant deduction is shown on the quote if you
                are eligible.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Oxford',
    content: (
      <>
        <p>
          Oxford's rapid EV adoption creates strong and growing demand for OZEV-approved EV charger
          installers. Electricians who invest in OZEV approval and EV-specific training can build a
          highly profitable niche in the Oxford area, with installations typically generating £300
          to £600 net margin per job.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EV Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete the EIC and all OZEV documentation on your phone while still on site.
                  No evening paperwork — send the certificate to your customer before you drive
                  away.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include itemised materials, labour, and OZEV grant deduction — impress customers
                  with a professional quote before competitors respond.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV charger installation business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, instant PDF export, and professional quoting. Complete more EV installations per day. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationOxfordPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Oxford | Home EV Charging Oxford"
      description="EV charger installation in Oxford. OZEV grants up to £350, installation costs £800–£1,200 for 7kW, BS 7671 Section 722 compliance, NICEIC and NAPIT approved installers, and the Oxford Zero Emission Zone explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Installation Oxford:{' '}
          <span className="text-yellow-400">Home Charging & OZEV Grants 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about home EV charger installation in Oxford — OZEV grants up to £350, typical costs of £800 to £1,200 for a 7kW unit, BS 7671 Section 722 compliance, and how to find an OZEV-approved NICEIC or NAPIT installer."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Oxford"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Installation Certificates On Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EV certification, OZEV documentation, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
