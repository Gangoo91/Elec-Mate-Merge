import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Eye, Pencil, Trash2 } from 'lucide-react';
import { Customer } from '@/hooks/useCustomers';

interface CustomerCardProps {
  customer: Customer;
  onView: (id: string) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
}

export const CustomerCard = ({ customer, onView, onEdit, onDelete }: CustomerCardProps) => {
  return (
    <Card className="hover:border-elec-yellow/40 hover:scale-[1.01] transition-all duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl font-semibold flex items-start justify-between gap-2">
          <span className="line-clamp-2 break-words min-w-0">{customer.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Contact Details */}
        <div className="space-y-2 text-sm">
          {customer.email && (
            <div className="flex items-center gap-2 text-neutral-400 min-w-0">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="truncate text-sm min-w-0">{customer.email}</span>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-2 text-neutral-400 min-w-0">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="break-all text-sm">{customer.phone}</span>
            </div>
          )}
          {customer.address && (
            <div className="flex items-start gap-2 text-neutral-400 min-w-0">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2 text-sm break-words min-w-0">{customer.address}</span>
            </div>
          )}
        </div>

        {/* Notes Preview */}
        {customer.notes && (
          <p className="text-sm text-neutral-500 line-clamp-2 border-t border-border pt-3.5">
            {customer.notes}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button
            variant="accent-outline"
            size="sm"
            className="flex-1 gap-2 min-h-[44px] sm:h-10"
            onClick={() => onView(customer.id)}
          >
            <Eye className="h-4 w-4" />
            <span className="text-xs sm:text-sm">View</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-foreground min-h-[44px] min-w-[44px] sm:h-10 sm:w-10 flex-shrink-0"
            onClick={() => onEdit(customer)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-red-400 min-h-[44px] min-w-[44px] sm:h-10 sm:w-10 flex-shrink-0"
            onClick={() => onDelete(customer.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
