import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

/* ==========================================================================
   JoinTeamCard — worker-side entry to redeem an employer invite code.

   Mirrors the College Hub onboarding (JoinCollegeCard / accept_college_invite):
   the employer mints a team code, the worker enters it here, and
   accept_employer_invite links their pre-added roster row (by email) or
   creates one. Shown in Worker Tools only when the user has no team link.
   ========================================================================== */

interface Props {
  onJoined?: () => void;
}

export function JoinTeamCard({ onJoined }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);

  const handleJoin = async () => {
    const trimmed = code.trim();
    if (trimmed.length < 4) {
      toast({
        title: 'Enter your invite code',
        description: 'Ask your employer for the team invite code.',
        variant: 'destructive',
      });
      return;
    }

    setJoining(true);
    try {
      const { data, error } = await supabase.rpc('accept_employer_invite', {
        p_invite_code: trimmed,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = data as any;
      if (error || result?.error) {
        throw new Error(result?.error || error?.message || 'Could not join');
      }

      queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
      queryClient.invalidateQueries({ queryKey: ['qs-team-context'] });
      toast({
        title: result?.already_member ? 'Already on this team' : 'Welcome to the team',
        description: `You're linked to ${result?.company_name || 'your company'} — your jobs, clock-in and timesheets are live.`,
      });
      setCode('');
      onJoined?.();
    } catch (err) {
      toast({
        title: 'Could not join',
        description: err instanceof Error ? err.message : 'Check the code and try again.',
        variant: 'destructive',
      });
    } finally {
      setJoining(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
    >
      <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_11%)] p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 grid place-items-center shrink-0">
            <Users className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-white">Join your company's team</h2>
            <p className="text-[12.5px] text-white/60 mt-0.5 leading-relaxed">
              Enter the invite code from your employer to link up. You'll see your assigned jobs,
              clock in and out on site, and submit timesheets, leave and expenses.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Invite code"
            autoCapitalize="characters"
            autoCorrect="off"
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 uppercase tracking-widest"
          />
          <Button
            onClick={handleJoin}
            disabled={joining}
            className="h-11 px-5 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium shrink-0"
          >
            {joining ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default JoinTeamCard;
