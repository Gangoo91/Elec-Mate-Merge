interface StepProps {
  formData: {
    companyName: string;
    [key: string]: unknown;
  };
  onChange: (data: Record<string, unknown>) => void;
}

export function CompanyNameStep({ formData, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[1.75rem]">
          What's your <span className="text-yellow-400">business name?</span>
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">
          This appears on every quote, invoice and certificate you send.
        </p>
      </div>

      <div>
        <label htmlFor="company-name" className="mb-2 block text-[13px] font-medium text-white">
          Company name
        </label>
        <input
          id="company-name"
          type="text"
          value={formData.companyName}
          onChange={(e) => onChange({ ...formData, companyName: e.target.value })}
          placeholder="e.g. Smith Electrical Services Ltd"
          autoFocus
          className="h-12 w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 text-[16px] text-white placeholder:text-white outline-none transition-all duration-150 focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20"
        />
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] p-4">
        <p className="text-[13px] font-semibold text-yellow-400">Why we need this</p>
        <p className="mt-1 text-[13px] leading-[1.6] text-white">
          Your company name builds trust and professionalism. It appears prominently on every quote
          and invoice you send to clients.
        </p>
      </div>
    </div>
  );
}
