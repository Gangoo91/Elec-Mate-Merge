/**
 * Settings search — type what you're after, jump straight to it.
 *
 * A static registry beats indexing the DOM: every entry knows its tab (and
 * business sheet where applicable), so selecting a result deep-links via the
 * same ?tab=&sheet= mechanics SettingsReadiness already uses.
 */
import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchEntry {
  label: string;
  hint: string;
  tab: string;
  sheet?: string;
  keywords: string;
}

const REGISTRY: SearchEntry[] = [
  // Account
  { label: 'Profile & name', hint: 'Account', tab: 'account', keywords: 'name job title photo avatar profile' },
  { label: 'Change password', hint: 'Account · Security', tab: 'account', keywords: 'password security login' },
  { label: 'Two-factor authentication', hint: 'Account · Security', tab: 'account', keywords: '2fa mfa totp authenticator security code' },
  { label: 'Sign out all devices', hint: 'Account · Security', tab: 'account', keywords: 'logout sessions devices security' },
  { label: 'Biometric login', hint: 'Account · Security', tab: 'account', keywords: 'face id touch fingerprint biometric' },
  // Elec-ID
  { label: 'Elec-ID profile', hint: 'Elec-ID', tab: 'elec-id', keywords: 'ecs card qualifications cv share verify elec id' },
  // Business
  { label: 'Company details', hint: 'Business', tab: 'business', sheet: 'company', keywords: 'company name address registration vat logo' },
  { label: 'Brand & logo', hint: 'Business', tab: 'business', sheet: 'brand', keywords: 'logo colour brand accent' },
  { label: 'Payments & Stripe', hint: 'Business', tab: 'business', sheet: 'payment', keywords: 'stripe card payments bank account payout' },
  { label: 'Accounting integration', hint: 'Business', tab: 'business', sheet: 'accounting', keywords: 'xero quickbooks freshbooks accounting sync' },
  { label: 'Pricing & rates', hint: 'Business', tab: 'business', sheet: 'pricing', keywords: 'day rate hourly rate card markup pricing' },
  { label: 'Quote settings', hint: 'Business', tab: 'business', sheet: 'quotes', keywords: 'quote terms validity deposit' },
  { label: 'Invoice settings', hint: 'Business', tab: 'business', sheet: 'invoices', keywords: 'invoice payment terms numbering vat' },
  { label: 'Reviews', hint: 'Business', tab: 'business', sheet: 'reviews', keywords: 'google reviews rating link' },
  { label: 'Inspector details', hint: 'Business', tab: 'business', sheet: 'inspector', keywords: 'inspector signature scheme niceic napit registration' },
  { label: 'Test instruments', hint: 'Business', tab: 'business', sheet: 'instruments', keywords: 'instrument calibration meter mft serial' },
  { label: 'Regional settings', hint: 'Business', tab: 'business', sheet: 'regional', keywords: 'region currency date format' },
  { label: 'Booking availability', hint: 'Business', tab: 'business', sheet: 'booking-availability', keywords: 'booking calendar availability hours' },
  // Notifications
  { label: 'Push notifications', hint: 'Notifications', tab: 'notifications', keywords: 'push alerts categories notification' },
  { label: 'Quiet hours', hint: 'Notifications', tab: 'notifications', keywords: 'quiet hours do not disturb night' },
  { label: 'Marketing emails', hint: 'Notifications · Email', tab: 'notifications', keywords: 'email marketing unsubscribe newsletter tips' },
  // App
  { label: 'Default certificate type', hint: 'App', tab: 'preferences', keywords: 'default cert eicr eic minor works' },
  { label: 'Auto-save drafts', hint: 'App', tab: 'preferences', keywords: 'autosave drafts saving' },
  // Privacy
  { label: 'Download my data', hint: 'Privacy', tab: 'privacy', keywords: 'export data gdpr download' },
  { label: 'Delete account', hint: 'Privacy', tab: 'privacy', keywords: 'delete account erase gdpr close' },
  { label: 'Cookies', hint: 'Privacy', tab: 'privacy', keywords: 'cookies analytics marketing tracking consent' },
  // Billing
  { label: 'Subscription & billing', hint: 'Billing', tab: 'billing', keywords: 'plan subscription upgrade cancel billing invoice payment' },
  // Referrals
  { label: 'Refer a mate', hint: 'Refer a Mate', tab: 'referrals', keywords: 'referral invite friend reward' },
];

const SettingsSearch = ({ className }: { className?: string }) => {
  const [, setSearchParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout>>();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return REGISTRY.filter(
      (e) =>
        e.label.toLowerCase().includes(term) ||
        e.keywords.includes(term) ||
        e.hint.toLowerCase().includes(term)
    ).slice(0, 7);
  }, [q]);

  const go = (entry: SearchEntry) => {
    setQ('');
    const params: Record<string, string> = { tab: entry.tab };
    if (entry.sheet) params.sheet = entry.sheet;
    setSearchParams(params, { replace: false });
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -mt-2 h-4 w-4 text-white/50 pointer-events-none" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => {
            clearTimeout(blurTimer.current);
            setFocused(true);
          }}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setFocused(false), 150);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setQ('');
              (e.target as HTMLInputElement).blur();
            }
            if (e.key === 'Enter' && results.length > 0) {
              go(results[0]);
              (e.target as HTMLInputElement).blur();
            }
          }}
          placeholder="Search settings…"
          className={cn(
            'w-full h-11 pl-10 pr-4 rounded-xl text-[14px] touch-manipulation',
            'bg-white/[0.08] border border-white/[0.16] text-white placeholder:text-white/45',
            'outline-none transition-colors focus:border-elec-yellow/60',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
        />
      </div>

      {focused && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.12] shadow-2xl shadow-black/60 overflow-hidden">
          {results.map((r) => (
            <button
              key={`${r.tab}-${r.label}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(r)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/[0.06] touch-manipulation min-h-[44px]"
            >
              <span className="text-[13.5px] font-medium text-white truncate">{r.label}</span>
              <span className="shrink-0 text-[10.5px] uppercase tracking-[0.12em] text-white/50">
                {r.hint}
              </span>
            </button>
          ))}
        </div>
      )}
      {focused && q.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl bg-[hsl(0_0%_16%)] border border-white/[0.12] shadow-2xl shadow-black/60 px-4 py-3.5">
          <p className="text-[13px] text-white/70">Nothing matches "{q.trim()}".</p>
        </div>
      )}
    </div>
  );
};

export default SettingsSearch;
