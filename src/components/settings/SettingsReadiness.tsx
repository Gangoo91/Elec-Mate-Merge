import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

interface ReadinessItem {
  id: string;
  label: string;
  hint: string;
  done: boolean;
  warn?: string;
  sheet: string;
}

interface SettingsReadinessProps {
  onOpenBusiness: (sheetId: string) => void;
  className?: string;
}

const isFuture = (d?: string | null) => {
  if (!d) return false;
  const parsed = new Date(d);
  return !Number.isNaN(parsed.getTime()) && parsed.getTime() > Date.now();
};

/**
 * Business readiness meter — audits the one-time setup that feeds every
 * quote, invoice and certificate, and points at whatever is missing.
 * Everything it checks lives on company_profiles (single fetch).
 */
const SettingsReadiness = ({ onOpenBusiness, className }: SettingsReadinessProps) => {
  // Hook fetches on mount itself — no manual trigger needed.
  const { companyProfile, loading } = useCompanyProfile();

  if (loading && !companyProfile) return null;

  const p = companyProfile;
  const bank = (p?.bank_details || {}) as Record<string, unknown>;
  const instruments = Array.isArray(p?.testing_instruments) ? p.testing_instruments : [];
  const hasInstrument = instruments.length > 0;
  const calibrationValid = instruments.some((i: { calibration_due?: string }) =>
    isFuture(i?.calibration_due)
  );
  const insuranceSet = Boolean(p?.insurance_provider && p?.insurance_policy_number);
  const insuranceValid = insuranceSet && (!p?.insurance_expiry || isFuture(String(p.insurance_expiry)));

  const items: ReadinessItem[] = [
    {
      id: 'company',
      sheet: 'company',
      label: 'Company details',
      hint: 'Name on every document',
      done: Boolean(p?.company_name),
    },
    {
      id: 'logo',
      sheet: 'company',
      label: 'Logo',
      hint: 'Brands quotes, invoices and certs',
      done: Boolean(p?.logo_url || p?.logo_data_url),
    },
    {
      id: 'bank',
      sheet: 'payment',
      label: 'Bank details',
      hint: 'So invoices say where to pay',
      done: Boolean(bank.accountNumber),
    },
    {
      id: 'rates',
      sheet: 'pricing',
      label: 'Rates',
      hint: 'Powers quote pricing',
      done: Boolean(p?.hourly_rate || p?.day_rate),
    },
    {
      id: 'terms',
      sheet: 'pricing',
      label: 'Payment terms',
      hint: 'Printed on quotes and invoices',
      done: Boolean(p?.payment_terms),
    },
    {
      id: 'scheme',
      sheet: 'inspector',
      label: 'Scheme registration',
      hint: 'NICEIC / NAPIT number on certs',
      done: Boolean(p?.registration_scheme && p?.registration_number),
    },
    {
      id: 'insurance',
      sheet: 'inspector',
      label: 'Public liability insurance',
      hint: 'Shown on certificates',
      done: insuranceValid,
      warn:
        insuranceSet && !insuranceValid
          ? 'Policy has expired — update it'
          : undefined,
    },
    {
      id: 'instruments',
      sheet: 'instruments',
      label: 'Test instruments',
      hint: 'Serials and calibration on certs',
      done: hasInstrument && calibrationValid,
      warn:
        hasInstrument && !calibrationValid
          ? 'Calibration overdue — certs need an in-date meter'
          : undefined,
    },
  ];

  const doneCount = items.filter((i) => i.done).length;
  const outstanding = items.filter((i) => !i.done);

  // Fully set up and nothing expiring — stay out of the way.
  if (outstanding.length === 0) return null;

  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden',
        className
      )}
    >
      <div className="px-5 sm:px-6 py-4 flex items-center justify-between gap-4 border-b border-white/[0.06]">
        <div>
          <div className="text-[15px] font-semibold text-white tracking-tight">
            Business setup
          </div>
          <div className="mt-0.5 text-[11.5px] text-white/65">
            Feeds every quote, invoice and certificate
          </div>
        </div>
        <span className="text-[13px] font-semibold text-elec-yellow tabular-nums shrink-0">
          {doneCount} of {items.length}
        </span>
      </div>

      <div className="h-1 bg-white/[0.04]">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${Math.round((doneCount / items.length) * 100)}%` }}
        />
      </div>

      <div className="divide-y divide-white/[0.06]">
        {outstanding.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenBusiness(item.sheet)}
            className="w-full flex items-center gap-4 px-5 sm:px-6 py-3.5 text-left hover:bg-white/[0.03] transition-colors touch-manipulation min-h-[44px]"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-medium text-white truncate">{item.label}</div>
              <div
                className={cn(
                  'mt-0.5 text-[11.5px] truncate',
                  item.warn ? 'text-amber-400' : 'text-white/55'
                )}
              >
                {item.warn || item.hint}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsReadiness;
