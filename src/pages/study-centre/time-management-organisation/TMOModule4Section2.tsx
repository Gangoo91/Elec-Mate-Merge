import { ArrowLeft, Smartphone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the most important criterion when evaluating whether a digital tool is worth adopting?',
    options: [
      'Whether it has the most features of any tool in its category',
      'Whether it saves more time than it costs to learn and maintain',
      'Whether it is the cheapest option available',
      'Whether your competitors are using it',
    ],
    correctAnswer: 1,
    explanation:
      'The fundamental test for any tool is the return on time invested. A tool that takes 10 hours to learn but saves 2 hours per week pays for itself in 5 weeks. A tool with impressive features that takes 40 hours to learn and saves 15 minutes per week will never pay back the investment. Always evaluate tools by net time saved, not by feature count.',
  },
  {
    id: 2,
    question:
      'What does the "if it is not in the calendar, it does not exist" principle mean in practice?',
    options: [
      'Only attend events that appear in your calendar app',
      'Every commitment, job, reminder, and deadline must be recorded in your calendar to be considered real',
      'Delete any tasks that are not scheduled for today',
      'Use the calendar only for client-facing appointments',
    ],
    correctAnswer: 1,
    explanation:
      'This principle means treating your calendar as the single source of truth for all time commitments. Jobs, supplier deliveries, callback windows, Part P deadlines, MOT dates, insurance renewals \u2014 everything goes in the calendar. If something is only in your head, it is at risk of being forgotten. The calendar is your external memory for all time-bound commitments.',
  },
  {
    id: 3,
    question: 'What is the "one-tool trap" in digital organisation?',
    options: [
      'Using only one tool for everything, forcing it into roles it was not designed for',
      'Having too many tools that overlap in functionality',
      'Relying on a free tool that might become paid',
      'Using only paper-based systems instead of digital tools',
    ],
    correctAnswer: 0,
    explanation:
      'The one-tool trap occurs when you try to force a single tool to handle every function \u2014 using a notes app as a calendar, a spreadsheet as a CRM, or an email inbox as a task list. Each function has tools designed specifically for it, and using the right tool for each function is more efficient than wrestling one tool into doing everything poorly.',
  },
  {
    id: 4,
    question:
      'Which combination of digital tools covers the essential needs of a sole-trader electrician?',
    options: [
      'Social media scheduler, website builder, and email marketing platform',
      'Calendar, invoicing/accounting, certification app, cloud storage, and a notes/task app',
      'Project management suite, enterprise CRM, and a dedicated server',
      'Only a smartphone with the default apps is sufficient',
    ],
    correctAnswer: 1,
    explanation:
      'A sole trader needs tools for scheduling (calendar), finances (invoicing/accounting), compliance (certification app), document storage (cloud), and task/note management. These five categories cover the core operational needs. Additional tools may be useful, but these are the essential foundations that every electrical business requires.',
  },
  {
    id: 5,
    question: 'What is the key benefit of automating recurring invoices?',
    options: [
      'It allows you to charge higher prices',
      'It eliminates the manual step of creating and sending invoices for regular clients, ensuring consistent cash flow',
      'It removes the need for an accounting system',
      'It guarantees faster payment from all clients',
    ],
    correctAnswer: 1,
    explanation:
      'Recurring invoice automation removes a manual admin task that is easily forgotten. For electricians with regular maintenance contracts (e.g. PAT testing, EICR programmes for letting agents), automated invoicing ensures the invoice is sent on the agreed date every month or quarter without requiring you to remember and manually create it. This consistency improves cash flow.',
  },
  {
    id: 6,
    question: 'Why is cloud storage considered essential rather than optional for electricians?',
    options: [
      'Because it is cheaper than buying a computer',
      'Because it provides automatic backup, multi-device access, and protection against device loss or failure',
      'Because clients legally require cloud-based documentation',
      'Because it replaces the need for a filing system',
    ],
    correctAnswer: 1,
    explanation:
      'Cloud storage provides three critical benefits: automatic backup (protecting against data loss), multi-device access (phone on site, tablet at home, computer in the office), and resilience against hardware failure or theft. For an electrician whose certification records represent years of legal documentation, losing those records due to a broken phone or stolen laptop is a serious professional risk.',
  },
  {
    id: 7,
    question:
      'When evaluating a new digital tool, what is a practical first step before committing?',
    options: [
      'Purchase the annual subscription immediately to get the best price',
      'Use the free trial or free tier for 2\u20134 weeks on real jobs to assess whether it genuinely saves time',
      'Read every online review before making any decision',
      'Ask a colleague to set it up for you',
    ],
    correctAnswer: 1,
    explanation:
      'A 2\u20134 week trial on real work is the only reliable way to assess whether a tool fits your workflow. Online reviews tell you about other people\u2019s experience; a trial tells you about yours. Use it on actual jobs, not hypothetical scenarios, and track whether it genuinely saves time versus your current method.',
  },
  {
    id: 8,
    question: 'What is the recommended approach to mileage tracking for electricians?',
    options: [
      'Estimate your mileage at the end of the tax year',
      'Use an automatic mileage tracking app that records journeys via GPS, eliminating manual logging',
      'Keep a paper logbook in the glove box and write down every journey',
      'Only track mileage for journeys over 50 miles',
    ],
    correctAnswer: 1,
    explanation:
      'Automatic mileage tracking apps use GPS to record every business journey without any manual input. This eliminates the daily discipline of writing down odometer readings, ensures no journeys are missed, and provides HMRC-compliant reports at tax time. For electricians who may visit 3\u20135 sites per day, manual logging is unreliable and time-consuming.',
  },
];

export default function TMOModule4Section2() {
  useSEO({
    title: 'Digital Tools & Systems | Module 4 Section 2 | Time Management & Organisation',
    description:
      'Calendar mastery, invoicing, job tracking, cloud storage, automation, and avoiding the one-tool trap for electricians.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <Smartphone className="w-5 h-5 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 4</span>
                <span className="text-white text-xs">&bull;</span>
                <span className="text-white text-xs">SECTION 2</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Digital Tools &amp; Systems
            </h1>
            <p className="text-white text-sm sm:text-base">
              The right tools in the right combination &mdash; building a digital system that
              genuinely saves time rather than consuming it
            </p>
          </div>

          {/* In 30 Seconds + Why It Matters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">In 30 Seconds</h2>
              <p className="text-white text-sm leading-relaxed">
                A small number of well-chosen digital tools can eliminate hours of weekly admin. The
                essentials are a calendar (single source of truth for all commitments),
                invoicing/accounting software, a certification app, cloud storage, and a task/notes
                system. The key is choosing tools that integrate with each other and sticking with
                them long enough to build fluency.
              </p>
            </div>
            <div className="bg-rose-500/5 border-l-2 border-rose-500/50 rounded-r-xl p-4">
              <h2 className="text-white font-semibold text-sm mb-2">Why It Matters</h2>
              <p className="text-white text-sm leading-relaxed">
                The average sole-trader electrician spends 5&ndash;10 hours per week on admin. The
                right digital tools can cut that to 2&ndash;4 hours. Over a year, that is
                150&ndash;300 hours recovered &mdash; equivalent to 6&ndash;12 additional working
                weeks. But the wrong tools, or too many tools, can actually increase admin time.
                Selection matters as much as adoption.
              </p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Apply a return-on-time-invested framework to evaluate any digital tool before committing to it',
                'Identify the five essential tool categories every electrical business requires',
                'Implement the calendar-as-single-source-of-truth principle for all scheduling and deadlines',
                'Set up cloud storage with consistent naming conventions and automatic backup',
                'Configure automation for recurring admin tasks including invoices, reminders, and mileage tracking',
                'Recognise and avoid the one-tool trap that causes more problems than it solves',
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Tool Evaluation Framework */}
          <div className="mb-8">
            <div className="border-l-2 border-rose-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">1. The Tool Evaluation Framework</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Before adopting any digital tool, you need a framework for deciding whether it is
                worth the investment of time, money, and mental energy. The fundamental question is
                simple:{' '}
                <strong className="text-white">
                  will this tool save more time than it costs to learn and maintain?
                </strong>{' '}
                Many electricians adopt tools because they look impressive, because a mate
                recommended them, or because a sales demo was convincing &mdash; without ever
                calculating whether the tool will actually deliver a net time saving.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The calculation has three components. First, the{' '}
                <strong className="text-white">learning cost</strong>: how many hours will it take
                to become proficient? A simple invoicing app might take 2 hours; a full job
                management platform might take 20. Second, the{' '}
                <strong className="text-white">ongoing maintenance cost</strong>: how much time per
                week does it require? Data entry, syncing, troubleshooting, and updates all consume
                time. Third, the <strong className="text-white">time saved per week</strong>: how
                many hours of manual work does it eliminate? If the time saved exceeds the learning
                plus maintenance cost within a reasonable period (typically 4&ndash;8 weeks), the
                tool is worth adopting.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                There is also a hidden cost that many people overlook:{' '}
                <strong className="text-white">cognitive overhead</strong>. Every tool you add to
                your workflow requires a slice of mental attention. You need to remember to use it,
                keep it updated, and integrate it with your other tools. A sole trader with 15
                different apps is spending significant mental energy just managing the apps, rather
                than doing productive work. The goal is the minimum number of tools that cover all
                essential functions &mdash; not the maximum number of features.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">Tool Evaluation Scorecard</h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Learning time:</strong> How many hours to become
                competent? (Lower is better)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Weekly maintenance:</strong> How many minutes per
                week to keep it running? (Lower is better)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Weekly time saved:</strong> How many minutes of
                manual work does it eliminate? (Higher is better)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Payback period:</strong> Learning time &divide;
                (weekly time saved &minus; weekly maintenance). Aim for under 8 weeks.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Integration:</strong> Does it work with your existing
                tools, or does it create a silo? (Integration strongly preferred)
              </p>
            </div>
          </div>

          {/* Section 2: Essential Tool Categories */}
          <div className="mb-8">
            <div className="border-l-2 border-amber-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                2. The Five Essential Tool Categories
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Every electrical business, from a sole trader to a multi-van operation, requires
                tools in five categories. The first is{' '}
                <strong className="text-white">scheduling and calendar</strong>. Google Calendar,
                Apple Calendar, or Outlook &mdash; it does not matter which, provided you use it for
                everything. Jobs, callbacks, supplier deliveries, Part P deadlines, insurance
                renewals, MOT dates, and personal commitments all belong in one calendar. The rule
                is absolute: if it is not in the calendar, it does not exist.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The second category is{' '}
                <strong className="text-white">invoicing and accounting</strong>. QuickBooks, Xero,
                FreeAgent, or similar platforms handle invoicing, expense tracking, bank
                reconciliation, and tax submissions. The key feature for tradespeople is the ability
                to create and send invoices from your phone on-site. Sending an invoice the moment
                the job is complete (while the client is still pleased with the work) significantly
                improves payment speed. These platforms also generate the profit and loss statements
                and tax summaries your accountant needs.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The third category is <strong className="text-white">certification</strong> &mdash;
                platforms like iCertifi, Certsure, or scheme-specific software. The fourth is{' '}
                <strong className="text-white">cloud storage</strong> (Google Drive, Dropbox,
                iCloud) for certificates, photos, correspondence, and business documents. The fifth
                is a <strong className="text-white">notes and task system</strong> &mdash; this can
                be as simple as the built-in notes app on your phone, Apple Reminders, or a tool
                like Todoist. It captures the small tasks that do not deserve a calendar entry but
                need to be remembered: buy 10mm twin and earth, chase Mr Jones for access, order
                replacement MCBs.
              </p>
            </div>
          </div>

          {/* InlineCheck 1 */}
          <InlineCheck
            id="tmo-4-2-categories"
            question="A sole-trader electrician currently manages everything through WhatsApp messages to himself, a paper diary, and a shoebox of receipts. Which essential tool category should he adopt first for the biggest impact?"
            options={[
              'A project management suite with Gantt charts and resource allocation',
              'A digital calendar as the single source of truth for all commitments and deadlines',
              'A social media management platform to grow his business',
              'An enterprise CRM system to track all client interactions',
            ]}
            correctIndex={1}
            explanation="The calendar is the foundation. Until all commitments live in one place, everything else is built on sand. A digital calendar is free, takes minutes to set up, and immediately eliminates the risk of forgotten jobs, missed deadlines, and double-bookings. Once the calendar is established, add invoicing, then cloud storage, building one layer at a time."
          />

          {/* Section 3: Calendar Mastery */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">3. Calendar Mastery</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The principle &ldquo;if it is not in the calendar, it does not exist&rdquo; sounds
                extreme, but it is the single most powerful organisational habit you can develop.
                Your brain is designed for thinking, analysing, and problem-solving &mdash; not for
                remembering that you have a callback with the letting agent at 14:30, a supplier
                delivery arriving between 10:00 and 12:00, and an insurance renewal due next Friday.
                Every commitment held in your head rather than your calendar consumes mental
                bandwidth that could be used for productive work.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Effective calendar use goes beyond simply recording job times. Use{' '}
                <strong className="text-white">time blocking</strong> to protect focused work
                periods (as covered in Module 3). Add{' '}
                <strong className="text-white">travel time</strong> between jobs &mdash; if a job
                runs from 09:00 to 13:00 and the next is 30 minutes away, block 13:00 to 13:30 as
                travel so you cannot accidentally accept another commitment in that window. Set{' '}
                <strong className="text-white">reminders</strong> for deadlines: a 30-day reminder
                for Part P notifications, a 7-day reminder for insurance renewals, and a 1-day
                reminder for supplier deliveries.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Use <strong className="text-white">colour coding</strong> to categorise events at a
                glance: one colour for jobs, another for admin, another for personal commitments.
                This makes it immediately visible when your week is overloaded with jobs and
                underloaded with admin (meaning paperwork will pile up) or vice versa. Share your
                calendar with anyone who books work for you &mdash; a partner, an office manager, or
                a booking service &mdash; so they can see your availability without calling to ask.
                This alone eliminates dozens of scheduling-related phone calls per week.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Calendar Setup for Electricians
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Create separate calendars within one app: <strong className="text-white">Jobs</strong>{' '}
              (blue), <strong className="text-white">Admin</strong> (amber),{' '}
              <strong className="text-white">Personal</strong> (green),{' '}
              <strong className="text-white">Deadlines</strong> (red). Each job entry should
              include: client name, full address, scope of work, contact number, and any access
              codes. This means everything you need is accessible from your phone without searching
              through messages or notes.
            </p>
          </div>

          {/* Section 4: Automation */}
          <div className="mb-8">
            <div className="border-l-2 border-blue-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                4. Automation &mdash; Eliminating Repetitive Admin
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Automation means setting up systems that perform repetitive tasks without your
                intervention. For an electrician, the most valuable automations are straightforward
                and do not require technical expertise.{' '}
                <strong className="text-white">Recurring invoices</strong> are the most impactful:
                if you have regular clients (a letting agent who sends you 4 EICRs per month, a
                facilities management company with a maintenance contract), set up automatic
                invoicing so the invoice is created and sent on the same date each month without you
                lifting a finger.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Payment reminders</strong> are the second most
                valuable automation. Most accounting platforms can send automatic reminders when an
                invoice becomes overdue &mdash; a gentle nudge at 7 days, a firmer reminder at 14
                days, and a formal notice at 30 days. This eliminates the awkward task of manually
                chasing payments while ensuring no overdue invoice is forgotten. Many electricians
                report that automated reminders alone reduce their average payment time from 30+
                days to under 14 days.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                <strong className="text-white">Mileage tracking</strong> is another powerful
                automation. Apps like MileIQ or the built-in mileage features in QuickBooks and Xero
                automatically log every journey using GPS, categorise business versus personal
                travel, and generate HMRC-compliant reports at tax time. For an electrician visiting
                3&ndash;5 sites daily, manual mileage logging is tedious and unreliable. Automatic
                tracking captures every mile without any daily effort, and at 45p per mile for the
                first 10,000 miles, accurate mileage claims can be worth &pound;3,000&ndash;5,000
                per year in tax relief.
              </p>
            </div>
          </div>

          {/* InlineCheck 2 */}
          <InlineCheck
            id="tmo-4-2-automation"
            question="An electrician does monthly PAT testing for 6 regular commercial clients but often forgets to send invoices, resulting in late payment. What automation would solve this?"
            options={[
              'A social media scheduling tool to remind clients about payment',
              'Recurring invoices set to auto-generate and send on the same date each month',
              'A spreadsheet that calculates the total owed at year end',
              'An email template saved in drafts that he can manually send when he remembers',
            ]}
            correctIndex={1}
            explanation="Recurring invoices in an accounting platform (QuickBooks, Xero, FreeAgent) will automatically create and send the invoice on the specified date each month. The electrician does not need to remember, the client receives a professional invoice consistently, and cash flow becomes predictable. This is the single highest-impact automation for regular maintenance work."
          />

          {/* Section 5: The One-Tool Trap */}
          <div className="mb-8">
            <div className="border-l-2 border-purple-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">5. Avoiding the One-Tool Trap</h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The one-tool trap is the mistake of forcing a single application to handle every
                function in your business. The electrician who uses a spreadsheet as a calendar, a
                client database, an accounting system, and a task list has fallen into this trap.
                The spreadsheet was not designed for any of these functions, so it performs all of
                them poorly. The result is more time spent fighting the tool than saved by using it.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The opposite extreme is equally problematic: tool sprawl. The electrician who has 20
                different apps, each handling one tiny function, spends enormous mental energy
                switching between them and keeping them synchronised. When your job schedule is in
                one app, your client details in another, your invoices in a third, and your notes in
                a fourth, you are constantly copying information between systems &mdash; which is
                precisely the kind of manual admin that digital tools are supposed to eliminate.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                The sweet spot is typically 4&ndash;6 tools that integrate with each other. A
                calendar that syncs with your phone. An accounting app that connects to your bank. A
                cloud storage system that is accessible from all devices. A certification app that
                emails PDFs directly to clients. When these tools talk to each other, data flows
                naturally without manual transfer. The test is simple: if you are regularly copying
                information from one tool to another by hand, your toolset is not integrated
                properly and needs reconfiguring.
              </p>
            </div>
          </div>

          {/* Framework box */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-3">
              The Goldilocks Digital Toolkit
            </h3>
            <div className="space-y-2">
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Too few tools (1&ndash;2):</strong> You force tools
                into roles they were not designed for. A notes app is not a calendar. A spreadsheet
                is not an accounting system.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Too many tools (10+):</strong> Cognitive overhead
                exceeds time saved. You spend more time managing tools than doing work.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Just right (4&ndash;6):</strong> Calendar +
                Accounting/Invoicing + Certification + Cloud Storage + Notes/Tasks. Each tool does
                one thing well. Integration keeps data flowing.
              </p>
            </div>
          </div>

          {/* InlineCheck 3 */}
          <InlineCheck
            id="tmo-4-2-integration"
            question="An electrician tracks his jobs in a paper diary, sends invoices from a Word template via email, stores certificates on his phone's camera roll, and keeps receipts in a carrier bag. What is the primary problem with this setup?"
            options={[
              'He is not using enough tools',
              'Nothing integrates, data is siloed in disconnected systems, and retrieval is slow and unreliable',
              'Paper diaries are illegal for business use',
              'He should be using a single app for everything instead',
            ]}
            correctIndex={1}
            explanation="The core problem is disconnected systems. Job data in a paper diary cannot be linked to invoices in Word or certificates in the camera roll. Nothing is backed up. Retrieval requires physical searching. A letting agent asking for a certificate from 6 months ago requires scrolling through hundreds of camera roll photos. Connected digital tools solve all of these problems."
          />

          {/* Section 6: Construction Examples */}
          <div className="mb-8">
            <div className="border-l-2 border-green-500/50 pl-4 mb-4">
              <h2 className="text-white font-semibold text-lg">
                6. Putting It All Together &mdash; Real-World Examples
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Consider a sole-trader electrician who adopts the five essential tools. On Monday
                morning, he opens his calendar and sees three jobs scheduled with full details
                (addresses, scope, contact numbers). He drives to the first job, and his mileage app
                automatically logs the journey. He completes the consumer unit change, fills in the
                MWC on his certification app while on-site, and emails it to the client. He then
                opens his invoicing app, creates the invoice (pre-filled with his business details),
                and sends it before leaving.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                At the second job &mdash; an EICR for a letting agent &mdash; he completes the
                report on his tablet, noting observations as he inspects each circuit. The EICR is
                emailed to the letting agent from the certification app, and the PDF is
                automatically saved to his cloud storage in the correct Year/Client/Job folder. The
                invoice is sent immediately. His accounting app records the income and matches it
                against the bank payment when it arrives 5 days later. At tax time, his accountant
                downloads the annual report and the tax return takes an hour instead of a weekend.
              </p>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Now compare this with the electrician who does not use digital tools. He writes the
                job address on the back of his hand, forgets the client&rsquo;s phone number, and
                has to call back to get access details. He scribbles test results on a scrap of
                paper, intending to complete the MWC &ldquo;later.&rdquo; Later becomes next week,
                becomes next month. The letting agent chases for the EICR three times. The invoice
                is sent 6 weeks after the work. The mileage claim is a rough estimate. The tax
                return takes three days of searching through receipts. Every step is harder, slower,
                and less professional.
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
            <h3 className="text-white font-semibold text-sm mb-2">
              Adoption Strategy: One Tool at a Time
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Do not try to adopt all five tools simultaneously. Start with the calendar (week
              1&ndash;2). Once that is habitual, add the invoicing/accounting tool (weeks
              3&ndash;4). Then cloud storage (weeks 5&ndash;6). Then certification (weeks
              7&ndash;8). Then the notes/task system (weeks 9&ndash;10). By layering one tool at a
              time over 10 weeks, each becomes a habit before the next is added. Attempting
              everything at once leads to abandoning everything within a fortnight.
            </p>
          </div>

          {/* Section Summary */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Section Summary</h2>
            <div className="space-y-3">
              {[
                'Evaluate every tool by net time saved: learning cost + maintenance must be less than time saved within 4\u20138 weeks',
                'The five essential categories are calendar, invoicing/accounting, certification, cloud storage, and notes/tasks',
                'If it is not in the calendar, it does not exist \u2014 all commitments, deadlines, and reminders belong in one calendar',
                'Automation of recurring invoices, payment reminders, and mileage tracking eliminates hours of weekly admin',
                'The one-tool trap (forcing one tool to do everything) is as harmful as tool sprawl (too many disconnected tools)',
                'Adopt tools one at a time over 10 weeks to build sustainable habits rather than attempting everything at once',
              ].map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-lg mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  I am not very tech-savvy. Can I still use digital tools effectively?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Yes. The tools recommended here &mdash; calendars, invoicing apps, cloud storage
                  &mdash; are designed for non-technical users. If you can use WhatsApp and take
                  photos on your phone, you already have the skills needed. Start with the calendar,
                  which is the simplest tool, and build confidence before adding more complex tools.
                  Most apps also have YouTube tutorials specifically for beginners.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  How much should I expect to spend on digital tools?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  A functional digital toolkit for a sole trader costs approximately
                  &pound;30&ndash;60 per month: accounting software (&pound;12&ndash;30/month),
                  certification app (&pound;10&ndash;25/month), cloud storage
                  (&pound;2&ndash;8/month), and the calendar and notes apps are free. This is a
                  business expense that is tax-deductible and pays for itself many times over in
                  time saved and faster payment collection.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  What if I already use a job management platform like Tradify or ServiceM8?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Job management platforms often combine scheduling, invoicing, and job tracking in
                  one tool. If you are already using one effectively, it may cover 2&ndash;3 of the
                  five essential categories. Evaluate whether it genuinely handles each function
                  well or whether you are falling into the one-tool trap. Many electricians find
                  that a dedicated accounting tool (Xero, QuickBooks) alongside a job management
                  platform gives the best results, since the accounting function in job platforms is
                  often basic.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-2">
                  Should I use separate work and personal calendars?
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Use separate calendars within the same app, not separate apps. Most calendar
                  applications allow you to create multiple calendars that overlay in one view.
                  Having Work, Admin, Personal, and Deadlines as separate colour-coded calendars
                  within Google Calendar (or similar) means you can see everything in one view but
                  also toggle individual calendars on and off when you only need to see work
                  commitments.
                </p>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Section 2 Quiz: Digital Tools & Systems" />

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module 4
              </Link>
            </Button>
            <Button
              size="lg"
              className="min-h-[44px] bg-rose-500 hover:bg-rose-600 text-white touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../tmo-module-4-section-3">
                Next: Van, Tool &amp; Material Organisation
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
