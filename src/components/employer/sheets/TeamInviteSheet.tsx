import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Copy, Share2, RotateCw, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { PrimaryButton, SecondaryButton, SheetShell } from '@/components/employer/editorial';

/* ==========================================================================
   TeamInviteSheet — the employer's standing team invite code.

   Mint a short code, share it anywhere (WhatsApp group, text). Workers redeem
   it in Worker Tools and link to the roster row the employer ALREADY added for
   them (matched on their confirmed email). The code never creates a member —
   accept_employer_invite is link-only (ELE-1272) — so the copy below says so.

   Reached from Team → Invited → "Team code" (ELE-1951; it was imported
   nowhere). Every read/write is scoped to the firm being acted for, so a
   manager of two firms can't retire the other firm's code.
   ========================================================================== */

const generateCode = (len = 8): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I ambiguity
  return Array.from(crypto.getRandomValues(new Uint32Array(len)))
    .map((n) => chars[n % chars.length])
    .join('');
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyName?: string;
}

export function TeamInviteSheet({ open, onOpenChange, companyName }: Props) {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const firmId = async (): Promise<string | null> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    return (await getActingEmployerId(user.id)) ?? user.id;
  };

  const mint = async (firm: string): Promise<string> => {
    const newCode = generateCode();
    const { error } = await supabase.from('employer_invites').insert({
      employer_id: firm,
      invite_code: newCode,
      role_to_assign: 'Operative',
    } as never);
    if (error) throw error;
    return newCode;
  };

  // Load (or mint) the standing active code when the sheet opens
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const firm = await firmId();
        if (!firm) return;

        const { data: existing } = await supabase
          .from('employer_invites')
          .select('invite_code')
          .eq('employer_id', firm)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (cancelled) return;
        if (existing?.invite_code) {
          setCode(existing.invite_code);
          return;
        }
        const newCode = await mint(firm);
        if (!cancelled) setCode(newCode);
      } catch (err) {
        console.error('Invite code load failed:', err);
        toast({ title: 'Could not load the team code', variant: 'destructive' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shareText = `Join ${companyName || 'our team'} on Elec-Mate:\n1. Create your account (or sign in) at https://elec-mate.com with the email address we have for you\n2. Open Electrician → Worker Tools\n3. Enter team code: ${code}\nYou'll see your jobs, clock in on site, and submit timesheets from your phone.`;

  const handleCopyCode = async () => {
    if (!code) return;
    await copyToClipboard(code);
    toast({ title: 'Code copied' });
  };

  const handleShare = async () => {
    if (!code) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Join our team on Elec-Mate', text: shareText });
        return;
      } catch (err) {
        // Cancelling is a decision; anything else means the share never
        // happened, so fall through rather than leave the button dead.
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    await copyToClipboard(shareText);
    toast({ title: 'Invite message copied', description: 'Paste it into WhatsApp or a text.' });
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const firm = await firmId();
      if (!firm) throw new Error('Not signed in');
      // Retire this firm's old codes, mint a fresh one
      await supabase
        .from('employer_invites')
        .update({ is_active: false })
        .eq('employer_id', firm)
        .eq('is_active', true);
      setCode(await mint(firm));
      toast({ title: 'New code issued', description: 'The old code no longer works.' });
    } catch (err) {
      console.error('Regenerate failed:', err);
      toast({ title: 'Could not issue a new code', variant: 'destructive' });
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={
          isMobile
            ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden border-t border-white/[0.06]'
            : 'w-full sm:max-w-md p-0 border-l border-white/[0.06]'
        }
      >
        <SheetShell
          eyebrow="Team"
          title="Team code"
          description="For people who lost the invite email. Share it in your WhatsApp group or by text."
        >
          <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-6 text-center">
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow mx-auto" />
            ) : (
              <span className="text-3xl font-bold tracking-[0.3em] text-elec-yellow tabular-nums">
                {code || '—'}
              </span>
            )}
          </div>

          <PrimaryButton fullWidth onClick={handleShare} disabled={!code}>
            <Share2 className="h-4 w-4 mr-2" />
            Share invite message
          </PrimaryButton>
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton fullWidth onClick={handleCopyCode} disabled={!code}>
              <Copy className="h-4 w-4 mr-2" />
              Copy code
            </SecondaryButton>
            <SecondaryButton fullWidth onClick={handleRegenerate} disabled={regenerating}>
              {regenerating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RotateCw className="h-4 w-4 mr-2" />
              )}
              New code
            </SecondaryButton>
          </div>

          <p className="text-[13px] text-white">
            The code only links people you have already added by email. A stranger with the code
            can&apos;t join. They sign in with that email, enter the code in Worker Tools and
            they&apos;re linked: jobs, clock-in, timesheets and expenses from their phone.
          </p>
          <p className="text-[13px] text-white">
            Issue a new code any time and the old one stops working.
          </p>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

export default TeamInviteSheet;
