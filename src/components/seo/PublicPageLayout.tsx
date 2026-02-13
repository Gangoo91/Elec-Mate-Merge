import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

const toolLinks = [
  { to: '/tools/eicr-certificate', label: 'EICR Certificate' },
  { to: '/tools/cable-sizing-calculator', label: 'Cable Sizing' },
  { to: '/tools/voltage-drop-calculator', label: 'Voltage Drop' },
  { to: '/tools/minor-works-certificate', label: 'Minor Works' },
  { to: '/tools/electrical-testing-calculators', label: 'Testing Calculators' },
  { to: '/tools/ai-electrician', label: 'AI Tools' },
  { to: '/tools/earth-loop-impedance-calculator', label: 'Earth Loop Impedance' },
  { to: '/tools/max-demand-calculator', label: 'Max Demand' },
  { to: '/tools/conduit-fill-calculator', label: 'Conduit Fill' },
  { to: '/tools/ev-charger-certificate', label: 'EV Charger Certificate' },
  { to: '/tools/rcd-testing-guide', label: 'RCD Testing Guide' },
  { to: '/tools/eic-certificate', label: 'EIC Certificate' },
  { to: '/tools/pat-testing', label: 'PAT Testing' },
];

const trainingLinks = [
  { to: '/training/18th-edition-course', label: '18th Edition Course' },
  { to: '/training/electrical-apprentice', label: 'Apprentice Training' },
  { to: '/training/am2-exam-preparation', label: 'AM2 Exam Preparation' },
  { to: '/training/inspection-and-testing', label: 'Inspection & Testing' },
];

const guideLinks = [
  { to: '/guides/bs7671-observation-codes', label: 'Observation Codes Guide' },
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
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-xl blur-md group-hover:bg-yellow-500/30 transition-all" />
              <img
                src="/logo.jpg"
                alt="Elec-Mate"
                className="relative w-9 h-9 rounded-xl"
              />
            </div>
            <span className="font-bold text-lg">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <Button
                asChild
                size="sm"
                className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="hidden sm:inline text-sm text-white px-4 py-2 transition-colors"
                >
                  Sign in
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="h-10 px-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl shadow-lg shadow-yellow-500/20"
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

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo.jpg" alt="Elec-Mate" className="w-7 h-7 rounded-lg" />
                <span className="font-bold text-white">
                  Elec-<span className="text-yellow-400">Mate</span>
                </span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                The complete platform for UK electricians. Training, AI tools, certificates, and business management.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Tools</h4>
              <ul className="space-y-2">
                {toolLinks.map((link) => (
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

            <div>
              <h4 className="font-semibold text-white mb-3">Training</h4>
              <ul className="space-y-2">
                {trainingLinks.map((link) => (
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
              <h4 className="font-semibold text-white mb-3 mt-6">Guides</h4>
              <ul className="space-y-2">
                {guideLinks.map((link) => (
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
              <h4 className="font-semibold text-white mb-3 mt-6">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-white hover:text-yellow-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-white hover:text-yellow-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-sm text-white">Elec-Mate &copy; {new Date().getFullYear()}</p>
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
