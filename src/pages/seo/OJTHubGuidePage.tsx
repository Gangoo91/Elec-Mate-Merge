import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  GraduationCap,
  Brain,
  ClipboardCheck,
  Award,
  Users,
  FolderOpen,
  Target,
  BarChart3,
  Clock,
  Camera,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'OJT Guide', href: '/guides/on-the-job-training-guide' },
];

const tocItems = [
  { id: 'what-is-ojt', label: 'What Is On-the-Job Training?' },
  { id: 'what-counts-as-ojt', label: 'What Counts as OJT' },
  { id: 'evidence-types', label: 'Evidence Types for OJT' },
  { id: 'skills-sign-off', label: 'Skills Sign-Off Process' },
  { id: 'supervisor-role', label: 'The Supervisor Role' },
  { id: 'tracking-progress', label: 'Tracking Your OJT Progress' },
  { id: 'common-mistakes', label: 'Common OJT Mistakes to Avoid' },
  { id: 'elecmate-ojt-features', label: 'OJT Tracking with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'On-the-job training (OJT) must make up at least 80% of your apprenticeship time. The remaining 20% is off-the-job training at college or with your training provider.',
  'OJT includes any productive work activity where you are developing the knowledge, skills, and behaviours defined in the apprenticeship standard (ST0215).',
  'You need a mix of evidence types: photos of completed work, work logs, witness testimonies from supervisors, reflective accounts, and signed skills observation records.',
  'Your supervisor or employer plays a critical role in OJT by providing structured work opportunities, observing your progress, and signing off completed skills.',
  'Elec-Mate provides a dedicated OJT tracker that maps your daily work to the apprenticeship standard criteria, so you always know what skills you have covered and what gaps remain.',
];

const faqs = [
  {
    question: 'What is the difference between on-the-job and off-the-job training?',
    answer:
      'On-the-job training (OJT) is the practical work you do with your employer on real job sites and installations. It accounts for at least 80% of your apprenticeship time. Off-the-job training (OTJ) is the structured learning that takes place away from your normal work duties, typically at college or with your training provider. This accounts for at least 20% of your apprenticeship time. Off-the-job training includes classroom teaching, workshops, online learning, and study activities that directly relate to the apprenticeship standard. Both types of training are mandatory under the apprenticeship funding rules. Your employer must allow you time for off-the-job training, and your training provider must ensure the content is relevant to the apprenticeship standard. The 20% off-the-job requirement is a minimum; some apprentices spend more time in training depending on their programme structure.',
  },
  {
    question: 'Does travel time or routine work count as OJT?',
    answer:
      'Travel time to and from job sites does not count as OJT. Routine work that you carry out competently and that does not involve new learning also does not count as structured OJT for evidence purposes, although it still counts as part of your 80% on-the-job time. What counts as evidenceable OJT is work where you are developing new skills, applying new knowledge, or working under guidance to build competence in an area you have not yet mastered. For example, if you have already demonstrated competence in single-phase consumer unit installations, doing another identical installation does not generate new OJT evidence. However, if you encounter a specific challenge during that installation (such as an unusual earthing arrangement or a non-standard circuit configuration), documenting that challenge and what you learned from it does count as valuable OJT evidence.',
  },
  {
    question: 'How many OJT hours do I need to complete?',
    answer:
      'The total number of OJT hours depends on the length of your apprenticeship. For the Installation Electrician / Maintenance Electrician standard (ST0215), the typical duration is 42 to 48 months. At 80% on-the-job time, this equates to approximately 5,500 to 6,400 hours of OJT over the full apprenticeship. However, the focus is on demonstrating competence against the apprenticeship standard, not on accumulating a specific number of hours. Your training provider and employer will track your progress against the standard criteria. You need to demonstrate competence across all knowledge, skills, and behaviours defined in the standard, regardless of how many hours it takes. Some apprentices achieve competence in certain areas faster than others, and the programme should be adapted to focus on areas where additional development is needed.',
  },
  {
    question: 'What if my employer does not give me varied enough work for OJT?',
    answer:
      "This is a common challenge, particularly for apprentices who work for specialist contractors (for example, a company that only does domestic rewires or only does commercial maintenance). If your employer cannot provide the range of work needed to cover all areas of the apprenticeship standard, there are several options. First, speak to your training provider. They have a duty to ensure your OJT covers the full standard and can work with your employer to identify opportunities. Second, your employer may arrange for you to spend time with partner companies or on different types of projects to broaden your experience. Third, your training provider may offer additional workshop or simulated practical sessions to cover areas that are not available on your employer's job sites. The key is communication: if you feel you are missing out on important experiences, raise it early with your employer and training provider.",
  },
  {
    question: 'Do I need to keep a daily log of my OJT activities?',
    answer:
      "While there is no strict requirement to complete a daily log, it is strongly recommended. A daily record of your OJT activities provides the raw material for your portfolio, feeds into your progress reviews, and gives you rich examples to discuss in your professional discussion at EPA. The best approach is to spend 5 to 10 minutes at the end of each working day recording what you did, what skills you used or developed, any challenges you faced, and what you learned. Include photos of your work wherever possible. Over the course of a 4-year apprenticeship, this daily habit builds an incredibly comprehensive record of your development. Elec-Mate's site diary feature is designed for exactly this purpose, with prompts to help you capture the right information and automatic mapping to the apprenticeship standard criteria.",
  },
  {
    question: 'Can OJT evidence be used in my EPA professional discussion?',
    answer:
      'Yes, absolutely. Your OJT evidence forms the foundation of your portfolio, and the portfolio is the basis for the professional discussion component of the End Point Assessment. The EPAO assessor will review your portfolio before the professional discussion and select specific entries to ask questions about. Strong OJT evidence — detailed work logs, clear photos, thoughtful reflective accounts, and supervisor witness testimonies — gives the assessor confidence in your competence and provides rich starting points for discussion. Weak or sparse OJT evidence makes the professional discussion harder because the assessor has less to work with. The quality of your OJT evidence directly influences the quality of your professional discussion, which in turn influences your overall EPA grade.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Portfolio Building Guide',
    description: 'How to turn your OJT evidence into a portfolio that impresses the EPAO assessor.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary Guide',
    description:
      'Daily diary keeping that captures OJT evidence and builds your portfolio automatically.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-assessment-guide',
    title: 'Assessment Guide',
    description: 'Complete overview of on-programme assessment, gateway, and EPA stages.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Everything you need to know about starting and completing an electrical apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/epa-preparation',
    title: 'EPA Preparation Guide',
    description: 'Strategies for preparing for every component of the End Point Assessment.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-mental-health',
    title: 'Mental Health for Apprentices',
    description:
      'Support and resources for managing the pressures of an electrical apprenticeship.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-ojt',
    heading: 'What Is On-the-Job Training?',
    content: (
      <>
        <p>
          On-the-job training (OJT) is the practical, workplace-based learning that makes up the
          majority of your electrical apprenticeship. It is the time you spend working on real job
          sites with your employer, developing the hands-on skills and practical knowledge that
          classroom learning alone cannot provide.
        </p>
        <p>
          Under the apprenticeship funding rules, OJT must account for at least 80% of your
          apprenticeship time. For a typical 4-year electrical apprenticeship, that is roughly 3 to
          4 days per week on site with your employer. The remaining 20% is off-the-job training,
          usually at college or with an independent training provider, covering the theoretical
          knowledge and formal qualifications.
        </p>
        <p>
          OJT is not just "being at work." It is structured development where you are actively
          building the knowledge, skills, and behaviours defined in the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
            apprenticeship standard (ST0215)
          </SEOInternalLink>
          . Every task you carry out on site is an opportunity to develop competence, and the
          evidence you collect during OJT forms the foundation of your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio-guide">portfolio</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'what-counts-as-ojt',
    heading: 'What Counts as OJT',
    content: (
      <>
        <p>
          Not every minute at work generates OJT evidence. Understanding what counts helps you
          identify the learning opportunities in your daily work and capture them properly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>First-time installations</strong> — the first time you install a consumer
                unit, wire a ring circuit, install containment, or fit accessories under
                supervision. Document everything.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing</strong> — carrying out continuity tests, insulation
                resistance tests, earth loop impedance tests, and RCD tests on real installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding</strong> — diagnosing electrical faults using logical methods
                and test equipment, identifying the cause, and carrying out the repair.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation</strong> — performing{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedures
                </SEOInternalLink>{' '}
                before working on circuits, demonstrating competence with a voltage indicator and
                proving dead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety</strong> — completing risk assessments, method statements,
                toolbox talks, and demonstrating safe working practices on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Customer communication</strong> — explaining work to customers, discussing
                options, and handling queries. This covers the behaviours element of the standard.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The key principle is that OJT evidence should show development and learning. Repeating a
          task you have already mastered is productive work, but it does not generate new OJT
          evidence unless you encounter something new or apply your skills in a different context.
        </p>
      </>
    ),
  },
  {
    id: 'evidence-types',
    heading: 'Evidence Types for OJT',
    content: (
      <>
        <p>
          Strong OJT evidence uses a mix of formats to demonstrate your competence from different
          angles. The more varied your evidence, the more convincing your portfolio.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographs</strong> — before, during, and after photos of installations.
                Show containment runs, cable terminations, consumer units, and finished work. Date
                and annotate every photo with what it shows and which skills it demonstrates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work logs</strong> — daily records of what you did, what skills you applied,
                and what you learned. Keep these specific: "Installed 6-way Hager consumer unit with
                split-load RCD configuration, connected 4 radial circuits" is far better than
                "Worked on consumer unit."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Witness testimonies</strong> — written statements from your supervisor or
                employer confirming that they observed you carrying out specific tasks to a
                competent standard. These carry significant weight with EPAO assessors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reflective accounts</strong> — your own written reflection on what you
                learned from a specific experience, what went well, what you would do differently,
                and how you will apply the learning in the future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Completed certificates</strong> — EICs, Minor Works certificates, and test
                result schedules from real installations you contributed to. These demonstrate your
                inspection and testing competence.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Capture OJT evidence on site with Elec-Mate"
          description="Take photos, dictate work logs, and collect witness testimonies directly in the app. Every piece of evidence automatically maps to the apprenticeship standard criteria. Build your portfolio as you work."
          icon={Camera}
        />
      </>
    ),
  },
  {
    id: 'skills-sign-off',
    heading: 'Skills Sign-Off Process',
    content: (
      <>
        <p>
          Skills sign-off is the formal process where your supervisor or employer confirms that you
          have demonstrated competence in a specific area of the apprenticeship standard. It is one
          of the most important forms of OJT evidence because it carries the weight of a qualified
          professional's judgement.
        </p>
        <p>The sign-off process typically works like this:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>You carry out a task on site</strong> — for example, installing a ring
              circuit, performing an insulation resistance test, or carrying out a safe isolation
              procedure.
            </li>
            <li>
              <strong>Your supervisor observes your work</strong> — they watch you carry out the
              task, checking that you follow correct procedures, work safely, and produce a
              professional result.
            </li>
            <li>
              <strong>The supervisor records the observation</strong> — using a skills observation
              record or competence sign-off sheet that references the specific apprenticeship
              standard criteria being demonstrated.
            </li>
            <li>
              <strong>You both sign the record</strong> — confirming that the observation took
              place, the task was completed to a satisfactory standard, and the relevant skills have
              been demonstrated.
            </li>
          </ol>
        </div>
        <p>
          Some skills require multiple sign-offs to demonstrate consistent competence. For example,
          your training provider may require three separate observations of safe isolation before
          signing off that skill as fully achieved. The number of required observations varies by
          training provider and by the complexity of the skill.
        </p>
        <p>
          Keep your sign-off records organised and up to date. At the gateway meeting, your training
          provider and employer will review these records to determine whether you have demonstrated
          competence across all areas of the standard.
        </p>
      </>
    ),
  },
  {
    id: 'supervisor-role',
    heading: 'The Supervisor Role in OJT',
    content: (
      <>
        <p>
          Your supervisor (or workplace mentor) is one of the most important people in your
          apprenticeship. They control the work you are exposed to, observe your development,
          provide feedback, and ultimately sign off your skills. A good supervisor-apprentice
          relationship can accelerate your learning significantly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structured work allocation</strong> — a good supervisor plans your work to
                ensure you get exposure to a range of tasks that cover the apprenticeship standard.
                They do not just give you the same job every day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Progressive responsibility</strong> — they gradually increase the complexity
                and responsibility of the work you do, from assisting on tasks to carrying them out
                independently under observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular feedback</strong> — they tell you what you did well and what you
                need to improve, on a daily basis. Good feedback is specific: "Your cable
                terminations in the consumer unit were neat and well-torqued" rather than "Good
                job."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Skills observation and sign-off</strong> — they observe you carrying out
                tasks and formally record your competence against the apprenticeship standard
                criteria.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Progress review participation</strong> — they attend your regular progress
                reviews with the training provider and contribute their assessment of your
                development.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your supervisor is not providing the structure and feedback you need, raise it with
          your training provider. They have a duty to ensure your OJT is effective and can work with
          your employer to improve the supervisory arrangement.
        </p>
      </>
    ),
  },
  {
    id: 'tracking-progress',
    heading: 'Tracking Your OJT Progress',
    content: (
      <>
        <p>
          Tracking your OJT progress is essential. Without a clear picture of what skills you have
          covered and what gaps remain, you risk reaching the gateway with incomplete evidence or
          missing competence in key areas.
        </p>
        <p>Effective OJT tracking covers three things:</p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Skills Coverage</h3>
            <p className="text-white text-sm leading-relaxed">
              Which skills in the apprenticeship standard have you demonstrated? Which ones still
              need evidence? A skills coverage tracker shows you the gaps so you can target specific
              work opportunities.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Evidence Quality</h3>
            <p className="text-white text-sm leading-relaxed">
              Is your evidence strong enough? Do you have a mix of photos, work logs, witness
              testimonies, and reflective accounts? A single photo is weaker than a photo with a
              detailed work log and a supervisor witness testimony.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Timeline</h3>
            <p className="text-white text-sm leading-relaxed">
              Are you on track to complete all OJT requirements before the gateway? If you are
              halfway through the apprenticeship but have only covered 30% of the skills, you need
              to accelerate.
            </p>
          </div>
        </div>
        <p>
          Many apprentices use paper-based tracking sheets provided by their training provider.
          These work, but they are easy to lose, hard to update on site, and provide no automatic
          gap analysis. Digital tracking tools are significantly more effective, especially when
          they integrate with your portfolio and site diary.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common OJT Mistakes to Avoid',
    content: (
      <>
        <p>
          These are the most common mistakes apprentices make with OJT. Avoiding them will save you
          time and stress later in the apprenticeship.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leaving evidence collection to the end</strong> — the biggest mistake. If
                you do not capture evidence as you work, you cannot recreate it later. A photo you
                forgot to take 6 months ago is gone forever.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vague work logs</strong> — "Did wiring" tells the assessor nothing.
                "Installed twin and earth 2.5mm cables from consumer unit to 6 double socket outlets
                on a radial circuit, tested insulation resistance at 200 megohms" tells them
                everything.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not requesting witness testimonies</strong> — supervisors are busy. If you
                do not ask them to observe your work and sign it off, it probably will not happen.
                Take the initiative and ask.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring behaviours evidence</strong> — the apprenticeship standard includes
                behaviours (professionalism, communication, teamwork). Many apprentices focus only
                on technical skills and forget to collect evidence of behaviours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not mapping evidence to the standard</strong> — if your evidence is not
                linked to specific apprenticeship standard criteria, it is harder to demonstrate
                coverage at the gateway and during the EPA professional discussion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecmate-ojt-features',
    heading: 'OJT Tracking with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate's apprentice hub includes dedicated OJT tracking tools designed to make evidence
          collection effortless and ensure nothing falls through the gaps.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">OJT Progress Dashboard</h4>
                <p className="text-white text-sm leading-relaxed">
                  See your skills coverage at a glance. The dashboard maps your evidence to every
                  criterion in the apprenticeship standard and highlights gaps that need attention.
                  Traffic-light indicators show which skills are fully evidenced, partially
                  evidenced, or still missing.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Integrated Site Diary</h4>
                <p className="text-white text-sm leading-relaxed">
                  The{' '}
                  <SEOInternalLink href="/guides/site-diary-for-apprentices">
                    site diary
                  </SEOInternalLink>{' '}
                  captures your daily work activities with guided prompts. Each entry automatically
                  feeds into your OJT tracker and portfolio, so a single daily log covers three
                  requirements at once.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Portfolio Builder</h4>
                <p className="text-white text-sm leading-relaxed">
                  Your OJT evidence feeds directly into the{' '}
                  <SEOInternalLink href="/guides/apprentice-portfolio-guide">
                    portfolio builder
                  </SEOInternalLink>
                  . Photos, work logs, and reflective accounts are automatically organised and
                  mapped to the apprenticeship standard criteria. When you reach the gateway, your
                  portfolio is already complete.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Tutor Support</h4>
                <p className="text-white text-sm leading-relaxed">
                  Encountered something on site you do not understand? Ask the AI tutor. Get instant
                  explanations of BS 7671 regulations, electrical science principles, and
                  installation methods. Turn every day on site into a learning opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start tracking your OJT today"
          description="Join thousands of electrical apprentices using Elec-Mate to track OJT progress, build portfolios, and prepare for EPA. OJT tracker, site diary, portfolio builder, 46+ courses, flashcards, and AI tutor. 7-day free trial."
          icon={BarChart3}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OJTHubGuidePage() {
  return (
    <GuideTemplate
      title="On-the-Job Training Guide | Electrical Apprentice"
      description="Complete guide to on-the-job training for electrical apprentices. What counts as OJT, evidence types, skills sign-off process, supervisor role, tracking progress, and common mistakes to avoid."
      datePublished="2025-07-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          On-the-Job Training Guide:{' '}
          <span className="text-yellow-400">Making Every Day on Site Count</span>
        </>
      }
      heroSubtitle="On-the-job training makes up at least 80% of your electrical apprenticeship. This guide explains what counts as OJT, the evidence you need to collect, how skills sign-off works, the role of your supervisor, and how to track your progress so you reach the gateway fully prepared."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About On-the-Job Training"
      relatedPages={relatedPages}
      ctaHeading="Track Your OJT Progress with Elec-Mate"
      ctaSubheading="Join thousands of electrical apprentices using Elec-Mate to track on-the-job training, build portfolios, and prepare for EPA. OJT tracker, site diary, portfolio builder, 46+ courses, and AI tutor. 7-day free trial."
    />
  );
}
