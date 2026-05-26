/**
 * Module 3 · Section 4 · Sub 4 — Extraneous conductive parts
 * Maps to City & Guilds 2365-02 / Unit 203 / LO4 / AC 4.4
 *   AC 4.4 — "Identify extraneous conductive parts"
 *
 * Frame: Bigger trap than exposed-conductive-parts. The thing your apprentice
 * forgets to bond. Definition + 1667 Ω rule + the items that get missed.
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
import { EquipotentialBonding } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Extraneous conductive parts | Level 2 Module 3.4.4 | Elec-Mate';
const DESCRIPTION =
  'Extraneous-conductive-parts in BS 7671 — metalwork outside the installation that introduces a potential. The 1667 Ω test that decides whether you bond, and the items that constantly get missed.';

const checks = [
  {
    id: 'm3-s4-sub4-define-extraneous',
    question:
      'BS 7671 Part 2 defines an extraneous-conductive-part as:',
    options: [
      'Carry out a fire risk assessment and ensure fire safety measures (including fire detection, alarm and emergency lighting) are maintained',
      'Leaders with higher EI consistently achieve better team performance, safety records, and employee retention',
      'It provides legal evidence that the system was designed, installed, tested, and maintained correctly',
      'A conductive part liable to introduce a potential, generally earth potential, and not forming part of the electrical installation.',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 Part 2 — verbatim. Two qualifying conditions: (a) it could introduce a potential (typically earth potential, brought in from outside the building) and (b) it is NOT part of the electrical installation. Incoming metal services like gas, water and oil are the textbook examples.',
  },
  {
    id: 'm3-s4-sub4-1667-derivation',
    question:
      'Why does industry use a 1667 Ω resistance threshold to decide whether a metalwork part is extraneous and needs main bonding?',
    options: [
      'Because most domestic PME supplies have a PEN of 35 mm² or less, which Table 54.8 maps to a 10 mm² minimum copper-equivalent main bonding. On bigger supplies (commercial three-phase, 70 mm² PEN) the bonding steps up to 16 mm² or 25 mm². Always read the supplier neutral first, then Table 54.8.',
      'Limited companies have separate legal personality — the company is liable for debts, not the individual director (subject to personal guarantees and director duties). Sole traders have unlimited personal liability — personal assets can be pursued for business debts.',
      'Register building with BSR; prepare and revise safety case; engage residents on building safety; manage building safety risks; maintain golden thread; report to BSR; respond to BSR notices.',
      'At 1667 Ω, the leakage current from 230 V to earth is 230 ÷ 1667 ≈ 0.14 mA — well below the safe limit and below the 30 mA RCD threshold. Below 1667 Ω the part can leak more than this and is treated as extraneous; above 1667 Ω it cannot introduce a dangerous potential.',
    ],
    correctIndex: 3,
    explanation:
      '1667 Ω is the resistance at which a 230 V potential drives just under the 30 mA RCD threshold to earth (specifically derived from BS 7671 Reg 411.5.3 / Table 41.5: 50 V ÷ 0.030 A = 1667 Ω, the maximum Zs for a 30 mA RCD). Industry uses it as the test threshold: below 1667 Ω the metal could carry enough current to be hazardous and must be treated as extraneous; above it, no.',
  },
  {
    id: 'm3-s4-sub4-plastic-pipe',
    question:
      'A new-build flat has plastic incoming water and gas services right up to the meter. The internal pipework beyond the meter is copper, but no other connection to earth or external metalwork exists. Does the internal copper pipework need main protective bonding?',
    options: [
      'No — the plastic incomer means the copper pipework cannot introduce a dangerous potential from outside. The note to Reg 411.3.1.2 is explicit: where non-metallic pipes enter a building and are then connected to metallic pipes within the building, the metallic pipes within the building do not normally require protective bonding as they are unlikely to be extraneous-conductive-parts.',
      'It brings DC isolation requirements, additional DC overcurrent protection, fire-segregation considerations and (for grid-tied operation) the same G98/G99 anti-islanding requirements that apply to the PV inverter — typically all wrapped up by a hybrid inverter that handles PV plus battery.',
      'Redesign — options include increasing the cpc CSA (e.g. from 1.5 mm² to 2.5 mm² as a separate cpc on a single-cable run), shortening the route by relocating the device or the load, dropping to a lower-rated device (B25 max Zs = 1.75 Ω), or fitting a 30 mA RCD as the alternative path under Reg 411.4.204 if the circuit type allows it.',
      'A generic RAMS is template wording that could apply to any job — \\\\\\\\\\\\\\\'electrical hazards\\\\\\\\\\\\\\\', \\\\\\\\\\\\\\\'working at height\\\\\\\\\\\\\\\', \\\\\\\\\\\\\\\'use of PPE\\\\\\\\\\\\\\\'. A site-specific RAMS names the actual site, the actual tasks, the hazards identified on the walk-round, the specific access kit, the specific controls and the specific steps. The HSE \\\\\\\\\\\\\\\'suitable and sufficient\\\\\\\\\\\\\\\' test under MHSWR Reg 3 effectively requires site-specific content.',
    ],
    correctIndex: 0,
    explanation:
      'Plastic incomer = no external earth path = the internal metalwork can’t introduce a potential = it’s not extraneous. The 1667 Ω test would confirm this (resistance to earth would be very high). This is one of the most common over-bonding mistakes on modern builds — apprentices reflexively bond every copper pipe because their training was on installations with metal incomers.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'You measure 850 Ω between an incoming gas pipe and the MET on a TT installation. Is the gas pipe an extraneous-conductive-part requiring main bonding?',
    options: [
      'Adequate fire safety training at the time of recruitment and on being exposed to new or increased risks, repeated periodically, and adapted to take account of new or changed risks',
      'Yes — 850 Ω is below the 1667 Ω threshold, so the part can introduce a potential and must be bonded to the MET via a main protective bonding conductor sized per Reg 544.1 (typically 10 mm² Cu on a domestic).',
      'A conventional system identifies which zone is in alarm; an addressable system identifies the exact individual device (detector or call point) that has activated, providing precise location information',
      'The exact nature of the modification, why it was necessary, who authorised it, what was changed, and ensure that drawings and documentation are updated to reflect the as-built condition',
    ],
    correctAnswer: 1,
    explanation:
      'Below 1667 Ω = treat as extraneous = bond. 850 Ω is well below the threshold, indicating a real conductive path back to earth via the gas service. Bond to the MET with the conductor sized per 544.1 — half the cross-sectional area of the earthing conductor with a 6 mm² minimum, or 10 mm² minimum on a PME supply (or 25 mm² where the supply neutral exceeds 35 mm²).',
  },
  {
    id: 2,
    question:
      'Which of these is most likely to be missed on a domestic main bonding survey?',
    options: [
      'A clearly identified DC isolator adjacent to the battery, an AC isolator at the inverter, plus emergency means of disconnection labelled and accessible',
      'That the line and CPC of the ring are continuous and unbroken — high or open readings indicate a broken conductor at one of the accessory terminations',
      'A metal central-heating expansion vessel concealed in an airing cupboard, connected to the heating system that bonds back to the boiler — not the kind of "incoming service" people instinctively look for.',
      'Explain the legal requirement for licensed removal, present it as a variation with clear costs, and document the client\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s refusal if they still decline — then pause work on that element until resolved',
    ],
    correctAnswer: 2,
    explanation:
      'Gas, water and oil are the obvious ones — every electrician looks for them. Concealed extraneous parts get missed: hidden expansion vessels, heated-towel-rail circuits with metal incoming pipework, in-slab rebar with conductive joints, structural steelwork concealed behind plasterboard, lightning protection systems wrongly bonded only at the LP earth. Sweep the whole property with the test, not just the obvious cupboards.',
  },
  {
    id: 3,
    question:
      'Per Reg 411.3.1.2, where in the installation must main protective bonding conductors connect the extraneous-conductive-part?',
    options: [
      'Sensible heat changes temperature without phase change; latent heat changes phase without temperature change',
      'A signed letter or report from a professional with relevant expertise',
      'Prohibition Notices require immediate cessation of activity due to imminent risk of serious personal injury',
      'To the Main Earthing Terminal (MET) — directly, with a continuous run of suitably sized conductor.',
    ],
    correctAnswer: 3,
    explanation:
      'Verbatim: "extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors". Direct connection to the MET — not via the nearest CPC, not via another extraneous part, not chained through the structure.',
  },
  {
    id: 4,
    question:
      'A gas service incomer is being bonded. Where on the gas pipework should the bonding clamp be fitted relative to the meter?',
    options: [
      'Within 600 mm of the consumer side of the gas meter outlet, before any branch or tee, on a clean section of pipe.',
      'Setting aside a fixed percentage of each payment for tax, maintaining a simple budget, and building an emergency fund',
      'By choosing which specialisms to pursue, which clients to work with, and how to structure their working week',
      'They create self-limiting behaviour that causes the person to avoid opportunities and underperform',
    ],
    correctAnswer: 0,
    explanation:
      'Industry practice (and the gas safety guidance behind it): clamp the bonding conductor within 600 mm of the meter outlet on the consumer side, before any branch. Don’t bond the supplier-side pipework — that’s the gas company’s responsibility and you’d be working on their kit. Use a BS 951 clamp, sleeve the clamp, label "SAFETY ELECTRICAL CONNECTION DO NOT REMOVE".',
  },
  {
    id: 5,
    question:
      'Reg 544.1 sets the minimum cross-sectional area of a main protective bonding conductor. What is the rule of thumb for sizing on a TN-C-S (PME) domestic with a 25 mm² Cu supply neutral?',
    options: [
      'Learning user patterns and predictive automation',
      '10 mm² Cu (Table 54.8 row for supply neutral up to 35 mm²).',
      'A persistent fault still exists on the circuit',
      'Because electrical interlocking alone can fail if a contact welds',
    ],
    correctAnswer: 1,
    explanation:
      'Table 54.8 (PME) — for supply neutrals up to 35 mm² Cu equivalent, the minimum main bonding conductor is 10 mm² Cu. Goes up to 16 mm² Cu for neutrals 35–50 mm², 25 mm² Cu for 50–95 mm², 35 mm² Cu for 95–150 mm², 50 mm² Cu over 150 mm². On TN-S you can use the simpler half-of-earthing-conductor rule (Reg 544.1) with 6 mm² minimum.',
  },
  {
    id: 6,
    question:
      'A property has a copper gas incomer measured at 12 Ω to the MET, AND a copper water incomer measured at 8 Ω to the MET. Both are extraneous. Can a single main bonding conductor be daisy-chained from MET → gas → water?',
    options: [
      'A digital, structured, accessible and current set of information about a higher-risk residential building (HRRB), maintained throughout the building\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s life by the dutyholders (Accountable Person, Principal Accountable Person), used by the Building Safety Regulator and by anyone working on the building.',
      'Compliance with general installation requirements plus consideration of: DC circuit protection, isolation and labelling; ventilation for gas dispersal; fire separation from habitable rooms; accessible isolation for emergency services; and earthing and bonding of all metalwork',
      'No — each extraneous-conductive-part must have its own dedicated main protective bonding conductor running back to the MET (or via a properly designed bonding bar). Daisy-chaining means a disconnection at one part disables bonding to the next, and the conductor’s integrity becomes dependent on the previous clamp.',
      'Initially, work quality may be high, but over time: team members feel overwhelmed and inadequate, initiative decreases (people fear not meeting the standard), morale drops, burnout increases, and the leader becomes a bottleneck because they end up doing everything themselves rather than trusting others — ultimately reducing both performance and wellbeing',
    ],
    correctAnswer: 2,
    explanation:
      'Each extraneous part runs back to the MET independently. Either via separate conductors or via a dedicated bonding bar that itself has a single connection to the MET. Daisy-chaining services creates a single point of failure that can disable bonding to multiple parts at once.',
  },
  {
    id: 7,
    question:
      'On a TT installation with the test: phase-to-earth at the gas service reads 60 Ω. Is the part extraneous, and what bonding action follows?',
    options: [
      'Actual expenses require apportioning bills based on business use percentage; simplified expenses use a flat £6/week rate',
      'Managed industrial switches with DIN-rail mounting, extended temperature range, redundancy support, and diagnostics',
      'It sets requirements for the conservation of fuel and power in buildings, including energy efficiency standards for heating, lighting, and insulation',
      '60 Ω is well below 1667 Ω → extraneous → bond to the MET via a main protective bonding conductor sized per Reg 544.1 (typically 10 mm² Cu).',
    ],
    correctAnswer: 3,
    explanation:
      'Below 1667 Ω = extraneous = bond. The 60 Ω reading shows the gas pipe has a conductive path to earth (via the soil around the buried supply main) low enough that a fault elsewhere could push appreciable current through it. Bond to MET with a 10 mm² Cu main protective bonding conductor and a BS 951 clamp.',
  },
  {
    id: 8,
    question:
      'A lightning protection system (BS EN 62305) is installed on a tall commercial building. Should its down-conductor earth termination be bonded to the electrical installation’s MET?',
    options: [
      'Yes — Reg 411.3.1.2 requires that connection of a lightning protection system to the protective equipotential bonding shall be made in accordance with the BS EN 62305 series. The bond keeps both earthing systems at the same potential during a strike, preventing dangerous side-flashing inside the building.',
      'Toolbox talks are short pre-shift safety briefings on a single topic — the RAMS for the day, a recent near-miss, a seasonal hazard. They keep the formal RAMS active in the day-to-day work. Recorded with attendance. Together with the RAMS sign-on they form the daily safety briefing chain.',
      'Implement a formal coordination system with permit-to-work procedures for each high-risk activity, task-specific risk assessments, method statements, exclusion zones, appointed supervisors, and a communication protocol to manage interfaces between the activities',
      'Hazardous waste — double-bagged, labelled, Hazardous Waste Consignment Note, transported by licensed asbestos waste carrier, disposed of at permitted asbestos waste facility. CAR 2012 + Hazardous Waste Regs 2005 + EPA 1990 all apply.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 411.3.1.2 explicitly addresses LPS bonding. Without a bond, a strike on the LPS lifts that earth several thousand volts above the electrical installation’s MET — and the resulting potential difference causes side-flashing internally (often through plumbing, comms cables, exposed metalwork). Bond per BS EN 62305 series — usually with a sized conductor between the LPS earth and the building’s MET via a designed bonding bar.',
  },
];

const faqs = [
  {
    question: 'What’s the simplest way to remember exposed vs extraneous?',
    answer:
      'Exposed comes from inside the electrical equipment (a fault can make it live). Extraneous comes from outside the installation (it could introduce a potential — usually earth — from somewhere else). One is "could go live in a fault"; the other is "could be at a different potential to start with". Two completely different mechanisms requiring different conductors (CPC vs main bonding) and different sizing rules (Table 54.7/54.8 for CPC vs 544.1 for bonding).',
  },
  {
    question: 'Why 1667 Ω specifically?',
    answer:
      'It comes from BS 7671 Reg 411.5.3 / Table 41.5 — the maximum earth fault loop impedance allowed for a 30 mA RCD at 230 V. It’s the resistance at which a 230 V potential to earth produces the 30 mA leakage that an RCD protects against (50 V ÷ 0.030 A ≈ 1667 Ω). Below this, current can flow large enough to be hazardous — treat as extraneous. Above this, the metal can’t introduce dangerous current — treat as not extraneous.',
  },
  {
    question: 'Do plastic pipes mean I never need to bond a kitchen?',
    answer:
      'Often, but not always. Check the actual incomer route — a "plastic" incoming service might transition to copper inside a meter cabinet, in which case the relevant question is whether that copper section is connected to anything that could introduce a potential. Test to be sure: a quick 1667 Ω measurement gives you the answer in 30 seconds. Don’t assume from the visible run.',
  },
  {
    question: 'How do I actually do the 1667 Ω test on site?',
    answer:
      'Insulation resistance tester or low-resistance ohmmeter, applied between the suspect metalwork and the MET (with the installation isolated). Measure the resistance. Below 1667 Ω: extraneous, bond. Above 1667 Ω: not extraneous, no main bonding required. Repeat for every distinct piece of metalwork suspected of being extraneous. Document the results on the EIC or EICR.',
  },
  {
    question: 'What about supplementary bonding in bathrooms — has it gone away?',
    answer:
      'Supplementary bonding inside bathrooms can be omitted under specific conditions (Reg 701.415.2) — all circuits are RCD-protected at 30 mA, and main bonding to the building is properly in place. If you don’t meet ALL the conditions, supplementary bonding is still required. Most new installs comply with the omission conditions; older installations and any "unusual" bathroom (uncertified accessories, non-RCD circuits) still need supplementary bonding to keep all simultaneously accessible exposed and extraneous parts at the same potential.',
  },
  {
    question: 'I’m on a job where the gas main is in plastic but the meter and internal pipework is copper. The copper bonded back to the MET reads 2000 Ω. What now?',
    answer:
      'Above 1667 Ω = not extraneous = no main bonding required. The reading proves the internal copper has no significant external earth path through the (plastic) supply main. Document the reading and the decision in your EIC notes — "main protective bonding to incoming gas service: not required, plastic incomer, resistance to earth measured at 2 kΩ". Future inspectors then know it was assessed, not just missed.',
  },
];

export default function Sub4() {
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
            eyebrow="Module 3 · Section 4 · Subsection 4"
            title="Extraneous conductive parts"
            description="Bigger trap than exposed-conductive-parts. Metalwork outside the installation that brings in a potential — gas, water, structural steel — and the 1667 Ω test that decides whether you bond."
            tone="emerald"
          />

          <TLDR
            points={[
              'Extraneous-conductive-part (BS 7671 Part 2): a conductive part liable to introduce a potential, generally earth potential, and NOT forming part of the electrical installation.',
              'The 1667 Ω test: if resistance from the part to earth is below 1667 Ω, it can introduce a hazardous potential — treat as extraneous and bond. Above 1667 Ω, no main bonding required.',
              'Reg 411.3.1.2 lists the typical examples (gas, water, oil, central heating, structural steel) and Reg 544.1 / Table 54.8 set the bonding conductor size — 10 mm² Cu minimum on a domestic PME supply.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the BS 7671 Part 2 definition of an extraneous-conductive-part.',
              'Identify common extraneous-conductive-parts: incoming gas, water, oil, structural steelwork, central heating systems.',
              'Apply the 1667 Ω test to decide whether a part is extraneous and explain its derivation from Table 41.5.',
              'Cite Reg 411.3.1.2 (protective equipotential bonding to the MET) and Reg 544.1 (sizing of main protective bonding conductors).',
              'Recognise where extraneous parts get missed: concealed pipework, in-slab rebar, expansion vessels, lightning protection earths.',
              'Avoid over-bonding (e.g. internal copper pipework with a plastic incomer) and document non-bonded decisions.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The definition that catches everyone out</ContentEyebrow>

          <ConceptBlock
            title="What an extraneous-conductive-part actually is"
            plainEnglish="Metal that isn’t electrical kit, but that could carry a voltage from somewhere outside into your installation."
            onSite="The classic three: gas service in, water service in, oil service in (where present). All metal incoming services that link the building to earth potential through pipework buried in soil."
          >
            <p>
              The BS 7671 Part 2 definition: an{' '}
              <strong>extraneous-conductive-part</strong> is "a conductive part liable to introduce
              a potential, generally earth potential, and not forming part of the electrical
              installation". Two qualifying conditions:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Liable to introduce a potential</strong> — typically earth potential brought
                in from outside, but in unusual cases other potentials too. The part has a path to
                somewhere outside that holds it at a defined voltage.
              </li>
              <li>
                <strong>Not part of the electrical installation</strong> — it’s plumbing, building
                structure, or services from another trade. If it’s electrical equipment, it’s
                exposed (Sub 4.3), not extraneous.
              </li>
            </ul>
            <p>
              The two BS 7671 categories are mutually exclusive in this sense. Exposed-conductive
              parts can become live <em>under fault</em>; extraneous-conductive-parts already sit
              at a different potential <em>before any fault occurs</em>. The protective measure for
              each is different: CPCs and protective devices for exposed; main protective bonding
              to the MET for extraneous.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.1.2 (Protective equipotential bonding)"
            clause="In each consumer’s installation within a building, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54. Examples of extraneous-conductive-parts can include: (a) metallic water installation pipes; (b) metallic gas installation pipes; (c) other metallic installation pipework and ducting; (d) central heating and air conditioning systems; (e) exposed metallic structural parts of the building. NOTE: Where non-metallic pipes (e.g. plastic) enter a building and are then connected to metallic pipes within the building, the metallic pipes within the building do not normally require protective bonding as they are unlikely to be extraneous-conductive-parts. Connection of a lightning protection system to the protective equipotential bonding shall be made in accordance with the BS EN 62305 series."
            meaning={
              <>
                411.3.1.2 is the framing regulation for main bonding. Lists the typical extraneous
                items, requires connection to the MET (not to a CPC or to an arbitrary earth
                point), references Chapter 54 for sizing, and explicitly excludes copper pipework
                fed from a plastic incomer. It also brings lightning protection into scope when LPS
                is fitted.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1.2."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 1667 Ω test — where the number comes from</ContentEyebrow>

          <ConceptBlock
            title="The derivation — why 1667 Ω matters"
            plainEnglish="It’s the resistance at which 230 V drives just under the 30 mA RCD threshold to earth. Below it, the part can leak hazardous current; above it, it can’t."
            onSite="Test with an insulation resistance meter or low-resistance ohmmeter between the suspect metal and the MET. Below 1667 Ω = extraneous = bond. Above 1667 Ω = not extraneous = no main bonding required."
          >
            <p>
              The 1667 Ω figure comes straight from BS 7671 Reg 411.5.3 and Table 41.5. The maximum
              earth fault loop impedance Zs for a 30 mA RCD at U₀ = 230 V is 1667 Ω, derived from
              the touch-voltage limit:
            </p>
            <p className="font-mono text-[14px] text-emerald-300">
              Zs(max) = U_L ÷ IΔn = 50 V ÷ 0.030 A = 1667 Ω
            </p>
            <p>
              U_L = 50 V (the conventional touch voltage limit in dry conditions), IΔn = 0.030 A
              (the residual operating current of a standard RCD). Below 1667 Ω, a 230 V supply
              could push enough leakage current to earth that the touch voltage could rise above
              50 V — so the part is treated as extraneous and bonded.
            </p>
            <p>
              The test method on site:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Isolate the installation. Always.</li>
              <li>
                Connect an insulation resistance meter (set to 250 V or 500 V DC) or a low-resistance
                ohmmeter between the suspect metalwork and the MET.
              </li>
              <li>Measure the resistance.</li>
              <li>
                <strong>Below 1667 Ω:</strong> extraneous — bond to MET via main protective bonding
                conductor sized per Reg 544.1 (10 mm² Cu minimum on PME).
              </li>
              <li>
                <strong>Above 1667 Ω:</strong> not extraneous — no main bonding required. Document
                the result in EIC notes for future inspectors.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3 / Table 41.5 (Maximum earth fault loop impedance for RCDs at U₀ = 230 V)"
            clause="Where an RCD is used for fault protection: the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and Ra × IΔn ≤ 50 V, where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms) and IΔn is the rated residual operating current of the RCD. Table 41.5 — Rated residual operating current 30 mA: Maximum Zs 1667 Ω. 100 mA: 500 Ω. 300 mA: 167 Ω. 500 mA: 100 Ω."
            meaning={
              <>
                The 1667 Ω in Table 41.5 (the maximum permitted Zs for a 30 mA RCD at 230 V)
                doubles up as the industry threshold for the "extraneous-conductive-part" test.
                Below it, a part can leak enough current to be hazardous and must be bonded; above
                it, it cannot. Same number, two uses.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.5.3 and Table 41.5."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What gets bonded — and how</ContentEyebrow>

          <ConceptBlock
            title="The everyday list — extraneous parts you’ll meet"
            onSite="Gas, water, oil — sweep first. Then look for the easily-missed: structural steel, lightning protection earths, in-slab rebar with conductive joints, hidden expansion vessels, swimming pool grounds."
          >
            <p>
              The textbook items, all listed in Reg 411.3.1.2 or commonly tested:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Incoming metal gas service</strong> — within 600 mm of the consumer side of
                the meter outlet, BS 951 clamp on a clean section before any branch. Standard 10 mm²
                Cu on domestic PME.
              </li>
              <li>
                <strong>Incoming metal water service</strong> — same approach. Within 600 mm of the
                consumer side of the stop tap, BS 951 clamp.
              </li>
              <li>
                <strong>Incoming metal oil service</strong> — usually only on rural properties with
                an outdoor tank. Bond at the entry point.
              </li>
              <li>
                <strong>Structural steelwork</strong> — RSJs, columns, supports that span between
                ground floor and upper floors. Particularly important where steel is bonded into
                ground via foundations.
              </li>
              <li>
                <strong>Lightning protection system (LPS) earth</strong> — bonded to the MET per
                Reg 411.3.1.2 and BS EN 62305. Critical for tall buildings.
              </li>
              <li>
                <strong>Central heating and air-conditioning systems</strong> — generally bonded
                via the boiler/AHU casing CPC, but worth a continuity test on long runs.
              </li>
              <li>
                <strong>Other metallic ducting</strong> — kitchen extract ducting that exits to
                external metalwork, dumb-waiter shafts, lift guide rails.
              </li>
            </ul>
            <div className="flex justify-center pt-2">
              <EquipotentialBonding />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Sizing the main protective bonding conductor (Reg 544.1)"
            plainEnglish="Half the size of the earthing conductor, with minimums depending on supply type. PME = 10 mm² minimum."
          >
            <p>
              Reg 544.1 governs main bonding conductor sizing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S and TT supplies (no PEN):</strong> not less than half the
                cross-sectional area of the earthing conductor, with a 6 mm² Cu minimum.
              </li>
              <li>
                <strong>TN-C-S supplies with PME conditions:</strong> Table 54.8 sets the minimum
                against the supply neutral cross-section. For neutrals up to 35 mm² Cu equivalent,
                10 mm² Cu minimum. Bigger supply neutrals → bigger bonding conductors (16/25/35/50
                mm² Cu).
              </li>
              <li>
                <strong>Maximum cross-section requirement</strong> — bonding conductors do not need
                to exceed the cross-section of the earthing conductor.
              </li>
              <li>
                <strong>Mechanical protection</strong> — bonding conductors not protected against
                mechanical damage need to be larger; refer to Table 54.8 directly for the
                applicable column.
              </li>
            </ul>
            <p>
              On a typical UK domestic PME with a 25 mm² Cu supply neutral, the answer is{' '}
              <strong>10 mm² Cu</strong> for both incoming gas and water bonding. Each part runs
              back to the MET on its own dedicated conductor — no daisy-chaining.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Forgetting to bond a copper gas pipe because the bit at the meter looks plastic"
            whatHappens={
              <>
                You walk into a property, see a yellow plastic concertina coupling on the gas
                incomer, decide "plastic incomer = no bonding needed" and move on. You miss the
                fact that 600 mm before the meter the supply transitions back to copper buried in
                the garden — meaning the internal copper pipework is still in conductive contact
                with the soil-earth via that buried section. Months later a fault elsewhere drives
                potential through the pipework; the customer’s metal cooker shell goes live during
                a fault clearance.
              </>
            }
            doInstead={
              <>
                Don’t guess from a single visible component. Do the 1667 Ω test from the internal
                pipework to the MET. Below 1667 Ω → extraneous → bond. Above → not extraneous →
                document the reading and decision in EIC notes. The plastic-incomer-no-bonding
                shortcut only works when the entire incoming run is genuinely plastic from the
                supply main to the meter. Test it; don’t assume.
              </>
            }
          />

          <Scenario
            title="An EICR finding — bonding to a structural RSJ that wasn’t extraneous"
            situation={
              <>
                You’re reviewing an EICR drafted by another contractor on a 1990s commercial
                refurb. The previous electrician has fitted a 16 mm² Cu bonding conductor from an
                exposed structural RSJ over the entrance to the MET — proudly labelled
                "structural metalwork bonded per BS 7671". Your check measurement reads 4500 Ω
                from the RSJ to earth — well above the 1667 Ω threshold.
              </>
            }
            whatToDo={
              <>
                Recommend the bonding be removed. The RSJ isn’t extraneous (it can’t introduce a
                hazardous potential — it’s electrically isolated from ground at 4.5 kΩ), so
                bonding it provides no safety benefit. Worse, it now creates a parallel earth path
                between the MET and a previously-isolated structural element, dragging fault
                currents through the steel and creating EMF / circulating-current issues. Document
                the test result, recommend removal of the bond, and re-assess after removal.
              </>
            }
            whyItMatters={
              <>
                Over-bonding is as much a fault as under-bonding. It creates parallel earth paths,
                circulating currents, and drags fault current onto metalwork that wasn’t designed
                to carry it. The 1667 Ω test isn’t just about deciding what to bond — it’s about
                deciding what NOT to bond. Test, document, justify both directions of decision in
                EIC notes.
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

          <ContentEyebrow>Where bonding gets missed</ContentEyebrow>

          <ConceptBlock
            title="The hidden extraneous parts — concealed, embedded, forgotten"
            onSite="Gas and water at the meter are obvious. The traps are hidden expansion vessels, in-slab rebar, conduit between buildings, lightning protection earths bonded only at the LPS — all genuinely extraneous, all routinely missed."
          >
            <p>
              Common items overlooked on real surveys:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Concealed pipework</strong> — in-floor or in-wall copper runs that
                originate from a separate cold-water tank or boiler and join the rest of the
                pipework only behind plasterboard. The visible portion in the airing cupboard is
                bonded; the buried section that links to ground gets forgotten.
              </li>
              <li>
                <strong>Rebar in concrete slabs</strong> with conductive joints (older
                construction). Acts as a buried earth electrode network. Rarely detectable from
                visual inspection — only test for it where suspected.
              </li>
              <li>
                <strong>Hidden expansion vessels</strong> in heating systems, particularly inside
                airing cupboards. The steel vessel is metal-pipework-connected via a copper
                T-piece; the entire heating circuit can be extraneous if it routes back to a
                shared earth elsewhere.
              </li>
              <li>
                <strong>Grease traps and drainage with conductive joints</strong> — commercial
                kitchens, in particular, where the cast iron drain bonds back to ground via the
                pipe network.
              </li>
              <li>
                <strong>Conduit/trunking between buildings</strong> on multi-block sites. The
                conductive route may bridge two earthing systems, requiring careful design to
                avoid parallel earth paths.
              </li>
              <li>
                <strong>Lightning protection earth not bonded to the MET</strong> — common on
                older installations where the LPS was retrofitted by a separate contractor.
                Reg 411.3.1.2 explicitly requires this bond.
              </li>
              <li>
                <strong>External metalwork in plant rooms</strong> — metal boiler stand,
                chiller plant base, generator skid frames. Each can be extraneous if buried
                fixings link them to ground.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Extraneous-conductive-part = conductive part liable to introduce a potential, NOT part of the electrical installation. Gas, water, oil, structural steel, central heating, lightning protection earths.',
              'The 1667 Ω test: below = extraneous = bond to MET. Above = not extraneous = no main bonding required. Document either way.',
              '1667 Ω comes from Table 41.5 (max Zs for a 30 mA RCD at 230 V): 50 V ÷ 0.030 A.',
              'Reg 411.3.1.2 requires connection to the MET. Reg 544.1 / Table 54.8 set the conductor size — 10 mm² Cu minimum on a domestic PME supply with neutral up to 35 mm².',
              'Each extraneous part runs back to the MET independently. No daisy-chaining — single point of failure risk.',
              'Plastic incomer = no main bonding required on internal copper pipework, by the explicit note to Reg 411.3.1.2. Verify with the 1667 Ω test, document the decision.',
              'Over-bonding creates parallel earth paths and circulating currents. Test before you bond — both directions of decision are valid.',
            ]}
          />

          <Quiz title="Extraneous conductive parts — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Exposed conductive parts
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Earth fault loop impedance path
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
