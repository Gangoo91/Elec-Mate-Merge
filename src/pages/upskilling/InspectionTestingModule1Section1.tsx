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
    id: 'mod1-s1-statutory-vs-standard',
    question:
      'A barrister cross-examines you: "You followed BS 7671. Is that the law?" What is the technically correct answer?',
    options: [
      'Yes — BS 7671 has the force of statute by virtue of HSWA 1974, enforced directly by HSE.',
      'No — BS 7671 is a non-statutory British Standard; the statute is EAWR / ESQCR / HSWA.',
      'Yes — BS 7671 is enforced directly by HSE under the statutory instrument SI 2018/447.',
      'It depends — BS 7671 is statutory for commercial work but only guidance for domestic work.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 is published by BSI / IET as a non-statutory British Standard. Compliance is "likely to achieve compliance with statutory requirements" (the IET formulation HSE accepts), but the statute is EAWR / ESQCR / HSWA. Conflating the two in evidence is the most common cross-examination trap.',
  },
  {
    id: 'mod1-s1-eic-vs-eicr',
    question:
      'You replace a CU on a tenanted flat. The new circuits are yours; you also need to verify the existing earthing arrangement and main bonding can support the work. Which document(s) are appropriate?',
    options: [
      'EICR only — everything counts as "existing" once the new CU is in place.',
      'EIC for the new CU and circuits, with the existing earthing / bonding verified as part of its scope.',
      'MEIWC only — a consumer-unit change is classed as minor electrical works.',
      'EIC for the new CU and a separate full EICR for the rest of the installation, always.',
    ],
    correctIndex: 1,
    explanation:
      'Reg 644 reserves the EIC for new installations, additions or alterations introducing new circuits, and CU replacements. The verification of the existing earthing / bonding the work depends on is folded into the EIC scope, with any defects flagged as observations or remediated before energisation — the regulation does not let you sign for a new CU on an unverified earthing arrangement. An EICR is the periodic-inspection document, not the right vehicle here.',
  },
  {
    id: 'mod1-s1-c2-downgrade',
    question:
      'A landlord asks you to mark a "no RCD on lighting circuits, TN-C-S supply" finding as C3 instead of C2 so the EICR returns Satisfactory. Most defensible response?',
    options: [
      'Mark it C3 — classification is professional judgement and the client is entitled to a view.',
      'Refuse, document the request in writing, and issue the EICR with the C2 standing as assessed.',
      'Issue two EICRs — one coded C2, one coded C3 — and let the landlord choose between them.',
      'Mark it C2 but add a footnote saying it is "treated as C3 by agreement" with the landlord.',
    ],
    correctIndex: 1,
    explanation:
      'Classification codes are an objective assessment of condition, not a negotiation. Misclassifying a potentially-dangerous defect as improvement-recommended is a Fraud Act 2006 false representation and an EAWR Reg 4 contributory failure. The "helpful" downgrade is what coroners and HSE prosecutors open with after a fatal incident — see the HMO / Whirlpool / Grenfell-aftermath case patterns. The downside is unlimited; the upside is one client\'s goodwill.',
  },
  {
    id: 'mod1-s1-records-defence',
    question:
      'Two years after you signed an EIC, a fire investigator asks "was this installation maintained?" You no longer hold the schedules of test results — only the front sheet of the EIC. What is your real exposure?',
    options: [
      'None — the front sheet is the certificate, and on its own that is sufficient evidence.',
      'Direct EAWR Reg 4(2) exposure — without the schedules the certificate cannot evidence what it claims.',
      'Civil exposure only — criminal prosecution requires proof of deliberate intent.',
      "No exposure — record-keeping is the duty holder's responsibility and not the inspector's.",
    ],
    correctIndex: 1,
    explanation:
      'GN3 Ch 1 ties record retention directly to EAWR Reg 4(2), citing HSR25 that records be kept throughout the working life of the installation. The schedules ARE the evidence the inspection was performed to standard; the front sheet without them is a claim with no supporting basis, and your PI insurer is likely to deny cover for fraudulent / negligent certification. Reg 644.3 makes the schedules part of the EIC — issuing it without them is incomplete, and not retaining them undermines every Reg 4(2) defence you might run.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which legal instrument creates the statutory duty to maintain electrical systems so as to prevent danger?',
    options: [
      'The Electricity at Work Regulations 1989, Regulation 4',
      'BS 7671:2018+A4:2026 Reg 134',
      'GN3 Chapter 1',
      'Building Regulations Approved Document P',
    ],
    correctAnswer: 0,
    explanation:
      'EAWR 1989 Reg 4(1) requires systems to be of such construction as to prevent danger; Reg 4(2) requires them to be maintained so as to prevent danger. BS 7671 is non-statutory; compliance with it is the accepted route to demonstrating compliance with EAWR Reg 4.',
  },
  {
    id: 2,
    question: 'What is the legal status of BS 7671:2018+A4:2026?',
    options: [
      'Statutory law — directly enforceable by the HSE as a statutory instrument',
      'An informal guidance document carrying no legal weight in any proceedings',
      'A non-statutory British Standard — compliance likely satisfies statute but is not itself law',
      'A document mandatory only for NICEIC and NAPIT registered scheme members',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 is a non-statutory standard published by the IET and BSI. Courts and HSE accept it as defining good practice, and Reg 4 EAWR can be discharged by demonstrating compliance with BS 7671 — but the standard itself is not the law. Statute (EAWR, ESQCR, HSWA) is.',
  },
  {
    id: 3,
    question:
      'GN3 Chapter 1 links record retention for installations to a specific HSE publication and EAWR clause. Which?',
    options: [
      'HSG47 and EAWR Reg 14',
      'HSR25 and EAWR Reg 4(2)',
      'INDG163 and EAWR Reg 16',
      'L74 and EAWR Reg 29',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 cites HSE publication HSR25 (the EAWR memorandum of guidance) recommending that records of all maintenance, including test results, be kept throughout the working life of the installation. This recommendation supports compliance with EAWR Reg 4(2).',
  },
  {
    id: 4,
    question: 'A duty holder under EAWR is best described as which of the following?',
    options: [
      'Anyone who happens to be present on site at the time of an electrical incident',
      'Only the principal contractor appointed on a notifiable CDM 2015 project',
      'An employer, self-employed person, employee or person in control of the electrical system',
      'Only the certifying electrician who signed and issued the original EIC',
    ],
    correctAnswer: 2,
    explanation:
      'EAWR places duties on employers, the self-employed, employees and those in control of premises. The duty bites to the extent of the duty holder’s control over the electrical system. The certifying electrician carries duties; so does the landlord, the employer, and the tenant who installs an unsafe extension.',
  },
  {
    id: 5,
    question: 'BS 7671 Reg 134.2.2 requires the designer to do which one of the following?',
    options: [
      'Carry out the periodic inspection personally',
      'Issue an EICR within 28 days of energisation',
      'Sign the Schedule of Test Results on behalf of the inspector',
      'Make a recommendation for the interval to the first periodic inspection and test',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 134.2.2 places the duty to recommend the interval to the first periodic inspection on the designer. Reg 644.4 then requires that recommendation to be recorded on the EIC. The designer does not carry out the periodic inspection — they hand the responsible person a recommended interval to act on.',
  },
  {
    id: 6,
    question:
      'In a TN-C-S supply (PME) the use of PEN conductors inside the consumer’s installation is prohibited by which statutory regulation?',
    options: ['BS 7671 Reg 543.4.2', 'EAWR 1989 Reg 14', 'ESQCR 2002 Reg 8(4)', 'CDM 2015 Reg 13'],
    correctAnswer: 2,
    explanation:
      'BS 7671 Reg 543.4.2 NOTE references the prohibition, but the prohibition itself is statutory: ESQCR 2002 Reg 8(4) prohibits PEN conductors in consumers’ installations. This is a legal requirement separate from BS 7671 — installers must observe both.',
  },
  {
    id: 7,
    question:
      'Reg 134.1.4 of BS 7671 covers electrical joints and connections. How does the regulation interact with Part 6?',
    options: [
      'Reg 134.1.4 replaces the Part 6 continuity test for joints and connections',
      'Reg 134.1.4 applies only to permanent connections, not to terminal blocks',
      'Reg 134.1.4 is advisory only and carries no verification duty under Part 6',
      'Reg 134.1.4’s requirements are verified during inspection and testing using the Part 6 schedules',
    ],
    correctAnswer: 3,
    explanation:
      '134.1.4 sets the design / erection duty for joints and connections. Part 6 (Chapter 64 / 65) is how that duty is verified in practice — continuity, insulation resistance and functional tests on the schedules of inspection and test results. The two regulations are complementary, not interchangeable.',
  },
  {
    id: 8,
    question:
      'You sign an EIC for a CU change at a rented domestic property without doing the dead tests because the tenant refused access to circuits. Six months later a fire occurs and your certificate is reviewed. What is the most realistic legal exposure?',
    options: [
      'None — the tenant’s refusal of access is a complete and sufficient defence',
      'Civil liability only — criminal prosecution is impossible for a non-statutory standard',
      'EAWR Reg 4 breach (criminal), scheme misconduct findings, PI insurer denial and a civil claim',
      'Loss of your CSCS card only, with no other regulatory or civil consequence',
    ],
    correctAnswer: 2,
    explanation:
      'Signing certification for work you have not personally verified is fraudulent in regulatory terms. The certificate is a representation that the installation has been inspected and tested. EAWR Reg 4 prosecution is a real possibility; scheme operators routinely revoke registration; PI insurers exclude fraudulent certification; and the civil claim from the harmed party is independent of the criminal route.',
  },
  {
    id: 9,
    question:
      'Reg 651.5 of BS 7671 places a specific competence requirement on the periodic inspection. How is it worded?',
    options: [
      '"shall be carried out by a registered electrician"',
      '"shall be carried out by a Part P registered installer"',
      '"shall be carried out by a chartered engineer"',
      '"shall be carried out by one or more skilled persons competent in such work"',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 651.5 requires "one or more skilled persons competent in such work". The wording matches the EAWR Reg 16 framing of competence: technical knowledge or experience sufficient to prevent danger. Scheme registration is evidence of competence, not the regulatory test.',
  },
  {
    id: 10,
    question:
      'A landlord asks for an EICR to be backdated by three months to satisfy a letting-agency cut-off. What is the correct response?',
    options: [
      'Refuse and document the request — a backdated EICR is a false instrument and a Fraud Act offence',
      'Backdate it — the inspection genuinely happened, so only the date on it is wrong',
      'Backdate it but record it as the "issue date" rather than as the "inspection date"',
      'Refuse, but issue the genuine EICR with a "valid from" footnote dated three months earlier',
    ],
    correctAnswer: 0,
    explanation:
      'A backdated EICR is a false instrument. There is no "harmless" backdating: the document is being used to represent a state of compliance at a date when the inspection had not happened. Refuse, document the request, and issue an EICR dated to the actual inspection. A footnote that pretends an earlier validity is the same offence dressed up.',
  },
];

const InspectionTestingModule1Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Purpose and legal requirements | I&T Module 1.1 | Elec-Mate',
    description:
      'EAWR 1989 Reg 4 and 16, BS 7671 status as a non-statutory standard, Reg 134 and 651.5 competence wording, GN3 Ch 1 and HSR25 record retention. The legal frame an electrician is judged against in court and by their insurer.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 1"
            title="Purpose and legal requirements"
            description="Why we inspect and test, and the legal frame the electrician signing the certificate is judged against. EAWR 1989, BS 7671 status, GN3 Ch 1, and the duty-holder concept."
            tone="yellow"
          />

          <TLDR
            points={[
              'Inspection and testing exists to verify the installation is safe to energise (initial verification) and to confirm an existing installation is safe to keep using (periodic). Everything else — paperwork, schemes, insurance — derives from those two duties.',
              'The Electricity at Work Regulations 1989 (EAWR) is the statutory law. Reg 4(1) requires construction to prevent danger, Reg 4(2) requires maintenance to prevent danger, Reg 16 requires technical knowledge or experience sufficient to prevent danger. Breach is a criminal offence.',
              'BS 7671:2018+A4:2026 is a non-statutory standard. Compliance with BS 7671 is the accepted route to demonstrating compliance with EAWR Reg 4 — but BS 7671 itself is not the law. The law is EAWR, ESQCR, HSWA and the Building Regulations.',
              'GN3 Ch 1 cites HSE publication HSR25 and EAWR Reg 4(2) on record retention: maintenance and test records should be kept throughout the working life of the installation. The records are the evidence the duty holder relies on when challenged.',
              'Duty-holder framing: EAWR places duties on employers, the self-employed, employees and persons in control of premises. The duty bites to the extent of that control. As the certifying electrician you are a duty holder — and so is the landlord, the employer, and any sub-contractor who touched the work.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the two distinct purposes of inspection and testing — initial verification and periodic inspection — and explain what each is verifying against',
              'Identify the four pieces of UK statutory law that bear on an electrical installation (EAWR 1989, ESQCR 2002, HSWA 1974, Building Regulations) and place BS 7671 correctly in the hierarchy as non-statutory',
              'Explain what EAWR Reg 4 actually requires and why "reasonably practicable" qualifies most of it but not all of it',
              'Apply the EAWR Reg 16 competence test to your own work and to work you supervise',
              'Describe the duty-holder concept and identify who else carries duties alongside the certifying electrician on a typical job',
              'Carry the legal logic forward into how you fill in EICs and EICRs — what a signature on those documents actually represents in court and to your insurer',
            ]}
          />

          <ContentEyebrow>The two purposes — and why they are different</ContentEyebrow>

          <ConceptBlock
            title="Initial verification vs periodic inspection — different jobs, different duties"
            plainEnglish="Initial verification is the duty to confirm new work is safe before energising it. Periodic inspection is the duty to confirm an existing installation is still safe for continued use. Different regulations, different documents, different liability."
            onSite="When you walk on a job, the first question is which duty you are discharging. Confuse the two and you fill in the wrong document, miss the wrong tests, and expose the wrong duty holder."
          >
            <p>
              BS 7671 splits Part 6 (Inspection and Testing) along this line. Chapter 64 covers
              initial verification — every installation, addition or alteration, before being put
              into service, inspected and tested by a skilled person competent to verify compliance
              with BS 7671. Chapter 65 covers periodic inspection and testing — existing
              installations re-checked at intervals to determine condition. The output documents
              follow the same split: an Electrical Installation Certificate (EIC) for initial
              verification, an Electrical Installation Condition Report (EICR) for periodic. A Minor
              Electrical Installation Works Certificate (MEIWC) sits inside Chapter 64 for additions
              to existing circuits that do not warrant the full EIC.
            </p>
            <p>
              The legal weight is what differs. An EIC is a statement of compliance — the skilled
              person attests that the installation, as constructed, complies with BS 7671. An EICR
              is a statement of condition — the skilled person reports on what they found and
              classifies defects. Both are duty-holder documents; both are signed under the same
              statutory backdrop; but a signature on an EIC carries the weight of a positive
              compliance claim, while a signature on an EICR carries the weight of an honest
              assessment.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 134.2 (Initial verification)"
            clause={
              <>
                During erection and on completion of an installation or an addition or alteration to
                an installation, and before it is put into service, appropriate inspection and
                testing shall be carried out by one or more skilled persons competent to verify that
                the requirements of BS&nbsp;7671 have been met.
              </>
            }
            meaning="This is the source of the duty to carry out initial verification. Three things bind: the work happens on completion AND before service; the people doing it are skilled AND competent; the verification is against BS 7671 in full, not the bits you remember."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 651.5 (Periodic inspection — competence)"
            clause={
              <>
                The periodic inspection and testing shall be carried out by one or more skilled
                persons competent in such work.
              </>
            }
            meaning="Same competence test as initial verification, applied to existing installations. The wording matches EAWR Reg 16 (technical knowledge or experience). Scheme registration is evidence of competence, not the test itself."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <ConceptBlock
            title="What the verification is actually verifying"
            plainEnglish="An installation is safe when, under fault conditions, the protective devices disconnect within the times set by Chapter 41; live parts are inaccessible; bonded conductive parts cannot reach a dangerous touch voltage; and the installation as a whole behaves as the design intends. Inspection and testing is how you prove all of that without waiting for a fault to demonstrate it."
          >
            <p>
              The Reg 643 test sequence (continuity, insulation resistance, polarity, earth
              electrode resistance where relevant, earth fault loop impedance, prospective fault
              current, RCD operation, AFDD where fitted, voltage drop, phase sequence, functional
              checks) is not an arbitrary list. Each test verifies one aspect of safety that cannot
              be confirmed by any other means short of staging the actual fault. Continuity verifies
              that the protective conductor will carry fault current to earth. Insulation resistance
              verifies that the cable insulation has not degraded to a leakage path. Earth fault
              loop impedance verifies that the disconnection time will be met. Together they replace
              the dangerous experiment of waiting for a fault to find out.
            </p>
            <p>
              That is the whole reason inspection and testing is a legal duty rather than a
              recommendation. The alternative — waiting for an installation to demonstrate its
              safety by failing — is unacceptable. EAWR Reg 4 closes that gap by making maintenance,
              including verification, a statutory obligation.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The statutory frame</ContentEyebrow>

          <ConceptBlock
            title="EAWR 1989 Reg 4 — the duty to construct and maintain so as to prevent danger"
            plainEnglish="Reg 4 of the Electricity at Work Regulations 1989 is the central statutory duty for electrical work in Great Britain. It says systems must be constructed to prevent danger so far as is reasonably practicable, and maintained to prevent danger so far as is reasonably practicable. Breach is a criminal offence; HSE prosecutes; penalties run to unlimited fines and custodial sentences in the Crown Court."
            onSite="Inspection and testing under BS 7671 Part 6 is the principal way duty holders demonstrate compliance with EAWR Reg 4(2) maintenance. No I&T = no evidence of maintenance = direct exposure to Reg 4(2)."
          >
            <p>
              EAWR is statutory law. It sits in a layered structure: the Health and Safety at Work
              etc. Act 1974 (HSWA) sets the general duties on employers and employees; EAWR 1989 is
              made under HSWA and applies the general duty to electrical systems specifically; ESQCR
              2002 (Electricity Safety, Quality and Continuity Regulations) governs the supply side.
              BS 7671 sits beneath all of these as the technical standard the courts and HSE accept
              as defining good practice for installations.
            </p>
            <p>
              "Reasonably practicable" is the qualifier on most of EAWR. It means the duty holder
              must weigh the magnitude of the risk against the cost (in time, money, effort) of
              averting it; if the cost is grossly disproportionate to the risk, the duty does not
              require it. Some EAWR duties are <em>absolute</em> (no defence of reasonable
              practicability) — most relevantly, Reg 14 (work on or near live conductors). A few are
              qualified by "best endeavours". For Reg 4 maintenance, "reasonably practicable" is the
              test, but in practice the cost of periodic inspection on an installation is never
              grossly disproportionate to the risk of an undiscovered defect — so the duty
              effectively bites in every case.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Chapter 1 · EAWR 1989 Reg 4(2) and HSE HSR25"
            clause={
              <>
                The HSE’s publication HSR25 recommends that records of all maintenance, including
                test results, be kept throughout the working life of an installation. This
                recommendation supports compliance with the Electricity at Work Regulations 1989
                (EAWR), Regulation 4(2).
              </>
            }
            meaning="HSR25 is the official guidance memorandum to EAWR. GN3 Ch 1 ties record retention directly to Reg 4(2). When asked &lsquo;how do I demonstrate maintenance&rsquo; in court or to an insurer, the answer is &lsquo;the records&rsquo;. No records, no defence."
          />

          <ConceptBlock
            title="EAWR Reg 16 — competence as a statutory test, not a paper qualification"
            plainEnglish="Reg 16 EAWR says no person shall work on electrical equipment in a way that requires technical knowledge or experience to prevent danger unless that person possesses such knowledge or experience or is supervised by someone who does. It is a substantive competence test — what you actually know and can do — not a tick-box for a card or a card scheme."
          >
            <p>
              BS 7671 mirrors this exactly. Reg 134.2 requires inspection and testing by &ldquo;one
              or more skilled persons competent to verify that the requirements of BS&nbsp;7671 have
              been met&rdquo;. Reg 651.5 carries the same wording into periodic inspection. The
              skilled person definition in Part 2 of BS 7671 lists adequate education and training,
              sufficient knowledge and practical experience, and the ability to recognise and avoid
              danger.
            </p>
            <p>
              Practically, what does that mean for the certifying electrician? It means
              qualifications (City &amp; Guilds 2391 / 2394 / 2395 or equivalent) are evidence of
              competence, not the test of competence. A 2391 holder who has not picked up a tester
              in five years may not be competent for a periodic inspection on a complex commercial
              installation today. Honest self-assessment against the specific job is the duty Reg 16
              places on you. Working outside competence — and certifying that work — is the single
              most common cause of scheme operator action against electricians.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Scheme providers — NICEIC, NAPIT, ECA, Stroma, Certsure — what membership actually buys you"
            plainEnglish="The competent person schemes are a Building Regulations notification mechanism for England and Wales, plus a quality-assurance audit overlay for the trade. Membership lets you self-certify Part P notifiable domestic work without involving local authority building control. It does not, on its own, demonstrate competence under EAWR Reg 16 — that is a separate, substantive test you must pass for every job."
            onSite="The scheme is the route that lets you notify Building Control via your provider rather than via the council. The audit is the price of the route — a sample of your certificates, a periodic site visit, and the right of the operator to revoke registration if the work falls below the standard."
          >
            <p>
              The major UK competent person schemes — NICEIC and ELECSA (both operated by Certsure),
              NAPIT, the ECA (via NICEIC for domestic Part P), and Stroma Certification — are
              authorised by the Department for Levelling Up, Housing and Communities under Building
              Regulations Part P (England) and equivalent regimes in Wales. Each scheme operates an
              audit cycle. A typical audit visit is annual, unannounced or short-notice, and
              consists of three things in combination: a sample of recent certificates pulled from
              the certification database; a site visit to a property where work has been carried
              out; and a desk check of insurance, calibration of test equipment, and the
              company&rsquo;s quality management system.
            </p>
            <p>
              The interaction with BS&nbsp;7671 is asymmetric. BS&nbsp;7671 is the technical
              rulebook the scheme audits against — every certificate the assessor pulls is checked
              for compliance with the standard, every site finding is benchmarked to BS&nbsp;7671
              clauses, every corrective action is written in BS&nbsp;7671 terms. The scheme has no
              power to soften BS&nbsp;7671. It does, however, have the power to suspend or revoke
              your registration if your work demonstrably fails the standard. Loss of registration
              removes your Part P route, which in domestic work is commercially terminal. That is
              why scheme operator action — not HSE prosecution — is statistically the most common
              professional consequence of poor inspection and testing.
            </p>
            <p>
              &ldquo;Competent person&rdquo; in scheme parlance and &ldquo;competent person&rdquo;
              in EAWR Reg 16 are different concepts that share a label. Scheme competent person
              status is a registration status with an operator — the operator has tested and audited
              you and accepts you within their scheme. Reg 16 competence is the substantive
              technical test for the specific work, judged objectively after the fact by HSE or a
              court. You can be a registered competent person under a scheme and still fail the Reg
              16 test on a particular job; the scheme registration is evidence the Reg 16 test was
              satisfied, but it is not the Reg 16 test itself.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="ESQCR 2002 — the supply-side statute that touches your installation"
            plainEnglish="The Electricity Safety, Quality and Continuity Regulations 2002 govern the supplier (DNO) side of the meter. They matter to you because two of their clauses bite directly on the consumer’s installation: ESQCR Reg 8(4) (no PEN conductors in consumer installations) and Reg 9(4) (no PME earthing facility connected to boat metalwork)."
          >
            <p>
              When BS 7671 Reg 543.4.2 NOTE says &ldquo;PEN conductors shall not be used in
              consumers&rsquo; installations&rdquo; it is reproducing the statutory ESQCR
              prohibition. The ESQCR clause is the law; the BS 7671 NOTE points to it. If you wire a
              TN-C distribution downstream of the cut-out, you have committed an ESQCR breach in
              addition to a BS 7671 non-compliance. Same logic for Reg 9(4) on PME and boats — the
              statute is the prohibition, the BS 7671 reference is signposting.
            </p>
            <p>
              The take-away: where BS 7671 says &ldquo;NOTE: ... ESQCR ... prohibits ...&rdquo;, do
              not treat it as a footnote. It is the standard pointing out that the statute already
              forbids what you are about to do.
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

          <ContentEyebrow>BS 7671 in the legal hierarchy</ContentEyebrow>

          <ConceptBlock
            title="Why BS 7671 is non-statutory — and why that makes no practical difference"
            plainEnglish="BS 7671 is a British Standard published by BSI on behalf of the IET. It is not made under any Act of Parliament. It is therefore non-statutory — not directly enforceable as law. But: courts accept BS 7671 as the standard defining good practice for fixed electrical installations, and HSE accepts compliance with BS 7671 as the principal route to demonstrating compliance with EAWR Reg 4. So in practice, BS 7671 is the rulebook by which your work will be judged."
            onSite="The phrase to remember: &lsquo;compliance with BS 7671 is likely to achieve compliance with statutory requirements&rsquo;. That is the official IET formulation, and it is the formulation HSE inspectors and expert witnesses use."
          >
            <p>
              The non-statutory point matters in two specific scenarios. First, where a designer
              chooses to depart from BS 7671 — Reg 120.3 / 133.1.3 explicitly permit departures with
              appropriate justification, recorded on the certificate, provided the resulting
              installation is at least as safe. The departure is legitimate because BS 7671 is not
              the law; safety is. Second, where statute and BS 7671 appear to conflict, statute wins
              — for example, BS 7671 cannot override an ESQCR prohibition. In every other case the
              practical answer is: comply with BS 7671 and you have discharged your statutory duty.
            </p>
            <p>
              BS 7671:2018+A4:2026 is in force from 15 April 2026; A3:2024 is withdrawn from 15
              October 2026. Work carried out during the transition period may be certified to either
              edition; from 15 October 2026 only A4:2026 applies. The legal status of the standard
              does not change with amendments — A4 is non-statutory in exactly the same way A3 was —
              but the technical content you must comply with does.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="A4:2026 — what changed in the legal / duty space"
            plainEnglish="The A4 amendment did not change the legal status of BS 7671, but it did change several specific things a duty holder is told by the documents you issue. The biggest changes for the &lsquo;purpose and legal requirements&rsquo; chapter are: a new product-recall verification duty under Section 651 / 653 framing for additions, alterations and continued service of switchgear; a wording change from &lsquo;consumer&rsquo;s isolator&rsquo; to &lsquo;consumer&rsquo;s means of isolation&rsquo; in the Schedule of Inspection (Section H, Item 1.1); and modification of Reg 133.1.3 to require certain usage of equipment to be recorded on the appropriate Part 6 certificate."
            onSite="None of these are technical changes you can ignore on a periodic. The product-recall check is a positive duty before you sign the device back into service. The isolator wording change drives a Section H tick that is no longer the same field. The 133.1.3 record duty makes a missing certificate entry a non-conformity in itself."
          >
            <p>
              <strong>Product recall verification.</strong> A4:2026 introduces an explicit duty to
              verify that switches, circuit-breakers, RCBOs and RCCBs are not the subject of any
              product recall before they are accepted for reuse or left in service during additions
              and alterations. The verification can be by direct enquiry to the manufacturer where
              doubt exists. The practical effect: when you arrive on a job and the consumer unit
              contains a brand of RCBO that has been the subject of a public recall (the Wylex /
              FuseBox / Crabtree pattern of historic recalls is the case study), you cannot quietly
              leave it in service. You must verify the device is not on a current recall list, and
              where it is you must remove or replace per manufacturer guidance.
            </p>
            <p>
              <strong>
                &ldquo;Consumer&rsquo;s means of isolation&rdquo; — Section H, Item 1.1.
              </strong>{' '}
              The A4 model forms in Appendix 6 use the wording &ldquo;Consumer&rsquo;s means of
              isolation&rdquo; in place of the older &ldquo;consumer&rsquo;s isolator&rdquo;. The
              substance follows Reg 461.2 — every circuit shall be provided with a means of
              isolation from all live supply conductors by a linked switch or a linked
              circuit-breaker. The Schedule of Inspection field now matches the regulation language.
              Practically: where the consumer&rsquo;s intake has no separate isolator and the only
              means of isolation is the main switch in the consumer unit, that is the
              &ldquo;consumer&rsquo;s means of isolation&rdquo; you tick. The wording change makes
              this position explicit rather than something you have to explain in the comments.
            </p>
            <p>
              <strong>Reg 133.1.3 record duty.</strong> Reg 133.1.3 has been modified to require
              certain usage of equipment to be recorded on the appropriate Part 6 certificate. That
              makes a missing entry on the EIC / EICR / MEIWC a non-conformity in its own right —
              the duty holder downstream relies on the record to know what equipment was used and
              how. Departures from BS 7671 under Reg 120.3 and 133.1.3 already had to be recorded on
              the certificate; A4 extends the same record discipline to the equipment-usage detail.
            </p>
            <p>
              The cumulative effect on what a duty holder is told: more written information, fewer
              implicit assumptions, and a tighter chain of evidence between the standard, the
              certificate and the maintenance record. None of this is technically difficult to
              comply with. All of it is professionally fatal to ignore.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 461.2 (Means of isolation)"
            clause={
              <>
                Every circuit shall be provided with a means of isolation from all live supply
                conductors by a linked switch or a linked circuit-breaker. NOTE: Provision may be
                made for isolation of a group of circuits by a common means, if the service
                conditions allow this.
              </>
            }
            meaning="This is the regulation that the A4 Section H Item 1.1 wording change now matches. Every circuit needs a means of isolation; the consumer&rsquo;s means of isolation is the device that achieves this at the origin. The visual-inspection tick on Section H confirms its presence and identifies it correctly."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 134.1.4 (Joints and connections)"
            clause={
              <>
                Regulation 134.1.4&rsquo;s requirements for joints (conductance, insulation,
                mechanical strength, protection) are to be addressed during inspection and testing
                in accordance with BS&nbsp;7671 schedules of tests (continuity, insulation
                resistance, functional checks) to verify compliance.
              </>
            }
            meaning="Reg 134.1.4 sets the design / erection duty for every joint. Part 6 verifies it. The two regulations are deliberately complementary — design + verification — and a failure on either side is a Reg 4 EAWR exposure."
          />

          <SectionRule />

          <ContentEyebrow>The duty-holder concept</ContentEyebrow>

          <ConceptBlock
            title="Who carries the duty — and why this is not an academic question"
            plainEnglish="EAWR places duties on employers, the self-employed, employees and persons in control of premises. The duty bites to the extent of each person’s control over the system. On a typical job there are usually three or four duty holders simultaneously: you (the certifying electrician), your employer (if you are not self-employed), the responsible person who commissioned the work (landlord, employer, building owner), and the principal contractor on a CDM project."
            onSite="When something goes wrong, HSE and the courts identify the duty holder closest in causation to the failure. That is normally — but not always — the person who signed the certificate."
          >
            <p>
              Practically: the certifying electrician carries the duty for the work they have
              inspected and tested and signed for. The employer carries the EAWR duty for the system
              as a whole — the maintenance regime, the supervision, the competence of the workforce.
              The landlord of a rented property carries duties under EAWR (as a person in control of
              premises) and additionally under the Landlord and Tenant Act / Housing Act regimes
              that require periodic EICRs at change of tenancy or every five years (England) for
              private rented property. The principal contractor on a CDM project carries duties for
              the construction phase plan and the safe-by-design intent.
            </p>
            <p>
              The duty does not transfer with the certificate. Handing an EIC to the client does not
              absolve you of the EAWR duty for the work you did. Equally, the client receiving the
              EIC does not inherit your competence — they inherit responsibility for maintenance
              going forward, but the design and erection responsibility you signed for stays with
              you.
            </p>
          </ConceptBlock>

          <Scenario
            title="A consumer unit change at a tenanted flat"
            situation="You attend a routine CU change. The tenant is in. The landlord wants the work signed off for an EICR cut-off in three days. The supply is TN-C-S. You note on arrival that the main bonding to gas is missing and the earthing conductor sizing looks marginal."
            whatToDo="The CU change is initial-verification work for the new circuits and a periodic-inspection duty for the bits of the existing installation you depend on (earthing arrangement, main bonding, ESQCR’s PEN-conductor prohibition). Reg 134.2 requires inspection and testing of the addition, plus verification that the existing installation can accommodate it. You add main bonding and verify the earthing conductor csa against Reg 543. You issue an EIC for the new CU and an EICR-style observation for the bonding remediation if it was provided as a separate piece of work, or you fold the bonding into the EIC scope. You do not back-date anything to make the landlord’s deadline."
            whyItMatters="If a fault occurs and the bonding is found missing or the earthing conductor undersized, the EIC you signed says you verified the installation as compliant. Either you actually did, or you have a Fraud Act 2006 / EAWR Reg 4 problem in addition to the failed installation. The deadline pressure is the landlord’s problem, not a defence to a statutory duty."
          />

          <CommonMistake
            title="Treating BS 7671 as the law"
            whatHappens="Electrician argues in deposition that &lsquo;I followed BS 7671&rsquo; as if that ended the matter. Opposing counsel points out that BS 7671 is non-statutory and the actual statutory duty (EAWR Reg 4, Reg 16) requires the electrician to demonstrate compliance with the statute. The technical record is now insufficient on its own."
            doInstead="Frame the work in statutory terms in your records. &lsquo;Inspection and testing carried out under BS 7671 Part 6 to demonstrate compliance with EAWR 1989 Reg 4(2). Records retained per HSR25 / EAWR Reg 4(2).&rsquo; Tie your technical compliance to the legal duty it discharges, every time."
          />

          <CommonMistake
            title="Signing certification for work not personally inspected"
            whatHappens="A second electrician on the team did the dead tests; you arrived to do live tests and signed the EIC for the whole job. You did not personally verify the dead test results. A latent fault on a ring final is later traced to a continuity reading that was never actually taken. Your signature is now on a representation that you verified the test you did not run."
            doInstead="BS 7671 Reg 644.5 explicitly permits the EIC to be signed by more than one skilled person where different parts of the work are verified by different competent persons (designer, constructor, inspector). Use that mechanism. Sign for the parts you actually verified and have the other competent person sign for theirs. Single-signature shortcuts on multi-handed work are the most common cause of scheme operator removal."
          />

          <CommonMistake
            title="Confusing &lsquo;competent person scheme&rsquo; membership with EAWR Reg 16 competence"
            whatHappens="Newly-registered with NICEIC after a fast-track conversion, the electrician takes on commercial periodic inspections without ever having inspected a TN-S board with parallel earth paths. The scheme membership is a Building Regulations notification mechanism, not a statutory competence certificate. EAWR Reg 16 still requires actual technical knowledge or experience for the specific work."
            doInstead="Use the scheme for what it is — a Part P / building control notification route and a quality-assurance audit. Use EAWR Reg 16 as the personal competence test for each specific job. Where your competence is marginal for a particular task, work under the supervision of a more experienced inspector, or decline the work."
          />

          <CommonMistake
            title="Treating the EIC as a sales document, not a legal instrument"
            whatHappens="A contractor issues an EIC at the end of a domestic rewire and treats it as the closing-document of the job — branded letterhead, summary at the top, photos of the finished consumer unit, a thank-you note, and a payment-due reminder. The schedule of test results is attached but key fields are blank or marked &lsquo;OK&rsquo; without numeric values. The certificate is being presented to the customer the same way an invoice is — as paperwork that closes a transaction. When a fire occurs eighteen months later and the EIC is examined, the missing test values mean the certificate cannot evidence the inspection actually happened to the standard the document claims."
            doInstead="The EIC is a legal instrument signed under Reg 644.5 by a skilled person competent to verify compliance with BS 7671. It is relied on by the customer, their insurer, the next inspector, the building control body, and — if anything goes wrong — HSE and the coroner. Misrepresenting an inspection that was not carried out, or falsifying values on the schedule of test results, is a Fraud Act 2006 false instrument offence (s.1, with potential imprisonment of up to 10 years), a Trading Standards consumer-protection offence under the Consumer Protection from Unfair Trading Regulations 2008, and near-automatic scheme expulsion. The remediation is procedural: every numeric field gets a number, every inspection field gets a tick or a comment, every signature box reflects the person who actually verified that scope. The EIC becomes the closing document of the regulatory duty, not the closing document of the sale."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What a signature actually represents</ContentEyebrow>

          <ConceptBlock
            title="The legal weight of an EIC, EICR or MEIWC signature"
            plainEnglish="When you sign an EIC you are making a positive statement: this installation, on this date, in the parts I have inspected, complies with BS 7671. That statement is relied on by the client, by their insurer, by the landlord’s letting agent, and — if anything goes wrong — by HSE and the coroner. The signature has legal consequences. Treat it accordingly."
          >
            <p>
              Three things follow from this. First, you may not sign for work you have not
              personally inspected and tested (or, where Reg 644.5 applies, where you have not taken
              the records of the other competent persons into account). Second, the schedule of test
              results is the evidence of your verification — incomplete results are equivalent to
              incomplete inspection, regardless of what the front of the certificate says. Third,
              the recommendations on the certificate (interval to first periodic, any limitations,
              any departures) are part of the record and the duty holder downstream relies on them.
            </p>
            <p>
              An EICR is a different signature: it certifies your assessment of the installation,
              not its compliance. The classification codes (C1 immediate danger, C2 potentially
              dangerous, C3 improvement recommended, FI further investigation required) are your
              professional judgement, recorded so the responsible person knows what to remediate. A
              C2 you missed is the same problem as a C1 you missed — you signed off on a condition
              assessment that was wrong. The standard of care is the same.
            </p>
          </ConceptBlock>

          <Scenario
            title="A landlord asks you to upgrade a C2 to a C3"
            situation="You issue an EICR with a C2 on the consumer unit (no RCD protection on lighting circuits, supply is TN-C-S, modern remediation expected). The landlord pushes back: &lsquo;The letting agent says C2 means I have to spend money in 28 days. Mark it C3 — improvement recommended.&rsquo;"
            whatToDo="Refuse. C2 means &lsquo;potentially dangerous&rsquo; and is a fact about the installation, not a negotiation between inspector and client. Marking it C3 (improvement) is a representation that the condition is not potentially dangerous — i.e. you would be falsifying the assessment. Document the request in your file note. Issue the EICR with the C2. If the landlord wishes to challenge, they can commission a second opinion from another competent inspector."
            whyItMatters="A &lsquo;helpful&rsquo; downgrade is a Fraud Act 2006 false representation, an EAWR Reg 4 contributory failure, and a near-certain scheme operator referral. The downside risk to you is unlimited; the upside is a single landlord’s goodwill. The maths does not work."
          />

          <Scenario
            title="A defective EICR, a fatal fire, and what the courts looked at afterwards"
            situation="An HMO conversion in a Midlands town. The freeholder commissions an EICR from an inspector with NICEIC registration but limited recent commercial experience. The inspector spends ninety minutes on a property with eight bedrooms, four floors and a pre-CU-change Wylex board with no RCD protection on the lighting circuits. The EICR returns a Satisfactory with two C3s — &lsquo;Improvement recommended: install RCD protection on lighting circuits&rsquo; and &lsquo;Improvement recommended: replace consumer unit&rsquo;. Eleven months later a lighting-circuit fault arcs in a cable joint above a kitchen ceiling. The kitchen door is propped open, the alarm system is non-functional, two tenants die from smoke inhalation."
            whatToDo="Reg 651.2 makes the periodic inspection a duty to identify installation defects and non-compliances that may give rise to danger. Reg 653 (revised at A4:2026) requires the EICR to take the recipient guidance and the model form notes into account. The missing RCD protection on lighting circuits in a residential HMO is potentially-dangerous (C2) under Electrical Safety First / IET classification guidance, not improvement-recommended (C3) — touch voltage on a fault to the metallic ceiling fitting can be lethal, and the circuit has no automatic disconnection inside the BS 7671 Reg 411.3.2 time. The inspector misclassified the defect; the duty holder relied on a Satisfactory; the fault path was unprotected when the joint failed."
            whyItMatters="The post-incident review by the coroner and HSE looked at three things: the EICR itself, the inspector&rsquo;s record retention under EAWR Reg 4(2) and HSR25, and the chain of duty holders. The inspector faced potential prosecution for breach of EAWR Reg 4 (the inspection should have prevented danger and did not), Fraud Act 2006 false instrument exposure (the certificate represented a state of safety the inspector had not verified to that standard), and immediate scheme expulsion. The freeholder faced gross negligence manslaughter exposure as the duty holder in control of premises. The pattern of these cases — Whirlpool tumble-dryer fires, the substandard remediation EICRs that surfaced in the Grenfell aftermath — is consistent: the C2 that was downgraded to a C3, the lighting circuit that was &lsquo;improvement&rsquo; not &lsquo;potentially dangerous&rsquo;, the missing RCD that was a recommendation rather than a remediation, are what the prosecution opens with."
          />

          <SectionRule />

          <ContentEyebrow>Records — the evidence the duty holder relies on</ContentEyebrow>

          <ConceptBlock
            title="Why GN3 Ch 1 is so insistent on record retention"
            plainEnglish="HSR25 (the HSE memorandum of guidance on EAWR) recommends that records of all maintenance, including test results, be kept throughout the working life of the installation. GN3 Ch 1 cites this directly and ties it to EAWR Reg 4(2). The records are not bureaucratic overhead — they are the evidence base the duty holder relies on to demonstrate Reg 4(2) compliance, and the evidence base your insurer relies on to defend you when something goes wrong."
            onSite="If a fire investigator, HSE inspector or coroner asks &lsquo;was this installation maintained?&rsquo;, the answer is the records. No records = no evidence of maintenance = a Reg 4(2) exposure that lands directly on the duty holder, and indirectly on the last electrician who signed any certificate for the installation."
          >
            <p>
              The records that matter, beyond the EIC / EICR / MEIWC themselves, are the schedules
              of inspection and test results that accompany every certificate, the tester
              calibration certificates that support the test values, the photographs and notes that
              evidence non-numeric findings, and the work-instruction trail that shows what was done
              and why. GN3 Ch 1 is explicit that the records cover both test results and the wider
              maintenance history.
            </p>
            <p>
              Two practical points follow. First, the records belong to the duty holder, not to you
              — the EIC and EICR are issued to the person ordering the work (Reg 644.6 / Reg 653.6).
              You retain a copy; they retain the original. Your copy is your evidence; their copy is
              their evidence; both must match. Second, records are kept in a form that survives.
              Paper copies are still acceptable; encrypted electronic records on cloud-backed
              job-management software is the modern norm. Records on a single laptop with no backup
              are a single hard-drive failure away from being non-existent.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Chapter 1 · Records and HSR25"
            clause={
              <>
                Records recommended by HSR25 and GN3 shall include both test results and the wider
                maintenance history of the installation, enabling determination of the condition of
                the installation over time and supporting compliance with EAWR obligations.
              </>
            }
            meaning="The records are not just &lsquo;the certificate&rsquo;. They are the test schedules, the inspection schedules, the calibration evidence, the photographs and the maintenance log. Together they show condition over time, which is what Reg 4(2) maintenance actually means in practice."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Issuing the EIC without the schedules of inspection and test results"
            whatHappens="A client receives a single-page EIC. The two mandatory schedules — Schedule of Inspections and Schedule of Test Results — have been left in the van. Reg 644.3 requires the EIC to include both schedules; without them the certificate is incomplete and does not satisfy the regulatory duty. The client, their insurer and any future inspector receiving the document have no evidence of what was actually verified."
            doInstead="Reg 644.3 is the rule: the EIC includes extent of work + Schedule(s) of Inspection + Schedule(s) of Circuit Details and Test Results, all based on the Appendix 6 models. Issue all three documents together. Modern certification software bundles them automatically; manual paperwork must be checked before leaving site."
          />

          <SectionRule />

          <ContentEyebrow>How this lands on Day 1 of an inspection</ContentEyebrow>

          <ConceptBlock
            title="The legal pre-flight check before the first test lead is connected"
            plainEnglish="Before you do any actual work, you can run the legal frame in 60 seconds. Who is the duty holder? What is being verified — initial or periodic? What is your competence for this specific job, honestly? What records exist already and what records will you create? Are there any statutory triggers (CDM, Part P notification, ESQCR PEN issue, special-location requirement)?"
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Duty holder:</strong> identify the person commissioning the work and any
                other duty holders on site. Note in your job record. This determines who receives
                the certificate and any observations.
              </li>
              <li>
                <strong>Initial vs periodic:</strong> initial verification work outputs an EIC or
                MEIWC; periodic outputs an EICR. Confusing the two is the most common documentary
                error. New installation, addition or alteration = Chapter 64. Existing installation
                being re-checked = Chapter 65.
              </li>
              <li>
                <strong>Competence:</strong> EAWR Reg 16 self-test for this specific installation.
                If marginal, work under supervision or decline.
              </li>
              <li>
                <strong>Records:</strong> what test records, schedules of inspection and condition
                evidence will you create? GN3 Ch 1 / HSR25 / EAWR Reg 4(2) — these are the
                evidentiary trail your future self will rely on.
              </li>
              <li>
                <strong>Statutory triggers:</strong> CDM 2015 (construction phase), Part P Building
                Regulations (notifiable domestic work), ESQCR (PEN, supply-side), special location
                obligations (Part 7) — flag any that apply before you start.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'EAWR 1989 is the law; BS 7671 is the technical standard the law accepts as defining good practice. The two are complementary and you are judged against both — but breach of EAWR is what carries the criminal liability.',
              'Reg 4 EAWR: construct to prevent danger (4(1)), maintain to prevent danger (4(2)) — both qualified by reasonably practicable. Inspection and testing under BS 7671 Part 6 is the principal evidence of Reg 4(2) maintenance.',
              'Reg 16 EAWR: technical knowledge or experience sufficient to prevent danger. Honest self-assessment per job. BS 7671 Reg 134.2 and 651.5 mirror this for I&T work.',
              'Initial verification (Chapter 64) → EIC or MEIWC. Periodic inspection (Chapter 65) → EICR. Different duties, different documents, different signatures.',
              'Duty holders: employer, self-employed, employee, person in control of premises. Multiple duty holders coexist on most jobs. The duty bites to the extent of control.',
              'Records (GN3 Ch 1 / HSR25 / EAWR Reg 4(2)): kept throughout the working life of the installation. They are how you prove maintenance happened.',
              'A signature on an EIC is a positive compliance claim. A signature on an EICR is a professional condition assessment. Both carry legal weight; both stay with you.',
              'BS 7671:2018+A4:2026 is in force 15 April 2026; A3:2024 withdrawn 15 October 2026. Edition matters; legal status of the standard does not change with amendment.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'If BS 7671 is non-statutory, why is it the rulebook everyone uses?',
                answer:
                  'Because compliance with BS 7671 is the route HSE, the courts and insurers accept as demonstrating compliance with EAWR 1989 Reg 4. Not following BS 7671 is permitted (Reg 120.3 / 133.1.3 allow justified departures), but you then have to demonstrate the statutory duty was discharged some other way — which in a contested case is a much harder argument than &lsquo;I followed BS 7671&rsquo;. So in practice the standard is the rulebook, even though the law is the statute.',
              },
              {
                question:
                  'Does Reg 4 EAWR really apply to a residential installation, or only to workplaces?',
                answer:
                  'EAWR applies to electrical work activities and equipment in workplaces and certain other premises governed by HSWA. For pure domestic owner-occupied work, EAWR does not directly bite, but the Building Regulations (Part P in England, equivalent provisions in Wales and Scotland) and the Consumer Protection from Unfair Trading Regulations do apply, as does common-law negligence. For rented domestic property, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require five-yearly EICRs and bring the installation into a statutory regime functionally similar to EAWR Reg 4. So in practice, residential work is always under a statutory frame — just not always EAWR specifically.',
              },
              {
                question:
                  'What’s the difference between &lsquo;competent person scheme&rsquo; membership and EAWR Reg 16 competence?',
                answer:
                  'Scheme membership (NICEIC, NAPIT, ELECSA, etc.) is the Building Regulations notification mechanism — it lets you self-certify Part P notifiable domestic work without involving building control. The audits scheme operators run check that you have qualifications, insurance, and a quality system. Reg 16 EAWR competence is broader and substantive: actual technical knowledge or experience sufficient to prevent danger on the specific work. Scheme membership is evidence of competence; it is not a substitute for the Reg 16 self-test on a particular installation.',
              },
              {
                question:
                  'I’m signing the EIC. The designer was someone else and the constructor was a third party. Can I lawfully sign just one box?',
                answer:
                  'Yes — Reg 644.5 of BS 7671 is written for exactly this. The EIC has separate signature blocks for designer, constructor and inspector. You sign the inspector block for the parts you have inspected and tested; the designer and constructor sign their own blocks for their own work. What you must not do is sign all three blocks when only one of them was your work — that misrepresents who is responsible for what, and shifts liability to you for design and construction decisions you never made.',
              },
              {
                question:
                  'What happens if I lose my insulation resistance results before transcribing them?',
                answer:
                  'You re-test. The schedule of test results is the evidentiary record EAWR Reg 4(2) and HSR25 require you to retain; signing an EIC with values you cannot evidence is the documentary equivalent of not having done the test. In practice, modern multifunction testers store readings and you back them up to your job management software at the end of the day — that is the procedural mitigation.',
              },
              {
                question:
                  'A landlord wants the EICR before the inspection is finished. Can I issue an interim?',
                answer:
                  'No. An EICR is a single document representing the inspection of the installation as a whole. Reg 653.1 requires the EICR to be produced on completion of the periodic inspection and testing. If the work is part-done and there is a need to flag a specific danger discovered, that is a written notification to the duty holder of a specific defect — it is not an EICR and you must not present it as one. Issue the EICR when the inspection is genuinely complete.',
              },
              {
                question: 'How do I record a justified departure from BS 7671 on the certificate?',
                answer:
                  'Reg 120.3 / 133.1.3 permit departures where the resulting installation is at least as safe as one complying with BS 7671. The departure is recorded on the appropriate Part 6 certificate — extent, nature of the departure, and the technical justification. The justification is not a single sentence; it is enough technical reasoning that another competent person could review it and reach the same conclusion. Keep the working in your records, not just the certificate, because a bare &lsquo;departure permitted under 120.3&rsquo; line on the EIC is not a justification — it is a label.',
              },
              {
                question: 'Is there a statutory test interval, or is BS 7671 / GN3 the source?',
                answer:
                  'For most installations, the recommended maximum intervals come from BS 7671 and GN3 — they are not statutory in themselves. The exceptions: rented domestic property in England has a statutory five-year EICR interval under the 2020 PRS Regulations, and there are specific statutory regimes for petrol stations, certain healthcare premises, and other specialised installations. Outside those carve-outs, the BS 7671 / GN3 intervals are the &lsquo;reasonably practicable&rsquo; benchmark you would be judged against in a Reg 4 EAWR challenge.',
              },
              {
                question:
                  'Do I need to issue an EIC for a like-for-like fuse change, or any certificate at all?',
                answer:
                  'A genuinely like-for-like consumable replacement on an existing circuit — pulling out a blown BS 1361 cartridge fuse and putting back the same rating, same type — is maintenance, not an addition or alteration. It does not introduce a new circuit, change the protective device characteristics, or alter the design. No EIC is required (Reg 644 reserves the EIC for new installations, additions or alterations introducing new circuits, CU replacements, or multiple alterations as the alternative to multiple MEIWCs). An MEIWC is also not strictly required because the work is not an &lsquo;item of minor works&rsquo; in the design sense — it is restoration of the existing protection. However: the moment you change the device characteristic — different curve, different rating, different breaking capacity, different manufacturer body — you have altered the protection of the circuit and the work falls into MEIWC territory. Record what you did either way, in the maintenance log if not on a certificate, because EAWR Reg 4(2) and HSR25 expect a paper trail of every maintenance action.',
              },
              {
                question:
                  'What&rsquo;s the difference between a Minor Works Certificate and an Electrical Installation Certificate?',
                answer:
                  'The Minor Electrical Installation Works Certificate (MEIWC) is for individual items of minor works on an existing circuit that do not introduce a new circuit — adding a socket-outlet to an existing ring, adding a lighting point to an existing lighting circuit, replacing an FCU on an existing spur. Reg 644 / Appendix 6 is explicit that the MEIWC is not for new circuits. Several minor-works items on the same existing circuit may be combined on a single MEIWC; minor works on multiple circuits each get their own. The Electrical Installation Certificate (EIC) is the heavier document used for the initial certification of a new installation, for additions or alterations where one or more new circuits have been introduced, for the replacement of a consumer unit / distribution board, and as an alternative to multiple MEIWCs where a single job has multiple alterations or remedial works to the existing installation. The legal weight is the same — both are signed under Reg 644.5 by a skilled person competent to verify BS 7671 compliance — but the EIC carries the full Schedule of Inspections and Schedule(s) of Circuit Details and Test Results required by Reg 644.3, whereas the MEIWC condenses the relevant inspection and test data onto a single certificate appropriate to the smaller scope.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Purpose and legal requirements — Module 1.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-1')}
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
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-1/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 BS 7671 testing requirements overview
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

export default InspectionTestingModule1Section1;
