import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Users, GraduationCap, PoundSterling, CalendarDays, ClipboardCheck } from 'lucide-react';

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/starting-electrical-apprenticeship' },
  { label: 'Apprenticeships for Adults', href: '/guides/electrical-apprenticeship-for-adults' },
];

const tocItems = [
  { id: 'no-age-limit', label: 'The Age Limit Myth' },
  { id: 'honest-numbers', label: 'The Honest Numbers' },
  { id: 'routes', label: 'The Three Adult Routes' },
  { id: 'employer-view', label: 'What Employers Really Think' },
  { id: 'making-it-work', label: 'Making the Money Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'There is no upper age limit on apprenticeships in England — adults in their 30s, 40s and 50s complete the same Level 3 standard and the same AM2 as school leavers.',
  'The honest trade-off is pay during training: the apprentice minimum rate (£8.00/hour) only applies in year one — from year two, anyone 21+ must be paid at least the National Living Wage of £12.71/hour.',
  'Most career changers take the college-first route: a Level 2 diploma (evenings/weekends possible) proves commitment and can shorten the apprenticeship that follows.',
  'Employers often prefer adult apprentices in practice — reliability, driving licences, customer skills and site sense from previous work are exactly what small firms need.',
  'A typical adult timeline is 3 to 4 years to fully qualified — shorter than most people fear, and the earning ceiling afterwards (£40k–£70k+ self-employed) makes the maths work.',
];

const faqs = [
  {
    question: 'Can I do an electrical apprenticeship at 30, 40 or 50?',
    answer:
      'Yes. There is no upper age limit on apprenticeships in England — the Level 3 Installation and Maintenance Electrician standard is the same programme whether you are 16 or 56, ending with the same AM2 assessment and the same qualified status. Funding exists for adult apprentices too; what changes is the wage floor (adults past year one must receive at least the National Living Wage of £12.71 per hour from April 2026) and, sometimes, employer perceptions — which the college-first route addresses.',
  },
  {
    question: 'How long does it take to become an electrician as an adult?',
    answer:
      'Plan for 3 to 4 years to fully qualified. The apprenticeship itself typically runs 42 to 48 months, but adults who complete a Level 2 diploma first (one year, often available part-time or evenings) can have prior learning recognised and shorten the apprenticeship. The experienced-worker route (C&G 2346-03) is faster still, but it is for people who already have years of genuine electrical site experience — it recognises competence, it does not create it.',
  },
  {
    question: 'Can I afford to retrain as an electrician with a mortgage and family?',
    answer:
      'This is the real question for most career changers, and the honest answer has three parts. First: apprentice pay for an adult is not the £8.00 headline rate for long — from year two you must legally receive at least £12.71 per hour (roughly £24,800 a year full-time), and JIB-scale employers pay stage rates on top of that trajectory. Second: the college-first route lets you keep your current job while studying evenings or weekends, moving to apprentice wages only when you are a year in and certain. Third: the payback is fast once qualified — employed electricians earn £35,000 to £45,000 and self-employed rates run well beyond that, so the tight years are genuinely temporary.',
  },
  {
    question: 'Will employers take on an older apprentice?',
    answer:
      'Many actively prefer them. An adult with a driving licence, a work history that proves reliability, and the confidence to talk to customers solves several problems a 16-year-old cannot. The friction points are wage cost (adult apprentices cost more from year two, which matters to small firms) and occasionally awkwardness about supervision dynamics. The strongest counter is evidence: a Level 2 diploma, any site exposure, and a straightforward cover note about why you are committed make the age a feature rather than a risk.',
  },
  {
    question: 'Is there funding for adult electrical apprenticeships?',
    answer:
      'Apprenticeship training costs are funded through the employer (via the apprenticeship levy for large employers, or heavily co-funded by government for smaller ones) — as the apprentice you do not pay tuition at any age. Self-funded college diplomas are different: expect fees for a Level 2/3 diploma if you take the college-first route, though Advanced Learner Loans and provider payment plans exist. Factor the college fee against its benefit — a shorter apprenticeship and a far stronger application.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/starting-electrical-apprenticeship',
    title: 'Starting Your Electrical Apprenticeship',
    description: 'The complete guide to the programme itself — routes, study, pay, the AM2.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/how-to-find-electrical-apprenticeship',
    title: 'How to Find an Apprenticeship',
    description: 'The five channels — including the speculative approach that suits adults best.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/become-electrician-no-experience',
    title: 'Become an Electrician with No Experience',
    description: 'The from-scratch picture at any age.',
    icon: CalendarDays,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Salary Guide',
    description: 'The 2026 figures behind the affordability maths — verified rates.',
    icon: PoundSterling,
    category: 'Pay',
  },
  {
    href: '/guides/electrical-apprenticeship-interview-questions',
    title: 'Apprenticeship Interview Questions',
    description: 'The questions to prepare — and how adult applicants should frame answers.',
    icon: ClipboardCheck,
    category: 'Career',
  },
];

const sections = [
  {
    id: 'no-age-limit',
    heading: 'The Age Limit Myth',
    content: (
      <>
        <p>
          Let's kill the myth first: <strong>there is no upper age limit on apprenticeships in
          England.</strong> The Level 3 Installation and Maintenance Electrician standard is the
          same programme at 36 as at 16 — same qualification, same AM2 end-point assessment, same
          Gold Card eligibility at the end. Adult apprentices are funded, legal, and common:
          career changers from the forces, driving, offices, and other trades qualify as
          electricians every year.
        </p>
        <p>
          What actually changes with age is not eligibility — it is the <strong>wage
          arithmetic</strong> and the <strong>route strategy</strong>. Both are manageable once
          you see them clearly, which is what the rest of this page is for.
        </p>
      </>
    ),
  },
  {
    id: 'honest-numbers',
    heading: 'The Honest Numbers',
    content: (
      <>
        <p>The figures every career changer should know before deciding (2026 rates, verified):</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Year 1:</strong> the apprentice minimum of £8.00/hour can legally apply to anyone in their first year — roughly £15,600 full-time. This is the tight year.</li>
            <li>• <strong>Year 2 onwards (21+):</strong> the National Living Wage floor applies — £12.71/hour, about £24,800 a year, before any JIB stage uplift or overtime.</li>
            <li>• <strong>JIB-scale employers:</strong> stage rates run £8.16 to £14.03/hour (£9.14–£15.72 in London), with rises tied to passing your qualifications.</li>
            <li>• <strong>Qualified:</strong> employed electricians typically earn £35,000–£45,000; experienced self-employed electricians commonly beyond that.</li>
          </ul>
        </div>
        <p>
          Full breakdowns, including weekly take-home examples, are in the{' '}
          <SEOInternalLink href="/guides/apprentice-electrician-salary">
            apprentice salary guide
          </SEOInternalLink>{' '}
          — the point here is the shape: one genuinely lean year, a liveable second year, and a
          fast climb after that.
        </p>
      </>
    ),
  },
  {
    id: 'routes',
    heading: 'The Three Adult Routes',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>1. College first, keep your job.</strong> The most common adult route: a
                Level 2 diploma (C&G 2365-02 or EAL equivalent) studied part-time, evenings or
                weekends while you keep earning. You arrive at apprenticeship applications with
                proof of commitment, foundations already learned, and prior learning that can
                shorten the apprenticeship. Costs a course fee; buys certainty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2. Straight into an apprenticeship.</strong> Fastest if you can land one
                and absorb the year-one wage. Adults do best here through the{' '}
                <SEOInternalLink href="/guides/how-to-find-electrical-apprenticeship">
                  speculative small-firm route
                </SEOInternalLink>{' '}
                — small employers value maturity most and care least about intake calendars.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>3. Experienced-worker route (C&G 2346-03).</strong> Only for people with
                real years on the tools without formal qualifications — it assesses existing
                competence against the standard. If that is you, it is the direct path; if not,
                it is not a shortcut.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'employer-view',
    heading: 'What Employers Really Think About Older Apprentices',
    content: (
      <>
        <p>
          Talk to small electrical firms and a pattern emerges: many <strong>prefer</strong> adult
          apprentices. A 30-something with a driving licence, a decade of turning up to work, and
          the social confidence to be left with a customer solves real problems — a first-year
          apprentice who can drive the van to the wholesaler is worth a premium by itself.
        </p>
        <p>
          The hesitations are practical, not prejudicial: an adult apprentice costs more from year
          two (the £12.71 floor), and a few employers worry about instructing someone older than
          they are. Both dissolve against evidence — which is why the college-first year, any site
          exposure at all, and a two-line cover note on why you are committed convert "risk" into
          "bargain" in the reader's mind. Frame your application around reliability and customer
          skills, and read the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-interview-questions">
            interview preparation guide
          </SEOInternalLink>{' '}
          with your work history as the asset it is.
        </p>
      </>
    ),
  },
  {
    id: 'making-it-work',
    heading: 'Making the Money Work',
    content: (
      <>
        <p>The playbook career changers actually use:</p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Overlap the transition:</strong> study the Level 2 while still in your current job; only switch income when the apprenticeship is signed.</li>
            <li>• <strong>Target JIB and larger employers</strong> for the better stage rates — and remember the year-two NLW floor is law, not negotiation.</li>
            <li>• <strong>Use the calendar:</strong> big schemes recruit in spring; small firms year-round. Adults usually win via the small-firm route where maturity is the differentiator.</li>
            <li>• <strong>Budget one lean year</strong>, not four — from year two the legal floor is ~£24,800 and rising with your stage.</li>
            <li>• <strong>Study efficiently:</strong> free unit-matched <SEOInternalLink href="/mock-exams/level-2-electrical-principles">Level 2 mock exams</SEOInternalLink> mean the college content never ambushes you — time is the scarcest resource with a family.</li>
          </ul>
        </div>
        <p>
          The whole programme — what you study, year-by-year expectations, and how it ends with
          the AM2 — is mapped in{' '}
          <SEOInternalLink href="/guides/starting-electrical-apprenticeship">
            Starting Your Electrical Apprenticeship
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
];

export default function AdultElectricalApprenticeshipPage() {
  return (
    <GuideTemplate
      title="Electrical Apprenticeships for Adults: 2026 Guide"
      description="Retraining as an electrician at 30, 40 or 50: no age limit, the honest pay numbers, the three adult routes, and how career changers make the money work."
      datePublished="2026-07-17"
      dateModified="2026-07-17"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Change"
      badgeIcon={Users}
      heroTitle={
        <>
          Electrical Apprenticeships for Adults:{' '}
          <span className="text-yellow-400">The Career Changer's Guide</span>
        </>
      }
      heroSubtitle="No, you are not too old — there is no upper age limit, and many employers prefer adult apprentices. What you need is the honest arithmetic: what training pays at 25, 35 or 45, which of the three adult routes fits your situation, and how career changers with mortgages actually make it work."
      answerBox={{
        question: 'Can adults do an electrical apprenticeship?',
        answer:
          'Yes — there is no upper age limit on apprenticeships in England. Adults complete the same Level 3 standard and AM2 assessment as school leavers. The key differences: from year two, apprentices aged 21+ must be paid at least the National Living Wage (£12.71/hour from April 2026), and most career changers take a college Level 2 first — often part-time while keeping their job — which strengthens applications and can shorten the apprenticeship.',
      }}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Adult Apprenticeships: FAQ"
      relatedPages={relatedPages}
    />
  );
}
