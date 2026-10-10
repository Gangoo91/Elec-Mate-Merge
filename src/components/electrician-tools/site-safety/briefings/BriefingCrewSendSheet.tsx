/**
 * Send a firm toolbox talk to the crew (ELE-1944).
 *
 * One tap pushes the talk to everyone it is for who is on the app (named
 * attendees and the job's crew); they read and sign it in Worker Tools →
 * Sign-offs. Anyone not on the app is listed with what the firm has for them:
 * email the signing link from here, or text it from this phone.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { openExternalUrl } from '@/utils/open-external-url';
import { copyToClipboard } from '@/utils/clipboard';
import { getBriefingSigningUrl, smsHref } from './briefingSigningLink';

interface Person {
  employee_id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
}

interface SendResult {
  notified: Person[];
  off_app: Person[];
  already_signed: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefingId: string;
  briefingName: string;
  /** Called after a send, so the screen can refresh its register. */
  onSent?: () => void;
}

const btn =
  'inline-flex h-11 items-center justify-center rounded-full px-5 text-[14px] font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-50';
const primary = `${btn} bg-elec-yellow text-black`;
const secondary = `${btn} border border-white/[0.14] bg-white/[0.06] text-white`;

export function BriefingCrewSendSheet({
  open,
  onOpenChange,
  briefingId,
  briefingName,
  onSent,
}: Props) {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [emailing, setEmailing] = useState(false);
  const [emailed, setEmailed] = useState<Set<string>>(new Set());

  const send = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.rpc(
        'send_team_briefing_to_crew' as never,
        { p_briefing_id: briefingId } as never
      );
      if (error) throw error;
      const r = (data ?? {}) as Partial<SendResult>;
      setResult({
        notified: r.notified ?? [],
        off_app: r.off_app ?? [],
        already_signed: r.already_signed ?? 0,
      });
      onSent?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not send it. Try again.');
    } finally {
      setSending(false);
    }
  };

  const linkText = (url: string) =>
    `Please read and sign this toolbox talk: ${briefingName}\n\n${url}`;

  const emailAll = async () => {
    const people = (result?.off_app ?? []).filter((p) => p.email && !emailed.has(p.employee_id));
    if (people.length === 0) return;
    setEmailing(true);
    try {
      const url = await getBriefingSigningUrl(briefingId);
      const done = new Set(emailed);
      let failed = 0;
      for (const p of people) {
        const { error } = await supabase.functions.invoke('send-briefing-signing-link', {
          body: { briefingId, recipientEmail: p.email, signingUrl: url },
        });
        if (error) failed += 1;
        else done.add(p.employee_id);
      }
      setEmailed(done);
      if (failed) toast.error(`${failed} email${failed === 1 ? '' : 's'} did not send. Try again.`);
      else toast.success(`Signing link emailed to ${people.length}.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not email the link.');
    } finally {
      setEmailing(false);
    }
  };

  const textOne = async (p: Person) => {
    if (!p.phone) return;
    try {
      const url = await getBriefingSigningUrl(briefingId);
      await openExternalUrl(smsHref(p.phone, linkText(url)));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not make the link.');
    }
  };

  const copyLink = async () => {
    try {
      const url = await getBriefingSigningUrl(briefingId);
      const ok = await copyToClipboard(url);
      if (ok) toast.success('Signing link copied.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not make the link.');
    }
  };

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) {
      setResult(null);
      setEmailed(new Set());
    }
  };

  const toEmail = (result?.off_app ?? []).filter((p) => p.email && !emailed.has(p.employee_id));

  return (
    <FormSheet
      open={open}
      onOpenChange={close}
      eyebrow="Toolbox talk"
      title={result ? 'Sent to the crew' : 'Send to the crew'}
      description={briefingName}
      width="wide"
      footer={
        result ? (
          <button type="button" className={`${primary} w-full`} onClick={() => close(false)}>
            Done
          </button>
        ) : (
          <button type="button" className={`${primary} w-full`} disabled={sending} onClick={send}>
            {sending ? 'Sending…' : 'Send now'}
          </button>
        )
      }
    >
      {!result ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">In the app</h3>
            <p className="text-[14px] leading-relaxed text-white">
              Everyone named on the register, and everyone booked on the job, gets a notification on
              their phone. They read the talk and sign it in Worker Tools. You are told as each
              person signs.
            </p>
          </section>
          <section className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">Not on the app</h3>
            <p className="text-[14px] leading-relaxed text-white">
              Anyone not on the app yet is listed once it is sent, with their email and phone, so
              you can email or text them the signing link.
            </p>
          </section>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">In the app</h3>
            {result.notified.length === 0 ? (
              <p className="text-[13.5px] text-white">
                Nobody on the app still needs to sign this.
                {result.already_signed > 0 ? ` ${result.already_signed} signed already.` : ''}
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {result.notified.map((p) => (
                  <li key={p.employee_id} className="flex items-center justify-between py-3">
                    <span className="text-[15px] text-white">{p.name}</span>
                    <span className="text-[13px] text-white">Notified</span>
                  </li>
                ))}
              </ul>
            )}
            {result.notified.length > 0 && result.already_signed > 0 && (
              <p className="text-[13px] text-white">{result.already_signed} signed already.</p>
            )}
          </section>

          <section className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">Not on the app</h3>
            {result.off_app.length === 0 ? (
              <p className="text-[13.5px] text-white">Everyone it is for is on the app.</p>
            ) : (
              <>
                <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {result.off_app.map((p) => (
                    <li key={p.employee_id} className="flex items-center gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] text-white">{p.name}</p>
                        <p className="truncate text-[12.5px] text-white">
                          {emailed.has(p.employee_id)
                            ? 'Link emailed'
                            : p.email || p.phone || 'No email or phone on their record'}
                        </p>
                      </div>
                      {p.phone && (
                        <button type="button" className={secondary} onClick={() => textOne(p)}>
                          Text
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {toEmail.length > 0 && (
                    <button
                      type="button"
                      className={primary}
                      disabled={emailing}
                      onClick={emailAll}
                    >
                      {emailing
                        ? 'Emailing…'
                        : `Email the link to ${toEmail.length === 1 ? toEmail[0].name : `${toEmail.length} people`}`}
                    </button>
                  )}
                  <button type="button" className={secondary} onClick={copyLink}>
                    Copy the link
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </FormSheet>
  );
}

export default BriefingCrewSendSheet;
