import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Cable,
  GraduationCap,
  Calculator,
  Gauge,
  CheckCircle,
  Zap,
  PoundSterling,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charging at Home', href: '/guides/electric-car-charging-at-home' },
];

const tocItems = [
  { id: 'overview', label: 'Home EV Charging Overview' },
  { id: 'three-pin-vs-wallbox', label: '3-Pin Plug vs Wallbox' },
  { id: 'charging-speeds', label: '7kW vs 22kW Charging' },
  { id: 'installation-cost', label: 'Installation Cost' },
  { id: 'smart-charging', label: 'Smart Charging Requirements' },
  { id: 'ozev-grant', label: 'OZEV/EVHS Grant (Ended)' },
  { id: 'part-s', label: 'Part S Building Regulations' },
  { id: 'electrical-requirements', label: 'Electrical Requirements' },
  { id: 'for-electricians', label: 'For Electricians Installing EV Chargers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A dedicated 32A radial circuit with 6mm2 or 10mm2 cable is required for a 7kW home wallbox charger, protected by a Type A or Type B RCBO at the consumer unit.',
  'The OZEV/EVHS grant for homeowners ended on 31 March 2022. Grants of up to £350 per socket are still available for landlords, tenants, and residential car park owners through the EV Chargepoint Grant.',
  'Part S of the Building Regulations (England) requires all new-build dwellings with associated parking to have an EV charge point installed, effective from 15 June 2022.',
  'Smart charging is now mandatory for all domestic wallbox installations under the Electric Vehicles (Smart Charge Points) Regulations 2021 — chargers must be WiFi-connected and capable of off-peak scheduling.',
  'Elec-Mate cable sizing calculators, EIC certificates, and quoting tools let electricians design, certify, and invoice EV charger installations on site.',
];

const faqs = [
  {
    question: 'Can I charge an electric car from a normal 3-pin plug?',
    answer:
      'Technically, yes — most electric vehicles come with a portable charger (granny cable) that plugs into a standard 13A domestic socket. However, this is not recommended as a primary charging method. A 3-pin plug charge delivers approximately 2.3kW, which means a full charge takes 12 to 24 hours depending on the battery size. More importantly, drawing 13A continuously for many hours puts significant stress on the socket and the circuit it is connected to. If the socket has poor connections, is old, or is on a circuit with other loads, there is a risk of overheating. Standard domestic sockets are designed for intermittent use, not continuous high-current loads. The cable, the plug, the socket, the faceplate, and the connections behind the socket all generate heat when carrying 13A continuously — and any weakness in the circuit is a potential fire risk. For regular daily charging, a dedicated wallbox on its own circuit is significantly safer, faster, and more convenient.',
  },
  {
    question: 'How fast does a 7kW wallbox charge an electric car?',
    answer:
      'A 7kW wallbox (the standard for single-phase domestic installations) delivers approximately 30 miles of range per hour of charging, depending on the vehicle. For a typical electric car with a 60kWh battery, a full charge from empty takes approximately 8 to 9 hours. This makes overnight charging the ideal use case — plug in when you get home in the evening, wake up to a full battery in the morning. Most electric car owners rarely charge from empty; a more typical daily top-up of 20 to 30kWh (enough for 70 to 100 miles of driving) takes 3 to 4 hours on a 7kW charger. A 7kW wallbox draws approximately 32A on a single-phase 230V supply, which is why it requires a dedicated 32A circuit. The actual power delivered may be slightly less than 7kW due to efficiency losses in the charger and the vehicle on-board charger.',
  },
  {
    question: 'What is the difference between 7kW and 22kW home charging?',
    answer:
      'A 7kW charger operates on a single-phase 230V supply and delivers approximately 30 miles of range per hour. This is the standard for most UK domestic installations because the vast majority of homes have a single-phase supply. A 22kW charger operates on a three-phase 400V supply and delivers approximately 90 miles of range per hour — three times faster. However, 22kW home charging is uncommon in the UK for several reasons: (1) most UK homes do not have a three-phase supply, and installing one requires a DNO application, new cabling, and a three-phase meter — adding £2,000 to £5,000 to the installation cost; (2) many electric cars have on-board chargers rated at only 7kW or 11kW on AC, meaning even if you install a 22kW wallbox, the car may not charge at the full 22kW; (3) for most domestic use cases, 7kW overnight charging is more than sufficient. 22kW charging is more relevant for commercial and workplace installations where faster turnaround is needed.',
  },
  {
    question: 'How much does it cost to install a home EV charger?',
    answer:
      'The total cost of a home EV charger installation in the UK typically ranges from £800 to £1,500 for a standard installation, including the charger unit and electrical work. The main cost components are: (1) the wallbox charger itself — smart chargers from established brands (Pod Point, Ohme, Zappi, Easee, Andersen) cost between £400 and £900; (2) the electrical installation — running a dedicated 32A circuit from the consumer unit to the charger location, including cable, MCB/RCBO, earth rod (if required), and the external cable run. The electrical work typically costs £400 to £800 for a straightforward installation. Costs increase if the consumer unit needs upgrading, the cable run is long (garage at the end of a long garden), or if the DNO supply needs upgrading to handle the additional load. Complex installations can cost £2,000 to £3,000. Always get a survey before quoting — the cable route and consumer unit capacity are the two biggest variables.',
  },
  {
    question: 'Is an earth rod required for EV charger installation?',
    answer:
      'An earth rod may be required depending on the earthing arrangement of the supply and the charger location. If the property has a TN-C-S (PME) supply — which is the most common arrangement in the UK — and the charger is installed outdoors (which most are), there is a risk of a lost PEN conductor. If the PEN conductor is lost, the metalwork of the charger and the vehicle could rise to a dangerous potential. BS 7671 Regulation 722.411.4.1 addresses this by requiring additional protective measures for EV charging installations supplied by PME systems. The common solutions are: (1) install a TT earth (earth rod) for the EV charger circuit, providing an independent earth path; (2) use an RCBO or RCD-protected circuit with a Type A or Type B RCD that will disconnect in the event of a PEN conductor fault; (3) use a charger with integrated PEN fault detection (some modern chargers include this feature). In practice, most OZEV-approved installers fit an earth rod as standard for PME supplies, as it provides the most robust protection.',
  },
  {
    question: 'What are the Part S Building Regulations for EV charging?',
    answer:
      'Part S of the Building Regulations (Infrastructure for the Charging of Electric Vehicles) came into effect on 15 June 2022 in England. It requires: (1) every new-build dwelling with associated parking (a garage, driveway, or allocated parking space) to have an EV charge point installed — this means a fully functional wallbox charger, not just cable pre-routing; (2) new non-residential buildings with more than 10 parking spaces to have at least one EV charge point and cable routes for one in five spaces; (3) residential buildings undergoing a material change of use with more than 10 parking spaces to have cable routes installed. For electricians, Part S creates guaranteed demand for EV charger installation on every new-build project with parking. The electrical supply, circuit, and certification are required as part of the building sign-off — Building Control will not sign off the property without a completed EV charger installation and the associated EIC.',
  },
  {
    question: 'What smart charging features are required by law?',
    answer:
      'The Electric Vehicles (Smart Charge Points) Regulations 2021 require all domestic EV charge points sold or installed in the UK to include specific smart charging features: (1) WiFi connectivity — the charger must be capable of connecting to the internet; (2) off-peak default — the charger must default to charging during off-peak hours (currently defined as outside 8am-11am and 4pm-10pm on weekdays); (3) demand side response capability — the charger must be capable of receiving and responding to signals from the electricity network to reduce or shift charging load during peak demand; (4) randomised delay — when the charger starts after a period of unavailability, it must apply a random delay of up to 10 minutes to prevent all chargers on a street starting simultaneously; (5) charge scheduling — the user must be able to set their own charging schedule; (6) data recording — the charger must record energy consumption data. Non-smart chargers (basic on/off units without WiFi) can no longer legally be installed in domestic settings. All major wallbox brands now comply with these regulations as standard.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ev-charger-certificate',
    title: 'EV Charger Certificate',
    description:
      'Generate BS 7671 compliant EV charger certificates with all required test results and schedules.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the dedicated 32A circuit for EV charger installations with full correction factors.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/max-demand-calculator',
    title: 'Max Demand Calculator',
    description: 'Check whether the existing supply can handle the additional EV charger load.',
    icon: Gauge,
    category: 'Calculator',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'MCB, RCBO, and SPD requirements when adding a new EV charger circuit to the consumer unit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-C-S (PME) considerations for EV charger installations including earth rod requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation (Full Technical)',
    description:
      'Detailed technical guide to EV charger installation covering all aspects of BS 7671 Section 722.',
    icon: Car,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Home EV Charging: What You Need to Know',
    content: (
      <>
        <p>
          Electric vehicle ownership in the UK is growing rapidly. Over 1 million battery electric
          vehicles (BEVs) are now registered on UK roads, and the ban on new petrol and diesel car
          sales is set for 2035. For most EV owners, home charging is the primary method of keeping
          their vehicle charged — it is cheaper, more convenient, and faster than relying on the
          public charging network.
        </p>
        <p>
          Installing a home EV charger is a specialist electrical job that requires a dedicated
          circuit from the consumer unit, correct cable sizing, appropriate protective devices, and
          an Electrical Installation Certificate (EIC). The installation must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722 (Electric Vehicle Charging Installations) and the Electric Vehicles (Smart
          Charge Points) Regulations 2021.
        </p>
        <p>
          This guide covers everything homeowners need to know about home EV charging — from the
          basics of 3-pin charging vs wallbox installation, through charging speeds and costs, to
          the regulatory requirements. For electricians, we cover the technical installation
          requirements and how to make EV charger work a profitable part of your business.
        </p>
      </>
    ),
  },
  {
    id: 'three-pin-vs-wallbox',
    heading: '3-Pin Plug vs Dedicated Wallbox',
    content: (
      <>
        <p>
          There are two ways to charge an electric car at home: using a portable charger plugged
          into a standard domestic socket, or using a dedicated wallbox charger on its own circuit.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">3-Pin Plug Charging (2.3kW)</h3>
            <p className="text-white text-sm leading-relaxed">
              Uses the portable charger (granny cable) supplied with the vehicle, plugged into a
              standard 13A socket. Delivers approximately 8 miles of range per hour — a full charge
              takes 12 to 24 hours. Not recommended for daily use because: the socket and circuit
              are not designed for continuous high-current loads; there is a risk of overheating at
              the plug, socket, or connections; the circuit may be shared with other loads; and
              there is no ground fault protection beyond the standard MCB/RCD. Acceptable as
              emergency or occasional use, but not as a primary charging solution.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Wallbox Charger (7kW)</h3>
            <p className="text-white text-sm leading-relaxed">
              A purpose-built charging unit installed on a wall (house wall, garage wall, or a
              mounting post) and connected to a dedicated 32A circuit from the consumer unit.
              Delivers approximately 30 miles of range per hour — a full charge takes 8 to 9 hours.
              The dedicated circuit is designed for continuous high-current loads, with correct
              cable sizing, appropriate protective devices (RCBO), and earth protection (earth rod
              on PME supplies). Smart features include WiFi connectivity, off-peak scheduling, and
              energy monitoring. This is the recommended and legally compliant solution for regular
              home charging.
            </p>
          </div>
        </div>
        <p>
          The safety difference is significant. A wallbox on a dedicated circuit is designed and
          tested for continuous 32A operation. A standard 13A socket is not. For anyone charging
          daily, a wallbox is the only sensible option.
        </p>
      </>
    ),
  },
  {
    id: 'charging-speeds',
    heading: '7kW vs 22kW: Home Charging Speeds Explained',
    content: (
      <>
        <p>
          The charging speed of a home wallbox depends on the power rating of the charger and the
          on-board charger capacity of the vehicle. There are two main options for home charging:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7kW single-phase (most common):</strong> Draws approximately 32A from a
                standard single-phase 230V supply. Delivers 30 miles of range per hour. A 60kWh
                battery charges from empty in approximately 8-9 hours — ideal for overnight
                charging. This is the standard for UK domestic installations because most homes have
                a single-phase supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase (uncommon domestic):</strong> Requires a three-phase 400V
                supply. Delivers approximately 90 miles of range per hour. A 60kWh battery charges
                from empty in approximately 3 hours. Rare in UK domestic settings because most homes
                lack a three-phase supply and many vehicles have on-board chargers limited to 7kW or
                11kW on AC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The vehicle's on-board charger is the limiting factor. Even if you install a 22kW wallbox,
          a car with a 7kW on-board charger will still charge at only 7kW. Most popular EVs in the
          UK (Tesla Model 3, Volkswagen ID.3, Hyundai Ioniq 5, Nissan Leaf) have 7kW or 11kW
          on-board AC chargers. Some premium models (BMW i4, Porsche Taycan, Renault Megane E-Tech)
          offer 22kW on-board chargers. Always check the vehicle specification before recommending a
          charging solution.
        </p>
      </>
    ),
  },
  {
    id: 'installation-cost',
    heading: 'Installation Cost: What to Expect',
    content: (
      <>
        <p>
          The total cost of a home EV charger installation depends on the charger model, the cable
          run length, the consumer unit capacity, and any additional work required (earth rod,
          supply upgrade, external containment).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charger unit:</strong> £400 to £900 for a smart wallbox from a recognised
                brand. Budget options exist below £400 but may lack smart features or have limited
                warranty periods. Premium chargers with solar integration or load management can
                cost up to £1,200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (electrical):</strong> £400 to £800. This covers a
                dedicated 32A circuit from the consumer unit to the charger location, including
                cable (6mm2 SWA typically), RCBO, earth rod (if required on PME supply), external
                cable containment, and testing and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional costs:</strong> Consumer unit upgrade (if no spare ways or
                non-compliant): £400 to £800. Long cable runs (garage at end of garden): add £100 to
                £300. Supply upgrade (if maximum demand exceeds capacity): £500 to £3,000 depending
                on the DNO. Mounting post (if no suitable wall): £200 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total typical cost:</strong> £800 to £1,500 for a straightforward
                installation. £1,500 to £3,000 for complex installations with consumer unit upgrades
                or long cable runs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-charging',
    heading: 'Smart Charging: Legal Requirements',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 came into force on 30 June
          2022. All domestic EV charge points installed in the UK must now be "smart" — meaning they
          must have specific digital features.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>WiFi connectivity:</strong> The charger must be capable of connecting to the
                internet via WiFi (or Ethernet/mobile data as alternatives). This enables remote
                control, firmware updates, and demand-side response.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak default:</strong> The charger must be pre-set to charge during
                off-peak hours. The defined peak periods are 8am to 11am and 4pm to 10pm on
                weekdays. The user can override this, but the default must favour off-peak charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demand-side response:</strong> The charger must be capable of receiving and
                responding to signals from the electricity network operator to reduce or shift
                charging load during periods of high grid demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Randomised delay:</strong> When the charger starts after a power outage or
                reconnection, it must apply a random delay of up to 10 minutes to prevent all
                chargers on a street starting simultaneously and overloading the local network.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy metering:</strong> The charger must record energy consumption data,
                allowing the user to monitor how much electricity their vehicle is using.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All major wallbox brands (Pod Point, Ohme, Zappi, Easee, Andersen, Hypervolt) now comply
          with these regulations. Non-smart chargers can no longer be legally installed in domestic
          settings. As an electrician, always confirm the charger model is compliant before
          installation.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grant',
    heading: 'OZEV/EVHS Grant: What Happened and What Remains',
    content: (
      <>
        <p>
          The Electric Vehicle Homecharge Scheme (EVHS) — also known as the OZEV grant — provided a
          £350 contribution towards the cost of installing a home EV charger. The grant was
          administered by the Office for Zero Emission Vehicles (OZEV) and covered a portion of the
          charger and installation costs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Homeowner grant ended 31 March 2022.</strong> The EVHS grant for homeowners
                living in houses (with off-street parking) closed on 31 March 2022. Homeowners must
                now pay the full cost of installation. The grant was worth up to £350 per socket.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV Chargepoint Grant (still available):</strong> A replacement scheme — the
                EV Chargepoint Grant — is still available for: (1) landlords installing charge
                points at rented properties; (2) owner-occupiers and tenants in flats (where
                off-street parking is shared); (3) residential car park owners and managers. The
                grant provides up to £350 per socket (capped at 75% of the total cost) for up to 200
                sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme (WCS):</strong> Businesses and public sector
                organisations can claim up to £350 per socket for up to 40 sockets. The WCS is
                popular with employers providing staff charging facilities and with commercial
                premises offering customer charging.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, the grant schemes provide a steady pipeline of{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV charger installations
          </SEOInternalLink>
          . OZEV-approved installer status is required to process grant claims, and this status is
          obtained through the charger manufacturer's installer scheme (for example, Pod Point
          Approved, Ohme Approved, or manufacturer-agnostic schemes through NICEIC and NAPIT).
        </p>
      </>
    ),
  },
  {
    id: 'part-s',
    heading: 'Part S Building Regulations: New-Build Requirements',
    content: (
      <>
        <p>
          Part S of the Building Regulations (Infrastructure for the Charging of Electric Vehicles)
          came into effect on 15 June 2022 in England. It creates a legal requirement for EV
          charging infrastructure in new buildings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New-build dwellings:</strong> Every new dwelling with associated parking
                (driveway, garage, or allocated space) must have a fully installed, working EV
                charge point. Not just cable ducting or a pre-wired circuit — a complete, functional
                wallbox charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New non-residential buildings:</strong> Buildings with more than 10 parking
                spaces must have at least one EV charge point and cable routes (ducting/containment)
                for one in five spaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Material change of use:</strong> Residential buildings undergoing material
                change of use with more than 10 parking spaces must install cable routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Control sign-off:</strong> The EV charger installation must be
                completed and certified (with an EIC) before Building Control will sign off the
                property. This creates guaranteed work for electricians on every new-build project
                with parking.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Part S applies in England. Scotland and Wales have similar provisions through their own
          building standards. For electricians working with developers and house builders, Part S
          creates a reliable volume of EV charger installation work on every new housing
          development.
        </p>
        <SEOAppBridge
          title="Certify new-build EV charger installations"
          description="Elec-Mate generates the Electrical Installation Certificate for EV charger circuits on your phone. Fill in the schedule of test results, record the earth rod resistance, and send the completed EIC to the developer before you leave site."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'electrical-requirements',
    heading: 'Electrical Requirements for Home EV Chargers',
    content: (
      <>
        <p>
          The electrical installation for a home EV charger must comply with BS 7671:2018+A3:2024
          Section 722 (Electric Vehicle Charging Installations). The key requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit:</strong> A 32A radial circuit from the consumer unit.
                Typically 6mm2 SWA cable for the external run and 6mm2 T&E for the internal section.
                10mm2 may be needed for long runs to keep voltage drop within the 5% limit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO protection:</strong> A 32A Type A or Type B RCBO at the consumer unit.
                Type A RCDs detect both AC and pulsating DC fault currents — important because EV
                chargers with rectifier circuits can produce DC fault components that a standard
                Type AC RCD may not detect. Some chargers include integrated Type A RCD protection,
                in which case a Type AC RCBO at the consumer unit may be acceptable — check the
                manufacturer data.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing considerations:</strong> On TN-C-S (PME) supplies, Regulation
                722.411.4.1 requires additional protective measures because of the risk of a lost
                PEN conductor. The most common approach is to install a TT earth (earth rod) for the
                EV charger circuit. The earth rod must achieve a resistance of 200 ohms or less (or
                meet the Zs requirement for the protective device) and must be tested and recorded
                on the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation:</strong> A local isolator must be installed adjacent to the
                charger for safe isolation during maintenance. Some chargers include an integral
                isolator — check the model specification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before installation, check the{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">maximum demand</SEOInternalLink> of
          the property. Adding a 7kW (32A) continuous load to a property already drawing 60A at peak
          times may exceed the supply capacity. If the total demand exceeds the supply fuse rating,
          a DNO application for a supply upgrade is needed — or a charger with dynamic load
          management (which limits the charging current based on the real-time household demand) can
          be used as an alternative.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work as a Business',
    content: (
      <>
        <p>
          EV charger installation is one of the fastest-growing segments of domestic electrical
          work. With EV sales increasing year on year, Part S mandating chargers in new builds, and
          grants still available for landlords and flats, the demand pipeline is strong and growing.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Circuit Design on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to size the circuit during the survey. Enter the charger rating, cable length,
                  installation method, and correction factors. Get the cable size, MCB rating, and
                  voltage drop check instantly — then build the quote on the spot.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and EV Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on your phone. Elec-Mate includes
                  the specific fields for EV charger installations — earth rod test results, RCD
                  type, PME protection measures. Generate a professional PDF and send to the
                  customer before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Invoice from Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the EV charger installation using Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Charger unit, cable, RCBO, earth rod, labour, and margin. Send a professional
                  PDF quote from the survey visit. Do the job. Send the invoice. All from your
                  phone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Survey, quote, install, certify, invoice — all on your phone"
          description="Cable sizing, EIC certificates, EV charger compliance, quoting, and invoicing — in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricCarChargingAtHomePage() {
  return (
    <GuideTemplate
      title="Electric Car Charging at Home | Installation Guide UK"
      description="Complete guide to electric car charging at home in the UK. 3-pin vs wallbox, 7kW vs 22kW charging speeds, installation costs, smart charging regulations, OZEV grant status, Part S building regulations, and electrical requirements under BS 7671 Section 722."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Car}
      heroTitle={
        <>
          Electric Car Charging at Home:{' '}
          <span className="text-yellow-400">Everything You Need to Know</span>
        </>
      }
      heroSubtitle="A home wallbox charger on a dedicated 32A circuit is the safest, fastest, and most convenient way to charge an electric car. This guide covers 3-pin vs wallbox charging, 7kW vs 22kW speeds, installation costs, smart charging laws, grant availability, Part S regulations, and the electrical requirements electricians need to meet."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Home EV Charging"
      relatedPages={relatedPages}
      ctaHeading="Design, Certify, and Invoice EV Charger Installations"
      ctaSubheading="Cable sizing, EIC certificates, EV compliance, quoting, and invoicing — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
