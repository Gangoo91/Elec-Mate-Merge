import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Copy, Share2, RotateCw, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';

/* ==========================================================================
   TeamInviteSheet — the employer's standing team invite code.

   Same onboarding pattern as the College Hub: mint a short code, share it
   anywhere (WhatsApp group, text, printed on the van). Workers redeem it in
   Worker Tools and link to the roster instantly — pre-added members link to
   their existing row by email; new ones get a roster row created.
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
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Load (or mint) the standing active code when the sheet opens
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data: existing } = await supabase
          .from('employer_invites')
          .select('invite_code')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (cancelled) return;
        if (existing?.invite_code) {
          setCode(existing.invite_code);
          return;
        }

        const newCode = generateCode();
        const { error } = await supabase.from('employer_invites').insert({
          invite_code: newCode,
          role_to_assign: 'Operative',
        });
        if (error) throw error;
        if (!cancelled) setCode(newCode);
      } catch (err) {
        console.error('Invite code load failed:', err);
        toast({ title: 'Could not load invite code', variant: 'destructive' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shareText = `Join ${companyName || 'our team'} on Elec-Mate:\n1. Sign in (or create an account) at https://elec-mate.com\n2. Open Electrician → Worker Tools\n3. Enter team code: ${code}\nYou'll see your jobs, clock in on site, and submit timesheets from your phone.`;

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
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    await copyToClipboard(shareText);
    toast({ title: 'Invite message copied', description: 'Paste it into WhatsApp or a text.' });
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      // Deactivate old codes, mint a fresh one
      await supabase.from('employer_invites').update({ is_active: false }).eq('is_active', true);
      const newCode = generateCode();
      const { error } = await supabase.from('employer_invites').insert({
        invite_code: newCode,
        role_to_assign: 'Operative',
      });
      if (error) throw error;
      setCode(newCode);
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
      <SheetContent side="bottom" className="p-0 rounded-t-2xl overflow-hidden">
        <div className="bg-background px-4 pt-4 pb-8 space-y-5">
          <SheetHeader>
            <SheetTitle className="text-left text-base">Invite your team</SheetTitle>
          </SheetHeader>

          <p className="text-sm text-white/60">
            Share this code with your team — WhatsApp group, text, however you like. They enter it
            in Worker Tools and they're linked: assigned jobs, clock-in, timesheets and expenses,
            all from their phone.
          </p>
          <p className="text-[12px] text-white/45">
            Each linked team member adds a seat to your subscription at £9.99/month — their access
            is covered, they don't pay anything.
          </p>

          <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/10 px-4 py-5 text-center">
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow mx-auto" />
            ) : (
              <span className="text-3xl font-bold tracking-[0.3em] text-elec-yellow tabular-nums">
                {code || '—'}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleShare}
              disabled={!code}
              className="h-11 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share invite
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCopyCode}
                disabled={!code}
                className="h-11 touch-manipulation"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy code
              </Button>
              <Button
                variant="outline"
                onClick={handleRegenerate}
                disabled={regenerating}
                className="h-11 touch-manipulation"
              >
                {regenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RotateCw className="h-4 w-4 mr-2" />
                )}
                New code
              </Button>
            </div>
          </div>

          <p className="text-xs text-white/40">
            Anyone with the code can join your team, so treat it like a key — issue a new one any
            time and the old code stops working. Team members you add by email link automatically
            when they sign in, with or without the code.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TeamInviteSheet;
