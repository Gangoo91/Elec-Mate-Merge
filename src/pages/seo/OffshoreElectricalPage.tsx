import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  ClipboardCheck,
  Zap,
  FileCheck2,
  Building2,
  Clock,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Sectors', href: '/specialist-electrical-sectors' },
  { label: 'Offshore Electrical Engineer', href: '/offshore-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Offshore Electrical Overview' },
  { id: 'atex-zones', label: 'ATEX Zone Classification' },
  { id: 'hazardous-area-equipment', label: 'Hazardous Area Equipment Selection' },
  { id: 'essential-services', label: 'Essential Services & ESD' },
  { id: 'ups-systems', label: 'UPS & Battery Systems' },
  { id: 'survival-craft', label: 'Survival Craft Electrical' },
  { id: 'survival-training', label: 'BOSIET & GWO Training' },
  { id: 'rotation-pay', label: 'Rotation Patterns & Day Rates' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Offshore oil and gas platforms use ATEX zone classification (Zone 0, 1, and 2) to define areas where explosive atmospheres are likely. Every piece of electrical equipment in a hazardous zone must be rated for that zone and certified accordingly.',
  'CompEx is the required qualification for offshore electrical engineers working in hazardous areas. Without CompEx certification, you cannot legally carry out electrical work in ATEX-classified zones on UK offshore installations.',
  'Essential services — including emergency shutdown (ESD) systems, emergency lighting, fire and gas detection, and life-safety systems — have the highest electrical integrity requirements on any offshore installation.',
  'BOSIET (Basic Offshore Safety Induction and Emergency Training) including HUET (Helicopter Underwater Escape Training) is mandatory before travelling to any offshore installation. Certificates expire after four years.',
  'Typical offshore rotation is two weeks on, two weeks off, with accommodation, meals, and transport to the installation provided. Day rates for experienced offshore electrical engineers range from £400 to £700.',
  'UPS systems on offshore installations are critical for maintaining power to essential services during main power interruptions. Offshore UPS maintenance requires understanding of both the UPS technology and the essential services it supports.',
];

const faqs = [
  {
    question: 'What qualifications do I need to become an offshore electrical engineer?',
    answer:
      'You need a recognised electrical trade qualification (NVQ Level 3 or equivalent), 18th Edition (BS 7671) certification, and CompEx certification for hazardous areas (ExI01 to ExI04 units as a minimum for installation work). BOSIET (Basic Offshore Safety Induction and Emergency Training) including HUET is mandatory for travel to offshore installations. Many operators and contractors also require a degree or HNC/HND in electrical engineering for engineer-grade roles. Inspection and testing qualifications (City & Guilds 2391 or 2394/2395) are highly valued for maintenance roles.',
  },
  {
    question: 'What is ATEX Zone 0, Zone 1, and Zone 2?',
    answer:
      'ATEX zone classification defines the likelihood of an explosive gas atmosphere being present. Zone 0 is an area where an explosive atmosphere is present continuously or for long periods — typically the inside of a process vessel or storage tank. Zone 1 is an area where an explosive atmosphere is likely to occur in normal operation — the immediate surroundings of Zone 0 areas, valve flanges, and pump seals. Zone 2 is an area where an explosive atmosphere is not likely to occur in normal operation but may occur in abnormal conditions — typically the wider process deck area. Electrical equipment must be rated for the zone in which it is installed, with Zone 0 requiring the most stringent certification (Category 1 equipment).',
  },
  {
    question: 'What is BOSIET and HUET and how long do certificates last?',
    answer:
      'BOSIET (Basic Offshore Safety Induction and Emergency Training) is the mandatory safety training course for all personnel travelling to offshore installations by helicopter. It covers platform safety, fire fighting, first aid, sea survival, and Helicopter Underwater Escape Training (HUET). HUET involves practical training in escaping from a submerged and inverted helicopter simulator — an essential skill for offshore workers. BOSIET certificates are valid for four years, after which a Refresher BOSIET (RBOSIET) is required. The training is OPITO-approved and recognised across the UK and international offshore industry.',
  },
  {
    question: 'What is GWO certification and is it needed for offshore electrical work?',
    answer:
      'GWO (Global Wind Organisation) certification is the standard training framework for the offshore wind industry, covering Basic Safety Training (BST), First Aid, Fire Awareness, Manual Handling, Sea Survival, and Working at Heights. GWO is distinct from BOSIET, which is for oil and gas offshore. If you are working on offshore wind turbines rather than oil and gas platforms, GWO Basic Safety Training is typically required instead of BOSIET. Many offshore electrical engineers hold both, enabling work across oil and gas and offshore wind sectors.',
  },
  {
    question: 'What are typical day rates for offshore electrical engineers?',
    answer:
      'Day rates for offshore electrical engineers in the UK North Sea typically range from £400 to £700 per day, depending on experience, certification level, operator, and current market conditions. Experienced CompEx-certified offshore electrical engineers with BOSIET and strong maintenance or commissioning backgrounds can command rates at the upper end. Day rates are paid for both on-rotation days (when offshore working) and off-rotation days (when at home), meaning the total annual earnings are based on roughly 50% of days at the day rate, minus agency and accommodation costs.',
  },
  {
    question: 'What are essential services on an offshore installation?',
    answer:
      'Essential services are the electrical systems that must remain powered under any circumstances to protect personnel and the installation. They include emergency shutdown (ESD) systems that safely shut down production in an emergency, emergency lighting throughout muster stations and escape routes, fire and gas detection and alarm systems, public address and general alarm (PAGA) systems, survival craft launch and release systems, emergency communication systems, and emergency power generation. These systems are powered from essential electrical distribution systems that are independent of the main production power system and backed by dedicated emergency diesel generators and UPS systems.',
  },
  {
    question: 'How does offshore electrical work differ from onshore industrial electrical work?',
    answer:
      'Offshore electrical work differs from onshore industrial work in several important ways. The working environment is more confined and presents additional hazards including helicopter transport risk, sea survival requirements, and limited access to specialist support if something goes wrong. ATEX hazardous area requirements are pervasive — a much larger proportion of an offshore platform is classified as a hazardous zone than would be the case in an onshore facility. Maintenance schedules are driven by platform availability and production requirements. The consequence of electrical faults is potentially more severe than onshore, so quality of work and documentation standards are very high. Conversely, the financial rewards are significantly higher than equivalent onshore roles.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/petrochemical-electrical',
    title: 'Petrochemical Electrical Installation',
    description:
      'ATEX zone classification, DSEAR compliance, CompEx qualification, and Ex equipment on refineries.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/nuclear-site-electrical',
    title: 'Nuclear Site Electrical Engineering',
    description:
      'Nuclear island vs conventional island, Nuclear Baseline QA, BPSS/SC clearance, and pay rates.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/food-processing-electrical',
    title: 'Food Processing Electrical Installation',
    description:
      'IP69K wash-down environments, ATEX dust zones, hygienic design, and BRC Global Standards.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the Wiring Regulations — amendments, key changes, and compliance.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Offshore Electrical Engineering in the UK',
    content: (
      <>
        <p>
          Offshore electrical engineering on UK oil and gas platforms represents one of the most
          technically demanding and financially rewarding specialisms in the electrical industry.
          The combination of hazardous area requirements, essential services engineering, confined
          working environments, and the consequences of failure in a remote offshore setting demands
          the highest levels of technical competence and professional discipline.
        </p>
        <p>
          The UK Continental Shelf (UKCS) includes over 300 offshore installations — platforms,
          FPSOs (Floating Production Storage and Offloading vessels), and other facilities. The
          offshore wind sector adds a growing number of offshore substations and wind turbine
          installations. Together, these provide substantial and ongoing demand for competent
          offshore electrical engineers.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory framework</strong> — UK offshore electrical installations are
                governed by the Electricity at Work Regulations 1989 (EWR), the Offshore
                Installations (Prevention of Fire and Explosion, and Emergency Response) Regulations
                1995 (PFEER), and industry standards including IEC 61892 (mobile and fixed offshore
                units) and IP15 (Area Classification Code for Installations Handling Flammable
                Fluids).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duty holder responsibility</strong> — the duty holder (typically the
                operator of the installation) is responsible for ensuring all electrical work is
                carried out by competent persons. Competence for hazardous area work requires CompEx
                certification. All electrical work must be managed through a formal permit to work
                (PTW) system.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'atex-zones',
    heading: 'ATEX/IECEx Zone Classification on Offshore Installations',
    content: (
      <>
        <p>
          ATEX zone classification is fundamental to offshore electrical engineering. The entire
          process deck, wellhead areas, and associated equipment are typically classified as
          hazardous zones. Understanding zone classification is a prerequisite for any electrical
          work on an offshore installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong> — an explosive gas atmosphere is present continuously or for
                long periods. Zone 0 locations on an offshore platform typically include the
                interior of process vessels, storage tanks, and pipework carrying flammable
                hydrocarbons. Electrical equipment in Zone 0 must meet Category 1G certification (Ga
                equipment under EN/IEC 60079). Very little electrical equipment is installed in Zone
                0 areas — instrumentation such as level gauges may be the only exceptions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — an explosive atmosphere is likely to occur in normal
                operation. Zone 1 encompasses the process deck and areas immediately surrounding
                equipment that handles hydrocarbons under pressure — compressor areas, separator
                areas, flare booms, and pump areas. Equipment must be Category 2G (Gb) or better.
                Zone 1 is where the majority of offshore electrical equipment — motors, junction
                boxes, luminaires, instrumentation — is installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — an explosive atmosphere is unlikely to occur in normal
                operation but may occur in abnormal conditions. Zone 2 covers the wider process
                module area, cable deck below the process deck, and other areas adjacent to Zone 1.
                Category 3G (Gc) equipment or better is required. Many offshore platforms classify
                the entire external deck area as Zone 2 as a conservative measure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Area classification drawings</strong> — every offshore installation has area
                classification drawings that define the zone boundaries. These are produced in
                accordance with IP15 / IEC 60079-10-1 and are part of the installation's safety
                case. Electrical engineers must consult area classification drawings before any
                equipment selection or installation work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hazardous-area-equipment',
    heading: 'Hazardous Area Equipment Selection',
    content: (
      <>
        <p>
          Equipment selection for hazardous areas on offshore installations must comply with the
          ATEX Directive (2014/34/EU as retained in UK law) and relevant IEC 60079 series standards.
          The protection concept (Ex type) must be appropriate for the zone and the equipment
          category.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex d (flameproof)</strong> — the equipment enclosure is designed to contain
                an internal explosion and cool the products of combustion before they reach the
                surrounding atmosphere. Used for motors, switchgear, and junction boxes in Zone 1
                and Zone 2. Robust and widely used offshore but heavy and relatively expensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex e (increased safety)</strong> — electrical equipment that does not
                produce sparks or hot surfaces in normal operation is enclosed to a higher standard
                to reduce the risk of ignition. Used for terminal boxes, lighting fittings, and
                motors in Zone 1 and Zone 2. Lighter and less expensive than Ex d.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex ia/ib (intrinsic safety)</strong> — the electrical energy in the circuit
                is limited to levels that cannot ignite the hazardous atmosphere under normal or
                fault conditions. Used for instrumentation and control systems. Ex ia (two fault
                tolerance) is suitable for Zone 0. Critical to understand associated apparatus and
                entity parameters when designing intrinsically safe circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ex n (non-sparking) / Ex ec</strong> — simplified protection for Zone 2
                only. Equipment is designed not to produce sparks, arcs, or hot surfaces capable of
                igniting a Zone 2 atmosphere. Less expensive than Ex d or Ex e and suitable for Zone
                2 luminaires, motors, and control gear.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All Ex equipment must be installed in accordance with the manufacturer's installation
          instructions and the relevant IEC 60079 installation standard (IEC 60079-14). Specific
          requirements for cable gland selection, earth bonding, conduit sealing, and enclosure
          integrity apply.{' '}
          <SEOInternalLink href="/petrochemical-electrical">CompEx certification</SEOInternalLink>{' '}
          is required for electricians installing or maintaining Ex equipment.
        </p>
      </>
    ),
  },
  {
    id: 'essential-services',
    heading: 'Essential Services & Emergency Shutdown (ESD)',
    content: (
      <>
        <p>
          Essential services are those electrical systems that must be maintained under any
          circumstances to protect personnel and the installation. They are the highest priority in
          the offshore electrical hierarchy and their integrity is maintained through design,
          maintenance, and testing regimes.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency Shutdown (ESD) systems</strong> — safety instrumented systems
                (SIS) that automatically shut down production in response to hazardous conditions.
                ESD electrical systems must maintain integrity during and after the emergency event
                they are responding to. Power supply to ESD systems is typically from dedicated
                essential buses with UPS backing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire and gas detection</strong> — fire and gas detection systems, including
                gas detectors, flame detectors, heat and smoke detectors, must remain operational
                during a fire or gas release event — when they are needed most. Power supplies,
                cabling routes, and fire integrity ratings are all critical design considerations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting and PAGA</strong> — escape route lighting, muster station
                lighting, and the Public Address General Alarm (PAGA) system must operate during a
                mains power failure. These systems are powered from the essential electrical
                distribution system and backed by UPS and emergency diesel generation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical distribution hierarchy</strong> — offshore installations
                typically have a tiered electrical distribution architecture: main power generation
                (main gas turbine or diesel generators) → main switchboard → essential switchboard →
                emergency switchboard. Each tier has automatic changeover and the emergency tier is
                backed by a dedicated emergency diesel generator that starts automatically on mains
                failure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ups-systems',
    heading: 'UPS Systems & Battery Systems Offshore',
    content: (
      <>
        <p>
          Uninterruptible Power Supply (UPS) systems on offshore installations are critical
          infrastructure. They bridge the gap between main power loss and emergency generator
          start-up, and provide clean, regulated power to sensitive instrumentation and control
          systems during normal operation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Autonomy requirements</strong> — offshore UPS systems are typically sized to
                provide power for a defined period (autonomy) that allows for safe shutdown of
                systems not backed by the emergency generator. Critical safety systems may require
                up to 30 minutes of UPS autonomy. Battery condition monitoring and regular discharge
                testing are essential maintenance activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VRLA and lithium-ion batteries</strong> — valve-regulated lead-acid (VRLA)
                batteries are the traditional technology for offshore UPS. Lithium-ion systems offer
                weight and space advantages — significant considerations on offshore platforms — but
                require careful thermal management and different maintenance procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance requirements</strong> — offshore UPS maintenance includes
                regular load bank testing (to verify autonomy), battery impedance testing,
                electrolyte checks on flooded batteries, visual inspection, and verification of
                automatic transfer functions. Maintenance is carried out during platform shutdowns
                where possible to avoid disrupting essential services.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'survival-craft',
    heading: 'Survival Craft Electrical Systems',
    content: (
      <>
        <p>
          Survival craft electrical systems — the lifeboats and life rafts that are the last line of
          escape from an offshore installation — must function reliably in the most extreme
          conditions. Electrical maintenance of survival craft is a specialist task governed by
          SOLAS (Safety of Life at Sea) requirements and the craft manufacturer's specifications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Launch and release systems</strong> — the electrical components of the davit
                system and on-load release mechanism must be maintained in perfect working order.
                These include hydrostatic releases, remote release circuits, and davit motor
                controls. Maintenance must be carried out by competent persons in accordance with
                the manufacturer's maintenance schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery maintenance</strong> — survival craft batteries (for engine
                starting, navigation lights, and communications) must be maintained at full charge
                at all times. Battery condition is checked at defined intervals and full load tests
                are conducted periodically. Batteries are replaced on a scheduled basis regardless
                of apparent condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Navigation and communication equipment</strong> — EPIRB (Emergency Position
                Indicating Radio Beacon), SART (Search and Rescue Transponder), VHF radio, and
                navigation lights all have electrical maintenance requirements. Battery replacement
                intervals and test procedures are defined by SOLAS and the equipment manufacturer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'survival-training',
    heading: 'BOSIET, HUET & GWO Offshore Survival Training',
    content: (
      <>
        <p>
          Survival training is mandatory for all personnel travelling to offshore installations. No
          one is permitted to board a helicopter for an offshore installation without a current
          BOSIET (or equivalent) certificate. The training is demanding, physically challenging, and
          genuinely important — helicopter ditching is a real risk in North Sea operations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BOSIET (Basic Offshore Safety Induction and Emergency Training)</strong>—
                typically a three-day OPITO-approved course. Covers platform safety, fire fighting,
                first aid, sea survival, and Helicopter Underwater Escape Training (HUET). Valid for
                four years. Required for all first-time offshore travellers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HUET (Helicopter Underwater Escape Training)</strong> — practical training
                in escaping from a simulated helicopter that has ditched in the sea and inverted.
                Involves multiple practice escapes with and without CSDB (Compressed Air Breathing
                Device) assistance. Physically demanding but essential preparation for offshore
                helicopter travel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RBOSIET (Refresher BOSIET)</strong> — required every four years after the
                initial BOSIET. Covers updates to procedures and refreshes key practical skills.
                Typically one to two days. Some operators require refresher training at three years
                rather than four.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>GWO Basic Safety Training</strong> — the Global Wind Organisation training
                standard for offshore wind, covering First Aid, Fire Awareness, Manual Handling, Sea
                Survival, and Working at Heights. Required for offshore wind turbine work rather
                than oil and gas. Certification is valid for two years.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rotation-pay',
    heading: 'Rotation Patterns & Day Rates (2026)',
    content: (
      <>
        <p>
          Offshore electrical roles typically operate on rotational patterns with defined periods on
          and off the installation. The two-weeks-on/two-weeks-off pattern is the most common in the
          UK North Sea, though other rotations exist depending on the operator and the role.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2/2 rotation</strong> — two weeks offshore (14 days including travel), two
                weeks at home. The most common pattern in the UK North Sea. Working days offshore
                are typically 12 hours. This equates to approximately 182 working days per year
                offshore.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3/3 and 4/4 rotations</strong> — three or four weeks on, three or four weeks
                off. More common on FPSO vessels and in international locations. Less common in the
                UK North Sea for electrical roles but available on some longer-term maintenance
                contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day rates — contractor/self-employed</strong> — £400 to £700 per day for
                experienced offshore electrical engineers and CompEx-certified electricians. Day
                rates are typically paid for all days including leave days, giving an effective
                annual earnings of £73,000 to £128,000 at typical 2/2 rotation rates before tax and
                deductions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employed rates</strong> — offshore electrical engineers in employed
                positions typically earn £55,000 to £85,000 per year plus offshore allowances, shift
                premiums, and benefits. Accommodation, meals, and transport to the installation are
                always provided.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Starting Your Offshore Career',
    content: (
      <>
        <p>
          Moving from onshore electrical work to offshore is a significant career step that requires
          specific qualifications and a realistic understanding of the lifestyle. The financial
          rewards are substantial, but the commitment — away from home for two weeks in every four —
          is also significant.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Your Qualification Roadmap</h4>
                <p className="text-white text-sm leading-relaxed">
                  Start with CompEx certification (ExI units for installation and ExM for
                  maintenance). Book BOSIET training as soon as CompEx is complete. Register with
                  offshore electrical recruitment agencies — Petrofac, Wood, Bilfinger, and other
                  major operators and contractors all use specialist offshore electrical recruiters.
                  Consider your{' '}
                  <SEOInternalLink href="/guides/eicr-certificate">
                    inspection and testing qualifications
                  </SEOInternalLink>{' '}
                  as these are valued for offshore maintenance roles.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Keep Your Certifications Organised</h4>
                <p className="text-white text-sm leading-relaxed">
                  Offshore operators and contractors require evidence of current BOSIET, CompEx,
                  18th Edition, medical fitness, and other certifications before every trip. Use
                  Elec-Mate to keep all your certificates organised, track renewal dates, and ensure
                  you are never caught out by an expired certificate when a job comes up.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your offshore qualifications with Elec-Mate"
          description="Keep your BOSIET, CompEx, 18th Edition, and all offshore certifications organised with renewal reminders. Join 1,000+ UK electricians using Elec-Mate. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OffshoreElectricalPage() {
  return (
    <GuideTemplate
      title="Offshore Electrical Engineer UK | Oil & Gas Platform Electrical"
      description="Complete guide to offshore electrical engineering in the UK — ATEX Zone 0/1/2 classification, Ex equipment selection, essential services, ESD, BOSIET training, GWO certification, 2-week rotation, and day rates of £400–£700."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Sector"
      badgeIcon={Zap}
      heroTitle={
        <>
          Offshore Electrical Engineer UK:{' '}
          <span className="text-yellow-400">Oil & Gas Platform Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about offshore electrical engineering on UK oil and gas platforms — ATEX Zone 0, 1, and 2 classification, hazardous area equipment, essential services, ESD systems, BOSIET survival training, GWO certification, 2-week rotation patterns, and day rates of £400–£700."
      readingTime={17}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Offshore Electrical Engineering"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Offshore Certifications with Elec-Mate"
      ctaSubheading="Keep your BOSIET, CompEx, 18th Edition, medical fitness, and GWO certificates organised with renewal reminders. 7-day free trial, cancel anytime."
    />
  );
}
