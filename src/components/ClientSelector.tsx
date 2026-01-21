import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, User, X, ChevronDown, Loader2 } from 'lucide-react';
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
      const customer = customers.find(c => c.id === selectedCustomerId);
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
        <div className="flex items-center gap-2 p-3 bg-card/50 rounded-lg border border-elec-yellow/30">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{selectedCustomer.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {[selectedCustomer.email, selectedCustomer.phone].filter(Boolean).join(' • ')}
            </p>
            {selectedCustomer.address && (
              <p className="text-sm text-muted-foreground truncate">{selectedCustomer.address}</p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClearSelection}
            className="h-9 w-9 shrink-0 touch-manipulation"
          >
            <X className="h-4 w-4" />
          </Button>
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
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
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
                  autoFocus
                />
              </div>
            </div>

            {/* Customer List */}
            <div className="flex-1 overflow-y-auto">
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
                    {searchTerm ? 'Try a different search term' : 'Add clients from the CRM section'}
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
