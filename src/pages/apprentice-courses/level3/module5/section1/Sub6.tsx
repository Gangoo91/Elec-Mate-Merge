/**
 * Module 5 · Section 1 · Subsection 6 — Initial verification: purpose & information set
 * Maps to C&G 2365-03 / Unit 304 / LO2 / AC 2.1, 2.2, 2.4
 *   AC 2.1 — "state the purpose of the Initial Verification of electrical installations"
 *   AC 2.2 — "state the requirements of the initial verification"
 *   AC 2.4 — "specify the information required by the inspector to conduct the initial verification"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 2.1, 2.3
 *
 * The bridge from statutory framework into practical verification — what
 * initial verification actually achieves, and the information pack the
 * inspector needs in hand before starting.
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

const TITLE = 'Initial verification — purpose and information set | Level 3 Module 5.1.6 | Elec-Mate';
const DESCRIPTION =
  'Why we verify, what initial verification covers (Reg 641-644), and the information pack required before starting — supply data, ADS arrangement, designer\'s data, as-built records.';

const checks = [
  {
    id: 'm5-s1-sub6-purpose',
    question: 'Initial verification serves three primary purposes:',
    options: [
      'The consequences of the failure are low (no safety or environmental impact, minimal operational disruption) and the cost of preventive maintenance would exceed the cost of allowing the failure to occur and repairing it',
      'The discrepancy between the values a person claims to hold and how they actually behave, which reveals areas where self-awareness is incomplete or self-deception is occurring',
      'To confirm the installation complies with BS 7671 before energising, to provide documented evidence for the duty holder, and to discharge the EAWR Reg 4(1) duty on the contractor.',
      'Whether people understand their role in the organisation and whether the organisation ensures they do not have conflicting roles',
    ],
    correctIndex: 2,
    explanation:
      'Initial verification has three converging purposes: technical (BS 7671 compliance), legal (EAWR discharge), and documentary (evidence for the duty holder). All three are achieved by the verification process AND the certificate pack it produces. Treating it as one or the other is incomplete.',
  },
  {
    id: 'm5-s1-sub6-info-set',
    question: 'Per Reg 642.1, the inspector needs to know which of the following BEFORE starting initial verification?',
    options: [
      'Sign in, get a brief visitor induction, wear correct PPE, and be escorted by the Site Manager or a senior member of the contractor\\\\\\\\\\\\\\\'s team. For a client representative the escort is usually the Project Manager or Site Manager because they\\\\\\\\\\\\\\\'ll want to talk through progress, snags and any commercial issues.',
      'Maximum demand, number and type of live conductors, type of earthing arrangement, Ze, prospective short-circuit at the origin, type and rating of overcurrent protective devices, RCD types and IΔn values, conductor cross-sections and lengths.',
      'Dedicated RCD column(s) on the per-circuit row of the STR — typically headed "RCD trip time at IΔn" with sub-columns for the test current used and the measured trip time. Plus a note that the user test facility was verified.',
      'Confirm the design ultimate column (committed plus foreseeable future loads) does not exceed the 100 A intake. If ultimate is below 100 A with reasonable headroom, proceed; if approaching or exceeding, raise with the DNO for upgrade or load-management connection now while the CU is open.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642.1 lists the design and supply information needed to verify against. Without it, you can\'t apply the right acceptance criteria. A measured Zs is meaningless until you know the protective device type and rating to compare against Table 41.3. A measured IR is fine in isolation but tells you nothing about whether the design intent was met. Get the info first, test second.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The "purpose" of initial verification per Reg 641.1 is best described as:',
    options: [
      'Care is a behaviour, not a control. Controls have to be physical, procedural or PPE, and the higher the risk the more substantive the control needs to be',
      'To verify, so far as is reasonably practicable, that the requirements of the Regulations have been met, before the installation is put into service.',
      'Post-Traumatic Growth across multiple domains including new possibilities, meaning, and appreciation of life',
      'Adiabatic check (Reg 543.1.3) shows armour csa is sufficient: S >= sqrt(I²t)/k — and earth fault loop impedance verifies disconnection time is met',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 641.1 — verify before service, SFAIRP, that BS 7671 requirements have been met. The "before service" timing means initial verification is the gate between completed install and live service. The SFAIRP qualifier mirrors EAWR — do what is reasonable, document any limitations.',
  },
  {
    id: 2,
    question: 'Initial verification differs from periodic inspection in that:',
    options: [
      'Yes — design Zs ≤ Table 41.3 max, ADS will clear in time. The design should still target lower Zs (under 0.8 × 2.73 = 2.18 Ω) to leave headroom for measurement uncertainty and operating-temperature confidence at handover.',
      'RASA provides the structural process (receive, appreciate, summarise, ask) while Covey\'s empathetic listening adds the depth of emotional understanding and perspective-taking within each step',
      'Initial verification confirms a NEW installation (or addition/alteration) complies with current BS 7671 before service. Periodic inspection assesses an EXISTING installation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s ongoing safety.',
      'An ASHP extracts heat from the ambient air using an external evaporator coil, while a GSHP extracts heat from the ground via buried pipe loops (horizontal trenches or vertical boreholes) — ASHPs are cheaper to install but have lower COP in cold weather',
    ],
    correctAnswer: 2,
    explanation:
      'Initial = new work, full test sequence, EIC + schedules. Periodic = existing installation, sampling-based, EICR with C-coding. Different methodologies, different outputs, different acceptance bases (initial = current standards; periodic = condition for continued use).',
  },
  {
    id: 3,
    question: 'The Ze value the inspector needs is:',
    options: [
      'Tell them clearly the comments are not OK, and report it to your supervisor or HR if it continues — this may be harassment under Equality Act 2010 s.26',
      'TN-C-S (PNB) is the British term for what was loosely called "PME" — combined Protective Earth and Neutral conductor in the supply, separated at the cut-out — A4:2026 standardises the terminology and reinforces design rules',
      'Initial verification confirms a NEW installation (or addition/alteration) complies with current BS 7671 before service. Periodic inspection assesses an EXISTING installation\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s ongoing safety.',
      'Either declared by the supply distributor (TN-S 0.8 Ω max, TN-C-S 0.35 Ω max are typical declared maxima) or measured at the supply intake. The actual value at the site informs the Zs calculations downstream.',
    ],
    correctAnswer: 3,
    explanation:
      'Ze (external earth fault loop impedance) at the origin can come from supply declaration or measurement. The DNO publishes typical maxima for each supply type (TN-S, TN-C-S/PME, TT). Many designers use the declared max as a worst-case design value; verifiers prefer measured values for accuracy. Either approach is valid as long as documented.',
  },
  {
    id: 4,
    question: 'On a CU change, the inspector needs the original installation\'s as-built data because:',
    options: [
      'To know the cable sizes and routes downstream of the CU — these affect circuit Zs, R1+R2 expectations, and protective device selection. Without this data the new CU might be incorrectly populated.',
      'No - against public policy to insure the cost of breaking the law. PI / EL covers legal defence costs and civil claims but NOT criminal fines.',
      'The principal designer should coordinate the designers to compare the risks of each approach, apply the general principles of prevention, and agree on the solution that best manages overall risk',
      'Asbestos awareness training, refreshed regularly, before starting work — covering risks, types of ACMs, and what to do if they are encountered',
    ],
    correctAnswer: 0,
    explanation:
      'A CU change affects every circuit downstream. The new CU needs protective devices appropriate to the existing circuits — which means knowing cable sizes (was it 2.5 mm² ring? 4 mm² radial? what install method?), circuit lengths, ADS arrangement. Without the data you might fit a 32 A device where the cable only supports 27 A, or pick the wrong RCD type (AC where Type A is needed for downstream electronic loads).',
  },
  {
    id: 5,
    question: 'Designer\'s data should include declared compliance with BS 7671 plus any "departures". A departure is:',
    options: [
      'Below the 1.0 MΩ minimum from Table 64 → fail. Investigate: damaged cable insulation, water ingress at a back-box, a wired-up neutral that is touching earth somewhere, a trapped conductor under a pinch screw. Do not energise.',
      'A specific aspect of the design that does not comply with BS 7671 but achieves equivalent safety via an alternative standard or technical justification — must be documented on the EIC with the alternative referenced.',
      'Multiple hazards interact and compound each other — the combined effect can exceed the tower\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safety margin even when each individual hazard alone would not',
      'A simplified representation of the power distribution system showing transformers, switchgear, cables, and protection devices using single lines to represent three-phase circuits',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 permits departures where alternative standards or technical justifications give equivalent safety. Common examples: using a foreign standard equipment with documented equivalence, applying engineering judgement on conductor temperature rise in a specific situation, using a non-standard arrangement supported by calculation. ALL departures must be documented on the EIC — failing to record a departure invalidates the certificate.',
  },
  {
    id: 6,
    question: 'When initial verification information is incomplete or incorrect, the inspector\'s correct response is:',
    options: [
      'Regularly eating large quantities of food very quickly to the point of discomfort, with a feeling of loss of control, without compensatory purging',
      'Working out routing, clearances, fire-stopping, sequencing and access with mechanical, structural and architectural disciplines so that nobody\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s install conflicts with anyone else\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s.',
      'Stop, escalate to the designer/contractor, get the missing data, then proceed. Where data cannot be provided, document the limitation on the EIC and assess whether verification can proceed at all.',
      'Anyone working without close supervision (often by themselves on a site or in a property); needs check-in procedures, dynamic risk assessment, and a way to summon help',
    ],
    correctAnswer: 2,
    explanation:
      'Missing or wrong data invalidates the verification. The right response: stop, escalate, get the data. If data genuinely cannot be obtained, document the limitation on the EIC ("LIM") and assess whether the verification can proceed safely. Some limitations are tolerable (e.g. inaccessible junction box noted as observation); others are show-stoppers (e.g. unknown Ze means no Zs comparison possible).',
  },
  {
    id: 7,
    question: 'For a new build housing development, initial verification is typically carried out:',
    options: [
      'To take into account the general principles of prevention when carrying out design work and avoid foreseeable risks so far as is reasonably practicable',
      'From the load side of the RCD between L and PE — at the furthest practicable point on each circuit it protects, with both 0° and 180° starting phase',
      'For moderate to severe depression, or when the person has a history of recurrent depression and has previously responded well to antidepressants',
      'In stages — during erection (first-fix verification of buried items before cover-up), at second-fix completion, and final at energisation. Reg 641.1 explicitly covers "during erection and on completion".',
    ],
    correctAnswer: 3,
    explanation:
      'Verification during erection catches buried defects (cables in walls/floors before plastering) before they become difficult to inspect. Final verification at completion captures the energisable installation. Reg 641.1 explicitly covers both phases. Many large projects have a multi-stage inspection regime built into the contract.',
  },
  {
    id: 8,
    question: 'The information set for initial verification is also useful for:',
    options: [
      'Future periodic inspections, future alterations, fault diagnosis, scheme audit response, and as part of the Reg 132.13 documentation pack handed to the user.',
      'Use clear subject lines, keep messages short, only CC people who need it, and avoid sending sensitive info as attachments without checking the recipient',
      'Escalate above the supervisor (your own employer, the principal contractor, your scheme provider) and record the conversation in writing',
      'F10 notice (where required), site rules, fire plan, first-aid info, the H&S policy statement and current toolbox talk topics',
    ],
    correctAnswer: 0,
    explanation:
      'The verification information set has long-term value. It informs subsequent EICRs (what was the original design?), it supports alterations (what protective device characteristics? what conductor sizes?), it speeds fault diagnosis, it answers scheme audit questions, and it forms part of the documentation handed to the user under Reg 132.13. Treating verification info as throwaway is a wasted opportunity.',
  },
];

const faqs = [
  {
    question: 'What if the original designer cannot be contacted to provide the design data?',
    answer:
      'Common scenario. Options: (a) reverse-engineer the design from the as-installed equipment — measure cable sizes, identify protective device ratings, compute expected Zs and R1+R2 from cable data tables, then verify against your reverse-engineered design. (b) Where reverse-engineering is impossible (concealed cables, missing labels), document the limitations on the EIC and proceed with what you can verify. (c) For very old or undocumented installations, recommend a fresh design assessment alongside the verification.',
  },
  {
    question: 'Does initial verification include the supply intake equipment?',
    answer:
      'Up to the consumer side of the cut-out fuse, yes. The cut-out fuse, meter, and supply cable belong to the DNO and are not part of the consumer\'s installation. Verify your installation from the consumer side of the cut-out outwards (or from the meter outwards if a separate meter), and record any visible defects in the DNO equipment as observations on the EIC for the client to raise with the DNO.',
  },
  {
    question: 'What\'s the difference between "verification" and "inspection and testing"?',
    answer:
      'Verification is the broader concept — confirming the installation meets requirements. Inspection and testing are the two practical methods for verifying: inspection (visual checks per Reg 642) and testing (measurements per Reg 643). All testing is verification; not all verification is testing (some is visual). The EIC has a "Verification" page that summarises both.',
  },
  {
    question: 'How does the Reg 642.1 information set relate to the EIC fields?',
    answer:
      'The information you collect for verification populates the EIC. Maximum demand → EIC supply data section. Earthing arrangement (TN-S/TN-C-S/TT) → EIC supply data. Ze and PFC → recorded values on the EIC. Conductor type/size for each circuit → Schedule of Test Results. Protective device data → Schedule of Test Results. Most of the information set ends up documented on the cert pack — it\'s not just for your own use, it\'s for the duty holder\'s record.',
  },
  {
    question: 'What if I find the design assumptions were wrong during verification?',
    answer:
      'Stop, escalate to the designer. The verification has just identified a design issue, which is exactly what verification is meant to do. The designer needs to either (a) revise the design and re-verify, or (b) accept the as-built and certify it as a departure with technical justification. You as the verifier cannot just "make it work" by adjusting the design unilaterally — that mixes design and verification responsibilities and creates accountability problems. Document the issue, escalate, await design response.',
  },
  {
    question: 'How does initial verification interact with commissioning?',
    answer:
      'Initial verification confirms the installation meets BS 7671 — safe to energise and use. Commissioning confirms the installation works correctly for its intended purpose — switchgear operates, controls function, interlocks engage, fire alarm interfaces work, building management systems integrate. Verification is BS 7671 compliance; commissioning is functional acceptance. Both are required before formal handover. Section 6 of this module covers commissioning in depth.',
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 6"
            title="Initial verification — purpose and information set"
            description="Why we verify, what we verify, and the information you need in hand before starting — supply data, ADS arrangement, designer's data, as-built records."
            tone="emerald"
          />

          <TLDR
            points={[
              'Initial verification has three converging purposes: technical (BS 7671 compliance), legal (EAWR Reg 4(1) discharge), and documentary (evidence for the duty holder).',
              'Reg 642.1 lists the information needed BEFORE testing: max demand, conductor type/number, earthing arrangement, Ze, PFC at origin, protective device data, RCD types, conductor sizes/lengths.',
              'Without the information set, measurements are meaningless. A Zs reading needs the protective device data to compare against Table 41.3.',
              'Designer\'s data + as-built records + supply declaration form the verification baseline. Missing data = stop and escalate, or document as a limitation.',
              'Verification ≠ commissioning. Verification = BS 7671 compliance. Commissioning = functional acceptance. Both required for handover.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the three converging purposes of initial verification.',
              'List the information required by the inspector per Reg 642.1.',
              'Distinguish initial verification from periodic inspection.',
              'Describe the relationship between designer\'s data, as-built records and the verification process.',
              'Identify limitations and document them on the EIC where verification cannot be fully completed.',
              'Explain how the verification information set populates the EIC and Schedule of Test Results.',
              'Distinguish verification from commissioning.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The three purposes of initial verification</ContentEyebrow>

          <ConceptBlock
            title="Technical, legal, and documentary"
            plainEnglish="Initial verification isn't one thing with one purpose. It does three jobs simultaneously: confirms the installation works to BS 7671, discharges the contractor's EAWR duty, and creates the documented evidence the duty holder will rely on for years to come."
            onSite="Treat verification as all three at once. The dead-test sequence is the technical mechanism. The cert pack is the legal evidence. The hand-over conversation is the documentary completion."
          >
            <p>The three purposes unpacked:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Technical purpose.</strong> Confirm the installation complies with BS 7671
                — Section 41 protective measures in place, ADS coordinated, conductors sized for
                the load, IR within thresholds, polarity correct, RCDs operating within
                tolerances. The dead-test and live-test sequences are the methods.
              </li>
              <li>
                <strong>Legal purpose.</strong> Discharge the EAWR Reg 4(1) duty on the
                contractor — "construct so as to prevent danger" — and the Reg 14 duty —
                "verified before energising". Documentation of compliance is the legal evidence
                the duty was discharged.
              </li>
              <li>
                <strong>Documentary purpose.</strong> Produce the EIC + schedules + Reg 132.13
                documentation so the duty holder has the records needed for ongoing maintenance,
                future alterations, periodic inspection, and any incident investigation. The
                documents have value for the life of the installation.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (information required, paraphrased)"
            clause="The inspector shall, prior to commencing testing, ascertain and assess available information including: maximum demand of the installation; number and type of live conductors; type of earthing arrangement; Ze; prospective short-circuit current at the origin; type and rating of overcurrent protective devices; type and rating of RCDs; type and cross-sectional area of cables; lengths and routes of circuits being verified; designer's declared compliance and any departures from BS 7671."
            meaning={
              <>
                The Reg 642.1 information set is the verification baseline. Without it, tests are
                measurements without context. With it, every measurement can be compared against
                a designed expectation, deviations spotted, and conclusions drawn. Get the
                information first, then test.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.1 — paraphrased extract."
          />

          <SectionRule />

          <ContentEyebrow>The information set in detail</ContentEyebrow>

          <ConceptBlock
            title="Building the verification baseline"
            plainEnglish="You need to know what was designed before you can verify what was built. Supply characteristics, the ADS arrangement, the protective device strategy, the cable sizes and routes — all the design data goes into your test plan."
          >
            <p>Where each piece of information comes from:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Maximum demand.</strong> Designer's calculation. Used to confirm supply
                and main switch are adequately sized.
              </li>
              <li>
                <strong>Number and type of live conductors.</strong> Single-phase 2-wire, 3-wire
                (with neutral and CPC), three-phase 3-wire (delta) or 4-wire (star with neutral).
                Affects every test sequence and the Schedule of Test Results layout.
              </li>
              <li>
                <strong>Type of earthing arrangement.</strong> TN-S, TN-C-S (PME or PNB under
                A4:2026), or TT. Determines the ADS strategy, electrode requirement, and Ze
                origin.
              </li>
              <li>
                <strong>Ze.</strong> External earth fault loop impedance at the origin. From DNO
                declared values (TN-S typically 0.8 Ω max, TN-C-S 0.35 Ω max, TT very high) or
                measured. Adds to R1+R2 to give Zs.
              </li>
              <li>
                <strong>Prospective short-circuit current at origin.</strong> From DNO
                declaration (often 16 kA at the origin of typical urban supplies) or measured.
                Confirms breaking capacity of protective devices is adequate per Reg 434.5.
              </li>
              <li>
                <strong>Type and rating of overcurrent protective devices.</strong> MCB / RCBO
                type (B, C, D), rating (A), breaking capacity (kA). For each circuit. Drives
                the Zs comparison against Table 41.3.
              </li>
              <li>
                <strong>RCD types and IΔn values.</strong> AC, A, B, F type — with rated residual
                operating currents (typically 30 mA additional protection, 100 mA / 300 mA for
                fire / equipment protection). Drives the RCD test acceptance.
              </li>
              <li>
                <strong>Conductor types, sizes, lengths, routes.</strong> 1.5 / 2.5 / 4 / 6 / 10
                mm² typical domestic; T&E flat or singles in conduit etc. Lengths used to
                compute expected R1+R2 from cable data tables. Routes used to identify
                installation method for current-carrying capacity.
              </li>
              <li>
                <strong>Designer\'s declared compliance and any departures.</strong> Confirms
                what design standard the install was built to and any specific exceptions
                (recorded on EIC).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When information is missing or wrong</ContentEyebrow>

          <ConceptBlock
            title="Stop, escalate, document"
            plainEnglish="If the design data is incomplete, your verification baseline is incomplete. Test results without context don\'t prove compliance — they\'re just numbers. Stop and get the missing data before proceeding."
            onSite="The temptation is to push on. Don\'t. Half-verified installations get certified, defects don\'t get caught, and the certifier gets the call back later. Stop early and the conversation is \'I need this before I can certify\'. Stop late and the conversation is \'why did you certify with this defect?'."
          >
            <p>The escalation pathway when data is missing:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify what is missing.</strong> Cable sizes? Protective device data?
                Single-line diagram? Designer\'s departures?
              </li>
              <li>
                <strong>Escalate to the responsible party.</strong> Designer for design data.
                Constructor for as-built. Contracts manager for project documents. Client for
                history of the installation if it\'s an existing one.
              </li>
              <li>
                <strong>Set a reasonable timeframe.</strong> "I need this within 24 hours to
                proceed" — gives them a chance to find it without delaying the project unduly.
              </li>
              <li>
                <strong>If the data cannot be obtained, document a limitation.</strong> The EIC
                has space for limitations ("LIM") — record what couldn't be verified, why, and
                what the duty holder should do (e.g. "cable lengths inaccessible — recommend
                physical investigation at next alteration").
              </li>
              <li>
                <strong>Decide whether verification can proceed.</strong> Some limitations are
                acceptable; others are show-stoppers. Use professional judgement and document
                the rationale.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Proceeding to verify without the design data"
            whatHappens={
              <>
                You arrive at a small commercial fit-out. The contractor hands you the keys and
                disappears. No design pack provided. You start the dead-test sequence — readings
                fine. You pick up Ze at the supply intake — 0.45 Ω. You measure Zs at far ends —
                values come in around 0.8-1.2 Ω. You sign the EIC with these values, no idea
                whether they are within design intent. Six months later one circuit trips on a
                fault that should have been within the protective device's clearing time — but
                the circuit was actually a 50-metre run on 1.5 mm² cable that needed a Type C 16 A
                MCB, not the Type B 16 A actually fitted. You couldn't catch the design error
                because you never had the design data.
              </>
            }
            doInstead={
              <>
                Demand the design data before starting verification. If it doesn't arrive, stop
                and escalate. If you proceed with limitations, document them clearly on the EIC.
                The verification is only as strong as the information you have to verify against.
                "I tested everything I could see" is not the standard — "I verified compliance
                with the design and identified any deviations" is.
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

          <ConceptBlock
            title="Departures from BS 7671 — when and how to record them"
            plainEnglish="BS 7671 permits departures where a specific aspect of the design does not comply with the standard but achieves equivalent safety via an alternative standard or technical justification. Departures must be documented on the EIC with clear reference to the alternative basis. They are legitimate but must be transparent — undocumented departures invalidate the certificate."
            onSite="Don't hide departures. If the design uses a non-standard arrangement, write it on the EIC: what is the departure, what is the alternative justification, what standard or calculation supports it. The customer / future inspector / scheme assessor needs to see the engineering reasoning."
          >
            <p>Common scenarios involving departures:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Foreign-standard equipment with documented equivalence.</strong> European
                or international equipment built to a different standard but providing equivalent
                or superior safety. Document the standard reference and the equivalence basis.
              </li>
              <li>
                <strong>Alternative cable type / installation method.</strong> Engineering
                judgement on conductor temperature rise in a specific situation, supported by
                calculation rather than the generic Appendix 4 tables.
              </li>
              <li>
                <strong>Non-standard ADS arrangement.</strong> A design that achieves the Section
                411 protection objective via a non-standard route — e.g. using a contactor-based
                protective device with Class B isolation for a specific industrial process.
              </li>
              <li>
                <strong>Non-standard protective device coordination.</strong> Cascaded back-up
                fuse arrangement per manufacturer's tested coordination tables (Reg 434.5.1
                exception).
              </li>
              <li>
                <strong>Special location with non-standard zoning.</strong> Where the physical
                installation does not match the standard zone definitions but the design provides
                equivalent protection.
              </li>
            </ul>
            <p>
              Departures must be recorded on the EIC in the dedicated "Departures from BS 7671"
              section with:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The clause of BS 7671 from which the design departs.</li>
              <li>The alternative standard, calculation, or technical basis.</li>
              <li>Confirmation that equivalent safety is achieved.</li>
              <li>The signatory of the design who takes responsibility for the departure.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Limitations on the EIC — LIM and 'unable to verify'"
            plainEnglish="Limitations on a verification record acknowledge that some aspect could not be fully verified. Common reasons: inaccessible cables in walls, energised distribution that could not safely be de-energised, customer refused furniture move, missing as-built records on an existing installation. The limitation reduces the value of the verification — document clearly so the duty holder understands what was and wasn't checked."
            onSite="Don't fudge limitations. If you couldn't access something, mark LIM with a clear comment. The duty holder may agree to additional access (re-quote with a fuller scope), or accept the limitation knowing the gap. Either way, the limitation is honest documentation; the alternative is dishonest tick."
          >
            <p>Common limitation scenarios and how to record them:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Hidden cable routes.</strong> "Cable routes from CU to first-floor lighting
                circuits inaccessible without lifting carpets / floor coverings — visual inspection
                limited to terminations at CU and at accessories. Recommend physical investigation
                at next alteration."
              </li>
              <li>
                <strong>Energised equipment.</strong> "Distribution board DB-3 supplying critical
                process equipment — could not be safely de-energised within the agreed inspection
                window. Live-test sequence applied; dead-test sequence limited to circuits able to
                be isolated within the maintenance window."
              </li>
              <li>
                <strong>Furniture / fitted-furniture obstructing access.</strong> "Sockets behind
                fitted kitchen units inaccessible — visual confirmation limited to power
                availability via test plug. Recommend access at next kitchen refurbishment."
              </li>
              <li>
                <strong>Missing documentation on existing installation.</strong> "No design data
                or previous EIC available for the original 1980s installation. Verification
                limited to current condition assessment against current BS 7671 standards.
                Recommend reverse-engineered design assessment if alterations are planned."
              </li>
              <li>
                <strong>Special location items not fully assessable.</strong> "Section 705
                equipotential plane in the milking parlour cannot be verified for continuity
                without exposure of buried bonding mesh. Surface continuity at exposed equipment
                tested; underlying mesh integrity assumed per as-built records."
              </li>
            </ul>
            <p>
              Each limitation reduces the verification scope. The aggregate of limitations may
              warrant a recommendation for follow-up work. On EICR, individual limitations may
              attach to specific items; overall extent / limitations sit in Section D of the
              report front sheet.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Initial verification on additions and alterations — the focused scope"
            plainEnglish="Initial verification doesn't only apply to new installations. Additions and alterations to existing installations also need verification — but the scope is the new work, not the whole installation. The verifier confirms the new work complies AND that it doesn't degrade the safety of the existing."
            onSite="When you do an addition (e.g. add a new circuit for an EV charger), the EIC covers the new circuit. You don't re-verify every existing circuit. But you do confirm the existing installation can support the new load, the existing earthing is adequate, and the existing protective devices haven't been disturbed."
          >
            <p>The focused scope on additions / alterations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The new work itself.</strong> Full Reg 642 visual inspection of the new
                portion. Full Reg 643 test sequence on the new circuit / new portion.
              </li>
              <li>
                <strong>Impact on the existing installation.</strong> Confirm the existing CU has
                capacity for the new circuit. Confirm the existing earthing / bonding remains
                adequate (Table 54.7 / 54.8 still met for the new total demand). Confirm the
                existing protective devices haven't been disturbed.
              </li>
              <li>
                <strong>Maximum demand recalculation.</strong> Add the new load to the assumed
                existing demand. Confirm the supply / main switch / tails are still adequate.
                Notify the DNO if the new load exceeds the supply allocation.
              </li>
              <li>
                <strong>Special location triggered by the new work.</strong> Adding an EV charger
                creates a Section 722 location. Adding a swimming pool creates a Section 702
                location. The Part 7 items apply to the new installation in the new location.
              </li>
              <li>
                <strong>Documentation update.</strong> Update the circuit chart at the CU. Update
                the single-line diagram if applicable. Update the inspection date notice if the
                next interval changes.
              </li>
            </ul>
            <p>
              The EIC for additions / alterations records the new work specifically. The supply
              characteristics section may include the existing values (Ze, PFC) confirmed during
              the verification. Departures specific to the new work are recorded; existing
              non-compliances are noted as observations but not the focus of this EIC.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Initial verification timing — during erection vs at completion"
            plainEnglish="Reg 641.1 explicitly covers verification 'during erection and on completion before being put into service'. Many defects are best caught during erection — buried cables, hidden joints, behind-plaster routes. Wait until completion and they're inaccessible without destruction. Multi-stage verification is the practical answer on larger projects."
            onSite="On a new build, plan verification stages: first-fix (cables in before plastering — inspect routes, supports, depths), second-fix (accessories on, before energisation — visual inspection of finished install, dead tests), commissioning (live tests, functional checks). Sign the EIC at the end with all stages incorporated."
          >
            <p>Multi-stage initial verification approach:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-installation review.</strong> Design data available, materials confirmed
                appropriate, scope of work agreed. Design departures identified before they become
                site issues.
              </li>
              <li>
                <strong>First-fix verification.</strong> Cables in walls / floors / ceilings before
                cover-up. Visual inspection of cable routes, depths, supports, fire stopping at
                penetrations. Photograph everything that will be hidden. This is the only chance
                to verify Reg 522.6 zone compliance for cables that will be permanently
                inaccessible.
              </li>
              <li>
                <strong>Pre-energisation dead test.</strong> Continuity, IR, polarity, electrode
                resistance (TT) before any supply is connected. Catches faults before energisation
                risk.
              </li>
              <li>
                <strong>Energisation and live test.</strong> Zs, PFC, RCD, AFDD, polarity at
                accessories. The verification confirms the protective devices and ADS arrangement
                operate correctly.
              </li>
              <li>
                <strong>Functional and commissioning.</strong> Switchgear, interlocks, controls,
                fire alarm interfaces, BMS. Verifies the installation works for its intended use.
              </li>
              <li>
                <strong>Final EIC and handover.</strong> Pulls together every stage into the
                certificate pack. Hand-over conversation with the duty holder.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The verification report as a living document for the installation"
            plainEnglish="The EIC + schedules + Reg 132.13 documentation aren't disposable paperwork — they're the foundation document for everything that happens to the installation over its life. EICRs reference the EIC as a baseline. Alterations need the EIC's design data. Fault diagnosis benefits from the test history. Insurance claims rely on the certificate."
            onSite="Complete the verification documentation thoroughly the first time. Future you will be grateful when a customer calls in five years asking for a copy. Your replacement at a follow-on installer will be grateful when they need cable sizes from your schedule. The customer's future EICR inspector will be grateful for the baseline."
          >
            <p>How the verification documentation lives on:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Future EICRs.</strong> Reference the EIC for design intent. Compare current
                test results against the original baseline to detect deterioration.
              </li>
              <li>
                <strong>Alterations and additions.</strong> Cable sizes, protective device data,
                ADS arrangement all needed to size new circuits and confirm capacity.
              </li>
              <li>
                <strong>Fault diagnosis.</strong> Original test results inform what to expect.
                Significant deviation from baseline often indicates the fault location.
              </li>
              <li>
                <strong>Property sale and conveyancing.</strong> Solicitors check for current
                EICR and / or recent EIC. Missing documentation can delay or prevent a sale.
              </li>
              <li>
                <strong>Insurance claims.</strong> Following any electrical incident, insurers
                request the verification documentation. Missing or incomplete records can affect
                claim outcomes.
              </li>
              <li>
                <strong>Building Safety Act compliance (HRRBs).</strong> Higher-risk residential
                buildings have specific documentation retention requirements via the Building
                Safety Regulator.
              </li>
              <li>
                <strong>Scheme audit.</strong> The verification record is what your scheme
                assessor will examine on audit visits.
              </li>
              <li>
                <strong>HSE investigation.</strong> Following any reportable electrical incident,
                the verification documentation is one of the first things HSE will request.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Verification of an undocumented existing installation for a CU change"
            situation={
              <>
                A client has bought a 1980s detached house and wants the original ageing CU
                replaced with a modern 18th Edition compliant unit including AFDDs on bedroom
                circuits per A4:2026 Reg 421.1.7 recommendations. No historical EIC is available.
                Original circuit chart is faded and partial. You need to plan the verification.
              </>
            }
            whatToDo={
              <>
                Pre-quote stage: site visit to map the installation. Identify each circuit at
                the existing CU, trace where it goes (lighting circuits, ring finals, immersion,
                cooker, shower). Note cable types/sizes visible at the CU (you may need to lift
                some boards to get a clearer picture). Identify earthing arrangement (TN-S, TN-C-S,
                or TT) at the supply intake. Measure Ze. From this data construct the
                verification baseline yourself — expected Zs for each circuit, appropriate
                protective device sizes, RCD types based on downstream loads (Type A for any
                circuit feeding electronic equipment with DC components). Document your
                reverse-engineered design. Quote on basis of CU change + new EIC + full dead +
                live test sequence on every circuit. On the day, isolate, fit the new CU per your
                designed schedule, dead-test every circuit, energise per the test sequence,
                live-test, complete EIC + Schedule of Inspections + Schedule of Test Results,
                hand-over with new circuit chart and Reg 132.13 documentation. The reverse-
                engineered design now becomes the baseline for any future periodic inspection.
              </>
            }
            whyItMatters={
              <>
                Undocumented existing installations are common, especially after property changes
                hands. Verification is still possible, but it requires reverse-engineering the
                design before doing the work. Skipping that step and "just testing whatever\'s
                there" leads to incorrect protective device selection, inappropriate RCD types,
                and missed defects. The reverse-engineering effort is part of the job and should
                be priced in.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 641.1 (initial verification duty)"
            clause={
              <>
                Every installation shall, during erection and on completion before being put into
                service, be inspected and tested to verify, so far as is reasonably practicable,
                that the requirements of BS 7671 have been met.
              </>
            }
            meaning={
              <>
                Initial verification is the regulatory anchor — every installation, every time,
                before energising. The legal companion is the Electricity at Work Regulations
                1989, Reg 4(1) which makes maintaining the system safe a statutory duty. Initial
                verification provides the evidence that the duty was discharged at handover.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 641.1 — full text from published amendment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (inspection precedes testing)"
            clause={
              <>
                Inspection shall precede testing and shall normally be done with that part of
                the installation under inspection disconnected from the supply.
              </>
            }
            meaning={
              <>
                The verification process has a fixed sequence — inspection first, dead tests
                next, live tests last, all with the relevant part disconnected from the supply
                during the inspection. Pulling the sequence apart risks missing visible defects
                that should have been found before the meter ever went on the kit.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 642.1 — full text from published amendment."
          />

          <InlineCheck
            id="m5-s1-sub6-init-verif-three-purposes"
            question="An apprentice is asked &quot;why bother with initial verification on a small new circuit if you watched it being installed?&quot;. What&apos;s the honest answer?"
            options={[
              "Because the boss says so.",
              "Three converging reasons. Technical — BS 7671 Reg 641.1 requires every installation to be inspected and tested before being put into service. Legal — EAWR 1989 Reg 4(1) makes maintaining the system safe a statutory duty, and the EIC is the documentary evidence the duty was discharged at handover. Documentary — the customer / next inspector relies on the EIC for the design intent and the as-built measured values. Watching install ≠ verification.",
              "Because the trainer wants to see the apprentice doing tests.",
              "Verification is optional on small jobs.",
            ]}
            correctIndex={1}
            explanation="Initial verification is the legal, technical and documentary closure of every install. Reg 641.1 sets the technical duty; EAWR 1989 sits behind it as the statutory framework; the EIC is the deliverable. Watching the install gives no measured Zs, no IR readings, no recorded test data — none of which can be reconstructed later if a problem emerges."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Initial verification has three converging purposes: technical (BS 7671 compliance), legal (EAWR Reg 4(1) discharge), documentary (evidence for the duty holder).',
              'Reg 642.1 lists the information needed BEFORE testing — max demand, conductor data, earthing arrangement, Ze, PFC, protective device data, RCD types, cable sizes/lengths, designer\'s declared compliance and any departures.',
              'Without the information set, measurements are meaningless. Get the design data first, then test against it.',
              'Initial verification ≠ periodic inspection. Initial = new work compliance with current standards; periodic = existing installation\'s ongoing safety.',
              'Verification ≠ commissioning. Verification = BS 7671 compliance; commissioning = functional acceptance. Both required for full handover.',
              'Missing or wrong data = stop and escalate. If data cannot be obtained, document a limitation on the EIC ("LIM").',
              'For undocumented existing installations (e.g. CU change on old house), reverse-engineer the design BEFORE the work — verification baseline created by your survey, then the work and verification proceed against it.',
              'Verification information has long-term value: it informs future EICRs, alterations, fault diagnosis, scheme audit response, and the Reg 132.13 documentation pack.',
            ]}
          />

          <Quiz title="Initial verification purpose & information set — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.5 Safe isolation at L3 depth
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 2 — Visual inspection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
