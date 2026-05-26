/**
 * Module 3 · Section 4 · Sub 3 — Exposed conductive parts
 * Maps to City & Guilds 2365-02 / Unit 203 / LO4 / AC 4.3
 *   AC 4.3 — "Identify exposed conductive parts"
 *
 * Frame: What counts as exposed-conductive-part in BS 7671 Part 2?
 * Not what most apprentices think. Definition + real examples + Class II exception.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Exposed conductive parts | Level 2 Module 3.4.3 | Elec-Mate';
const DESCRIPTION =
  'Exposed-conductive-parts in BS 7671 Part 2 — the metalwork of equipment that is not normally live but can become live under fault conditions. The Class II exception nobody learns properly.';

const checks = [
  {
    id: 'm3-s4-sub3-define-ecp',
    question:
      'Per BS 7671 Part 2, an exposed-conductive-part is best described as:',
    options: [
      'That access is safe, ladders are secured and extend above the platform, and stairways are clear',
      'It determines the magnitude of the earth fault current and therefore whether the protective device will operate within the required time',
      'A conductive part of equipment that can be touched and is NOT normally live but which CAN become live under fault conditions.',
      'Own up to it, put it right properly at your own expense, document the corrective action, and treat it as CPD — what went wrong and how to stop it recurring.',
    ],
    correctIndex: 2,
    explanation:
      'BS 7671 Part 2 — verbatim definition. The two qualifying conditions: (a) it’s a conductive part of equipment, touchable by ordinary use; (b) it’s not normally live but CAN become live in a fault. Both must apply. A copper pipe carrying water isn’t equipment. A double-insulated drill housing can’t become live under a single fault. Neither qualifies.',
  },
  {
    id: 'm3-s4-sub3-class-ii',
    question:
      'A double-insulated (Class II) appliance is fitted with a moulded plug that has only line and neutral pins (no earth pin). Why is this compliant — and what symbol identifies the appliance?',
    options: [
      'Insurance covering claims arising from professional advice, designs, specifications or instructions that cause financial loss. Electricians need it when providing design services, specifications, technical advice, or any advisory work beyond pure installation.',
      'Class II equipment uses double or reinforced insulation as protection against electric shock instead of relying on a CPC connection. The square-within-a-square symbol (concentric squares) marks the appliance as Class II — it has no exposed-conductive-parts requiring CPC connection.',
      '75 degrees from the horizontal — the 1:4 rule. The base sits one unit out from the wall for every four units of vertical height. So for a ladder reaching 4m up the wall, the base sits 1m out. Steeper than 75 degrees and the ladder is liable to topple backwards; shallower and the feet can slip out.',
      'The principal contractor must ensure that waste is managed in accordance with the waste hierarchy, that waste is properly segregated and stored on site, and that waste removal arrangements are in place',
    ],
    correctIndex: 1,
    explanation:
      'Double insulation provides two layers of protection between live parts and any touchable surface, so the surface can never become live under a single fault. No exposed-conductive-part = no CPC required. The symbol (BS EN 60417-5172) is two concentric squares — see it on Class II drills, hairdryers, kettles, hairclippers, etc.',
  },
  {
    id: 'm3-s4-sub3-back-box',
    question:
      'You’re fitting a metal-clad single switched socket on a kitchen wall. The CPC has been pulled into the back-box but not connected to the back-box’s earth terminal — only to the socket’s earth terminal. Is this compliant?',
    options: [
      'Selling a non-MCS install means the customer can never claim SEG even later, may struggle to evidence compliance during a house sale, and may face insurance issues. The MCS install is also covered by the MCS workmanship warranty scheme. The cost difference is small and the protection is significant.',
      'Reading the supply (TN type, declared Ze, PSCC, intake fuse), reading the brief (current loads, foreseeable future loads, customer constraints), then working circuit by circuit from Ib through device through Zs to a consolidated schedule.',
      'Verification of correct cable terminations, torque checks on all connections, correct protective device ratings and settings, correct phase rotation, clean interior free of debris, secure panel fixings, and functional interlocks',
      'No — both the metal back-box AND the metal socket faceplate are exposed-conductive-parts. Each must be connected to the CPC, normally via a fly-lead or via the fixing screws securing a metal faceplate to a metal back-box (provided that connection is verified by continuity test).',
    ],
    correctIndex: 3,
    explanation:
      'A metal back-box is itself an exposed-conductive-part — it can become live if the line conductor inside chafes through to it. Standard practice: a green/yellow earth fly-lead from the back-box earth terminal to the socket earth terminal, OR (where a metal faceplate is securely fixed to a metal back-box by metal screws) the screws themselves can serve as the connection if continuity is verified. All-plastic back-box + plastic socket = no fly-lead needed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of these is NOT an exposed-conductive-part?',
    options: [
      'To ensure it is working correctly and give confidence the circuit is dead',
      'A copper water pipe carrying mains water through the kitchen.',
      'Negative stress that overwhelms coping ability and impairs functioning',
      'Continuity test showing higher than expected resistance',
    ],
    correctAnswer: 1,
    explanation:
      'A copper water pipe is part of the plumbing, not the electrical installation. It might be an extraneous-conductive-part (if it could introduce a potential — see Sub 4.4), but it’s not part of equipment, so it isn’t an exposed-conductive-part. The shower casing, fan body and SWA armour are all parts of equipment that can become live under fault — all three qualify.',
  },
  {
    id: 2,
    question:
      'Why is the Class II symbol (concentric squares) important for an apprentice to recognise on site?',
    options: [
      'Investigate, record it in the accident book / near-miss log, review the safe-isolation procedure, brief the team, and use it as a positive learning event',
      'Continuously adjusts the operating voltage and current of the PV array to extract maximum power under varying irradiance and temperature conditions',
      'It tells you the appliance has been double-insulated by the manufacturer to provide protection without relying on a CPC — so you don’t add an earth wire to the casing thinking you’re improving safety.',
      'Correct material and csa per Reg 543, secure connection at MET (BS 951 clamp) with a label per Reg 514.13.1, and protection against mechanical/corrosion damage',
    ],
    correctAnswer: 2,
    explanation:
      'Adding an earth wire to a Class II appliance is at best pointless and at worst dangerous — if you compromise the double insulation while wiring in your "improvement", you’ve removed the only protection the appliance had. Recognise the symbol, leave it alone.',
  },
  {
    id: 3,
    question:
      'The metal armour of an SWA cable is used as the CPC on a sub-main run. The armour is itself an exposed-conductive-part. What two requirements does this set?',
    options: [
      'Complete an arc flash risk assessment, determine the incident energy level, select appropriate arc-rated PPE, establish arc flash boundaries, and have a safe system of work in place',
      'The responsible person must establish appropriate procedures to be followed in the event of serious and imminent danger, nominate competent persons, and ensure persons are able to stop work and go to a place of safety',
      'A four-step breathing pattern (inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts) that activates the parasympathetic nervous system to reduce stress and restore calm',
      'The armour must be sized to handle the prospective fault current (Reg 543.1.3 / Table 54.7 calculations) AND must be reliably terminated at both ends with appropriate SWA glands and earth tags so its continuity back to the MET is guaranteed.',
    ],
    correctAnswer: 3,
    explanation:
      'When the armour is doubling up as both the cable’s mechanical protection AND the CPC, it has to be sized for the fault current it might carry (so it doesn’t melt before the protective device clears the fault) and it has to be solidly connected at every termination via the gland’s earth tag. Loose glands = broken CPC.',
  },
  {
    id: 4,
    question:
      'A pendant ceiling rose has been fitted with no earth core — the previous electrician just connected line and neutral. The fitting is plastic, suspended from a plastic rose, with a Class II lampholder. Is this compliant under Reg 411.3.1.1?',
    options: [
      'Yes — Reg 411.3.1.1 has one specific exception: a lampholder having no exposed-conductive-parts and suspended from such a point. An all-plastic Class II pendant from an all-plastic rose meets that exception.',
      'Domestic loft spaces and cellars can be confined spaces if they are substantially enclosed with foreseeable risks such as poor ventilation and gas accumulation',
      'A notice served by the fire authority prohibiting or restricting the use of all or part of the premises because the use involves a risk of death or serious injury to relevant persons that is so serious that the use should be prohibited or restricted',
      'Fixed mindset (Dweck) \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\u2014 assuming ability is static and there is nothing more to learn prevents growth and may mean their practice becomes outdated',
    ],
    correctAnswer: 0,
    explanation:
      'Verbatim from 411.3.1.1: "A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point." That’s the one exception. Note the practical reality: most modern installs still pull an earth core to every rose so future occupants can fit a metal pendant without a rewire.',
  },
  {
    id: 5,
    question:
      'A consumer unit replacement quote includes "fit metal-bodied CU and earth all metal back-boxes throughout flat". Why is the back-box earthing line item necessary specifically because the CU is metal?',
    options: [
      'The electrician should investigate, identify the water damage as the cause, explain that the fault was caused by an external factor (not workmanship), document the findings, and offer a paid repair while advising the client to address the plumbing issue first',
      'Metal CUs (as required by Amendment 3 onwards in domestic) are exposed-conductive-parts in their own right — but the regulation also drives consistent earthing practice across the property, and any metal back-box anywhere in the installation should already have been earthed regardless of CU material. The line item makes the existing requirement explicit in the quote.',
      'Leave it in place. Reg 701.415.2 ALLOWS omission when all three conditions are met (ADS, RCDs, main bonding) — but it doesn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t require removal of existing compliant bonding. Existing supplementary bonds add a layer of redundancy at no cost; removing them creates work and risk for no safety benefit.',
      'Strictly there\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s no formal pre-requisite — anyone can sit 2391-52 if they can pass the exam and practical. In practice most providers expect candidates to hold C&G 2365-03 (or equivalent NVQ Level 3) and to have meaningful site experience. AM2 isn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t formally required but is the strong norm because the practical content assumes installation competence.',
    ],
    correctAnswer: 1,
    explanation:
      'Every metal back-box has always been an exposed-conductive-part requiring CPC connection — that didn’t change with Amendment 3. The metal CU just made the principle highly visible. Quoting it as a line item ensures the customer understands what’s being inspected and reconnected during the upgrade.',
  },
  {
    id: 6,
    question:
      'Two exposed-conductive-parts are within arm’s reach of each other in a kitchen — the metal extractor hood and the stainless steel sink (where the sink is itself supplied via a bonded electrical pump). BS 7671 calls these "simultaneously accessible". What does the regulation require?',
    options: [
      'Yes — a client can fulfil these roles provided they have the necessary skills, knowledge, experience and organisational capability',
      'A hospital operating theatre or a process plant where supply continuity matters more than instant disconnection.',
      'Each must be connected to the same earthing system, individually, in groups or collectively (Reg 411.3.1.1).',
      'The employer must review and update the first aid needs assessment to reflect the new hazard',
    ],
    correctAnswer: 2,
    explanation:
      '411.3.1.1: "Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively." The point is to prevent dangerous touch voltage between them during a fault — both at the same potential = no current through the person bridging them.',
  },
  {
    id: 7,
    question:
      'You see a stainless steel splashback fitted behind a hob. There’s no electrical equipment within it. Is the splashback an exposed-conductive-part?',
    options: [
      'Affixed inside the CU door (for the immediate user reference) plus included in the handover pack as a stand-alone document. Future fault diagnosis depends on accurate circuit-to-board labelling at the CU itself.',
      'Power restored, all covers refitted, labels updated, customer briefed, work area swept and waste removed, certificate left with customer or emailed, and instruments returned to vehicle',
      'Intervene to stop the immediate behaviour if safe to do so, support the apprentice, and report the incident through the appropriate grievance or welfare channels',
      'No — it’s not part of any electrical equipment, so it can’t become live under a fault. It might be an extraneous-conductive-part (if it could introduce a potential from elsewhere — Sub 4.4 covers that), but it isn’t exposed.',
    ],
    correctAnswer: 3,
    explanation:
      'The two BS 7671 categories are mutually exclusive in this sense: exposed-conductive-parts come from electrical equipment; extraneous-conductive-parts come from outside the installation (pipework, structure, anything that could introduce a potential). A standalone splashback is neither — usually no bonding required because it isn’t connected to anything that could introduce a potential.',
  },
  {
    id: 8,
    question:
      'On site you find an old all-metal-cased radiator-style heater plugged into a 13 A socket. Looking at the casing there’s no Class II symbol and the supply lead has three cores (L, N and E). What does the green/yellow earth core inside the heater connect to, and why?',
    options: [
      'It connects to the metal casing of the heater. The casing is an exposed-conductive-part — Class I equipment requires CPC connection so a fault from the heating element to the casing causes fault current to flow back through the CPC and trip the protective device.',
      'The designer must adopt the safer alternative unless the cost is grossly disproportionate to the risk reduction achieved — a 15% cost increase for eliminating a moderate risk is unlikely to be grossly disproportionate',
      'A heat loss calculation to BS EN 12831 (or equivalent) for the property, sized to meet the design heat load at the design external temperature, with emitter sizing for low flow temperatures',
      'Application of the rating factor (Ca) for thermal insulation per BS 7671 Appendix 4 — Method 100 (cable surrounded by insulation) typically applies a 0.5 derating, requiring larger CSA. Visual inspection checks the design accounts for installation method.',
    ],
    correctAnswer: 0,
    explanation:
      'Class I equipment relies on a CPC connection from the casing back to the MET. The casing IS the exposed-conductive-part — if the live element shorts to it, the fault current flows back via the earth core and the protective device trips. Without that earth core, the casing sits at line voltage waiting for someone to touch it.',
  },
];

const faqs = [
  {
    question: 'What’s the simplest way to remember the definition?',
    answer:
      'Three things must all be true. (a) It’s a conductive part — metal that can carry current. (b) It’s part of equipment — not the building structure or plumbing. (c) It’s not normally live but can become live in a fault. Tick all three and it’s an exposed-conductive-part. Miss one and it’s something else (extraneous, structural, or simply not in scope).',
  },
  {
    question: 'Does every metal accessory need a CPC then?',
    answer:
      'Yes — with the single Class II pendant exception in Reg 411.3.1.1. Metal back-box, metal switch plate, metal socket plate, metal CU enclosure, metal junction box, motor casing, luminaire body — every one of them needs a CPC connection back to the MET. Plastic accessories don’t (because there’s no exposed-conductive-part to earth), but if a plastic accessory is fitted into a metal back-box, the back-box still needs its own earth.',
  },
  {
    question: 'Why is double-insulated equipment treated differently?',
    answer:
      'Class II equipment provides two independent layers of insulation between live parts and any touchable surface. For an exposed-conductive-part to become live, BOTH layers would need to fail simultaneously — vanishingly rare. So Class II is treated as inherently safe without needing a CPC connection. The trade-off is that you can’t modify Class II equipment without compromising the double insulation, which is why you don’t add earth wires "just in case".',
  },
  {
    question: 'How do I confirm an SWA armour is acting as a CPC properly?',
    answer:
      'Three checks. First, that the armour CSA is large enough for the prospective fault current (Reg 543.1.3 / Table 54.7 calculation, or by Adiabatic equation). Second, that the SWA glands are correctly fitted with banjo earth tags or directly bonded earth lugs at every termination — loose glands = broken CPC. Third, R2 continuity test from the MET out to the equipment’s earth terminal at the far end of the run, value within manufacturer / design expectations. Module 7 covers the full test routine.',
  },
  {
    question: 'What about exposed metal that’s purely structural — RSJs, beams, lintels?',
    answer:
      'A structural RSJ isn’t equipment, so it can’t be an exposed-conductive-part. But it might be an extraneous-conductive-part if it could introduce a potential into the installation — particularly if it spans into ground via foundations and creates a parallel earth path. Sub 4.4 covers the test for that. The two categories don’t overlap.',
  },
  {
    question: 'I’ve seen an old installation with no earth at all on the lighting circuit. What now?',
    answer:
      'Pre-1966 installations sometimes wired lighting in 2-core (no CPC) on the basis that all the accessories were Class II / non-metallic. On an EICR today this would typically be a C2 — potentially dangerous — because any future replacement of a fitting with a metal one creates an unearthed exposed-conductive-part with no easy fix. The recommendation is rewiring of the lighting circuit so the CPC is available at every point.',
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 3"
            title="Exposed conductive parts"
            description="Metalwork of equipment that is not normally live but can become live under fault conditions. Strict BS 7671 Part 2 definition — most apprentices over-apply it on first reading."
            tone="emerald"
          />

          <TLDR
            points={[
              'Exposed-conductive-part (BS 7671 Part 2): a conductive part of equipment which can be touched and which is not normally live but which can become live under fault conditions.',
              'Three tests must all be true: it’s conductive, it’s part of equipment, and a single fault could make it live. Building structure (pipes, RSJs, walls) isn’t equipment — those go in the extraneous category (Sub 4.4).',
              'Every exposed-conductive-part needs a CPC connection back to the MET (Reg 411.3.1.1). The one exception: a Class II lampholder with no exposed-conductive-parts suspended from a Class II pendant.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS 7671 Part 2 definition of an exposed-conductive-part verbatim.',
              'Identify common exposed-conductive-parts in domestic and commercial installations.',
              'Distinguish exposed-conductive-parts from extraneous-conductive-parts (covered in Sub 4.4) and from unrelated metalwork.',
              'Recognise Class II equipment by the concentric-squares symbol and explain why it requires no CPC.',
              'Cite Reg 411.3.1.1 and identify its single exception (Class II lampholder).',
              'Apply the "simultaneously accessible" rule (411.3.1.1) when bonding adjacent exposed-conductive-parts.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The BS 7671 definition — read it slowly</ContentEyebrow>

          <ConceptBlock
            title="What an exposed-conductive-part actually is"
            plainEnglish="Metal that’s part of an electrical thing, that you can touch, that isn’t live in normal use but COULD go live if something inside breaks."
            onSite="If a single internal fault could put it at line voltage, and you can touch it without tools, it’s an exposed-conductive-part — and it needs an earth."
          >
            <p>
              The BS 7671 Part 2 definition is short and worth memorising: an{' '}
              <strong>exposed-conductive-part</strong> is "a conductive part of equipment which
              can be touched and which is not normally live but which can become live under fault
              conditions". Three things have to be true at once for the label to apply:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductive</strong> — metal, basically. Plastic doesn’t qualify.
              </li>
              <li>
                <strong>Part of equipment</strong> — it has to be a piece of an electrical fitting,
                accessory, appliance or wiring system. Building structure, pipework and unrelated
                metalwork are excluded (they sit in the extraneous category — Sub 4.4).
              </li>
              <li>
                <strong>Not normally live but can become live under fault</strong> — there’s a
                credible single fault inside the equipment that would put the touchable part at
                supply voltage. If no plausible single fault could make it live (e.g. it’s isolated
                from internal live parts by double insulation), it isn’t exposed.
              </li>
            </ul>
            <p>
              All three together. Miss any one and you’re looking at something else — a building
              part, an extraneous part, or a Class II piece of kit that needs no CPC.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.1 (Protective earthing)"
            clause="Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. Conductors for protective earthing shall comply with Chapter 54. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point."
            meaning={
              <>
                Every exposed-conductive-part on an installation requires a CPC connection back to
                the MET — full stop. Two extra rules: any two exposed-conductive-parts within
                simultaneous reach must be on the same earthing system (so a fault doesn’t create a
                touch voltage between them); and the single carve-out for a Class II pendant from a
                Class II rose. There are no other exceptions.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.1."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What counts on a real installation</ContentEyebrow>

          <ConceptBlock
            title="The everyday list — exposed-conductive-parts you’ll meet daily"
            onSite="Every one of these needs a CPC connection back to the MET. No CPC = the part can sit at line voltage during a fault and the MCB never trips."
          >
            <p>
              On a typical UK domestic or commercial installation, the exposed-conductive-parts
              include all of the following:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Metal back-boxes</strong> — single-gang, twin-gang, deep boxes,
                surface-mount pattresses. All count.
              </li>
              <li>
                <strong>Metal-clad accessories</strong> — switches, sockets, FCUs, isolators,
                cooker outlets. The faceplate is an exposed-conductive-part; the switch mechanism
                inside is normally live.
              </li>
              <li>
                <strong>Metal luminaire bodies</strong> — chandelier frames, downlight cans (where
                metal), spotlight bars, surface-mount strip lights, IP-rated bulkheads.
              </li>
              <li>
                <strong>Motor casings</strong> — extractor fans (where metal), pump bodies, garage
                door motors, lift machinery.
              </li>
              <li>
                <strong>Appliance casings (Class I)</strong> — electric showers, ovens, dishwashers,
                washing machines, hobs. Anything supplied with a 3-core flex (L, N, E) and no
                Class II marking.
              </li>
              <li>
                <strong>Metal CU enclosures</strong> — required by BS 7671 (as amended) for
                domestic. The whole CU body is an exposed-conductive-part.
              </li>
              <li>
                <strong>Metal junction boxes and adaptable boxes.</strong>
              </li>
              <li>
                <strong>SWA armour</strong> when used as a CPC, and metallic conduit / tray when
                used as a CPC. The wiring system itself becomes part of the exposed-conductive
                category.
              </li>
              <li>
                <strong>RCBO and MCB casings</strong> in metal-bodied DIN rail products.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="What’s NOT an exposed-conductive-part"
            plainEnglish="If it’s building fabric, it’s not equipment. If it’s plastic, it’s not conductive. If it’s Class II, no single fault can make it live."
          >
            <p>
              Equally important is knowing what doesn’t qualify — over-applying the label leads to
              over-bonding and the parallel-earth issues that brings:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Building structure</strong> — RSJs, lintels, joists, brickwork ties.
                Conductive but not part of equipment. Might be extraneous (Sub 4.4) but never
                exposed.
              </li>
              <li>
                <strong>Pipework carrying water/gas/oil</strong> — same logic. It’s plumbing, not
                electrical equipment. Might be extraneous (Sub 4.4); never exposed.
              </li>
              <li>
                <strong>All-plastic accessories</strong> — moulded-plastic switches, sockets,
                ceiling roses. No metal touchable surface = no exposed-conductive-part. CPC still
                pulled into the back of the accessory for future-proofing, but no terminal needs
                connection.
              </li>
              <li>
                <strong>Class II equipment</strong> — kettles, hairdryers, drills, vacuums marked
                with the concentric-squares symbol. Double insulation means no single fault can
                make the casing live.
              </li>
              <li>
                <strong>SELV equipment</strong> — touchable parts of separated extra-low-voltage
                kit (e.g. low-voltage downlights, doorbell transformers’ secondary side) operate at
                voltages too low to cause shock. Different protective measure entirely.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The Class II exception — and the symbol</ContentEyebrow>

          <ConceptBlock
            title="Class II — double insulation does the protection"
            onSite="Two concentric squares (□ inside □) marked on the rating label. That’s your visual cue — no earth needed, don’t try to add one."
          >
            <p>
              Class II equipment is built so that touchable parts can never become live under a
              single fault. There are two layers of insulation between any internal live part and
              any touchable surface — basic insulation plus supplementary insulation, or a single
              layer of "reinforced" insulation that’s tested as if it were two. Either way, one
              fault can’t bridge both layers.
            </p>
            <p>
              Because no single fault makes the casing live, there’s nothing for a CPC to protect.
              Class II equipment ships with a 2-core flex (L and N only — no earth pin in the
              moulded plug, or a plastic earth dummy pin). The protective measure here is "Class II
              equipment or equivalent insulation" (Reg 412), entirely separate from ADS.
            </p>
            <p>
              Recognise it by the symbol — two concentric squares (BS EN 60417-5172) on the rating
              plate. It’s the only legitimate reason to install fixed equipment with no CPC on the
              casing. Three things to remember:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Don’t add an earth wire to a Class II appliance.</strong> Drilling into the
                casing or splicing into the supply lead can compromise the double insulation and
                turn a safe appliance into a hazard.
              </li>
              <li>
                <strong>Don’t fit a Class II appliance into a Class I-only socket arrangement</strong>{' '}
                where the surrounding installation needs RCD protection on a different basis. Read
                the manufacturer’s install instructions.
              </li>
              <li>
                <strong>Don’t assume "no earth pin = broken plug".</strong> A factory-fitted plug
                with no earth pin on a Class II appliance is correct. A 3-pin plug with a plastic
                dummy earth pin is also correct (the pin is just for socket-shutter operation).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Treating a Class II accessory as needing a CPC"
            whatHappens={
              <>
                You’re fitting a Class II all-plastic ceiling rose with a Class II pendant
                lampholder. There’s a CPC core in the supply T&E. The previous electrician connected the
                CPC into the lamp itself, drilling a small hole in the plastic to reach a metal
                screw. Months later, vibration and humidity work the screw loose; the loose screw
                contacts the live conductor inside; the rose’s plastic body is now electrified and
                the customer’s child gets a shock changing a bulb.
              </>
            }
            doInstead={
              <>
                If a Class II accessory has no exposed-conductive-parts and no provided earth
                terminal, leave the CPC neatly terminated in an insulated terminal block inside the
                ceiling rose for future use, but DO NOT connect it to the rose body or improvise a
                connection. Reg 411.3.1.1 explicitly carves out this case — it’s the one accessory
                that is permitted to have no CPC connected.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Practical earthing — back-boxes and faceplates</ContentEyebrow>

          <ConceptBlock
            title="Metal back-box, metal faceplate — both are exposed parts"
            onSite="Standard fix: a green/yellow earth fly-lead from the back-box earth terminal to the faceplate earth terminal. Or rely on the metal fixing screws if continuity is verified at test — but most manufacturers and supervisors want the fly-lead in regardless."
          >
            <p>
              A metal back-box is itself an exposed-conductive-part. Inside it, the wiring includes
              live conductors that could chafe against the box under vibration, repeated insertion/
              removal of the accessory, or a future installer’s clumsy stripping. So the back-box
              needs its own connection to the CPC — usually via the dedicated earth terminal moulded
              into the back-box (a single brass screw + threaded boss).
            </p>
            <p>
              Two valid arrangements for connecting the metal accessory to the back-box CPC:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earth fly-lead</strong> — a short green/yellow conductor from the back-box
                earth terminal to the accessory’s earth terminal. Always compliant. Standard
                practice on metal-clad sockets and switches.
              </li>
              <li>
                <strong>Fixing-screw bonding</strong> — where a metal accessory is securely fixed
                to a metal back-box by metal screws and continuity is verified at initial
                verification (R2 test from the box to the faceplate to the MET), the screws can act
                as the CPC connection per IET guidance. Less common in practice — most installers
                fly-lead anyway because it’s cheap insurance.
              </li>
            </ul>
            <p>
              Plastic accessory in metal back-box: the back-box still needs a CPC connection (it’s
              still an exposed-conductive-part), but the plastic faceplate doesn’t. Plastic
              accessory in plastic back-box: no CPC connection on either, though the CPC core
              should still be terminated in an insulated block for future use.
            </p>
          </ConceptBlock>

          <Scenario
            title="Faulty SWA gland — exposed armour with broken CPC"
            situation={
              <>
                You’re testing a sub-main run on a small commercial unit. The SWA cable feeds a
                downstream board 30 m away, and the armour is meant to be the CPC. Your R2 test
                from the MET to the downstream board reads 18 Ω — way higher than expected for a
                SWA armour over 30 m, which should be a fraction of an Ohm. You crack open the
                downstream gland and find the SWA gland’s earth tag is loose, and the armour
                isn’t making proper contact with the metal gland body.
              </>
            }
            whatToDo={
              <>
                Make safe — isolate the sub-main. Strip back, re-make the SWA gland properly with
                the correct compression sequence, fit a new earth tag and tighten to the
                manufacturer’s torque spec. Re-test R2 — should now be well under 1 Ω. Document the
                fault on the EICR or commissioning sheet. The armour is the only CPC on this
                sub-main; without a solid earth-tag connection, every exposed-conductive-part on
                the downstream board sat at 18 Ω from the MET. A line-to-armour fault would
                generate barely any fault current and the upstream MCB wouldn’t trip.
              </>
            }
            whyItMatters={
              <>
                The SWA armour is itself an exposed-conductive-part — and when it’s also being used
                as a CPC, its termination quality is doubly critical. A loose gland is the single
                most common cause of high R2 / Zs readings on commercial sub-mains. Always check by
                hand and by meter.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Part 2 definition: exposed-conductive-part = conductive part of equipment, touchable, not normally live but can become live under fault. All three must be true.',
              'Common examples: metal back-boxes, metal accessories, metal luminaire bodies, motor casings, Class I appliances, metal CU enclosures, SWA armour when used as CPC.',
              'Not exposed: building structure, pipework, all-plastic accessories, Class II equipment, SELV equipment.',
              'Every exposed-conductive-part needs a CPC connection back to the MET (Reg 411.3.1.1). The one exception: a Class II lampholder with no exposed-conductive-parts on a Class II pendant.',
              'Class II = concentric-squares symbol. Double insulation. No CPC required. Don’t add an earth wire — you’ll compromise the protection.',
              'Simultaneously accessible exposed-conductive-parts must be on the same earthing system to prevent dangerous touch voltage between them during a fault.',
            ]}
          />

          <Quiz title="Exposed conductive parts — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Component parts of ADS
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Extraneous conductive parts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
