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
  { label: 'Hotel EICR', href: '/hotel-eicr' },
];

const tocItems = [
  { id: 'fire-safety-order', label: 'Regulatory Reform (Fire Safety) Order 2005' },
  { id: 'eicr-frequency', label: 'Recommended EICR Frequency' },
  { id: 'bedroom-safety', label: 'Bedroom Electrical Safety' },
  { id: 'kitchen-laundry', label: 'Kitchen & Laundry Circuits' },
  { id: 'emergency-lighting', label: 'Emergency Lighting — BS 5266' },
  { id: 'fire-alarm', label: 'Fire Alarm System — BS 5839' },
  { id: 'bathroom-zones', label: 'En-Suite Showers & Bathroom Zones' },
  { id: 'inspection-scope', label: 'Full EICR Scope for Hotels' },
  { id: 'compliance-costs', label: 'Typical Compliance Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hotels, guest houses, and B&Bs are non-domestic premises subject to the Regulatory Reform (Fire Safety) Order 2005. The responsible person must carry out a fire risk assessment and implement adequate fire precautions including electrical safety measures.',
  'A five-yearly EICR is the standard recommended interval for hotels. High-use commercial installations, particularly kitchens and laundry rooms, may benefit from a three-year cycle.',
  'Bedroom electrical installations must comply with BS 7671 for domestic-type circuits. Each bedroom should have sufficient socket outlets and RCD-protected circuits. Bedside touch-sensitive switches with trailing socket leads are a common source of C2 observations.',
  'En-suite showers and bathrooms in hotels are special locations under BS 7671 Part 7, Section 701. Zone requirements for socket placement, IP ratings, and supplementary equipotential bonding apply strictly.',
  'Emergency lighting to BS 5266-1:2016 is required throughout the hotel — in all guest corridors, stairwells, public areas, and escape routes. Hotels are among the premises where a three-hour emergency lighting duration may be required.',
  'Fire alarm systems in hotels must comply with BS 5839-1:2017. Most hotels require at minimum an L2 or L1 category system with automatic detection in all bedrooms, corridors, kitchen, and all public areas.',
];

const faqs = [
  {
    question: 'Is an EICR a legal requirement for a hotel?',
    answer:
      'There is no single law mandating an EICR for hotels by name, but the combination of the Regulatory Reform (Fire Safety) Order 2005 and the Health and Safety at Work etc. Act 1974 effectively require hotels to maintain their electrical installation in a safe condition and to demonstrate that they have done so. The recognised way to demonstrate this is a periodic EICR carried out by a competent person. Many hotel insurance policies also require a current EICR as a condition of cover. Some local authorities attach EICR conditions to premises licences for hotels, particularly larger establishments.',
  },
  {
    question: 'How often should a hotel have an EICR?',
    answer:
      'The recommended interval for a hotel EICR is every five years. For high-use areas — commercial kitchens, laundry rooms, and swimming pool plant rooms — a three-year inspection cycle is advisable. The EICR must be renewed after any significant electrical work, after a change of responsible person or ownership, and after any electrical incident that causes injury or significant damage. The fire risk assessment carried out under the Regulatory Reform (Fire Safety) Order 2005 should reference the EICR as part of the fire safety evidence base.',
  },
  {
    question: 'What bathroom zone rules apply to hotel en-suites?',
    answer:
      'Hotel en-suite bathrooms are special locations under BS 7671:2018 Part 7, Section 701 (Locations Containing a Bath or Shower). The section defines four zones based on proximity to the bath or shower: Zone 0 (inside the bath or shower), Zone 1 (directly above, up to 2.25m), Zone 2 (0.6m beyond Zone 1 horizontally), and outside zones. Socket outlets (other than shaver supply units) must not be within 3 metres of a shower or bath. Electrical equipment installed in zones must meet specified IP ratings. Supplementary equipotential bonding of all metalwork in the bathroom is required. These rules apply to every en-suite in a hotel without exception.',
  },
  {
    question: 'What fire alarm category does a hotel require under BS 5839-1?',
    answer:
      'Most hotels require an L1 system under BS 5839-1:2017 — automatic fire detection covering all areas including all guest bedrooms, all corridors, the kitchen, and all public areas. This is because sleeping guests may not be aware of a fire until an alarm sounds, making early automatic detection critical. The fire risk assessment determines the required system category. Hotels with fewer than ten bedrooms and a simple layout may be acceptable with an L2 system (detection in escape routes and high-risk areas only), but this must be confirmed by the fire risk assessor.',
  },
  {
    question: 'What are the emergency lighting requirements for a hotel?',
    answer:
      'Emergency lighting to BS 5266-1:2016 is required throughout the hotel in all means of escape. This includes all guest bedroom corridors, all stairwells, all public areas including restaurant, bar, reception, and function rooms, and all escape routes and final exits. Hotels are considered higher-risk occupancies due to sleeping guests, so three-hour emergency lighting duration is commonly required. The system must be maintained with monthly 30-second function tests and annual full-duration tests recorded in a logbook.',
  },
  {
    question: 'What should hotels do if an EICR identifies C2 observations?',
    answer:
      'A C2 observation means a potentially dangerous condition that must be remedied. In a hotel, C2 observations must be treated urgently — particularly any observation relating to guest bedroom circuits, bathroom zones, or emergency lighting. There is no statutory 28-day deadline for hotels (unlike residential rental properties), but the Regulatory Reform (Fire Safety) Order 2005 requires prompt action to remedy fire safety hazards. The responsible person should instruct remedial works immediately and, for serious observations, consider whether any affected areas should be taken out of use until the work is completed.',
  },
  {
    question: 'Who is responsible for electrical safety in a leased hotel?',
    answer:
      'Under the Regulatory Reform (Fire Safety) Order 2005, the responsible person is the employer (if the hotel is operated as a business) or the person in control of the premises. In a leased hotel, the lease will typically specify the split of maintenance responsibilities between landlord and tenant. The operator (tenant) is usually the responsible person for fire safety purposes and must ensure that the electrical installation is maintained safely regardless of who owns the building. Operators should confirm the position clearly in their lease before taking on a hotel.',
  },
  {
    question: 'Do hotel kitchen and laundry circuits need special consideration in an EICR?',
    answer:
      'Yes. Commercial kitchen and laundry circuits in hotels are high-load circuits with continuous operation that accelerates wear. The EICR inspector will pay particular attention to: correct MCB sizing for high-power equipment, cable ratings for continuous loads (applying derating factors for cables in conduit or bunched), extraction interlock systems, three-phase distribution where applicable, and the earthing and bonding of metalwork in commercial kitchens. Laundry circuits must accommodate commercial washing machines and tumble dryers with appropriate dedicated circuits and high-load wiring.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/pub-licensed-premises-eicr',
    title: 'EICR for Pubs & Licensed Premises',
    description: 'Licensing Act 2003 requirements, licence conditions, cellar equipment, and gaming machine circuits.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-commercial',
    title: 'EICR for Commercial Premises',
    description: 'Full guide to commercial EICR requirements, scope, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description: 'BS 5266-1 emergency lighting inspection, testing, and certification guide.',
    icon: Zap,
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
    id: 'fire-safety-order',
    heading: 'Regulatory Reform (Fire Safety) Order 2005 Obligations',
    content: (
      <>
        <p>
          The Regulatory Reform (Fire Safety) Order 2005 (RRO) is the primary legislation
          governing fire safety in non-domestic premises in England and Wales. Hotels, guest
          houses, bed and breakfasts, and all other commercial accommodation providers are
          subject to its requirements. The electrical installation is a central element of
          fire safety in any hotel.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Responsible person obligations</strong> — the responsible person
                (typically the hotel operator or employer) must carry out or commission a
                suitable and sufficient fire risk assessment. The assessment must identify
                fire hazards — including electrical hazards — and implement appropriate
                precautions to reduce the risk to guests and staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installation as a fire risk</strong> — the fire risk
                assessment must consider the condition of the fixed electrical installation,
                the presence of adequate fire detection, and the adequacy of emergency
                lighting. A current{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> is
                the recognised evidence that the fixed electrical installation has been
                assessed and is satisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire authority enforcement</strong> — the fire authority (local
                fire and rescue service) has powers to inspect hotels, issue enforcement
                notices, and in serious cases issue prohibition notices preventing use
                of part or all of the premises. Electrical defects identified during a
                fire authority inspection that are not reflected in a current EICR can
                result in enforcement action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work etc. Act 1974</strong> — hotels also have
                obligations to staff under the Health and Safety at Work etc. Act 1974 and the
                Electricity at Work Regulations 1989. The electrical installation must be
                maintained in a safe condition for employees as well as guests.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-frequency',
    heading: 'Recommended EICR Frequency for Hotels',
    content: (
      <>
        <p>
          The standard recommendation for hotels is a five-yearly EICR cycle. However, the
          intensity and continuity of use in a commercial hotel — particularly in kitchens,
          laundry rooms, and plant rooms — makes it prudent for larger or higher-use properties
          to shorten the interval.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five years — standard recommended interval</strong> — appropriate
                for well-maintained hotels with modern wiring, post-2000 consumer units or
                distribution boards, and no significant history of electrical defects. The
                fire risk assessment should reference the EICR and both should be renewed
                on the same cycle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three years — higher-use or older hotels</strong> — recommended
                for large hotels with commercial kitchens and laundry rooms in continuous
                use, properties with wiring installed before 1990, hotels that have expanded
                or significantly altered their electrical installation, and hotels in
                locations with higher moisture levels (coastal or basement areas).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On change of ownership or operator</strong> — when a hotel changes
                hands, the new operator should commission a fresh EICR before accepting
                liability for the installation. An EICR commissioned by the previous
                operator may not reflect changes made since that inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After refurbishment</strong> — a bedroom block refurbishment, new
                kitchen installation, extension, or significant alterations must be followed
                by an EIC from the contractor for notifiable works and an EICR update to
                confirm the whole installation remains satisfactory.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bedroom-safety',
    heading: 'Bedroom Electrical Safety in Hotels',
    content: (
      <>
        <p>
          Guest bedrooms are the heart of a hotel's electrical liability. Guests sleep in
          these rooms and are particularly vulnerable to electrical hazards at night, when they
          may not notice early signs of a fault before a fire develops.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sufficient socket outlets</strong> — hotel bedrooms should have
                adequate socket outlets on both sides of the bed (minimum two per side),
                near the desk or work area, and adjacent to the television point. Insufficient
                sockets encourage guests to use their own extension leads or adaptors,
                creating overloading risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB charging points</strong> — modern hotel bedrooms commonly include
                socket outlets with integrated USB-A and USB-C charging ports. These reduce
                the need for guests to use plug-top USB adaptors, reducing the risk of
                counterfeit or unsafe chargers being plugged in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection — Regulation 411.3.3</strong> — all socket-outlet
                circuits in guest bedrooms must be protected by 30mA RCD in accordance with
                Regulation 411.3.3 of BS 7671:2018. Absence of RCD protection is a common
                C2 finding in older hotels with pre-2000 wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trailing socket leads — observation risk</strong> — bedside lamp
                sockets, touch-sensitive lamp controllers, and trailing socket leads used
                for bedside lighting are frequently found during EICR inspections. Where these
                are not part of a properly wired installation, they are recorded as C2 or C3
                observations. Fixed bedside switched socket spurs are the correct solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'kitchen-laundry',
    heading: 'Kitchen and Laundry Circuits in Hotels',
    content: (
      <>
        <p>
          Commercial hotel kitchens and laundry rooms contain some of the highest electrical
          loads in any building. These circuits require particularly careful assessment during
          the EICR and are frequently found to have deficiencies in older hotel installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase distribution — common in hotel kitchens</strong> — large
                hotel kitchens typically use three-phase electricity to distribute high loads
                across all three phases. The inspector will verify correct phase balancing,
                appropriate MCB sizing on each phase, and the condition of all three-phase
                distribution equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extraction interlock systems</strong> — commercial kitchen
                extraction fans are interlocked with cooking equipment so that if the
                extraction fan fails, the cooking appliances are automatically shut down.
                This safety-critical interlock must be tested and verified as functional
                during the EICR inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial laundry circuits</strong> — industrial washing machines and
                tumble dryers draw high continuous currents. Dedicated circuits sized for the
                full running current (with no diversity applied) are required. Cable derating
                for cables in conduit or bundled with other cables must be applied when sizing
                laundry circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding of metalwork</strong> — all metal structural
                parts, pipework, and equipment in commercial kitchens must be earth-bonded.
                The inspector will check main bonding conductors and supplementary bonding
                where required. Missing or undersized bonding conductors are a frequent C2
                finding in older hotel kitchens.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Hotels — BS 5266-1:2016',
    content: (
      <>
        <p>
          Emergency lighting in hotels is critical to life safety. Guests sleeping in bedrooms
          may be unfamiliar with the building layout and unable to find their way to an exit
          in darkness during a fire. BS 5266-1:2016 sets out the requirements for hotel
          emergency lighting installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coverage — all means of escape</strong> — all guest bedroom corridors,
                all stairwells, all public areas (reception, restaurant, bar, function rooms,
                lounges), all toilet areas without natural light, and all final exit doors
                must have emergency lighting. Exit signs must be illuminated by the emergency
                lighting system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration — three hours for hotels</strong> — BS 5266-1 requires
                three-hour emergency lighting duration for premises where people sleep (hotels,
                guest houses, residential care homes). This is because sleeping guests take
                longer to evacuate than fully alert people in a working environment. One-hour
                duration luminaires are not appropriate for hotel sleeping areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintained luminaires in public areas</strong> — maintained emergency
                luminaires (those that are also the normal lighting) are appropriate for
                hotel public areas, bars, and restaurants where the lighting is on throughout
                the evening. Non-maintained luminaires (that only illuminate on power failure)
                are appropriate for back-of-house areas, corridors, and stairwells.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and logbook</strong> — monthly 30-second function tests and
                annual three-hour full-duration tests must be carried out and recorded in a
                logbook. The logbook must be available for inspection by the fire authority
                and the EICR inspector. Inadequate testing records are a common finding
                in hotel EICR inspections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems in Hotels — BS 5839-1:2017',
    content: (
      <>
        <p>
          Hotels require a commercial-grade fire alarm system to BS 5839-1:2017. The specific
          category is determined by the fire risk assessment, but most hotels require automatic
          detection in all areas including all guest bedrooms.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>L1 system — typically required for hotels</strong> — automatic detection
                in all areas, including all guest bedrooms, all corridors, all public areas,
                the kitchen, and all storage areas. L1 coverage is required because sleeping
                guests cannot respond to visual signs of fire — automatic early detection is
                essential to give sufficient time for evacuation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Addressable systems — best practice for larger hotels</strong> — an
                addressable fire alarm system identifies which specific detector or call point
                has activated, allowing the fire alarm panel operator to identify the location
                of the fire immediately. This is essential in large hotels with multiple floors
                and many rooms. Conventional (zone-based) systems are acceptable only for
                smaller properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-stage alarm — common in hotels</strong> — a two-stage alarm
                allows the management to investigate before causing a full evacuation. Stage
                one is an alert (staff pagers or internal alert tone), giving time to
                investigate. Stage two is full evacuation. This reduces nuisance evacuations
                from false alarms without compromising safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm wiring within EICR scope</strong> — the fire alarm system
                wiring forms part of the fixed electrical installation. The EICR inspector
                will check the panel supply, all alarm circuit wiring, and battery back-up.
                Faults in the fire alarm wiring will be recorded as EICR observations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bathroom-zones',
    heading: 'En-Suite Showers and Bathroom Zones — BS 7671 Section 701',
    content: (
      <>
        <p>
          En-suite bathrooms and shower rooms in hotels are special locations under BS 7671:2018
          Part 7, Section 701. The zone requirements protect guests from the particularly high
          risk of electric shock that exists in wet environments. Every en-suite in a hotel must
          comply with these requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone definitions</strong> — Zone 0 is the inside of the bath or shower
                tray. Zone 1 is directly above the bath or shower, up to 2.25m. Zone 2 extends
                0.6m beyond Zone 1 horizontally. Equipment in each zone must meet specified
                IP protection ratings appropriate to the zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets — 3 metre exclusion zone</strong> — no standard socket
                outlet (other than a BS 3535 shaver supply unit) may be installed within
                3 metres of a bath or shower. In compact hotel en-suites, the positioning
                of shaver sockets requires careful planning. Shaver supply units must provide
                isolation between input and output.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary equipotential bonding</strong> — in hotel en-suites,
                all exposed metalwork (towel rails, pipework, drainage grates) must be
                connected by supplementary bonding conductors to prevent dangerous potential
                differences between simultaneously touchable metal parts. Missing supplementary
                bonding is a common C2 finding in older hotel bathrooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection — all bathroom circuits</strong> — Regulation 701.411.3.3
                requires 30mA RCD protection on all circuits serving bathroom zones, regardless
                of whether those circuits supply socket outlets. This includes lighting circuits
                serving en-suite bathrooms and shower rooms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Hotel en-suite bathrooms are inspected particularly carefully during EICRs. The
          combination of moisture, high guest turnover, and the consequences of electric shock
          in wet environments makes bathroom zone compliance a priority.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-scope',
    heading: 'Full EICR Scope for Hotels',
    content: (
      <>
        <p>
          A hotel EICR is one of the most complex inspections a qualified electrician undertakes.
          The full scope covers every element of the fixed electrical installation, from the main
          incoming supply to the final socket outlets in guest bedrooms.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main incoming supply and metering</strong> — condition of the main
                switch, metering equipment, and incoming supply cables. Verification of
                earthing arrangement (TN-S, TN-C-S, or TT) and measurement of earth fault
                loop impedance at the origin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution boards and sub-distribution</strong> — condition, labelling,
                accessibility, MCB and RCD protection, and insulation resistance testing on
                all circuits. Hotels with multiple floors typically have a main distribution
                board and floor distribution boards serving each floor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guest bedroom circuits</strong> — socket outlet circuits, lighting
                circuits, and any en-suite circuits in a sample of bedrooms. The scope and
                sampling frequency should be agreed with the hotel operator and specified in
                the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plant rooms, lift motor rooms, and service areas</strong> — electrical
                installations in plant rooms, lift machinery rooms, and back-of-house service
                areas are part of the EICR scope. Lift supplies must be checked but the lift
                itself requires separate periodic maintenance by a lift engineer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting and fire alarm systems</strong> — both systems
                form part of the fixed electrical installation and must be included in the
                EICR scope. The inspector will verify correct wiring, circuit protection, and
                operational testing records.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'compliance-costs',
    heading: 'Typical Hotel Electrical Compliance Costs (2026)',
    content: (
      <>
        <p>
          Hotel electrical compliance costs vary significantly with the size, age, and condition
          of the property. The following figures are indicative for a 30-bedroom hotel with
          a commercial kitchen, bar, restaurant, and function room.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — 30-bedroom hotel</strong> — £2,000 to £5,000. The large number
                of circuits, multiple distribution boards, bathroom zone inspections, and
                emergency lighting and fire alarm wiring all add to the scope and the
                inspection time required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board replacement</strong> — £2,000 to £5,000 per board
                for a commercial-grade RCBO distribution board. A 30-bedroom hotel may have
                a main distribution board plus six to eight floor boards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting upgrade — three-hour duration</strong> — £5,000 to
                £20,000 depending on the number of luminaires required and whether the existing
                wiring can be reused. Three-hour battery packs and maintained luminaires for
                public areas are more expensive than standard one-hour non-maintained units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Addressable fire alarm system</strong> — £15,000 to £50,000 for a
                fully addressable L1 system in a 30-bedroom hotel. Annual maintenance
                contracts for BS 5839-1 compliant systems typically cost £1,500 to £4,000
                per year.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Hotel Electrical Inspection Work',
    content: (
      <>
        <p>
          Hotel EICRs are among the highest-value inspection contracts available to commercial
          electricians. A thorough inspector with knowledge of BS 7671 Section 701 bathroom zone
          requirements, BS 5266-1 emergency lighting, and BS 5839-1 fire alarm systems commands
          a premium rate and builds long-term relationships with hotel operators and facilities
          managers.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Hotel EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to document complex hotel installations on your phone. Circuit-by-circuit
                  test result entry, AI board scanning for distribution boards, and photo
                  attachment for bathroom zone observations mean you can produce a complete
                  professional EICR on site for even the largest hotel installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win High-Value Remedial and Maintenance Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Distribution board replacements, emergency lighting upgrades, and fire alarm
                  remediation in hotels are high-value contracts. Quote on site with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  and convert inspection clients into recurring annual maintenance relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more hotel electrical work with Elec-Mate"
          description="Complete hotel EICRs on your phone, quote remedial works and upgrades on site, and build recurring relationships with hotel facilities managers. 7-day free trial for UK electricians."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HotelEICRPage() {
  return (
    <GuideTemplate
      title="Hotel EICR UK | Electrical Inspection for Hotels & Guest Houses"
      description="Complete guide to EICR for hotels and guest houses in the UK. Regulatory Reform (Fire Safety) Order 2005 obligations, recommended EICR frequency, bedroom electrical safety, kitchen and laundry circuits, emergency lighting to BS 5266-1, fire alarm systems to BS 5839-1, en-suite bathroom zone requirements, and 2026 compliance costs."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Hotel Electrical Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          Hotel EICR UK:{' '}
          <span className="text-yellow-400">Electrical Inspection for Hotels & Guest Houses 2026</span>
        </>
      }
      heroSubtitle="Hotels and guest houses are subject to the Regulatory Reform (Fire Safety) Order 2005 and must maintain their electrical installation to a standard that protects sleeping guests. This guide covers EICR frequency, bedroom electrical safety, kitchen and laundry circuits, emergency lighting to BS 5266-1, fire alarms to BS 5839-1, en-suite bathroom zone requirements under BS 7671 Section 701, and 2026 compliance costs."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hotel EICR"
      relatedPages={relatedPages}
      ctaHeading="Complete Hotel EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
