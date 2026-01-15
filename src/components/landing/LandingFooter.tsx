import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Study Centre', href: '/study-centre' },
    { name: 'Inspection Suite', href: '/inspection-app' },
    { name: 'AI Agents', href: '/ai-agents' },
    { name: 'Elec-ID', href: '/elec-id' },
  ],
  Resources: [
    { name: 'BS7671 Guide', href: '/resources/bs7671' },
    { name: 'Cable Calculator', href: '/tools/cable-calculator' },
    { name: 'Help Centre', href: '/help' },
    { name: 'Blog', href: '/blog' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press', href: '/press' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
};

export const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">Elec-Mate</span>
            </Link>
            <p className="text-sm text-white/60 mb-4">
              The complete platform for UK electrical professionals.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@elec-mate.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white active:text-white transition-colors touch-manipulation"
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
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              &copy; {currentYear} Elec-Mate. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>BS 7671 Compliant</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>UK Electricians</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
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
