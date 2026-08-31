import React, { useState } from 'react';
import { useCustomerProperties, CustomerProperty } from '@/hooks/inspection/useCustomerProperties';
import { PropertyForm } from './PropertyForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, Navigation } from 'lucide-react';
import { navigateToAddress, canNavigateTo } from '@/utils/navigate-to-address';
import { cn } from '@/lib/utils';

interface CustomerPropertiesTabProps {
  customerId: string;
  onRefresh: () => void;
}

const propertyTypeLabels: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
};

export const CustomerPropertiesTab = ({ customerId, onRefresh }: CustomerPropertiesTabProps) => {
  const {
    properties,
    isLoading,
    addProperty,
    updateProperty,
    deleteProperty,
    setPrimaryProperty,
    isAdding,
  } = useCustomerProperties(customerId);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProperty, setEditingProperty] = useState<CustomerProperty | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (data: any) => {
    if (editingProperty) {
      updateProperty({ propertyId: editingProperty.id, updates: data });
    } else {
      addProperty(data);
    }
    setShowAddDialog(false);
    setEditingProperty(null);
    onRefresh();
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      deleteProperty(deleteConfirmId);
      setDeleteConfirmId(null);
      onRefresh();
    }
  };

  const handleSetPrimary = (propertyId: string) => {
    setPrimaryProperty(propertyId);
    onRefresh();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add property */}
      <button
        onClick={() => {
          setEditingProperty(null);
          setShowAddDialog(true);
        }}
        className="h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.99] disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation"
        disabled={isAdding}
      >
        Add property
      </button>

      {/* Properties List */}
      {properties.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-10 text-center">
          <p className="text-[15px] font-semibold text-white">No properties yet</p>
          <p className="mt-1 text-[12.5px] text-white/55">
            Add properties to track certificates for each location.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => (
            <div
              key={property.id}
              className={cn(
                'rounded-2xl border bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4',
                property.isPrimary ? 'border-elec-yellow/60' : 'border-white/[0.12]'
              )}
            >
              <div className="mb-1 flex items-center gap-1.5">
                {property.isPrimary && (
                  <span className="rounded bg-elec-yellow px-2 py-0.5 text-[10px] font-bold text-black">
                    Primary
                  </span>
                )}
                <span className="rounded bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold text-white/75">
                  {propertyTypeLabels[property.propertyType] || 'Residential'}
                </span>
              </div>
              <p className="break-words text-sm font-medium text-white">{property.address}</p>
              {property.notes && (
                <p className="mt-1 line-clamp-2 text-[12px] text-white/60">{property.notes}</p>
              )}
              <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
                <span className="text-[11.5px] text-white/50 tabular-nums">
                  {(property.certificateCount || 0) > 0
                    ? `${property.certificateCount} certificate${property.certificateCount !== 1 ? 's' : ''}`
                    : 'No certificates yet'}
                </span>
                <div className="flex items-center gap-1">
                  {/* ELE-1520 — a property record is somewhere the electrician
                      has to physically get to, so directions belong here. */}
                  {canNavigateTo(property) && (
                    <button
                      onClick={() =>
                        navigateToAddress({
                          address: property.address,
                          latitude: property.latitude,
                          longitude: property.longitude,
                        })
                      }
                      aria-label={`Navigate to ${property.address}`}
                      className="flex h-9 items-center gap-1 px-2 text-[12px] font-medium text-elec-yellow transition-colors hover:text-elec-yellow/80 touch-manipulation"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Navigate
                    </button>
                  )}
                  {!property.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(property.id)}
                      className="flex h-9 items-center px-2 text-[12px] font-medium text-white/60 transition-colors hover:text-white touch-manipulation"
                    >
                      Make primary
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingProperty(property);
                      setShowAddDialog(true);
                    }}
                    className="flex h-9 items-center px-2 text-[12px] font-medium text-white/60 transition-colors hover:text-white touch-manipulation"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(property.id)}
                    className="flex h-9 items-center px-2 text-[12px] font-medium text-white/40 transition-colors hover:text-red-400 touch-manipulation"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Property Dialog */}
      <PropertyForm
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) setEditingProperty(null);
        }}
        property={editingProperty}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this property. Certificates linked to this property will remain but
              won't be associated with any property.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 min-h-[44px]"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
