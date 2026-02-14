import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  BookOpen,
  Brain,
  Clock,
  Target,
  Lightbulb,
  GraduationCap,
  AlertTriangle,
  Wrench,
  ClipboardCheck,
  Zap,
  Award,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: '2391 Exam Tips', href: '/guides/2391-exam-tips' },
];

const tocItems = [
  { id: 'what-is-2391', label: 'What Is the 2391?' },
  { id: 'written-exam', label: 'Written Exam Format' },
  { id: 'practical-assessment', label: 'Practical Assessment' },
  { id: 'common-pitfalls', label: 'Common Pitfalls' },
  { id: 'test-sequence', label: 'Test Sequence Knowledge' },
  { id: 'preparation-strategy', label: 'Preparation Strategy' },
  { id: 'exam-day', label: 'Exam Day Tips' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The C&G 2391 has two components: a 2-hour written exam (40 short-answer questions) and a practical assessment where you inspect and test a real or simulated installation.',
  'The correct test sequence is critical — continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current, then RCD testing. Examiners will fail you for testing out of order.',
  'Know GN3 (Guidance Note 3: Inspection & Testing) as well as BS 7671 — the practical assessment is based heavily on the GN3 procedures.',
  'The written exam expects detailed, technical answers with regulation references — one-word answers will not score marks.',
  'Elec-Mate offers a dedicated inspection and testing course with mock exams, flashcards, and the EPA simulator to prepare you for the practical assessment.',
];

const faqs = [
  {
    question: 'What is the difference between the 2391-50, 2391-51, and 2391-52?',
    answer:
      'The C&G 2391 qualification comes in three variants: 2391-50 (Initial Verification only — for testing new installations you have just installed), 2391-51 (Periodic Inspection and Testing only — for inspecting existing installations), and 2391-52 (both Initial Verification and Periodic Inspection and Testing combined). Most electricians take the 2391-52 as it covers both scopes and is the most widely recognised by employers and competent person schemes. If you only do periodic inspections (for example, landlord EICRs) and never install, the 2391-51 is sufficient. The 2391-50 on its own is less common as most people who can verify new installations also need to do periodic inspections. The exams for each variant are similar in format but the questions and practical scenarios differ based on the scope.',
  },
  {
    question: 'How hard is the 2391 compared to the 18th Edition?',
    answer:
      'The 2391 is generally considered harder than the 18th Edition (C&G 2382) because it requires both theoretical knowledge and practical competence. The written exam is more demanding — instead of multiple-choice questions, you must write detailed short answers with regulation references. The practical assessment adds another dimension: you must physically carry out an inspection and test sequence on a real or simulated installation, record the results on the correct forms, and produce a completed EICR or EIC. Many candidates who comfortably pass the 18th Edition fail the 2391 on their first attempt, particularly the practical assessment. The key differences are: longer, more detailed answers required; need to demonstrate hands-on testing competence; must complete certification paperwork accurately; and the overall pass rate is lower (typically 55 to 65% compared to 65 to 75% for the 2382).',
  },
  {
    question: 'What instruments do I need for the 2391 practical assessment?',
    answer:
      'For the practical assessment, you typically need a multifunction tester (MFT) that can perform continuity testing, insulation resistance testing, earth fault loop impedance measurement, prospective fault current measurement, and RCD testing. The most commonly used models are the Megger MFT1741 or MFT1835, Fluke 1664FC, Metrel MI3155, or Kewtech KT66DL. You will also need a proving unit or voltage indicator (such as a Fluke T150 or Kewtech KT1780) for safe isolation. Some centres provide instruments; others require you to bring your own. Check with your centre beforehand. Your instruments must be within their calibration date — bring the calibration certificates. You should also bring test leads, probes, and any adaptors you might need. Practise with your own instruments before the exam so you are comfortable with the controls and can operate them quickly.',
  },
  {
    question: 'What does the 2391 practical assessment involve?',
    answer:
      'The practical assessment requires you to carry out an inspection and test of an electrical installation (real or simulated). You will need to: (1) Carry out a safe isolation procedure before any dead testing. (2) Perform the full test sequence in the correct order: continuity of protective conductors (R1+R2), continuity of ring final circuit conductors, insulation resistance, polarity (if not confirmed by continuity testing), earth fault loop impedance (Zs), prospective fault current (PSCC), and RCD testing (trip time and trip current). (3) Carry out a visual inspection, checking for compliance with BS 7671 — looking for defects such as missing earth labels, incorrect IP ratings, damaged accessories, or non-compliant installations. (4) Record all results on the appropriate test forms (Schedule of Test Results). (5) Complete the certification — either an EIC (for initial verification) or an EICR (for periodic inspection), including observations and the overall assessment. (6) The examiner will also ask you oral questions during or after the assessment to verify your understanding.',
  },
  {
    question: 'How long does it take to complete the 2391 qualification?',
    answer:
      "Most classroom-based 2391 courses run over 1 to 2 weeks (5 to 10 days), combining theory lessons with practical workshop sessions. Distance learning options typically give you 6 to 12 months to complete, with a practical assessment day booked at a centre. The total study time depends on your starting knowledge: if you already hold the 18th Edition qualification and have practical testing experience, a 1-week intensive course may be sufficient. If you are newer to inspection and testing, a 2-week course with additional self-study is more realistic. You should also allow time for practice — ideally, do some inspection and testing work on real installations (under supervision if you are not yet qualified) before the assessment. Elec-Mate's inspection and testing course lets you study the theory at your own pace, practise with mock exams, and use the EPA simulator to rehearse the practical elements.",
  },
  {
    question: 'Can I retake the 2391 if I fail?',
    answer:
      'Yes, you can retake either or both components of the 2391 if you fail. If you pass the written exam but fail the practical (or vice versa), you only need to retake the component you failed — you do not need to redo both. The retake fee varies by centre but is typically £100 to £200 per component. Most centres allow retakes within 6 to 12 months of the original attempt. If you fail the practical assessment, ask the examiner for feedback on what you did wrong — they should be able to tell you which areas cost you marks. Common reasons for practical failure include: performing tests out of sequence, recording results inaccurately, failing to carry out safe isolation correctly, missing obvious visual defects, or not completing the certification paperwork fully. Address these specific areas before your retake.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/18th-edition-exam-tips',
    title: '18th Edition Exam Tips',
    description:
      'How to pass the C&G 2382 exam — format, key regulations, book tabs, and time management.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for initial verification and periodic inspection testing.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-test-insulation-resistance',
    title: 'Insulation Resistance Testing',
    description: 'Step-by-step guide to performing insulation resistance tests correctly.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-study-tips',
    title: 'Study Tips for Electricians',
    description: 'Active recall, spaced repetition, and flashcard techniques for exam preparation.',
    icon: Brain,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-fill-in-eicr',
    title: 'How to Fill In an EICR',
    description: 'Every section of the EICR form explained — essential knowledge for the 2391.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for the 2391 on Elec-Mate with structured modules, flashcards, and EPA simulation.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-2391',
    heading: 'What Is the C&G 2391 Qualification?',
    content: (
      <>
        <p>
          The City & Guilds 2391 (Inspection and Testing of Electrical Installations) is the
          industry-standard qualification for electricians who carry out inspection, testing, and
          certification of electrical installations in the UK. It proves you can inspect and test
          both new installations (initial verification) and existing installations (periodic
          inspection), and produce the correct certification —{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            EIC, EICR, and Minor Works Certificates
          </SEOInternalLink>
          .
        </p>
        <p>
          The 2391 is a requirement for most competent person scheme registrations (NICEIC, NAPIT,
          ELECSA) and is expected by employers across the trade. Without it, you cannot
          independently sign off inspection and testing work. It sits alongside the{' '}
          <SEOInternalLink href="/guides/18th-edition-exam-tips">
            18th Edition qualification (C&G 2382)
          </SEOInternalLink>{' '}
          — you need both to be considered fully qualified for inspection work.
        </p>
        <p>
          The qualification is assessed through two components: a written exam and a practical
          assessment. Both must be passed to achieve the full qualification.
        </p>
      </>
    ),
  },
  {
    id: 'written-exam',
    heading: 'Written Exam Format and What to Expect',
    content: (
      <>
        <p>
          The 2391 written exam is significantly different from the 18th Edition multiple-choice
          exam. Here is what you are facing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>40 short-answer questions</strong> in 2 hours. These are not multiple-choice
                — you must write out your answers in full sentences with technical detail and
                regulation references.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-book</strong> — you can bring BS 7671 and GN3 (Guidance Note 3:
                Inspection & Testing). Both can be tabbed. This is different from the 2382 exam
                where only BS 7671 is permitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass mark: 60%.</strong> With 40 questions, you need to score at least 24
                correct answers. Each question may carry different marks depending on complexity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation references are expected.</strong> An answer of "you need RCD
                protection" will score fewer marks than "Regulation 411.3.3 requires additional
                protection by an RCD with a rated residual operating current not exceeding 30mA."
              </span>
            </li>
          </ul>
        </div>
        <p>
          The written exam covers: the purpose and scope of inspection and testing; the difference
          between initial verification and periodic inspection; the correct test sequence and why
          the order matters; interpretation of test results; classification of observations (C1, C2,
          C3, FI); completion of certification paperwork; and the legal framework including the
          Electricity at Work Regulations 1989 and the Health and Safety at Work Act 1974.
        </p>
      </>
    ),
  },
  {
    id: 'practical-assessment',
    heading: 'Practical Assessment: What You Must Demonstrate',
    content: (
      <>
        <p>
          The practical assessment is where many candidates struggle. You are given a real or
          simulated electrical installation and must carry out a complete inspection and test. The
          examiner watches you work and assesses your competence against specific criteria.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Safe Isolation</h4>
                <p className="text-white text-sm leading-relaxed">
                  You must demonstrate the{' '}
                  <SEOInternalLink href="/guides/safe-isolation-procedure">
                    safe isolation procedure
                  </SEOInternalLink>{' '}
                  correctly: prove dead using a voltage indicator, lock off, prove the voltage
                  indicator still works. Failing to do this correctly can result in an automatic
                  fail — it is a safety-critical procedure.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Visual Inspection</h4>
                <p className="text-white text-sm leading-relaxed">
                  Carry out a thorough visual inspection of the installation. Check for: correct
                  labelling, presence of safety notices, condition of accessories, adequacy of
                  connections, correct IP ratings, cable condition, and compliance with BS 7671. The
                  examiner expects you to identify deliberate defects placed in the installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Testing Sequence</h4>
                <p className="text-white text-sm leading-relaxed">
                  Perform all tests in the correct order (see next section). Record every result
                  accurately on the Schedule of Test Results. The examiner will check that you are
                  using instruments correctly, connecting probes to the right terminals, and reading
                  results accurately.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the full certification paperwork — EIC or EICR as appropriate. This
                  includes the schedule of test results, the schedule of inspections, observations
                  with correct{' '}
                  <SEOInternalLink href="/guides/eicr-observation-codes-explained">
                    classification codes
                  </SEOInternalLink>
                  , and the overall assessment (Satisfactory or Unsatisfactory). Missing fields or
                  incorrect classification codes will cost marks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Practise the practical assessment with the EPA simulator"
          description="Elec-Mate's EPA simulator walks you through a simulated inspection and testing practical — safe isolation, test sequence, result recording, and certification completion. Practise until you can do it in your sleep."
          icon={Wrench}
        />
      </>
    ),
  },
  {
    id: 'common-pitfalls',
    heading: 'Common Pitfalls That Cost Candidates Marks',
    content: (
      <>
        <p>
          Examiners report the same mistakes appearing year after year. Avoid these and you will be
          ahead of most candidates:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing out of sequence.</strong> The test sequence exists for safety and
                accuracy reasons. If you perform earth fault loop impedance before insulation
                resistance testing, you could be testing a circuit with a fault and get inaccurate
                results — or worse, create a dangerous condition. The examiner will fail you for
                this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skipping safe isolation or doing it incorrectly.</strong> Forgetting to
                prove the voltage indicator works after proving dead, or not locking off, are common
                mistakes. Some candidates prove dead at the consumer unit but not at the point of
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not recording results accurately.</strong> Writing "pass" instead of the
                actual measured value. The Schedule of Test Results requires numerical values — for
                example, "0.32 ohms" for R1+R2, not "pass." The examiner needs to see that you
                actually measured and recorded the result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect observation codes.</strong> Classifying a C2 (Potentially
                Dangerous) defect as C3 (Improvement Recommended) or vice versa. Know the
                definitions: C1 = immediate danger, C2 = not immediately dangerous but could become
                so, C3 = does not comply with current standard but not dangerous.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete certification.</strong> Leaving sections of the EIC or EICR
                blank. Every field must be completed — if a field does not apply, write "N/A" rather
                than leaving it empty. Missing signatures, dates, or the next inspection date are
                common omissions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-sequence',
    heading: 'The Test Sequence You Must Know',
    content: (
      <>
        <p>
          The correct test sequence for the 2391 is set out in{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            GN3 (Guidance Note 3: Inspection & Testing)
          </SEOInternalLink>{' '}
          and referenced in Part 6 of BS 7671. You must perform tests in this order because each
          test depends on the results of the previous one:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Continuity of protective conductors (R1+R2)</strong> — confirms the earth path
              is continuous. If this fails, there is no point testing earth fault loop impedance
              later.
            </li>
            <li>
              <strong>Continuity of ring final circuit conductors</strong> — confirms the ring is
              complete and not broken or cross-connected. Measures R1, Rn, and R2 for each ring.
            </li>
            <li>
              <strong>Insulation resistance</strong> — tests for breakdown between live conductors
              and earth. Must be done with the supply isolated (dead test). Minimum acceptable
              value: 1 megohm at 500V DC for most circuits.
            </li>
            <li>
              <strong>Polarity</strong> — confirms line, neutral, and earth are connected correctly
              at every point. Often confirmed as part of the R1+R2 continuity test.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — measures the impedance of the earth
              fault path. The measured value must be less than the maximum permitted Zs from the
              tables in Appendix 3 of BS 7671 (after applying the 0.8 correction factor).
            </li>
            <li>
              <strong>Prospective fault current (PSCC/PEFC)</strong> — measures the maximum current
              that would flow under fault conditions. The protective device must be capable of
              breaking this current.
            </li>
            <li>
              <strong>RCD testing</strong> — tests the trip time at rated current (should trip
              within 300ms for general-purpose RCDs, 40ms at 5x rated current for additional
              protection RCDs) and the trip current (should not trip at 50% of rated current).
            </li>
          </ol>
        </div>
        <p>
          For periodic inspection, you may also need to carry out additional tests such as earth
          electrode resistance testing (for TT systems) and functional testing of switchgear and
          controls. The key principle is: dead tests first (with the supply off), then live tests
          (with the supply on), in the order listed above.
        </p>
      </>
    ),
  },
  {
    id: 'preparation-strategy',
    heading: 'Preparation Strategy for Both Components',
    content: (
      <>
        <p>
          Passing the 2391 requires preparation for both the written exam and the practical
          assessment. Here is how to approach each:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Written Exam Preparation</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Study both BS 7671 and GN3.</strong> The written exam draws heavily from
                both. GN3 covers the practical aspects of inspection and testing — test methods,
                instrument requirements, and result interpretation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise writing detailed answers.</strong> Unlike the 2382 multiple-choice
                exam, the 2391 expects full technical answers. Practise writing answers to past
                questions, including regulation references.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use flashcards for key regulations.</strong> Elec-Mate's flashcards tool
                covers the regulations most commonly tested in the 2391 written exam. Spaced
                repetition helps you recall regulation numbers under exam pressure.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Practical Assessment Preparation</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise on real installations.</strong> If possible, carry out inspection
                and testing on real installations under supervision. The more you practise the
                physical process of connecting instruments and recording results, the more confident
                you will be on assessment day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Memorise the test sequence.</strong> You should be able to recite the test
                sequence in your sleep. Practise it until it is automatic — on assessment day,
                nerves can make you forget things you normally know.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise filling in certification.</strong> Complete blank EIC and EICR
                forms multiple times. Know which fields go where, what format the results should be
                in, and how to classify observations correctly.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Study for the 2391 with Elec-Mate"
          description="Elec-Mate's inspection and testing course covers every topic on the 2391 syllabus. Flashcards for regulation recall, mock exams for the written paper, and the EPA simulator for practical preparation. Track your progress and know when you are ready."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'exam-day',
    heading: 'Exam Day Tips',
    content: (
      <>
        <p>
          On the day of your 2391 exam, small details can make the difference between pass and fail.
          Here is what to remember:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written exam:</strong> Allocate your time across all 40 questions. Do not
                spend too long on any single question. If you are stuck, move on and come back.
                Write clearly and include regulation references wherever possible — even a partial
                answer with the correct regulation number can score marks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical assessment:</strong> Talk the examiner through what you are doing
                and why. If you explain "I am now carrying out insulation resistance testing at 500
                volts DC between line and earth, because I need to confirm there is no breakdown of
                insulation before I energise the circuit," the examiner knows you understand the
                process — even if your instrument technique is not perfect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bring everything you need:</strong> BS 7671 (tabbed), GN3 (tabbed), photo
                ID, instruments (calibrated), test leads, proving unit, PPE, pen, and spare pen.
                Arrive 15 minutes early.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stay calm during the practical.</strong> Being watched by an examiner is
                stressful. Take a breath, work methodically through the test sequence, and do not
                rush. A steady, confident approach scores better than a frantic one.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuilds2391ExamTipsPage() {
  return (
    <GuideTemplate
      title="2391 Exam Tips | Inspection & Testing Exam Guide"
      description="How to pass the C&G 2391 Inspection and Testing exam. Covers written exam format, practical assessment, test sequence, common pitfalls, and preparation strategy. Includes tips for both the 2391-51 and 2391-52."
      datePublished="2025-04-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Exam Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          2391 Exam Tips: <span className="text-yellow-400">How to Pass Inspection & Testing</span>
        </>
      }
      heroSubtitle="The C&G 2391 is the qualification every electrician needs for inspection and testing work. It has a written exam and a practical assessment — and the pass rate is lower than the 18th Edition. This guide covers both components, the test sequence you must know, and the mistakes that cost candidates marks."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the 2391 Exam"
      relatedPages={relatedPages}
      ctaHeading="Prepare for the 2391 with Elec-Mate"
      ctaSubheading="Structured inspection and testing course, flashcards, timed mock exams, and EPA simulator. 46+ training courses covering every electrical qualification. 7-day free trial, cancel anytime."
    />
  );
}
