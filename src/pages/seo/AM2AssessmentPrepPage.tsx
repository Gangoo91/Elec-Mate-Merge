import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Wrench,
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Users,
  Zap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'Apprentice Guides', href: '/guides/city-guilds-2365-electrical' },
  { label: 'AM2 Assessment Preparation', href: '/guides/am2-assessment-preparation' },
];

const tocItems = [
  { id: 'overview', label: 'What is the AM2 Assessment?' },
  { id: 'what-it-covers', label: 'What the AM2 Covers' },
  { id: 'booking', label: 'How to Book the AM2' },
  { id: 'pass-rate', label: 'Pass Rate and Common Failures' },
  { id: 'preparation', label: 'Preparation Timeline: 2–4 Weeks' },
  { id: 'on-the-day', label: 'On the Day: What to Expect' },
  { id: 'for-apprentices', label: 'Elec-Mate Study Tools for AM2' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The AM2 is the practical End Point Assessment for electrical apprentices completing the Installation Electrician/Maintenance Electrician apprenticeship standard (ST0215). It is administered by EMTA (Engineering and Manufacturing Training Association) at EMTA-approved assessment centres.',
  'The AM2 covers five practical tasks: installation to a wiring diagram, inspection and testing, commissioning, fault diagnosis, and environmental considerations. Candidates must complete all tasks within strict time limits.',
  'The overall AM2 pass rate is approximately 70–75% on first attempt. The most common reasons for failure are poor time management, inadequate testing sequence knowledge, and loose or missing terminations.',
  'Booking the AM2 requires the candidate to hold a completed NVQ portfolio demonstrating on-the-job competence, and the employer or training provider to confirm the candidate is ready for End Point Assessment.',
  'A 2–4 week focused preparation period — practising each AM2 task under timed conditions — is the most effective approach. Attempting the AM2 without specific timed practice of the tasks significantly increases failure risk.',
];

const faqs = [
  {
    question: 'What is the difference between the AM2 and AM2S?',
    answer:
      'The AM2 is the original practical assessment for apprentices completing the Level 3 NVQ Diploma in Electrotechnical Technology. The AM2S (AM2 for Standards) is the practical assessment specifically designed for apprentices completing the Installation Electrician/Maintenance Electrician apprenticeship standard (ST0215), introduced following the trailblazer apprenticeship reforms. AM2S includes additional containment work — steel and PVC conduit installation — that is not required in the original AM2. The AM2S takes approximately 16.5 hours over 2.5 days; the original AM2 takes approximately 8.5 hours. Most new apprentices starting from 2017 onwards will be completing AM2S rather than AM2. Check with your college or employer which version you are registered for.',
  },
  {
    question: 'Who administers the AM2 and where can I take it?',
    answer:
      'The AM2 and AM2S are administered by EMTA (Engineering and Manufacturing Training Association), which acts as the End Point Assessment Organisation (EPAO) for the electrical installation apprenticeship. EMTA operates a network of approved assessment centres across the UK. Assessment centres are typically further education colleges and training providers with dedicated electrical installation training rigs that replicate the AM2 board configuration. Candidates attend an approved EMTA assessment centre for the full duration of the assessment. The assessment is conducted by EMTA-appointed assessors who are independent from the candidate\'s employer and training provider. Contact EMTA directly (emta.org.uk) or through your training provider to find the nearest approved centre.',
  },
  {
    question: 'How long does the AM2 take and what does it involve?',
    answer:
      'The original AM2 takes approximately 8.5 hours of assessed practical work. The AM2S takes approximately 16.5 hours over 2.5 days. The practical tasks covered in both versions include: installation (wiring a domestic consumer unit, lighting circuit, ring final circuit, and other circuits to a supplied wiring diagram within a time limit); inspection and testing (carrying out the full BS 7671 inspection and testing sequence on the installed board, recording results correctly, and completing a schedule of test results); commissioning (energising and functionally testing all circuits); and fault diagnosis (identifying and rectifying pre-set faults introduced into the board). The AM2S additionally requires installation of steel conduit (bending to fit a defined route) and PVC conduit with junction boxes. Candidates are provided with all materials and tools on the day, though bringing your own preferred multimeter and MFT is common practice.',
  },
  {
    question: 'What is the pass rate for the AM2?',
    answer:
      'EMTA does not publish official pass rate statistics publicly. Industry estimates based on training provider feedback suggest a first-attempt pass rate of approximately 70–75%. This means approximately one in four candidates fails on their first attempt. Failure does not prevent retaking the assessment — candidates can resit after a further period of preparation. Common failure reasons reported by training providers include: insufficient time management (not completing all tasks within the time allowance — the most common single cause of failure), incorrect or incomplete inspection and testing sequence, missing continuity of protective conductors test, loose cable terminations discovered during assessor inspection, incorrect polarity in wiring, and incorrect completion of the schedule of test results. All of these are preventable with adequate preparation.',
  },
  {
    question: 'Can I use my own test equipment in the AM2?',
    answer:
      'Test equipment policy varies between assessment centres. Most EMTA centres provide test equipment for candidates to use, but many centres also allow candidates to bring their own approved test instruments — particularly multimeters and MFTs that the candidate is familiar with. Using your own calibrated MFT during the AM2 is advantageous because you already know the instrument controls and can operate it quickly under pressure. Confirm the equipment policy with the specific assessment centre before the assessment day. If you bring your own equipment, ensure the calibration certificate is current — assessors may ask to see it. Test leads must be appropriately rated (CAT III 600V minimum).',
  },
  {
    question: 'What should I do if I fail the AM2?',
    answer:
      'First, request the detailed assessor feedback report from EMTA. The report identifies which tasks or elements of tasks were not completed correctly or within time. Review the feedback with your employer and training provider to identify the specific areas that need improvement. Most candidates who fail on time management need to practise each task repeatedly under strictly timed conditions until the task completion time is comfortably within the limit. Candidates who fail on testing sequence typically need to revisit the BS 7671 Chapter 61 inspection and testing sequence and practise the correct order of tests. Allow at least 4–6 weeks of focused preparation before reattempting. There is no statutory limit on the number of AM2 attempts, but your apprenticeship funding provider may have rules about the number of funded attempts.',
  },
  {
    question: 'What NVQ evidence do I need before booking the AM2?',
    answer:
      'Before a candidate can attempt the AM2, the employer and training provider must confirm that the apprenticeship standard requirements have been met. This typically requires: a completed NVQ Level 3 Diploma in Electrotechnical Technology (or equivalent evidence portfolio demonstrating competence against the apprenticeship standard); satisfactory progress reviews and employer sign-off; completed Maths and English at the required level (typically GCSE grade 4/C or Functional Skills Level 2); and readiness confirmation from the employer (who confirms the candidate has the necessary on-the-job experience). The training provider and employer submit a gateway review to EMTA confirming the candidate is ready for End Point Assessment. The candidate cannot self-register for the AM2 — it must be arranged through the employer and training provider.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/city-guilds-2365-unit-201',
    title: 'C&G 2365 Unit 201 — Health and Safety',
    description: 'HASAWA, COSHH, RIDDOR, and risk assessment revision guide.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-unit-202',
    title: 'C&G 2365 Unit 202 — Electrical Principles',
    description: 'Ohm\'s law, power calculations, series and parallel circuits, AC vs DC.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio-building-tips',
    title: 'Apprentice Portfolio Building Tips',
    description: 'NVQ evidence requirements, observation records, and portfolio organisation.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/supervising-electrical-apprentices',
    title: 'Supervising Electrical Apprentices',
    description: 'Employer obligations, AM2 support, and apprenticeship rates.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study the BS 7671 testing sequence used in the AM2 practical assessment.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/guides/city-guilds-2365-electrical',
    title: 'City & Guilds 2365 Complete Overview',
    description: 'Full qualification structure, units, assessment, and progression routes.',
    icon: Award,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is the AM2 Assessment?',
    content: (
      <>
        <p>
          The AM2 (Achievement Measure 2) is the practical End Point Assessment for electrical
          apprentices in England completing the Installation Electrician/Maintenance Electrician
          apprenticeship standard (ST0215). It is the final hurdle before an apprentice achieves
          their full electrical qualification and can apply for a JIB ECS Gold Card (Electrician
          level).
        </p>
        <p>
          The AM2 is administered by EMTA (Engineering and Manufacturing Training Association),
          which acts as the End Point Assessment Organisation (EPAO). It is conducted at approved
          EMTA assessment centres — typically further education colleges and private training
          providers with dedicated electrical installation training rigs. All AM2 assessors are
          EMTA-appointed and independent of the candidate's training provider.
        </p>
        <p>
          Unlike the theory exams (City & Guilds 2365 units) and the NVQ portfolio, the AM2 is
          a live practical assessment observed in real time by the assessor. Performance on the day
          — including speed, accuracy, and safety — directly determines the outcome. There is no
          "portfolio of evidence" element to the AM2: you either complete the tasks correctly within
          the time limit or you do not.
        </p>
        <p>
          This guide covers what the AM2 covers, how to book it, the pass rate and common failure
          points, and a 2–4 week focused preparation plan.
        </p>
      </>
    ),
  },
  {
    id: 'what-it-covers',
    heading: 'What the AM2 Covers: Five Practical Tasks',
    content: (
      <>
        <p>
          The AM2S (the current version for apprentices starting from 2017 onwards) involves
          approximately 16.5 hours of assessed practical work across 2.5 days. The five task areas
          are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-5">
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-yellow-400" />
              Task 1 — Containment Installation (AM2S only)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Install steel conduit and PVC conduit to a defined route, including bending steel
              conduit to specified angles (90° set, offset, saddle) using a conduit bender and
              forming junction boxes. Assessment criteria include accuracy of bends, correct
              fixings, and quality of finish. This task is not required in the original AM2.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-400" />
              Task 2 — Wiring Installation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Wire a consumer unit board to a wiring diagram within a time limit. Typically includes
              a ring final circuit, lighting circuit, cooker circuit, and radial circuit. All cables
              must be correctly routed, dressed, identified, and terminated. The consumer unit wiring
              must be neat, correctly phased, and comply with BS 7671. Assessment criteria include
              correct termination of every conductor, correct identification, cable routing, and
              overall standard of workmanship.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-green-400" />
              Task 3 — Inspection and Testing
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Carry out the full inspection and testing sequence on the installed board per
              BS 7671 Chapter 61. This includes visual inspection, continuity of protective conductors
              (R2), continuity of ring circuit conductors (R1, Rn, R2), insulation resistance (L-E,
              N-E, L-N), polarity, earth fault loop impedance (Ze and Zs), and RCD operation
              (trip time at IΔn and 5×IΔn). Record all results correctly on the schedule of test
              results in the correct format. The testing sequence must follow the correct BS 7671
              order — not all tests can be done with the board energised.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              Task 4 — Fault Diagnosis
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The assessor introduces pre-set faults into the board. Candidates must identify, locate,
              and rectify the faults using appropriate diagnostic instruments and logical fault-finding
              methodology. Common fault types include open circuits, short circuits, high-resistance
              joints, polarity faults, and earth faults. Candidates must not randomly swap or
              disconnect components — a systematic approach is expected. Document the fault, the
              diagnosis method, and the rectification.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Task 5 — Environmental and Commissioning
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Functional commissioning of the installed circuits, confirming correct operation of
              all protective devices, RCDs, and socket outlets. Environmental task typically involves
              questions about energy efficiency, waste disposal, and sustainable installation practice.
              The EIC (Electrical Installation Certificate) or schedule of test results must be
              correctly completed for the work carried out.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'booking',
    heading: 'How to Book the AM2',
    content: (
      <>
        <p>
          The AM2 booking process cannot be initiated by the candidate directly — it is managed by
          the employer and training provider as part of the End Point Assessment gateway process:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">1</div>
              <div><strong>Complete the NVQ portfolio</strong> — all mandatory units must be signed off by the assessor and independent verifier.</div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">2</div>
              <div><strong>Gateway review</strong> — employer and training provider confirm the candidate meets all apprenticeship standard requirements and is ready for End Point Assessment. This is submitted to EMTA.</div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">3</div>
              <div><strong>EMTA schedules the assessment</strong> — EMTA confirms the assessment date and centre. Lead time from gateway submission to assessment date is typically 4–12 weeks depending on centre availability.</div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">4</div>
              <div><strong>Candidate preparation period</strong> — use the confirmed date to plan a focused 2–4 week preparation schedule (see below).</div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shrink-0">5</div>
              <div><strong>Attend assessment</strong> — arrive at the EMTA centre with required PPE, test equipment (if permitted), and JIB registration. The assessment typically starts at 08:00.</div>
            </li>
          </ol>
        </div>
        <p>
          Contact EMTA at emta.org.uk for a full list of approved assessment centres. Assessment
          centre places fill quickly — employers should submit gateway reviews as early as possible
          once the candidate is genuinely ready.
        </p>
      </>
    ),
  },
  {
    id: 'pass-rate',
    heading: 'Pass Rate and Common Failure Reasons',
    content: (
      <>
        <p>
          The AM2 first-attempt pass rate is estimated at approximately 70–75%. Understanding the
          common reasons for failure is the most efficient way to prepare. The four most frequent
          failure causes are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor time management (most common):</strong> Candidates who have not practised
                under timed conditions frequently run out of time before completing all tasks. Each task
                has a strict time allocation. Running over time on any task causes a mandatory fail for
                that task. Timed practice of every task individually, and then the full day as a whole,
                is the single most important preparation activity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect testing sequence:</strong> Carrying out insulation resistance tests
                on energised circuits, or performing polarity after insulation resistance without
                restoring connections, results in test failures. Memorise and practise the correct
                BS 7671 Chapter 61 testing sequence until it is automatic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose or missing terminations:</strong> Assessors physically check every
                termination in the board. A loose conductor, a missing neutral in a terminal block,
                or a conductor trapped under the wrong screw causes an immediate fail for workmanship.
                Build the habit of checking every termination after completing each circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incorrect schedule of test results:</strong> Incorrectly recording test
                results, using the wrong units, or leaving mandatory fields blank results in a fail
                for the documentation task. Practise completing the schedule of test results under
                time pressure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'preparation',
    heading: 'Preparation Timeline: 2–4 Weeks of Focused Practice',
    content: (
      <>
        <p>
          The AM2 rewards candidates who have practised the specific tasks under realistic conditions.
          The following 4-week plan has been recommended by UK electrical training providers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-4">
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-400" />
              Week 1 — Knowledge Review
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Revise BS 7671 Chapter 61 inspection and testing sequence. Review the wiring diagrams
              for a standard domestic consumer unit — ring final, lighting, cooker. Practise
              completing a schedule of test results from memory. Review fault-finding methodology:
              logical elimination, half-split technique, voltage measurement approach.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              Week 2 — Skill Practice (Untimed)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Wire the consumer unit board to the AM2 wiring diagram — accuracy and quality first,
              speed second. Carry out the full testing sequence, identifying the correct order of
              tests at each stage. Practise conduit bending (AM2S): 90° bends, sets, and offsets
              to specific dimensions. Focus on consistent quality, not speed.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-400" />
              Week 3 — Timed Practice
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Repeat each task against the AM2 time allowance. Identify which tasks are taking longer
              than allocated. Focus extra practice on the slow tasks. Practise the full test sequence
              at speed — instrument setup, measurement, recording — all within the time limit.
              Simulate the fault-finding task with a colleague or training provider introducing faults.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              Week 4 — Full Simulation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Complete a full AM2 simulation day — all tasks in sequence under time pressure, with
              assessor-style observation from your employer or training provider. Review any areas
              of weakness. The day before the assessment, rest and ensure your equipment is ready
              (calibrated MFT, charged batteries, PPE complete).
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Study inspection and testing for the AM2 with AI"
          description="Elec-Mate's inspection and testing module covers the full BS 7671 testing sequence, schedule of test results completion, and common fault-finding scenarios — everything you need for AM2 preparation."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'on-the-day',
    heading: 'On the Day: What to Expect',
    content: (
      <>
        <p>
          Knowing what to expect on AM2 assessment day reduces anxiety and allows you to focus on
          performance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Arrive early:</strong> AM2 assessments typically begin at 08:00. Arrive at least 30 minutes early to register, check your workstation, and settle in. Late arrival can forfeit assessment time.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Required PPE:</strong> Safety footwear, work trousers (not shorts), and any additional PPE specified by the centre. The assessor will check PPE at the start.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Equipment check:</strong> Confirm your MFT calibration certificate is current if bringing your own equipment. Ensure batteries are fully charged. Check test leads for damage.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Read the brief carefully:</strong> You will be given the wiring diagram and task brief at the start. Read it thoroughly before touching any tools. Clarify any queries with the assessor before the clock starts.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Manage your time actively:</strong> Keep an eye on the time throughout each task. If you are running behind, prioritise completing tasks over perfecting workmanship.</span>
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

export default function AM2AssessmentPrepPage() {
  return (
    <GuideTemplate
      title="AM2 Assessment Preparation Guide UK | EMTA Practical Assessment for Electricians"
      description="Complete preparation guide for the AM2 practical assessment for electrical apprentices. What the AM2 covers, how to book, pass rate, common failure reasons, and a 2–4 week focused preparation plan for the EMTA End Point Assessment."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          AM2 Assessment Preparation:{' '}
          <span className="text-yellow-400">How to Pass the EMTA Practical Assessment First Time</span>
        </>
      }
      heroSubtitle="The AM2 is the final practical hurdle before qualifying as an electrician. This guide covers what it involves, how to book it, why candidates fail, and a focused 2–4 week preparation plan to maximise your chance of passing first time."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the AM2 Practical Assessment"
      relatedPages={relatedPages}
      ctaHeading="Prepare for the AM2 with AI-Powered Study and Practice Scenarios"
      ctaSubheading="Join thousands of UK electrical apprentices using Elec-Mate to study the BS 7671 testing sequence, practice fault-finding scenarios, and prepare for the AM2 assessment. 7-day free trial."
    />
  );
}
