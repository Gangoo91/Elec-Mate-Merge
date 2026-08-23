/**
 * PressKitPage — /press
 *
 * The press kit, built on the Figma/Monzo/Airbnb model: everything a deadline
 * journalist needs above the fold (contact + full-kit ZIP + response promise),
 * the original-data reports as the featured section (they are the press hook),
 * fact-check-ready stat tiles with a verification date, a real founder story,
 * previewed asset bundles as actual ZIPs in /public/press/, and copy-to-
 * clipboard boilerplate. Prose sits in a narrow measure; only asset grids and
 * stat rows run full width.
 *
 * ACCURACY RULES (do not relax):
 * - Every figure verified against the product or live database, date stated.
 *   User count verified 2026-08-22: 1,635 accounts live → published as 1,600+.
 * - Founder bio is grounded in /story (StoryPage.tsx) — nothing invented, and
 *   no registration-body claims (NICEIC/NAPIT) — none exist.
 * - Reviews are verbatim App Store reviews with published nicknames + dates.
 * - NO competitor references of any kind (house legal rule, ELE-1440).
 * - ZIP bundles are generated from the real assets; regenerate if assets
 *   change (zip -j public/press/<bundle>.zip <files>).
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { copyToClipboard } from '@/utils/clipboard';
import { Copy, Check, Download, Mail, ArrowRight, BarChart3 } from 'lucide-react';

const PAGE_TITLE = 'Elec-Mate Press Kit: Facts, Data & Media';
const PAGE_DESCRIPTION =
  'Verified facts, original data reports, founder bio and downloadable media assets for journalists covering Elec-Mate — with a same-day reply from the founder.';

const FACTS_VERIFIED = '22 August 2026';

const card =
  'rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14]';

const BOILERPLATE_SHORT =
  'Elec-Mate is the all-in-one app for UK electricians — certificates, quoting, invoicing, calculators, AI assistants and training in one subscription. Built by a qualified electrician from Cumbria, used by 1,600+ UK electricians.';

const BOILERPLATE_LONG =
  'Elec-Mate is the all-in-one app for UK electricians. It produces 19 certificate types end-to-end — including EICR, EIC, Minor Works, EV charging, Solar PV and all five BS 5839-1 fire alarm grades — alongside quoting and invoicing with card payment, 70+ electrical calculators, 8 AI assistants trained on BS 7671:2018+A4:2026, and 46+ training courses with free public mock exams. It was founded in 2025 by Andrew Moore, a Cumbrian electrician who came up through a JTL apprenticeship and lived the paperwork problem first-hand, and is used by 1,600+ UK electricians on web, iOS and Android from £6.99 a month. www.elec-mate.com';

const STATS: Array<[string, string]> = [
  ['1,600+', 'UK electricians on the platform'],
  ['19', 'certificate types with full PDF output'],
  ['118,303', 'exam answers analysed in our 2026 report'],
  ['70+', 'electrical calculators, BS 7671-aligned'],
  ['8', 'AI specialists trained on BS 7671:2018+A4:2026'],
  ['46+', 'training courses plus 35 free mock exams'],
];

const ANGLES: Array<{ title: string; hook: string; detail: string }> = [
  {
    title: 'The trade’s knowledge gap',
    hook: '35.8% of answers to 18th Edition questions are wrong — and over half of attempts miss what a Type A RCD detects.',
    detail:
      'From 118,303 real mock exam answers across 35 exams (11 Jul – 20 Aug 2026). The weakest areas are device selection, ingress protection codes and duties outside BS 7671 itself — not circuit theory. Nobody else holds question-level data on the UK trade at this scale.',
  },
  {
    title: 'What electrical work really costs',
    hook: 'The median UK electrical quote is £411 — and 74% of all quotes are under £1,000.',
    detail:
      'From 1,205 real quotes worth £1.38 million (Sep 2025 – Aug 2026). The mean is nearly three times the median — anyone quoting “average job value” is describing the big jobs, not the trade’s day-to-day reality. Regional and job-type cuts available on request.',
  },
  {
    title: 'The same-day yes',
    hook: 'Digitally sent quotes are accepted in a median of 5.3 hours — not the week the trade assumes.',
    detail:
      '75% of quotes sent through the platform were accepted, most on the same day. For a one-van business that changes cash flow more than any price rise — the job is often confirmed before the next site visit is finished.',
  },
  {
    title: 'Sellafield sparky to software founder',
    hook: 'Built at the kitchen table by a Cumbrian electrician who lost his evenings to certificates — not by a software company guessing at the trade.',
    detail:
      'Andrew Moore came up through a JTL apprenticeship, spent years as an Advanced Craftsman Electrician at Sellafield, and built Elec-Mate around the paperwork that ate his week. His full story is published at elec-mate.com/story, and he is available for interview.',
  },
];

const FACTS: Array<[string, string]> = [
  ['What it is', 'All-in-one app for UK electricians: certificates, quoting and invoicing, calculators, AI assistants and training in one subscription.'],
  ['Company', 'Elec-Mate Ltd, registered in England & Wales. ICO registration ZB935897.'],
  ['Founded', '2025, Cumbria, United Kingdom'],
  ['Founder', 'Andrew Moore — JTL apprentice, then qualified electrician, then founder'],
  ['Users', '1,600+ UK electricians (verified against the live platform database, 22 Aug 2026)'],
  ['Certificates', '19 types end-to-end with PDF output — EICR, EIC, Minor Works, EV charging, Solar PV, battery storage, all five BS 5839-1 fire alarm grades, emergency lighting, PAT and more'],
  ['Standards', 'Aligned to BS 7671:2018+A4:2026 across all certificates, calculators and training'],
  ['Calculators', '70+ electrical calculators — cable sizing, Zs lookup, adiabatic, volt drop and more'],
  ['AI', '8 specialist AI agents trained on BS 7671, the On-Site Guide and Guidance Notes'],
  ['Training', '46+ courses plus 35 free public mock exams (18th Edition, C&G 2391, 2392, AM2…)'],
  ['Platforms', 'Web, iOS (App Store, live 27 March 2026) and Android (Google Play)'],
  ['Pricing', '£6.99–£19.99/month (£69.99–£199.99/year), 7-day free trial, no card charged until day 8'],
];

const REVIEWS: Array<{ nickname: string; quote: string; date: string }> = [
  {
    nickname: 'Matt (FES)',
    quote:
      'Elec-Mate has testing software, PAT testing, quoting, invoicing, training, calendar — I went fully committed and paid up for the year. I love this app, can’t speak highly enough about it to other electricians.',
    date: '10 Jun 2026',
  },
  {
    nickname: 'I.staffy',
    quote:
      'A true all in one app for quotes, certs, calculations, RAMS, EICRs, and more. I use it every day without fail. 100% recommend.',
    date: '21 Apr 2026',
  },
  {
    nickname: 'Jayecco',
    quote:
      'Absolutely superb as an app, I can invoice, complete testing certs and reports as well as track my CPD. Everything in one place is exactly what I need, worth every penny.',
    date: '28 Mar 2026',
  },
];

const BUNDLES: Array<{
  zip: string;
  size: string;
  title: string;
  formats: string;
  previews: string[];
}> = [
  {
    zip: '/press/elec-mate-report-2026-charts.zip',
    size: '0.9 MB',
    title: 'Report chart pack',
    formats: 'PNG × 4 + CSV',
    previews: ['/images/og-report-2026.jpg'],
  },
  {
    zip: '/press/elec-mate-logos.zip',
    size: '0.2 MB',
    title: 'Logo & brand',
    formats: 'JPG',
    previews: ['/logo.jpg', '/og-image.jpg'],
  },
  {
    zip: '/press/elec-mate-screenshots.zip',
    size: '0.3 MB',
    title: 'Product screenshots',
    formats: 'WEBP · 9 screens',
    previews: [
      '/images/landing/hero-dashboard.webp',
      '/images/landing/screen-certs.webp',
      '/images/landing/screen-ai.webp',
      '/images/landing/screen-calculators.webp',
    ],
  },
  {
    zip: '/press/elec-mate-founder-photos.zip',
    size: '0.5 MB',
    title: 'Founder photos',
    formats: 'JPG · 2 photos',
    previews: ['/images/founder/andrew-moore.jpg', '/images/founder/andrew-moore-personal.jpg'],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void copyToClipboard(text).then((ok) => {
          if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        });
      }}
      className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-sm font-medium text-white transition-colors hover:border-elec-yellow/50 touch-manipulation"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-elec-yellow" aria-hidden /> Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden /> Copy
        </>
      )}
    </button>
  );
}

function SectionHeading({ kicker, children }: { kicker: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 mt-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow">
        {kicker}
      </p>
      <h2 className="mt-2 text-[24px] font-bold tracking-tight text-white sm:text-[30px]">
        {children}
      </h2>
    </div>
  );
}

export default function PressKitPage() {
  useSEO({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    image: 'https://www.elec-mate.com/images/og-press.jpg',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Press', url: '/press' },
    ],
  });

  return (
    <PublicPageLayout>
      {/* ============ HERO — contact + kit above the fold ============ */}
      <section className="border-b border-white/[0.1]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1fr_300px] lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow">
              Press kit
            </p>
            <h1 className="mt-3 text-[2.3rem] font-bold leading-[1.06] tracking-tight text-white sm:text-[3.2rem]">
              Writing about Elec-Mate?
            </h1>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-white">
              {BOILERPLATE_SHORT}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:founder@elec-mate.com"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[15px] font-bold text-black transition-colors hover:brightness-95 touch-manipulation"
              >
                <Mail className="h-4 w-4" aria-hidden /> founder@elec-mate.com
              </a>
              <a
                href="/press/elec-mate-press-kit.zip"
                download
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.2] px-6 text-[15px] font-semibold text-white transition-colors hover:border-elec-yellow/60 touch-manipulation"
              >
                <Download className="h-4 w-4" aria-hidden /> Full press kit (ZIP, 1.9 MB)
              </a>
            </div>
            <p className="mt-4 text-sm text-white">
              Email goes straight to the founder — journalists usually hear back the same working
              day. Custom data cuts, interviews and higher-resolution assets on request.
            </p>
          </div>
          <div className={`${card} hidden overflow-hidden lg:block`}>
            <img
              src="/images/founder/andrew-moore.jpg"
              alt="Andrew Moore, founder of Elec-Mate"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="p-4">
              <p className="font-semibold text-white">Andrew Moore</p>
              <p className="text-sm text-white">Founder · qualified electrician, Cumbria</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-24 lg:px-8">
        {/* ============ ORIGINAL DATA — the featured section ============ */}
        <SectionHeading kicker="Original data">
          Numbers nobody else has — free to republish
        </SectionHeading>
        <div className={`${card} overflow-hidden`}>
          <div className="grid lg:grid-cols-[1fr_300px]">
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                <BarChart3 className="h-4 w-4" aria-hidden /> Report · published 20 August 2026
              </div>
              <h3 className="mt-3 text-[20px] font-bold leading-snug text-white sm:text-[24px]">
                The UK Electrician Report 2026: more than one in three 18th Edition answers is
                wrong, and the median electrical quote is £411
              </h3>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-white">
                Aggregate data from 1,205 real quotes and 118,303 real exam answers — what UK
                electricians charge, how fast clients say yes, and the BS 7671 topics the trade
                gets wrong. Methodology and sample sizes are stated on the page. No surveys, no
                estimates, no individual identifiable.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/reports/uk-electrician-report-2026"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-sm font-bold text-black transition-colors hover:brightness-95 touch-manipulation"
                >
                  Read the report <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href="mailto:founder@elec-mate.com?subject=Data%20request%20—%20UK%20Electrician%20Report"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.2] px-5 text-sm font-semibold text-white transition-colors hover:border-elec-yellow/60 touch-manipulation"
                >
                  Request a custom cut
                </a>
              </div>
              <p className="mt-4 text-[13px] text-white">
                Every figure may be republished with credit to Elec-Mate and a link to the report.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 border-t border-white/[0.1] p-6 lg:grid-cols-1 lg:border-l lg:border-t-0">
              {(
                [
                  ['£411', 'median UK electrical quote (n = 1,205)'],
                  ['5.3 hrs', 'median time to quote acceptance'],
                  ['35.8%', 'of 18th Edition answers wrong (n = 8,607)'],
                ] as Array<[string, string]>
              ).map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold text-elec-yellow">{v}</p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-white">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story angles */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {ANGLES.map((a) => (
            <article key={a.title} className={`${card} p-6`}>
              <h3 className="text-[16px] font-bold text-white">{a.title}</h3>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-elec-yellow">
                {a.hook}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white">{a.detail}</p>
            </article>
          ))}
        </div>

        {/* ============ FAST FACTS ============ */}
        <SectionHeading kicker="Fast facts">Fact-check without emailing anyone</SectionHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map(([value, label]) => (
            <div key={label} className={`${card} p-4`}>
              <p className="text-2xl font-bold text-elec-yellow">{value}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">{label}</p>
            </div>
          ))}
        </div>
        <div className={`${card} mt-4 p-6`}>
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {FACTS.map(([k, v]) => (
              <div key={k} className="border-b border-white/[0.08] pb-3">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  {k}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-white">
            Facts verified {FACTS_VERIFIED} against the live product and platform database. If a
            figure here disagrees with anything published elsewhere, this page is the canonical
            source.
          </p>
        </div>

        {/* ============ FOUNDER ============ */}
        <div id="founder">
          <SectionHeading kicker="The founder">
            From the tools at Sellafield to 1,600 electricians
          </SectionHeading>
        </div>
        <div className={`${card} overflow-hidden`}>
          <div className="grid lg:grid-cols-[300px_1fr]">
            <img
              src="/images/founder/andrew-moore.jpg"
              alt="Andrew Moore, founder of Elec-Mate"
              className="h-72 w-full object-cover lg:h-full"
            />
            <div className="p-6 lg:p-8">
              <h3 className="text-[20px] font-bold text-white">Andrew Moore</h3>
              <p className="mt-1 text-sm font-medium text-elec-yellow">
                Founder · Approved Electrician · 18th Edition · C&amp;G 2391
              </p>
              <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-white">
                Andrew is from Whitehaven on the Cumbrian coast and came up through the trade the
                proper way — a JTL apprenticeship in 2009, then years as an Advanced Craftsman
                Electrician at Sellafield: installation, commissioning, maintenance and
                fault-finding across the plant, training and mentoring apprentices along the way.
                He now works as a Pre-Operations Engineer in the nuclear sector, and built
                Elec-Mate in the evenings around the problem he lived — certificates at the
                kitchen table, quotes to write, invoices to chase.
              </p>
              <blockquote className="mt-5 border-l-2 border-elec-yellow pl-4">
                <p className="text-[19px] font-semibold leading-snug text-white">
                  “Why is there no single app that does all of this? I couldn&apos;t find one. So I
                  decided to build it myself.”
                </p>
              </blockquote>
              <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-white">
                <strong className="text-elec-yellow">Available for comment on:</strong> electrical
                certification and the EICR market, BS 7671 and Amendment 4, apprentice training and
                assessment, AI in the trades, and the platform&apos;s original data.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:founder@elec-mate.com"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-sm font-bold text-black transition-colors hover:brightness-95 touch-manipulation"
                >
                  <Mail className="h-4 w-4" aria-hidden /> Contact Andrew
                </a>
                <a
                  href="/press/elec-mate-founder-photos.zip"
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.2] px-5 text-sm font-semibold text-white transition-colors hover:border-elec-yellow/60 touch-manipulation"
                >
                  <Download className="h-4 w-4" aria-hidden /> Photos (ZIP)
                </a>
                <Link
                  to="/story"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.2] px-5 text-sm font-semibold text-white transition-colors hover:border-elec-yellow/60 touch-manipulation"
                >
                  Read his full story <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============ WHAT ELECTRICIANS SAY ============ */}
        <SectionHeading kicker="In their words">What electricians say</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.nickname} className={`${card} flex flex-col p-6`}>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-white">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-4 text-[13px] text-white">
                <span className="text-elec-yellow">★★★★★</span>&nbsp;&nbsp;{r.nickname} · App Store
                · {r.date}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-[12.5px] text-white">
          Verbatim App Store reviews, quoted with the nickname and date as published.
        </p>

        {/* ============ MEDIA ASSETS ============ */}
        <SectionHeading kicker="Media assets">Preview first, then download</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {BUNDLES.map((b) => (
            <a
              key={b.zip}
              href={b.zip}
              download
              className={`${card} group overflow-hidden transition-colors hover:border-elec-yellow/40 touch-manipulation`}
            >
              <div className="grid h-40 grid-cols-2 gap-1 overflow-hidden bg-white/[0.03] p-1">
                {b.previews.slice(0, 4).map((src) => (
                  <div
                    key={src}
                    className={`flex items-center justify-center overflow-hidden rounded-md bg-black/30 ${
                      b.previews.length === 1 ? 'col-span-2' : ''
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-[15px] font-semibold text-white">{b.title}</p>
                  <p className="mt-0.5 text-[12px] text-white">
                    ZIP · {b.formats} · {b.size}
                  </p>
                </div>
                <Download
                  className="h-5 w-5 shrink-0 text-white transition-colors group-hover:text-elec-yellow"
                  aria-hidden
                />
              </div>
            </a>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-white">
          Please use assets unmodified and write the name as “Elec-Mate” (with the hyphen). Photo
          of Andrew and his wife Becky included in the founder bundle for personal-profile pieces.
          Higher-resolution or custom assets on request —{' '}
          <a href="mailto:founder@elec-mate.com" className="text-elec-yellow underline">
            just ask
          </a>
          .
        </p>

        {/* ============ BOILERPLATE + CLOSING CONTACT ============ */}
        <SectionHeading kicker="Boilerplate">Copy-paste “About Elec-Mate”</SectionHeading>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${card} p-6`}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-white">
                Short — one sentence
              </p>
              <CopyButton text={BOILERPLATE_SHORT} />
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-white">{BOILERPLATE_SHORT}</p>
          </div>
          <div className={`${card} p-6`}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-white">
                Full — one paragraph
              </p>
              <CopyButton text={BOILERPLATE_LONG} />
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-white">{BOILERPLATE_LONG}</p>
          </div>
        </div>

        <div className={`${card} mt-10 p-8 text-center`}>
          <h2 className="text-[22px] font-bold text-white">Need something this page doesn’t have?</h2>
          <p className="mx-auto mt-2 max-w-[52ch] text-[15px] leading-relaxed text-white">
            Interviews, custom data cuts, higher-resolution assets, or a fact checked on deadline —
            email the founder directly. Journalists usually hear back the same working day.
          </p>
          <a
            href="mailto:founder@elec-mate.com"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-7 text-[15px] font-bold text-black transition-colors hover:brightness-95 touch-manipulation"
          >
            <Mail className="h-4 w-4" aria-hidden /> founder@elec-mate.com
          </a>
        </div>
      </div>
    </PublicPageLayout>
  );
}
