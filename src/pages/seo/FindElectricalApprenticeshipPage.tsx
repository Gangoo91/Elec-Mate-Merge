import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Users, GraduationCap, Wrench, PoundSterling, CalendarDays } from 'lucide-react';

const breadcrumbs = [
  { label: 'Career Guides', href: '/guides/starting-electrical-apprenticeship' },
  {
    label: 'How to Find an Apprenticeship',
    href: '/guides/how-to-find-electrical-apprenticeship',
  },
];

const tocItems = [
  { id: 'where-to-look', label: 'The Five Places to Look' },
  { id: 'timing', label: 'The Application Calendar' },
  { id: 'speculative', label: 'The Speculative Approach' },
  { id: 'application', label: 'Making Your Application Stand Out' },
  { id: 'no-offer', label: 'If September Arrives Without an Offer' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Five channels find nearly every electrical apprenticeship: the government Find an Apprenticeship service, JTL, the big contractors\' own schemes, college-linked employers, and speculative applications to local firms.',
  'Timing matters more than people expect: large-scheme applications for September open from winter and spring. Summer applicants are late for the big schemes but perfectly timed for small local firms.',
  'Most apprenticeships at small firms are never advertised — a short, well-written email or visit to 20 local electrical contractors regularly beats months of portal applications.',
  'Reliability evidence (part-time job, references, sustained commitments) is your strongest card at application stage — stronger than grades for most employers.',
  'No offer by September is not a lost year: enrol on a college Level 2, keep applying, and convert to an apprenticeship with evidence in hand.',
];

const faqs = [
  {
    question: 'Where do I apply for an electrical apprenticeship?',
    answer:
      'Start with four channels in parallel: the government\'s Find an Apprenticeship service at gov.uk (search "installation and maintenance electrician"), JTL (the electrical industry\'s largest training provider, which recruits on behalf of hundreds of employers), the careers pages of large contractors and utilities in your region, and your local college\'s apprenticeship team, who often know which employers are looking. Then add the fifth: direct speculative applications to small local electrical firms, where most unadvertised apprenticeships live.',
  },
  {
    question: 'When do electrical apprenticeship applications open?',
    answer:
      'The big schemes (JTL, large contractors, utilities) generally open applications between January and spring for a September start, and popular schemes close when full — apply early rather than waiting for a deadline. Colleges confirm apprenticeship places over summer. Small firms are different: they recruit when work demands it, year-round, so a speculative application in any month can land. If you are targeting this September and it is already summer, prioritise small firms and your local college.',
  },
  {
    question: 'Can I get an electrical apprenticeship with no experience?',
    answer:
      'Yes — apprenticeships are designed as entry routes and no electrical experience is expected. What employers look for instead is reliability and genuine interest: reasonable GCSEs (most ask for grade 4+ in Maths and English), any work history at all, references that confirm you turn up, and evidence you have chosen the trade deliberately. If your application keeps getting no replies, a college Level 2 diploma or even a week of unpaid work experience with a local firm changes the conversation.',
  },
  {
    question: 'Is it worth applying to small local electricians directly?',
    answer:
      'It is often the single highest-return move. Small firms take on one apprentice at a time, rarely advertise, and hire when someone asks at the right moment. A short personalised email — who you are, why the trade, your availability for a trial day — sent to 20 or 30 local firms (find them via competent-person scheme registers, Google Maps, and vans in your area) regularly produces trial days and offers that portals never show. Follow up once, politely, a week later; persistence reads as exactly the quality they are hiring for.',
  },
  {
    question: 'What if I can\'t get an apprenticeship this year?',
    answer:
      'Take the college route and reapply from a stronger position. A C&G 2365 Level 2 diploma (one year) proves commitment, teaches the foundations, and is explicitly recognised as prior learning that can shorten a later apprenticeship. Combine it with a weekend or holiday job — ideally labouring for a trades firm — and next year you are the applicant with a year of electrical education, site awareness and references, competing against school leavers with neither.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/starting-electrical-apprenticeship',
    title: 'Starting Your Electrical Apprenticeship',
    description: 'What you are applying for: the complete guide to the four years.',
    icon: GraduationCap,
    category: 'Career',
  },
  {
    href: '/guides/electrical-apprenticeship-interview-questions',
    title: 'Apprenticeship Interview Questions',
    description: 'The 10 questions to prepare for when the application works.',
    icon: Users,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Salary Guide',
    description: 'What the offer should look like — 2026 rates by year and JIB stage.',
    icon: PoundSterling,
    category: 'Pay',
  },
  {
    href: '/guides/electrical-careers-school-leavers',
    title: 'Electrical Careers for School Leavers',
    description: 'The wider picture: routes, qualifications and first decisions at 16-18.',
    icon: CalendarDays,
    category: 'Career',
  },
  {
    href: '/guides/apprentice-electrician-tool-list',
    title: 'Apprentice Tool List',
    description: 'For when the offer lands: the day-one kit without the waste.',
    icon: Wrench,
    category: 'Career',
  },
];

const sections = [
  {
    id: 'where-to-look',
    heading: 'The Five Places to Look',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span>
                <strong>1. Find an Apprenticeship (gov.uk).</strong> The official listing service —
                search "installation and maintenance electrician" with your postcode. Everything
                here is a real, funded vacancy. Set up alerts; good listings close fast.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>2. JTL.</strong> The electrical industry's largest apprenticeship provider —
                they recruit and place apprentices on behalf of hundreds of electrical employers,
                so one application reaches many firms. Their September intake process opens early
                in the year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>3. Large contractors and utilities.</strong> National and regional
                contractors and the DNOs run their own apprentice schemes with structured
                training, better-than-minimum pay, and fixed annual intakes. Find them via their
                careers pages; deadlines are strict.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>4. Your local college.</strong> Colleges deliver the training for local
                employers' apprentices — which means the apprenticeship team knows which firms
                are taking someone on this year. Ring them and ask; it is literally their job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>
                <strong>5. Local firms, directly.</strong> The hidden market — covered properly
                below, because it deserves its own section.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'timing',
    heading: 'The Application Calendar',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>October – December:</strong> research year. Know your firms, fix weak GCSE plans, get any work experience booked.</li>
            <li>• <strong>January – April:</strong> the big-scheme window. JTL and large-contractor applications open — apply early, not at the deadline.</li>
            <li>• <strong>April – June:</strong> assessments and interviews for the big schemes; gov.uk listings peak. Speculative applications to small firms all the way through.</li>
            <li>• <strong>July – August:</strong> late but live: small firms deciding they need help, college-linked places confirming, dropouts creating gaps in the big schemes.</li>
            <li>• <strong>September:</strong> starts — and the moment to enrol at college if the offer has not come, so the year builds your case instead of draining it.</li>
          </ul>
        </div>
        <p>
          The pattern to internalise: <strong>big schemes reward early, small firms reward
          persistent.</strong> Run both tracks at once and the calendar covers you either way.
        </p>
      </>
    ),
  },
  {
    id: 'speculative',
    heading: 'The Speculative Approach (Where Most Offers Hide)',
    content: (
      <>
        <p>
          Most electrical apprenticeships at small firms are <strong>never advertised</strong>. A
          one-or-two-van firm decides they could use an apprentice when the work is piling up — and
          hires whoever asked most recently and most credibly. That is a market you can walk into:
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Build a list of 20–30 local firms</strong> — competent-person scheme registers (NICEIC, NAPIT), Google Maps, and the vans you see around your area.</li>
            <li>• <strong>Send a short, personal email</strong> — who you are, one line on why the trade, your grades, your availability for a trial day, phone number. Five sentences, no attachment-heavy CV essay.</li>
            <li>• <strong>Offer the trial day explicitly</strong> — "I'd happily do a day or a week unpaid so you can see how I work" removes the employer's entire risk.</li>
            <li>• <strong>Follow up once</strong>, a week later, politely. Then move on — but keep the list; circumstances change monthly.</li>
            <li>• <strong>Tell everyone</strong> — plumbers, builders and kitchen fitters all know electricians. Word of mouth remains how small firms actually hire.</li>
          </ul>
        </div>
        <p>
          Twenty tailored emails and a fortnight of follow-ups regularly outperforms six months of
          portal-only applications — and the interviews it produces are warmer, because the firm
          already knows you chase things.
        </p>
      </>
    ),
  },
  {
    id: 'application',
    heading: 'Making Your Application Stand Out',
    content: (
      <>
        <p>
          Employers reading apprentice applications scan for three signals, in this order:{' '}
          <strong>reliability, interest, trainability.</strong> Cover all three in whatever format
          the application takes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Reliability:</strong> part-time job (any), sustained commitments (sport, volunteering, caring), and a referee who will confirm you turn up on time.</li>
            <li>• <strong>Interest:</strong> one concrete, specific reason for the trade + one accurate fact about the route (four years, college day, ends with the AM2) — see the <SEOInternalLink href="/guides/starting-electrical-apprenticeship">complete apprenticeship guide</SEOInternalLink> so you know it cold.</li>
            <li>• <strong>Trainability:</strong> Maths and English grades stated plainly (with your fix plan if they are weak), and anything practical — DIY, DT at school, work experience.</li>
          </ul>
        </div>
        <p>
          Keep the CV to one page. When the interview comes, the{' '}
          <SEOInternalLink href="/guides/electrical-apprenticeship-interview-questions">
            ten questions to prepare
          </SEOInternalLink>{' '}
          are already written up.
        </p>
      </>
    ),
  },
  {
    id: 'no-offer',
    heading: 'If September Arrives Without an Offer',
    content: (
      <>
        <p>
          It happens to plenty of eventually-excellent electricians. The move is to make the year
          count double:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>• <strong>Enrol on the C&G 2365 Level 2</strong> at college — the recognised foundation year, and prior learning that can shorten a later apprenticeship.</li>
            <li>• <strong>Keep the speculative track running</strong> — an apprenticeship offer in November is worth leaving a college course for, and colleges understand that.</li>
            <li>• <strong>Get paid site exposure</strong> — weekend labouring for any trades firm builds exactly the references employers want.</li>
            <li>• <strong>Study like an apprentice anyway</strong> — the free <SEOInternalLink href="/mock-exams/level-2-electrical-principles">Level 2 unit mock exams</SEOInternalLink> mean you start college (or the apprenticeship) ahead instead of level.</li>
          </ul>
        </div>
        <p>
          Reapply in the January window as the candidate with a year of evidence. The acceptance
          odds are not slightly better — they are transformed.
        </p>
      </>
    ),
  },
];

export default function FindElectricalApprenticeshipPage() {
  return (
    <GuideTemplate
      title="How to Find an Electrical Apprenticeship in 2026"
      description="Where electrical apprenticeships are: gov.uk, JTL, contractor schemes, colleges and the unadvertised local-firm market — plus when to apply."
      datePublished="2026-07-17"
      dateModified="2026-07-17"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          How to Find an Electrical Apprenticeship{' '}
          <span className="text-yellow-400">(Including the Unadvertised Ones)</span>
        </>
      }
      heroSubtitle="The five channels that hold nearly every electrical apprenticeship in the UK, the application calendar that decides who gets the big-scheme places, and the speculative approach that finds the unadvertised ones at small local firms."
      answerBox={{
        question: 'How do I find an electrical apprenticeship?',
        answer:
          'Run five channels in parallel: the gov.uk Find an Apprenticeship service, JTL (the industry\'s largest provider), large contractors\' own schemes, your local college\'s apprenticeship team, and direct speculative applications to 20-30 small local electrical firms — where most unadvertised apprenticeships are. Big schemes open applications January to spring for September starts; small firms recruit year-round.',
      }}
      howToHeading="How to find an electrical apprenticeship"
      howToDescription="The five-channel approach that covers advertised and unadvertised apprenticeships."
      howToSteps={[
        {
          name: 'Search the official listings',
          text: 'Search "installation and maintenance electrician" with your postcode on the gov.uk Find an Apprenticeship service and set up alerts — every listing is a real, funded vacancy.',
        },
        {
          name: 'Apply to JTL and the big schemes',
          text: 'Apply to JTL (one application reaches hundreds of electrical employers) and the apprentice schemes of large contractors and DNOs in your region. These open January to spring for September starts — apply early.',
        },
        {
          name: 'Ring your local college',
          text: 'Ask the apprenticeship team which local employers are taking on apprentices this year — colleges deliver the training and know who is recruiting.',
        },
        {
          name: 'Write to 20–30 local firms directly',
          text: 'Most small-firm apprenticeships are never advertised. Send a short personal email offering a trial day, follow up once a week later, and tell every tradesperson you know that you are looking.',
        },
        {
          name: 'Prepare for the interview and tests',
          text: 'Expect a GCSE-level maths check without a calculator and questions about attitude and reliability rather than electrical knowledge. Prepare one specific story per common question.',
        },
      ]}
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Finding an Apprenticeship: FAQ"
      relatedPages={relatedPages}
    />
  );
}
