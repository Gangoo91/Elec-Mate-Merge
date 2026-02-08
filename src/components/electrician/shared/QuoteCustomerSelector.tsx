import { useState } from 'react';
import { Users, X } from 'lucide-react';
import ClientSelector from '@/components/ClientSelector';
import type { Customer } from '@/hooks/inspection/useCustomers';

interface QuoteCustomerSelectorProps {
  customerId?: string;
  customerName?: string;
  onSelect: (customer: Customer) => void;
  onClear: () => void;
}

export const QuoteCustomerSelector = ({
  customerId,
  customerName,
  onSelect,
  onClear,
}: QuoteCustomerSelectorProps) => {
  const [showSelector, setShowSelector] = useState(false);

  if (customerId && customerName) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
        <Users className="h-4 w-4 text-elec-yellow shrink-0" />
        <span className="text-[13px] font-medium text-white truncate flex-1">
          {customerName}
        </span>
        <button
          type="button"
          onClick={onClear}
          className="text-[12px] text-elec-yellow font-medium touch-manipulation shrink-0"
        >
          Change
        </button>
      </div>
    );
  }

  if (showSelector) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-medium text-white/60 uppercase tracking-wider flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            Select Existing Customer
          </p>
          <button
            type="button"
            onClick={() => setShowSelector(false)}
            className="p-1 touch-manipulation"
          >
            <X className="h-4 w-4 text-white/40" />
          </button>
        </div>
        <ClientSelector
          onSelectCustomer={(customer) => {
            if (customer) {
              onSelect(customer);
              setShowSelector(false);
            }
          }}
          selectedCustomerId={customerId}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowSelector(true)}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/20 text-white/60 hover:border-elec-yellow/40 hover:text-white/80 transition-colors touch-manipulation active:scale-[0.98]"
    >
      <Users className="h-4 w-4" />
      <span className="text-[13px] font-medium">Select Existing Customer</span>
    </button>
  );
};
