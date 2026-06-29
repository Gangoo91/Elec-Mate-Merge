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
    id: 'patm1-s1-name',
    question:
      'A client insists "PAT testing" must be done annually because the law says so. What is the technically accurate position?',
    options: [
      'Correct — annual PAT testing is a legal requirement under EAWR Reg 4(2).',
      '"PAT testing" is not a legal term; EAWR Reg 4(2) requires risk-based maintenance, not a fixed annual cycle.',
      'Only the IET Code of Practice makes annual testing mandatory in commercial premises.',
      'PUWER Reg 6 sets a fixed 12-month maximum interval for all portable equipment.',
    ],
    correctIndex: 1,
    explanation:
      'No statute uses the phrase "PAT testing" or sets a fixed interval. EAWR Reg 4(2) imposes the maintenance duty; HSG107 and the IET CoP give risk-based guidance on how to discharge it — frequency is set by the type of equipment, environment, user and defect history, not bought as an annual cycle. Selling clients a fixed annual cycle as "the law" is a common but inaccurate compliance pitch.',
  },
  {
    id: 'patm1-s1-scope',
    question:
      'Which item below is OUTSIDE the scope of PAT (in-service inspection and testing of electrical equipment) as set out by HSG107 and the IET CoP?',
    options: [
      'A 230 V kettle on a kitchenette countertop in a small office.',
      'A floor-cleaning machine plugged into a 13 A socket.',
      'The fixed wiring of the office socket-outlet that the kettle is plugged into.',
      'An IT extension lead in daily use.',
    ],
    correctIndex: 2,
    explanation:
      'Fixed wiring is verified under BS 7671 (initial verification + EICR) — not under PAT. The IET CoP scope is "equipment connected to a fixed installation by means of a flexible cable, plug and socket, or by spur, that is intended to be moved or repositioned in normal use, or whose location is fluid".',
  },
  {
    id: 'patm1-s1-duty',
    question:
      'Who carries the EAWR Reg 4(2) "system maintenance" duty for portable equipment in a leased office building?',
    options: [
      'The landlord of the building, in all cases.',
      'The PAT engineer engaged to test the equipment.',
      'The duty-holder — usually the employer/occupier whose equipment it is and whose staff use it.',
      'The HSE inspector who carries out the workplace inspection.',
    ],
    correctIndex: 2,
    explanation:
      'EAWR Reg 3 defines the duty-holder broadly. For portable equipment in daily workplace use the duty-holder is the employer/occupier. A tenancy contract may transfer aspects of practical responsibility, but sub-contracting the test does not sub-contract the statutory duty (HSG107 §15-17).',
  },
  {
    id: 'patm1-s1-evidence',
    question:
      "After an electric shock incident, an HSE inspector asks for evidence the duty-holder has maintained portable equipment 'so far as reasonably practicable'. What is the minimum acceptable evidence trail?",
    options: [
      "A box of pass/fail labels with this year's date stickered on each appliance.",
      'A documented programme: register, risk-assessed frequencies, inspection-and-test records, defect/repair history — all retrievable.',
      'A verbal assurance from the engineer that every item passed on the day.',
      'The original purchase receipts and warranties for the appliances.',
    ],
    correctIndex: 1,
    explanation:
      'HSG107 §22-25 makes records the practical demonstration of compliance. The defendable trail is the programme — equipment register, user-check guidance, formal visual and combined inspection-and-test records, defect/repair history and re-test results — including evidence that frequencies were chosen by risk assessment, not bought by the page. Pass labels alone are not records.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which legal instrument actually sits behind what the trade calls "PAT testing"?',
    options: [
      'The Electricity at Work Regulations 1989, Reg 4(2).',
      'The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment.',
      'BS 7671:2018+A4:2026, Chapter 64 on inspection.',
      'A standalone "Portable Appliance Testing Act" of 1989.',
    ],
    correctAnswer: 0,
    explanation:
      'EAWR 1989 Reg 4(2), the "system maintenance" duty, is the foundation: "As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger." HSG107 and the IET CoP are guidance / industry consensus on how to discharge that duty — they are not the law itself.',
  },
  {
    id: 2,
    question:
      'A duty-holder argues PAT testing is unnecessary because "BS 7671 covers everything". Why is that wrong?',
    options: [
      'Because BS 7671 is only an advisory document with no statutory force.',
      'Because BS 7671 was withdrawn and replaced by the A4 amendment in 2026.',
      'Because BS 7671 covers the fixed installation, not equipment plugged into it.',
      'Because PAT replaces BS 7671 entirely in commercial premises over a set size.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 covers the fixed installation up to socket-outlets and final connections, but not the in-service condition of equipment connected via plug and socket — that is IET CoP / HSG107 territory. Reg 110.1.1 expressly excludes equipment in normal use after connection. Confusing the two is a common defence that does not survive an HSE interview under caution.',
  },
  {
    id: 3,
    question:
      'HSG107 (4th Edition) makes the case that an over-extensive PAT programme can itself create risk. Why?',
    options: [
      'Because it costs more per item than a leaner risk-based programme.',
      'Because it automatically triggers extra Reg 4(2) liabilities on the duty-holder.',
      'Because it requires a higher-specification class of test instrument.',
      'Because excessive disconnection wears terminations and over-testing buries real defects.',
    ],
    correctAnswer: 3,
    explanation:
      'Excessive disconnection / re-connection wears terminations, handling damages cables, and over-testing drowns the records that matter — so real defects get missed. HSG107 §10 and the IET CoP are explicit that frequency must be proportionate: a low-risk Class II IT lead in an office should not be on the same regime as a 110 V site transformer.',
  },
  {
    id: 4,
    question:
      'The phrase "in-service inspection and testing of electrical equipment" appears repeatedly in the IET CoP. What is the deliberate emphasis of "in-service"?',
    options: [
      'Equipment in current operational use after installation, not on a manufacturer test bench.',
      'Equipment that has been pre-approved and type-tested by the IET before sale.',
      'Equipment that is covered by an ongoing maintenance service contract.',
      'Equipment that is immobile and permanently fixed in place.',
    ],
    correctAnswer: 0,
    explanation:
      "The IET CoP (5th Edition, 2020) Foreword and §3 clarify the scope: equipment in service. The point is to mark off where the manufacturer's type-test ends and the user / duty-holder's maintenance regime begins.",
  },
  {
    id: 5,
    question:
      'Which of the following is NOT one of the four pillars of a defendable PAT programme as set out in HSG107?',
    options: [
      'User checks before every use, by the person using the equipment.',
      'Formal visual inspection by a competent person at intervals proportionate to risk.',
      'Combined inspection and test (with instrument readings) at risk-based intervals.',
      'A blanket annual electrical test of every appliance regardless of risk.',
    ],
    correctAnswer: 3,
    explanation:
      'Blanket annual testing is precisely the approach HSG107 §10-12 argues against. The four pillars are: (1) user checks, (2) formal visual inspection, (3) combined inspection and test, and (4) records. Frequency for (2) and (3) is risk-driven.',
  },
  {
    id: 6,
    question:
      'A new client tells you their previous engineer "PAT tested" 800 items in a single morning. From a competence-and-evidence perspective, what is the warning sign?',
    options: [
      'Nothing — fast workers are simply efficient and should be trusted.',
      'The price the previous engineer quoted for the whole job.',
      'The arithmetic: 800 items in a morning is roughly 22 seconds each, far too fast for a genuine inspection.',
      'The fact that the previous engineer used an older analogue tester.',
    ],
    correctAnswer: 2,
    explanation:
      'A genuine inspection — visual, functional and electrical, with records — is rarely under 4-6 minutes per item, so ~22 seconds each is incompatible with HSG107 §40-44 and IET CoP Ch 14 workflow. This is the canonical "pass-label-on-the-bottom" engagement. From the duty-holder\'s point of view, accepting that paperwork as evidence of EAWR Reg 4(2) compliance is what fails an HSE investigation, not the price.',
  },
  {
    id: 7,
    question:
      'Section 2(1) of the Health and Safety at Work etc Act 1974 requires every employer to ensure, "so far as is reasonably practicable", the health, safety and welfare of employees. How does that connect to PAT?',
    options: [
      'HSWA is the over-arching duty that EAWR, PUWER and the sector guidance sit beneath.',
      'It does not — HSWA is unrelated to electrical work in the workplace.',
      'HSWA replaces EAWR entirely for portable appliances.',
      'HSWA only applies where the equipment is rated over 1 kW.',
    ],
    correctAnswer: 0,
    explanation:
      'The legal pyramid is HSWA → EAWR → PUWER → HSG107 / IET CoP. Knowing where in that pyramid your evidence sits is what makes a programme defendable rather than just compliant-looking.',
  },
  {
    id: 8,
    question:
      'An office manager says "we don\'t do PAT testing because we have no high-risk equipment". From an HSG107 perspective, what is the correct response?',
    options: [
      'They are right — low-risk environments are wholly exempt from the duty.',
      'PAT is mandatory on a fixed annual cycle regardless of the risk level.',
      'They should simply consult their landlord and follow whatever it advises.',
      'Indg236 is explicit that low-risk environments still need a maintenance regime, just a lighter one.',
    ],
    correctAnswer: 3,
    explanation:
      'Indg236 ("Maintaining portable electric equipment in low-risk environments") is the HSE\'s direct response to over-zealous testing in offices. It still requires a maintenance regime — usually reduced to user checks plus periodic formal visual, with electrical testing on a small subset. The duty does not disappear; the frequency adjusts.',
  },
  {
    id: 9,
    question:
      'Why does the IET Code of Practice deliberately stop short of mandating fixed test intervals?',
    options: [
      'Because intervals must be set by risk assessment of equipment, environment, user and history.',
      'Because the IET committee could not reach agreement on suitable intervals.',
      'Because the EAWR overrides the IET CoP on the question of frequency.',
      'Because BS 7671 sets the intervals for in-service equipment instead.',
    ],
    correctAnswer: 0,
    explanation:
      'The IET CoP Table 7.1 publishes "initial frequencies" as a starting suggestion only and explicitly tells the duty-holder to revise them based on the inspection / test history. Fixed mandated intervals would defeat the risk-based foundation of the whole regime.',
  },
  {
    id: 10,
    question:
      'A claim is brought by an injured employee against the employer following an electrical shock from a faulty extension lead. The employer produces a stack of pass-labels but no equipment register, no risk-assessed frequencies, no defect history. In court, why is this evidence almost worthless?',
    options: [
      'Because the pass labels are presumed by the court to be forged.',
      'Because pass labels are not themselves a legal requirement under EAWR.',
      'Because a pass label evidences only that someone affixed it, not what was actually inspected or fixed.',
      'Because the colour scheme used on the pass labels was wrong.',
    ],
    correctAnswer: 2,
    explanation:
      'The court asks: did you have a system, did you operate it, can you show me you did? Stickers on items answer none of those. The programme — register, risk assessment, inspection records, instrument readings, defect log, repair evidence, re-test results — is what discharges the EAWR / HSWA burden.',
  },
];

const PATTestingModule1Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'What is PAT testing and why it is required | PAT Module 1.1 | Elec-Mate',
    description:
      'EAWR Reg 4(2), HSWA s.2, PUWER Reg 5 + 6, HSG107 and the IET Code of Practice — what "PAT testing" actually is, the legal pyramid behind it, and why a programme (not a sticker) is what evidences compliance.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1"
            title="What is PAT testing and why it is required"
            description="The phrase 'PAT testing' is shorthand. The reality is in-service inspection and testing of electrical equipment — a documented, risk-based regime that discharges EAWR Reg 4(2) and HSWA s.2 duties. Stickers do not evidence compliance; programmes do."
            tone="yellow"
          />

          <TLDR
            points={[
              '"PAT testing" is the trade nickname for in-service inspection and testing of electrical equipment as set out in the IET Code of Practice (5th Edition, 2020) and HSE HSG107 (4th Edition).',
              'The legal anchor is EAWR 1989 Reg 4(2): "all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger". Reg 4(2) covers the appliance, its flex, the plug, and any connector — not just fixed wiring.',
              'There is no statutory frequency. HSG107 §10-12 and IET CoP Table 7.1 are explicit that intervals are risk-based — equipment, environment, user, and history.',
              'BS 7671 stops at the socket-outlet (Reg 110.1.1). Everything plugged into it is governed by HSG107 / IET CoP. Confusing the two is a common (and indefensible) compliance gap.',
              'Defendable evidence is the programme: equipment register, risk-assessed frequencies, user-check guidance, formal visual records, combined inspection-and-test results, defect / repair history. A drawer of pass-labels is not evidence.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what "PAT" actually means in the IET Code of Practice and why the term is editorial shorthand, not a legal term',
              'Trace the legal pyramid from HSWA 1974 → EAWR 1989 Reg 4(2) → PUWER 1998 Reg 5/6 → HSG107 / IET CoP for any portable-equipment scenario',
              'Identify the boundary between BS 7671 (fixed installation) and the IET CoP (in-service equipment), and apply it correctly to plug-in equipment, fixed equipment, and hand-held tools',
              'Defend the principle that frequency is risk-based and explain why fixed-interval programmes fail HSE scrutiny',
              'Describe the four pillars of a defendable in-service maintenance programme and the records each pillar produces',
              'Distinguish between a duty-holder who has discharged Reg 4(2) "so far as is reasonably practicable" and one who has merely bought stickers',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What "PAT testing" actually is</ContentEyebrow>

          <ConceptBlock
            title="The phrase, the reality, and why the difference matters"
            plainEnglish="PAT — Portable Appliance Testing — is what the trade and most clients call it. The IET Code of Practice and HSE guidance call it 'in-service inspection and testing of electrical equipment'. The longer phrase is the accurate one because it captures the three things that matter: the equipment is in service (not on a manufacturer bench), the regime is inspection AND test (not just one), and it is electrical equipment in the IET sense — not just appliances on a desk."
            onSite="When a client books 'annual PAT', read the brief carefully. They usually mean the whole programme — user-check awareness, formal visual, combined test, paperwork. Selling them only the instrument-test step misrepresents the duty being discharged."
          >
            <p>
              The IET Code of Practice for In-service Inspection and Testing of Electrical Equipment
              (5th Edition, 2020) is the document the trade is actually following when it says
              "PAT". The CoP scope covers equipment connected to a fixed installation by flexible
              cable, plug and socket, or by spur — equipment that is moved, repositioned, or whose
              location is fluid in normal use. The IET CoP deliberately uses the verbose phrase
              because the term "PAT" undersells what is being done.
            </p>
            <p>
              HSE HSG107 ("Maintaining portable and transportable electrical equipment", 4th
              Edition) is the regulator's view of how to discharge the underlying statutory duty.
              HSG107 is guidance, not law — but in any HSE investigation or civil claim, it is the
              benchmark the duty-holder will be measured against. Diverging from HSG107 is
              permissible if the alternative produces equivalent or better risk control; diverging
              from it without evidence is the opposite of defensible.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Electricity at Work Regulations 1989 · Reg 4(2)"
            clause={
              <>
                As may be necessary to prevent danger, all systems shall be maintained so as to
                prevent, so far as is reasonably practicable, such danger.
              </>
            }
            meaning="This is the law that PAT discharges. Every word of it earns its place: 'as may be necessary' puts the burden on risk assessment; 'all systems' includes the appliance, flex, plug and connectors (Reg 2(1) defines 'system' as everything from generation to point of use); 'so far as is reasonably practicable' imports the HSWA proportionality test."
          />

          <ConceptBlock
            title="The legal pyramid — HSWA, EAWR, PUWER, HSG107"
            plainEnglish="There is no single PAT statute. There is a stack of overlapping duties, each tighter in scope than the one above. Knowing where a particular item of evidence fits in the stack is what separates a defendable programme from a stack of paper."
          >
            <p>The duties stack as follows:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-elec-yellow">HSWA 1974 s.2(1)</strong> — every employer
                shall ensure, so far as is reasonably practicable, the health, safety and welfare at
                work of all employees. The over-arching civil and criminal duty.
              </li>
              <li>
                <strong className="text-elec-yellow">EAWR 1989 Reg 4(2)</strong> — system
                maintenance to prevent danger. The electrical-specific application of HSWA. This is
                the regulation that "PAT" most directly discharges.
              </li>
              <li>
                <strong className="text-elec-yellow">PUWER 1998 Reg 5</strong> — work equipment
                shall be maintained in efficient working order and good repair, with a maintenance
                log where appropriate.
              </li>
              <li>
                <strong className="text-elec-yellow">PUWER 1998 Reg 6</strong> — work equipment
                exposed to deteriorating conditions shall be inspected at suitable intervals, by a
                competent person, with results recorded.
              </li>
              <li>
                <strong>HSG107 (4th Ed)</strong> — HSE guidance on what a maintenance programme for
                portable electrical equipment should look like in practice.
              </li>
              <li>
                <strong>Indg236</strong> — HSE leaflet specifically for low-risk environments
                (offices, retail, light commercial). Confirms the duty does not disappear; the
                frequency and depth of testing reduce.
              </li>
              <li>
                <strong>IET Code of Practice (5th Ed, 2020)</strong> — the industry-consensus
                operational document. Contains the test methods, the suggested frequencies in Table
                7.1, the equipment classification (Class I / II / III), and the acceptance criteria
                used by every multifunction PAT instrument.
              </li>
            </ul>
            <p>
              When evidence is challenged in court or by an HSE inspector, the question is not "did
              you do PAT?" — it is "did you have a system that satisfies HSWA s.2 / EAWR Reg 4(2),
              and can you show the records that prove it?". The IET CoP and HSG107 are the measuring
              sticks for "did you have a system".
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE HSG107 (4th Edition) · paragraph 10"
            clause={
              <>
                There is no statutory requirement for the testing of electrical equipment to take
                place at fixed intervals. The frequency of inspection and testing should be
                determined by the duty-holder, taking into account the type of equipment, how often
                and how it is used, and the environment in which it is used.
              </>
            }
            meaning="The single most-cited paragraph in HSG107 — and the one most often ignored. It demolishes the 'annual everything' sales pitch. Frequency must be reasoned, recorded and revised on the basis of inspection history. A flat annual cycle that does not reflect risk is itself a defect in the programme."
          />

          <SectionRule />

          <ContentEyebrow>The boundary — BS 7671 vs IET CoP</ContentEyebrow>

          <ConceptBlock
            title="Where the fixed installation ends and in-service begins"
            plainEnglish="BS 7671 covers the fixed wiring, switchgear, distribution boards, and final connections to fixed equipment — up to and including the socket-outlet. The IET CoP covers everything connected via plug and socket and used in service. The boundary is the socket pin."
          >
            <p>
              BS 7671 Reg 110.1.1 is explicit about its scope. It applies to the design, erection
              and verification of electrical installations — and stops there. Items connected via a
              13 A plug or a 16 A / 32 A industrial connector and intended to be moved in normal use
              fall outside Reg 110.1.1 and inside the IET CoP.
            </p>
            <p>
              That boundary matters because the test methods, acceptance values and competency
              requirements are different on each side:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 7671 side:</strong> initial verification (Reg 643), periodic inspection /
                EICR (Chapter 65), Reg 134 "good workmanship". Tests are continuity, IR, polarity,
                Zs, RCD, prospective fault current — all on the fixed installation.
              </li>
              <li>
                <strong>IET CoP side:</strong> user check, formal visual inspection, combined
                inspection and electrical test. Tests are protective-conductor continuity, IR (or
                PE-leakage / substitute leakage), Class II touch-current, lead polarity, plug fuse
                rating, RCD on portable RCDs only.
              </li>
              <li>
                <strong>The grey area:</strong> hard-wired equipment (cookers, immersions, hand
                driers, electric showers) is BS 7671 territory at installation but its in-service
                condition is increasingly inspected under the broader CoP umbrella as
                "transportable" or "fixed equipment" — the IET CoP §3.1 covers this and gives test
                guidance specific to fixed appliances.
              </li>
            </ul>
            <p>
              The compliance error to avoid is this: a duty-holder produces an EICR for the fixed
              wiring and assumes that satisfies their Reg 4(2) duty for the kettles, microwaves,
              extension leads and IT equipment. It does not. The EICR confirms the wiring is safe up
              to the socket; the socket says nothing about what is plugged into it.
            </p>
          </ConceptBlock>

          <Scenario
            title="Office relocation — the EICR-only defence"
            situation="An office relocates. The new tenant procures a periodic inspection (EICR) of the new fixed installation, which comes back coded C2-C3 and is remediated to satisfactory. Six months later an employee receives a 230 V shock from an extension lead damaged during the move. The employer points to the EICR as evidence of compliance with their electrical duties."
            whatToDo="The EICR does not discharge the EAWR Reg 4(2) duty for the extension lead. The lead is in-service equipment and needed (a) a user check at the time of the move, (b) a formal visual inspection on arrival in the new location given the move was a foreseeable opportunity for damage, and (c) inclusion in the equipment register going forward. Re-paper the programme: register, risk assessment, formal visual records, and a combined inspection-and-test of every flex, lead and adapter in the new premises. Document the gap and the remedial actions taken."
            whyItMatters="HSE inspectors look for the boundary error — the duty-holder who confused fixed-wiring evidence with in-service-equipment evidence. It is one of the most-cited reasons for finding the duty was not adequately discharged in workplace-shock investigations."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <CommonMistake
            title="Selling 'annual PAT' as a legal requirement"
            whatHappens="The client is told their insurance / the law requires annual PAT testing. They authorise a blanket annual cycle. Low-risk Class II IT equipment is over-tested, which (per HSG107 §10) introduces wear at plug terminations and creates false confidence. High-risk site tools are under-tested because the programme is calendar-driven, not risk-driven. When a defect injury arises, the employer cannot show frequencies were chosen by risk assessment — only that they were chosen by the engineer's invoice."
            doInstead="Lead with the risk assessment. Reference HSG107 §10 — there is no statutory frequency. Explain the IET CoP Table 7.1 starting frequencies are an initial proposal that the duty-holder revises based on inspection / test history. Document the reasoning. The deliverable is the maintenance regime, not the labels."
          />

          <SectionRule />

          <ContentEyebrow>The four pillars of a defendable programme</ContentEyebrow>

          <ConceptBlock
            title="Pillar 1 — User checks before every use"
            plainEnglish="The user looks at their kettle, drill, or extension lead before they plug it in. Damaged flex, cracked plug, signs of overheating, smell of burnt insulation — they take it out of service. This is the cheapest, most frequent, and arguably most effective limb of the entire programme."
          >
            <p>
              HSG107 §27-30 names the user check as the first line of defence. The check is not a
              formal inspection — it is a "look at it before you plug it in" moment, and the duty of
              the employer is to make sure users know what to look for and have a route to take
              defective equipment out of service. The IET CoP §10 lists what users should be trained
              to spot:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Damage to the cable sheath or visible inner cores</li>
              <li>Cracked, broken or burned plug body / plug top</li>
              <li>Signs of overheating — discoloured plastic, melted areas, distinctive smell</li>
              <li>Loose plug pins, exposed wiring, missing screws</li>
              <li>Equipment that has tripped a circuit and been "reset" without diagnosis</li>
              <li>Equipment used in a way the user knows is outside its intended use</li>
            </ul>
            <p>
              The records side of the user-check pillar is light: a poster, a toolbox-talk
              attendance log, a "fault report" route (sticker, email, in-app) that produces an
              auditable record of what users found and what was done about it. That last line — what
              was done about it — is what differentiates a real programme from a theoretical one.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Pillar 2 — Formal visual inspection by a competent person"
            plainEnglish="A trained but not necessarily instrument-qualified person inspects the equipment thoroughly without removing covers — flex condition, plug and connector, casing, controls, signs of misuse — and records the findings. Forms the bulk of an in-service programme."
          >
            <p>
              IET CoP §14 sets out what a formal visual inspection covers. The inspector
              systematically checks:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                The flex / cable along its full length, including the entry to the equipment and to
                the plug
              </li>
              <li>
                The plug — pins, fuse rating against equipment rating, secure cord grip, no visible
                cores at the cord entry
              </li>
              <li>Any in-line connector, switch, FCU or transformer in the lead</li>
              <li>The equipment casing — cracks, damage, any compromised insulation</li>
              <li>Switches, indicators, controls — operate as intended, securely fixed</li>
              <li>
                Environmental signs of misuse — dust ingress, water ingress, mechanical damage,
                location vs intended use
              </li>
              <li>
                The presence and legibility of equipment markings — class symbol, voltage, current,
                IP rating, manufacturer
              </li>
            </ol>
            <p>
              The visual inspection alone resolves the majority of defects HSG107 §40 attributes to
              in-service portable equipment — the bulk of which are flex damage, plug top damage,
              and incorrect fuse ratings. A combined inspection-and-test that does not include a
              formal visual is effectively skipping the test step that finds most faults.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice for In-service Inspection and Testing of Electrical Equipment (5th Ed, 2020) · §14"
            clause={
              <>
                A formal visual inspection should be carried out at intervals which are appropriate
                to the type of equipment and the environment in which it is used. The formal visual
                inspection should be carried out by a person who is competent to do so. The
                inspection should not require the dismantling of the equipment.
              </>
            }
            meaning="Two non-negotiables in one paragraph: competence, and no dismantling. A formal visual is rigorous but external. Anything requiring covers off escalates to the combined inspection-and-test stage and a different competence threshold."
          />

          <ConceptBlock
            title="Pillar 3 — Combined inspection and test"
            plainEnglish="The competent person performs the formal visual AND connects an instrument to test protective-conductor continuity, insulation resistance (or substitute leakage), and any class-specific tests. Records the readings, the equipment ID, the date, the result, and the inspector identity. This is what most clients picture when they hear 'PAT testing'."
          >
            <p>
              The combined inspection and test is the activity at the heart of what most engineers
              do. The IET CoP Chapter 14 prescribes the test sequence, the acceptance values, and
              the order of tests. The headline tests are:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Protective-conductor (earth) continuity</strong> — Class I only. Acceptance
                limits depend on the equipment rating and flex length (IET CoP §15.4 / Table 15.1).
              </li>
              <li>
                <strong>Insulation resistance</strong> — measured at 500 V dc between live
                conductors and earth (Class I) or between live conductors and any accessible
                conductive part (Class II). Pass &ge; 1 MΩ for portable equipment with heating
                element &ge; 3 kW; &ge; 1 MΩ general; check IET CoP §15.5 for category-specific
                values.
              </li>
              <li>
                <strong>Touch current / substitute leakage / PE leakage</strong> — alternatives or
                additional tests depending on equipment type and instrument capability.
              </li>
              <li>
                <strong>Functional / load test</strong> — verifies the equipment energises and
                operates as intended.
              </li>
              <li>
                <strong>Polarity</strong> — IEC plugs and any leads with their own connector body.
              </li>
            </ul>
            <p>
              The combined inspection-and-test step generates the numerical evidence (continuity,
              IR, leakage values) that supports the pass/fail. A pass label without underlying
              numerical readings is not what HSG107 §22 calls a record — it is a claim.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Pillar 4 — Records, retrievability, and history"
            plainEnglish="The fourth pillar is the one that gets sold short. An equipment register, a risk-assessed frequency for each equipment class, a record of every inspection and test, every defect found, every repair done, every re-test result. Retrievable — meaning someone can find it without reconstructing it from invoices."
          >
            <p>
              HSG107 §22-25 makes records the practical demonstration of compliance. The records
              that matter:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Equipment register / asset list</strong> — every item in scope, with a
                unique ID, location, owner, class, rating, and acquisition history.
              </li>
              <li>
                <strong>Risk assessment</strong> — the reasoning behind the frequency assigned to
                each equipment class. References the environment, user, history, and IET CoP Table
                7.1 starting point. Reviewed and revised, with version history.
              </li>
              <li>
                <strong>Inspection / test records</strong> — for each event: date, ID, inspector,
                instrument used (and its calibration date), tests performed, numerical readings,
                pass/fail, defects noted.
              </li>
              <li>
                <strong>Defect / repair / disposal log</strong> — what was found, what was done, who
                did it, what the re-test confirmed.
              </li>
              <li>
                <strong>Inspector competence evidence</strong> — qualifications, in-house training,
                instrument-specific training.
              </li>
            </ul>
            <p>
              The IET CoP §7.4 and HSG107 §22 align on the retention period: the records should be
              kept for at least one full inspection cycle so that trends can be detected — and
              indefinitely where reasonably practicable, because they are the evidence used in any
              subsequent investigation.
            </p>
          </ConceptBlock>

          <Scenario
            title="The stack-of-pass-labels defence"
            situation="A workplace-shock claim is brought. The employer's defence files a binder of pass-label register prints: 800 items, all dated within the last 12 months, all marked PASS. There is no equipment register beyond the label list. There is no risk assessment. There are no instrument readings — only PASS or FAIL. The original engineer has left the testing company and cannot be located. Their multifunction tester's serial number is on the labels but its calibration history is unavailable."
            whatToDo="Treat this as a programme that has failed every pillar except pillar 3, and even pillar 3 is unsupported by underlying numerical evidence. Reconstruct, going forward: build the equipment register from scratch, perform a risk assessment that drives frequencies, perform a complete combined inspection and test producing numerical readings, log defects honestly, repair/replace, re-test. Disclose the historical gap if asked — but the going-forward programme is what the duty-holder can defend on. The historical labels are not defendable."
            whyItMatters="HSG107 §22-25 frames the records as the demonstration of compliance. A duty-holder who has the labels but not the records has an artefact of an activity, not evidence of a programme. In litigation, the gap becomes the story."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why the regime exists — the actual data</ContentEyebrow>

          <ConceptBlock
            title="What goes wrong with portable equipment, and how often"
            plainEnglish="HSE workplace-incident data and Indg236 break down what actually causes electrical injury at work. The pattern is consistent across decades: damaged flexes and plug tops, cumulative wear at terminations, mis-rated fuses, and equipment used outside its intended environment. The PAT regime is calibrated to catch exactly those things."
          >
            <p>
              The HSE has long published that around a quarter of all reportable workplace
              electrical accidents involve portable equipment of some kind. The dominant defect
              categories — drawn from HSG107 commentary and the IET CoP introduction — are:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Flex damage</strong> — kinks, cuts, abrasion, crushing under wheels or feet,
                repeated bending at the strain relief.
              </li>
              <li>
                <strong>Plug-top defects</strong> — cracked bodies, broken pins, loose terminals,
                wrong fuse rating, missing cord grip engagement.
              </li>
              <li>
                <strong>Connector / coupler defects</strong> — overheating, polarity reversal on IEC
                connectors, ingress.
              </li>
              <li>
                <strong>Class I PE-continuity loss</strong> — the protective conductor at the plug
                or at the equipment terminal becoming open or high-resistance.
              </li>
              <li>
                <strong>Insulation breakdown</strong> — moisture or dust ingress, mechanical
                puncture, cumulative thermal stress.
              </li>
              <li>
                <strong>Modification / misuse</strong> — daisy-chained extension leads, unrated
                adaptors, equipment used in environments it was not designed for.
              </li>
            </ul>
            <p>
              Pillar 1 (user checks) and pillar 2 (formal visual) together catch the majority of
              these — most are visible. Pillar 3 (combined inspection and test) catches the rest,
              particularly the PE-continuity loss and the insulation breakdown, which are not
              externally visible. The four pillars are designed to interlock — removing any one
              creates a class of defect the regime no longer catches.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the test instrument as the programme"
            whatHappens="The engineer arrives, plugs each item into the multifunction tester, takes the green-light readings, prints labels, leaves. No formal visual was performed. No risk-based frequencies were set. The instrument cannot detect a half-cracked plug body, a flex with sheath damage 1 m from the entry, a rating mismatch on the fuse, or a hand-held tool whose insulation is fine but whose enclosure is not rated for the environment. All of these will pass the instrument and fail the user."
            doInstead="The instrument is one limb of pillar 3. It does not replace pillars 1, 2, or 4. The IET CoP §14 expressly puts the formal visual inspection BEFORE the electrical test in the sequence — because if the visual reveals a fault, you do not energise and test, you withdraw the equipment. Engineer who tests-then-looks has the order wrong."
          />

          <CommonMistake
            title="Confusing competence with certification"
            whatHappens="The trade has marketed the City and Guilds 2377-22 (or equivalent) as 'the PAT qualification'. A holder of the certificate is taken to be competent. In reality, the IET CoP §13 defines competence as 'knowledge, training and experience to undertake the work safely' — qualification supports it but does not in itself satisfy it. A 2377-22 holder with no experience at, say, hand-held 110 V site tools in a wet environment is not competent for that scope."
            doInstead="Match competence to scope. A formal visual on office Class II IT equipment is a low competence bar. A combined inspection-and-test on three-phase mobile equipment in a kitchen is a meaningfully higher one. The IET CoP §13 framing — knowledge AND training AND experience — is the structure to map onto your team's matrix, not a single certificate."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The duty-holder, the user, the engineer</ContentEyebrow>

          <ConceptBlock
            title="Three roles, one duty"
            plainEnglish="EAWR Reg 3 names the duty-holder — usually the employer / occupier. The user is whoever uses the equipment day-to-day. The engineer is whoever performs the formal visual and the combined inspection-and-test. All three sit under the same statutory duty; sub-contracting the engineering does not transfer the legal duty."
          >
            <p>
              The structural mistake duty-holders make is to assume that engaging a PAT testing
              contractor transfers the EAWR Reg 4(2) duty to the contractor. It does not. The
              contractor takes on professional responsibilities for the work they perform, but the
              duty-holder remains the duty-holder. HSG107 §15-17 is explicit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The duty-holder</strong> commissions the programme, sets the scope, approves
                the frequency, ensures competence, retains the records, and acts on defects found.
              </li>
              <li>
                <strong>The user</strong> performs pillar 1 user checks, reports defects, and does
                not use equipment they have reason to suspect is unsafe.
              </li>
              <li>
                <strong>The engineer / inspector</strong> performs pillars 2 and 3 to the IET CoP,
                produces the records, flags defects to the duty-holder, and remains within the scope
                of their competence.
              </li>
            </ul>
            <p>
              When a workplace-shock case goes to the HSE, the inspector follows the duty-holder's
              evidence trail through all three roles. Did the duty-holder define competent? Did the
              user know what to check? Did the engineer record the right things? Each role is a
              place where the trail can fail — and most failed cases fail at the duty-holder's role
              because that is where the system either exists or does not.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc Act 1974 · s.2(1) and s.2(2)(a)"
            clause={
              <>
                It shall be the duty of every employer to ensure, so far as is reasonably
                practicable, the health, safety and welfare at work of all his employees. The
                matters to which that duty extends include, in particular, the provision and
                maintenance of plant and systems of work that are, so far as is reasonably
                practicable, safe and without risks to health.
              </>
            }
            meaning="The over-arching duty. 'Plant and systems of work' includes the kettle in the staff room, the IT desktop, the site-tool transformer, and the extension leads. PAT is one of the routes by which an employer demonstrates the s.2(2)(a) duty has been discharged for portable electrical equipment."
          />

          <Scenario
            title="The contractor-on-site question"
            situation="A general building contractor brings their own tools to a client site. A 110 V grinder explodes in use. The injured operative is the contractor's employee. The HSE attends. Whose PAT records do they want?"
            whatToDo="The contractor is the employer of the operative and the duty-holder for the grinder under EAWR Reg 4(2) and HSWA s.2. Their records are what is requested first. Separately, the site occupier may have a duty under HSWA s.3 (duty to non-employees) and CDM 2015 obligations to verify their contractors have systems in place — typically managed via PQQ / RAMS. The records examined in the first hour of the investigation, however, are the contractor's: register, risk assessment, formal visual, combined inspection-and-test, defect log."
            whyItMatters="The 'we hire competent contractors' defence does not eliminate the contractor own EAWR duty. Equally, the site occupier cannot point at the contractor and walk away — HSWA s.3 attaches them to the outcome. Mapping the duty correctly to the right entity is the first analytical step in any investigation."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What this section feeds into</ContentEyebrow>

          <ConceptBlock
            title="From why to what — the rest of Module 1"
            plainEnglish="This section establishes the why. The remaining four sections of Module 1 cover (2) the legal duties in detail — EAWR, PUWER, HSWA — with a working knowledge of which clause applies to which scenario; (3) the equipment that is in scope; (4) the frequency question — risk-based intervals, IET CoP Table 7.1, and how to defend a frequency; and (5) the user-check vs formal inspection-and-test distinction."
          >
            <p>
              Module 2 then moves to the equipment-classification framework — Class I, Class II,
              Class III — which is the foundation for every test method that follows in Modules 3
              and 4. By the end of Module 1, the framing is: what is the legal duty, what equipment
              is in scope, how often, and by whom. That is the programme.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              '"PAT testing" is the trade nickname; the IET CoP and HSG107 call it "in-service inspection and testing of electrical equipment" — the verbose phrase is the accurate one.',
              'EAWR 1989 Reg 4(2) is the legal anchor: maintain systems so as to prevent danger so far as is reasonably practicable. HSWA s.2 sits above it; PUWER Reg 5/6 sits alongside.',
              'There is no statutory frequency. HSG107 §10 and IET CoP Table 7.1 are explicit that intervals are risk-based — selling "annual" as the law is not defensible.',
              'BS 7671 stops at the socket-outlet (Reg 110.1.1). Everything plugged into it falls under the IET CoP. EICR ≠ PAT.',
              'Four pillars: user checks, formal visual, combined inspection-and-test, records. Removing any one creates a class of defect the regime no longer catches.',
              'Most defects are visible — flex damage, plug-top damage, mis-rated fuses. Pillars 1 and 2 catch the majority before any instrument is connected.',
              'Records — register, risk assessment, inspection results, defect log, repair evidence — are what HSG107 §22-25 names as the demonstration of compliance. Pass labels alone are not records.',
              'The duty-holder is usually the employer/occupier. Engaging a PAT contractor does not transfer the EAWR duty — it discharges part of it via competent professional support.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is PAT testing a legal requirement?',
                answer:
                  'Not by that name. The legal requirement is EAWR 1989 Reg 4(2) (system maintenance to prevent danger) read with HSWA 1974 s.2 (general duty) and PUWER 1998 Reg 5/6 (work-equipment maintenance and inspection). PAT — meaning the in-service inspection and testing programme set out in HSG107 and the IET Code of Practice — is the recognised industry route by which a duty-holder demonstrates those statutory duties have been discharged for portable electrical equipment.',
              },
              {
                question: 'How often must I PAT test?',
                answer:
                  'There is no statutory frequency. HSG107 §10 is explicit about this. The IET CoP Table 7.1 publishes initial frequencies as a starting suggestion, but the duty-holder must revise them based on equipment type, environment, user behaviour and the history of defects found. A documented risk assessment that produces and reviews the intervals is the defendable evidence — the calendar alone is not.',
              },
              {
                question: 'Does an EICR cover PAT testing?',
                answer:
                  'No. BS 7671 Reg 110.1.1 stops at the fixed installation. An EICR confirms the wiring is safe up to the socket-outlet; it says nothing about the kettle, the extension lead, the IT power supply, or the site tool plugged into it. Treating an EICR as PAT evidence is one of the most common compliance gaps and one that does not survive an HSE interview.',
              },
              {
                question: 'Who is responsible if PAT testing has not been done?',
                answer:
                  'The duty-holder under EAWR Reg 3 — usually the employer or occupier whose equipment it is and whose employees use it. Engaging a PAT contractor does not transfer the duty; it provides competent professional support. In a leased premises, the tenancy contract may allocate practical responsibility, but the EAWR statutory duty stays with the user organisation.',
              },
              {
                question: 'Are pass-labels evidence of compliance?',
                answer:
                  'Not on their own. HSG107 §22-25 frames records as the demonstration of compliance — equipment register, risk-assessed frequencies, formal visual records, instrument readings from the combined inspection-and-test, defect / repair / disposal log, inspector competence. A pass-label confirms only that someone affixed a label. The records behind the label are what discharge the duty.',
              },
              {
                question: 'Our office is low-risk — do we still need to do anything?',
                answer:
                  'Yes. HSE Indg236 ("Maintaining portable electric equipment in low-risk environments") is the HSE\'s direct response to over-zealous PAT in offices. The duty does not disappear; the frequency and depth reduce. Typically: pillar 1 user checks remain mandatory; pillar 2 formal visual at extended intervals; pillar 3 combined inspection-and-test on a small subset (extension leads, cleaners, anything moved frequently). The programme exists; it is just lighter.',
              },
              {
                question: 'Can I do PAT testing in-house, or do I have to engage a contractor?',
                answer:
                  'Either, provided the person doing it is competent in the IET CoP §13 sense — knowledge, training and experience to undertake the work safely. A trained in-house person with the right instrument and supervision is fully acceptable. The decision is usually about cost, scale and capability, not legal eligibility.',
              },
              {
                question:
                  'What is the difference between formal visual inspection and combined inspection-and-test?',
                answer:
                  'A formal visual inspection (IET CoP §14) is rigorous but external — flex, plug, connector, casing, controls, environment, markings — without dismantling and without instrument connection. A combined inspection-and-test additionally connects an instrument to measure protective-conductor continuity, insulation resistance / leakage, polarity (where relevant), and a functional check, recording numerical readings against IET CoP Chapter 14 acceptance values.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="What is PAT testing — Module 1.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-1-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 Legal duties (EAWR, PUWER, HSWA)
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

export default PATTestingModule1Section1;
