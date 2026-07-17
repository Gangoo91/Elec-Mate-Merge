import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Users, GraduationCap, Wrench, PoundSterling, ClipboardCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/starting-electrical-apprenticeship' },
  {
    label: 'Apprenticeship Interview Questions',
    href: '/guides/electrical-apprenticeship-interview-questions',
  },
];

const tocItems = [
  { id: 'what-theyre-testing', label: "What They're Actually Testing" },
  { id: 'the-questions', label: 'The 10 Questions to Prepare' },
  { id: 'aptitude-tests', label: 'Aptitude Tests & Trial Days' },
  { id: 'your-questions', label: 'Questions to Ask Them' },
  { id: 'practical-details', label: 'What to Wear & Bring' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Apprenticeship interviews test attitude, reliability and genuine interest — not electrical knowledge. Nobody expects a 17-year-old to know BS 7671.',
  'Every answer should quietly prove one of three things: you turn up, you graft, and you want this specific trade — not just "a job".',
  'Prepare one honest, specific story for each common question. Specific beats polished: "I rewired a lamp with my grandad" lands better than a rehearsed speech.',
  'Many employers add a short maths check or a practical trial day. Basic arithmetic, fractions and percentages without a calculator cover most of it.',
  'Have two or three questions ready to ask back — asking about your college day, who you would shadow, and progression signals you are serious.',
];

const faqs = [
  {
    question: 'What should I say when asked why I want to be an electrician?',
    answer:
      'Be specific and honest — generic answers ("good money", "always wanted to") are the most common and least convincing. Strong answers connect a real experience to the trade: enjoying physics or DIY, a family member in the trades, watching a rewire happen at home, liking the mix of thinking and working with your hands. Then show you know what the job actually involves — early starts, physical work, four years of college alongside site work — so the interviewer can see you have chosen it with your eyes open.',
  },
  {
    question: 'Do I need electrical knowledge for an apprenticeship interview?',
    answer:
      'No — employers expect to teach you everything. What impresses instead is evidence of interest: knowing the apprenticeship is roughly four years, knowing it ends with the AM2 practical assessment, knowing what a Level 3 qualification is, or having done any DIY, work experience or college taster. If you can mention one accurate, specific fact about the route (for example, that you attend college one day a week while working), you will already be ahead of most applicants.',
  },
  {
    question: 'What maths do I need for an electrical apprenticeship aptitude test?',
    answer:
      'Most employer and training-provider tests cover GCSE-level arithmetic without a calculator: addition, subtraction, multiplication and division, fractions, decimals, percentages, ratios, and reading simple charts or scales. Some include basic algebra (rearranging a simple formula) because Ohm\'s law and power calculations are core to the college units. Practising mental arithmetic for a week before the test makes a visible difference — speed and accuracy under a little pressure are what they are watching.',
  },
  {
    question: 'What should I wear to an electrical apprenticeship interview?',
    answer:
      'Smart-casual and clean beats a suit: trousers or smart jeans, a plain shirt or polo, clean shoes. You are interviewing for a site job, not a bank — but scruffy sends the wrong message about how you will represent the firm in customers\' homes. If the interview includes a workshop trial, they will tell you — bring or wear suitable boots and expect to be handed PPE.',
  },
  {
    question: 'How do I stand out with no experience?',
    answer:
      'Reliability signals beat everything else at 16 to 20 years old: a part-time job (any job — shelf stacking counts), a sport or commitment you have kept up for years, a reference from a teacher or employer who will say you turn up on time. Add one practical proof of interest — a DIY project, helping a tradesperson for a day, a college taster course — and one accurate fact about the trade, and you are genuinely ahead of the pack. Employers hire apprentices they can rely on and train, in that order.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/starting-electrical-apprenticeship',
    title: 'Starting Your Electrical Apprenticeship',
    description: 'The complete guide: routes, pay, year-by-year, and the AM2.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/how-to-find-electrical-apprenticeship',
    title: 'How to Find an Apprenticeship',
    description: 'Where to apply, when applications open, and the speculative-letter play.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-tool-list',
    title: 'Apprentice Tool List',
    description: 'The day-one kit for when you get the yes.',
    icon: Wrench,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Salary Guide',
    description: 'Know your worth before you discuss pay — 2026 rates by stage.',
    icon: PoundSterling,
    category: 'Pay',
  },
  {
    href: '/guides/electrician-interview-questions',
    title: 'Qualified Electrician Interviews',
    description: 'The technical interview guide for once you are qualified.',
    icon: ClipboardCheck,
    category: 'Career',
  },
];

const sections = [
  {
    id: 'what-theyre-testing',
    heading: "What They're Actually Testing",
    content: (
      <>
        <p>
          An apprenticeship interview is not a technical exam. The employer is about to invest
          around four years of training in you, so every question — however it is phrased — is
          really asking three things:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Will you turn up?</strong> Every day, on time, including the college day — for four years.</li>
            <li>• <strong>Will you graft and listen?</strong> Year one involves labouring, repetition, and being told things twice.</li>
            <li>• <strong>Do you actually want this trade?</strong> Or is it one of fifteen applications to anything with a wage?</li>
          </ul>
        </div>
        <p>
          Prepare one honest, specific story per question below and you cover all three. Specific
          always beats polished — interviewers hear rehearsed answers all day, and a real detail
          ("I helped my uncle first-fix his extension over half term") cuts through instantly.
        </p>
      </>
    ),
  },
  {
    id: 'the-questions',
    heading: 'The 10 Questions to Prepare',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white text-[14px] list-decimal pl-5">
            <li>
              <strong>"Why do you want to be an electrician?"</strong> — The one question you will
              definitely get. Real reason + evidence you know what the job involves. Avoid "money"
              as the lead, even though everyone knows it is part of it.
            </li>
            <li>
              <strong>"Why our company?"</strong> — Look them up: what work do they do (domestic,
              commercial, industrial)? One specific detail ("I saw you do EV charger installs —
              that side interests me") beats five minutes of flattery.
            </li>
            <li>
              <strong>"What do you know about the apprenticeship?"</strong> — Gold if prepared:
              roughly four years, employed four days + college one day, Level 3 qualification,
              ends with the AM2 practical. Knowing this outperforms 90% of applicants.
            </li>
            <li>
              <strong>"Tell me about yourself."</strong> — Sixty seconds: where you are now
              (school/college/job), the practical things you enjoy, why the trade. Not your life
              story.
            </li>
            <li>
              <strong>"Give me an example of hard work / commitment."</strong> — Part-time job,
              sport, Duke of Edinburgh, caring responsibilities — anything sustained over time
              with something to show for it.
            </li>
            <li>
              <strong>"How do you handle being told what to do?"</strong> — They are checking you
              can take instruction and correction on site. A real example of acting on feedback
              (coach, boss, teacher) is perfect.
            </li>
            <li>
              <strong>"What are you like with early starts / physical work?"</strong> — Be honest
              and show you have thought about it: site work starts around 7:30, involves lifting,
              ladders, lofts in summer and first fix in winter.
            </li>
            <li>
              <strong>"How are your maths and English?"</strong> — Straight answer with grades. If
              grades are weak: what you are doing about it (Functional Skills, resits) — that
              answer done well can neutralise the weakness completely.
            </li>
            <li>
              <strong>"Where do you see yourself in five years?"</strong> — Qualified, Gold Card,
              maybe towards testing and inspection or running jobs. Shows you see the ladder, not
              just the first rung.
            </li>
            <li>
              <strong>"Do you have any questions for us?"</strong> — Never "no". See the list
              below.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'aptitude-tests',
    heading: 'Aptitude Tests & Trial Days',
    content: (
      <>
        <p>
          Larger employers and training providers often add a short <strong>maths and English
          check</strong> — typically GCSE-level arithmetic without a calculator: fractions,
          decimals, percentages, ratios, and reading values off charts or scales. A week of
          mental-arithmetic practice beforehand genuinely shows. Some also run a{' '}
          <strong>practical trial</strong> — a workshop task or a day on site. Nobody expects
          skill; they are watching whether you listen to instructions, ask before guessing, and
          keep going when a task gets fiddly.
        </p>
        <p>
          If you want to warm up the theory side, our free{' '}
          <SEOInternalLink href="/mock-exams/level-2-electrical-principles">
            Level 2 electrical principles mock exam
          </SEOInternalLink>{' '}
          is the same ground the college units start on — mentioning you have been practising it
          is itself an answer to "how do we know you are serious?".
        </p>
      </>
    ),
  },
  {
    id: 'your-questions',
    heading: 'Questions to Ask Them',
    content: (
      <>
        <p>Two or three of these, chosen honestly:</p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• "What kind of work would I be on in the first few months?"</li>
            <li>• "Which college or training provider do your apprentices attend?"</li>
            <li>• "Who would I be working with day to day — do apprentices stay with one electrician?"</li>
            <li>• "Have your previous apprentices stayed on after qualifying?"</li>
            <li>• "What does a typical week look like — sites, travel, start times?"</li>
          </ul>
        </div>
        <p>
          The last thing to know before you discuss money: the legal minimum and the JIB stage
          rates, so an offer can be judged rather than just accepted. They are all in the{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            apprentice salary guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'practical-details',
    heading: 'What to Wear & Bring',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Wear:</strong> smart-casual and clean — trousers or smart jeans, plain shirt or polo, clean shoes. Suit unnecessary; scruffy costly.</li>
            <li>• <strong>Bring:</strong> CV copies, GCSE certificates (or predicted grades), any work-experience or reference letters, and a notepad — writing one thing down reads as serious.</li>
            <li>• <strong>Phone:</strong> silent, in your pocket, and it stays there.</li>
            <li>• <strong>Arrive:</strong> ten minutes early. For a job where timekeeping is half the interview, being late is unrecoverable.</li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function ApprenticeshipInterviewQuestionsPage() {
  return (
    <GuideTemplate
      title="Electrical Apprenticeship Interview Questions 2026"
      description="The 10 questions apprenticeship interviews actually ask — with strong answers, aptitude test prep, trial days and questions to ask back."
      datePublished="2026-07-17"
      dateModified="2026-07-17"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          Electrical Apprenticeship Interview Questions{' '}
          <span className="text-yellow-400">(and How to Answer Them)</span>
        </>
      }
      heroSubtitle="What employers actually ask 16-to-25-year-old apprenticeship applicants — and what they are really testing. The 10 questions to prepare, the maths test, trial days, what to wear, and the questions to ask back."
      answerBox={{
        question: 'What questions are asked in an electrical apprenticeship interview?',
        answer:
          'Expect: why do you want to be an electrician, why this company, what do you know about the apprenticeship, tell me about yourself, examples of hard work and taking instruction, how you handle early starts and physical work, your maths and English grades, and where you see yourself in five years. Employers test attitude, reliability and genuine interest — not electrical knowledge. Many add a GCSE-level maths check without a calculator.',
      }}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Apprenticeship Interviews: FAQ"
      relatedPages={relatedPages}
    />
  );
}
