import React, { useState, useEffect } from 'react';
import { Plus, User, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCustomers, type Customer } from '@/hooks/inspection/useCustomers';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import type { SiteVisit } from '@/types/siteVisit';

interface SiteVisitClientStepProps {
  visit: SiteVisit;
  onUpdateClient: (
    updates: Partial<
      Pick<SiteVisit, 'customerId' | 'customerName' | 'customerEmail' | 'customerPhone'>
    >
  ) => void;
  onUpdateProperty: (
    updates: Partial<Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode'>>
  ) => void;
}

export const SiteVisitClientStep = ({
  visit,
  onUpdateClient,
  onUpdateProperty,
}: SiteVisitClientStepProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const { customers, isLoading } = useCustomers({ searchTerm, pageSize: 10 });

  // New client form state
  const [newName, setNewName] = useState(visit.customerName || '');
  const [newEmail, setNewEmail] = useState(visit.customerEmail || '');
  const [newPhone, setNewPhone] = useState(visit.customerPhone || '');
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    onUpdateClient({
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
    });
    if (customer.address) {
      onUpdateProperty({ propertyAddress: customer.address });
    }
    setSearchTerm('');
  };

  const handleCreateNew = () => {
    setShowCreate(true);
    setSelectedCustomer(null);
    onUpdateClient({
      customerId: undefined,
      customerName: newName,
      customerEmail: newEmail,
      customerPhone: newPhone,
    });
  };

  // Sync inline form back to visit
  useEffect(() => {
    if (showCreate) {
      onUpdateClient({
        customerName: newName,
        customerEmail: newEmail,
        customerPhone: newPhone,
      });
      // Show save prompt when name is filled and no customer is linked
      if (newName.trim() && !savePromptDismissed) {
        setShowSavePrompt(true);
      }
    }
  }, [newName, newEmail, newPhone, showCreate]);

  const handleCustomerSaved = (savedCustomerId: string) => {
    setShowSavePrompt(false);
    onUpdateClient({ customerId: savedCustomerId });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
          Client details
        </h2>
        <p className="mt-1 text-[12.5px] text-white/65">
          Search existing customers or create a new one.
        </p>
      </div>

      {/* Selected customer display — editorial */}
      {selectedCustomer && !showCreate && (
        <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-elec-yellow/25 bg-gradient-to-r from-elec-yellow/[0.06] to-transparent p-4">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/80 to-elec-yellow/0"
          />
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.12]">
            <Check className="h-4 w-4 text-elec-yellow" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
              Selected
            </div>
            <p className="mt-0.5 truncate text-[15px] font-medium text-white">
              {selectedCustomer.name}
            </p>
            <p className="truncate text-[12px] text-white/65">
              {selectedCustomer.email || selectedCustomer.phone || 'No contact details'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCustomer(null);
              onUpdateClient({
                customerId: undefined,
                customerName: '',
                customerEmail: '',
                customerPhone: '',
              });
            }}
            className="rounded-full text-[12px] text-white/65 hover:text-white touch-manipulation"
          >
            Change
          </Button>
        </div>
      )}

      {/* Search */}
      {!selectedCustomer && !showCreate && (
        <div className="space-y-3">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email or phone…"
            className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
            autoCapitalize="off"
            autoComplete="off"
            enterKeyHint="search"
          />

          {/* Results */}
          {searchTerm && (
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-elec-yellow" />
                </div>
              )}
              {!isLoading && customers.length === 0 && (
                <p className="text-sm text-white text-center py-4">No customers found</p>
              )}
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => handleSelectCustomer(customer)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-elec-gray flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{customer.name}</p>
                    <p className="text-xs text-white truncate">
                      {customer.email || customer.phone || 'No contact details'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Create new button */}
          <Button
            onClick={handleCreateNew}
            variant="outline"
            className="w-full h-11 touch-manipulation border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        </div>
      )}

      {/* Inline create form */}
      {showCreate && (
        <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold tracking-tight text-white">New client</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowCreate(false);
                setNewName('');
                setNewEmail('');
                setNewPhone('');
              }}
              className="text-xs text-white touch-manipulation"
            >
              Search instead
            </Button>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Name *</label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Client name"
              className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
              autoCapitalize="words"
              enterKeyHint="next"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Phone</label>
            <Input
              type="tel"
              inputMode="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="07xxx xxxxxx"
              className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
              autoCapitalize="off"
              enterKeyHint="next"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Email</label>
            <Input
              type="email"
              inputMode="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="client@email.com"
              className="h-11 touch-manipulation rounded-xl border-white/[0.08] bg-[hsl(0_0%_10%)] text-[14px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
              autoCapitalize="off"
              enterKeyHint="done"
            />
          </div>

          {/* Save Customer Prompt */}
          {showSavePrompt && newName.trim() && !visit.customerId && (
            <SaveCustomerPrompt
              client={{
                name: newName,
                email: newEmail || undefined,
                phone: newPhone || undefined,
              }}
              onSaved={handleCustomerSaved}
              onDismiss={() => {
                setShowSavePrompt(false);
                setSavePromptDismissed(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
