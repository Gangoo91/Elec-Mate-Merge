import React, { useState } from 'react';
import { useCustomerProperties, CustomerProperty } from '@/hooks/inspection/useCustomerProperties';
import { PropertyForm } from './PropertyForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  Home,
  Building2,
  Factory,
  MoreVertical,
  Star,
  FileText,
  Loader2,
  MapPin,
} from 'lucide-react';

interface CustomerPropertiesTabProps {
  customerId: string;
  onRefresh: () => void;
}

const propertyTypeIcons: Record<string, React.ReactNode> = {
  residential: <Home className="h-5 w-5 text-blue-400" />,
  commercial: <Building2 className="h-5 w-5 text-green-400" />,
  industrial: <Factory className="h-5 w-5 text-orange-400" />,
};

const propertyTypeLabels: Record<string, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
};

export const CustomerPropertiesTab = ({
  customerId,
  onRefresh,
}: CustomerPropertiesTabProps) => {
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
      {/* Add Property Button */}
      <Button
        variant="accent"
        onClick={() => {
          setEditingProperty(null);
          setShowAddDialog(true);
        }}
        className="w-full h-12 touch-manipulation"
        disabled={isAdding}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Property
      </Button>

      {/* Properties List */}
      {properties.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No properties yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Add properties to track certificates for each location
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => (
            <Card
              key={property.id}
              className={property.isPrimary ? 'border-elec-yellow/50' : ''}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {propertyTypeIcons[property.propertyType] || propertyTypeIcons.residential}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {property.isPrimary && (
                        <Badge variant="default" className="text-[10px] bg-elec-yellow text-black">
                          <Star className="h-3 w-3 mr-0.5" />
                          Primary
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[10px]">
                        {propertyTypeLabels[property.propertyType]}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm break-words">{property.address}</p>
                    {property.notes && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {property.notes}
                      </p>
                    )}
                    {(property.certificateCount || 0) > 0 && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        {property.certificateCount} certificate{property.certificateCount !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 flex-shrink-0 touch-manipulation"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      {!property.isPrimary && (
                        <DropdownMenuItem
                          onClick={() => handleSetPrimary(property.id)}
                          className="min-h-[44px]"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Set as Primary
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingProperty(property);
                          setShowAddDialog(true);
                        }}
                        className="min-h-[44px]"
                      >
                        Edit Property
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeleteConfirmId(property.id)}
                        className="min-h-[44px] text-red-500 focus:text-red-500"
                      >
                        Delete Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
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
              This will remove this property. Certificates linked to this property will remain but won't be associated with any property.
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
