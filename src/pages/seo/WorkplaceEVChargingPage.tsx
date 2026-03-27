import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building2,
  PoundSterling,
  Zap,
  ShieldCheck,
  Settings,
  AlertTriangle,
  BarChart2,
  Users,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'Workplace EV Charging', href: '/workplace-ev-charging' },
];

const tocItems = [
  { id: 'wcs-grant', label: 'Workplace Charging Scheme Grant' },
  { id: 'planning-permission', label: 'Planning Permission' },
  { id: 'load-balancing-fleets', label: 'Load Balancing for Fleets' },
  { id: 'three-phase-vs-single', label: '3-Phase vs Single Phase' },
  { id: 'employee-vs-visitor', label: 'Employee vs Visitor Charging' },
  { id: 'costs', label: 'Typical Installation Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Workplace Charging Scheme (WCS) provides a grant of £350 per socket, up to a maximum of 40 sockets (£14,000) per business — one of the most generous EV infrastructure grants available to UK businesses.',
  'Building Regulations Part S requires new non-residential buildings with more than 10 car parking spaces to have cable routes (ducting) for EV charge points, and at least one active charge point per 5 spaces. This applies to buildings completed from 2022.',
  'Dynamic load balancing allows multiple charge points to share a single incoming supply, automatically distributing available capacity — avoiding costly DNO supply upgrades that can cost £3,000–15,000.',
  'Three-phase supplies (common in commercial premises) allow 22kW per charger versus 7.4kW on single phase, significantly reducing charge times for fleet vehicles.',
  'OZEV requires all WCS-funded chargers to appear on the approved product list and be installed by an OZEV-registered installer. The installation must include a BS 7671 electrical installation certificate.',
];

const faqs = [
  {
    question: 'How much is the Workplace Charging Scheme (WCS) grant?',
    answer:
      'The Workplace Charging Scheme provides a grant of £350 per socket, up to a maximum of 40 sockets per business application. The maximum grant per business is therefore £14,000. The grant covers the cost of purchase and installation of eligible EV charge points. Businesses apply through an OZEV-approved installer — the installer claims the grant on the business\'s behalf and discounts it from the invoice. Eligible businesses include private sector companies, charities, and public authorities, but not residential landlords (who should apply through the EVHS instead).',
  },
  {
    question: 'Do I need planning permission to install workplace EV chargers?',
    answer:
      'In most cases, workplace EV charger installation falls within permitted development rights under the Town and Country Planning (General Permitted Development) Order 2015, as amended. However, planning permission may be required if: the property is a listed building or in a conservation area; the charger is to be installed on a wall or roof and exceeds dimension limits; or the local authority has removed permitted development rights via an Article 4 direction. For car park canopy installations (solar canopies with integrated chargers), planning permission is almost always required. Always check with the local planning authority before assuming permitted development applies to a commercial site.',
  },
  {
    question: 'How does load balancing work for a fleet of workplace EV chargers?',
    answer:
      'Dynamic load balancing uses current transformers (CT clamps) on the incoming supply to measure total building demand in real time. A load management controller (integrated into the chargers or as a separate device) distributes the remaining available capacity across all active charge points. For example, a 200A three-phase supply serving a building with a typical peak demand of 120A would have 80A of spare capacity. If 10 chargers are connected, each receives 8A initially (approximately 5.5kW on 3-phase). As vehicles complete charging or the building load drops, available capacity is redistributed automatically. This approach can allow 10–20 chargers to be installed on a supply that would otherwise support only 2–3 if each ran at full power simultaneously.',
  },
  {
    question: 'Should I install 3-phase or single-phase workplace chargers?',
    answer:
      'The answer depends on the available supply, vehicle types, and dwell time. Three-phase 22kW chargers are ideal for fleet vehicles that need to be fully charged in 2–4 hours (typical midday turnaround). However, most current EV models only accept 7.4kW on AC even if a 22kW charger is installed (the vehicle\'s onboard charger is the limiting factor). Single-phase 7.4kW chargers are sufficient for employee charging where vehicles park for 8+ hours overnight or during a working day. The cost difference between single-phase (7.4kW) and three-phase (22kW) chargers is typically £200–500 per unit. For mixed fleets, a combination of 22kW units for vans and 7.4kW units for cars is often the most cost-effective approach.',
  },
  {
    question: 'Can employees charge their personal EVs at work?',
    answer:
      'Yes, and HMRC provides a specific benefit-in-kind exemption: where an employer provides electricity for an employee to charge their own EV at the workplace, this does not count as a taxable benefit (ITEPA 2003, s.239). This means employees can charge for free at work without any tax liability. However, if the employer provides a home charger or contributes to home charging costs, different rules apply. HMRC\'s guidance on electric vehicles at work (Employment Income Manual EIM23900) sets out the full position. For visitor charging, a separate payment system (contactless payment or RFID) is typically used and the income may need to be accounted for as business revenue.',
  },
  {
    question: 'What does Part S of the Building Regulations require for new commercial buildings?',
    answer:
      'Part S of the Building Regulations (England) came into force on 15 June 2022 (via the Building Regulations etc. (Amendment) (England) Regulations 2021). For new non-residential buildings with more than 10 car parking spaces, Part S requires: at least one active EV charge point (minimum 7kW) for every 5 spaces, with a minimum of one charge point regardless of the number of spaces; and cable routes (ducting) for all remaining spaces not served by active charge points (enabling future installation without groundworks). For existing non-residential buildings undergoing major renovation where the car park has more than 10 spaces, the same active charge point ratio applies. Compliance with Part S must be demonstrated to building control.',
  },
  {
    question: 'What access control options are available for workplace chargers?',
    answer:
      'Workplace chargers typically support RFID card or key fob access control, allowing only authorised users (employees or registered visitors) to start a charging session. More sophisticated systems offer smartphone app activation, allowing employees to start, stop, and monitor sessions remotely. For visitor charging open to the public (e.g., retail car parks), chargers must comply with the Public Charge Point Regulations 2023, which require contactless payment capability and a transparent pricing display. Network-connected chargers allow remote monitoring, access management, and reporting via a management portal — useful for large fleet installations and for generating HMRC-compliant mileage reimbursement data.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-grants',
    title: 'EV Charger Grants UK',
    description: 'Full guide to EVHS and WCS grants — eligibility, amounts, and how to apply.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/smart-ev-charging',
    title: 'Smart EV Charging',
    description: 'Smart Charge Points Regulations 2021, off-peak tariffs, and solar integration.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/ev-charging-legislation',
    title: 'EV Charging Legislation UK',
    description: 'Building Regulations Part S, BS 7671 Section 722, and the legal framework.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/ev-charger-brand-comparison',
    title: 'EV Charger Brand Comparison',
    description: 'Compare Zappi, Ohme, Pod Point, Easee, and Wallbox for commercial use.',
    icon: BarChart2,
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
    id: 'wcs-grant',
    heading: 'Workplace Charging Scheme (WCS) — £350 Per Socket',
    content: (
      <>
        <p>
          The Workplace Charging Scheme is a government grant administered by OZEV (Office for
          Zero Emission Vehicles) that provides UK businesses with a contribution towards the
          cost of purchasing and installing EV charge points at their premises. The grant provides{' '}
          <strong>£350 per socket</strong>, with a maximum of{' '}
          <strong>40 sockets per business</strong> (£14,000 maximum per applicant).
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4 my-4">
          <p className="text-white text-sm leading-relaxed">
            <strong>2026 status:</strong> The Workplace Charging Scheme is open to applications in
            2026. Applicants should confirm current availability and deadline dates with the Office
            for Zero Emission Vehicles (OZEV) before applying, as scheme terms are subject to
            periodic review.
          </p>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who is eligible</strong> — UK-based businesses, charities, and public
                authorities with dedicated off-street parking. The charge points must be for
                use by employees, fleet vehicles, or workers. The business must have fewer than
                the number of charge points it is applying for already installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to apply</strong> — applications are made through an OZEV-approved
                installer. The installer applies on the business's behalf via the OZEV online
                portal, receives authorisation, carries out the installation, and claims the grant
                — discounting it from the customer's invoice. The business pays only the net cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved chargers</strong> — the charger must appear on the OZEV-approved
                product list. All products on the list comply with the Electric Vehicles (Smart
                Charge Points) Regulations 2021. Major approved brands include Pod Point, Ohme,
                Zappi, Easee, Wallbox, and EO Charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation requirements</strong> — a BS 7671 electrical installation
                certificate must be provided. The{' '}
                <SEOInternalLink href="/tools/ev-charging-certificate">
                  EV charging certificate
                </SEOInternalLink>{' '}
                must cover the circuit protective device, earthing arrangement, protective
                conductor, and test results in accordance with{' '}
                <SEOInternalLink href="/ev-charging-legislation">
                  BS 7671 Section 722
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          The WCS was originally available for small and medium enterprises only, but the scheme
          was expanded to include all businesses. The grant has been instrumental in accelerating
          workplace charging infrastructure across the UK, with over 90,000 sockets funded since
          the scheme launched.
        </p>
      </>
    ),
  },
  {
    id: 'planning-permission',
    heading: 'Planning Permission for Commercial EV Charger Installations',
    content: (
      <>
        <p>
          Most standard workplace EV charger installations fall within permitted development
          rights, but commercial properties present more varied circumstances than residential
          installations. Understanding when planning permission is required protects both the
          installer and the client.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development (Class A, Part 2, Schedule 2, GPDO 2015)</strong>
                — EV charge points on or within the curtilage of non-domestic buildings are
                generally permitted development, subject to conditions including that no part of
                the charge point projects more than 0.6m from a wall or 1.6m from the ground
                (for wall-mounted units), and that the charge point is not installed on a listed
                building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When planning permission is required</strong> — listed buildings and
                their curtilage, conservation areas (for some types of charge point), car park
                canopy structures (which constitute new buildings), and sites where Article 4
                directions remove permitted development rights.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part S compliance</strong> — new non-residential buildings and major
                renovations must comply with Part S of the Building Regulations. This requires
                active charge points and cable ducting for future charge points. Building control
                approval is required as part of the overall building consent, separate from
                planning permission.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO notification</strong> — installations above a certain size (typically
                above 3.68kW for single chargers, or multiple chargers) may require notification
                to the Distribution Network Operator under G99 (for installations above 16A per
                phase) or the G98 self-certification process.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'load-balancing-fleets',
    heading: 'Load Balancing for Fleet Charging',
    content: (
      <>
        <p>
          Installing multiple charge points for a commercial fleet without load management risks
          overloading the building's incoming supply, resulting in tripped fuses, damaged
          equipment, and unplanned downtime. Dynamic load balancing is not optional for fleet
          installations — it is a fundamental part of the design.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CT clamp monitoring</strong> — current transformers on the incoming
                supply measure total building load. The load management system subtracts this
                from the available supply capacity to determine how much power can be allocated
                to EV charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Priority charging</strong> — most commercial load management systems
                allow priority rules to be configured. Fleet vehicles that need to depart at
                a specific time can be given charging priority, ensuring they are fully charged
                first even when capacity is limited.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Network management portals</strong> — networked charge points (Pod Point
                Pro, Easee Charge, Wallbox Commander) provide fleet managers with a web portal
                showing real-time charge status, energy consumption by vehicle, session history,
                and cost allocation reports. Essential for managing employee EV charging costs
                and generating HMRC-compliant records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage integration</strong> — large fleet charging installations
                can benefit from behind-the-meter battery storage. Batteries charge during
                off-peak periods and discharge to support EV charging during peak hours, reducing
                demand charges and avoiding supply upgrade costs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase-vs-single',
    heading: '3-Phase vs Single Phase for Fleet Charging',
    content: (
      <>
        <p>
          The choice between single-phase and three-phase EV chargers for a workplace or fleet
          installation depends on supply availability, vehicle capability, and required charge
          times. Many commercial premises already have three-phase supplies, making 22kW
          charging straightforward to implement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase 7.4kW</strong> — suitable for car-park employee charging
                where vehicles park for 6–10 hours. A 7.4kW charger adds approximately 35–40
                miles of range per hour. For a 60kWh battery starting at 20%, a full charge
                takes approximately 7 hours. Lower infrastructure cost; single-phase circuits
                from a standard distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase 22kW</strong> — ideal for fleet vehicles with high daily
                mileage requiring rapid turnaround. Delivers up to 22kW (subject to the
                vehicle's onboard charger accepting 3-phase AC, which most vans and some premium
                cars do). A 75kWh commercial van battery charges in 3.5–4 hours at 22kW.
                Requires three-phase supply and a dedicated circuit per charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle onboard charger limits</strong> — most current passenger EVs
                are limited to 7.4kW AC (single-phase). Installing a 22kW charger for these
                vehicles provides no speed benefit. Check the specific vehicle's maximum AC
                charge rate before specifying charger hardware. Commercial vans (Ford E-Transit,
                Volkswagen ID. Buzz Cargo, Mercedes eSprinter) typically accept 11kW or 22kW.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost comparison</strong> — a single-phase 7.4kW charger costs
                approximately £500–900 supply and install per socket. A three-phase 22kW
                charger costs £800–1,800 supply and install. For a 10-charger fleet
                installation, the difference may be £3,000–9,000 — often justified if the
                fleet includes commercial vans with 22kW onboard chargers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'employee-vs-visitor',
    heading: 'Employee vs Visitor Charging',
    content: (
      <>
        <p>
          Workplace EV charging infrastructure must account for two distinct use cases: employee
          charging (typically long-dwell, low-power, access-controlled) and visitor charging
          (short-dwell, payment-enabled, publicly accessible). These have different technical
          and regulatory requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employee charging — benefit in kind exemption</strong> — HMRC does not
                treat free workplace EV charging as a benefit in kind under ITEPA 2003 s.239,
                provided the charging facility is available to all employees generally. Employers
                can offer free charging without creating an additional tax liability for the employee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employee access control</strong> — RFID cards, fobs, or app-based
                authentication restrict charger access to authorised employees. Network-connected
                chargers log each session against the employee's RFID, providing data for
                mileage reimbursement records.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public visitor charging — PCP Regulations 2023</strong> — if charge
                points are to be used by members of the public (customers, delivery drivers,
                visitors not employed by the business), they may be classified as public charge
                points and must comply with the Public Charge Point Regulations 2023, requiring
                contactless payment, transparent pricing, and 99% availability. A separate
                payment network account (e.g., Pod Point network, SWARCO, or BP Pulse) may be
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mixed-use sites</strong> — a common approach for retail or hospitality
                sites is to install separate chargers for employees (RFID access, WCS-funded)
                and for customers (open access, payment-enabled). The two systems operate
                independently on separate circuits, each with its own load management.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Workplace EV Charger Installation Costs (2026)',
    content: (
      <>
        <p>
          Installation costs for workplace EV chargers vary significantly depending on supply
          capacity, cable runs, groundworks, and charger specification. The following figures
          are representative of typical UK commercial installations before WCS grant deductions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single charger (wall-mounted, existing supply)</strong> — £800–1,800
                supply and install, including charger, cable run up to 10m, circuit protective
                device, earthing, and BS 7671 certificate. WCS grant deduction: £350.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5-charger installation with load management</strong> — £5,500–9,000,
                including load management controller, CT clamps, sub-distribution board, five
                chargers, cable runs, and commissioning. WCS grant: up to £1,750 (5 × £350).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20-charger car park installation</strong> — £20,000–45,000 depending
                on groundworks, cable trench length, and charger specification. WCS grant:
                up to £7,000 (20 × £350). DNO supply upgrade may add £3,000–15,000 if existing
                supply is insufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO supply upgrade</strong> — if the existing supply cannot support the
                planned charger load even with load management, a supply upgrade via the
                Distribution Network Operator costs £1,000–15,000+ and can take 6–12 months
                to complete. Factoring supply capacity into the initial survey prevents costly
                project delays.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Workplace EV Contracts',
    content: (
      <>
        <p>
          Workplace EV charging represents some of the highest-value electrical installation
          contracts available to UK electricians in 2026. A single multi-charger fleet
          installation can be worth £15,000–50,000 in materials and labour. Electricians who
          become OZEV-approved installers and build expertise in load management and commercial
          EV infrastructure have a significant competitive advantage.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates & Documentation On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/ev-charging-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete BS 7671 Section 722 installation certificates on your phone or
                  tablet while on site. For multi-charger commercial installations, complete
                  a certificate per circuit and bundle them into a single PDF package for the
                  client — professional presentation wins repeat contracts.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Commercial Projects Confidently</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to build detailed multi-line quotes for commercial EV installations — charger
                  supply, cable runs, groundworks, load management, sub-board, testing, and
                  certification. Show WCS grant deductions clearly on the quote to help clients
                  see their net cost.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more workplace EV charging contracts with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for EV certificates, quoting, and job management. Professional documentation wins commercial repeat business. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WorkplaceEVChargingPage() {
  return (
    <GuideTemplate
      title="Workplace EV Charging Installation UK | Business EV Chargers"
      description="Complete guide to workplace EV charging in the UK. Workplace Charging Scheme grant £350 per socket, planning permission, load balancing for fleets, 3-phase vs single phase, employee and visitor charging, and installation costs for 2026."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Workplace EV Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Workplace EV Charging Installation UK:{' '}
          <span className="text-yellow-400">Business EV Charger Guide 2026</span>
        </>
      }
      heroSubtitle="The complete guide to installing EV charge points at UK business premises — Workplace Charging Scheme grants of up to £14,000, planning permission requirements, dynamic load balancing for fleets, 3-phase charger options, and how to manage employee and visitor charging."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Workplace EV Charging"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for EV charging certificates, commercial quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
