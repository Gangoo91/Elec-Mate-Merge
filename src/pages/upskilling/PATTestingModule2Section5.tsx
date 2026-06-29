import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'patm2-s5-doublesquare',
    question:
      'You see a double-square symbol (a square nested inside another square) on a rating plate. What does it indicate?',
    options: [
      'Class I — protection by basic insulation plus an earthed CPC.',
      'Class II — protection by double or reinforced insulation.',
      'Class III — protection by limiting voltage to SELV.',
      'The IP (ingress-protection) rating of the enclosure.',
    ],
    correctIndex: 1,
    explanation:
      'The double-square (square within a square) is mandated by BS EN 61140 / BS EN 60335-1 Annex A for Class II equipment and is the inspector\'s primary visual cue to apply Class II test methodology — IR test on accessible conductive parts, no PE-continuity test. Recognising it triggers the Class II test sequence; missing it triggers Class I testing on what may be Class II equipment, which is a methodology error.',
  },
  {
    id: 'patm2-s5-classI-marking',
    question: 'Class I equipment is marked how, distinctively?',
    options: [
      'Always with a Roman numeral I enclosed in a circle.',
      'There is no required distinctive symbol — class is inferred from construction.',
      'With an earthed-conductor pictogram inside a warning triangle.',
      'With a five-pointed star alongside the rated voltage.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61140 / BS EN 60335-1 Annex A mandates symbols for Class II and Class III but does not mandate a distinctive Class I symbol. The class is inferred from construction (CPC connection at the supply, exposed conductive parts bonded to a protective conductor) and from the absence of Class II or Class III symbols. Equipment with a 3-pin plug whose CPC is genuinely terminated to internal earth and bonded to accessible parts is Class I — the "default" for mains-bonded equipment.',
  },
  {
    id: 'patm2-s5-multimarks',
    question:
      'Equipment shows BOTH a Class II symbol AND a "do not earth" symbol. What is the implication?',
    options: [
      'Conflicting markings — reject the equipment until resolved.',
      'It is Class II and must not have a protective earth applied.',
      'Apply both Class I and Class II test sequences to be safe.',
      'Treat it as historic Class 0 with no protective measure.',
    ],
    correctIndex: 1,
    explanation:
      'Symbols can stack to convey emphasis or specific warnings — Class II plus "do not earth" is a coherent statement, not a contradiction. Some Class II equipment (typically older or industrial tools) carries a "do not earth" marking specifically to warn against well-meaning modifications. Apply Class II testing; do not earth-bond the equipment.',
  },
  {
    id: 'patm2-s5-illegible',
    question:
      'Equipment markings are partially illegible due to wear. The double-square symbol is just visible; the manufacturer name and rating are gone. The construction is consistent with Class II (no exposed metal accessible parts, plastic casing, no CPC terminal). What is the response?',
    options: [
      'Reject the equipment outright on the illegible plate alone.',
      'Treat as Class II and log the marking degradation as a defect.',
      'Default to Class I testing because the plate is incomplete.',
      'Apply both Class I and Class II tests and record the lower result.',
    ],
    correctIndex: 1,
    explanation:
      'A degraded marking is a defect to remediate, not an automatic equipment rejection. Where the visible class indicator (the double-square) is consistent with the construction, the class is established and testing proceeds. Apply Class II tests, log the marking degradation as a recordable defect — the rating plate may need replacement for full PUWER Reg 6(3) record completeness — and decide based on test results.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which standard is the over-arching reference for the class symbols marking protection against electric shock on electrical equipment?',
    options: [
      'BS EN 61140 — protection against electric shock, common aspects.',
      'BS 7671, which defines the class symbols in its appendices.',
      'The IET Code of Practice for In-Service Inspection and Testing.',
      'PUWER 1998, which prescribes the shape of the class markings.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 61140 sets the over-arching framework for the protective classes and their symbols; the BS EN 60335 series gives appliance-specific requirements. BS 7671, the IET CoP and PUWER all reference these product standards rather than originating the symbols.',
  },
  {
    id: 2,
    question: 'What does the Class II "double-square" symbol actually consist of?',
    options: [
      'A single filled square, indicating a sealed double-insulated enclosure with no accessible conductive parts.',
      'A triangle nested inside a square, combining the warning triangle with the enclosure outline.',
      'Two concentric unfilled squares — a smaller square outline nested inside a larger one (the "square within a square").',
      'Two overlapping diamonds, distinguishing double insulation from the single-diamond Class III marking.',
    ],
    correctAnswer: 2,
    explanation:
      'The Class II marking is two concentric outlined squares — a small square inside a larger one. It is one of the inspector\'s primary cues that an item is double-insulated and should be tested as Class II.',
  },
  {
    id: 3,
    question: 'How is Class III (SELV) equipment typically marked?',
    options: [
      'With the double-square symbol plus the SELV voltage printed alongside it.',
      'With a Roman numeral III enclosed in a diamond, often beside the rated SELV voltage (e.g. "12 V").',
      'With a circle containing a diagonal slash, indicating it must not be connected to mains.',
      'With a warning triangle and the letters "SELV" printed beneath it.',
    ],
    correctAnswer: 1,
    explanation:
      'The Roman III in a diamond is the canonical Class III marking. Together with the SELV voltage rating it tells the inspector to apply Class III methodology — verify the SELV supply, then a formal visual and functional check on the item.',
  },
  {
    id: 4,
    question:
      'Which set of information is required on a rating plate under BS EN 60335-1 and equivalent appliance standards?',
    options: [
      'Manufacturer and model only, with all other attributes left to the conformity declaration sheet.',
      'Voltage and current only, since those are the parameters the test instrument actually needs.',
      'The class symbol alone, on the basis that the protective class fixes every other parameter.',
      'Manufacturer, model, voltage, current/power, frequency, class and IP where applicable, plus CE/UKCA.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 60335-1 Annex A prescribes a structured set of mandatory marks, not just one or two attributes. The rating plate is a self-disclosure of the safety case; a plate missing required elements is itself a defect, because the traceability evidence is incomplete even if the equipment is safe.',
  },
  {
    id: 5,
    question:
      'An item has no visible class symbol, but a 3-pin BS 1363 plug with the CPC terminated to a metal internal earth point and the metal casing bonded. What is the class?',
    options: [
      'Class I — the bonded CPC is the Class I architecture, and no distinctive Class I symbol is required.',
      'Class II — the absence of a marking means double insulation must be assumed until proven otherwise.',
      'Class III — equipment without a class symbol defaults to the SELV regime for testing.',
      'Cannot be determined — without a printed class symbol the item must be failed pending manufacturer data.',
    ],
    correctAnswer: 0,
    explanation:
      'Class I is often identifiable from construction alone — CPC connection, bonded accessible parts, no double-insulation symbol. BS EN 61140 does not mandate a distinctive Class I symbol, so its absence is normal and not a defect. Apply Class I tests.',
  },
  {
    id: 6,
    question: 'What do IP rating markings (e.g. IP44, IP54) tell the inspector?',
    options: [
      'The protective class against electric shock, encoded as two digits.',
      'The rated voltage and current, with the first digit being voltage band and the second current band.',
      'The ingress-protection rating — resistance to solid objects and to water.',
      'The certification authority and the year the conformity assessment was carried out.',
    ],
    correctAnswer: 2,
    explanation:
      'IP rating and protective class are independent attributes. An item can be Class II and IP54 — double insulation AND protection against splashing water. The IP rating drives the environment check during the formal visual inspection.',
  },
  {
    id: 7,
    question: 'What does the CE / UKCA mark on a rating plate indicate?',
    options: [
      'That the item is Class II, as only double-insulated equipment is marked.',
      'The rated voltage band the equipment was conformity-assessed for.',
      'The protective class, as a manufacturer declaration rather than a symbol.',
      'A conformity declaration that the item meets the relevant regulations.',
    ],
    correctAnswer: 3,
    explanation:
      'CE and UKCA are conformity declarations, not class indicators. Equipment can be CE/UKCA-marked at any class. The marks are read alongside the class symbol; both are needed for a complete compliance picture.',
  },
  {
    id: 8,
    question:
      'An item is marked with the double-square symbol, IPX5, the CE mark, and "230 V ~ 50 Hz, 1500 W". What should the inspector conclude?',
    options: [
      'Test as Class I — continuity-test the earth pin before anything else.',
      'Class II construction; IPX5 rated against water jets; 230 V, about 6.5 A.',
      'Test as Class III — the SELV regime applies because of the IPX5 rating.',
      'Reject it — a double-square with an IP rating is a contradictory marking.',
    ],
    correctAnswer: 1,
    explanation:
      'A complete rating plate gives the inspector everything: class drives the test method, IP rating drives the environment check, and the 230 V / 1500 W figures drive the load test. Every element of the plate informs the inspection.',
  },
  {
    id: 9,
    question: 'What does the "do not earth" symbol seen on some Class II equipment look like?',
    options: [
      'A warning triangle containing an earth pictogram, flagging earthing as hazardous.',
      'A plain square with a diagonal line through it, a cancelled double-square.',
      'A pentagon enclosing the earth-pin pictogram, the "isolated earth" marking.',
      'The earth pictogram inside a circle with a diagonal slash through it.',
    ],
    correctAnswer: 3,
    explanation:
      'The "no earth" symbol is a circle-and-slash over the earth pictogram. It appears on Class II tools where adding an earth wire would be a mistake, and warns against the temptation to do so during repair or modification.',
  },
  {
    id: 10,
    question:
      'Why is correct class identification at the rating-plate stage non-negotiable for in-service testing?',
    options: [
      'Because class drives every test that follows, so mis-classification mis-aims the whole sequence.',
      'Because the certificate cannot be issued with the class field blank, whatever tests were run.',
      'Because class sets the asset-register category and retest interval, the main administrative driver.',
      'Because insurers require class recorded, though it does not change the test method applied.',
    ],
    correctAnswer: 0,
    explanation:
      'Class drives the test, the acceptance values and the pass/fail interpretation. Get class wrong and everything downstream is wrong. Reading the plate, identifying the class and selecting the matching test sequence is the foundational step of every formal inspection.',
  },
];

const PATTestingModule2Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Identifying class by markings and labels | PAT Module 2.5 | Elec-Mate',
    description:
      'Reading the rating plate. BS EN 61140 / BS EN 60335-1 Annex A class symbols (Class I, Class II double-square, Class III SELV diamond), IP ratings, CE / UKCA marks, and how the rating plate drives the test sequence.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5"
            title="Identifying appliance class by markings and labels"
            description="Reading the rating plate. BS EN 61140 and BS EN 60335-1 Annex A prescribe the class symbols. The plate also carries IP rating, voltage, current, frequency, conformance marks. Every element informs the inspection."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 61140 and BS EN 60335-1 Annex A prescribe the class marking symbols on rating plates.',
              'Class II = double-square (a square within a square). Distinctive, unambiguous, universally recognised.',
              'Class III SELV = Roman numeral III in a diamond, often with rated SELV voltage alongside.',
              'Class I has NO mandated distinctive symbol — it is identified by construction signals (CPC connection at supply, bonded accessible parts) plus the ABSENCE of Class II or Class III markings.',
              'The rating plate must also carry: manufacturer, model, serial / batch where required, rated voltage, rated current or power, rated frequency, IP rating where applicable, CE / UKCA conformance marks.',
              'IP rating (e.g. IP44, IP54) is independent of class. It indicates ingress protection against solids and water — drives the formal-visual environment check, not the test sequence.',
              'A degraded / illegible rating plate is a recordable defect. Where construction signals confirm class, testing proceeds and the marking issue is logged for remediation.',
              'Mis-classifying at the rating-plate stage is the single most common methodology error — every subsequent test is then aimed at the wrong protective architecture.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite BS EN 61140 and BS EN 60335-1 Annex A as the standards that prescribe class markings on equipment',
              'Recognise the BS EN 61140 Class II double-square symbol on sight and use it to drive the test sequence',
              'Recognise the BS EN 61140 Class III SELV symbol (Roman III in diamond) and the implications for test methodology',
              'Identify Class I equipment by construction signals (CPC connection, bonded accessible parts) where no class symbol is provided',
              'Read additional rating-plate elements — IP rating, voltage, current, frequency, conformance marks — and explain how each informs the inspection',
              'Resolve degraded / illegible markings — log as recordable defect, identify class from construction signals where possible, escalate where not',
              'Use the rating-plate as the entry point for every formal inspection, recognising that class identification is the foundation of the test',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What the rating plate must contain</ContentEyebrow>

          <ConceptBlock
            title="The mandatory rating-plate elements"
            plainEnglish="A rating plate is a structured set of mandatory information. BS EN 60335-1 Annex A and equivalent appliance standards prescribe what must be present. Each element informs a different part of the inspection — class drives the test, IP rating drives the environment check, voltage / current drive the load test."
            onSite="Read the rating plate first. Before any instrument test, before any visual inspection of the body, READ THE PLATE. The plate is the equipment\'s self-disclosure of its safety case; the inspection verifies what the plate claims."
          >
            <p>Mandatory rating-plate elements (per BS EN 60335-1 Annex A and equivalents):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Manufacturer / brand name.</strong> Identifies the responsible undertaking.
                Required for traceability.
              </li>
              <li>
                <strong>Model / type designation.</strong> Specific product identification. Required
                for cross-referencing manufacturer documentation, recall lists, parts.
              </li>
              <li>
                <strong>Serial / batch number</strong> where the standard requires it (most consumer
                and industrial equipment). Required for individual unit traceability.
              </li>
              <li>
                <strong>Rated voltage</strong> (e.g. "230 V ~"). The supply voltage the equipment is
                designed for. Single-phase or three-phase indication where relevant.
              </li>
              <li>
                <strong>Rated current OR rated power</strong> (sometimes both). E.g. "1500 W" or
                "6.5 A". Drives the load-test acceptance and any fuse-rating cross-check at the
                plug.
              </li>
              <li>
                <strong>Rated frequency</strong> (e.g. "50 Hz" or "50/60 Hz"). Most UK equipment is
                50 Hz; some equipment imported or repaired with international parts may be 50/60 Hz.
              </li>
              <li>
                <strong>Class symbol where applicable.</strong> Class II double-square or Class III
                diamond. Class I has no mandated distinctive symbol.
              </li>
              <li>
                <strong>IP rating where applicable</strong> (e.g. "IP44"). Ingress protection
                against solids and water.
              </li>
              <li>
                <strong>Conformance markings.</strong> CE / UKCA marks indicating regulatory
                conformity. Sometimes additional standards references (BS EN 60335-2-X for
                appliance-specific standards).
              </li>
              <li>
                <strong>Applicable standards reference</strong> where required (e.g. specific BS EN
                reference for the appliance category).
              </li>
              <li>
                <strong>Date of manufacture or year code</strong> on much equipment, to support
                age-driven risk assessment.
              </li>
            </ul>
            <p>
              The plate is dense by necessity. Each element answers a specific inspection question.
              Reading the plate fluently is one of the practical skills that distinguishes
              experienced inspectors.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60335-1:2012+A2:2019 · Annex A (Marking of appliances)"
            clause={
              <>
                Appliances shall be marked with the manufacturer\'s name, trade mark or
                identification mark; the model or type reference; the rated voltage or rated voltage
                range in volts; the symbol for nature of supply (~ for ac); the rated power input or
                rated current; the rated frequency in hertz; the class of protection against
                electric shock (where applicable); the IP rating (where applicable); and any other
                markings required by the relevant clauses.
              </>
            }
            meaning="The standard prescribes WHAT must be on the plate. The 'where applicable' qualifications are deliberate — Class I has no required class symbol because the construction itself is the indicator; IP rating is mandatory only on equipment claiming a specific ingress protection. The standard is a minimum; many manufacturers add date codes, batch numbers, and additional information."
          />

          <SectionRule />

          <ContentEyebrow>The class symbols</ContentEyebrow>

          <ConceptBlock
            title="Class II — the double square"
            plainEnglish="Two concentric squares — a smaller square nested inside a larger one — both unfilled (just outline). The most distinctive class symbol. Mandated by BS EN 61140 and BS EN 60335-1 Annex A for all Class II equipment. Once seen, easily recognised."
          >
            <p>Visual characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Two concentric squares, outlined (not filled).</li>
              <li>The inner square is centred within the outer square.</li>
              <li>The size is proportional to the rating plate but consistently visible.</li>
              <li>
                Usually placed near the manufacturer information or the rating data, in a clearly
                visible position.
              </li>
              <li>
                Sometimes accompanied by additional warnings ("do not earth", "double insulated",
                etc.) to emphasise the Class II construction.
              </li>
            </ul>
            <p>Where to look:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The rating plate is usually on the underside of the equipment, on the rear, or under
                a battery cover.
              </li>
              <li>
                For appliances with detachable parts (e.g. kettles with detachable bases), the plate
                may be on the base, the kettle body, or both.
              </li>
              <li>For hand tools, often on the side of the body, behind the trigger area.</li>
              <li>For IT equipment / power supplies, on the underside or rear of the unit.</li>
            </ul>
            <p>
              Inspectors should make rating-plate examination an explicit step in their formal
              visual workflow. Some plates are weathered, dirty, or partly obscured — clean gently
              if needed and use a torch / phone light. The double-square symbol is robust even on
              degraded plates.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Class III — the SELV diamond"
            plainEnglish="A Roman numeral III enclosed in a diamond shape. Indicates Class III equipment intended for connection to a SELV supply. Sometimes accompanied by a stylised safety isolating transformer symbol indicating the type of supply expected."
          >
            <p>Visual characteristics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A Roman III (three vertical lines, sometimes with serifs) inside a diamond outline.
              </li>
              <li>
                Often accompanied by the rated SELV voltage (e.g. "12 V", "24 V", "12 V dc") placed
                alongside.
              </li>
              <li>
                On equipment that requires a specific safety isolating transformer source, the
                stylised "transformer" symbol (a representation of two windings with double-line
                separation) may be present.
              </li>
            </ul>
            <p>
              The Class III SELV symbol on equipment tells the inspector to (a) verify the supply is
              genuinely SELV, (b) apply the Class III methodology (formal visual + functional check
              on the SELV equipment), and (c) NOT apply 500 V dc IR or PE-continuity tests to the
              SELV side.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Class I — identified by construction"
            plainEnglish="There is no required distinctive symbol for Class I equipment in BS EN 61140. Class I is identified by construction signals: a CPC connection at the supply (the green-and-yellow conductor terminates to the equipment\'s internal earth point), bonded accessible conductive parts, and the ABSENCE of Class II or Class III markings."
          >
            <p>Construction signals for Class I:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Three-conductor flex with green-and-yellow CPC, terminating to an internal earth
                point on the equipment.
              </li>
              <li>
                Metal casing or accessible conductive parts that are bonded to the internal earth
                point.
              </li>
              <li>
                A 3-pin plug whose CPC is genuinely connected (not just a token connection for
                socket-shutter operation).
              </li>
              <li>No double-square symbol on the rating plate.</li>
              <li>No Class III SELV symbol on the rating plate.</li>
            </ul>
            <p>
              The construction-based identification works because Class I is the "default" for
              mains-bonded equipment with metal accessible parts. If the equipment has a functional
              CPC bonded to its accessible parts, it IS Class I — regardless of whether anyone
              explicitly marked it as such. The risk is the equipment that LOOKS Class I (3-pin
              plug, metal casing) but actually has Class II construction internally; this is where
              the rating plate becomes decisive.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>IP rating, conformance marks, and other indicators</ContentEyebrow>

          <ConceptBlock
            title="IP rating — independent of class"
            plainEnglish="The IP (Ingress Protection) rating tells you what the equipment is rated to keep out. Two digits: the first is solid-particle ingress protection; the second is water ingress protection. IP44 means 'protected against solid objects > 1 mm AND against splashing water'. The IP rating is independent of the protective class against electric shock."
          >
            <p>Common IP ratings encountered in PAT:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Rating</th>
                    <th className="text-left text-white/80 py-2">Solid (1st digit)</th>
                    <th className="text-left text-white/80 py-2">Water (2nd digit)</th>
                    <th className="text-left text-white/80 py-2">Typical use</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IP20</strong>
                    </td>
                    <td>Fingers (≥ 12.5 mm)</td>
                    <td>None</td>
                    <td>Indoor general use</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IP44</strong>
                    </td>
                    <td>1 mm wires</td>
                    <td>Splashing water</td>
                    <td>Bathrooms, kitchens, outdoor sheltered</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IP54</strong>
                    </td>
                    <td>Dust ingress limited</td>
                    <td>Splashing water</td>
                    <td>Industrial / outdoor</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IP55</strong>
                    </td>
                    <td>Dust ingress limited</td>
                    <td>Water jets</td>
                    <td>Heavy-duty outdoor / washdown</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IP65</strong>
                    </td>
                    <td>Dust-tight</td>
                    <td>Water jets</td>
                    <td>Outdoor / washdown / industrial</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>IP67</strong>
                    </td>
                    <td>Dust-tight</td>
                    <td>Temporary immersion</td>
                    <td>Wet / submerged use</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The IP rating drives the formal-visual environment check: is the equipment being used
              in conditions consistent with its IP rating? An IP20 fan heater used outside in a
              rain-exposed location is misuse — the inspection flags it regardless of any electrical
              defect. An IP65 industrial drill used outdoors is correctly applied. The IP rating is
              one of the four factors driving frequency under IET CoP §7 (environment).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="CE / UKCA conformance marks"
            plainEnglish="The CE mark (and UKCA from 2021) indicate the manufacturer declares the equipment conforms to relevant European or UK regulations — for electrical equipment, primarily the Low Voltage and Electromagnetic Compatibility regulations. The marks are the gateway to legal placement on the market; equipment without them was not lawfully placed on the UK market and is a procurement defect."
          >
            <p>The conformance landscape:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>CE mark</strong> — European Conformity. Required for products placed on the
                EU market and (until 2024 / staged transition) on the UK market for many product
                categories.
              </li>
              <li>
                <strong>UKCA mark</strong> — UK Conformity Assessed. The post-Brexit replacement for
                CE on goods placed on the UK market for many product categories. Transition
                arrangements vary; many manufacturers continue to use CE on UK-market goods where
                permitted.
              </li>
              <li>
                <strong>UKNI mark</strong> — for goods placed on the Northern Ireland market
                requiring UK conformity assessment by a UK Notified Body.
              </li>
              <li>
                <strong>Standards reference (e.g. "BS EN 60335-2-3")</strong> — the specific
                appliance standard the manufacturer declares conformity with. The appliance-specific
                second-tier standards (the "-2-" series under BS EN 60335) are often the operational
                reference for manufacturer test-house verification.
              </li>
            </ul>
            <p>
              For PAT, the conformance marks are evidence of the equipment\'s legitimate market
              entry. Their absence is a procurement defect (equipment may not be safe; equipment may
              be counterfeit; equipment may pre-date current standards). A well-marked plate with
              current conformance is a positive starting position; a missing plate or missing marks
              is a flag for further investigation.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reading the plate in practice</ContentEyebrow>

          <ConceptBlock
            title="A worked example — the kitchen fan oven"
            plainEnglish="Walk through a typical rating plate to see how every element informs the inspection. The plate is the equipment\'s safety self-disclosure; the inspection verifies what the plate claims."
            onSite="Build rating-plate reading into your formal-visual workflow. Two minutes spent reading the plate properly saves later confusion and is the foundation of correct test-method selection."
          >
            <p>Example plate on a 1.8 kW kitchen fan oven (built-in unit):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Manufacturer:</strong> Acme Appliances Ltd
              </li>
              <li>
                <strong>Model:</strong> FO-1800-X
              </li>
              <li>
                <strong>Serial:</strong> SN-2024-001234
              </li>
              <li>
                <strong>Rated voltage:</strong> 230 V ~ (single-phase ac)
              </li>
              <li>
                <strong>Rated power:</strong> 1800 W
              </li>
              <li>
                <strong>Rated frequency:</strong> 50 Hz
              </li>
              <li>
                <strong>Class symbol:</strong> (none visible) — Class I, inferred from construction
                (3-conductor supply with bonded metal chassis)
              </li>
              <li>
                <strong>IP rating:</strong> IPX4 — protected against splashing water
              </li>
              <li>
                <strong>Conformance:</strong> CE mark, UKCA mark
              </li>
              <li>
                <strong>Standards:</strong> BS EN 60335-2-6 (appliance standard for cooking ranges)
              </li>
              <li>
                <strong>Date code:</strong> 2024
              </li>
            </ul>
            <p>From this plate, the inspector deduces:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Class I.</strong> Apply Class I PAT methodology — PE-continuity test
                (acceptance 0.1 Ω + flex contribution), IR test live to earth pin (≥ 1 MΩ),
                functional / load test.
              </li>
              <li>
                <strong>1800 W at 230 V ≈ 7.8 A.</strong> The equipment\'s plug should be fitted
                with a 13 A fuse (next standard size up from the 7.8 A operating current, per IET
                CoP §10 / BS 1362). Check the fuse rating at formal visual.
              </li>
              <li>
                <strong>IPX4</strong> rated. Acceptable for use in a kitchen environment with
                splashing water; verify the equipment is sited in such an environment and the seals
                / gaskets are intact.
              </li>
              <li>
                <strong>2024 date code.</strong> Equipment is new; first PAT cycle uses Table 7.1
                starting frequency (light commercial / kitchen — typically annual to bi-annual for
                stationary cooking appliances).
              </li>
              <li>
                <strong>BS EN 60335-2-6</strong> conformance. Manufacturer test-house verification
                done for cooking-range-specific safety case. Reference the appliance standard for
                any acceptance values not in the IET CoP.
              </li>
            </ol>
            <p>
              Each plate element drives a specific inspection action. Reading the plate competently
              is reading the inspection plan.
            </p>
          </ConceptBlock>

          <Scenario
            title="The unmarked import"
            situation="An import warehouse receives a consignment of small heaters. The rating plates carry only the manufacturer name (in Chinese characters) and the rating '230 V 50 Hz 2000 W'. No class symbol. No IP rating. No CE / UKCA marks. No BS EN reference. The duty-holder asks the inspector to PAT-test the items so they can be put into staff-area service."
            whatToDo="Refuse the test until the conformance question is resolved. Equipment without CE / UKCA marking has not been lawfully placed on the UK market. Class cannot be reliably determined from construction without further investigation, and in the absence of conformance marks the equipment could be counterfeit, pre-standard, or actively non-compliant. The defendable response: withdraw, refer to procurement, treat as a supply-chain compliance issue rather than a PAT issue. Do not commission. The legal exposure of putting unmarked equipment into service is on the duty-holder regardless of whether subsequent PAT testing produces passing readings."
            whyItMatters="A passing PAT reading is not the same as a complete safety case. Conformance marks are part of the safety case. Equipment without them is a procurement issue first, a PAT issue only if and when conformance is established. The PAT inspector\'s role includes flagging plate-completeness defects, not just running tests on whatever is presented."
          />

          <CommonMistake
            title="Skipping rating-plate examination at formal visual"
            whatHappens="The inspector goes straight to the instrument test, plugging the equipment into the PAT tester and selecting Class I or Class II based on a quick glance at the plug. The Class II symbol on the rating plate (placed on the underside, not visible without lifting the equipment) is missed. The inspector applies Class I tests; the PE-continuity reading is 'open' because there is no CPC; the inspector either logs a fail or notes no-CPC and moves on without applying Class II IR. The actual Class II protective measure is never verified."
            doInstead="Make rating-plate examination an explicit checklist step. Lift the equipment, find the plate, READ it. Two minutes of plate reading saves later confusion and ensures the test methodology matches the equipment construction. The plate is the equipment\'s self-disclosure of its protective architecture; the inspection verifies what the plate claims."
          />

          <CommonMistake
            title="Treating an illegible plate as automatic equipment rejection"
            whatHappens="The inspector finds equipment whose rating plate is partly weathered. The Class II symbol is just visible; the rating data is illegible. The inspector marks the equipment as fail / withdraw. In fact, the visible class symbol plus consistent construction (plastic casing, no CPC terminal, no exposed accessible metal in the safety sense) confirms Class II, and the equipment can be tested. The rating-data illegibility is a recordable defect to remediate, not a basis for blanket rejection."
            doInstead="Use the visible signals plus the construction to establish class. Where the visible class indicator is consistent with construction, the class is established. Test accordingly. Log the marking degradation as a recordable defect — the rating plate may need replacement (manufacturer-supplied or from the original documentation) for full PUWER Reg 6(3) record completeness. Decide based on test results."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class identification — the foundation</ContentEyebrow>

          <ConceptBlock
            title="Why class identification is non-negotiable"
            plainEnglish="Module 2 has set out three protective architectures (Class I, II, III) and one non-accepted historic class (Class 0). Each has a distinct test methodology in the IET CoP. The class identification, anchored on the rating-plate signals, is the foundation of every test that follows. Get class wrong, and every subsequent test is mis-aimed."
          >
            <p>The class-identification workflow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Locate the rating plate. (If absent or illegible, escalate.)</li>
              <li>
                Look for the Class II double-square symbol. If present and construction is
                consistent with Class II, classify as Class II.
              </li>
              <li>
                Look for the Class III SELV diamond / III-in-diamond symbol. If present, classify as
                Class III.
              </li>
              <li>
                If neither symbol is present, examine construction: is there a CPC connection at the
                supply, with the CPC terminating to an internal earth point bonded to accessible
                conductive parts? If yes, classify as Class I. If no, escalate (could be Class II
                without explicit marking, or Class 0 — both require further investigation).
              </li>
              <li>
                Verify class against any equipment-specific manufacturer documentation if available.
              </li>
              <li>
                Apply the matching IET CoP test sequence. Class I = PE-continuity + IR. Class II =
                IR (or substitute leakage). Class III = supply verification + functional check.
              </li>
              <li>
                Record class on the test record alongside the test results. The class is part of the
                equipment\'s register entry and the per-cycle record.
              </li>
            </ol>
            <p>
              Module 3 will cover the test methods in detail. Module 4 will cover acceptance values
              and frequencies. Module 5 will cover records and certification. All three build on the
              class identification established here in Module 2. The rating plate is where every
              formal inspection starts.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS EN 61140 + BS EN 60335-1 Annex A prescribe the class symbols. Read them on the rating plate.',
              'Class II = double-square (square within a square). Distinctive, unambiguous.',
              'Class III SELV = Roman III in a diamond. Often with rated SELV voltage alongside.',
              'Class I has NO mandated distinctive symbol. Identified by construction (CPC + bonded accessible parts) plus absence of Class II / III markings.',
              'Rating plate also carries: manufacturer, model, serial, voltage, current / power, frequency, IP rating, CE / UKCA marks, applicable standards.',
              'IP rating is independent of class. Drives the environment check (is equipment used in conditions consistent with its rating?).',
              'CE / UKCA marks are conformance evidence. Their absence is a procurement defect — equipment may not have been lawfully placed on the UK market.',
              'Illegible plate is a recordable defect. Where construction signals confirm class, testing proceeds and the plate issue is logged for remediation.',
              'Rating-plate examination is an explicit step in the formal visual. Two minutes of plate reading sets up the entire test sequence.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is the Class I marking required on equipment rating plates?',
                answer:
                  'No. BS EN 61140 / BS EN 60335-1 Annex A do not mandate a distinctive Class I symbol. Class I is identified by construction signals (CPC connection at supply, bonded accessible parts) plus the absence of Class II or Class III markings. Many manufacturers do not explicitly mark Class I; some use a "Class I" text marking voluntarily.',
              },
              {
                question: 'What does the double-square symbol mean?',
                answer:
                  "Class II — protection by double or reinforced insulation. The symbol is two concentric squares (a smaller square nested inside a larger one), both unfilled. It is the inspector's primary visual cue to apply Class II test methodology: IR test on accessible conductive parts (acceptance ≥ 2 MΩ at 500 V dc), no PE-continuity test (no CPC by design).",
              },
              {
                question: 'What does the IP rating tell me?',
                answer:
                  'Ingress Protection rating — first digit is solid-particle ingress (0-6, with 6 meaning dust-tight); second digit is water ingress (0-9, with higher numbers meaning more water exposure). IP44 = protected against 1 mm objects and splashing water. The rating tells you the conditions the equipment is designed for, which drives the formal-visual environment check (is it being used in conditions consistent with its rating?).',
              },
              {
                question: 'CE mark and UKCA mark — what do they signify?',
                answer:
                  'Conformity declarations. The manufacturer (or importer) declares the equipment conforms to relevant regulations — for electrical equipment, primarily the Low Voltage Regulations and the Electromagnetic Compatibility Regulations. CE is the European Conformity mark; UKCA is the UK Conformity Assessed mark introduced post-Brexit. Both are gateways to lawful market placement; equipment without them is a procurement defect.',
              },
              {
                question: 'I cannot find the rating plate on a piece of equipment — what do I do?',
                answer:
                  'Look harder. Plates are often on undersides, rears, behind battery covers, or inside removable compartments. Use a torch / phone light and gently move the equipment to access concealed surfaces. If the plate is genuinely absent (lost / damaged / never present), escalate to manufacturer documentation if available, or treat as a procurement / records defect — the equipment may need plate replacement before being put into service.',
              },
              {
                question: 'What if the rating plate is partly illegible?',
                answer:
                  'Use the visible signals to establish what you can. If the class symbol is visible and consistent with construction, class is established. Log the illegibility as a recordable defect for follow-up. Significant illegibility (e.g. only manufacturer name visible, no class / rating data) escalates to plate replacement or equipment withdrawal until the safety case can be reconstructed from documentation.',
              },
              {
                question:
                  'A piece of equipment shows the Class II double-square AND a 3-pin BS 1363 plug — which class is it?',
                answer:
                  'Class II. The class symbol on the rating plate takes precedence. The 3-pin plug is required to operate UK socket-outlet shutters (BS 1363 design); the third pin may or may not be electrically connected internally. The construction is what matters, and the plate marking is the authoritative class indicator. Apply Class II test methodology.',
              },
              {
                question: 'How does class identification connect to the rest of the PAT regime?',
                answer:
                  "It is the foundation. Class drives the test method (Module 3 will cover methods in detail). Class drives the acceptance values (Module 4 covers acceptance values per class). Class drives the records (Module 5 covers what records each class requires). Mis-classifying at the rating-plate stage propagates through every subsequent step — the wrong tests are applied, the wrong acceptance values are checked, and the actual protective architecture is never verified. Rating-plate reading is the inspector's first analytical step.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Identifying class by markings — Module 2.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3 — Test methods
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default PATTestingModule2Section5;
