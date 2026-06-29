/**
 * Module 5 · Section 1 · Subsection 2 — BS 7671 Part 6 in detail
 * Maps to C&G 2365-03 / Unit 304 / LO2 / AC 2.1, 2.2, 2.3
 *   AC 2.1 — "state the purpose of the Initial Verification of electrical installations"
 *   AC 2.2 — "state the requirements of the initial verification"
 *   AC 2.3 — "identify the relevant documents associated with the inspection, testing and commissioning of an electrical installation"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 2.1, 2.2, 2.3; 2366-03 Unit 302 / AC 2.1, 2.2
 *
 * Walks Reg 641, 642, 643, 644 in turn — the structure of Part 6 Chapter 64
 * for initial verification — and the documentation chain that produces an EIC.
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

const TITLE = 'BS 7671 Part 6 in detail | Level 3 Module 5.1.2 | Elec-Mate';
const DESCRIPTION =
  'Reg 641 (general), Reg 642 (visual inspection), Reg 643 (testing), Reg 644 (certification) — the four-regulation backbone of initial verification under BS 7671 Part 6, plus Appendix 6 forms.';

const checks = [
  {
    id: 'm5-s1-sub2-purpose',
    question: 'Per Reg 641.1, the purpose of initial verification is to confirm:',
    options: [
      'That the installation will remain safe for the whole of its design life without any further inspection.',
      'That the client has accepted the quotation and the work has been paid for before energising.',
      'That the requirements of BS 7671 have been met, so far as is reasonably practicable, before the installation is put into service.',
      'That the DNO has approved the connection and the supply has been energised at the cut-out.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 641.1 makes the purpose explicit: verify before energising, "so far as is reasonably practicable", that the BS 7671 requirements have been met. The "so far as is reasonably practicable" formulation mirrors EAWR — initial verification is the technical mechanism by which a duty holder discharges the EAWR Reg 4(1) construction duty.',
  },
  {
    id: 'm5-s1-sub2-642-inspection',
    question: 'Reg 642 requires visual inspection to be carried out:',
    options: [
      'Only after all the dead and live tests are complete, as a final check that nothing was disturbed during testing.',
      'Before testing — and during erection where applicable — to confirm that installed equipment complies with regulatory requirements, is correctly selected and erected, and is not visibly damaged or defective.',
      'Only on the parts of the installation that cannot be reached by the test instruments, since testing covers everything else.',
      'At any point the inspector chooses, because the order of inspection and testing is left entirely to professional judgement.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642 inspection is carried out BEFORE testing, ideally during erection so defects are caught early. The list of items to be inspected (Reg 642.3) is non-exhaustive — equipment selection and conformity, manufacturer instructions, identification, accessibility, current-carrying capacity, RCDs and AFDDs where required, and many more.',
  },
  {
    id: 'm5-s1-sub2-eic-vs-mwc',
    question: 'When is a Minor Works Certificate (MWC) appropriate instead of a full EIC?',
    options: [
      'For additions and alterations to an existing installation that do not include the installation of a new circuit. A new circuit always requires an EIC, regardless of size.',
      'For any work valued below a set monetary threshold, regardless of whether a new circuit is installed.',
      'For any single-circuit work, including running a brand-new circuit from the consumer unit, provided only one circuit is involved.',
      'For a full consumer unit replacement, because the existing circuits are simply being reconnected rather than newly installed.',
    ],
    correctIndex: 0,
    explanation:
      'The MWC was designed for genuinely minor works — adding a socket to an existing ring, replacing a switch, adding a light fitting on an existing circuit. The defining test: no new circuit is installed. As soon as you install a new circuit (even a single point), you cross the line into needing an EIC. Replacing a CU triggers an EIC because every circuit is being newly tested and certified.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'BS 7671 Reg 642.3 lists items to be checked during initial inspection. The IET position on this list is:',
    options: [
      'It is an exhaustive list. An inspector who checks every listed item has fully discharged the visual inspection duty and need look at nothing else.',
      'It is a non-exhaustive list. Inspectors must check additional items appropriate to the installation in addition to those listed.',
      'It is advisory only. The listed items are recommendations, and an inspector may omit any of them at their discretion.',
      'It applies to periodic inspection only. For initial verification the inspector follows the manufacturer\'s commissioning sheet instead of the Reg 642.3 list.',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 makes this explicit — the Reg 642.3 list is the formal checklist but it is not exhaustive. Inspectors apply professional judgement to add items appropriate to the installation. For example a swimming pool location adds the Section 702 inspection items; a marina adds Section 709; a medical location adds Section 710. The list is the floor, not the ceiling.',
  },
  {
    id: 2,
    question: 'On the Schedule of Inspections, item 1 ("Methods of protection against electric shock") would tick boxes for:',
    options: [
      'Basic protection only — confirming that live parts are insulated, enclosed or placed out of reach. Fault protection is a separate item assessed elsewhere on the schedule.',
      'Fault protection only — confirming that automatic disconnection of supply operates within the required time. Basic protection is assumed and not separately ticked.',
      'Both basic protection (insulation, barriers/enclosures, obstacles, placing out of reach) AND fault protection (ADS, double or reinforced insulation, electrical separation, ELV) — confirming both layers per Section 41.',
      'RCD additional protection only — confirming a 30 mA RCD is fitted to every circuit, which by itself satisfies the requirement for protection against electric shock.',
    ],
    correctAnswer: 2,
    explanation:
      'Section 41 requires protection against electric shock to be by both basic protection AND fault protection (or the equivalent enhanced single layer in special cases like SELV or Class II). The Schedule of Inspections item 1 prompts you to confirm both layers are in place — basic protection (insulation, enclosure) AND fault protection (typically ADS via the protective device + bonding).',
  },
  {
    id: 3,
    question: 'Reg 643.1 specifies the test sequence. Which of the following correctly orders the dead-test sequence?',
    options: [
      'Insulation resistance first, then continuity of protective conductors, then polarity, then ring final continuity, then earth fault loop impedance — testing for faults between conductors before proving the protective path.',
      'Earth fault loop impedance (Zs) first while the supply is live, then continuity, then insulation resistance, then polarity — establishing the loop impedance before any dead testing.',
      'Polarity first, then insulation resistance, then continuity of protective conductors, then ring final continuity — confirming correct connections before testing the protective path.',
      'Continuity of protective conductors then continuity of ring final live conductors then insulation resistance then polarity then earth electrode resistance (TT) then automatic disconnection of supply (live) then polarity (live) then RCD then functional checks.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 Reg 643.1 specifies the sequence — and GN3 expands on the rationale (each test depends on the previous one being good). Continuity first (proves the protective path), then live-conductor continuity if a ring final, then IR (proves no faults between conductors), then polarity, earth electrode (TT only), then live tests starting with ADS and Zs. Doing tests out of order can give misleading results or, worse, expose the tester to risk.',
  },
  {
    id: 4,
    question: 'Reg 644 requires what to be issued at the end of initial verification?',
    options: [
      'An Electrical Installation Certificate (EIC), accompanied by a Schedule of Inspections AND a Schedule of Test Results — the three-document set required by Section 644 for full initial verification.',
      'A Minor Works Certificate on its own, which covers both the visual inspection and the test results in a single document for any new installation.',
      'An Electrical Installation Condition Report (EICR) with C-codes, which records the condition of the new installation at the point of handover.',
      'A verbal confirmation to the client that the installation is safe, with the written certificate to follow within 28 days of energising.',
    ],
    correctAnswer: 0,
    explanation:
      'The full sign-off pack is three documents: EIC (the headline certificate), Schedule of Inspections (Reg 642 visual checks ticked off), Schedule of Test Results (Reg 643 measurements and pass/fail). For minor works to existing circuits — no new circuit — a Minor Works Certificate replaces the EIC + schedules. Either way, sufficient documentation must accompany every piece of certified work.',
  },
  {
    id: 5,
    question: 'Per Reg 651, periodic inspection should determine whether the installation:',
    options: [
      'Was installed to the edition of BS 7671 in force at the time, regardless of whether it remains safe under the current edition.',
      'Remains in a satisfactory condition for continued service, taking into account changes since the last inspection or initial verification — checking for damage, deterioration, defects and dangerous conditions.',
      'Can be brought fully up to the current edition of BS 7671, with every departure from the latest standard recorded as a defect requiring remedy.',
      'Has been used within the manufacturer\'s warranty terms, so that any failure can be claimed against the original installer.',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 651 reframes the verification question for an existing installation. We are not verifying initial compliance (that is done via the EIC); we are verifying the installation is STILL safe for continued use. That means inspecting for damage, deterioration since the last check, defects that have arisen, and dangerous conditions. The output is the EICR with C-coding for any items found.',
  },
  {
    id: 6,
    question: 'Reg 132.13 (renumbered from earlier 132.13) requires:',
    options: [
      'The installation to be re-inspected every twelve months and a fresh EICR issued, regardless of the installation type or use.',
      'A copy of every certificate to be lodged with the local building control body before the installation can be energised.',
      'Information and instructions on the installation, including diagrams, charts and tables that may be required for inspection, testing and maintenance, to be provided to the user/duty holder.',
      'The installer to retain ownership of all documentation, releasing it to the duty holder only at the next periodic inspection.',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 132.13 puts a duty on the designer/installer to leave the user with the documentation needed to operate, maintain, inspect and test the installation safely. This includes circuit charts, distribution board labels, single-line diagrams for larger installations, manufacturer literature for protective devices, and the EIC pack itself. A4:2026 reaffirms this — and it ties to the EAWR Reg 4(2) ongoing maintenance duty (you cannot maintain what you cannot identify).',
  },
  {
    id: 7,
    question: 'Appendix 6 of BS 7671 contains the model forms. Which statement is correct?',
    options: [
      'Only the exact paper forms printed in Appendix 6 are legally valid — a scheme\'s branded or digital version cannot be used for certification.',
      'The model forms are illustrative only and have no legal status; any blank sheet of paper recording the test results is equally acceptable.',
      'A scheme may add or remove fields from the model form as it sees fit, since the signature alone carries the legal weight.',
      'Schemes (NICEIC, NAPIT, Stroma) publish their own branded forms which must contain all required fields from the model — and signing the form has the same legal weight regardless of brand.',
    ],
    correctAnswer: 3,
    explanation:
      'The Appendix 6 forms are model templates. Scheme providers issue branded versions (often digital, increasingly app-based), and as long as the branded form contains all the required fields from the model, it is acceptable. The legal weight is in the content and the signature, not the letterhead. A well-completed scheme form on a phone app is no less valid than a paper form from the back of BS 7671.',
  },
  {
    id: 8,
    question: 'The "design" section of an EIC is signed by:',
    options: [
      'The person responsible for the design of the installation — this might be a separate consulting engineer on a large project, or the same electrician as construction/test on a small domestic job. The signature confirms responsibility for design compliance.',
      'The client or building owner, who signs to confirm they commissioned the design and accept responsibility for its compliance.',
      'The scheme provider\'s assessor, who reviews the design remotely and signs the design block on the contractor\'s behalf.',
      'The inspector who carries out the testing, since the design is only verified once the test results confirm it works.',
    ],
    correctAnswer: 0,
    explanation:
      'EIC has three signature blocks: Design, Construction, Inspection & Testing. On a small domestic job all three are typically signed by the same competent electrician. On a larger commercial job the design might be by an external consultant, construction by one contractor, and verification by another. Each signatory takes responsibility for their part. Multiple signatures are common; the form accommodates them.',
  },
];

const faqs = [
  {
    question: 'What is the practical difference between Reg 641, 642, 643 and 644?',
    answer:
      'Reg 641 = the general principles (verify before service, who carries it out, what it covers). Reg 642 = the visual inspection list (what to look at and tick off on the Schedule of Inspections). Reg 643 = the testing requirements (what tests, in what sequence, against what acceptance criteria). Reg 644 = certification (what document to issue, what it must contain, what to do with it). Together they form the chapter 64 framework for initial verification.',
  },
  {
    question: 'When does a CU change need an EIC vs an MWC?',
    answer:
      'Always an EIC. Replacing a CU means you are re-testing every circuit it supplies and certifying them as a re-energised installation. An MWC is for "minor works to an existing circuit" — and you are not adding to an existing circuit when you change a CU, you are re-presenting the whole installation downstream of it. The proper sign-off is a full EIC plus Schedule of Inspections plus Schedule of Test Results for every circuit.',
  },
  {
    question: 'What if the original EIC for an existing installation cannot be located?',
    answer:
      'Common scenario — a property changes hands and the new owner has no documentation. The right action depends on what you are doing. For a periodic inspection, no historical EIC is needed — the EICR stands on its own measurements and findings. For an addition or alteration, you can carry out your own initial verification of the whole installation, issue an EIC for the new work, and recommend a fresh EICR for the rest. Note the absence of historical documentation as an observation in your report — it is not itself a code, but it is useful information for the duty holder.',
  },
  {
    question: 'Can I issue an EIC for someone else\'s work?',
    answer:
      'Generally no — you can only certify what you have personally verified. If you are taking over a partially-complete installation, the cleanest approach is to carry out a full initial verification of the work as if it were yours, identify any defects in the previous installer\'s work, get them remedied, then sign as the verifying inspector. Some scheme rules and contractual arrangements may permit a "certifying engineer" to sign for an installer\'s work but only with full first-hand verification. Signing for work you didn\'t see and didn\'t test is professional misconduct and exposes you under EAWR Reg 16.',
  },
  {
    question: 'How does Reg 132.13 documentation interact with the EIC pack?',
    answer:
      'Reg 132.13 is broader. The EIC + schedules document the verification. Reg 132.13 documentation covers what the user needs to operate, maintain, alter, and re-inspect the installation safely — circuit charts at the CU, single-line diagrams for larger installations, manufacturer literature for protective devices, RCD test instructions, isolation diagrams, AFDD test instructions, surge protection device data. Both sets of documentation are required. The EIC proves the installation was verified at handover. The 132.13 documentation enables ongoing safe use.',
  },
  {
    question: 'What is the difference between "design", "construction" and "inspection and testing" on the EIC?',
    answer:
      'Three separate competences signed off separately on the EIC: Design (per BS 7671 Part 4 and Part 5 — selecting the protective devices, conductor sizes, ADS arrangements, special location requirements). Construction (per BS 7671 Part 5 — installing per the design, using compliant materials, terminating per manufacturer instructions). Inspection & Testing (per BS 7671 Part 6 — verifying the installation matches the design and works correctly). Three different bodies of knowledge. On small jobs one electrician covers all three. On larger jobs they may be split between teams or organisations.',
  },
];

export default function Sub2() {
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
            eyebrow="Module 5 · Section 1 · Subsection 2"
            title="BS 7671 Part 6 in detail"
            description="Reg 641 (general principles), Reg 642 (visual inspection items), Reg 643 (testing), Reg 644 (certification) — the four-regulation backbone of initial verification, plus the Appendix 6 forms."
            tone="emerald"
          />

          <TLDR
            points={[
              'BS 7671 Part 6 Chapter 64 is built on four regulations: Reg 641 (general — verify before service), Reg 642 (visual inspection list), Reg 643 (testing — sequence and acceptance), Reg 644 (certification — what document to issue).',
              'Reg 642.3 lists the inspection items — non-exhaustive. The Schedule of Inspections in Appendix 6 is the standard tick-list.',
              'Reg 643.1 specifies the test SEQUENCE — continuity first, then IR, then polarity, then live tests. Each step depends on the previous one passing.',
              'Reg 644 requires an EIC + Schedule of Inspections + Schedule of Test Results for new installs, or an MWC for additions/alterations to existing circuits with no new circuit added.',
              'Reg 132.13 sits alongside Part 6 and requires you to leave the user with operating, maintenance, inspection and testing documentation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the purpose of initial verification per Reg 641.1.',
              'Cite the four core regulations of Chapter 64 (641, 642, 643, 644) and what each covers.',
              'Identify the documents required at sign-off — EIC, Schedule of Inspections, Schedule of Test Results — and when an MWC suffices instead.',
              'Explain the Reg 643.1 test sequence and why each step depends on the previous one.',
              'Describe the role of Reg 132.13 documentation and what it must include.',
              'Locate model forms in Appendix 6 and explain how scheme-branded forms relate to them.',
              'Identify the three EIC signature blocks (Design, Construction, Inspection & Testing) and who signs each.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Reg 641 — general principles</ContentEyebrow>

          <ConceptBlock
            title="Reg 641.1 — verify before service"
            plainEnglish="Every installation must be inspected and tested before being put into service. The bar is 'so far as is reasonably practicable, that the requirements of the Regulations have been met'. This is the cardinal duty of Chapter 64."
            onSite="On a new install this means: don't switch the supply on for the first time until the dead-test sequence is complete and you've reviewed the visual inspection. On additions: verify the new work specifically before energising it."
          >
            <p>Reg 641 establishes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The verification trigger.</strong> "On completion before being put into
                service" — and "during erection" where applicable. You don't wait until the
                building is finished — you verify as you go, then a final verification before
                first energisation.
              </li>
              <li>
                <strong>The standard.</strong> "So far as is reasonably practicable that the
                requirements of the Regulations have been met". This is the same SFAIRP test used
                throughout HSWA and EAWR — it requires you to do what is reasonable, not what is
                impossible.
              </li>
              <li>
                <strong>The competent person requirement.</strong> Initial verification must be
                carried out by a "skilled person" — someone with the technical knowledge and
                experience to do it safely and correctly. This ties to EAWR Reg 16.
              </li>
              <li>
                <strong>Departures.</strong> If something complies with an alternative standard or
                a designed exception, that must be documented as a "departure from BS 7671" on the
                EIC, with the alternative standard or technical justification clearly stated.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 641.1"
            clause="Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met."
            meaning={
              <>
                The cardinal duty. Verify before service, both during erection and at completion.
                Apply the SFAIRP test. The phrasing intentionally mirrors the EAWR formulation —
                BS 7671 Part 6 is the technical mechanism by which a duty holder discharges the
                statutory verification obligation.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 641.1."
          />

          <SectionRule />

          <ContentEyebrow>Reg 642 — visual inspection</ContentEyebrow>

          <ConceptBlock
            title="What Reg 642.3 actually requires you to look at"
            plainEnglish="Reg 642.3 lists the items to inspect — installed equipment correctly selected, manufacturers' instructions followed, joints terminated correctly, conductors identified, protective devices coordinated, RCDs and AFDDs where required, and many more. It\'s a long list — non-exhaustive — that gets ticked off on the Schedule of Inspections."
            onSite="Visual inspection is BEFORE testing. You\'re catching the obvious defects (wrong cable size, missing CPC, bonding not done) before you waste time testing them. Walk the install with the schedule in hand and tick as you go."
          >
            <p>The Reg 642.3 inspection items, as represented on the model Schedule of Inspections:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment selected and erected per manufacturer\'s instructions</strong>
                (item a) — protective devices used per their published characteristics, accessories
                installed in their intended orientation, cable types appropriate for the
                installation environment.
              </li>
              <li>
                <strong>Methods of protection against electric shock</strong> (Section 41) — both
                basic protection (insulation, barriers, enclosures, placing out of reach,
                obstacles) AND fault protection (ADS, Class II, electrical separation, SELV/PELV).
              </li>
              <li>
                <strong>Identification of conductors</strong> (Section 514) — line/neutral/CPC
                colours per Reg 514.3, switching identification, BS 951 warning notice for
                connections to lightning protection earthing.
              </li>
              <li>
                <strong>Cables for current-carrying capacity</strong> — appropriate to design
                load and circuit length.
              </li>
              <li>
                <strong>Connection of conductors</strong> — terminations, joints, accessibility.
              </li>
              <li>
                <strong>Protection against thermal effects</strong> (Section 42) — fire-rated
                enclosures, heat sources spaced from combustible materials, AFDD recommendations
                under Reg 421.1.7.
              </li>
              <li>
                <strong>Earthing arrangements and main equipotential bonding</strong> — to
                Section 411 requirements, conductor sizes per Section 543 and 544.
              </li>
              <li>
                <strong>Devices for isolation and switching</strong> (Section 537) — main switch,
                isolators, functional switches identified and accessible.
              </li>
              <li>
                <strong>Items in special installations or locations</strong> (Part 7) — the
                location-specific inspection items added on top.
              </li>
            </ul>
            <p>
              GN3 emphasises that the list is non-exhaustive. Inspectors apply judgement and add
              location-specific items. A swimming pool installation needs the Section 702 items.
              A medical location needs Section 710. A construction site needs Section 704.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.3 (extract)"
            clause="The inspection shall include checking, where relevant to the installation, of the following items… (a) installed equipment is of the correct type and conforms to applicable British or Harmonized Standards, or a foreign national standard based on an IEC Standard; (b) installed equipment is correctly selected and erected, taking into account manufacturers' instructions; (c) connection of cables and conductors are correctly made, including any terminations, joints, and the identification of conductors…"
            meaning={
              <>
                Reg 642.3 is the formal inspection items list. The "where relevant" phrase
                recognises that not every item applies to every install — but where they do apply,
                they must be checked and recorded on the Schedule of Inspections. Ticking
                everything as "OK" without actually checking is professional misconduct and
                creates legal liability if a defect later causes harm.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.3 — paraphrased extract."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 643 — the test sequence</ContentEyebrow>

          <ConceptBlock
            title="Why the test sequence matters"
            plainEnglish="Each test in Reg 643 depends on the one before it. Run them out of order and you get misleading results. Worse, you can put yourself at risk by energising before you\'ve verified the installation is safe to switch on."
            onSite="Memorise the order. Continuity then ring final live continuity (if applicable) then IR then polarity then earth electrode (TT only) then ADS verification then polarity (live) then Zs then PFC then RCD then functional. The dead tests come first because they prove the installation is safe to energise."
          >
            <p>The Reg 643.1 sequence and why each step matters:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity of protective conductors (Reg 643.2).</strong> Proves the
                earth path is intact. Without this, no fault current can flow and ADS cannot
                operate. Test FIRST because everything else assumes the protective path is good.
              </li>
              <li>
                <strong>Continuity of ring final live conductors (Reg 643.2.1(b)).</strong> Where
                a ring final is installed — the three-part test (covered in L2 M4 §6.2). Proves
                the ring is actually a ring.
              </li>
              <li>
                <strong>Insulation resistance (Reg 643.3).</strong> 500 V DC for circuits up to
                1000 V (250 V for SELV/PELV). Acceptance: at least 1 MΩ for LV circuits per Table
                64, at least 0.5 MΩ for SELV/PELV at 250 V. Tests live conductors against each
                other and against earth — no fault current paths within the installation.
              </li>
              <li>
                <strong>Polarity (Reg 643.6 — dead).</strong> Single-pole devices in the line,
                line on the right terminals, BC/ES outer contacts on neutral. Done dead with the
                continuity tester to confirm the line side is what it should be.
              </li>
              <li>
                <strong>Earth electrode resistance (Reg 643.7.2 — TT only).</strong> Three-pole
                fall-of-potential method or stake-less loop tester depending on conditions.
                Acceptance for TT: low enough that Zs times IΔn does not exceed 50 V.
              </li>
              <li>
                <strong>FIRST ENERGISATION — only after all dead tests pass.</strong>
              </li>
              <li>
                <strong>Polarity (live).</strong> Confirm at the supply intake.
              </li>
              <li>
                <strong>Earth fault loop impedance Ze and Zs (Reg 643.7.3).</strong> Live
                measurement at the origin (Ze) and at far ends of circuits (Zs). Compare to A4:2026
                Table 41.3 max values, applying the 0.8 multiplier for measured-to-tabulated
                comparison.
              </li>
              <li>
                <strong>Prospective fault current PFC (Reg 643.7.3.201).</strong> Calculated from
                Zs or measured directly. Confirms protective devices have adequate breaking
                capacity per Reg 434.5.
              </li>
              <li>
                <strong>RCD operation (Reg 643.7.3 simplified A4:2026 method).</strong> Single AC
                test at 1 times IΔn — must trip in 300 ms or less. The old multi-test sequence
                at multiples of IΔn (5x, 0.5x, half-cycle) and Table 3A in older editions are
                deleted in A4:2026.
              </li>
              <li>
                <strong>AFDD test (Reg 643.7.x where AFDD installed).</strong> Press the integral
                test button, confirm operation. AFDD recommendation under Reg 421.1.7 in A4:2026.
              </li>
              <li>
                <strong>Functional testing (Reg 643.10).</strong> Switchgear, interlocks, control
                circuits, emergency switching, fire alarm interfaces.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 643.1 (Sequence of tests) and Regulation 643.7.2 (closing paragraph — repeat tests after fault rectification)"
            clause={`Regulation 643.1: The tests of Regulations 643.2 to 643.6, where relevant, shall be carried out in that order before the installation is energised. Regulation 643.7 onwards covers tests that by their nature require the supply to be connected (Ze, PFC, Zs, RCD operation, AFDD confirmation, functional). Per Regulation 643.7.2 (closing paragraph): if any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified.`}
            meaning={
              <>
                The sequence is mandated, not advisory. Dead tests (643.2 to 643.6) run in order
                before energisation; live tests (643.7 onwards) follow once safe. If a fault is
                found mid-sequence, remedy it AND repeat that test plus any earlier tests it could
                have influenced — you cannot just patch the fault and continue. This protects
                against tests being invalidated by changes made part-way through verification.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulations 643.1 and 643.7.2."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Reg 644 — certification and the document set</ContentEyebrow>

          <ConceptBlock
            title="The three-form certification pack"
            plainEnglish="Initial verification produces three documents: the EIC (or MWC for minor works), the Schedule of Inspections (visual checks ticked), and the Schedule of Test Results (measurements and pass/fail). All three are required for full sign-off."
            onSite="Don\'t issue the EIC without the schedules. The EIC is a summary signed by the competent persons; the schedules are the evidence behind it. Some scheme apps generate the three together — but check the schedules are populated, not blank tick-boxes."
          >
            <p>What each document covers:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>EIC (Electrical Installation Certificate).</strong> Required for new
                installations and CU changes. Three signature blocks — Design, Construction,
                Inspection & Testing. Records the installation address, supply characteristics
                (TN-S / TN-C-S / TT, Ze, PFC, prospective short-circuit at origin), the
                designer/installer/inspector details, departures from BS 7671 if any, and the
                next inspection recommendation.
              </li>
              <li>
                <strong>Schedule of Inspections.</strong> Tick-list of the Reg 642.3 items.
                Confirms visual inspection covered every required item. "N/A" is acceptable where
                an item doesn\'t apply to this installation; "LIM" denotes a limitation (item not
                fully verifiable) with explanation.
              </li>
              <li>
                <strong>Schedule of Test Results.</strong> Per-circuit measurement record. Columns
                include circuit description, conductor size, protective device type/rating, RCD
                IΔn, Zs (calc and/or measured), R1+R2, IR L-N / L-E / N-E, RCD trip time, polarity
                tick. The data backbone of the EIC.
              </li>
              <li>
                <strong>MWC (Minor Works Certificate).</strong> For additions and alterations to
                existing circuits with NO new circuit added. Single-page form. Records the work
                done, the test results for the affected portion, and a confirmation that the
                existing installation\'s safety hasn\'t been compromised by the work.
              </li>
              <li>
                <strong>EICR (Electrical Installation Condition Report).</strong> The periodic
                inspection equivalent — covered in Section 5 of this module.
              </li>
            </ul>
            <p>
              All certificates and schedules must be retained — by the issuing contractor (often
              required by scheme rules) AND by the duty holder (for ongoing maintenance and
              future inspections). Best practice: retain for the life of the installation.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Issuing an EIC without the supporting schedules"
            whatHappens={
              <>
                You sign and hand over an EIC. The Schedule of Inspections is blank ("we ticked it
                on the app"). The Schedule of Test Results has only Ze and one Zs reading on it.
                Two years later the installation has a fire from a defective accessory. The
                investigators ask for the verification evidence. You cannot show the inspection
                items were actually checked. Your scheme provider opens an investigation. The
                client\'s insurer disputes the claim because the documentation is incomplete.
              </>
            }
            doInstead={
              <>
                Always issue the full set: EIC + complete Schedule of Inspections + populated
                Schedule of Test Results. Every Reg 642.3 inspection item ticked (or marked N/A
                with reason). Every circuit row complete with Zs, R1+R2, IR readings, RCD trip
                time, polarity. The schedules ARE the evidence. The EIC summarises and certifies
                them. Without the schedules the EIC is just a signature on a sheet.
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

          <ConceptBlock
            title="Reg 643.7.3 — A4:2026 simplified RCD test"
            plainEnglish="A4:2026 deleted the old multi-test RCD sequence (1×IΔn, 0.1×IΔn, half-cycle, Table 3A trip times) and replaced it with a single AC test at 1×IΔn. The device must operate within 300 ms — the AC test confirms basic functionality. The integral test button covers the mechanical / electronic operation. This is the biggest single Part 6 change in the amendment."
            onSite="Don't apply the old method on a current EIC. Single AC test at IΔn, must trip in 300 ms. Old multi-test RCD testers still work — just use the 1×IΔn function. Record the trip time on the Schedule of Test Results."
          >
            <p>The new Reg 643.7.3 RCD test sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Operate the integral test button.</strong> Confirms the mechanical /
                electronic detection circuit works. RCD must trip and reset.
              </li>
              <li>
                <strong>Apply 1×IΔn AC test current.</strong> Single test at the rated residual
                operating current. Acceptance: a general (non-delay) RCD must disconnect within
                300 ms; an 'S' (time-delayed) type between 130 ms and 500 ms. There is no separate
                site test at multiples of IΔn — the old ×5 IΔn / 40 ms check has been removed.
              </li>
              <li>
                <strong>Record the trip time and the IΔn used.</strong> Schedule of Test Results
                column for "RCD operation".
              </li>
            </ol>
            <p>
              What is gone: 0.1×IΔn no-trip test (deleted), 1×IΔn trip test for additional
              protection (deleted from site test — handled in design / device standard), Table 3A
              trip-time matrix (deleted). The integral test button still required for confirmation
              of mechanical operation, but the electronic device behaviour is verified by the
              single AC test.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Table 41.3 maximum Zs — A4:2026 corrected values"
            plainEnglish="A4:2026 republished Table 41.3 (max Zs for ADS) with corrected values that align with the BS EN protective device standards. Notable: B32 Type B max Zs is now 1.37 Ω (was 1.44 Ω in 17th Edition Amendment 3 and earlier). The table is the verifier's reference for comparing measured Zs against the limit."
            onSite="Use the A4:2026 Table 41.3 — not memory, not older copies. Apply the GN3 0.8 multiplier when comparing measured Zs (at ambient) against the tabulated value (which assumes operating temperature). 1.37 Ω × 0.8 = 1.10 Ω is the realistic ambient-temperature target for B32."
          >
            <p>Common Type B MCB max Zs values from A4:2026 Table 41.3 (230 V, 0.4 s disconnection):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>B6 — 7.28 Ω</strong> (5.82 Ω at ambient with 0.8 multiplier).
              </li>
              <li>
                <strong>B10 — 4.37 Ω</strong> (3.50 Ω at ambient).
              </li>
              <li>
                <strong>B16 — 2.73 Ω</strong> (2.18 Ω at ambient).
              </li>
              <li>
                <strong>B20 — 2.19 Ω</strong> (1.75 Ω at ambient).
              </li>
              <li>
                <strong>B32 — 1.37 Ω</strong> (1.10 Ω at ambient — A4:2026 corrected from 1.44 Ω).
              </li>
              <li>
                <strong>B40 — 1.09 Ω</strong> (0.87 Ω at ambient).
              </li>
              <li>
                <strong>B50 — 0.87 Ω</strong> (0.70 Ω at ambient).
              </li>
            </ul>
            <p>
              Type C devices need lower Zs (faster magnetic trip needs more fault current). Type
              D needs lower still. Always check the table for the device type in front of you. For
              5 s disconnection circuits (distribution circuits per Reg 411.3.2.3) the max Zs values
              are higher — different table column.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 PNB designation — TN-C-S split"
            plainEnglish="A4:2026 formalised PNB (Protective Neutral Bonding) as a distinct designation within TN-C-S, separating it from PME. PME = the DNO bonds N to earth on the network (multiple points). PNB = the customer bonds N to earth at the supply intake. Both result in a TN-C-S customer-side topology, but the responsibility split and the EIC declaration differ."
            onSite="Look at the supply intake. PME — the DNO has the bond inside their sealed enclosure (you do NOT see a customer-side N-E link). PNB — the customer has a visible N-E strap inside the customer enclosure at the origin (often a copper bar between the neutral block and the earth block). Record the actual arrangement on the EIC; A4:2026 added the PNB row specifically for this."
          >
            <p>The TN-C-S subdivisions and the visible cues:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PME (Protective Multiple Earthing).</strong> DNO bonds combined PEN to
                earth at multiple points on the LV network (substation neutral, joint pits, supply
                heads). Customer connects earthing conductor to the DNO supply terminal. Ze
                typically 0.1-0.35 Ω. Diverted neutral current under PEN failure is the design
                concern that drives Table 54.7 / 54.8 PME columns.
              </li>
              <li>
                <strong>PNB (Protective Neutral Bonding) — A4:2026 designation.</strong> The
                customer bonds the supply neutral to earth at the customer intake — typically
                where the supply enters a private network and the customer is the distribution
                operator. Common in private estates, larger commercial sites with private
                substations. Same TN-C-S customer-side topology as PME, but the bond is a
                customer responsibility.
              </li>
              <li>
                <strong>EIC implications.</strong> The A4:2026 EIC includes a tick for both PME
                and PNB so the actual arrangement is recorded. Misidentifying PNB as PME on the
                EIC misattributes the bond responsibility — future inspectors and the duty
                holder may not realise the customer maintains the bond.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 132.13 — the documentation duty"
            plainEnglish="Reg 132.13 (renumbered from earlier 132.13) requires the designer / installer to provide the user with the operating, maintenance, inspection and testing documentation. This is the documentation half of compliance — the EIC pack proves verification was done, the Reg 132.13 pack enables ongoing safe use."
            onSite="At handover, provide more than the EIC. Circuit charts at the CU, single-line diagram for anything more complex than a small domestic, manufacturer literature for protective devices, RCD / AFDD test button instructions, isolator identification, next inspection date notice. The duty holder needs all of this to maintain the installation safely."
          >
            <p>Reg 132.13 documentation pack contents (per BS 7671 + GN3 + scheme guidance):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Circuit identification chart at every consumer unit / DB (Reg 514.9).
              </li>
              <li>
                Single-line distribution diagram for installations with sub-DBs / sub-mains.
              </li>
              <li>
                Manufacturer literature for protective devices (MCBs, RCBOs, AFDDs, SPDs).
              </li>
              <li>
                Test button operation instructions for RCDs / RCBOs / AFDDs — typically a notice
                near the CU.
              </li>
              <li>
                SPD status interpretation guide where SPDs installed.
              </li>
              <li>
                Inspection date notice per Reg 514.12 — recommended next inspection, contractor /
                scheme details.
              </li>
              <li>
                EIC + Schedule of Inspections + Schedule of Test Results — the verification
                record.
              </li>
              <li>
                Building Regulations Compliance Certificate where Part P notifiable.
              </li>
              <li>
                For larger installations: full O&amp;M manual including isolation procedures,
                emergency contacts, fire alarm / emergency lighting interface details.
              </li>
            </ul>
            <p>
              Failure to leave adequate Reg 132.13 documentation is a verification omission. The
              duty holder cannot discharge the EAWR Reg 4(2) ongoing duty without the information
              to identify, isolate, and maintain the installation. Document the handover and
              ideally retain proof of receipt.
            </p>
          </ConceptBlock>

          <Scenario
            title="Choosing the right document for a kitchen extension"
            situation={
              <>
                A homeowner has had their kitchen extended. Your work: extend the existing 32 A
                ring final into the new section by adding three new sockets to the loop. No new
                circuit installed; the ring is altered in length and accessories. Existing CU,
                existing protective device, existing ADS arrangement. Test results all pass.
              </>
            }
            whatToDo={
              <>
                Issue a Minor Works Certificate. The criterion for MWC is: addition or alteration
                to an existing circuit, with no new circuit added. Adding sockets to an existing
                ring is a textbook MWC scenario. Record on the MWC: the extent of the work
                (sockets added, ring extended), the test results for the altered ring (full
                three-part ring final test, IR, polarity, Zs at the new far end), and confirmation
                the existing installation\'s safety is not impaired. Hand the MWC to the
                homeowner with a copy retained for your records. No need for a full EIC because
                no new circuit was installed.
              </>
            }
            whyItMatters={
              <>
                Picking the right document matters legally and practically. Issuing a full EIC for
                a few extra sockets is overkill (and might imply you re-tested every other circuit
                which you did not). Issuing nothing is non-compliant — every alteration must be
                certified under BS 7671 Part 6. The MWC is the right-sized tool for the job.
                Conversely, if the homeowner had asked for an additional radial circuit for a
                kitchen island, that would be a NEW circuit and an EIC would be required, even if
                only that single circuit is on the certificate.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS 7671 Part 6 Chapter 64 = initial verification, structured around four regulations: 641 (general), 642 (visual inspection), 643 (testing), 644 (certification).',
              'Reg 642.3 lists the inspection items — non-exhaustive — that get ticked on the Schedule of Inspections. Add location-specific items from Part 7 where relevant.',
              'Reg 643.1 mandates the test SEQUENCE: dead tests first (continuity, IR, polarity, electrode), then live tests (Zs, PFC, RCD, AFDD, functional). Each step depends on the previous passing.',
              'Reg 644 requires the three-form pack: EIC + Schedule of Inspections + Schedule of Test Results for new installations and CU changes. MWC for minor works to existing circuits with no new circuit added.',
              'The EIC has three signature blocks — Design, Construction, Inspection & Testing — each carrying separate professional responsibility.',
              'Reg 132.13 (renumbered from 132.13) requires you to leave the user with operating, maintenance, inspection and testing documentation alongside the EIC pack.',
              'Appendix 6 holds the model forms; scheme-branded versions are acceptable provided they include all required fields. The legal weight is in content + signature, not letterhead.',
              'A4:2026 changes to Part 6: simplified RCD test (Reg 643.7.3, single AC at 1 times IΔn), AFDD recommendation (Reg 421.1.7), updated Table 41.3 max Zs values (B32 = 1.37 Ω not 1.44).',
            ]}
          />

          <Quiz title="BS 7671 Part 6 — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.1 Statutory framework
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 GN3 — what it adds
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
