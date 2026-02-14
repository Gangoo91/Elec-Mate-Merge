import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  Home,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  Calculator,
  CircuitBoard,
  Car,
  Flame,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'New Build', href: '/guides/new-build-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'New Build Electrical Overview' },
  { id: 'building-regulations', label: 'Building Regulations' },
  { id: 'part-p', label: 'Part P Compliance' },
  { id: 'sap-calculations', label: 'SAP Calculations and Energy' },
  { id: 'ev-charging', label: 'EV Charging Requirements 2022' },
  { id: 'smoke-heat-detectors', label: 'Smoke and Heat Detectors' },
  { id: 'afdd-spd', label: 'AFDD and SPD Requirements' },
  { id: 'design-considerations', label: 'Design Considerations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'New build electrical installations must comply with BS 7671, Building Regulations Part P (electrical safety), Part L (energy efficiency), Part B (fire safety), and Part M (accessibility).',
  'Since June 2022, the Infrastructure for Electric Vehicles Regulations require every new build with associated parking to have at least one EV charge point — not just a cable route, but a fully installed and functional charge point.',
  'Smoke and heat detectors must comply with Building Regulations Approved Document B — interlinked, mains-powered with battery backup, on a dedicated circuit, with detectors in every habitable room in new builds from 2022.',
  'SPDs (Surge Protection Devices) are effectively mandatory in new builds under BS 7671 Regulation 443.4 — the consequences of overvoltage in a modern home with smart systems and expensive electronics easily meet the "risk of serious injury or significant financial loss" threshold.',
  "Elec-Mate's AI circuit designer creates complete circuit schedules, cable sizing, and board layouts for new build projects — enter the property type and it designs the full installation.",
];

const faqs = [
  {
    question: 'What Building Regulations apply to new build electrical installations?',
    answer:
      'Several parts of the Building Regulations apply to new build electrical installations. Part P (Electrical Safety) requires all electrical work in dwellings to comply with BS 7671 and to be carried out by a competent person or notified to Building Control. Part L (Conservation of Fuel and Power) affects lighting design — new builds must meet minimum energy efficiency targets, which means LED lighting and compliance with SAP calculations. Part B (Fire Safety) specifies requirements for smoke and heat detection, fire alarm systems, and fire-rated cabling. Part M (Access to and Use of Buildings) sets minimum heights for sockets (450mm) and switches (1200mm) and requires certain provisions for accessibility. Part S (Infrastructure for Electric Vehicles) was introduced in 2022 and requires EV charge point installation in new builds with associated parking. All of these requirements must be coordinated in the electrical design.',
  },
  {
    question: 'Do I need to install a full EV charge point or just a cable route?',
    answer:
      'Under the Infrastructure for Electric Vehicles (Charge Points) Regulations 2022 (commonly called Part S), every new residential building with associated parking must have at least one EV charge point installed and operational — not just a cable route or ducting. The charge point must be at least 7kW (Mode 3) and comply with BS 7671, IET Code of Practice for Electric Vehicle Charging, and the charge point must be smart (capable of responding to demand management signals). For new non-residential buildings with more than 10 parking spaces, at least one charge point must be installed and cable routes provided to 20% of the remaining spaces. The regulations came into force on 15 June 2022 and apply to all new builds where a building notice or full plans application is submitted on or after that date.',
  },
  {
    question: 'Are AFDDs mandatory in new builds?',
    answer:
      'AFDDs (Arc Fault Detection Devices) are recommended but not strictly mandatory under BS 7671:2018+A2:2022. Regulation 421.1.7 recommends AFDDs for circuits in single-occupancy dwellings, locations with sleeping accommodation, locations with risks due to the nature of processed or stored materials, locations with combustible constructional materials (such as timber-framed buildings), and fire-propagating structures. The key word is "recommended" rather than "required" — this makes AFDDs a strong recommendation rather than a mandatory requirement in BS 7671 itself. However, some competent person scheme providers (such as NICEIC) have indicated that they expect AFDDs to be fitted in new build installations, particularly in timber-framed properties, HMOs, and properties with sleeping accommodation above shops. The industry expectation is that AFDDs will become mandatory in a future amendment to BS 7671, so fitting them now in new builds is considered best practice.',
  },
  {
    question: 'What smoke and heat detectors are required in a new build?',
    answer:
      'Building Regulations Approved Document B (Fire Safety) specifies the minimum requirements for smoke and heat detection in new dwellings. For new builds, the requirement is a Grade D1, LD2 system as a minimum — meaning mains-powered detectors with integral battery backup (Grade D1) providing coverage in circulation spaces, the principal habitable room, and the kitchen (LD2). In practice, from 2022 amendments, new builds require interlinked smoke alarms in every circulation space on each storey, a heat alarm in every kitchen, and smoke alarms in every habitable room (living rooms, bedrooms, dining rooms). All detectors must be interlinked so that activation of one triggers all others. The interconnection can be hardwired (requiring an interconnect cable run at first fix) or wireless (radio-frequency interlink). The detectors must be on a dedicated circuit from the consumer unit, protected by a 6A MCB (or RCBO).',
  },
  {
    question: 'What is SAP and how does it affect electrical design?',
    answer:
      'SAP (Standard Assessment Procedure) is the UK Government methodology for assessing the energy performance of dwellings. Every new build must achieve a minimum SAP rating to comply with Building Regulations Part L (Conservation of Fuel and Power). The electrical design affects SAP through lighting — SAP calculates the proportion of fixed lighting outlets fitted with efficacious lamps (LED or CFL). At least 75% of the fixed lighting outlets in a new build should have efficacious lamps to achieve a reasonable SAP score. In practice, most new builds now specify 100% LED lighting. The SAP calculation also considers electric heating systems, hot water heating, and any renewable energy generation (such as solar PV). Electricians working on new builds should be aware that the lighting specification is not just about the customer preference — it must also meet the SAP targets agreed with Building Control.',
  },
  {
    question: 'Who certifies a new build electrical installation?',
    answer:
      'A new build electrical installation requires an Electrical Installation Certificate (EIC) issued by a competent person. The EIC must cover the entire installation — every circuit from the meter to the final accessory. The designer, installer, and inspector sign the EIC confirming compliance with BS 7671. If the electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent), they can self-certify the work and notify Building Control through the scheme. A Building Regulations Compliance Certificate is then issued to the builder or developer. If the electrician is not registered with a competent person scheme, the work must be notified to Building Control before it starts, and Building Control will arrange inspections at first fix and completion stages. Elec-Mate lets you complete the full EIC on your phone, including the schedule of test results and schedule of items inspected, and send it to the builder as a professional PDF on the day of completion.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Design complete new build electrical installations with AI-assisted circuit allocation, cable sizing, and board schedules.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for new builds on your phone with voice test entry and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/first-fix-electrical',
    title: 'First Fix Electrical',
    description:
      'Guide to cable routing, back boxes, containment, and safe zones for the first fix stage of a new build.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation',
    description:
      'Complete guide to EV charge point installation including Part S requirements, cable sizing, and certification.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size every cable in the new build correctly with all BS 7671 correction factors applied automatically.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Detailed guide to Part P notification, competent person schemes, and Building Control inspections.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'New Build Electrical Installation: What Is Involved?',
    content: (
      <>
        <p>
          A new build electrical installation is one of the most technically demanding projects an
          electrician can take on. It requires the design, installation, testing, and certification
          of a complete electrical system from scratch — from the DNO supply point to every switch,
          socket, light, and fixed appliance in the property.
        </p>
        <p>
          Unlike an alteration or addition to an existing installation, a new build has no existing
          infrastructure. Every aspect must be designed, specified, and installed: the consumer unit
          (or distribution boards for larger properties), all circuits, cable routes,{' '}
          <SEOInternalLink href="/guides/first-fix-electrical">
            first fix containment
          </SEOInternalLink>
          , accessories, smoke and heat detection, EV charging infrastructure, lighting controls,
          and any specialist systems required by the building specification.
        </p>
        <p>
          The electrical design for a new build must satisfy multiple regulatory requirements
          simultaneously — BS 7671, Building Regulations Parts P, L, B, M, and S, the DNO connection
          requirements, and the building specification agreed with the client or developer. Getting
          the design right before starting saves time, reduces rework, and ensures the installation
          passes inspection first time.
        </p>
      </>
    ),
  },
  {
    id: 'building-regulations',
    heading: 'Building Regulations That Affect New Build Electrical Work',
    content: (
      <>
        <p>
          Several parts of the Building Regulations directly affect the electrical design and
          installation in a new build:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P (Electrical Safety)</strong> — all electrical work in dwellings must
                comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
                and be carried out by a competent person or notified to Building Control. A new
                build is fully notifiable work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part L (Energy Efficiency)</strong> — requires minimum energy efficiency for
                lighting (at least 75% efficacious lamps), affects SAP calculations, and influences
                the specification of heating and hot water systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part B (Fire Safety)</strong> — specifies smoke and heat detection
                requirements, fire alarm systems, emergency lighting in some dwellings, and
                fire-resistant cable specifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part M (Accessibility)</strong> — sets minimum socket heights (450mm),
                maximum switch heights (1200mm), and requires accessible provisions for disabled
                occupants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part S (EV Charging)</strong> — from June 2022, requires at least one
                functional EV charge point in every new build with associated parking.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrician must coordinate with the developer, architect, and Building Control
          officer to ensure all requirements are met. Missing a regulatory requirement is discovered
          at completion inspection and means rework before the completion certificate can be issued.
        </p>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Compliance for New Builds',
    content: (
      <>
        <p>
          A new build electrical installation is fully notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>
          . This means the work must either be carried out and self-certified by a registered
          competent person, or notified to Building Control before work starts.
        </p>
        <p>
          For electricians registered with NICEIC, NAPIT, ELECSA, or another competent person
          scheme, the process is straightforward: complete the installation, carry out initial
          verification testing, issue the{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>, and notify Building
          Control through your scheme. The scheme provider issues a Building Regulations Compliance
          Certificate to the developer.
        </p>
        <p>
          For unregistered electricians, Building Control must be notified before work starts. They
          will inspect at key stages — typically first fix (before plastering) and completion.
          Building Control charges a fee for each inspection. In practice, most developers require
          their electrical contractors to be registered with a competent person scheme to avoid the
          delays and costs of Building Control inspections.
        </p>
      </>
    ),
  },
  {
    id: 'sap-calculations',
    heading: 'SAP Calculations and Energy-Efficient Lighting',
    content: (
      <>
        <p>
          SAP (Standard Assessment Procedure) is the UK Government methodology for assessing the
          energy performance of new dwellings. Every new build must achieve a minimum SAP rating to
          comply with Building Regulations Part L. The electrical installation directly contributes
          to the SAP score through the lighting specification.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Lighting Requirements for SAP Compliance</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                At least 75% of fixed lighting outlets must use efficacious lamps (LED or CFL with
                efficacy of 45 lumens per watt or better).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                In practice, most new builds now specify 100% LED lighting to maximise the SAP score
                and meet customer expectations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                External lighting (porch, security, garden) should also be LED and ideally
                controlled by daylight sensors or PIR detectors to minimise energy waste.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Low-energy lighting reduces heat gain, which affects the SAP heating calculation —
                another reason to use LED throughout.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The SAP assessor produces a report that the developer submits to Building Control. The
          electrician's contribution is to confirm the lighting specification — total number of
          fixed lighting outlets, how many are fitted with efficacious lamps, and the wattage of
          each fitting. This information should be recorded and provided to the SAP assessor.
        </p>
      </>
    ),
  },
  {
    id: 'ev-charging',
    heading: 'EV Charging Requirements: The 2022 Regulations',
    content: (
      <>
        <p>
          The Infrastructure for Electric Vehicles (Charge Points) Regulations 2022 came into force
          on 15 June 2022. They require every new residential building with associated parking to
          have at least one EV charge point installed and operational before the building is
          occupied.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum specification</strong> — the charge point must be at least 7kW (Mode
                3, Type 2 connector), untethered (socket type), and smart (capable of receiving and
                responding to signals to manage demand).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — a 7kW single phase charge point draws approximately
                32A. The circuit typically requires a 6.0mm2 or 10.0mm2 cable (depending on cable
                length and correction factors) protected by a 32A or 40A RCBO. Use Elec-Mate's{' '}
                <SEOInternalLink href="/guides/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to verify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — the EV charger circuit requires 30mA RCD
                protection. For some chargers with DC fault detection built in, a Type A RCD is
                sufficient. Others require a Type B RCD or Type A with DC 6mA detection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — the charge point must be accessible to the parking
                space, weatherproof (IP rated for outdoor use), and positioned so that the charging
                cable does not create a trip hazard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For new build developments with multiple dwellings, every dwelling with a parking space
          must have a charge point. Dwellings without associated parking are exempt. The developer
          is responsible for ensuring compliance, and the electrician must issue an{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV charger installation certificate
          </SEOInternalLink>{' '}
          for each charge point installed.
        </p>
        <SEOAppBridge
          title="Size EV charger circuits instantly"
          description="Elec-Mate's cable sizing calculator includes specific EV charger circuit templates. Enter the charger rating, cable length, and installation method — get the correct cable size and protective device with voltage drop verification."
          icon={Car}
        />
      </>
    ),
  },
  {
    id: 'smoke-heat-detectors',
    heading: 'Smoke and Heat Detectors in New Builds',
    content: (
      <>
        <p>
          Building Regulations Approved Document B (Fire Safety) specifies the fire detection
          requirements for new dwellings. The minimum requirement has been significantly enhanced in
          recent years — new builds now require more comprehensive detector coverage than existing
          properties.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">New Build Detector Requirements</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarms</strong> — in every circulation space (hallways, landings,
                stairwells) on every storey, and in every habitable room (bedrooms, living rooms,
                dining rooms).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat alarms</strong> — in every kitchen. Heat alarms are used instead of
                smoke alarms in kitchens to avoid false alarms from cooking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D1</strong> — mains-powered with integral rechargeable battery backup.
                The detectors must continue to function during a power cut.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinked</strong> — all detectors must be interlinked so that activation
                of any one detector sounds the alarm on all detectors. Interconnection can be
                hardwired or wireless (radio-frequency).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — detectors must be on a dedicated circuit from
                the consumer unit, protected by a 6A MCB. The circuit should not be shared with any
                other load.
              </span>
            </li>
          </ul>
        </div>
        <p>
          At first fix, the interconnect cable must be run between all detector positions. If
          hardwired interconnection is used, a 3-core and earth cable is typically required (the
          third core carries the interconnect signal). The cable route must follow BS 7671 safe
          zones and be accessible at each detector position.
        </p>
      </>
    ),
  },
  {
    id: 'afdd-spd',
    heading: 'AFDD and SPD Requirements in New Builds',
    content: (
      <>
        <p>
          Two protective devices that are increasingly specified in new build installations are
          AFDDs (Arc Fault Detection Devices) and SPDs (Surge Protection Devices).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              <SEOInternalLink href="/guides/afdd-guide">AFDDs</SEOInternalLink>
            </h3>
            <p className="text-white text-sm leading-relaxed">
              BS 7671 Regulation 421.1.7 recommends AFDDs for circuits in locations with sleeping
              accommodation, locations with risks due to stored materials, and locations with
              combustible constructional materials (timber frame). While the regulation uses
              "recommended" rather than "required", the direction of travel is clear — AFDDs are
              expected to become mandatory in future editions. Fitting them in new builds now is
              best practice, particularly in timber-framed properties where an arc fault in
              concealed wiring could ignite the structural timber.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SPDs</h3>
            <p className="text-white text-sm leading-relaxed">
              BS 7671 Regulation 443.4 requires SPDs where the consequence of an overvoltage event
              would result in serious injury, danger to life, disruption to public services, damage
              to cultural heritage, or significant financial loss. In a modern new build with smart
              home systems, network equipment, EV chargers, heat pumps, and expensive electronics,
              the financial loss threshold is easily met. In practice, SPDs are expected in
              virtually every new build installation. A Type 2 SPD fitted at the consumer unit is
              the standard minimum provision.
            </p>
          </div>
        </div>
        <p>
          Both AFDDs and SPDs add cost to the consumer unit — budget an additional £30-£50 per
          circuit for AFDDs and £50-£100 for an SPD module. Include these in the initial quote to
          avoid surprises. Use Elec-Mate's{' '}
          <SEOInternalLink href="/tools/quoting-app">quoting app</SEOInternalLink> to price the full
          new build installation including all protective devices.
        </p>
      </>
    ),
  },
  {
    id: 'design-considerations',
    heading: 'Design Considerations for New Build Installations',
    content: (
      <>
        <p>
          Designing the electrical installation for a new build requires consideration of the
          current and future needs of the property. Good design at this stage prevents expensive
          alterations later and ensures the installation is fit for purpose for its full lifespan.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Future-proofing</strong> — allow at least 20% spare ways in the consumer
                unit for future circuits. Consider running data cabling (Cat6) even if not
                immediately required. Install ducting for future EV charger upgrade (from 7kW to
                22kW) or additional charge points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/max-demand-calculator">
                    Maximum demand
                  </SEOInternalLink>
                </strong>{' '}
                — calculate the total maximum demand to determine whether a single phase or{' '}
                <SEOInternalLink href="/guides/three-phase-installation">
                  three phase
                </SEOInternalLink>{' '}
                supply is required. Consider future loads (second EV charger, heat pump, battery
                storage) as well as current loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen circuits</strong> — dedicate separate circuits for the cooker, hob,
                dishwasher, washing machine, and worktop sockets. See our{' '}
                <SEOInternalLink href="/guides/kitchen-wiring-guide">
                  kitchen wiring guide
                </SEOInternalLink>{' '}
                for detailed requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor provision</strong> — external sockets, external lighting, garden
                lighting circuits, and security lighting. All outdoor circuits require 30mA RCD
                protection.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Design complete new build installations with AI"
          description="Elec-Mate's AI circuit designer creates full circuit schedules for new builds — circuit allocation, cable sizing, board layout, and protective device selection. Enter the property type and room layout, and get a complete design in minutes."
          icon={CircuitBoard}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NewBuildElectricalPage() {
  return (
    <GuideTemplate
      title="New Build Electrical Installation | Requirements UK"
      description="Complete guide to new build electrical installation requirements in the UK. Building Regulations Parts P, L, B, M, and S, EV charging 2022, smoke detectors, AFDD/SPD requirements, SAP calculations, and certification."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          New Build Electrical Installation:{' '}
          <span className="text-yellow-400">Every Requirement You Must Meet</span>
        </>
      }
      heroSubtitle="New build electrical installations must comply with BS 7671, Building Regulations Parts P, L, B, M, and S, EV charging regulations, smoke detector requirements, and SAP calculations. This guide covers every requirement in one place."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About New Build Electrical"
      relatedPages={relatedPages}
      ctaHeading="Design New Build Installations Faster"
      ctaSubheading="Elec-Mate's AI circuit designer, cable sizing calculator, and EIC certificate app help you design, install, and certify new builds efficiently. Join 430+ UK electricians. 7-day free trial."
    />
  );
}
