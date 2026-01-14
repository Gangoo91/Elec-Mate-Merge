import React, { useState, useEffect, useMemo } from 'react';
import { useCustomers, Customer } from '@/hooks/useCustomers';
import { Users, Plus, Search, ChevronDown, X, User, MapPin, Phone, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CustomerForm } from '@/components/customers/customers/CustomerForm';
import { cn } from '@/lib/utils';

interface CustomerSelectorProps {
  selectedCustomerId?: string | null;
  onCustomerSelect: (customerId: string | null, customer: Customer | null) => void;
  onPrefillFromCustomer?: (customer: Customer) => void;
  className?: string;
  defaultOpen?: boolean;
}

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  selectedCustomerId,
  onCustomerSelect,
  onPrefillFromCustomer,
  className,
  defaultOpen = false,
}) => {
  const { customers, isLoading, saveCustomer, refreshCustomers } = useCustomers();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Find selected customer
  const selectedCustomer = useMemo(() => {
    if (!selectedCustomerId) return null;
    return customers.find(c => c.id === selectedCustomerId) || null;
  }, [selectedCustomerId, customers]);

  // Filter customers by search
  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.phone?.includes(query) ||
      c.address?.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  // Handle customer selection
  const handleSelect = (customer: Customer) => {
    onCustomerSelect(customer.id, customer);
    setPopoverOpen(false);
    setSearchQuery('');

    // Offer to prefill form data
    if (onPrefillFromCustomer) {
      onPrefillFromCustomer(customer);
    }
  };

  // Handle clear selection
  const handleClear = () => {
    onCustomerSelect(null, null);
  };

  // Handle new customer creation
  const handleNewCustomer = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    await saveCustomer(data);
    await refreshCustomers();
    setShowNewCustomer(false);
    // Find and select the newly created customer
    setTimeout(() => {
      const newCustomer = customers.find(c => c.name === data.name);
      if (newCustomer) {
        handleSelect(newCustomer);
      }
    }, 500);
  };

  return (
    <div className={cn("mb-4", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent">
          <CollapsibleTrigger asChild>
            <CardContent className="pt-4 pb-4 cursor-pointer touch-manipulation">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Customer</p>
                    {selectedCustomer ? (
                      <p className="text-xs text-elec-yellow">{selectedCustomer.name}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Optional - Link to existing customer</p>
                    )}
                  </div>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )} />
              </div>
            </CardContent>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0 pb-4 space-y-3">
              {/* Selected Customer Display */}
              {selectedCustomer && (
                <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{selectedCustomer.name}</p>
                      {selectedCustomer.address && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          {selectedCustomer.address}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        {selectedCustomer.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {selectedCustomer.phone}
                          </span>
                        )}
                        {selectedCustomer.email && (
                          <span className="flex items-center gap-1 truncate">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            {selectedCustomer.email}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 touch-manipulation flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Customer Selection Popover */}
              {!selectedCustomer && (
                <div className="flex gap-2">
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 h-11 justify-start gap-2 touch-manipulation"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                        <span className="truncate">
                          {isLoading ? 'Loading...' : 'Select existing customer...'}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search customers..."
                          value={searchQuery}
                          onValueChange={setSearchQuery}
                        />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>
                            <div className="py-4 text-center">
                              <User className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm">No customers found</p>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  setPopoverOpen(false);
                                  setShowNewCustomer(true);
                                }}
                              >
                                Create new customer
                              </Button>
                            </div>
                          </CommandEmpty>
                          <CommandGroup heading="Your Customers">
                            {filteredCustomers.map((customer) => (
                              <CommandItem
                                key={customer.id}
                                value={customer.name}
                                onSelect={() => handleSelect(customer)}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                                    <User className="h-4 w-4 text-elec-yellow" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{customer.name}</p>
                                    {customer.address && (
                                      <p className="text-xs text-muted-foreground truncate">
                                        {customer.address}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 touch-manipulation flex-shrink-0"
                    onClick={() => setShowNewCustomer(true)}
                    title="Create new customer"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Info text */}
              <p className="text-xs text-muted-foreground">
                Link this certificate to a customer for easy access later. Customer details will auto-fill the client fields.
              </p>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* New Customer Dialog */}
      <CustomerForm
        open={showNewCustomer}
        onOpenChange={setShowNewCustomer}
        onSave={handleNewCustomer}
      />
    </div>
  );
};

export default CustomerSelector;
