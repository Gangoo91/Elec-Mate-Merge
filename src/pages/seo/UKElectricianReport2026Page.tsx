/**
 * UKElectricianReport2026Page — the Elec-Mate UK Electrician Report 2026.
 *
 * ORIGINAL FIRST-PARTY DATA, designed as a proper editorial report rather
 * than a generic guide: numbered chapters, real horizontal bar charts (pure
 * CSS — width scaled to the largest value in each chart), full-bleed stat
 * pulls, and a stated methodology. Every figure was produced by an aggregate
 * SQL query against the live platform database on 2026-08-20 — nothing is
 * estimated, modelled or imported, and NO figure may be edited without
 * re-running the query. The exam counters carry no user dimension at all.
 *
 * Built as the linkable-asset / digital-PR play: trade press and AI
 * assistants can cite concrete numbers nobody else has. The page explicitly
 * grants citation with attribution and links to /press. NO competitor
 * references of any kind (house legal rule).
 *
 * Schema parity with GuideTemplate is deliberate: WebPage + Article +
 * FAQPage via useSEO({schemas}), plus Dataset. Do not drop any of them.
 */
import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { ArrowRight, Mail } from 'lucide-react';

const PAGE_TITLE = 'UK Electrician Report 2026: Pricing & Skills';
const PAGE_DESCRIPTION =
  'Original data: 1,205 quotes and 118,303 exam answers — what UK electricians charge, how fast clients accept, and the BS 7671 topics the trade gets wrong.';
const PAGE_URL = '/reports/uk-electrician-report-2026';

const card =
  'rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14]';

/* ---------------------------------------------------------------- data
   All figures from the 2026-08-20 aggregate SQL snapshot. Do not edit
   without re-running the queries. */

const QUOTE_BANDS: Array<[string, number, string]> = [
  ['Under £100', 160, '13%'],
  ['£100 – £250', 274, '23%'],
  ['£250 – £500', 213, '18%'],
  ['£500 – £1,000', 245, '20%'],
  ['£1,000 – £2,500', 206, '17%'],
  ['£2,500 – £5,000', 49, '4%'],
  ['£5,000 – £10,000', 41, '3%'],
  ['Over £10,000', 17, '1%'],
];

const EXAM_RATES: Array<[string, string, number]> = [
  ['18th Edition (BS 7671:2018+A4:2026)', '8,607', 35.8],
  ['Asbestos Awareness', '1,170', 34.4],
  ['Fire Alarm (BS 5839-1)', '1,665', 30.8],
  ['C&G 2391-50 Initial Verification', '2,580', 30.7],
  ['IPAF (MEWP theory)', '5,440', 30.2],
  ['C&G 2391 Inspection & Testing', '50,656', 25.9],
  ['First Aid at Work', '2,705', 24.0],
  ['AM2 Knowledge Test', '17,301', 23.6],
  ['PAT Testing (C&G 2377)', '1,992', 22.6],
  ['PASMA (towers)', '4,181', 22.2],
  ['EV Charging Installation', '4,890', 21.6],
  ['C&G 2391-51 Periodic Inspection', '7,410', 20.9],
  ['Level 3 Fault Diagnosis', '1,550', 17.9],
];

const HARDEST_TOPICS: Array<[string, number, string]> = [
  ['Continuity test instrument requirements (short-circuit current spec)', 63, 'n = 30'],
  ['Electrical verification for heat pump installations', 63, 'n = 30'],
  ['Who coordinates electrical design under CDM 2015', 60, 'n = 30'],
  ['What a Type A RCD is designed to detect', 56, 'n = 32'],
  ['What an IP2X rating indicates', 54, 'n = 35'],
];

const CERT_MIX: Array<[string, number, string]> = [
  ['EICR (condition reports)', 938, '52%'],
  ['EIC (new installation work)', 400, '22%'],
  ['Minor Works', 216, '12%'],
  ['Schedule of Tests (testing only)', 68, '4%'],
  ['PAT Testing', 52, '3%'],
  ['EV Charging', 40, '2%'],
  ['Emergency Lighting', 33, '2%'],
  ['Smoke & CO Alarm', 20, '1%'],
];

const FAQS = [
  {
    question: 'Where does the data in this report come from?',
    answer:
      'Every figure comes from aggregate queries run against the live Elec-Mate platform database on 20 August 2026. The pricing figures cover 1,205 quotes with a value between £1 and £500,000 issued between 6 September 2025 and 20 August 2026. The skills figures cover 118,303 answered questions across 35 free mock exams, collected between 11 July and 20 August 2026. The certificate figures cover all 1,812 certificates produced on the platform to the query date. No third-party data, surveys or estimates are included, and no individual user, client or job is identifiable — the exam statistics are stored with no user information at all.',
  },
  {
    question: 'Can I cite these figures in an article or report?',
    answer:
      'Yes — the report is free to cite with attribution to Elec-Mate and a link to this page. If you need a specific cut of the data for a story (for example a single trade, region or exam), contact us and we will run the aggregate query where the data supports it.',
  },
  {
    question: 'Why is the median quote so much lower than the average?',
    answer:
      'The median quote is £411 while the mean is £1,145 because electrical work is heavily skewed by a small number of large jobs. 74% of all quotes are under £1,000 — the day-to-day reality of domestic electrical work — while the largest 5% of quotes (rewires, commercial fit-outs, consumer unit programmes above £2,500) pull the average far above what a typical job costs. Anyone using "average job value" to describe electrical work is describing the big jobs, not the common ones.',
  },
  {
    question: 'Does a 35.8% wrong-answer rate mean electricians are not competent?',
    answer:
      'No — it means the 18th Edition is genuinely hard, and that practice exposes the gaps before the real exam does. These are practice attempts, often taken cold, on questions drawn from a 300-question bank covering the whole of BS 7671:2018+A4:2026. The pattern of what gets answered wrong is the interesting part: device selection (RCD types), ingress protection codes, and regulatory duties outside BS 7671 itself (such as CDM 2015) trip up far more attempts than core circuit theory. That is precisely the material worth revising before sitting the paper.',
  },
  {
    question: 'Will this report be updated?',
    answer:
      'Yes. The intention is to re-run the queries and update the figures as the dataset grows — the exam statistics alone are accumulating at well over 100,000 answers per six weeks. Each update will state its query date, and superseded figures will remain in the page history rather than being silently rewritten.',
  },
];

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Elec-Mate UK Electrician Report 2026',
  description:
    'Aggregate platform data on UK electrician pricing (1,205 quotes) and BS 7671 exam performance (118,303 mock exam answers), queried 2026-08-20.',
  url: `https://www.elec-mate.com${PAGE_URL}`,
  creator: { '@id': 'https://www.elec-mate.com/#organization' },
  license: `https://www.elec-mate.com${PAGE_URL}#methodology`,
  temporalCoverage: '2025-09-06/2026-08-20',
  spatialCoverage: 'United Kingdom',
  variableMeasured: [
    'Electrical quote value distribution',
    'Quote acceptance rate and time to acceptance',
    'Mock exam wrong-answer rates by qualification',
    'Certificate type mix',
  ],
};

/* ---------------------------------------------------------------- pieces */

/** Horizontal bar — width scaled against the chart's largest value so the
 *  longest bar always fills the track and the rest read proportionally. */
function Bar({
  label,
  sub,
  value,
  max,
  display,
}: {
  label: string;
  sub?: string;
  value: number;
  max: number;
  display: string;
}) {
  const pct = Math.max(3, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="text-[13.5px] leading-snug text-white">
          {label}
          {sub ? <span className="ml-2 text-[12px] text-white">({sub})</span> : null}
        </span>
        <span className="shrink-0 text-[14px] font-bold text-elec-yellow">{display}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-elec-yellow/70 to-elec-yellow"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Chapter({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20" id={`chapter-${n}`}>
      <div className="mb-6 flex items-baseline gap-4">
        <span className="text-[15px] font-bold tabular-nums text-elec-yellow">{n}</span>
        <h2 className="text-[24px] font-bold tracking-tight text-white sm:text-[30px]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[70ch] space-y-4 text-[16px] leading-relaxed text-white">{children}</div>
  );
}

function PullStat({ value, label }: { value: string; label: string }) {
  return (
    <div className={`${card} p-5`}>
      <p className="text-3xl font-bold text-elec-yellow sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm leading-snug text-white">{label}</p>
    </div>
  );
}

const yellowLink = 'text-elec-yellow underline underline-offset-2 hover:brightness-110';

/* ---------------------------------------------------------------- page */

export default function UKElectricianReport2026Page() {
  const webPageSchema = {
    '@type': 'WebPage',
    '@id': `https://www.elec-mate.com${PAGE_URL}`,
    url: `https://www.elec-mate.com${PAGE_URL}`,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    datePublished: '2026-08-20',
    dateModified: '2026-08-22',
    inLanguage: 'en-GB',
    isPartOf: { '@id': 'https://www.elec-mate.com/#website' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.elec-mate.com/#organization',
      name: 'Elec-Mate',
    },
    author: {
      '@type': 'Person',
      name: 'Andrew Moore',
      jobTitle: 'Founder',
      url: 'https://www.elec-mate.com/',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.elec-mate.com/#organization',
        name: 'Elec-Mate',
      },
    },
    lastReviewed: '2026-08-22',
  };

  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    image: 'https://www.elec-mate.com/images/og-report-2026.jpg',
    schemas: [
      webPageSchema,
      SEOSchemas.article(PAGE_TITLE, PAGE_DESCRIPTION, '2026-08-20', '2026-08-22'),
      SEOSchemas.faqPage(FAQS),
      datasetSchema,
    ],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Guides', url: '/guides' },
      { name: 'UK Electrician Report 2026', url: PAGE_URL },
    ],
    datePublished: '2026-08-20',
    dateModified: '2026-08-22',
    author: 'Andrew Moore',
  });

  const maxQuoteBand = Math.max(...QUOTE_BANDS.map(([, n]) => n));
  const maxExamRate = Math.max(...EXAM_RATES.map(([, , r]) => r));
  const maxCert = Math.max(...CERT_MIX.map(([, n]) => n));

  return (
    <PublicPageLayout>
      {/* ============ HERO ============ */}
      <section className="border-b border-white/[0.1]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow">
            <span>Original data</span>
            <span aria-hidden className="text-white">·</span>
            <span className="text-white">Published 20 August 2026</span>
            <span aria-hidden className="text-white">·</span>
            <span className="text-white">Free to cite with attribution</span>
          </div>
          <h1 className="mt-4 max-w-[22ch] text-[2.4rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[3.4rem]">
            The UK Electrician Report <span className="text-elec-yellow">2026</span>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-white">
            What 1,205 real quotes and 118,303 real exam answers say about the state of the trade:
            what electricians charge, how fast clients say yes, and the BS 7671 topics the industry
            gets wrong. No surveys, no estimates — aggregate platform data, queried 20 August 2026,
            with every sample size stated.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <PullStat value="£411" label="Median electrical quote (n = 1,205)" />
            <PullStat value="5.3 hrs" label="Median time from quote sent to acceptance" />
            <PullStat value="75%" label="Of quotes were accepted" />
            <PullStat value="35.8%" label="Of 18th Edition answers wrong (n = 8,607)" />
            <PullStat value="118,303" label="Exam answers analysed across 35 exams" />
            <PullStat value="52%" label="Of all certificates produced are EICRs" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-24 lg:px-8">
        {/* ============ 01 — WHAT ELECTRICIANS CHARGE ============ */}
        <Chapter n="01" title="What UK electricians actually charge">
          <Prose>
            <p>
              Between 6 September 2025 and 20 August 2026, electricians issued 1,205 quotes through
              Elec-Mate with a combined value of £1.38 million. The distribution tells a story that
              day-rate surveys miss: electrical work is a volume trade of small jobs punctuated by
              occasional large ones.
            </p>
          </Prose>
          <div className={`${card} my-6 p-6`}>
            <h3 className="mb-5 text-[15px] font-bold text-white">
              Quote value distribution <span className="font-normal">(n = 1,205)</span>
            </h3>
            <div className="space-y-4">
              {QUOTE_BANDS.map(([band, n, pct]) => (
                <Bar
                  key={band}
                  label={band}
                  sub={`${n} quotes`}
                  value={n}
                  max={maxQuoteBand}
                  display={pct}
                />
              ))}
            </div>
          </div>
          <Prose>
            <p>
              The median quote is <strong>£411</strong>; the middle half of all quotes sit between{' '}
              <strong>£160 and £1,026</strong>. The mean is £1,145 — nearly three times the median —
              because the biggest 5% of jobs drag it upwards. 74% of all quotes are under £1,000.
            </p>
            <p>
              Only <strong>29.6% of quotes included VAT</strong> — a reminder that a large share of
              working electricians operate below the VAT threshold, and that quoting tools need to
              be as good at ex-VAT sole-trader pricing as they are at VAT-registered work. For
              per-job benchmarks, see the{' '}
              <Link to="/guides/pricing-electrical-work-per-point" className={yellowLink}>
                per-point pricing guide
              </Link>{' '}
              and{' '}
              <Link to="/guides/electrician-day-rates-uk" className={yellowLink}>
                day rates guide
              </Link>
              .
            </p>
          </Prose>
        </Chapter>

        {/* ============ 02 — HOW FAST CLIENTS SAY YES ============ */}
        <Chapter n="02" title="How fast clients say yes">
          <div className="mb-6 grid grid-cols-3 gap-3">
            <PullStat value="908" label="Quotes accepted of 1,205 sent" />
            <PullStat value="75%" label="Acceptance rate" />
            <PullStat value="5.3 hrs" label="Median time to acceptance" />
          </div>
          <Prose>
            <p>
              Of the 1,205 quotes, <strong>908 were accepted — a 75% acceptance rate</strong> — and
              822 went on to raise an invoice. The speed is the striking part: the median time from
              a quote being created to the client accepting it was <strong>5.3 hours</strong>.
            </p>
            <p>
              The old assumption is that quotes sit in inboxes for a week. The data says that when
              a client can open a link on their phone and tap accept, most decisions happen the
              same day. For the electrician, that changes how quoting fits the working week: send
              the quote from the van before leaving the street, and the job is often confirmed
              before the next site visit is finished.
            </p>
          </Prose>
        </Chapter>

        {/* ============ 03 — THE KNOWLEDGE GAP ============ */}
        <Chapter n="03" title="The knowledge gap: 118,303 answers analysed">
          <Prose>
            <p>
              Elec-Mate&apos;s free mock exams record, for every question, how many times it has
              been shown and how many times it has been answered wrongly — with no user information
              attached at all. Between 11 July and 20 August 2026 that produced 118,303 answered
              questions across 35 exams. Overall, <strong>26.4% of answers were wrong</strong>.
            </p>
          </Prose>
          <div className={`${card} my-6 p-6`}>
            <h3 className="mb-5 text-[15px] font-bold text-white">
              Wrong-answer rate by exam{' '}
              <span className="font-normal">(exams with 1,000+ answers)</span>
            </h3>
            <div className="space-y-4">
              {EXAM_RATES.map(([exam, n, rate]) => (
                <Bar
                  key={exam}
                  label={exam}
                  sub={`${n} answers`}
                  value={rate}
                  max={maxExamRate}
                  display={`${rate}%`}
                />
              ))}
            </div>
          </div>
          <Prose>
            <p>
              The 18th Edition — the regulations qualification every practising electrician holds —
              is the hardest subject on the platform. More than one answer in three is wrong. The
              biggest single dataset is the C&amp;G 2391 inspection and testing exam, where 50,656
              answers ran at a 25.9% wrong rate. Fault diagnosis, by contrast, is where
              electricians are strongest: 17.9% — practical reasoning beats regulation recall.
            </p>
            <p>
              Practise any of these free:{' '}
              <Link to="/mock-exams/18th-edition-bs-7671" className={yellowLink}>
                18th Edition
              </Link>
              ,{' '}
              <Link to="/mock-exams/2391-inspection-testing" className={yellowLink}>
                2391
              </Link>
              ,{' '}
              <Link to="/mock-exams/am2-online-knowledge-test" className={yellowLink}>
                AM2
              </Link>{' '}
              and{' '}
              <Link to="/mock-exams" className={yellowLink}>
                30 more
              </Link>
              .
            </p>
          </Prose>
        </Chapter>

        {/* ============ 04 — HARDEST TOPICS ============ */}
        <Chapter n="04" title="The topics electricians get wrong most">
          <Prose>
            <p>
              Zooming into the 18th Edition bank, these are the topics of the most-missed questions
              (each shown at least 30 times in the collection window — modest samples, stated
              exactly):
            </p>
          </Prose>
          <div className={`${card} my-6 p-6`}>
            <div className="space-y-4">
              {HARDEST_TOPICS.map(([topic, rate, n]) => (
                <Bar
                  key={topic}
                  label={topic}
                  sub={n}
                  value={rate}
                  max={100}
                  display={`${rate}% wrong`}
                />
              ))}
            </div>
          </div>
          <Prose>
            <p>
              The pattern is consistent: the trade is weakest not on circuit theory but on{' '}
              <strong>device selection</strong> (RCD types — increasingly critical as EV chargers
              and inverter loads make Type AC devices unsuitable),{' '}
              <strong>ingress protection codes</strong>, and{' '}
              <strong>duties that sit outside BS 7671 itself</strong>, like CDM 2015. The guides on{' '}
              <Link to="/rcd-types-guide" className={yellowLink}>
                RCD types
              </Link>{' '}
              and{' '}
              <Link to="/guides/rcd-testing-procedure" className={yellowLink}>
                RCD testing
              </Link>{' '}
              cover the two most-missed device topics in depth.
            </p>
          </Prose>
        </Chapter>

        {/* ============ 05 — CERTIFICATE MIX ============ */}
        <Chapter n="05" title="The certificate mix: what the work actually is">
          <Prose>
            <p>
              1,812 certificates have been produced on the platform to the query date. The mix
              shows where UK electrical work actually concentrates:
            </p>
          </Prose>
          <div className={`${card} my-6 p-6`}>
            <div className="space-y-4">
              {CERT_MIX.map(([type, n, pct]) => (
                <Bar key={type} label={type} sub={String(n)} value={n} max={maxCert} display={pct} />
              ))}
            </div>
          </div>
          <Prose>
            <p>
              Half of everything is periodic inspection. The rental sector&apos;s EICR obligations
              have made condition reporting the centre of gravity of domestic electrical work —
              which is why inspection and testing dominates the exam data above, and why the 2391
              is the busiest mock exam on the platform by a factor of three.
            </p>
          </Prose>
        </Chapter>

        {/* ============ 06 — METHODOLOGY ============ */}
        <Chapter n="06" title="Methodology">
          <div id="methodology" />
          <Prose>
            <p>
              All figures were produced by aggregate SQL queries against the live Elec-Mate
              production database on <strong>20 August 2026</strong>. Specifics:
            </p>
          </Prose>
          <div className={`${card} my-6 p-6`}>
            <ul className="max-w-[75ch] list-inside list-disc space-y-3 text-[15px] leading-relaxed text-white">
              <li>
                <strong>Quotes:</strong> all 1,205 quotes with a total between £1 and £500,000,
                created 6 September 2025 – 20 August 2026. Median, quartiles and distribution
                computed across the full set. Acceptance = an acceptance recorded on the quote;
                time-to-acceptance measured from quote creation.
              </li>
              <li>
                <strong>Exam answers:</strong> per-question shown/wrong counters across 35 public
                mock exams, 11 July – 20 August 2026, totalling 118,303 answers. The counters carry
                no user identifiers. Per-question figures are only quoted where a question was
                shown at least 30 times, with the exact n stated.
              </li>
              <li>
                <strong>Certificates:</strong> counts by type across all 1,812 certificates on the
                platform at the query date.
              </li>
              <li>
                <strong>What this is not:</strong> a survey, a model, or a national census. It is
                the observed behaviour of electricians using one platform — stated exactly, with
                sample sizes, so you can judge its weight.
              </li>
            </ul>
          </div>
        </Chapter>

        {/* ============ CITE THIS ============ */}
        <div className={`${card} mt-16 p-8`}>
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-[22px] font-bold text-white">Citing this report</h2>
              <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-white">
                Free to cite with attribution to Elec-Mate and a link to this page. The chart pack
                contains every chart above as a branded PNG plus the underlying aggregates as CSV —
                embed them as they are. Need a specific cut for a story — a region, a trade, one
                exam? Email the founder and we will run the query where the data supports it. Media
                assets and boilerplate are on the{' '}
                <Link to="/press" className={yellowLink}>
                  press page
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/press/elec-mate-report-2026-charts.zip"
                download
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95 touch-manipulation"
              >
                Chart pack — PNG + CSV (0.9 MB)
              </a>
              <a
                href="mailto:founder@elec-mate.com?subject=Data%20request%20—%20UK%20Electrician%20Report"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.2] px-6 text-[15px] font-semibold text-white transition-colors hover:border-elec-yellow/60 touch-manipulation"
              >
                <Mail className="h-4 w-4" aria-hidden /> founder@elec-mate.com
              </a>
            </div>
          </div>
        </div>

        {/* ============ FAQ ============ */}
        <section className="mt-20" id="faq">
          <h2 className="mb-6 text-[24px] font-bold tracking-tight text-white sm:text-[30px]">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.question} className={`${card} group p-5`}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-white touch-manipulation [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span className="text-elec-yellow transition-transform group-open:rotate-90">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </summary>
                <p className="mt-3 max-w-[75ch] text-[15px] leading-relaxed text-white">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ============ RELATED ============ */}
        <section className="mt-20">
          <h2 className="mb-6 text-[24px] font-bold tracking-tight text-white sm:text-[30px]">
            Go deeper
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                [
                  '/guides/pricing-electrical-work-per-point',
                  'Per-Point Pricing Guide',
                  'Regional per-point rates with an instant job estimator.',
                ],
                [
                  '/mock-exams/18th-edition-bs-7671',
                  '18th Edition Mock Exam',
                  'The hardest exam in this report — practise it free.',
                ],
                [
                  '/guides/apprentice-electrician-salary',
                  'Apprentice Pay 2026',
                  'JIB stage rates and statutory minimums, with a checker.',
                ],
                [
                  '/tools/eicr-certificate',
                  'EICR Software',
                  'The certificate behind half the work in this report.',
                ],
              ] as Array<[string, string, string]>
            ).map(([href, title, desc]) => (
              <Link
                key={href}
                to={href}
                className={`${card} group p-5 transition-colors hover:border-elec-yellow/40 touch-manipulation`}
              >
                <p className="font-semibold text-white group-hover:text-elec-yellow">{title}</p>
                <p className="mt-1 text-sm leading-snug text-white">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PublicPageLayout>
  );
}
