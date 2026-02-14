import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  Eye,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Cable,
  Tag,
  FileCheck2,
  Search,
  Home,
  Wrench,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Testing', href: '/guides' },
  { label: 'Inspection Checklist', href: '/guides/electrical-inspection-checklist' },
];

const tocItems = [
  { id: 'why-inspection-matters', label: 'Why Inspection Matters' },
  { id: 'visual-inspection', label: 'Visual Inspection Items' },
  { id: 'consumer-unit-check', label: 'Consumer Unit Check' },
  { id: 'bonding', label: 'Earthing and Bonding' },
  { id: 'labelling', label: 'Labelling and Identification' },
  { id: 'cable-condition', label: 'Cable Condition and Routes' },
  { id: 'accessories', label: 'Accessories and Equipment' },
  { id: 'special-locations', label: 'Special Locations' },
  { id: 'recording-findings', label: 'Recording Findings' },
  { id: 'elec-mate-inspection', label: 'Elec-Mate for Inspections' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Visual inspection is the first stage of any electrical inspection and must be carried out before any testing takes place -- it identifies defects that could make testing dangerous or give misleading results.',
  'The consumer unit is the single most important item to inspect thoroughly: condition of enclosure, correct protective devices, labelling, adequate cable connections, signs of overheating, and compliance with current standards.',
  'Earthing and bonding defects are the most safety-critical findings -- missing or inadequate main bonding, deteriorated earth connections, and incorrect earthing arrangements can result in C1 (Danger Present) classifications.',
  'Every circuit and protective device must be correctly labelled and identified -- this is a regulatory requirement under BS 7671 and a common C3 observation on older installations.',
  'Elec-Mate provides a structured digital inspection checklist that ensures nothing is missed, with AI-assisted observation code classification and automatic schedule of inspections generation.',
];

const faqs = [
  {
    question: 'What is the difference between inspection and testing?',
    answer:
      'Inspection and testing are two distinct stages of the assessment process defined in BS 7671 Part 6. Inspection (Section 621) is a careful visual examination of the installation without the use of instruments -- looking at the condition, routing, and suitability of cables, the condition of accessories and equipment, the adequacy of earthing and bonding, labelling, and the general state of the installation. Testing (Section 622) uses calibrated instruments to measure electrical quantities: continuity, insulation resistance, earth fault loop impedance, RCD operation times, and others. Inspection must always be carried out before testing because visual defects can affect test results or make testing dangerous. For example, testing a circuit with visibly damaged insulation could cause a fault, and measuring Zs on a circuit with a loose earth connection gives a misleading result.',
  },
  {
    question: 'What items are on the Schedule of Inspections?',
    answer:
      'The Schedule of Inspections is a model form in Appendix 6 of BS 7671. It covers a comprehensive list of items grouped into categories: methods of protection against electric shock (including SELV, PELV, double insulation, and barriers), prevention of mutual detrimental influence, identification and notices (labelling of circuits, warning notices, circuit charts), cables and conductors (selection, routing, supports, protection against mechanical damage), general (presence of main switch, correct connection of accessories, condition of equipment), and items specific to the type of installation (special locations such as bathrooms, swimming pools, and outdoor installations). Each item is marked as compliant (tick), non-compliant (cross), or not applicable (N/A). Non-compliant items must be recorded as observations with the appropriate classification code.',
  },
  {
    question: 'How long should a visual inspection take?',
    answer:
      'The duration depends on the size and complexity of the installation. As a rough guide, a thorough visual inspection of a typical 3-bedroom house should take 45 minutes to 1 hour. A larger property with multiple distribution boards, outbuildings, or special locations will take longer. A small flat might take 30 to 45 minutes. The inspection should not be rushed -- it is the stage where many significant defects are found. Commercial installations take proportionally longer depending on the number of circuits, the complexity of the distribution system, and the number of special locations. Allow approximately 1 to 2 minutes per circuit as a minimum for the visual inspection of each circuit at the distribution board and at the endpoints.',
  },
  {
    question: 'What are the most common inspection findings?',
    answer:
      'The most frequently recorded observations during domestic electrical inspections are: lack of RCD protection on socket circuits (C2 -- Potentially Dangerous), missing or inadequate circuit identification and labelling (C3 -- Improvement Recommended), absence of main bonding to incoming services (C1 or C2 depending on the earthing arrangement), deteriorated or damaged cable insulation (C2 or C3 depending on severity), accessories with missing covers, cracked faceplates, or exposed terminals (C2), inadequate cable support and routing (C3), absence of fire stopping where cables pass through compartment walls or floors (C3 or C2), and overloaded socket outlets with adapters and extension leads (C3). The classification depends on the specific circumstances and the inspector must use professional judgement to determine the appropriate code.',
  },
  {
    question: 'Do I inspect the whole installation or just the new work?',
    answer:
      'It depends on the type of certificate being issued. For an EICR (Electrical Installation Condition Report), you inspect and test the entire fixed electrical installation within the agreed extent and limitations. For an EIC (Electrical Installation Certificate) for new work, you inspect and test the new work and verify that it does not adversely affect the safety of the existing installation. You are not required to carry out a full inspection of the entire existing installation when issuing an EIC for an addition or alteration. However, if you observe obvious defects in the existing installation during your work, you should record them and bring them to the client attention -- Regulation 634.2 of BS 7671 requires this.',
  },
  {
    question: 'What PPE do I need for an electrical inspection?',
    answer:
      'For visual inspection of a de-energised installation (which is the normal approach), the minimum PPE is: appropriate footwear, a torch or headlamp for inspecting dark areas (loft spaces, understairs cupboards, ceiling voids), insulated tools if you need to remove consumer unit covers or accessory faceplates, and appropriate clothing for accessing loft spaces and crawl spaces. If you need to carry out any work with the installation energised (for example, checking that RCDs can be operated while the circuits are live), you should wear arc-rated PPE appropriate to the prospective fault current at the point of work. GS 38 (BSEN 61243-3) compliant voltage indicators and proving units are essential for confirming that circuits are dead before working on them.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-explained',
    title: 'EICR Explained',
    description:
      'Complete guide to the Electrical Installation Condition Report -- what it covers, the process, and when it is needed.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description:
      'C1, C2, C3, and FI codes explained with real examples and guidance on correct classification.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-guide',
    title: 'Consumer Unit Change Guide',
    description:
      'Consumer unit replacement guide covering specification, installation, testing, and certification.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-tool-calibration',
    title: 'Tool Calibration Guide',
    description:
      'When and why to calibrate your test instruments, UKAS accredited labs, and calibration costs.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-handover-documentation',
    title: 'Handover Documentation',
    description:
      'What documents to provide at handover -- EIC, test results, O&M manual, and as-built drawings.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, the 2020 Regulations, and compliance deadlines.',
    icon: Home,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-inspection-matters',
    heading: 'Why Inspection Matters',
    content: (
      <>
        <p>
          Visual inspection is the foundation of every electrical assessment, whether you are
          carrying out an <SEOInternalLink href="/guides/eicr-explained">EICR</SEOInternalLink> on
          an existing installation or certifying new work with an EIC. It is not a formality or a
          tick-box exercise -- it is the stage where many of the most significant safety defects are
          identified.
        </p>
        <p>
          BS 7671 Section 621 requires that initial verification of every new installation begins
          with a careful visual inspection. Section 650 requires the same for periodic inspection
          and testing. The visual inspection must be carried out before any instruments are
          connected, for two critical reasons: first, testing a circuit with a visible defect
          (damaged insulation, loose connections, exposed conductors) can cause a fault or injury;
          second, test results from a circuit with a visual defect may be misleading and give false
          confidence about the safety of the installation.
        </p>
        <p>
          A thorough visual inspection requires knowledge, experience, and systematic attention to
          detail. You need to know what to look for, what the current standards require, and how to
          classify your findings correctly using the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code system
          </SEOInternalLink>
          . This guide provides a comprehensive checklist covering every area of a domestic and
          commercial electrical inspection.
        </p>
      </>
    ),
  },
  {
    id: 'visual-inspection',
    heading: 'Visual Inspection Items',
    content: (
      <>
        <p>
          The visual inspection covers every visible part of the fixed electrical installation. Work
          through the installation systematically, starting at the origin (intake position and main
          switch) and working outwards to the final circuits and endpoints. Here are the key items
          to check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intake position and meter</strong> -- condition of the service head and
                meter tails, adequacy of the main earthing terminal, condition of the meter
                enclosure, and accessibility of the main switch for emergency isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Presence of safety devices</strong> -- confirm that RCDs, MCBs, RCBOs,
                AFDDs, and SPDs are present where required by the current edition of BS 7671. Check
                that device ratings are appropriate for the circuits they protect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cables and conductors</strong> -- look for visible damage, deterioration,
                discolouration (signs of overheating), incorrect support intervals, inadequate
                mechanical protection, and cables installed in thermal insulation without
                appropriate derating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories and equipment</strong> -- check every socket outlet, switch,
                junction box, and item of fixed equipment for damage, signs of overheating, secure
                fixings, and correct polarity (where visible).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Eye className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire stopping</strong> -- where cables pass through fire-resistant walls,
                floors, and ceilings, the penetrations must be sealed with appropriate fire stopping
                material. Missing fire stopping is a common finding, particularly in converted
                properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Document every observation as you go. Do not rely on memory -- by the time you have
          inspected 30 circuits across a large property, you will not remember the details of the
          first five. Use a structured checklist or digital inspection tool that captures each
          finding in real time.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit-check',
    heading: 'Consumer Unit Inspection',
    content: (
      <>
        <p>
          The consumer unit (or distribution board) is the single most important item to inspect
          during any electrical assessment. It houses the protective devices for every circuit, it
          is the point where earthing and bonding are connected, and its condition directly affects
          the safety of the entire installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enclosure condition</strong> -- check for damage, signs of overheating
                (discolouration, melted plastic), water ingress, and adequate IP rating for the
                location. From January 2016, consumer units installed in domestic premises must be
                constructed of non-combustible material (typically metal).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective devices</strong> -- confirm correct type (MCB, RCBO, RCD, AFDD),
                correct rating for the circuit, correct type characteristic (B, C, or D for MCBs),
                and that devices are from a reputable manufacturer and properly type-tested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable connections</strong> -- where safe to do so (with the installation
                isolated), check for loose connections, signs of overheating at terminals, incorrect
                cable stripping lengths, and adequate conductor insulation within the enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Spare ways and blanking plates</strong> -- all unused ways must be fitted
                with blanking plates to maintain the IP rating of the enclosure. Missing blanking
                plates expose live busbars and are a safety hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit chart and labelling</strong> -- a circuit chart must be displayed
                inside or adjacent to the consumer unit, clearly identifying every circuit and its
                associated protective device. Check that the chart is accurate and legible.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When inspecting a{' '}
          <SEOInternalLink href="/guides/consumer-unit-change-guide">consumer unit</SEOInternalLink>
          , also note its age and type. Older rewirable fuse boards, early MCB boards without RCD
          protection, and plastic consumer units in domestic premises are all common observations
          that may require recommendations for upgrade.
        </p>
      </>
    ),
  },
  {
    id: 'bonding',
    heading: 'Earthing and Bonding Inspection',
    content: (
      <>
        <p>
          Earthing and bonding are the primary means of protection against electric shock from
          indirect contact (touching a conductive part that has become live due to a fault). Defects
          in the earthing and bonding system are the most safety-critical findings an inspector can
          make.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main earthing terminal</strong> -- verify that the main earthing terminal is
                present, in good condition, and correctly connected to the means of earthing (supply
                cable sheath for TN-C-S, earth electrode for TT systems). Check that the earthing
                conductor is the correct size (minimum 16mm2 copper for TN systems, 25mm2 for buried
                electrode connections).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main protective bonding</strong> -- bonding conductors must connect all
                extraneous-conductive-parts to the main earthing terminal. This includes incoming
                metal water pipe, incoming metal gas pipe, and any other metallic services entering
                the building. Minimum 10mm2 copper for most domestic installations (6mm2 where the
                main supply protective conductor is 16mm2 or less).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding</strong> -- required in some locations (notably
                bathrooms, though this may be relaxed where all circuits in the room have RCD
                protection and the main bonding is confirmed satisfactory). Check connections and
                conductor size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangement type</strong> -- identify and record the earthing
                arrangement (TN-C-S, TN-S, or TT). This determines the maximum Zs values for every
                circuit and affects the type of earth fault protection required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Missing main bonding is one of the most commonly reported C1 (Danger Present) or C2
          (Potentially Dangerous) observations. In older properties, it is common to find that
          bonding was never installed, that bonding conductors have been disconnected during
          plumbing or gas work, or that plastic replacements to metal pipes have broken the bonding
          continuity. Always trace the bonding conductors to confirm they are continuous and
          correctly connected.
        </p>
      </>
    ),
  },
  {
    id: 'labelling',
    heading: 'Labelling and Identification',
    content: (
      <>
        <p>
          BS 7671 requires that every circuit is identified at the distribution board and that
          appropriate warning and safety notices are displayed. Labelling is a frequent source of C3
          (Improvement Recommended) observations on older installations and is often overlooked even
          on new work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit identification</strong> -- every circuit must be identified at the
                distribution board with a durable, legible label. The labelling must match the
                circuit chart and clearly describe the circuit purpose and the area it serves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD test notice</strong> -- "This installation, or part of it, is protected
                by a device which automatically switches off the supply if an earth fault develops.
                Test quarterly by pressing the button marked 'T' or 'Test'."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual supply warning</strong> -- required where the installation is fed from
                more than one source (for example, mains and a generator, or mains and solar PV with
                battery storage). The notice warns that the installation has more than one source of
                supply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection notice</strong> -- must state the recommended date of
                the next periodic inspection and test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangement label</strong> -- identifying the type of earthing
                arrangement (TN-C-S, TN-S, or TT) at the main earthing terminal.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Missing or incorrect labelling is classified as C3 in most circumstances. However, if the
          absence of labelling creates a genuine safety risk -- for example, no dual supply warning
          on an installation with solar PV, or no circuit identification on a large commercial
          distribution board where incorrect isolation could cause danger -- a higher classification
          may be appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'cable-condition',
    heading: 'Cable Condition and Routes',
    content: (
      <>
        <p>
          Assessing cable condition is a critical part of the visual inspection. Cables are the
          arteries of the installation, and their condition directly affects safety. Look for the
          following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation condition</strong> -- look for cracking, brittleness,
                discolouration (indicating overheating or UV degradation), mechanical damage, and
                exposed conductors. Old rubber-insulated cables (common in pre-1960s installations)
                are particularly prone to insulation breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable support</strong> -- cables must be adequately supported at the
                intervals specified in the IET On-Site Guide. Unsupported cables are subject to
                strain at connections, can be damaged by contact with sharp edges, and may sag into
                contact with hot surfaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical protection</strong> -- cables in locations where they are
                vulnerable to mechanical damage must be protected (conduit, trunking, or appropriate
                cable type). Check that protection is continuous and that cables are not exposed at
                entry points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal insulation</strong> -- cables installed in or passing through
                thermal insulation must be derated or oversized. Check loft spaces where insulation
                is laid over cables -- this is a very common finding in domestic properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe zones</strong> -- cables concealed in walls should be installed within
                the safe zones defined in BS 7671 (vertically or horizontally from accessories) or
                protected by an RCD with a rated residual operating current not exceeding 30mA.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cable condition assessment requires access to as much of the installation as possible.
          Loft spaces, underfloor areas, ceiling voids, and risers should all be accessed and
          inspected where safely achievable. Any areas that cannot be accessed should be recorded as
          limitations on the inspection report.
        </p>
      </>
    ),
  },
  {
    id: 'accessories',
    heading: 'Accessories and Fixed Equipment',
    content: (
      <>
        <p>
          Every accessible accessory and item of fixed equipment should be visually inspected. This
          includes socket outlets, switches, fused connection units, junction boxes, light fittings,
          extractor fans, water heaters, and any other fixed electrical equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Physical condition</strong> -- check for cracked or broken faceplates, loose
                mounting, discolouration from overheating, and evidence of arc damage. Damaged
                accessories with exposed live parts are classified as C1 or C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correct installation</strong> -- check that accessories are appropriate for
                their location (IP rating for bathrooms and outdoor locations), correctly oriented,
                and securely fixed. Socket outlets in bathrooms are a common finding -- they must
                comply with the requirements of BS 7671 Section 701.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signs of overheating</strong> -- discoloured or melted plastic around
                terminals is a clear indicator of a loose connection or overloaded circuit. This is
                a potentially dangerous defect (C2) that requires investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Suitability for use</strong> -- check that accessories are appropriate for
                the expected use. A 13A socket outlet used to supply a fixed appliance that should
                be on a fused connection unit, or a domestic light switch used in a commercial
                environment, are examples of unsuitable accessories.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When inspecting accessories, open a sample of socket outlets and switches (where safe to
          do so with the circuit isolated) to check the internal connections. Loose terminals,
          insufficient conductor insulation stripped, and excessive bare conductor visible are
          common internal defects that are not visible from outside.
        </p>
      </>
    ),
  },
  {
    id: 'special-locations',
    heading: 'Special Locations',
    content: (
      <>
        <p>
          BS 7671 Part 7 identifies specific locations that require additional protective measures
          beyond the general requirements. During an inspection, pay particular attention to these
          areas:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathrooms (Section 701)</strong> -- check zone compliance for all equipment,
                IP ratings, supplementary bonding (if required), RCD protection, and the absence of
                socket outlets in zones 0, 1, and 2 (unless specifically permitted, such as shaver
                sockets to BS EN 61558-2-5).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gardens and outdoor areas (Section 714)</strong> -- check IP ratings for all
                outdoor equipment, RCD protection, cable burial depth and mechanical protection, and
                the suitability of equipment for the outdoor environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Swimming pools and hot tubs (Section 702)</strong> -- these are high-risk
                special locations with very specific zone requirements, equipment restrictions, and
                bonding requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric vehicle charging (Section 722)</strong> -- check that the EV
                charger installation complies with the dedicated requirements of Section 722,
                including protective measures, cable sizing, and isolation provisions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Special locations require knowledge of the specific Part 7 requirements. If you are unsure
          about the requirements for a particular special location, refer to BS 7671 Part 7 before
          carrying out the inspection. Recording an incorrect finding (or missing a genuine defect)
          in a special location can have serious safety consequences.
        </p>
      </>
    ),
  },
  {
    id: 'recording-findings',
    heading: 'Recording Your Findings',
    content: (
      <>
        <p>
          Every observation must be recorded clearly, with the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>{' '}
          and sufficient detail for the client (and any future electrician) to understand the
          finding and its significance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                C1
              </span>
              <span>
                <strong>Danger present</strong> -- risk of injury exists. Immediate remedial action
                required. The person responsible for the installation must be informed immediately,
                and the danger should be made safe before leaving site if possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-yellow-500 text-black font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                C2
              </span>
              <span>
                <strong>Potentially dangerous</strong> -- requires urgent remedial action. The
                defect does not present an immediate danger but could become dangerous under fault
                conditions or through deterioration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                C3
              </span>
              <span>
                <strong>Improvement recommended</strong> -- the installation does not comply with
                the current edition of BS 7671 but was likely compliant when installed. No immediate
                safety risk but improvement would enhance safety.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-500 text-white font-bold text-xs flex items-center justify-center mt-0.5 shrink-0">
                FI
              </span>
              <span>
                <strong>Further investigation</strong> -- the inspection has identified a potential
                issue that requires further investigation to determine its nature and
                classification. This is not a classification of the defect itself but a flag that
                more work is needed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For each observation, record: the location (room or area), the specific item or circuit
          affected, a clear description of the defect, the applicable regulation from BS 7671 (where
          relevant), and the classification code. Vague descriptions like "earthing inadequate" are
          unhelpful -- specify exactly what is inadequate and where. For example: "Main protective
          bonding conductor to incoming water pipe missing at point of entry (Reg 411.3.1.2) -- C2."
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate-inspection',
    heading: 'Elec-Mate for Electrical Inspections',
    content: (
      <>
        <p>
          Elec-Mate provides a structured digital inspection workflow that ensures nothing is missed
          and every finding is recorded professionally:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Structured Inspection Checklist</h4>
                <p className="text-white text-sm leading-relaxed">
                  Work through every item on the Schedule of Inspections with a digital checklist on
                  your phone. Tap compliant, non-compliant, or N/A for each item. Non-compliant
                  items automatically prompt you to add an observation with the correct
                  classification code.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Observation Classification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Describe the defect in plain language and Elec-Mate suggests the appropriate
                  classification code (C1, C2, C3, or FI) with the relevant BS 7671 regulation
                  reference. Built-in guidance helps you classify borderline findings correctly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Report Generation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your inspection findings, test results, and observations are compiled into a
                  professional EICR or EIC automatically. Export as a PDF and send to the client
                  from site. Every certificate is stored in the cloud for future reference.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Never Miss an Inspection Item"
          description="Structured digital inspection checklist with AI-assisted observation classification. Complete the full Schedule of Inspections on your phone. Professional EICR generated automatically. 7-day free trial."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalInspectionChecklistPage() {
  return (
    <GuideTemplate
      title="Electrical Inspection Checklist | What to Check"
      description="Comprehensive electrical inspection checklist for UK electricians. Visual inspection items, consumer unit checks, earthing and bonding, labelling, cable condition, accessories, and special locations. Digital inspection with Elec-Mate."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Electrical Inspection Checklist: <span className="text-yellow-400">What to Check</span>
        </>
      }
      heroSubtitle="A thorough visual inspection is the foundation of every EICR and EIC. This checklist covers every area you need to check: consumer unit, earthing and bonding, labelling, cable condition, accessories, and special locations. Use it with Elec-Mate's digital inspection tool to ensure nothing is missed."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Inspections"
      relatedPages={relatedPages}
      ctaHeading="Inspect with Confidence"
      ctaSubheading="Digital inspection checklist, AI observation classification, and automatic EICR generation. Join 430+ UK electricians using Elec-Mate on every inspection. 7-day free trial, cancel anytime."
    />
  );
}
