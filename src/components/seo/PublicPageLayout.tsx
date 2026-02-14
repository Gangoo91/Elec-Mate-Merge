import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Zap,
  BookOpen,
  Shield,
  Calculator,
  FileCheck,
  Brain,
  Wrench,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

const navSections = [
  {
    label: 'Certificates',
    links: [
      { to: '/tools/eicr-certificate', label: 'EICR Certificate' },
      { to: '/tools/eic-certificate', label: 'EIC Certificate' },
      { to: '/tools/minor-works-certificate', label: 'Minor Works' },
      { to: '/tools/ev-charger-certificate', label: 'EV Charger' },
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
];

const footerCertificates = [
  { to: '/tools/eicr-certificate', label: 'EICR Certificate' },
  { to: '/tools/eic-certificate', label: 'EIC Certificate' },
  { to: '/tools/minor-works-certificate', label: 'Minor Works' },
  { to: '/tools/emergency-lighting-certificate', label: 'Emergency Lighting' },
  { to: '/tools/fire-alarm-certificate', label: 'Fire Alarm' },
  { to: '/tools/pat-testing', label: 'PAT Testing' },
  { to: '/tools/ev-charger-certificate', label: 'EV Charger' },
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
  { to: '/tools/electrical-testing-calculators', label: 'All 70 Calculators' },
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
];

const footerAIAndGuides = [
  { to: '/tools/ai-electrician', label: '8 Elec-AI Specialists' },
  { to: '/tools/rams-generator', label: 'RAMS Generator' },
  { to: '/tools/electrical-quoting-app', label: 'Smart Quoting' },
  { to: '/tools/electrician-invoice-app', label: 'Invoice Builder' },
  { to: '/guides/bs7671-observation-codes', label: 'Observation Codes' },
  { to: '/guides/part-p-building-regulations', label: 'Part P Guide' },
  { to: '/guides/earthing-arrangements', label: 'Earthing Systems' },
  { to: '/guides/consumer-unit-regulations', label: 'Consumer Units' },
  { to: '/guides/testing-sequence-guide', label: 'Testing Sequence' },
  { to: '/tools/best-electrician-app-uk', label: 'Why Elec-Mate?' },
  { to: '/compare/elec-mate-vs-icertifi', label: 'vs iCertifi' },
  { to: '/compare/elec-mate-vs-certsapp', label: 'vs CertsApp' },
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

export function PublicPageLayout({ children }: PublicPageLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group touch-manipulation">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-md group-hover:bg-yellow-500/30 transition-all" />
              <img src="/logo.jpg" alt="Elec-Mate" className="relative w-9 h-9 rounded-xl" />
            </div>
            <span className="font-bold text-lg">
              Elec-<span className="text-yellow-400">Mate</span>
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
                className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation"
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
                  className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/20 touch-manipulation"
                >
                  <Link to="/auth/signup">Start Free Trial</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16">{children}</main>

      {/* Pre-footer stats bar */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">70</div>
              <div className="text-sm text-white">Calculators</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">36+</div>
              <div className="text-sm text-white">Training Courses</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">8</div>
              <div className="text-sm text-white">Certificate Types</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">8</div>
              <div className="text-sm text-white">Elec-AI Agents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080808]">
        {/* Main footer links */}
        <div className="max-w-6xl mx-auto px-5 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {/* Certificates */}
            <div>
              <h4 className="font-semibold text-yellow-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Certificates
              </h4>
              <ul className="space-y-2.5">
                {footerCertificates.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculators */}
            <div>
              <h4 className="font-semibold text-yellow-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Calculators
              </h4>
              <ul className="space-y-2.5">
                {footerCalculators.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training */}
            <div>
              <h4 className="font-semibold text-yellow-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Training
              </h4>
              <ul className="space-y-2.5">
                {footerTraining.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Tools & Guides */}
            <div>
              <h4 className="font-semibold text-yellow-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI & Guides
              </h4>
              <ul className="space-y-2.5">
                {footerAIAndGuides.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Legal */}
            <div>
              <h4 className="font-semibold text-yellow-400 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Company
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <img src="/logo.jpg" alt="Elec-Mate" className="w-8 h-8 rounded-lg" />
                    <span className="font-bold text-white">
                      Elec-<span className="text-yellow-400">Mate</span>
                    </span>
                  </div>
                  <p className="text-sm text-white leading-relaxed mb-4">
                    The complete platform for UK electricians. Certificates, calculators, AI tools,
                    training, and business management.
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-yellow-500/30 hover:bg-yellow-500/10 text-white hover:text-yellow-400 transition-all touch-manipulation"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Legal */}
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      to="/privacy"
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookies"
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/acceptable-use"
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      Acceptable Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dpa"
                      className="text-sm text-white hover:text-yellow-400 transition-colors touch-manipulation"
                    >
                      Data Processing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance bar */}
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-5 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Shield className="w-3 h-3 text-yellow-400" />
                  BS 7671:2018+A3:2024
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Shield className="w-3 h-3 text-green-400" />
                  GDPR Compliant
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <Wrench className="w-3 h-3 text-blue-400" />
                  Built for UK Electricians
                </span>
              </div>
              <p className="text-xs text-white">
                Elec-Mate &copy; {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      {!user && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden z-50 px-4 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-black via-black/95 to-transparent">
          <Link to="/auth/signup">
            <Button className="w-full h-12 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black rounded-xl shadow-lg shadow-yellow-500/25 touch-manipulation transition-transform">
              Start 7-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
