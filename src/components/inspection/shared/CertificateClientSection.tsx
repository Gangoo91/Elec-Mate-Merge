/**
 * CertificateClientSection - Unified client picker for all certificate types
 *
 * Provides:
 * - "New Client" / "Existing Client" toggle
 * - Existing Client mode uses ClientSelector bottom sheet (CRM customers)
 * - Field-name mapping so it works with any cert type's naming convention
 * - Stores selectedCustomerId in formData when customer is picked
 */

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Users, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';

export interface ClientFieldMapping {
  /** formData field for client name (e.g., 'clientName') */
  name: string;
  /** formData field for client phone (e.g., 'clientTelephone' or 'clientPhone') */
  phone: string;
  /** formData field for client email (e.g., 'clientEmail') */
  email: string;
  /** formData field for client address (e.g., 'clientAddress') */
  address: string;
}

/** Default mapping used by most cert types */
export const DEFAULT_CLIENT_FIELDS: ClientFieldMapping = {
  name: 'clientName',
  phone: 'clientTelephone',
  email: 'clientEmail',
  address: 'clientAddress',
};

/** Solar PV uses 'clientPhone' instead of 'clientTelephone' */
export const SOLAR_PV_CLIENT_FIELDS: ClientFieldMapping = {
  name: 'clientName',
  phone: 'clientPhone',
  email: 'clientEmail',
  address: 'clientAddress',
};

interface CertificateClientSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  /** Map Customer fields to cert-specific formData fields */
  fieldMapping?: ClientFieldMapping;
  /** Accent colour class for the active toggle (default: 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow') */
  accentColor?: string;
}

const CertificateClientSection: React.FC<CertificateClientSectionProps> = ({
  formData,
  onUpdate,
  fieldMapping = DEFAULT_CLIENT_FIELDS,
  accentColor,
}) => {
  const [mode, setMode] = useState<'new' | 'existing'>(
    formData.selectedCustomerId ? 'existing' : 'new'
  );

  // When a CRM customer is selected via the bottom sheet
  const handleSelectCustomer = (customer: Customer | null) => {
    if (!customer) {
      // Clear selection
      onUpdate('selectedCustomerId', '');
      return;
    }

    // Store the customer ID for linking later
    onUpdate('selectedCustomerId', customer.id);

    // Auto-fill the form fields from the CRM customer
    onUpdate(fieldMapping.name, customer.name || '');
    onUpdate(fieldMapping.phone, customer.phone || '');
    onUpdate(fieldMapping.email, customer.email || '');
    onUpdate(fieldMapping.address, customer.address || '');
  };

  // If user switches to "new" mode, clear the linked customer ID
  const handleSwitchToNew = () => {
    setMode('new');
    onUpdate('selectedCustomerId', '');
  };

  const handleSwitchToExisting = () => {
    setMode('existing');
  };

  return (
    <div className="space-y-3">
      {/* Toggle: New Client / Existing Client */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSwitchToNew}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 h-11 rounded-lg border-2 text-sm font-medium transition-all touch-manipulation',
            mode === 'new'
              ? (accentColor || 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow')
              : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
          )}
        >
          <User className="h-4 w-4" />
          New Client
        </button>
        <button
          type="button"
          onClick={handleSwitchToExisting}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 h-11 rounded-lg border-2 text-sm font-medium transition-all touch-manipulation',
            mode === 'existing'
              ? (accentColor || 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow')
              : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
          )}
        >
          <Users className="h-4 w-4" />
          Existing Client
        </button>
      </div>

      {/* Existing Client mode: show CRM selector */}
      {mode === 'existing' && (
        <ClientSelector
          onSelectCustomer={handleSelectCustomer}
          selectedCustomerId={formData.selectedCustomerId || undefined}
        />
      )}

      {/* Show linked customer badge when in "new" mode but we have a linked ID (from nav state) */}
      {mode === 'new' && formData.selectedCustomerId && (
        <div className="flex items-center gap-2 p-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg text-sm">
          <Users className="h-4 w-4 text-elec-yellow shrink-0" />
          <span className="text-elec-yellow flex-1">Linked to CRM customer</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onUpdate('selectedCustomerId', '')}
            className="h-7 w-7 text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificateClientSection;
