/**
 * Module 5 · Section 6 · Subsection 1 — EIC issue + certificate types: EIC vs MWC vs EICR
 * Maps to C&G 2365-03 / Unit 304 / LO6 / AC 6.1, 6.2
 *   AC 6.1 — "state the requirements for completing electrical installation certificates"
 *   AC 6.2 — "state the requirements for completing minor electrical installation works certificates"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 6.1; 2366-03 Unit 302 / AC 6.1
 *
 * The certification framework that closes initial verification. Section 644 of
 * BS 7671 sets out three distinct documents — EIC, MEIWC, EICR — each with a
 * defined scope, a defined signer relationship and defined consequences for
 * issue. Picking the wrong form invalidates the certification.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'EIC issue and certificate types — EIC vs MWC vs EICR | Level 3 Module 5.6.1 | Elec-Mate';
const DESCRIPTION =
  'Section 644 certification framework — when to issue an EIC, when an MEIWC suffices, when an EICR applies. Reg 644.1.1 defect rule, signed declarations, departures, and the consequences of picking the wrong form.';

const checks = [
  {
    id: 'm5-s6-sub1-form-pick',
    question:
      'You have just installed a new shower circuit on a 2.5 mm² + CPC cable from the existing CU, with a new 32 A Type A RCBO. Which certificate is required?',
    options: [
      'MEIWC — it is a single circuit on an existing CU.',
      'EIC + Schedule of Inspections + Schedule of Test Results — the work provides a new circuit, and BS 7671 reserves the MEIWC for minor works that do NOT include a new circuit.',
      'EICR — because the rest of the installation is existing.',
      'No certificate at all on a single-circuit addition.',
    ],
    correctIndex: 1,
    explanation:
      'The MEIWC is defined for minor works that do NOT include the provision of a new circuit. Adding a brand-new shower circuit, even off an existing CU, is a new circuit — so the EIC + Schedule of Inspections + Schedule of Test Results pack is required. The classic confusion: people think "small job = MEIWC". The test is not size, it is whether a new circuit was created. New circuit always means EIC, regardless of how few extra metres of cable were involved.',
  },
  {
    id: 'm5-s6-sub1-defect-rule',
    question:
      'Reg 644.1.1 covers what happens when a defect is revealed during inspection and testing of a NEW installation:',
    options: [
      'You note the defect on the EIC and issue the certificate anyway.',
      'For a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued — fix first, retest, then certify.',
      'You skip the EIC and issue an EICR instead.',
      'You issue the EIC with a comment and the client deals with the defect later.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644.1.1 is the regulatory backbone of "test then certify". The EIC certifies the installation is safe and compliant at the moment of issue. You cannot legitimately certify an installation with a known IR fault, a non-compliant Zs, a missing CPC continuity, or any other identified defect. The corrective work is part of the original installation — no separate certificate required for the fix itself.',
  },
  {
    id: 'm5-s6-sub1-three-roles',
    question:
      'On a small domestic CU swap-out done by a single self-employed electrician, the EIC requires signatures for:',
    options: [
      'Just one signature — the electrician.',
      'Three signatures — designer, constructor and inspector — even where one competent person did all three roles, each role-holder declaration is signed separately on the EIC.',
      'No signatures — only the customer signs.',
      'Two signatures — installer and customer.',
    ],
    correctIndex: 1,
    explanation:
      'The EIC has three signed declarations: designer (responsible for the design), constructor (responsible for the installation work), inspector (responsible for the inspection and testing). The same competent person can hold all three on a small job — and most domestic CU swaps are exactly that. Each role declaration is signed individually on the form. Forging a signature, leaving a role blank, or signing a role you did not perform invalidates the certificate and exposes you to professional and insurance consequences.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Section 644 sets out which three certification forms?',
    options: [
      'EIC, EICR, RAMS.',
      'Electrical Installation Certificate (EIC) for new work or major alterations; Minor Electrical Installation Works Certificate (MEIWC) for minor alterations not creating a new circuit; Electrical Installation Condition Report (EICR) for periodic inspection of an existing installation.',
      'EIC, EAWR, EICR.',
      'EIC, MWC, RAM.',
    ],
    correctAnswer: 1,
    explanation:
      'Section 644 of BS 7671:2018+A4:2026 prescribes three model forms: EIC for new installations and major alterations; MEIWC for minor alterations that do NOT include a new circuit; EICR for periodic inspection of an existing installation. Each has a different scope, a different recording template and a different signer relationship.',
  },
  {
    id: 2,
    question: 'A circuit on the new domestic CU swap-out fails IR — reads 0.6 MΩ on a 500 V test (below the 1 MΩ minimum). The customer is keen to move in. What does Reg 644.1.1 require?',
    options: [
      'Issue the EIC with a note about the IR reading.',
      'Correct the defect, retest, then issue the EIC. Reg 644.1.1 makes certificate issue conditional on correction of defects revealed during inspection and testing for new installations.',
      'Issue an EICR instead of an EIC.',
      'Issue the EIC and book a follow-up visit to fix the IR fault.',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 644.1.1 is unconditional — for a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. The customer's pressure to move in does not override the regulation. Find the IR fault (likely a back-box pinch or damaged cable section), fix it, retest the circuit, then issue the EIC with all readings clean.",
  },
  {
    id: 3,
    question: 'On an addition or alteration (not a new installation), the defect-correction rule changes how?',
    options: [
      'It does not apply at all to alterations.',
      'For an addition or alteration to an existing installation, any defect or omission that will affect the SAFETY of the addition or alteration revealed during inspection and testing shall be corrected before the Certificate is issued. The duty is limited to safety-affecting defects on the new or altered work — pre-existing defects elsewhere are recorded as observations rather than blockers to certification of the new work.',
      'All defects in the entire installation must be fixed before the alteration certificate issues.',
      'No defect rule applies to alterations.',
    ],
    correctAnswer: 1,
    explanation:
      'The wording for additions and alterations is narrower than for new work. The defect-correction obligation applies only to defects that will affect the safety of the addition or alteration itself. Pre-existing defects in unaltered parts of the installation are recorded in the Comments on existing installation section of the EIC, but do not block certification of the new portion. The customer can then choose to deal with those pre-existing items separately, typically by commissioning an EICR.',
  },
  {
    id: 4,
    question: 'The MEIWC may be used for:',
    options: [
      'Any work the installer thinks is small.',
      'Individual items of minor works that do NOT include the provision of a new circuit — for example, adding a socket-outlet or lighting point to an existing circuit, or replacing a damaged accessory like for like.',
      'A consumer unit replacement.',
      'A new shower circuit.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 defines MEIWC scope precisely — it is for minor works that do NOT include a new circuit. Permitted examples: extra socket-outlet on an existing ring, extra lighting point on an existing lighting circuit, like-for-like accessory replacement. Not permitted: any new circuit (even a single-circuit addition), CU replacement, replacement of a non-like-for-like protective device. Use the EIC trio for those.',
  },
  {
    id: 5,
    question: 'The EIC has separate signed declarations for designer, constructor and inspector. On a domestic CU swap by a single self-employed electrician:',
    options: [
      'Only one signature is required — the electrician.',
      'All three roles are signed separately by the same competent person, who declares responsibility for each role individually. The signatures are not interchangeable — each is a separate declaration with its own legal weight.',
      'The customer signs as designer.',
      'No signatures are required.',
    ],
    correctAnswer: 1,
    explanation:
      'Each role declaration is signed individually even where the same person fulfils all three. Designer = "I am responsible for the design of the work described above". Constructor = "I am responsible for the construction of the work described above". Inspector = "I am responsible for the inspection and testing of the work described above". Three separate declarations of three distinct responsibilities — the same name and signature can appear in each box on a one-person job, but the declarations are not consolidated.',
  },
  {
    id: 6,
    question: 'The Departures from BS 7671 box on the EIC is for:',
    options: [
      'Departures of the customer from the property.',
      'Any deliberate deviation from a BS 7671 requirement that the designer judges acceptable for the specific installation, with justification — for example, omitting an RCD on a non-dwelling socket-outlet under the Reg 411.3.3 risk-assessment exception. Each departure must be documented with reasoning and accepted by the duty-holder.',
      'Departures from the test schedule.',
      'A list of items the customer wants removed from the install.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 recognises that not every numerical requirement can or should apply to every installation. The Departures section is the formal record of any deliberate deviation. Common examples include: socket-outlet without RCD under the Reg 411.3.3 risk-assessment exception; overlong cable run accepted with reduced disconnection time; equipment fitted in a special location with mitigating measures. Each departure must be accepted by the designer and the duty-holder, and recorded so any future inspector understands the reasoning.',
  },
  {
    id: 7,
    question: 'An EICR is issued at the end of:',
    options: [
      'A new installation.',
      'A periodic inspection of an EXISTING installation — assessing whether the installation remains safe for continued use, identifying observations and classifying them C1/C2/C3/FI, and recommending a next inspection date. Distinct from the EIC, which certifies new work or major alterations.',
      'A minor works job.',
      'A risk assessment.',
    ],
    correctAnswer: 1,
    explanation:
      'EIC = certifies new work or major alteration as safe and compliant on the day of issue. EICR = reports on the condition of an existing installation, telling the duty-holder whether it remains safe for continued use. Different purposes, different forms, different signer relationships. Mixing them up — issuing an EICR for new work, or an EIC for a periodic inspection — is a fundamental coding error that invalidates the document.',
  },
  {
    id: 8,
    question: "After issuing the EIC for a domestic CU swap, the contractor's minimum copy retention period (per common UK industry practice tied to the Limitation Act) is:",
    options: [
      'One year.',
      'At least six years for civil liability under the Limitation Act, with most professional indemnity insurers and Competent Person Schemes requiring 10 to 25 years. Cloud storage of PDFs is standard contractor practice now.',
      'No retention required after handover.',
      'One month.',
    ],
    correctAnswer: 1,
    explanation:
      'Six years is the Limitation Act minimum for civil claims arising from contract or tort. PI insurers and Competent Person Schemes typically require longer — 10 to 25 years is common. Customer keeps the original for the lifetime of the installation. CPS holds its own copy via the upload portal. Cloud storage on the contractor side has made indefinite retention trivially cheap and is now standard practice.',
  },
];

const faqs = [
  {
    question: 'If I do a CU swap and one circuit downstream has a marginal IR reading from old wiring, does Reg 644.1.1 force me to rewire that circuit before I can issue the EIC?',
    answer:
      'No — but read the regulation carefully. Reg 644.1.1 applies to NEW installations. A CU swap is technically an alteration to an existing installation, so the addition/alteration variant applies — defects affecting the SAFETY of the alteration must be corrected, but pre-existing defects elsewhere are recorded as observations on the EIC under Comments on existing installation. A marginal IR reading on existing wiring is recorded, the customer is advised, and the EIC for the alteration can issue with the observation noted. If the reading is so low that it actively endangers the new CU work (e.g. the IR fault is on the circuit you are now protecting with a 30 mA RCD that may trip continuously), then it does affect safety of the alteration and you must address it before issue.',
  },
  {
    question: 'What is the legal status of the EIC — is it a certificate I issue, or one the customer issues?',
    answer:
      "You issue it. The EIC is a signed declaration by the competent persons (designer, constructor, inspector) that the work has been designed, constructed, inspected and tested in accordance with BS 7671. The customer receives it as evidence of compliance. They do not sign it — their signature is not required and would not add legal weight. The contractor's name, address, signature and contact details on the EIC make the contractor accountable for the work the certificate covers.",
  },
  {
    question: 'Can I sign as designer on a job where the consulting engineer designed the install but I built it?',
    answer:
      'No — sign only the role you actually performed. Designer goes to the consulting engineer (their name, address and signature). You sign as constructor and, if you also did the inspection and testing, as inspector. Three different organisations on three different role boxes is normal on commercial work. Each signs only their own role.',
  },
  {
    question: 'A customer asks me to back-date the EIC because the work was completed two weeks ago and they need it for a remortgage that closes tomorrow. Can I?',
    answer:
      'No. The EIC is dated to the date the certification work (final inspection and testing) was completed and the declarations were signed. Back-dating is dishonesty and can amount to fraud. If the customer needs a certificate dated within a particular window for a transaction, the right answer is to issue it with the actual completion date and let the customer present it to the lender. If the lender will not accept the actual date, that is between the customer and the lender — the contractor cannot fix that with a false certificate.',
  },
  {
    question: 'My instrument download from the multi-function tester says one circuit had a Zs reading taken on a different date from the rest. Does that matter for the EIC?',
    answer:
      'It depends. Most CU swaps and large jobs span more than one day — first-fix on day one, test and commission on day two. The EIC date is the date the certification work was completed and the inspector signs. Individual test readings may be from across the test period. What you should NOT do is mix readings from different visits months apart and present them as if from a single completion — that misrepresents when the installation was certified safe. Same-job, multi-day readings recorded with their actual capture dates is fine; aged stale readings recycled into a fresh certificate is not.',
  },
  {
    question: 'Where do I record the next inspection due date on the EIC, and how do I decide what it should be?',
    answer:
      'There is a dedicated field on the EIC for the recommended date of the next inspection. Set it per IET Guidance Note 3 frequency tables — domestic owner-occupied 10 years, rented domestic 5 years (also driven by the Electrical Safety Standards in the Private Rented Sector regs in England), commercial 5 years, industrial 3 years, with shorter intervals for higher-risk locations (swimming pools, agricultural, marinas). The number is a recommendation — the duty-holder can accelerate it on risk grounds. Document any rationale in the Comments box if you set it shorter than the GN3 default for the property type.',
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 1"
            title="EIC issue and certificate types — EIC vs MWC vs EICR"
            description="Section 644 of BS 7671 sets out three distinct certification forms — EIC for new work and major alterations, MEIWC for minor work that does not include a new circuit, EICR for periodic inspection. Picking the wrong form invalidates the certification."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Section 644 prescribes three model forms — EIC (new work + major alterations), MEIWC (minor work without a new circuit), EICR (periodic inspection of an existing installation). Each has defined scope and is not interchangeable.',
              'Reg 644.1.1 — for a new installation, any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. Fix first, retest, then certify.',
              'For an addition or alteration the rule narrows — only defects that will affect the safety of the addition or alteration must be corrected before issue. Pre-existing defects elsewhere are recorded as observations.',
              'The EIC carries three separate signed declarations — designer, constructor, inspector. On a one-person domestic job the same name appears three times, but each declaration is signed individually.',
              'Departures from BS 7671 are documented on the EIC with reasoning and acceptance by the duty-holder. Comments on existing installation captures observations on unaltered parts.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the three Section 644 model forms (EIC, MEIWC, EICR) and the scope each is reserved for.',
              'Pick the correct certificate for a given job, applying the new-circuit test that distinguishes EIC from MEIWC.',
              'State Reg 644.1.1 verbatim and apply the defect-correction rule to a new installation scenario.',
              'Apply the narrower addition/alteration variant — defects affecting the safety of the alteration must be corrected; pre-existing defects elsewhere are recorded as observations.',
              'Complete the three signed declarations (designer, constructor, inspector) on the EIC, including where one competent person fulfils all three roles.',
              'Document Departures from BS 7671 with reasoning and Comments on existing installation for unaltered parts.',
              'Distinguish the EIC (certifies new work) from the EICR (reports on existing installation condition) and avoid the form-mix-up coding error.',
              'Manage EIC retention per Limitation Act, professional indemnity and Competent Person Scheme requirements.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>The Section 644 framework — three forms, one job each</ContentEyebrow>

          <ConceptBlock
            title="EIC, MEIWC, EICR — what each form is for"
            plainEnglish="EIC certifies new work or major alterations as safe and compliant on the day of issue. MEIWC certifies minor work on an existing circuit. EICR reports on the condition of an existing installation. Three forms, three purposes, never interchangeable."
            onSite="The single most common form-selection error is using MEIWC for a new circuit. The test is not size — it is whether a new circuit was created. New shower circuit off an existing CU = new circuit = EIC, even though only one circuit was added."
          >
            <p>The Section 644 model forms and their scope:</p>

            <div className="hidden sm:block bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-4 text-[13px]">
              <div className="grid grid-cols-3 gap-3 text-white/90">
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Form</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Reserved for</div>
                <div className="text-elec-yellow/80 text-[11px] uppercase tracking-wide font-semibold">Defect rule (644.1.1 family)</div>

                <div>EIC + Schedule of Inspections + Schedule of Test Results</div>
                <div>New installations and major alterations — including any new circuit, CU replacement, or significant change to the supply or earthing arrangement</div>
                <div>Any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued (new installation scope)</div>

                <div>MEIWC (Minor Electrical Installation Works Certificate)</div>
                <div>Individual items of minor works that do NOT include a new circuit — extra socket-outlet on existing ring, extra lighting point on existing lighting circuit, like-for-like accessory swap</div>
                <div>Defects affecting the safety of the addition/alteration shall be corrected before issue; pre-existing defects elsewhere are recorded as observations</div>

                <div>EICR (Electrical Installation Condition Report)</div>
                <div>Periodic inspection of an EXISTING installation — assessing whether it remains safe for continued use; not a certification of new work</div>
                <div>EICR is a report, not a certification — observations are coded C1 / C2 / C3 / FI rather than blocking issue</div>
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              {[
                {
                  form: 'EIC + Schedule of Inspections + Schedule of Test Results',
                  reserved: 'New installations and major alterations — any new circuit, CU replacement, significant supply/earthing change',
                  defect: 'Reg 644.1.1: any defect or omission revealed shall be corrected before the Certificate is issued',
                },
                {
                  form: 'MEIWC',
                  reserved: 'Minor works that do NOT include a new circuit — extra socket on existing ring, like-for-like accessory swap',
                  defect: 'Defects affecting safety of the alteration corrected before issue; pre-existing defects recorded as observations',
                },
                {
                  form: 'EICR',
                  reserved: 'Periodic inspection of an existing installation — condition report, not a certification of new work',
                  defect: 'Observations coded C1 / C2 / C3 / FI rather than blocking issue',
                },
              ].map((row, i) => (
                <div key={i} className="bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-xl p-3 text-[13px]">
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold">Form</div>
                  <div className="text-white/90 mt-0.5 font-semibold">{row.form}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Reserved for</div>
                  <div className="text-white/80 mt-0.5">{row.reserved}</div>
                  <div className="text-elec-yellow text-[11px] uppercase tracking-wide font-semibold mt-2">Defect rule</div>
                  <div className="text-white/80 mt-0.5">{row.defect}</div>
                </div>
              ))}
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 644.1.1 (Defect correction prior to certification, new installation) — verbatim"
            clause="For a new installation, any defect or omission revealed during the inspection and testing shall be corrected before the Certificate is issued."
            meaning={
              <>
                The EIC certifies the installation as safe and compliant at the moment of issue.
                You cannot legitimately issue an EIC for a new installation with a known IR fault,
                a non-compliant Zs, a missing CPC continuity, or any other identified defect. Find
                the defect, fix it, retest the affected circuit, then issue the certificate. The
                corrective work is part of the original installation — no separate certificate
                required for the fix itself.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 644.1.1."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic="Describing a fault on an EICR — language and coding"
            caption="The EICR is only as useful as the language used to describe the observations. Plain, precise fault description is what lets the duty holder act on the report and what defends the inspector if a coding is later challenged."
          />

          <SectionRule />

          <ContentEyebrow>Picking the right form — the new-circuit test</ContentEyebrow>

          <ConceptBlock
            title="MEIWC vs EIC — the test is whether a new circuit was created"
            plainEnglish="The MEIWC is reserved by definition for minor works that do NOT include a new circuit. Adding a single socket on an existing ring is MEIWC. Adding any new circuit — even one — is EIC. Size of the job is irrelevant; whether a new circuit was created is decisive."
            onSite="The classic error: thinking a small one-circuit job is automatically MEIWC. A single new EV charger circuit, a single new shower circuit, a single new outdoor lighting circuit — all new circuits, all need full EIC + Schedule of Inspections + Schedule of Test Results. The MEIWC has no scope for new circuits regardless of how minor the rest of the work appears."
          >
            <p>Worked examples of the form-selection test:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Add an extra socket on an existing kitchen ring final.</strong> No new
                circuit — extends an existing one. <strong>MEIWC.</strong>
              </li>
              <li>
                <strong>Add an extra pendant on an existing lighting circuit.</strong> No new
                circuit. <strong>MEIWC.</strong>
              </li>
              <li>
                <strong>Replace a damaged double socket like for like.</strong> No new circuit, no
                circuit alteration. <strong>MEIWC.</strong>
              </li>
              <li>
                <strong>Install a new EV charger on its own dedicated circuit from the CU.</strong>
                {' '}New circuit. <strong>EIC + Schedule of Inspections + Schedule of Test
                Results.</strong>
              </li>
              <li>
                <strong>Install a new electric shower on its own circuit from the CU.</strong> New
                circuit. <strong>EIC + Schedule of Inspections + Schedule of Test Results.</strong>
              </li>
              <li>
                <strong>Replace the existing CU with a new one.</strong> Major alteration to the
                supply distribution. <strong>EIC + Schedule of Inspections + Schedule of Test
                Results</strong> covering all retained circuits as well as the new CU.
              </li>
              <li>
                <strong>Add a complete new outbuilding fed by a new submain plus three new final
                circuits.</strong> Major alteration. <strong>EIC + Schedule of Inspections +
                Schedule of Test Results.</strong>
              </li>
              <li>
                <strong>Five-yearly inspection of a tenanted flat.</strong> No new work — periodic
                condition assessment of existing installation. <strong>EICR.</strong>
              </li>
            </ul>
            <p>
              When in doubt — if a new circuit was created, the answer is EIC. The MEIWC has no
              ambiguity on this point and will not stretch to cover a new circuit no matter how
              small the rest of the job.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The EIC top-level — sections, declarations and signatures</ContentEyebrow>

          <ConceptBlock
            title="What goes on the EIC itself — section by section"
            plainEnglish="Header (address, dates, contractor, customer); extent of installation covered; supply characteristics; designer / constructor / inspector signed declarations; departures from BS 7671; comments on existing installation; recommended next inspection date; reference to attached Schedule of Inspections and Schedule of Test Results."
            onSite={`The EIC is the legal top-level document. Get the address right, get the extent right (be specific — "alteration to ground floor lighting circuit and addition of new EV charger circuit" beats "some electrical work"), get the signatures right, get the next-inspection date right per IET GN3 frequency tables.`}
          >
            <p>The principal sections of an EIC, in order:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Details of the client and installation.</strong> Address, occupier name,
                use of installation (domestic / commercial / industrial), the contractor name and
                contact details. Get the address exactly right — the certificate has to be
                identifiable to the property by a future buyer's solicitor or insurance
                investigator.
              </li>
              <li>
                <strong>Extent of installation covered.</strong> Plain-English description of what
                was done — for example, "Complete installation", or "Consumer unit
                replacement and addition of new EV charger circuit and outdoor socket-outlet
                circuit". Be specific. Ambiguity here causes problems years later when
                someone tries to work out which circuits the certificate covers.
              </li>
              <li>
                <strong>Supply characteristics.</strong> Nominal voltage, frequency, prospective
                fault current at origin, Ze, system earthing arrangement (TN-S, TN-C-S /
                Protective Multiple Earthing, TT, IT), number of phases. These come from the
                survey at the supply intake before the work begins.
              </li>
              <li>
                <strong>Designer declaration.</strong> "I being the person responsible for
                the design of the work ...". Signed and dated.
              </li>
              <li>
                <strong>Constructor declaration.</strong> "I being the person responsible
                for the construction of the work ...". Signed and dated.
              </li>
              <li>
                <strong>Inspector declaration.</strong> "I being the person responsible for
                the inspection and testing ...". Signed and dated.
              </li>
              <li>
                <strong>Departures from BS 7671.</strong> Any deliberate deviation, with reasoning.
                None permitted without documentation.
              </li>
              <li>
                <strong>Comments on existing installation.</strong> Observations on unaltered
                parts — pre-existing defects, recommendations, items the duty-holder should be
                aware of. Distinct from defects on the new work, which must be fixed before issue
                under Reg 644.1.1.
              </li>
              <li>
                <strong>Recommended next inspection date.</strong> Per IET GN3 frequency tables
                for the property type (domestic owner-occupied 10 years, rented 5 years, etc.).
              </li>
              <li>
                <strong>Schedules attached.</strong> Reference to the Schedule of Inspections and
                Schedule of Test Results (number of pages of each).
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 644 (certification framework) — paraphrased"
            clause="An Electrical Installation Certificate (EIC) shall be issued for a new installation, or for an addition or alteration that is not minor. The Certificate shall include the supply characteristics, the extent of the installation covered, signed declarations from the persons responsible for design, construction and inspection and testing, any departures from this Standard, and shall reference the attached Schedule of Inspections and Schedule of Test Results."
            meaning={
              <>
                Section 644 prescribes the model EIC content. Each declaration is a separate
                signed statement of responsibility. The schedules are the evidence base. The
                whole pack — EIC plus Schedule of Inspections plus Schedule of Test Results —
                is what counts as the certification for the purposes of BS 7671 and for the
                Building Regulations Part P notification process in England and Wales.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Section 644 and Appendix 6."
          />

          <ConceptBlock
            title="The three signed declarations — designer, constructor, inspector"
            plainEnglish="Each of the three roles signs a separate declaration of responsibility. Same person can sign all three on a small job. Different organisations on a larger one. Each signature is a personal declaration — not interchangeable, not consolidated."
            onSite="On a domestic CU swap by a single self-employed electrician, the same name appears in all three boxes — but each is signed individually. On a commercial fit-out, the consulting engineer signs designer, the contractor signs constructor, and the third-party inspector (or the contractor again) signs inspector. Sign only the role you actually performed."
          >
            <p>What each role declaration commits the signer to:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Designer.</strong> "I being the person responsible for the design of
                the electrical installation, particulars of which are described above, having
                exercised reasonable skill and care when carrying out the design, hereby CERTIFY
                that the design work for which I have been responsible is to the best of my
                knowledge and belief in accordance with BS 7671 ... except for the departures,
                if any, detailed as follows." Designer accepts responsibility for the design
                approach, conductor sizing, protection coordination, earthing arrangement,
                disconnection times, voltage drop and equipment selection.
              </li>
              <li>
                <strong>Constructor.</strong> "I being the person responsible for the
                construction of the electrical installation ... hereby CERTIFY that the
                construction work for which I have been responsible is to the best of my
                knowledge and belief in accordance with BS 7671 ..." Constructor accepts
                responsibility for the physical installation work — terminations, supports, cable
                routing, accessory installation, mechanical protection, segregation, IP ratings.
              </li>
              <li>
                <strong>Inspector.</strong> "I being the person responsible for the
                inspection and testing of the electrical installation ... hereby CERTIFY
                that the work for which I have been responsible is to the best of my knowledge
                and belief in accordance with BS 7671 ..." Inspector accepts
                responsibility for the visual inspection, the dead-test sequence, the live-test
                sequence, defect identification and the readings recorded on the Schedule of
                Test Results.
              </li>
            </ul>
            <p>
              Where the same competent person fulfils all three roles, the same name and
              signature appears in all three boxes — but each declaration is a separate
              statement of personal responsibility. Forging a signature, leaving a role blank,
              or signing a role you did not perform invalidates the certificate and exposes you
              to professional, regulatory and insurance consequences.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Departures, comments, and observations on existing installation</ContentEyebrow>

          <ConceptBlock
            title="Departures from BS 7671 — what they are and how to document them"
            plainEnglish="A Departure is a deliberate, documented deviation from a numerical or method requirement of BS 7671 that the designer judges acceptable for the specific installation, with reasoning. The Standard expects departures to be rare and accepted by the duty-holder."
            onSite="Most installations have zero departures. When they appear, they are usually one of a small set: socket-outlet without RCD under the Reg 411.3.3 risk-assessment exception, equipment in a special location with mitigating measures, overlong cable run accepted with reduced disconnection time. Document each one with the regulation number, the chosen alternative, the reasoning and the duty-holder acceptance."
          >
            <p>How a Departure should be recorded:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The clause being departed from.</strong> By regulation number — for
                example, "Departure from Reg 411.3.3 (additional protection by 30 mA RCD on
                socket-outlets)".
              </li>
              <li>
                <strong>The chosen alternative.</strong> "Socket-outlet C5 in plant room
                left without 30 mA RCD additional protection."
              </li>
              <li>
                <strong>The reasoning.</strong> "Socket-outlet supplies a critical process
                computer; nuisance tripping on a 30 mA RCD would risk loss of process data.
                Documented risk assessment held by client (ref RA-PR-007 dated 2026-04-01)
                concludes additional protection is not required at this location, applying the
                Reg 411.3.3 exception for socket-outlets supplying specific equipment."
              </li>
              <li>
                <strong>The duty-holder acceptance.</strong> Formal acceptance by the client,
                ideally in writing — covered by the design sign-off correspondence and
                referenced on the EIC.
              </li>
            </ul>
            <p>
              Departures that are not documented, are not accepted by the duty-holder, or are
              applied where no exception exists in BS 7671 are non-compliances rather than
              departures. The Departures box on the EIC is a narrow doorway — most installations
              should have nothing in it. If yours has multiple entries, review the design.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Comments on existing installation — observations on unaltered parts"
            plainEnglish="On an addition or alteration, the EIC has a Comments on existing installation section for observations about parts of the installation NOT covered by the new work. This is where pre-existing defects on unaltered circuits are recorded for the customer\'s information."
            onSite="On a CU swap-out, the Comments box typically gets used. The new CU is your work and is certified clean. The downstream circuits are unaltered but you have visibility of their condition through the inspection and testing process. Anything you noticed on unaltered parts — old rubber-sheath cabling, no CPC on lighting drops, missing supplementary bonding in a bathroom — goes here as an observation."
          >
            <p>Typical Comments on existing installation entries:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Old wiring observations.</strong> "Downstream circuits original
                rubber-sheath wiring; condition assessed as functional during the alteration but
                full EICR recommended within 12 months to confirm continued safe condition."
              </li>
              <li>
                <strong>No-CPC lighting circuits.</strong> "Upstairs lighting circuit (C7)
                two-core wiring with no CPC; existing Class II accessories acceptable; any
                future change to Class I light fittings on this circuit will require rewire to
                provide a CPC."
              </li>
              <li>
                <strong>Pre-existing bonding gaps.</strong> "Supplementary bonding to
                bathroom radiator pipe absent; main bonding to incoming gas and water in place;
                Reg 701.415.2 may permit omission where ADS conditions are met but bonding
                survey recommended."
              </li>
              <li>
                <strong>Recommendations.</strong> "Separate EICR recommended within 12
                months to establish baseline condition of unaltered circuits."
              </li>
            </ul>
            <p>
              These observations do NOT block issue of the EIC for the new work — that is
              certified on its own merits. They put the customer on notice of pre-existing
              issues so they can plan further work or inspection. The duty-holder receives the
              observations and decides what to do with them.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Part P notification — the EIC plus the Building Control Compliance Certificate</ContentEyebrow>

          <ConceptBlock
            title="Building Regulations Part P (England and Wales) — when the EIC alone isn't enough"
            plainEnglish="In England and Wales, certain types of domestic electrical work are notifiable under Part P of the Building Regulations. The EIC certifies that the work meets BS 7671; the separate Building Control Compliance Certificate (or Part P notification through a Competent Person Scheme) certifies that the local authority has been notified and that the work meets the Building Regulations. Two documents, one job."
            onSite="On a domestic CU swap or any new circuit in a dwelling, you need both. The EIC goes to the customer at handover. The CPS upload (NICEIC, NAPIT, ELECSA, Stroma) within 30 days triggers the BCCC, which the customer needs for solicitor / lender / future EICR purposes. Skip the CPS upload and the customer is non-compliant with Part P even though the work itself is fine."
          >
            <p>
              Part P notifiable work in England and Wales (typical domestic):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New circuits</strong> — any addition to the installation that creates a new circuit (EV charger, shower, additional ring, garden lighting on a new MCB).
              </li>
              <li>
                <strong>Consumer unit replacement</strong> — full or partial replacement counts as notifiable work.
              </li>
              <li>
                <strong>Work in special locations</strong> — bathrooms, kitchens, outdoors, swimming pool zones — even minor works on existing circuits are notifiable.
              </li>
              <li>
                <strong>Electric shower replacement</strong> with a different rating (different cable / device required) — notifiable.
              </li>
            </ul>
            <p>
              Non-notifiable (still needs an EIC or MEIWC, but no Part P notification):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Like-for-like replacement of a damaged accessory in a non-special location.</li>
              <li>Adding an extra socket on an existing ring final in a non-special location (living room, bedroom).</li>
              <li>Like-for-like replacement of a damaged cable section.</li>
            </ul>
            <p>
              Two routes to Part P compliance for notifiable work:
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Competent Person Scheme upload</strong> (NICEIC, NAPIT, ELECSA, Stroma). The contractor uploads the EIC to the CPS portal within 30 days of completion. The CPS notifies the local authority on the contractor's behalf and issues the Building Control Compliance Certificate (BCCC) to the customer. This is the standard route for CPS-registered contractors.
              </li>
              <li>
                <strong>Direct Building Control notification.</strong> For non-CPS-registered contractors or for one-off jobs, notify the local authority's Building Control department BEFORE the work starts, pay the Building Control fee, and arrange Building Control inspection. The local authority issues the completion certificate.
              </li>
            </ol>
            <p>
              The customer pack for a notifiable job: EIC + Schedule of Inspections + Schedule of Test Results (your work product) + BCCC (CPS deliverable, typically issued 4-6 weeks after upload). The customer's solicitor at sale, the lender at remortgage, and the next EICR inspector all expect to see all four documents. Wales applies the same Part P regime; Scotland and Northern Ireland have their own equivalents (notably no Part P in Scotland — building warrants apply instead).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Certificate retention — the contractor's audit trail"
            plainEnglish="The customer keeps the original EIC for the lifetime of the installation. The contractor keeps a copy for at least six years (Limitation Act floor) but typically much longer — 10 to 25 years under PI insurance and CPS rules. Cloud storage of PDFs has made indefinite retention trivially cheap; lever-arch files in a back office are no longer the standard."
            onSite="A 25-year-old EIC produced from cloud storage in 5 minutes is the difference between a smooth professional indemnity claim defence and a claim paid out by default. Set up cloud retention from day one of self-employment — name files consistently (date_address_certificateType.pdf), back up off-site, and never lose a certificate to a hard drive failure or a stolen laptop."
          >
            <p>
              The retention layers for an EIC:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer original.</strong> The customer retains for the lifetime of the installation. Used at sale (to the buyer's solicitor), at remortgage (to the lender), at next EICR (to the next inspector), and to commission any future alterations (the next contractor needs to see existing certification).
              </li>
              <li>
                <strong>Contractor copy — Limitation Act minimum 6 years.</strong> Civil claims arising from contract or tort are time-barred after 6 years (12 years for a deed). The contractor keeps a copy for at least this period to defend any claim.
              </li>
              <li>
                <strong>Contractor copy — PI insurance run-off period.</strong> Professional indemnity insurance covers claims made during the policy period plus any run-off period (typically 6-10 years after policy expiry). Some PI insurers require retention for the entire run-off period — check the policy.
              </li>
              <li>
                <strong>Contractor copy — Competent Person Scheme rules.</strong> NICEIC, NAPIT, ELECSA, Stroma each have retention requirements (typically the period of registration plus a tail). Specific dates vary by scheme; check current scheme rules.
              </li>
              <li>
                <strong>CPS portal copy.</strong> The CPS retains its own copy via the upload portal. This is independent of the contractor's retention — useful if the contractor ever loses their copy.
              </li>
            </ul>
            <p>
              Practical retention strategy for a small-to-medium contractor:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cloud-first.</strong> PDFs in a structured folder hierarchy (year / month / job ref). Backed up to a second cloud (multi-cloud strategy: Google Drive primary, Dropbox backup, or similar).
              </li>
              <li>
                <strong>Indefinite retention.</strong> Storage is cheap (1 TB = ~£100/year cloud). Keeping certificates indefinitely costs nothing meaningful and removes any retention-period anxiety.
              </li>
              <li>
                <strong>Search-friendly naming.</strong> "2026-04-28_15-Acacia-Ave-Manchester_EIC.pdf" lets you find any certificate in seconds. "Untitled.pdf" does not.
              </li>
              <li>
                <strong>Embedded photos.</strong> Photos referenced by the EIC should be embedded in the PDF itself rather than stored separately — external references break when files are moved.
              </li>
              <li>
                <strong>Encryption / access control.</strong> Customer addresses are personal data under UK GDPR. Cloud retention should use access controls (2FA, encrypted at rest, contractor-only access) consistent with a small business's GDPR obligations.
              </li>
            </ul>
            <p>
              The retention discipline is unglamorous but is the foundation of a defensible practice. A contractor who can produce any certificate from the last 20 years inside 5 minutes presents a different professional impression than one who is searching through filing cabinets for a 5-year-old EIC.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>What goes wrong on site</ContentEyebrow>

          <CommonMistake
            title="Issuing an MEIWC for a single new circuit"
            whatHappens={
              <>
                You install a new dedicated EV charger circuit from the existing CU — single
                circuit, RCBO, isolator, charger. Job is small. You issue an MEIWC because it feels
                proportionate to the work scope. Six months later the customer is selling the
                house and the buyer\'s solicitor flags the MEIWC as inappropriate for a new
                circuit. The Competent Person Scheme audit catches the same issue. You now have
                to retro-issue the EIC + Schedule of Inspections + Schedule of Test Results
                trio, re-attend to confirm the readings are still valid, and explain why the
                original certification was on the wrong form.
              </>
            }
            doInstead={
              <>
                The MEIWC is reserved for minor works that do NOT include a new circuit —
                BS 7671 is unambiguous on this point. Any new circuit, however single,
                triggers the EIC + Schedule of Inspections + Schedule of Test Results
                requirement. The form selection test is binary: did the work create a new
                circuit? If yes, EIC. If no, MEIWC may be appropriate. Size of the job is
                irrelevant.
              </>
            }
          />

          <CommonMistake
            title="Issuing the EIC with a known defect uncorrected"
            whatHappens={
              <>
                You complete a new domestic install. Final IR test on one circuit reads 0.7 MΩ
                (below the 1 MΩ minimum). Customer is moving in tonight. You decide to issue
                the EIC with a comment in the notes — "IR on circuit C7 below 1 MΩ;
                investigate further". Three months later there is an electrical fire on
                circuit C7. The insurer refuses the claim because the EIC noted a known defect
                that was not corrected. Your professional indemnity is exposed because the
                certificate was issued in breach of Reg 644.1.1.
              </>
            }
            doInstead={
              <>
                Find the IR fault, fix it, retest. Only then issue the EIC, with all readings
                clean. If the customer is pressing for handover, explain that the certificate
                cannot be issued for a new installation with known defects (Reg 644.1.1) and
                that the only path to handover is fixing the defect. Most defects (back-box
                pinch, damaged cable section) take an hour to fix. The conversation about
                delaying handover by an hour is much shorter than the conversation about
                defending a certificate that should never have been issued.
              </>
            }
          />

          <Scenario
            title="Domestic CU swap-out for a customer about to remortgage"
            situation={
              <>
                You have completed a domestic CU swap-out for a customer who tells you they need
                the certificate today because their remortgage application closes tomorrow and
                the lender requires "current electrical certification". The job is 8
                circuits, single-phase TN-C-S, all new RCBOs (Type A 30 mA), measured Ze = 0.30
                Ω. Dead tests pass; live tests pass; RCD trip times all within 22–35
                ms; one downstream circuit (C7, upstairs lighting) reads 1.2 MΩ IR —
                above the 1 MΩ minimum but lower than the rest of the install. Customer is
                the homeowner. The wiring on C7 is original rubber-sheath, dating to the
                1960s.
              </>
            }
            whatToDo={
              <>
                <strong>Form selection.</strong> CU swap = major alteration =
                EIC + Schedule of Inspections + Schedule of Test Results. Not MEIWC.
                <br />
                <br />
                <strong>Defect rule.</strong> The new work (CU itself, terminations, RCBO
                selection, labelling, bonding upgrades) is your alteration. Reg 644.1.1
                addition/alteration variant applies — defects affecting safety of the
                alteration corrected before issue. The C7 IR reading of 1.2 MΩ is above
                the 1 MΩ floor and does not block issue, but it is an observation on the
                unaltered downstream circuit.
                <br />
                <br />
                <strong>EIC content.</strong> Address, occupier, "Major alteration —
                consumer unit replacement to existing installation" as the extent. Supply
                characteristics from your survey (230 V, 50 Hz, single-phase, TN-C-S, Ze =
                0.30 Ω, PFC = X kA). Designer / constructor / inspector all signed by you
                (single-person job). Departures: none. Comments on existing installation:
                "Downstream circuit C7 (upstairs lighting) original rubber-sheath wiring
                with marginal IR reading (1.2 MΩ) — above BS 7671 minimum but lower
                than the rest of the install. Recommend EICR within 12 months to confirm
                continued safe condition; recommend rewire of C7 within 5 years." Next
                inspection due: 10 years (owner-occupied domestic).
                <br />
                <br />
                <strong>Date.</strong> Today\'s date — the date the inspection and
                testing was completed and the declarations were signed. Not back-dated for the
                remortgage. The lender accepts a certificate dated today; if the customer\'s
                completion is tomorrow, that is between the customer and the lender.
                <br />
                <br />
                <strong>Distribution.</strong> Customer pack (printed at handover plus PDF
                emailed); contractor file (cloud); NICEIC (or your scheme) online portal upload
                within 30 days for Part P Building Control notification — the scheme then
                generates the Building Control Compliance Certificate that the customer will
                also need for the remortgage.
              </>
            }
            whyItMatters={
              <>
                The certification pack is what survives the install. The remortgage lender
                today, the buyer\'s solicitor in five years, the EICR inspector in ten
                years and the insurance investigator after any incident will all pick up this
                EIC and need to make sense of it. Right form, right defect handling, right
                date, right comments on the unaltered parts — each one defensible on its
                own. Get any of those wrong and the certificate becomes a liability rather
                than an asset.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 651.1 (periodic inspection)"
            clause={
              <>
                Where required, periodic inspection and testing of every electrical
                installation shall be carried out in accordance with the regulations of Part 6.
              </>
            }
            meaning={
              <>
                The EICR is the periodic inspection&apos;s deliverable, governed by Part 6 as
                renumbered and restructured in A4:2026. The same regulation framework applies
                whether the install is domestic, commercial or industrial — only the
                frequency and the scope of sampling change.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 651.1 — full text from published amendment."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Section 644 prescribes three model forms: EIC for new work and major alterations; MEIWC for minor work without a new circuit; EICR for periodic inspection. Pick the right form for the job or the certification is invalid.',
              'Reg 644.1.1 (new installation) — any defect or omission revealed during inspection and testing shall be corrected before the Certificate is issued. Fix first, retest, then certify.',
              'Addition/alteration variant — only defects affecting the SAFETY of the addition or alteration must be corrected before issue. Pre-existing defects elsewhere are recorded as observations.',
              'New-circuit test — MEIWC is reserved for minor works that do NOT include a new circuit. Any new circuit, however small, triggers EIC + Schedule of Inspections + Schedule of Test Results.',
              'EIC has three signed declarations — designer, constructor, inspector. Same competent person can sign all three on a small job; each is a separate declaration of personal responsibility.',
              'Departures from BS 7671 are documented with regulation number, chosen alternative, reasoning and duty-holder acceptance. Most installations have zero departures.',
              'Comments on existing installation captures observations on unaltered parts — these do NOT block issue of the EIC for the new work.',
              'EIC retention — at least six years (Limitation Act floor) on the contractor side; PI insurers and CPS often require 10–25 years; cloud storage of PDFs is now standard practice.',
            ]}
          />

          <Quiz title="EIC issue and certificate types — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 5 — Functional testing
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Customer handover pack and scheme upload
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
