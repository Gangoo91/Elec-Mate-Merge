import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

export interface ReadinessItem {
  id: string;
  label: string;
  hint: string;
  done: boolean;
  warn?: string;
  sheet: string;
}

const isFuture = (d?: string | null) => {
  if (!d) return false;
  const parsed = new Date(d);
  return !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now();
};

/**
 * Audits the one-time business setup that feeds every quote, invoice and
 * certificate. Everything it checks lives on company_profiles (one fetch).
 *
 * Exposed as a hook so the Settings overview can raise a single alert line
 * from the same numbers the Business page's checklist shows — the two used
 * to be computed in one component and the page could only render or hide it.
 * `enabled` is false for apprentices, who have no company profile to audit.
 */
export const useBusinessReadiness = (enabled = true) => {
  const { companyProfile, loading } = useCompanyProfile();

  if (!enabled) {
    return { items: [] as ReadinessItem[], outstanding: [] as ReadinessItem[], doneCount: 0, total: 0, loading: false };
  }

  const p = companyProfile;
  const bank = (p?.bank_details || {}) as Record<string, unknown>;
  const instruments = Array.isArray(p?.testing_instruments) ? p.testing_instruments : [];
  const hasInstrument = instruments.length > 0;
  const calibrationValid = instruments.some((i: { calibration_due?: string }) =>
    isFuture(i?.calibration_due)
  );
  const insuranceSet = Boolean(p?.insurance_provider && p?.insurance_policy_number);
  const insuranceValid =
    insuranceSet && (!p?.insurance_expiry || isFuture(String(p.insurance_expiry)));

  const items: ReadinessItem[] = [
    { id: 'company', sheet: 'company', label: 'Company details', hint: 'Name on every document', done: Boolean(p?.company_name) },
    { id: 'logo', sheet: 'company', label: 'Logo', hint: 'Brands quotes, invoices and certs', done: Boolean(p?.logo_url || p?.logo_data_url) },
    { id: 'bank', sheet: 'payment', label: 'Bank details', hint: 'So invoices say where to pay', done: Boolean(bank.accountNumber) },
    { id: 'rates', sheet: 'pricing', label: 'Rates', hint: 'Powers quote pricing', done: Boolean(p?.hourly_rate || p?.day_rate) },
    { id: 'terms', sheet: 'pricing', label: 'Payment terms', hint: 'Printed on quotes and invoices', done: Boolean(p?.payment_terms) },
    { id: 'scheme', sheet: 'inspector', label: 'Scheme registration', hint: 'NICEIC / NAPIT number on certs', done: Boolean(p?.registration_scheme && p?.registration_number) },
    {
      id: 'insurance',
      sheet: 'inspector',
      label: 'Public liability insurance',
      hint: 'Shown on certificates',
      done: insuranceValid,
      warn: insuranceSet && !insuranceValid ? 'Insurance policy has expired' : undefined,
    },
    {
      id: 'instruments',
      sheet: 'instruments',
      label: 'Test instruments',
      hint: 'Serials and calibration on certs',
      done: hasInstrument && calibrationValid,
      warn: hasInstrument && !calibrationValid ? 'Calibration overdue — certs need an in-date meter' : undefined,
    },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const outstanding = items.filter((i) => !i.done);
  return { items, outstanding, doneCount, total: items.length, loading: loading && !companyProfile };
};

interface SettingsReadinessProps {
  onOpenBusiness: (sheetId: string) => void;
  className?: string;
}

/**
 * The checklist itself — shown at the top of the Business page while anything
 * is outstanding, and nothing at all once it is complete.
 */
const SettingsReadiness = ({ onOpenBusiness, className }: SettingsReadinessProps) => {
  const { items, outstanding, doneCount, total, loading } = useBusinessReadiness();
  if (loading || outstanding.length === 0 || items.length === 0) return null;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-elec-yellow/35',
        CARD_SURFACE,
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3.5 sm:px-5">
        <div>
          <div className="text-[15px] font-semibold tracking-tight text-white">Business setup</div>
          <div className="mt-0.5 text-[12px] text-white">Feeds every quote, invoice and certificate</div>
        </div>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-elec-yellow">
          {doneCount} of {total}
        </span>
      </div>

      <div className="h-1 bg-white/[0.06]">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${Math.round((doneCount / total) * 100)}%` }}
        />
      </div>

      <div className="divide-y divide-white/[0.08]">
        {outstanding.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenBusiness(item.sheet)}
            className="group flex min-h-[44px] w-full items-center gap-4 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-medium text-white group-hover:text-elec-yellow">
                {item.label}
              </div>
              <div className={cn('mt-0.5 truncate text-[12px]', item.warn ? 'text-elec-yellow' : 'text-white')}>
                {item.warn || item.hint}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsReadiness;
