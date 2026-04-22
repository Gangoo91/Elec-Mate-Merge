/**
 * CollegeInviteAccept
 *
 * Polished inline component for accepting a college invite code.
 * Calls the `accept_college_invite` RPC and updates the user's profile.
 */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface CollegeInviteAcceptProps {
  onSuccess?: (collegeName: string, inviteType: string) => void;
}

export function CollegeInviteAccept({ onSuccess }: CollegeInviteAcceptProps) {
  const { fetchProfile, user } = useAuth();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    college_name?: string;
    invite_type?: string;
    role?: string;
    error?: string;
  } | null>(null);

  const handleSubmit = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed || trimmed.length < 4) {
      toast.error('Please enter a valid invite code');
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const { data, error } = await supabase.rpc('accept_college_invite', {
        p_invite_code: trimmed,
      });

      if (error) throw error;

      const response = data as {
        success?: boolean;
        error?: string;
        college_name?: string;
        invite_type?: string;
        role?: string;
      };

      if (response.error) {
        setResult({ error: response.error });
        toast.error(response.error);
      } else {
        setResult(response);
        toast.success(`Linked to ${response.college_name}`);

        if (fetchProfile && user?.id) {
          await fetchProfile(user.id);
        }

        onSuccess?.(response.college_name || '', response.invite_type || '');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to accept invite code';
      setResult({ error: msg });
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
          Invite Code
        </div>
        <h3 className="mt-1.5 text-[15px] font-semibold text-white">Have an invite code?</h3>
        <p className="text-[12.5px] text-white/55">
          Your college will have provided this to you
        </p>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="e.g. ABCD1234"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={12}
            disabled={isSubmitting}
            className="h-12 text-base font-mono tracking-[0.25em] text-center uppercase touch-manipulation bg-white/5 border-white/15 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 rounded-xl placeholder:tracking-normal placeholder:font-sans placeholder:text-white"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || code.trim().length < 4}
          className="h-12 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
        >
          {isSubmitting ? 'Linking…' : 'Join →'}
        </button>
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 ${
              result.success
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-red-500/10 border-red-500/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 mt-2 ${
                  result.success ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
              <div>
                <p
                  className={`text-sm font-medium ${result.success ? 'text-green-400' : 'text-red-400'}`}
                >
                  {result.success ? 'Successfully linked!' : 'Could not join'}
                </p>
                <p
                  className={`text-xs mt-0.5 ${result.success ? 'text-green-400' : 'text-red-400'}`}
                >
                  {result.success
                    ? `You are now a ${result.invite_type === 'staff' ? result.role || 'tutor' : 'student'} at ${result.college_name}`
                    : result.error}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
