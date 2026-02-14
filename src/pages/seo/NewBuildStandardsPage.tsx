import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Building,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Flame,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Car,
  Brain,
  Receipt,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'New Build Standards', href: '/guides/new-build-electrical-standards' },
];

const tocItems = [
  { id: 'approved-document-p', label: 'Approved Document P' },
  { id: 'ev-charging-part-s', label: 'EV Charging (Part S)' },
  { id: 'smoke-heat-detection', label: 'Smoke and Heat Detection' },
  { id: 'afdd-spd-requirements', label: 'AFDD and SPD Requirements' },
  { id: 'sap-calculations', label: 'SAP Calculations and Electrical Design' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'common-defects', label: 'Common Defects on New Builds' },
  { id: 'for-electricians', label: 'For Electricians on New Build Sites' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Approved Document P of the Building Regulations requires all electrical work in new dwellings to comply with BS 7671 and be notified to Building Control or carried out by a registered competent person.',
  'Part S (Infrastructure for the Charging of Electric Vehicles) requires all new homes with associated parking to have at least one EV charge point or cable route installed from completion.',
  'Smoke and heat alarms must be fitted in accordance with BS 5839-6 Grade D1 (Category LD2 minimum) in all new builds, with mains-powered interlinked detectors in circulation spaces, living rooms, and kitchens.',
  'AFDDs (Arc Fault Detection Devices) are recommended by BS 7671 Regulation 421.1.7 for final circuits supplying socket-outlets in single-occupancy dwellings, and SPDs must be fitted where the consequence of an overvoltage event is serious.',
  'Elec-Mate lets electricians complete the Electrical Installation Certificate on site, generate SAP-ready documentation, and deliver the certificate to the builder before leaving.',
];

const faqs = [
  {
    question: 'Do I need to notify Building Control for electrical work in a new build?',
    answer:
      'Yes. Under Approved Document P of the Building Regulations (England and Wales), all electrical installation work in a new dwelling must either be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or similar) who self-certifies the work, or be notified to the local authority Building Control body before work begins. If the work is notified to Building Control, the installation will need to be inspected and tested by a Building Control inspector or an approved inspector. In practice, most new build developers use registered electricians who self-certify, as this avoids the need for separate Building Control inspections of the electrical work. The electrician must issue an Electrical Installation Certificate (EIC) for the completed installation, and a copy of the Building Regulations compliance certificate (BS 7671 Part P certificate) must be given to the developer and retained by the local authority.',
  },
  {
    question: 'What are the EV charging requirements for new build homes?',
    answer:
      "Under Part S of the Building Regulations (Infrastructure for the Charging of Electric Vehicles), which came into effect on 15 June 2022, every new residential building with associated parking must have at least one electric vehicle charge point installed. The charge point must be at least 7 kW and must comply with the relevant British Standards. If the building has more than one associated parking space, only one charge point is required, but cable routes must be installed to all remaining spaces to allow future charge point installation. For new residential buildings with more than 10 parking spaces, at least one charge point must be installed and cable routes provided to all other spaces. The cable route must include appropriate containment (ducting or trunking) from the consumer unit or distribution board to the parking space, with sufficient capacity in the electrical supply to support future charge point installation. Developers must also ensure the electrical supply to the property has sufficient capacity for the charge point without compromising the dwelling's maximum demand.",
  },
  {
    question: 'What grade and category of fire detection is required in a new build?',
    answer:
      'For new build dwellings in England, Approved Document B (Fire Safety) requires a fire detection and alarm system in accordance with BS 5839-6. The minimum requirement is a Grade D1, Category LD2 system. Grade D1 means mains-powered detectors with integral battery backup, interconnected so that activation of any detector sounds all alarms throughout the dwelling. Category LD2 means detectors must be installed in all circulation spaces (hallways, landings, staircases), the principal habitable room (usually the living room), and all rooms where fire is most likely to start — typically the kitchen. In the kitchen, a heat alarm (not a smoke alarm) should be used. Multi-storey dwellings of three or more storeys require Category LD1 (detectors in all rooms except bathrooms and shower rooms). In Scotland, the requirements are more stringent — every home (new and existing) must have interlinked fire alarms to LD2 standard since February 2022. New builds in Scotland generally require LD1.',
  },
  {
    question: 'Are AFDDs mandatory in new build homes?',
    answer:
      'AFDDs (Arc Fault Detection Devices) are not strictly mandatory under BS 7671:2018+A2:2022, but they are strongly recommended. Regulation 421.1.7 recommends that AFDDs conforming to BS EN 62606 be considered for final circuits supplying socket-outlets with a rated current not exceeding 32 A in single-occupancy dwellings (houses, flats, and similar). The recommendation applies to all single-phase final circuits that supply socket-outlets in sleeping accommodation and is particularly relevant for new builds where the cost of fitting AFDDs at the time of installation is significantly lower than retrofitting them later. Some developers and housing associations now specify AFDDs as a standard requirement in their specifications, particularly for affordable housing and social housing. The IET Guidance Note 1 (Selection and Erection) discusses AFDD selection in detail. Amendment 2 strengthened the recommendation, and it is widely expected that a future amendment will make AFDDs mandatory for certain circuits.',
  },
  {
    question: 'What SPD requirements apply to new build installations?',
    answer:
      'Under BS 7671:2018+A2:2022, Regulation 443.4.1 requires surge protective devices (SPDs) to be fitted where the consequence of an overvoltage event would be serious. In practice, this means SPDs are required in virtually all new build domestic installations because the risk assessment under Regulation 443.4 will almost always conclude that the consequences are serious — a new build contains electronic equipment, IT networks, and potentially EV charging infrastructure, all of which are vulnerable to transient overvoltages. The SPD must be Type 2 (or Type 1+2 combined) and must be installed at the origin of the installation, typically within or adjacent to the consumer unit. If the supply is TT (earth rod), a Type 1+2 SPD is required because the installation is more exposed to lightning-induced surges. The SPD must be coordinated with the upstream protective device and must have a suitable backup protection device (SPD-rated MCB or fuse). Most consumer unit manufacturers now offer units with integrated SPD modules specifically designed for new build installations.',
  },
  {
    question: 'What is a SAP calculation and how does it affect electrical design?',
    answer:
      "SAP (Standard Assessment Procedure) is the UK Government's methodology for assessing the energy performance of dwellings. Every new build must have a SAP calculation carried out to demonstrate compliance with Part L (Conservation of Fuel and Power) of the Building Regulations. The SAP calculation considers the dwelling's fabric (walls, roof, floors, windows), heating system, hot water system, ventilation, lighting, and renewable energy generation. For electricians, the key impact is on lighting design — SAP requires a minimum proportion of low-energy light fittings (LED is the standard choice for new builds). The SAP assessor will need details of the lighting specification, the number of fixed light fittings, and the wattage of each fitting. Electricians working on new builds should coordinate with the SAP assessor early in the project to ensure the lighting design meets the SAP targets. Elec-Mate's certificate tools allow you to record all lighting details and generate documentation that the SAP assessor can use directly.",
  },
  {
    question: 'Who is responsible for the Electrical Installation Certificate on a new build?',
    answer:
      'The electrician who designed and installed the electrical installation is responsible for issuing the Electrical Installation Certificate (EIC) in accordance with BS 7671 Appendix 6. On a new build, the EIC must cover the entire installation from the meter position to every final circuit. The certificate must be signed by the designer, the installer, and the person responsible for inspection and testing — these may be the same person or different people depending on the contractor arrangement. The EIC must include a schedule of inspections and a schedule of test results for every circuit. For Part P notification, the registered electrician also issues a Building Regulations compliance certificate. The developer (builder) receives copies of both certificates and must pass them to the homeowner. The local authority Building Control department also receives a copy of the Part P notification. If the electrician is not registered with a competent person scheme, the developer must notify Building Control before work begins and arrange for a Building Control inspection of the electrical work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete digital Electrical Installation Certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Complete guide to Part P compliance, notification requirements, and competent person schemes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations-uk',
    title: 'Consumer Unit Regulations',
    description:
      'BS 7671 requirements for consumer units including SPD integration, AFDD selection, and metal enclosure rules.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate correct cable sizes for new build circuits accounting for voltage drop, grouping, and thermal insulation.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation',
    description:
      'Step-by-step guide to domestic EV charge point installation, supply requirements, and Part S compliance.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study for C&G 2382 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'approved-document-p',
    heading: 'Approved Document P: The Foundation for New Build Electrical Work',
    content: (
      <>
        <p>
          Approved Document P (Electrical Safety — Dwellings) of the Building Regulations 2010 sets
          out the requirements for electrical installation work in dwellings in England and Wales.
          It applies to all new build homes, extensions, and alterations where electrical work is
          carried out. The document requires that all electrical installations are designed,
          installed, inspected, and tested in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations, 18th Edition).
        </p>
        <p>
          For new build projects, Part P compliance is achieved in one of two ways. The first and
          most common route is for the electrical work to be carried out by an electrician
          registered with a competent person scheme — NICEIC, NAPIT, ELECSA, or another
          government-approved scheme. The registered electrician self-certifies the work and
          notifies the local authority directly through the scheme. The second route is for the
          developer to notify Building Control before the electrical work begins, in which case a
          Building Control inspector will inspect and test the installation upon completion.
        </p>
        <p>
          On a typical new build housing development, the electrical contractor is registered with a
          competent person scheme and issues the Electrical Installation Certificate (EIC) and Part
          P notification for each plot. The developer receives the certificates and passes them to
          the purchaser as part of the handover documentation. Missing or incomplete certificates
          can delay completion and cause problems for the purchaser's conveyancer.
        </p>
        <p>
          The key point for electricians is this: every new build plot needs a complete EIC with
          full schedules of inspection and test results. No shortcuts. No missing circuits. No "I'll
          do the paperwork later." The certificate must be completed before handover.
        </p>
      </>
    ),
  },
  {
    id: 'ev-charging-part-s',
    heading: 'EV Charging Requirements Under Part S',
    content: (
      <>
        <p>
          Part S of the Building Regulations came into effect on 15 June 2022 and requires all new
          residential buildings with associated parking to have electric vehicle charging
          infrastructure installed. This is one of the most significant changes to new build
          electrical specifications in recent years.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One charge point per dwelling.</strong> Every new home with associated
                parking must have at least one EV charge point installed, rated at a minimum of 7
                kW. The charge point must be installed and operational at completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routes for additional spaces.</strong> If the dwelling has more than
                one parking space, cable routes (ducting or trunking) must be installed from the
                consumer unit to all remaining parking spaces to allow future charge point
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply capacity.</strong> The electrical supply to the property must have
                sufficient capacity to support the EV charge point without exceeding the maximum
                demand. This often requires a 100 A single-phase supply or a three-phase supply for
                larger properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compliance with BS 7671.</strong> The EV charge point circuit must comply
                with BS 7671 Section 722 (Electric Vehicle Charging Installations), including
                requirements for RCD protection, cable sizing, and earthing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, Part S means every new build plot now includes an EV charging circuit as
          standard. This adds a dedicated radial circuit (typically 10 mm² twin and earth or 6 mm²
          SWA) from the consumer unit to the charge point location, a dedicated 32 A Type A or Type
          B RCD (or RCBO), and an{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">
            EV charge point installation
          </SEOInternalLink>{' '}
          that must be commissioned and tested before handover.
        </p>
        <SEOAppBridge
          title="EV charger certificates in minutes"
          description="Elec-Mate's EV Charger Certificate template is designed for Part S compliance. Complete the certificate on site, attach photos, and send the PDF to the developer before you leave."
          icon={Car}
        />
      </>
    ),
  },
  {
    id: 'smoke-heat-detection',
    heading: 'Smoke and Heat Detection: BS 5839-6 Requirements',
    content: (
      <>
        <p>
          Approved Document B (Fire Safety) requires all new build dwellings to have a fire
          detection and alarm system installed in accordance with BS 5839-6. The minimum standard
          for new builds is a Grade D1, Category LD2 system — but many developers and local
          authorities now specify Category LD1 for multi-storey dwellings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D1:</strong> Mains-powered detectors with integral standby battery and
                interconnection (hardwired or wireless). All detectors must sound when any one
                detector is activated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD2:</strong> Detectors in all circulation spaces (hallways,
                landings, staircases), the principal habitable room (living room), and rooms where
                fire is most likely to start (kitchen — heat alarm only).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD1:</strong> Detectors in all rooms except bathrooms, shower
                rooms, and WCs. Required for three-storey dwellings and above.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon monoxide alarms:</strong> Required in any room containing a
                combustion appliance (gas boiler, wood burner, oil-fired appliance) under Part J.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians on new build sites, the fire detection system is wired as a dedicated
          circuit from the consumer unit, typically on a 6 A MCB. The wiring must be fire-resistant
          or protected by the building structure to maintain circuit integrity for the required
          period. Detector positions must follow the spacing and siting rules in BS 5839-6 —
          including minimum distances from walls, light fittings, and ventilation openings.
        </p>
        <p>
          The completed system must be tested and commissioned in accordance with BS 5839-6, and the
          test results must be recorded on the EIC schedule of test results. A separate fire
          detection certificate may also be required by the developer or Building Control.
        </p>
      </>
    ),
  },
  {
    id: 'afdd-spd-requirements',
    heading: 'AFDD and SPD: Modern Protection for New Builds',
    content: (
      <>
        <p>
          BS 7671:2018+A2:2022 introduced two significant protective device requirements that are
          particularly relevant to new build installations: Arc Fault Detection Devices (AFDDs) and
          Surge Protective Devices (SPDs).
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">AFDDs (Regulation 421.1.7)</h3>
            <p className="text-white text-sm leading-relaxed">
              AFDDs detect dangerous arc faults — caused by damaged cables, loose connections, or
              deteriorating insulation — that can start fires but are too small to trip an MCB or
              RCD. BS 7671 Regulation 421.1.7 recommends AFDDs for final circuits supplying
              socket-outlets rated up to 32 A in single-occupancy dwellings. While currently a
              recommendation, many new build specifications now include AFDDs as standard,
              particularly for bedroom and living room socket circuits. The device is installed at
              the consumer unit in series with the MCB or RCBO for the protected circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">SPDs (Regulation 443.4)</h3>
            <p className="text-white text-sm leading-relaxed">
              SPDs protect the installation and connected equipment against transient overvoltages
              caused by lightning, switching operations, or faults on the supply network. Regulation
              443.4.1 requires SPDs where the risk assessment concludes the consequences would be
              serious — which applies to virtually all new builds containing electronic equipment. A
              Type 2 SPD (or combined Type 1+2) must be installed at the origin of the installation.
              For TT earthing systems, a Type 1+2 SPD is required. The SPD must be coordinated with
              the upstream protective device and backed up by an SPD-rated MCB or fuse.
            </p>
          </div>
        </div>
        <p>
          For electricians specifying{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations-uk">
            consumer units for new builds
          </SEOInternalLink>
          , the practical impact is significant. A new build consumer unit now typically includes
          dual-RCD or RCBO protection for all circuits, an integrated SPD module, AFDD-protected
          RCBOs for bedroom and living room socket circuits, and sufficient spare ways for future
          circuits (including second EV charge point). The additional cost of AFDDs and SPDs at the
          time of installation is a fraction of the retrofit cost — and fitting them now
          future-proofs the installation for the expected regulatory changes.
        </p>
      </>
    ),
  },
  {
    id: 'sap-calculations',
    heading: 'SAP Calculations and Electrical Design',
    content: (
      <>
        <p>
          The Standard Assessment Procedure (SAP) is the UK Government's methodology for assessing
          the energy performance of dwellings. Every new build must achieve a target SAP rating to
          comply with Part L (Conservation of Fuel and Power) of the Building Regulations. The
          electrical design directly influences the SAP score through lighting specification and
          fixed electrical heating.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting efficacy.</strong> SAP 10.2 (the current version) requires the
                lighting specification to be assessed for energy efficiency. LED fittings are the
                standard choice for new builds. The SAP assessor needs to know the number of fixed
                light fittings, the wattage of each fitting, the type (LED, fluorescent, halogen),
                and the lumen output per watt (efficacy). Low-efficacy fittings reduce the SAP
                score.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>100% low-energy lighting.</strong> To maximise the SAP score, specify 100%
                LED or other low-energy lighting. This is now standard practice on new build sites.
                GU10 LED downlights, LED battens, and LED strip lighting all qualify as low-energy
                fittings provided they meet the minimum efficacy threshold (typically 60 lumens per
                watt or better).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV integration.</strong> Where the developer installs solar PV panels,
                the electrician must connect the PV system to the consumer unit via an appropriate
                AC isolator, generation meter, and (if required) export meter. The PV system's
                contribution to the SAP calculation can significantly improve the overall rating.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working on new builds should coordinate with the SAP assessor at the design
          stage to ensure the lighting specification meets the SAP targets. Changes to the lighting
          layout or fitting specification after the SAP calculation has been submitted can cause
          compliance issues and delays.
        </p>
        <SEOAppBridge
          title="Record every fitting for SAP compliance"
          description="Elec-Mate's EIC template includes dedicated fields for lighting type, wattage, and efficacy. Generate SAP-ready documentation as part of your standard certificate workflow."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification for New Builds',
    content: (
      <>
        <p>
          The testing and certification requirements for new build electrical installations are more
          extensive than for existing installations. The electrician must issue an Electrical
          Installation Certificate (EIC) — not an EICR — because this is a new installation, not a
          periodic inspection of an existing one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC).</strong> The EIC must be signed
                by the designer, the installer, and the person who carried out the inspection and
                testing. It must include full schedules of inspection (visual checks) and test
                results (dead and live tests) for every circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule of test results.</strong> Every circuit must be tested for
                continuity of protective conductors (R1+R2), insulation resistance, polarity, earth
                fault loop impedance (Zs), prospective fault current (Ipf), and RCD operation (trip
                time and current). All results must be within the limits specified in BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification.</strong> If the electrician is registered with a
                competent person scheme, the Part P notification is submitted through the scheme's
                online portal. The developer receives the compliance certificate within a few days
                of submission.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional certificates.</strong> Separate certificates may be required for
                the EV charge point installation (Section 722 compliance), solar PV system (if
                applicable), and fire detection system (BS 5839-6 commissioning certificate).
              </span>
            </li>
          </ul>
        </div>
        <p>
          On a large housing development, the paperwork volume is substantial. Each plot needs its
          own EIC, Part P notification, and any additional certificates. Electricians who complete
          these on site — rather than going home to type them up — save hours of desk time per week
          and avoid the backlog that inevitably builds up when paperwork is left until Friday
          afternoon.
        </p>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects Found on New Build Electrical Installations',
    content: (
      <>
        <p>
          Despite being brand new, new build installations are not immune to defects. Building
          inspectors and NHBC warranty inspections regularly identify electrical issues. The most
          common defects include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or inadequate bonding.</strong> Supplementary bonding omitted in
                bathrooms, main bonding to gas and water not connected, or bonding conductors
                undersized for the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect RCD selection.</strong> Type AC RCDs used instead of Type A (or
                Type F for inverter-driven appliances), or circuits not adequately split across RCDs
                to avoid total loss of supply on a trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable damage during construction.</strong> Cables clipped too tightly,
                damaged by other trades (plumbers, plasterers), or installed in zones that do not
                comply with Regulation 522.6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire stopping not completed.</strong> Cable penetrations through fire-rated
                walls, floors, and ceilings not sealed with appropriate fire-stopping materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete labelling.</strong> Consumer unit circuit chart missing or
                inaccurate, distribution boards not labelled with IP rating, or cable identification
                not present at terminations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These defects are avoidable with proper quality control during installation and thorough
          testing before handover. Electricians should treat the final inspection and testing phase
          as a critical quality gate — not a box-ticking exercise.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Streamlining New Build Certification',
    content: (
      <>
        <p>
          New build electrical work is high-volume, deadline-driven, and paperwork-heavy. Site
          managers want plots signed off on time. Developers want certificates delivered before
          completion. NHBC and LABC want compliance documentation without chasing. The electrician
          who can deliver quality work and complete paperwork on site — not three weeks later — wins
          the repeat contracts.
        </p>
        <p>Elec-Mate is built for exactly this workflow:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the consumer unit on each plot. Elec-Mate reads the MCB/RCBO ratings,
                  circuit designations, and board layout from the photo. The EIC schedule is
                  half-populated before you start testing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Full EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate — design, installation,
                  inspection and testing — entirely on your phone. Every section, every schedule,
                  every signature. No paper forms, no going home to type it up.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Batch Certificate Generation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Working on a development with identical plot types? Duplicate a completed EIC and
                  update only the plot-specific details — address, supply readings, and test
                  results. Save hours on repetitive paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Instant PDF Delivery</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the completed EIC as a professional PDF by email or WhatsApp to the site
                  manager, developer, or Building Control. The certificate is delivered before you
                  leave the plot. No delays, no chasing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The result: every plot gets a complete, professional EIC delivered on the day of testing.
          No backlog. No missing paperwork holding up completions. No Friday afternoon desk
          marathons. That is how Elec-Mate makes new build work more efficient and more profitable.
        </p>
        <SEOAppBridge
          title="Complete new build EICs on site"
          description="Join 430+ UK electricians creating professional certificates on their phones. AI board scanner, voice entry, and instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NewBuildStandardsPage() {
  return (
    <GuideTemplate
      title="New Build Electrical Standards | Building Regs Guide"
      description="Complete guide to new build electrical standards in the UK. Approved Document P, EV charging (Part S), smoke and heat detection, AFDD and SPD requirements, SAP calculations, and testing certification for new dwellings."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="New Build Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          New Build Electrical Standards:{' '}
          <span className="text-yellow-400">The Complete Building Regulations Guide</span>
        </>
      }
      heroSubtitle="Every new build dwelling in England and Wales must comply with Approved Document P, Part S (EV charging), Part B (fire detection), and BS 7671. This guide covers the electrical requirements, testing standards, and certification you need to get right on every plot."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About New Build Electrical Standards"
      relatedPages={relatedPages}
      ctaHeading="Complete New Build EICs on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional Electrical Installation Certificates with AI board scanning, voice test entry, and instant delivery to developers. 7-day free trial, cancel anytime."
    />
  );
}
