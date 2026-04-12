import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Scale,
  Building2,
  Zap,
  Users,
  BellRing,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Airbnb Electrical Safety', href: '/airbnb-electrical-safety' },
];

const tocItems = [
  { id: 'host-responsibilities', label: 'Airbnb Host Responsibilities' },
  { id: 'checks-before-listing', label: 'Electrical Checks Before Listing' },
  { id: 'smoke-co-detectors', label: 'Smoke & CO Detector Requirements' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'extension-lead-safety', label: 'Extension Lead Safety' },
  { id: 'outdoor-areas', label: 'Outdoor Area Considerations' },
  { id: 'insurance-implications', label: 'Insurance Implications' },
  { id: 'professional-inspection', label: 'When to Get a Professional Inspection' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Airbnb hosts in the UK are not subject to the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 for short-term holiday lets, but owe guests a duty of care under the Occupiers Liability Act 1957.',
  'Airbnb requires UK hosts to confirm that smoke alarms are installed on every floor of their listing. Carbon monoxide alarms are required in any space with a fuel-burning appliance. These requirements are enforced through the platform.',
  'A five-yearly EICR is strongly recommended for all Airbnb properties. Many Airbnb host insurance policies now require a current EICR as a condition of cover.',
  'Extension leads provided for guest use must never be daisy-chained. All extension leads should be surge-protected, individually switched, and rated at a minimum of 13A.',
  'Outdoor areas are a significant risk area for Airbnb hosts — garden sockets, EV chargers, outdoor lighting, and outbuilding supplies must all have appropriate 30mA RCD protection and weatherproof ratings.',
  'Hosts without a current EICR may find their insurance claim declined following an electrical fire or injury — even if the specific policy wording does not explicitly require an EICR, a court may find that failure to obtain one constitutes negligence.',
];

const faqs = [
  {
    question: 'Does Airbnb require hosts to have an EICR?',
    answer:
      "Airbnb does not currently mandate an EICR as a condition of listing in the UK, but it does require hosts to confirm that their property meets safety standards. Airbnb's ground rules for hosts require smoke alarms on every floor and CO alarms in spaces with fuel-burning appliances. Airbnb's host insurance product (AirCover for Hosts) may also impose requirements. Separately, hosts owe guests a duty of care under the Occupiers Liability Act 1957 that effectively requires the electrical installation to be maintained safely — an EICR is the recognised way to demonstrate this.",
  },
  {
    question: 'What smoke alarm requirements does Airbnb impose on UK hosts?',
    answer:
      'Airbnb requires UK hosts to confirm during the listing process that smoke alarms are installed on every floor of the property. This is a platform requirement enforced through host declaration and guest reviews. Guests can report the absence of smoke alarms, which can result in listing suspension. Hosts should install mains-powered interlinked smoke alarms (with battery back-up) on every floor, and test them before every guest stay. Battery-only alarms are accepted by Airbnb but mains-powered alarms are recommended for reliability.',
  },
  {
    question: 'Does my Airbnb property need a carbon monoxide alarm?',
    answer:
      "Yes, if you have any fuel-burning appliance (gas boiler, gas cooker, gas fire, log burner, oil boiler, or solid fuel appliance). Airbnb requires CO alarms in any space containing or adjacent to a fuel-burning appliance. The UK government recommends CO alarms complying with BS EN 50291, positioned on the ceiling of the room. CO alarms should be tested at every changeover clean. Replace CO alarms in accordance with the manufacturer's guidance — most have a service life of five to seven years.",
  },
  {
    question: 'What electrical checks should I carry out before listing on Airbnb?',
    answer:
      'Before listing, carry out the following checks: confirm you have a current EICR (within the past five years) — if not, commission one; verify that all smoke alarms and CO alarms are working; check that the consumer unit provides 30mA RCD protection on all socket-outlet circuits; inspect all guest-accessible sockets and switches for visible damage; PAT test all portable appliances provided for guest use; check that outdoor sockets, garden lighting, and any outbuilding supplies are weatherproof and protected by 30mA RCD; and ensure that no extension leads are daisy-chained.',
  },
  {
    question: 'Does Airbnb host insurance require an EICR?',
    answer:
      "Airbnb's AirCover for Hosts provides some protection, but it is not a substitute for specialist short-let or holiday let insurance. Many specialist UK host insurance policies do require a current EICR as a policy condition. Hosts should check their specific policy wording carefully. A policy that does not explicitly require an EICR may still decline a claim arising from an electrical fire on the basis that the host failed to maintain the installation safely — a court would consider the absence of an EICR as evidence of failure to take reasonable care.",
  },
  {
    question: 'Are outdoor electrical installations a special concern for Airbnb hosts?',
    answer:
      'Yes. Guests use outdoor spaces enthusiastically — gardens, patios, and outbuildings. Garden sockets must be weatherproof (IP44 minimum), protected by 30mA RCD, and on a dedicated outdoor circuit. Any outdoor lighting, water features, or garden equipment must be installed to the requirements of BS 7671 Part 7 (Section 714 for outdoor lighting installations). Hot tubs require specific electrical installations complying with BS 7671 Section 702, including supplementary equipotential bonding. Any EV charger must be installed to OZEV grant requirements and BS 7671 Section 722.',
  },
  {
    question: 'How often should I have my Airbnb property electrically inspected?',
    answer:
      'A five-yearly EICR is recommended by industry bodies and most specialist insurers. For properties with older electrical installations, properties in coastal or humid environments (which accelerate corrosion), or properties with high guest turnover, a three or four-year inspection cycle may be more appropriate. PAT testing of all portable appliances should be carried out annually. Smoke and CO alarms should be tested at every changeover clean.',
  },
  {
    question: 'What happens if a guest is injured by an electrical fault in my Airbnb property?',
    answer:
      "If a guest is injured by an electrical defect in your property, you may face a personal injury claim under the Occupiers Liability Act 1957. Compensation for serious electrical injuries can be substantial. If your insurance was not up to date or did not provide adequate public liability cover, you may face an uninsured claim. Airbnb's AirCover provides some host protection but has limitations and exclusions. The best protection against such claims is a current EICR, PAT testing records, working smoke alarms, and specialist Airbnb host insurance with adequate public liability cover.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/holiday-let-electrical',
    title: 'Holiday Let Electrical Safety',
    description:
      'Duty of care, recommended EICR, PAT testing, and safety certificate for marketing.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/pat-testing-guide-uk',
    title: 'PAT Testing Guide',
    description: 'When PAT testing is required, what it covers, and how often it should be done.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'host-responsibilities',
    heading: 'Airbnb Host Electrical Responsibilities in the UK',
    content: (
      <>
        <p>
          Airbnb hosts in the UK operate in a grey area between residential landlords (who face
          mandatory EICR obligations) and commercial premises operators (subject to the Regulatory
          Reform (Fire Safety) Order 2005). Understanding exactly what is required — and what is
          strongly recommended — is essential for protecting guests and yourself.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Occupiers Liability Act 1957 — duty of care</strong> — Airbnb hosts owe all
                guests a common duty of care to ensure they are reasonably safe whilst using the
                premises. This duty extends to the electrical installation. A defective socket that
                causes a guest an electric shock, or defective wiring that causes a fire, gives rise
                to liability under this Act regardless of whether a specific EICR regulation
                applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Airbnb platform requirements</strong> — Airbnb requires all UK hosts to
                confirm in their host account that smoke alarms are installed on every floor and
                that carbon monoxide alarms are installed in spaces with fuel-burning appliances.
                Hosts who cannot confirm these requirements may have their listing removed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance requirements</strong> — specialist Airbnb host and short-let
                insurance policies commonly require a current EICR (within the past five years) as a
                condition of cover for public liability claims arising from electrical incidents.
                Check your specific policy wording.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not covered by the 2020 Regulations</strong> — the Electrical Safety
                Standards in the Private Rented Sector (England) Regulations 2020 apply only to
                properties let under assured shorthold and similar tenancies. Airbnb short lets
                where guests are tourists or visitors and the property is not their main home fall
                outside the mandatory EICR obligation — but not outside the duty of care.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'checks-before-listing',
    heading: 'Electrical Checks to Carry Out Before Listing',
    content: (
      <>
        <p>
          Before your property goes live on Airbnb, carry out a systematic electrical safety review.
          This protects guests, protects your insurance position, and reduces the risk of a negative
          review caused by an electrical problem during a stay.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — within the past five years</strong> — commission an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> from a
                NICEIC, NAPIT, or ELECSA registered electrician if you do not have one within the
                past five years. Keep the certificate and any remedial work confirmation on file.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT test all portable appliances</strong> — kettle, toaster, toasted
                sandwich maker, television, lamps, hairdryer, and any other appliances provided for
                guests. Annual PAT testing is recommended. Keep a PAT testing register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect sockets and switches</strong> — check all guest-accessible sockets
                and switches for visible damage, cracking, scorch marks, or loose fixings. Any
                damaged fittings should be replaced before the property is listed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check consumer unit for RCD protection</strong> — open the consumer unit
                cover and confirm that RCD or RCBO protection is fitted on socket-outlet circuits.
                If the consumer unit is an older type without RCD protection on socket circuits,
                arrange an upgrade before listing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test smoke and CO alarms</strong> — press the test button on every alarm in
                the property and replace any batteries that are low. Create a record of test dates
                and include alarm testing in your changeover checklist.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smoke-co-detectors',
    heading: 'Smoke and Carbon Monoxide Detector Requirements',
    content: (
      <>
        <p>
          Airbnb imposes specific requirements on UK hosts regarding smoke and carbon monoxide
          detection. These requirements are enforced through the platform and are also effectively
          mandatory under the duty of care owed to guests.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarms — every floor</strong> — Airbnb requires smoke alarms on every
                floor of the listing. Position alarms in hallways and at the top of stairwells.
                Mains-powered interlinked alarms with battery back-up are the most reliable option.
                Test at every changeover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide alarms — fuel-burning appliances</strong> — CO alarms are
                required by Airbnb in any space containing a fuel-burning appliance. This includes
                gas boilers, gas cookers, gas fires, log burners, solid fuel stoves, and oil
                boilers. Position the CO alarm on the ceiling of the room containing the appliance,
                or in an adjacent hallway if the appliance is enclosed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat detectors in kitchens</strong> — install a heat detector rather than a
                smoke detector in kitchens to avoid nuisance alarms from cooking. The heat detector
                should be interlinked with the smoke alarm network where possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guest information</strong> — include a property guide for guests that
                explains the location of the consumer unit, how to reset a tripped RCD, the location
                of all smoke and CO alarms, and what to do in a fire. Leave this guide prominently
                displayed in the property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection in Airbnb Properties',
    content: (
      <>
        <p>
          RCD (Residual Current Device) protection is a fundamental measure that can save lives by
          cutting the electricity supply in milliseconds when a fault to earth is detected.
          Regulation 411.3.3 of BS 7671:2018 requires 30mA RCD protection on all socket-outlet
          circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check your consumer unit</strong> — look for RCD switches (usually wider
                than standard MCBs) or RCBO devices on each circuit. If your consumer unit has no
                RCD protection on socket circuits, an electrician can fit a consumer unit with RCBOs
                on each circuit, or fit an RCD adapter at the socket.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test the RCD regularly</strong> — all RCDs and RCBOs have a test button.
                Press it quarterly to confirm the device trips correctly. Reset immediately after
                testing. If an RCD or RCBO does not trip when tested or will not reset, arrange
                replacement by an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD in a tripped position between guests</strong> — if you arrive to prepare
                the property between guests and find an RCD or RCBO tripped, do not simply reset it.
                Identify and resolve the fault before the next guests arrive. Recurring RCD trips
                indicate a wiring or appliance fault that must be investigated by an electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'extension-lead-safety',
    heading: 'Extension Lead Safety for Airbnb Hosts',
    content: (
      <>
        <p>
          Guests staying in Airbnb properties frequently bring their own devices and extension
          leads, and will use whatever they find in the property. Hosts can reduce risk by providing
          safe extension leads and removing or replacing unsafe ones.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide sufficient socket outlets</strong> — insufficient sockets lead
                guests to daisy-chain extension leads. If bedrooms or communal areas have fewer than
                four socket outlets, consider having an electrician install additional sockets
                before listing. Additional sockets are notifiable work under Part P of the Building
                Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide surge-protected extension leads</strong> — if you provide extension
                leads in the property, use surge-protected multi-socket leads with individually
                switched sockets and a minimum 13A rating. Replace any extension leads showing signs
                of wear, damage, or overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No daisy-chaining — house rules</strong> — include a note in your property
                guide and house rules advising guests not to plug one extension lead into another.
                Frame it as a safety rule, not a restriction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB charging points</strong> — consider having a qualified electrician
                install socket outlets with integrated USB charging ports (to USB-A and USB-C
                standard). This reduces the need for guests to use their own chargers in adaptor
                plugs, reducing overloading risk.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-areas',
    heading: 'Outdoor Area Electrical Considerations for Airbnb Hosts',
    content: (
      <>
        <p>
          Outdoor areas are frequently highlighted in Airbnb listings as features — gardens, patios,
          outdoor kitchens, hot tubs, and EV chargers. Each outdoor electrical installation carries
          specific safety requirements that must be met before guests use these areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden and patio sockets</strong> — must be weatherproof (IP44 minimum
                rating), protected by 30mA RCD, and installed on a dedicated outdoor circuit. Socket
                covers must be checked before each guest stay. Any socket with damaged weatherproof
                cover must be repaired before guests use the garden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot tubs — specific BS 7671 requirements</strong> — hot tub electrical
                connections must comply with BS 7671 Section 702 (swimming pools and other basins).
                Requirements include supplementary equipotential bonding of all metalwork within 3.5
                metres of the hot tub, 30mA RCD protection, and no socket outlets within 3.5 metres.
                These installations must be carried out by a qualified electrician and notified
                under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargers</strong> — if you offer EV charging as a feature, the charger
                must be installed by an OZEV-approved installer, comply with BS 7671 Section 722,
                and have its own dedicated circuit and RCD protection. Include the charger in the
                EICR scope on next inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outbuilding supplies</strong> — garden rooms, summerhouses, and outbuildings
                used by guests must have a safe electrical supply installed to BS 7671 requirements,
                with separate RCD protection and appropriate circuit breakers. Underground cables
                must be armoured or protected, and buried at the correct depth with cable covers and
                cable route markers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'insurance-implications',
    heading: 'Insurance Implications for Airbnb Hosts',
    content: (
      <>
        <p>
          Standard home insurance does not cover Airbnb letting. Hosts must have specialist
          short-let or Airbnb host insurance. The electrical safety requirements of these policies
          are a critical consideration.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard home insurance — not valid for Airbnb</strong> — most standard home
                insurance policies exclude commercial or business use of the property. Letting on
                Airbnb constitutes a business use. A claim arising from a guest injury during a
                short let may be declined if you are using standard home insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirement in specialist policies</strong> — specialist Airbnb host
                insurance from providers such as Guardhog, Superhog, and specialist brokers commonly
                requires a current EICR (within five years) as a policy condition. Confirm the
                requirement with your insurer before listing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability cover — essential</strong> — ensure your specialist policy
                includes public liability cover of at least £2 million. This covers claims from
                guests injured by electrical defects in the property. Some policies offer £5 million
                or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>AirCover for Hosts — not a substitute</strong> — Airbnb's AirCover for Hosts
                provides some damage protection but is not a substitute for specialist public
                liability insurance. The terms and exclusions of AirCover are set by Airbnb and may
                not cover all electrical injury claims.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'professional-inspection',
    heading: 'When to Get a Professional Electrical Inspection',
    content: (
      <>
        <p>
          Several scenarios make an immediate professional electrical inspection essential for
          Airbnb hosts, regardless of whether the last EICR is within the recommended five-year
          interval.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No EICR on record</strong> — if you have no EICR for the property or the
                last one was more than five years ago, commission one before the next guest stay.
                This is a non-negotiable duty of care requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After electrical work</strong> — any rewire, consumer unit replacement,
                circuit addition (additional sockets, EV charger, garden supply), or significant
                repair should be followed by an EIC from the contractor or an EICR to confirm the
                installation remains safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a reported electrical incident during a guest stay</strong> — if a
                guest reports an electric shock, sparking socket, or frequently tripping RCD, have
                an electrician inspect the property before the next guest arrives. Do not simply
                reset the RCD and relet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before adding new features</strong> — adding a hot tub, EV charger, garden
                kitchen, or outbuilding supply to your Airbnb listing requires new electrical work
                followed by inspection. These are not DIY projects — they involve Part P notifiable
                work that must be carried out by a qualified electrician.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Airbnb and Short-Let Inspection Work',
    content: (
      <>
        <p>
          The rapid growth of short-term letting in the UK has created a large new market for EICR
          and PAT testing work. Airbnb hosts are often unaware of their duty-of-care obligations and
          may not have had any electrical inspection since purchasing the property. This represents
          a significant opportunity for electricians who can clearly explain the risks and the
          straightforward solution.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs and PAT Tests On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full EICR report on your phone while on site, then send the PDF to
                  the host before you leave. Combined EICR and PAT testing visits maximise revenue
                  per visit and give hosts everything they need in one appointment.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work and Upgrades</h4>
                <p className="text-white text-sm leading-relaxed">
                  Consumer unit upgrades, additional sockets, hot tub connections, and garden
                  supplies are all high-value follow-on jobs. Quote on the day with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  and convert inspection clients into installation clients.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more Airbnb and short-let electrical work with Elec-Mate"
          description="Complete EICRs and PAT tests on site, quote remedial works and upgrades immediately, and build recurring relationships with Airbnb hosts. 7-day free trial for UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AirBnBElectricalSafetyPage() {
  return (
    <GuideTemplate
      title="Airbnb Electrical Safety UK | Host Guide to Electrical Compliance"
      description="Airbnb electrical safety guide for UK hosts. Host responsibilities under the Occupiers Liability Act 1957, electrical checks before listing, smoke and CO detector requirements, RCD protection, extension lead safety, outdoor area considerations, insurance implications, and when to get a professional inspection."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Airbnb Host Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Airbnb Electrical Safety UK:{' '}
          <span className="text-yellow-400">Host Guide to Compliance 2026</span>
        </>
      }
      heroSubtitle="Airbnb hosts are not subject to mandatory EICR legislation but owe guests a full duty of care under the Occupiers Liability Act 1957. This guide covers Airbnb's platform requirements for smoke and CO alarms, what electrical checks to carry out before listing, RCD protection, outdoor area safety, extension lead use, and the insurance implications of not having a current EICR."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Airbnb Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Complete Airbnb Property EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
