import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  FolderOpen,
  BarChart3,
  Brain,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Off-the-Job Training Hours', href: '/guides/off-the-job-training-hours' },
];

const tocItems = [
  { id: 'what-is-otj', label: 'What Is Off-the-Job Training?' },
  { id: 'twenty-percent-rule', label: 'The 20% Requirement Explained' },
  { id: 'what-counts', label: 'What Counts as Off-the-Job Training' },
  { id: 'what-doesnt-count', label: 'What Does Not Count' },
  { id: 'calculating-hours', label: 'How to Calculate Your Hours' },
  { id: 'recording-evidence', label: 'Recording and Evidencing Hours' },
  { id: 'ofsted-inspections', label: 'Ofsted and OTJ Records' },
  { id: 'employer-responsibilities', label: 'Employer Responsibilities' },
  { id: 'elecmate-otj-tracker', label: 'Tracking Hours with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Off-the-job training means at least 20% of your paid working hours must be spent learning new knowledge, skills, and behaviours related to your apprenticeship. This is not just college — it includes many activities beyond the classroom.',
  'Activities that count include college days, online learning, shadowing experienced electricians, mentoring sessions, manufacturer training, industry visits, directed study, and practice of new skills. The key test is whether it teaches you something new relevant to the apprenticeship standard.',
  'Activities that do not count include performing normal work duties you already know how to do, English and maths functional skills study, and any training not directly relevant to the apprenticeship standard.',
  'On a typical 30-hour contracted week, 20% equals 6 hours per week of off-the-job training. Over a 4-year apprenticeship, this totals approximately 1,248 hours — though the practical target tracked by most providers is around 400 hours of documented evidence.',
  'Elec-Mate OJT Tracker automatically logs your off-the-job hours against the 400-hour target. It categorises activities, tracks compliance percentage in real time, collects evidence, and generates Ofsted-ready records effortlessly.',
];

const faqs = [
  {
    question: 'Does off-the-job training have to happen at college?',
    answer:
      'No. Off-the-job training is not limited to college attendance. While your weekly college day is the most obvious form of off-the-job training, many other activities qualify. Directed study at home or on the employer premises, online learning through platforms like Elec-Mate, shadowing experienced electricians on new types of work, manufacturer training events, industry visits, toolbox talks that teach new knowledge, and supervised practice of skills you have not yet mastered all count as off-the-job training. The critical test is whether the activity is teaching you new knowledge, skills, or behaviours directly relevant to the apprenticeship standard. Normal productive work — tasks you already know how to do and are doing as part of your regular job duties — does not count, even if it relates to electrical installation.',
  },
  {
    question: 'What happens if I do not meet the 20% off-the-job training requirement?',
    answer:
      'Failing to meet the 20% off-the-job training requirement can have serious consequences for your apprenticeship. The 20% requirement is set by the Education and Skills Funding Agency (ESFA) and is a condition of the apprenticeship funding. If you do not meet it, your training provider may be unable to confirm that you have met the apprenticeship requirements at the gateway stage, which means you cannot progress to the End Point Assessment. In extreme cases, the ESFA may claw back funding from the training provider, which creates a strong incentive for providers to monitor and enforce the requirement. Ofsted also checks off-the-job training records during provider inspections. If your provider is rated poorly by Ofsted partly due to insufficient OTJ training across their apprentices, it reflects badly on the quality of your apprenticeship. The simplest approach is to track your hours consistently throughout the apprenticeship so you always know where you stand.',
  },
  {
    question: 'How do I record off-the-job training hours?',
    answer:
      'Off-the-job training hours must be recorded with sufficient detail to demonstrate what activity was carried out, when, for how long, and how it relates to the apprenticeship standard. Traditional methods include paper logs or spreadsheets where you manually enter each activity with dates, times, descriptions, and links to the standard criteria. However, manual tracking is tedious and error-prone. Elec-Mate OJT Tracker automates this process: every study session on the platform is automatically logged, and you can add manual entries for off-platform activities (college days, site-based training, manufacturer events) with a few taps. Each entry is categorised by activity type and mapped to the apprenticeship standard. The tracker calculates your total hours, percentage towards the 400-hour target, and weekly average, giving you a real-time view of your compliance.',
  },
  {
    question: 'Does studying on Elec-Mate count as off-the-job training?',
    answer:
      'Yes, studying on Elec-Mate counts as off-the-job training provided it meets the ESFA definition: it must be teaching you new knowledge, skills, or behaviours directly relevant to the apprenticeship standard, and it must happen during your paid working hours (or be recognised by your employer as contributing to your paid hours). Completing course modules, taking practice quizzes, using flashcards for new topics, practising mock exams, using the EPA Simulator, and studying BS 7671 content through the platform all qualify. Elec-Mate automatically logs the time you spend on these activities, so your off-the-job hours are tracked without any manual effort. If your employer agrees that evening or weekend study contributes to your apprenticeship, that time can also be counted — but this must be agreed with your employer in advance.',
  },
  {
    question: 'Is the 20% requirement based on total hours or weekly hours?',
    answer:
      'The 20% requirement is calculated over the total duration of the apprenticeship, not on a strict week-by-week basis. This means that if you have some weeks with more off-the-job training (for example, a block-release college week) and some weeks with less (for example, during a busy project where your employer needs you on site full time), you can still meet the requirement as long as the total across the full apprenticeship reaches 20% of your total paid hours. However, the ESFA expects off-the-job training to be spread reasonably throughout the apprenticeship rather than concentrated into a short period. Your training provider will monitor your hours at regular review meetings and flag if you are falling behind the expected trajectory. Elec-Mate OJT Tracker shows your running total, weekly average, and projected completion, so you always know whether you are on track.',
  },
  {
    question: 'Can my employer refuse to give me off-the-job training time?',
    answer:
      'No. Providing off-the-job training time is a contractual obligation your employer agreed to when they signed the apprenticeship agreement. The ESFA requires employers to give apprentices at least 20% of their paid working hours for off-the-job training as a condition of receiving the apprenticeship funding. If your employer is consistently not providing this time — for example, by not releasing you for college, by requiring you to work through study periods, or by expecting you to do all training in your own unpaid time — they are in breach of the apprenticeship agreement. Raise the issue first with your training provider, who has a responsibility to ensure the employer meets their obligations. If the training provider cannot resolve it, you can contact the ESFA apprenticeship helpline. Document every instance where off-the-job training time was denied — this evidence will support your case.',
  },
  {
    question: 'What is the difference between on-the-job and off-the-job training?',
    answer:
      'On-the-job training is learning that happens through doing your normal job — carrying out installations, testing circuits, fixing faults, and working alongside experienced electricians on tasks you are already somewhat familiar with. It is valuable and essential for developing practical competence, but it does not count towards the 20% off-the-job requirement. Off-the-job training is learning new knowledge, skills, or behaviours that you have not yet acquired. The key distinction is the word "new." If you are practising a skill you have already learned (for example, wiring a socket outlet for the hundredth time), that is on-the-job training. If you are learning a skill for the first time (for example, being shown how to wire a two-way switching circuit by your supervisor), that is off-the-job training, even though it is happening on site. College attendance, online courses, directed study, and manufacturer training are clearly off-the-job. Activities on the employer premises can also qualify if they are teaching you something new.',
  },
];

const relatedPages = [
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA What to Expect',
    description: 'End Point Assessment explained — components, grading, and preparation.',
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
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary for Apprentices',
    description: 'How to keep a daily log that supports your OTJ evidence and portfolio.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/year-1-apprentice-guide',
    title: 'Year 1 Apprentice Guide',
    description: 'What to expect in your first year as an electrical apprentice.',
    icon: Calendar,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to starting and completing an electrical apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: 'Pay rates, JIB grades, and how pay increases through your apprenticeship.',
    icon: Target,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-is-otj',
    heading: 'What Is Off-the-Job Training?',
    content: (
      <>
        <p>
          Off-the-job training (OTJ or OJT) is learning that happens away from your normal
          day-to-day work duties. It is a mandatory component of every apprenticeship in England,
          required by the Education and Skills Funding Agency (ESFA) as a condition of the
          apprenticeship funding your employer receives.
        </p>
        <p>
          The purpose of off-the-job training is to ensure that apprentices receive dedicated
          learning time — time specifically set aside for acquiring new knowledge, skills, and
          behaviours relevant to the apprenticeship standard. Without this requirement, there would
          be a risk that apprentices simply work as cheap labour without receiving the structured
          training that distinguishes an apprenticeship from ordinary employment.
        </p>
        <p>
          For electrical apprentices on the Installation Electrician / Maintenance Electrician
          standard (ST0215), off-the-job training encompasses everything from formal college
          attendance to online study, manufacturer training, supervised practice of new skills, and
          directed research. It is broader than most apprentices realise — and understanding what
          counts (and what does not) is essential for meeting the requirement without stress.
        </p>
        <p>
          Meeting the off-the-job training requirement is also a gateway condition for the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">End Point Assessment</SEOInternalLink>.
          If you cannot demonstrate that you have completed sufficient off-the-job training hours,
          you cannot progress to the EPA and complete your apprenticeship.
        </p>
      </>
    ),
  },
  {
    id: 'twenty-percent-rule',
    heading: 'The 20% Requirement Explained',
    content: (
      <>
        <p>
          The ESFA requires that at least 20% of an apprentice's paid working hours are spent on
          off-the-job training. This is calculated over the total duration of the apprenticeship,
          not on a week-by-week basis — though your training provider will monitor your progress at
          regular intervals to ensure you stay on track.
        </p>
        <p>
          <strong>What 20% means in practice:</strong> If you work a standard 37.5-hour week, 20%
          equals 7.5 hours per week. If your contract is 30 hours per week, 20% equals 6 hours per
          week. Over a 4-year apprenticeship on a 37.5-hour week (approximately 48 working weeks per
          year, accounting for holidays), the total off-the-job training requirement is
          approximately 1,440 hours. In practice, the target tracked by most training providers is
          around 400 documented hours because not every hour needs to be individually evidenced —
          college attendance is logged centrally by the provider, for example.
        </p>
        <p>
          <strong>Flexibility:</strong> The 20% is an average over the entire apprenticeship. Some
          weeks you may do more than 20% (for example, during block-release college weeks), and some
          weeks you may do less (for example, during intensive project periods at work). As long as
          the overall total reaches 20% by the time you approach the gateway, you are compliant.
          However, the ESFA expects off-the-job training to be spread reasonably throughout the
          programme — do not leave it all to the final few months.
        </p>
        <p>
          <strong>Who tracks it:</strong> Both you and your training provider are responsible for
          tracking off-the-job training hours. Your provider will review your hours at regular
          progress review meetings (typically every 6 to 12 weeks) and flag any shortfall. You are
          responsible for recording activities that happen outside of formal college sessions —
          online study, shadowing, manufacturer training, and directed reading.
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
          The ESFA definition of off-the-job training is: learning which is undertaken outside of
          the normal day-to-day working environment and leads towards the achievement of an
          apprenticeship. It can be delivered at the apprentice's normal place of work (the employer
          premises) provided it is clearly distinct from normal work duties.
        </p>
        <p>The following activities count as off-the-job training for electrical apprentices:</p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                College or Training Provider Days
              </h3>
              <p className="text-white text-sm leading-relaxed">
                All time spent at college or with your training provider — lectures, workshops,
                practical sessions, tutorials, and assessments. This is the most straightforward
                form of OTJ training and typically accounts for one day per week.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Online Learning and Study</h3>
              <p className="text-white text-sm leading-relaxed">
                Studying courses, completing quizzes, using flashcards, and practising mock exams on
                platforms like Elec-Mate. Self-directed study of BS 7671, textbooks, and technical
                resources also counts. The key is that it must be learning new knowledge or skills.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Shadowing and Mentoring</h3>
              <p className="text-white text-sm leading-relaxed">
                Observing or being taught by experienced electricians on types of work you have not
                done before. Being mentored on new skills, techniques, or approaches. This counts
                even when it happens on the employer's premises — the test is whether you are
                learning something new rather than doing your usual work.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Manufacturer Training and Industry Visits
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Attending manufacturer training days (for example, learning about a new consumer
                unit range, EV charger installation, or smart home system). Visiting trade shows,
                exhibitions, and industry events. These activities develop knowledge directly
                relevant to your role.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Practice and Skills Development
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Practising new skills in a supervised environment — for example, practising safe
                isolation, testing techniques, or two-way switching wiring at the workshop. Using
                the Elec-Mate AM2 Simulator or EPA Simulator to practise assessment-related skills.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-doesnt-count',
    heading: 'What Does Not Count as Off-the-Job Training',
    content: (
      <>
        <p>
          Understanding what does not count is equally important. The following activities are
          excluded from the 20% off-the-job training calculation:
        </p>
        <div className="space-y-3 my-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Normal Work Duties</h3>
              <p className="text-white text-sm leading-relaxed">
                Carrying out installation, testing, or maintenance work that you already know how to
                do as part of your regular job duties. Even if this work is directly relevant to the
                apprenticeship standard, it is on-the-job training, not off-the-job. The distinction
                is whether you are learning something new or practising something you already know.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">English and Maths Study</h3>
              <p className="text-white text-sm leading-relaxed">
                Time spent studying for Level 2 Functional Skills in English and maths does not
                count towards the 20% off-the-job training requirement. These are separate
                requirements under the apprenticeship funding rules and are tracked independently.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">
                Training Not Relevant to the Standard
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Training that is not directly relevant to the apprenticeship standard — for example,
                general company induction, non-technical training, or training for activities
                outside the scope of the ST0215 standard — does not count.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white text-base mb-1">Progress Reviews</h3>
              <p className="text-white text-sm leading-relaxed">
                Regular progress review meetings with your training provider or employer — while
                valuable — are typically not counted as off-the-job training unless they include
                structured learning content.
              </p>
            </div>
          </div>
        </div>
        <p>
          The grey area between "learning something new" and "doing your normal work" can sometimes
          be confusing. A good rule of thumb: if you could not do this task before your
          apprenticeship started (or before this training session), and it is relevant to the
          apprenticeship standard, then it counts. If you are repeating a task you already know how
          to do, it does not count — even if you are getting better at it through repetition.
        </p>
      </>
    ),
  },
  {
    id: 'calculating-hours',
    heading: 'How to Calculate Your Hours',
    content: (
      <>
        <p>
          Calculating your off-the-job training hours requirement is straightforward once you know
          your contracted hours and apprenticeship duration.
        </p>
        <p>
          <strong>Step 1 — Determine your weekly contracted hours:</strong> This is the number of
          paid working hours per week specified in your employment contract. Common figures are
          37.5, 40, or 30 hours per week for electrical apprentices.
        </p>
        <p>
          <strong>Step 2 — Calculate 20% of weekly hours:</strong> Multiply your weekly hours by
          0.2. For a 37.5-hour week, 20% = 7.5 hours per week. For a 30-hour week, 20% = 6 hours per
          week.
        </p>
        <p>
          <strong>Step 3 — Calculate total hours over the apprenticeship:</strong> Multiply your
          weekly OTJ requirement by the number of working weeks in the apprenticeship. For a 4-year
          apprenticeship with approximately 48 working weeks per year (allowing for holidays), the
          total is approximately 1,440 hours on a 37.5-hour week (7.5 x 48 x 4 = 1,440).
        </p>
        <p>
          <strong>Practical target:</strong> In practice, your training provider typically tracks a
          lower figure — around 400 documented hours — because not every hour of off-the-job
          training needs individual evidence. Your college days are logged centrally, so you mainly
          need to record additional activities: online study, shadowing, manufacturer training, and
          directed practice. The 400-hour target represents the documented evidence you personally
          need to provide.
        </p>
        <p>
          <strong>Weekly average:</strong> To stay on track for 400 documented hours over a 4-year
          apprenticeship (192 working weeks), you need to document approximately 2 hours per week of
          off-the-job training beyond your college day. This is very achievable — a couple of study
          sessions on Elec-Mate, a toolbox talk, or an hour of directed reading each week adds up
          quickly.
        </p>
        <SEOAppBridge
          title="Automatic OJT Hour Tracking"
          description="Elec-Mate OJT Tracker logs your off-the-job hours automatically. Every study session on the platform is recorded. Add manual entries for off-platform activities in seconds. See your total, weekly average, and compliance percentage at a glance."
          icon={Clock}
        />
      </>
    ),
  },
  {
    id: 'recording-evidence',
    heading: 'Recording and Evidencing Your Hours',
    content: (
      <>
        <p>
          Recording off-the-job training hours is not just about keeping a total — it is about
          providing evidence that the training happened, what it covered, and how it relates to the
          apprenticeship standard. This evidence is reviewed by your training provider at progress
          reviews, checked at the gateway stage before the{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">EPA</SEOInternalLink>, and may be
          inspected by Ofsted.
        </p>
        <p>
          <strong>What to record for each activity:</strong> Date and time of the activity. Duration
          (how many hours). Description of what you did. What new knowledge, skills, or behaviours
          you gained. How the activity links to the apprenticeship standard criteria. Any evidence
          (certificates, screenshots, notes, photographs).
        </p>
        <p>
          <strong>Traditional methods:</strong> Many apprentices use a paper log or spreadsheet
          provided by their training provider. These work but are tedious to maintain, easy to fall
          behind on, and difficult to verify. If you lose the log or forget to update it for several
          weeks, reconstructing your hours from memory produces unreliable records.
        </p>
        <p>
          <strong>Digital tracking with Elec-Mate:</strong> Elec-Mate's OJT Tracker eliminates the
          tedium of manual recording. On-platform activities (courses, quizzes, flashcards, mock
          exams, EPA Simulator sessions) are logged automatically with timestamps and descriptions.
          Off-platform activities (college days, site-based training, manufacturer events) can be
          added manually with a few taps. Each entry is categorised by activity type and can be
          tagged to apprenticeship standard criteria. The tracker calculates your running total,
          weekly average, compliance percentage against the 400-hour target, and projects when you
          will reach 100% at your current pace.
        </p>
        <p>
          <strong>Evidence collection:</strong> Beyond the hours log, Elec-Mate allows you to attach
          evidence to each entry — a photograph from a training session, a certificate from a
          manufacturer course, a screenshot of a completed quiz, or a note from a mentoring session.
          This evidence strengthens your OTJ record and links naturally to your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            apprentice portfolio
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'ofsted-inspections',
    heading: 'Ofsted and Off-the-Job Training Records',
    content: (
      <>
        <p>
          Ofsted inspects apprenticeship training providers and pays specific attention to
          off-the-job training. During an inspection, Ofsted may review individual apprentice OTJ
          records, interview apprentices about their training experience, and assess whether the
          training provider is ensuring that apprentices receive the required 20% off-the-job
          training time.
        </p>
        <p>
          <strong>What Ofsted looks for:</strong> Evidence that off-the-job training is planned,
          delivered, and documented. That the training is meaningful and directly relevant to the
          apprenticeship standard — not just box-ticking. That apprentices can articulate what they
          have learned through their off-the-job training. That employers are providing the required
          time. That the training provider monitors OTJ compliance and intervenes when apprentices
          fall behind.
        </p>
        <p>
          <strong>Why it matters to you:</strong> If your training provider receives a poor Ofsted
          rating partly due to inadequate off-the-job training records, it reflects on the quality
          of your apprenticeship. Employers and future assessors may question the robustness of your
          training. Conversely, well-documented OTJ records support your credibility and demonstrate
          your commitment to professional development.
        </p>
        <p>
          <strong>Ofsted-ready records:</strong> Elec-Mate OJT Tracker generates records that meet
          the standard Ofsted expects: detailed activity descriptions, links to apprenticeship
          standard criteria, timestamps, evidence attachments, and compliance tracking. If your
          training provider or Ofsted asks to see your OTJ evidence, you can produce a
          comprehensive, organised record in seconds rather than scrambling through incomplete
          spreadsheets.
        </p>
      </>
    ),
  },
  {
    id: 'employer-responsibilities',
    heading: 'Employer Responsibilities',
    content: (
      <>
        <p>
          Your employer has specific responsibilities regarding off-the-job training. These are not
          optional — they are conditions of the apprenticeship funding agreement that your employer
          signed with the ESFA.
        </p>
        <p>
          <strong>Providing time:</strong> Your employer must provide at least 20% of your paid
          working hours for off-the-job training. This includes releasing you for college or
          training provider sessions, allowing time for directed study, and supporting learning
          activities on the employer premises.
        </p>
        <p>
          <strong>Paying for training time:</strong> All off-the-job training time must be paid at
          your normal{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            hourly rate
          </SEOInternalLink>
          . Your employer cannot deduct pay for college days or study time that forms part of the
          20% requirement.
        </p>
        <p>
          <strong>Supporting learning on site:</strong> Good employers go beyond the minimum
          requirement. They expose apprentices to a variety of work types, pair them with
          experienced electricians for mentoring, encourage attendance at manufacturer training
          events, and create a learning culture where asking questions and seeking feedback is
          normal and encouraged.
        </p>
        <p>
          <strong>Monitoring and review:</strong> Your employer should participate in regular
          progress reviews with the training provider, discussing your off-the-job training hours,
          the quality of your learning, and any barriers to meeting the 20% requirement. If work
          pressures are preventing you from getting enough OTJ time, your employer and training
          provider should agree a plan to address this.
        </p>
        <p>
          <strong>If your employer is not meeting their obligations:</strong> Talk to your training
          provider first. They have a contractual relationship with your employer and a
          responsibility to ensure the apprenticeship agreement is being followed. If the training
          provider cannot resolve the issue, contact the ESFA apprenticeship helpline or the
          National Apprenticeship Service for advice. Document specific instances where OTJ time was
          denied or pay was deducted for training days.
        </p>
      </>
    ),
  },
  {
    id: 'elecmate-otj-tracker',
    heading: 'Tracking Hours with Elec-Mate OJT Tracker',
    content: (
      <>
        <p>
          Elec-Mate's OJT Tracker was purpose-built for electrical apprentices. It takes the hassle
          out of off-the-job training hour tracking and ensures you always know where you stand
          against the 400-hour target.
        </p>
        <p>
          <strong>Automatic logging:</strong> Every minute you spend studying on Elec-Mate —
          courses, quizzes, flashcards, mock exams, BS 7671 run-through, EPA Simulator, AM2
          Simulator — is automatically logged as off-the-job training time. No manual entry needed
          for on-platform activities.
        </p>
        <p>
          <strong>Manual entries for off-platform activities:</strong> Add college days, toolbox
          talks, manufacturer training, shadowing sessions, industry visits, and directed study with
          a few taps. Each entry captures the date, duration, description, and activity category.
        </p>
        <p>
          <strong>Activity categories:</strong> The tracker organises your hours into categories:
          college/training provider, online learning, practical skills practice,
          shadowing/mentoring, manufacturer training, industry events, directed study, and other.
          This categorisation provides a clear picture of the breadth of your off-the-job training
          experience.
        </p>
        <p>
          <strong>Compliance dashboard:</strong> See your total hours, percentage against the
          400-hour target, weekly average, and projected completion date at a glance. A
          traffic-light indicator shows green (on track), amber (slightly behind), or red
          (significantly behind). Weekly notifications remind you to log any unrecorded off-platform
          activities.
        </p>
        <p>
          <strong>Evidence attachments:</strong> Attach photographs, certificates, screenshots, or
          notes to any entry. This evidence feeds into your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">portfolio</SEOInternalLink> and
          creates Ofsted-ready documentation.
        </p>
        <p>
          <strong>Integration with other Elec-Mate features:</strong> OJT hours from the tracker are
          automatically reflected in your portfolio, linked to the relevant apprenticeship standard
          criteria, and included in the gateway readiness dashboard. When your employer and training
          provider review your progress, everything is in one place.
        </p>
        <SEOAppBridge
          title="Never Fall Behind on OJT Hours"
          description="Elec-Mate OJT Tracker automatically logs on-platform study time, categorises activities, tracks compliance against the 400-hour target in real time, and generates Ofsted-ready records. 7-day free trial."
          icon={BarChart3}
        />
      </>
    ),
  },
];

export default function OffJobTrainingHoursPage() {
  return (
    <GuideTemplate
      title="Off-the-Job Training Hours | 20% Requirement Explained"
      description="Complete guide to the 20% off-the-job training hours requirement for UK electrical apprentices. What counts, what does not, how to calculate hours, recording evidence, Ofsted requirements, and automatic tracking with Elec-Mate OJT Tracker."
      datePublished="2025-10-15"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Off-the-Job Training Hours —{' '}
          <span className="text-yellow-400">The 20% Requirement Explained</span>
        </>
      }
      heroSubtitle="Every electrical apprentice must spend at least 20% of their paid working hours on off-the-job training. This guide explains what that means, what activities count, how to calculate and record your hours, and how Elec-Mate's OJT Tracker makes compliance effortless."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Off-the-Job Training"
      relatedPages={relatedPages}
      ctaHeading="Track your OJT hours effortlessly"
      ctaSubheading="Join 430+ UK apprentices tracking off-the-job training hours with Elec-Mate. Automatic logging, compliance tracking, and Ofsted-ready records. 7-day free trial, cancel anytime."
    />
  );
}
