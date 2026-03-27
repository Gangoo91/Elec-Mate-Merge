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
  MapPin,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charger Installation', href: '/ev-charger-installation' },
  { label: 'EV Charger Installation Norwich', href: '/ev-charger-installation-norwich' },
];

const tocItems = [
  { id: 'ev-charging-norwich', label: 'EV Charging in Norwich & Norfolk' },
  { id: 'ozev-grant', label: 'OZEV Grant — Up to £350 Off' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'costs', label: 'Installation Costs in Norwich' },
  { id: 'rural-norfolk', label: 'Rural Norfolk Properties' },
  { id: 'regulations', label: 'BS 7671 Section 722' },
  { id: 'choosing-installer', label: 'Choosing an OZEV-Approved Installer' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Norwich typically costs £800 to £1,100 all-in — slightly below the South East average, reflecting Norfolk\'s lower labour rate — with OZEV grants of up to £350 available for eligible properties.',
  'Norfolk is one of the UK\'s least densely charged public charging areas, making home EV charging particularly important for Norwich and Norfolk residents who rely on their vehicle for longer journeys.',
  'Rural Norfolk properties on TT (Terra Terra) earthing systems require a different earthing approach for EV charger installation under BS 7671 Regulation 722.411.4 than urban Norwich properties on PME supplies.',
  'All EV charger installations must comply with BS 7671:2018+A3:2024 Section 722, including dedicated circuit, RCD protection (Regulation 722.531.2), and a PME or TT earthing assessment.',
  'NICEIC and NAPIT registered OZEV-approved installers can self-certify the installation under Building Regulations Part P, avoiding the need to notify Norfolk County Council or Norwich City Council building control.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Norwich?',
    answer:
      'A standard 7kW home EV charger installation in Norwich costs between £800 and £1,100 all-in, including the charger unit, dedicated 32A circuit, RCD protection, commissioning, and the Electrical Installation Certificate. Norwich prices are slightly below the South East average, reflecting Norfolk\'s lower trade labour rates. If you are eligible for the OZEV EV Chargepoint Grant, up to £350 is deducted from your bill by the installer, reducing your net cost to approximately £450 to £750.',
  },
  {
    question: 'Is public EV charging good enough in Norfolk without a home charger?',
    answer:
      'Public EV charging infrastructure in Norfolk is significantly less dense than in major urban areas. Outside Norwich, public rapid chargers are concentrated at motorway services (A11, A47), some supermarkets, and a small number of destination chargers. For Norfolk residents who travel regularly — particularly those commuting from villages into Norwich or making longer journeys across the county — home charging is essential. Overnight home charging at an EV tariff rate is also significantly cheaper than public rapid charging.',
  },
  {
    question: 'What earthing system do Norwich properties typically have?',
    answer:
      'Most urban Norwich properties are supplied by UK Power Networks via a PME (Protective Multiple Earthing, TN-C-S) earthing arrangement. Under BS 7671 Regulation 722.411.4, the installer must carry out a PME earthing risk assessment before installing an EV charger. Rural Norfolk properties are more likely to have a TT (Terra Terra) earthing system, where the installation has its own earth electrode independent of the DNO supply. TT earthing simplifies the EV charger earthing assessment — no PME risk assessment is required — but the existing earth electrode resistance must be verified.',
  },
  {
    question: 'Can I get an EV charger installed at a rural Norfolk property?',
    answer:
      'Yes. Rural Norfolk properties with off-street parking (garages, barns, open driveways) are well suited to home EV charger installation. The main considerations are: (1) earthing — rural properties on TT earthing systems may have existing earth electrodes that need resistance testing; (2) supply capacity — older rural properties may have lower ampere capacity supplies that need checking before adding a 32A EV charger circuit; (3) cable run length — larger rural properties may require longer cable runs, adding to installation cost. A reputable NICEIC or NAPIT registered installer will carry out a survey to identify any issues before quoting.',
  },
  {
    question: 'What OZEV grant is available in Norwich?',
    answer:
      'The OZEV EV Chargepoint Grant provides up to £350 towards a home EV charger for eligible Norwich residents. Eligibility requires owning or having on order an eligible EV or plug-in hybrid, living in a flat or rented accommodation, and using an OZEV-approved installer. Homeowners in houses lost access to the residential grant from April 2022. Norwich businesses can apply separately for the Workplace Charging Scheme (up to £350 per socket, maximum 40 sockets).',
  },
  {
    question: 'How long does EV charger installation take in Norwich?',
    answer:
      'A straightforward home EV charger installation in Norwich typically takes 2 to 4 hours. Older Norwich properties — particularly Victorian terraces in areas such as Dereham Road, Aylsham Road, and the Golden Triangle — may require longer cable runs through loft spaces, adding 1 to 2 hours. Rural Norfolk installations with longer cable routes or the need to run armoured cable underground between buildings can take a full day.',
  },
  {
    question: 'Do I need planning permission for an EV charger in Norwich?',
    answer:
      'In most cases, no. Home EV charger installation in Norwich is permitted development, provided the unit protrudes no more than 0.2 metres from the wall. Norwich has a number of conservation areas — including the Cathedral Quarter and Tombland — and listed buildings in these areas may require prior consent. Contact Norwich City Council\'s planning department if your property is listed or within a conservation area before commissioning installation.',
  },
  {
    question: 'What charger should I choose for a Norfolk farmhouse or rural property?',
    answer:
      'For a rural Norfolk farmhouse or countryside property, a weatherproof 7kW outdoor smart charger is the standard choice. Popular models include the Ohme Home Pro (excellent for time-of-use tariff scheduling), the Myenergi Zappi (ideal if you have a solar PV system), and the Pod Point Solo 3. For very remote locations with limited connectivity, choose a charger with offline scheduling capability — some smart chargers require a reliable wifi connection for full functionality. Your installer will advise on the best model for your specific location.',
  },
  {
    question: 'Can I combine a solar PV system with an EV charger in Norfolk?',
    answer:
      'Yes, and this combination is particularly beneficial for Norfolk properties, which enjoy above-average sunshine hours for the UK. A solar-diverting smart charger such as the Myenergi Zappi uses surplus solar generation to charge your EV, effectively charging your car for free when solar output exceeds household demand. Norfolk\'s combination of larger property plots (enabling larger PV arrays) and significant solar resource makes this a compelling option. Your installer can assess the integration between your existing or planned PV system and the EV charger.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-installation-york',
    title: 'EV Charger Installation York',
    description: 'Home EV charging, OZEV grants, and approved installers in York.',
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
    href: '/ev-charger-installation-brighton',
    title: 'EV Charger Installation Brighton',
    description: 'OZEV grants, installation costs, and approved installers in Brighton & Hove.',
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
    id: 'ev-charging-norwich',
    heading: 'EV Charging in Norwich & Norfolk',
    content: (
      <>
        <p>
          Norwich is Norfolk's county city and the primary economic hub for the East of England
          outside the Greater London commuter belt. The city has a growing EV community, supported
          by Norfolk County Council's Local Transport Plan commitments to net zero transport and
          Norwich City Council's Climate Change Strategy. Home EV charger installation is
          particularly important in Norwich and across Norfolk, given the relatively sparse public
          charging network compared to larger English cities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public charging gaps</strong> — Norfolk's public charging infrastructure
                lags significantly behind urban areas such as London and Manchester. Outside
                Norwich, Gt Yarmouth, and King's Lynn, public rapid chargers are primarily
                located at motorway services and a small number of supermarkets. For Norfolk
                residents, home charging is not merely convenient — it is often essential for
                reliable daily EV use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV opportunity</strong> — Norfolk enjoys some of the highest
                sunshine hours in England. Combining a home EV charger with a solar PV system
                and a solar-diverting smart charger (such as the Myenergi Zappi) allows Norfolk
                homeowners to charge their EV largely for free during daylight hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing stock</strong> — Norwich has a varied housing stock including
                Victorian and Edwardian terraces (particularly in the city's inner suburbs),
                inter-war semis, and newer estates on the city's periphery. Rural Norfolk has
                a significant proportion of detached properties and agricultural buildings that
                offer excellent opportunities for EV charger installation with minimal cable
                routing complexity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you live in the Golden Triangle, Earlham, Thorpe St Andrew, Hellesdon, or
          anywhere across Norfolk, a home EV charger is the single most cost-effective investment
          you can make to support EV ownership.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV Grant — Up to £350 Off Your Norwich Installation',
    content: (
      <>
        <p>
          The OZEV EV Chargepoint Grant provides up to £350 towards a home EV charger for eligible
          Norwich and Norfolk residents. The grant is applied directly by your OZEV-approved
          installer and deducted from your invoice at the point of sale.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eligibility</strong> — you must own or have ordered an eligible EV or
                plug-in hybrid, and live in a flat or rented accommodation. Homeowners in houses
                are no longer eligible for the residential grant (from April 2022).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amount</strong> — up to £350, or 75% of total installation cost
                (whichever is lower). On a Norwich installation costing £900, the grant reduces
                your payment to £550.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Norwich businesses and Norfolk
                agricultural and rural enterprises can apply for the Workplace Charging Scheme
                (up to £350 per socket, maximum 40 sockets) for installing chargers at
                commercial, farm, or office premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer required</strong> — confirm your installer's
                OZEV status at gov.uk before committing. Non-approved installers cannot claim
                the grant on your behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'EV Charger Installation Process in Norwich',
    content: (
      <>
        <p>
          A home EV charger installation in Norwich follows the same core process as installations
          across England, with specific considerations for the area's earthing arrangements and
          older housing stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">1</span>
              <span>
                <strong>Pre-installation survey</strong> — assessment of consumer unit capacity,
                earthing arrangement (PME in urban Norwich; TT more common in rural Norfolk),
                cable route, and charger mounting location. Urban Norwich properties typically have
                PME earthing from UK Power Networks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">2</span>
              <span>
                <strong>Earthing assessment</strong> — for PME properties, a risk assessment
                under BS 7671 Regulation 722.411.4 is required. For TT properties (more common
                in rural Norfolk), the existing earth electrode is tested to verify suitability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">3</span>
              <span>
                <strong>Dedicated circuit installation</strong> — a new 32A radial circuit from
                the consumer unit to the charger, protected by an appropriate RCBO or MCB with
                RCD protection per Regulation 722.531.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">4</span>
              <span>
                <strong>Charger mounting and commissioning</strong> — wall mounting, connection,
                smart feature configuration (scheduling, tariff integration, solar divert where
                applicable), and pairing with the charging app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm shrink-0">5</span>
              <span>
                <strong>Testing, EIC, and Part P</strong> — verification testing per BS 7671
                Chapter 61, issue of EIC, self-certification under Part P (NICEIC/NAPIT registered
                installers), and submission of OZEV grant application on your behalf.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EV Charger Installation Costs in Norwich (2026)',
    content: (
      <>
        <p>
          Norwich EV charger installation costs are slightly below the South East average, reflecting
          Norfolk's more moderate trade labour rates. This makes Norwich one of the more affordable
          cities in England for home EV charger installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard 7kW home installation (Norwich)</strong> — £800 to £1,100 all-in,
                including charger unit, dedicated circuit, RCD protection, EIC, and Part P.
                After OZEV grant (where eligible): approximately £450 to £750.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural Norfolk installation</strong> — £900 to £1,300, reflecting typically
                longer cable runs, the potential need for armoured underground cable between house
                and outbuilding, and earth electrode installation where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade</strong> — £400 to £650 additional. Older Norwich
                properties (pre-1990) with full or outdated consumer units may require an upgrade
                before the EV charger circuit can be added.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode</strong> — £150 to £300 additional, if required by the
                earthing risk assessment. Common in rural Norfolk TT installations and some
                detached garage locations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Obtain at least two written, itemised quotes from OZEV-approved installers in the Norwich
          area. Confirm all costs are included and the OZEV grant deduction is shown where you are
          eligible.
        </p>
      </>
    ),
  },
  {
    id: 'rural-norfolk',
    heading: 'Rural Norfolk Properties — Specific Considerations',
    content: (
      <>
        <p>
          Norfolk has a significant proportion of rural residential properties including farmhouses,
          barns conversions, cottages, and detached houses with outbuildings. EV charger installation
          at rural Norfolk properties involves some specific technical and practical considerations
          beyond standard urban installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — rural Norfolk properties are often on TT
                earthing systems (own earth electrode, no PME). Under BS 7671 Regulation 722.411.4,
                TT properties do not require the PME earthing risk assessment needed for urban
                properties, but the existing earth electrode resistance must be measured to confirm
                suitability. Most rural installations on TT systems are straightforward from
                an earthing perspective.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Detached garage and outbuilding charging</strong> — many rural Norfolk
                properties have garages or agricultural outbuildings at some distance from the
                main house. Running an armoured cable underground between buildings is the
                preferred installation method. This requires careful routing to avoid buried
                services and may require a cable route survey at larger rural properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply capacity</strong> — older rural Norfolk properties may have lower
                service ampere ratings (60A or 80A supplies) from the DNO. Adding a 32A EV charger
                circuit may require a diversity assessment or, in some cases, a supply upgrade.
                Your installer should check the supply capacity at the survey stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV integration</strong> — rural Norfolk properties are ideal
                candidates for solar PV and EV charger integration. The Myenergi Zappi or similar
                solar-diverting charger allows surplus solar energy to be used for vehicle charging,
                significantly reducing energy costs for rural EV owners with high annual mileage.
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
          All EV charger installations in Norwich and Norfolk must comply with{' '}
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
                <strong>Regulation 722.411.4 — earthing</strong> — PME earthing risk assessment
                required for urban Norwich properties on PME supplies (UK Power Networks). TT
                system properties (common in rural Norfolk) require existing earth electrode
                resistance testing rather than a PME assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 722.531.2 — RCD protection</strong> — the EV charger circuit
                must be protected by an RCD. Where the charger incorporates Type B equivalent DC
                fault protection (most modern OZEV-approved smart chargers), a Type A RCBO at the
                consumer unit is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — EV charger on its own dedicated final circuit.
                32A radial for 7kW; 16A for 3.6kW.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — notifiable electrical work
                requiring self-certification by an NICEIC or NAPIT registered competent person,
                or prior notification to Norwich City Council or the relevant district council
                building control department.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-installer',
    heading: 'Choosing an OZEV-Approved Installer in Norwich',
    content: (
      <>
        <p>
          The Norwich and Norfolk area has a number of OZEV-approved EV charger installers, though
          the choice is smaller than in major cities. It is particularly important to verify
          qualifications and experience for rural Norfolk installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV registration</strong> — verify at gov.uk OZEV installer search.
                Some Norwich electricians cover the wider Norfolk area for EV installations —
                confirm the installer covers your specific location.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — verify on the scheme's online
                register. Particularly important for rural Norfolk installations where earthing
                arrangements and supply capacity require careful assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural installation experience</strong> — ask whether the installer has
                experience with TT earthing systems and armoured underground cable installations
                between buildings. Rural Norfolk EV installations have specific technical
                requirements that not all urban installers are familiar with.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written all-inclusive quote</strong> — confirm all costs are included:
                charger unit, cabling, protection devices, earth electrode (if required),
                commissioning, EIC, Part P certificate, and OZEV grant deduction where applicable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Norwich & Norfolk',
    content: (
      <>
        <p>
          Norwich and Norfolk represent a growth market for OZEV-approved EV charger installers.
          The relative scarcity of approved installers in the area means less competition and
          strong demand from both urban Norwich homeowners and rural Norfolk property owners.
          EV installations at rural Norfolk properties — with armoured cable runs, earth electrode
          installation, and solar PV integration — typically attract higher margins than standard
          urban installations.
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
                  to complete the EIC and OZEV documentation on your phone at the Norwich or
                  Norfolk property. No evening admin — send the certificate before you drive away.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Rural EV Jobs in Minutes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional EV charger quotes — including armoured cable, earth
                  electrodes, and consumer unit upgrades — using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Include OZEV grant deductions automatically and send a professional PDF quote
                  before leaving the site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV installation business in Norwich & Norfolk with Elec-Mate"
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

export default function EVChargerInstallationNorwichPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Norwich | EV Charging Norfolk"
      description="EV charger installation in Norwich and Norfolk. OZEV grants up to £350, installation costs £800–£1,100 for 7kW, rural Norfolk TT earthing considerations, BS 7671 Section 722 compliance, and NICEIC and NAPIT approved installers."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          EV Charger Installation Norwich:{' '}
          <span className="text-yellow-400">Home EV Charging across Norfolk 2026</span>
        </>
      }
      heroSubtitle="Everything Norwich and Norfolk residents need to know about home EV charger installation — OZEV grants up to £350, typical costs of £800 to £1,100 for a 7kW unit, rural Norfolk earthing considerations, and how to find a qualified OZEV-approved installer."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Norwich & Norfolk"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Installation Certificates On Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EV certification, OZEV documentation, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
