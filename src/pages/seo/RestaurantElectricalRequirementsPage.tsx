import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  Zap,
  Fan,
  Flame,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Camera,
  Receipt,
  GraduationCap,
  Lightbulb,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Restaurant Requirements', href: '/guides/restaurant-electrical-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'Restaurant Electrical Overview' },
  { id: 'three-phase-supply', label: 'Three-Phase Supply' },
  { id: 'extract-ventilation', label: 'Extract Fans and Ventilation' },
  { id: 'commercial-equipment', label: 'Commercial Kitchen Equipment' },
  { id: 'emergency-lighting', label: 'Emergency Lighting' },
  { id: 'fire-alarm', label: 'Fire Alarm Systems' },
  { id: 'eicr-intervals', label: 'EICR Intervals for Restaurants' },
  { id: 'compliance-checklist', label: 'Compliance Checklist' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Most commercial kitchens require a three-phase supply to support high-demand equipment such as combi ovens, commercial dishwashers, and extract systems — single-phase supply is rarely sufficient.',
  'Extract ventilation in commercial kitchens must comply with Building Regulations Part F, Gas Safety (Installation and Use) Regulations 1998, and DW/172 (Specification for Kitchen Ventilation Systems) — an interlock between the gas supply and extract fan is mandatory.',
  'Emergency lighting must comply with BS 5266-1:2016 and requires monthly functional testing, annual full-duration testing, and a 3-hour battery duration for most restaurant premises.',
  'EICR inspections for restaurants and commercial kitchens should be carried out at intervals of no more than 5 years, though 3-year intervals are recommended by many insurers and local authority licensing teams.',
  'Elec-Mate lets electricians complete EICR certificates, fire alarm certificates, and emergency lighting certificates for restaurant clients on site — with AI defect coding, professional PDF export, and instant delivery.',
];

const faqs = [
  {
    question: 'Does a restaurant need a three-phase electricity supply?',
    answer:
      'It depends on the total electrical load. A small cafe or takeaway with domestic-grade equipment may manage on a single-phase 100A supply. However, most sit-down restaurants with commercial kitchens require a three-phase supply because the combined load of combi ovens (typically 15-40 kW each), commercial dishwashers (6-18 kW), extract fans (2-7 kW), and refrigeration equipment exceeds what a single-phase supply can deliver. A three-phase supply provides three times the capacity of a single-phase supply at the same current rating. If you are fitting out a new restaurant or taking over premises, arrange a site survey with a qualified electrician to calculate the maximum demand and determine whether the existing supply is adequate or whether an upgrade is needed. Supply upgrades must be arranged through the Distribution Network Operator (DNO) and can take 6-12 weeks, so plan well ahead of your opening date.',
  },
  {
    question: 'How often does a restaurant need an EICR?',
    answer:
      'BS 7671:2018+A3:2024 recommends periodic inspection intervals of no more than 5 years for commercial premises. However, many local authorities, insurers, and premises licence conditions specify 3-year intervals for restaurants and food establishments due to the harsh operating environment — heat, steam, grease, and frequent cleaning all accelerate deterioration of electrical installations. The Environmental Health team or Fire and Rescue Service may request a copy of the EICR as part of their inspection regime. Under the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989, the duty holder (usually the restaurant owner or operator) is responsible for ensuring the electrical installation is maintained in a safe condition. Failure to provide a current EICR can affect your premises licence, insurance validity, and compliance status.',
  },
  {
    question: 'What are the emergency lighting requirements for a restaurant?',
    answer:
      'Emergency lighting in restaurants must comply with BS 5266-1:2016 (Emergency lighting — Code of practice for the emergency lighting of premises). The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to ensure that emergency routes and exits are provided with adequate emergency lighting. In practice, this means illuminated exit signs above all final exit doors, emergency lighting along all escape routes (corridors, stairways, and any route a customer or member of staff would use to leave the building), open-area lighting to prevent panic in rooms larger than 60 square metres, and standby lighting in high-risk areas such as commercial kitchens. The system must provide a minimum 3-hour duration on battery backup, achieve a minimum 1 lux on the centre line of escape routes (0.5 lux on the centre line of open areas), and be tested monthly (functional test) and annually (full-duration test). Test records must be maintained in a log book and made available to the Fire and Rescue Service on request.',
  },
  {
    question: 'Is a fire alarm certificate required for a restaurant?',
    answer:
      'Under the Regulatory Reform (Fire Safety) Order 2005, the responsible person must carry out a fire risk assessment and install appropriate fire detection and alarm systems. For most restaurants, a fire alarm system designed and installed to BS 5839-1:2017 is required. The system category depends on the fire risk assessment — most restaurants require at least a Category L2 system (covering defined areas of risk, such as the kitchen, store rooms, and escape routes) or Category M (manual call points only, for smaller premises with simple layouts). After installation, the fire alarm system must be commissioned, and a Fire Alarm Certificate should be issued. Ongoing maintenance requires weekly testing of the alarm, quarterly inspection by a competent fire alarm engineer, and an annual service. Records of all testing and maintenance must be kept. Elec-Mate supports fire alarm certificates with BS 5839-1 compliance built into the form structure.',
  },
  {
    question: 'What electrical certificates are needed to open a restaurant?',
    answer:
      'Opening a restaurant typically requires the following electrical documentation: an Electrical Installation Certificate (EIC) for any new installation work, a Minor Works Certificate for smaller additions or alterations, a current EICR (Electrical Installation Condition Report) confirming the existing installation is safe, an Emergency Lighting Certificate confirming compliance with BS 5266-1, a Fire Alarm Certificate confirming compliance with BS 5839-1, and PAT Testing records for all portable appliances. You may also need a Building Regulations completion certificate for notifiable electrical work carried out under Part P. These documents are typically requested by the local authority licensing team, environmental health officers, the Fire and Rescue Service, and your insurance company. An incomplete set of certificates can delay your premises licence approval and your opening date.',
  },
  {
    question: 'Do commercial dishwashers need a special electrical supply?',
    answer:
      'Most commercial dishwashers require a dedicated electrical supply. Pass-through (hood-type) dishwashers typically draw 6-10 kW and require a 32A supply on a dedicated circuit. Rack conveyor dishwashers can draw 18-30 kW and usually require a three-phase supply. Flight-type (continuous conveyor) machines for very large operations can exceed 50 kW. The dishwasher must be on its own dedicated circuit with appropriate overcurrent protection, and the cable must be sized to handle the full rated current of the machine with appropriate correction factors applied for ambient temperature, grouping, and installation method. Many commercial dishwashers also require a water softener and a dedicated hot water supply. Always check the manufacturer data sheet for the exact electrical requirements before specifying the circuit — the power rating, number of phases, and connection type (hardwired vs plug-and-socket) vary significantly between models and manufacturers.',
  },
  {
    question: 'What is the gas interlock requirement for commercial kitchens?',
    answer:
      'In any commercial kitchen that uses gas cooking equipment, Building Regulations and British Standard BS 6173:2009 require an interlock between the gas supply and the mechanical extract ventilation system. This means the gas supply must automatically shut off if the extract fan stops operating or fails. The interlock system typically uses a current-sensing relay on the extract fan motor circuit and a gas solenoid valve on the gas supply pipework. When the extract fan is running and confirmed operational, the gas solenoid valve opens, allowing gas to flow to the cooking equipment. If the extract fan stops for any reason — power failure, motor fault, belt failure — the gas solenoid valve closes within a few seconds, shutting off the gas supply. This is a critical safety system that prevents the build-up of combustion products (carbon monoxide) in the kitchen. The gas interlock must be tested at commissioning and at each gas safety inspection. A qualified electrician installs the electrical components (current sensing relay, wiring, and control panel), while a Gas Safe registered engineer installs the gas solenoid valve and commissions the gas side.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export for commercial premises.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description:
      'BS 5839-1 compliant fire alarm certificates for restaurants and commercial premises. Digital completion and instant delivery.',
    icon: Flame,
    category: 'Certificate',
  },
  {
    href: '/tools/emergency-lighting-certificate',
    title: 'Emergency Lighting Certificate',
    description:
      'BS 5266-1 compliant emergency lighting certificates with test schedules, battery duration records, and lux level documentation.',
    icon: Lightbulb,
    category: 'Certificate',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description:
      'Step-by-step guide to completing every section of the EICR form correctly for commercial inspections.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/calculators/max-demand',
    title: 'Max Demand Calculator',
    description:
      'Calculate maximum demand for commercial kitchens with diversity factors applied to three-phase loads.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training courses covering commercial inspection and testing on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Restaurant Electrical Requirements: What You Need to Know',
    content: (
      <>
        <p>
          Restaurants, cafes, and commercial food establishments have some of the most demanding
          electrical installations in the commercial sector. The combination of high-power kitchen
          equipment, mechanical extract ventilation, emergency lighting, fire alarm systems, CCTV,
          EPOS tills, refrigeration, and ambient lighting creates a complex electrical load that
          requires careful design, installation, and ongoing maintenance.
        </p>
        <p>
          The regulatory framework is equally complex. Restaurant electrical installations must
          comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations), the Electricity at Work Regulations 1989, the Health and
          Safety at Work Act 1974,{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Building Regulations Part P
          </SEOInternalLink>{' '}
          (electrical safety), Part B (fire safety), Part F (ventilation), Part L (energy
          efficiency), the Regulatory Reform (Fire Safety) Order 2005, and food hygiene regulations
          that affect the design and placement of electrical equipment in food preparation areas.
        </p>
        <p>
          This guide covers the key electrical requirements for restaurants in the UK — from
          three-phase supply calculations to extract fan interlocks, emergency lighting to fire
          alarm systems, and EICR inspection intervals. Whether you are an electrician working on
          restaurant fit-outs or a restaurant owner planning a new premises, this is the reference
          you need.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase-supply',
    heading: 'Three-Phase Supply for Commercial Kitchens',
    content: (
      <>
        <p>
          The first question for any restaurant electrical installation is whether the existing
          supply is adequate. Most commercial kitchens need a three-phase supply because the total
          connected load exceeds the capacity of a single-phase supply.
        </p>
        <p>
          A typical sit-down restaurant with 40-60 covers might have the following electrical loads:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combi oven</strong> — 15 to 40 kW (three-phase). The single largest
                electrical load in most commercial kitchens. Some kitchens have two.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial dishwasher</strong> — 6 to 18 kW. Pass-through types are
                typically single-phase 32A; rack conveyor types are usually three-phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extract ventilation system</strong> — 2 to 7 kW. Kitchen canopy extract with
                supply air. Often three-phase for larger systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Walk-in cold room and freezer</strong> — 1 to 3 kW each. Dedicated circuits
                with appropriate overcurrent and RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General power, lighting, EPOS, CCTV</strong> — 5 to 15 kW combined. Front of
                house and back of house power circuits, ambient and feature lighting, tills, card
                machines, and security systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The total connected load can easily reach 60 to 120 kW before diversity is applied. After
          applying diversity factors from BS 7671 Appendix 1, the maximum demand typically falls to
          40 to 80 kW. A three-phase 100A supply provides approximately 69 kW, which is sufficient
          for many mid-size restaurants. Larger operations may require a 200A or even 400A
          three-phase supply.
        </p>
        <p>
          If the premises currently has a single-phase supply, a three-phase upgrade must be
          arranged through the Distribution Network Operator (DNO). This involves a formal
          application, a quotation for the connection works, and a lead time of 6 to 12 weeks. Plan
          this well ahead of your fit-out programme.
        </p>
      </>
    ),
  },
  {
    id: 'extract-ventilation',
    heading: 'Extract Fans and Ventilation Systems',
    content: (
      <>
        <p>
          Mechanical extract ventilation is not optional in a commercial kitchen. Building
          Regulations Part F requires adequate ventilation in all commercial food preparation areas,
          and the specific requirements are set out in DW/172 (BESA Specification for Kitchen
          Ventilation Systems).
        </p>
        <p>The electrical requirements for kitchen extract systems include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — the extract fan must have its own dedicated
                circuit from the distribution board, sized for the full load current of the motor
                with appropriate correction factors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas interlock</strong> — where gas cooking equipment is used, a gas
                interlock system is mandatory. A current-sensing relay monitors the extract fan
                motor. If the fan stops, the gas solenoid valve closes, shutting off the gas supply
                to all cooking equipment within seconds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Make-up air</strong> — the supply air fan (providing replacement air to the
                kitchen) must be interlocked with the extract fan. The supply air system should not
                operate without the extract running.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Speed control</strong> — variable speed drives (VSDs) or inverters are
                increasingly used for extract fan motors to reduce energy consumption. The VSD must
                be installed to minimise electromagnetic interference and the cable between the VSD
                and motor should be screened (SY cable).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The gas interlock is one of the most safety-critical elements of the electrical
          installation. It must be tested at commissioning and at every subsequent gas safety
          inspection. The electrician installs and maintains the electrical components (current
          sensor, relay, control panel, and wiring), while the Gas Safe engineer commissions and
          certifies the gas side including the solenoid valve.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-equipment',
    heading: 'Commercial Kitchen Equipment: Electrical Requirements',
    content: (
      <>
        <p>
          Every piece of commercial kitchen equipment has specific electrical requirements that must
          be met during the fit-out. Getting these wrong causes delays, additional costs, and
          potential safety issues.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Combi Ovens</h4>
            <p className="text-white text-sm leading-relaxed">
              The most power-hungry item in most kitchens. A single Rational iCombi Pro 10-1/1 draws
              approximately 19 kW on a three-phase supply. Larger models (20-2/1) can draw over 40
              kW. They require hardwired connections on dedicated circuits with appropriate
              isolators. Always check the manufacturer data sheet — power ratings vary significantly
              between models. Water and drain connections are also required, and the installation
              position must allow adequate clearance for ventilation and servicing.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Commercial Dishwashers</h4>
            <p className="text-white text-sm leading-relaxed">
              Pass-through (hood-type) models typically need a 32A single-phase or three-phase
              supply. Rack conveyor models need a three-phase supply, often 32A or 63A depending on
              the model. Flight-type (conveyor) machines for high-volume operations can exceed 50
              kW. A dedicated circuit with RCD protection is essential. The dishwasher should also
              have a local isolator within reach of the operator for emergency shutdown.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Walk-In Cold Rooms and Freezers</h4>
            <p className="text-white text-sm leading-relaxed">
              Walk-in cold rooms and freezer rooms require dedicated circuits, typically 16A or 20A.
              The compressor unit is usually sited externally or in a plant area. An emergency
              door-release mechanism (often a manual push bar) must be fitted inside the cold room,
              and an internal alarm system is recommended. The lighting circuit inside the cold room
              must use fittings rated for the temperature and humidity conditions. IP65 rated LED
              fittings are standard.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Deep Fat Fryers</h4>
            <p className="text-white text-sm leading-relaxed">
              Electric fryers range from 3 kW (single-tank countertop) to 25 kW (double-tank
              floor-standing, three-phase). They must be positioned under the extract canopy and
              connected on dedicated circuits. A red emergency stop button (mushroom head, latching
              type) should be installed within easy reach of the fryer operator. The fryer circuit
              must be protected by an appropriate overcurrent device and, where required, an RCD.
            </p>
          </div>
        </div>
        <p>
          Before starting any commercial kitchen fit-out, obtain the manufacturer data sheets for
          every piece of equipment. Calculate the total connected load, apply diversity, and design
          the distribution board schedule accordingly. Use Elec-Mate's{' '}
          <SEOInternalLink href="/calculators/max-demand">max demand calculator</SEOInternalLink> to
          verify the supply capacity is adequate.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting in Restaurants',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement for all restaurants and commercial food premises
          under the Regulatory Reform (Fire Safety) Order 2005. The system must comply with{' '}
          <SEOInternalLink href="/tools/emergency-lighting-certificate">
            BS 5266-1:2016
          </SEOInternalLink>{' '}
          and provide illumination along all escape routes, at exit doors, and in high-risk areas
          (including the commercial kitchen) in the event of a mains power failure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exit signs</strong> — illuminated exit signs (maintained or non-maintained)
                must be installed above all final exit doors and at any point where the direction of
                escape is not immediately obvious. Signs must comply with BS 5499.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Escape route lighting</strong> — minimum 1 lux on the centre line of escape
                routes, with a uniformity ratio of no more than 40:1 between the brightest and
                darkest points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-area lighting</strong> — minimum 0.5 lux in open areas larger than 60
                square metres, such as the main dining room, to prevent panic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-risk task area lighting</strong> — the commercial kitchen is classified
                as a high-risk area. Emergency lighting must provide sufficient illumination for the
                operator to shut down equipment safely (minimum 10% of the normal maintained
                illuminance or 15 lux, whichever is greater).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration</strong> — 3-hour battery backup for most restaurant premises (1
                hour is only acceptable for premises that are evacuated immediately and not
                reoccupied during a power failure).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Testing is mandatory: a monthly functional test (simulate mains failure, confirm all
          luminaires illuminate), a quarterly brief inspection, and an annual full-duration test
          (run the system for the full 3 hours on battery and verify illumination is maintained).
          All test results must be recorded in a log book. For more on the testing sequence, see our{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            testing sequence guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Systems for Restaurants',
    content: (
      <>
        <p>
          The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person (typically
          the restaurant owner or operator) to ensure that appropriate fire detection and alarm
          systems are in place. The fire alarm system must be designed, installed, and maintained to{' '}
          <SEOInternalLink href="/tools/fire-alarm-certificate">BS 5839-1:2017</SEOInternalLink>.
        </p>
        <p>
          The system category depends on the fire risk assessment. Common categories for restaurants
          include:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Category M</h3>
            <p className="text-white text-sm leading-relaxed">
              Manual system only — call points at exit doors. Suitable for smaller premises with
              simple layouts, minimal fire risk, and where the occupants are likely to discover a
              fire quickly. No automatic detection.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Category L2</h3>
            <p className="text-white text-sm leading-relaxed">
              Automatic detection in defined areas of high risk (kitchen, store rooms, plant rooms)
              plus all escape routes and rooms opening onto escape routes. Most common category for
              medium-sized restaurants. Heat detectors in the kitchen, smoke detectors in escape
              routes and storage areas.
            </p>
          </div>
        </div>
        <p>
          Commercial kitchens present a unique challenge for fire detection because cooking produces
          heat and airborne particles that can trigger false alarms. Heat detectors (rate-of-rise
          type or fixed-temperature type rated for the kitchen environment) are used in cooking
          areas instead of smoke detectors. Multi-sensor detectors are increasingly used in
          transitional areas (for example, the pass between kitchen and dining room).
        </p>
        <p>The fire alarm system must integrate with:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electromagnetic door holders</strong> — fire doors held open by
                electromagnetic retainers release automatically when the fire alarm activates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen suppression system</strong> — if an Ansul or similar kitchen
                suppression system is fitted, it should interface with the fire alarm panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas shut-off</strong> — the fire alarm can trigger the gas solenoid valve to
                close, shutting off the gas supply in the event of a fire alarm activation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-intervals',
    heading: 'EICR Intervals for Restaurants and Commercial Kitchens',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Table 3A (Guidance Note 3, 9th Edition) recommends a maximum periodic
          inspection interval of 5 years for commercial premises. However, the harsh environment of
          a commercial kitchen — heat, steam, grease, water, aggressive cleaning chemicals, and
          heavy daily use — means that deterioration occurs faster than in a typical office or
          retail premises.
        </p>
        <p>
          Many insurers, local authorities, and fire and rescue services recommend or require a
          3-year EICR interval for restaurants. Some premises licence conditions specify this
          directly. If the previous EICR inspector recommended a 3-year interval, the duty holder
          must follow that recommendation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 years maximum</strong> — the BS 7671 recommended maximum interval for
                commercial premises. Adequate for restaurants with well-maintained, modern
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3 years recommended</strong> — appropriate for most restaurants,
                particularly those with older installations, heavy use, or premises where the
                kitchen environment is particularly harsh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1 year for caravans and temporary structures</strong> — food vans, pop-up
                restaurants, and temporary food stalls should be inspected annually due to the
                portable nature of the installation and exposure to weather.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Under the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989
          (specifically Regulation 4), the duty holder must ensure that electrical installations are
          maintained so as to prevent danger. A current EICR is the standard evidence of compliance.
          Failing to maintain a valid EICR can result in enforcement action from the Health and
          Safety Executive (HSE), invalidation of insurance, and difficulty renewing a premises
          licence.
        </p>
        <SEOAppBridge
          title="Commercial EICR certificates on your phone"
          description="Complete the full EICR for commercial premises on site with Elec-Mate. AI board scanner handles three-phase distribution boards, voice test entry captures readings hands-free, and the finished certificate exports as a professional PDF for the restaurant owner."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'compliance-checklist',
    heading: 'Restaurant Electrical Compliance Checklist',
    content: (
      <>
        <p>
          Use this checklist to verify that a restaurant electrical installation meets the key
          compliance requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply adequacy</strong> — supply capacity verified against maximum demand
                calculation. Three-phase supply in place where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board schedule</strong> — all circuits clearly labelled with
                correct ratings. Adequate spare ways for future expansion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — appropriate RCD protection on all circuits as
                required by BS 7671. Socket circuits, circuits supplying equipment in zones of
                increased risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas interlock</strong> — extract fan to gas solenoid interlock installed,
                commissioned, and tested. Current sensing relay confirmed operational.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — BS 5266-1 compliant system installed. Exit
                signs, escape route lighting, open-area lighting, and high-risk area lighting all
                verified. Test schedule established.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm</strong> — BS 5839-1 compliant system installed to the
                appropriate category. Heat detectors in kitchen areas. Integration with door
                holders, suppression system, and gas shut-off verified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — current EICR in place with Satisfactory outcome. Next
                inspection date recorded and tracked.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT testing</strong> — all portable appliances tested and labelled. Records
                maintained.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Restaurant Work as a Revenue Stream',
    content: (
      <>
        <p>
          Restaurant and commercial kitchen electrical work is a lucrative specialism for
          electricians. The combination of regular EICR inspections (every 3-5 years), emergency
          lighting testing (monthly and annually), fire alarm maintenance (quarterly and annually),
          PAT testing, and ongoing reactive maintenance creates a recurring revenue stream from each
          restaurant client.
        </p>
        <p>A single restaurant contract might include:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR every 3 years</strong> — commercial premises with 30-50+ circuits. A
                thorough commercial EICR can take a full day on site. Price accordingly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting testing</strong> — monthly functional tests and annual
                full-duration test. Many electricians offer this as a maintenance contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm maintenance</strong> — quarterly inspections and annual service.
                Another maintenance contract opportunity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive maintenance</strong> — restaurants operate long hours and equipment
                failures need fast response. Being on call for a restaurant generates premium-rate
                callout work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate supports the full range of certificates needed for restaurant work —{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>,{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">Minor Works</SEOInternalLink>, Fire
          Alarm, Emergency Lighting, and PAT Testing. Complete every certificate on your phone,
          generate professional PDFs, and deliver them to the restaurant owner before you leave the
          premises.
        </p>
        <SEOAppBridge
          title="All restaurant certificates in one app"
          description="EICR, EIC, Fire Alarm, Emergency Lighting, PAT Testing — complete every certificate a restaurant needs on your phone. AI board scanner, voice test entry, instant PDF delivery. Join 430+ UK electricians using Elec-Mate."
          icon={Building}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RestaurantElectricalRequirementsPage() {
  return (
    <GuideTemplate
      title="Restaurant Electrical Requirements | Commercial Kitchen Electrics"
      description="Complete guide to restaurant electrical requirements in the UK. Three-phase supply, extract fan interlocks, commercial kitchen equipment, emergency lighting BS 5266, fire alarm BS 5839, and EICR inspection intervals for commercial food premises."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          Restaurant Electrical Requirements:{' '}
          <span className="text-yellow-400">Commercial Kitchen Electrics Guide</span>
        </>
      }
      heroSubtitle="From three-phase supply calculations to gas interlocks, emergency lighting to fire alarm systems — this guide covers every electrical requirement for restaurants and commercial kitchens in the UK. Whether you are fitting out new premises or maintaining an existing installation, this is the reference you need."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Restaurant Electrical Requirements"
      relatedPages={relatedPages}
      ctaHeading="Complete Restaurant Certificates on Your Phone"
      ctaSubheading="EICR, Fire Alarm, Emergency Lighting, PAT Testing — every certificate a restaurant needs, completed on site with AI-powered tools. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
    />
  );
}
