import { useEffect } from 'react';

import { supabase } from '@/integrations/supabase/client';

interface StepProps {
  formData: {
    email: string;
    phone: string;
    address: string;
    [key: string]: unknown;
  };
  onChange: (data: Record<string, unknown>) => void;
}

export function ContactDetailsStep({ formData, onChange }: StepProps) {
  useEffect(() => {
    const prefillEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email && !formData.email) {
        onChange({ ...formData, email: user.email });
      }
    };
    void prefillEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputClass =
    'h-12 w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 text-[16px] text-white placeholder:text-white outline-none transition-all duration-150 focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[1.75rem]">
          How do clients <span className="text-yellow-400">reach you?</span>
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">
          These appear on your quote and invoice documents so clients know where to get in touch.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-white">
            Business email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ ...formData, email: e.target.value })}
            placeholder="you@yourcompany.com"
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[13px] font-medium text-white">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ ...formData, phone: e.target.value })}
            placeholder="07XXX XXXXXX"
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="address" className="mb-2 block text-[13px] font-medium text-white">
            Business address
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => onChange({ ...formData, address: e.target.value })}
            placeholder="123 High Street&#10;London&#10;SW1A 1AA"
            rows={3}
            className="w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-[16px] leading-[1.6] text-white placeholder:text-white outline-none transition-all duration-150 focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20"
          />
        </div>
      </div>
    </div>
  );
}
