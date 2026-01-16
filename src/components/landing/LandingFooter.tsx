import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Study Centre', href: '/study-centre' },
    { name: 'Electrician Hub', href: '/electrician' },
    { name: 'AI Agents', href: '/electrician' },
    { name: 'Elec-ID', href: '/elec-id' },
  ],
  Resources: [
    { name: 'BS7671 Guide', href: '/study-centre' },
    { name: 'Calculators', href: '/electrician' },
    { name: 'Help Centre', href: '/dashboard' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Top section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src="/logo.jpg" alt="Elec-Mate" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-white/40 mb-4 max-w-[200px]">
              The complete platform for UK electrical professionals.
            </p>
            <div className="space-y-1.5 text-xs text-white/30">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>info@elec-mate.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-sm mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm text-white/40 hover:text-white/70 active:text-white transition-colors touch-manipulation"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.04] pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/30">
              &copy; {currentYear} Elec-Mate. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span>BS 7671 Compliant</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Made in UK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safe area padding for mobile */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </footer>
  );
};
