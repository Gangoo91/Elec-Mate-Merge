import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Check } from 'lucide-react';
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
        <h2 className="text-lg font-bold text-white">Client Details</h2>
        <p className="text-sm text-white mt-1">Search existing customers or create a new one</p>
      </div>

      {/* Selected customer display */}
      {selectedCustomer && !showCreate && (
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium text-emerald-400">{selectedCustomer.name}</p>
            <p className="text-[13px] text-white truncate">
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
            className="text-xs text-white touch-manipulation"
          >
            Change
          </Button>
        </div>
      )}

      {/* Search */}
      {!selectedCustomer && !showCreate && (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email or phone..."
              className="h-11 pl-10 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              autoCapitalize="off"
              autoComplete="off"
              enterKeyHint="search"
            />
          </div>

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
        <div className="space-y-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">New Client</h3>
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
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
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
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
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
              className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
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
