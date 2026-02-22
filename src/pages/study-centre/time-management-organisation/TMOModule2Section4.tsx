import { ArrowLeft, Layers, CheckCircle } from 'lucide-react';
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
    id: 'tmo-2-4-check1',
    question:
      'An electrician currently has 6 active jobs at various stages. According to cognitive load research, what is the most likely consequence of maintaining this many concurrent projects?',
    options: [
      'They will be more efficient because they can switch between jobs when one stalls',
      'They will experience reduced performance across all jobs — more errors, forgotten commitments, and slower progress on each individual project',
      'There is no cognitive limit — experienced tradespeople can manage unlimited concurrent jobs',
      'The only risk is physical exhaustion, not mental performance',
    ],
    correctIndex: 1,
    explanation:
      "Research on cognitive load and work-in-progress limits consistently shows that performance degrades as the number of active concurrent projects increases beyond 3-4. Miller's Law (1956) established that working memory capacity is approximately 7±2 items, but active project management requires far more cognitive bandwidth than simply remembering items. Each active job occupies mental space: client expectations, material orders, scheduling, pending decisions, follow-ups. Beyond 3-4 active projects, the overhead of context-switching, remembering status, and managing dependencies starts to exceed the productive work being done on any individual job.",
  },
  {
    id: 'tmo-2-4-check2',
    question:
      'A client calls to cancel a job that was scheduled for next Wednesday. The electrician had already ordered materials. What is the most professional and productive response?',
    options: [
      'Demand full payment because the materials have been ordered',
      'Accept the cancellation gracefully, confirm whether materials can be returned or used elsewhere, and use the freed-up time productively by contacting clients on the waiting list',
      'Never take bookings from that client again',
      'Ignore the cancellation and turn up on Wednesday anyway',
    ],
    correctIndex: 1,
    explanation:
      'Cancellations are a normal part of trade work and should be handled professionally. The productive response has three parts: (1) accept the cancellation gracefully and maintain the client relationship (they may rebook or refer others), (2) manage the material impact — check if materials can be returned to the merchant, stored for stock, or used on another job, and (3) use the freed-up schedule slot productively — contact clients on the waiting list, bring forward a delayed job, or use the time for admin, quoting, or business development. A cancellation is only a loss if you let the time go to waste.',
  },
  {
    id: 'tmo-2-4-check3',
    question:
      'An electrician uses a whiteboard with columns for each pipeline stage (Enquiry, Quoted, Accepted, Scheduled, In Progress, Snagging, Invoice Sent, Paid). A job has been in the "Invoice Sent" column for 3 weeks. What should the tracking system prompt them to do?',
    options: [
      'Nothing — 3 weeks is a normal payment period',
      'Delete the job from the board to keep it tidy',
      'Follow up on the unpaid invoice — the visual system has made the overdue payment immediately visible, prompting action',
      'Move it back to "In Progress" and revisit the site',
    ],
    correctIndex: 2,
    explanation:
      'This is precisely why visual tracking systems are valuable: they make stale items immediately visible. A job sitting in "Invoice Sent" for 3 weeks is a cash flow issue that might go unnoticed without a visual system. The tracking board prompts action: send a polite payment reminder, call the client, or escalate as appropriate. Pipeline tracking is not just about managing work-in-progress — it is about managing the full lifecycle of every job from enquiry to payment, ensuring nothing falls through the cracks at any stage.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How many jobs should I have active at any one time?',
    answer:
      'For a sole trader, 3-4 active jobs (in the "Scheduled" through "Snagging" stages) is the practical maximum before performance starts to degrade. You may have additional jobs in earlier pipeline stages (enquiry, quoted, accepted) and later stages (invoice sent, awaiting payment), but these are lower-maintenance phases. The active jobs — those requiring daily attention, decision-making, materials management, and scheduling — are the ones that consume cognitive bandwidth. Exceeding 4 active jobs leads to increased errors, forgotten commitments, context-switching overhead, and the feeling of spinning plates.',
  },
  {
    question: 'What is the best job tracking tool for a sole-trader electrician?',
    answer:
      'The best tool is the one you will actually use consistently. For many sole traders, a whiteboard with pipeline columns in the home office provides the best combination of visibility, simplicity, and zero-tech friction. For electricians who are comfortable with technology, job management apps like Powered Now, SimPRO, or Tradify provide pipeline tracking with integrated invoicing and certification. A spreadsheet (Google Sheets or Excel) is a solid middle ground — sortable, searchable, and accessible from any device. The key features you need are: clear pipeline stages, the ability to see all active jobs at a glance, and a way to flag items that need attention (overdue invoices, pending material orders, upcoming deadlines).',
  },
  {
    question: 'How do I handle a client who keeps rescheduling?',
    answer:
      'Repeated rescheduling is a management challenge that requires clear, professional boundaries. The first reschedule is normal and should be accommodated gracefully. The second reschedule warrants a conversation: "I am happy to reschedule, but I do need to ask — is there a date that works reliably for you? I have other clients I need to schedule around." The third reschedule justifies a firmer boundary: "I need a confirmed date with 48 hours\' notice of any change, otherwise I will need to offer the slot to another client." You can also require a small deposit to secure the rescheduled date, which creates commitment. Chronic reschedulers consume disproportionate management time — a WIP limit for "rescheduled" jobs prevents them from clogging your pipeline.',
  },
  {
    question: 'Should I turn down work when my pipeline is full?',
    answer:
      'Yes — selectively. When your active job count hits your WIP limit (typically 3-4 for a sole trader), new enquiries should go onto a waiting list rather than being added to an already overloaded schedule. You do not need to turn clients away entirely — instead, say: "I would be happy to help. My current availability starts in 2 weeks. Shall I pencil you in for a quote visit on [date]?" This manages client expectations, protects the quality of your current work, and creates a natural buffer against cancellations. A waiting list also signals demand, which supports confident pricing. The alternative — saying yes to everything — leads to overcommitment, quality drops, stress, and the paradox of working more hours for less satisfaction.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'The typical job pipeline for a sole-trader electrician includes the following stages in order:',
    options: [
      'Quote, Accept, Do, Invoice',
      'Enquiry, Quote, Accepted, Materials Ordered, Scheduled, In Progress, Snagging, Invoice Sent, Paid',
      'Start, Middle, End',
      'Monday, Tuesday, Wednesday, Thursday, Friday',
    ],
    correctAnswer: 1,
    explanation:
      'A comprehensive pipeline tracks every stage from initial client contact to final payment: Enquiry (client makes contact), Quote (you provide a price), Accepted (client agrees), Materials Ordered (preparation begins), Scheduled (date confirmed in calendar), In Progress (on-site work), Snagging (final checks, making good, minor fixes), Invoice Sent (billing issued), Paid (payment received). Each stage has distinct management requirements, and tracking jobs through every stage ensures nothing falls through the cracks — particularly at the critical invoice and payment stages.',
  },
  {
    id: 2,
    question:
      'According to cognitive load research, performance on individual projects typically begins to degrade when a sole trader is managing more than:',
    options: [
      '1-2 active projects',
      '3-4 active projects',
      '7-8 active projects',
      '10+ active projects — there is no practical limit for experienced workers',
    ],
    correctAnswer: 1,
    explanation:
      'Research on cognitive load and multitasking consistently shows that performance degrades significantly when the number of active concurrent projects exceeds 3-4. Each active project requires ongoing mental tracking: client expectations, material status, scheduling, pending decisions, quality standards, and follow-up actions. Beyond 3-4 projects, the cognitive overhead of context-switching between projects starts to consume more mental energy than the productive work itself, leading to errors, forgotten commitments, and reduced quality across all projects.',
  },
  {
    id: 3,
    question: 'A work-in-progress (WIP) limit is:',
    options: [
      'A legal restriction on how many jobs you can undertake',
      'The maximum number of pounds you can have outstanding in unpaid invoices',
      'A self-imposed cap on the number of active concurrent jobs you manage, designed to protect quality and reduce cognitive overload',
      'The number of hours you are allowed to work per week',
    ],
    correctAnswer: 2,
    explanation:
      'A WIP limit is a deliberate, self-imposed constraint on the number of jobs in your active pipeline at any one time. Borrowed from Lean manufacturing and Kanban methodology (originally developed at Toyota), the WIP limit prevents overloading by ensuring that new work enters the pipeline only when existing work exits. For a sole trader, a WIP limit of 3-4 active jobs means that when a fifth enquiry arrives, it goes on a waiting list rather than being squeezed into an already full schedule.',
  },
  {
    id: 4,
    question: 'When a scheduled job is cancelled at short notice, the most productive response is:',
    options: [
      'Take the day off as a bonus',
      'Accept the cancellation, manage any material implications, and use the freed time productively — contact waiting-list clients, bring forward delayed work, or use the time for admin and business development',
      'Charge the client a full cancellation fee regardless of circumstances',
      'Never work with that client again',
    ],
    correctAnswer: 1,
    explanation:
      'A cancellation frees up a schedule slot that has value. The productive response is threefold: (1) handle the cancellation professionally to preserve the client relationship, (2) manage any material or subcontractor implications, and (3) redeploy the freed time — contact clients on your waiting list to see if their job can be brought forward, advance a delayed project, clear an admin backlog, or invest in business development. The freed time is only a loss if it is wasted. A well-maintained pipeline with a waiting list means cancellations can be refilled quickly.',
  },
  {
    id: 5,
    question: 'Managing client expectations effectively requires:',
    options: [
      'Telling clients only what they want to hear',
      'Clear, proactive communication about timelines, scope, and any changes — before the client has to ask',
      'Avoiding all communication until the job is complete',
      'Promising the fastest possible timeline regardless of feasibility',
    ],
    correctAnswer: 1,
    explanation:
      'Client expectation management is fundamentally about proactive, honest communication. Clients are far more tolerant of delays, changes, and complications when they are informed early and clearly than when they discover problems themselves. Sending a brief update — "Day 1 went well, on track for completion Wednesday" or "We have found an unexpected issue that will add half a day — here is what it involves" — builds trust and demonstrates professionalism. The worst client experiences come from silence: no updates, no visibility, and surprises at the end.',
  },
  {
    id: 6,
    question:
      'A visual tracking system (whiteboard, Kanban board, or app) helps manage multiple jobs because:',
    options: [
      'It looks professional when clients visit your office',
      'It makes the status of every job visible at a glance, reveals bottlenecks, and prompts action on stale items',
      'It is required by Part P of the Building Regulations',
      'It replaces the need for a calendar or diary',
    ],
    correctAnswer: 1,
    explanation:
      'Visual tracking systems make abstract information (the status of multiple concurrent jobs across different stages) concrete and visible. A whiteboard with pipeline columns shows you instantly: how many jobs are active, where each one is in the process, which jobs have been in the same stage too long (a potential problem), and whether your WIP limit has been reached. This visibility reduces the cognitive load of remembering status, prompts timely action (chasing overdue invoices, ordering materials, following up quotes), and prevents the feeling of "I know I am forgetting something" that plagues tradespeople managing multiple jobs from memory.',
  },
  {
    id: 7,
    question: 'The Kanban principle of "pull not push" applied to trade work means:',
    options: [
      'Only start work when the client pushes you to begin',
      'New work enters your active pipeline only when existing work exits — you "pull" new jobs in as capacity becomes available, rather than "pushing" more work onto an already full schedule',
      'Always pull cables rather than push them through conduit',
      'Let clients come to you rather than marketing your services',
    ],
    correctAnswer: 1,
    explanation:
      'The pull principle, originating from Toyota\'s Kanban system, means that new work enters the active pipeline only when capacity exists — i.e., when an existing job completes and exits. This prevents the overloading that occurs when you say yes to every enquiry regardless of current workload. In practice, it means maintaining a waiting list: when your 3-4 active job slots are full, new accepted jobs join the waiting list and are "pulled" into the active pipeline as slots become available. This preserves quality, reduces stress, and ensures every active job receives adequate attention.',
  },
  {
    id: 8,
    question:
      'An electrician is juggling 3 domestic rewires, a commercial job, and 2 callbacks. The most effective management approach is:',
    options: [
      'Try to remember the status of each job and trust that nothing will be forgotten',
      'Focus entirely on one job at a time and ignore the others until it is finished',
      'Use a tracking system with clear pipeline stages, maintain proactive communication with all clients, and set WIP limits to prevent further overload',
      'Work 7 days a week until the backlog is cleared',
    ],
    correctAnswer: 2,
    explanation:
      'With 6 concurrent jobs, a systematic approach is essential — memory alone will fail. A tracking system (whiteboard, spreadsheet, or app) shows the status of each job at a glance: which rewire is at first fix, which is at second fix, which needs testing, where the commercial job stands, and which callbacks are scheduled. Proactive client communication keeps everyone informed without you being chased. WIP limits prevent additional jobs from being added until current ones exit the pipeline. Working 7 days a week (option D) addresses the symptom (too much work) without fixing the cause (no system for managing flow).',
  },
];

export default function TMOModule2Section4() {
  useSEO({
    title: 'Managing Multiple Jobs | Time Management & Organisation Module 2.4',
    description:
      'Job pipeline stages, tracking systems, managing client expectations, work-in-progress limits, and handling cancellations for electricians.',
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
            <Link to="../tmo-module-2">
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
            <Layers className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Managing Multiple Jobs
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Job pipeline stages, tracking systems, managing client expectations, work-in-progress
            limits, and handling cancellations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Pipeline stages:</strong> Track every job from enquiry through to payment
              </li>
              <li>
                <strong>WIP limit:</strong> 3&ndash;4 active jobs maximum for a sole trader
              </li>
              <li>
                <strong>Visual tracking:</strong> Whiteboard, app, or spreadsheet &mdash; see
                everything at a glance
              </li>
              <li>
                <strong>Proactive communication:</strong> Update clients before they have to chase
                you
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Nothing slips:</strong> Systematic tracking prevents forgotten commitments
              </li>
              <li>
                <strong>Cash flow:</strong> Pipeline tracking catches overdue invoices before they
                become problems
              </li>
              <li>
                <strong>Quality:</strong> WIP limits prevent the quality drops that come from
                overcommitment
              </li>
              <li>
                <strong>Sanity:</strong> A system you trust replaces the anxiety of mental juggling
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define the stages of a job pipeline from initial enquiry through to final payment',
              'Explain why work-in-progress limits protect quality, profitability, and wellbeing',
              'Choose and implement a tracking system suited to your working style',
              'Manage client expectations through proactive, clear communication',
              'Handle cancellations and reschedules professionally and productively',
              'Apply the Kanban "pull not push" principle to manage job flow sustainably',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Job Pipeline */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Job Pipeline &mdash; From Enquiry to Payment
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every job you undertake passes through a series of stages, from the initial client
                enquiry to the final payment landing in your account. Most tradespeople
                instinctively track the middle stages (the actual on-site work) but neglect the
                stages at either end &mdash; enquiries that were never followed up, quotes that were
                never chased, invoices that were never collected. A <strong>job pipeline</strong> is
                a systematic framework that tracks every job through every stage, ensuring nothing
                falls through the cracks at any point in the lifecycle.
              </p>

              <p>
                The stages of a typical sole-trader pipeline are: <strong>Enquiry</strong> (client
                makes initial contact via phone, text, email, or referral), <strong>Quote</strong>{' '}
                (you visit the site, assess the work, and provide a price),{' '}
                <strong>Accepted</strong> (client agrees to the quote),{' '}
                <strong>Materials Ordered</strong> (preparation begins &mdash; parts sourced,
                special orders placed), <strong>Scheduled</strong> (start date confirmed and locked
                in the calendar), <strong>In Progress</strong> (on-site work is underway),{' '}
                <strong>Snagging</strong> (final checks, making good, minor fixes, client
                walk-through), <strong>Invoice Sent</strong> (billing issued to the client), and{' '}
                <strong>Paid</strong> (payment received and confirmed). Each stage has distinct
                management requirements and potential failure points.
              </p>

              <p>
                The pipeline concept is borrowed from sales management, where tracking deals through
                stages is standard practice. For tradespeople, the pipeline serves a dual purpose:
                it is both a workflow management tool (ensuring every job progresses smoothly
                through each stage) and a business intelligence tool (revealing patterns and
                bottlenecks). If you notice that 40% of your quotes are not converting to accepted
                jobs, that tells you something about your pricing or presentation. If invoices are
                sitting unpaid for 30+ days on average, that tells you something about your payment
                terms or follow-up process. The pipeline makes these patterns visible, which is the
                first step to improving them.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The 9-Stage Job Pipeline</p>
                <ul className="text-sm text-white space-y-1.5 mt-2">
                  <li>
                    &bull; <strong>1. Enquiry</strong> &mdash; Client makes contact (phone, text,
                    referral)
                  </li>
                  <li>
                    &bull; <strong>2. Quote</strong> &mdash; Site visit, assessment, price provided
                  </li>
                  <li>
                    &bull; <strong>3. Accepted</strong> &mdash; Client agrees to the quote
                  </li>
                  <li>
                    &bull; <strong>4. Materials Ordered</strong> &mdash; Parts sourced and ordered
                  </li>
                  <li>
                    &bull; <strong>5. Scheduled</strong> &mdash; Start date confirmed in calendar
                  </li>
                  <li>
                    &bull; <strong>6. In Progress</strong> &mdash; On-site work underway
                  </li>
                  <li>
                    &bull; <strong>7. Snagging</strong> &mdash; Final checks, making good,
                    walk-through
                  </li>
                  <li>
                    &bull; <strong>8. Invoice Sent</strong> &mdash; Billing issued
                  </li>
                  <li>
                    &bull; <strong>9. Paid</strong> &mdash; Payment received and confirmed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Tracking Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Tracking Systems &mdash; Seeing the Full Picture
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A pipeline is only useful if it is visible. Carrying the status of multiple jobs in
                your head is the mental equivalent of juggling: it works for 3 balls, becomes
                stressful at 4, and fails catastrophically at 5. A tracking system externalises the
                pipeline, making every job&rsquo;s status visible at a glance. This aligns directly
                with the GTD principle from Section 1: your mind is for having ideas, not holding
                them. The tracking system holds the status information so your mind does not have
                to.
              </p>

              <p>
                <strong>Whiteboard/Kanban board:</strong> A physical board with columns for each
                pipeline stage and sticky notes or cards for each job is the simplest and most
                visually impactful tracking method. You can see the entire pipeline in one glance:
                how many jobs are at each stage, which stages are getting congested, and which jobs
                have been in the same column too long. The Kanban method, developed at Toyota in the
                1940s by <strong>Taiichi Ohno</strong>, uses this visual approach to limit
                work-in-progress and ensure smooth flow. For a sole trader, a whiteboard in the
                kitchen or home office serves the same purpose &mdash; you see it every morning and
                every evening, which keeps the full picture in view.
              </p>

              <p>
                <strong>Spreadsheet:</strong> A Google Sheets or Excel spreadsheet with columns for
                client name, job description, current stage, key dates, and notes provides a
                sortable, searchable pipeline that is accessible from any device. It is more
                flexible than a whiteboard (you can filter by stage, sort by date, add conditional
                formatting to highlight overdue items) but less visually immediate. Many
                electricians use a spreadsheet as their primary tracking tool and review it during
                the weekly planning session. <strong>Job management apps</strong> (Powered Now,
                SimPRO, Tradify, and similar) provide integrated pipeline tracking with invoicing,
                certification, and scheduling features &mdash; ideal for electricians whose workload
                justifies the subscription cost and who are comfortable with technology.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Choosing Your Tracking Tool</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Whiteboard:</strong> Best for visibility, simplicity, and zero
                      learning curve. Limitation: stays at home, no reminders, no search.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Spreadsheet:</strong> Best for flexibility, filtering, and access from
                      any device. Limitation: less visually immediate than a board.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Job management app:</strong> Best for integration (invoicing,
                      certification, scheduling). Limitation: cost, learning curve, reliance on
                      technology.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Hybrid:</strong> Whiteboard at home for the strategic view + phone app
                      or spreadsheet for on-the-go reference. Often the most practical combination.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Managing Client Expectations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Managing Client Expectations
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When you are managing multiple jobs simultaneously, client communication becomes
                both more important and more difficult. Each client wants to feel that their job is
                your top priority &mdash; and when you are juggling 3 to 4 active projects,
                maintaining that feeling requires deliberate, proactive communication. The cardinal
                rule is simple: <strong>update the client before they have to ask.</strong> A
                proactive update (&ldquo;Day 1 complete, on track for Wednesday finish&rdquo;)
                builds trust and demonstrates control. A reactive response to a chasing call
                (&ldquo;Sorry, I meant to update you&rdquo;) erodes trust and suggests
                disorganisation.
              </p>

              <p>
                Effective client communication has three dimensions: <strong>timing</strong> (when
                you communicate), <strong>content</strong> (what you communicate), and{' '}
                <strong>channel</strong>
                (how you communicate). For timing, the critical moments are: at the quote stage
                (setting expectations about timeline and scope), at the scheduling stage (confirming
                the start date and what to expect), at the end of each day on multi-day jobs (brief
                progress update), and at completion (walk-through, handover, and invoice). For
                content, focus on what the client cares about: timeline (&ldquo;We are on
                track&rdquo; or &ldquo;We have encountered an issue that adds half a day&rdquo;),
                disruption (&ldquo;Power will be off until 3pm&rdquo;), and next steps
                (&ldquo;Tomorrow we will be doing second fix in the bedrooms&rdquo;). For channel,
                text messages work well for brief updates; phone calls are better for discussing
                problems or changes.
              </p>

              <p>
                The most damaging communication failure is silence when problems arise. If a job is
                going to overrun, if you discover an unexpected issue, if materials are delayed
                &mdash; communicate immediately. Clients are remarkably tolerant of problems when
                they are told early and honestly. They are remarkably intolerant of surprises,
                especially surprises that involve additional cost or extended timelines. A 30-second
                text saying &ldquo;Found an issue with the existing wiring that will add about 2
                hours to the job &mdash; I will explain when I see you this afternoon&rdquo; is
                infinitely better than silently overrunning and presenting the client with an
                unexpected bill.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Client Communication Templates
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Scheduling confirmation:</strong> &ldquo;Hi [name], confirming I will
                      be with you on [date] at [time]. I will need access to [rooms/areas]. Power
                      will be off for approximately [duration]. Any questions, just text
                      back.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong>Daily progress update:</strong> &ldquo;Hi [name], good progress today
                      &mdash; first fix is complete. Tomorrow I will be starting second fix. On
                      track for [day] completion.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Issue notification:</strong> &ldquo;Hi [name], I have found [issue]
                      which will require [additional work/time]. I will explain the options when we
                      next speak. Estimated additional time: [hours].&rdquo;
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Work-in-Progress Limits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Work-in-Progress Limits &mdash; The Power of Saying &ldquo;Not Yet&rdquo;
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>work-in-progress (WIP) limit</strong> is a self-imposed cap on the number
                of active concurrent jobs you manage at any one time. The concept originates from
                Lean manufacturing and Kanban methodology, developed by{' '}
                <strong>Taiichi Ohno</strong> at Toyota in the 1940s and 1950s. Ohno observed that
                limiting the amount of work in progress at each stage of the production line
                actually <em>increased</em> total output, because it reduced bottlenecks, prevented
                overload, and improved flow. The same principle applies to sole-trader trade work.
              </p>

              <p>
                Cognitive load research supports the WIP limit concept.{' '}
                <strong>George Miller&rsquo;s</strong> classic 1956 paper &ldquo;The Magical Number
                Seven, Plus or Minus Two&rdquo; established that working memory has limited
                capacity. More recent research by Cowan (2001) suggests the true working memory
                limit is closer to 4 items for complex information. Each active job is not a single
                item &mdash; it is a cluster of related items: client expectations, material orders,
                scheduling dependencies, quality standards, pending decisions, and follow-up
                actions. Managing 4 active jobs means holding approximately 20 to 30 active items
                across all projects. At 5 or more active jobs, the cognitive overhead becomes
                unsustainable: errors increase, items are forgotten, and the sense of control gives
                way to the feeling of spinning plates.
              </p>

              <p>
                Implementing a WIP limit does not mean turning down work &mdash; it means sequencing
                it. When your active pipeline is at capacity (3 to 4 jobs in the Scheduled through
                Snagging stages), new accepted jobs join a <strong>waiting list</strong> rather than
                being squeezed into an overloaded schedule. When an active job completes and exits
                the pipeline, the next job on the waiting list is &ldquo;pulled&rdquo; in. This is
                Ohno&rsquo;s <strong>pull principle</strong>: work enters the system based on
                capacity, not on demand. The result is sustainable throughput at consistently high
                quality, rather than unsustainable bursts followed by errors and burnout.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Setting Your WIP Limit</p>
                <p className="text-sm text-white mt-2">
                  <strong>Sole trader (domestic):</strong> 3&ndash;4 active jobs (Scheduled through
                  Snagging stages)
                </p>
                <p className="text-sm text-white mt-1">
                  <strong>Sole trader (mixed domestic/commercial):</strong> 2&ndash;3 active jobs
                  (commercial jobs consume more management bandwidth)
                </p>
                <p className="text-sm text-white mt-1">
                  <strong>Small team (2&ndash;3 operatives):</strong> 5&ndash;8 active jobs
                  depending on complexity
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The rule:</strong> If adding another active job would cause you to start
                  forgetting things, rushing, or feeling overwhelmed, your WIP limit has been
                  exceeded.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Handling Cancellations and Reschedules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Handling Cancellations &amp; Reschedules
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cancellations and reschedules are an unavoidable reality of trade work. Clients
                change their minds, unexpected events intervene, budgets shift, and priorities
                change. The question is not whether cancellations will happen but how you respond to
                them. A professional, systematic approach turns cancellations from frustrating
                disruptions into manageable events with productive outcomes.
              </p>

              <p>
                When a cancellation occurs, there are three immediate actions. First,{' '}
                <strong>manage the client relationship</strong>: acknowledge the cancellation
                gracefully, confirm whether it is a permanent cancellation or a postponement, and
                leave the door open for future work. Even if you are frustrated, maintaining
                professionalism pays dividends &mdash; cancelled clients often rebook, and they
                always talk to friends and neighbours. Second,{' '}
                <strong>manage the material impact</strong>: check if any materials have been
                ordered specifically for this job, whether they can be returned to the merchant,
                added to van stock for future use, or used on another current job. Third,{' '}
                <strong>redeploy the freed time</strong>: contact clients on your waiting list to
                see if their job can be brought forward, advance a delayed project, clear an admin
                backlog, or invest in business development (quoting, marketing, training).
              </p>

              <p>
                For chronic reschedulers &mdash; clients who cancel or move dates repeatedly &mdash;
                professional boundaries are necessary. A simple policy works well: first reschedule
                is accommodated freely, second reschedule prompts a conversation about commitment,
                third reschedule requires a deposit to secure the new date. This is not punitive
                &mdash; it is protective. Chronic reschedulers consume disproportionate management
                time (each reschedule requires reworking the calendar, contacting other clients, and
                adjusting material orders) and prevent you from giving that slot to a reliable
                client. A deposit requirement often resolves the problem immediately, because it
                creates financial commitment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: Turning a Cancellation into an Opportunity
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Wednesday morning: client calls to cancel Friday&rsquo;s EV charger installation
                  due to a family emergency. The electrician responds: &ldquo;No problem at all, I
                  hope everything is OK. Let me know when you would like to reschedule and I will
                  prioritise you.&rdquo; The materials (charger, cable, isolator) were already
                  ordered &mdash; the charger can be stored for the rescheduled job; the cable and
                  isolator go into van stock. The electrician then checks the waiting list: the
                  Hendersons have been waiting for a socket addition for 2 weeks. A quick call:
                  &ldquo;I have had a cancellation on Friday &mdash; would that work for you?&rdquo;
                  They are delighted. The Friday slot is filled, the Henderson job is completed 2
                  weeks ahead of schedule, and the cancelled client has a positive impression
                  despite the cancellation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Putting It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Putting It All Together &mdash; A Working System
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Managing multiple jobs effectively is not about any single technique &mdash; it is
                about integrating several complementary practices into a coherent system. The
                pipeline defines the stages. The tracking system makes the pipeline visible. The WIP
                limit prevents overload. Proactive communication keeps clients informed. The weekly
                review (from Section 1) ensures nothing is stale or forgotten. Together, these
                practices create a system that is greater than the sum of its parts.
              </p>

              <p>
                Consider a working week for a sole-trader electrician using the full system. The
                whiteboard in the kitchen shows 3 active jobs (Henderson rewire at &ldquo;In
                Progress&rdquo;, Peterson CU change at &ldquo;Scheduled&rdquo; for Thursday, and a
                commercial callback at &ldquo;Snagging&rdquo;), plus 2 jobs in earlier stages (a
                waiting-list rewire at &ldquo;Accepted&rdquo; and 3 quotes out for response). The
                weekly plan allocates Monday and Tuesday to the Henderson rewire second fix,
                Wednesday to the commercial callback and admin, Thursday to the Peterson CU change,
                and Friday morning to an EV charger quote plus afternoon admin. Buffer time is built
                into each day. The electrician reviews the tracking board each morning for 2
                minutes, sends a progress text to Henderson on Monday evening, calls the commercial
                client on Wednesday to confirm the snagging is resolved, and conducts the weekly
                review on Friday afternoon.
              </p>

              <p>
                When the Peterson job completes on Thursday, it moves through &ldquo;Snagging&rdquo;
                (quick visual check and tidy), &ldquo;Invoice Sent&rdquo; (invoice emailed Thursday
                evening from the admin block), and eventually &ldquo;Paid.&rdquo; The completed job
                opens a WIP slot, and the waiting-list rewire is &ldquo;pulled&rdquo; into the
                active pipeline &mdash; the electrician calls that client to schedule a start date.
                The system flows. Nothing is forgotten. No one is chasing. The electrician finishes
                the week knowing exactly where every job stands and what next week requires. That is
                the payoff of systematic pipeline management: not just productivity, but peace of
                mind.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Integrated System</p>
                <ul className="text-sm text-white space-y-1.5 mt-2">
                  <li>
                    &bull; <strong>Pipeline</strong> &mdash; Defines the stages every job passes
                    through
                  </li>
                  <li>
                    &bull; <strong>Tracking system</strong> &mdash; Makes the pipeline visible and
                    actionable
                  </li>
                  <li>
                    &bull; <strong>WIP limit</strong> &mdash; Prevents overload and protects quality
                  </li>
                  <li>
                    &bull; <strong>Proactive communication</strong> &mdash; Keeps clients informed
                    and trusting
                  </li>
                  <li>
                    &bull; <strong>Weekly review</strong> &mdash; Ensures nothing is stale,
                    forgotten, or slipping
                  </li>
                  <li>
                    &bull; <strong>Pull principle</strong> &mdash; New work enters only when
                    capacity exists
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided frameworks and tools for managing multiple concurrent jobs
                without dropping anything. The key takeaways are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The job pipeline</strong> tracks every job through 9 stages from Enquiry
                    to Paid, ensuring nothing falls through the cracks at any point.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Visual tracking</strong> (whiteboard, spreadsheet, or app) makes the
                    pipeline visible, reveals bottlenecks, and prompts action on stale items.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>WIP limits</strong> (3&ndash;4 active jobs for a sole trader) prevent
                    the cognitive overload that causes errors, forgotten commitments, and quality
                    drops.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Proactive client communication</strong> builds trust and prevents the
                    relationship damage caused by silence and surprises.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Cancellations</strong> are manageable events when handled
                    professionally: preserve the relationship, manage materials, and redeploy the
                    freed time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The pull principle</strong> (from Kanban/Lean) ensures new work enters
                    the pipeline based on capacity, not demand, creating sustainable flow.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Reference:</strong> Taiichi Ohno,{' '}
                  <em>Toyota Production System: Beyond Large-Scale Production</em> (1988). George A.
                  Miller, &ldquo;The Magical Number Seven, Plus or Minus Two,&rdquo;{' '}
                  <em>Psychological Review</em>, 1956. Nelson Cowan, &ldquo;The Magical Number 4 in
                  Short-Term Memory,&rdquo; <em>Behavioral and Brain Sciences</em>, 2001.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../tmo-module-3">
              Next: Focus &amp; Productivity
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
