import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, User, X, ChevronDown, Loader2, Mail, Phone, MapPin } from 'lucide-react';
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

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/80">Select Client</Label>

      {selectedCustomer ? (
        <div className="relative p-4 bg-card/50 rounded-xl border-2 border-elec-yellow/30">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearSelection}
            className="absolute top-2 right-2 h-8 w-8 shrink-0 touch-manipulation text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-elec-yellow">
                {selectedCustomer.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase() || '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <p className="font-semibold text-foreground text-base">{selectedCustomer.name}</p>
              <div className="mt-2 space-y-1.5">
                {selectedCustomer.email && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{selectedCustomer.email}</span>
                  </div>
                )}
                {selectedCustomer.phone && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{selectedCustomer.phone}</span>
                  </div>
                )}
                {selectedCustomer.address && (
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
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
          <span className="text-muted-foreground">Search clients...</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}

      {/* Customer Search Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="h-[85dvh] p-0 rounded-t-2xl flex flex-col">
          <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <SheetHeader className="px-4 pt-4 pb-2 border-b border-border">
              <SheetTitle className="text-lg font-semibold">Select Client</SheetTitle>
            </SheetHeader>

            {/* Search Input */}
            <div className="px-4 py-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>

            {/* Customer List */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <User className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">
                    {searchTerm ? 'No clients found matching your search' : 'No clients found'}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    {searchTerm
                      ? 'Try a different search term'
                      : 'Add clients from the CRM section'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {customers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() => handleSelectCustomer(customer)}
                      className="w-full text-left p-4 hover:bg-card/50 active:bg-card transition-colors touch-manipulation"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-elec-yellow" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{customer.name}</p>
                          {(customer.email || customer.phone) && (
                            <p className="text-sm text-muted-foreground truncate">
                              {[customer.email, customer.phone].filter(Boolean).join(' • ')}
                            </p>
                          )}
                          {customer.address && (
                            <p className="text-sm text-muted-foreground truncate mt-0.5">
                              {customer.address}
                            </p>
                          )}
                        </div>
                      </div>
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
