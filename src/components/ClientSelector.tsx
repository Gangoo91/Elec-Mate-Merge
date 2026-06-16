import React, { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { X, ChevronDown, Loader2, Search } from 'lucide-react';
import { useCustomers, Customer } from '@/hooks/inspection/useCustomers';
import { cn } from '@/lib/utils';

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

  // Get initials for avatar bubble (text-only, no icons)
  const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="space-y-2">
      {selectedCustomer ? (
        <div className="relative bg-[hsl(0_0%_10%)] border border-elec-yellow/40 rounded-2xl px-4 py-4 sm:px-5 sm:py-5">
          <button
            type="button"
            onClick={handleClearSelection}
            aria-label="Clear selected client"
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.10] flex items-center justify-center touch-manipulation active:scale-90 hover:bg-white/[0.10] transition-colors"
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow mb-1.5">
            Selected
          </div>
          <p className="font-semibold text-white text-[16px] tracking-tight pr-10">
            {selectedCustomer.name}
          </p>
          <div className="mt-2 space-y-0.5">
            {selectedCustomer.email && (
              <p className="text-[13px] text-white/85 truncate">{selectedCustomer.email}</p>
            )}
            {selectedCustomer.phone && (
              <p className="text-[13px] text-white/85 truncate tabular-nums">
                {selectedCustomer.phone}
              </p>
            )}
            {selectedCustomer.address && (
              <p className="text-[12.5px] text-white/65 truncate">{selectedCustomer.address}</p>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="w-full h-12 rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.10] flex items-center justify-between px-4 text-[14px] text-white/70 touch-manipulation hover:bg-white/[0.04] hover:border-white/[0.15] active:scale-[0.99] transition-all"
        >
          <span>Search clients…</span>
          <ChevronDown className="h-4 w-4 text-white/50" />
        </button>
      )}

      {/* Customer Search Sheet — editorial, lifted background */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[80dvh] p-0 rounded-t-3xl overflow-hidden bg-[hsl(0_0%_10%)] border-t border-white/[0.10]"
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/30" />
          </div>

          {/* Editorial header */}
          <div className="px-5 sm:px-6 pt-3 pb-4">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                Clients
              </span>
              {!isLoading && (
                <span className="text-[11px] text-white/55 tabular-nums">
                  {resultCount} of {resultCount}
                </span>
              )}
            </div>
            <SheetTitle className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-white leading-tight">
              Select a client.
            </SheetTitle>
            <p className="mt-1.5 text-[13px] text-white/70 leading-relaxed">
              Pick from your CRM, or close this sheet to enter details manually.
            </p>

            {/* Search input — editorial */}
            <div className="relative mt-4">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/45 pointer-events-none"
                aria-hidden
              />
              <input
                placeholder="Search by name, email or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus={false}
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-white/[0.05] border border-white/[0.12] text-[14.5px] text-white placeholder:text-white/45 outline-none focus:border-elec-yellow/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-elec-yellow/20 touch-manipulation transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.10] flex items-center justify-center touch-manipulation hover:bg-white/[0.10] transition-colors"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Customer List */}
          <div className="overflow-y-auto overscroll-contain h-[calc(80dvh-180px)] border-t border-white/[0.08]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-5 w-5 animate-spin text-elec-yellow mb-3" />
                <p className="text-[13px] text-white/70">Loading clients…</p>
              </div>
            ) : customers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <p className="text-[15px] font-semibold text-white">
                  {searchTerm ? 'No matches' : 'No clients yet'}
                </p>
                <p className="mt-1.5 text-[13px] text-white/60 max-w-sm leading-relaxed">
                  {searchTerm
                    ? `Nothing matched "${searchTerm}". Try a different name, email or number.`
                    : 'Add your first client from the CRM section to start linking jobs.'}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {customers.map((customer) => {
                  const isCurrent = selectedCustomer?.id === customer.id;
                  return (
                    <li key={customer.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectCustomer(customer)}
                        className={cn(
                          'w-full text-left px-5 sm:px-6 py-4 flex items-start gap-4 touch-manipulation transition-colors',
                          'hover:bg-white/[0.06] active:bg-elec-yellow/[0.06]',
                          isCurrent && 'bg-elec-yellow/[0.06]'
                        )}
                      >
                        {/* Avatar bubble — text initials, no icon */}
                        <div
                          className={cn(
                            'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-semibold tracking-wide',
                            isCurrent
                              ? 'bg-elec-yellow text-black'
                              : 'bg-white/[0.06] border border-white/[0.10] text-white/85'
                          )}
                        >
                          {getInitials(customer.name)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3">
                            <p
                              className={cn(
                                'font-semibold text-[15px] tracking-tight truncate',
                                isCurrent ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              {customer.name}
                            </p>
                            {isCurrent && (
                              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow shrink-0">
                                Selected
                              </span>
                            )}
                          </div>
                          {(customer.email || customer.phone) && (
                            <p className="mt-0.5 text-[12.5px] text-white/70 truncate">
                              {[customer.email, customer.phone].filter(Boolean).join('  ·  ')}
                            </p>
                          )}
                          {customer.address && (
                            <p className="mt-0.5 text-[12px] text-white/50 truncate">
                              {customer.address}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientSelector;
