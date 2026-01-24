/**
 * CompleteProfile
 *
 * Safety net page for users who somehow have NULL role.
 * Allows them to complete their profile and continue.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Loader2,
  ArrowRight,
  GraduationCap,
  Zap,
  Check,
  AlertTriangle,
  UserCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CompleteProfile = () => {
  const { user, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleOptions = [
    { value: 'electrician', label: 'Electrician', icon: Zap, description: 'Qualified professional' },
    { value: 'apprentice', label: 'Apprentice', icon: GraduationCap, description: 'Learning the trade' },
  ];

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    if (!user?.id) {
      setError('Please sign in to continue');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          role: selectedRole,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        setError('Failed to save your profile. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Refresh the profile in AuthContext
      if (fetchProfile) {
        await fetchProfile();
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Complete profile error:', err);
      setError(err.message || 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col safe-top safe-bottom overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-elec-yellow/20 blur-[150px]"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full px-4 pt-6 pb-2 z-10"
      >
        <div className="flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30 transition-transform group-hover:scale-105">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </Link>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative flex-1 flex flex-col justify-center px-5 py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-elec-yellow/20 flex items-center justify-center">
              <UserCircle className="h-8 w-8 text-elec-yellow" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
              Complete Your Profile
            </h1>
            <p className="text-[15px] text-white/50">
              Just one more step to get started
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20"
            >
              <div className="flex gap-3 items-center">
                <AlertTriangle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                <p className="text-[14px] text-elec-yellow font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Role Selection */}
          <div className="space-y-3 mb-8">
            <label className="block text-[13px] font-medium text-white/70 ml-1 mb-3">
              What's your role?
            </label>
            {roleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedRole(option.value)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all touch-manipulation",
                  selectedRole === option.value
                    ? "border-elec-yellow bg-elec-yellow/10 shadow-[0_0_0_4px_rgba(255,209,0,0.1)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    selectedRole === option.value ? "bg-elec-yellow/20" : "bg-white/10"
                  )}>
                    <option.icon className={cn(
                      "h-6 w-6",
                      selectedRole === option.value ? "text-elec-yellow" : "text-white/50"
                    )} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-white text-[16px] block">{option.label}</span>
                    <span className="text-[13px] text-white/50">{option.description}</span>
                  </div>
                  {selectedRole === option.value && (
                    <Check className="h-5 w-5 text-elec-yellow" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedRole || isSubmitting}
            className={cn(
              "w-full h-14 rounded-2xl text-[16px] font-semibold",
              "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
              "shadow-lg shadow-elec-yellow/25 transition-all duration-200",
              "disabled:opacity-50"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative px-6 pb-6 z-10"
      >
        <div className="max-w-md mx-auto">
          <p className="text-center text-[12px] text-white/30">
            Your profile helps us personalise your experience
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default CompleteProfile;
