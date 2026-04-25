import { useState } from 'react';

interface StepProps {
  formData: {
    bankName: string;
    accountName: string;
    sortCode: string;
    accountNumber: string;
    [key: string]: unknown;
  };
  onChange: (data: Record<string, unknown>) => void;
}

export function BankDetailsStep({ formData, onChange }: StepProps) {
  const [showHelp, setShowHelp] = useState(false);

  const formatSortCode = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
  };

  const inputClass =
    'h-12 w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 text-[16px] text-white placeholder:text-white outline-none transition-all duration-150 focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[1.75rem]">
          Where do clients <span className="text-yellow-400">send payment?</span>
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">
          Appears on the payment details section of every invoice. Optional — you can add this
          later in Settings.
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] p-4">
        <p className="text-[13px] font-semibold text-yellow-400">This step is optional</p>
        <p className="mt-1 text-[13px] leading-[1.6] text-white">
          Without bank details, clients won't know where to send payment. You can skip this now and
          add it later in Settings.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="bank-name" className="mb-2 block text-[13px] font-medium text-white">
            Bank name
          </label>
          <input
            id="bank-name"
            value={formData.bankName}
            onChange={(e) => onChange({ ...formData, bankName: e.target.value })}
            placeholder="e.g. Barclays"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="account-name" className="mb-2 block text-[13px] font-medium text-white">
            Account name
          </label>
          <input
            id="account-name"
            value={formData.accountName}
            onChange={(e) => onChange({ ...formData, accountName: e.target.value })}
            placeholder="e.g. Smith Electrical Ltd"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sort-code" className="mb-2 block text-[13px] font-medium text-white">
              Sort code
            </label>
            <input
              id="sort-code"
              value={formData.sortCode}
              onChange={(e) => onChange({ ...formData, sortCode: formatSortCode(e.target.value) })}
              placeholder="XX-XX-XX"
              maxLength={8}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="account-number"
              className="mb-2 block text-[13px] font-medium text-white"
            >
              Account number
            </label>
            <input
              id="account-number"
              value={formData.accountNumber}
              onChange={(e) =>
                onChange({
                  ...formData,
                  accountNumber: e.target.value.replace(/\D/g, '').slice(0, 8),
                })
              }
              placeholder="XXXXXXXX"
              maxLength={8}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHelp(!showHelp)}
          className="touch-manipulation text-[13px] font-medium text-yellow-400 transition-colors hover:text-yellow-300"
        >
          {showHelp ? 'Hide help' : 'Where do I find these details?'}
        </button>

        {showHelp && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="text-[13px] leading-[1.6] text-white">
              You can find your bank details on your bank statement, online banking portal, or
              mobile banking app. Look for "Account Details" or "Account Information".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
