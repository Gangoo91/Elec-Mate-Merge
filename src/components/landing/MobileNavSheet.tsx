import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, GraduationCap, Wrench, Building2, BookOpen, Bot, FileCheck, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MobileNavSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Apprentice Hub', icon: GraduationCap, href: '/apprentice', color: 'text-blue-400' },
  { name: 'Electrician Hub', icon: Wrench, href: '/electrician', color: 'text-yellow-400' },
  { name: 'Employer Hub', icon: Building2, href: '/employer', color: 'text-purple-400' },
  { name: 'Study Centre', icon: BookOpen, href: '/study-centre', color: 'text-green-400' },
  { name: 'AI Agents', icon: Bot, href: '/ai-agents', color: 'text-indigo-400' },
  { name: 'Inspection Suite', icon: FileCheck, href: '/inspection-app', color: 'text-emerald-400' },
  { name: 'Elec-ID', icon: CreditCard, href: '/elec-id', color: 'text-amber-400' },
];

export const MobileNavSheet = ({ isOpen, onClose }: MobileNavSheetProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[85vw] max-w-[320px] bg-neutral-900 border-l border-white/10 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <span className="text-lg font-bold text-white">Elec-Mate</span>
              </Link>
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 active:bg-white/30 touch-manipulation"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
              <div className="px-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors touch-manipulation"
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="text-white font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer actions */}
            <div className="p-4 border-t border-white/10 space-y-3">
              <Link to="/auth/signup" onClick={onClose} className="block">
                <Button
                  size="lg"
                  className="w-full h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/auth/signin" onClick={onClose} className="block">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 border-white/20 text-white hover:bg-white/10 active:bg-white/20 font-semibold touch-manipulation"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Safe area padding */}
            <div className="h-[env(safe-area-inset-bottom)]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
