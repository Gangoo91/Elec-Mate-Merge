import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  ClipboardCheck,
  Zap,
  FileCheck2,
  Building2,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Specialist Sectors', href: '/specialist-electrical-sectors' },
  { label: 'Cleanroom Electrical Installation', href: '/cleanroom-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Cleanroom Electrical Overview' },
  { id: 'iso-14644', label: 'ISO 14644 Classifications' },
  { id: 'particle-minimisation', label: 'Minimising Particle Generation' },
  { id: 'flush-mounted-fittings', label: 'Flush-Mounted Fittings' },
  { id: 'sealed-cable-entries', label: 'Sealed Cable Entries' },
  { id: 'hepa-electrical', label: 'HEPA Filtration Electrical Controls' },
  { id: 'ahu-electrical', label: 'Air Handling Unit Electrical' },
  { id: 'pressure-monitoring', label: 'Positive Pressure Monitoring' },
  { id: 'ups-critical', label: 'UPS for Critical Environments' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'ISO 14644-1 defines cleanroom classifications from ISO 1 (most stringent) to ISO 9. The electrical installation must be designed, installed, and maintained without compromising the cleanroom\'s ability to achieve and maintain its defined classification.',
  'Every component of the electrical installation in a cleanroom — cables, fittings, enclosures, conduit terminations, trunking — is a potential particle source. Minimising the number of components, using sealed systems, and selecting non-particle-shedding materials is fundamental to cleanroom electrical design.',
  'All electrical accessories in a cleanroom must be flush-mounted with sealed perimeters. Surface-mounted boxes create ledges that accumulate particles, disturb laminar airflow, and are difficult to clean effectively. Even small protruding features can disrupt cleanroom airflow patterns.',
  'Sealed cable entries through cleanroom walls, floors, and ceilings are critical to maintaining the room\'s pressure differential, preventing particle bypass, and preserving the thermal and acoustic separation between cleanroom and non-cleanroom spaces.',
  'UPS systems are essential in critical cleanroom environments — a mains power interruption that stops HVAC fans and HEPA filtration will cause rapid degradation of the cleanroom classification and may require a full recovery and re-certification process.',
  'Positive pressure monitoring is a GMP-critical or quality-critical function in pharmaceutical, semiconductor, and precision manufacturing cleanrooms. Electrical systems supporting pressure monitoring must be highly reliable, calibrated, and their data must be available to the building management system.',
];

const faqs = [
  {
    question: 'What are the ISO 14644 cleanroom classifications?',
    answer:
      'ISO 14644-1:2015 defines cleanroom classifications by maximum airborne particle concentrations. The relevant classifications for most industrial cleanrooms range from ISO 5 to ISO 8. At 0.5 micron particle size: ISO 5 allows 3,520 particles per cubic metre (equivalent to old Federal Standard 209E Class 100); ISO 6 allows 35,200 (Class 1,000); ISO 7 allows 352,000 (Class 10,000); ISO 8 allows 3,520,000 (Class 100,000). ISO 9 is considered a clean room (rather than a cleanroom) and is equivalent to a clean office environment. Semiconductor manufacturing may require ISO 4 or even ISO 3 for the most sensitive processes. The classification drives everything from HVAC design and garment requirements to the electrical installation specification.',
  },
  {
    question: 'Why must electrical fittings in cleanrooms be flush-mounted?',
    answer:
      'Surface-mounted electrical accessories in cleanrooms create problems in three areas. First, they create horizontal ledges and recesses that accumulate particles, viable organisms, and cleaning agent residues — and are difficult to clean effectively. Second, protruding boxes and fittings disturb laminar (unidirectional) airflow patterns in ISO 5 cleanrooms, creating turbulent zones where particles can accumulate around the work zone rather than being swept downward by the laminar flow. Third, they create voids between the mounting surface and the fitting back that are inaccessible for cleaning and may harbour microbial growth. Flush-mounted fittings eliminate all three problems — they are flush with the wall surface, leave no ledges or recesses, and can be wiped down completely with cleaning and disinfection agents.',
  },
  {
    question: 'What materials are suitable for electrical installations in cleanrooms?',
    answer:
      'Material selection for cleanroom electrical installations must account for particle generation, chemical resistance to cleaning agents, and compatibility with the cleanroom environment. Stainless steel (304 or 316 grade) is preferred for enclosures, cable management, and fittings in pharmaceutical and food cleanrooms. Anodised aluminium is used in semiconductor cleanrooms where static control is also important. PVC and standard plastics may be acceptable in lower classification cleanrooms but may not be compatible with all disinfection regimes. Cables must have smooth, non-particle-shedding outer sheaths. Standard armoured cables (SWA) with exposed metal wires are unsuitable in cleanrooms — smooth-sheathed cables in conduit or trunking are preferred. All materials must be tested or verified for compatibility with the cleaning agents used on site.',
  },
  {
    question: 'How does a UPS system protect cleanroom classification?',
    answer:
      'A cleanroom\'s classification depends entirely on the continuous operation of the HVAC and HEPA filtration systems. If mains power is lost and HVAC fans stop, particle levels in the cleanroom rise rapidly — within minutes for ISO 5 and ISO 6 rooms, within tens of minutes for ISO 7 and ISO 8. Once the classification is lost, a full recovery process is required before production can resume, which may include operational testing and re-certification. A UPS system bridges the period between mains power loss and emergency generator start-up (typically 10 to 30 seconds), maintaining HVAC fan operation throughout. For critical cleanrooms, UPS autonomy should be sized to cover the emergency generator start-up time plus an appropriate safety margin.',
  },
  {
    question: 'What is positive pressure monitoring and why is it electrically critical?',
    answer:
      'Cleanrooms are maintained at positive pressure relative to adjacent non-cleanroom areas — typically 10 to 15 Pascal above ambient. This positive pressure prevents unfiltered air from entering the cleanroom through gaps in the envelope. Positive pressure monitoring systems use pressure transducers connected to the Building Management System (BMS) to continuously monitor the differential pressure. Loss of positive pressure (indicating a leak, HVAC failure, or door left open) triggers an alarm so that corrective action can be taken. For pharmaceutical cleanrooms, pressure differential data is GMP-critical — it must be continuously recorded, alarmed, and available for regulatory inspection. The electrical systems supporting pressure monitoring — power supplies, signal cables, BMS infrastructure — must be highly reliable and their calibration records maintained.',
  },
  {
    question: 'What training and qualifications do electricians need for cleanroom work?',
    answer:
      'There is no single mandatory qualification for cleanroom electrical work, but a combination of knowledge and experience is required. Understanding of ISO 14644 cleanroom classifications and their implications for electrical installation is essential. Knowledge of GMP requirements for pharmaceutical cleanrooms (or equivalent quality standards for semiconductor and medical device cleanrooms) is important for documentation and change control. Experience with validation processes (IQ/OQ/PQ) is valued for new facility projects. For pharmaceutical cleanrooms, familiarity with the documentation and change control requirements of GMP is as important as the technical electrical skills. Electricians working in cleanrooms must comply with cleanroom gowning and behaviour protocols, which require specific training before entry.',
  },
  {
    question: 'What are the differences between pharmaceutical and semiconductor cleanroom electrical requirements?',
    answer:
      'Pharmaceutical cleanrooms (governed by GMP and ISO 14644) are primarily concerned with viable particle contamination — bacteria and other microorganisms — as well as non-viable particles. Stainless steel, rounded corners, seamless surfaces, and compatibility with disinfection agents are priorities. Semiconductor cleanrooms (governed by ISO 14644 and process-specific requirements) are primarily concerned with non-viable particles (including ESD-generated particles and metallic ions) and static electricity. Anti-static materials, ESD-safe tools and equipment, grounding systems, and ionisation are priorities. Semiconductor cleanrooms may also have stricter requirements for vibration (which can affect lithography processes) and for chemical compatibility (aggressive solvents and acids are common in semiconductor processing).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/pharmaceutical-electrical',
    title: 'Pharmaceutical Electrical Installation',
    description: 'GMP cleanroom wiring, IQ/OQ/PQ validation, isolation transformers, and FDA 21 CFR compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/food-processing-electrical',
    title: 'Food Processing Electrical Installation',
    description: 'IP69K wash-down, ATEX dust zones, hygienic design, and BRC Global Standards compliance.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/nuclear-site-electrical',
    title: 'Nuclear Site Electrical Engineering',
    description: 'Nuclear Baseline QA, BPSS/SC clearance, ECS nuclear card, and pay rates £60–£100+/hr.',
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
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description: 'Full guide to the Wiring Regulations — amendments, key changes, and compliance.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Cleanroom Electrical Installation',
    content: (
      <>
        <p>
          Cleanroom electrical installation is a specialist area that demands a fundamentally
          different approach to standard electrical work. Every decision — from cable type and
          conduit selection to accessory mounting and sealing method — must be made with the
          cleanroom's particle control requirements as the primary consideration.
        </p>
        <p>
          Cleanrooms are used across a wide range of industries in the UK: pharmaceutical
          manufacturing and sterile filling, semiconductor fabrication, medical device
          manufacturing, aerospace component assembly, precision optics, and biotechnology
          research. The classification level and specific requirements differ between sectors,
          but the fundamental principles of cleanroom electrical installation are consistent.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why cleanrooms need specialist electrical design</strong> — standard
                electrical installation practices that are perfectly acceptable in commercial
                or industrial environments — surface-mounted boxes, open cable tray, exposed
                conduit threads — are incompatible with cleanroom requirements. They generate
                particles, create surfaces that cannot be cleaned, and may disrupt critical
                airflow patterns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Collaboration with HVAC and process engineers</strong> — cleanroom
                electrical installation cannot be designed in isolation. The electrical
                installation must be coordinated with the HVAC system (which drives the
                cleanroom classification), the process equipment (which has specific power
                and control requirements), and the building structure (which defines where
                cables can run without compromising the cleanroom envelope).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'iso-14644',
    heading: 'ISO 14644 Cleanroom Classifications',
    content: (
      <>
        <p>
          ISO 14644-1:2015 is the international standard that defines cleanroom classifications.
          The classification of each area in a facility determines the specification of the
          electrical installation — from the complexity of the sealing regime to the materials
          permitted for cable management.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 5 (3,520 particles/m³ at ≥0.5µm)</strong> — the most demanding
                classification for most industrial applications. Used for pharmaceutical
                aseptic filling (Grade A), semiconductor critical areas, and precision optics
                assembly. Unidirectional (laminar) airflow is essential. The electrical
                installation must be minimal, completely flush, and must not disturb the
                laminar flow. Every penetration must be sealed. Materials must not shed
                particles or be attacked by disinfectants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 6 and ISO 7 (35,200 to 352,000 particles/m³)</strong> — used
                for pharmaceutical background environments (Grade B/C), medical device
                assembly, and many electronics manufacturing applications. Turbulent
                (non-unidirectional) airflow is typically used. Flush mounting and sealed
                penetrations remain essential. Slightly more latitude in material selection
                than ISO 5.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ISO 8 (≤3,520,000 particles/m³)</strong> — used for general
                pharmaceutical manufacturing (Grade D), medical device assembly secondary
                areas, and clean manufacturing generally. Requirements are significantly
                less stringent than ISO 5–7 but still require a controlled approach to
                electrical installation — cleanable surfaces, no horizontal ledges, sealed
                penetrations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>At-rest vs occupied classification</strong> — ISO 14644-1 distinguishes
                between the as-built, at-rest (equipment running, no personnel), and occupied
                (personnel present) states. The classification is typically specified in the
                at-rest or occupied state. Personnel are a major source of particles — the
                electrical installation must be designed to support the room achieving its
                classification with the design occupancy.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'particle-minimisation',
    heading: 'Minimising Particle Generation in Cleanroom Electrical Installations',
    content: (
      <>
        <p>
          The cleanroom electrical installation is itself a particle source — cables shed particles
          as they flex, conduit joints generate debris, and cable tray accumulates contamination
          over time. Designing the electrical installation to minimise particle generation is
          fundamental to cleanroom electrical practice.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimise the electrical installation footprint</strong> — every
                additional component inside the cleanroom is a potential particle source.
                Locate distribution boards, MCCs, and main panels outside the cleanroom
                envelope wherever possible. Run cables through the cleanroom wall in sealed
                conduits rather than routing distribution panels inside the room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sealed conduit systems</strong> — sealed conduit systems are preferred
                in high-classification cleanrooms because they completely enclose the cables
                and prevent particle generation from cable movement. All joints must be sealed.
                The conduit system must be self-draining or provided with drain points to
                prevent liquid accumulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable selection</strong> — cables with smooth, low-particle-generation
                sheaths are specified for cleanroom use. Some cleanroom-specific cable
                products are available with anti-static or ESD-dissipative sheaths for
                semiconductor applications. All cables should be wiped down with cleanroom-
                compatible wipes before installation to remove manufacturing debris.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoidance of particle-generating fasteners</strong> — self-tapping
                screws, open bolts, and standard cable ties shed particles from their threads,
                cutting edges, and cut ends. Cleanroom-grade cable ties with no cut tail
                requirement, smooth-head bolts and screws, and captive fasteners minimise
                fastener-related particle generation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flush-mounted-fittings',
    heading: 'Flush-Mounted Electrical Fittings',
    content: (
      <>
        <p>
          Flush mounting is not simply an aesthetic preference in cleanrooms — it is a functional
          requirement driven by cleanability, airflow management, and contamination control.
          Every electrical accessory in a cleanroom must be evaluated for its mounting method
          and its impact on cleanroom performance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wall-mounted socket outlets and switches</strong> — must be set flush
                in the cleanroom wall with a continuous, gapless seal between the fitting
                plate and the wall surface. The seal must be compatible with cleaning and
                disinfection agents. Any gap between the fitting and the wall is a particle
                trap and a potential harborage for microbial growth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling-mounted luminaires</strong> — cleanroom luminaires must be
                flush-mounted in the ceiling with sealed edges. Recessed luminaires are
                preferred — they sit within the ceiling structure with a flush, sealed
                frame. Luminaires must not allow air to bypass HEPA filtration by leaking
                around the fitting. In ISO 5 cleanrooms, luminaires are often integrated
                into the ceiling panel system with sealed frames.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Control panels and HMIs</strong> — control panels within cleanrooms
                must be flush-mounted where possible, or be hygienic in design (smooth,
                sloped tops, no horizontal ledges, fully sealed). HMI (Human Machine
                Interface) screens should be panel-mounted with sealed bezels. Keyboards,
                if used, should be sealed membrane types compatible with cleanroom
                cleaning and disinfection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass-through panel sealing</strong> — where panels pass through the
                cleanroom wall (for cable entry or control wiring), the junction between
                the panel frame and the wall must be continuously sealed to maintain the
                cleanroom envelope and pressure differential.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sealed-cable-entries',
    heading: 'Sealed Cable Entries Through Cleanroom Envelopes',
    content: (
      <>
        <p>
          Every cable that enters the cleanroom through a wall, floor, or ceiling penetration
          represents a potential breach of the cleanroom envelope. Unsealed penetrations allow
          the positive pressure differential to drive cleanroom air outward (acceptable) but also
          allow particles from outside to bypass HEPA filtration if the pressure differential
          is lost — which is exactly when contamination control is most critical.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sealed cable glands</strong> — all cable entries through cleanroom
                walls must use cleanroom-compatible sealed glands. The gland must seal
                against both the cable sheath and the wall/conduit penetration. Silicone
                sealant is commonly used to seal the interface between gland and wall.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conduit with sealed ends</strong> — where conduit passes through
                the cleanroom wall, both ends must be sealed after cables are installed.
                Proprietary conduit sealing systems (foam putty, gel seals, or modular
                frame seals) are available that maintain the seal after cable installation
                and can be reopened for future cable additions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire stopping</strong> — all penetrations through the cleanroom
                envelope must also be fire-stopped to maintain the fire compartmentation
                of the building. Cleanroom walls are typically fire-rated — penetrations
                must be sealed with intumescent or equivalent fire-stopping products that
                maintain the fire rating. The fire-stop must also maintain the cleanroom
                seal — some combined products are available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — every penetration through the cleanroom
                envelope should be documented as part of the as-built record. Undocumented
                penetrations are a finding in pharmaceutical GMP audits and quality system
                reviews. Photographic records of the sealing condition at handover are
                good practice.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hepa-electrical',
    heading: 'HEPA Filtration Electrical Controls',
    content: (
      <>
        <p>
          HEPA (High Efficiency Particulate Air) filtration is the defining technology of
          cleanroom air quality control. The electrical systems that support HEPA filtration —
          fan motors, variable speed drives, filter differential pressure monitoring — are
          critical infrastructure whose failure directly impacts cleanroom classification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Filter differential pressure monitoring</strong> — the pressure drop
                across each HEPA filter bank is monitored to detect filter loading. A rising
                differential pressure indicates filter loading and triggers an alert for
                maintenance. Differential pressure transmitters are connected to the BMS.
                Monitoring signals are GMP-critical in pharmaceutical cleanrooms and must
                be calibrated at defined intervals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fan motor controls</strong> — cleanroom fans are typically controlled
                by variable speed drives (VSDs) to maintain constant airflow as filters load.
                VSDs must be located outside the cleanroom (EMI and heat generation from VSDs
                are incompatible with cleanroom requirements). VSD output cables must be
                screened to minimise EMI.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fan failure alarms</strong> — failure of a cleanroom fan must trigger
                an immediate alarm. In pharmaceutical cleanrooms, fan failure alarms are
                GMP-critical — a defined response procedure must be in place. The BMS must
                detect fan failure within seconds of the event.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ahu-electrical',
    heading: 'Air Handling Unit Electrical Systems',
    content: (
      <>
        <p>
          Air handling units (AHUs) serving cleanrooms are substantial items of plant that
          require significant electrical supplies. AHU electrical installation involves motor
          supplies, control panels, VSD installation, heating and cooling electrical connections,
          and instrumentation wiring.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor control centres</strong> — AHU motor control centres (MCCs)
                must be located outside the cleanroom envelope, in dedicated plant rooms
                or service corridors. The MCC room environment must be controlled to avoid
                excessive heat, humidity, or contamination that could affect MCC reliability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating and cooling coil connections</strong> — AHUs serving cleanrooms
                include pre-heat coils, cooling coils (with electric chilled water or DX
                refrigeration), and sometimes electric re-heat coils. All electrical
                connections to these services must be rated for the operating conditions
                (high humidity in the airstream, exposure to condensation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Redundancy</strong> — critical cleanrooms (ISO 5 and ISO 6) often
                have redundant AHUs or fans with automatic changeover to minimise the
                risk of cleanroom classification loss from a single equipment failure. The
                electrical installation must support the automatic changeover function,
                including interlocks that prevent both fans running simultaneously (unless
                designed for concurrent operation).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pressure-monitoring',
    heading: 'Positive Pressure Monitoring Systems',
    content: (
      <>
        <p>
          Maintaining positive pressure in cleanrooms relative to adjacent non-cleanroom spaces
          is essential to preventing contamination ingress. The electrical systems that support
          pressure monitoring are therefore critical to cleanroom performance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pressure transducer installation</strong> — pressure transducers
                must be located where they accurately reflect the pressure differential
                between the cleanroom and the adjacent space. Transducers must not be
                located near air supply diffusers or extract grilles where local pressure
                variations would give misleading readings. Signal cables must be screened
                to prevent EMI from VSD drives affecting the measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BMS integration</strong> — pressure monitoring data is integrated
                into the Building Management System (BMS) for trending, alarm management,
                and reporting. The BMS connection must be reliable — loss of pressure
                monitoring data is itself an alarm condition in GMP environments. Redundant
                BMS communication paths are used in critical pharmaceutical cleanrooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibration and maintenance</strong> — pressure transducers must be
                calibrated at defined intervals (typically annually for GMP applications).
                Calibration records must be maintained and available for regulatory inspection.
                The calibration uncertainty must be appropriate for the measurement range
                (typically ±1 Pa for cleanroom differential pressures of 10–15 Pa).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ups-critical',
    heading: 'UPS Systems for Critical Cleanroom Environments',
    content: (
      <>
        <p>
          An uninterruptible power supply is not optional in critical cleanrooms — it is an
          essential part of the infrastructure that protects the cleanroom classification and
          the processes it supports from the consequences of mains power interruption.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Essential loads</strong> — the UPS must cover all loads whose
                failure during a mains interruption would cause cleanroom classification
                loss or process failure: HVAC fan motors, HEPA filter fans, pressure
                monitoring systems, environmental monitoring systems, BMS, and process
                equipment in critical operational states.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Autonomy sizing</strong> — UPS autonomy must cover the time for
                an emergency generator to start and take load (typically 10–30 seconds
                for automatic start) plus an appropriate safety margin. For cleanrooms
                without emergency generation, UPS autonomy must cover the time required
                for safe shutdown of critical processes — which may be 30 minutes or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Static transfer switch</strong> — modern online double-conversion
                UPS systems provide seamless (zero break time) changeover between mains
                and battery supply. This is essential for sensitive process equipment
                that cannot tolerate any supply interruption. Older offline UPS systems
                with transfer times of 5–20ms are not suitable for the most sensitive loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery maintenance and testing</strong> — UPS batteries must be
                tested at defined intervals to verify that the required autonomy is still
                available. Battery capacity decreases over time, particularly in warm
                environments. In GMP cleanrooms, UPS battery test records form part of
                the maintenance documentation available for MHRA inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in Cleanrooms',
    content: (
      <>
        <p>
          Cleanroom electrical work requires technical competence, attention to detail, and
          strict compliance with cleanroom protocols. The financial rewards reflect the specialist
          nature of the work and the consequences of getting it wrong.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cleanroom Protocols Are Not Optional</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before entering a cleanroom, you must complete site-specific gowning training
                  and demonstrate compliance with cleanroom behaviour rules — no cosmetics or
                  perfume, no particle-shedding clothing under gowns, slow deliberate movements,
                  no eating or drinking, strict tool and material control. Violations result in
                  immediate removal from the cleanroom and potential site ban. The cleanroom
                  operator's rules exist to protect their product and must be respected without
                  exception.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Everything for Qualification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cleanroom electrical installations are subject to formal qualification (IQ/OQ/PQ).
                  Every aspect of the installation must be documented, tested, and formally recorded.
                  Use{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate
                  </SEOInternalLink>{' '}
                  to produce professional test records and inspection reports that support IQ
                  protocol completion and give quality departments the documentation they need
                  for regulatory compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Produce qualification-ready electrical records with Elec-Mate"
          description="Create professional test records and inspection reports that support cleanroom IQ/OQ/PQ qualification. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CleanroomElectricalPage() {
  return (
    <GuideTemplate
      title="Cleanroom Electrical Installation UK | ISO Cleanroom Wiring Guide"
      description="Complete guide to cleanroom electrical installation in the UK — ISO 14644 classifications (ISO 5-8), minimising particle generation, flush-mounted fittings, sealed cable entries, HEPA filtration electrical controls, positive pressure monitoring, and UPS for critical environments."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Specialist Sector"
      badgeIcon={Building2}
      heroTitle={
        <>
          Cleanroom Electrical Installation UK:{' '}
          <span className="text-yellow-400">ISO Cleanroom Wiring Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about cleanroom electrical installation — ISO 14644 classifications (ISO 5 to ISO 8), minimising particle generation, flush-mounted fittings, sealed cable entries, HEPA filtration electrical controls, air handling unit electrical systems, positive pressure monitoring, and UPS for critical environments."
      readingTime={19}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cleanroom Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Produce Qualification-Ready Electrical Records with Elec-Mate"
      ctaSubheading="Create professional test records and inspection reports that support cleanroom IQ/OQ/PQ qualification processes. 7-day free trial, cancel anytime."
    />
  );
}
