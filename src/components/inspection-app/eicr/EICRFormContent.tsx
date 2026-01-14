import React from 'react';
import EICRFormTabs from '../EICRFormTabs';
import DraftHeaderActions from '../DraftHeaderActions';
import StartNewEICRDialog from '../StartNewEICRDialog';
import QuickRcdPresets from '../QuickRcdPresets';
import CustomerSelector from '../CustomerSelector';
import { Customer } from '@/hooks/useCustomers';

interface EICRFormContentProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  hasDraft: boolean;
  draftTimestamp: number;
  onLoadDraft: () => void;
  onStartNewFromDraft: () => void;
  hasUnsavedChanges: boolean;
  showStartNewDialog: boolean;
  onCloseStartNewDialog: () => void;
  onConfirmStartNew: () => void;
  onConfirmDuplicate?: () => void;
  onProgressChange?: (progress: number, tabLabel: string) => void;
  selectedCustomerId?: string | null;
  onCustomerSelect?: (customerId: string | null, customer: Customer | null) => void;
}

const EICRFormContent: React.FC<EICRFormContentProps> = ({
  formData,
  onUpdate,
  hasDraft,
  draftTimestamp,
  onLoadDraft,
  onStartNewFromDraft,
  hasUnsavedChanges,
  showStartNewDialog,
  onCloseStartNewDialog,
  onConfirmStartNew,
  onConfirmDuplicate,
  onProgressChange,
  selectedCustomerId,
  onCustomerSelect
}) => {
  // Handle prefilling form data from selected customer
  const handlePrefillFromCustomer = (customer: Customer) => {
    if (customer.name && !formData.clientName) {
      onUpdate('clientName', customer.name);
    }
    if (customer.address && !formData.clientAddress) {
      onUpdate('clientAddress', customer.address);
    }
    if (customer.phone && !formData.clientPhone) {
      onUpdate('clientPhone', customer.phone);
    }
    if (customer.email && !formData.clientEmail) {
      onUpdate('clientEmail', customer.email);
    }
  };

  const handleApplyRcdPreset = (circuitIds: string[], preset: any) => {
    const currentResults = formData.testResults || [];
    const updatedResults = currentResults.map((result: any) => {
      if (circuitIds.includes(result.id)) {
        return {
          ...result,
          rcdBsStandard: preset.bsStandard,
          rcdType: preset.type,
          rcdRating: preset.rating,
          rcdRatingA: preset.ratingA,
        };
      }
      return result;
    });
    onUpdate('testResults', updatedResults);
  };

  return (
    <div className="space-y-6">

      <DraftHeaderActions
        hasDraft={hasDraft}
        draftTimestamp={draftTimestamp}
        onLoadDraft={onLoadDraft}
        onStartNew={onStartNewFromDraft}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Customer Selection */}
      {onCustomerSelect && (
        <CustomerSelector
          selectedCustomerId={selectedCustomerId}
          onCustomerSelect={onCustomerSelect}
          onPrefillFromCustomer={handlePrefillFromCustomer}
        />
      )}

      {formData.testResults && formData.testResults.length > 0 && (
        <div className="mb-6">
          <QuickRcdPresets 
            testResults={formData.testResults}
            onApplyToCircuits={handleApplyRcdPreset}
          />
        </div>
      )}

      <EICRFormTabs formData={formData} onUpdate={onUpdate} onProgressChange={onProgressChange} />

      <StartNewEICRDialog
        isOpen={showStartNewDialog}
        onClose={onCloseStartNewDialog}
        onConfirm={onConfirmStartNew}
        onDuplicate={onConfirmDuplicate}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
};

export default EICRFormContent;
