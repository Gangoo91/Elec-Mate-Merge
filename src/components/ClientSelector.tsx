import React, { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, X, ChevronDown, Loader2 } from 'lucide-react';
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
      <Label className="text-white text-[10px] uppercase tracking-wider mb-1 block">Select Client</Label>

      {selectedCustomer ? (
        <div className="relative p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/[0.05]">
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
          className="w-full h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-between px-3 text-sm text-white/40 touch-manipulation hover:bg-white/[0.08] active:scale-[0.98] transition-all"
        >
          <span>Search clients...</span>
          <ChevronDown className="h-4 w-4 opacity-40" />
        </button>
      )}

      {/* Customer Search Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[85dvh] p-0 rounded-t-2xl flex flex-col">
          <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg font-bold text-white">Select Client</SheetTitle>
                {!isLoading && resultCount > 0 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-white/[0.08] px-2.5 py-1 rounded">
                    {resultCount}
                  </span>
                )}
              </div>
            </SheetHeader>

            {/* Search Input */}
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5 h-12 px-3 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                <Search className="h-4 w-4 text-white/40 flex-shrink-0" />
                <input
                  placeholder="Search by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Customer List */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-5 w-5 animate-spin text-white mb-2" />
                  <p className="text-sm text-white">Loading clients...</p>
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <p className="text-sm font-medium text-white">
                    {searchTerm ? 'No clients found' : 'No clients yet'}
                  </p>
                  <p className="text-xs text-white mt-1">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Add clients from the CRM section'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {customers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleSelectCustomer(customer)}
                      className="w-full text-left p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] active:scale-[0.98] transition-all touch-manipulation"
                    >
                      <p className="font-semibold text-white text-sm">{customer.name}</p>
                      {(customer.email || customer.phone) && (
                        <p className="text-xs text-white truncate mt-1">
                          {[customer.email, customer.phone].filter(Boolean).join('  \u00B7  ')}
                        </p>
                      )}
                      {customer.address && (
                        <p className="text-xs text-white truncate mt-0.5">
                          {customer.address}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientSelector;
