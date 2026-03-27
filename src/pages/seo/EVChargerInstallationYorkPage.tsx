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
  { label: 'EV Charger Installation York', href: '/ev-charger-installation-york' },
];

const tocItems = [
  { id: 'ev-charging-york', label: 'EV Charging in York' },
  { id: 'ozev-grant', label: 'OZEV Grant — Up to £350 Off' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'costs', label: 'Installation Costs in York' },
  { id: 'conservation-areas', label: 'Conservation Areas & Listed Buildings' },
  { id: 'regulations', label: 'BS 7671 Section 722' },
  { id: 'choosing-installer', label: 'Choosing an OZEV-Approved Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in York typically costs £800 to £1,150 all-in — competitive North of England pricing — with OZEV grants of up to £350 available for eligible properties.',
  'City of York Council has set an ambitious net zero target and has been expanding public EV charging infrastructure, but home charging remains far cheaper — overnight EV tariff rates can reduce fuel costs by 75% versus public rapid chargers.',
  'York has extensive conservation areas and a high density of listed buildings — properties in conservation areas or listed buildings may require planning consent before EV charger installation.',
  'All EV charger installations must comply with BS 7671:2018+A3:2024 Section 722, including a dedicated circuit, RCD protection under Regulation 722.531.2, and a PME earthing assessment under Regulation 722.411.4.',
  'NICEIC and NAPIT registered, OZEV-approved electricians can self-certify the installation under Building Regulations Part P, avoiding the need to notify City of York Council building control separately.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in York?',
    answer:
      'A standard 7kW home EV charger installation in York costs between £800 and £1,150 all-in. This includes the charger unit, dedicated 32A radial circuit, RCD protection as required by BS 7671 Section 722, commissioning, and the Electrical Installation Certificate. York\'s pricing is competitive with other Northern England cities, reflecting regional trade labour rates. If you are eligible for the OZEV EV Chargepoint Grant, up to £350 is deducted by your installer, reducing your net cost to approximately £450 to £800.',
  },
  {
    question: 'Do I need planning permission for an EV charger in York?',
    answer:
      'Possibly. York has one of the highest concentrations of conservation areas and listed buildings in England. Whilst EV charger installation is generally permitted development (no planning permission required), properties within York\'s conservation areas — including the city walls area, Bootham, Bishopthorpe Road, and The Mount — may have restricted permitted development rights. Listed buildings always require listed building consent for external alterations, including charger installation. Contact City of York Council\'s planning department before commissioning installation if your property is listed or within a conservation area.',
  },
  {
    question: 'What OZEV grant is available for York residents?',
    answer:
      'The OZEV EV Chargepoint Grant provides up to £350 towards a home EV charger for eligible York residents. You must own or have on order an eligible EV or plug-in hybrid and live in a flat or rented accommodation. Homeowners in houses lost access to the residential grant from April 2022. York businesses can apply for the Workplace Charging Scheme (up to £350 per socket, maximum 40 sockets). City of York Council has also provided some local authority co-funding for public EV infrastructure.',
  },
  {
    question: 'What earthing arrangement do York properties have?',
    answer:
      'Most urban York properties are supplied by Northern Powergrid via a PME (Protective Multiple Earthing, TN-C-S) earthing arrangement. Under BS 7671 Regulation 722.411.4, the installer must carry out a PME earthing risk assessment before installing an EV charger. Where the PME earth is assessed as unsuitable (for example, at a detached garage or outdoor location), a separate earth electrode must be installed. York\'s DNO is Northern Powergrid — your installer should be familiar with Northern Powergrid\'s guidance on PME earthing for EV installations.',
  },
  {
    question: 'How long does EV charger installation take in York?',
    answer:
      'A straightforward 7kW home charger installation in York typically takes 2 to 4 hours. York\'s Victorian and Edwardian properties — particularly in areas such as Acomb, Fulford, and Dringhouses — may have longer cable routes from the consumer unit to the garage or parking area, extending the installation time. Where a consumer unit upgrade is also needed, allow a full working day.',
  },
  {
    question: 'Can I install an EV charger at my York terraced house?',
    answer:
      'Yes, if you have off-street parking (a driveway, garage, or courtyard space). York has a significant proportion of Victorian and Edwardian terraced houses, many of which have rear access to back lanes or yards where parking is available. For these properties, a 7kW charger can be installed at the rear of the property, with the cable routed through the property from the consumer unit. For York terraced houses without any off-street parking, City of York Council\'s EV charging strategy includes on-street charge point options — contact the council for availability on your street.',
  },
  {
    question: 'What smart charger is best for York homes?',
    answer:
      'For most York homes, a 7kW OZEV-approved smart charger is the optimal choice. Popular models installed by York electricians include the Ohme Home Pro (excellent for Octopus Go and other EV tariffs, with automatic scheduling to charge at the cheapest rate overnight), the Myenergi Zappi (ideal for York properties with solar PV panels), and the Pod Point Solo 3 (straightforward and reliable). All three are on the OZEV approved product list and support the smart charging functionality required for grant-eligible installations.',
  },
  {
    question: 'Are there additional EV charging incentives in York?',
    answer:
      'City of York Council has committed funding to expanding public EV charging infrastructure and supports home charger adoption through signposting to OZEV grants. The council\'s Local Transport Plan includes EV charging as a key element of its net zero transport strategy. North Yorkshire also has some rural EV charging grants through the Rural England Prosperity Fund for businesses and rural properties. Contact the council or North Yorkshire County Council for current local scheme availability.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-installation-wolverhampton',
    title: 'EV Charger Installation Wolverhampton',
    description: 'Home EV charging costs, OZEV grants, and approved installers in Wolverhampton.',
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
    href: '/tools/ev-charging-certificate',
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
    id: 'ev-charging-york',
    heading: 'EV Charging in York',
    content: (
      <>
        <p>
          York is one of England's most historic cities and has set one of the UK's most ambitious
          local authority net zero targets, committing to becoming carbon neutral by 2030. City of
          York Council has invested in expanding the public EV charging network across car parks,
          on-street locations, and park-and-ride sites. Despite this, home EV charging in York
          remains the most cost-effective and convenient charging option for residents with
          off-street parking.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>York's EV strategy</strong> — City of York Council has prioritised EV
                infrastructure as part of its net zero transport plan. The council has installed
                chargers at council car parks, on residential streets with high EV density, and
                at park-and-ride sites. The council also actively promotes home charger installation
                and OZEV grant access for York residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost of home vs public charging</strong> — charging a 60kWh EV from
                near-empty overnight at home on an EV tariff (approximately 7p/kWh) costs roughly
                £4. The same charge at a York public rapid charger (50p/kWh) costs approximately
                £30. Over 15,000 miles per year, home charging saves a York EV owner around
                £1,200 annually versus public rapid charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing stock</strong> — York has a varied housing stock including Georgian
                and Victorian city-centre terraces, inter-war semis, post-war estates, and modern
                new-builds on the city's outskirts. Many suburban York properties (Acomb,
                Dringhouses, Fulford, Heslington, Strensall) have garages or driveways suitable
                for home EV charger installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you live in the city centre, in one of York's historic suburbs, or in the
          surrounding North Yorkshire villages, a 7kW home EV charger provides significant
          cost savings and the convenience of waking up each morning to a fully charged vehicle.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV Grant — Up to £350 Off Your York Installation',
    content: (
      <>
        <p>
          The OZEV EV Chargepoint Grant reduces the upfront cost of a home EV charger by up to
          £350 for eligible York residents. Your OZEV-approved installer applies the grant and
          deducts it from your invoice — no waiting for reimbursement.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — you must own or have ordered an eligible EV or
                plug-in hybrid and live in a flat or rented accommodation. The residential grant
                no longer applies to homeowners in houses. Renters can qualify if their landlord
                gives permission for the charger to be installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amount</strong> — up to £350 or 75% of the installation cost
                (whichever is lower). On a typical York installation costing £950, the grant
                reduces your net cost to £600.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — York businesses can claim up to
                £350 per socket (maximum 40 sockets) for installing EV charge points at commercial
                premises, including York city centre offices, industrial sites, and tourist
                accommodation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer required</strong> — confirm OZEV registration at
                gov.uk before committing. Unregistered installers cannot claim the grant on your
                behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'EV Charger Installation Process in York',
    content: (
      <>
        <p>
          A home EV charger installation in York follows the same five-step process as all UK
          installations, with specific considerations for York's historic housing stock and
          Northern Powergrid's PME supply arrangements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">1</span>
              <span>
                <strong>Pre-installation survey</strong> — assessment of consumer unit capacity
                and spare ways, earthing arrangement (most York properties are on Northern
                Powergrid PME supplies), cable route from consumer unit to charger location, and
                proposed mounting position.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">2</span>
              <span>
                <strong>PME earthing risk assessment</strong> — required under BS 7671 Regulation
                722.411.4. The installer assesses whether the PME earth from Northern Powergrid
                is suitable for the EV charger circuit or whether a supplementary earth electrode
                is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">3</span>
              <span>
                <strong>Dedicated circuit installation</strong> — a new 32A radial circuit is
                installed from the consumer unit to the charger, protected by an appropriate
                RCBO or MCB with RCD protection per Regulation 722.531.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">4</span>
              <span>
                <strong>Charger installation and commissioning</strong> — wall mounting, electrical
                connection, smart feature configuration (scheduling, tariff integration), and
                pairing with the vehicle and app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">5</span>
              <span>
                <strong>Testing, EIC, and Part P</strong> — verification testing per BS 7671
                Chapter 61, EIC issued, self-certification under Part P by NICEIC or NAPIT
                registered installer, and OZEV grant application submitted.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EV Charger Installation Costs in York (2026)',
    content: (
      <>
        <p>
          York EV charger installation costs are competitive with other Northern England cities,
          benefiting from lower regional labour rates than London and the South East.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard 7kW home installation</strong> — £800 to £1,150 all-in, including
                charger unit, dedicated circuit, RCD protection, EIC, and Part P certificate.
                After OZEV grant (where eligible): approximately £450 to £800.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable run or complex route</strong> — add £100 to £250 for runs
                exceeding 15 metres or routes requiring threading through Victorian loft spaces
                and down exterior walls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — £380 to £650 additional. Many York
                properties built before 1990 have older consumer units without adequate spare
                ways or modern RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode installation</strong> — £150 to £300 additional, if
                required following the PME earthing risk assessment. More common at detached
                garage or outbuilding locations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Obtain two or more written, itemised quotes from OZEV-approved York installers. Ensure
          all costs are included and the OZEV grant deduction is shown separately where you
          are eligible.
        </p>
      </>
    ),
  },
  {
    id: 'conservation-areas',
    heading: 'Conservation Areas & Listed Buildings in York',
    content: (
      <>
        <p>
          York has one of the highest concentrations of listed buildings and conservation areas
          in England. This creates specific planning considerations for EV charger installation
          that do not apply in most other UK cities.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas</strong> — York has extensive conservation areas
                including the city centre (within the walls), Bootham, Gillygate, The Mount,
                Bishopthorpe Road, and several Victorian suburbs. In these areas, permitted
                development rights may be restricted. EV charger installation on a visible
                exterior wall may require planning permission. Contact City of York Council
                planning before commissioning if in doubt.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — any external alteration to a listed building,
                including mounting a charger on an external wall, requires listed building consent
                from City of York Council. This applies regardless of whether the building is in
                a conservation area. York has thousands of listed buildings — check your property's
                listing status at Historic England's National Heritage List before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical solutions</strong> — for listed York properties, a sympathetically
                positioned charger (in a garage or rear courtyard rather than on a front elevation)
                may avoid the need for consent. Smaller, flush-mounted charger units are generally
                less visually intrusive and may be acceptable in conservation areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-application advice</strong> — City of York Council offers pre-application
                planning advice for a fee. For a listed building installation, this is strongly
                recommended before commissioning an installer to avoid wasted costs if consent
                is refused.
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
          All EV charger installations in York must comply with{' '}
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
                <strong>Regulation 722.411.4 — PME earthing</strong> — most York properties are
                on Northern Powergrid PME (TN-C-S) supplies. The installer must carry out a PME
                earthing risk assessment and determine whether a supplementary earth electrode is
                required at the charger location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531.2 — RCD protection</strong> — the EV charger circuit
                requires appropriate RCD protection. Modern OZEV-approved smart chargers with
                Type B equivalent DC fault protection allow a Type A RCBO to be used at the
                consumer unit — your installer will specify the correct device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — the EV charger must be on its own dedicated
                32A final circuit, not shared with other loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — notifiable electrical work. NICEIC
                or NAPIT registered installers self-certify under Part P. An EIC must be issued
                on completion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing an OZEV-Approved Installer in York',
    content: (
      <>
        <p>
          York and the surrounding North Yorkshire area have a good number of OZEV-approved
          EV charger installers. Use the following criteria to select a competent, well-insured
          contractor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV registration</strong> — verify at gov.uk OZEV installer search.
                Only OZEV-approved installers can claim the EVHS grant on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — check the scheme's online register.
                Registration provides assurance of qualifications, regular technical assessment,
                and appropriate insurance cover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area awareness</strong> — choose an installer who understands
                York's planning environment and can advise on whether your specific property
                requires planning or listed building consent before installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-inclusive written quote</strong> — confirm all costs are included:
                charger unit, cable, protection devices, commissioning, EIC, Part P certificate,
                and OZEV grant deduction where applicable. No hidden extras.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in York',
    content: (
      <>
        <p>
          York's combination of high EV adoption aspirations, significant new-build development,
          and a growing professional population creates strong demand for OZEV-approved EV charger
          installers. Electricians who understand York's planning environment — particularly the
          conservation area and listed building implications — can command premium prices for
          specialist installations.
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
                  to complete the EIC and OZEV documentation on your phone at the York property.
                  Send the certificate to your customer before leaving — no evening paperwork.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include OZEV grant deductions, earth electrode costs, and consumer unit upgrades.
                  Respond to York EV enquiries faster than local competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV installation business in York with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EV certification, instant PDF export, and professional quoting. Complete more installations per day. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationYorkPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation York | Home EV Charging York"
      description="EV charger installation in York. OZEV grants up to £350, installation costs £800–£1,150 for 7kW, conservation area and listed building guidance, BS 7671 Section 722 compliance, and NICEIC and NAPIT approved installers in North Yorkshire."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Installation York:{' '}
          <span className="text-yellow-400">Home EV Charging & OZEV Grants 2026</span>
        </>
      }
      heroSubtitle="Everything York residents need to know about home EV charger installation — OZEV grants up to £350, typical costs of £800 to £1,150 for a 7kW unit, conservation area planning guidance, and how to find a qualified OZEV-approved installer in North Yorkshire."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in York"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Installation Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EV certification, OZEV documentation, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
