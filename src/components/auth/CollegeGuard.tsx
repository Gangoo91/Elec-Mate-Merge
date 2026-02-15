import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { School, ArrowLeft, Shield, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CollegeInviteAccept } from '@/components/college/CollegeInviteAccept';
import { motion } from 'framer-motion';

interface CollegeGuardProps {
  children: ReactNode;
}

/**
 * Route guard that only allows users with a college_id on their profile.
 * Shows a polished onboarding screen with invite code entry for non-college users.
 */
export default function CollegeGuard({ children }: CollegeGuardProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile?.college_id) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex flex-col items-center justify-center p-4">
        {/* Decorative background glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative max-w-md w-full space-y-6"
        >
          {/* Hero card */}
          <div className="bg-gradient-to-b from-white/[0.07] to-white/[0.03] rounded-3xl border border-white/10 overflow-hidden">
            {/* Top accent band */}
            <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />

            <div className="p-8 pb-6 text-center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/20 flex items-center justify-center mx-auto mb-5"
              >
                <School className="h-8 w-8 text-yellow-400" />
              </motion.div>

              <h1 className="text-2xl font-bold text-white mb-2">College Hub</h1>
              <p className="text-sm text-white leading-relaxed max-w-xs mx-auto">
                Manage apprentices, track portfolios, and oversee qualifications — all in one place.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex justify-center gap-2 px-6 pb-6">
              {[
                { icon: Users, label: 'Students' },
                { icon: BookOpen, label: 'Portfolios' },
                { icon: Shield, label: 'IQA' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                >
                  <Icon className="h-3.5 w-3.5 text-yellow-400" />
                  <span className="text-xs text-white font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Invite code card */}
          <div className="bg-gradient-to-b from-white/[0.07] to-white/[0.03] rounded-3xl border border-white/10 p-6">
            <CollegeInviteAccept
              onSuccess={() => {
                // Profile will refresh via fetchProfile in the invite component,
                // so college_id will be set and guard will pass on next render
              }}
            />
          </div>

          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="h-11 w-full text-white hover:bg-white/5 touch-manipulation rounded-2xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
