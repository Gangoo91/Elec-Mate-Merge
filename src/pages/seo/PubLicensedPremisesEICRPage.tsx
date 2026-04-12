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
  { label: 'Commercial EICR', href: '/guides/eicr-for-commercial' },
  { label: 'EICR for Pubs & Licensed Premises', href: '/pub-licensed-premises-eicr' },
];

const tocItems = [
  { id: 'licensing-act', label: 'Licensing Act 2003 Requirements' },
  { id: 'licence-conditions', label: 'Local Authority Licence Conditions' },
  { id: 'eicr-frequency', label: 'EICR Frequency for Licensed Premises' },
  { id: 'what-inspectors-check', label: 'What Inspectors Check in Pubs' },
  { id: 'cellar-equipment', label: 'Cellar Equipment & Beer Cooler Circuits' },
  { id: 'gaming-machines', label: 'Gaming Machine Circuits' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Requirements' },
  { id: 'fire-safety', label: 'Fire Safety & BS 5839' },
  { id: 'compliance-costs', label: 'Typical Compliance Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Licensing Act 2003 grants local authorities the power to attach conditions to premises licences. Electrical safety is commonly specified as a licence condition, typically requiring an EICR every five years from a competent person.',
  'Pubs and licensed premises are also subject to the Regulatory Reform (Fire Safety) Order 2005. The responsible person must carry out a fire risk assessment and implement appropriate fire precautions including emergency lighting and fire detection.',
  'The EICR for a pub covers fixed wiring, distribution boards, cellar equipment circuits, beer cooler and chiller circuits, gaming machine circuits, kitchen extraction circuits, and emergency lighting — a significantly more complex scope than a residential inspection.',
  'Emergency lighting to BS 5266-1:2016 is required in all means of escape, including bar areas, function rooms, toilets, corridors, and all exit routes. Maintained or non-maintained luminaires are both acceptable.',
  'Fire detection systems in pubs and licensed premises must comply with BS 5839-1:2017 (commercial-grade systems with a central control panel). Grade D domestic systems are not appropriate for licensed premises.',
  'Gaming machine circuits are frequently found to be inadequately protected or on overloaded circuits during EICR inspections of licensed premises. Each machine should ideally be on a dedicated circuit with appropriate MCB protection.',
];

const faqs = [
  {
    question: 'Is an EICR a legal requirement for a pub?',
    answer:
      'An EICR is not directly mandated by the Licensing Act 2003, but local licensing authorities routinely attach electrical safety conditions to premises licences. These conditions commonly require an EICR at least every five years, carried out by a competent person, with a copy provided to the licensing authority on request. Separately, pubs are subject to the Regulatory Reform (Fire Safety) Order 2005, which requires the responsible person to implement adequate fire precautions — and the electrical installation is a key element of fire risk. Failure to maintain electrical safety can constitute a breach of the premises licence, risking review, suspension, or revocation.',
  },
  {
    question: 'How often does a pub need an EICR?',
    answer:
      'Local authority premises licence conditions typically specify an EICR every five years. However, the electrical installation in a pub is significantly more heavily used than in a residential property — high continuous loads from refrigeration, catering equipment, and entertainment systems accelerate wear. Industry best practice is a five-year cycle for the full EICR, with annual visual inspection and thermographic surveys of distribution boards every two to three years in high-use premises. The EICR must also be renewed after any significant rewire or major electrical works.',
  },
  {
    question: 'What does an EICR inspector check in a pub that is different from a house?',
    answer:
      'An EICR for a pub covers the full commercial electrical installation: main switchgear and distribution boards, cellar equipment circuits (glycol coolers, beer coolers, CO2 and mixed gas supplies), catering kitchen circuits (extraction systems, commercial ovens, fryers, dishwashers), gaming machine circuits, CCTV and security system supplies, entertainment system circuits (sound and lighting), emergency lighting, fire alarm system wiring, outdoor and beer garden circuits, and signage. The inspector will test insulation resistance, earth fault loop impedance, RCD trip times, and prospective fault current for all circuits.',
  },
  {
    question: 'What type of fire alarm system does a pub need?',
    answer:
      'Pubs are non-domestic premises and require a commercial-grade fire alarm system to BS 5839-1:2017. The specific category (L or M system and sub-category) is determined by the fire risk assessment carried out under the Regulatory Reform (Fire Safety) Order 2005. Most pubs require at minimum an M (Manual) system with break-glass call points, supplemented by automatic detection (L system) in the cellar, kitchen, and escape routes. Grade D domestic interlinked detectors are not appropriate for licensed premises of any size. The fire alarm system is inspected as part of the EICR.',
  },
  {
    question: 'Does a pub need emergency lighting?',
    answer:
      'Yes. Emergency lighting to BS 5266-1:2016 is required in all means of escape and in areas where guests may be present during an emergency. This includes all bar areas, function rooms, toilets (where they are internal and have no natural light), corridors, stairwells, and all exit routes. Emergency lighting must illuminate exit signs and provide sufficient illumination at floor level for safe evacuation. The emergency lighting system is tested monthly (30-second function test) and annually (full duration test), with records kept in a logbook.',
  },
  {
    question: 'Are cellar equipment circuits included in the EICR scope?',
    answer:
      'Yes. The cellar is part of the fixed electrical installation of the pub and is within the EICR scope. Cellar equipment — including glycol coolers, beer cooler and chiller units, CO2 and mixed gas extraction systems, and any electrical temperature monitoring equipment — draws significant continuous current. The inspector will test insulation resistance and earth continuity on cellar circuits, verify RCD protection, and check for signs of overloading, poor connections, or damp ingress. Damp conditions in cellars accelerate corrosion and insulation deterioration.',
  },
  {
    question: 'What are the consequences of a pub failing an EICR?',
    answer:
      'An unsatisfactory EICR — containing C1 or C2 observations — means the landlord or operator must carry out remedial works promptly. In a licensed premises, an unsatisfactory EICR that is not addressed can constitute a breach of the premises licence electrical safety condition. The licensing authority can attach additional conditions, review the licence, or in serious cases suspend or revoke the licence. A C1 observation (danger present) may require immediate disconnection of the affected circuit until remedial work is completed. The operator should notify their insurer of any significant electrical defect.',
  },
  {
    question: 'Who is responsible for electrical safety in a tenanted pub?',
    answer:
      'Responsibility depends on the lease terms. In most pubco and brewery tenancies, the pub company (landlord) is responsible for the fabric of the building and the fixed electrical installation, while the tenant is responsible for the electrical safety of equipment they own. The premises licence holder is the responsible person under both the Licensing Act 2003 and the Regulatory Reform (Fire Safety) Order 2005. Tenants should clarify responsibility for the EICR in their lease and ensure they have a copy of the current EICR before taking on the premises.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-commercial',
    title: 'EICR for Commercial Premises',
    description: 'Full guide to commercial EICR requirements, scope, and compliance.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/hotel-eicr',
    title: 'Hotel EICR',
    description: 'Electrical inspection requirements for hotels, guest houses, and B&Bs.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description: 'BS 5266-1 emergency lighting inspection, testing, and certification guide.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
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
    id: 'licensing-act',
    heading: 'The Licensing Act 2003 and Electrical Safety',
    content: (
      <>
        <p>
          The Licensing Act 2003 is the primary legislation governing the sale of alcohol and the
          operation of licensed premises in England and Wales. It does not directly mandate an EICR,
          but it creates a framework under which local licensing authorities routinely attach
          electrical safety conditions to premises licences as part of the licensing objectives — in
          particular, the prevention of crime and disorder, public safety, and the prevention of
          public nuisance.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premises licence conditions</strong> — local licensing authorities attach
                conditions to premises licences that promote the licensing objectives. Electrical
                safety conditions commonly require the premises licence holder to maintain a current{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>, carry out
                periodic maintenance, and produce the EICR to the licensing authority or building
                control within a specified period of request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licence review — risk of revocation</strong> — a premises licence can be
                reviewed and conditions added, modified, or the licence suspended or revoked where
                the licensing authority determines that the licensing objectives are not being
                promoted. A pub operating with an expired EICR and an electrical fire risk
                identified by environmental health inspectors can trigger a licence review.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designated Premises Supervisor (DPS)</strong> — the DPS is responsible for
                the day-to-day management of the licensed premises under the Licensing Act 2003.
                Compliance with licence conditions including electrical safety conditions falls
                within their responsibilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — separately from the
                Licensing Act, all pubs and licensed premises are subject to the Regulatory Reform
                (Fire Safety) Order 2005. The responsible person must carry out a fire risk
                assessment, implement adequate fire precautions, and maintain fire safety equipment.
                The electrical installation is a key element of fire risk.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'licence-conditions',
    heading: 'Typical Licence Conditions for Electrical Safety',
    content: (
      <>
        <p>
          Local licensing authorities across England and Wales attach a variety of electrical safety
          conditions to premises licences. Whilst conditions vary between authorities, the following
          are common examples of what premises licence holders can expect.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-yearly EICR</strong> — the most common condition. The EICR must be
                carried out by a competent person (typically a registered member of a competent
                person scheme such as NICEIC or NAPIT) and must be satisfactory. A copy must be
                available for inspection by the licensing authority on request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting inspection and testing</strong> — monthly function tests
                and annual full-duration tests of the emergency lighting system, with records kept
                in a logbook available for inspection by the licensing authority or fire authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm inspection and testing</strong> — weekly testing of at least one
                fire alarm call point or detector (rotated to test all devices over time),
                six-monthly inspection by a competent person, and annual full system test in
                accordance with BS 5839-1:2017.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial works — specified timescale</strong> — where the EICR identifies C1
                or C2 observations, remedial works must be completed within the timescale specified
                by the licence condition (typically 28 days, but may be shorter). Written
                confirmation of completion must be retained.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Premises licence holders should read their licence conditions carefully and diarise the
          inspection and testing requirements. Operating in breach of a licence condition is a
          criminal offence under the Licensing Act 2003.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-frequency',
    heading: 'EICR Frequency for Licensed Premises',
    content: (
      <>
        <p>
          Most local authority licence conditions specify a five-year EICR cycle. However, the
          intensity of use of electrical installations in licensed premises — high continuous loads,
          frequent equipment changes, damp cellar environments — means that a purely calendar-based
          approach to inspection may not be sufficient.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five years — standard licence condition</strong> — the minimum period
                specified in most premises licence conditions. For a well-maintained modern
                installation in a low-use premises, five years is adequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three years — high-use or older premises</strong> — industry best practice
                for high-volume premises (busy city-centre pubs, nightclubs, music venues), premises
                with older wiring (pre-1990 installations), or premises with damp or corrosive
                environments (coastal pubs, properties with cellar flooding history).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After change of occupier</strong> — when a pub changes hands, the new
                operator should commission a fresh EICR before reopening. An EICR commissioned by
                the previous operator may not reflect changes made by that operator, and the new
                operator bears responsibility for the installation from the date they take over.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After significant electrical work</strong> — a new kitchen installation,
                gaming machine circuit addition, or entertainment system upgrade should be followed
                by an EIC from the contractor (for notifiable work) or an EICR update to confirm the
                installation remains satisfactory.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-inspectors-check',
    heading: 'What Inspectors Check in Pubs',
    content: (
      <>
        <p>
          An EICR for a pub is significantly more complex than a residential inspection. The
          qualified inspector will systematically assess every part of the fixed electrical
          installation, which in a pub typically includes elements not found in residential or small
          commercial premises.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switchgear and distribution boards</strong> — condition, labelling,
                accessibility, overcurrent protection, and RCD protection on appropriate circuits.
                Thermographic survey of distribution boards is best practice and can identify hot
                connections before they cause failures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Catering kitchen circuits</strong> — commercial ovens, fryers, grills,
                dishwashers, and extraction systems draw high continuous currents. The inspector
                will verify correct MCB sizing, cable ratings, and that extraction interlock systems
                (which shut down cooking equipment if extraction fails) are correctly wired and
                functional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bar area circuits</strong> — glass washers, ice machines, refrigerated
                back-bar units, and dispensing equipment. High moisture environments require
                appropriate IP-rated fittings and adequate RCD protection. The inspector will check
                for signs of water ingress into electrical fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor and beer garden circuits</strong> — outdoor sockets, garden
                lighting, outdoor heaters, and any outdoor bar or food service areas must be
                protected by 30mA RCD and installed with weatherproof fittings to a minimum IP44
                rating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cellar-equipment',
    heading: 'Cellar Equipment and Beer Cooler Circuits',
    content: (
      <>
        <p>
          The pub cellar is an electrically intensive environment. Glycol coolers, beer cooler and
          chiller units, CO2 and mixed gas extraction systems, and cleaning equipment all operate in
          a damp, often poorly ventilated space. This combination of high electrical loads and
          moisture creates significant inspection challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glycol coolers — high continuous loads</strong> — glycol cellar cooling
                systems draw significant continuous current and run 24 hours a day. The inspector
                will verify that the circuit rating matches the cooling system's current draw, that
                the MCB is correctly sized, and that the cable is not undersized for the load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Beer cooler circuits — RCD protection essential</strong> — beer cooler and
                chiller units in damp environments must be protected by 30mA RCD. A cellar beer
                cooler with a deteriorating motor or compressor seal can develop earth faults —
                without RCD protection, this presents a shock risk to cellar staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CO2 and mixed gas systems</strong> — CO2 and mixed gas extraction fans in
                cellars are safety-critical. The inspector will verify that extraction fan circuits
                are correctly installed, fused, and that any gas detection system interlock with the
                extraction fan is functional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance — commonly low in cellars</strong> — damp cellar
                environments cause insulation resistance to deteriorate more rapidly than in dry
                areas. Low insulation resistance readings on cellar circuits are common and require
                investigation. The inspector will assess whether the low reading indicates active
                degradation or acceptable moisture ingress.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gaming-machines',
    heading: 'Gaming Machine Circuits',
    content: (
      <>
        <p>
          Gaming machines in pubs are regulated by the Gambling Act 2005 and require specific
          electrical connections. They are among the most frequently deficient circuits found during
          EICR inspections of licensed premises.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit — best practice</strong> — each gaming machine should
                ideally be on its own dedicated circuit with an appropriately sized MCB. Machines
                plugged into general bar area socket rings are susceptible to voltage fluctuations
                caused by other loads, which can cause machine errors and resets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extension lead use — commonly found</strong> — gaming machines frequently
                found on extension leads rather than hardwired connections. Extension leads are not
                appropriate for fixed gaming machine installations — a dedicated socket or hardwired
                connection is required. Extension leads will be recorded as an observation on the
                EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection — required</strong> — gaming machine circuits in public areas
                must be protected by 30mA RCD in accordance with Regulation 411.3.3 of BS 7671.
                Absence of RCD protection is commonly recorded as a C2 observation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Requirements for Pubs',
    content: (
      <>
        <p>
          Emergency lighting to BS 5266-1:2016 is required in all pubs and licensed premises as part
          of the fire safety measures under the Regulatory Reform (Fire Safety) Order 2005. The
          responsible person must ensure that emergency lighting covers all means of escape and
          provides adequate illumination for safe evacuation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage requirements</strong> — emergency lighting must cover all escape
                routes, all bar and function room areas, all toilet areas (where internal with no
                natural light), stairwells, corridors, and all final exit doors. Exit signs must be
                illuminated, either by maintained emergency luminaires or by non-maintained
                luminaires that illuminate the sign on power failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration</strong> — emergency lighting in licensed premises must operate for
                a minimum of one hour from the moment of mains power failure. Three-hour duration is
                required for higher-occupancy or higher-risk premises. The fire risk assessment
                determines the required duration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and records</strong> — monthly 30-second function tests and annual
                full-duration discharge tests must be carried out and recorded in a logbook. The
                logbook must be available for inspection by the licensing authority, fire authority,
                and the EICR inspector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inclusion in EICR scope</strong> — emergency lighting circuits are part of
                the fixed electrical installation and must be included in the EICR. The inspector
                will verify correct wiring, circuit protection, and operation of all emergency
                luminaires. Defective or missing emergency lighting is typically recorded as a C2
                observation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-safety',
    heading: 'Fire Alarm Systems in Pubs — BS 5839-1:2017',
    content: (
      <>
        <p>
          Pubs and licensed premises require a commercial-grade fire alarm system to BS 5839-1:2017,
          not the domestic Grade D systems used in HMOs. The specific category of system is
          determined by the fire risk assessment.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>L2 or L3 system — minimum for most pubs</strong> — automatic detection in
                escape routes and high-risk areas (kitchen, cellar). Manual call points adjacent to
                all final exits and at strategic points throughout the premises. Central control
                panel with visual and audible alarm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>L1 system — larger or high-occupancy venues</strong> — automatic detection
                in all areas including storage rooms, function rooms, and all areas accessible to
                the public. Required for venues with high occupancy loads, large floor plans, or
                complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly testing requirement</strong> — BS 5839-1 requires weekly testing of
                at least one manual call point (rotating to test all call points over time) and
                regular checks of the control panel. Six-monthly inspection and annual test by a
                competent person are also required. Records must be kept in a logbook.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm wiring within EICR scope</strong> — the fire alarm system wiring
                is part of the fixed electrical installation. The EICR inspector will check the fire
                alarm circuit wiring, panel supply, and verify that the system is operational.
                Faults will be recorded as observations on the EICR.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'compliance-costs',
    heading: 'Typical Compliance Costs for Licensed Premises (2026)',
    content: (
      <>
        <p>
          The cost of electrical compliance for a pub varies significantly with the size and
          condition of the premises. The following figures are indicative for a typical two-bar
          community pub with cellar, catering kitchen, and function room.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — typical community pub</strong> — £800 to £2,000. The scope is
                substantially larger than a domestic EICR: multiple distribution boards, catering
                kitchen circuits, cellar equipment, gaming machine circuits, emergency lighting, and
                fire alarm wiring all increase inspection time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board replacement</strong> — £1,500 to £3,000 per board for a
                commercial-grade RCBO distribution board. A pub may have two or three distribution
                boards. RCBO protection on each circuit is essential to prevent single-fault trips
                taking down the entire pub.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting installation or upgrade</strong> — £1,500 to £5,000
                depending on the size of the premises and the number of luminaires required. Larger
                function rooms and multi-floor premises are at the higher end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system upgrade</strong> — £3,000 to £12,000 to upgrade from a
                basic manual system to a full L2 addressable system. Annual maintenance contracts
                for BS 5839-1 systems typically cost £500 to £1,500 per year.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Licensed Premises Inspection Work',
    content: (
      <>
        <p>
          Licensed premises EICRs command higher fees than residential work due to the complexity,
          scope, and specialist knowledge required. An electrician who understands licensing
          conditions, BS 5839-1 fire alarm requirements, and BS 5266-1 emergency lighting
          obligations is well placed to win and retain commercial pub clients.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Commercial EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to document complex commercial installations circuit by circuit on your phone. AI
                  board scanning, voice test entry, and the ability to add site photos means you can
                  complete a full pub EICR report on site and email the PDF to the licence holder
                  the same day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win High-Value Remedial Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Distribution board replacements, emergency lighting upgrades, and fire alarm
                  circuit remediation are high-value jobs. Quote on the day with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  and convert inspection clients into recurring commercial maintenance contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more licensed premises electrical work with Elec-Mate"
          description="Complete commercial EICRs on your phone, quote remedial works and upgrades on site, and build recurring relationships with pub operators and licensing managers. 7-day free trial for UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PubLicensedPremisesEICRPage() {
  return (
    <GuideTemplate
      title="EICR for Pubs & Licensed Premises UK | Licensing Requirements"
      description="Complete guide to EICR for pubs and licensed premises in the UK. Licensing Act 2003 requirements, local authority licence conditions, EICR frequency, cellar equipment and beer cooler circuits, gaming machine circuits, emergency lighting to BS 5266-1, fire alarms to BS 5839-1, and 2026 compliance costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Licensed Premises Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          EICR for Pubs & Licensed Premises UK:{' '}
          <span className="text-yellow-400">Licensing Requirements 2026</span>
        </>
      }
      heroSubtitle="Pubs and licensed premises face electrical safety obligations under both the Licensing Act 2003 and the Regulatory Reform (Fire Safety) Order 2005. This guide covers licence conditions, EICR frequency, what inspectors check in pub installations, cellar equipment and beer cooler circuits, gaming machine circuits, emergency lighting to BS 5266-1, and fire alarm systems to BS 5839-1."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR for Pubs and Licensed Premises"
      relatedPages={relatedPages}
      ctaHeading="Complete Licensed Premises EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
