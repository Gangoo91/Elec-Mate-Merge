import React, { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { X, ChevronDown, Loader2 } from 'lucide-react';
import { useCustomers, Customer } from '@/hooks/inspection/useCustomers';

interface ClientSelectorProps {
  onSelectCustomer: (customer: Customer | null) => void;
  selectedCustomerId?: string;
}

const ClientSelector = ({ onSelectCustomer, selectedCustomerId }: ClientSelectorProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const { customers, isLoading } = useCustomers({
    searchTerm: searchTerm,
    pageSize: 50,
  });

  // If a selectedCustomerId is provided, load the customer
  useEffect(() => {
    if (selectedCustomerId && customers.length > 0) {
      const customer = customers.find((c) => c.id === selectedCustomerId);
      if (customer) {
        setSelectedCustomer(customer);
      }
    }
  }, [selectedCustomerId, customers]);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    onSelectCustomer(customer);
    setIsSheetOpen(false);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    setSelectedCustomer(null);
    onSelectCustomer(null);
  };

  const resultCount = useMemo(() => customers.length, [customers]);

  return (
    <div className="space-y-2">
      <p className="text-white text-[10px] uppercase tracking-wider mb-1">Select Client</p>

      {selectedCustomer ? (
        <div className="relative p-3.5 rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.05]">
          <button
            type="button"
            onClick={handleClearSelection}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center touch-manipulation active:scale-90"
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
          <p className="font-semibold text-white text-base pr-8">{selectedCustomer.name}</p>
          <div className="mt-1.5 space-y-0.5">
            {selectedCustomer.email && (
              <p className="text-sm text-white truncate">{selectedCustomer.email}</p>
            )}
            {selectedCustomer.phone && (
              <p className="text-sm text-white truncate">{selectedCustomer.phone}</p>
            )}
            {selectedCustomer.address && (
              <p className="text-sm text-white truncate">{selectedCustomer.address}</p>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="w-full h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-between px-3 text-sm text-white touch-manipulation hover:bg-white/[0.08] active:scale-[0.98] transition-all"
        >
          <span>Search clients...</span>
          <ChevronDown className="h-4 w-4 opacity-40" />
        </button>
      )}

      {/* Customer Search Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[75dvh] p-0 rounded-t-2xl overflow-hidden">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header + Search — compact */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mb-3">
              <SheetTitle className="text-base font-bold text-white">Select Client</SheetTitle>
              {!isLoading && resultCount > 0 && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                  {resultCount} clients
                </span>
              )}
            </div>
            <input
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-11 px-3 rounded-lg bg-white/[0.06] border border-white/[0.12] text-[15px] text-white placeholder:text-white outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 touch-manipulation"
            />
          </div>

          {/* Customer List */}
          <div className="overflow-y-auto overscroll-contain h-[calc(75dvh-110px)] border-t border-white/[0.08]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-white mb-2" />
                <p className="text-sm text-white">Loading clients...</p>
              </div>
            ) : customers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <p className="text-[14px] font-medium text-white">
                  {searchTerm ? 'No clients found' : 'No clients yet'}
                </p>
                <p className="text-[12px] text-white/50 mt-1">
                  {searchTerm ? 'Try a different search term' : 'Add clients from the CRM section'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.08]">
                {customers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => handleSelectCustomer(customer)}
                    className="w-full text-left px-4 py-3.5 hover:bg-white/[0.04] active:bg-white/[0.06] transition-all touch-manipulation"
                  >
                    <p className="font-semibold text-white text-[15px]">{customer.name}</p>
                    {(customer.email || customer.phone) && (
                      <p className="text-[12px] text-white/50 truncate mt-0.5">
                        {[customer.email, customer.phone].filter(Boolean).join('  ·  ')}
                      </p>
                    )}
                    {customer.address && (
                      <p className="text-[12px] text-white/50 truncate mt-0.5">
                        {customer.address}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientSelector;
