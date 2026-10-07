/**
 * The one quiet card a learner without a college sees (ELE-1897).
 *
 * Honest about the single thing that does not work yet (nobody can PASS a
 * criterion without an assessor) and gives every way forward in place:
 * invite an assessor by link, get your employer to back up your work with a
 * witness statement, join your college with its code, export your record.
 * Everything else in the portfolio works the same with or without a college.
 *
 * Also exports JoinCollegeSheet, the college or cohort code box as a wide
 * sheet, for any page that needs "join your college" without a detour.
 */
import { useCallback, useEffect, useState } from 'react';
import { FolderDown, School, ShieldCheck, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { FormSheet } from '@/components/forms/FormSheet';
import { CollegeInviteAccept } from '@/components/college/CollegeInviteAccept';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { InviteAssessorSheet } from './InviteAssessorSheet';
import { P_CARD } from './ui';

export function JoinCollegeSheet({
  open,
  onOpenChange,
  onJoined,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onJoined?: () => void;
}) {
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Your college"
      title="Join your college"
      description="Your evidence, claims and hours come with you. Once you join, your tutor and assessor can see your portfolio and pass criteria."
    >
      <div className="grid gap-8 py-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
        <CollegeInviteAccept
          onSuccess={() => {
            invalidateMyCollegeContext();
            onJoined?.();
          }}
        />
        <div className="space-y-3 text-[13px] leading-relaxed text-white">
          <p className="text-[13.5px] font-semibold">Where do I get a code?</p>
          <p>
            Your tutor or the college office gives it out, usually at enrolment. It is 8 characters, or a link that
            fills it in for you.
          </p>
          <p>Your college is not on Elec-Mate yet? You do not need it to be. Invite an assessor instead and keep building your record.</p>
        </div>
      </div>
    </FormSheet>
  );
}

export function NoCollegeCard({
  onExport,
  onAskWitness,
  onChanged,
}: {
  onExport: () => void;
  /** Witness statements are per piece of evidence; the parent decides where to ask. */
  onAskWitness: () => void;
  /** After an invite or a join, so the portfolio reloads. */
  onChanged?: () => void;
}) {
  const { user } = useAuth();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [pending, setPending] = useState<{ name: string; count: number } | null>(null);

  const loadPending = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('portfolio_assessor_links' as never)
      .select('assessor_name, assessor_email, expires_at')
      .eq('learner_id', user.id)
      .eq('status', 'invited')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });
    const rows = (data ?? []) as unknown as { assessor_name: string | null; assessor_email: string }[];
    setPending(rows.length ? { name: rows[0].assessor_name || rows[0].assessor_email, count: rows.length } : null);
  }, [user]);

  useEffect(() => {
    void loadPending();
  }, [loadPending]);

  const actions = [
    {
      key: 'invite',
      icon: UserPlus,
      title: pending ? 'Invite another assessor' : 'Invite an assessor',
      body: 'Someone who assesses apprentices, from your training provider or independent. They get a free account and can pass criteria.',
      onClick: () => setInviteOpen(true),
      primary: !pending,
    },
    {
      key: 'witness',
      icon: ShieldCheck,
      title: 'Ask your employer to back you up',
      body: 'Your supervisor signs a witness statement for a piece of evidence. No account needed.',
      onClick: onAskWitness,
    },
    {
      key: 'join',
      icon: School,
      title: 'Join your college with a code',
      body: 'Got a college or cohort code from your tutor? Enter it and your record links up.',
      onClick: () => setJoinOpen(true),
    },
    {
      key: 'export',
      icon: FolderDown,
      title: 'Export my record',
      body: 'A PDF summary and every file in one ZIP, to take to any assessor or provider.',
      onClick: onExport,
    },
  ];

  return (
    <section className={P_CARD} aria-labelledby="no-college-title">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-8">
        <div className="min-w-0">
          <h2 id="no-college-title" className="text-[16px] font-semibold tracking-tight text-white">
            You are not linked to a college
          </h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
            Everything here still works: capture, claiming criteria, witness statements and your export. The one thing
            that needs someone else is passing a criterion. Only an assessor can do that, so nothing new can be passed
            until you have one.
          </p>
          {pending && (
            <p className="mt-3 rounded-xl border border-sky-400/40 bg-sky-500/[0.12] px-3 py-2 text-[13px] text-sky-200">
              Invite sent to {pending.name}
              {pending.count > 1 ? ` and ${pending.count - 1} more` : ''}. It counts once they accept.
            </p>
          )}
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {actions.map((a) => (
            <li key={a.key}>
              <button
                type="button"
                onClick={a.onClick}
                className={cn(
                  'flex h-full min-h-[64px] w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation',
                  a.primary
                    ? 'border-elec-yellow bg-elec-yellow text-black hover:opacity-90'
                    : 'border-white/[0.12] bg-white/[0.03] text-white hover:border-white/[0.3]'
                )}
              >
                <a.icon className={cn('mt-0.5 h-5 w-5 shrink-0', a.primary ? 'text-black' : 'text-elec-yellow')} />
                <span className="min-w-0">
                  <span className={cn('block text-[14px] font-semibold', a.primary ? 'text-black' : 'text-white')}>{a.title}</span>
                  <span className={cn('block text-[12.5px] leading-snug', a.primary ? 'text-black' : 'text-white')}>{a.body}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <InviteAssessorSheet
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onCreated={() => {
          void loadPending();
          onChanged?.();
        }}
        onAskWitness={onAskWitness}
      />
      <JoinCollegeSheet
        open={joinOpen}
        onOpenChange={setJoinOpen}
        onJoined={() => {
          setJoinOpen(false);
          onChanged?.();
        }}
      />
    </section>
  );
}

export default NoCollegeCard;
