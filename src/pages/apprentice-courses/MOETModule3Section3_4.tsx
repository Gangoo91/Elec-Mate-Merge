/**
 * MOET · Module 3 · Section 3.3 · Subsection 4 — Trunking, Conduits and Cable
 * Management
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Different types of cables; their specifications and
 *      application."
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Trunking, Conduits and Cable Management - MOET Module 3.3.4';
const DESCRIPTION =
  'Comprehensive guide to cable containment systems for electrical maintenance technicians: trunking, conduit, cable tray, cable ladder, basket systems, installation methods, capacity calculations and BS 7671 compliance under ST1426.';

const quickCheckQuestions = [
  {
    id: 'conduit-capacity',
    question: 'What determines the maximum number of cables that can be drawn into a conduit?',
    options: [
      'The colour coding of the cable insulation within the conduit',
      'The number of bends in the conduit run only, regardless of cable size',
      'The cable factors must total no more than the conduit factor for that size, from On-Site Guide Appendix E',
      'The length of the conduit run, with longer runs allowing more cables',
    ],
    correctIndex: 2,
    explanation:
      'Conduit is sized by the factor method in Appendix E of the IET On-Site Guide: add the cable factors for the cables going in, then choose a conduit whose conduit factor equals or exceeds that total. Separate tables cover short straight runs and runs over 3 m or with bends. The space factor proper — 45% — is the underlying ratio the tables are built on. This ensures adequate air circulation for heat dissipation, prevents cable damage during installation (excessive friction), and allows future cables to be added or replaced. Overfilling conduit causes cable overheating, insulation damage and makes future maintenance extremely difficult.',
  },
  {
    id: 'trunking-segregation',
    question: 'Why must power and data cables be segregated in trunking systems?',
    options: [
      'To prevent electromagnetic interference from power cables inducing noise in data and signal cables (BS 7671 Reg 528.1)',
      'Because data cables carry a higher voltage than power cables and need isolation',
      'To make the trunking easier to fill to its full cross-sectional capacity',
      'Because mixing cable types causes the trunking to lose its earth continuity',
    ],
    correctIndex: 0,
    explanation:
      'BS 7671 Regulation 528.1 requires that where cables of different voltage bands share a common containment system, they must either be physically segregated by a barrier or partition, or each cable must be insulated for the highest voltage present. Power cables generate electromagnetic fields that can induce noise and interference in data, control and telecommunications cables, causing equipment malfunction. Segregated compartments in trunking or separate containment systems are the standard solutions.',
  },
  {
    id: 'conduit-type',
    question:
      'What is the key difference between heavy gauge (HG) and light gauge (LG) steel conduit?',
    options: [
      'LG conduit is threaded and used as a CPC, while HG conduit uses slip couplings and a separate CPC',
      'HG conduit has a thicker wall, can be threaded and used as a CPC; LG is thinner, slip-jointed and needs a separate CPC',
      'HG conduit is made from aluminium while LG conduit is made from galvanised steel',
      'LG conduit has a larger internal diameter than HG conduit of the same nominal size',
    ],
    correctIndex: 1,
    explanation:
      'Heavy gauge (HG) steel conduit (typically 1.6 mm wall thickness for 20 mm) has sufficient wall thickness to be threaded for screwed fittings and can serve as a circuit protective conductor (CPC) if the joints maintain reliable continuity. Light gauge (LG) conduit has thinner walls (typically 1.0 mm), uses slip-type (push-fit) couplings, and cannot reliably serve as a CPC — a separate earth conductor must be installed within it. HG is standard for industrial installations; LG is used in less demanding domestic and commercial work.',
  },
  {
    id: 'cable-tray',
    question: 'What maintenance consideration is most important for cable tray installations?',
    options: [
      'Ensuring the tray is painted to match the surrounding decor of the room',
      'Filling the tray to its maximum capacity to make best use of the space',
      'Removing all clips so cables can be repositioned freely along the tray',
      'Ensuring cables are supported and clipped, the tray is not overloaded, and spacing allows heat dissipation',
    ],
    correctIndex: 3,
    explanation:
      'Cable tray maintenance requires: verifying cables are correctly supported and clipped (unsupported cables sag and can be damaged); checking the tray is not overloaded (new cables added during modifications); ensuring cable spacing allows heat dissipation; verifying earth continuity of metallic trays; checking for physical damage to trays and cables; and confirming fire barriers are maintained where trays pass through fire compartment walls.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How does the IET On-Site Guide size a conduit for a given set of cables?',
    options: [
      'By derating the conduit to 40% of its rated current capacity',
      'By adding the cable factors and choosing a conduit whose conduit factor equals or exceeds the total',
      'By limiting the cables to 40% of the bore, regardless of run length',
      'By allowing one cable per 10 mm of conduit diameter',
    ],
    correctAnswer: 1,
    explanation:
      'Appendix E of the On-Site Guide gives a cable factor for each conductor size and a conduit factor for each conduit size: add the cable factors, pick a conduit that matches or exceeds the total. Tables E1/E2 cover short straight runs and E3/E4 runs over 3 m or with bends, so the same cables need a bigger conduit on a long or bendy run — which a flat percentage cannot express. The space factor underneath it all is 45%, not 40%. The purpose is the same: room to lose heat, and room to draw cables in and out. leaves space for future additions. For a 20 mm conduit with 15.1 mm internal diameter (179 mm squared area), the maximum cable fill is approximately 71 mm squared.',
  },
  {
    id: 2,
    question: 'PVC conduit is preferred over steel conduit when:',
    options: [
      'The conduit must serve as the circuit protective conductor for the circuit',
      'High mechanical impact resistance is the primary requirement for the location',
      'The installation is in a corrosive environment (chemical plants, swimming pools) or where a non-metallic, non-magnetic containment is required',
      'The installation is in a high-temperature area near furnaces or boilers',
    ],
    correctAnswer: 2,
    explanation:
      'PVC conduit is corrosion-resistant, non-conductive and non-magnetic. It is ideal for corrosive environments (chemical plants, swimming pools, food processing) where steel would corrode, and in locations near sensitive equipment where ferrous conduit could cause electromagnetic interference. However, PVC conduit cannot serve as a CPC, has lower mechanical impact resistance than steel, and softens at elevated temperatures.',
  },
  {
    id: 3,
    question: 'When installing trunking through a fire-rated wall or floor, you must:',
    options: [
      'Increase the trunking size at the penetration to allow more cable capacity',
      'Remove the trunking lid at the penetration so cables can move freely',
      'Leave a deliberate air gap around the trunking to allow ventilation',
      'Install a proprietary fire barrier within the trunking to restore the fire rating of the compartment',
    ],
    correctAnswer: 3,
    explanation:
      'Where trunking penetrates fire compartment walls or floors, the fire resistance of the wall must be maintained. Proprietary fire barriers (intumescent pillows, collars or fire-rated sealant) must be installed within the trunking at the penetration point. These systems expand when exposed to fire, sealing the trunking and preventing fire and smoke spread. Failure to maintain fire barriers is a common finding during fire risk assessments and can constitute a criminal offence.',
  },
  {
    id: 4,
    question: 'Cable basket (wire mesh) containment is increasingly used because:',
    options: [
      'It ventilates cables well, installs quickly, takes added cables easily, and is visible for inspection',
      'It offers the highest mechanical protection of all containment systems',
      'It can serve as the circuit protective conductor without a separate earth conductor',
      'It fully seals cables against water, dust and rodent ingress in all environments',
    ],
    correctAnswer: 0,
    explanation:
      'Cable basket (mesh tray) systems offer excellent ventilation, allowing cables to dissipate heat more effectively than enclosed trunking. They are quick to install, cables can be laid in without threading, and additional cables can be added easily during future modifications. The open design allows visual inspection of cables without removing covers. They are particularly popular in commercial buildings, data centres and raised floor installations.',
  },
  {
    id: 5,
    question:
      'The maximum distance between fixings for 20 mm heavy gauge steel conduit on a horizontal run is:',
    options: [
      '500 mm (0.5 m), with additional fixings within 100 mm of each accessory box',
      '1,750 mm (approximately 1.75 m), with additional fixings within 300 mm of each accessory box',
      '3,000 mm (3 m), with additional fixings within 600 mm of each accessory box',
      '5,000 mm (5 m), with no requirement for fixings near accessory boxes',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Table 4A (IET On-Site Guide) specifies maximum support spacings for conduit: 1,750 mm for 20 mm HG steel conduit on horizontal runs, with fixings within 300 mm of each accessory point (boxes, bends, tees). Vertical runs allow slightly greater spacing. Undersupported conduit sags, creates stress on joints, and can separate at couplings — particularly problematic when the conduit serves as a CPC.',
  },
  {
    id: 6,
    question: 'Dado trunking in commercial offices typically provides:',
    options: [
      'A high-current busbar distribution route running at ceiling level',
      'Mechanical protection for heavy SWA cables across open plant rooms',
      'Segregated compartments for power, data and telecommunications services at desk height, allowing flexible reconfiguration of workstations',
      'A corrosion-resistant route for cables in swimming pools and food plants',
    ],
    correctAnswer: 2,
    explanation:
      'Dado trunking (perimeter trunking) is installed at desk height (typically 450-500 mm from floor level) around the perimeter of commercial offices. It provides segregated compartments for power, data/LAN and telecommunications cabling, with snap-fit outlet plates for flexible positioning. This allows workstations to be reconfigured without rewiring — a significant advantage for maintenance and facilities management in modern offices.',
  },
  {
    id: 7,
    question: 'When adding new cables to existing conduit, the maintenance technician must:',
    options: [
      'Add the cables without any checks, as conduit has no fill limit',
      'Remove an existing cable for every new cable added to keep the count equal',
      'Increase the rating of the protective device to allow for the extra cables',
      'Check the existing fill against the space factor and the added heat load against grouping derating',
    ],
    correctAnswer: 3,
    explanation:
      'Adding cables to existing conduit requires checking: the current cable fill against the space factor; whether the new cable-factor total still fits the conduit factor for that size; the impact on grouping correction factors (more cables means more mutual heating, potentially derating all cables in the conduit); and whether the new circuit is compatible with existing circuits (voltage band segregation). This check is frequently overlooked during modification work, leading to overheated conduit runs.',
  },
  {
    id: 8,
    question: 'Galvanised cable ladder is used instead of cable tray when:',
    options: [
      'Heavy cables must be supported over long spans, where ladder beats tray on load and span',
      'A small number of light data cables need a quick, visible route across an open office',
      'Cables must be fully enclosed to protect them from dust, liquids and falling objects',
      'A neat, paintable surface route is needed for a single added socket-outlet circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Cable ladder has higher load-bearing capacity than perforated cable tray and can span longer distances between supports. It is used for heavy power cables (large SWA cables, HV cables) and for runs where long spans between fixing points are needed (across open plant rooms, between buildings). The open rung design also provides excellent ventilation. Cable ladder is standard for main cable routes in industrial installations, power stations and substations.',
  },
  {
    id: 9,
    question: 'Flexible conduit is used in maintenance applications for:',
    options: [
      'Long straight main cable routes across open plant rooms and vertical risers',
      'Final connections to vibrating or moving equipment, where rigid conduit would crack',
      'Surface-mounted lighting circuit additions in occupied commercial offices',
      'High-current power distribution between main switchboards and the sub-mains',
    ],
    correctAnswer: 1,
    explanation:
      'Flexible conduit (metallic or non-metallic) is used for final connections to vibrating equipment — motors, compressors, pumps, production machines — where rigid conduit would be subject to fatigue failure from continuous vibration. It also accommodates alignment tolerances during installation and allows limited equipment movement for maintenance access. Metallic flexible conduit provides EMC screening; non-metallic types are lighter but require a separate CPC.',
  },
  {
    id: 10,
    question: 'The earth continuity of a steel conduit system is verified by:',
    options: [
      'An insulation resistance tester applied between line and the conduit at 500 V',
      'A visual inspection of the conduit joints and couplings, with no measurement',
      'A low-resistance ohmmeter measuring R2 from the board earth terminal to the furthest accessory',
      'An earth fault loop impedance test taken only at the incoming supply position',
    ],
    correctAnswer: 2,
    explanation:
      'Where steel conduit serves as the CPC, its continuity must be verified by measurement using a low-resistance ohmmeter. The test measures the resistance from the distribution board main earth terminal to each accessory point via the conduit. This R2 value is used in the earth fault loop impedance calculation (Zs = Ze + R1 + R2). Poor joints, corroded fittings or damaged sections increase R2 and may prevent the protective device from operating within the required disconnection time.',
  },
  {
    id: 11,
    question: 'Mini-trunking is commonly used for:',
    options: [
      'Main cable distribution between switchboards carrying many large cables',
      'Supporting heavy SWA cables over long spans in industrial plant rooms',
      'High-current busbar distribution to multiple sub-distribution boards',
      'Neat surface-mounted additions of a few cables where chasing or lifting floors is impractical',
    ],
    correctAnswer: 3,
    explanation:
      'Mini-trunking (typically 16 x 16 mm to 40 x 25 mm) is the standard containment for surface-mounted wiring additions in occupied buildings. It provides a neat, paintable, accessible route for small numbers of cables (typically 1-4 singles) when concealed wiring is impractical. It is widely used for additional socket outlets, data points and lighting circuits in offices, retail premises and healthcare facilities. Self-adhesive and clip-fix versions are available.',
  },
  {
    id: 12,
    question: 'During periodic inspection, cable containment systems should be checked for:',
    options: [
      'Damage, corrosion, fixings, overloading, fire barriers, earth continuity and unauthorised additions',
      'The manufacturer and purchase date of each section of containment only',
      'Whether the containment colour matches the original architectural scheme',
      'The resale value of the metallic containment as recyclable scrap metal',
    ],
    correctAnswer: 0,
    explanation:
      'Cable containment inspection covers: physical condition (damage, corrosion, deformation); fixings (secure, adequate spacing, condition); cable fill (overloading from modifications); fire barriers (maintained at all penetrations through fire-rated walls and floors); earth continuity (metallic conduit and tray); segregation (power/data separation maintained); and any unauthorised additions or modifications that may not comply with BS 7671.',
  },
];

const faqs = [
  {
    question: 'How do I calculate the maximum number of cables in a conduit?',
    answer:
      'Calculate the total cross-sectional area of all cables (including insulation) using pi x r squared for each cable. Then compare against the Appendix E conduit factor for the size, remembering the space factor proper is 45% and that long or bendy runs use the E3/E4 tables. This total must not exceed the conduit factor for the sectional area. For example, a 20 mm HG conduit has an internal diameter of approximately 15.1 mm, giving an internal area of 179 mm squared. The maximum cable fill is 179 x 0.40 = 71.6 mm squared. A 2.5 mm squared PVC single has an overall diameter of approximately 4.1 mm (area 13.2 mm squared), so you could fit 5 cables maximum (5 x 13.2 = 66 mm squared).',
  },
  {
    question: 'Can I mix power and data cables in the same trunking?',
    answer:
      'Yes, but only if they are physically segregated by a solid barrier or partition within the trunking, or if all cables are insulated for the highest voltage present (BS 7671 Regulation 528.1). Most commercial trunking systems have integral compartments for this purpose. Without segregation, electromagnetic interference from power cables will degrade data signal quality, causing network errors and equipment malfunction. Fibre optic data cables are immune to electromagnetic interference and do not require segregation.',
  },
  {
    question: 'What is the difference between cable tray and cable ladder?',
    answer:
      'Cable tray is a flat, usually perforated, metal or GRP channel that supports cables along its length. Cable ladder has two side rails connected by cross-rungs, similar to a ladder. Ladder has higher load-bearing capacity and can span longer distances between supports, making it suitable for heavy cables and long spans. Tray provides continuous cable support and is better for smaller cables that might sag between ladder rungs. Industrial installations often use both — ladder for main cable routes and tray for branch runs.',
  },
  {
    question: 'How do I maintain fire barriers in cable containment?',
    answer:
      'Fire barriers must be inspected regularly and after any cable additions or modifications. Check that: intumescent materials are intact and undamaged; no gaps exist around cables or within the trunking; labels identifying the fire rating are legible; and that no unauthorised cables have been passed through the barrier without re-sealing. After adding cables, the fire barrier must be reinstated using materials compatible with the original installation. Fire barrier maintenance is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005.',
  },
  {
    question: 'When should I use stainless steel conduit instead of galvanised?',
    answer:
      'Stainless steel conduit is required in environments where galvanised steel would corrode: food processing plants (hygiene requirements), coastal locations (salt air), chemical plants (corrosive atmospheres), and cleanroom environments (particle shedding from corrosion). It is significantly more expensive than galvanised but provides a much longer service life in corrosive conditions. Stainless steel conduit can also serve as a CPC, provided all joints maintain reliable continuity.',
  },
];

const MOETModule3Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.3 · Subsection 4"
        title="Trunking, Conduits and Cable Management"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Cable containment systems, routing and management practices for industrial and
            commercial installations — the fill limits and fire-stopping rules that most bite during
            "just adding one more cable" modification work.
          </p>

          <TLDR
            points={[
              'Space factor is 45% (On-Site Guide). Conduit is sized by the Appendix E cable-factor / conduit-factor tables, not by a percentage.',
              'Segregation: power and data separated (BS 7671 Reg 528.1).',
              'Types: conduit, trunking, cable tray, ladder, basket.',
              'Fire safety: barriers at all penetrations through fire walls.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Circuit protection and earthing',

                gist: 'Fuses, circuit breakers, RCDs and RCBOs, earthing arrangements and protective bonding — what each device protects against and how fault current gets back to source.',

                where: '2.4',
              },

              {
                term: 'BS 7671 and where it sits',

                gist: 'The Wiring Regulations are a standard, not statute — compliance is how you demonstrate the EAWR duties have been met. Current edition 2018+A4:2026.',

                where: '1.4.3',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Select appropriate cable containment systems for different installation environments',
              'Size conduit and trunking using the On-Site Guide Appendix E factor tables',
              'Apply BS 7671 requirements for cable segregation in shared containment',
              'Explain the fire-stopping requirements at containment penetrations',
              'Identify conduit types (HG steel, LG steel, PVC) and their applications',
              'Carry out maintenance inspections of cable containment systems',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Conduit systems</ContentEyebrow>

          <ConceptBlock title="Conduit Systems">
            <p>
              Conduit is one of the oldest and most widely used cable containment methods in
              electrical installations. It provides mechanical protection for cables, can serve as a
              circuit protective conductor (in the case of heavy gauge steel), and allows cables to
              be drawn in and withdrawn for future modifications. Understanding conduit types,
              sizing and installation is a core competency for maintenance technicians.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">Conduit types</p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Jointing</th>
                    <th className="border border-white/10 px-3 py-2 text-left">CPC?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Heavy gauge (HG)</td>
                    <td className="border border-white/10 px-3 py-2">Galvanised steel</td>
                    <td className="border border-white/10 px-3 py-2">Screwed fittings</td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes, if continuity verified
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Light gauge (LG)</td>
                    <td className="border border-white/10 px-3 py-2">Galvanised steel</td>
                    <td className="border border-white/10 px-3 py-2">Slip couplings</td>
                    <td className="border border-white/10 px-3 py-2">No — separate CPC needed</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Rigid PVC</td>
                    <td className="border border-white/10 px-3 py-2">PVC</td>
                    <td className="border border-white/10 px-3 py-2">Solvent-weld or push-fit</td>
                    <td className="border border-white/10 px-3 py-2">No — separate CPC needed</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Flexible metallic</td>
                    <td className="border border-white/10 px-3 py-2">Spirally wound steel</td>
                    <td className="border border-white/10 px-3 py-2">Adaptors to rigid conduit</td>
                    <td className="border border-white/10 px-3 py-2">
                      Not reliable — separate CPC
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Stainless steel</td>
                    <td className="border border-white/10 px-3 py-2">316 stainless</td>
                    <td className="border border-white/10 px-3 py-2">Screwed fittings</td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes, if continuity verified
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Conduit sizing and space factor">
            <p>
              Two different methods get muddled here, so be careful which one you are using. The{' '}
              <strong>space factor</strong> is defined in the IET On-Site Guide as{' '}
              <strong>45%</strong> — the ratio of the summed overall cross-sectional areas of the
              cables to the internal area of the containment, with the trunking wall thickness taken
              into account.
            </p>
            <p>
              <strong>Conduit, though, is not sized by a percentage at all.</strong> Appendix E of
              the On-Site Guide sizes it by a factor lookup: every cable has a <em>cable factor</em>
              , every conduit size has a <em>conduit factor</em>, you add the cable factors and pick
              a conduit whose factor is equal or greater. Crucially the tables differ for short
              straight runs (E1/E2) and for runs over 3 m or with bends (E3/E4) — so the same cables
              need a larger conduit on a long or bendy run. A flat percentage cannot express that,
              which is why the 40% figure you will hear on site is a rule of thumb rather than the
              method.
            </p>
            <p>
              Either way the reason is the same: cables need room to lose heat, and someone has to
              be able to draw them in — and draw another one in later.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>20 mm conduit:</strong> Internal area approximately 179 mm squared; max
                cable fill 71 mm squared.
              </li>
              <li>
                <strong>25 mm conduit:</strong> Internal area approximately 277 mm squared; max
                cable fill 111 mm squared.
              </li>
              <li>
                <strong>32 mm conduit:</strong> Internal area approximately 466 mm squared; max
                cable fill 186 mm squared.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Conduit installation best practice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Support spacings:</strong> HG steel conduit — 1,750 mm horizontal, with
                fixings within 300 mm of every accessory point.
              </li>
              <li>
                <strong>Bending:</strong> Use a proper conduit bending machine; internal radius must
                not be less than 2.5 times the conduit diameter to prevent cable damage during
                pulling.
              </li>
              <li>
                <strong>Expansion joints:</strong> Required on long straight runs (over 9 m) of PVC
                conduit to accommodate thermal expansion — PVC expands approximately 6 mm per metre
                per 50 degrees C temperature change.
              </li>
              <li>
                <strong>Inspection fittings:</strong> Draw boxes or inspection bends required at
                regular intervals (typically every 10 m or after two right-angle bends) to allow
                cables to be drawn in.
              </li>
              <li>
                <strong>Drainage:</strong> External conduit runs must be arranged to allow moisture
                drainage; low points should have drain fittings to prevent water accumulation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Conduit accessories and fittings">
            <p>
              A complete conduit system requires a range of accessories for direction changes,
              junctions, terminations and access points. Selecting the correct fitting is essential
              for a compliant and maintainable installation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Through boxes:</strong> Allow cable access at straight runs; essential at
                regular intervals (every 10 m or after two right-angle bends) for cable drawing.
              </li>
              <li>
                <strong>Angle boxes:</strong> Provide access at 90-degree bends where space does not
                permit a swept bend; cables enter and exit at right angles.
              </li>
              <li>
                <strong>Tee boxes:</strong> Junction points where a branch conduit run meets a main
                run.
              </li>
              <li>
                <strong>Terminal boxes:</strong> End points where conduit meets a switch, socket
                outlet or other accessory; provide the mounting point for the faceplate.
              </li>
              <li>
                <strong>Adaptable boxes:</strong> Larger junction boxes with knockouts on all sides;
                used where multiple conduit runs converge or where a transition to trunking is
                needed.
              </li>
              <li>
                <strong>Couplings:</strong> Screwed (HG) or slip-type (LG) for joining conduit
                lengths; screwed couplings provide reliable earth continuity, slip couplings do not.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              When adding cables during maintenance modifications, always check the existing conduit
              fill. Adding just one more cable to an already full conduit can cause overheating of
              all cables in the run and violate the space factor requirement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Trunking systems</ContentEyebrow>

          <ConceptBlock title="Trunking Systems">
            <p>
              Trunking provides a larger-capacity containment system than conduit and is ideal for
              runs carrying multiple circuits. Unlike conduit, trunking allows cables to be laid in
              (rather than pulled through), making installation and modification significantly
              easier. Trunking ranges from small mini-trunking for surface additions to large
              floor-standing systems for main cable distribution.
            </p>
            <p>
              <strong>Trunking types and applications</strong> — mini-trunking (16 x 16 mm to 40 x
              25 mm; surface-mounted additions in occupied buildings; snap-on lid); dado trunking
              (multi-compartment perimeter trunking at desk height; power, data and telecoms
              segregation); skirting trunking (replaces standard skirting board; concealed cable
              route at floor level); floor trunking (cast into or laid on screed; flush floor boxes
              for power and data in open-plan offices); lighting trunking (overhead track systems
              for suspended luminaires in retail and commercial buildings); and power busbar
              trunking (pre-fabricated busbar systems for high-current distribution — see Section
              3.3.1).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Trunking capacity calculation">
            <p>
              Trunking uses the same factor method: Tables E5 and E6 of the On-Site Guide give a
              cable factor per conductor size and a trunking factor per trunking size. The 45% space
              factor sits underneath those tables, and the note to Table E6 sanctions working it out
              as a percentage of area directly for sizes or types the tables do not cover. For
              segregated trunking, each compartment is sized independently. When modifying an
              installation, always verify the existing trunking capacity before adding new cables —
              particularly in older buildings where trunking may already be at or near capacity.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Trunking accessories and fittings">
            <p>
              A complete trunking system uses a range of accessories to create a professional,
              functional installation. Understanding these components is important for maintenance
              and modification work.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Flat bends:</strong> 90-degree horizontal direction changes; internal radius
                must not damage cables.
              </li>
              <li>
                <strong>Internal and external bends:</strong> Vertical direction changes at walls
                and ceilings.
              </li>
              <li>
                <strong>Flat tees and crosses:</strong> Junction points for branch runs.
              </li>
              <li>
                <strong>Reducer fittings:</strong> Transition between different trunking sizes.
              </li>
              <li>
                <strong>End caps:</strong> Close off trunking ends to maintain IP rating and prevent
                pest entry.
              </li>
              <li>
                <strong>Fire barrier kits:</strong> Proprietary intumescent barriers for fire
                compartment penetrations.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Trunking installation and support"
            whatHappens={
              <>
                Correct installation of trunking is essential for both structural integrity and
                cable protection. Poorly supported trunking can sag, separate at joints, and allow
                covers to fall off — exposing cables and creating a safety hazard.
              </>
            }
            doInstead={
              <>
                Support spacings should follow the manufacturer's specification, typically 1.2-1.5 m
                for standard sizes, with additional supports within 300 mm of each change of
                direction, junction or termination. Wall fixings must suit the wall construction and
                the expected cable weight — a fully loaded 150 x 150 mm trunking run can weigh
                several kilograms per metre. Trunking sections must be aligned accurately at joints;
                misalignment creates edges that can damage cable insulation during installation.
                Metallic trunking sections must be bonded across joints using earth straps or
                bonding conductors if the joint does not provide reliable continuity, and lid clips
                or screws must be intact along the entire run — a missing section of lid exposes
                cables to damage and reduces the containment IP rating.
              </>
            }
          />

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              Segregation within trunking is not optional. BS 7671 Regulation 528.1 requires
              physical separation between circuits of different voltage bands. Many trunking systems
              have integral partitions for this purpose — ensure they are correctly installed and
              not removed during modifications.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Cable tray, ladder and basket systems</ContentEyebrow>

          <ConceptBlock title="Cable Tray, Ladder and Basket Systems">
            <p>
              Open containment systems — cable tray, cable ladder and cable basket — are the
              workhorses of industrial and commercial cable distribution. They offer excellent cable
              ventilation, easy cable addition and removal, visual accessibility for inspection, and
              the ability to carry high cable loads over long distances. Selecting the right system
              depends on the cable weight, environment and access requirements.
            </p>
            <div className="overflow-x-auto">
              <p className="mb-2 text-[13px] font-medium text-elec-yellow/80">
                Open containment comparison
              </p>
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">System</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Load capacity</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Perforated cable tray</td>
                    <td className="border border-white/10 px-3 py-2">Medium</td>
                    <td className="border border-white/10 px-3 py-2">
                      General distribution, branch routes, lighter cables
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cable ladder</td>
                    <td className="border border-white/10 px-3 py-2">Heavy</td>
                    <td className="border border-white/10 px-3 py-2">
                      Main cable routes, heavy SWA cables, long spans
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cable basket (mesh)</td>
                    <td className="border border-white/10 px-3 py-2">Light to medium</td>
                    <td className="border border-white/10 px-3 py-2">
                      Data cables, offices, quick installation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Fire stopping at containment penetrations"
            whatHappens={
              <>
                Every cable containment penetration through a fire-rated wall or floor must be
                fire-stopped to maintain the fire compartment integrity. This applies to conduit,
                trunking, cable tray and cable ladder.
              </>
            }
            doInstead={
              <>
                Proprietary fire barrier systems (intumescent pillows, batts, sealants or collars)
                must be installed and maintained. After any cable addition or removal through a fire
                barrier, the barrier must be reinstated immediately. Failure to maintain fire
                barriers is one of the most common findings during fire risk assessments and is a
                legal requirement under the Regulatory Reform (Fire Safety) Order 2005.
              </>
            }
          />

          <ConceptBlock title="Cable support on tray and ladder">
            <p>
              Cables on trays and ladders must be properly supported to prevent damage and maintain
              their current-carrying capacity. Poor cable management on open containment is a common
              maintenance issue.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-layer vs multi-layer:</strong> BS 7671 grouping factors differ
                significantly — cables in a single layer touching have a better derating factor than
                cables in trefoil or multi-layer arrangements.
              </li>
              <li>
                <strong>Clipping:</strong> Cables on horizontal trays should be secured with clips
                or ties at regular intervals (typically every 300 mm for small cables, 600 mm for
                larger SWA cables) to prevent movement.
              </li>
              <li>
                <strong>Vertical runs:</strong> Cables on vertical tray or ladder must be
                individually secured to prevent slippage — the cable weight can damage terminations
                at the top and glands at the bottom.
              </li>
              <li>
                <strong>Bend radii:</strong> Cable tray bends must accommodate the minimum bending
                radius of the largest cable in the run.
              </li>
              <li>
                <strong>Spare capacity:</strong> Good design practice reserves 20-30% of tray
                capacity for future cable additions during maintenance modifications.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Cable basket (wire mesh) systems">
            <p>
              Cable basket has become increasingly popular in commercial buildings, data centres and
              retail environments. Its open mesh construction offers several practical advantages
              for installation and maintenance.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ventilation:</strong> The open mesh provides excellent air circulation,
                allowing cables to dissipate heat more effectively than enclosed trunking — this can
                improve cable current ratings.
              </li>
              <li>
                <strong>Visibility:</strong> Cables are visible without removing covers, allowing
                quick visual inspection and easier cable identification during maintenance.
              </li>
              <li>
                <strong>Installation speed:</strong> Cables can be laid in from the top without
                threading; tool-free splice connectors join sections quickly.
              </li>
              <li>
                <strong>Flexibility:</strong> Basket can be field-cut and bent to accommodate site
                variations; no specialist bending tools required.
              </li>
              <li>
                <strong>Limitations:</strong> Lower mechanical protection than enclosed trunking;
                not suitable for areas where cables need protection from falling objects, liquids or
                rodents.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key point">
            <p className="text-elec-yellow/70">
              Metallic cable tray and ladder must be earthed and the earth continuity verified.
              Where sections are joined using standard fishplates and bolts, the joint resistance
              must be checked — corroded or poorly fitted joints can create high-resistance earth
              paths.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Maintenance and inspection of containment systems</ContentEyebrow>

          <ConceptBlock title="Maintenance and Inspection of Containment Systems">
            <p>
              Cable containment systems are often overlooked during maintenance, yet their condition
              directly affects cable safety and longevity. Corroded conduit, overloaded trunking,
              missing fire barriers and damaged cable tray are all common findings during periodic
              inspections. A systematic approach to containment maintenance prevents cable failures
              and ensures continued compliance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Containment inspection checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Physical condition:</strong> Damage, corrosion, deformation, missing covers
                or lids.
              </li>
              <li>
                <strong>Fixings:</strong> Secure, correct spacing, no missing clips or brackets.
              </li>
              <li>
                <strong>Cable fill:</strong> No overloading; space factor compliant; cables properly
                supported.
              </li>
              <li>
                <strong>Segregation:</strong> Power and data separation maintained; barriers in
                place.
              </li>
              <li>
                <strong>Fire barriers:</strong> Present and intact at all fire compartment
                penetrations.
              </li>
              <li>
                <strong>Earth continuity:</strong> Metallic conduit and tray tested for continuity.
              </li>
              <li>
                <strong>Modifications:</strong> All additions documented and compliant.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common maintenance issues">
            <p>
              The most common containment defects found during periodic inspections are: missing
              trunking lids (exposing cables to damage and reducing IP rating); corroded steel
              conduit in damp environments; overloaded cable trays following modifications; fire
              barriers removed or not reinstated after cable additions; and flexible conduit
              connections to motors that have fatigued and cracked due to vibration.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Documentation requirements">
            <p>
              All modifications to cable containment must be documented. This includes: updated
              cable route drawings; amended cable schedules showing new circuits; fire barrier
              reinstatement records; and any changes to conduit fill or trunking capacity. Without
              accurate documentation, future maintenance work becomes guesswork, increasing the risk
              of errors and non-compliance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Conduit system earth continuity">
            <p>
              Where heavy gauge steel conduit is used as the circuit protective conductor, the
              integrity of every joint in the conduit run is critical for safety. A single
              high-resistance joint can prevent the protective device from operating within the
              required disconnection time during an earth fault.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Testing method:</strong> Use a low-resistance ohmmeter to measure R2 from
                the distribution board earth terminal to the furthest accessory on each circuit.
              </li>
              <li>
                <strong>Acceptable values:</strong> The measured R2 must be consistent with the
                conduit length and cross-sectional area — unexpectedly high values indicate poor
                joints.
              </li>
              <li>
                <strong>Joint types:</strong> Screwed joints on HG conduit provide the most reliable
                continuity; slip couplings on LG conduit are not reliable for earth continuity.
              </li>
              <li>
                <strong>Remedial action:</strong> If conduit earth continuity is unsatisfactory,
                install a separate CPC within the conduit rather than attempting to improve joint
                continuity.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Containment labelling requirements">
            <p>
              Cable containment systems should be labelled to identify the circuits they carry and
              to provide warnings where necessary. This aids safe isolation and maintenance access.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit identification:</strong> Large trunking runs and cable trays
                carrying multiple circuits should have periodic labels identifying the circuits
                within — this prevents accidental disturbance of the wrong cable.
              </li>
              <li>
                <strong>Voltage warning:</strong> Where containment carries circuits at different
                voltages (e.g., LV and ELV in segregated compartments), labels must identify the
                voltage in each compartment.
              </li>
              <li>
                <strong>Fire barrier locations:</strong> Fire barriers within containment should be
                identified with labels showing the fire rating and the date of last inspection.
              </li>
              <li>
                <strong>Route markers:</strong> In large buildings with extensive containment
                routes, directional labels help maintenance technicians trace cable routes without
                opening every section of lid or cover.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Modification management"
            whatHappens={
              <>
                Every modification to a cable containment system — adding cables, removing cables,
                changing routes, or installing new containment — must be documented.
              </>
            }
            doInstead={
              <>
                Update cable schedules, route drawings, and fire barrier records for every change.
                Undocumented modifications are one of the most common causes of overloaded
                containment, missing fire barriers, and incorrect cable identification during future
                maintenance work.
              </>
            }
          />

          <ConceptBlock title="Note">
            <p className="italic">
              Under ST1426, maintenance technicians must be able to install, maintain and inspect
              cable containment systems. This includes selecting the correct containment for the
              application, calculating cable fill capacity, and ensuring compliance with BS 7671 and
              fire safety regulations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Special environments and future containment trends</ContentEyebrow>

          <ConceptBlock title="Special Environments and Future Containment Trends">
            <p>
              Different installation environments demand specific containment solutions. Corrosive
              atmospheres, high-temperature areas, clean rooms, hazardous zones and outdoor
              locations each present unique challenges that standard galvanised steel containment
              cannot address. Maintenance technicians must understand why a particular containment
              type was specified and ensure that replacements or additions maintain the same
              protection level.
            </p>
            <p>
              The containment industry is also evolving, with new materials and systems entering the
              market. Glass-reinforced plastic (GRP) containment is increasingly used in corrosive
              environments. Modular busbar trunking systems are replacing traditional cable
              distribution in some applications. Pre-fabricated cable management modules speed up
              installation on large projects. Understanding these trends prepares maintenance
              technicians for the systems they will encounter in modern installations.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Corrosive environments:</strong> Stainless steel or GRP containment;
                galvanised steel corrodes rapidly in chemical, coastal and food-processing
                environments.
              </li>
              <li>
                <strong>Hazardous areas (ATEX):</strong> Certified containment with sealed entries,
                flame-proof fittings and Ex-rated glands; incorrect containment in an Ex zone is a
                serious compliance failure.
              </li>
              <li>
                <strong>Clean rooms:</strong> Sealed, particle-free containment preventing
                contamination; no galvanised coatings (particle shedding); stainless steel or
                powder-coated systems.
              </li>
              <li>
                <strong>High temperature:</strong> Steel containment preferred over PVC (which
                softens above 60 degrees C); fire-rated cable clips for life-safety circuits.
              </li>
              <li>
                <strong>Outdoor/exposed:</strong> Hot-dip galvanised or marine-grade stainless;
                weatherproof cable glands; UV-resistant PVC.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emerging containment technologies">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Busbar trunking:</strong> Pre-fabricated power distribution systems
                replacing large SWA cable runs for high-current distribution; lower installation
                cost, easier modification, better heat dissipation.
              </li>
              <li>
                <strong>Modular cable management:</strong> Click-fit, tool-free containment systems
                reducing installation time; particularly popular in data centres and commercial
                fit-outs.
              </li>
              <li>
                <strong>Intelligent containment:</strong> Containment with integrated sensors
                monitoring temperature, cable fill and fire barrier integrity; providing real-time
                data to building management systems.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Containment selection decision factors">
            <p>
              When selecting containment for a new installation or replacing damaged containment
              during maintenance, several factors must be considered simultaneously to arrive at the
              correct specification.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable weight and number:</strong> Determines the structural requirement —
                light data cables can use basket; heavy SWA cables need ladder.
              </li>
              <li>
                <strong>Access requirements:</strong> Frequent cable additions favour trunking or
                tray (lay-in); infrequent access is acceptable with conduit (pull-through).
              </li>
              <li>
                <strong>Environmental conditions:</strong> Temperature, humidity, chemicals, UV
                exposure, mechanical risk — all determine material selection.
              </li>
              <li>
                <strong>Fire rating:</strong> Containment passing through fire compartments must be
                fire-stopped; some containment systems have integral fire barrier solutions.
              </li>
              <li>
                <strong>Aesthetic requirements:</strong> Visible containment in public areas may
                need mini-trunking or dado trunking rather than exposed cable tray.
              </li>
              <li>
                <strong>Cost and programme:</strong> Basket and tray are typically fastest to
                install; conduit and trunking require more labour but provide higher protection.
              </li>
              <li>
                <strong>Future expansion:</strong> Design for 20-30% spare capacity to accommodate
                future cable additions without requiring new containment runs.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Note">
            <p className="italic">
              When specifying replacement containment in special environments, always verify the
              original specification and the reasons for selecting that particular material and
              type. Substituting a cheaper alternative can compromise safety, compliance and the
              longevity of the cable installation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=G7G1d-aQyxw"

            title="Bending Plastic Conduit Like a Pro"

            channel="Toolbox Talk For Electricians"

            duration="1:29"

            topic="Getting a clean bend without kinking the bore"

            caption="Ninety seconds. A kinked bend is what turns a conduit run into one you cannot draw cables through."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Containment types: HG steel conduit (threaded, can be CPC); LG steel conduit (slip couplings, separate CPC needed); PVC conduit (corrosion-resistant, separate CPC needed); trunking (higher capacity, lay-in cables); cable tray (open, ventilated, medium loads); cable ladder (heavy loads, long spans).',
              'Space factor 45%; conduit sized by Appendix E factor tables (E1/E2 short runs, E3/E4 long or bendy runs).',
              'Segregation: power and data separated (Reg 528.1).',
              'Fire barriers at all compartment penetrations — reinstate after every cable addition.',
              'Earth continuity must be verified on metallic containment used as a CPC.',
              'Support spacings follow BS 7671 / IET On-Site Guide — undersupported containment sags, stresses joints and damages cables.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section3-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Terminations and Connectors
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section3-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Labelling and Identification Standards
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section3_4;
