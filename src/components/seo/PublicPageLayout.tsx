import { Link } from 'react-router-dom';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RelatedMockExamCta } from '@/components/seo/RelatedMockExamCta';
import { GUIDE_TO_MOCK_EXAM } from '@/data/seo/guideToMockExam';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

/**
 * Footer column heading — type only, no icon. Deliberately carries NO colour:
 * every caller supplies one. Baking `text-white` in here silently beat the
 * per-column accents, because Tailwind resolves two competing `text-*`
 * utilities by stylesheet order, not by the order they appear in className.
 */
const FOOTER_LABEL = 'text-[11px] font-semibold uppercase tracking-[0.2em]';

const navSections = [
  {
    label: 'Certificates',
    links: [
      { to: '/tools/eicr-certificate', label: 'EICR Certificate' },
      { to: '/eic-certificate', label: 'EIC Certificate' },
      { to: '/tools/minor-works-certificate', label: 'Minor Works' },
      { to: '/ev-charger-certificate', label: 'EV Charger' },
    ],
  },
  {
    label: 'Calculators',
    links: [
      { to: '/tools/cable-sizing-calculator', label: 'Cable Sizing' },
      { to: '/tools/voltage-drop-calculator', label: 'Voltage Drop' },
      { to: '/tools/electrical-testing-calculators', label: 'All Calculators' },
    ],
  },
  {
    label: 'Training',
    links: [
      { to: '/training/18th-edition-course', label: '18th Edition' },
      { to: '/training/electrical-apprentice', label: 'Apprentice' },
      { to: '/training/am2-exam-preparation', label: 'AM2 Prep' },
    ],
  },
  /**
   * The mock exams had no nav entry at all, on any of the 1,391 public pages.
   * They are the best-converting format on the site — 6.4% click-through from
   * search against 1.3% for the guides, measured at the same ranking positions
   * — and until now the only way to reach one was to already know the URL.
   */
  {
    label: 'Mock Exams',
    links: [
      { to: '/mock-exams/18th-edition-bs-7671', label: '18th Edition' },
      { to: '/mock-exams/2391-inspection-testing', label: 'C&G 2391' },
      { to: '/mock-exams/am2-online-knowledge-test', label: 'AM2' },
      { to: '/mock-exams', label: 'All mock exams' },
    ],
  },
];

const footerCertificates = [
  { to: '/tools/eicr-certificate', label: 'EICR Certificate' },
  { to: '/eic-certificate', label: 'EIC Certificate' },
  { to: '/tools/minor-works-certificate', label: 'Minor Works' },
  { to: '/tools/emergency-lighting-certificate', label: 'Emergency Lighting' },
  { to: '/fire-alarm-certificate', label: 'Fire Alarm' },
  { to: '/tools/pat-testing', label: 'PAT Testing' },
  { to: '/ev-charger-certificate', label: 'EV Charger' },
  { to: '/tools/solar-pv-certificate', label: 'Solar PV' },
];

const footerCalculators = [
  { to: '/tools/cable-sizing-calculator', label: 'Cable Sizing' },
  { to: '/tools/voltage-drop-calculator', label: 'Voltage Drop' },
  { to: '/tools/earth-loop-impedance-calculator', label: 'Earth Loop Impedance' },
  { to: '/tools/max-demand-calculator', label: 'Maximum Demand' },
  { to: '/tools/prospective-fault-current-calculator', label: 'Fault Current' },
  { to: '/tools/conduit-fill-calculator', label: 'Conduit Fill' },
  { to: '/tools/trunking-fill-calculator', label: 'Trunking Fill' },
  { to: '/tools/power-factor-calculator', label: 'Power Factor' },
  { to: '/tools/rcd-testing-guide', label: 'RCD Testing' },
  { to: '/tools/adiabatic-equation-calculator', label: 'Adiabatic Equation' },
  { to: '/tools/ring-circuit-calculator', label: 'Ring Circuit' },
  { to: '/tools/electrical-testing-calculators', label: 'All 70+ Calculators' },
];

const footerTraining = [
  { to: '/training/18th-edition-course', label: '18th Edition (BS 7671)' },
  { to: '/training/electrical-apprentice', label: 'Apprentice Training' },
  { to: '/training/am2-exam-preparation', label: 'AM2 Exam Preparation' },
  { to: '/training/inspection-and-testing', label: 'Inspection & Testing' },
  { to: '/training/city-guilds-2391', label: 'C&G 2391' },
  { to: '/training/level-2-electrical', label: 'Level 2 Electrical' },
  { to: '/training/level-3-electrical', label: 'Level 3 Electrical' },
  { to: '/training/epa-preparation', label: 'EPA Preparation' },
  { to: '/training/apprentice-portfolio', label: 'Portfolio Guide' },
  // Mock exams live in this column rather than a sixth one: the footer grid is
  // 12 wide and already full (4 link columns + a 4-wide brand block), and a
  // fifth column wraps to a second row on desktop.
  { to: '/mock-exams/18th-edition-bs-7671', label: '18th Edition Mock Exam' },
  { to: '/mock-exams/2391-inspection-testing', label: '2391 Mock Exam' },
  { to: '/mock-exams/am2-online-knowledge-test', label: 'AM2 Mock Exam' },
  { to: '/mock-exams', label: 'All Mock Exams' },
];

const footerAIAndGuides = [
  { to: '/tools/ai-electrician', label: 'AI Agents' },
  { to: '/tools/rams-generator', label: 'RAMS Generator' },
  { to: '/tools/electrical-quoting-app', label: 'Smart Quoting' },
  { to: '/tools/electrician-invoice-app', label: 'Invoice Builder' },
  { to: '/bs7671-observation-codes', label: 'Observation Codes' },
  { to: '/guides/part-p-building-regulations', label: 'Part P Guide' },
  { to: '/guides/earthing-arrangements', label: 'Earthing Systems' },
  { to: '/consumer-unit-regulations', label: 'Consumer Units' },
  { to: '/guides/testing-sequence-guide', label: 'Testing Sequence' },
];

const socialLinks = [
  {
    href: 'https://www.facebook.com/ElecMateUK',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/elec_mate',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@elec_mate',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/elec-mate',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'https://t.me/Elec_MateOfficialGroup',
    label: 'Telegram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const organizationWebsiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.elec-mate.com/#organization',
      name: 'Elec-Mate',
      legalName: 'Elec-Mate Ltd',
      alternateName: ['ElecMate', 'Elec Mate'],
      url: 'https://www.elec-mate.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.elec-mate.com/logo.jpg',
      },
      sameAs: [
        'https://www.facebook.com/ElecMateUK',
        'https://www.instagram.com/elec_mate',
        'https://www.tiktok.com/@elec_mate',
        'https://www.linkedin.com/company/elec-mate',
        'https://t.me/Elec_MateOfficialGroup',
        'https://apps.apple.com/gb/app/elec-mate/id6758948665',
      ],
      description:
        "The UK's all-in-one platform for electricians — digital certificates, AI tools, training, calculators, and business management.",
      foundingDate: '2025',
      founder: {
        '@type': 'Person',
        name: 'Andrew Moore',
        jobTitle: 'Founder',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'info@elec-mate.com',
        areaServed: 'GB',
        availableLanguage: 'en-GB',
      },
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      knowsAbout: [
        'BS 7671 Wiring Regulations',
        'Electrical Installation Condition Reports',
        'Electrical Installation Certificates',
        'Cable Sizing',
        'Electrical Testing',
        'Electrical Apprenticeships',
        '18th Edition IET Wiring Regulations',
        'Electrical Safety',
        'EICR Certificates',
        'Minor Works Certificates',
        'EV Charger Installation',
        'Fire Alarm Systems',
        'Emergency Lighting',
        'Solar PV Installation',
        'PAT Testing',
        'Electrical Business Management',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.elec-mate.com/#website',
      url: 'https://www.elec-mate.com',
      name: 'Elec-Mate',
      publisher: {
        '@id': 'https://www.elec-mate.com/#organization',
      },
      description:
        "The UK's all-in-one platform for electricians — digital certificates, AI tools, training, calculators, and business management.",
      inLanguage: 'en-GB',
    },
  ],
};

export function PublicPageLayout({ children }: PublicPageLayoutProps) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Trailing slashes and query strings must not defeat the lookup — a visitor
  // arriving on /guides/ze-values-uk/ should see the same page as one without.
  const relatedExam = GUIDE_TO_MOCK_EXAM[location.pathname.replace(/\/+$/, '') || '/'];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Tell the page a 100px bar is pinned to the bottom, so anything else anchored
  // there can sit ABOVE it instead of under it. The Contents button in
  // SEOTableOfContents is fixed bottom-4 at z-40 against this bar's z-50, which
  // put it entirely inside the bar's band and made it untappable on mobile for
  // every logged-out visitor — the ELE-1503 failure again, on the tool and guide
  // templates this time. Driven from here because this is the only component
  // that knows whether the bar is rendered at all.
  useEffect(() => {
    if (user) return;
    document.body.classList.add('has-sticky-cta');
    return () => document.body.classList.remove('has-sticky-cta');
  }, [user]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Body-inline JSON-LD — react-helmet never rendered this (see JsonLd.tsx). */}
      <JsonLd data={organizationWebsiteSchema} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)]">
        {/* Flat ground + a straight hairline. The old bar had a yellow glow
            blurred behind the logo and a gradient-fade rule — both read as
            generic/AI. Quiet separators, no decoration. */}
        <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/[0.12]" />

        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex touch-manipulation items-center gap-2.5">
            <img src="/logo.jpg" alt="" className="h-9 w-9 rounded-xl" />
            <span className="text-[17px] font-bold tracking-[-0.02em]">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navSections.map((section) => (
              <div key={section.label} className="group relative">
                <button className="text-sm font-medium text-white hover:text-yellow-400 transition-colors touch-manipulation py-2">
                  {section.label}
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-[#141414] border border-white/10 rounded-xl p-2 min-w-[200px] shadow-2xl shadow-black/50">
                    {section.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block px-4 py-2.5 text-sm text-white hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors touch-manipulation"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <Button
                asChild
                size="sm"
                className="h-11 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="hidden sm:inline text-sm font-medium text-white hover:text-yellow-400 px-4 py-2 transition-colors touch-manipulation"
                >
                  Sign in
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="hidden h-11 touch-manipulation rounded-xl bg-elec-yellow px-5 font-semibold text-black hover:brightness-95 sm:inline-flex"
                >
                  <Link to="/auth/signup">Start free trial</Link>
                </Button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="relative max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/[0.12] bg-[#0a0a0a] md:hidden">
            {navSections.map((section) => (
              <div key={section.label} className="border-b border-white/[0.12]">
                <p className="px-5 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  {section.label}
                </p>
                <ul className="divide-y divide-white/[0.08]">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex min-h-[52px] touch-manipulation items-center px-5 text-[15px] text-white transition-colors hover:bg-white/[0.04]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {!user && (
              <div className="space-y-2.5 px-5 py-5">
                <Link
                  to="/auth/signup"
                  className="flex h-12 w-full touch-manipulation items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-bold text-black"
                >
                  Start free trial
                </Link>
                <Link
                  to="/auth/signin"
                  className="flex h-12 w-full touch-manipulation items-center justify-center rounded-xl border border-white/25 text-[15px] font-medium text-white"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Content */}
      {/* The top padding clears the fixed 64px nav. The BOTTOM padding clears the
          fixed sticky CTA below, which is 100px tall, mobile-only and rendered
          only when logged out — without it the last 100px of every public page
          sits under the bar at maximum scroll, with nothing left to scroll.
          Same class of bug as ELE-1503, by starvation rather than z-index.
          data-sticky-cta-pad lets an exam stand the spacer down alongside the
          bar itself (see body.exam-active in index.css). */}
      <main
        data-sticky-cta-pad={!user ? '' : undefined}
        className={`pt-[calc(4rem+env(safe-area-inset-top,0px))] ${
          !user ? 'pb-28 sm:pb-0' : ''
        }`}
      >
        {children}
      </main>

      {/* Sits directly under the article, before the generic pre-footer bands,
          because it is the one thing on this page the reader might actually
          want next. Absent for any route without an honest pairing. */}
      {relatedExam && <RelatedMockExamCta {...relatedExam} />}

      {/* Pre-footer figures — raised onto the neutral card ground so the page
          ends on two distinct bands (light strip, then the dark footer) rather
          than one flat run of black. Figures carry the emphasis. */}
      <section
        className="border-t border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
        aria-label="What's in Elec-Mate"
      >
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-y-7 sm:grid-cols-4 sm:gap-y-0">
            {[
              ['19', 'Certificate types'],
              ['70+', 'Calculators'],
              ['46+', 'Training courses'],
              ['8', 'AI specialists'],
            ].map(([figure, label], i) => (
              <div
                key={label}
                className={
                  i > 0
                    ? 'sm:border-l sm:border-white/[0.12] sm:pl-7'
                    : ''
                }
              >
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block text-[32px] font-bold leading-none tracking-[-0.035em] tabular-nums text-white sm:text-[36px]">
                    {figure}
                  </span>
                  <span className="mt-2 block text-[13px] text-white">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Footer — typographic only, no icon headings, no pills. Column
          headings carry the SAME category accents used on the related-page
          cards and the component eyebrows, so a colour means the same thing
          everywhere on the site. Surfaces stay neutral; only type is coloured. */}
      <footer className="border-t border-white/[0.12] bg-[#070707]">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-11 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-8">
            {[
              { heading: 'Certificates', links: footerCertificates, accent: 'text-violet-300' },
              { heading: 'Calculators', links: footerCalculators, accent: 'text-sky-300' },
              { heading: 'Training and mock exams', links: footerTraining, accent: 'text-emerald-300' },
              { heading: 'AI and guides', links: footerAIAndGuides, accent: 'text-amber-300' },
            ].map((col) => (
              <div key={col.heading} className="lg:col-span-2">
                <h4 className={`${FOOTER_LABEL} ${col.accent}`}>{col.heading}</h4>
                <ul className="mt-4 space-y-0.5">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="inline-block touch-manipulation py-1.5 text-[13.5px] text-white transition-colors hover:text-elec-yellow"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Brand block — given real width so the footer has a masthead
                rather than five identical columns of links. */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4 lg:border-l lg:border-white/[0.12] lg:pl-10">
              <div className="flex items-center gap-2.5">
                <img src="/logo.jpg" alt="" className="h-9 w-9 rounded-lg" />
                <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
                  Elec-<span className="text-elec-yellow">Mate</span>
                </span>
              </div>
              <p className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-white">
                The complete platform for UK electricians. Certificates, calculators, AI tools,
                training and business management.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-x-6">
                <div>
                  <h4 className={`${FOOTER_LABEL} text-white`}>Company</h4>
                  <ul className="mt-3 space-y-0.5">
                    {[
                      { to: '/privacy', label: 'Privacy policy' },
                      { to: '/terms', label: 'Terms of service' },
                      { to: '/cookies', label: 'Cookie policy' },
                      { to: '/acceptable-use', label: 'Acceptable use' },
                      { to: '/dpa', label: 'Data processing' },
                      { to: '/press', label: 'Press kit' },
                      { to: '/story', label: 'Our story' },
                    ].map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          className="inline-block touch-manipulation py-1.5 text-[13.5px] text-white transition-colors hover:text-elec-yellow"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className={`${FOOTER_LABEL} text-white`}>Follow</h4>
                  <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="-my-2 inline-flex h-11 items-center text-white transition-colors hover:text-elec-yellow touch-manipulation"
                          aria-label={social.label}
                          title={social.label}
                        >
                          {social.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance bar, set as a rating plate — the labelled-fact strip you
            find on the side of a consumer unit or a test instrument. Suits the
            product, and it turns three facts that were running together behind
            middots into something scannable.

            The standard reference is the CURRENT edition, verified against
            bs7671_editions (the RAG), where 2018+A4:2026 is the active
            edition. Do not let this drift. */}
        <div className="border-t border-white/[0.12] bg-black">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:items-start sm:gap-0">
              {[
                ['Built to', 'BS 7671:2018+A4:2026'],
                ['Data', 'GDPR compliant'],
                ['Origin', 'Made in the UK'],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={
                    i > 0 ? 'sm:ml-7 sm:border-l sm:border-white/[0.14] sm:pl-7' : ''
                  }
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[13px] font-medium tabular-nums text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[12.5px] text-white lg:shrink-0 lg:text-right">
              Elec-Mate &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA — social proof + price + badges.
          ELE-1503: this is fixed bottom-0 at z-50 and covered the Next button on
          the free public mock exams, which are mobile-first and logged-out — the
          exact audience this bar targets. data-exam-obstructs lets an exam stand
          it down (see body.exam-active in index.css). */}
      {!user && (
        <div
          data-exam-obstructs
          className="fixed bottom-0 left-0 right-0 sm:hidden z-50 px-4 pt-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-black via-black/95 to-transparent">
          <p className="text-center text-[11px] text-white mb-2">
            <span className="text-green-400 font-semibold">1,600+ electricians</span>
            {' · '}From £6.99/mo after trial
          </p>
          <div className="flex items-center gap-2">
            <Link to="/auth/signup" className="flex-1">
              <Button className="w-full h-12 text-sm font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-transform">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a
              href="https://apps.apple.com/gb/app/elec-mate/id6758948665"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <img
                src="/images/app-store-badge.svg"
                alt="App Store"
                className="h-10"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
