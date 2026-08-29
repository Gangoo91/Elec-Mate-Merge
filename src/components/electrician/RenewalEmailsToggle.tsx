/**
 * "Email my customers their renewals" — the switch behind the renewal cron.
 *
 * Off for everyone until flipped; the daily job sends nothing for users
 * without an `auto` row. The copy says exactly what turning it on does,
 * because this is the one place the app emails a customer without the
 * electrician pressing send each time — nobody should discover that later.
 *
 * Extracted from CertificateExpiryPage when that page merged into
 * Renewals & Contracts (ELE-430).
 */
import { Switch } from '@/components/ui/switch';
import { useAutomation, AUTOMATION_KEYS } from '@/hooks/useUserAutomations';
import { cn } from '@/lib/utils';

export function RenewalEmailsToggle() {
  const { mode, isLoading, setMode, saving } = useAutomation(
    AUTOMATION_KEYS.clientRenewalEmails
  );
  const on = mode === 'auto';

  // Once it's on, the pitch has done its job — a page shouldn't open on a
  // paragraph of settings copy. Collapse to a one-line confirmation; the
  // full card only shows while there's still a decision to sell.
  if (on) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-elec-yellow/40 bg-elec-yellow/[0.06] px-4 py-2.5">
        <p className="min-w-0 truncate text-[12.5px] text-white">
          <span className="font-semibold">Renewal reminders on</span> — customers get a
          book-me-in email at 30, 14 and 7 days.
        </p>
        <Switch
          checked
          disabled={isLoading || saving}
          onCheckedChange={(v) => setMode(v ? 'auto' : 'off')}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 transition-colors sm:p-5',
        'bg-gradient-to-b from-white/[0.07] to-white/[0.03]',
        on ? 'border-elec-yellow/50' : 'border-white/[0.12]'
      )}
    >
      <label className="flex cursor-pointer items-center justify-between gap-4">
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-white">
            Email customers their renewal reminders
          </span>
          <span className="mt-1 block text-[12.5px] leading-snug text-white">
            When a certificate comes due, the customer gets a reminder in your name at 30, 14 and
            7 days — with a button to book you for the renewal. Sent automatically each morning;
            replies come to you.
          </span>
        </span>
        <Switch
          checked={on}
          disabled={isLoading || saving}
          onCheckedChange={(v) => setMode(v ? 'auto' : 'off')}
        />
      </label>
    </div>
  );
}
