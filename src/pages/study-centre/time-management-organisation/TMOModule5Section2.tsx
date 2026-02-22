import { ArrowLeft, RotateCw, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'tmo-5-2-morning',
    question:
      'An electrician starts each day by checking social media in the van for 20 minutes, then drives to the first job without confirming the appointment or checking materials. Which principle does this violate?',
    options: [
      'The end-of-day routine principle — they should have planned the night before',
      'The morning routine principle — the first 30 to 60 minutes set the tone for the entire day and should be used deliberately',
      'The weekly routine principle — social media should only be used on Fridays',
      'No principle is violated — checking social media is a valid way to start the day',
    ],
    correctIndex: 1,
    explanation:
      'The morning routine principle states that the first 30 to 60 minutes of the working day set the tone for everything that follows. Using this time for social media rather than a structured routine (schedule review, appointment confirmation, materials check) means the day starts reactively rather than proactively. The electrician risks arriving at a job that has been cancelled, arriving without the correct materials, or spending the drive feeling unfocused. A 10-minute morning routine would eliminate all three risks.',
  },
  {
    id: 'tmo-5-2-weekly',
    question:
      'A self-employed electrician does their invoicing, material ordering, and admin whenever they find spare moments during the week. What is the primary risk of this approach?',
    options: [
      'They will complete too much admin and not enough on-site work',
      'Tasks that lack a scheduled time tend to be perpetually delayed, creating end-of-month crises and cash flow problems',
      'Invoicing should only be done by an accountant, not by the electrician',
      'There is no risk — flexible admin scheduling is more productive than rigid blocks',
    ],
    correctIndex: 1,
    explanation:
      'Without a dedicated time block, admin tasks like invoicing compete with the urgency of on-site work and consistently lose. The result is delayed invoices (hurting cash flow), forgotten material orders (causing mid-job merchant trips), and paperwork backlogs that become stressful end-of-month crises. A weekly routine — for example, Friday afternoon for invoicing and certificate completion — ensures these essential tasks happen reliably. The routine removes the need for willpower by making the time non-negotiable.',
  },
  {
    id: 'tmo-5-2-flexibility',
    question:
      'Having a structured routine means you must follow it rigidly, even when unexpected urgent work arises. True or false?',
    options: [
      'True — the whole point of a routine is that it never changes',
      'False — a good routine provides structure with built-in flexibility, and knowing your default plan makes it easier to make deliberate exceptions rather than chaotic reactions',
      'True — any deviation from the routine resets your habits to zero',
      'False — routines are only useful for office workers, not tradespeople',
    ],
    correctIndex: 1,
    explanation:
      'Structure and flexibility are not opposites — they are complementary. A routine is a default plan, not a rigid law. When an emergency call-out arises, the routine tells you exactly what you are rescheduling and helps you decide whether the interruption is worth it. Without a routine, every day is improvised, and there is no baseline to deviate from. The key insight is that having a plan makes unplanned events easier to handle, not harder, because you know what you are sacrificing and can consciously choose.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long should a morning routine take for a tradesperson?',
    answer:
      'A practical morning routine for a self-employed electrician should take between 10 and 20 minutes. The core elements — reviewing the schedule, confirming the first appointment, checking materials, and mentally preparing for the day — can all be completed in under 15 minutes. The trap to avoid is making the routine so long that it feels like a chore and gets abandoned. Start with just 3 items (review schedule, confirm first job, check van stock) and add more only when those 3 are fully automatic. A short routine that you do every day is infinitely more valuable than a comprehensive routine that you abandon after a week.',
  },
  {
    question: 'What if my days are too unpredictable for a routine?',
    answer:
      'This is the most common objection, and it confuses predictability of tasks with predictability of structure. Your specific jobs may change daily, but the structure around them can be consistent. You can always review the schedule (even if it changes), always confirm the first appointment, always check materials, and always do a 5-minute plan at the end of the day. Emergency call-outs, cancellations, and changes happen within the routine, not instead of it. In fact, having a routine makes unpredictable days easier to manage because you have a stable framework to adapt from rather than pure improvisation.',
  },
  {
    question: 'Should I have different routines for different types of days?',
    answer:
      'Yes, and this is a sign of sophistication rather than complexity. Many electricians develop 2 or 3 routine templates: a "domestic day" routine (multiple small jobs, lots of driving, materials check critical), a "commercial day" routine (single site, site induction, different safety requirements), and an "admin day" routine (office-based, invoicing, planning, CPD). The morning and evening bookends stay largely the same, but the middle of the day adapts to the work type. Having pre-built templates for common day types is far more efficient than planning from scratch every morning.',
  },
  {
    question:
      'How do I build a routine when I work for an employer and do not control my schedule?',
    answer:
      "Employed electricians have less control over the middle of their day but full control over the bookends. Your morning routine (before arriving at site) and end-of-day routine (after leaving site) are entirely within your control. You can also build micro-routines within the working day: a 2-minute routine when arriving at each new job (check scope, assess risks, confirm materials), a 3-minute routine when finishing each job (photograph, note observations, tidy up), and a 5-minute end-of-shift routine (update timesheets, note tomorrow's first job, clean tools). These small routines compound over time and set you apart as a reliable, well-organised professional.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'The primary purpose of a morning routine for a tradesperson is to:',
    options: [
      'Delay starting work so that rush-hour traffic clears',
      'Set the tone for the day by ensuring the schedule, appointments, and materials are confirmed before leaving home',
      'Complete all admin tasks before any on-site work begins',
      'Practise mindfulness and meditation for improved focus',
    ],
    correctAnswer: 1,
    explanation:
      'The morning routine is not about relaxation or admin — it is about preparation. The first 30 to 60 minutes set the trajectory for the entire day. A structured morning routine ensures you know where you are going, that the client is expecting you, and that you have the materials you need. This eliminates the three most common time wasters for tradespeople: arriving at cancelled jobs, arriving without materials, and spending the morning drive trying to remember what is scheduled.',
  },
  {
    id: 2,
    question: 'A pre-work checklist for an electrician should include all of the following EXCEPT:',
    options: [
      "Reviewing the day's schedule and job details",
      'Confirming the first appointment with the client',
      'Checking that required materials and tools are in the van',
      "Completing the previous day's invoices and certificates",
    ],
    correctAnswer: 3,
    explanation:
      'Invoices and certificates belong in the end-of-day or weekly admin routine, not the pre-work checklist. The pre-work checklist should be fast (under 10 minutes) and focused exclusively on ensuring you are prepared for the day ahead: schedule review, first job confirmation, and materials/tools check. Adding admin tasks to the morning routine creates a bottleneck that delays departure and is likely to be skipped on busy mornings, undermining the entire routine.',
  },
  {
    id: 3,
    question: 'The end-of-day routine concept of "closing the loop" refers to:',
    options: [
      'Physically locking the van and tool storage at the end of each day',
      'Ensuring that every job started during the day has its documentation, photographs, and notes completed before finishing work',
      'Sending a summary email to every client visited that day',
      'Completing a full tool inventory every evening',
    ],
    correctAnswer: 1,
    explanation:
      '"Closing the loop" means ensuring that no job from today carries forward as incomplete documentation into tomorrow. When you leave a job without photographing the work, noting observations, or updating the job file, you create an open loop — a piece of unfinished business that occupies mental bandwidth and becomes harder to complete accurately as memory fades. The end-of-day routine closes every loop: photographs taken, notes written, job files updated, tomorrow planned.',
  },
  {
    id: 4,
    question: 'Routines reduce "decision fatigue" because:',
    options: [
      'They eliminate all decisions from the working day, creating a fully automated schedule',
      'They handle recurring low-value decisions automatically, preserving mental energy for the high-value decisions that require genuine thought',
      'They prevent tradespeople from needing to think about anything other than technical work',
      'Decision fatigue is a myth — humans can make unlimited decisions without quality degradation',
    ],
    correctAnswer: 1,
    explanation:
      'Decision fatigue is a well-documented psychological phenomenon: the quality of decisions deteriorates after a long session of decision-making. Research by Roy Baumeister and others has demonstrated that willpower and decision-making capacity draw from the same limited pool of mental energy. Routines automate recurring decisions (when to do admin, what order to check things, how to start the day) so that your finite decision-making capacity is preserved for the complex, high-stakes decisions that genuinely require it — like diagnosing a fault or pricing a complex job.',
  },
  {
    id: 5,
    question: 'A recommended weekly routine for a self-employed electrician would include:',
    options: [
      'A full van deep clean, financial audit, and business plan review every Friday',
      'A planning session, invoicing block, material ordering session, and dedicated admin time at consistent weekly intervals',
      'No weekly routine — daily routines are sufficient for all administrative needs',
      'A full day off every week with no work-related tasks permitted',
    ],
    correctAnswer: 1,
    explanation:
      'The weekly routine handles tasks that do not need daily attention but cannot be left to chance. A planning session (reviewing the coming week and confirming appointments), an invoicing block (sending all outstanding invoices), a material ordering session (batching orders to reduce merchant trips), and an admin block (certificates, paperwork, compliance) form the core weekly rhythm. These tasks must have a scheduled time — without one, they are perpetually delayed by the perceived urgency of on-site work.',
  },
  {
    id: 6,
    question: 'The monthly routine for a tradesperson should include:',
    options: [
      'Only financial tasks — monthly routines are about money management',
      'A financial review, pipeline check, CPD planning, and van deep clean — addressing tasks that compound if neglected',
      'A complete overhaul of all daily and weekly routines',
      'Monthly routines are unnecessary if daily and weekly routines are functioning well',
    ],
    correctAnswer: 1,
    explanation:
      'Monthly routines catch the tasks that slip through daily and weekly nets. A financial review (checking income vs expenditure, chasing overdue invoices) prevents cash flow surprises. A pipeline check (reviewing upcoming work, identifying quiet periods) enables proactive marketing. CPD planning (booking courses, reading regulations updates) ensures professional development does not stall. A van deep clean (clearing accumulated waste, restocking, checking tools) maintains the mobile workshop. These tasks compound if neglected — a quarter without a financial review can mean a serious cash flow crisis.',
  },
  {
    id: 7,
    question: 'Building flexibility into a routine means:',
    options: [
      'Having no fixed schedule and responding entirely to whatever comes up',
      'Following the routine only on days when you feel motivated',
      'Having a clear default plan while accepting that some days will require deliberate, conscious deviations',
      'Changing the entire routine every week to prevent boredom',
    ],
    correctAnswer: 2,
    explanation:
      'Flexibility within structure means having a default plan that you follow on most days, while recognising that some days will require adaptation. The key word is "deliberate" — when you deviate from the routine, you do so consciously, knowing what you are rescheduling and why. This is fundamentally different from having no routine at all, where every decision is improvised and nothing has a default time. A tradesperson who has a Friday admin routine but deliberately moves it to Saturday because of an emergency call-out is being flexible. A tradesperson who has no admin routine and simply never gets around to it is being chaotic.',
  },
  {
    id: 8,
    question:
      'The concept of a "Friday afternoon routine" for a self-employed electrician would typically include:',
    options: [
      'Finishing early and starting the weekend',
      "Completing and sending all outstanding invoices, finishing certificates, and planning the following week's schedule",
      'Deep cleaning the van and reorganising all tools',
      'Making sales calls and marketing the business',
    ],
    correctAnswer: 1,
    explanation:
      'The Friday afternoon routine is one of the most impactful weekly habits for self-employed tradespeople. It combines three critical activities: invoicing (ensuring cash flow is maintained and no work goes unbilled), certificate completion (closing the loop on documentation from the week), and next-week planning (confirming appointments, identifying material needs, and spotting potential scheduling issues). This creates a clean transition into the weekend — no outstanding invoices nagging at you, no certificates to remember on Monday, and a clear plan ready for the following week.',
  },
];

export default function TMOModule5Section2() {
  useSEO({
    title: 'Creating Routines That Work | Time Management & Organisation Module 5.2',
    description:
      'Morning routines, pre-work checklists, end-of-day routines, weekly and monthly routines, and building flexibility into structure for tradespeople.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <RotateCw className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Creating Routines That Work
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Morning routines, pre-work checklists, end-of-day routines, weekly and monthly rhythms,
            and building flexibility into structure for tradespeople
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Morning routine:</strong> First 30&ndash;60 minutes set the tone for the
                entire day
              </li>
              <li>
                <strong>Pre-work checklist:</strong> Schedule, confirmation, materials &mdash; under
                10 minutes
              </li>
              <li>
                <strong>End-of-day:</strong> Close every loop before finishing work
              </li>
              <li>
                <strong>Weekly/monthly:</strong> Catch the tasks that slip through daily routines
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Decision fatigue:</strong> Routines automate low-value decisions, preserving
                energy for complex ones
              </li>
              <li>
                <strong>Cash flow:</strong> Regular invoicing routines prevent payment delays
              </li>
              <li>
                <strong>Reliability:</strong> Clients trust professionals who never forget, never
                miss, never scramble
              </li>
              <li>
                <strong>Wellbeing:</strong> Routines reduce the mental load of constantly planning
                from scratch
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Design a practical morning routine that takes under 15 minutes and eliminates the most common start-of-day time wasters',
              'Create a pre-work checklist covering schedule review, appointment confirmation, and materials verification',
              'Implement an end-of-day "closing the loop" routine that ensures no job carries forward as incomplete documentation',
              'Build a weekly rhythm that includes planning, invoicing, material ordering, and admin at consistent intervals',
              'Establish monthly routines for financial review, pipeline management, CPD planning, and van maintenance',
              'Explain how routines reduce decision fatigue and why flexibility within structure is more productive than no structure',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Morning Routine */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Morning Routine &mdash; Setting the Tone
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The first 30 to 60 minutes of your working day have a disproportionate impact on
                everything that follows. Research on morning routines consistently shows that people
                who start the day with a deliberate, structured sequence of activities report higher
                productivity, lower stress, and greater feelings of control throughout the day.
                Conversely, people who start reactively &mdash; checking their phone, scrolling
                social media, responding to whatever notification is loudest &mdash; tend to remain
                in reactive mode for the rest of the day, constantly firefighting rather than
                executing a plan.
              </p>

              <p>
                For tradespeople, the morning routine is not about meditation or journaling (though
                those have value for some people). It is about <strong>preparation</strong>. The
                three questions that a morning routine must answer before you leave the house are:
                Where am I going? Is the client expecting me? Do I have everything I need? An
                electrician who can answer all three confidently has eliminated the three most
                common sources of wasted time: arriving at a cancelled or rescheduled job, arriving
                without the correct materials or tools, and spending the drive trying to remember
                what was planned.
              </p>

              <p>
                A practical morning routine for a self-employed electrician might look like this:
                (1) Review the day&rsquo;s schedule &mdash; 2 minutes. (2) Confirm the first
                appointment by text or call &mdash; 2 minutes. (3) Check that the van has the
                materials needed for the first two jobs &mdash; 5 minutes. (4) Review any
                outstanding messages from the previous evening &mdash; 3 minutes. Total: 12 minutes.
                This is not a burden; it is an investment. Those 12 minutes routinely save 30 to 60
                minutes of wasted time during the day. And because it happens at the same time, in
                the same order, every single working day, it quickly becomes automatic.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Electrician&rsquo;s Morning Routine Template
                </p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <ul className="space-y-1">
                    <li>1. Review today&rsquo;s schedule and job details (2 mins)</li>
                    <li>2. Confirm first appointment &mdash; text or call (2 mins)</li>
                    <li>3. Check van materials against first two jobs (5 mins)</li>
                    <li>4. Review outstanding messages and voicemails (3 mins)</li>
                    <li>
                      5. Mentally walk through the first job &mdash; scope, access, any special
                      requirements (2 mins)
                    </li>
                  </ul>
                  <p className="mt-3 text-white">
                    <strong>Total: 14 minutes.</strong> This routine prevents cancelled-job
                    arrivals, missing-material trips, and the disoriented start that comes from
                    winging it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Pre-Work Checklist */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Pre-Work Checklist &mdash; Never Arrive Unprepared
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The pre-work checklist is a subset of the morning routine focused specifically on
                operational readiness. Aviation uses pre-flight checklists because the cost of
                forgetting something at 30,000 feet is catastrophic. The stakes for electricians are
                different but the principle is identical: arriving at a job without the right
                materials, without confirming the client will be home, or without understanding the
                scope of the work costs time, money, and professional reputation. A simple
                checklist, followed consistently, eliminates these failures.
              </p>

              <p>
                The checklist should live somewhere visible &mdash; a laminated card on the van
                dashboard, a recurring phone reminder, or a pinned note in your scheduling app. The
                content is straightforward: <strong>Schedule confirmed?</strong> (Do I know where I
                am going and in what order?) <strong>First appointment confirmed?</strong>
                (Has the client acknowledged today&rsquo;s time?){' '}
                <strong>Materials checked?</strong>
                (Do I have what I need for the first job, and ideally the second?)
                <strong> Tools checked?</strong> (Is anything missing, flat, or out of calibration?)
                <strong> Paperwork ready?</strong> (Do I have the correct forms, certificates, or
                access to digital records?) These five checks take under 10 minutes and prevent the
                most common operational failures.
              </p>

              <p>
                The power of the checklist is not in its complexity but in its consistency. Atul
                Gawande&rsquo;s <em>The Checklist Manifesto</em> (2009) demonstrated that even
                experienced professionals in high-stakes fields (surgery, aviation, construction)
                benefit enormously from simple checklists because they catch the errors that
                expertise alone does not prevent. You do not use a checklist because you are
                incompetent; you use one because you are professional enough to know that memory is
                unreliable under pressure, fatigue, or routine.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: The Cost of No Checklist
                </p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician drives 35 minutes to a kitchen rewire and discovers the client is
                  not home &mdash; they had rescheduled by email the previous evening. The
                  electrician did not check emails that morning. The round trip wastes over an hour,
                  plus the mental disruption of replanning the day on the fly. A 2-minute
                  &ldquo;first appointment confirmed?&rdquo; check would have caught this. The same
                  electrician arrives at the next job but has left the 6mm twin and earth at the
                  last site. A 5-minute materials check would have caught this. Total time wasted:
                  approximately 2 hours. Time the checklist would have taken: 10 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: End-of-Day Routine */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The End-of-Day Routine &mdash; Closing the Loop
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The end-of-day routine is where most tradespeople have the biggest gap &mdash; and
                the biggest opportunity. After a long day of physical work, the temptation to simply
                pack up and go home is powerful. But the 15 to 20 minutes you invest in an
                end-of-day routine pays dividends that compound daily. The core principle is{' '}
                <strong>&ldquo;closing the loop&rdquo;</strong> &mdash; ensuring that every piece of
                work from today is documented, every tool is accounted for, and tomorrow is planned
                before you switch off.
              </p>

              <p>
                The concept of &ldquo;open loops&rdquo; comes from the <em>Zeigarnik effect</em>, a
                psychological phenomenon discovered by Bluma Zeigarnik in the 1920s: uncompleted
                tasks occupy more mental space than completed ones. When you leave a job without
                photographing the work, without writing up your observations, without updating the
                job file, you create an open loop. That loop nags at you subconsciously &mdash;
                during the drive home, during dinner, during the evening. And when you finally get
                to it days later, your memory of the details has degraded, the certificate takes
                longer to write, and the quality of the documentation suffers.
              </p>

              <p>
                An effective end-of-day routine has five components: <strong>tool clean-up</strong>
                (wipe down, check for damage, return to designated positions);{' '}
                <strong>van tidy</strong> (clear waste, reorganise disturbed stock, note any
                materials that need replenishing); <strong>next-day preparation</strong> (review
                tomorrow&rsquo;s schedule, check material needs, set a mental plan);{' '}
                <strong>job notes</strong>
                (update job files with photographs, observations, and completion status); and{' '}
                <strong>closing the loop</strong> (ensure nothing from today carries forward as an
                undocumented, unfinished task). This entire sequence takes 15 to 20 minutes and
                transforms the quality of your mornings, your documentation, and your peace of mind.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  End-of-Day Routine Template
                </p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <ul className="space-y-1">
                    <li>1. Tool clean-up: wipe, check, return to positions (3 mins)</li>
                    <li>2. Van tidy: clear waste, note depleted materials (3 mins)</li>
                    <li>
                      3. Job notes: photograph work, update job files, note observations (5 mins)
                    </li>
                    <li>
                      4. Next-day prep: review tomorrow&rsquo;s schedule, check material needs (3
                      mins)
                    </li>
                    <li>
                      5. Close the loop: confirm no incomplete documentation or follow-ups (2 mins)
                    </li>
                  </ul>
                  <p className="mt-3 text-white">
                    <strong>Total: 16 minutes.</strong> This routine eliminates Monday-morning
                    scrambles, stale job notes, and the nagging feeling that something has been
                    forgotten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Weekly and Monthly Routines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Weekly &amp; Monthly Routines &mdash; The Bigger Rhythms
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Daily routines handle the operational rhythm of each working day. But there are
                critical tasks that do not need daily attention yet cannot be left to chance. These
                are the weekly and monthly tasks &mdash; invoicing, planning, ordering, financial
                review, CPD, van maintenance &mdash; that, when neglected, create the crises that
                derail entire weeks. The solution is to give each task a scheduled, non-negotiable
                time slot in your weekly and monthly calendar.
              </p>

              <p>
                A <strong>weekly routine</strong> for a self-employed electrician typically includes
                four blocks: a <strong>planning session</strong> (reviewing the coming week,
                confirming all appointments, identifying potential scheduling conflicts); an{' '}
                <strong>invoicing block</strong> (sending all outstanding invoices and chasing any
                overdue payments); a <strong>material ordering session</strong> (batching all orders
                to reduce ad-hoc merchant trips); and an <strong>admin block</strong> (completing
                certificates, filing documentation, responding to non-urgent emails). Many
                electricians find that a Monday morning planning session and a Friday afternoon
                admin and invoicing block create the ideal weekly rhythm. Monday morning sets the
                week up; Friday afternoon closes it down cleanly.
              </p>

              <p>
                The <strong>monthly routine</strong> catches bigger-picture items that slip through
                weekly nets. A <strong>financial review</strong> (checking actual income versus
                projected, chasing aged debts, reviewing expenses) takes 30 minutes and prevents
                cash flow surprises. A <strong>pipeline check</strong> (how much work is booked for
                the next 4 to 8 weeks?) allows proactive marketing rather than panic when the diary
                goes quiet. <strong>CPD planning</strong> (is there a course to book, a regulation
                update to read, a new skill to develop?) prevents the common trap of only thinking
                about professional development when registration renewal is due. And a{' '}
                <strong>van deep clean</strong> (clearing accumulated waste, restocking consumables,
                checking tool calibration dates) maintains the mobile workshop that is the
                foundation of daily operations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: Weekly Rhythm
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Monday morning (30 mins):</strong> Review the week&rsquo;s schedule,
                      confirm all appointments, identify material needs, order anything required for
                      Tuesday onwards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Wednesday lunchtime (15 mins):</strong> Mid-week check &mdash; are we
                      on track? Any jobs slipping? Any materials running low?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Friday afternoon (60 mins):</strong> Send all invoices, complete all
                      certificates, plan the following week, batch material orders for Monday
                      delivery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong>Sunday evening (15 mins):</strong> Quick mental review of
                      Monday&rsquo;s jobs, check the van is stocked, set the alarm
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Decision Fatigue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Power of Consistency &mdash; Defeating Decision Fatigue
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The hidden benefit of routines is that they dramatically reduce{' '}
                <strong>decision fatigue</strong> &mdash; the deterioration of decision quality
                after a long session of decision-making. Research by <strong>Roy Baumeister</strong>{' '}
                and colleagues has demonstrated that willpower and decision-making draw from the
                same limited pool of mental energy. Every decision you make during the day, no
                matter how small, depletes that pool. By the time you reach the afternoon, your
                capacity for good decisions is measurably reduced.
              </p>

              <p>
                For tradespeople, decision fatigue is a real and practical problem. A typical day
                involves dozens of decisions: what order to do the jobs, what route to drive, what
                materials to bring, how to approach a tricky installation, when to take a break,
                whether to answer a phone call mid-task, how to deal with an unexpected
                complication. Each decision, however small, costs mental energy. If you also have to
                decide when to do your invoicing, when to plan the week, when to order materials,
                and when to do your admin, you are adding unnecessary decisions to an already
                demanding day.
              </p>

              <p>
                Routines remove these unnecessary decisions by providing automatic answers. You do
                not decide when to do invoicing &mdash; it happens Friday afternoon, always. You do
                not decide when to plan the week &mdash; it happens Monday morning, always. You do
                not decide whether to photograph the job &mdash; it happens after every completion,
                always. Each automated decision frees up mental energy for the decisions that
                genuinely require it: diagnosing a complex fault, pricing a bespoke installation, or
                handling a difficult client conversation. This is why the most productive people in
                any field tend to have the most routine-driven lives &mdash; they protect their
                decision-making capacity for the things that matter most.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: Decision Fatigue in Action
                </p>
                <p className="text-sm text-white leading-relaxed">
                  An electrician without routines faces these decisions every day: &ldquo;When
                  should I do my invoicing? Should I order materials now or later? Do I need to
                  confirm tomorrow&rsquo;s appointments? When will I write up these certificates?
                  Should I tidy the van now or tomorrow?&rdquo; Each decision costs energy. By 3pm,
                  after a morning of technical work and client interactions, the electrician is
                  mentally depleted and defaults to the easy option on every remaining decision:
                  skip the invoicing, delay the material order, forget the certificate, ignore the
                  van. An electrician with routines does not face any of these decisions &mdash;
                  they are pre-made. The mental energy is available for the complex technical
                  problem they encounter at 3:30pm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Flexibility Within Structure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Building Flexibility into Structure
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most common objection to routines is: &ldquo;My days are too unpredictable for a
                routine.&rdquo; This objection confuses two different things. The specific{' '}
                <em>tasks</em> you do each day may vary enormously &mdash; a consumer unit change on
                Monday, an EICR on Tuesday, a rewire on Wednesday. But the <em>structure</em> around
                those tasks can be remarkably consistent: how you start the day, how you prepare for
                each job, how you close out each job, how you end the day, when you do admin. The
                routine is the frame; the work is the picture. Different pictures fit into the same
                frame.
              </p>

              <p>
                Building flexibility into structure means accepting that some days will deviate from
                the routine &mdash; and that this is fine. An emergency call-out at 7am might mean
                skipping the morning materials check. A job that overruns might mean moving the
                end-of-day routine to the following morning. The key is that deviations are{' '}
                <strong>deliberate and conscious</strong> rather than chaotic and habitual. When you
                have a routine, you know exactly what you are sacrificing when you deviate, and you
                can make an informed decision about whether the deviation is worth it. When you have
                no routine, every day is improvised, nothing has a default time, and important tasks
                (invoicing, planning, documentation) are perpetually deferred.
              </p>

              <p>
                The paradox of routines is that they make you <em>more</em> adaptable, not less. A
                military unit with well-drilled standard operating procedures can adapt to
                unexpected situations faster than an undisciplined group, because the routine
                handles the basics automatically, freeing cognitive resources for the novel
                challenge. The same principle applies to tradespeople. The electrician with a
                rock-solid morning routine handles a last-minute schedule change calmly &mdash; the
                routine has already confirmed appointments and checked materials, so the disruption
                is minimised. The electrician without a routine is already scrambling, and the
                schedule change becomes the crisis that derails the entire morning.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Flexibility Framework</p>
                <div className="text-sm text-white space-y-2 mt-3">
                  <p>
                    <strong>Non-negotiable (do these every day, no exceptions):</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>&bull; Review the day&rsquo;s schedule before leaving home</li>
                    <li>&bull; Photograph every completed job</li>
                    <li>&bull; 5-minute next-day plan before finishing work</li>
                  </ul>
                  <p className="mt-3">
                    <strong>
                      Flexible (do these at their scheduled time unless something genuinely urgent
                      overrides):
                    </strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>
                      &bull; Friday afternoon invoicing (can move to Saturday morning if needed)
                    </li>
                    <li>&bull; Monday morning planning (can move to Sunday evening if needed)</li>
                    <li>
                      &bull; Mid-week material ordering (can bring forward if stock is critical)
                    </li>
                  </ul>
                  <p className="mt-3 text-white">
                    <strong>The rule:</strong> Non-negotiables happen regardless. Flexible items
                    move but never disappear &mdash; if they get bumped, they must be rescheduled
                    immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided a practical framework for building routines that support
                productivity, reduce stress, and eliminate the most common time traps in
                construction and electrical work. The key points are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The morning routine</strong> (10&ndash;15 minutes) sets the tone for the
                    entire day. Schedule review, first appointment confirmation, and materials check
                    are the minimum essentials.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The pre-work checklist</strong> prevents the three most common time
                    wasters: cancelled-job arrivals, missing materials, and unfocused starts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The end-of-day routine</strong> (15&ndash;20 minutes) closes every loop:
                    tools, van, job notes, next-day prep, and documentation. Open loops occupy
                    mental space and degrade over time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Weekly routines</strong> (planning, invoicing, ordering, admin) and{' '}
                    <strong>monthly routines</strong> (financial review, pipeline, CPD, van
                    maintenance) catch tasks that slip through daily routines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Routines reduce decision fatigue</strong> by automating recurring
                    low-value decisions, preserving mental energy for the complex decisions that
                    genuinely require it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Flexibility within structure</strong> means having a clear default plan
                    and making deliberate exceptions when necessary &mdash; not abandoning all
                    structure because some days are unpredictable.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will tackle
                  procrastination &mdash; why we do it, what triggers it, and practical strategies
                  for overcoming it. You will learn the &ldquo;just 5 minutes&rdquo; rule, the
                  &ldquo;eat the frog&rdquo; method, and why procrastination is an emotional
                  regulation problem, not a laziness problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-5-section-3">
              Next: Overcoming Procrastination
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
