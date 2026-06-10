import { Link } from 'react-router-dom';
import useSEO, { SEOSchemas } from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  BookOpen,
  Brain,
  ClipboardCheck,
  GraduationCap,
  PlayCircle,
  Trophy,
  Users,
} from 'lucide-react';

const PAGE_TITLE = 'Electrical Training Hub | BS 7671:2018+A4:2026, 18th Edition, AM2, 2391';
const PAGE_DESCRIPTION =
  'Elec-Mate training for apprentices + qualified UK electricians: 18th Edition, AM2, I&T, 2391, Level 2, Level 3, EPA prep, Study Centre.';

const features = [
  {
    icon: GraduationCap,
    title: 'Apprentice entry points',
    description:
      'A clear starting point for Level 2, Level 3, AM2, EPA, portfolio support, and early-career electrician content.',
  },
  {
    icon: ClipboardCheck,
    title: 'Qualified electrician CPD',
    description:
      'Training pages also support inspection and testing, 18th Edition, 2391, and refreshers for experienced users.',
  },
  {
    icon: Brain,
    title: 'Learn and apply',
    description:
      'Study the topic, then apply it through calculators, certificates, and practical site workflows.',
  },
  {
    icon: PlayCircle,
    title: 'Study Centre support',
    description:
      'The training hub should reinforce the Study Centre as a public-facing learning destination, not a hidden feature.',
  },
  {
    icon: Users,
    title: 'Employers and teams',
    description:
      'Training content can support apprentices, supervisors, and employers who want visibility into progress and standards.',
  },
  {
    icon: Trophy,
    title: 'Exam-intent traffic',
    description:
      'AM2, 18th Edition, and 2391 searches are high-value because users often need ongoing support after the first visit.',
  },
];

const trainingCollections = [
  {
    heading: 'Core training pages',
    links: [
      { href: '/training/18th-edition-course', label: '18th Edition Course' },
      { href: '/training/electrical-apprentice', label: 'Electrical Apprentice Training' },
      { href: '/training/am2-exam-preparation', label: 'AM2 Exam Preparation' },
      { href: '/training/inspection-and-testing', label: 'Inspection and Testing' },
    ],
  },
  {
    heading: 'Qualification support',
    links: [
      { href: '/training/city-guilds-2391', label: 'City & Guilds 2391' },
      { href: '/training/level-2-electrical', label: 'Level 2 Electrical' },
      { href: '/training/level-3-electrical', label: 'Level 3 Electrical' },
      { href: '/training/epa-preparation', label: 'EPA Preparation' },
    ],
  },
  {
    heading: 'Study and progression',
    links: [
      { href: '/training/apprentice-portfolio', label: 'Apprentice Portfolio' },
      { href: '/study-centre', label: 'Study Centre' },
      { href: '/tools/ai-electrician', label: 'AI Learning Tools' },
      { href: '/tools/best-electrician-app-uk', label: 'Best Electrician App Overview' },
    ],
  },
  {
    heading: 'Emerging topics',
    links: [
      { href: '/guides/ev-charging-regulations', label: 'EV Charging (Reg 722)' },
      { href: '/guides/afdd-arc-fault-detection', label: 'AFDD — Reg 421.1.7' },
      { href: '/guides/18th-edition-amendment-4', label: 'Amendment 4:2026 Changes' },
      { href: '/tools/eicr-certificate', label: 'EICR Certificate Tool' },
    ],
  },
];

const faqs = [
  {
    question: 'Who is the Elec-Mate training hub for?',
    answer:
      'It is designed for electrical apprentices, newly qualified electricians, and experienced electricians doing CPD or specialist upskilling.',
  },
  {
    question: 'What can I learn here?',
    answer:
      'You can work through apprentice training, 18th Edition, AM2, inspection and testing, 2391, EPA preparation, and ongoing revision support.',
  },
  {
    question: 'Does training content connect back into the app?',
    answer:
      'Yes. Once you sign up, you can move from training into the Study Centre, calculators, certificates, and AI support inside Elec-Mate.',
  },
  {
    question: 'How does Elec-Mate keep 18th Edition content up to date?',
    answer:
      'All content is aligned to BS 7671:2018+A4:2026 — the current edition of the IET Wiring Regulations including Amendment 4 (2026). Where specialist topics such as EV charging (Section 722) or arc fault detection (Regulation 421.1.7) require additional knowledge beyond the general standard, Elec-Mate directs learners to the relevant specialist guidance rather than simplifying it away.',
  },
  {
    question: 'How many off-the-job training hours do electrical apprentices need?',
    answer:
      'Since 1 August 2025, off-the-job (OTJ) training is set as a fixed number of hours per apprenticeship standard rather than the old "20% of paid hours" rule. The Installation and Maintenance Electrician standard (ST0152) requires a minimum of 1,066 OTJ hours across the apprenticeship. Hours must be logged and evidenced — Elec-Mate&apos;s portfolio tools make that record-keeping straightforward.',
  },
  {
    question: 'Are EAL and City & Guilds electrical qualifications the same?',
    answer:
      'No. EAL and City & Guilds are separate, standalone awarding organisations with their own qualification codes, units and assessments. An employer or college will specify which one you study; one does not convert into the other, even where the underlying learning looks similar. Both routes prepare you for the same end-point assessment (EPA) and AM2.',
  },
];

// Apprenticeship pathway — UK qualification stages (indicative routing, not awarding-body advice)
const pathwayStages = [
  {
    stage: 'Level 2',
    focus: 'Electrical installation foundations',
    detail: 'Core principles, basic installation, health & safety. Classroom plus early site work.',
  },
  {
    stage: 'Level 3',
    focus: 'Advanced installation & design',
    detail: 'Inspection & testing, fault diagnosis, design principles and BS 7671 application.',
  },
  {
    stage: 'AM2 / AM2S',
    focus: 'Practical competence assessment',
    detail: 'Independent practical test of safe isolation, installation, testing and fault finding.',
  },
  {
    stage: 'EPA',
    focus: 'End-point assessment',
    detail: 'Gateway sign-off, AM2(S), and professional discussion against the apprenticeship standard.',
  },
];

// AFDD requirement under BS 7671:2018+A4:2026, Regulation 421.1.7 (verified against the standard)
const afddRows = [
  {
    premises: 'Higher Risk Residential Buildings',
    status: 'Required',
    tone: 'required' as const,
  },
  { premises: 'Houses in Multiple Occupation (HMOs)', status: 'Required', tone: 'required' as const },
  {
    premises: 'Purpose-built student accommodation',
    status: 'Required',
    tone: 'required' as const,
  },
  { premises: 'Care homes', status: 'Required', tone: 'required' as const },
  {
    premises: 'All other premises (single-phase AC)',
    status: 'Recommended',
    tone: 'recommended' as const,
  },
];

// Verified A4:2026 changes most relevant to training/CPD
const a4Changes = [
  {
    ref: 'Regulation 421.1.7',
    change:
      'AFDDs now required on socket-outlet final circuits rated ≤32 A in higher-risk premises; recommended elsewhere.',
  },
  {
    ref: 'Regulation 411.3.4',
    change:
      'Additional protection by 30 mA RCD now required for final circuits supplying luminaires in domestic (household) premises.',
  },
  {
    ref: 'Part 6 (Chapters 64 & 65)',
    change:
      'Inspection and testing fully restructured and renumbered — initial verification (Ch 64) and periodic inspection and testing (Ch 65).',
  },
  {
    ref: 'Section 722',
    change:
      'Electric vehicle charging installation requirements maintained as a dedicated special-installation section.',
  },
];

const collectionSchema = {
  '@type': 'CollectionPage',
  name: 'Electrical Training Hub',
  description: PAGE_DESCRIPTION,
  url: 'https://www.elec-mate.com/training',
};

export default function TrainingHubPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    schemas: [collectionSchema, SEOSchemas.faqPage(faqs)],
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Training', url: '/training' },
    ],
    dateModified: '2026-06-10',
    author: 'Andrew Moore',
  });

  return (
    <PublicPageLayout>
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Training and Study</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Electrical Training for{' '}
            <span className="text-yellow-400">Apprentices and Electricians</span>
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed mb-8">
            Find the right Elec-Mate training route for apprentice study, exam preparation, CPD, and
            skills refreshers. Everything here is designed to help you learn faster and keep
            progressing in the trade.
          </p>
          <p className="text-base text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            All 18th Edition content on Elec-Mate is aligned to BS 7671:2018+A4:2026 — the current
            edition of the wiring regulations — including arc fault detection devices under
            Regulation 421.1.7 and the expanded RCD requirements introduced by Amendment 4.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="#training-collections"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl transition-colors"
            >
              Browse Training Pages
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-300 mb-3">
              Which electrical training course do I need?
            </h2>
            <p className="text-white leading-relaxed">
              UK electricians usually progress Level 2 → Level 3 → AM2, then sit end-point assessment
              (EPA) to qualify. Once working, you keep current with 18th Edition (BS 7671:2018+A4:2026)
              and can specialise through City &amp; Guilds 2391 inspection and testing. Apprentices
              also log a fixed number of off-the-job training hours. Use the routes below to jump
              straight to the stage you are at.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Training for every stage
          </h2>
          <p className="text-white leading-relaxed mb-8 max-w-4xl">
            Whether you are starting out or topping up your knowledge, this hub ties together pages
            like{' '}
            <SEOInternalLink href="/training/18th-edition-course">18th Edition</SEOInternalLink>,{' '}
            <SEOInternalLink href="/training/am2-exam-preparation">AM2 preparation</SEOInternalLink>
            , <SEOInternalLink href="/training/city-guilds-2391">2391</SEOInternalLink>, and the{' '}
            <SEOInternalLink href="/study-centre">Study Centre</SEOInternalLink> so you can find the
            right learning path quickly.
          </p>
          <SEOFeatureGrid features={features} />

          <h3 className="text-xl font-bold text-white mt-12 mb-2">The apprenticeship pathway</h3>
          <p className="text-white/80 leading-relaxed mb-6 max-w-4xl">
            A typical Installation and Maintenance Electrician route runs through four stages. Exact
            qualifications depend on whether you study with{' '}
            <SEOInternalLink href="/training/city-guilds-2391">City &amp; Guilds</SEOInternalLink> or
            EAL — these are separate awarding organisations, so check which your employer or college
            uses.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pathwayStages.map((s, i) => (
              <div
                key={s.stage}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/15 text-yellow-300 text-sm font-bold">
                    {i + 1}
                  </span>
                  <span className="text-lg font-bold text-white">{s.stage}</span>
                </div>
                <p className="text-sm font-semibold text-yellow-200/90 mb-1">{s.focus}</p>
                <p className="text-sm text-white/75 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Off-the-job training hours
          </h2>
          <p className="text-white/80 leading-relaxed mb-6">
            Off-the-job (OTJ) training is learning that takes place within an apprentice&apos;s paid
            working hours but away from their normal day-to-day duties.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-green-700/40 bg-green-900/20 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-300 mb-2">
                Current rule (from 1 August 2025)
              </p>
              <p className="text-3xl font-bold text-white mb-1">1,066 hours</p>
              <p className="text-sm text-white/80 leading-relaxed">
                A fixed minimum set by the Installation and Maintenance Electrician standard (ST0152),
                logged and evidenced across the apprenticeship.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">
                Historic rule (pre-August 2025 starts)
              </p>
              <p className="text-3xl font-bold text-white/70 mb-1">20% of hours</p>
              <p className="text-sm text-white/70 leading-relaxed">
                Older apprenticeships used a percentage of paid hours. This has been replaced by the
                fixed-hours model and should not be used for new starts.
              </p>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed mt-6">
            Track and evidence these hours in the{' '}
            <SEOInternalLink href="/training/apprentice-portfolio">apprentice portfolio</SEOInternalLink>{' '}
            so the record is ready for your tutor, assessor and EPA gateway.
          </p>
        </div>
      </section>

      <section id="training-collections" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Training collections</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {trainingCollections.map((collection) => (
              <div
                key={collection.heading}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">{collection.heading}</h3>
                <div className="space-y-3">
                  {collection.links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-white hover:border-yellow-500/30 hover:text-yellow-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-4 text-white leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Learn it, then use it</h2>
          <p>
            Training works best when it connects back to real jobs. If you are revising{' '}
            <SEOInternalLink href="/training/inspection-and-testing">
              inspection and testing
            </SEOInternalLink>
            , you can move straight into the{' '}
            <SEOInternalLink href="/tools/eicr-certificate">certificate workflow</SEOInternalLink>.
          </p>
          <h3 className="text-xl font-bold text-white pt-2">Why stay current?</h3>
          <p>
            Regulation 16 of the Electricity at Work Regulations 1989 (EAWR) requires persons to be
            competent to prevent danger. For qualified electricians, that means structured CPD is not
            optional — it keeps you working safely and lawfully as regulations evolve. Elec-Mate&apos;s
            CPD and 18th Edition content is built around that obligation, giving employers and their
            teams a clear, documented path to ongoing compliance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-xl font-bold text-white mb-2">
            Key BS 7671:2018+A4:2026 changes to revise
          </h3>
          <p className="text-white/80 leading-relaxed mb-5">
            Amendment 4 brought several changes that come up in exams, CPD and on the job. These are
            the headline updates worth knowing.
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/[0.06] text-white/70">
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">What changed</th>
                </tr>
              </thead>
              <tbody>
                {a4Changes.map((row) => (
                  <tr key={row.ref} className="border-t border-white/8">
                    <td className="px-4 py-3 align-top font-mono text-yellow-300 whitespace-nowrap">
                      {row.ref}
                    </td>
                    <td className="px-4 py-3 align-top text-white/85 leading-relaxed">
                      {row.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/70 text-sm mt-3">
            Go deeper on the{' '}
            <SEOInternalLink href="/guides/18th-edition-amendment-4">
              Amendment 4:2026 changes guide
            </SEOInternalLink>{' '}
            and{' '}
            <SEOInternalLink href="/guides/afdd-arc-fault-detection">
              arc fault detection (AFDDs)
            </SEOInternalLink>
            .
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-xl font-bold text-white mb-2">
            Where are AFDDs required? (Regulation 421.1.7)
          </h3>
          <p className="text-white/80 leading-relaxed mb-5">
            Under Amendment 4, arc fault detection devices on socket-outlet final circuits rated up
            to 32 A are a requirement in certain higher-risk premises, and recommended in all others.
          </p>
          <div className="space-y-2">
            {afddRows.map((row) => (
              <div
                key={row.premises}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                  row.tone === 'required'
                    ? 'border-red-700/40 bg-red-900/20'
                    : 'border-blue-700/40 bg-blue-900/20'
                }`}
              >
                <span className="text-white/90">{row.premises}</span>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    row.tone === 'required'
                      ? 'bg-red-500/20 text-red-200'
                      : 'bg-blue-500/20 text-blue-200'
                  }`}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/70 text-sm mt-3">
            Using AFDDs does not remove the need to apply the other protective measures required
            elsewhere in BS 7671.
          </p>
        </div>
      </section>

      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Training hub FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Study in one place and use it on the job"
        subheading="Move from revision and exam prep into certificates, calculators, and AI tools when you are ready to put the knowledge to work."
      />
    </PublicPageLayout>
  );
}
