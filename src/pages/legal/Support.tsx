/**
 * Support — 4 Oct 2026 rebuild (ELE-1812). Same Volt shell as the legal
 * documents: grey ground, white type, volt only as a line or a label, no
 * icons. Every answer below names the real Settings path in the app — check
 * src/pages/Settings.tsx and the tab button labels before changing one.
 */
import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { LEGAL_DOCS } from '@/content/legal/parse';

const CONTACTS = [
  {
    label: 'Email',
    value: 'info@elec-mate.com',
    detail: 'We aim to reply within 24 hours.',
    href: 'mailto:info@elec-mate.com',
    external: false,
  },
  {
    label: 'Phone',
    value: '07507 241 303',
    detail: 'Monday to Friday, 9am to 5pm.',
    href: 'tel:+447507241303',
    external: false,
  },
  {
    label: 'Community',
    value: 'Telegram group',
    detail: 'Chat with us and other electricians.',
    href: 'https://t.me/Elec_MateOfficialGroup',
    external: true,
  },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: 'How do I cancel my subscription?',
    a: (
      <>
        It depends where you paid. On our website: <strong>Settings → Billing → Manage
        Subscription</strong>. On an iPhone: the Settings app → your name → Subscriptions. On
        Android: Google Play → Payments &amp; subscriptions → Subscriptions. You keep access until
        the end of the period you&rsquo;ve paid for.
      </>
    ),
  },
  {
    q: 'How do I restore my purchases?',
    a: (
      <>
        <strong>Settings → Billing → Restore Purchases</strong>. This picks up a subscription you
        bought through Apple or Google Play on the same store account.
      </>
    ),
  },
  {
    q: 'How do I get a copy of my data?',
    a: (
      <>
        <strong>Settings → Privacy → Download My Data</strong>. You get a ZIP file with your
        records as spreadsheets and JSON, plus links to your photos and files. We email you a
        download link as well, which works for 7 days.
      </>
    ),
  },
  {
    q: 'How do I delete my account?',
    a: (
      <>
        <strong>Settings → Privacy → Delete My Account</strong>. Any subscription or trial you
        started on our website is cancelled for you. If you pay through Apple or Google Play,
        cancel it there too — we can&rsquo;t do that for you. You have 30 days to change your mind;
        after that everything is erased for good.{' '}
        <Link to="/account-deletion" className="font-semibold text-elec-yellow underline decoration-elec-yellow/40 underline-offset-2">
          Full details
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Is my data secure?',
    a: (
      <>
        Your data is stored in London and encrypted in transit and at rest. Access rules in the
        database keep your certificates, quotes and customers private to your account.{' '}
        <Link to="/privacy" className="font-semibold text-elec-yellow underline decoration-elec-yellow/40 underline-offset-2">
          Read our privacy notice
        </Link>
        .
      </>
    ),
  },
];

const Support = () => {
  useEffect(() => {
    document.title = 'Support · Elec-Mate';
    window.scrollTo(0, 0);
  }, []);

  return (
    <PublicPageLayout>
      <div className="px-5 pb-16 pt-10 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-[46rem]">
          <header>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Support · Elec-Mate Ltd
            </p>
            <h1 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[46px]">
              How can we help?
            </h1>
            <p className="mt-4 text-[17px] leading-[1.6] text-white">
              A question, a bug or a hand with something on site — get in touch and you&rsquo;ll
              hear back from a real person, usually Andrew, the founder.
            </p>
          </header>

          {/* Contact */}
          <ul className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-h-[72px] items-center justify-between gap-4 py-4 touch-manipulation"
                >
                  <span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-[18px] font-semibold text-white group-hover:text-elec-yellow">
                      {c.value}
                    </span>
                    <span className="mt-0.5 block text-[14px] text-white">{c.detail}</span>
                  </span>
                  <span className="shrink-0 text-[14px] font-semibold text-white group-hover:text-elec-yellow">
                    {c.external ? 'Open' : c.label === 'Phone' ? 'Call' : 'Email'}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* FAQ */}
          <section className="mt-14">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[26px]">
              Common questions
            </h2>
            <div className="mt-5 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-1">
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-white touch-manipulation [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="shrink-0 text-[20px] font-normal text-elec-yellow transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-[16px] leading-[1.7] text-white">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Legal */}
          <section className="mt-14">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
              Legal pages
            </p>
            <ul className="mt-3 grid divide-y divide-white/[0.08] border-y border-white/[0.08] sm:grid-cols-2 sm:divide-y-0">
              {LEGAL_DOCS.map((d) => (
                <li key={d.href} className="sm:border-b sm:border-white/[0.08]">
                  <Link
                    to={d.href}
                    className="flex min-h-[48px] items-center text-[15px] font-medium text-white hover:text-elec-yellow touch-manipulation"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13.5px] leading-relaxed text-white">
              Elec-Mate Ltd · company number 16416291 · registered office 33 Gable Road,
              Whitehaven, CA28 8HE · ICO registration ZB935897 · info@elec-mate.com
            </p>
          </section>
        </div>
      </div>
    </PublicPageLayout>
  );
};

export default Support;
