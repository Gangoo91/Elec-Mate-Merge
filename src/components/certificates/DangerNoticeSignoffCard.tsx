import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

/**
 * Owner-side Danger Notice sign-off tracker (ELE-1288/1289).
 * Email the dutyholder a signing link, then watch the receipt trail:
 * sent → viewed (read receipt) → signed / refused / auto-refused after 12h.
 */

interface SignoffRow {
  id: string;
  share_token: string;
  recipient_email: string;
  recipient_name: string | null;
  sent_at: string;
  response_deadline: string;
  viewed_at: string | null;
  responded_at: string | null;
  status: 'sent' | 'viewed' | 'signed' | 'refused' | 'auto_refused';
  signer_name: string | null;
}

interface DangerNoticeSignoffCardProps {
  /** The text report reference (reports.report_id) of the saved notice */
  reportRef: string;
  defaultEmail?: string;
  defaultName?: string;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

// Deadline passed with no response = auto-refused, even before the DB
// persists it (that happens lazily on the next link open)
const effectiveStatus = (s: SignoffRow): SignoffRow['status'] => {
  if (['signed', 'refused', 'auto_refused'].includes(s.status)) return s.status;
  if (new Date(s.response_deadline).getTime() < Date.now()) return 'auto_refused';
  return s.status;
};

const STATUS_STYLE: Record<SignoffRow['status'], { label: string; cls: string }> = {
  sent: { label: 'Sent — not yet viewed', cls: 'bg-blue-500/15 text-blue-400' },
  viewed: { label: 'Viewed', cls: 'bg-amber-500/15 text-amber-400' },
  signed: { label: 'Signed', cls: 'bg-emerald-500/15 text-emerald-400' },
  refused: { label: 'Refused', cls: 'bg-red-500/15 text-red-400' },
  auto_refused: { label: 'Auto-refused (no response)', cls: 'bg-red-500/15 text-red-400' },
};

export const DangerNoticeSignoffCard = ({
  reportRef,
  defaultEmail,
  defaultName,
}: DangerNoticeSignoffCardProps) => {
  const [reportUuid, setReportUuid] = useState<string | null>(null);
  const [signoffs, setSignoffs] = useState<SignoffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(defaultEmail || '');
  const [name, setName] = useState(defaultName || '');
  const [sending, setSending] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data: report } = await supabase
      .from('reports')
      .select('id')
      .eq('report_id', reportRef)
      .maybeSingle();
    if (!report) {
      setLoading(false);
      return;
    }
    setReportUuid(report.id);
    const { data } = await supabase
      .from('danger_notice_signoffs')
      .select('*')
      .eq('report_id', report.id)
      .order('sent_at', { ascending: false });
    setSignoffs((data as SignoffRow[]) || []);
    setLoading(false);
  }, [reportRef]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSend = async () => {
    if (!reportUuid) return;
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error('Enter a valid email address');
      return;
    }
    setSending(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not signed in');

      const { data: row, error } = await supabase
        .from('danger_notice_signoffs')
        .insert({
          report_id: reportUuid,
          user_id: user.id,
          recipient_email: trimmed,
          recipient_name: name.trim() || null,
        })
        .select()
        .single();
      if (error) throw error;

      // Rides the existing certificate mailer (edge function slots are scarce)
      const { error: fnError } = await supabase.functions.invoke('send-certificate-resend', {
        body: { dangerSignoffId: row.id },
      });
      if (fnError) {
        // Sending failed — remove the orphaned signoff row so the tracker
        // doesn't show a "sent" link that never went anywhere
        await supabase.from('danger_notice_signoffs').delete().eq('id', row.id);
        const ctx = (fnError as { context?: Response }).context;
        if (ctx?.status === 422) {
          toast.error('Generate the notice PDF first', {
            description: 'Save the notice so the PDF exists — the signing page shows it to the dutyholder.',
          });
          return;
        }
        throw fnError;
      }

      toast.success(`Signing link sent to ${trimmed}`, {
        description: 'They have 12 hours to respond before it auto-refuses.',
      });
      setShowForm(false);
      await load();
    } catch (err) {
      console.error('[DangerNoticeSignoff] send failed', err);
      toast.error('Could not send the signing link — try again');
    } finally {
      setSending(false);
    }
  };

  const copyLink = (token: string) => {
    navigator.clipboard
      .writeText(`https://www.elec-mate.com/danger-notice/sign/${token}`)
      .then(() => toast.success('Signing link copied'))
      .catch(() => toast.error('Could not copy link'));
  };

  if (loading) return null;
  if (!reportUuid) return null;

  return (
    <div className="card-surface rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-bold text-white">Dutyholder sign-off</h3>
          <p className="text-[11px] text-white/55 mt-0.5">
            Email a signing link — viewed and signed times are recorded as evidence
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98] shrink-0"
          >
            {signoffs.length > 0 ? 'Send again' : 'Send for signature'}
          </button>
        )}
      </div>

      <div className="p-4 space-y-3">
        {showForm && (
          <div className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Dutyholder email"
                className="h-11 text-base bg-input border-white/[0.08] rounded-xl touch-manipulation text-white placeholder:text-muted-foreground focus:border-elec-yellow/50 focus:ring-0"
              />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Their name (optional)"
                className="h-11 text-base bg-input border-white/[0.08] rounded-xl touch-manipulation text-white placeholder:text-muted-foreground focus:border-elec-yellow/50 focus:ring-0"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(false)}
                disabled={sending}
                className="h-11 px-4 rounded-xl border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Email signing link'}
              </button>
            </div>
            <p className="text-[11px] text-white/50">
              If they don't respond within 12 hours, the notice is recorded as refused
              automatically.
            </p>
          </div>
        )}

        {signoffs.length === 0 && !showForm ? (
          <p className="text-[12.5px] text-white/55">
            No signing link sent yet — the dutyholder can sign or refuse remotely, with every step
            timestamped.
          </p>
        ) : (
          signoffs.map((s) => {
            const status = effectiveStatus(s);
            const style = STATUS_STYLE[status];
            return (
              <div
                key={s.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13px] font-medium text-white truncate">
                    {s.recipient_name ? `${s.recipient_name} · ` : ''}
                    {s.recipient_email}
                  </p>
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded shrink-0',
                      style.cls
                    )}
                  >
                    {style.label}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/55 tabular-nums">
                  <span>Sent {fmt(s.sent_at)}</span>
                  {s.viewed_at && <span>· Viewed {fmt(s.viewed_at)}</span>}
                  {s.responded_at && status === 'signed' && (
                    <span>
                      · Signed{s.signer_name ? ` by ${s.signer_name}` : ''} {fmt(s.responded_at)}
                    </span>
                  )}
                  {s.responded_at && status === 'refused' && (
                    <span>· Refused {fmt(s.responded_at)}</span>
                  )}
                  {status !== 'signed' && status !== 'refused' && status !== 'auto_refused' && (
                    <span>· Deadline {fmt(s.response_deadline)}</span>
                  )}
                  <button
                    onClick={() => copyLink(s.share_token)}
                    className="inline-flex items-center gap-1 text-elec-yellow touch-manipulation"
                  >
                    <Copy className="h-3 w-3" />
                    Copy link
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
