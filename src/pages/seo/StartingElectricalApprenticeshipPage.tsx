import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  PoundSterling,
  Wrench,
  ClipboardCheck,
  FileCheck2,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Starting Your Electrical Apprenticeship', href: '/guides/starting-electrical-apprenticeship' },
];

const tocItems = [
  { id: 'what-is-it', label: 'What an Electrical Apprenticeship Is' },
  { id: 'routes-in', label: 'The Three Routes In' },
  { id: 'what-you-study', label: 'What You Actually Study' },
  { id: 'pay', label: 'What You Get Paid' },
  { id: 'year-by-year', label: 'Year by Year: What to Expect' },
  { id: 'am2', label: 'The AM2 End-Point Assessment' },
  { id: 'after', label: 'After You Qualify' },
  { id: 'september-checklist', label: 'Your September Checklist' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The electrical apprenticeship is a Level 3 programme (Installation and Maintenance Electrician, standard ST0152). Typical duration is 42 to 48 months — most people qualify in around four years.',
  'You earn while you train: at least the apprentice minimum wage of £8.00 per hour from April 2026, and £8.16 to £14.03 per hour on the JIB graded scale as you progress through the four stages.',
  'The apprenticeship combines paid site work, a college or training-centre day, and a Level 3 Electrotechnical Qualification — finished with the AM2, an independent practical assessment recognised across the industry for over 30 years.',
  'You do not pay for the training. Apprenticeship training is funded through the employer and government — unlike a self-funded college course.',
  'There is no upper age limit. Adult apprentices follow the same standard and the same AM2 — only the funding arrangements differ for the employer.',
  'September is the biggest intake of the year because it follows the college enrolment cycle — but applications are made months earlier, so start looking in spring and summer.',
];

const faqs = [
  {
    question: 'How long does an electrical apprenticeship take?',
    answer:
      'The Installation and Maintenance Electrician apprenticeship (standard ST0152) typically takes 42 to 48 months — around four years. Skills England guidance notes it is unlikely that someone without previous relevant experience would complete it in under 42 months. The duration can shorten if you arrive part-qualified — for example, having already completed a Level 2 or Level 3 diploma at college — because prior learning is taken into account when the training plan is agreed.',
  },
  {
    question: 'What qualifications do I need to start an electrical apprenticeship?',
    answer:
      'Entry requirements are set by the employer, not the apprenticeship standard. Most employers and training providers ask for GCSEs at grade 4 (C) or above in Maths and English, and many like to see a Science. Some accept Functional Skills Level 2 in place of GCSEs, and some larger employers set their own aptitude tests instead. If you do not have the grades, a Level 2 diploma at college (such as the C&G 2365-02) is a common way to prove yourself before applying for apprenticeships the following year.',
  },
  {
    question: 'Am I too old for an electrical apprenticeship?',
    answer:
      'No — there is no upper age limit on apprenticeships in England. Adults in their 30s, 40s and beyond complete the same Level 3 standard and the same AM2 assessment. What changes with age is the funding and the wage: the apprentice minimum wage rate only applies to under-19s and first-year apprentices, so an apprentice aged 21 or over is entitled to the National Living Wage of £12.71 per hour after their first year. Some employers are cautious about the higher wage cost of adult apprentices, which is why many career changers do a college Level 2 first and apply with evidence in hand.',
  },
  {
    question: 'Do I have to pay for an electrical apprenticeship?',
    answer:
      'No. Apprenticeship training is paid for by your employer and government funding — you earn a wage while you train and do not pay course fees. This is the single biggest difference from the college-first route, where a self-funded Level 2 or Level 3 diploma can cost several thousand pounds. You will typically need to buy some hand tools as you progress, though JIB-registered employers provide an annual tool allowance.',
  },
  {
    question: 'What is the difference between an apprenticeship and a college course like the 2365?',
    answer:
      'A college diploma (such as the C&G 2365 Level 2 and Level 3) teaches you the theory and workshop skills, but on its own it does not make you a qualified electrician — you still need substantial site experience and the AM2 to demonstrate occupational competence. The apprenticeship wraps everything into one funded programme: employment, the Level 3 Electrotechnical Qualification, and the AM2 end-point assessment. Many people combine the two — college first to get started, then an apprenticeship (often shortened to reflect prior learning) to finish properly.',
  },
  {
    question: 'What is the AM2 and when do I take it?',
    answer:
      'The AM2 is the end-point assessment of the apprenticeship — an independent, externally set and marked practical assessment taken in controlled conditions at an approved centre, once all your on-programme training is complete. It has been the industry benchmark of an electrician\'s competence for over 30 years, covering installation, inspection and testing, and fault diagnosis against the current edition of BS 7671. Passing the AM2 plus your Level 3 Electrotechnical Qualification completes the apprenticeship and makes you eligible to apply for the JIB ECS Gold Card.',
  },
  {
    question: 'When should I apply for a September start?',
    answer:
      'Earlier than most people think. Large employers and training providers such as JTL open applications from January to spring for September intakes, and popular schemes fill early. Realistically: research and prepare in winter, apply from spring, interview and assessment over late spring and summer, start in August or September. If you are reading this over summer with no apprenticeship lined up, it is still worth applying — smaller firms recruit year-round — and enrolling on a college Level 2 as a backstop keeps the year productive.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-find-electrical-apprenticeship',
    title: 'How to Find an Electrical Apprenticeship',
    description: 'JTL, employer-direct and college routes — where to apply and when.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-tool-list',
    title: 'Apprentice Electrician Tool List',
    description: 'The first-year kit that is actually worth buying — and what to skip.',
    icon: Wrench,
    category: 'Career',
  },
  {
    href: '/guides/electrical-apprenticeship-interview-questions',
    title: 'Apprenticeship Interview Questions',
    description: 'What employers ask 16-to-25-year-old applicants, with strong example answers.',
    icon: ClipboardCheck,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description: 'Pay by year and JIB stage rates for 2026 — verified figures.',
    icon: PoundSterling,
    category: 'Pay',
  },
  {
    href: '/guides/apprentice-rights-pay-uk',
    title: 'Apprentice Rights & Pay',
    description: 'Your legal rights: wages, hours, holiday, sick pay and college time.',
    icon: FileCheck2,
    category: 'Pay',
  },
  {
    href: '/guides/electrical-apprenticeship-for-adults',
    title: 'Apprenticeships for Adults',
    description: 'Retraining at 30, 40 or 50 — the honest numbers and the three adult routes.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/mock-exams/level-2-electrical-principles',
    title: 'Level 2 Mock Exams',
    description: 'Free unit-by-unit practice questions for the Level 2 diploma.',
    icon: GraduationCap,
    category: 'Study',
  },
];

const sections = [
  {
    id: 'what-is-it',
    heading: 'What an Electrical Apprenticeship Is',
    content: (
      <>
        <p>
          The electrical apprenticeship in England is the{' '}
          <strong>Installation and Maintenance Electrician</strong> standard (ST0152) — a Level 3
          programme that combines paid employment with structured training. You work for a real
          electrical employer four days a week, attend a college or training centre for the other
          day (or in block release), and work through a nationally recognised qualification as you
          go.
        </p>
        <p>
          Typical duration is <strong>42 to 48 months</strong>. Skills England guidance is explicit
          that someone starting without previous relevant experience is unlikely to finish in under
          42 months — so treat "four years" as the honest planning number, and anything shorter as
          the exception for people arriving with a college diploma already behind them.
        </p>
        <p>
          Three things make the apprenticeship the gold-standard route into the trade: you are{' '}
          <strong>paid from day one</strong>, the <strong>training is funded</strong> rather than
          self-funded, and it finishes with the <strong>AM2</strong> — the independent practical
          assessment the industry actually trusts. A person who completes the apprenticeship is a
          qualified electrician in the fullest sense: eligible for the JIB ECS Gold Card and even
          eligible to apply for EngTech professional registration.
        </p>
      </>
    ),
  },
  {
    id: 'routes-in',
    heading: 'The Three Routes In',
    content: (
      <>
        <p>There are three realistic ways into the trade, and they suit different situations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>1. Straight into an apprenticeship.</strong> The classic route for school
                leavers with decent GCSEs: apply to employers and training providers (JTL and the
                big contractors open applications in spring), start in September, qualify in about
                four years. Best pay-to-training balance, most competitive to get.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2. College first, apprenticeship second.</strong> Enrol on the C&G 2365
                Level 2 diploma (one year, full or part time), prove yourself, then apply for
                apprenticeships with evidence in hand. Common for people who missed the GCSE
                grades, adults changing career, and anyone who could not land an apprenticeship
                first time. Prior learning can shorten the apprenticeship that follows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>3. The experienced-worker route.</strong> For people who have worked in
                the industry for years without formal qualifications — the C&G 2346-03
                Experienced Worker qualification assesses competence against the same standard
                without a full apprenticeship. Not a shortcut for beginners; a recognition route
                for genuine experience.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are choosing between the first two: the apprenticeship pays you while college
          costs you, so the apprenticeship wins whenever you can get one. Use the college route to
          get *into* an apprenticeship, not instead of one. Our guide on{' '}
          <SEOInternalLink href="/guides/how-to-find-electrical-apprenticeship">
            how to find an electrical apprenticeship
          </SEOInternalLink>{' '}
          covers where and when to apply.
        </p>
      </>
    ),
  },
  {
    id: 'what-you-study',
    heading: 'What You Actually Study',
    content: (
      <>
        <p>
          The apprenticeship qualification is the{' '}
          <strong>Level 3 Electrotechnical Qualification</strong> (C&G 5357 or the EAL
          equivalent), taken in an Installation or Maintenance pathway. Its units map directly to
          the job — this is what your college day is spent on:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• Health, safety and environmental considerations — understanding and applying them on site</li>
            <li>• Electrical scientific principles and technologies — the maths and science backbone</li>
            <li>• Design and installation practices and procedures</li>
            <li>• Terminations and connections of conductors</li>
            <li>• The requirements of BS 7671 (the Wiring Regulations)</li>
            <li>• Inspection, testing and commissioning of electrical systems</li>
            <li>• Fault diagnosis and rectification</li>
            <li>• Planning and overseeing electrical work activities</li>
          </ul>
        </div>
        <p>
          If you take the college-first route instead, the C&G 2365 Level 2 covers the foundations
          of the same ground — health and safety in building services, principles of electrical
          science, installation technology, and wiring systems — with the Level 3 diploma adding
          design, inspection and testing, and fault diagnosis.
        </p>
        <p>
          Alongside the qualification, apprentices must spend at least 20% of paid hours on
          off-the-job training, and you will build a portfolio of site evidence throughout.
          Elec-Mate's study centre includes free{' '}
          <SEOInternalLink href="/mock-exams/level-2-electrical-principles">
            unit-by-unit Level 2 mock exams
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/mock-exams/level-3-electrical-science">
            Level 3 practice papers
          </SEOInternalLink>{' '}
          matched to these units.
        </p>
      </>
    ),
  },
  {
    id: 'pay',
    heading: 'What You Get Paid',
    content: (
      <>
        <p>
          Two pay systems matter. The legal floor is the{' '}
          <strong>apprentice National Minimum Wage — £8.00 per hour from 1 April 2026</strong>{' '}
          (for under-19s and first-year apprentices; after year one, your age-band rate applies —
          £10.85 for 18-to-20s, £12.71 for 21+). The industry scale is the{' '}
          <strong>JIB graded rates</strong>: from 5 January 2026, Stage 1 apprentices earn £8.16
          per hour nationally (£9.14 in the JIB London area), rising through £10.60 and £13.05 to{' '}
          <strong>£14.03 at Stage 4</strong> (£15.72 London) — with stage rises linked to passing
          your qualifications, not just time served.
        </p>
        <p>
          On a standard 37.5-hour week, that is roughly £15,900 a year at Stage 1 rising to
          £27,000+ by Stage 4 — before any overtime. The full breakdown, including weekly
          take-home examples, is in our{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            apprentice electrician salary guide
          </SEOInternalLink>
          , and your legal entitlements (paid college days, holiday, sick pay) are covered in{' '}
          <SEOInternalLink href="/guides/apprentice-rights-pay-uk">
            apprentice rights and pay
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'year-by-year',
    heading: 'Year by Year: What to Expect',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>Year 1 — learn the site.</strong> Shadowing a qualified electrician,
                first fix basics, materials, safe isolation drilled until it is second nature,
                and your first college units. Expect labouring — everyone starts there. Get your{' '}
                <SEOInternalLink href="/guides/apprentice-electrician-tool-list">
                  starter tool kit
                </SEOInternalLink>{' '}
                right and do not buy more than you need.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Year 2 — become useful.</strong> Running cable, second fix, boards under
                supervision. The electrical science units get harder; this is where consistent
                study habits pay off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Year 3 — work with independence.</strong> Whole installations under
                lighter supervision, inspection and testing units, fault-finding. JIB Stage 3
                takes your pay above the National Living Wage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>Year 4 — gateway and AM2.</strong> Finish the qualification units,
                complete your portfolio, pass through the gateway, and sit the AM2. Then you are
                out the other side — qualified.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'am2',
    heading: 'The AM2 End-Point Assessment',
    content: (
      <>
        <p>
          The apprenticeship ends with the <strong>AM2</strong> — a synoptic practical assessment
          that is externally set and marked by an independent body, taken at an approved centre
          once all your on-programme training is complete. It has been the industry's benchmark of
          competence for over 30 years, and it is deliberately demanding: composite installation
          tasks, inspection and testing, safe isolation, and fault diagnosis, all against the
          clock and the current edition of BS 7671.
        </p>
        <p>
          Passing the AM2 together with your Level 3 Electrotechnical Qualification completes the
          apprenticeship. Start preparing well before your booking: our free{' '}
          <SEOInternalLink href="/mock-exams/am2-online-knowledge-test">
            AM2 online knowledge test
          </SEOInternalLink>{' '}
          covers the theory side, and the{' '}
          <SEOInternalLink href="/guides/am2-assessment-preparation">
            AM2 preparation course
          </SEOInternalLink>{' '}
          walks through the practical tasks section by section.
        </p>
      </>
    ),
  },
  {
    id: 'after',
    heading: 'After You Qualify',
    content: (
      <>
        <p>
          Completing the apprenticeship makes you eligible for the <strong>JIB ECS Gold Card</strong>{' '}
          — the industry's recognised proof of qualified status — and eligible to apply for{' '}
          <strong>EngTech professional registration</strong> with an engineering institution
          (optional, but it exists because the apprenticeship is genuinely that level). From
          there the ladder runs through the JIB grades: Electrician (£18.38 per hour on 2026
          national rates), Approved Electrician (£20.08) once you add inspection and testing
          qualifications, and Site Technician (£22.70) beyond that — before you even consider{' '}
          self-employment. The full path is mapped in our{' '}
          <SEOInternalLink href="/guides/electrician-career-progression">
            career progression guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'september-checklist',
    heading: 'Your September Checklist',
    content: (
      <>
        <p>Starting this September? Here is the practical list:</p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>✔ Paperwork signed — apprenticeship agreement and training plan (legally required within your first weeks)</li>
            <li>✔ Basic tool kit — <SEOInternalLink href="/guides/apprentice-electrician-tool-list">the sensible starter list</SEOInternalLink>, not the £600 van set</li>
            <li>✔ Boots, trousers and any PPE your employer does not supply confirmed before day one</li>
            <li>✔ Know your rate — check your offer against the <SEOInternalLink href="/guides/apprentice-electrician-salary">JIB stage rates</SEOInternalLink> and the £8.00 legal minimum</li>
            <li>✔ College enrolment confirmed and travel worked out for your college day</li>
            <li>✔ Study system ready — the first electrical science units catch people out; free <SEOInternalLink href="/mock-exams/level-2-electrical-principles">unit mock exams</SEOInternalLink> from week one</li>
          </ul>
        </div>
        <p>
          And if September is arriving without an apprenticeship secured: apply anyway (small
          firms recruit year-round), enrol on a college Level 2 as the productive fallback, and
          read{' '}
          <SEOInternalLink href="/guides/how-to-find-electrical-apprenticeship">
            how to find an electrical apprenticeship
          </SEOInternalLink>{' '}
          for the full application playbook.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function StartingElectricalApprenticeshipPage() {
  return (
    <GuideTemplate
      title="Starting an Electrical Apprenticeship: 2026 Guide"
      description="How to start an electrical apprenticeship: routes in, what you study, 2026 pay, year-by-year expectations, the AM2 and a September checklist."
      datePublished="2026-07-17"
      dateModified="2026-07-17"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Starting Your Electrical Apprenticeship:{' '}
          <span className="text-yellow-400">The Complete Guide</span>
        </>
      }
      heroSubtitle="The Level 3 Installation and Maintenance Electrician apprenticeship explained properly: the three routes in, what you actually study, what you get paid in 2026, what each year looks like, and how it ends with the AM2. Written for school leavers, career changers and everyone starting this September."
      answerBox={{
        question: 'How do I start an electrical apprenticeship?',
        answer:
          'Apply to electrical employers and training providers (like JTL) for the Level 3 Installation and Maintenance Electrician apprenticeship — applications for September intakes open from winter and spring. You need no prior qualifications by law, but most employers ask for GCSE grade 4+ in Maths and English. You earn from day one (£8.00/hour legal minimum, £8.16–£14.03 on JIB rates) and qualify in around four years by completing the Level 3 Electrotechnical Qualification and the AM2 assessment.',
      }}
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Starting an Apprenticeship: FAQ"
      relatedPages={relatedPages}
    />
  );
}
