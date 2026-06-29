import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s1-purpose-of-iv',
    question: 'In one sentence, what is the objective of initial verification under Reg 641.1?',
    options: [
      'To prove the design is the cheapest compliant solution available within Part 5',
      'To confirm by inspection and testing that the work complies with BS 7671 and is safe to put into service',
      'To produce a Schedule of Test Results usable as a quotation for further remedial work',
      'To satisfy the DNO that the cut-out fuse rating is correct before final energisation',
    ],
    correctIndex: 1,
    explanation:
      "Reg 641.1 frames initial verification as confirmation of compliance with BS 7671 by inspection (Reg 642.2) and testing (Reg 642.3 / Section 643), covering new installations, alterations and additions. The output is the EIC plus its schedules, signed by the Designer, Installer and Inspector — the document that says 'this is safe to energise and put into service'. Cost, DNO fuse rating and quotations sit elsewhere.",
  },
  {
    id: 'm6s1-642-1-design-data',
    question:
      'You arrive on site to verify a new commercial board. The contractor hands you the keys but no paperwork. What does Reg 642.1 require BEFORE you start?',
    options: [
      'Nothing further — start testing and document the readings afterwards',
      'A verbal confirmation from the installer that the cables are correctly sized',
      'The design data — Section 311 characteristics, drawings, schedules and calculations',
      'Only a copy of the previous EICR issued for that property',
    ],
    correctIndex: 2,
    explanation:
      "Reg 642.1 makes it explicit: information per Reg 132.12 and Reg 514.9.1 — drawings, schedules of items, calculations and the assessment of general characteristics — shall be made available to the inspector. Without that data the inspector cannot compare 'as designed' against 'as installed', cannot confirm Zs limits against the chosen device, and cannot demonstrate compliance. No data, no defensible cert.",
  },
  {
    id: 'm6s1-inspection-before-test',
    question:
      'A trainee suggests doing the dead tests first to save time, then walking the inspection while the customer is on a call. Why is this the wrong order?',
    options: [
      'Because dead-test results are only valid if taken before the live tests',
      'Because Reg 642.2 requires visual inspection to precede testing — defects spotted first protect the tester',
      'Because test-equipment manufacturers forbid inspecting an energised installation',
      'Because the installer must witness the inspection but not the testing',
    ],
    correctIndex: 1,
    explanation:
      'Reg 642.2: visual inspection shall precede testing and shall normally be done with the installation disconnected from the supply. The inspection is partly a competence-of-the-installer check and partly a safety-of-the-tester check. Spotting a missing CPC or a damaged accessory at the inspection stage stops you connecting test leads to something that could injure you when you energise.',
  },
  {
    id: 'm6s1-eic-three-roles',
    question:
      'On the EIC for a small alteration done by a sole-trader, who signs the three role boxes (Designer, Installer, Inspector)?',
    options: [
      'Only the customer signs, with the contractor signing as a witness to the work',
      'A different competent person must legitimately sign each of the three roles',
      'One competent person signs all three roles, each with a separate signature and date',
      'Only the inspector signs; the designer and installer boxes are left optional',
    ],
    correctIndex: 2,
    explanation:
      'Section 631 / Appendix 6 model EIC: design, construction and inspection-and-test are three responsibilities and three signatures. On a sole-trader job one person legitimately signs all three boxes — but the boxes still exist, each gets a signature, each gets a date. The signatures are the legal record of who took responsibility for which part of the work.',
  },
  {
    id: 'm6s1-departure-120-3',
    question:
      'A specialist control panel installed under BS EN 61439 cannot, by design, meet a particular BS 7671 requirement. What does Reg 120.3 require you to do?',
    options: [
      'Refuse to certify and walk away, since departures from BS 7671 are never permitted',
      'Tick "satisfactory" and move on, treating the departure as an internal matter only',
      'Record the departure on the EIC and justify that safety is not reduced',
      'Refer the departure to Building Control and let them rule on equivalence',
    ],
    correctIndex: 2,
    explanation:
      'Reg 120.3 explicitly permits departures from BS 7671 PROVIDED the resulting degree of safety is not less than that of the relevant Part. The departure must be recorded on the EIC ("Details of Departures from BS 7671 (Reg 120.3 and 133.5)"), the technical justification must accompany the cert, and the burden of demonstrating equivalent safety sits with the designer. Silence on the cert is the trap — it implies full compliance.',
  },
  {
    id: 'm6s1-period-to-next',
    question:
      'When completing the EIC for a new domestic rewire, where do you record the recommended period to the next inspection?',
    options: [
      'It is not recorded on the EIC; it is first added on the next periodic EICR',
      'On the EIC under "Recommendations" — the inspector records the next-inspection date',
      'Only the DNO sets the next inspection date, based on the supply arrangement',
      'It is fixed automatically at 1 year for every type of installation',
    ],
    correctIndex: 1,
    explanation:
      "Section 631 + Appendix 6: the EIC carries a 'recommended date for next inspection' field. IET Guidance Note 3 / BPG 4 give typical intervals (10 years domestic, 5 years commercial/rented, shorter for high-risk environments). The figure is a recommendation, not a statutory requirement — but it is the inspector's expert opinion and forms part of the safety case.",
  },
  {
    id: 'm6s1-a4-schedule-changes',
    question:
      'A4:2026 changes the Appendix 6 model forms. Which of the following is a real A4 change to the Schedule of Inspection?',
    options: [
      'A new column for "Customer email address" against every accessory',
      'Item 4.23 — confirmation of AFDD provision where required (Reg 421.1.7)',
      'Removal of the "polarity" tick because it is no longer required',
      'A new mandatory page for the DNO to sign',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 model forms add explicit schedule items reflecting the new technical requirements: AFDD provision (Reg 421.1.7), the new luminaire RCD rule (Reg 411.3.4), TN-C-S (PNB) as a system-earthing option, and surge protection. Every item on the Schedule of Inspection maps to a regulation that has to be verified. Email addresses, polarity removal and DNO sign-off pages are not part of the schedule.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 641.1 sets the objective of initial verification. Which option captures it most precisely?',
    options: [
      'To check that the installation is "as designed" by inspection without any testing',
      'To confirm by inspection and testing that the work complies and defects are made good first',
      'To produce a Schedule of Test Results with no inspection element required',
      'To allow the DNO to commission and energise the supply at the origin',
    ],
    correctAnswer: 1,
    explanation:
      "Reg 641.1: every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met. Defects found shall be made good before the installation is put into service. The 'and' is the load-bearing word — both inspection AND testing.",
  },
  {
    id: 2,
    question:
      'Reg 642.1 requires design data to be made available to the inspector. Which of the following is NOT part of that data set?',
    options: [
      'Drawings, charts and schedules of items installed (per Reg 514.9.1)',
      'Calculations of design current, cable size, voltage drop and Zs targets',
      "The contractor's quoted price and commercial terms agreed for the work",
      'Assessment of general characteristics per Section 311 (demand, earthing, external influence)',
    ],
    correctAnswer: 2,
    explanation:
      "Reg 642.1 / Reg 132.12: the data made available is technical — drawings, schedules, calculations, characteristics. Commercial information (price, terms) is not part of the inspector's evidence base. The inspector needs to verify 'designed correctly + installed correctly = safe to energise'; price is irrelevant to that test.",
  },
  {
    id: 3,
    question:
      'A trainee proposes a verification sequence: dead tests, energise, live tests, then walk the inspection while the supply is on. Why does Reg 642.2 reject this?',
    options: [
      'It does not — energising first is correct, to confirm the supply is present before testing',
      'It does not — the order of inspection and testing is left to the inspector\'s discretion',
      'It does not — energising before inspection is mandatory specifically on TT systems',
      'Reg 642.2 requires visual inspection to precede testing, normally with the supply disconnected',
    ],
    correctAnswer: 3,
    explanation:
      "Reg 642.2: inspection shall precede testing and shall normally be done with the installation disconnected from the supply. The order matters because (a) connecting test leads to a damaged accessory or missing CPC could injure the tester, and (b) some test results (continuity, IR) can only be properly interpreted in the context of what the inspection has confirmed about the installation's construction.",
  },
  {
    id: 4,
    question:
      'What does Reg 642.3 require, and what document underpins HOW the testing is carried out?',
    options: [
      'Testing per Section 643, which sets out the tests and the sequence in which they apply',
      'Testing only of industrial installations; domestic work needs inspection alone',
      'Any tests the inspector chooses, in any order they judge appropriate on the day',
      'Testing that may only be performed by the DNO before the supply is connected',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 642.3: where relevant, the tests of Section 643 shall be carried out. Section 643 then specifies the tests (continuity of conductors, IR, SELV/PELV separation, polarity, earth electrode resistance, EFLI/Zs, prospective fault current, RCD operating times, functional testing) and the sequence in which they are applied. The Schedule of Test Results on the EIC is the record that those tests have been performed and that the readings meet limits.',
  },
  {
    id: 5,
    question:
      'On a small alteration to a domestic circuit done by a one-person contracting business, who signs the three EIC role boxes (Designer, Installer, Inspector)?',
    options: [
      'Only the customer signs, accepting the work on the contractor\'s behalf',
      'A different competent person for each role — sole-traders may not sign all three',
      'The DNO must counter-sign at least one of the three role boxes',
      'One competent person signs all three roles, each with its own signature and date',
    ],
    correctAnswer: 3,
    explanation:
      'The three role boxes are three responsibilities, not three separate people. Where one competent person designs, installs and inspects-and-tests the work — common for small alterations and sole-trader jobs — they sign all three boxes. Each signature and date is captured separately so there is a clear record of who took on each responsibility.',
  },
  {
    id: 6,
    question:
      'A specialist control panel cannot meet a particular BS 7671 requirement by virtue of its product standard (BS EN 61439). What does Reg 120.3 require?',
    options: [
      'The departure is forbidden, so the inspector must refuse to certify the panel',
      'Tick "satisfactory" on the EIC and move on, as departures are an internal matter',
      'Record the departure on the EIC and justify that the safety afforded is not reduced',
      'Refer the departure to Building Control and let the officer decide on equivalence',
    ],
    correctAnswer: 2,
    explanation:
      "Reg 120.3: a departure from BS 7671 is permissible PROVIDED the resulting degree of safety is not less than that obtained by compliance with the relevant Part. The departure shall be recorded on the EIC ('Details of Departures from BS 7671') and the technical justification provided. Silence on the cert is the trap — it implies full compliance and exposes the designer if the departure is later discovered.",
  },
  {
    id: 7,
    question:
      'A4:2026 introduces explicit Schedule of Inspection items reflecting new regulations. Which of these is a genuine A4 schedule addition?',
    options: [
      'Item 4.23 — provision of AFDDs where required (Reg 421.1.7)',
      "A new column for the customer's email address",
      'Removal of the polarity tick — polarity is no longer required to be verified',
      'A new mandatory page for the DNO to sign',
    ],
    correctAnswer: 0,
    explanation:
      'A4 model forms (Appendix 6) add schedule items mapping to new technical regulations: AFDD provision (item 4.23), the luminaire RCD rule (Reg 411.3.4), TN-C-S (PNB) as a system-earthing option, and surge protection. Polarity remains a mandatory check per Section 643. Email addresses and DNO pages are not part of the schedule.',
  },
  {
    id: 8,
    question:
      'On a new domestic rewire EIC, where on the certificate is the recommended date for the next inspection captured, and what typically determines its length?',
    options: [
      'It is not on the EIC; it appears only on the next periodic EICR',
      "On the EIC under 'Recommendations' — informed by installation type, environment and use",
      'It is fixed at 1 year for every installation by statutory requirement',
      'It is set by the DNO according to the supply earthing arrangement',
    ],
    correctAnswer: 1,
    explanation:
      "The EIC carries a 'recommended date for next inspection' field. The figure is the inspector's expert recommendation, informed by IET Guidance Note 3 / BPG 4 / the conditions of external influence assessed at design time. For the inspector it is a defensible piece of advice; for the duty-holder it forms the basis of their EAWR 1989 maintenance regime.",
  },
];

const faqItems = [
  {
    question: 'Is initial verification only required on whole new installations?',
    answer:
      'No. Reg 641.1 covers any new installation, alteration or addition to an existing installation. A single new circuit added to an existing board still requires inspection and testing of the new work and its interaction with the existing installation, and an EIC issued for the new work (or a Minor Electrical Installation Works Certificate where the work is genuinely minor and meets the MEIWC scope per Appendix 6). The "as installed" record is mandatory regardless of size.',
  },
  {
    question: 'Do I need to test parts of the existing installation when adding a new circuit?',
    answer:
      'Yes — to the extent necessary to verify that the new work is safe. Reg 132.16 requires that no addition or alteration shall impair the safety of the existing installation. In practice that means verifying the existing supply earthing (Ze), main protective bonding adequacy and the suitability of the existing distribution board for the additional load. Findings on the existing installation that are dangerous (potentially or actually) must be reported to the duty-holder — the EIC for the new work is for the new work only, the rest is captured on an EICR or written report.',
  },
  {
    question: 'What is the difference between the EIC, the MEIWC and an EICR?',
    answer:
      'The Electrical Installation Certificate (EIC) is the model form for new installations, alterations and additions — it certifies design, construction and verification of NEW work. The Minor Electrical Installation Works Certificate (MEIWC) is a single-page cert for minor work that does not include the provision of a new circuit (e.g. replacing a socket, adding a fused spur off an existing circuit). The Electrical Installation Condition Report (EICR) is the periodic inspection report on EXISTING installations — it grades observations C1/C2/C3/FI and gives an overall satisfactory / unsatisfactory verdict. EIC and MEIWC are issued by the installer; EICR is issued by an inspector who may not have done the original work.',
  },
  {
    question: 'Can the same person sign all three EIC role boxes (Designer, Installer, Inspector)?',
    answer:
      "Yes — where one competent person actually fulfils all three responsibilities. On a sole-trader job for a small alteration this is the norm. Each role still gets its own signature and date — the signatures are the legal record of WHO took responsibility for WHICH part. On larger projects the three roles are typically split: a designer (consulting engineer or in-house designer), an installer (the contractor), and an inspector (an independent verifier or the contractor's in-house verifier). All three sign their respective boxes and the EIC is then issued.",
  },
  {
    question: 'How do I record a departure (Reg 120.3) on the EIC?',
    answer:
      "The EIC has a dedicated field — 'Details of Departures from BS 7671 (Reg 120.3 and 133.5)'. Enter the regulation departed from, the technical reason for the departure, and the engineering justification that the resulting degree of safety is not less than that of full compliance. Attach supporting evidence (calculations, manufacturer data, alternative-standard compliance) to the cert pack. The burden sits with the designer — silence on the cert is treated as a claim of full compliance, so any later-discovered departure becomes a defect against the designer's sign-off.",
  },
  {
    question: 'What design data does Reg 642.1 actually require to be on site?',
    answer:
      "Reg 642.1 references Reg 132.12 and Reg 514.9.1. In practice the data set is: (a) the assessment of general characteristics from Section 311 (maximum demand, system earthing, external influences, characteristics of the supply); (b) drawings showing circuits, switchgear and protective devices; (c) schedules of items installed (boards, distribution circuits, final circuits, types and ratings of devices); (d) calculations underpinning cable size, voltage drop, Zs targets and disconnection times. Without this data set the inspector cannot defensibly tick the 'as designed = as installed = compliant' boxes on the EIC.",
  },
  {
    question: 'How is the "recommended period to next inspection" decided?',
    answer:
      "The recommended period is the inspector's expert opinion informed by IET Guidance Note 3 (Section 3) and Best Practice Guide 4. Typical intervals: 10 years for owner-occupied domestic, 5 years for rented domestic / commercial / industrial, 3 years for educational establishments and offices, 1 year for caravans / leisure and certain hospitality environments, shorter still for swimming pools, agricultural and high-risk locations. The figure is a recommendation, not statute — but it sets the duty-holder's maintenance regime and forms part of the inspector's safety case if the installation is later found defective.",
  },
  {
    question: 'What happens if I find a defect during initial verification?',
    answer:
      'Reg 641.1 is unambiguous: defects revealed during initial verification shall be made good before the installation is put into service. You cannot issue a "satisfactory" EIC on an installation with an outstanding defect — the cert says compliance has been verified, and an unrectified defect contradicts that statement. The right workflow is: log the defect, return it to the installer for correction, re-test the affected part, then issue the EIC. Issuing first and "going back to fix it" inverts the safety case and is exactly the chain of decisions that ends in prosecution under EAWR 1989.',
  },
  {
    question: 'Which version of the model forms (Appendix 6) should I be using?',
    answer:
      'From 15 April 2026, BS 7671:2018+A4:2026 is the in-force edition and the A4 model forms are the correct ones to use. A4 changes to the schedules include explicit items for AFDD provision (Reg 421.1.7), the new luminaire RCD rule (Reg 411.3.4), TN-C-S (PNB) as a system-earthing option, surge protection, and tightened wording around departures. Issuing an EIC on a pre-A4 form for work completed under A4:2026 leaves you with a cert that does not capture the requirements you certified against — a documentation problem and an EICR observation waiting to happen on the next periodic inspection.',
  },
];

const BS7671Module6Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Requirements for Initial Verification | BS 7671:2018+A4:2026 | Module 6.1',
    description:
      'Initial verification under BS 7671:2018+A4:2026 — Reg 641 and 642 in plain English. Design data, inspection-before-testing, the Section 643 test sequence, the EIC and its three roles, schedules, departures (Reg 120.3) and the recommended period to next inspection.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1"
            title="Requirements for initial verification"
            description="The Reg 641 / Reg 642 framework for verifying every new installation, alteration or addition before it is energised. Design data in, inspection before test, Section 643 sequence, EIC issued — and what A4:2026 changes about the model forms."
            actions={
              <>
                <RegBadge>641.1</RegBadge>
                <RegBadge>642.1</RegBadge>
                <RegBadge>642.3</RegBadge>
                <AmendmentBadge regs={['Appendix 6 model forms']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 641.1 — every installation, alteration or addition shall be inspected AND tested during erection and on completion, before being put into service. Defects shall be made good first.',
              'Reg 642.1 — design data (drawings, schedules, calculations, Section 311 assessment) shall be made available to the inspector. No data, no defensible cert.',
              'Reg 642.2 — inspection precedes testing, normally with the installation disconnected. Reg 642.3 — testing follows Section 643, in sequence.',
              'The EIC is the legal record. Three roles (Designer, Installer, Inspector), three signatures — one person can sign all three on a sole-trader job. A4:2026 model forms add AFDD, TN-C-S (PNB) and luminaire RCD to the schedules.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the objective of initial verification under Reg 641.1 and explain why inspection AND testing are both required.',
              "State the design data required by Reg 642.1 and explain how it underpins the inspector's ability to verify 'as designed = as installed'.",
              'Justify why Reg 642.2 places visual inspection BEFORE testing — both as a tester-safety control and as a precondition for valid test results.',
              'Map the EIC schedules (Schedule of Inspection items 1.0 onwards, Schedule of Test Results) to the regulations they evidence, including the A4:2026 additions.',
              'Identify the three EIC roles (Designer, Installer, Inspector), explain how a sole-trader signs all three boxes, and state what each signature commits the signer to.',
              'Record a Reg 120.3 departure correctly on the EIC and articulate the burden of justification placed on the designer.',
              'Recommend a defensible period to the next inspection (Section 631 / GN3 / BPG 4) for a given installation type and environment.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What initial verification is for</ContentEyebrow>

          <ConceptBlock
            title="Reg 641.1 — the objective"
            plainEnglish="Before any new installation, alteration or addition is energised and put into service, the inspector confirms — by visual inspection AND by testing — that BS 7671 has been complied with and that any defects revealed during the work have been corrected."
            onSite="The EIC you issue at the end is the legal record of that confirmation. It is the document the duty-holder, the insurer, the building-control officer and (if it ever goes wrong) the HSE will look at first. 'Inspected and tested' is two activities, not one — both are mandatory."
          >
            <p>
              Reg 641.1 sits inside Part 6 (Inspection and Testing) and is the first of the
              regulations governing the verification regime. It tells the inspector that
              verification happens during erection (continuous, by the installer themselves) and on
              completion (a final, documented inspection-and-test pass before energisation). It also
              tells the inspector that defects revealed during verification shall be made good
              before the installation is put into service — you cannot issue a satisfactory EIC on
              an installation with outstanding defects.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 641.1 — General"
            clause="Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of the Regulations have been met. Precautions shall be taken to avoid danger to persons and to avoid damage to property and installed equipment during inspection and testing. Any defect or non-compliance with the Regulations revealed during inspection and testing shall be made good before the installation is put into service."
            meaning="Three things: (1) BOTH inspection AND testing are mandatory — neither alone is sufficient; (2) verification is for new installations, alterations AND additions — not just whole-house installs; (3) defects must be corrected BEFORE service — not 'we will come back next week'. Issuing first and fixing later inverts the safety case."
            cite="BS 7671:2018+A4:2026, Reg 641.1 (Part 6, Chapter 64)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>Design data — what the inspector needs before starting</ContentEyebrow>

          <ConceptBlock
            title="Reg 642.1 — information required"
            plainEnglish="The inspector cannot verify 'as installed' without a written 'as designed' to compare against. Reg 642.1 makes the design data a precondition for verification — drawings, schedules, calculations and the Section 311 assessment of general characteristics."
            onSite="Practically: arrive with (or be given) the single-line diagrams, the schedule of items, the cable-and-protective-device schedule, the calculations (Ib, Iz, voltage drop, Zs targets), and the assessment of general characteristics. Without these you can take readings, but you cannot say whether the readings PROVE compliance — you have nothing to compare against."
          >
            <p>
              Reg 642.1 cross-references Reg 132.12 (information required at design stage) and Reg
              514.9.1 (diagrams, charts and similar information). Together these say the design data
              set must be sufficient for the inspector to determine compliance with BS 7671 — that
              is the test. If a reasonable inspector could not, with the documents provided, decide
              whether the installation complies, the data set is incomplete.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.1 — Information required"
            clause="The information required by Reg 132.12, together with that required by Reg 514.9.1, shall be made available to the person carrying out the inspection and testing of the installation."
            meaning="The design data is not optional and not 'nice to have' — Reg 642.1 makes it a hard precondition. The inspector's authority to certify is conditional on having it. Where data is missing, the inspector must record the limitation on the EIC and note what could not be verified."
            cite="BS 7671:2018+A4:2026, Reg 642.1 (Part 6, Chapter 64)"
          />

          <ConceptBlock
            title="The Section 311 assessment — characteristics that drive the verification"
            plainEnglish="The general characteristics assessment establishes the design context — maximum demand, supply system earthing arrangement, external influences, conductor types and arrangements. The verification compares 'what was designed for' against 'what is installed' and confirms they match."
            onSite="On the EIC, the 'Particulars of installation referred to in the certificate' section captures these characteristics: nominal voltage, supply earthing arrangement (TN-S, TN-C-S, TN-C-S (PNB) — new in A4 — TT, IT), Ze, prospective fault current, type of OCPD at the origin, BS reference and rating. Each of these is a verification anchor — if the design said TN-S and you measure characteristics consistent with TN-C-S, the installation is not as designed."
          >
            <p>
              Section 311 is in Part 3 (Assessment of General Characteristics) and is the upstream
              source of the data that flows into Reg 642.1. The verification chain is: Section 311
              assessment at design stage produces the design parameters; those parameters drive the
              cable, protective device and earthing decisions in Part 5 (Selection and Erection);
              the inspector verifies that what was selected and erected matches what was assessed
              and designed. Break the chain and the cert stops being defensible.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Inspection precedes testing — Reg 642.2</ContentEyebrow>

          <ConceptBlock
            title="Why the order is fixed in the regulations"
            plainEnglish="The visual inspection comes first — and is normally done with the installation disconnected — for two reasons: it is a safety control for the tester, and it is a precondition for the test results being interpretable."
            onSite="Tester-safety: a missing CPC, a damaged accessory, a wrongly wired switch or a foreign object inside an enclosure can injure you the moment you connect the meter. Spotting these at inspection means they get fixed before any test current flows. Result-interpretation: a continuity reading on a circuit with a hidden conductor crossover is meaningless — you would be measuring something other than what the cert says."
          >
            <p>
              Reg 642.2 sets the sequence: visual inspection precedes testing, with the installation
              disconnected from the supply during inspection (and during the dead tests that
              follow). The inspection is structured by the Schedule of Inspection in Appendix 6,
              which itemises every aspect that must be visually verified — connection of conductors,
              identification of conductors, routing, conductor selection, erection methods, presence
              of devices for isolation and switching, presence of undervoltage-protection devices,
              choice and setting of protective devices, presence of warning notices, presence of
              circuit charts and diagrams.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.2 — Inspection"
            clause="Inspection shall precede testing and shall normally be done with the installation disconnected from the supply. Inspection shall be made to verify that the installed equipment complies with: (i) the relevant requirements of Section 511 (every item of equipment shall comply with the requirements of the applicable British or Harmonized Standard); (ii) the safety provisions of the relevant Sections of Chapters 41, 42, 43, 44 and 46; (iii) the requirements of the relevant Sections of Part 5 — Selection and erection; and (iv) the requirements of Part 7 — Special installations or locations, where applicable."
            meaning="The inspection is not a glance — it is a structured pass against (i) product standards, (ii) the protection-against chapters, (iii) the selection-and-erection sections, and (iv) any special-location requirements. Each tick on the Schedule of Inspection is the inspector's record that one of these has been verified."
            cite="BS 7671:2018+A4:2026, Reg 642.2 (Part 6, Chapter 64)"
          />

          <ConceptBlock
            title="The Schedule of Inspection — items 1.0 onwards"
            plainEnglish="The Schedule of Inspection in Appendix 6 lists every item the inspector must visually verify. Each item maps to one or more BS 7671 regulations — ticking the item is the inspector's record that the regulation has been verified."
            onSite="Items run from 1.0 (condition of intake equipment) through routing, identification, terminations, accessories, protective devices, earthing and bonding, special locations, AFDDs (4.23 — A4 addition), and out to circuit charts and warning notices in the higher-numbered items. A4:2026 explicitly adds and renumbers items to reflect new technical content: AFDD provision (Reg 421.1.7), luminaire RCD (Reg 411.3.4), TN-C-S (PNB) earthing arrangement, surge protection (Reg 443). Tick boxes that do not apply get N/A — never left blank."
          >
            <p>
              The Schedule of Inspection is not optional — it is the structured record that the
              inspection of Reg 642.2 has actually been carried out. An EIC submitted with a
              partly-completed schedule (items left blank, not marked N/A) is a documentation defect
              — it implies the inspector did not address those items. Every item is either a tick
              (verified compliant), a cross with an observation (defect — must be fixed before
              energisation per Reg 641.1), or N/A (item does not apply to this installation).
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Testing — Reg 642.3 and Section 643</ContentEyebrow>

          <ConceptBlock
            title="Reg 642.3 — what testing is required"
            plainEnglish="After inspection passes, testing follows. Reg 642.3 hands you off to Section 643, which sets out the tests, the limits and the sequence in which they must be applied."
            onSite="The Section 643 dead-test sequence: continuity of protective conductors (Reg 643.2), continuity of ring final-circuit conductors (Reg 643.2.3), insulation resistance (Reg 643.3), SELV/PELV separation (Reg 643.4), polarity (Reg 643.6), earth electrode resistance where applicable (Reg 643.7). Then energise and run the live tests: earth fault loop impedance / Zs (Reg 643.7.3), prospective fault current (Reg 643.7.2), check of voltage drop, RCD operating times at IΔn and 5 IΔn (Reg 643.8), AFDD functional check (A4 additions), and overall functional testing (Reg 643.10)."
          >
            <p>
              The order is not arbitrary — each earlier test exposes a fault category that would
              otherwise corrupt or endanger a later test. IR before energisation prevents you
              putting test voltage onto a circuit with damaged insulation; polarity before
              energisation prevents you energising a circuit with reversed L and N at an accessory.
              Live testing only happens once the dead-test sequence has cleared the installation as
              fundamentally safe to energise.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 642.3 — Testing"
            clause="The following tests, where relevant, shall be carried out in the sequence given in Section 643. The methods of test described in Guidance Note 3 (or other equivalent methods) may be used. If any test indicates a failure to comply, that test and any preceding test, the results of which may have been influenced by the fault indicated, shall be repeated after the fault has been rectified."
            meaning="Three things: (1) the sequence of Section 643 is mandatory; (2) where a test fails, the fix is rectify-then-retest — and any earlier test that the fault could have influenced must also be repeated; (3) the EIC Schedule of Test Results captures the readings and is the inspector's record that each test was carried out and met its limit."
            cite="BS 7671:2018+A4:2026, Reg 642.3 (Part 6, Chapter 64)"
          />

          <ConceptBlock
            title="The Schedule of Test Results — Ze, Zs, R1+R2, IR, RCD, polarity"
            plainEnglish="The Schedule of Test Results is the numerical record of the live and dead tests. Each circuit gets a row capturing the protective device, cable size, R1+R2, insulation resistance, polarity, Zs and RCD operating time."
            onSite="Top of the schedule: Ze at the origin, prospective fault current, prospective short-circuit current. Per circuit: device type and rating, cable CSA (live and CPC), continuity (R1+R2 or end-to-end ring), IR (L-L, L-E, N-E in a phased sequence), polarity, Zs (calculated and measured), RCD operating time at IΔn (Reg 643.8 limits depending on type), and where applicable AFDD function. Every box gets a value or N/A — blanks invalidate the cert."
          >
            <p>
              The Schedule of Test Results is the evidence underpinning the inspector's declaration
              on the EIC. A circuit that shows a Zs reading exceeding the maximum permitted for the
              protective device fails Reg 411.4.4 — ADS via the OCPD cannot be demonstrated. The fix
              is design (add a 30 mA RCD to provide ADS by RCD operation, redesign the circuit to
              lower Zs, or change the device characteristic). Issuing a satisfactory EIC with a
              measured Zs above the limit is not a paperwork issue — it is certifying compliance
              that has not actually been verified.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>The EIC — three roles, three signatures</ContentEyebrow>

          <ConceptBlock
            title="What the Electrical Installation Certificate certifies"
            plainEnglish="The EIC is a signed declaration that the design, the construction (installation) and the inspection-and-test of new electrical work comply with BS 7671. It is issued for new installations, alterations and additions."
            onSite="The EIC sits in three legal contexts: (1) Building Regulations Part P / Section 6 — for notifiable domestic work it is the document the registered competent person scheme uploads to building control; (2) EAWR 1989 — it is the record the duty-holder relies on when discharging their statutory maintenance duty under Reg 4(2) of the EAWR; (3) BS 7671 itself — it is the close-out record of Reg 641.1's verification regime. Lose any one of these and the cert becomes harder to defend if the installation later causes injury or damage."
          >
            <p>
              The EIC carries: particulars of the client and the installation; the extent of the
              installation covered by the certificate; the design data (assessment of general
              characteristics, system earthing, fault levels); the declarations from the three roles
              (Designer, Installer, Inspector); the recommendations (recommended period to next
              inspection, schedule of items installed, schedule of test results); and any departures
              from BS 7671 (Reg 120.3 / 133.5). The Schedules of Inspection and Test Results are an
              integral part of the certificate — an EIC without its schedules is incomplete and not
              a valid record of verification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Three roles — Designer, Installer, Inspector"
            plainEnglish="The EIC has three signature boxes corresponding to the three responsibilities for the work: design, construction and verification. Each signature commits the signer to that part of the declaration."
            onSite="On a large project the three roles are typically split between three different people or organisations: a consulting engineer signs as Designer, the contractor signs as Installer, and an independent inspector (or the contractor's in-house verification engineer) signs as Inspector. On a sole-trader job for a small alteration ONE competent person legitimately fulfils all three responsibilities — and signs all three boxes. The boxes still exist; each signature is still required; each captures a separate date. The signatures are the legal record of who took responsibility for which part."
          >
            <p>
              The Designer signature commits the signer to the statement that the design of the
              installation complies with BS 7671 except for any departures recorded. The Installer
              signature commits the signer to the statement that the construction of the
              installation complies with BS 7671 except for any departures recorded. The Inspector
              signature commits the signer to the statement that the inspection and testing have
              been carried out in accordance with the regulations and that the results meet the
              requirements. Three signatures, three commitments, three records — and on a
              sole-trader job, all three sit on the same competent person.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Departures (Reg 120.3) — when permitted, how to document</ContentEyebrow>

          <ConceptBlock
            title="Reg 120.3 — departures from BS 7671 are permitted, but conditional"
            plainEnglish="A departure from a specific requirement of BS 7671 is permissible PROVIDED the resulting degree of safety is not less than that obtained by full compliance. The departure must be recorded on the EIC and the burden of justification sits with the designer."
            onSite="Typical scenarios where a departure is appropriate: a control panel built to BS EN 61439 has a feature that does not align with a BS 7671 requirement but the product standard delivers equivalent or better safety; a heritage property where surface routing is not permitted by Reg 522.6.202 / .203 and an alternative protection method (RCD, mechanical protection) delivers equivalent safety; specialist medical / industrial equipment whose product standard takes precedence in its specific scope. Silence on the cert is the trap — it implies full compliance."
          >
            <p>
              Reg 120.3 cross-references Reg 133.5 (departures from product / protection
              requirements) and gives the EIC field — "Details of Departures from BS 7671 (Reg 120.3
              and 133.5)" — for recording them. Each departure entry should capture (a) the
              regulation departed from, (b) the reason for the departure, (c) the technical evidence
              that the resulting degree of safety is not less than that of full compliance
              (calculations, manufacturer data, alternative-standard compliance), and (d) the
              competent person's sign-off. Attached evidence travels with the cert pack.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 120.3 — Departures from this Standard"
            clause="Where the use of a new material or invention leads to a departure from the requirements of this Standard, the resulting degree of safety of the installation shall not be less than that obtained by compliance with the Regulations. Such use shall be noted on the Electrical Installation Certificate specified in Part 6."
            meaning="Two preconditions: (a) the safety bar is not lowered, and (b) the departure is recorded on the EIC. Both are mandatory — meeting only the safety bar without recording the departure leaves the cert claiming full compliance, which is false. Meeting only the recording requirement without the safety justification is a defect against the design."
            cite="BS 7671:2018+A4:2026, Reg 120.3 (Part 1, Chapter 12)"
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Period to next inspection — and handover</ContentEyebrow>

          <ConceptBlock
            title="Recommending the next inspection date"
            plainEnglish="The EIC carries a 'recommended date for next inspection' field. The inspector records the date based on installation type, environment and use — informed by IET Guidance Note 3 (Section 3) and Best Practice Guide 4."
            onSite="Typical intervals: 10 years for owner-occupied domestic; 5 years for rented domestic, commercial offices and shops, industrial premises and educational establishments; 3 years for places of public entertainment, hotels and certain leisure environments; 1 year for caravan parks, marinas, swimming pools, agricultural and certain hospitality environments. The figure is a recommendation — but it is the inspector's expert opinion and forms the basis of the duty-holder's maintenance regime under EAWR 1989 Reg 4."
          >
            <p>
              The recommended period is informed by the Section 311 assessment of external
              influences captured at design stage — a wet, dusty agricultural environment ages an
              installation faster than a clean, dry office. The inspector adjusts the typical
              interval up or down based on these factors and the observed condition. A shorter
              interval is appropriate where conditions are harsh, use is intensive, or there are
              early signs of degradation; a typical interval is appropriate for benign environments
              with normal use. The reasoning behind a non-typical interval should accompany the cert
              in the inspector's notes.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Handover documentation"
            plainEnglish="At the end of verification the inspector hands the duty-holder a documentation pack: the EIC with its schedules, the as-installed drawings and circuit charts, manufacturer documentation for installed equipment, and any departures with their justifications."
            onSite="On domestic, the pack typically lives in the consumer-unit cupboard. On commercial, it lives with the building's O&amp;M (Operation and Maintenance) manual and is referenced in the building log. On industrial, it forms part of the EAWR-driven safety case. The pack must be sufficient for the next inspector — at the next periodic inspection — to understand what was installed and what was certified, so they can compare against the installation's condition at that future date."
          />

          <SectionRule />

          <ContentEyebrow>What A4:2026 changes about Appendix 6</ContentEyebrow>

          <ConceptBlock
            title="A4 model-form additions"
            plainEnglish="A4 updates the Appendix 6 model EIC, MEIWC and EICR forms to capture new technical requirements introduced in the amendment. Schedule of Inspection items are added or renumbered and new system-earthing options appear."
            onSite="Headline A4 form changes: (1) new schedule item for AFDD provision (Reg 421.1.7) — typically item 4.23 in the renumbered Schedule of Inspection; (2) new schedule item / wording for the Reg 411.3.4 luminaire RCD rule in domestic premises; (3) TN-C-S (PNB) added as a system-earthing option on the cert (in addition to TN-S, TN-C-S, TN-C, TT, IT); (4) clearer wording around departures (Reg 120.3 / 133.5); (5) updated surge-protection schedule entries reflecting Reg 443 changes."
          >
            <p>
              From 15 April 2026, the A4 model forms are the correct ones to issue. Issuing on a
              pre-A4 form for work completed under A4:2026 leaves the cert lacking the schedule
              items for the requirements you certified against — a documentation defect that will be
              picked up at the next periodic inspection. RCP scheme uploads, building-control
              filings and insurer records all expect A4 forms after the in-force date. Update your
              cert templates, your software (commercial cert tools all release A4 updates around the
              in-force date) and your training material before 15 April 2026.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Signing the EIC without seeing the design data"
            whatHappens="Inspector arrives, takes readings, ticks the schedule and issues a satisfactory EIC — without ever seeing the single-line diagram, the cable schedule or the calculations. The readings might be fine; but the inspector cannot defensibly say 'as installed = as designed' because they have no 'as designed' to compare against. Reg 642.1 has been bypassed."
            doInstead="No design data, no cert. Reg 642.1 makes the design data a precondition for verification, not a nice-to-have. Where the data is genuinely incomplete or unobtainable (a takeover from a previous contractor, an existing installation under alteration), record the limitation explicitly on the EIC and note what could not be verified. The cert remains defensible because the limit on the inspector's authority has been declared up front."
          />

          <CommonMistake
            title="Omitting departures on the EIC"
            whatHappens="The installation has a known departure from BS 7671 — a control panel that, by virtue of its product standard, does not meet a particular Part 5 requirement. The designer knows about it; the installer knows about it; the inspector knows about it. None of them record it on the cert. The EIC is signed off with the 'Details of Departures' field blank, which implies full compliance. Months later a fault occurs; the departure surfaces; the designer's safety case relies on something the cert does not capture."
            doInstead="Reg 120.3 explicitly permits departures PROVIDED safety is not lowered AND the departure is recorded. Both conditions are mandatory. Use the EIC's 'Details of Departures (Reg 120.3 and 133.5)' field. Record the regulation departed from, the technical reason, the engineering justification, and attach supporting evidence. A documented departure is defensible; an undocumented departure is a defect against the designer's signature."
          />

          <CommonMistake
            title="Issuing a pre-A4 EIC after 15 April 2026"
            whatHappens="The contractor completes a domestic rewire on 20 April 2026 — A4 is in force — but the cert software still defaults to the A3 model EIC. The cert is signed and issued without the A4 schedule items for AFDD, luminaire RCD or TN-C-S (PNB). The work itself was carried out to A4, but the cert does not capture the requirements verified — at the next periodic inspection, the new inspector cannot tell whether AFDDs were provided, whether the luminaire RCD rule was applied, or what system-earthing classification was used."
            doInstead="From 15 April 2026, only A4 model forms (Appendix 6 of BS 7671:2018+A4:2026) are correct. Update your cert templates, your software (every major UK cert tool releases an A4 update around the in-force date) and your training before the date. Where you discover a pre-A4 cert has been issued for A4 work, the right fix is to re-issue on the A4 form with the schedules properly populated — not to leave the documentation defect in place."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — initial verification on the day</ContentEyebrow>

          <Scenario
            title="Domestic rewire — sole-trader issues the EIC"
            situation="A sole-trader contractor has rewired a 1970s 3-bedroom semi. They designed the layout (consumer-unit position, circuit count and ratings), installed all the cabling and accessories themselves, and now stand at the new CU with their multifunction tester ready to verify. The customer wants to know when the EIC will be ready."
            whatToDo="Run Reg 642.2 first — visual inspection with the supply isolated at the cut-out. Walk every accessory, every termination, every protective device. Tick the Schedule of Inspection item by item, including A4 items 4.23 (AFDD) and the luminaire RCD entry (Reg 411.3.4). Defects found get fixed before any test current flows. Then run Section 643 in sequence — continuity, IR, polarity dead; then energise and run Zs, RCD operating times, functional test. Populate the Schedule of Test Results circuit by circuit. Finally fill the EIC: particulars, design data, declarations. Sign all three role boxes (Designer, Installer, Inspector) — sole-trader, all three responsibilities, all three signatures, all three dates."
            whyItMatters="The EIC is the legal record. For Building Regulations Part P notification, the contractor's RCP scheme uploads it to building control. For EAWR 1989 the homeowner relies on it as the basis of their statutory maintenance duty. For the contractor's professional indemnity insurer it is the documentary evidence the work was done to the in-force standard. Cutting any corner — skipping the inspection, skipping a test, leaving the design data informal, signing only one of the three role boxes — leaves the cert unable to do its job at the moment it most needs to."
          />

          <Scenario
            title="Commercial board change — three different signatories, departures recorded"
            situation="A consulting engineer designed the replacement for a 200 A commercial three-phase board in a 1990s office building. A contractor installed it over a weekend shutdown. An independent inspector now arrives Sunday evening to verify before re-energising Monday morning. The control of one section uses an industrial panel built to BS EN 61439-1 whose internal arrangement does not strictly comply with a particular Part 5 cable-marking requirement, but the product standard delivers equivalent or better safety."
            whatToDo="Inspector receives the design data pack from the consulting engineer (single-line diagrams, schedules, calculations, Section 311 assessment). Runs the inspection per Reg 642.2 with the new board isolated. Runs the Section 643 test sequence on each circuit. Records the BS EN 61439-1 panel arrangement as a documented departure under Reg 120.3 — captures the regulation departed from, the product-standard equivalence, and the engineering justification (calculations / manufacturer data) showing safety is not lower. Issues the EIC with three different signatories — the consulting engineer signs the Designer box, the contractor signs the Installer box, the independent inspector signs the Inspector box — and the departure is captured in the dedicated EIC field with attached evidence."
            whyItMatters="On a multi-party project the three signatures separate the three responsibilities. If a fault later surfaces in the design, it does not contaminate the installer's record or the inspector's record — each signatory is responsible for their part. The recorded Reg 120.3 departure is the documented safety case for the BS EN 61439 panel: silence on the cert would have implied full compliance and exposed the designer when the departure was discovered. Three signatures, recorded departure, attached evidence — the cert is defensible if it is ever tested."
          />

          <SectionRule />

          <ContentEyebrow>Inspector&apos;s checklist — a defensible EIC</ContentEyebrow>

          <ConceptBlock
            title="Eight items every initial-verification cert needs to be defensible"
            plainEnglish="A defensible EIC is built from eight ingredients — design data, structured inspection, Section 643 testing, populated schedules, three signatures, recorded departures, recommended next inspection, and the right model form (A4)."
            onSite="(1) Design data on file before starting (Reg 642.1) — drawings, schedules, calculations, Section 311 assessment. (2) Visual inspection per Reg 642.2 against the Schedule of Inspection — every item ticked, crossed-with-observation or N/A, never blank. (3) Section 643 test sequence carried out in order — dead before live, fix-then-retest if any test fails. (4) Schedule of Test Results populated circuit by circuit — Ze, Ipf, R1+R2, IR, polarity, Zs, RCD operating time at IΔn and 5 IΔn. (5) Three role signatures — Designer, Installer, Inspector — each with date. (6) Departures (Reg 120.3) recorded with regulation, reason, justification and evidence. (7) Recommended period to next inspection (Section 631 / GN3 / BPG 4) — typical or adjusted, with reasoning where adjusted. (8) A4:2026 model form (post 15 April 2026) — current schedule items, current system-earthing options, current departure wording."
          >
            <p>
              Walk this checklist on every cert. If any of the eight is missing, the cert is not
              defensible — and a non-defensible cert is the inspector's personal exposure. The
              checklist is not bureaucracy; it is the inspector's safety case for their own
              signature on the cert. Every item exists because, somewhere, an inspector has been
              prosecuted or sued for missing it.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Reg 641.1 — initial verification is mandatory on every new installation, alteration or addition. Inspection AND testing, defects fixed before service, EIC issued.',
              'Reg 642.1 — design data is a precondition for verification. No drawings, no schedules, no calculations, no Section 311 assessment — no defensible cert.',
              'Reg 642.2 — visual inspection precedes testing, with the installation disconnected. Reg 642.3 — testing follows Section 643 in sequence.',
              'EIC = three roles (Designer, Installer, Inspector), three signatures, three dates. One competent person can sign all three on a sole-trader job. Schedules of Inspection and Test Results are integral to the cert — not annexes.',
              'Reg 120.3 — departures permitted PROVIDED safety is not lowered AND the departure is recorded on the EIC. Silence on the cert implies full compliance.',
              'A4:2026 model forms (Appendix 6) are mandatory from 15 April 2026 — schedule items added for AFDD (4.23), luminaire RCD (411.3.4), TN-C-S (PNB), surge protection. Update cert templates and software before the in-force date.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.2 Visual inspection and testing responsibilities
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module6Section1;
