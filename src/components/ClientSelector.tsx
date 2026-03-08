import React, { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, User, X, ChevronDown, Loader2, Mail, Phone, MapPin, Users } from 'lucide-react';
import { useCustomers, Customer } from '@/hooks/inspection/useCustomers';

interface ClientSelectorProps {
  onSelectCustomer: (customer: Customer | null) => void;
  selectedCustomerId?: string;
}

const AVATAR_COLOURS = [
  { bg: 'bg-yellow-500/15', text: 'text-yellow-400' },
  { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  { bg: 'bg-green-500/15', text: 'text-green-400' },
  { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  { bg: 'bg-pink-500/15', text: 'text-pink-400' },
  { bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
];

function getInitials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getColourIndex(name?: string): number {
  if (!name) return 0;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % AVATAR_COLOURS.length;
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
      <Label className="text-sm font-medium text-white">Select Client</Label>

      {selectedCustomer ? (
        <div className="relative p-4 bg-card/50 rounded-xl border-2 border-elec-yellow/30">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearSelection}
            className="absolute top-2 right-2 h-8 w-8 shrink-0 touch-manipulation text-white hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-elec-yellow">
                {getInitials(selectedCustomer.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <p className="font-semibold text-foreground text-base">{selectedCustomer.name}</p>
              <div className="mt-2 space-y-1.5">
                {selectedCustomer.email && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Mail className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                    <span className="truncate">{selectedCustomer.email}</span>
                  </div>
                )}
                {selectedCustomer.phone && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Phone className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                    <span className="truncate">{selectedCustomer.phone}</span>
                  </div>
                )}
                {selectedCustomer.address && (
                  <div className="flex items-center gap-2 text-sm text-white">
                    <MapPin className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                    <span className="truncate">{selectedCustomer.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsSheetOpen(true)}
          className="w-full h-11 justify-between touch-manipulation border-white/30 hover:border-elec-yellow/50"
        >
          <span className="text-white">Search clients...</span>
          <ChevronDown className="h-4 w-4 text-white" />
        </Button>
      )}

      {/* Customer Search Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[85dvh] p-0 rounded-t-2xl flex flex-col">
          <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-lg font-semibold text-white">Select Client</SheetTitle>
                {!isLoading && resultCount > 0 && (
                  <span className="text-xs font-medium bg-elec-yellow/15 text-elec-yellow px-2.5 py-1 rounded-full">
                    {resultCount} client{resultCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </SheetHeader>

            {/* Search Input */}
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
                <Input
                  placeholder="Search by name, email, phone, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white/10 flex items-center justify-center touch-manipulation"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Customer List */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 animate-spin text-elec-yellow mb-2" />
                  <p className="text-sm text-white">Loading clients...</p>
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-medium">
                    {searchTerm ? 'No clients found' : 'No clients yet'}
                  </p>
                  <p className="text-sm text-white mt-1">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Add clients from the CRM section'}
                  </p>
                </div>
              ) : (
                <div className="p-3 space-y-1.5">
                  {customers.map((customer) => {
                    const colour = AVATAR_COLOURS[getColourIndex(customer.name)];
                    return (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => handleSelectCustomer(customer)}
                        className="w-full text-left p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] active:bg-white/[0.08] border border-white/[0.06] transition-colors touch-manipulation"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${colour.bg} flex items-center justify-center shrink-0`}
                          >
                            <span className={`text-xs font-bold ${colour.text}`}>
                              {getInitials(customer.name)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white">{customer.name}</p>
                            {(customer.email || customer.phone) && (
                              <p className="text-sm text-white truncate mt-0.5">
                                {[customer.email, customer.phone].filter(Boolean).join(' \u2022 ')}
                              </p>
                            )}
                            {customer.address && (
                              <p className="text-sm text-white truncate mt-0.5">
                                {customer.address}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
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
