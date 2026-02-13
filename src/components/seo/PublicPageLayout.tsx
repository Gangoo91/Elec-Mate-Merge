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
  { href: 'https://www.facebook.com/elecmate', label: 'Facebook' },
  { href: 'https://www.instagram.com/elec_mate', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@elecmate', label: 'TikTok' },
  { href: 'https://www.linkedin.com/company/elec-mate', label: 'LinkedIn' },
  { href: 'https://t.me/Elec_MateOfficialGroup', label: 'Telegram' },
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
                        <span className="text-xs font-bold">{social.label.charAt(0)}</span>
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
