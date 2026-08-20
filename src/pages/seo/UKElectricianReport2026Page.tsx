/**
 * UKElectricianReport2026Page — the Elec-Mate UK Electrician Report 2026.
 *
 * ORIGINAL FIRST-PARTY DATA. Every figure on this page was produced by an
 * aggregate SQL query against the live platform database on 2026-08-20 —
 * nothing is estimated, modelled or imported from third parties, and no
 * figure may be edited without re-running the query. Aggregates only: the
 * question-stats table carries no user dimension at all, and quote/certificate
 * figures are counts and percentiles across the whole platform.
 *
 * Built as the linkable-asset / digital-PR play: trade press and AI
 * assistants can cite concrete numbers nobody else has ("35.8% of answers to
 * 18th Edition questions are wrong"). The page explicitly grants citation
 * with attribution. NO competitor references of any kind.
 */
import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { JsonLd } from '@/components/seo/JsonLd';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { BarChart3, PoundSterling, GraduationCap, FileCheck2, ClipboardCheck } from 'lucide-react';

const PAGE_TITLE = 'UK Electrician Report 2026: Pricing & Skills';
const PAGE_DESCRIPTION =
  'Original data: 1,205 quotes and 118,303 exam answers — what UK electricians charge, how fast clients accept, and the BS 7671 topics the trade gets wrong.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'UK Electrician Report 2026', href: '/reports/uk-electrician-report-2026' },
];

const tocItems = [
  { id: 'key-findings', label: 'Key Findings' },
  { id: 'what-electricians-charge', label: 'What Electricians Charge' },
  { id: 'how-fast-clients-say-yes', label: 'How Fast Clients Say Yes' },
  { id: 'the-knowledge-gap', label: 'The Knowledge Gap' },
  { id: 'hardest-questions', label: 'The Hardest Questions' },
  { id: 'certificate-mix', label: 'The Certificate Mix' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The median electrical quote in the UK is £411, from 1,205 real quotes worth £1.38 million issued through Elec-Mate between September 2025 and August 2026. Half of all quotes fall between £160 and £1,026.',
  'Digitally delivered quotes get answered fast: 75% of quotes were accepted, and the median time from sending to client acceptance was 5.3 hours — same-day, not next-week.',
  'Across 118,303 mock exam answers, 26.4% were wrong. The 18th Edition (BS 7671) is the hardest subject on the platform: 35.8% of answers to its questions were incorrect — more than one in three.',
  'The single most-missed topics in 18th Edition practice include what a Type A RCD detects (56% of attempts wrong), what an IP2X rating indicates (54% wrong), and design coordination duties under CDM 2015 (60% wrong).',
  'EICRs dominate real certificate work: 52% of the 1,812 certificates produced on the platform are EICRs, ahead of EICs (22%) and Minor Works certificates (12%).',
  'This report is free to cite with attribution to Elec-Mate and a link to this page.',
];

const faqs = [
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
  url: 'https://www.elec-mate.com/reports/uk-electrician-report-2026',
  creator: { '@id': 'https://www.elec-mate.com/#organization' },
  license: 'https://www.elec-mate.com/reports/uk-electrician-report-2026#methodology',
  temporalCoverage: '2025-09-06/2026-08-20',
  spatialCoverage: 'United Kingdom',
  variableMeasured: [
    'Electrical quote value distribution',
    'Quote acceptance rate and time to acceptance',
    'Mock exam wrong-answer rates by qualification',
    'Certificate type mix',
  ],
};

const statCard =
  'rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5';

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className={statCard}>
      <p className="text-3xl font-bold text-elec-yellow">{value}</p>
      <p className="mt-1 text-sm leading-snug text-white">{label}</p>
    </div>
  );
}

const sections = [
  {
    id: 'key-findings',
    heading: 'Key Findings at a Glance',
    content: (
      <>
        <JsonLd data={datasetSchema} />
        <p>
          This is original data, not a survey. Every number below comes from an aggregate query of
          the Elec-Mate platform — real quotes sent to real clients, and real answers given to real
          exam questions — run on 20 August 2026.
        </p>
        <div className="my-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat value="£411" label="Median electrical quote (n = 1,205)" />
          <Stat value="5.3 hrs" label="Median time from quote sent to client acceptance" />
          <Stat value="75%" label="Of quotes were accepted" />
          <Stat value="35.8%" label="Of 18th Edition answers were wrong (n = 8,607)" />
          <Stat value="118,303" label="Mock exam answers analysed across 35 exams" />
          <Stat value="52%" label="Of all certificates produced are EICRs" />
        </div>
        <p>
          Everything here is free to cite with attribution to Elec-Mate and a link to this page —
          the <a href="#methodology" className="text-elec-yellow underline">methodology</a> section
          states exactly what was measured and when.
        </p>
      </>
    ),
  },
  {
    id: 'what-electricians-charge',
    heading: 'What UK Electricians Actually Charge',
    content: (
      <>
        <p>
          Between 6 September 2025 and 20 August 2026, electricians issued 1,205 quotes through
          Elec-Mate with a combined value of £1.38 million. The distribution tells a story that
          day-rate surveys miss: electrical work is a volume trade of small jobs punctuated by
          occasional large ones.
        </p>
        <div className={`${statCard} my-4`}>
          <h4 className="mb-3 font-bold text-white">Quote value distribution (n = 1,205)</h4>
          <div className="space-y-2 text-sm text-white">
            {(
              [
                ['Under £100', 160, '13%'],
                ['£100 – £250', 274, '23%'],
                ['£250 – £500', 213, '18%'],
                ['£500 – £1,000', 245, '20%'],
                ['£1,000 – £2,500', 206, '17%'],
                ['£2,500 – £5,000', 49, '4%'],
                ['£5,000 – £10,000', 41, '3%'],
                ['Over £10,000', 17, '1%'],
              ] as Array<[string, number, string]>
            ).map(([band, n, pct]) => (
              <div key={band} className="grid grid-cols-3 gap-2 border-b border-white/[0.08] pb-2">
                <span>{band}</span>
                <span className="text-center">{n} quotes</span>
                <strong className="text-right text-elec-yellow">{pct}</strong>
              </div>
            ))}
          </div>
        </div>
        <p>
          The median quote is <strong>£411</strong>; the middle half of all quotes sit between{' '}
          <strong>£160 and £1,026</strong>. The mean is £1,145 — nearly three times the median —
          because the biggest 5% of jobs drag it upwards. 74% of all quotes are under £1,000.
        </p>
        <p>
          Only <strong>29.6% of quotes included VAT</strong> — a reminder that a large share of
          working electricians operate below the VAT threshold, and that quoting tools need to be
          as good at ex-VAT sole-trader pricing as they are at VAT-registered work. For per-job
          benchmarks, see our{' '}
          <SEOInternalLink href="/guides/pricing-electrical-work-per-point">
            per-point pricing guide
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/guides/electrician-day-rates-uk">
            day rates guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'how-fast-clients-say-yes',
    heading: 'How Fast Clients Say Yes',
    content: (
      <>
        <p>
          Of the 1,205 quotes, <strong>908 were accepted — a 75% acceptance rate</strong> — and 822
          went on to raise an invoice. The speed is the striking part: the median time from a quote
          being created to the client accepting it was <strong>5.3 hours</strong>.
        </p>
        <p>
          The old assumption is that quotes sit in inboxes for a week. The data says that when a
          client can open a link on their phone and tap accept, most decisions happen the same day.
          For the electrician, that changes how quoting fits the working week: send the quote from
          the van before leaving the street, and the job is often confirmed before the next site
          visit is finished.
        </p>
      </>
    ),
  },
  {
    id: 'the-knowledge-gap',
    heading: 'The Knowledge Gap: 118,303 Answers Analysed',
    content: (
      <>
        <p>
          Elec-Mate&apos;s free mock exams record, for every question, how many times it has been
          shown and how many times it has been answered wrongly — with no user information attached
          at all. Between 11 July and 20 August 2026 that produced 118,303 answered questions
          across 35 exams. Overall, <strong>26.4% of answers were wrong</strong>.
        </p>
        <div className={`${statCard} my-4`}>
          <h4 className="mb-3 font-bold text-white">
            Wrong-answer rate by exam (exams with 1,000+ answers)
          </h4>
          <div className="space-y-2 text-sm text-white">
            {(
              [
                ['18th Edition (BS 7671:2018+A4:2026)', '8,607', '35.8%'],
                ['Asbestos Awareness', '1,170', '34.4%'],
                ['Fire Alarm (BS 5839-1)', '1,665', '30.8%'],
                ['C&G 2391-50 Initial Verification', '2,580', '30.7%'],
                ['IPAF (MEWP theory)', '5,440', '30.2%'],
                ['C&G 2391 Inspection & Testing', '50,656', '25.9%'],
                ['First Aid at Work', '2,705', '24.0%'],
                ['AM2 Knowledge Test', '17,301', '23.6%'],
                ['PAT Testing (C&G 2377)', '1,992', '22.6%'],
                ['PASMA (towers)', '4,181', '22.2%'],
                ['EV Charging Installation', '4,890', '21.6%'],
                ['C&G 2391-51 Periodic Inspection', '7,410', '20.9%'],
                ['Level 3 Fault Diagnosis', '1,550', '17.9%'],
              ] as Array<[string, string, string]>
            ).map(([exam, n, pct]) => (
              <div key={exam} className="grid grid-cols-3 gap-2 border-b border-white/[0.08] pb-2">
                <span className="col-span-2 sm:col-span-1">{exam}</span>
                <span className="hidden text-center sm:block">{n} answers</span>
                <strong className="text-right text-elec-yellow">{pct}</strong>
              </div>
            ))}
          </div>
        </div>
        <p>
          The 18th Edition — the regulations qualification every practising electrician holds — is
          the hardest subject on the platform. More than one answer in three is wrong. The biggest
          single dataset is the C&amp;G 2391 inspection and testing exam, where 50,656 answers ran
          at a 25.9% wrong rate. Fault diagnosis, by contrast, is where electricians are strongest:
          17.9% — practical reasoning beats regulation recall.
        </p>
        <p>
          Practise any of these free:{' '}
          <SEOInternalLink href="/mock-exams/18th-edition-bs-7671">18th Edition</SEOInternalLink>,{' '}
          <SEOInternalLink href="/mock-exams/2391-inspection-testing">2391</SEOInternalLink>,{' '}
          <SEOInternalLink href="/mock-exams/am2-online-knowledge-test">AM2</SEOInternalLink> and{' '}
          <SEOInternalLink href="/mock-exams">30 more</SEOInternalLink>.
        </p>
      </>
    ),
  },
  {
    id: 'hardest-questions',
    heading: 'The Topics Electricians Get Wrong Most',
    content: (
      <>
        <p>
          Zooming into the 18th Edition bank, these are the topics of the most-missed questions
          (each shown at least 30 times in the collection window — modest samples, stated exactly):
        </p>
        <div className={`${statCard} my-4`}>
          <div className="space-y-3 text-sm text-white">
            {(
              [
                ['Continuity test instrument requirements (short-circuit current spec)', '63% wrong (n = 30)'],
                ['Electrical verification for heat pump installations', '63% wrong (n = 30)'],
                ['Who coordinates electrical design under CDM 2015', '60% wrong (n = 30)'],
                ['What a Type A RCD is designed to detect', '56% wrong (n = 32)'],
                ['What an IP2X rating indicates', '54% wrong (n = 35)'],
              ] as Array<[string, string]>
            ).map(([topic, stat]) => (
              <div key={topic} className="grid grid-cols-3 gap-2 border-b border-white/[0.08] pb-2">
                <span className="col-span-2">{topic}</span>
                <strong className="text-right text-elec-yellow">{stat}</strong>
              </div>
            ))}
          </div>
        </div>
        <p>
          The pattern is consistent: the trade is weakest not on circuit theory but on{' '}
          <strong>device selection</strong> (RCD types — increasingly critical as EV chargers and
          inverter loads make Type AC devices unsuitable),{' '}
          <strong>ingress protection codes</strong>, and <strong>duties that sit outside BS 7671
          itself</strong>, like CDM 2015. Our guides on{' '}
          <SEOInternalLink href="/rcd-types-guide">RCD types</SEOInternalLink> and{' '}
          <SEOInternalLink href="/guides/rcd-testing-procedure">RCD testing</SEOInternalLink> cover
          the two most-missed device topics in depth.
        </p>
      </>
    ),
  },
  {
    id: 'certificate-mix',
    heading: 'The Certificate Mix: What the Work Actually Is',
    content: (
      <>
        <p>
          1,812 certificates have been produced on the platform to the query date. The mix shows
          where UK electrical work actually concentrates:
        </p>
        <div className={`${statCard} my-4`}>
          <div className="space-y-2 text-sm text-white">
            {(
              [
                ['EICR (condition reports)', 938, '52%'],
                ['EIC (new installation work)', 400, '22%'],
                ['Minor Works', 216, '12%'],
                ['Schedule of Tests (testing only)', 68, '4%'],
                ['PAT Testing', 52, '3%'],
                ['EV Charging', 40, '2%'],
                ['Emergency Lighting', 33, '2%'],
                ['Smoke & CO Alarm', 20, '1%'],
              ] as Array<[string, number, string]>
            ).map(([type, n, pct]) => (
              <div key={type} className="grid grid-cols-3 gap-2 border-b border-white/[0.08] pb-2">
                <span>{type}</span>
                <span className="text-center">{n}</span>
                <strong className="text-right text-elec-yellow">{pct}</strong>
              </div>
            ))}
          </div>
        </div>
        <p>
          Half of everything is periodic inspection. The rental sector&apos;s EICR obligations have
          made condition reporting the centre of gravity of domestic electrical work — which is why
          inspection and testing dominates the exam data above, and why the 2391 is the busiest
          mock exam on the platform by a factor of three.
        </p>
      </>
    ),
  },
  {
    id: 'methodology',
    heading: 'Methodology',
    content: (
      <>
        <p>
          All figures were produced by aggregate SQL queries against the live Elec-Mate production
          database on <strong>20 August 2026</strong>. Specifics:
        </p>
        <div className={`${statCard} my-4`}>
          <ul className="list-inside list-disc space-y-2 text-sm text-white">
            <li>
              <strong>Quotes:</strong> all 1,205 quotes with a total between £1 and £500,000,
              created 6 September 2025 – 20 August 2026. Median, quartiles and distribution
              computed across the full set. Acceptance = an acceptance recorded on the quote;
              time-to-acceptance measured from quote creation.
            </li>
            <li>
              <strong>Exam answers:</strong> per-question shown/wrong counters across 35 public
              mock exams, 11 July – 20 August 2026, totalling 118,303 answers. The counters carry
              no user identifiers. Per-question figures are only quoted where a question was shown
              at least 30 times, with the exact n stated.
            </li>
            <li>
              <strong>Certificates:</strong> counts by type across all 1,812 certificates on the
              platform at the query date.
            </li>
            <li>
              <strong>What this is not:</strong> a survey, a model, or a national census. It is the
              observed behaviour of electricians using one platform — stated exactly, with sample
              sizes, so you can judge its weight.
            </li>
          </ul>
        </div>
        <p>
          <strong>Citation:</strong> free to cite with attribution to Elec-Mate and a link to this
          page. For a specific aggregate cut for a story, get in touch.
        </p>
      </>
    ),
  },
];

export default function UKElectricianReport2026Page() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      readingTime={12}
      datePublished="2026-08-20"
      dateModified="2026-08-20"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Original Data"
      badgeIcon={BarChart3}
      heroTitle={
        <>
          The UK Electrician Report <span className="text-elec-yellow">2026</span>
        </>
      }
      heroSubtitle="What 1,205 real quotes and 118,303 real exam answers say about the state of the trade: what electricians charge, how fast clients accept, and the BS 7671 topics the industry gets wrong. Original platform data, queried 20 August 2026, free to cite with attribution."
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={[
        {
          category: 'Pricing',
          href: '/guides/pricing-electrical-work-per-point',
          title: 'Per-Point Pricing Guide',
          description: 'Regional per-point rates with an instant job estimator.',
          icon: PoundSterling,
        },
        {
          category: 'Mock Exam',
          href: '/mock-exams/18th-edition-bs-7671',
          title: '18th Edition Mock Exam',
          description: 'The hardest exam in this report — practise it free.',
          icon: GraduationCap,
        },
        {
          category: 'Careers',
          href: '/guides/apprentice-electrician-salary',
          title: 'Apprentice Pay 2026',
          description: 'JIB stage rates and statutory minimums, with a checker.',
          icon: ClipboardCheck,
        },
        {
          category: 'Software',
          href: '/tools/eicr-certificate',
          title: 'EICR Software',
          description: 'The certificate behind half the work in this report.',
          icon: FileCheck2,
        },
      ]}
    />
  );
}
