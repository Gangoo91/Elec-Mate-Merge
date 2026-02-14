import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Clock,
  Calendar,
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FolderOpen,
  Award,
  Target,
  Users,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Off-Job Training', href: '/guides/off-job-training-hours' },
];

const tocItems = [
  { id: 'what-is-off-job', label: 'What Is Off-the-Job Training?' },
  { id: 'twenty-percent', label: 'The 20% Requirement' },
  { id: 'what-counts', label: 'What Counts' },
  { id: 'what-doesnt-count', label: 'What Does Not Count' },
  { id: 'evidence-requirements', label: 'Evidence Requirements' },
  { id: 'examples', label: 'Practical Examples' },
  { id: 'employer-obligations', label: 'Employer Obligations' },
  { id: 'tracking-with-elecmate', label: 'Tracking with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Off-the-job training must make up at least 20% of your paid working hours across the full apprenticeship. On a 30-hour week, that equals 6 hours per week dedicated to learning new knowledge, skills, and behaviours.',
  'Activities that count include college attendance, online study through platforms like Elec-Mate, shadowing experienced electricians on new tasks, manufacturer training events, directed study, and supervised practice of skills you have not yet mastered.',
  'Normal productive work you already know how to do does not count, even if it is relevant to the apprenticeship standard. English and maths functional skills study is also excluded.',
  'You must record evidence of your off-the-job training hours for your training provider and Ofsted. Elec-Mate OJT Tracker logs on-platform study time automatically and lets you add off-platform activities in seconds.',
  'Employers are legally required to provide the 20% time as a condition of the apprenticeship funding agreement. If your employer is not providing this, raise it with your training provider first.',
];

const faqs = [
  {
    question: 'Does off-the-job training have to happen at college?',
    answer:
      'No. College attendance is the most obvious form of off-the-job training, but it is not the only one. Online study on platforms like Elec-Mate, shadowing experienced electricians on new types of work, manufacturer training days, directed reading, supervised skills practice, toolbox talks that teach new knowledge, and industry visits all count. The test is whether the activity teaches you new knowledge, skills, or behaviours relevant to the apprenticeship standard. Any structured learning activity that meets this test — regardless of where it takes place — qualifies as off-the-job training.',
  },
  {
    question: 'What happens if I do not meet the 20% requirement?',
    answer:
      'Failing to meet the 20% off-the-job training requirement can prevent you from progressing to the End Point Assessment. The 20% is a gateway condition set by the ESFA. If your training provider cannot confirm you have met it, you cannot sit the EPA. In serious cases, the ESFA may claw back funding from the training provider, which creates a strong incentive for providers to enforce the requirement. Ofsted also checks OTJ records during provider inspections. The simplest solution is to track your hours consistently throughout the apprenticeship using a tool like Elec-Mate OJT Tracker so you always know where you stand.',
  },
  {
    question: 'Is the 20% calculated weekly or over the full apprenticeship?',
    answer:
      'The 20% is calculated over the total duration of the apprenticeship, not on a strict weekly basis. This gives you flexibility. Some weeks you might do more than 20% (for example, during a block-release college week), and other weeks you might do less (during a busy project on site). The ESFA expects off-the-job training to be spread reasonably throughout the programme, not crammed into a short period. Your training provider will review your hours at regular progress meetings and flag if you are falling behind the expected trajectory.',
  },
  {
    question: 'Can my employer refuse to give me time for off-the-job training?',
    answer:
      'No. Providing off-the-job training time is a contractual obligation your employer agreed to when they signed the apprenticeship agreement. It is a condition of receiving the apprenticeship funding from the ESFA. If your employer consistently denies you OTJ time — not releasing you for college, requiring you to work through study periods, or expecting you to train only in your own unpaid time — they are in breach of the agreement. Raise it with your training provider first, as they have a responsibility to ensure the employer meets their obligations. Document every instance and keep records.',
  },
  {
    question: 'Does studying on Elec-Mate count as off-the-job training?',
    answer:
      'Yes. Completing course modules, taking practice quizzes, using the flashcards tool, practising mock exams, using the EPA Simulator, studying with the AM2 Simulator, and working through BS 7671 content on Elec-Mate all qualify as off-the-job training. The platform automatically logs the time you spend on these activities, so your hours are tracked without any manual effort. If your employer agrees that evening or weekend study contributes to your apprenticeship, that time can also be counted — but this must be agreed with your employer in advance.',
  },
  {
    question: 'How do I prove my off-the-job training hours to Ofsted?',
    answer:
      'You need a record that shows the date, duration, description, and relevance of each OTJ activity. Traditional methods include paper logs or spreadsheets, but these are tedious and error-prone. Elec-Mate OJT Tracker generates Ofsted-ready records automatically: every on-platform study session is logged with timestamps and descriptions, off-platform activities can be added manually, and each entry can be tagged to apprenticeship standard criteria. You can produce a comprehensive, organised OTJ record in seconds rather than scrambling through incomplete spreadsheets.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description:
      'End Point Assessment components, grading criteria, and how to prepare effectively.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description: 'Digital evidence tracking and AI-powered criteria mapping for your portfolio.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-apprentice',
    title: 'Site Diary for Apprentices',
    description: 'How to keep a daily log that supports your OTJ evidence and portfolio.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/year-1-electrical-apprentice',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year on site as an electrical apprentice.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Complete guide to starting and completing an electrical apprenticeship in the UK.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-rights-pay-uk',
    title: 'Apprentice Rights and Pay',
    description: 'NMW rates, holiday entitlement, working hours, and your legal protections.',
    icon: Target,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-off-job',
    heading: 'What Is Off-the-Job Training?',
    content: (
      <>
        <p>
          Off-the-job training (OTJ or OJT) is structured learning time that is separate from your
          normal day-to-day work duties. It is a mandatory component of every apprenticeship in
          England, enforced by the Education and Skills Funding Agency (ESFA) as a condition of the
          apprenticeship funding your employer receives.
        </p>
        <p>
          The purpose is simple: without a formal requirement for dedicated learning time, there
          would be a real risk that apprentices are used as cheap labour without receiving the
          structured training that distinguishes an apprenticeship from ordinary employment. The
          ESFA's 20% rule ensures every apprentice gets proper training time built into their paid
          working week.
        </p>
        <p>
          For electrical apprentices on the Installation Electrician or Maintenance Electrician
          standard (ST0215), off-the-job training covers a wide range of activities. It is much
          broader than just college attendance. Understanding what counts — and what does not — is
          essential for meeting the requirement without stress and building a strong foundation for
          your{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'twenty-percent',
    heading: 'The 20% Requirement',
    content: (
      <>
        <p>
          The ESFA requires that at least 20% of an apprentice's paid working hours are spent on
          off-the-job training. This is calculated over the total duration of the apprenticeship,
          not on a strict week-by-week basis.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30-hour week:</strong> 20% = 6 hours per week of off-the-job training
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>37.5-hour week:</strong> 20% = 7.5 hours per week of off-the-job training
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>40-hour week:</strong> 20% = 8 hours per week of off-the-job training
              </span>
            </li>
          </ul>
        </div>
        <p>
          Over a typical 4-year apprenticeship on a 30-hour week (approximately 48 working weeks per
          year), the total off-the-job training requirement is around 1,152 hours. In practice, most
          training providers track a documented target of approximately 400 hours because college
          days are logged centrally by the provider. The 400 hours represent the evidence you
          personally need to provide for additional OTJ activities.
        </p>
        <p>
          The 20% is an average over the full programme. Some weeks you may exceed it (block-release
          college weeks), other weeks you may fall short (busy project periods). As long as the
          overall total reaches 20% by the gateway stage, you are compliant. However, the ESFA
          expects OTJ training to be spread reasonably — do not leave it all to the final months.
        </p>
      </>
    ),
  },
  {
    id: 'what-counts',
    heading: 'What Counts as Off-the-Job Training',
    content: (
      <>
        <p>
          The ESFA definition is: learning which is undertaken outside of the normal day-to-day
          working environment and leads towards the achievement of an apprenticeship. It can happen
          at the employer premises provided it is clearly distinct from normal work duties.
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                College and Training Provider Days
              </h3>
              <p className="text-white text-sm leading-relaxed">
                All time at college — lectures, workshops, practical sessions, tutorials, and
                assessments. This is the most straightforward OTJ activity and typically accounts
                for one day per week.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Online Learning and Study</h3>
              <p className="text-white text-sm leading-relaxed">
                Studying courses on Elec-Mate, completing quizzes, using the{' '}
                <SEOInternalLink href="/guides/am2-exam-preparation">
                  flashcards tool
                </SEOInternalLink>
                , practising mock exams, and working through BS 7671 content. Self-directed study of
                textbooks and technical resources also counts.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Shadowing and Mentoring</h3>
              <p className="text-white text-sm leading-relaxed">
                Observing experienced electricians on work types you have not done before. Being
                taught new techniques, approaches, or methods. The test is whether you are learning
                something new, not repeating something you already know.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Manufacturer Training and Industry Events
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Attending manufacturer training days, trade shows, exhibitions, and industry events.
                Learning about new products, systems, and installation methods directly relevant to
                your apprenticeship.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Supervised Skills Practice</h3>
              <p className="text-white text-sm leading-relaxed">
                Practising new skills in a supervised environment — safe isolation, testing
                techniques, two-way switching wiring. Using the Elec-Mate{' '}
                <SEOInternalLink href="/guides/am2-exam-preparation">AM2 Simulator</SEOInternalLink>{' '}
                or{' '}
                <SEOInternalLink href="/guides/epa-what-to-expect">EPA Simulator</SEOInternalLink>{' '}
                to rehearse assessment tasks.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-doesnt-count',
    heading: 'What Does Not Count',
    content: (
      <>
        <p>
          Understanding what is excluded is equally important. The following do not count towards
          the 20% off-the-job training requirement:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Normal Productive Work</h3>
              <p className="text-white text-sm leading-relaxed">
                Carrying out installation, testing, or maintenance tasks you already know how to do.
                Even if the work is directly relevant to the apprenticeship standard, repeating
                familiar tasks is on-the-job training, not off-the-job.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">English and Maths Study</h3>
              <p className="text-white text-sm leading-relaxed">
                Time spent on Level 2 Functional Skills in English and maths does not count. These
                are tracked separately under the apprenticeship funding rules.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Irrelevant Training</h3>
              <p className="text-white text-sm leading-relaxed">
                Training not directly relevant to the apprenticeship standard — general company
                induction, non-technical training, or activities outside the scope of ST0215.
              </p>
            </div>
          </div>
        </div>
        <p>
          A good rule of thumb: if you could not do this task before your apprenticeship started (or
          before this training session), and it is relevant to the standard, it counts. If you are
          repeating something you already know, it does not.
        </p>
      </>
    ),
  },
  {
    id: 'evidence-requirements',
    heading: 'Evidence Requirements',
    content: (
      <>
        <p>
          Recording off-the-job training hours is not just about keeping a running total. You need
          evidence that the training happened, what it covered, and how it links to the
          apprenticeship standard. This evidence is reviewed at progress meetings, checked at the
          gateway stage before the EPA, and may be inspected by Ofsted.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Date and time</strong> — when the activity took place
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Duration</strong> — how many hours the activity lasted
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Description</strong> — what you did and what you learned
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Link to the standard</strong> — which apprenticeship standard criteria the
                activity relates to
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supporting evidence</strong> — certificates, screenshots, photographs, or
                notes where available
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ofsted inspectors look for evidence that OTJ training is planned, meaningful, and directly
          relevant to the standard — not just box-ticking. Apprentices who can articulate what they
          learned and how it links to their qualification make a strong impression.
        </p>
        <p>
          Traditional paper logs and spreadsheets work but are tedious and easy to fall behind on.
          If you miss a few weeks, reconstructing your records from memory produces unreliable
          evidence. Digital tracking with a tool like Elec-Mate's OJT Tracker eliminates this
          problem entirely.
        </p>
      </>
    ),
  },
  {
    id: 'examples',
    heading: 'Practical Examples of Off-the-Job Training',
    content: (
      <>
        <p>
          Here are real examples of activities that electrical apprentices commonly log as
          off-the-job training:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <BookOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Morning: 2 Hours Studying BS 7671 on Elec-Mate
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Completed Module 4 of the 18th Edition course covering earthing arrangements (TN-S,
                TN-C-S, TT systems). Took the end-of-module quiz and scored 85%. Reviewed flashcards
                on earthing conductor sizing. Logged automatically by Elec-Mate.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Users className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Afternoon: 1 Hour Shadowing a Three-Phase Installation
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Observed the qualified electrician connecting a three-phase distribution board for
                the first time. Learned about phase rotation, neutral sizing, and labelling
                requirements. This was a new type of work not previously encountered.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <Wrench className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Workshop: 3 Hours Practising Safe Isolation
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Practised the full safe isolation procedure on the training rig at college. Used a
                proving unit, voltage indicator, and lock-off kit. Supervisor signed off competence
                for the first time.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <GraduationCap className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Evening: 45 Minutes on EPA Simulator
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Completed a full EPA practice scenario on Elec-Mate covering fault finding and
                diagnostic testing. Reviewed feedback on areas for improvement. Time logged
                automatically.
              </p>
            </div>
          </div>
        </div>
        <p>
          Each of these activities teaches new knowledge, skills, or behaviours. Each can be
          recorded with a date, duration, description, and link to the apprenticeship standard. Over
          four years, these entries build a comprehensive picture of your training journey.
        </p>
      </>
    ),
  },
  {
    id: 'employer-obligations',
    heading: 'Employer Obligations',
    content: (
      <>
        <p>
          Your employer has specific legal obligations regarding off-the-job training. These are
          conditions of the apprenticeship funding agreement signed with the ESFA — they are not
          optional.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide the time:</strong> Your employer must release you for at least 20%
                of your paid working hours to undertake off-the-job training. This includes college
                days, study time, and learning activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay for training time:</strong> All off-the-job training time must be paid
                at your normal{' '}
                <SEOInternalLink href="/guides/apprentice-rights-pay-uk">
                  hourly rate
                </SEOInternalLink>
                . Your employer cannot deduct pay for college days or study periods.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Support varied learning:</strong> Good employers expose apprentices to
                different types of work, pair them with experienced electricians for mentoring, and
                encourage manufacturer training and industry events.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Participate in reviews:</strong> Your employer should attend regular
                progress reviews with the training provider, discussing your OTJ hours and
                addressing any barriers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your employer is not meeting these obligations — not releasing you for college, making
          you work through study time, or expecting all training to happen in your own unpaid hours
          — raise it with your training provider first. If they cannot resolve it, contact the ESFA
          apprenticeship helpline. Document every instance where OTJ time was denied.
        </p>
        <SEOAppBridge
          title="Track Every OJT Hour Automatically"
          description="Elec-Mate OJT Tracker logs your on-platform study time automatically and lets you add off-platform activities in seconds. See your running total, compliance percentage, and projected completion date at a glance. Generate Ofsted-ready reports instantly."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'tracking-with-elecmate',
    heading: 'Tracking Hours with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate's OJT Tracker was built specifically for electrical apprentices. It takes the
          hassle out of recording off-the-job training hours and ensures you are always on top of
          the requirement.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Time Logging</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every minute you spend on Elec-Mate — the 46+ training courses, flashcards tool,
                  mock exams, EPA Simulator, AM2 Simulator, study planner content — is automatically
                  logged as off-the-job training. No manual entry needed for on-platform activities.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quick Manual Entries</h4>
                <p className="text-white text-sm leading-relaxed">
                  Add college days, toolbox talks, manufacturer training, shadowing sessions, and
                  directed study in a few taps. Each entry captures date, duration, description, and
                  activity category.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Compliance Dashboard</h4>
                <p className="text-white text-sm leading-relaxed">
                  See your total hours, percentage against the 400-hour target, weekly average, and
                  projected completion date. Traffic-light indicators show whether you are on track.
                  Weekly reminders prompt you to log any unrecorded activities.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <FolderOpen className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Portfolio Integration</h4>
                <p className="text-white text-sm leading-relaxed">
                  OTJ evidence feeds directly into your{' '}
                  <SEOInternalLink href="/guides/apprentice-portfolio">
                    apprentice portfolio
                  </SEOInternalLink>
                  . Each entry links to apprenticeship standard criteria and can include evidence
                  attachments — photographs, certificates, and notes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Never Fall Behind on OJT Hours"
          description="Join 430+ UK apprentices tracking off-the-job training hours with Elec-Mate. Automatic logging, 46+ training courses, compliance tracking, and Ofsted-ready records. 7-day free trial."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OffJobTrainingGuidePage() {
  return (
    <GuideTemplate
      title="Off-the-Job Training Hours | Apprentice Guide UK"
      description="Complete guide to the 20% off-the-job training hours requirement for UK electrical apprentices. What counts, evidence requirements, practical examples, employer obligations, and automatic tracking with Elec-Mate OJT Tracker."
      datePublished="2025-10-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Off-the-Job Training Hours:{' '}
          <span className="text-yellow-400">Your Complete Apprentice Guide</span>
        </>
      }
      heroSubtitle="Every electrical apprentice must spend at least 20% of their paid working hours on off-the-job training. This guide explains what that means, what activities count, how to record evidence, your employer's obligations, and how Elec-Mate's OJT Tracker makes the whole thing effortless."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Off-the-Job Training"
      relatedPages={relatedPages}
      ctaHeading="Track Your OJT Hours Effortlessly"
      ctaSubheading="Join 430+ UK apprentices tracking off-the-job training hours with Elec-Mate. Automatic logging, compliance dashboard, and Ofsted-ready records. 7-day free trial, cancel anytime."
    />
  );
}
