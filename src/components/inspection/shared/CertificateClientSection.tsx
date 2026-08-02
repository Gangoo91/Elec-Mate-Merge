/**
 * CertificateClientSection - Unified client picker for all certificate types
 *
 * Provides:
 * - "New Client" / "Existing Client" toggle
 * - Existing Client mode uses ClientSelector bottom sheet (CRM customers)
 * - Field-name mapping so it works with any cert type's naming convention
 * - Stores selectedCustomerId in formData when customer is picked
 */

import React, { useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  /** Map Customer fields to cert-specific formData fields */
  fieldMapping?: ClientFieldMapping;
  /** Deprecated — the toggle always uses the solid volt selected state now. */
  accentColor?: string;
}

const CertificateClientSection: React.FC<CertificateClientSectionProps> = ({
  formData,
  onUpdate,
  fieldMapping = DEFAULT_CLIENT_FIELDS,
  accentColor,
}) => {
  // NOTE: this initialiser only runs on mount. Certs that render this section
  // before formData has hydrated from the cloud will start on "New client"
  // even for a cert linked to a CRM customer — the linked-customer badge below
  // covers that case. Don't add a promote-to-existing effect: it makes that
  // badge branch unreachable for customers arriving via nav state.
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
      <div className="flex gap-1 rounded-xl border border-white/[0.1] bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={handleSwitchToNew}
          className={cn(
            'flex h-11 flex-1 items-center justify-center rounded-lg text-sm transition-all touch-manipulation active:scale-[0.98]',
            mode === 'new' ? 'bg-elec-yellow font-semibold text-black' : 'font-medium text-white'
          )}
        >
          New client
        </button>
        <button
          type="button"
          onClick={handleSwitchToExisting}
          className={cn(
            'flex h-11 flex-1 items-center justify-center rounded-lg text-sm transition-all touch-manipulation active:scale-[0.98]',
            mode === 'existing'
              ? 'bg-elec-yellow font-semibold text-black'
              : 'font-medium text-white'
          )}
        >
          Existing client
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
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-sm">
          <span className="flex-1 text-[12.5px] text-white">Linked to CRM customer</span>
          <button
            type="button"
            onClick={() => onUpdate('selectedCustomerId', '')}
            className="flex h-8 items-center px-2 text-[12.5px] font-medium text-white/85 transition-colors hover:text-white touch-manipulation"
          >
            Unlink
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateClientSection;
