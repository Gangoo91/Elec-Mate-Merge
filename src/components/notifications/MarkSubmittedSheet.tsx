import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import type { Notification, SubmissionRoute } from '@/hooks/useNotifications';

/**
 * "Mark as submitted" — one small sheet instead of a blind tap.
 *
 * It asks the only two things the certificate needs to print correctly: how
 * Building Control was told (scheme or direct) and the reference, if there is
 * one. The answer is written to the tracker row AND the certificate.
 */

interface Props {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The scheme(s) the electrician is registered with, from their company profile. */
  schemes: Array<'napit' | 'niceic'>;
  /** A non-NAPIT/NICEIC scheme name (e.g. Stroma), when registered elsewhere. */
  otherSchemeName?: string | null;
  /** The client's email from the certificate — offers the one-line "notified" email. */
  clientEmail?: string | null;
  onConfirm: (route: SubmissionRoute, opts: { emailClient: boolean }) => Promise<void>;
}

type Via = SubmissionRoute['via'];

const chipCn =
  'flex h-11 items-center justify-center rounded-xl border text-sm transition-all touch-manipulation active:scale-[0.98]';
const chipOn = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const chipOff = 'border-white/[0.12] bg-white/[0.06] font-medium text-white';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

export const MarkSubmittedSheet = ({
  notification,
  open,
  onOpenChange,
  schemes,
  otherSchemeName,
  clientEmail,
  onConfirm,
}: Props) => {
  const haptic = useHaptic();
  const [via, setVia] = useState<Via>('direct');
  const [reference, setReference] = useState('');
  const [emailClient, setEmailClient] = useState(true);
  const [saving, setSaving] = useState(false);

  // Preselect the route the electrician almost certainly used.
  useEffect(() => {
    if (!open) return;
    setReference(notification?.scheme_certificate_ref || '');
    // Default on the first time; off (but offered) if the client has already been told.
    setEmailClient(!!clientEmail && !notification?.client_notified_at);
    if (schemes.length === 1) setVia(schemes[0]);
    else if (schemes.length > 1) setVia(schemes[0]);
    else if (otherSchemeName) setVia('scheme');
    else setVia('direct');
  }, [open, notification?.id, notification?.scheme_certificate_ref, notification?.client_notified_at, schemes, otherSchemeName, clientEmail]);

  const options: Array<{ via: Via; label: string }> = [
    ...schemes.map((s) => ({ via: s, label: s === 'napit' ? 'NAPIT' : 'NICEIC' })),
    ...(otherSchemeName
      ? [{ via: 'scheme' as Via, label: otherSchemeName.charAt(0).toUpperCase() + otherSchemeName.slice(1) }]
      : []),
    ...(schemes.length === 0 && !otherSchemeName
      ? [{ via: 'scheme' as Via, label: 'Competent person scheme' }]
      : []),
    { via: 'direct', label: 'Building Control directly' },
  ];

  const certNo = notification?.reports?.certificate_number || 'the certificate';
  const isScheme = via !== 'direct';

  const confirm = async () => {
    if (!notification) return;
    setSaving(true);
    try {
      await onConfirm({ via, reference: reference.trim() || undefined } as SubmissionRoute, {
        emailClient: !!clientEmail && emailClient,
      });
      haptic.success();
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !saving && onOpenChange(o)}>
      <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl p-0 overflow-hidden">
        <div className="flex flex-col bg-background">
          <SheetHeader className="border-b border-white/[0.08] px-5 pb-4 pt-5">
            <SheetTitle className="text-left text-base font-semibold text-white">
              Mark as submitted
            </SheetTitle>
            <p className="text-left text-[12.5px] leading-snug text-white">
              This is recorded on {certNo} as well, so the certificate and the tracker say the same
              thing.
            </p>
          </SheetHeader>

          <div className="space-y-5 px-5 py-5">
            <div>
              <Label className="mb-1.5 block text-[12px] font-medium text-white">Notified through</Label>
              <div className={cn('grid gap-2', options.length > 2 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2')}>
                {options.map((o) => (
                  <button
                    key={o.via}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setVia(o.via);
                    }}
                    className={cn(chipCn, via === o.via ? chipOn : chipOff)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="part-p-reference" className="mb-1 block text-[12px] font-medium text-white">
                {isScheme ? 'Scheme notification reference' : 'Building Control reference'} (optional)
              </Label>
              <Input
                id="part-p-reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder={isScheme ? 'The number the portal gave you' : 'Notice or application number'}
                className={inputCn}
                autoComplete="off"
              />
              <p className="mt-1.5 text-[12px] leading-snug text-white">
                Prints on the certificate. You can add it later if you don't have it to hand.
              </p>
            </div>

            {clientEmail && (
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  setEmailClient((v) => !v);
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 text-left touch-manipulation active:scale-[0.99]"
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[13px] font-bold',
                    emailClient ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.2] text-transparent'
                  )}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-white">
                    {notification?.client_notified_at ? 'Email the client again' : "Email the client to say it's done"}
                  </span>
                  <span className="block truncate text-[12px] text-white">
                    One line to {clientEmail}: notified, the route, the reference, and that the compliance
                    certificate comes by post.
                  </span>
                </span>
              </button>
            )}

            <div className="space-y-2 pb-[env(safe-area-inset-bottom)]">
              <button
                type="button"
                onClick={confirm}
                disabled={saving}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 active:scale-[0.99] disabled:opacity-60 touch-manipulation"
              >
                {saving ? 'Saving…' : 'Confirm submitted'}
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={saving}
                className="flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white touch-manipulation active:scale-[0.99]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MarkSubmittedSheet;
