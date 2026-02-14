import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Bell,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Home,
  Battery,
  Cable,
  GraduationCap,
  ClipboardCheck,
  CheckCircle,
  MapPin,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Smoke Detector Wiring', href: '/guides/smoke-detector-wiring' },
];

const tocItems = [
  { id: 'overview', label: 'Smoke Detector Regulations Overview' },
  { id: 'bs5839-6', label: 'BS 5839-6 and Grade D Systems' },
  { id: 'interconnection', label: 'Interconnection Wiring' },
  { id: 'battery-backup', label: 'Battery Backup Requirements' },
  { id: 'positioning', label: 'Detector Positioning' },
  { id: 'part-b', label: 'Part B Building Regulations' },
  { id: 'testing-commissioning', label: 'Testing and Commissioning' },
  { id: 'for-electricians', label: 'For Electricians Wiring Smoke Detectors' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All new-build dwellings and most material alterations require mains-powered, interlinked smoke detectors complying with BS 5839-6 Grade D1.',
  'Smoke detectors must be interconnected so that when one detector activates, all detectors sound the alarm simultaneously throughout the dwelling.',
  'Battery backup (rechargeable lithium or sealed lead-acid) is mandatory so that detectors continue to operate during a mains power failure.',
  'Detector positioning follows BS 5839-6 recommendations: one on each storey in the circulation space (hallway/landing) within 7.5m of bedroom doors, plus heat detectors in kitchens.',
  'Elec-Mate generates the EIC or Minor Works Certificate for smoke detector installations on your phone, with AI-assisted observation coding and instant PDF delivery.',
];

const faqs = [
  {
    question: 'Do smoke detectors need to be mains wired in the UK?',
    answer:
      'For new-build dwellings, yes. The Building Regulations Approved Document B (England) requires mains-powered smoke and heat detection systems in all new dwellings, conforming to BS 5839-6 Grade D1 as a minimum. This means mains-powered detectors with battery backup and interconnection. For existing dwellings, the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 require at least one smoke alarm on each storey used as living accommodation — but these can be battery-powered standalone units. However, when an existing dwelling undergoes a material alteration (such as a loft conversion, extension, or change of use), the Building Regulations require the entire property to be brought up to the current standard, which means mains-powered interlinked detectors. In practice, most electricians recommend mains-powered interlinked systems even where not strictly required, as they provide significantly better protection.',
  },
  {
    question: 'How many smoke detectors does a house need?',
    answer:
      'Under BS 5839-6 Grade D1, the minimum requirement is one smoke detector on each storey in the principal habitable room escape route — which means the hallway on the ground floor and the landing on each upper floor. In addition, a heat detector (not a smoke detector, to avoid false alarms from cooking) is required in the kitchen. For properties with an integral or attached garage, a heat detector is required in the garage. If a bedroom opens directly onto a room that is not a circulation space (for example, an open-plan living area), additional detection may be needed to ensure the alarm is audible in the bedroom. BS 5839-6 recommends that no point in any room used for sleeping should be more than 7.5 metres from the nearest detector. For larger properties, open-plan layouts, and multi-storey homes, additional detectors are often needed to meet this coverage requirement. A risk assessment approach is recommended for anything beyond a standard layout.',
  },
  {
    question: 'What cable is used for smoke detector wiring?',
    answer:
      'The interconnection cable between mains-powered smoke detectors is typically 1.0mm2 or 1.5mm2 two-core and earth (or three-core and earth if the detectors require a separate interconnect wire). The mains supply to the detection system is usually taken from the lighting circuit on each floor — this is acceptable because smoke detectors draw very little current (typically under 100mA per detector) and the lighting circuit provides a permanent live supply. Some manufacturers and specifiers prefer a dedicated circuit for the smoke detection system, particularly in larger properties or where the system includes more than 10 detectors. The cable must be clipped at regular intervals (as per BS 7671 Table 4E1) and routed to avoid damage. In new-build properties, the cable is typically run through the ceiling void before plastering. In retrofit installations, surface-mounted mini trunking or routing through existing ceiling roses is common.',
  },
  {
    question: 'What is the difference between Grade A, Grade D, and Grade F smoke detection?',
    answer:
      'BS 5839-6 defines several grades of fire detection system. Grade A is the highest: a system with a control panel, dedicated supply, and professional detectors — this is typically used in HMOs and larger properties. Grade D is the standard for new-build dwellings: mains-powered detectors with battery backup, interconnected via hard wiring or wireless link, but without a central control panel. Grade D1 adds specific coverage requirements (detectors in circulation spaces and a heat detector in the kitchen). Grade D2 is a slightly lower coverage standard (circulation spaces only). Grade F is the lowest: battery-powered standalone alarms with no interconnection and no mains supply. Grade F is the minimum acceptable for existing rented properties under the Smoke and Carbon Monoxide Alarm Regulations 2022 where no building work is being done. For any new installation or material alteration, Grade D1 is the standard you should be working to.',
  },
  {
    question: 'Can I use wireless interlinked smoke detectors instead of hard-wired?',
    answer:
      'BS 5839-6 permits wireless (radio-linked) interconnection between mains-powered detectors as an alternative to hard-wired interconnection. This is particularly useful in retrofit installations where running interconnection cables between floors is difficult or disruptive. The detectors must still be mains-powered with battery backup — wireless refers only to the interconnection method, not the power supply. The advantage of wireless interconnection is that each detector only needs a mains supply (which can be taken from the nearest lighting circuit), without requiring an interconnection cable between every detector. The detectors communicate by radio signal when one is triggered, causing all others to sound. However, wireless systems are typically more expensive per detector than hard-wired systems, and some Building Control officers prefer hard-wired interconnection where it is practical. Check with your local Building Control before specifying a wireless interconnected system.',
  },
  {
    question: 'Do I need an EIC or Minor Works for fitting smoke detectors?',
    answer:
      'If you are adding a new dedicated circuit for smoke detection, an Electrical Installation Certificate (EIC) is required for the new circuit. If you are connecting new detectors to an existing lighting circuit (the most common approach), a Minor Electrical Installation Works Certificate (MEIWC) is sufficient — provided the work involves additions to an existing circuit rather than the creation of a new one. In both cases, the certificate must record the test results for the circuit (continuity, insulation resistance, polarity, earth fault loop impedance, and RCD operation if applicable). For new-build properties, the smoke detection will be included in the EIC for the entire installation. For retrofit installations in existing homes, a Minor Works Certificate is usually appropriate. Elec-Mate generates both certificates on your phone, with the schedule of test results and all the required fields pre-populated. Send the completed certificate to the customer or Building Control before you leave.',
  },
  {
    question: 'Are carbon monoxide detectors required as well as smoke detectors?',
    answer:
      'Under the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, carbon monoxide (CO) alarms are required in all rooms containing a fixed combustion appliance (such as a gas boiler, gas fire, oil boiler, or solid fuel stove) — excluding gas cookers. This applies to all rented properties (private and social) and to new-build dwellings. CO detectors can be battery-powered standalone units — they do not need to be mains-powered or interlinked with the smoke detection system, although interlinked CO detectors provide better protection. For electricians, the relevant point is that CO alarms are often specified alongside smoke detectors in renovation and new-build projects. If you are installing a mains-powered interlinked smoke detection system, it makes sense to include interlinked CO detectors in the same system for rooms with combustion appliances. Some manufacturers offer combination smoke/CO detectors that provide both functions in a single unit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for new smoke detection circuits on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
    title: 'Minor Works Certificate',
    description:
      'Issue Minor Works Certificates for smoke detector additions to existing lighting circuits.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/smoke-alarm-regulations-uk',
    title: 'Smoke Alarm Regulations UK',
    description:
      'Full guide to the Smoke and Carbon Monoxide Alarm Regulations 2022 for landlords and electricians.',
    icon: Bell,
    category: 'Guide',
  },
  {
    href: '/tools/fire-alarm-certificate',
    title: 'Fire Alarm Certificate',
    description: 'BS 5839 compliant fire alarm certificates for domestic and commercial systems.',
    icon: AlertTriangle,
    category: 'Certificate',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'When electrical work is notifiable and how competent person schemes handle self-certification.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured training on testing and certification procedures.',
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
    heading: 'Smoke Detector Regulations: What Electricians Need to Know',
    content: (
      <>
        <p>
          Smoke detection is one of the most critical safety systems in any dwelling. For
          electricians, wiring mains-interlinked smoke and heat detectors is bread-and-butter work —
          required in every new-build, every loft conversion, and increasingly in retrofit
          installations for landlords and homeowners upgrading their fire safety.
        </p>
        <p>
          The regulatory framework has two layers. First, the Building Regulations (Approved
          Document B in England) set the requirements for new dwellings and material alterations.
          Second, the{' '}
          <SEOInternalLink href="/guides/smoke-alarm-regulations-uk">
            Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022
          </SEOInternalLink>{' '}
          set the minimum requirements for rented properties. For electricians, the installation
          standard is BS 5839-6, which specifies the grades, categories, and installation
          requirements for fire detection in dwellings.
        </p>
        <p>
          This guide covers the electrical wiring aspects: how to wire a mains-interlinked Grade D
          system, where to position detectors, battery backup requirements, cable selection, and the
          testing and certification you need to complete.
        </p>
      </>
    ),
  },
  {
    id: 'bs5839-6',
    heading: 'BS 5839-6 and Grade D Systems',
    content: (
      <>
        <p>
          BS 5839-6 is the British Standard for fire detection and fire alarm systems in domestic
          premises. It defines the grades (A through F) and categories (LD1 through LD3) of system.
          For most domestic electrical work, you will be installing a Grade D1 system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grade D:</strong> One or more mains-powered detectors, each with a standby
                power supply (rechargeable battery), either hard-wired or wirelessly interconnected.
                No central control panel. This is the standard for new-build domestic dwellings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD1:</strong> Detectors in all rooms, hallways, and landings except
                bathrooms and WCs. This is the highest level of coverage for life safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD2:</strong> Detectors in escape routes (hallways and landings),
                rooms opening onto escape routes, and high-risk rooms (kitchen, living room). This
                is the most common specification for new dwellings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Category LD3:</strong> Detectors in escape routes only — hallways and
                landings. This is the minimum for Approved Document B compliance in new-build
                dwellings, plus a heat detector in the kitchen.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Approved Document B requirement for new dwellings is a minimum of Grade D, Category
          LD3 — but most specifiers and Building Control officers now expect Grade D1 (the
          nomenclature combining Grade D and Category LD1 or LD2 coverage, with kitchen heat
          detector). When in doubt, check with Building Control before starting the installation.
        </p>
      </>
    ),
  },
  {
    id: 'interconnection',
    heading: 'Interconnection Wiring: How to Link Smoke Detectors',
    content: (
      <>
        <p>
          The defining feature of a Grade D system is interconnection — when one detector triggers,
          all detectors in the system sound the alarm. This is critical for life safety in
          multi-storey dwellings, where a fire starting in a ground-floor kitchen might not be heard
          by occupants sleeping on the second floor without interconnected alarms.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hard-wired interconnection:</strong> A dedicated interconnect wire links all
                detectors in a daisy-chain configuration. Most systems use a three-core and earth
                cable (1.0mm2 or 1.5mm2) — live, neutral, earth, plus a separate interconnect core.
                When one detector activates, it sends a signal on the interconnect wire that
                triggers all other detectors to sound.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-wire interconnection:</strong> Some modern detector ranges use a
                two-wire system where the interconnect signal is carried on the mains supply wires
                (similar to X10 or powerline communication). This simplifies cabling — standard
                1.0mm2 two-core and earth is sufficient. Check the manufacturer's documentation for
                compatibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless interconnection:</strong> Radio-frequency linked detectors that
                communicate wirelessly when one is triggered. Ideal for retrofit installations where
                running cables between floors is impractical. Each detector still requires a mains
                supply — only the interconnection is wireless.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The mains supply for the detection system is typically taken from the lighting circuit on
          each floor. This is permitted because smoke detectors draw negligible current and the
          lighting circuit provides a permanent live supply (it is not switched). Connect the supply
          at the nearest ceiling rose or junction box. The interconnect cable then links all
          detectors in sequence. The maximum number of detectors on a single interconnected system
          depends on the manufacturer — typically 12 to 15 for hard-wired systems.
        </p>
        <p>
          One important point: do not connect smoke detectors to a switched circuit or a circuit
          protected by a time-delay device. The supply must be permanently live. If the circuit is
          protected by an <SEOInternalLink href="/guides/rcd-types-explained">RCD</SEOInternalLink>,
          nuisance tripping of the RCD will deactivate the smoke detection system — consider using a
          dedicated RCBO or ensuring the lighting circuit RCD covers only the smoke detection and
          lighting circuits.
        </p>
      </>
    ),
  },
  {
    id: 'battery-backup',
    heading: 'Battery Backup Requirements',
    content: (
      <>
        <p>
          Every mains-powered smoke detector must have a standby power supply (battery backup) that
          maintains operation during a mains power failure. This is a fundamental requirement of BS
          5839-6 for Grade D systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rechargeable lithium:</strong> Most modern mains-powered detectors use a
                sealed rechargeable lithium battery that charges from the mains supply and provides
                standby power during outages. These batteries are designed to last the lifetime of
                the detector (typically 10 years) and do not require replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replaceable 9V or AA backup:</strong> Some older detector models use a
                replaceable 9V alkaline or AA lithium battery as the standby supply. These must be
                replaced annually as part of routine maintenance. This type is less common in new
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standby duration:</strong> BS 5839-6 requires a minimum of 72 hours of
                standby operation on battery power. The detector must be able to sound the alarm for
                at least 4 minutes at the end of the 72-hour standby period. Most modern detectors
                comfortably exceed this requirement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When commissioning the system, verify that each detector is receiving mains power (the
          mains indicator LED should be illuminated) and that the battery backup is functioning.
          Most detectors have a test button that simulates an alarm condition and confirms both the
          sounder and the interconnection are working. Press the test button on each detector in
          turn and verify that all other detectors in the system also sound.
        </p>
      </>
    ),
  },
  {
    id: 'positioning',
    heading: 'Detector Positioning: Where to Install',
    content: (
      <>
        <p>
          Correct positioning is as important as correct wiring. A perfectly wired detector in the
          wrong location will not provide adequate protection. BS 5839-6 gives detailed guidance on
          positioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circulation spaces:</strong> Install a smoke detector (optical or
                ionisation) on each floor in the hallway and landing. The detector should be
                positioned on the ceiling, at least 300mm from any wall or light fitting. Centrally
                on the ceiling is ideal for narrow hallways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen:</strong> Install a heat detector (not a smoke detector) in the
                kitchen. Heat detectors respond to temperature rise rather than smoke particles,
                avoiding false alarms from cooking. Position on the ceiling, at least 300mm from any
                wall and not directly above the cooker or toaster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bedrooms:</strong> For LD1 and LD2 coverage, install smoke detectors in
                bedrooms and living rooms. For LD3 (minimum coverage), bedrooms are not required but
                are strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-plan areas:</strong> In open-plan kitchen/living spaces, use a heat
                detector in the kitchen area and a smoke detector in the living area. The boundary
                between the two zones is a judgement call — typically where the kitchen units end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distance from bedrooms:</strong> BS 5839-6 recommends that no bedroom door
                should be more than 7.5 metres from the nearest smoke detector. In a typical
                two-storey house with a central landing, a single detector on the landing usually
                meets this requirement. In larger properties or those with long corridors,
                additional detectors are needed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Avoid installing smoke detectors in bathrooms (steam causes false alarms), garages
          (exhaust fumes cause false alarms — use a heat detector instead), or very close to air
          vents and extractor fans (air movement can prevent smoke reaching the detector).
        </p>
      </>
    ),
  },
  {
    id: 'part-b',
    heading: 'Part B Building Regulations Compliance',
    content: (
      <>
        <p>
          Approved Document B (Fire Safety) of the Building Regulations sets the fire detection
          requirements for dwellings. The requirements differ depending on whether the work is a
          new-build, a material alteration, or an extension.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Dwellings</h3>
            <p className="text-white text-sm leading-relaxed">
              All new dwellings require a minimum Grade D1 fire detection system conforming to BS
              5839-6. This means mains-powered interlinked detectors with battery backup, covering
              at least the circulation spaces (hallway and landing on each floor) plus a heat
              detector in the kitchen. Building Control will inspect the installation as part of the
              sign-off process. The electrical certificate (EIC) must cover the smoke detection
              circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Loft Conversions and Extensions</h3>
            <p className="text-white text-sm leading-relaxed">
              A loft conversion is classified as a material alteration and triggers the requirement
              to install mains-powered interlinked detection throughout the property — not just in
              the new loft room. This often catches homeowners by surprise: converting the loft
              means fitting detectors on every floor, including the existing ground floor hallway
              and first-floor landing. The same applies to extensions that create a new habitable
              room. Building Control will require compliance before sign-off.
            </p>
          </div>
        </div>
        <p>
          For electricians, smoke detector installation in loft conversions and extensions is a
          reliable source of work. The builder or homeowner may not realise that the detection
          requirement extends to the whole house, and you can quote for the complete system —
          detectors, wiring, commissioning, and certification — as a single package.
        </p>
        <SEOAppBridge
          title="Generate the EIC for smoke detection circuits"
          description="Elec-Mate creates the Electrical Installation Certificate on your phone. Add the smoke detection circuit to the schedule, record the test results, and send the completed certificate to the customer or Building Control — before you leave the property."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'testing-commissioning',
    heading: 'Testing and Commissioning Smoke Detectors',
    content: (
      <>
        <p>
          After installation, the smoke detection system must be tested and commissioned before it
          is handed over to the occupant. The testing has two components: electrical circuit
          verification and functional testing of the detectors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit verification:</strong> Test the smoke detection circuit as part of
                the standard{' '}
                <SEOInternalLink href="/guides/testing-sequence-guide">
                  BS 7671 testing sequence
                </SEOInternalLink>
                . This includes continuity of protective conductors (R1+R2), insulation resistance
                at 500V DC (minimum 1M ohm), polarity, and earth fault loop impedance (Zs). Record
                all results on the EIC or Minor Works Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains supply check:</strong> Confirm each detector is receiving mains power
                by checking the mains indicator LED (usually a steady green light). Verify that the
                supply is permanently live and not on a switched circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional test:</strong> Press the test button on each detector
                individually. Verify that the detector sounds its own alarm and that all other
                interconnected detectors also sound. This confirms both the detector function and
                the interconnection wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery backup test:</strong> Switch off the mains supply to the detection
                circuit at the consumer unit. Confirm each detector continues to operate on battery
                backup (the mains LED will extinguish but the detector should still respond to the
                test button). Restore the mains supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Document all commissioning tests and provide the occupant with the manufacturer's
          instructions for each detector, including the recommended testing schedule (typically
          monthly test-button checks) and the detector replacement interval (typically 10 years from
          the date of manufacture).
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Smoke Detector Work as a Revenue Stream',
    content: (
      <>
        <p>
          Smoke detector installation and upgrades are consistent, year-round work. The combination
          of building regulations for new-builds and loft conversions, landlord requirements under
          the 2022 Regulations, and homeowner demand for improved fire safety means there is always
          demand for mains-interlinked detection systems.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Full System</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to price the complete smoke detection package: detectors, cables, fixings, labour,
                  and certification. Send a professional quote to the customer from your phone —
                  before you leave the survey visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EIC or Minor Works Certificate on your phone while you are on site.
                  Elec-Mate pre-populates the form with circuit details and lets you enter test
                  results directly. Export as a professional PDF and send to the customer, builder,
                  or Building Control.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Observation Coding</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you are doing a periodic inspection and find missing or inadequate smoke
                  detection, Elec-Mate's AI assigns the correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    observation code
                  </SEOInternalLink>{' '}
                  (typically C2 for no detection or C3 for outdated detectors) and drafts the
                  observation text for you.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Wire, test, certify, and invoice smoke detectors"
          description="From quoting to certification to invoicing — do the entire smoke detector job on your phone. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
          icon={Bell}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmokeDetectorWiringPage() {
  return (
    <GuideTemplate
      title="Smoke Detector Wiring Guide | Mains Interlinked UK"
      description="Complete guide to wiring mains-interlinked smoke detectors in UK dwellings. BS 5839-6 Grade D systems, interconnection methods, battery backup, detector positioning, Part B compliance, testing, and certification."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Bell}
      heroTitle={
        <>
          Smoke Detector Wiring:{' '}
          <span className="text-yellow-400">Mains Interlinked Systems for UK Dwellings</span>
        </>
      }
      heroSubtitle="Every new-build and most material alterations require mains-powered, interlinked smoke detection to BS 5839-6. This guide covers Grade D systems, interconnection wiring, battery backup, positioning rules, Part B compliance, and the testing and certification you need to complete."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smoke Detector Wiring"
      relatedPages={relatedPages}
      ctaHeading="Certificate Smoke Detector Installations on Your Phone"
      ctaSubheading="EIC and Minor Works certificates, AI observation coding, quoting, and invoicing — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
